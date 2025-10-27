/**
 * will-change 优化管理
 * 
 * 自动管理 will-change 属性，在动画前添加，动画后移除
 * 避免过度使用导致的内存问题
 */

/**
 * will-change 管理器（优化版 - 内存安全）
 */
export class WillChangeManager {
  // 使用 WeakMap 避免内存泄漏
  private elements: WeakMap<Element, Set<string>> = new WeakMap()
  private timers: WeakMap<Element, number> = new WeakMap()
  // 活动元素追踪（用于批量操作）
  private activeElements: Set<Element> = new Set()
  private removeDelay: number = 1000 // 动画结束后1秒移除
  private maxActiveElements: number = 100 // 最大活动元素数量

  /**
   * 添加 will-change 属性
   */
  add(element: HTMLElement | SVGElement, properties: string[]): void {
    // 检查活动元素数量，防止过度使用
    if (this.activeElements.size >= this.maxActiveElements && !this.activeElements.has(element)) {
      console.warn('[WillChangeManager] Max active elements reached, skipping will-change')
      return
    }

    if (!this.elements.has(element)) {
      this.elements.set(element, new Set())
      this.activeElements.add(element)
    }

    const props = this.elements.get(element)!
    properties.forEach(prop => props.add(prop))

    // 更新 DOM
    this.updateElement(element)

    // 清除已有的移除计时器
    const existingTimer = this.timers.get(element)
    if (existingTimer) {
      clearTimeout(existingTimer)
    }
  }

  /**
   * 延迟移除 will-change
   */
  remove(element: HTMLElement | SVGElement, properties?: string[]): void {
    // 设置延迟移除
    const timer = window.setTimeout(() => {
      if (!properties) {
        // 移除所有
        this.activeElements.delete(element)
        element.style.willChange = 'auto'
      } else {
        // 移除指定属性
        const props = this.elements.get(element)
        if (props) {
          properties.forEach(prop => props.delete(prop))
          if (props.size === 0) {
            this.activeElements.delete(element)
            element.style.willChange = 'auto'
          } else {
            this.updateElement(element)
          }
        }
      }
    }, this.removeDelay)

    this.timers.set(element, timer)
  }

  /**
   * 更新元素的 will-change
   */
  private updateElement(element: HTMLElement | SVGElement): void {
    const props = this.elements.get(element)
    if (!props || props.size === 0) {
      element.style.willChange = 'auto'
    } else {
      element.style.willChange = Array.from(props).join(', ')
    }
  }

  /**
   * 立即移除所有
   */
  removeAll(element: HTMLElement | SVGElement): void {
    const timer = this.timers.get(element)
    if (timer) {
      clearTimeout(timer)
    }
    this.activeElements.delete(element)
    element.style.willChange = 'auto'
  }

  /**
   * 清空所有
   */
  clear(): void {
    this.activeElements.forEach((element) => {
      const timer = this.timers.get(element)
      if (timer) {
        clearTimeout(timer)
      }
      (element as HTMLElement).style.willChange = 'auto'
    })
    this.activeElements.clear()
  }

  /**
   * 获取活动元素数量
   */
  getActiveCount(): number {
    return this.activeElements.size
  }

  /**
   * 设置最大活动元素数量
   */
  setMaxActiveElements(max: number): void {
    this.maxActiveElements = max
  }
}

/**
 * 全局 will-change 管理器
 */
export const willChangeManager = new WillChangeManager()

/**
 * 自动 will-change 装饰器
 */
export function withWillChange<T extends (...args: any[]) => any>(
  func: T,
  properties: string[]
): T {
  return ((...args: any[]) => {
    const [element] = args
    if (element instanceof HTMLElement || element instanceof SVGElement) {
      willChangeManager.add(element, properties)
    }
    const result = func(...args)

    // 如果返回 Promise，在完成后移除
    if (result && typeof result.then === 'function') {
      result.then(() => {
        if (element instanceof HTMLElement || element instanceof SVGElement) {
          willChangeManager.remove(element, properties)
        }
      })
    }

    return result
  }) as T
}



