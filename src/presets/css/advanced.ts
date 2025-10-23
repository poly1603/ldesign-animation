/**
 * 高级 CSS 预设动画
 * 提供更丰富的动画效果
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to, keyframes } from '../../core/animation'

/**
 * 滚动进入效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rollIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { x: -100, rotate: -120, opacity: 0 },
    {
      duration: 800,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 滚动退出效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rollOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { x: 100, rotate: 120, opacity: 0 },
    {
      duration: 800,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 光速进入效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function lightSpeedIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { x: '100%', skewX: -30, opacity: 0 },
      { x: 0, skewX: 20, opacity: 1 },
      { x: 0, skewX: -5, opacity: 1 },
      { x: 0, skewX: 0, opacity: 1 },
    ],
    {
      duration: 600,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 光速退出效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function lightSpeedOut(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { x: 0, skewX: 0, opacity: 1 },
      { x: 0, skewX: -20, opacity: 1 },
      { x: '100%', skewX: 30, opacity: 0 },
    ],
    {
      duration: 600,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 铰链效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function hinge(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotate: 0, transformOrigin: 'top left', opacity: 1 },
      { rotate: 80, transformOrigin: 'top left', opacity: 1 },
      { rotate: 60, transformOrigin: 'top left', opacity: 1 },
      { rotate: 80, transformOrigin: 'top left', opacity: 1 },
      { rotate: 60, transformOrigin: 'top left', opacity: 1, y: 0 },
      { y: 700, opacity: 0 },
    ],
    {
      duration: 2000,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 弹簧盒效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function jackInTheBox(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { scale: 0.1, rotate: 30, opacity: 0 },
      { scale: 0.5, rotate: -10 },
      { scale: 0.7, rotate: 3 },
      { scale: 1, rotate: 0, opacity: 1 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 欢呼效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function tada(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { scale: 1, rotate: 0 },
      { scale: 0.9, rotate: -3 },
      { scale: 0.9, rotate: -3 },
      { scale: 1.1, rotate: 3 },
      { scale: 1.1, rotate: -3 },
      { scale: 1.1, rotate: 3 },
      { scale: 1.1, rotate: -3 },
      { scale: 1.1, rotate: 3 },
      { scale: 1.1, rotate: -3 },
      { scale: 1, rotate: 0 },
    ],
    {
      duration: 1000,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 后退进入效果（从下）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backInDown(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: -100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeOutBack',
      ...options,
    }
  )
}

/**
 * 后退进入效果（从上）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backInUp(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { y: 100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeOutBack',
      ...options,
    }
  )
}

/**
 * 后退进入效果（从左）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backInLeft(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { x: -100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeOutBack',
      ...options,
    }
  )
}

/**
 * 后退进入效果（从右）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backInRight(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { x: 100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeOutBack',
      ...options,
    }
  )
}

/**
 * 后退退出效果（向下）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backOutDown(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { y: 100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeInBack',
      ...options,
    }
  )
}

/**
 * 后退退出效果（向上）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function backOutUp(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(
    target,
    { y: -100, opacity: 0, scale: 0.7 },
    {
      duration: 800,
      easing: 'easeInBack',
      ...options,
    }
  )
}

/**
 * 注意力效果组合（闪烁+缩放）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function attention(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { opacity: 1, scale: 1 },
      { opacity: 0.8, scale: 1.05 },
      { opacity: 1, scale: 1 },
      { opacity: 0.8, scale: 1.05 },
      { opacity: 1, scale: 1 },
    ],
    {
      duration: 800,
      easing: 'easeInOutQuad',
      ...options,
    }
  )
}

/**
 * 掉落效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function drop(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0.8 },
      { y: 200, opacity: 0.5 },
      { y: 300, opacity: 0 },
    ],
    {
      duration: 1000,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 弹起效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function rise(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { y: 300, opacity: 0 },
      { y: 200, opacity: 0.5 },
      { y: 100, opacity: 0.8 },
      { y: 0, opacity: 1 },
    ],
    {
      duration: 1000,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 漂浮效果（持续）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function floating(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { y: 0 },
      { y: -20 },
      { y: 0 },
    ],
    {
      duration: 2000,
      easing: 'easeInOutQuad',
      repeat: -1,
      ...options,
    }
  )
}

/**
 * 闪烁进入效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function blinkIn(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 },
      { opacity: 1 },
    ],
    {
      duration: 600,
      easing: 'linear',
      ...options,
    }
  )
}

/**
 * 旋转跳跃效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function spinJump(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotate: 0, y: 0 },
      { rotate: 180, y: -50 },
      { rotate: 360, y: 0 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

