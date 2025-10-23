/**
 * IntersectionObserver 封装
 */

import type { IntersectionConfig } from './types'

/**
 * IntersectionObserver 管理器
 */
export class IntersectionManager {
  private observer: IntersectionObserver | null = null
  private elements: Map<Element, IntersectionConfig> = new Map()
  private intersecting: Set<Element> = new Set()

  constructor(config: Omit<IntersectionConfig, 'onEnter' | 'onLeave' | 'onChange'> = {}) {
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported in this browser')
      return
    }

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: config.root ?? null,
        rootMargin: config.rootMargin ?? '0px',
        threshold: config.threshold ?? 0,
      }
    )
  }

  /**
   * 观察元素
   */
  observe(element: Element, config: IntersectionConfig): void {
    if (!this.observer) return

    this.elements.set(element, config)
    this.observer.observe(element)
  }

  /**
   * 取消观察元素
   */
  unobserve(element: Element): void {
    if (!this.observer) return

    this.elements.delete(element)
    this.intersecting.delete(element)
    this.observer.unobserve(element)
  }

  /**
   * 取消所有观察
   */
  disconnect(): void {
    if (!this.observer) return

    this.observer.disconnect()
    this.elements.clear()
    this.intersecting.clear()
  }

  /**
   * 处理交叉状态变化
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const config = this.elements.get(entry.target)
      if (!config) return

      const isIntersecting = entry.isIntersecting
      const wasIntersecting = this.intersecting.has(entry.target)

      // 触发 onChange 回调
      config.onChange?.(entry)

      // 进入视口
      if (isIntersecting && !wasIntersecting) {
        this.intersecting.add(entry.target)
        config.onEnter?.(entry)
      }
      // 离开视口
      else if (!isIntersecting && wasIntersecting) {
        this.intersecting.delete(entry.target)
        config.onLeave?.(entry)
      }
    })
  }

  /**
   * 检查元素是否在视口内
   */
  isIntersecting(element: Element): boolean {
    return this.intersecting.has(element)
  }
}

/**
 * 创建 IntersectionObserver 管理器
 */
export function createIntersectionManager(
  config?: Omit<IntersectionConfig, 'onEnter' | 'onLeave' | 'onChange'>
): IntersectionManager {
  return new IntersectionManager(config)
}






