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
/**
 * ScrollTrigger 类（优化版 - 添加资源清理）
 */
export class ScrollTrigger {
  private config: ScrollTriggerConfig
  private trigger: Element
  private scroller: HTMLElement | Window
  private animation?: Animation
  private isActive: boolean = false
  private scrollHandler: (() => void) | null = null
  private intersectionManager?: IntersectionManager
  private disposed: boolean = false

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
   * 销毁（清理所有资源）
   */
  destroy(): void {
    if (this.disposed) return

    if (this.scrollHandler) {
      this.scroller.removeEventListener('scroll', this.scrollHandler)
      this.scrollHandler = null
    }

    if (this.intersectionManager) {
      this.intersectionManager.unobserve(this.trigger)
      this.intersectionManager = undefined
    }

    this.animation?.stop()
    this.animation = undefined

    this.disposed = true
  }

  /**
   * 检查是否已销毁
   */
  isDisposed(): boolean {
    return this.disposed
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
 * 创建滚动动画（支持 scrub）
 */
export function scrollAnimate(
  target: AnimationTarget | string,
  config: ScrollAnimationConfig
): ScrollTrigger {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    throw new Error(`Target element not found: ${target}`)
  }

  let animation: Animation | null = null

  const scrollTrigger = new ScrollTrigger(
    config.trigger ?? element,
    {
      ...config,
      onEnter: () => {
        if (!config.scrub && config.animation) {
          // 非 scrub 模式，直接播放动画
          animation = animate(element, config.animation)
        }
        config.onEnter?.()
      },
      onUpdate: (progress) => {
        if (config.scrub && config.animation) {
          // Scrub 模式：根据滚动进度更新动画
          if (!animation) {
            // 创建动画但暂停
            animation = animate(element, {
              ...config.animation,
              duration: config.animation.duration ?? 1000,
            })
            animation.stop()
          }

          // 使用 scrub 平滑插值
          const smoothProgress = typeof config.scrub === 'number'
            ? smoothInterpolate(progress, config.scrub)
            : progress

          // 手动更新动画进度（需要扩展 Animation API）
          // 这里使用简化实现，直接设置样式
          if (config.animation.props) {
            Object.entries(config.animation.props).forEach(([prop, value]) => {
              const numValue = typeof value === 'number' ? value : parseFloat(String(value))
              const currentValue = numValue * smoothProgress
                ; (element as HTMLElement).style[prop as any] = String(currentValue)
            })
          }
        }
        config.onUpdate?.(progress)
      },
      onLeave: () => {
        if (!config.scrub && animation) {
          animation.stop()
          animation = null
        }
        config.onLeave?.()
      },
    }
  )

  return scrollTrigger
}

/**
 * 平滑插值（用于 scrub）
 */
function smoothInterpolate(target: number, smoothness: number): number {
  // 使用指数平滑
  return target + (target - target) * (1 - smoothness)
}






