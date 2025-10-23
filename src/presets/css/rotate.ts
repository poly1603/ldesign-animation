/**
 * Rotate 旋转预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to } from '../../core/animation'

/**
 * 旋转进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rotateIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { rotate: -180, scale: 0, opacity: 0 },
    {
      duration: 500,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 旋转退出
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rotateOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { rotate: 180, scale: 0, opacity: 0 },
    {
      duration: 500,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 顺时针旋转进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rotateInClockwise(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { rotate: -360, opacity: 0 },
    {
      duration: 600,
      easing: 'easeOutBack',
      ...options,
    }
  )
}

/**
 * 逆时针旋转进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rotateInCounterClockwise(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { rotate: 360, opacity: 0 },
    {
      duration: 600,
      easing: 'easeOutBack',
      ...options,
    }
  )
}






