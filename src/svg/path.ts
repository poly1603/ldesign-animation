/**
 * SVG 路径动画
 */

import type { SVGPathConfig } from './types'
import { to } from '../core/animation'

/**
 * SVG 描边动画（drawSVG）
 * @param path - SVG path 元素
 * @param config - 配置
 */
export function drawSVG(
  path: SVGPathElement | string,
  config: SVGPathConfig = {}
): void {
  const element = typeof path === 'string' ? document.querySelector(path) : path
  if (!element || !(element instanceof SVGPathElement)) {
    console.warn('Invalid SVG path element')
    return
  }

  // 获取路径总长度
  const length = element.getTotalLength()

  // 设置初始状态
  element.style.strokeDasharray = `${length}`
  element.style.strokeDashoffset = `${length}`

  // 动画到完全显示
  to(
    element as any,
    { strokeDashoffset: 0 } as any,
    {
      duration: config.duration ?? 1000,
      easing: config.easing ?? 'easeOutCubic',
      onComplete: config.onComplete,
      onUpdate: config.onUpdate,
    }
  )
}

/**
 * SVG 路径跟随动画（motionPath）
 * @param element - 要移动的元素
 * @param path - SVG 路径
 * @param config - 配置
 */
export function motionPath(
  element: HTMLElement | SVGElement | string,
  path: SVGPathElement | string,
  config: SVGPathConfig = {}
): void {
  const el = typeof element === 'string' ? document.querySelector(element) : element
  const pathEl = typeof path === 'string' ? document.querySelector(path) : path

  if (!el || !pathEl || !(pathEl instanceof SVGPathElement)) {
    console.warn('Invalid element or path')
    return
  }

  const length = pathEl.getTotalLength()
  const duration = config.duration ?? 1000

  let startTime: number | null = null

  function animate(currentTime: number) {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 获取路径上的点
    const point = pathEl.getPointAtLength(progress * length)

      // 更新元素位置
      ; (el as HTMLElement).style.transform = `translate(${point.x}px, ${point.y}px)`

    config.onUpdate?.(progress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      config.onComplete?.()
    }
  }

  requestAnimationFrame(animate)
}






