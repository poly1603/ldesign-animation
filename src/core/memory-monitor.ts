/**
 * 内存监控系统 - 检测和防止内存泄漏
 * 
 * @description
 * 提供实时内存监控、泄漏检测和自动清理功能。
 * 
 * @module
 */

/**
 * 内存统计信息
 */
export interface MemoryStats {
  /** 已使用内存（MB） */
  usedMemory: number
  /** 内存上限（MB） */
  memoryLimit: number
  /** 活动对象数量 */
  activeObjects: number
  /** 内存使用率（0-1） */
  usage: number
  /** 是否接近上限 */
  nearLimit: boolean
}

/**
 * 内存监控器配置
 */
export interface MemoryMonitorConfig {
  /** 内存上限（MB） */
  memoryLimit?: number
  /** 警告阈值（0-1） */
  warningThreshold?: number
  /** 检查间隔（毫秒） */
  checkInterval?: number
  /** 自动清理回调 */
  onCleanup?: () => void
  /** 警告回调 */
  onWarning?: (stats: MemoryStats) => void
}

/**
 * 内存监控器 - 跟踪和管理内存使用
 * 
 * @class
 * 
 * @example
 * ```typescript
 * const monitor = new MemoryMonitor({
 *   memoryLimit: 100, // 100MB
 *   warningThreshold: 0.8,
 *   onWarning: (stats) => {
 *     console.warn('Memory usage high:', stats.usage)
 *     // 执行清理操作
 *   }
 * })
 * 
 * monitor.start()
 * 
 * // 注册对象跟踪
 * monitor.track('animations', 10)
 * 
 * // 获取统计
 * const stats = monitor.getStats()
 * console.log('Memory usage:', stats.usedMemory, 'MB')
 * ```
 */
export class MemoryMonitor {
  private config: Required<MemoryMonitorConfig>
  private trackedObjects: Map<string, number> = new Map()
  private checkTimerId: number | null = null
  private running: boolean = false

  constructor(config: MemoryMonitorConfig = {}) {
    this.config = {
      memoryLimit: config.memoryLimit ?? 100, // 默认100MB
      warningThreshold: config.warningThreshold ?? 0.8,
      checkInterval: config.checkInterval ?? 5000, // 5秒检查一次
      onCleanup: config.onCleanup ?? (() => { }),
      onWarning: config.onWarning ?? (() => { }),
    }
  }

  /**
   * 开始监控
   */
  start(): void {
    if (this.running) return

    this.running = true
    this.scheduleCheck()
  }

  /**
   * 停止监控
   */
  stop(): void {
    if (!this.running) return

    this.running = false
    if (this.checkTimerId !== null) {
      clearTimeout(this.checkTimerId)
      this.checkTimerId = null
    }
  }

  /**
   * 跟踪对象数量
   * 
   * @param category - 对象类别（如 'animations', 'tweens'）
   * @param count - 对象数量
   */
  track(category: string, count: number): void {
    this.trackedObjects.set(category, count)
  }

  /**
   * 取消跟踪
   * 
   * @param category - 对象类别
   */
  untrack(category: string): void {
    this.trackedObjects.delete(category)
  }

  /**
   * 获取内存统计
   * 
   * @returns 内存统计信息
   */
  getStats(): MemoryStats {
    const usedMemory = this.getUsedMemory()
    const memoryLimit = this.config.memoryLimit
    const usage = usedMemory / memoryLimit
    const nearLimit = usage >= this.config.warningThreshold

    const activeObjects = Array.from(this.trackedObjects.values())
      .reduce((sum, count) => sum + count, 0)

    return {
      usedMemory,
      memoryLimit,
      activeObjects,
      usage,
      nearLimit,
    }
  }

  /**
   * 获取已使用内存（MB）
   */
  private getUsedMemory(): number {
    if ('memory' in performance) {
      const memory = (performance as Performance & {
        memory?: { usedJSHeapSize: number }
      }).memory
      if (memory) {
        return memory.usedJSHeapSize / 1048576 // 转换为 MB
      }
    }
    return 0
  }

  /**
   * 调度检查
   */
  private scheduleCheck(): void {
    if (!this.running) return

    this.checkTimerId = window.setTimeout(() => {
      this.check()
      this.scheduleCheck()
    }, this.config.checkInterval)
  }

  /**
   * 执行检查
   */
  private check(): void {
    const stats = this.getStats()

    // 检查是否接近上限
    if (stats.nearLimit) {
      this.config.onWarning(stats)

      // 如果超过90%，触发自动清理
      if (stats.usage >= 0.9) {
        console.warn('[MemoryMonitor] Memory usage critical, triggering cleanup')
        this.config.onCleanup()
      }
    }
  }

  /**
   * 获取跟踪的对象类别
   */
  getTrackedCategories(): string[] {
    return Array.from(this.trackedObjects.keys())
  }

  /**
   * 获取指定类别的对象数量
   */
  getObjectCount(category: string): number {
    return this.trackedObjects.get(category) ?? 0
  }

  /**
   * 清空所有跟踪
   */
  clearTracking(): void {
    this.trackedObjects.clear()
  }
}

/**
 * 全局内存监控实例
 */
export const memoryMonitor = new MemoryMonitor({
  memoryLimit: 150, // 150MB
  warningThreshold: 0.8,
  onWarning: (stats) => {
    console.warn(
      `[MemoryMonitor] High memory usage: ${(stats.usage * 100).toFixed(1)}% ` +
      `(${stats.usedMemory.toFixed(1)}MB / ${stats.memoryLimit}MB)`
    )
  },
})


