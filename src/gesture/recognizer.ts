/**
 * 手势识别器
 */

import type { AnimationTarget } from '../core/types'
import type { GestureConfig, GestureEvent, GestureType } from './types'

/**
 * 手势识别器类
 */
export class GestureRecognizer {
  private target: HTMLElement
  private config: Required<GestureConfig>
  private listeners: Map<GestureType, Set<(e: GestureEvent) => void>> = new Map()
  private pressTimer: number | null = null
  private startX: number = 0
  private startY: number = 0
  private startTime: number = 0

  constructor(target: AnimationTarget | string, config: GestureConfig = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) {
      throw new Error(`Target element not found: ${target}`)
    }

    this.target = element as HTMLElement
    this.config = {
      pressDelay: config.pressDelay ?? 500,
      swipeThreshold: config.swipeThreshold ?? 50,
      pinchThreshold: config.pinchThreshold ?? 0.1,
    }

    this.init()
  }

  /**
   * 初始化事件监听
   */
  private init(): void {
    // Hover
    this.target.addEventListener('mouseenter', () => this.emit('hover', null))
    this.target.addEventListener('mouseleave', () => this.emit('hover', null))

    // Tap 和 Press
    this.target.addEventListener('pointerdown', this.handlePointerDown)
    this.target.addEventListener('pointerup', this.handlePointerUp)

    // Touch 事件用于 pinch
    this.target.addEventListener('touchstart', this.handleTouchStart as any)
    this.target.addEventListener('touchmove', this.handleTouchMove as any)
  }

  /**
   * 指针按下
   */
  private handlePointerDown = (e: PointerEvent) => {
    this.startX = e.clientX
    this.startY = e.clientY
    this.startTime = Date.now()

    // 开始长按计时
    this.pressTimer = window.setTimeout(() => {
      this.emit('press', e)
      this.pressTimer = null
    }, this.config.pressDelay)
  }

  /**
   * 指针释放
   */
  private handlePointerUp = (e: PointerEvent) => {
    const deltaX = e.clientX - this.startX
    const deltaY = e.clientY - this.startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const duration = Date.now() - this.startTime

    // 清除长按计时器
    if (this.pressTimer) {
      clearTimeout(this.pressTimer)
      this.pressTimer = null
    }

    // 判断是 tap 还是 swipe
    if (distance < 10 && duration < 300) {
      // Tap
      this.emit('tap', e)
    } else if (distance > this.config.swipeThreshold) {
      // Swipe
      this.emit('swipe', e, {
        delta: { x: deltaX, y: deltaY },
        distance,
      })
    }
  }

  /**
   * 触摸开始（用于 pinch）
   */
  private handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      // 记录初始距离
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dx = touch2.clientX - touch1.clientX
      const dy = touch2.clientY - touch1.clientY
      this.startX = Math.sqrt(dx * dx + dy * dy)
    }
  }

  /**
   * 触摸移动（用于 pinch）
   */
  private handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dx = touch2.clientX - touch1.clientX
      const dy = touch2.clientY - touch1.clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const scale = distance / this.startX

      if (Math.abs(scale - 1) > this.config.pinchThreshold) {
        this.emit('pinch', e, { scale, distance })
      }
    }
  }

  /**
   * 添加手势监听
   */
  on(type: GestureType, handler: (e: GestureEvent) => void): this {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(handler)
    return this
  }

  /**
   * 移除手势监听
   */
  off(type: GestureType, handler: (e: GestureEvent) => void): this {
    const handlers = this.listeners.get(type)
    if (handlers) {
      handlers.delete(handler)
    }
    return this
  }

  /**
   * 触发手势事件
   */
  private emit(type: GestureType, originalEvent: Event | null, extra?: Partial<GestureEvent>): void {
    const handlers = this.listeners.get(type)
    if (!handlers) return

    const event: GestureEvent = {
      type,
      target: this.target,
      originalEvent: originalEvent!,
      ...extra,
    }

    handlers.forEach(handler => handler(event))
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.listeners.clear()
    if (this.pressTimer) {
      clearTimeout(this.pressTimer)
    }
  }
}

/**
 * 创建手势识别器
 */
export function gesture(
  target: AnimationTarget | string,
  config?: GestureConfig
): GestureRecognizer {
  return new GestureRecognizer(target, config)
}

