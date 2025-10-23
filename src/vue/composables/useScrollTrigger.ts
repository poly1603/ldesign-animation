/**
 * Vue 组合式函数 - 滚动触发
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { createScrollTrigger, ScrollTrigger } from '../../scroll/scroll-trigger'
import type { ScrollTriggerOptions } from '../../scroll/types'

/**
 * 使用滚动触发
 * @param target - 目标元素 ref
 * @param options - 滚动触发选项
 */
export function useScrollTrigger(
  target: Ref<HTMLElement | undefined>,
  options?: ScrollTriggerOptions
) {
  const trigger = ref<ScrollTrigger | null>(null)
  const isInView = ref(false)
  const scrollProgress = ref(0)

  onMounted(() => {
    if (!target.value) return

    trigger.value = createScrollTrigger(target.value, {
      ...options,
      onEnter: () => {
        isInView.value = true
        options?.onEnter?.()
      },
      onLeave: () => {
        isInView.value = false
        options?.onLeave?.()
      },
      onUpdate: (progress) => {
        scrollProgress.value = progress
        options?.onUpdate?.(progress)
      },
    })
  })

  onUnmounted(() => {
    if (trigger.value) {
      trigger.value.destroy()
      trigger.value = null
    }
  })

  return {
    trigger,
    isInView,
    scrollProgress,
  }
}

