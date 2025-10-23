/**
 * 滚动滑动预设
 */

import type { AnimationTarget } from '../../core/types'
import type { ScrollTriggerConfig } from '../../scroll/types'
import { createScrollTrigger } from '../../scroll/scroll-trigger'
import { slideInUp, slideInDown, slideInLeft, slideInRight } from '../css/slide'

/**
 * 滚动从下滑入
 */
export function scrollSlideInUp(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      slideInUp(element)
      config.onEnter?.()
    },
  })
}

/**
 * 滚动从上滑入
 */
export function scrollSlideInDown(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      slideInDown(element)
      config.onEnter?.()
    },
  })
}

/**
 * 滚动从左滑入
 */
export function scrollSlideInLeft(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      slideInLeft(element)
      config.onEnter?.()
    },
  })
}

/**
 * 滚动从右滑入
 */
export function scrollSlideInRight(
  target: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return null

  return createScrollTrigger(element, {
    ...config,
    onEnter: () => {
      slideInRight(element)
      config.onEnter?.()
    },
  })
}






