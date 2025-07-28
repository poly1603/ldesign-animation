/**
 * 过渡管理器 - 处理CSS过渡效果
 */

import { TransitionConfig } from '../types'

export interface TransitionOptions extends TransitionConfig {
  from?: Record<string, string | number>
  to?: Record<string, string | number>
}

export class TransitionManager {
  private config: TransitionConfig
  private activeTransitions: Map<HTMLElement, {
    properties: string[]
    cleanup: () => void
  }> = new Map()
  private eventListeners: Map<string, Function[]> = new Map()

  constructor(config: TransitionConfig = {}) {
    this.config = {
      property: 'all',
      duration: 300,
      delay: 0,
      easing: 'ease',
      autoplay: true,
      ...config
    }
  }

  /**
   * 创建过渡效果
   */
  create(element: HTMLElement, options: TransitionOptions): Promise<void> {
    const finalOptions = { ...this.config, ...options }
    
    return new Promise((resolve) => {
      // 清理之前的过渡
      this.stop(element)

      // 设置初始状态
      if (options.from) {
        Object.assign(element.style, options.from)
      }

      // 设置过渡属性
      const transitionProperty = finalOptions.property || 'all'
      const transitionDuration = `${finalOptions.duration}ms`
      const transitionDelay = `${finalOptions.delay}ms`
      const transitionEasing = finalOptions.easing || 'ease'
      
      element.style.transition = `${transitionProperty} ${transitionDuration} ${transitionEasing} ${transitionDelay}`

      // 监听过渡结束
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.target === element) {
          this.cleanup(element)
          resolve()
        }
      }

      element.addEventListener('transitionend', handleTransitionEnd)

      // 存储清理函数
      this.activeTransitions.set(element, {
        properties: [transitionProperty],
        cleanup: () => {
          element.removeEventListener('transitionend', handleTransitionEnd)
          element.style.transition = ''
        }
      })

      // 应用目标状态
      if (options.to) {
        // 使用 requestAnimationFrame 确保初始状态已应用
        requestAnimationFrame(() => {
          Object.assign(element.style, options.to)
        })
      }

      // 如果没有目标状态，立即解决
      if (!options.to) {
        setTimeout(() => {
          this.cleanup(element)
          resolve()
        }, finalOptions.duration! + finalOptions.delay!)
      }
    })
  }

  /**
   * 开始过渡（通过ID）
   */
  start(transitionId: string): void {
    // 由于过渡是基于元素的，这里可以是一个占位符实现
    // 实际使用中可能需要维护ID到元素的映射
    console.warn('TransitionManager.start() is not implemented for ID-based operations')
  }

  /**
   * 停止元素的过渡
   */
  stop(element: HTMLElement): void
  stop(transitionId: string): void
  stop(elementOrId: HTMLElement | string): void {
    if (typeof elementOrId === 'string') {
      // 处理ID的情况
      console.warn('TransitionManager.stop() with ID is not fully implemented')
      return
    }
    
    const element = elementOrId as HTMLElement
    const transition = this.activeTransitions.get(element)
    if (transition) {
      transition.cleanup()
      this.activeTransitions.delete(element)
    }
  }

  /**
   * 获取过渡状态
   */
  getStatus(element: HTMLElement): 'idle' | 'running' {
    return this.activeTransitions.has(element) ? 'running' : 'idle'
  }

  /**
   * 清理过渡
   */
  private cleanup(element: HTMLElement): void {
    const transition = this.activeTransitions.get(element)
    if (transition) {
      transition.cleanup()
      this.activeTransitions.delete(element)
    }
  }

  /**
   * 批量创建过渡
   */
  createBatch(elements: HTMLElement[], options: TransitionOptions): Promise<void[]> {
    return Promise.all(elements.map(element => this.create(element, options)))
  }

  /**
   * 交错过渡
   */
  createStagger(
    elements: HTMLElement[], 
    options: TransitionOptions, 
    staggerDelay: number = 100
  ): Promise<void[]> {
    return Promise.all(
      elements.map((element, index) => 
        this.create(element, {
          ...options,
          delay: (options.delay || 0) + (index * staggerDelay)
        })
      )
    )
  }

  /**
   * 暂停过渡（占位符实现）
   */
  pause(transitionId: string): void {
    console.warn('TransitionManager.pause() is not implemented')
  }

  /**
   * 恢复过渡（占位符实现）
   */
  resume(transitionId: string): void {
    console.warn('TransitionManager.resume() is not implemented')
  }

  /**
   * 获取过渡状态（通过ID）
   */
  getState(transitionId: string): 'idle' | 'running' {
    console.warn('TransitionManager.getState() with ID is not implemented')
    return 'idle'
  }

  /**
   * 添加事件监听器
   */
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  /**
   * 移除事件监听器
   */
  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  /**
   * 触发事件
   */
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  /**
   * 销毁管理器（别名为destroy）
   */
  destroy(): void {
    this.dispose()
  }

  /**
   * 清理所有过渡
   */
  dispose(): void {
    this.activeTransitions.forEach((transition, element) => {
      transition.cleanup()
    })
    this.activeTransitions.clear()
    this.eventListeners.clear()
  }
}

export default TransitionManager