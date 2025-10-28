/**
 * SVG 路径动画
 */

import type { Animation, SVGPathOptions } from '../types'

/**
 * 创建 SVG 路径动画
 * 
 * @param options - 路径动画配置
 * @returns 动画实例
 * @example
 * ```typescript
 * svgPath({
 *   targets: 'path',
 *   duration: 2000,
 *   easing: 'easeInOutSine'
 * })
 * ```
 */
export function svgPath(options: SVGPathOptions): Animation {
  // TODO: 实现 SVG 路径动画
  console.log('Creating SVG path animation:', options)

  return {
    play() {
      console.log('SVG animation play')
      return this
    },
    pause() {
      console.log('SVG animation pause')
      return this
    },
    restart() {
      console.log('SVG animation restart')
      return this
    },
    reverse() {
      console.log('SVG animation reverse')
      return this
    },
    seek(time: number) {
      console.log('SVG animation seek:', time)
      return this
    },
    seekProgress(progress: number) {
      console.log('SVG animation seekProgress:', progress)
      return this
    },
    cancel() {
      console.log('SVG animation cancel')
    },
    finish() {
      console.log('SVG animation finish')
    },
    get playing() {
      return false
    },
    get progress() {
      return 0
    },
    get currentTime() {
      return 0
    },
    get duration() {
      return options.duration ?? 1000
    },
  }
}

/**
 * 获取 SVG 路径总长度
 * 
 * @param path - SVG 路径元素或选择器
 * @returns 路径长度
 */
export function getPathLength(path: string | SVGPathElement): number {
  const element = typeof path === 'string'
    ? document.querySelector<SVGPathElement>(path)
    : path

  if (!element || !(element instanceof SVGPathElement)) {
    console.warn('getPathLength: invalid path element')
    return 0
  }

  return element.getTotalLength()
}

/**
 * 在路径上获取指定进度的点
 * 
 * @param path - SVG 路径元素
 * @param progress - 进度 (0-1)
 * @returns 点坐标
 */
export function getPointAtProgress(
  path: SVGPathElement,
  progress: number,
): DOMPoint {
  const length = path.getTotalLength()
  return path.getPointAtLength(length * progress)
}

