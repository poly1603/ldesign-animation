/**
 * 特殊预设动画 - 更丰富的效果
 */

import type { AnimationTarget, AnimationOptions } from '../../core/types'
import { from, to, keyframes } from '../../core/animation'

/**
 * 心跳动画
 */
export function heartbeat(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { scale: 1 },
      { scale: 1.3 },
      { scale: 1 },
      { scale: 1.3 },
      { scale: 1 },
    ],
    {
      duration: 300,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 摇晃动画
 */
export function shake(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { x: 0 },
      { x: -10 },
      { x: 10 },
      { x: -10 },
      { x: 10 },
      { x: -10 },
      { x: 0 },
    ],
    {
      duration: 200,
      easing: 'linear',
      ...options,
    }
  )
}

/**
 * 晃动动画
 */
export function wobble(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotate: 0, x: 0 },
      { rotate: -5, x: -5 },
      { rotate: 3, x: 3 },
      { rotate: -3, x: -3 },
      { rotate: 2, x: 2 },
      { rotate: 0, x: 0 },
    ],
    {
      duration: 500,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 闪烁动画
 */
export function flash(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { opacity: 1 },
      { opacity: 0 },
      { opacity: 1 },
      { opacity: 0 },
      { opacity: 1 },
    ],
    {
      duration: 200,
      easing: 'linear',
      ...options,
    }
  )
}

/**
 * 脉冲动画
 */
export function pulse(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { scale: 1 },
      { scale: 1.05 },
      { scale: 1 },
    ],
    {
      duration: 500,
      easing: 'easeInOutCubic',
      repeat: -1,
      ...options,
    }
  )
}

/**
 * 摆动动画
 */
export function swing(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotate: 0 },
      { rotate: 15 },
      { rotate: -10 },
      { rotate: 5 },
      { rotate: -5 },
      { rotate: 0 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 橡皮筋动画
 */
export function rubberBand(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { scaleX: 1, scaleY: 1 },
      { scaleX: 1.25, scaleY: 0.75 },
      { scaleX: 0.75, scaleY: 1.25 },
      { scaleX: 1.15, scaleY: 0.85 },
      { scaleX: 0.95, scaleY: 1.05 },
      { scaleX: 1, scaleY: 1 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 果冻动画
 */
export function jello(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { skewX: 0, skewY: 0 },
      { skewX: -12.5, skewY: -12.5 },
      { skewX: 6.25, skewY: 6.25 },
      { skewX: -3.125, skewY: -3.125 },
      { skewX: 1.5625, skewY: 1.5625 },
      { skewX: 0, skewY: 0 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 反弹动画（从底部）
 */
export function bounceInBounce(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1 },
      { y: -15 },
      { y: 0 },
      { y: -7 },
      { y: 0 },
    ],
    {
      duration: 1000,
      easing: 'linear',
      ...options,
    }
  )
}

/**
 * 翻转进入（带弹性）
 */
export function flipInWithBounce(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateY: -90, opacity: 0 },
      { rotateY: 20, opacity: 1 },
      { rotateY: -10 },
      { rotateY: 5 },
      { rotateY: 0 },
    ],
    {
      duration: 800,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 打字效果（按字符）
 */
export function typeEffect(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(
    target,
    { scaleX: 0, opacity: 0 },
    {
      duration: 100,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}



