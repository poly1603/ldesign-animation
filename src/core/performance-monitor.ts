/**
 * 性能监控和自动优化系统
 */

import { engine } from './engine'
import { memoryMonitor } from './memory-monitor'
import { poolManager } from './object-pool-system'
import { performanceCache } from './cache'
import { clearColorCache } from '../utils/color-optimized'
import { clearTransformCache } from '../utils/transform-optimized'

/**
 * 性能指标
 */
export interface PerformanceMetrics {
  fps: number
  frameTime: number
  activeAnimations: number
  memoryUsage: number
  cpuUsage: number
  droppedFrames: number
  poolHitRate: number
}

/**
 * 性能优化建议
 */
export interface OptimizationSuggestion {
  level: 'info' | 'warning' | 'critical'
  metric: string
  current: number
  threshold: number
  suggestion: string
  action?: () => void
}

/**
 * 性能配置
 */
export interface PerformanceConfig {
  // FPS 阈值
  minFps: number
  targetFps: number

  // 内存阈值（MB）
  memoryWarning: number
  memoryCritical: number

  // 动画数量阈值
  maxConcurrentAnimations: number

  // 自动优化
  autoOptimize: boolean
  optimizationInterval: number
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private config: PerformanceConfig
  private metrics: PerformanceMetrics
  private monitoring = false
  private monitorInterval: number | null = null
  private optimizationTimer: number | null = null

  // 性能历史记录
  private fpsHistory: number[] = []
  private frameTimeHistory: number[] = []
  private memoryHistory: number[] = []

  // 优化状态
  private optimizationLevel = 0 // 0=正常, 1=轻度优化, 2=中度优化, 3=重度优化
  private lastOptimizationTime = 0

  // 回调
  private onMetricsUpdate?: (metrics: PerformanceMetrics) => void
  private onOptimization?: (suggestions: OptimizationSuggestion[]) => void

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      minFps: config.minFps ?? 30,
      targetFps: config.targetFps ?? 60,
      memoryWarning: config.memoryWarning ?? 100,
      memoryCritical: config.memoryCritical ?? 200,
      maxConcurrentAnimations: config.maxConcurrentAnimations ?? 100,
      autoOptimize: config.autoOptimize ?? true,
      optimizationInterval: config.optimizationInterval ?? 1000,
    }

    this.metrics = {
      fps: 60,
      frameTime: 16.67,
      activeAnimations: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      droppedFrames: 0,
      poolHitRate: 0,
    }
  }

  /**
   * 开始监控
   */
  start(): void {
    if (this.monitoring) return

    this.monitoring = true
    memoryMonitor.start()

    // 定期收集指标
    this.monitorInterval = window.setInterval(() => {
      this.collectMetrics()
      this.analyzePerformance()
    }, 100)

    // 定期优化
    if (this.config.autoOptimize) {
      this.scheduleOptimization()
    }
  }

  /**
   * 停止监控
   */
  stop(): void {
    if (!this.monitoring) return

    this.monitoring = false
    memoryMonitor.stop()

    if (this.monitorInterval !== null) {
      clearInterval(this.monitorInterval)
      this.monitorInterval = null
    }

    if (this.optimizationTimer !== null) {
      clearTimeout(this.optimizationTimer)
      this.optimizationTimer = null
    }
  }

  /**
   * 收集性能指标
   */
  private collectMetrics(): void {
    const engineStats = engine.getStats()
    const memoryStats = memoryMonitor.getStats()
    const poolStats = poolManager.getStats()

    // 更新指标
    this.metrics.fps = engineStats.fps
    this.metrics.frameTime = 1000 / engineStats.fps
    this.metrics.activeAnimations = engineStats.activeAnimations
    this.metrics.memoryUsage = memoryStats.usedMemory
    this.metrics.cpuUsage = this.estimateCpuUsage()
    this.metrics.poolHitRate = this.calculatePoolHitRate(poolStats)

    // 记录历史
    this.recordHistory()

    // 触发更新回调
    this.onMetricsUpdate?.(this.metrics)
  }

  /**
   * 记录历史数据
   */
  private recordHistory(): void {
    const maxHistory = 60 // 保留6秒历史

    this.fpsHistory.push(this.metrics.fps)
    if (this.fpsHistory.length > maxHistory) {
      this.fpsHistory.shift()
    }

    this.frameTimeHistory.push(this.metrics.frameTime)
    if (this.frameTimeHistory.length > maxHistory) {
      this.frameTimeHistory.shift()
    }

    this.memoryHistory.push(this.metrics.memoryUsage)
    if (this.memoryHistory.length > maxHistory) {
      this.memoryHistory.shift()
    }

    // 记录到性能缓存
    performanceCache.record('fps', this.metrics.fps)
    performanceCache.record('frameTime', this.metrics.frameTime)
    performanceCache.record('memory', this.metrics.memoryUsage)
  }

  /**
   * 分析性能
   */
  private analyzePerformance(): void {
    const suggestions: OptimizationSuggestion[] = []

    // FPS 分析
    const avgFps = this.getAverageFps()
    if (avgFps < this.config.minFps) {
      suggestions.push({
        level: 'critical',
        metric: 'FPS',
        current: avgFps,
        threshold: this.config.minFps,
        suggestion: '帧率过低，建议减少动画数量或降低质量',
        action: () => this.applyOptimizationLevel(3),
      })
    } else if (avgFps < this.config.targetFps * 0.8) {
      suggestions.push({
        level: 'warning',
        metric: 'FPS',
        current: avgFps,
        threshold: this.config.targetFps,
        suggestion: '帧率低于目标值，建议适度优化',
        action: () => this.applyOptimizationLevel(2),
      })
    }

    // 内存分析
    if (this.metrics.memoryUsage > this.config.memoryCritical) {
      suggestions.push({
        level: 'critical',
        metric: '内存',
        current: this.metrics.memoryUsage,
        threshold: this.config.memoryCritical,
        suggestion: '内存使用过高，立即清理缓存',
        action: () => this.performMemoryCleanup(),
      })
    } else if (this.metrics.memoryUsage > this.config.memoryWarning) {
      suggestions.push({
        level: 'warning',
        metric: '内存',
        current: this.metrics.memoryUsage,
        threshold: this.config.memoryWarning,
        suggestion: '内存使用较高，建议清理部分缓存',
        action: () => this.performPartialMemoryCleanup(),
      })
    }

    // 动画数量分析
    if (this.metrics.activeAnimations > this.config.maxConcurrentAnimations) {
      suggestions.push({
        level: 'warning',
        metric: '动画数量',
        current: this.metrics.activeAnimations,
        threshold: this.config.maxConcurrentAnimations,
        suggestion: '并发动画过多，可能影响性能',
      })
    }

    // 对象池分析
    if (this.metrics.poolHitRate < 0.5) {
      suggestions.push({
        level: 'info',
        metric: '对象池命中率',
        current: this.metrics.poolHitRate,
        threshold: 0.5,
        suggestion: '对象池命中率较低，考虑预热池',
      })
    }

    // 执行自动优化
    if (this.config.autoOptimize && suggestions.length > 0) {
      this.performAutoOptimization(suggestions)
    }

    // 触发优化回调
    if (suggestions.length > 0) {
      this.onOptimization?.(suggestions)
    }
  }

  /**
   * 执行自动优化
   */
  private performAutoOptimization(suggestions: OptimizationSuggestion[]): void {
    const now = Date.now()

    // 避免频繁优化
    if (now - this.lastOptimizationTime < 5000) return

    this.lastOptimizationTime = now

    // 按严重程度排序
    const criticalSuggestions = suggestions.filter(s => s.level === 'critical')
    const warningSuggestions = suggestions.filter(s => s.level === 'warning')

    // 执行关键优化
    criticalSuggestions.forEach(s => s.action?.())

    // 如果没有关键问题，执行警告级优化
    if (criticalSuggestions.length === 0 && warningSuggestions.length > 0) {
      warningSuggestions[0].action?.()
    }
  }

  /**
   * 应用优化级别
   */
  private applyOptimizationLevel(level: number): void {
    if (level === this.optimizationLevel) return

    this.optimizationLevel = level
    console.log(`[PerformanceMonitor] 应用优化级别: ${level}`)

    switch (level) {
      case 0: // 正常
        this.restoreNormalPerformance()
        break
      case 1: // 轻度优化
        this.applyLightOptimization()
        break
      case 2: // 中度优化
        this.applyModerateOptimization()
        break
      case 3: // 重度优化
        this.applyHeavyOptimization()
        break
    }
  }

  /**
   * 恢复正常性能
   */
  private restoreNormalPerformance(): void {
    engine.setFrameTimeThreshold(16.67) // 60fps
  }

  /**
   * 轻度优化
   */
  private applyLightOptimization(): void {
    engine.setFrameTimeThreshold(20) // 50fps
  }

  /**
   * 中度优化
   */
  private applyModerateOptimization(): void {
    engine.setFrameTimeThreshold(25) // 40fps
    // 清理部分缓存
    this.performPartialMemoryCleanup()
  }

  /**
   * 重度优化
   */
  private applyHeavyOptimization(): void {
    engine.setFrameTimeThreshold(33.33) // 30fps
    // 完全清理缓存
    this.performMemoryCleanup()
    // 减少对象池大小
    poolManager.clearAll()
  }

  /**
   * 执行内存清理
   */
  private performMemoryCleanup(): void {
    console.log('[PerformanceMonitor] 执行完整内存清理')
    clearColorCache()
    clearTransformCache()
    poolManager.clearAll()
    performanceCache.clear()

    // 强制垃圾回收（如果可用）
    if ('gc' in window) {
      (window as any).gc()
    }
  }

  /**
   * 执行部分内存清理
   */
  private performPartialMemoryCleanup(): void {
    console.log('[PerformanceMonitor] 执行部分内存清理')
    clearColorCache()
    clearTransformCache()
  }

  /**
   * 估算 CPU 使用率
   */
  private estimateCpuUsage(): number {
    // 基于帧时间估算
    const targetFrameTime = 1000 / this.config.targetFps
    return Math.min(100, (this.metrics.frameTime / targetFrameTime) * 100)
  }

  /**
   * 计算对象池命中率
   */
  private calculatePoolHitRate(stats: any): number {
    const totalHits = stats.interpolator.hits + stats.array.hits + stats.object.hits
    const totalAccess = totalHits + stats.interpolator.misses + stats.array.misses + stats.object.misses

    return totalAccess > 0 ? totalHits / totalAccess : 0
  }

  /**
   * 获取平均 FPS
   */
  private getAverageFps(): number {
    if (this.fpsHistory.length === 0) return this.config.targetFps
    return this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
  }

  /**
   * 调度优化
   */
  private scheduleOptimization(): void {
    this.optimizationTimer = window.setTimeout(() => {
      this.checkAndOptimize()
      this.scheduleOptimization()
    }, this.config.optimizationInterval)
  }

  /**
   * 检查并优化
   */
  private checkAndOptimize(): void {
    const avgFps = this.getAverageFps()

    // 性能恢复，降低优化级别
    if (avgFps > this.config.targetFps * 0.9 && this.optimizationLevel > 0) {
      this.applyOptimizationLevel(Math.max(0, this.optimizationLevel - 1))
    }
  }

  /**
   * 设置指标更新回调
   */
  setMetricsCallback(callback: (metrics: PerformanceMetrics) => void): void {
    this.onMetricsUpdate = callback
  }

  /**
   * 设置优化回调
   */
  setOptimizationCallback(callback: (suggestions: OptimizationSuggestion[]) => void): void {
    this.onOptimization = callback
  }

  /**
   * 获取当前指标
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * 获取性能报告
   */
  getReport(): {
    current: PerformanceMetrics
    average: {
      fps: number
      frameTime: number
      memory: number
    }
    percentile: {
      fps: { p50: number; p95: number; p99: number }
      frameTime: { p50: number; p95: number; p99: number }
    }
    optimizationLevel: number
  } {
    return {
      current: this.getMetrics(),
      average: {
        fps: performanceCache.getAverage('fps'),
        frameTime: performanceCache.getAverage('frameTime'),
        memory: performanceCache.getAverage('memory'),
      },
      percentile: {
        fps: {
          p50: performanceCache.getPercentile('fps', 50),
          p95: performanceCache.getPercentile('fps', 95),
          p99: performanceCache.getPercentile('fps', 99),
        },
        frameTime: {
          p50: performanceCache.getPercentile('frameTime', 50),
          p95: performanceCache.getPercentile('frameTime', 95),
          p99: performanceCache.getPercentile('frameTime', 99),
        },
      },
      optimizationLevel: this.optimizationLevel,
    }
  }
}

/**
 * 全局性能监控器实例
 */
export const performanceMonitor = new PerformanceMonitor()

/**
 * 性能装饰器 - 用于测量函数执行时间
 */
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    const start = performance.now()
    const result = originalMethod.apply(this, args)
    const end = performance.now()

    performanceCache.record(`${target.constructor.name}.${propertyKey}`, end - start)

    return result
  }

  return descriptor
}
