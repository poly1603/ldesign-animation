/**
 * Vue 指令 - v-scroll-reveal
 * 滚动显示指令
 */

import type { Directive } from 'vue'
import { createScrollTrigger } from '../../scroll/scroll-trigger'
import { from } from '../../core/animation'
import type { AnimationProps, AnimationOptions } from '../../core/types'

export interface ScrollRevealBinding {
  /** 进入时的动画属性 */
  from?: AnimationProps
  /** 动画选项 */
  options?: AnimationOptions
  /** 是否只触发一次 */
  once?: boolean
}

export const vScrollReveal: Directive<HTMLElement, ScrollRevealBinding> = {
  mounted(el, binding) {
    const {
      from: fromProps = { opacity: 0, y: 50 },
      options = {},
      once = true,
    } = binding.value || {}

    let hasRevealed = false

    const trigger = createScrollTrigger(el, {
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        if (!hasRevealed || !once) {
          from(el, fromProps, options)
          hasRevealed = true
        }
      },
    })

      // 保存到元素上以便清理
      ; (el as any).__scrollRevealTrigger = trigger
  },

  unmounted(el) {
    const trigger = (el as any).__scrollRevealTrigger
    if (trigger) {
      trigger.destroy()
      delete (el as any).__scrollRevealTrigger
    }
  },
}

