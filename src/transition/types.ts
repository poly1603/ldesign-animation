/**
 * 过渡效果类型定义
 */

/**
 * 页面过渡配置
 */
export interface PageTransitionConfig {
  duration?: number
  easing?: string
  mode?: 'in-out' | 'out-in'
  onLeave?: () => void
  onEnter?: () => void
}

/**
 * FLIP 配置
 */
export interface FLIPConfig {
  duration?: number
  easing?: string
  scale?: boolean
  onComplete?: () => void
}

/**
 * FLIP 状态
 */
export interface FLIPState {
  element: HTMLElement
  first: DOMRect
  last: DOMRect
}






