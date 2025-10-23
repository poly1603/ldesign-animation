/**
 * ScrollTrigger 滚动触发动画
 */

import type { AnimationTarget, AnimationConfig } from '../core/types'
import type { ScrollTriggerConfig, ScrollAnimationConfig } from './types'
import { Animation, animate } from '../core/animation'
import { IntersectionManager } from './intersection'

/**
 * 解析位置字符串
 * 例如: 'top top', 'center center', 'bottom 100px'
 */
function parsePosition(position: string | number): { trigger: number; viewport: number } {
  if (typeof position === 'number') {
    return { trigger: position, viewport: 0 }
  }

  const parts = position.split(' ')
  const triggerPos = parts[0] || 'top'
  const viewportPos = parts[1] || 'top'

  const positions: Record<string, number> = {
    'top': 0,
    'center': 0.5,
    'bottom': 1,
  }

  return {
    trigger: positions[triggerPos] ?? 0,
    viewport: positions[viewportPos] ?? 0,
  }
}

/**
 * ScrollTrigger 类
 */
export class ScrollTrigger {
  private config: ScrollTriggerConfig
  private trigger: Element
  private scroller: HTMLElement | Window
  private animation?: Animation
  private isActive: boolean = false
  private scrollHandler: (() => void) | null = null
  private intersectionManager?: IntersectionManager

  constructor(
    trigger: AnimationTarget | string,
    config: ScrollTriggerConfig = {}
  ) {
    const element = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
    if (!element) {
      throw new Error(`Trigger element not found: ${trigger}`)
    }

    this.trigger = element
    this.config = {
      start: 'top bottom',
      end: 'bottom top',
      direction: 'vertical',
      enabled: true,
      ...config,
    }

    this.scroller = config.scroller ?? window

    this.init()
  }

  /**
   * 初始化
   */
  private init(): void {
    if (!this.config.enabled) return

    // 使用 IntersectionObserver 进行基础检测
    this.intersectionManager = new IntersectionManager({
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    this.intersectionManager.observe(this.trigger, {
      onEnter: () => {
        this.config.onEnter?.()
        this.handleToggle(true)
      },
      onLeave: () => {
        this.config.onLeave?.()
        this.handleToggle(false)
      },
      onChange: (entry) => {
        const progress = entry.intersectionRatio
        this.config.onUpdate?.(progress)
      },
    })

    // 监听滚动事件（用于更精确的控制）
    this.scrollHandler = this.handleScroll.bind(this)
    this.scroller.addEventListener('scroll', this.scrollHandler, { passive: true })
  }

  /**
   * 处理滚动
   */
  private handleScroll(): void {
    const scrollTop = this.scroller instanceof Window
      ? window.pageYOffset || document.documentElement.scrollTop
      : this.scroller.scrollTop

    const viewportHeight = this.scroller instanceof Window
      ? window.innerHeight
      : this.scroller.clientHeight

    const rect = this.trigger.getBoundingClientRect()
    const triggerTop = this.scroller instanceof Window
      ? rect.top + scrollTop
      : rect.top + this.scroller.scrollTop

    // 计算滚动进度
    const start = this.parseStart()
    const end = this.parseEnd()

    const startPos = triggerTop - viewportHeight * start.viewport + rect.height * start.trigger
    const endPos = triggerTop - viewportHeight * end.viewport + rect.height * end.trigger

    const scrollProgress = (scrollTop - startPos) / (endPos - startPos)
    const progress = Math.max(0, Math.min(1, scrollProgress))

    // 更新进度
    this.config.onUpdate?.(progress)
  }

  /**
   * 解析开始位置
   */
  private parseStart(): { trigger: number; viewport: number } {
    return parsePosition(this.config.start!)
  }

  /**
   * 解析结束位置
   */
  private parseEnd(): { trigger: number; viewport: number } {
    return parsePosition(this.config.end!)
  }

  /**
   * 处理激活状态切换
   */
  private handleToggle(isActive: boolean): void {
    if (this.isActive === isActive) return

    this.isActive = isActive
    this.config.onToggle?.(isActive)
  }

  /**
   * 启用
   */
  enable(): void {
    this.config.enabled = true
    this.init()
  }

  /**
   * 禁用
   */
  disable(): void {
    this.config.enabled = false
    this.destroy()
  }

  /**
   * 销毁
   */
  destroy(): void {
    if (this.scrollHandler) {
      this.scroller.removeEventListener('scroll', this.scrollHandler)
      this.scrollHandler = null
    }

    if (this.intersectionManager) {
      this.intersectionManager.unobserve(this.trigger)
      this.intersectionManager = undefined
    }

    this.animation?.stop()
  }
}

/**
 * 创建 ScrollTrigger
 */
export function createScrollTrigger(
  trigger: AnimationTarget | string,
  config: ScrollTriggerConfig = {}
): ScrollTrigger {
  return new ScrollTrigger(trigger, config)
}

/**
 * 创建滚动动画
 */
export function scrollAnimate(
  target: AnimationTarget | string,
  config: ScrollAnimationConfig
): ScrollTrigger {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }

  const scrollTrigger = new ScrollTrigger(
    config.trigger ?? element,
    {
      ...config,
      onUpdate: (progress) => {
        if (config.scrub) {
          // 跟随滚动进度更新动画
          // TODO: 实现 scrub 动画
        }
        config.onUpdate?.(progress)
      },
    }
  )

  return scrollTrigger
}






