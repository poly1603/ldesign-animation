/**
 * Fade 淡入淡出预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { to, from } from '../../core/animation'

/**
 * 淡入动画
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function fadeIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { opacity: 0 },
    {
      duration: 300,
      easing: 'easeOutQuad',
      ...options,
    }
  )
}

/**
 * 淡出动画
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function fadeOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { opacity: 0 },
    {
      duration: 300,
      easing: 'easeInQuad',
      ...options,
    }
  )
}






