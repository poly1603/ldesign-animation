/**
 * 动画工具函数
 */

// 缓动函数
export const easing = {
  // 线性
  linear: (t: number): number => t,
  
  // 二次方
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // 三次方
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => (--t) * t * t + 1,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // 四次方
  easeInQuart: (t: number): number => t * t * t * t,
  easeOutQuart: (t: number): number => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number): number => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  
  // 五次方
  easeInQuint: (t: number): number => t * t * t * t * t,
  easeOutQuint: (t: number): number => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number): number => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  
  // 正弦
  easeInSine: (t: number): number => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: (t: number): number => Math.sin(t * Math.PI / 2),
  easeInOutSine: (t: number): number => (1 - Math.cos(Math.PI * t)) / 2,
  
  // 指数
  easeInExpo: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2
    return (2 - Math.pow(2, -20 * t + 10)) / 2
  },
  
  // 圆形
  easeInCirc: (t: number): number => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t: number): number => Math.sqrt(1 - (t - 1) * (t - 1)),
  easeInOutCirc: (t: number): number => {
    if (t < 0.5) return (1 - Math.sqrt(1 - 4 * t * t)) / 2
    return (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2
  },
  
  // 回弹
  easeInBack: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeOutBack: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInOutBack: (t: number): number => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  },
  
  // 弹性
  easeInElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  easeInOutElastic: (t: number): number => {
    const c5 = (2 * Math.PI) / 4.5
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
  },
  
  // 弹跳
  easeInBounce: (t: number): number => 1 - easing.easeOutBounce(1 - t),
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
  easeInOutBounce: (t: number): number => {
    return t < 0.5
      ? (1 - easing.easeOutBounce(1 - 2 * t)) / 2
      : (1 + easing.easeOutBounce(2 * t - 1)) / 2
  }
}

// 颜色工具函数
export const colorUtils = {
  /**
   * 解析颜色字符串
   */
  parseColor(color: string): { r: number; g: number; b: number; a: number } {
    // 处理十六进制颜色
    if (color.startsWith('#')) {
      const hex = color.slice(1)
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
          a: 1
        }
      } else if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
          a: 1
        }
      }
    }
    
    // 处理rgb/rgba颜色
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
        a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
      }
    }
    
    // 默认返回黑色
    return { r: 0, g: 0, b: 0, a: 1 }
  },
  
  /**
   * 颜色插值
   */
  interpolateColor(
    from: string,
    to: string,
    progress: number
  ): string {
    const fromColor = this.parseColor(from)
    const toColor = this.parseColor(to)
    
    const r = Math.round(fromColor.r + (toColor.r - fromColor.r) * progress)
    const g = Math.round(fromColor.g + (toColor.g - fromColor.g) * progress)
    const b = Math.round(fromColor.b + (toColor.b - fromColor.b) * progress)
    const a = fromColor.a + (toColor.a - fromColor.a) * progress
    
    return `rgba(${r}, ${g}, ${b}, ${a})`
  },
  
  /**
   * 转换为十六进制颜色
   */
  toHex(color: string): string {
    const { r, g, b } = this.parseColor(color)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
}

// 数值工具函数
export const numberUtils = {
  /**
   * 数值插值
   */
  interpolate(from: number, to: number, progress: number): number {
    return from + (to - from) * progress
  },
  
  /**
   * 限制数值范围
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  },
  
  /**
   * 映射数值范围
   */
  map(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number,
    toMax: number
  ): number {
    const ratio = (value - fromMin) / (fromMax - fromMin)
    return toMin + ratio * (toMax - toMin)
  },
  
  /**
   * 生成随机数
   */
  random(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min
  },
  
  /**
   * 生成随机整数
   */
  randomInt(min: number, max: number): number {
    return Math.floor(this.random(min, max + 1))
  }
}

// DOM工具函数
export const domUtils = {
  /**
   * 获取元素的计算样式
   */
  getComputedStyle(element: HTMLElement, property: string): string {
    return window.getComputedStyle(element).getPropertyValue(property)
  },
  
  /**
   * 设置元素样式
   */
  setStyle(element: HTMLElement, styles: Record<string, string | number>): void {
    Object.entries(styles).forEach(([property, value]) => {
      element.style.setProperty(property, String(value))
    })
  },
  
  /**
   * 获取元素边界框
   */
  getBounds(element: HTMLElement): DOMRect {
    return element.getBoundingClientRect()
  },
  
  /**
   * 检查元素是否在视口中
   */
  isInViewport(element: HTMLElement): boolean {
    const rect = this.getBounds(element)
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
  
  /**
   * 等待元素加载
   */
  waitForElement(selector: string, timeout: number = 5000): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector) as HTMLElement
      if (element) {
        resolve(element)
        return
      }
      
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector) as HTMLElement
        if (element) {
          observer.disconnect()
          resolve(element)
        }
      })
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
      
      setTimeout(() => {
        observer.disconnect()
        reject(new Error(`Element ${selector} not found within ${timeout}ms`))
      }, timeout)
    })
  }
}

// 性能工具函数
export const performanceUtils = {
  /**
   * 节流函数
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0
    return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        func(...args)
      }
    }
  },
  
  /**
   * 防抖函数
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  },
  
  /**
   * 请求动画帧
   */
  raf(callback: FrameRequestCallback): number {
    return requestAnimationFrame(callback)
  },
  
  /**
   * 取消动画帧
   */
  cancelRaf(id: number): void {
    cancelAnimationFrame(id)
  },
  
  /**
   * 测量执行时间
   */
  measureTime<T>(func: () => T): { result: T; time: number } {
    const start = performance.now()
    const result = func()
    const time = performance.now() - start
    return { result, time }
  },
  
  /**
   * 检查是否支持Web Animations API
   */
  supportsWebAnimations(): boolean {
    return typeof Element !== 'undefined' && 'animate' in Element.prototype
  },
  
  /**
   * 检查是否支持CSS动画
   */
  supportsCSSAnimations(): boolean {
    const element = document.createElement('div')
    return 'animationName' in element.style
  }
}

// 动画预设
export const presets = {
  // 淡入淡出
  fadeIn: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 300, easing: 'ease-out' }
  },
  fadeOut: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 300, easing: 'ease-in' }
  },
  
  // 滑动
  slideInLeft: {
    keyframes: [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
    options: { duration: 400, easing: 'ease-out' }
  },
  slideInRight: {
    keyframes: [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
    options: { duration: 400, easing: 'ease-out' }
  },
  slideInUp: {
    keyframes: [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
    options: { duration: 400, easing: 'ease-out' }
  },
  slideInDown: {
    keyframes: [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }],
    options: { duration: 400, easing: 'ease-out' }
  },
  
  // 缩放
  scaleIn: {
    keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    options: { duration: 300, easing: 'ease-out' }
  },
  scaleOut: {
    keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(0)' }],
    options: { duration: 300, easing: 'ease-in' }
  },
  
  // 旋转
  rotateIn: {
    keyframes: [{ transform: 'rotate(-180deg) scale(0)' }, { transform: 'rotate(0deg) scale(1)' }],
    options: { duration: 500, easing: 'ease-out' }
  },
  rotateOut: {
    keyframes: [{ transform: 'rotate(0deg) scale(1)' }, { transform: 'rotate(180deg) scale(0)' }],
    options: { duration: 500, easing: 'ease-in' }
  },
  
  // 弹跳
  bounceIn: {
    keyframes: [
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1.1)', opacity: 1, offset: 0.6 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    options: { duration: 600, easing: 'ease-out' }
  },
  
  // 摇摆
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ],
    options: { duration: 500, easing: 'ease-in-out' }
  },
  
  // 脉冲
  pulse: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    options: { duration: 1000, easing: 'ease-in-out', iterations: Infinity }
  }
}

// 创建动画函数
export function createAnimation(
  element: HTMLElement,
  preset: keyof typeof presets,
  customOptions?: Partial<KeyframeAnimationOptions>
): Animation {
  const { keyframes, options } = presets[preset]
  const finalOptions = { ...options, ...customOptions }
  return element.animate(keyframes, finalOptions)
}

// 批量动画函数
export function animateElements(
  elements: HTMLElement[],
  preset: keyof typeof presets,
  options?: {
    stagger?: number
    customOptions?: Partial<KeyframeAnimationOptions>
  }
): Animation[] {
  const { stagger = 0, customOptions } = options || {}
  
  return elements.map((element, index) => {
    const delay = (customOptions?.delay || 0) + index * stagger
    return createAnimation(element, preset, {
      ...customOptions,
      delay
    })
  })
}

// 导出所有工具
export default {
  easing,
  colorUtils,
  numberUtils,
  domUtils,
  performanceUtils,
  presets,
  createAnimation,
  animateElements
}