/**
 * 文字动画效果
 */

import type { AnimationTarget, AnimationOptions } from '../core/types'
import { from } from '../core/animation'

/**
 * 打字机效果
 */
export async function typewriter(
  target: AnimationTarget | string,
  text: string,
  config: {
    speed?: number
    cursor?: boolean
    onComplete?: () => void
  } = {}
): Promise<void> {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    console.warn('Target element not found')
    return
  }

  const speed = config.speed ?? 50
  const cursor = config.cursor ?? true

  let index = 0
  const originalText = element.textContent || ''

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent = text.slice(0, index + 1) + (cursor ? '|' : '')
        index++
      } else {
        clearInterval(interval)
        if (!cursor) {
          element.textContent = text
        }
        config.onComplete?.()
        resolve()
      }
    }, speed)
  })
}

/**
 * 逐字动画
 */
export function animateChars(
  target: AnimationTarget | string,
  options: AnimationOptions & {
    stagger?: number // 每个字符的延迟
  } = {}
): void {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    console.warn('Target element not found')
    return
  }

  const text = element.textContent || ''
  const stagger = options.stagger ?? 50

  // 清空元素
  element.textContent = ''

  // 创建字符元素
  const chars = text.split('').map((char, index) => {
    const span = document.createElement('span')
    span.textContent = char
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    element.appendChild(span)

    // 延迟动画
    setTimeout(() => {
      from(
        span,
        { opacity: 0, y: 20 },
        {
          duration: options.duration ?? 300,
          easing: options.easing ?? 'easeOutCubic',
          onComplete: index === text.length - 1 ? options.onComplete : undefined,
        }
      )
    }, index * stagger + (options.delay ?? 0))

    return span
  })
}

/**
 * 文字分割
 */
export function splitText(
  target: AnimationTarget | string,
  type: 'chars' | 'words' | 'lines' = 'chars'
): HTMLElement[] {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    console.warn('Target element not found')
    return []
  }

  const text = element.textContent || ''
  const parts: HTMLElement[] = []

  element.textContent = ''

  if (type === 'chars') {
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block'
      element.appendChild(span)
      parts.push(span)
    })
  } else if (type === 'words') {
    text.split(' ').forEach((word, index) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      element.appendChild(span)
      parts.push(span)

      // 添加空格（除了最后一个）
      if (index < text.split(' ').length - 1) {
        element.appendChild(document.createTextNode(' '))
      }
    })
  } else if (type === 'lines') {
    text.split('\n').forEach((line) => {
      const div = document.createElement('div')
      div.textContent = line
      element.appendChild(div)
      parts.push(div)
    })
  }

  return parts
}






