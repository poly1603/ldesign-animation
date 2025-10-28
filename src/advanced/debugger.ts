/**
 * 动画调试工具 - 开发模式下的可视化调试
 * 
 * @description
 * 提供实时动画监控、性能分析、可视化面板等调试功能。
 * 
 * @module
 */

import { engine, memoryMonitor, performanceAdaptive } from '../index'

/**
 * 调试配置
 */
export interface DebuggerConfig {
  /** 是否显示FPS */
  showFPS?: boolean
  /** 是否显示内存 */
  showMemory?: boolean
  /** 是否显示活动动画 */
  showAnimations?: boolean
  /** 是否显示性能警告 */
  showWarnings?: boolean
  /** 更新间隔（毫秒） */
  updateInterval?: number
  /** 面板位置 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/**
 * 动画调试器类
 * 
 * @example
 * ```typescript
 * import { AnimationDebugger } from '@ldesign/animation'
 * 
 * // 开发模式下启用
 * if (process.env.NODE_ENV === 'development') {
 *   const debugger = new AnimationDebugger({
 *     showFPS: true,
 *     showMemory: true,
 *     showAnimations: true
 *   })
 *   debugger.show()
 * }
 * ```
 */
export class AnimationDebugger {
  private config: Required<DebuggerConfig>
  private panel: HTMLDivElement | null = null
  private timerId: number | null = null
  private logs: string[] = []
  private maxLogs: number = 100

  constructor(config: DebuggerConfig = {}) {
    this.config = {
      showFPS: config.showFPS ?? true,
      showMemory: config.showMemory ?? true,
      showAnimations: config.showAnimations ?? true,
      showWarnings: config.showWarnings ?? true,
      updateInterval: config.updateInterval ?? 1000,
      position: config.position ?? 'top-right',
    }
  }

  /**
   * 显示调试面板
   */
  show(): void {
    if (this.panel) return

    this.createPanel()
    this.startMonitoring()
  }

  /**
   * 隐藏调试面板
   */
  hide(): void {
    if (!this.panel) return

    this.stopMonitoring()
    this.panel.remove()
    this.panel = null
  }

  /**
   * 切换显示/隐藏
   */
  toggle(): void {
    if (this.panel) {
      this.hide()
    } else {
      this.show()
    }
  }

  /**
   * 记录日志
   */
  log(message: string, type: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toLocaleTimeString()
    const log = `[${timestamp}] [${type.toUpperCase()}] ${message}`

    this.logs.push(log)

    // 限制日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // 输出到控制台
    console[type](`[AnimationDebugger] ${message}`)

    // 更新面板
    this.updatePanel()
  }

  /**
   * 获取当前统计
   */
  getStats() {
    const engineStats = engine.getStats()
    const memStats = memoryMonitor.getStats()
    const device = performanceAdaptive.getDevice()

    return {
      fps: engineStats.fps,
      activeAnimations: engineStats.activeAnimations,
      memoryUsage: memStats.usedMemory,
      memoryPercent: (memStats.usage * 100).toFixed(1),
      deviceTier: device.tier,
      isRunning: engineStats.isRunning,
    }
  }

  /**
   * 清空日志
   */
  clearLogs(): void {
    this.logs = []
    this.updatePanel()
  }

  /**
   * 创建调试面板
   */
  private createPanel(): void {
    this.panel = document.createElement('div')
    this.panel.id = 'animation-debugger-panel'

    // 样式
    this.applyPanelStyles()

    document.body.appendChild(this.panel)
    this.updatePanel()
  }

  /**
   * 应用面板样式
   */
  private applyPanelStyles(): void {
    if (!this.panel) return

    const positions = {
      'top-left': 'top: 10px; left: 10px;',
      'top-right': 'top: 10px; right: 10px;',
      'bottom-left': 'bottom: 10px; left: 10px;',
      'bottom-right': 'bottom: 10px; right: 10px;',
    }

    this.panel.style.cssText = `
      position: fixed;
      ${positions[this.config.position]}
      z-index: 999999;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 12px;
      border-radius: 8px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 12px;
      line-height: 1.5;
      min-width: 280px;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    `
  }

  /**
   * 更新面板内容
   */
  private updatePanel(): void {
    if (!this.panel) return

    const stats = this.getStats()

    let html = '<div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #444; padding-bottom: 4px;">🎬 Animation Debugger</div>'

    // FPS
    if (this.config.showFPS) {
      const fpsColor = stats.fps >= 55 ? '#0f0' : stats.fps >= 40 ? '#ff0' : '#f00'
      html += `<div style="margin-bottom: 4px;">
        <span style="color: #aaa;">FPS:</span>
        <span style="color: ${fpsColor}; font-weight: bold;">${stats.fps}</span>
      </div>`
    }

    // 活动动画
    if (this.config.showAnimations) {
      html += `<div style="margin-bottom: 4px;">
        <span style="color: #aaa;">Animations:</span>
        <span style="color: #0cf;">${stats.activeAnimations}</span>
      </div>`
    }

    // 内存
    if (this.config.showMemory) {
      const memColor = parseFloat(stats.memoryPercent) < 70 ? '#0f0' : parseFloat(stats.memoryPercent) < 85 ? '#ff0' : '#f00'
      html += `<div style="margin-bottom: 4px;">
        <span style="color: #aaa;">Memory:</span>
        <span style="color: ${memColor};">${stats.memoryUsage.toFixed(1)}MB (${stats.memoryPercent}%)</span>
      </div>`
    }

    // 设备等级
    html += `<div style="margin-bottom: 4px;">
      <span style="color: #aaa;">Device:</span>
      <span style="color: #0cf;">${stats.deviceTier}</span>
    </div>`

    // 引擎状态
    html += `<div style="margin-bottom: 8px;">
      <span style="color: #aaa;">Engine:</span>
      <span style="color: ${stats.isRunning ? '#0f0' : '#f00'};">${stats.isRunning ? 'Running' : 'Stopped'}</span>
    </div>`

    // 最近日志（最多显示5条）
    if (this.logs.length > 0) {
      html += '<div style="border-top: 1px solid #444; padding-top: 8px; margin-top: 8px;">'
      html += '<div style="font-size: 10px; color: #aaa; margin-bottom: 4px;">Recent Logs:</div>'
      html += '<div style="max-height: 100px; overflow-y: auto; font-size: 10px;">'

      const recentLogs = this.logs.slice(-5)
      recentLogs.forEach(log => {
        const color = log.includes('[ERROR]') ? '#f00' : log.includes('[WARN]') ? '#ff0' : '#aaa'
        html += `<div style="color: ${color}; margin-bottom: 2px;">${log}</div>`
      })

      html += '</div>'
      html += `<button style="
        margin-top: 4px;
        padding: 2px 8px;
        background: #444;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
      " onclick="window.__animationDebugger?.clearLogs()">Clear Logs</button>`
      html += '</div>'
    }

    this.panel.innerHTML = html

      // 暴露到全局以便按钮调用
      (window as any).__animationDebugger = this
  }

  /**
   * 开始监控
   */
  private startMonitoring(): void {
    memoryMonitor.start()

    this.timerId = window.setInterval(() => {
      this.updatePanel()

      // 性能警告
      if (this.config.showWarnings) {
        const stats = this.getStats()

        if (stats.fps < 40) {
          this.log(`Low FPS detected: ${stats.fps}`, 'warn')
        }

        if (parseFloat(stats.memoryPercent) > 85) {
          this.log(`High memory usage: ${stats.memoryPercent}%`, 'warn')
        }
      }
    }, this.config.updateInterval)
  }

  /**
   * 停止监控
   */
  private stopMonitoring(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  /**
   * 导出统计数据（用于分析）
   */
  exportStats(): string {
    const stats = this.getStats()
    const data = {
      timestamp: new Date().toISOString(),
      stats,
      logs: this.logs,
    }
    return JSON.stringify(data, null, 2)
  }
}

/**
 * 创建调试器实例
 */
export function createDebugger(config?: DebuggerConfig): AnimationDebugger {
  return new AnimationDebugger(config)
}

/**
 * 全局调试器实例（开发模式）
 */
export const animationDebugger = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'
  ? new AnimationDebugger()
  : null


