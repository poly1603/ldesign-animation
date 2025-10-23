/**
 * Animation 核心类 - 提供统一的动画 API
 */

import type {
  AnimationTarget,
  AnimationProps,
  AnimationOptions,
  AnimationConfig,
  Keyframe,
} from './types'
import { Tween } from './tween'
import { engine } from './engine'
import { getProperty } from './property'

/**
 * Animation 类
 */
export class Animation {
  private target: AnimationTarget
  private tween: Tween | null = null

  constructor(target: AnimationTarget) {
    this.target = target
  }

  /**
   * 动画到目标值（从当前值到目标值）
   * @param props - 目标属性
   * @param options - 动画选项
   */
  to(props: AnimationProps, options?: AnimationOptions): this {
    return this.animate(props, options)
  }

  /**
   * 从起始值动画（从起始值到当前值）
   * @param props - 起始属性
   * @param options - 动画选项
   */
  from(props: AnimationProps, options?: AnimationOptions): this {
    // 先设置起始值，然后动画到当前值
    const currentValues: AnimationProps = {}

    for (const prop in props) {
      currentValues[prop] = getProperty(this.target, prop)
      // 立即设置为起始值
      const value = props[prop]
      const valueStr = Array.isArray(value) ? String(value[0]) : String(value)
        ; (this.target as HTMLElement).style[prop as any] = valueStr
    }

    return this.animate(currentValues, options)
  }

  /**
   * 从起始值到结束值动画
   * @param fromProps - 起始属性
   * @param toProps - 目标属性
   * @param options - 动画选项
   */
  fromTo(
    fromProps: AnimationProps,
    toProps: AnimationProps,
    options?: AnimationOptions
  ): this {
    // 先设置起始值
    for (const prop in fromProps) {
      const value = fromProps[prop]
      const valueStr = Array.isArray(value) ? String(value[0]) : String(value)
        ; (this.target as HTMLElement).style[prop as any] = valueStr
    }

    return this.animate(toProps, options)
  }

  /**
   * 关键帧动画
   * @param keyframes - 关键帧数组
   * @param options - 动画选项
   */
  keyframes(keyframes: Keyframe[], options?: AnimationOptions): this {
    if (keyframes.length < 2) {
      console.warn('Keyframes animation requires at least 2 keyframes')
      return this
    }

    const duration = options?.duration ?? 300
    const totalDuration = duration * (keyframes.length - 1)

    let currentIndex = 0

    const animateToNext = () => {
      if (currentIndex >= keyframes.length - 1) {
        options?.onComplete?.()
        return
      }

      const from = keyframes[currentIndex]
      const to = keyframes[currentIndex + 1]
      const props: AnimationProps = {}

      // 提取目标属性（排除 offset）
      for (const key in to) {
        if (key !== 'offset') {
          props[key] = to[key]
        }
      }

      // 设置起始值
      for (const key in from) {
        if (key !== 'offset') {
          const value = from[key]
          const valueStr = String(value)
            ; (this.target as HTMLElement).style[key as any] = valueStr
        }
      }

      currentIndex++

      this.animate(props, {
        ...options,
        duration,
        onComplete: animateToNext,
      })
    }

    animateToNext()
    return this
  }

  /**
   * 执行动画（内部方法）
   */
  private animate(props: AnimationProps, options?: AnimationOptions): this {
    // 停止当前动画
    this.stop()

    // 创建新的补间动画
    this.tween = new Tween(this.target, props, options)

    // 添加到引擎
    engine.add(this.tween)

    return this
  }

  /**
   * 停止动画
   */
  stop(): void {
    if (this.tween) {
      engine.remove(this.tween)
      this.tween = null
    }
  }

  /**
   * 获取目标元素
   */
  getTarget(): AnimationTarget {
    return this.target
  }
}

/**
 * 创建动画实例
 * @param target - 目标元素
 */
export function createAnimation(target: AnimationTarget): Animation {
  return new Animation(target)
}

/**
 * 快捷方法：动画到目标值
 * @param target - 目标元素
 * @param props - 目标属性
 * @param options - 动画选项
 */
export function to(
  target: AnimationTarget | string,
  props: AnimationProps,
  options?: AnimationOptions
): Animation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }
  return new Animation(element as AnimationTarget).to(props, options)
}

/**
 * 快捷方法：从起始值动画
 * @param target - 目标元素
 * @param props - 起始属性
 * @param options - 动画选项
 */
export function from(
  target: AnimationTarget | string,
  props: AnimationProps,
  options?: AnimationOptions
): Animation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }
  return new Animation(element as AnimationTarget).from(props, options)
}

/**
 * 快捷方法：从起始值到结束值动画
 * @param target - 目标元素
 * @param fromProps - 起始属性
 * @param toProps - 目标属性
 * @param options - 动画选项
 */
export function fromTo(
  target: AnimationTarget | string,
  fromProps: AnimationProps,
  toProps: AnimationProps,
  options?: AnimationOptions
): Animation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }
  return new Animation(element as AnimationTarget).fromTo(fromProps, toProps, options)
}

/**
 * 快捷方法：关键帧动画
 * @param target - 目标元素
 * @param keyframes - 关键帧数组
 * @param options - 动画选项
 */
export function keyframes(
  target: AnimationTarget | string,
  frames: Keyframe[],
  options?: AnimationOptions
): Animation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }
  return new Animation(element as AnimationTarget).keyframes(frames, options)
}

/**
 * 通用 animate 函数
 * @param target - 目标元素
 * @param config - 动画配置
 */
export function animate(
  target: AnimationTarget | string,
  config: AnimationConfig
): Animation {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }

  const animation = new Animation(element as AnimationTarget)

  if (config.keyframes) {
    return animation.keyframes(config.keyframes, config)
  } else if (config.props) {
    return animation.to(config.props, config)
  }

  return animation
}

