/**
 * 补间动画类
 */

import type { AnimationTarget, AnimationOptions, AnimationProps, ITween } from './types'
import type { EasingFunction } from '@ldesign/shared'
import { getEasingFunction } from '@ldesign/shared'
import { PropertyInterpolator, createInterpolators, setProperty } from './property'

/**
 * 补间动画类
 */
export class Tween implements ITween {
  target: AnimationTarget
  startTime: number
  duration: number
  delay: number
  progress: number = 0

  private interpolators: PropertyInterpolator[] = []
  private easing: EasingFunction
  private repeat: number
  private yoyo: boolean
  private currentRepeat: number = 0
  private isReversed: boolean = false
  private started: boolean = false

  // 回调
  private onStart?: () => void
  private onUpdate?: (progress: number) => void
  private onComplete?: () => void
  private onRepeat?: () => void

  constructor(
    target: AnimationTarget,
    props: AnimationProps,
    options: AnimationOptions = {}
  ) {
    this.target = target
    this.duration = options.duration ?? 300
    this.delay = options.delay ?? 0
    this.repeat = options.repeat ?? 0
    this.yoyo = options.yoyo ?? false

    // 设置回调
    this.onStart = options.onStart
    this.onUpdate = options.onUpdate
    this.onComplete = options.onComplete
    this.onRepeat = options.onRepeat

    // 解析缓动函数
    const easingOption = options.easing ?? 'linear'
    if (typeof easingOption === 'string') {
      try {
        this.easing = getEasingFunction(easingOption as any)
      } catch {
        this.easing = getEasingFunction('linear')
      }
    } else {
      this.easing = easingOption
    }

    // 创建属性插值器
    this.interpolators = createInterpolators(target, props)

    this.startTime = performance.now()
  }

  /**
   * 更新动画
   * @param currentTime - 当前时间戳
   * @returns 是否继续动画
   */
  update(currentTime: number): boolean {
    // 等待延迟
    const elapsed = currentTime - this.startTime
    if (elapsed < this.delay) {
      return true
    }

    // 触发开始回调
    if (!this.started) {
      this.started = true
      this.onStart?.()
    }

    // 计算实际进度时间
    const progressTime = elapsed - this.delay
    let progress = Math.min(progressTime / this.duration, 1)

    // 应用缓动
    const easedProgress = this.easing(
      progress * this.duration,
      0,
      1,
      this.duration
    )

    // 处理 yoyo
    const finalProgress = this.isReversed ? 1 - easedProgress : easedProgress
    this.progress = finalProgress

    // 更新所有属性
    this.interpolators.forEach((interpolator) => {
      const value = interpolator.interpolate(finalProgress)
      setProperty(this.target, interpolator.getProperty(), value)
    })

    // 触发更新回调
    this.onUpdate?.(finalProgress)

    // 动画完成
    if (progress >= 1) {
      // 处理重复
      if (this.repeat === -1 || this.currentRepeat < this.repeat) {
        this.currentRepeat++
        this.startTime = currentTime

        if (this.yoyo) {
          this.isReversed = !this.isReversed
        }

        this.onRepeat?.()
        return true
      }

      // 动画结束
      this.onComplete?.()
      return false
    }

    return true
  }

  /**
   * 重置动画
   */
  reset(): void {
    this.startTime = performance.now()
    this.progress = 0
    this.currentRepeat = 0
    this.isReversed = false
    this.started = false
  }
}






