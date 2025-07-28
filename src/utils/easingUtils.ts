/**
 * easingUtils - 缓动函数工具
 * 提供各种缓动效果函数
 */

import type { EasingFunction } from '../types'

/**
 * 基础缓动函数
 */
export const basicEasing = {
  /**
   * 线性缓动
   */
  linear: (t: number): number => t,
  
  /**
   * 二次方缓动
   */
  quadIn: (t: number): number => t * t,
  quadOut: (t: number): number => 1 - (1 - t) * (1 - t),
  quadInOut: (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  },
  
  /**
   * 三次方缓动
   */
  cubicIn: (t: number): number => t * t * t,
  cubicOut: (t: number): number => 1 - Math.pow(1 - t, 3),
  cubicInOut: (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  },
  
  /**
   * 四次方缓动
   */
  quartIn: (t: number): number => t * t * t * t,
  quartOut: (t: number): number => 1 - Math.pow(1 - t, 4),
  quartInOut: (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  },
  
  /**
   * 五次方缓动
   */
  quintIn: (t: number): number => t * t * t * t * t,
  quintOut: (t: number): number => 1 - Math.pow(1 - t, 5),
  quintInOut: (t: number): number => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
  }
}

/**
 * 正弦缓动函数
 */
export const sineEasing = {
  sineIn: (t: number): number => 1 - Math.cos((t * Math.PI) / 2),
  sineOut: (t: number): number => Math.sin((t * Math.PI) / 2),
  sineInOut: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2
}

/**
 * 指数缓动函数
 */
export const expoEasing = {
  expoIn: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  expoOut: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  expoInOut: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2
  }
}

/**
 * 圆形缓动函数
 */
export const circEasing = {
  circIn: (t: number): number => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  circOut: (t: number): number => Math.sqrt(1 - Math.pow(t - 1, 2)),
  circInOut: (t: number): number => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  }
}

/**
 * 回弹缓动函数
 */
export const backEasing = {
  backIn: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  
  backOut: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  
  backInOut: (t: number): number => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  }
}

/**
 * 弹性缓动函数
 */
export const elasticEasing = {
  elasticIn: (t: number): number => {
    const c4 = (2 * Math.PI) / 3
    return t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  
  elasticOut: (t: number): number => {
    const c4 = (2 * Math.PI) / 3
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  
  elasticInOut: (t: number): number => {
    const c5 = (2 * Math.PI) / 4.5
    return t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
  }
}

/**
 * 弹跳缓动函数
 */
export const bounceEasing = {
  bounceIn: (t: number): number => {
    return 1 - bounceEasing.bounceOut(1 - t)
  },
  
  bounceOut: (t: number): number => {
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
  
  bounceInOut: (t: number): number => {
    return t < 0.5
      ? (1 - bounceEasing.bounceOut(1 - 2 * t)) / 2
      : (1 + bounceEasing.bounceOut(2 * t - 1)) / 2
  }
}

/**
 * 自定义缓动函数生成器
 */
export const easingGenerator = {
  /**
   * 创建贝塞尔曲线缓动函数
   */
  cubicBezier(x1: number, y1: number, x2: number, y2: number): EasingFunction {
    return function(t: number): number {
      // 简化的贝塞尔曲线实现
      const cx = 3 * x1
      const bx = 3 * (x2 - x1) - cx
      const ax = 1 - cx - bx
      
      const cy = 3 * y1
      const by = 3 * (y2 - y1) - cy
      const ay = 1 - cy - by
      
      function sampleCurveX(t: number): number {
        return ((ax * t + bx) * t + cx) * t
      }
      
      function sampleCurveY(t: number): number {
        return ((ay * t + by) * t + cy) * t
      }
      
      function solveCurveX(x: number): number {
        let t0 = 0
        let t1 = 1
        let t2 = x
        let x2: number
        let d2: number
        
        // 二分法求解
        for (let i = 0; i < 8; i++) {
          x2 = sampleCurveX(t2) - x
          if (Math.abs(x2) < 0.000001) return t2
          d2 = (3 * ax * t2 + 2 * bx) * t2 + cx
          if (Math.abs(d2) < 0.000001) break
          t2 = t2 - x2 / d2
        }
        
        t2 = x
        if (t2 < t0) return t0
        if (t2 > t1) return t1
        
        while (t0 < t1) {
          x2 = sampleCurveX(t2)
          if (Math.abs(x2 - x) < 0.000001) return t2
          if (x > x2) t0 = t2
          else t1 = t2
          t2 = (t1 - t0) * 0.5 + t0
        }
        
        return t2
      }
      
      return sampleCurveY(solveCurveX(t))
    }
  },
  
  /**
   * 创建弹簧缓动函数
   */
  spring(tension: number = 170, friction: number = 26, mass: number = 1): EasingFunction {
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
  },
  
  /**
   * 创建步进缓动函数
   */
  steps(steps: number, direction: 'start' | 'end' = 'end'): EasingFunction {
    return function(t: number): number {
      const stepSize = 1 / steps
      const currentStep = Math.floor(t / stepSize)
      
      if (direction === 'start') {
        return Math.min(currentStep * stepSize + stepSize, 1)
      } else {
        return Math.min(currentStep * stepSize, 1)
      }
    }
  },
  
  /**
   * 创建组合缓动函数
   */
  combine(
    easing1: EasingFunction,
    easing2: EasingFunction,
    splitPoint: number = 0.5
  ): EasingFunction {
    return function(t: number): number {
      if (t < splitPoint) {
        return easing1(t / splitPoint) * splitPoint
      } else {
        return splitPoint + easing2((t - splitPoint) / (1 - splitPoint)) * (1 - splitPoint)
      }
    }
  }
}

/**
 * 预设的CSS缓动函数映射
 */
export const cssEasingMap = {
  'ease': easingGenerator.cubicBezier(0.25, 0.1, 0.25, 1),
  'ease-in': easingGenerator.cubicBezier(0.42, 0, 1, 1),
  'ease-out': easingGenerator.cubicBezier(0, 0, 0.58, 1),
  'ease-in-out': easingGenerator.cubicBezier(0.42, 0, 0.58, 1),
  'linear': basicEasing.linear
}

/**
 * 缓动函数工具
 */
export const easingUtils = {
  /**
   * 获取缓动函数
   */
  get(name: string): EasingFunction | null {
    // 检查基础缓动
    if (name in basicEasing) {
      return (basicEasing as any)[name]
    }
    
    // 检查正弦缓动
    if (name in sineEasing) {
      return (sineEasing as any)[name]
    }
    
    // 检查指数缓动
    if (name in expoEasing) {
      return (expoEasing as any)[name]
    }
    
    // 检查圆形缓动
    if (name in circEasing) {
      return (circEasing as any)[name]
    }
    
    // 检查回弹缓动
    if (name in backEasing) {
      return (backEasing as any)[name]
    }
    
    // 检查弹性缓动
    if (name in elasticEasing) {
      return (elasticEasing as any)[name]
    }
    
    // 检查弹跳缓动
    if (name in bounceEasing) {
      return (bounceEasing as any)[name]
    }
    
    // 检查CSS缓动
    if (name in cssEasingMap) {
      return (cssEasingMap as any)[name]
    }
    
    return null
  },
  
  /**
   * 解析CSS缓动字符串
   */
  parseCSS(cssEasing: string): EasingFunction | null {
    // 处理cubic-bezier函数
    const cubicBezierMatch = cssEasing.match(/cubic-bezier\(([^)]+)\)/)
    if (cubicBezierMatch) {
      const values = cubicBezierMatch[1].split(',').map(v => parseFloat(v.trim()))
      if (values.length === 4) {
        return easingGenerator.cubicBezier(values[0], values[1], values[2], values[3])
      }
    }
    
    // 处理steps函数
    const stepsMatch = cssEasing.match(/steps\((\d+)(?:,\s*(start|end))?\)/)
    if (stepsMatch) {
      const steps = parseInt(stepsMatch[1])
      const direction = stepsMatch[2] as 'start' | 'end' || 'end'
      return easingGenerator.steps(steps, direction)
    }
    
    // 处理预设缓动
    return this.get(cssEasing)
  },
  
  /**
   * 获取所有可用的缓动函数名称
   */
  getAllNames(): string[] {
    return [
      ...Object.keys(basicEasing),
      ...Object.keys(sineEasing),
      ...Object.keys(expoEasing),
      ...Object.keys(circEasing),
      ...Object.keys(backEasing),
      ...Object.keys(elasticEasing),
      ...Object.keys(bounceEasing),
      ...Object.keys(cssEasingMap)
    ]
  }
}

/**
 * 导出所有缓动函数
 */
export const allEasing = {
  ...basicEasing,
  ...sineEasing,
  ...expoEasing,
  ...circEasing,
  ...backEasing,
  ...elasticEasing,
  ...bounceEasing
}

/**
 * 默认导出
 */
export default {
  basicEasing,
  sineEasing,
  expoEasing,
  circEasing,
  backEasing,
  elasticEasing,
  bounceEasing,
  easingGenerator,
  cssEasingMap,
  easingUtils,
  allEasing
}