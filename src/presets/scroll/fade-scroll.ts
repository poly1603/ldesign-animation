/**
 * 滚动淡入淡出预设
 */

import type { AnimationTarget } from '../../core/types'
import type { ScrollTriggerConfig } from '../../scroll/types'
import { createScrollTrigger } from '../../scroll/scroll-trigger'
import { fadeIn, fadeOut } from '../css/fade'

/**
 * 滚动淡入
 * @param target - 目标元素
 * @param config - ScrollTrigger 配置
 */
export function scrollFadeIn(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      fadeIn(element)
      config.onEnter?.()
    },
  })
}

/**
 * 滚动淡出
 * @param target - 目标元素
 * @param config - ScrollTrigger 配置
 */
export function scrollFadeOut(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      fadeOut(element)
      config.onEnter?.()
    },
  })
}






