/**
 * 核心动画引擎
 */

import type { Animation, AnimationOptions } from '../types'

/**
 * 创建动画实例
 * 
 * @param options - 动画配置选项
 * @returns 动画实例
 * @example
 * ```typescript
 * const animation = animate({
 *   targets: '.box',
 *   translateX: 250,
 *   duration: 1000,
 *   easing: 'easeOutExpo'
 * })
 * ```
 */
export function animate(options: AnimationOptions): Animation {
  // TODO: 实现动画引擎
  console.log('Creating animation with options:', options)

  return {
    play() {
      console.log('Animation play')
      return this
    },
    pause() {
      console.log('Animation pause')
      return this
    },
    restart() {
      console.log('Animation restart')
      return this
    },
    reverse() {
      console.log('Animation reverse')
      return this
    },
    seek(time: number) {
      console.log('Animation seek:', time)
      return this
    },
    seekProgress(progress: number) {
      console.log('Animation seekProgress:', progress)
      return this
    },
    cancel() {
      console.log('Animation cancel')
    },
    finish() {
      console.log('Animation finish')
    },
    get playing() {
      return false
    },
    get progress() {
      return 0
    },
    get currentTime() {
      return 0
    },
    get duration() {
      return options.duration ?? 1000
    },
  }
}

/**
 * 动画引擎类
 */
export class AnimationEngine {
  private animations: Set<Animation> = new Set()
  private rafId: number | null = null
  private lastTime = 0

  /**
   * 添加动画到引擎
   */
  add(animation: Animation): void {
    this.animations.add(animation)
    this.start()
  }

  /**
   * 从引擎移除动画
   */
  remove(animation: Animation): void {
    this.animations.delete(animation)
    if (this.animations.size === 0) {
      this.stop()
    }
  }

  /**
   * 启动引擎
   */
  private start(): void {
    if (!this.rafId) {
      this.lastTime = performance.now()
      this.tick()
    }
  }

  /**
   * 停止引擎
   */
  private stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * 动画循环
   */
  private tick = (): void => {
    const currentTime = performance.now()
    const deltaTime = currentTime - this.lastTime
    this.lastTime = currentTime

    // TODO: 更新所有动画
    console.log('Tick:', deltaTime)

    if (this.animations.size > 0) {
      this.rafId = requestAnimationFrame(this.tick)
    }
    else {
      this.rafId = null
    }
  }

  /**
   * 清理所有动画
   */
  clear(): void {
    this.animations.clear()
    this.stop()
  }
}

/**
 * 全局动画引擎实例
 */
export const globalEngine = new AnimationEngine()

