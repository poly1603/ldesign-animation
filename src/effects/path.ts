/**
 * 路径动画增强
 * 提供高级路径动画功能
 */

import type { AnimationTarget, AnimationOptions } from '../core/types'
import { to, keyframes } from '../core/animation'

/**
 * 路径点接口
 */
export interface PathPoint {
  x: number
  y: number
}

/**
 * 贝塞尔曲线配置
 */
export interface BezierConfig {
  start: PathPoint
  control1: PathPoint
  control2?: PathPoint
  end: PathPoint
}

/**
 * 沿路径运动
 * @param target - 目标元素
 * @param path - 路径点数组或 SVG 路径字符串
 * @param options - 动画选项
 */
export function followPath(
  target: AnimationTarget | string,
  path: PathPoint[] | string,
  options?: AnimationOptions
) {
  let pathPoints: PathPoint[]

  if (typeof path === 'string') {
    // 解析 SVG 路径
    pathPoints = parseSVGPath(path)
  } else {
    pathPoints = path
  }

  // 创建关键帧
  const frames = pathPoints.map((point) => ({
    x: point.x,
    y: point.y,
  }))

  return keyframes(target, frames, {
    duration: 2000,
    easing: 'linear',
    ...options,
  })
}

/**
 * 路径描绘动画
 * @param target - 目标 SVG 路径元素
 * @param options - 动画选项
 */
export function drawPath(
  target: AnimationTarget | string,
  options?: AnimationOptions
) {
  const element = typeof target === 'string'
    ? document.querySelector(target) as SVGPathElement
    : target as SVGPathElement

  if (!element || !(element instanceof SVGPathElement)) {
    console.warn('drawPath requires an SVG path element')
    return
  }

  const length = element.getTotalLength()

  // 设置初始状态
  element.style.strokeDasharray = `${length}`
  element.style.strokeDashoffset = `${length}`

  return to(element, { strokeDashoffset: 0 }, {
    duration: 2000,
    easing: 'easeInOutCubic',
    ...options,
  })
}

/**
 * 路径形变
 * @param target - 目标 SVG 路径元素
 * @param toPath - 目标路径
 * @param options - 动画选项
 */
export function morphPath(
  target: AnimationTarget | string,
  toPath: string,
  options?: AnimationOptions
) {
  const element = typeof target === 'string'
    ? document.querySelector(target) as SVGPathElement
    : target as SVGPathElement

  if (!element || !(element instanceof SVGPathElement)) {
    console.warn('morphPath requires an SVG path element')
    return
  }

  const fromPath = element.getAttribute('d') || ''

  // 简化的形变实现，实际项目中可能需要更复杂的路径插值
  return to(element, { d: toPath }, {
    duration: 1000,
    easing: 'easeInOutCubic',
    ...options,
  })
}

/**
 * 贝塞尔曲线运动
 * @param target - 目标元素
 * @param config - 贝塞尔曲线配置
 * @param options - 动画选项
 */
export function bezierPath(
  target: AnimationTarget | string,
  config: BezierConfig,
  options?: AnimationOptions
) {
  const points = generateBezierPoints(config, 20)
  return followPath(target, points, options)
}

/**
 * 圆形路径运动
 * @param target - 目标元素
 * @param radius - 半径
 * @param centerX - 中心 X 坐标
 * @param centerY - 中心 Y 坐标
 * @param options - 动画选项
 */
export function circularPath(
  target: AnimationTarget | string,
  radius: number = 100,
  centerX: number = 0,
  centerY: number = 0,
  options?: AnimationOptions
) {
  const points: PathPoint[] = []
  const steps = 36 // 每 10 度一个点

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    })
  }

  return followPath(target, points, {
    duration: 3000,
    easing: 'linear',
    ...options,
  })
}

/**
 * 螺旋路径运动
 * @param target - 目标元素
 * @param turns - 圈数
 * @param radius - 最大半径
 * @param options - 动画选项
 */
export function spiralPath(
  target: AnimationTarget | string,
  turns: number = 3,
  radius: number = 100,
  options?: AnimationOptions
) {
  const points: PathPoint[] = []
  const steps = turns * 36

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 * turns
    const currentRadius = (i / steps) * radius
    points.push({
      x: Math.cos(angle) * currentRadius,
      y: Math.sin(angle) * currentRadius,
    })
  }

  return followPath(target, points, {
    duration: turns * 1000,
    easing: 'linear',
    ...options,
  })
}

/**
 * 波浪路径运动
 * @param target - 目标元素
 * @param width - 宽度
 * @param amplitude - 振幅
 * @param frequency - 频率
 * @param options - 动画选项
 */
export function wavePath(
  target: AnimationTarget | string,
  width: number = 300,
  amplitude: number = 50,
  frequency: number = 2,
  options?: AnimationOptions
) {
  const points: PathPoint[] = []
  const steps = 50

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const y = Math.sin((i / steps) * Math.PI * 2 * frequency) * amplitude
    points.push({ x, y })
  }

  return followPath(target, points, {
    duration: 2000,
    easing: 'linear',
    ...options,
  })
}

/**
 * 8字形路径运动
 * @param target - 目标元素
 * @param size - 大小
 * @param options - 动画选项
 */
export function figureEightPath(
  target: AnimationTarget | string,
  size: number = 100,
  options?: AnimationOptions
) {
  const points: PathPoint[] = []
  const steps = 72

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const x = size * Math.sin(t)
    const y = size * Math.sin(t) * Math.cos(t)
    points.push({ x, y })
  }

  return followPath(target, points, {
    duration: 3000,
    easing: 'linear',
    ...options,
  })
}

/**
 * 解析 SVG 路径为点数组（简化版）
 */
function parseSVGPath(pathString: string): PathPoint[] {
  // 这是一个简化的实现
  // 实际项目中建议使用成熟的 SVG 路径解析库
  const points: PathPoint[] = []

  // 简单处理 M 和 L 命令
  const commands = pathString.match(/[MLHVZmlhvz][^MLHVZmlhvz]*/g) || []

  commands.forEach(cmd => {
    const type = cmd[0]
    const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number)

    if (type === 'M' || type === 'L') {
      points.push({ x: coords[0], y: coords[1] })
    }
  })

  return points
}

/**
 * 生成贝塞尔曲线点
 */
function generateBezierPoints(config: BezierConfig, steps: number = 20): PathPoint[] {
  const points: PathPoint[] = []

  if (config.control2) {
    // 三次贝塞尔曲线
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const point = cubicBezier(
        config.start,
        config.control1,
        config.control2,
        config.end,
        t
      )
      points.push(point)
    }
  } else {
    // 二次贝塞尔曲线
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const point = quadraticBezier(
        config.start,
        config.control1,
        config.end,
        t
      )
      points.push(point)
    }
  }

  return points
}

/**
 * 二次贝塞尔曲线计算
 */
function quadraticBezier(
  p0: PathPoint,
  p1: PathPoint,
  p2: PathPoint,
  t: number
): PathPoint {
  const mt = 1 - t
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  }
}

/**
 * 三次贝塞尔曲线计算
 */
function cubicBezier(
  p0: PathPoint,
  p1: PathPoint,
  p2: PathPoint,
  p3: PathPoint,
  t: number
): PathPoint {
  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt
  const t2 = t * t
  const t3 = t2 * t

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  }
}

/**
 * 获取路径上的点
 * @param path - SVG 路径元素
 * @param progress - 进度（0-1）
 */
export function getPointAtLength(
  path: SVGPathElement,
  progress: number
): PathPoint {
  const length = path.getTotalLength()
  const point = path.getPointAtLength(length * progress)
  return { x: point.x, y: point.y }
}

/**
 * 路径缓动动画
 * @param target - 目标元素
 * @param path - SVG 路径元素或选择器
 * @param options - 动画选项
 */
export function pathEasing(
  target: AnimationTarget | string,
  path: SVGPathElement | string,
  options?: AnimationOptions
) {
  const pathElement = typeof path === 'string'
    ? document.querySelector(path) as SVGPathElement
    : path

  if (!pathElement || !(pathElement instanceof SVGPathElement)) {
    console.warn('pathEasing requires an SVG path element')
    return
  }

  const length = pathElement.getTotalLength()
  const steps = 60
  const points: PathPoint[] = []

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps
    const point = pathElement.getPointAtLength(length * progress)
    points.push({ x: point.x, y: point.y })
  }

  return followPath(target, points, {
    duration: 2000,
    easing: 'linear',
    ...options,
  })
}

