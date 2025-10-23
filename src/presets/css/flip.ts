/**
 * Flip 翻转预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to } from '../../core/animation'

/**
 * X 轴翻转进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function flipInX(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { rotateX: -90, opacity: 0 },
    {
      duration: 500,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * X 轴翻转退出
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function flipOutX(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { rotateX: 90, opacity: 0 },
    {
      duration: 500,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * Y 轴翻转进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function flipInY(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { rotateY: -90, opacity: 0 },
    {
      duration: 500,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * Y 轴翻转退出
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function flipOutY(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { rotateY: 90, opacity: 0 },
    {
      duration: 500,
      easing: 'easeInCubic',
      ...options,
    }
  )
}






