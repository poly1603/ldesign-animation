/**
 * Zoom 缩放预设动画
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to } from '../../core/animation'

/**
 * 放大进入
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function zoomIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { scale: 0, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 缩小退出
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function zoomOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { scale: 0, opacity: 0 },
    {
      duration: 400,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 放大进入（从上方）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function zoomInUp(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { scale: 0, y: 50, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 放大进入（从下方）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function zoomInDown(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { scale: 0, y: -50, opacity: 0 },
    {
      duration: 400,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}






