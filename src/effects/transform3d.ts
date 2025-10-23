/**
 * 3D 变换动画系统
 * 提供丰富的 3D 动画效果
 */

import type { AnimationTarget, AnimationOptions } from '../core/types'
import { keyframes, to, from } from '../core/animation'

/**
 * 3D 旋转动画
 * @param target - 目标元素
 * @param axis - 旋转轴 'x' | 'y' | 'z' | 'xyz'
 * @param degrees - 旋转角度
 * @param options - 动画选项
 */
export function rotate3D(
  target: AnimationTarget | string,
  axis: 'x' | 'y' | 'z' | 'xyz' = 'y',
  degrees: number = 360,
  options?: AnimationOptions
) {
  const props: any = {}

  if (axis === 'xyz') {
    props.rotateX = degrees
    props.rotateY = degrees
    props.rotateZ = degrees
  } else {
    props[`rotate${axis.toUpperCase()}`] = degrees
  }

  return to(target, props, {
    duration: 1000,
    easing: 'easeInOutCubic',
    ...options,
  })
}

/**
 * 3D 翻转效果
 * @param target - 目标元素
 * @param axis - 翻转轴 'x' | 'y'
 * @param options - 动画选项
 */
export function flip3D(
  target: AnimationTarget | string,
  axis: 'x' | 'y' = 'y',
  options?: AnimationOptions
) {
  const prop = axis === 'x' ? 'rotateX' : 'rotateY'

  return keyframes(
    target,
    [
      { [prop]: 0, opacity: 1 },
      { [prop]: 90, opacity: 0.5 },
      { [prop]: 180, opacity: 1 },
    ],
    {
      duration: 800,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 立方体旋转效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function cube3D(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateX: 0, rotateY: 0 },
      { rotateX: 90, rotateY: 90 },
      { rotateX: 180, rotateY: 180 },
      { rotateX: 270, rotateY: 270 },
      { rotateX: 360, rotateY: 360 },
    ],
    {
      duration: 2000,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 透视变换动画
 * @param target - 目标元素
 * @param perspective - 透视值（像素）
 * @param options - 动画选项
 */
export function perspective(
  target: AnimationTarget | string,
  perspective: number = 1000,
  options?: AnimationOptions
) {
  return to(target, { perspective }, {
    duration: 800,
    easing: 'easeOutCubic',
    ...options,
  })
}

/**
 * 折叠效果（3D）
 * @param target - 目标元素
 * @param direction - 折叠方向 'horizontal' | 'vertical'
 * @param options - 动画选项
 */
export function fold3D(
  target: AnimationTarget | string,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  options?: AnimationOptions
) {
  const prop = direction === 'horizontal' ? 'rotateY' : 'rotateX'

  return keyframes(
    target,
    [
      { [prop]: 0, opacity: 1, scaleX: 1, scaleY: 1 },
      { [prop]: -90, opacity: 0.5, scaleX: 0.8, scaleY: 0.8 },
      { [prop]: -180, opacity: 0, scaleX: 0.5, scaleY: 0.5 },
    ],
    {
      duration: 800,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 展开效果（3D）
 * @param target - 目标元素
 * @param direction - 展开方向 'horizontal' | 'vertical'
 * @param options - 动画选项
 */
export function unfold3D(
  target: AnimationTarget | string,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  options?: AnimationOptions
) {
  const prop = direction === 'horizontal' ? 'rotateY' : 'rotateX'

  return keyframes(
    target,
    [
      { [prop]: -180, opacity: 0, scaleX: 0.5, scaleY: 0.5 },
      { [prop]: -90, opacity: 0.5, scaleX: 0.8, scaleY: 0.8 },
      { [prop]: 0, opacity: 1, scaleX: 1, scaleY: 1 },
    ],
    {
      duration: 800,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 门打开效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function doorOpen(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateY: 0, transformOrigin: '0% 50%' },
      { rotateY: -90, transformOrigin: '0% 50%' },
    ],
    {
      duration: 600,
      easing: 'easeOutCubic',
      ...options,
    }
  )
}

/**
 * 门关闭效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function doorClose(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateY: -90, transformOrigin: '0% 50%' },
      { rotateY: 0, transformOrigin: '0% 50%' },
    ],
    {
      duration: 600,
      easing: 'easeInCubic',
      ...options,
    }
  )
}

/**
 * 书页翻转效果
 * @param target - 目标元素
 * @param options - 动画选项
 */
export function pageFlip(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateY: 0, transformOrigin: '0% 50%' },
      { rotateY: -180, transformOrigin: '0% 50%' },
    ],
    {
      duration: 1000,
      easing: 'easeInOutCubic',
      ...options,
    }
  )
}

/**
 * 卡片翻转效果
 * @param target - 目标元素  
 * @param options - 动画选项
 */
export function cardFlip(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  return keyframes(
    target,
    [
      { rotateY: 0, scale: 1 },
      { rotateY: 90, scale: 0.95 },
      { rotateY: 180, scale: 1 },
    ],
    {
      duration: 600,
      easing: 'easeInOutQuad',
      ...options,
    }
  )
}

