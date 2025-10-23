/**
 * 列表过渡 - FLIP 动画
 * FLIP: First, Last, Invert, Play
 */

import type { FLIPConfig, FLIPState } from './types'
import { to } from '../core/animation'

/**
 * FLIP 动画类
 */
export class FLIPAnimation {
  private states: Map<HTMLElement, FLIPState> = new Map()
  private config: Required<FLIPConfig>

  constructor(config: FLIPConfig = {}) {
    this.config = {
      duration: config.duration ?? 300,
      easing: config.easing ?? 'easeOutCubic',
      scale: config.scale ?? true,
      onComplete: config.onComplete ?? (() => { }),
    }
  }

  /**
   * 记录初始状态 (First)
   */
  first(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      this.states.set(element, {
        element,
        first: rect,
        last: rect,
      })
    })
  }

  /**
   * 记录最终状态 (Last) 并播放动画 (Invert & Play)
   */
  play(elements: HTMLElement[]): void {
    // 记录最终位置 (Last)
    elements.forEach((element) => {
      const state = this.states.get(element)
      if (state) {
        state.last = element.getBoundingClientRect()
      }
    })

    // 计算差值并播放动画 (Invert & Play)
    elements.forEach((element) => {
      const state = this.states.get(element)
      if (!state) return

      const deltaX = state.first.left - state.last.left
      const deltaY = state.first.top - state.last.top
      const deltaW = state.first.width / state.last.width
      const deltaH = state.first.height / state.last.height

      // 如果没有变化，跳过
      if (deltaX === 0 && deltaY === 0 && deltaW === 1 && deltaH === 1) {
        return
      }

      // Invert: 设置初始变换
      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
      element.style.transformOrigin = '0 0'

      // Play: 动画到最终状态
      to(
        element,
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        },
        {
          duration: this.config.duration,
          easing: this.config.easing as any,
          onComplete: () => {
            element.style.transform = ''
            element.style.transformOrigin = ''
            this.config.onComplete()
          },
        }
      )
    })

    // 清理状态
    this.states.clear()
  }

  /**
   * 快捷方法：自动执行 FLIP
   */
  async auto(
    elements: HTMLElement[],
    callback: () => void | Promise<void>
  ): Promise<void> {
    // First
    this.first(elements)

    // 执行 DOM 更新
    await Promise.resolve(callback())

    // 等待浏览器重绘
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)))

    // Last & Play
    this.play(elements)
  }
}

/**
 * 创建 FLIP 动画
 */
export function createFLIP(config?: FLIPConfig): FLIPAnimation {
  return new FLIPAnimation(config)
}

/**
 * 快捷方法：列表重排动画
 */
export async function animateList(
  container: HTMLElement | string,
  callback: () => void | Promise<void>,
  config?: FLIPConfig
): Promise<void> {
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container
  if (!containerEl) {
    console.warn('Container not found')
    return
  }

  const elements = Array.from(containerEl.children) as HTMLElement[]
  const flip = new FLIPAnimation(config)
  await flip.auto(elements, callback)
}






