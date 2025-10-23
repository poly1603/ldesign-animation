/**
 * Vue 指令 - v-animate
 * 声明式动画指令
 */

import type { Directive } from 'vue'
import { to } from '../../core/animation'
import type { AnimationProps, AnimationOptions } from '../../core/types'

export interface AnimateBinding {
  props: AnimationProps
  options?: AnimationOptions
  trigger?: 'mount' | 'click' | 'hover'
}

export const vAnimate: Directive<HTMLElement, AnimateBinding> = {
  mounted(el, binding) {
    const { props, options, trigger = 'mount' } = binding.value

    const animate = () => {
      to(el, props, options)
    }

    if (trigger === 'mount') {
      // 立即执行
      animate()
    } else if (trigger === 'click') {
      // 点击时执行
      el.addEventListener('click', animate)
        ; (el as any).__animateClickHandler = animate
    } else if (trigger === 'hover') {
      // 悬停时执行
      el.addEventListener('mouseenter', animate)
        ; (el as any).__animateHoverHandler = animate
    }
  },

  unmounted(el, binding) {
    const { trigger = 'mount' } = binding.value

    if (trigger === 'click' && (el as any).__animateClickHandler) {
      el.removeEventListener('click', (el as any).__animateClickHandler)
      delete (el as any).__animateClickHandler
    } else if (trigger === 'hover' && (el as any).__animateHoverHandler) {
      el.removeEventListener('mouseenter', (el as any).__animateHoverHandler)
      delete (el as any).__animateHoverHandler
    }
  },
}

