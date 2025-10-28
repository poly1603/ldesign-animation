/**
 * 时间轴类
 */

import type { Animation, AnimationOptions, TimelineOptions } from '../types'
import { animate } from '../core/engine'

/**
 * 时间轴动画类
 * 
 * @example
 * ```typescript
 * const timeline = new Timeline()
 * 
 * timeline
 *   .add({ targets: '.box1', translateX: 250, duration: 1000 })
 *   .add({ targets: '.box2', translateY: 250, duration: 1000 }, '-=500')
 *   .play()
 * ```
 */
export class Timeline {
  private animations: Array<{ animation: Animation; offset: number }> = []
  private currentTime = 0
  private _duration = 0
  private _playing = false

  constructor(private options: TimelineOptions = {}) { }

  /**
   * 添加动画到时间轴
   * 
   * @param animationOptions - 动画配置
   * @param offset - 时间偏移（可选）
   *   - 数字: 从时间轴开始的绝对时间
   *   - "+={value}": 相对于上一个动画结束的延迟
   *   - "-={value}": 相对于上一个动画结束的提前
   *   - "<": 与上一个动画同时开始
   *   - ">": 在上一个动画结束后开始
   * @returns this
   */
  add(animationOptions: AnimationOptions, offset: string | number = '>'): this {
    const animation = animate({ ...animationOptions, autoplay: false })

    let absoluteOffset = 0

    if (typeof offset === 'number') {
      absoluteOffset = offset
    }
    else if (offset === '<') {
      // 与上一个动画同时开始
      if (this.animations.length > 0) {
        absoluteOffset = this.animations[this.animations.length - 1].offset
      }
    }
    else if (offset === '>') {
      // 在上一个动画结束后开始（默认）
      absoluteOffset = this._duration
    }
    else if (offset.startsWith('+=')) {
      // 相对延迟
      const delay = Number.parseFloat(offset.substring(2))
      absoluteOffset = this._duration + delay
    }
    else if (offset.startsWith('-=')) {
      // 相对提前
      const advance = Number.parseFloat(offset.substring(2))
      absoluteOffset = Math.max(0, this._duration - advance)
    }

    this.animations.push({ animation, offset: absoluteOffset })
    this._duration = Math.max(this._duration, absoluteOffset + animation.duration)

    return this
  }

  /**
   * 播放时间轴
   */
  play(): this {
    this._playing = true
    this.options.onStart?.()

    // TODO: 实现播放逻辑
    console.log('Timeline play')

    return this
  }

  /**
   * 暂停时间轴
   */
  pause(): this {
    this._playing = false
    console.log('Timeline pause')
    return this
  }

  /**
   * 重新开始
   */
  restart(): this {
    this.currentTime = 0
    return this.play()
  }

  /**
   * 反向播放
   */
  reverse(): this {
    // TODO: 实现反向播放
    console.log('Timeline reverse')
    return this
  }

  /**
   * 跳转到指定时间
   */
  seek(time: number): this {
    this.currentTime = time
    // TODO: 更新所有动画状态
    return this
  }

  /**
   * 是否正在播放
   */
  get playing(): boolean {
    return this._playing
  }

  /**
   * 时间轴总时长
   */
  get duration(): number {
    return this._duration
  }

  /**
   * 当前进度 (0-1)
   */
  get progress(): number {
    return this._duration > 0 ? this.currentTime / this._duration : 0
  }

  /**
   * 清除所有动画
   */
  clear(): void {
    this.animations = []
    this._duration = 0
    this.currentTime = 0
    this._playing = false
  }
}

