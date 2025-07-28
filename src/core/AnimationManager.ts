/**
 * 动画管理器 - 核心动画控制类
 */

import type { 
  AnimationConfig, 
  AnimationState, 
  PerformanceData,
  AnimationManagerConfig
} from '../types'

export interface AnimationInstance {
  id: string
  element: HTMLElement
  animation: Animation
  config: AnimationConfig
  state: AnimationState
}

export class AnimationManager {
  private config: AnimationManagerConfig
  private animations: Map<string, AnimationInstance> = new Map()
  private idCounter = 0
  private performanceData: PerformanceData = {
    fps: 60,
    frameTime: 16.67,
    animationCount: 0,
    droppedFrames: 0
  }

  constructor(config: AnimationManagerConfig = {}) {
    this.config = {
      duration: 300,
      delay: 0,
      easing: 'ease',
      iterations: 1,
      direction: 'normal',
      fill: 'both',
      autoplay: true,
      maxConcurrentAnimations: 100,
      enablePerformanceMonitoring: true,
      fallbackToCSS: true,
      ...config
    }
  }

  /**
   * 创建动画
   */
  create(element: HTMLElement, config: AnimationConfig): string {
    if (!element || !element.style) {
      throw new Error('Invalid element provided')
    }

    if (!config.keyframes || config.keyframes.length === 0) {
      throw new Error('Keyframes are required')
    }

    if (config.duration && config.duration <= 0) {
      throw new Error('Duration must be positive')
    }

    const finalConfig = { ...this.config, ...config }
    const id = this.generateId()

    const animation = element.animate(config.keyframes, {
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      easing: typeof finalConfig.easing === 'string' ? finalConfig.easing : 'ease',
      iterations: finalConfig.iterations,
      direction: finalConfig.direction,
      fill: finalConfig.fill
    })

    const instance: AnimationInstance = {
      id,
      element,
      animation,
      config: finalConfig,
      state: 'idle'
    }

    this.animations.set(id, instance)
    this.performanceData.animationCount++

    // 设置事件监听
    animation.addEventListener('finish', () => {
      instance.state = 'finished'
      if (finalConfig.onComplete) {
        finalConfig.onComplete()
      }
    })

    if (!finalConfig.autoplay) {
      animation.pause()
      instance.state = 'paused'
    } else {
      instance.state = 'running'
      if (finalConfig.onStart) {
        finalConfig.onStart()
      }
    }

    return id
  }

  /**
   * 播放动画
   */
  play(animationId: string): void {
    const instance = this.animations.get(animationId)
    if (instance) {
      instance.animation.play()
      instance.state = 'running'
      if (instance.config.onStart) {
        instance.config.onStart()
      }
    }
  }

  /**
   * 暂停动画
   */
  pause(animationId: string): void {
    const instance = this.animations.get(animationId)
    if (instance) {
      instance.animation.pause()
      instance.state = 'paused'
    }
  }

  /**
   * 停止动画
   */
  stop(animationId: string): void {
    const instance = this.animations.get(animationId)
    if (instance) {
      instance.animation.cancel()
      instance.state = 'idle'
      this.animations.delete(animationId)
    }
  }

  /**
   * 反向播放动画
   */
  reverse(animationId: string): void {
    const instance = this.animations.get(animationId)
    if (instance) {
      instance.animation.reverse()
      instance.state = 'running'
    }
  }

  /**
   * 跳转到指定时间
   */
  seek(animationId: string, time: number): void {
    const instance = this.animations.get(animationId)
    if (instance) {
      instance.animation.currentTime = time
    }
  }

  /**
   * 获取动画状态
   */
  getState(animationId: string): AnimationState {
    const instance = this.animations.get(animationId)
    return instance ? instance.state : 'idle'
  }

  /**
   * 获取所有活跃的动画
   */
  getActiveAnimations(): string[] {
    const activeAnimations: string[] = []
    this.animations.forEach((instance, id) => {
      if (instance.state === 'running') {
        activeAnimations.push(id)
      }
    })
    return activeAnimations
  }

  /**
   * 创建动画序列
   */
  sequence(configs: AnimationConfig[]): { animations: string[], play: () => void, pause: () => void, stop: () => void } {
    const animationIds: string[] = []
    
    configs.forEach((config, index) => {
      const element = config.element as HTMLElement
      if (element) {
        const id = this.create(element, {
          ...config,
          delay: (config.delay || 0) + (index * (config.duration || this.config.duration!))
        })
        animationIds.push(id)
      }
    })

    return {
      animations: animationIds,
      play: () => animationIds.forEach(id => this.play(id)),
      pause: () => animationIds.forEach(id => this.pause(id)),
      stop: () => animationIds.forEach(id => this.stop(id))
    }
  }

  /**
   * 创建并行动画
   */
  parallel(configs: AnimationConfig[]): { animations: string[], play: () => void, pause: () => void, stop: () => void } {
    const animationIds: string[] = []
    
    configs.forEach(config => {
      const element = config.element as HTMLElement
      if (element) {
        const id = this.create(element, config)
        animationIds.push(id)
      }
    })

    return {
      animations: animationIds,
      play: () => animationIds.forEach(id => this.play(id)),
      pause: () => animationIds.forEach(id => this.pause(id)),
      stop: () => animationIds.forEach(id => this.stop(id))
    }
  }

  /**
   * 获取性能统计数据
   */
  getPerformanceStats(): PerformanceData {
    const activeCount = this.getActiveAnimations().length
    return {
      ...this.performanceData,
      activeAnimations: activeCount,
      totalAnimations: this.performanceData.animationCount
    } as PerformanceData & { activeAnimations: number, totalAnimations: number }
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return `animation_${++this.idCounter}_${Date.now()}`
  }

  /**
   * 清理所有动画
   */
  dispose(): void {
    this.animations.forEach((instance) => {
      instance.animation.cancel()
    })
    this.animations.clear()
    this.performanceData.animationCount = 0
  }
}

export default AnimationManager