/**
 * 页面过渡效果
 */

import type { PageTransitionConfig } from './types'
import { fadeOut, fadeIn } from '../presets/css/fade'

/**
 * 页面过渡类
 */
export class PageTransition {
  private config: Required<PageTransitionConfig>

  constructor(config: PageTransitionConfig = {}) {
    this.config = {
      duration: config.duration ?? 300,
      easing: config.easing ?? 'easeInOutQuad',
      mode: config.mode ?? 'out-in',
      onLeave: config.onLeave ?? (() => { }),
      onEnter: config.onEnter ?? (() => { }),
    }
  }

  /**
   * 执行过渡
   */
  async transition(
    fromPage: HTMLElement | string,
    toPage: HTMLElement | string
  ): Promise<void> {
    const from = typeof fromPage === 'string' ? document.querySelector(fromPage) : fromPage
    const to = typeof toPage === 'string' ? document.querySelector(toPage) : toPage

    if (!from || !to) {
      console.warn('Invalid page elements')
      return
    }

    if (this.config.mode === 'out-in') {
      // 先退出，再进入
      await this.leave(from as HTMLElement)
      await this.enter(to as HTMLElement)
    } else {
      // 同时进入和退出
      await Promise.all([
        this.leave(from as HTMLElement),
        this.enter(to as HTMLElement),
      ])
    }
  }

  /**
   * 离开动画
   */
  private leave(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      this.config.onLeave()
      fadeOut(element, {
        duration: this.config.duration,
        easing: this.config.easing as any,
        onComplete: () => {
          element.style.display = 'none'
          resolve()
        },
      })
    })
  }

  /**
   * 进入动画
   */
  private enter(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      element.style.display = 'block'
      this.config.onEnter()
      fadeIn(element, {
        duration: this.config.duration,
        easing: this.config.easing as any,
        onComplete: resolve,
      })
    })
  }
}

/**
 * 创建页面过渡
 */
export function createPageTransition(config?: PageTransitionConfig): PageTransition {
  return new PageTransition(config)
}






