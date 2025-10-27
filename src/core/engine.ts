/**
 * 动画引擎 - 基于 RAF 的全局动画管理器（优化版）
 */

import type { ITween, IAnimationEngine, AnimationTarget } from './types'
import { willChangeManager } from './will-change'

/**
 * FPS 计算器 - 使用滑动窗口获得更准确的 FPS
 */
class FPSCalculator {
  private frameTimes: number[] = []
  private maxSamples: number = 60

  update(deltaTime: number): number {
    this.frameTimes.push(deltaTime)
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift()
    }

    const avgDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    return Math.round(1000 / avgDelta)
  }

  reset(): void {
    this.frameTimes = []
  }
}

/**
 * 动画引擎类 - 单例模式（优化版 + 内存优化）
 */
class AnimationEngine implements IAnimationEngine {
  private tweens: Set<ITween> = new Set()
  // 使用 WeakMap 存储元素引用，避免内存泄漏
  private elementTweens: WeakMap<AnimationTarget, Set<ITween>> = new WeakMap()
  private rafId: number | null = null
  private running: boolean = false
  private lastTime: number = 0
  private fpsCalculator: FPSCalculator = new FPSCalculator()
  private fps: number = 60

  // 帧预算管理
  private frameTimeThreshold: number = 16.67 // 60fps 目标
  private isIdleScheduled: boolean = false

  // 复用数组，避免每帧创建新数组
  private tweensToRemove: ITween[] = []

  /**
   * 添加补间动画到引擎
   * @param tween - 补间动画对象
   */
  add(tween: ITween): void {
    this.tweens.add(tween)

    // 使用 WeakMap 跟踪元素的动画
    const target = tween.target
    if (!this.elementTweens.has(target)) {
      this.elementTweens.set(target, new Set())
    }
    this.elementTweens.get(target)!.add(tween)

    if (!this.running) {
      this.start()
    }
  }

  /**
   * 从引擎移除补间动画
   * @param tween - 补间动画对象
   */
  remove(tween: ITween): void {
    this.tweens.delete(tween)

    // 从元素跟踪中移除
    const target = tween.target
    const elementSet = this.elementTweens.get(target)
    if (elementSet) {
      elementSet.delete(tween)
      // 如果元素没有动画了，Set 会被自动 GC（因为是 WeakMap）
    }

    // 空闲时延迟停止，避免频繁启停
    if (this.tweens.size === 0 && !this.isIdleScheduled) {
      this.scheduleIdleStop()
    }
  }

  /**
   * 启动引擎
   */
  start(): void {
    if (this.running) return

    this.running = true
    this.isIdleScheduled = false
    this.lastTime = performance.now()
    this.tick()
  }

  /**
   * 停止引擎
   */
  stop(): void {
    if (!this.running) return

    this.running = false
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * 延迟停止引擎（空闲时）
   */
  private scheduleIdleStop(): void {
    this.isIdleScheduled = true
    requestIdleCallback(() => {
      if (this.tweens.size === 0) {
        this.stop()
      }
      this.isIdleScheduled = false
    }, { timeout: 100 })
  }

  /**
   * 检查引擎是否运行中
   */
  isRunning(): boolean {
    return this.running
  }

  /**
   * RAF 循环（优化版 - 减少对象分配，提升性能）
   */
  private tick = (): void => {
    if (!this.running) return

    const frameStartTime = performance.now()
    const currentTime = frameStartTime

    // 计算精确 FPS（使用滑动窗口）
    if (this.lastTime > 0) {
      const delta = currentTime - this.lastTime
      this.fps = this.fpsCalculator.update(delta)
    }
    this.lastTime = currentTime

    // 清空复用数组（避免创建新数组）
    this.tweensToRemove.length = 0

    // 直接遍历更新，减少中间对象创建
    this.tweens.forEach((tween) => {
      const shouldContinue = tween.update(currentTime)
      if (!shouldContinue) {
        this.tweensToRemove.push(tween)
      }
    })

    // 批量移除已完成的动画
    for (let i = 0; i < this.tweensToRemove.length; i++) {
      this.remove(this.tweensToRemove[i])
    }

    // 检查帧时间，如果超预算则警告
    const frameTime = performance.now() - frameStartTime
    if (frameTime > this.frameTimeThreshold && this.tweens.size > 0) {
      console.warn(`[AnimationEngine] Frame time exceeded: ${frameTime.toFixed(2)}ms (${this.tweens.size} tweens)`)
    }

    // 继续下一帧
    if (this.tweens.size > 0) {
      this.rafId = requestAnimationFrame(this.tick)
    } else {
      this.stop()
    }
  }

  /**
   * 清空所有动画
   */
  clear(): void {
    this.tweens.clear()
    this.fpsCalculator.reset()
    this.stop()
  }

  /**
   * 获取当前活动动画数量
   */
  getActiveCount(): number {
    return this.tweens.size
  }

  /**
   * 获取当前 FPS
   */
  getFPS(): number {
    return this.fps
  }

  /**
   * 获取性能统计
   */
  getStats(): {
    activeAnimations: number
    fps: number
    isRunning: boolean
    frameTimeThreshold: number
  } {
    return {
      activeAnimations: this.tweens.size,
      fps: this.fps,
      isRunning: this.running,
      frameTimeThreshold: this.frameTimeThreshold,
    }
  }

  /**
   * 获取元素的所有活动动画
   * @param target - 目标元素
   */
  getElementTweens(target: AnimationTarget): ITween[] {
    const tweens = this.elementTweens.get(target)
    return tweens ? Array.from(tweens) : []
  }

  /**
   * 停止元素的所有动画
   * @param target - 目标元素
   */
  killElementTweens(target: AnimationTarget): void {
    const tweens = this.getElementTweens(target)
    tweens.forEach(tween => this.remove(tween))
  }

  /**
   * 设置帧时间阈值（毫秒）
   * @param threshold - 帧时间阈值
   */
  setFrameTimeThreshold(threshold: number): void {
    this.frameTimeThreshold = threshold
  }

  /**
   * 暂停所有动画（用于页面不可见时）
   */
  pauseAll(): void {
    this.stop()
  }

  /**
   * 恢复所有动画
   */
  resumeAll(): void {
    if (this.tweens.size > 0) {
      this.start()
    }
  }

  /**
   * 清理资源（dispose 模式）
   */
  dispose(): void {
    this.clear()
    this.tweensToRemove = []
  }
}

/**
 * 全局动画引擎实例
 */
export const engine = new AnimationEngine()

