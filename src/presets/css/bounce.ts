/**
 * Bounce 弹跳预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to } from '../../core/animation'

/**
 * 弹跳进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function bounceIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { scale: 0, opacity: 0 },
    {
      duration: 600,
      easing: 'easeOutBounce',
      ...options,
    }
  )
}

/**
 * 弹跳退出
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function bounceOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { scale: 0, opacity: 0 },
    {
      duration: 600,
      easing: 'easeInBack',
      ...options,
    }
  )
}

/**
 * 从上弹入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function bounceInUp(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: 100, opacity: 0 },
    {
      duration: 600,
      easing: 'easeOutBounce',
      ...options,
    }
  )
}

/**
 * 从下弹入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function bounceInDown(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: -100, opacity: 0 },
    {
      duration: 600,
      easing: 'easeOutBounce',
      ...options,
    }
  )
}






