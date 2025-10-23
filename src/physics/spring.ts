/**
 * 弹簧动画 - 基于物理的弹性动画
 */

import type { AnimationTarget } from '../core/types'
import type { SpringConfig } from './types'
import { setProperty } from '../core/property'

/**
 * 弹簧动画类
 */
export class SpringAnimation {
  private target: AnimationTarget
  private prop: string
  private toValue: number
  private currentValue: number
  private velocity: number
  private config: Required<SpringConfig>
  private rafId: number | null = null
  private lastTime: number = 0
  private onComplete?: () => void
  private onUpdate?: (value: number) => void

  constructor(
    target: AnimationTarget,
    prop: string,
    to: number,
    config: SpringConfig = {},
    callbacks?: {
      onComplete?: () => void
      onUpdate?: (value: number) => void
    }
  ) {
    this.target = target
    this.prop = prop
    this.toValue = to
    this.onComplete = callbacks?.onComplete
    this.onUpdate = callbacks?.onUpdate

    // 获取当前值
    const computed = window.getComputedStyle(target as HTMLElement)
    const currentStr = computed.getPropertyValue(prop)
    this.currentValue = parseFloat(currentStr) || 0

    // 默认配置
    this.config = {
      mass: config.mass ?? 1,
      stiffness: config.stiffness ?? 100,
      damping: config.damping ?? 10,
      velocity: config.velocity ?? 0,
      restSpeed: config.restSpeed ?? 0.01,
      restDelta: config.restDelta ?? 0.01,
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
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.064) // 最大 64ms
    this.lastTime = currentTime

    // 弹簧物理计算
    const { mass, stiffness, damping } = this.config

    // 胡克定律: F = -k * x
    const springForce = -stiffness * (this.currentValue - this.toValue)

    // 阻尼力: F = -c * v
    const dampingForce = -damping * this.velocity

    // 总力: F = ma
    const acceleration = (springForce + dampingForce) / mass

    // 更新速度和位置
    this.velocity += acceleration * deltaTime
    this.currentValue += this.velocity * deltaTime

    // 更新 DOM
    setProperty(this.target, this.prop, this.currentValue)
    this.onUpdate?.(this.currentValue)

    // 检查是否静止
    const isAtRest =
      Math.abs(this.velocity) < this.config.restSpeed &&
      Math.abs(this.currentValue - this.toValue) < this.config.restDelta

    if (isAtRest) {
      // 设置最终值
      setProperty(this.target, this.prop, this.toValue)
      this.onComplete?.()
      return
    }

    // 继续动画
    this.rafId = requestAnimationFrame(this.tick)
  }
}

/**
 * 创建弹簧动画
 * @param target - 目标元素
 * @param prop - 属性名
 * @param to - 目标值
 * @param config - 弹簧配置
 */
export function spring(
  target: AnimationTarget | string,
  prop: string,
  to: number,
  config?: SpringConfig
): SpringAnimation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }

  const animation = new SpringAnimation(element as AnimationTarget, prop, to, config)
  animation.start()
  return animation
}

/**
 * 预设弹簧配置
 */
export const springPresets = {
  // 柔和
  gentle: {
    mass: 1,
    stiffness: 50,
    damping: 15,
  },
  // 活泼
  wobbly: {
    mass: 1,
    stiffness: 180,
    damping: 12,
  },
  // 僵硬
  stiff: {
    mass: 1,
    stiffness: 200,
    damping: 20,
  },
  // 缓慢
  slow: {
    mass: 1,
    stiffness: 50,
    damping: 20,
  },
  // 弹性
  bouncy: {
    mass: 1,
    stiffness: 300,
    damping: 8,
  },
} as const

export type SpringPresetName = keyof typeof springPresets

