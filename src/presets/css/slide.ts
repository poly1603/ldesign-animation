/**
 * Slide 滑动预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to } from '../../core/animation'

/**
 * 从上滑入
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideInUp(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 从下滑入
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideInDown(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: -distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 从左滑入
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideInLeft(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return from(
    target,
    { x: -distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 从右滑入
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideInRight(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return from(
    target,
    { x: distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 向上滑出
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideOutUp(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return to(
    target,
    { y: -distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 向下滑出
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideOutDown(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return to(
    target,
    { y: distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 向左滑出
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideOutLeft(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return to(
    target,
    { x: -distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 向右滑出
 * @param target - 目标元素
 * @param distance - 滑动距离（默认100px）
 * @param options - 动画选项
 */
export function slideOutRight(
  target: AnimationTarget | string,
  distance: number = 100,
  options?: AnimationOptions
) {
  return to(
    target,
    { x: distance, opacity: 0 },
    {
      duration: 400,
      easing: 'easeInCubic',
      ...options,
    }
  )
}






