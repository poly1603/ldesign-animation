/**
 * JS动画控制器 - 处理JavaScript动画和Web Animations API
 */

export interface JSAnimationConfig {
  duration?: number
  delay?: number
  easing?: string | ((t: number) => number)
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  autoplay?: boolean
}

export interface JSKeyframe {
  [property: string]: string | number
}

export interface AnimationState {
  element: HTMLElement
  animation: Animation
  config: JSAnimationConfig
  startTime: number
  pausedTime?: number
}

export class JSAnimationController {
  private activeAnimations: Map<HTMLElement, AnimationState[]> = new Map()
  private animationId = 0
  private defaultConfig: JSAnimationConfig

  constructor(config: JSAnimationConfig = {}) {
    this.defaultConfig = {
      duration: 1000,
      delay: 0,
      easing: 'ease',
      iterations: 1,
      direction: 'normal',
      fill: 'both',
      autoplay: true,
      ...config
    }
  }

  /**
   * 创建JS动画
   */
  create(
    element: HTMLElement, 
    keyframes: JSKeyframe[], 
    config: JSAnimationConfig = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config }
    
    // 处理缓动函数
    const easing = typeof finalConfig.easing === 'function' 
      ? this.createCustomEasing(finalConfig.easing)
      : finalConfig.easing as string

    // 创建Web Animations API动画
    const animation = element.animate(keyframes, {
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      easing,
      iterations: finalConfig.iterations,
      direction: finalConfig.direction,
      fill: finalConfig.fill
    })

    // 创建动画状态
    const state: AnimationState = {
      element,
      animation,
      config: finalConfig,
      startTime: performance.now()
    }

    // 存储动画状态
    if (!this.activeAnimations.has(element)) {
      this.activeAnimations.set(element, [])
    }
    this.activeAnimations.get(element)!.push(state)

    // 设置事件监听
    this.setupAnimationEvents(state)

    // 控制自动播放
    if (!finalConfig.autoplay) {
      animation.pause()
    }

    return animation
  }

  /**
   * 创建补间动画
   */
  tween(
    element: HTMLElement,
    from: JSKeyframe,
    to: JSKeyframe,
    config: JSAnimationConfig = {}
  ): Animation {
    const keyframes = [from, to]
    return this.create(element, keyframes, config)
  }

  /**
   * 创建多步动画
   */
  sequence(
    element: HTMLElement,
    keyframes: JSKeyframe[],
    config: JSAnimationConfig = {}
  ): Animation {
    return this.create(element, keyframes, config)
  }

  /**
   * 播放元素的所有动画
   */
  play(element: HTMLElement): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.play()
        if (state.pausedTime) {
          state.startTime = performance.now() - state.pausedTime
          delete state.pausedTime
        }
      })
    }
  }

  /**
   * 暂停元素的所有动画
   */
  pause(element: HTMLElement): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.pause()
        state.pausedTime = performance.now() - state.startTime
      })
    }
  }

  /**
   * 停止元素的所有动画
   */
  stop(element: HTMLElement): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.cancel()
      })
      this.activeAnimations.delete(element)
    }
  }

  /**
   * 完成元素的所有动画
   */
  finish(element: HTMLElement): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.finish()
      })
    }
  }

  /**
   * 反转元素的所有动画
   */
  reverse(element: HTMLElement): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.reverse()
      })
    }
  }

  /**
   * 设置动画播放速率
   */
  setPlaybackRate(element: HTMLElement, rate: number): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        state.animation.playbackRate = rate
      })
    }
  }

  /**
   * 获取动画状态
   */
  getStatus(element: HTMLElement): 'idle' | 'running' | 'paused' | 'finished' {
    const states = this.activeAnimations.get(element)
    if (!states || states.length === 0) {
      return 'idle'
    }

    const playStates = states.map(state => state.animation.playState)
    
    if (playStates.includes('running')) return 'running'
    if (playStates.includes('paused')) return 'paused'
    if (playStates.every(state => state === 'finished')) return 'finished'
    
    return 'idle'
  }

  /**
   * 获取动画进度
   */
  getProgress(element: HTMLElement): number {
    const states = this.activeAnimations.get(element)
    if (!states || states.length === 0) {
      return 0
    }

    // 返回第一个动画的进度
    const animation = states[0].animation
    const currentTime = animation.currentTime as number
    const duration = animation.effect?.getTiming().duration as number
    
    return duration > 0 ? Math.min(currentTime / duration, 1) : 0
  }

  /**
   * 设置动画进度
   */
  setProgress(element: HTMLElement, progress: number): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      states.forEach(state => {
        const duration = state.animation.effect?.getTiming().duration as number
        state.animation.currentTime = duration * Math.max(0, Math.min(1, progress))
      })
    }
  }

  /**
   * 创建弹簧动画
   */
  spring(
    element: HTMLElement,
    from: JSKeyframe,
    to: JSKeyframe,
    config: { tension?: number; friction?: number; mass?: number } = {}
  ): Animation {
    const { tension = 170, friction = 26, mass = 1 } = config
    
    // 简化的弹簧缓动函数
    const springEasing = (t: number): number => {
      const w = Math.sqrt(tension / mass)
      const zeta = friction / (2 * Math.sqrt(tension * mass))
      
      if (zeta < 1) {
        const wd = w * Math.sqrt(1 - zeta * zeta)
        return 1 - Math.exp(-zeta * w * t) * Math.cos(wd * t)
      } else {
        return 1 - Math.exp(-w * t)
      }
    }

    return this.tween(element, from, to, {
      duration: 1000,
      easing: springEasing
    })
  }

  /**
   * 创建自定义缓动函数
   */
  private createCustomEasing(easingFunction: (t: number) => number): string {
    // 生成贝塞尔曲线近似
    const p1 = easingFunction(0.25)
    const p2 = easingFunction(0.75)
    
    return `cubic-bezier(0.25, ${p1}, 0.75, ${p2})`
  }

  /**
   * 设置动画事件监听
   */
  private setupAnimationEvents(state: AnimationState): void {
    const { animation, element } = state

    animation.addEventListener('finish', () => {
      this.removeAnimationState(element, state)
    })

    animation.addEventListener('cancel', () => {
      this.removeAnimationState(element, state)
    })
  }

  /**
   * 移除动画状态
   */
  private removeAnimationState(element: HTMLElement, targetState: AnimationState): void {
    const states = this.activeAnimations.get(element)
    if (states) {
      const index = states.indexOf(targetState)
      if (index > -1) {
        states.splice(index, 1)
        if (states.length === 0) {
          this.activeAnimations.delete(element)
        }
      }
    }
  }

  /**
   * 获取所有活动动画
   */
  getActiveAnimations(): Map<HTMLElement, AnimationState[]> {
    return new Map(this.activeAnimations)
  }

  /**
   * 获取动画统计信息
   */
  getStats() {
    let totalAnimations = 0
    let runningAnimations = 0
    let pausedAnimations = 0
    
    this.activeAnimations.forEach(states => {
      totalAnimations += states.length
      states.forEach(state => {
        if (state.animation.playState === 'running') {
          runningAnimations++
        } else if (state.animation.playState === 'paused') {
          pausedAnimations++
        }
      })
    })

    return {
      total: totalAnimations,
      running: runningAnimations,
      paused: pausedAnimations,
      elements: this.activeAnimations.size
    }
  }

  /**
   * 清理所有动画
   */
  dispose(): void {
    this.activeAnimations.forEach((states, element) => {
      states.forEach(state => {
        state.animation.cancel()
      })
    })
    this.activeAnimations.clear()
  }
}

export default JSAnimationController