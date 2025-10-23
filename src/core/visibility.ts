/**
 * 页面可见性管理 - 自动暂停/恢复动画
 * 
 * 当用户切换标签页时，自动暂停动画以节省性能
 */

import { engine } from './engine'

/**
 * 页面可见性管理器
 */
export class VisibilityManager {
  private enabled: boolean = false
  private handleVisibilityChange: (() => void) | null = null

  /**
   * 启用自动管理
   */
  enable(): void {
    if (this.enabled) return

    this.handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面不可见，暂停所有动画
        engine.pauseAll()
        console.debug('[Animation] 页面不可见，暂停动画')
      } else {
        // 页面可见，恢复动画
        engine.resumeAll()
        console.debug('[Animation] 页面可见，恢复动画')
      }
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    this.enabled = true
  }

  /**
   * 禁用自动管理
   */
  disable(): void {
    if (!this.enabled || !this.handleVisibilityChange) return

    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    this.handleVisibilityChange = null
    this.enabled = false
  }

  /**
   * 检查是否启用
   */
  isEnabled(): boolean {
    return this.enabled
  }
}

/**
 * 全局可见性管理器
 */
export const visibilityManager = new VisibilityManager()

// 默认启用
if (typeof document !== 'undefined') {
  visibilityManager.enable()
}



