/**
 * 动画序列组合器 - 轻松创建复杂的动画序列
 * 
 * @description
 * 提供串行、并行和混合动画组合功能，支持链式调用。
 * 
 * @module
 */

import type { AnimationTarget, AnimationProps, AnimationOptions } from '../core/types'
import { Animation, to } from '../core/animation'
import { Timeline, createTimeline } from '../timeline/timeline'

/**
 * 序列项配置
 */
interface SequenceItem {
  target: AnimationTarget | string
  props: AnimationProps
  options?: AnimationOptions
}

/**
 * 动画序列器类
 * 
 * @example
 * ```typescript
 * import { createSequence } from '@ldesign/animation'
 * 
 * // 串行动画
 * createSequence()
 *   .then('.box1', { x: 100 })
 *   .then('.box2', { y: 100 })
 *   .then('.box3', { scale: 1.5 })
 *   .play()
 * 
 * // 并行动画
 * createSequence()
 *   .all([
 *     { target: '.box1', props: { x: 100 } },
 *     { target: '.box2', props: { y: 100 } },
 *     { target: '.box3', props: { scale: 1.5 } }
 *   ])
 *   .play()
 * 
 * // 混合
 * createSequence()
 *   .then('.box1', { x: 100 })
 *   .all([
 *     { target: '.box2', props: { y: 100 } },
 *     { target: '.box3', props: { scale: 1.5 } }
 *   ])
 *   .then('.box4', { opacity: 0 })
 *   .play()
 * ```
 */
export class AnimationSequence {
  private timeline: Timeline
  private items: SequenceItem[] = []

  constructor() {
    this.timeline = createTimeline()
  }

  /**
   * 串行：添加一个动画（等待前一个完成）
   * 
   * @param target - 目标元素
   * @param props - 动画属性
   * @param options - 动画选项
   * 
   * @returns 返回 this 以支持链式调用
   */
  then(
    target: AnimationTarget | string,
    props: AnimationProps,
    options?: AnimationOptions
  ): this {
    this.timeline.to(target, props, options, '>')
    return this
  }

  /**
   * 并行：添加一组同时执行的动画
   * 
   * @param items - 动画项数组
   * 
   * @returns 返回 this 以支持链式调用
   */
  all(items: SequenceItem[]): this {
    items.forEach((item, index) => {
      const position = index === 0 ? '>' : '<'
      this.timeline.to(item.target, item.props, item.options, position)
    })
    return this
  }

  /**
   * 延迟：添加一个延迟
   * 
   * @param duration - 延迟时长（毫秒）
   * 
   * @returns 返回 this 以支持链式调用
   */
  wait(duration: number): this {
    this.timeline.addLabel(`wait-${Date.now()}`, `+=${duration}`)
    return this
  }

  /**
   * 标签：添加时间标签
   * 
   * @param name - 标签名称
   * 
   * @returns 返回 this 以支持链式调用
   */
  label(name: string): this {
    this.timeline.addLabel(name)
    return this
  }

  /**
   * 重复：重复整个序列
   * 
   * @param count - 重复次数（-1 为无限循环）
   * 
   * @returns 返回 this 以支持链式调用
   */
  repeat(count: number): this {
    // 注意：Timeline 暂不支持整体重复，这里保留接口
    console.warn('Sequence repeat is not fully implemented yet')
    return this
  }

  /**
   * 播放序列
   */
  play(): Timeline {
    return this.timeline.play()
  }

  /**
   * 暂停序列
   */
  pause(): Timeline {
    return this.timeline.pause()
  }

  /**
   * 停止序列
   */
  stop(): Timeline {
    return this.timeline.stop()
  }

  /**
   * 反向播放
   */
  reverse(): Timeline {
    return this.timeline.reverse()
  }

  /**
   * 跳转到标签
   * 
   * @param labelName - 标签名称
   */
  seek(labelName: string): Timeline {
    return this.timeline.seek(labelName)
  }

  /**
   * 获取时间轴
   */
  getTimeline(): Timeline {
    return this.timeline
  }

  /**
   * 清空序列
   */
  clear(): this {
    this.timeline.clear()
    this.items = []
    return this
  }
}

/**
 * 创建动画序列
 * 
 * @example
 * ```typescript
 * const seq = createSequence()
 *   .then('.box1', { x: 100 })
 *   .wait(500)
 *   .then('.box2', { y: 100 })
 *   .play()
 * ```
 */
export function createSequence(): AnimationSequence {
  return new AnimationSequence()
}

/**
 * 快捷方法：串行动画
 * 
 * @param items - 动画项数组
 * 
 * @example
 * ```typescript
 * sequence([
 *   { target: '.box1', props: { x: 100 } },
 *   { target: '.box2', props: { y: 100 } },
 *   { target: '.box3', props: { scale: 1.5 } }
 * ])
 * ```
 */
export function sequence(items: SequenceItem[]): Timeline {
  const seq = createSequence()
  items.forEach(item => {
    seq.then(item.target, item.props, item.options)
  })
  return seq.play()
}

/**
 * 快捷方法：并行动画
 * 
 * @param items - 动画项数组
 * 
 * @example
 * ```typescript
 * parallel([
 *   { target: '.box1', props: { x: 100 } },
 *   { target: '.box2', props: { y: 100 } },
 *   { target: '.box3', props: { scale: 1.5 } }
 * ])
 * ```
 */
export function parallel(items: SequenceItem[]): Timeline {
  const seq = createSequence()
  seq.all(items)
  return seq.play()
}

/**
 * 快捷方法：交错动画（stagger）
 * 
 * @param targets - 目标元素数组或选择器
 * @param props - 动画属性
 * @param options - 动画选项
 * @param stagger - 交错延迟（毫秒）
 * 
 * @example
 * ```typescript
 * // 元素依次动画，每个延迟100ms
 * stagger('.item', { x: 100, opacity: 1 }, { duration: 500 }, 100)
 * ```
 */
export function stagger(
  targets: (AnimationTarget | string)[] | string,
  props: AnimationProps,
  options?: AnimationOptions,
  staggerDelay: number = 100
): Timeline {
  const seq = createSequence()

  // 如果是选择器，获取所有匹配的元素
  const elements = typeof targets === 'string'
    ? Array.from(document.querySelectorAll(targets))
    : targets

  elements.forEach((target, index) => {
    const delay = (options?.delay || 0) + index * staggerDelay
    seq.then(target, props, { ...options, delay })
  })

  return seq.play()
}


