/**
 * animationUtils - 动画工具函数
 * 提供常用的动画辅助功能
 */

import type {
  AnimationConfig,
  TransitionConfig,
  SequenceConfig,
  Keyframe,
  SpringConfig
} from '../types'

/**
 * 预设动画配置
 */
export const presetAnimations = {
  // 淡入淡出
  fadeIn: {
    duration: 300,
    easing: 'ease-out',
    from: { opacity: 0 },
    to: { opacity: 1 }
  } as AnimationConfig,
  
  fadeOut: {
    duration: 300,
    easing: 'ease-in',
    from: { opacity: 1 },
    to: { opacity: 0 }
  } as AnimationConfig,
  
  // 滑动
  slideInLeft: {
    duration: 400,
    easing: 'ease-out',
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' }
  } as AnimationConfig,
  
  slideInRight: {
    duration: 400,
    easing: 'ease-out',
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' }
  } as AnimationConfig,
  
  slideInUp: {
    duration: 400,
    easing: 'ease-out',
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' }
  } as AnimationConfig,
  
  slideInDown: {
    duration: 400,
    easing: 'ease-out',
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' }
  } as AnimationConfig,
  
  // 缩放
  scaleIn: {
    duration: 300,
    easing: 'ease-out',
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' }
  } as AnimationConfig,
  
  scaleOut: {
    duration: 300,
    easing: 'ease-in',
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(0)' }
  } as AnimationConfig,
  
  // 旋转
  rotateIn: {
    duration: 600,
    easing: 'ease-out',
    from: { transform: 'rotate(-180deg)', opacity: 0 },
    to: { transform: 'rotate(0deg)', opacity: 1 }
  } as AnimationConfig,
  
  // 弹跳
  bounce: {
    duration: 1000,
    easing: 'ease-out',
    keyframes: [
      { offset: 0, properties: { transform: 'translateY(0)' } },
      { offset: 0.2, properties: { transform: 'translateY(-30px)' } },
      { offset: 0.4, properties: { transform: 'translateY(0)' } },
      { offset: 0.6, properties: { transform: 'translateY(-15px)' } },
      { offset: 0.8, properties: { transform: 'translateY(0)' } },
      { offset: 1, properties: { transform: 'translateY(0)' } }
    ]
  } as AnimationConfig,
  
  // 摇摆
  shake: {
    duration: 600,
    easing: 'ease-in-out',
    keyframes: [
      { offset: 0, properties: { transform: 'translateX(0)' } },
      { offset: 0.1, properties: { transform: 'translateX(-10px)' } },
      { offset: 0.2, properties: { transform: 'translateX(10px)' } },
      { offset: 0.3, properties: { transform: 'translateX(-10px)' } },
      { offset: 0.4, properties: { transform: 'translateX(10px)' } },
      { offset: 0.5, properties: { transform: 'translateX(-10px)' } },
      { offset: 0.6, properties: { transform: 'translateX(10px)' } },
      { offset: 0.7, properties: { transform: 'translateX(-10px)' } },
      { offset: 0.8, properties: { transform: 'translateX(10px)' } },
      { offset: 0.9, properties: { transform: 'translateX(-10px)' } },
      { offset: 1, properties: { transform: 'translateX(0)' } }
    ]
  } as AnimationConfig,
  
  // 脉冲
  pulse: {
    duration: 1000,
    easing: 'ease-in-out',
    iterations: Infinity,
    keyframes: [
      { offset: 0, properties: { transform: 'scale(1)' } },
      { offset: 0.5, properties: { transform: 'scale(1.05)' } },
      { offset: 1, properties: { transform: 'scale(1)' } }
    ]
  } as AnimationConfig
}

/**
 * 预设过渡配置
 */
export const presetTransitions = {
  smooth: {
    duration: 300,
    easing: 'ease',
    property: 'all'
  } as TransitionConfig,
  
  fast: {
    duration: 150,
    easing: 'ease-out',
    property: 'all'
  } as TransitionConfig,
  
  slow: {
    duration: 600,
    easing: 'ease-in-out',
    property: 'all'
  } as TransitionConfig,
  
  transform: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    property: 'transform'
  } as TransitionConfig,
  
  opacity: {
    duration: 200,
    easing: 'ease',
    property: 'opacity'
  } as TransitionConfig
}

/**
 * 创建关键帧动画
 */
export function createKeyframeAnimation(
  keyframes: Keyframe[],
  options: Partial<AnimationConfig> = {}
): AnimationConfig {
  return {
    duration: 1000,
    easing: 'ease',
    ...options,
    keyframes
  }
}

/**
 * 创建弹簧动画配置
 */
export function createSpringAnimation(
  from: Record<string, any>,
  to: Record<string, any>,
  springConfig: SpringConfig = {}
): AnimationConfig {
  const {
    tension = 170,
    friction = 26,
    mass = 1
  } = springConfig
  
  // 计算弹簧动画的持续时间
  const duration = calculateSpringDuration(tension, friction, mass)
  
  return {
    duration,
    easing: createSpringEasing(tension, friction, mass),
    from,
    to
  }
}

/**
 * 计算弹簧动画持续时间
 */
function calculateSpringDuration(tension: number, friction: number, mass: number): number {
  const w0 = Math.sqrt(tension / mass)
  const zeta = friction / (2 * Math.sqrt(tension * mass))
  
  if (zeta < 1) {
    // 欠阻尼
    const wd = w0 * Math.sqrt(1 - zeta * zeta)
    return (Math.PI / wd) * 1000
  } else {
    // 过阻尼或临界阻尼
    return (4 / w0) * 1000
  }
}

/**
 * 创建弹簧缓动函数
 */
function createSpringEasing(tension: number, friction: number, mass: number) {
  return function(t: number): number {
    const w0 = Math.sqrt(tension / mass)
    const zeta = friction / (2 * Math.sqrt(tension * mass))
    
    if (zeta < 1) {
      // 欠阻尼
      const wd = w0 * Math.sqrt(1 - zeta * zeta)
      return 1 - Math.exp(-zeta * w0 * t) * Math.cos(wd * t)
    } else if (zeta === 1) {
      // 临界阻尼
      return 1 - Math.exp(-w0 * t) * (1 + w0 * t)
    } else {
      // 过阻尼
      const r1 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1))
      const r2 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1))
      const c1 = 1 / (r1 - r2)
      const c2 = -c1
      return 1 - (c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t))
    }
  }
}

/**
 * 创建序列动画
 */
export function createSequenceAnimation(
  steps: Array<{
    element: HTMLElement
    animation: AnimationConfig
    delay?: number
  }>
): SequenceConfig {
  return {
    steps: steps.map(step => ({
      type: 'animation',
      element: step.element,
      config: step.animation,
      delay: step.delay,
      wait: true
    }))
  }
}

/**
 * 创建并行动画
 */
export function createParallelAnimation(
  animations: Array<{
    element: HTMLElement
    animation: AnimationConfig
  }>
): SequenceConfig {
  return {
    steps: [{
      type: 'parallel',
      steps: animations.map(anim => ({
        type: 'animation',
        element: anim.element,
        config: anim.animation,
        wait: false
      }))
    }]
  }
}

/**
 * 创建交错动画
 */
export function createStaggerAnimation(
  elements: HTMLElement[],
  animation: AnimationConfig,
  staggerDelay: number = 100
): SequenceConfig {
  return {
    steps: elements.map((element, index) => ({
      type: 'animation',
      element,
      config: animation,
      delay: index * staggerDelay,
      wait: false
    }))
  }
}

/**
 * 动画组合工具
 */
export const animationComposer = {
  /**
   * 链式动画
   */
  chain(...animations: AnimationConfig[]): SequenceConfig {
    return {
      steps: animations.map(config => ({
        type: 'animation',
        config,
        wait: true
      }))
    }
  },
  
  /**
   * 并行动画
   */
  parallel(...animations: AnimationConfig[]): SequenceConfig {
    return {
      steps: [{
        type: 'parallel',
        steps: animations.map(config => ({
          type: 'animation',
          config,
          wait: false
        }))
      }]
    }
  },
  
  /**
   * 延迟动画
   */
  delay(ms: number): SequenceConfig {
    return {
      steps: [{
        type: 'callback',
        callback: () => new Promise(resolve => setTimeout(resolve, ms))
      }]
    }
  }
}

/**
 * 动画状态检查工具
 */
export const animationChecker = {
  /**
   * 检查元素是否支持动画
   */
  supportsAnimation(element: HTMLElement): boolean {
    return 'animate' in element
  },
  
  /**
   * 检查浏览器是否支持Web Animations API
   */
  supportsWebAnimations(): boolean {
    return typeof Element !== 'undefined' && 'animate' in Element.prototype
  },
  
  /**
   * 检查是否启用了动画
   */
  isAnimationEnabled(): boolean {
    if (typeof window === 'undefined') return false
    
    // 检查用户是否禁用了动画
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    return !mediaQuery.matches
  },
  
  /**
   * 获取元素的计算样式
   */
  getComputedStyle(element: HTMLElement, property: string): string {
    if (typeof window === 'undefined') return ''
    return window.getComputedStyle(element).getPropertyValue(property)
  }
}

/**
 * 动画性能优化工具
 */
export const animationOptimizer = {
  /**
   * 批量执行动画
   */
  batch(animations: Array<() => void>): void {
    requestAnimationFrame(() => {
      animations.forEach(animation => animation())
    })
  },
  
  /**
   * 节流动画更新
   */
  throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number = 16
  ): T {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }) as T
  },
  
  /**
   * 防抖动画更新
   */
  debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number = 100
  ): T {
    let timeoutId: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }) as T
  }
}

/**
 * 导出所有工具
 */
export default {
  presetAnimations,
  presetTransitions,
  createKeyframeAnimation,
  createSpringAnimation,
  createSequenceAnimation,
  createParallelAnimation,
  createStaggerAnimation,
  animationComposer,
  animationChecker,
  animationOptimizer
}