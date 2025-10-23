/**
 * Timeline 时间轴动画
 */

import type { AnimationTarget, AnimationProps, AnimationOptions } from '../core/types'
import type { TimelineItem, TimePosition, TimelineState } from './types'
import { Animation } from '../core/animation'
import { LabelManager } from './label'

/**
 * Timeline 类
 */
export class Timeline {
  private items: TimelineItem[] = []
  private labels: LabelManager = new LabelManager()
  private currentTime: number = 0
  private totalDuration: number = 0
  private state: TimelineState = 'idle' as any
  private startTime: number = 0
  private pauseTime: number = 0
  private _timeScale: number = 1
  private rafId: number | null = null
  private activeAnimations: Animation[] = []

  // 回调
  private onStart?: () => void
  private onUpdate?: (progress: number) => void
  private onComplete?: () => void

  constructor(options?: {
    onStart?: () => void
    onUpdate?: (progress: number) => void
    onComplete?: () => void
  }) {
    this.onStart = options?.onStart
    this.onUpdate = options?.onUpdate
    this.onComplete = options?.onComplete
  }

  /**
   * 添加动画到指定时间位置
   * @param target - 目标元素
   * @param props - 动画属性
   * @param position - 时间位置
   */
  to(
    target: AnimationTarget | string,
    props: AnimationProps,
    position?: TimePosition
  ): this
  to(
    target: AnimationTarget | string,
    props: AnimationProps,
    options?: AnimationOptions,
    position?: TimePosition
  ): this
  to(
    target: AnimationTarget | string,
    props: AnimationProps,
    optionsOrPosition?: AnimationOptions | TimePosition,
    position?: TimePosition
  ): this {
    let options: AnimationOptions = {}
    let pos: TimePosition = '>'

    if (typeof optionsOrPosition === 'object') {
      options = optionsOrPosition
      pos = position ?? '>'
    } else {
      pos = optionsOrPosition ?? '>'
    }

    return this.add(target, props, options, pos)
  }

  /**
   * 从起始值添加动画
   * @param target - 目标元素
   * @param props - 起始属性
   * @param position - 时间位置
   */
  from(
    target: AnimationTarget | string,
    props: AnimationProps,
    options?: AnimationOptions,
    position?: TimePosition
  ): this {
    // 将 from 转换为 to（需要记录当前值作为目标值）
    return this.add(target, props, { ...options }, position ?? '>', true)
  }

  /**
   * 从起始值到结束值添加动画
   * @param target - 目标元素
   * @param fromProps - 起始属性
   * @param toProps - 目标属性
   * @param position - 时间位置
   */
  fromTo(
    target: AnimationTarget | string,
    fromProps: AnimationProps,
    toProps: AnimationProps,
    options?: AnimationOptions,
    position?: TimePosition
  ): this {
    return this.add(target, toProps, { ...options }, position ?? '>', false, fromProps)
  }

  /**
   * 添加动画项（内部方法）
   */
  private add(
    target: AnimationTarget | string,
    props: AnimationProps,
    options: AnimationOptions = {},
    position: TimePosition = '>',
    isFrom: boolean = false,
    fromProps?: AnimationProps
  ): this {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) {
      console.warn(`Target element not found: ${target}`)
      return this
    }

    const duration = options.duration ?? 300
    const startTime = this.parsePosition(position)

    const item: TimelineItem = {
      target: element as AnimationTarget,
      props: isFrom ? fromProps || props : props,
      options: { ...options, duration },
      startTime,
      duration,
    }

    this.items.push(item)

    // 更新总时长
    const endTime = startTime + duration
    if (endTime > this.totalDuration) {
      this.totalDuration = endTime
    }

    return this
  }

  /**
   * 解析时间位置
   */
  private parsePosition(position: TimePosition): number {
    // 数字：绝对时间
    if (typeof position === 'number') {
      return position
    }

    // 字符串位置
    const pos = position.trim()

    // '<': 与上一个动画同时开始
    if (pos === '<') {
      return this.items.length > 0
        ? this.items[this.items.length - 1].startTime
        : 0
    }

    // '>': 与上一个动画结束时开始（默认）
    if (pos === '>' || pos === '') {
      return this.items.length > 0
        ? this.items[this.items.length - 1].startTime +
        this.items[this.items.length - 1].duration
        : 0
    }

    // '+=100': 相对于上一个结束后
    if (pos.startsWith('+=')) {
      const offset = parseFloat(pos.slice(2))
      return this.items.length > 0
        ? this.items[this.items.length - 1].startTime +
        this.items[this.items.length - 1].duration +
        offset
        : offset
    }

    // '-=100': 相对于上一个结束前
    if (pos.startsWith('-=')) {
      const offset = parseFloat(pos.slice(2))
      return this.items.length > 0
        ? this.items[this.items.length - 1].startTime +
        this.items[this.items.length - 1].duration -
        offset
        : 0
    }

    // 'label' 或 'label+=100'
    if (pos.includes('+=')) {
      const [label, offsetStr] = pos.split('+=')
      const labelTime = this.labels.get(label)
      const offset = parseFloat(offsetStr)
      return labelTime !== undefined ? labelTime + offset : 0
    }

    if (pos.includes('-=')) {
      const [label, offsetStr] = pos.split('-=')
      const labelTime = this.labels.get(label)
      const offset = parseFloat(offsetStr)
      return labelTime !== undefined ? labelTime - offset : 0
    }

    // 纯标签
    const labelTime = this.labels.get(pos)
    return labelTime !== undefined ? labelTime : 0
  }

  /**
   * 添加时间标签
   * @param name - 标签名称
   * @param position - 时间位置
   */
  addLabel(name: string, position?: TimePosition): this {
    const time = position !== undefined ? this.parsePosition(position) : this.totalDuration
    this.labels.add(name, time)
    return this
  }

  /**
   * 播放时间轴
   */
  play(): this {
    if (this.state === 'playing' as any) return this

    if (this.state === 'paused' as any) {
      // 从暂停恢复
      const pauseDuration = performance.now() - this.pauseTime
      this.startTime += pauseDuration
    } else {
      // 从头开始
      this.startTime = performance.now()
      this.currentTime = 0
      this.onStart?.()
    }

    this.state = 'playing' as any
    this.tick()
    return this
  }

  /**
   * 暂停时间轴
   */
  pause(): this {
    if (this.state !== 'playing' as any) return this

    this.state = 'paused' as any
    this.pauseTime = performance.now()

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    // 停止所有活动动画
    this.activeAnimations.forEach(anim => anim.stop())
    this.activeAnimations = []

    return this
  }

  /**
   * 重新开始
   */
  restart(): this {
    this.stop()
    return this.play()
  }

  /**
   * 停止时间轴
   */
  stop(): this {
    this.state = 'idle' as any
    this.currentTime = 0

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    // 停止所有活动动画
    this.activeAnimations.forEach(anim => anim.stop())
    this.activeAnimations = []

    return this
  }

  /**
   * 反向播放
   */
  reverse(): this {
    // TODO: 实现反向播放
    console.warn('Timeline.reverse() not implemented yet')
    return this
  }

  /**
   * 跳转到指定时间或标签
   * @param position - 时间位置或标签名
   */
  seek(position: number | string): this {
    const time = typeof position === 'string'
      ? this.labels.get(position) ?? 0
      : position

    this.currentTime = Math.max(0, Math.min(time, this.totalDuration))
    this.updateAnimations(this.currentTime)
    return this
  }

  /**
   * 设置或获取进度（0-1）
   */
  progress(value?: number): number | this {
    if (value === undefined) {
      return this.totalDuration > 0 ? this.currentTime / this.totalDuration : 0
    }

    const time = value * this.totalDuration
    return this.seek(time)
  }

  /**
   * 设置或获取播放速度
   */
  timeScale(value?: number): number | this {
    if (value === undefined) {
      return this._timeScale
    }

    this._timeScale = Math.max(0, value)
    return this
  }

  /**
   * 获取总时长
   */
  duration(): number {
    return this.totalDuration
  }

  /**
   * RAF 循环
   */
  private tick = () => {
    if (this.state !== 'playing' as any) return

    const elapsed = (performance.now() - this.startTime) * this._timeScale
    this.currentTime = elapsed

    // 更新动画
    this.updateAnimations(this.currentTime)

    // 触发更新回调
    this.onUpdate?.(this.progress() as number)

    // 检查是否完成
    if (this.currentTime >= this.totalDuration) {
      this.state = 'finished' as any
      this.onComplete?.()
      return
    }

    this.rafId = requestAnimationFrame(this.tick)
  }

  /**
   * 更新动画状态
   */
  private updateAnimations(time: number): void {
    // 清除所有活动动画
    this.activeAnimations.forEach(anim => anim.stop())
    this.activeAnimations = []

    // 启动所有应该在当前时间播放的动画
    this.items.forEach((item) => {
      if (time >= item.startTime && time < item.startTime + item.duration) {
        const localTime = time - item.startTime
        const animation = new Animation(item.target)

        // 启动动画并设置进度
        animation.to(item.props, {
          ...item.options,
          duration: item.duration - localTime,
        })

        this.activeAnimations.push(animation)
      }
    })
  }

  /**
   * 清空时间轴
   */
  clear(): this {
    this.stop()
    this.items = []
    this.labels.clear()
    this.totalDuration = 0
    this.currentTime = 0
    return this
  }
}

/**
 * 创建时间轴
 */
export function createTimeline(options?: {
  onStart?: () => void
  onUpdate?: (progress: number) => void
  onComplete?: () => void
}): Timeline {
  return new Timeline(options)
}

