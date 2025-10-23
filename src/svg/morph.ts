/**
 * SVG 形状变形
 */

import type { SVGMorphConfig } from './types'

/**
 * SVG 形状变形（简单实现）
 * @param from - 起始路径
 * @param to - 目标路径
 * @param config - 配置
 */
export function morphSVG(
  from: SVGPathElement | string,
  to: SVGPathElement | string,
  config: SVGMorphConfig = {}
): void {
  const fromEl = typeof from === 'string' ? document.querySelector(from) : from
  const toEl = typeof to === 'string' ? document.querySelector(to) : to

  if (!fromEl || !toEl || !(fromEl instanceof SVGPathElement) || !(toEl instanceof SVGPathElement)) {
    console.warn('Invalid SVG path elements')
    return
  }

  const fromPath = fromEl.getAttribute('d') || ''
  const toPath = toEl.getAttribute('d') || ''

  // 注意：完整的路径变形需要复杂的路径插值算法
  // 这里提供一个简化版本，实际项目中可能需要使用库如 flubber

  console.warn('SVG morphing requires complex path interpolation. Consider using a library like flubber.')

  // 简单的淡入淡出模拟
  const duration = config.duration ?? 1000
  let startTime: number | null = null

  function animate(currentTime: number) {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 简单地在中点切换（不是真正的变形）
    if (progress >= 0.5 && fromEl.getAttribute('d') === fromPath) {
      fromEl.setAttribute('d', toPath)
    }

    config.onUpdate?.(progress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      config.onComplete?.()
    }
  }

  requestAnimationFrame(animate)
}






