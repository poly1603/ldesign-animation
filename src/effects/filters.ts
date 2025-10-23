/**
 * CSS 滤镜动画系统
 * 提供各种滤镜效果的动画
 */

import type { AnimationTarget, AnimationOptions } from '../core/types'
import { to, from, keyframes } from '../core/animation'

/**
 * 模糊效果动画
 * @param target - 目标元素
 * @param amount - 模糊量（像素）
 * @param options - 动画选项
 */
export function blur(
  target: AnimationTarget | string,
  amount: number = 10,
  options?: AnimationOptions
) {
  return to(target, { filter: `blur(${amount}px)` }, {
    duration: 600,
    easing: 'easeOutCubic',
    ...options,
  })
}

/**
 * 亮度调节动画
 * @param target - 目标元素
 * @param level - 亮度级别（0-2，1为正常）
 * @param options - 动画选项
 */
export function brightness(
  target: AnimationTarget | string,
  level: number = 1.5,
  options?: AnimationOptions
) {
  return to(target, { filter: `brightness(${level})` }, {
    duration: 600,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 对比度动画
 * @param target - 目标元素
 * @param level - 对比度级别（0-2，1为正常）
 * @param options - 动画选项
 */
export function contrast(
  target: AnimationTarget | string,
  level: number = 1.5,
  options?: AnimationOptions
) {
  return to(target, { filter: `contrast(${level})` }, {
    duration: 600,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 饱和度动画
 * @param target - 目标元素
 * @param level - 饱和度级别（0-2，1为正常）
 * @param options - 动画选项
 */
export function saturate(
  target: AnimationTarget | string,
  level: number = 2,
  options?: AnimationOptions
) {
  return to(target, { filter: `saturate(${level})` }, {
    duration: 600,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 色相旋转动画
 * @param target - 目标元素
 * @param degrees - 旋转角度（0-360）
 * @param options - 动画选项
 */
export function hueRotate(
  target: AnimationTarget | string,
  degrees: number = 180,
  options?: AnimationOptions
) {
  return to(target, { filter: `hue-rotate(${degrees}deg)` }, {
    duration: 1000,
    easing: 'easeInOutCubic',
    ...options,
  })
}

/**
 * 灰度化动画
 * @param target - 目标元素
 * @param amount - 灰度量（0-1）
 * @param options - 动画选项
 */
export function grayscale(
  target: AnimationTarget | string,
  amount: number = 1,
  options?: AnimationOptions
) {
  return to(target, { filter: `grayscale(${amount})` }, {
    duration: 800,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 怀旧色调动画
 * @param target - 目标元素
 * @param amount - 怀旧量（0-1）
 * @param options - 动画选项
 */
export function sepia(
  target: AnimationTarget | string,
  amount: number = 1,
  options?: AnimationOptions
) {
  return to(target, { filter: `sepia(${amount})` }, {
    duration: 800,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 投影动画
 * @param target - 目标元素
 * @param x - 水平偏移
 * @param y - 垂直偏移
 * @param blur - 模糊半径
 * @param color - 阴影颜色
 * @param options - 动画选项
 */
export function dropShadow(
  target: AnimationTarget | string,
  x: number = 10,
  y: number = 10,
  blur: number = 5,
  color: string = 'rgba(0,0,0,0.5)',
  options?: AnimationOptions
) {
  return to(target, { filter: `drop-shadow(${x}px ${y}px ${blur}px ${color})` }, {
    duration: 600,
    easing: 'easeOutCubic',
    ...options,
  })
}

/**
 * 反色动画
 * @param target - 目标元素
 * @param amount - 反色量（0-1）
 * @param options - 动画选项
 */
export function invert(
  target: AnimationTarget | string,
  amount: number = 1,
  options?: AnimationOptions
) {
  return to(target, { filter: `invert(${amount})` }, {
    duration: 600,
    easing: 'easeInOutQuad',
    ...options,
  })
}

/**
 * 闪光效果（组合滤镜）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function flashEffect(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { filter: 'brightness(1) saturate(1)' },
      { filter: 'brightness(2) saturate(2)' },
      { filter: 'brightness(1) saturate(1)' },
    ],
    {
      duration: 400,
      easing: 'linear',
      ...options,
    }
  )
}

/**
 * 聚焦效果（从模糊到清晰）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function focusEffect(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return from(target, { filter: 'blur(20px)' }, {
    duration: 1000,
    easing: 'easeOutCubic',
    ...options,
  })
}

/**
 * 失焦效果（从清晰到模糊）
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function unfocusEffect(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return to(target, { filter: 'blur(20px)' }, {
    duration: 1000,
    easing: 'easeInCubic',
    ...options,
  })
}

/**
 * 彩色闪烁效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function colorFlicker(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { filter: 'hue-rotate(0deg)' },
      { filter: 'hue-rotate(90deg)' },
      { filter: 'hue-rotate(180deg)' },
      { filter: 'hue-rotate(270deg)' },
      { filter: 'hue-rotate(360deg)' },
    ],
    {
      duration: 1000,
      easing: 'linear',
      repeat: -1,
      ...options,
    }
  )
}

/**
 * 组合滤镜动画
 * @param target - 目标元素
 * @param filters - 滤镜配置
 * @param options - 动画选项
 */
export function combineFilters(
  target: AnimationTarget | string,
  filters: {
    blur?: number
    brightness?: number
    contrast?: number
    saturate?: number
    hueRotate?: number
    grayscale?: number
    sepia?: number
    invert?: number
  },
  options?: AnimationOptions
) {
  const filterParts: string[] = []

  if (filters.blur !== undefined) filterParts.push(`blur(${filters.blur}px)`)
  if (filters.brightness !== undefined) filterParts.push(`brightness(${filters.brightness})`)
  if (filters.contrast !== undefined) filterParts.push(`contrast(${filters.contrast})`)
  if (filters.saturate !== undefined) filterParts.push(`saturate(${filters.saturate})`)
  if (filters.hueRotate !== undefined) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`)
  if (filters.grayscale !== undefined) filterParts.push(`grayscale(${filters.grayscale})`)
  if (filters.sepia !== undefined) filterParts.push(`sepia(${filters.sepia})`)
  if (filters.invert !== undefined) filterParts.push(`invert(${filters.invert})`)

  return to(target, { filter: filterParts.join(' ') }, {
    duration: 800,
    easing: 'easeInOutCubic',
    ...options,
  })
}

