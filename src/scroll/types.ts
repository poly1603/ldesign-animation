/**
 * Scroll 类型定义
 */

import type { AnimationTarget, AnimationConfig } from '../core/types'

/**
 * ScrollTrigger 配置
 */
export interface ScrollTriggerConfig {
  // 触发器元素
  trigger?: AnimationTarget | string
  // 开始位置（'top top', 'center center', 'bottom top' 等）
  start?: string | number
  // 结束位置
  end?: string | number
  // 滚动容器
  scroller?: HTMLElement | Window
  // 固定元素
  pin?: boolean | AnimationTarget | string
  // 固定间距
  pinSpacing?: boolean | number
  // 标记（调试用）
  markers?: boolean
  // 滚动方向
  direction?: 'vertical' | 'horizontal'
  // 是否启用
  enabled?: boolean
  // 回调
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  onUpdate?: (progress: number) => void
  onToggle?: (isActive: boolean) => void
}

/**
 * Scroll 动画配置
 */
export interface ScrollAnimationConfig extends ScrollTriggerConfig {
  animation: AnimationConfig
  scrub?: boolean | number // 是否跟随滚动进度
}

/**
 * IntersectionObserver 配置
 */
export interface IntersectionConfig {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onEnter?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
  onChange?: (entry: IntersectionObserverEntry) => void
}






