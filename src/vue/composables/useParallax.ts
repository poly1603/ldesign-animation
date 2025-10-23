/**
 * Vue 组合式函数 - 视差效果
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { parallax, Parallax } from '../../effects/parallax'

/**
 * 使用视差效果
 * @param target - 目标元素 ref
 * @param speed - 滚动速度（0-1，0.5为正常速度）
 */
export function useParallax(
  target: Ref<HTMLElement | undefined>,
  speed: number = 0.5
) {
  const parallaxInstance = ref<Parallax | null>(null)
  const offset = ref(0)

  onMounted(() => {
    if (!target.value) return

    parallaxInstance.value = parallax(target.value, {
      speed,
      onUpdate: (value) => {
        offset.value = value
      },
    })
  })

  onUnmounted(() => {
    if (parallaxInstance.value) {
      parallaxInstance.value.destroy()
      parallaxInstance.value = null
    }
  })

  return {
    parallaxInstance,
    offset,
  }
}

