/**
 * Vue 组合式函数 - 视口检测
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { createIntersectionManager } from '../../scroll/intersection'

/**
 * 使用视口检测
 * @param target - 目标元素 ref
 * @param options - IntersectionObserver 选项
 */
export function useInView(
  target: Ref<HTMLElement | undefined>,
  options?: IntersectionObserverInit
) {
  const isInView = ref(false)
  const hasEntered = ref(false)
  const ratio = ref(0)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView.value = entry.isIntersecting
          ratio.value = entry.intersectionRatio

          if (entry.isIntersecting && !hasEntered.value) {
            hasEntered.value = true
          }
        })
      },
      {
        threshold: options?.threshold || 0,
        rootMargin: options?.rootMargin || '0px',
        root: options?.root || null,
      }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
      observer = null
    }
  })

  return {
    isInView,
    hasEntered,
    ratio,
  }
}

