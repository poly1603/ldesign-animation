/**
 * 性能监控和优化工具
 */

/**
 * 性能统计
 */
export interface PerformanceStats {
  fps: number
  frameTime: number
  activeAnimations: number
  totalFrames: number
  droppedFrames: number
  memoryUsage?: number
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private frameCount: number = 0
  private lastTime: number = 0
  private fps: number = 60
  private frameTime: number = 16.67
  private droppedFrames: number = 0
  private rafId: number | null = null
  private onUpdate?: (stats: PerformanceStats) => void

  constructor(onUpdate?: (stats: PerformanceStats) => void) {
    this.onUpdate = onUpdate
  }

  /**
   * 开始监控
   */
  start(): void {
    this.lastTime = performance.now()
    this.tick()
  }

  /**
   * 停止监控
   */
  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * RAF 循环
   */
  private tick = () => {
    const currentTime = performance.now()
    const delta = currentTime - this.lastTime

    // 计算 FPS
    this.frameCount++
    this.frameTime = delta

    if (this.frameCount % 60 === 0) {
      this.fps = Math.round(1000 / delta)
    }

    // 检测掉帧
    if (delta > 16.67 * 1.5) {
      this.droppedFrames++
    }

    this.lastTime = currentTime

    // 触发更新回调
    if (this.onUpdate) {
      const stats = this.getStats()
      this.onUpdate(stats)
    }

    this.rafId = requestAnimationFrame(this.tick)
  }

  /**
   * 获取统计信息
   */
  getStats(): PerformanceStats {
    return {
      fps: this.fps,
      frameTime: this.frameTime,
      activeAnimations: 0, // 需要从 engine 获取
      totalFrames: this.frameCount,
      droppedFrames: this.droppedFrames,
      memoryUsage: this.getMemoryUsage(),
    }
  }

  /**
   * 获取内存使用（如果可用）
   */
  private getMemoryUsage(): number | undefined {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return memory.usedJSHeapSize / 1048576 // 转换为 MB
    }
    return undefined
  }

  /**
   * 重置统计
   */
  reset(): void {
    this.frameCount = 0
    this.droppedFrames = 0
  }
}

/**
 * 批量 DOM 操作优化
 */
export class BatchDOMUpdater {
  private readQueue: Array<() => void> = []
  private writeQueue: Array<() => void> = []
  private scheduled: boolean = false

  /**
   * 添加读操作
   */
  read(callback: () => void): void {
    this.readQueue.push(callback)
    this.schedule()
  }

  /**
   * 添加写操作
   */
  write(callback: () => void): void {
    this.writeQueue.push(callback)
    this.schedule()
  }

  /**
   * 调度执行
   */
  private schedule(): void {
    if (this.scheduled) return

    this.scheduled = true
    requestAnimationFrame(() => {
      this.flush()
    })
  }

  /**
   * 执行所有操作
   */
  private flush(): void {
    // 先执行所有读操作
    while (this.readQueue.length > 0) {
      const read = this.readQueue.shift()
      read?.()
    }

    // 再执行所有写操作
    while (this.writeQueue.length > 0) {
      const write = this.writeQueue.shift()
      write?.()
    }

    this.scheduled = false
  }

  /**
   * 清空队列
   */
  clear(): void {
    this.readQueue = []
    this.writeQueue = []
    this.scheduled = false
  }
}

/**
 * 全局批量更新器
 */
export const batchUpdater = new BatchDOMUpdater()

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: number | null = null
  let lastRun = 0

  return ((...args: any[]) => {
    const now = Date.now()

    if (now - lastRun >= wait) {
      func(...args)
      lastRun = now
    } else {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = window.setTimeout(() => {
        func(...args)
        lastRun = Date.now()
      }, wait - (now - lastRun))
    }
  }) as T
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: number | null = null

  return ((...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => {
      func(...args)
    }, wait)
  }) as T
}

/**
 * RAF 节流
 */
export function rafThrottle<T extends (...args: any[]) => void>(func: T): T {
  let rafId: number | null = null

  return ((...args: any[]) => {
    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      func(...args)
      rafId = null
    })
  }) as T
}



