/**
 * Vue 指令 - v-parallax
 * 视差指令
 */

import type { Directive } from 'vue'
import { parallax } from '../../effects/parallax'

export interface ParallaxBinding {
  /** 滚动速度 */
  speed?: number
}

export const vParallax: Directive<HTMLElement, ParallaxBinding | number> = {
  mounted(el, binding) {
    const speed = typeof binding.value === 'number'
      ? binding.value
      : binding.value?.speed || 0.5

    const instance = parallax(el, { speed })

      // 保存到元素上以便清理
      ; (el as any).__parallaxInstance = instance
  },

  unmounted(el) {
    const instance = (el as any).__parallaxInstance
    if (instance) {
      instance.destroy()
      delete (el as any).__parallaxInstance
    }
  },
}

