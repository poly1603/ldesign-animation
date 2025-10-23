/**
 * 弹簧动画预设
 */

import type { AnimationTarget } from '../../core/types'
import { spring, springPresets, type SpringPresetName } from '../../physics/spring'

/**
 * 使用预设弹簧动画
 * @param target - 目标元素
 * @param prop - 属性名
 * @param to - 目标值
 * @param preset - 预设名称
 */
export function springTo(
  target: AnimationTarget | string,
  prop: string,
  to: number,
  preset: SpringPresetName = 'gentle'
) {
  return spring(target, prop, to, springPresets[preset])
}

/**
 * 柔和弹簧
 */
export function gentleSpring(
  target: AnimationTarget | string,
  prop: string,
  to: number
) {
  return spring(target, prop, to, springPresets.gentle)
}

/**
 * 活泼弹簧
 */
export function wobblySpring(
  target: AnimationTarget | string,
  prop: string,
  to: number
) {
  return spring(target, prop, to, springPresets.wobbly)
}

/**
 * 僵硬弹簧
 */
export function stiffSpring(
  target: AnimationTarget | string,
  prop: string,
  to: number
) {
  return spring(target, prop, to, springPresets.stiff)
}

/**
 * 弹性弹簧
 */
export function bouncySpring(
  target: AnimationTarget | string,
  prop: string,
  to: number
) {
  return spring(target, prop, to, springPresets.bouncy)
}

export { springPresets }






