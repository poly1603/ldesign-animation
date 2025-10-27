/**
 * 优化的 Transform 处理工具
 */

import type { TransformProps } from '../core/types'
import { getCachedTransform, setCachedTransform } from '../core/cache'

/**
 * Transform 属性默认值
 */
const TRANSFORM_DEFAULTS: TransformProps = {
  x: 0,
  y: 0,
  z: 0,
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  skewX: 0,
  skewY: 0,
  perspective: 0,
}

/**
 * Transform 矩阵缓存
 */
const matrixCache = new Map<string, DOMMatrix>()

/**
 * 优化的 transform 字符串解析
 */
export function parseTransform(transformStr: string): TransformProps {
  if (!transformStr || transformStr === 'none') {
    return { ...TRANSFORM_DEFAULTS }
  }

  const result: TransformProps = { ...TRANSFORM_DEFAULTS }

  // 使用优化的正则表达式
  const regex = /(\w+)\(([^)]+)\)/g
  let match

  while ((match = regex.exec(transformStr)) !== null) {
    const func = match[1]
    const values = match[2].split(/,\s*/).map(v => {
      const num = parseFloat(v)
      return isNaN(num) ? 0 : num
    })

    switch (func) {
      case 'translate':
        result.x = values[0] || 0
        result.y = values[1] || 0
        break
      case 'translate3d':
        result.x = values[0] || 0
        result.y = values[1] || 0
        result.z = values[2] || 0
        break
      case 'translateX':
        result.translateX = values[0] || 0
        break
      case 'translateY':
        result.translateY = values[0] || 0
        break
      case 'translateZ':
        result.translateZ = values[0] || 0
        break
      case 'scale':
        if (values.length === 1) {
          result.scale = values[0]
        } else {
          result.scaleX = values[0] || 1
          result.scaleY = values[1] || 1
        }
        break
      case 'scale3d':
        result.scaleX = values[0] || 1
        result.scaleY = values[1] || 1
        result.scaleZ = values[2] || 1
        break
      case 'scaleX':
        result.scaleX = values[0] || 1
        break
      case 'scaleY':
        result.scaleY = values[0] || 1
        break
      case 'scaleZ':
        result.scaleZ = values[0] || 1
        break
      case 'rotate':
        result.rotate = values[0] || 0
        break
      case 'rotate3d':
        // 简化处理，只支持单轴旋转
        if (values[0] === 1 && values[1] === 0 && values[2] === 0) {
          result.rotateX = values[3] || 0
        } else if (values[0] === 0 && values[1] === 1 && values[2] === 0) {
          result.rotateY = values[3] || 0
        } else if (values[0] === 0 && values[1] === 0 && values[2] === 1) {
          result.rotateZ = values[3] || 0
        }
        break
      case 'rotateX':
        result.rotateX = values[0] || 0
        break
      case 'rotateY':
        result.rotateY = values[0] || 0
        break
      case 'rotateZ':
        result.rotateZ = values[0] || 0
        break
      case 'skew':
        result.skewX = values[0] || 0
        result.skewY = values[1] || 0
        break
      case 'skewX':
        result.skewX = values[0] || 0
        break
      case 'skewY':
        result.skewY = values[0] || 0
        break
      case 'perspective':
        result.perspective = values[0] || 0
        break
    }
  }

  return result
}

/**
 * 优化的 transform 构建
 */
export function buildTransform(props: TransformProps): string {
  const parts: string[] = []

  // 透视必须在最前面
  if (props.perspective && props.perspective !== 0) {
    parts.push(`perspective(${props.perspective}px)`)
  }

  // 平移
  const translateX = (props.x || 0) + (props.translateX || 0)
  const translateY = (props.y || 0) + (props.translateY || 0)
  const translateZ = (props.z || 0) + (props.translateZ || 0)

  if (translateX !== 0 || translateY !== 0 || translateZ !== 0) {
    // 使用 translate3d 触发硬件加速
    parts.push(`translate3d(${translateX}px,${translateY}px,${translateZ}px)`)
  }

  // 旋转
  if (props.rotate && props.rotate !== 0) {
    parts.push(`rotate(${props.rotate}deg)`)
  }
  if (props.rotateX && props.rotateX !== 0) {
    parts.push(`rotateX(${props.rotateX}deg)`)
  }
  if (props.rotateY && props.rotateY !== 0) {
    parts.push(`rotateY(${props.rotateY}deg)`)
  }
  if (props.rotateZ && props.rotateZ !== 0) {
    parts.push(`rotateZ(${props.rotateZ}deg)`)
  }

  // 缩放
  const scaleX = props.scale !== undefined && props.scale !== 1 ? props.scale : props.scaleX
  const scaleY = props.scale !== undefined && props.scale !== 1 ? props.scale : props.scaleY
  const scaleZ = props.scaleZ || 1

  if (scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) {
    if (scaleX === scaleY && scaleZ === 1) {
      parts.push(`scale(${scaleX})`)
    } else {
      parts.push(`scale3d(${scaleX},${scaleY},${scaleZ})`)
    }
  }

  // 倾斜
  if (props.skewX !== 0 || props.skewY !== 0) {
    if (props.skewX !== 0 && props.skewY !== 0) {
      parts.push(`skew(${props.skewX}deg,${props.skewY}deg)`)
    } else if (props.skewX !== 0) {
      parts.push(`skewX(${props.skewX}deg)`)
    } else if (props.skewY !== 0) {
      parts.push(`skewY(${props.skewY}deg)`)
    }
  }

  return parts.length > 0 ? parts.join(' ') : 'none'
}

/**
 * 获取元素的 transform 属性（带缓存）
 */
export function getElementTransform(element: HTMLElement): TransformProps {
  // 先检查缓存
  const cached = getCachedTransform(element)
  if (cached) return cached

  const style = window.getComputedStyle(element)
  const transform = style.transform || style.webkitTransform || ''

  const parsed = parseTransform(transform)

  // 缓存结果
  setCachedTransform(element, parsed)

  return parsed
}

/**
 * 矩阵操作优化
 */
export class Matrix3D {
  private m: Float32Array

  constructor() {
    // 使用 Float32Array 提升性能
    this.m = new Float32Array(16)
    this.identity()
  }

  /**
   * 设置为单位矩阵
   */
  identity(): this {
    this.m.fill(0)
    this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1
    return this
  }

  /**
   * 平移
   */
  translate(x: number, y: number, z: number = 0): this {
    this.m[12] += this.m[0] * x + this.m[4] * y + this.m[8] * z
    this.m[13] += this.m[1] * x + this.m[5] * y + this.m[9] * z
    this.m[14] += this.m[2] * x + this.m[6] * y + this.m[10] * z
    this.m[15] += this.m[3] * x + this.m[7] * y + this.m[11] * z
    return this
  }

  /**
   * 缩放
   */
  scale(x: number, y: number, z: number = 1): this {
    this.m[0] *= x
    this.m[1] *= x
    this.m[2] *= x
    this.m[3] *= x
    this.m[4] *= y
    this.m[5] *= y
    this.m[6] *= y
    this.m[7] *= y
    this.m[8] *= z
    this.m[9] *= z
    this.m[10] *= z
    this.m[11] *= z
    return this
  }

  /**
   * 绕 Z 轴旋转（最常用）
   */
  rotateZ(angle: number): this {
    const rad = angle * Math.PI / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)

    const m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3]
    const m4 = this.m[4], m5 = this.m[5], m6 = this.m[6], m7 = this.m[7]

    this.m[0] = m0 * cos + m4 * sin
    this.m[1] = m1 * cos + m5 * sin
    this.m[2] = m2 * cos + m6 * sin
    this.m[3] = m3 * cos + m7 * sin
    this.m[4] = m4 * cos - m0 * sin
    this.m[5] = m5 * cos - m1 * sin
    this.m[6] = m6 * cos - m2 * sin
    this.m[7] = m7 * cos - m3 * sin

    return this
  }

  /**
   * 转换为 CSS 矩阵字符串
   */
  toString(): string {
    // 2D 变换（大多数情况）
    if (this.m[2] === 0 && this.m[3] === 0 && this.m[6] === 0 && this.m[7] === 0 &&
      this.m[8] === 0 && this.m[9] === 0 && this.m[10] === 1 && this.m[11] === 0 &&
      this.m[14] === 0 && this.m[15] === 1) {
      return `matrix(${this.m[0]},${this.m[1]},${this.m[4]},${this.m[5]},${this.m[12]},${this.m[13]})`
    }

    // 3D 变换
    return `matrix3d(${Array.from(this.m).join(',')})`
  }
}

/**
 * Transform 工具类
 */
export class TransformUtil {
  /**
   * 合并 transform 属性
   */
  static merge(base: TransformProps, override: Partial<TransformProps>): TransformProps {
    return { ...base, ...override }
  }

  /**
   * 插值 transform
   */
  static interpolate(
    from: TransformProps,
    to: TransformProps,
    progress: number
  ): TransformProps {
    const result: TransformProps = {}
    const inv = 1 - progress

    // 遍历所有属性
    for (const key in TRANSFORM_DEFAULTS) {
      const prop = key as keyof TransformProps
      const fromVal = from[prop] ?? TRANSFORM_DEFAULTS[prop]
      const toVal = to[prop] ?? TRANSFORM_DEFAULTS[prop]

      if (typeof fromVal === 'number' && typeof toVal === 'number') {
        result[prop] = fromVal * inv + toVal * progress
      }
    }

    return result
  }

  /**
   * 检查是否需要 3D 变换
   */
  static is3D(props: TransformProps): boolean {
    return !!(
      props.z || props.translateZ || props.rotateX ||
      props.rotateY || props.scaleZ || props.perspective
    )
  }

  /**
   * 优化 transform 字符串（添加硬件加速）
   */
  static optimize(transform: string): string {
    if (!transform || transform === 'none') {
      return 'translate3d(0,0,0)' // 强制硬件加速
    }

    // 如果没有 3d 变换，添加 translateZ(0)
    if (!transform.includes('3d') && !transform.includes('Z')) {
      return transform + ' translateZ(0)'
    }

    return transform
  }
}

/**
 * 清理 transform 缓存
 */
export function clearTransformCache(): void {
  matrixCache.clear()
}
