/**
 * 视差效果
 */

import type { AnimationTarget } from '../core/types'

/**
 * 视差配置
 */
export interface ParallaxConfig {
  speed?: number // 速度因子（默认 0.5，值越小越慢）
  direction?: 'vertical' | 'horizontal' | 'both'
  container?: HTMLElement | Window
}

/**
 * 视差类
 */
export class Parallax {
  private target: HTMLElement
  private config: Required<ParallaxConfig>
  private scrollHandler: (() => void) | null = null
  private initialY: number = 0
  private initialX: number = 0

  constructor(target: AnimationTarget | string, config: ParallaxConfig = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) {
      throw new Error(`Target element not found: ${target}`)
    }

    this.target = element as HTMLElement
    this.config = {
      speed: config.speed ?? 0.5,
      direction: config.direction ?? 'vertical',
      container: config.container ?? window,
    }

    // 记录初始位置
    const rect = this.target.getBoundingClientRect()
    this.initialY = rect.top + window.pageYOffset
    this.initialX = rect.left + window.pageXOffset

    this.init()
  }

  /**
   * 初始化
   */
  private init(): void {
    this.scrollHandler = this.handleScroll.bind(this)
    this.config.container.addEventListener('scroll', this.scrollHandler, { passive: true })
    this.handleScroll() // 初始更新
  }

  /**
   * 处理滚动
   */
  private handleScroll = () => {
    const scrollY = this.config.container instanceof Window
      ? window.pageYOffset
      : this.config.container.scrollTop

    const scrollX = this.config.container instanceof Window
      ? window.pageXOffset
      : this.config.container.scrollLeft

    let translateY = 0
    let translateX = 0

    if (this.config.direction === 'vertical' || this.config.direction === 'both') {
      translateY = (scrollY - this.initialY) * this.config.speed
    }

    if (this.config.direction === 'horizontal' || this.config.direction === 'both') {
      translateX = (scrollX - this.initialX) * this.config.speed
    }

    this.target.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
  }

  /**
   * 销毁
   */
  destroy(): void {
    if (this.scrollHandler) {
      this.config.container.removeEventListener('scroll', this.scrollHandler)
      this.scrollHandler = null
    }
  }
}

/**
 * 创建视差效果
 */
export function parallax(
  target: AnimationTarget | string,
  config?: ParallaxConfig
): Parallax {
  return new Parallax(target, config)
}

