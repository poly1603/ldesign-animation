/**
 * 序列管理器 - 处理动画序列和时间轴
 */

import { AnimationManager, AnimationOptions } from './AnimationManager'
import { TransitionManager, TransitionOptions } from './TransitionManager'

export interface SequenceConfig {
  autoplay?: boolean
  loop?: boolean
  direction?: 'normal' | 'reverse'
}

export interface SequenceStep {
  type: 'animation' | 'transition' | 'delay'
  target?: HTMLElement | HTMLElement[]
  options?: AnimationOptions | TransitionOptions
  delay?: number
  duration?: number
}

export class SequenceManager {
  private config: SequenceConfig
  private steps: SequenceStep[] = []
  private animationManager: AnimationManager
  private transitionManager: TransitionManager
  private isPlaying = false
  private currentStep = 0
  private playPromise: Promise<void> | null = null
  private eventListeners: Map<string, Function[]> = new Map()
  private activeAnimations: Map<HTMLElement, string[]> = new Map()

  constructor(config: SequenceConfig = {}) {
    this.config = {
      autoplay: false,
      loop: false,
      direction: 'normal',
      ...config
    }
    
    this.animationManager = new AnimationManager()
    this.transitionManager = new TransitionManager()
  }

  /**
   * 添加动画步骤
   */
  addAnimation(target: HTMLElement | HTMLElement[], options: AnimationOptions): this {
    this.steps.push({
      type: 'animation',
      target,
      options
    })
    return this
  }

  /**
   * 添加过渡步骤
   */
  addTransition(target: HTMLElement | HTMLElement[], options: TransitionOptions): this {
    this.steps.push({
      type: 'transition',
      target,
      options
    })
    return this
  }

  /**
   * 添加延迟步骤
   */
  addDelay(duration: number): this {
    this.steps.push({
      type: 'delay',
      duration
    })
    return this
  }

  /**
   * 播放序列
   */
  async play(): Promise<void> {
    if (this.isPlaying) {
      return this.playPromise || Promise.resolve()
    }

    this.isPlaying = true
    this.currentStep = 0

    this.playPromise = this.executeSequence()
    
    try {
      await this.playPromise
    } finally {
      this.isPlaying = false
      this.playPromise = null
    }
  }

  /**
   * 创建序列
   */
  create(steps: any[]): string
  create(steps: any[], options: any): string
  create(steps: any[], options?: any): string {
    const sequenceId = `sequence_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 清空现有步骤并添加新的
    this.clear()
    steps.forEach((step: any) => {
      if (step.type === 'animation') {
        this.addAnimation(step.target, step.options)
      } else if (step.type === 'transition') {
        this.addTransition(step.target, step.options)
      } else if (step.type === 'delay') {
        this.addDelay(step.duration || 1000)
      }
    })
    
    return sequenceId
  }

  /**
   * 开始序列（通过ID）
   */
  start(sequenceId: string): void {
    console.warn('SequenceManager.start() with ID is not implemented')
    this.play()
  }

  /**
   * 停止序列
   */
  stop(): void
  stop(sequenceId: string): void
  stop(sequenceId?: string): void {
    if (typeof sequenceId === 'string') {
      console.warn('SequenceManager.stop() with ID is not implemented')
      return
    }
    
    this.isPlaying = false
    this.currentStep = 0
    
    // 停止所有正在进行的动画和过渡
    this.activeAnimations.forEach((animationIds, element) => {
      animationIds.forEach(id => {
        this.animationManager.stop(id)
      })
      this.transitionManager.stop(element)
    })
    
    this.activeAnimations.clear()
  }

  /**
   * 暂停序列
   */
  pause(): void
  pause(sequenceId: string): void
  pause(sequenceId?: string): void {
    if (typeof sequenceId === 'string') {
      console.warn('SequenceManager.pause() with ID is not implemented')
      return
    }
    this.isPlaying = false
  }

  /**
   * 恢复序列
   */
  resume(): void
  resume(sequenceId: string): void
  resume(sequenceId?: string): void {
    if (typeof sequenceId === 'string') {
      console.warn('SequenceManager.resume() with ID is not implemented')
      return
    }
    if (!this.isPlaying && this.currentStep < this.steps.length) {
      this.play()
    }
  }

  /**
   * 获取播放状态
   */
  getStatus(): 'idle' | 'playing' | 'paused' | 'finished' {
    if (this.isPlaying) return 'playing'
    if (this.currentStep >= this.steps.length) return 'finished'
    if (this.currentStep > 0) return 'paused'
    return 'idle'
  }

  /**
   * 重置序列
   */
  reset(): void {
    this.stop()
    this.currentStep = 0
  }

  /**
   * 清空序列
   */
  clear(): void {
    this.stop()
    this.steps = []
    this.currentStep = 0
  }

  /**
   * 执行序列
   */
  private async executeSequence(): Promise<void> {
    const steps = this.config.direction === 'reverse' 
      ? [...this.steps].reverse() 
      : this.steps

    do {
      for (let i = this.currentStep; i < steps.length && this.isPlaying; i++) {
        this.currentStep = i
        await this.executeStep(steps[i])
      }
      
      if (this.config.loop && this.isPlaying) {
        this.currentStep = 0
      }
    } while (this.config.loop && this.isPlaying)
  }

  /**
   * 执行单个步骤
   */
  private async executeStep(step: SequenceStep): Promise<void> {
    if (!this.isPlaying) return

    switch (step.type) {
      case 'animation':
        if (step.target && step.options) {
          await this.executeAnimationStep(step.target, step.options as AnimationOptions)
        }
        break
        
      case 'transition':
        if (step.target && step.options) {
          await this.executeTransitionStep(step.target, step.options as TransitionOptions)
        }
        break
        
      case 'delay':
        if (step.duration) {
          await this.delay(step.duration)
        }
        break
    }
  }

  /**
   * 执行动画步骤
   */
  private async executeAnimationStep(
    target: HTMLElement | HTMLElement[], 
    options: AnimationOptions
  ): Promise<void> {
    const targets = Array.isArray(target) ? target : [target]
    
    const animations = targets.map(element => {
      const animationId = this.animationManager.create(element, options)
      
      // 记录活跃动画
      if (!this.activeAnimations.has(element)) {
        this.activeAnimations.set(element, [])
      }
      this.activeAnimations.get(element)!.push(animationId)
      
      return new Promise<void>((resolve) => {
        // 模拟动画完成
        const duration = options.duration || 1000
        setTimeout(() => {
          // 清理记录
          const ids = this.activeAnimations.get(element)
          if (ids) {
            const index = ids.indexOf(animationId)
            if (index > -1) {
              ids.splice(index, 1)
            }
            if (ids.length === 0) {
              this.activeAnimations.delete(element)
            }
          }
          resolve()
        }, duration)
      })
    })

    await Promise.all(animations)
  }

  /**
   * 执行过渡步骤
   */
  private async executeTransitionStep(
    target: HTMLElement | HTMLElement[], 
    options: TransitionOptions
  ): Promise<void> {
    const targets = Array.isArray(target) ? target : [target]
    
    const transitions = targets.map(element => 
      this.transitionManager.create(element, options)
    )

    await Promise.all(transitions)
  }

  /**
   * 延迟函数
   */
  private delay(duration: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

  /**
   * 获取序列信息
   */
  getInfo() {
    return {
      totalSteps: this.steps.length,
      currentStep: this.currentStep,
      isPlaying: this.isPlaying,
      status: this.getStatus(),
      config: this.config
    }
  }

  /**
   * 添加事件监听器
   */
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  /**
   * 移除事件监听器
   */
  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  /**
   * 触发事件
   */
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  /**
   * 销毁管理器（别名为destroy）
   */
  destroy(): void {
    this.dispose()
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.stop()
    this.animationManager.dispose()
    this.transitionManager.dispose()
    this.steps = []
    this.eventListeners.clear()
  }
}

export default SequenceManager