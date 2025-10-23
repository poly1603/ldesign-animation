/**
 * 动画引擎 - 基于 RAF 的全局动画管理器（优化版）
 */

import type { ITween, IAnimationEngine } from './types'
import { willChangeManager } from './will-change'

/**
 * 动画引擎类 - 单例模式（优化版）
 */
class AnimationEngine implements IAnimationEngine {
  private tweens: Set<ITween> = new Set()
  private rafId: number | null = null
  private running: boolean = false
  private lastTime: number = 0
  private frameCount: number = 0
  private fps: number = 60

  /**
   * 添加补间动画到引擎
   */
  add(tween: ITween): void {
    this.tweens.add(tween)
    if (!this.running) {
      this.start()
    }
  }

  /**
   * 从引擎移除补间动画
   */
  remove(tween: ITween): void {
    this.tweens.delete(tween)
    if (this.tweens.size === 0) {
      this.stop()
    }
  }

  /**
   * 启动引擎
   */
  start(): void {
    if (this.running) return

    this.running = true
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
   * 检查引擎是否运行中
   */
  isRunning(): boolean {
    return this.running
  }

  /**
   * RAF 循环（优化版）
   */
  private tick = () => {
    if (!this.running) return

    const currentTime = performance.now()

    // 计算 FPS（用于监控）
    if (this.lastTime > 0) {
      const delta = currentTime - this.lastTime
      this.frameCount++
      if (this.frameCount % 60 === 0) {
        this.fps = Math.round(1000 / delta)
      }
    }
    this.lastTime = currentTime

    const tweensToRemove: ITween[] = []

    // 批量读取（减少布局抖动）
    const updates: Array<{ tween: ITween; shouldContinue: boolean }> = []

    this.tweens.forEach((tween) => {
      const shouldContinue = tween.update(currentTime)
      updates.push({ tween, shouldContinue })
    })

    // 批量处理移除
    updates.forEach(({ tween, shouldContinue }) => {
      if (!shouldContinue) {
        tweensToRemove.push(tween)
      }
    })

    // 移除已完成的动画
    tweensToRemove.forEach((tween) => {
      this.remove(tween)
    })

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
  getStats() {
    return {
      activeAnimations: this.tweens.size,
      fps: this.fps,
      frameCount: this.frameCount,
      isRunning: this.running,
    }
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
}

/**
 * 全局动画引擎实例
 */
export const engine = new AnimationEngine()

