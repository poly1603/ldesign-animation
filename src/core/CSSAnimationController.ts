/**
 * CSS动画控制器 - 处理CSS动画和关键帧
 */

export interface CSSAnimationConfig {
  name?: string
  duration?: string | number
  delay?: string | number
  easing?: string
  iterations?: string | number
  direction?: string
  fillMode?: string
  playState?: 'running' | 'paused'
}

export interface CSSKeyframe {
  [property: string]: string | number
}

export interface CSSKeyframes {
  [percentage: string]: CSSKeyframe
}

export class CSSAnimationController {
  private styleSheet: CSSStyleSheet | null = null
  private animationRules: Map<string, number> = new Map()
  private activeAnimations: Map<HTMLElement, string[]> = new Map()

  constructor() {
    this.initStyleSheet()
  }

  /**
   * 初始化样式表
   */
  private initStyleSheet(): void {
    const style = document.createElement('style')
    style.setAttribute('data-ldesign-animation', '')
    document.head.appendChild(style)
    this.styleSheet = style.sheet
  }

  /**
   * 创建CSS关键帧动画
   */
  createKeyframes(name: string, keyframes: CSSKeyframes): void {
    if (!this.styleSheet) return

    // 删除已存在的关键帧
    this.removeKeyframes(name)

    // 构建关键帧规则
    let keyframeRule = `@keyframes ${name} {\n`
    
    Object.entries(keyframes).forEach(([percentage, frame]) => {
      keyframeRule += `  ${percentage} {\n`
      Object.entries(frame).forEach(([property, value]) => {
        const cssProperty = this.camelToKebab(property)
        keyframeRule += `    ${cssProperty}: ${value};\n`
      })
      keyframeRule += `  }\n`
    })
    
    keyframeRule += `}`

    // 添加到样式表
    const ruleIndex = this.styleSheet.insertRule(keyframeRule, this.styleSheet.cssRules.length)
    this.animationRules.set(name, ruleIndex)
  }

  /**
   * 删除CSS关键帧动画
   */
  removeKeyframes(name: string): void {
    if (!this.styleSheet) return

    const ruleIndex = this.animationRules.get(name)
    if (ruleIndex !== undefined) {
      this.styleSheet.deleteRule(ruleIndex)
      this.animationRules.delete(name)
      
      // 更新其他规则的索引
      this.animationRules.forEach((index, ruleName) => {
        if (index > ruleIndex) {
          this.animationRules.set(ruleName, index - 1)
        }
      })
    }
  }

  /**
   * 应用CSS动画到元素
   */
  applyAnimation(element: HTMLElement, config: CSSAnimationConfig): void {
    const {
      name = '',
      duration = '1s',
      delay = '0s',
      easing = 'ease',
      iterations = '1',
      direction = 'normal',
      fillMode = 'both',
      playState = 'running'
    } = config

    // 构建动画属性值
    const animationValue = [
      name,
      this.normalizeTime(duration),
      easing,
      this.normalizeTime(delay),
      iterations,
      direction,
      fillMode,
      playState
    ].join(' ')

    // 应用动画
    element.style.animation = animationValue

    // 记录活动动画
    if (!this.activeAnimations.has(element)) {
      this.activeAnimations.set(element, [])
    }
    this.activeAnimations.get(element)!.push(name)

    // 监听动画结束
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === element && event.animationName === name) {
        this.removeActiveAnimation(element, name)
        element.removeEventListener('animationend', handleAnimationEnd)
      }
    }

    element.addEventListener('animationend', handleAnimationEnd)
  }

  /**
   * 停止元素的CSS动画
   */
  stopAnimation(element: HTMLElement, animationName?: string): void {
    if (animationName) {
      // 停止特定动画
      const animations = this.activeAnimations.get(element) || []
      const filteredAnimations = animations.filter(name => name !== animationName)
      
      if (filteredAnimations.length > 0) {
        this.activeAnimations.set(element, filteredAnimations)
        // 重新应用剩余动画
        this.reapplyAnimations(element, filteredAnimations)
      } else {
        element.style.animation = ''
        this.activeAnimations.delete(element)
      }
    } else {
      // 停止所有动画
      element.style.animation = ''
      this.activeAnimations.delete(element)
    }
  }

  /**
   * 暂停元素的CSS动画
   */
  pauseAnimation(element: HTMLElement): void {
    element.style.animationPlayState = 'paused'
  }

  /**
   * 恢复元素的CSS动画
   */
  resumeAnimation(element: HTMLElement): void {
    element.style.animationPlayState = 'running'
  }

  /**
   * 获取元素的动画状态
   */
  getAnimationStatus(element: HTMLElement): 'idle' | 'running' | 'paused' {
    const computedStyle = getComputedStyle(element)
    const animationName = computedStyle.animationName
    const playState = computedStyle.animationPlayState

    if (animationName === 'none') return 'idle'
    if (playState === 'paused') return 'paused'
    return 'running'
  }

  /**
   * 创建预设动画
   */
  createPresetAnimations(): void {
    // 淡入
    this.createKeyframes('fadeIn', {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    })

    // 淡出
    this.createKeyframes('fadeOut', {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 }
    })

    // 滑入（从左）
    this.createKeyframes('slideInLeft', {
      '0%': { transform: 'translateX(-100%)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 }
    })

    // 滑入（从右）
    this.createKeyframes('slideInRight', {
      '0%': { transform: 'translateX(100%)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 }
    })

    // 滑入（从上）
    this.createKeyframes('slideInUp', {
      '0%': { transform: 'translateY(-100%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    })

    // 滑入（从下）
    this.createKeyframes('slideInDown', {
      '0%': { transform: 'translateY(100%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    })

    // 缩放进入
    this.createKeyframes('scaleIn', {
      '0%': { transform: 'scale(0)', opacity: 0 },
      '100%': { transform: 'scale(1)', opacity: 1 }
    })

    // 弹跳
    this.createKeyframes('bounce', {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
      '40%, 43%': { transform: 'translateY(-30px)' },
      '70%': { transform: 'translateY(-15px)' },
      '90%': { transform: 'translateY(-4px)' }
    })

    // 旋转进入
    this.createKeyframes('rotateIn', {
      '0%': { transform: 'rotate(-200deg)', opacity: 0 },
      '100%': { transform: 'rotate(0)', opacity: 1 }
    })

    // 摇摆
    this.createKeyframes('shake', {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
      '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
    })
  }

  /**
   * 驼峰转短横线
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }

  /**
   * 标准化时间值
   */
  private normalizeTime(time: string | number): string {
    if (typeof time === 'number') {
      return `${time}ms`
    }
    return time
  }

  /**
   * 移除活动动画记录
   */
  private removeActiveAnimation(element: HTMLElement, animationName: string): void {
    const animations = this.activeAnimations.get(element)
    if (animations) {
      const index = animations.indexOf(animationName)
      if (index > -1) {
        animations.splice(index, 1)
        if (animations.length === 0) {
          this.activeAnimations.delete(element)
        }
      }
    }
  }

  /**
   * 重新应用动画
   */
  private reapplyAnimations(element: HTMLElement, animations: string[]): void {
    // 这里需要重新构建动画字符串，简化处理
    element.style.animation = animations.map(name => `${name} 1s ease`).join(', ')
  }

  /**
   * 清理资源
   */
  dispose(): void {
    // 清理所有活动动画
    this.activeAnimations.forEach((animations, element) => {
      element.style.animation = ''
    })
    this.activeAnimations.clear()

    // 移除样式表
    if (this.styleSheet && this.styleSheet.ownerNode) {
      this.styleSheet.ownerNode.remove()
    }
    
    this.animationRules.clear()
  }
}

export default CSSAnimationController