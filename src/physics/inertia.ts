/**
 * 惯性动画 - 模拟惯性滑动
 */

import type { AnimationTarget } from '../core/types'
import type { InertiaConfig } from './types'
import { setProperty } from '../core/property'

/**
 * 惯性动画类
 */
export class InertiaAnimation {
  private target: AnimationTarget
  private prop: string
  private currentValue: number
  private velocity: number
  private config: Required<InertiaConfig>
  private rafId: number | null = null
  private lastTime: number = 0
  private onComplete?: () => void
  private onUpdate?: (value: number) => void

  constructor(
    target: AnimationTarget,
    prop: string,
    config: InertiaConfig = {},
    callbacks?: {
      onComplete?: () => void
      onUpdate?: (value: number) => void
    }
  ) {
    this.target = target
    this.prop = prop
    this.onComplete = callbacks?.onComplete
    this.onUpdate = callbacks?.onUpdate

    // 获取当前值
    const computed = window.getComputedStyle(target as HTMLElement)
    const currentStr = computed.getPropertyValue(prop)
    this.currentValue = parseFloat(currentStr) || 0

    // 默认配置
    this.config = {
      velocity: config.velocity ?? 0,
      friction: config.friction ?? 0.9,
      min: config.min ?? -Infinity,
      max: config.max ?? Infinity,
      bounce: config.bounce ?? 0.5,
    }

    this.velocity = this.config.velocity
  }

  /**
   * 开始动画
   */
  start(): this {
    this.lastTime = performance.now()
    this.tick()
    return this
  }

  /**
   * 停止动画
   */
  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * RAF 循环
   */
  private tick = () => {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    // 应用摩擦力
    this.velocity *= this.config.friction

    // 更新位置
    this.currentValue += this.velocity * deltaTime * 60 // 归一化到 60fps

    // 边界检测和弹回
    if (this.currentValue < this.config.min) {
      this.currentValue = this.config.min
      this.velocity = -this.velocity * this.config.bounce
    } else if (this.currentValue > this.config.max) {
      this.currentValue = this.config.max
      this.velocity = -this.velocity * this.config.bounce
    }

    // 更新 DOM
    setProperty(this.target, this.prop, this.currentValue)
    this.onUpdate?.(this.currentValue)

    // 检查是否停止
    if (Math.abs(this.velocity) < 0.01) {
      this.onComplete?.()
      return
    }

    // 继续动画
    this.rafId = requestAnimationFrame(this.tick)
  }
}

/**
 * 创建惯性动画
 * @param target - 目标元素
 * @param prop - 属性名
 * @param config - 惯性配置
 */
export function inertia(
  target: AnimationTarget | string,
  prop: string,
  config?: InertiaConfig
): InertiaAnimation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }

  const animation = new InertiaAnimation(element as AnimationTarget, prop, config)
  animation.start()
  return animation
}

