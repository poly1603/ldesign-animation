/**
 * LDesign Animation Library
 * 高性能动画库，支持CSS动画、JS动画、过渡效果、序列动画等
 */

// 核心类
export { AnimationManager } from './core/AnimationManager'
export { TransitionManager } from './core/TransitionManager'
export { SequenceManager } from './core/SequenceManager'
export { CSSAnimationController } from './core/CSSAnimationController'
export { JSAnimationController } from './core/JSAnimationController'

// 工具函数
export { easing, colorUtils, numberUtils, domUtils, performanceUtils, presets, createAnimation, animateElements } from './utils'

// Vue相关导出
export {
  useAnimation,
  useCSSAnimation,
  useTransition,
  useSequence,
  useTimeline,
  useStagger,
  useJSAnimation,
  usePerformance,
  useElementAnimation,
  useScrollAnimation
} from './vue'

export {
  AnimationContainer,
  TransitionGroup,
  SequenceAnimation,
  ScrollAnimation,
  HoverAnimation,
  ClickAnimation
} from './vue/components'

// 类型定义
export type {
  AnimationConfig,
  AnimationKeyframes,
  AnimationOptions
} from './core/AnimationManager'

export type {
  TransitionConfig,
  TransitionOptions
} from './core/TransitionManager'

export type {
  JSAnimationConfig,
  JSKeyframe,
  AnimationState as JSAnimationState
} from './core/JSAnimationController'

// 导出所有类型
export type * from './types'

// 创建管理器实例的便捷函数
export function createAnimationManager(config?: any) {
  return new AnimationManager(config)
}

export function createTransitionManager(config?: any) {
  return new TransitionManager(config)
}

export function createSequenceManager() {
  return new SequenceManager()
}

export function createCSSAnimationController(config?: any) {
  return new CSSAnimationController(config)
}

export function createJSAnimationController(config?: any) {
  return new JSAnimationController(config)
}

// 预设动画配置
export const animationPresets = {
  // 淡入淡出
  fadeIn: { duration: 300, easing: 'ease-out' },
  fadeOut: { duration: 300, easing: 'ease-in' },
  
  // 滑动
  slideIn: { duration: 400, easing: 'ease-out' },
  slideOut: { duration: 400, easing: 'ease-in' },
  
  // 缩放
  scaleIn: { duration: 300, easing: 'ease-out' },
  scaleOut: { duration: 300, easing: 'ease-in' },
  
  // 旋转
  rotateIn: { duration: 500, easing: 'ease-out' },
  rotateOut: { duration: 500, easing: 'ease-in' },
  
  // 弹跳
  bounce: { duration: 600, easing: 'ease-out' },
  
  // 摇摆
  shake: { duration: 500, easing: 'ease-in-out' },
  
  // 脉冲
  pulse: { duration: 1000, easing: 'ease-in-out', iterations: Infinity }
}

// 常用动画效果
export const commonAnimations = {
  /**
   * 淡入效果
   */
  fadeIn: (element: HTMLElement, duration = 300) => {
    return createAnimation(element, 'fadeIn', { duration })
  },
  
  /**
   * 淡出效果
   */
  fadeOut: (element: HTMLElement, duration = 300) => {
    return createAnimation(element, 'fadeOut', { duration })
  },
  
  /**
   * 滑入效果
   */
  slideIn: (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'left', duration = 400) => {
    const presetName = `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)}` as keyof typeof presets
    return createAnimation(element, presetName, { duration })
  },
  
  /**
   * 缩放效果
   */
  scale: (element: HTMLElement, from = 0, to = 1, duration = 300) => {
    const manager = new AnimationManager()
    return manager.create(element, [
      { transform: `scale(${from})` },
      { transform: `scale(${to})` }
    ], { duration })
  },
  
  /**
   * 旋转效果
   */
  rotate: (element: HTMLElement, degrees = 360, duration = 500) => {
    const manager = new AnimationManager()
    return manager.create(element, [
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${degrees}deg)` }
    ], { duration })
  }
}

// 默认导出
export default {
  // 核心类
  AnimationManager,
  TransitionManager,
  SequenceManager,
  CSSAnimationController,
  JSAnimationController,
  
  // 工具
  easing,
  colorUtils,
  numberUtils,
  domUtils,
  performanceUtils,
  presets,
  createAnimation,
  animateElements,
  
  // 创建函数
  createAnimationManager,
  createTransitionManager,
  createSequenceManager,
  createCSSAnimationController,
  createJSAnimationController,
  
  // 预设和常用动画
  animationPresets,
  commonAnimations
}