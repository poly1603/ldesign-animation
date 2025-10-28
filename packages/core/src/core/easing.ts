/**
 * 缓动函数集合
 * @packageDocumentation
 */

import type { EasingFunction, EasingName } from '../types'

/**
 * 线性缓动
 */
export const linear: EasingFunction = (t) => t

/**
 * Quad 缓动
 */
export const easeInQuad: EasingFunction = (t) => t * t
export const easeOutQuad: EasingFunction = (t) => t * (2 - t)
export const easeInOutQuad: EasingFunction = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

/**
 * Cubic 缓动
 */
export const easeInCubic: EasingFunction = (t) => t * t * t
export const easeOutCubic: EasingFunction = (t) => (--t) * t * t + 1
export const easeInOutCubic: EasingFunction = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

/**
 * Quart 缓动
 */
export const easeInQuart: EasingFunction = (t) => t * t * t * t
export const easeOutQuart: EasingFunction = (t) => 1 - (--t) * t * t * t
export const easeInOutQuart: EasingFunction = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t

/**
 * Quint 缓动
 */
export const easeInQuint: EasingFunction = (t) => t * t * t * t * t
export const easeOutQuint: EasingFunction = (t) => 1 + (--t) * t * t * t * t
export const easeInOutQuint: EasingFunction = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t

/**
 * Expo 缓动
 */
export const easeInExpo: EasingFunction = (t) =>
  t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
export const easeOutExpo: EasingFunction = (t) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
export const easeInOutExpo: EasingFunction = (t) => {
  if (t === 0 || t === 1) return t
  if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2
  return (2 - Math.pow(2, -20 * t + 10)) / 2
}

/**
 * Circ 缓动
 */
export const easeInCirc: EasingFunction = (t) => 1 - Math.sqrt(1 - t * t)
export const easeOutCirc: EasingFunction = (t) => Math.sqrt(1 - (--t) * t)
export const easeInOutCirc: EasingFunction = (t) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2

/**
 * Back 缓动
 */
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1

export const easeInBack: EasingFunction = (t) => c3 * t * t * t - c1 * t * t
export const easeOutBack: EasingFunction = (t) =>
  1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
export const easeInOutBack: EasingFunction = (t) =>
  t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2

/**
 * Elastic 缓动
 */
const c4 = (2 * Math.PI) / 3
const c5 = (2 * Math.PI) / 4.5

export const easeInElastic: EasingFunction = (t) =>
  t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)

export const easeOutElastic: EasingFunction = (t) =>
  t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1

export const easeInOutElastic: EasingFunction = (t) => {
  if (t === 0 || t === 1) return t
  return t < 0.5
    ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
}

/**
 * Bounce 缓动
 */
const bounceOut: EasingFunction = (t) => {
  const n1 = 7.5625
  const d1 = 2.75

  if (t < 1 / d1) {
    return n1 * t * t
  }
  else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75
  }
  else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375
  }
  else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  }
}

export const easeInBounce: EasingFunction = (t) => 1 - bounceOut(1 - t)
export const easeOutBounce: EasingFunction = bounceOut
export const easeInOutBounce: EasingFunction = (t) =>
  t < 0.5 ? (1 - bounceOut(1 - 2 * t)) / 2 : (1 + bounceOut(2 * t - 1)) / 2

/**
 * 所有缓动函数映射
 */
export const easingFunctions: Record<EasingName, EasingFunction> = {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
}

/**
 * 获取缓动函数
 * 
 * @param easing - 缓动函数名称或自定义函数
 * @returns 缓动函数
 */
export function getEasingFunction(easing?: EasingName | EasingFunction | string): EasingFunction {
  if (typeof easing === 'function') {
    return easing
  }

  if (typeof easing === 'string' && easing in easingFunctions) {
    return easingFunctions[easing as EasingName]
  }

  // 默认使用 easeOutExpo
  return easeOutExpo
}

