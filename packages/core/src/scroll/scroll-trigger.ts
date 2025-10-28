/**
 * 滚动触发器
 */

import type { ScrollTriggerOptions } from '../types'

/**
 * 创建滚动触发器
 * 
 * @param options - 滚动触发配置
 * @returns 销毁函数
 * @example
 * ```typescript
 * const cleanup = scrollTrigger({
 *   trigger: '.section',
 *   start: 'top center',
 *   end: 'bottom center',
 *   onEnter: () => console.log('进入视口'),
 *   onLeave: () => console.log('离开视口')
 * })
 * 
 * // 销毁
 * cleanup()
 * ```
 */
export function scrollTrigger(options: ScrollTriggerOptions): () => void {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = false,
    pin = false,
    markers = false,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    onUpdate,
    onToggle,
  } = options

  // 获取触发元素
  const element = typeof trigger === 'string'
    ? document.querySelector(trigger)
    : trigger

  if (!element) {
    console.warn('ScrollTrigger: trigger element not found')
    return () => { }
  }

  // TODO: 实现滚动监听逻辑
  console.log('Creating scroll trigger:', {
    trigger,
    start,
    end,
    scrub,
    pin,
    markers,
  })

  // 使用 IntersectionObserver 监听元素进入/离开视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const progress = entry.intersectionRatio

        if (entry.isIntersecting) {
          onEnter?.()
          onToggle?.(true)
        }
        else {
          onLeave?.()
          onToggle?.(false)
        }

        onUpdate?.(progress)
      })
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )

  observer.observe(element)

  // 返回清理函数
  return () => {
    observer.disconnect()
  }
}

/**
 * 滚动触发器类
 */
export class ScrollTrigger {
  private cleanup: (() => void) | null = null

  constructor(private options: ScrollTriggerOptions) {
    this.init()
  }

  private init(): void {
    this.cleanup = scrollTrigger(this.options)
  }

  /**
   * 销毁触发器
   */
  kill(): void {
    this.cleanup?.()
    this.cleanup = null
  }

  /**
   * 刷新触发器
   */
  refresh(): void {
    this.kill()
    this.init()
  }
}

