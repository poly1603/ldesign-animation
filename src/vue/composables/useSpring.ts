/**
 * Vue 组合式函数 - 弹簧动画
 */

import { ref, onUnmounted, type Ref } from 'vue'
import { spring, SpringAnimation, springPresets } from '../../physics/spring'
import type { SpringConfig } from '../../physics/types'

/**
 * 使用弹簧动画
 * @param target - 目标元素 ref
 */
export function useSpring(target: Ref<HTMLElement | undefined>) {
  const springAnim = ref<SpringAnimation | null>(null)
  const isAnimating = ref(false)
  const value = ref(0)

  /**
   * 执行弹簧动画
   */
  const animate = (
    prop: string,
    to: number,
    config?: SpringConfig | keyof typeof springPresets
  ) => {
    if (!target.value) return

    isAnimating.value = true

    const springConfig = typeof config === 'string'
      ? springPresets[config]
      : config

    springAnim.value = spring(target.value, prop, to, springConfig) as any

    // 模拟动画完成
    setTimeout(() => {
      isAnimating.value = false
      value.value = to
    }, 1000)
  }

  onUnmounted(() => {
    springAnim.value = null
  })

  return {
    springAnim,
    isAnimating,
    value,
    animate,
    presets: springPresets,
  }
}

