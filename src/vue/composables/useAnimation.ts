/**
 * Vue 组合式函数 - 基础动画
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { Animation, to, from, fromTo } from '../../core/animation'
import type { AnimationOptions, AnimationProps } from '../../core/types'

/**
 * 使用动画
 * @param target - 目标元素 ref
 */
export function useAnimation(target: Ref<HTMLElement | undefined>) {
  const animation = ref<Animation | null>(null)
  const isAnimating = ref(false)

  /**
   * 执行动画
   */
  const animateTo = (props: AnimationProps, options?: AnimationOptions) => {
    if (!target.value) return

    isAnimating.value = true
    animation.value = to(target.value, props, {
      ...options,
      onComplete: () => {
        isAnimating.value = false
        options?.onComplete?.()
      },
    }) as any
  }

  /**
   * 从起始值动画
   */
  const animateFrom = (props: AnimationProps, options?: AnimationOptions) => {
    if (!target.value) return

    isAnimating.value = true
    animation.value = from(target.value, props, {
      ...options,
      onComplete: () => {
        isAnimating.value = false
        options?.onComplete?.()
      },
    }) as any
  }

  /**
   * 从起点到终点动画
   */
  const animateFromTo = (
    fromProps: AnimationProps,
    toProps: AnimationProps,
    options?: AnimationOptions
  ) => {
    if (!target.value) return

    isAnimating.value = true
    animation.value = fromTo(target.value, fromProps, toProps, {
      ...options,
      onComplete: () => {
        isAnimating.value = false
        options?.onComplete?.()
      },
    }) as any
  }

  onUnmounted(() => {
    // 清理资源
    animation.value = null
  })

  return {
    animation,
    isAnimating,
    animateTo,
    animateFrom,
    animateFromTo,
  }
}

