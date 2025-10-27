/**
 * 性能自适应系统 - 根据设备性能自动调整动画质量
 * 
 * @description
 * 检测设备性能并自动降级/升级动画效果，确保流畅体验。
 * 
 * @module
 */

/**
 * 性能等级
 */
export enum PerformanceTier {
  /** 低端设备 */
  LOW = 'low',
  /** 中端设备 */
  MEDIUM = 'medium',
  /** 高端设备 */
  HIGH = 'high',
}

/**
 * 设备信息
 */
export interface DeviceInfo {
  /** 性能等级 */
  tier: PerformanceTier
  /** CPU 核心数 */
  cpuCores: number
  /** 内存大小（GB，估算） */
  memoryGB: number
  /** 是否移动设备 */
  isMobile: boolean
  /** 是否低端设备 */
  isLowEnd: boolean
}

/**
 * 性能配置
 */
export interface PerformanceConfig {
  /** 是否启用复杂动画 */
  enableComplexAnimations: boolean
  /** 是否启用粒子效果 */
  enableParticles: boolean
  /** 是否启用模糊效果 */
  enableBlur: boolean
  /** 默认动画时长（毫秒） */
  defaultDuration: number
  /** 最大并发动画数 */
  maxConcurrentAnimations: number
}

/**
 * 性能自适应管理器
 * 
 * @class
 * 
 * @example
 * ```typescript
 * const adaptive = new PerformanceAdaptive()
 * 
 * // 检测设备
 * const device = adaptive.detectDevice()
 * console.log('Device tier:', device.tier)
 * 
 * // 获取推荐配置
 * const config = adaptive.getConfig()
 * if (config.enableComplexAnimations) {
 *   // 执行复杂动画
 * }
 * 
 * // 监听性能变化
 * adaptive.on('downgrade', () => {
 *   console.log('Performance degraded, reducing effects')
 * })
 * ```
 */
export class PerformanceAdaptive {
  private device: DeviceInfo | null = null
  private config: PerformanceConfig | null = null
  private fpsHistory: number[] = []
  private listeners: Map<string, Set<Function>> = new Map()

  constructor() {
    this.device = this.detectDevice()
    this.config = this.generateConfig(this.device)
  }

  /**
   * 检测设备性能
   * 
   * @returns 设备信息
   */
  detectDevice(): DeviceInfo {
    const cpuCores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 4 // GB
    const isMobile = /mobile|android|iphone|ipad/i.test(navigator.userAgent)

    // 判断性能等级
    let tier: PerformanceTier
    if (cpuCores <= 2 || memory <= 2) {
      tier = PerformanceTier.LOW
    } else if (cpuCores <= 4 || memory <= 4) {
      tier = PerformanceTier.MEDIUM
    } else {
      tier = PerformanceTier.HIGH
    }

    // 移动设备默认降一级
    if (isMobile && tier === PerformanceTier.HIGH) {
      tier = PerformanceTier.MEDIUM
    }

    const isLowEnd = tier === PerformanceTier.LOW

    return {
      tier,
      cpuCores,
      memoryGB: memory,
      isMobile,
      isLowEnd,
    }
  }

  /**
   * 根据设备生成配置
   * 
   * @param device - 设备信息
   * @returns 性能配置
   */
  private generateConfig(device: DeviceInfo): PerformanceConfig {
    switch (device.tier) {
      case PerformanceTier.LOW:
        return {
          enableComplexAnimations: false,
          enableParticles: false,
          enableBlur: false,
          defaultDuration: 200, // 更短的动画
          maxConcurrentAnimations: 5,
        }

      case PerformanceTier.MEDIUM:
        return {
          enableComplexAnimations: true,
          enableParticles: false,
          enableBlur: false,
          defaultDuration: 300,
          maxConcurrentAnimations: 10,
        }

      case PerformanceTier.HIGH:
        return {
          enableComplexAnimations: true,
          enableParticles: true,
          enableBlur: true,
          defaultDuration: 400,
          maxConcurrentAnimations: 20,
        }
    }
  }

  /**
   * 获取当前配置
   * 
   * @returns 性能配置
   */
  getConfig(): PerformanceConfig {
    return this.config || this.generateConfig(this.detectDevice())
  }

  /**
   * 获取设备信息
   * 
   * @returns 设备信息
   */
  getDevice(): DeviceInfo {
    return this.device || this.detectDevice()
  }

  /**
   * 更新 FPS 并检查是否需要降级
   * 
   * @param fps - 当前 FPS
   */
  updateFPS(fps: number): void {
    this.fpsHistory.push(fps)

    // 保持最近 10 个样本
    if (this.fpsHistory.length > 10) {
      this.fpsHistory.shift()
    }

    // 检查平均 FPS
    const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length

    // 如果 FPS 持续低于 40，降级
    if (avgFPS < 40 && this.device && this.device.tier !== PerformanceTier.LOW) {
      this.downgrade()
    }
    // 如果 FPS 持续高于 55，可以升级
    else if (avgFPS > 55 && this.device && this.device.tier !== PerformanceTier.HIGH) {
      this.upgrade()
    }
  }

  /**
   * 降级性能
   */
  private downgrade(): void {
    if (!this.device || !this.config) return

    console.warn('[PerformanceAdaptive] Downgrading performance tier')

    if (this.device.tier === PerformanceTier.HIGH) {
      this.device.tier = PerformanceTier.MEDIUM
    } else if (this.device.tier === PerformanceTier.MEDIUM) {
      this.device.tier = PerformanceTier.LOW
    }

    this.config = this.generateConfig(this.device)
    this.emit('downgrade', this.device.tier)
  }

  /**
   * 升级性能
   */
  private upgrade(): void {
    if (!this.device || !this.config) return

    console.log('[PerformanceAdaptive] Upgrading performance tier')

    if (this.device.tier === PerformanceTier.LOW) {
      this.device.tier = PerformanceTier.MEDIUM
    } else if (this.device.tier === PerformanceTier.MEDIUM) {
      this.device.tier = PerformanceTier.HIGH
    }

    this.config = this.generateConfig(this.device)
    this.emit('upgrade', this.device.tier)
  }

  /**
   * 监听事件
   * 
   * @param event - 事件名（'downgrade' | 'upgrade'）
   * @param callback - 回调函数
   */
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
  }

  /**
   * 取消监听
   * 
   * @param event - 事件名
   * @param callback - 回调函数
   */
  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.delete(callback)
    }
  }

  /**
   * 触发事件
   * 
   * @param event - 事件名
   * @param data - 事件数据
   */
  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  /**
   * 重置为初始状态
   */
  reset(): void {
    this.device = this.detectDevice()
    this.config = this.generateConfig(this.device)
    this.fpsHistory = []
  }
}

/**
 * 全局性能自适应实例
 */
export const performanceAdaptive = new PerformanceAdaptive()


