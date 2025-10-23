/**
 * 拖拽动画
 */

import type { AnimationTarget } from '../core/types'
import type { DragConfig } from './types'
import { InertiaAnimation } from '../physics/inertia'

/**
 * 拖拽类
 */
export class Draggable {
  private target: HTMLElement
  private config: Required<Omit<DragConfig, 'bounds' | 'onDragStart' | 'onDrag' | 'onDragEnd'>> & {
    bounds?: DragConfig['bounds']
    onDragStart?: DragConfig['onDragStart']
    onDrag?: DragConfig['onDrag']
    onDragEnd?: DragConfig['onDragEnd']
  }
  private isDragging: boolean = false
  private startX: number = 0
  private startY: number = 0
  private currentX: number = 0
  private currentY: number = 0
  private lastX: number = 0
  private lastY: number = 0
  private velocityX: number = 0
  private velocityY: number = 0
  private lastMoveTime: number = 0

  constructor(target: AnimationTarget | string, config: DragConfig = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) {
      throw new Error(`Target element not found: ${target}`)
    }

    this.target = element as HTMLElement
    this.config = {
      axis: config.axis ?? 'both',
      bounds: config.bounds,
      inertia: config.inertia ?? true,
      inertiaFriction: config.inertiaFriction ?? 0.9,
      onDragStart: config.onDragStart,
      onDrag: config.onDrag,
      onDragEnd: config.onDragEnd,
    }

    this.init()
  }

  /**
   * 初始化事件监听
   */
  private init(): void {
    this.target.addEventListener('pointerdown', this.handlePointerDown)
    this.target.style.touchAction = 'none'
    this.target.style.userSelect = 'none'
  }

  /**
   * 指针按下
   */
  private handlePointerDown = (e: PointerEvent) => {
    e.preventDefault()

    this.isDragging = true
    this.startX = e.clientX - this.currentX
    this.startY = e.clientY - this.currentY
    this.lastX = e.clientX
    this.lastY = e.clientY
    this.lastMoveTime = performance.now()

    // 监听移动和释放
    document.addEventListener('pointermove', this.handlePointerMove)
    document.addEventListener('pointerup', this.handlePointerUp)

    this.config.onDragStart?.(e)
  }

  /**
   * 指针移动
   */
  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isDragging) return

    const now = performance.now()
    const dt = now - this.lastMoveTime

    // 计算位置
    let x = e.clientX - this.startX
    let y = e.clientY - this.startY

    // 应用轴向限制
    if (this.config.axis === 'x') {
      y = this.currentY
    } else if (this.config.axis === 'y') {
      x = this.currentX
    }

    // 应用边界限制
    if (this.config.bounds) {
      const bounds = this.getBounds()
      x = Math.max(bounds.left, Math.min(bounds.right, x))
      y = Math.max(bounds.top, Math.min(bounds.bottom, y))
    }

    // 计算速度
    if (dt > 0) {
      this.velocityX = (e.clientX - this.lastX) / dt
      this.velocityY = (e.clientY - this.lastY) / dt
    }

    this.lastX = e.clientX
    this.lastY = e.clientY
    this.lastMoveTime = now

    // 更新位置
    this.currentX = x
    this.currentY = y
    this.updateTransform()

    this.config.onDrag?.(e, {
      x: this.currentX,
      y: this.currentY,
    })
  }

  /**
   * 指针释放
   */
  private handlePointerUp = (e: PointerEvent) => {
    if (!this.isDragging) return

    this.isDragging = false

    // 移除监听
    document.removeEventListener('pointermove', this.handlePointerMove)
    document.removeEventListener('pointerup', this.handlePointerUp)

    this.config.onDragEnd?.(e)

    // 应用惯性
    if (this.config.inertia && (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1)) {
      this.applyInertia()
    }
  }

  /**
   * 应用惯性
   */
  private applyInertia(): void {
    const bounds = this.config.bounds ? this.getBounds() : undefined

    // X 轴惯性
    if (this.config.axis !== 'y' && Math.abs(this.velocityX) > 0.1) {
      new InertiaAnimation(
        this.target,
        'x',
        {
          velocity: this.velocityX * 10,
          friction: this.config.inertiaFriction,
          min: bounds?.left,
          max: bounds?.right,
        },
        {
          onUpdate: (value) => {
            this.currentX = value
            this.updateTransform()
          },
        }
      ).start()
    }

    // Y 轴惯性
    if (this.config.axis !== 'x' && Math.abs(this.velocityY) > 0.1) {
      new InertiaAnimation(
        this.target,
        'y',
        {
          velocity: this.velocityY * 10,
          friction: this.config.inertiaFriction,
          min: bounds?.top,
          max: bounds?.bottom,
        },
        {
          onUpdate: (value) => {
            this.currentY = value
            this.updateTransform()
          },
        }
      ).start()
    }
  }

  /**
   * 获取边界
   */
  private getBounds(): { left: number; right: number; top: number; bottom: number } {
    if (!this.config.bounds) {
      return { left: -Infinity, right: Infinity, top: -Infinity, bottom: Infinity }
    }

    if (this.config.bounds instanceof HTMLElement) {
      const rect = this.config.bounds.getBoundingClientRect()
      const targetRect = this.target.getBoundingClientRect()
      return {
        left: 0,
        right: rect.width - targetRect.width,
        top: 0,
        bottom: rect.height - targetRect.height,
      }
    }

    return {
      left: this.config.bounds.left ?? -Infinity,
      right: this.config.bounds.right ?? Infinity,
      top: this.config.bounds.top ?? -Infinity,
      bottom: this.config.bounds.bottom ?? Infinity,
    }
  }

  /**
   * 更新 transform
   */
  private updateTransform(): void {
    this.target.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.target.removeEventListener('pointerdown', this.handlePointerDown)
    document.removeEventListener('pointermove', this.handlePointerMove)
    document.removeEventListener('pointerup', this.handlePointerUp)
  }
}

/**
 * 创建可拖拽元素
 */
export function draggable(
  target: AnimationTarget | string,
  config?: DragConfig
): Draggable {
  return new Draggable(target, config)
}

