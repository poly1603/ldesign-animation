/**
 * will-change 优化管理
 * 
 * 自动管理 will-change 属性，在动画前添加，动画后移除
 * 避免过度使用导致的内存问题
 */

/**
 * will-change 管理器
 */
export class WillChangeManager {
  private elements: Map<Element, Set<string>> = new Map()
  private timers: Map<Element, number> = new Map()
  private removeDelay: number = 1000 // 动画结束后1秒移除

  /**
   * 添加 will-change 属性
   */
  add(element: HTMLElement | SVGElement, properties: string[]): void {
    if (!this.elements.has(element)) {
      this.elements.set(element, new Set())
    }

    const props = this.elements.get(element)!
    properties.forEach(prop => props.add(prop))

    // 更新 DOM
    this.updateElement(element)

    // 清除已有的移除计时器
    if (this.timers.has(element)) {
      clearTimeout(this.timers.get(element)!)
      this.timers.delete(element)
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
        this.elements.delete(element)
        element.style.willChange = 'auto'
      } else {
        // 移除指定属性
        const props = this.elements.get(element)
        if (props) {
          properties.forEach(prop => props.delete(prop))
          if (props.size === 0) {
            this.elements.delete(element)
            element.style.willChange = 'auto'
          } else {
            this.updateElement(element)
          }
        }
      }
      this.timers.delete(element)
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
      this.timers.delete(element)
    }
    this.elements.delete(element)
    element.style.willChange = 'auto'
  }

  /**
   * 清空所有
   */
  clear(): void {
    this.timers.forEach(timer => clearTimeout(timer))
    this.elements.forEach((_, element) => {
      (element as HTMLElement).style.willChange = 'auto'
    })
    this.elements.clear()
    this.timers.clear()
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



