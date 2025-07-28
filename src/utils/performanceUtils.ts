/**
 * performanceUtils - 性能监控工具
 * 提供动画性能监控和优化功能
 */

import type { PerformanceMetrics } from '../types'

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    totalTransitions: 0,
    activeTransitions: 0,
    averageDuration: 0,
    memoryUsage: 0
  }
  
  private animationTimes: number[] = []
  private frameRates: number[] = []
  private lastFrameTime = 0
  private isMonitoring = false
  private monitoringId?: number
  
  private observers: Array<(metrics: PerformanceMetrics) => void> = []

  /**
   * 开始监控
   */
  start(): void {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    this.lastFrameTime = performance.now()
    this.monitorFrame()
  }

  /**
   * 停止监控
   */
  stop(): void {
    this.isMonitoring = false
    if (this.monitoringId) {
      cancelAnimationFrame(this.monitoringId)
      this.monitoringId = undefined
    }
  }

  /**
   * 记录动画开始
   */
  recordAnimationStart(): void {
    this.metrics.activeTransitions++
    this.metrics.totalTransitions++
    this.notifyObservers()
  }

  /**
   * 记录动画结束
   */
  recordAnimationEnd(duration: number): void {
    this.metrics.activeTransitions = Math.max(0, this.metrics.activeTransitions - 1)
    this.animationTimes.push(duration)
    
    // 保持最近100个动画的记录
    if (this.animationTimes.length > 100) {
      this.animationTimes.shift()
    }
    
    // 更新平均持续时间
    this.metrics.averageDuration = this.animationTimes.reduce((a, b) => a + b, 0) / this.animationTimes.length
    
    this.notifyObservers()
  }

  /**
   * 获取当前指标
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * 获取帧率统计
   */
  getFrameRateStats(): {
    current: number
    average: number
    min: number
    max: number
  } {
    if (this.frameRates.length === 0) {
      return { current: 0, average: 0, min: 0, max: 0 }
    }
    
    const current = this.frameRates[this.frameRates.length - 1] || 0
    const average = this.frameRates.reduce((a, b) => a + b, 0) / this.frameRates.length
    const min = Math.min(...this.frameRates)
    const max = Math.max(...this.frameRates)
    
    return { current, average, min, max }
  }

  /**
   * 添加观察者
   */
  addObserver(callback: (metrics: PerformanceMetrics) => void): void {
    this.observers.push(callback)
  }

  /**
   * 移除观察者
   */
  removeObserver(callback: (metrics: PerformanceMetrics) => void): void {
    const index = this.observers.indexOf(callback)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  /**
   * 重置指标
   */
  reset(): void {
    this.metrics = {
      totalTransitions: 0,
      activeTransitions: 0,
      averageDuration: 0,
      memoryUsage: 0
    }
    this.animationTimes = []
    this.frameRates = []
    this.notifyObservers()
  }

  /**
   * 监控帧率
   */
  private monitorFrame(): void {
    if (!this.isMonitoring) return
    
    const now = performance.now()
    const delta = now - this.lastFrameTime
    const fps = 1000 / delta
    
    this.frameRates.push(fps)
    
    // 保持最近60帧的记录
    if (this.frameRates.length > 60) {
      this.frameRates.shift()
    }
    
    this.lastFrameTime = now
    
    // 更新内存使用情况
    this.updateMemoryUsage()
    
    this.monitoringId = requestAnimationFrame(() => this.monitorFrame())
  }

  /**
   * 更新内存使用情况
   */
  private updateMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB
    }
  }

  /**
   * 通知观察者
   */
  private notifyObservers(): void {
    this.observers.forEach(callback => {
      try {
        callback(this.metrics)
      } catch (error) {
        console.error('Error in performance observer:', error)
      }
    })
  }
}

/**
 * 性能分析器
 */
export class PerformanceAnalyzer {
  private samples: Array<{
    timestamp: number
    fps: number
    memoryUsage: number
    activeAnimations: number
  }> = []

  /**
   * 添加样本
   */
  addSample(fps: number, memoryUsage: number, activeAnimations: number): void {
    this.samples.push({
      timestamp: Date.now(),
      fps,
      memoryUsage,
      activeAnimations
    })
    
    // 保持最近1000个样本
    if (this.samples.length > 1000) {
      this.samples.shift()
    }
  }

  /**
   * 分析性能趋势
   */
  analyzeTrends(): {
    fpsDecline: boolean
    memoryLeak: boolean
    performanceIssues: string[]
  } {
    if (this.samples.length < 10) {
      return {
        fpsDecline: false,
        memoryLeak: false,
        performanceIssues: []
      }
    }
    
    const issues: string[] = []
    
    // 分析FPS下降
    const recentFps = this.samples.slice(-10).map(s => s.fps)
    const earlyFps = this.samples.slice(0, 10).map(s => s.fps)
    const recentAvgFps = recentFps.reduce((a, b) => a + b, 0) / recentFps.length
    const earlyAvgFps = earlyFps.reduce((a, b) => a + b, 0) / earlyFps.length
    
    const fpsDecline = recentAvgFps < earlyAvgFps * 0.8
    if (fpsDecline) {
      issues.push('FPS下降检测到')
    }
    
    // 分析内存泄漏
    const recentMemory = this.samples.slice(-10).map(s => s.memoryUsage)
    const earlyMemory = this.samples.slice(0, 10).map(s => s.memoryUsage)
    const recentAvgMemory = recentMemory.reduce((a, b) => a + b, 0) / recentMemory.length
    const earlyAvgMemory = earlyMemory.reduce((a, b) => a + b, 0) / earlyMemory.length
    
    const memoryLeak = recentAvgMemory > earlyAvgMemory * 1.5
    if (memoryLeak) {
      issues.push('可能的内存泄漏')
    }
    
    // 检查低FPS
    if (recentAvgFps < 30) {
      issues.push('FPS过低')
    }
    
    // 检查高内存使用
    if (recentAvgMemory > 100) { // 100MB
      issues.push('内存使用过高')
    }
    
    return {
      fpsDecline,
      memoryLeak,
      performanceIssues: issues
    }
  }

  /**
   * 获取性能报告
   */
  getReport(): {
    summary: {
      avgFps: number
      minFps: number
      maxFps: number
      avgMemory: number
      maxMemory: number
    }
    trends: ReturnType<PerformanceAnalyzer['analyzeTrends']>
    recommendations: string[]
  } {
    if (this.samples.length === 0) {
      return {
        summary: {
          avgFps: 0,
          minFps: 0,
          maxFps: 0,
          avgMemory: 0,
          maxMemory: 0
        },
        trends: {
          fpsDecline: false,
          memoryLeak: false,
          performanceIssues: []
        },
        recommendations: []
      }
    }
    
    const fps = this.samples.map(s => s.fps)
    const memory = this.samples.map(s => s.memoryUsage)
    
    const summary = {
      avgFps: fps.reduce((a, b) => a + b, 0) / fps.length,
      minFps: Math.min(...fps),
      maxFps: Math.max(...fps),
      avgMemory: memory.reduce((a, b) => a + b, 0) / memory.length,
      maxMemory: Math.max(...memory)
    }
    
    const trends = this.analyzeTrends()
    const recommendations = this.generateRecommendations(summary, trends)
    
    return {
      summary,
      trends,
      recommendations
    }
  }

  /**
   * 生成优化建议
   */
  private generateRecommendations(
    summary: any,
    trends: ReturnType<PerformanceAnalyzer['analyzeTrends']>
  ): string[] {
    const recommendations: string[] = []
    
    if (summary.avgFps < 30) {
      recommendations.push('考虑减少同时运行的动画数量')
      recommendations.push('使用CSS动画替代JavaScript动画')
      recommendations.push('启用硬件加速（transform3d）')
    }
    
    if (summary.avgFps < 60 && summary.avgFps >= 30) {
      recommendations.push('优化动画缓动函数')
      recommendations.push('减少动画复杂度')
    }
    
    if (summary.avgMemory > 50) {
      recommendations.push('及时清理未使用的动画')
      recommendations.push('避免创建过多的动画实例')
    }
    
    if (trends.memoryLeak) {
      recommendations.push('检查动画事件监听器是否正确移除')
      recommendations.push('确保动画完成后正确清理资源')
    }
    
    if (trends.fpsDecline) {
      recommendations.push('检查是否有动画阻塞主线程')
      recommendations.push('考虑使用Web Workers处理复杂计算')
    }
    
    return recommendations
  }

  /**
   * 清除样本
   */
  clear(): void {
    this.samples = []
  }
}

/**
 * 性能优化工具
 */
export const performanceOptimizer = {
  /**
   * 检查是否应该使用硬件加速
   */
  shouldUseHardwareAcceleration(element: HTMLElement): boolean {
    // 检查元素是否已经在合成层
    const style = window.getComputedStyle(element)
    const transform = style.transform
    const willChange = style.willChange
    
    return transform !== 'none' || willChange === 'transform'
  },
  
  /**
   * 启用硬件加速
   */
  enableHardwareAcceleration(element: HTMLElement): void {
    element.style.transform = element.style.transform || 'translateZ(0)'
    element.style.willChange = 'transform'
  },
  
  /**
   * 禁用硬件加速
   */
  disableHardwareAcceleration(element: HTMLElement): void {
    if (element.style.transform === 'translateZ(0)') {
      element.style.transform = ''
    }
    element.style.willChange = 'auto'
  },
  
  /**
   * 批量优化元素
   */
  batchOptimize(elements: HTMLElement[]): void {
    // 使用requestAnimationFrame批量处理
    requestAnimationFrame(() => {
      elements.forEach(element => {
        this.enableHardwareAcceleration(element)
      })
    })
  },
  
  /**
   * 检查动画性能
   */
  checkAnimationPerformance(callback: () => void): Promise<{
    duration: number
    fps: number
    dropped: number
  }> {
    return new Promise((resolve) => {
      const startTime = performance.now()
      let frameCount = 0
      let lastFrameTime = startTime
      const frameTimes: number[] = []
      
      function countFrame() {
        const now = performance.now()
        frameCount++
        frameTimes.push(now - lastFrameTime)
        lastFrameTime = now
        
        if (now - startTime < 1000) {
          requestAnimationFrame(countFrame)
        } else {
          const duration = now - startTime
          const fps = (frameCount * 1000) / duration
          const expectedFrames = Math.floor(duration / 16.67) // 60fps
          const dropped = Math.max(0, expectedFrames - frameCount)
          
          resolve({ duration, fps, dropped })
        }
      }
      
      callback()
      requestAnimationFrame(countFrame)
    })
  }
}

/**
 * 性能监控工具集合
 */
export const performanceUtils = {
  PerformanceMonitor,
  PerformanceAnalyzer,
  performanceOptimizer,
  
  /**
   * 创建性能监控器实例
   */
  createMonitor(): PerformanceMonitor {
    return new PerformanceMonitor()
  },
  
  /**
   * 创建性能分析器实例
   */
  createAnalyzer(): PerformanceAnalyzer {
    return new PerformanceAnalyzer()
  },
  
  /**
   * 测量函数执行时间
   */
  measureTime<T>(fn: () => T): { result: T; duration: number } {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    return { result, duration }
  },
  
  /**
   * 异步测量函数执行时间
   */
  async measureTimeAsync<T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
    const start = performance.now()
    const result = await fn()
    const duration = performance.now() - start
    return { result, duration }
  }
}

/**
 * 默认导出
 */
export default performanceUtils