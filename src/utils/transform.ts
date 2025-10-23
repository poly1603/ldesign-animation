/**
 * Transform 属性解析和处理
 */

import type { TransformProps } from '../core/types'

/**
 * Transform 属性默认值
 */
export const TRANSFORM_DEFAULTS: Required<TransformProps> = {
  x: 0,
  y: 0,
  z: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  rotate: 0,
  skewX: 0,
  skewY: 0,
  perspective: 0,
}

/**
 * 解析 transform 字符串
 * @param transform - transform CSS 值
 */
export function parseTransform(transform: string): Partial<TransformProps> {
  const props: Partial<TransformProps> = {}

  if (!transform || transform === 'none') {
    return props
  }

  // 匹配所有 transform 函数
  const regex = /(\w+)\(([^)]+)\)/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(transform)) !== null) {
    const fn = match[1]
    const value = match[2]

    switch (fn) {
      case 'translateX':
      case 'translate3d': {
        const values = value.split(',').map(v => parseFloat(v.trim()))
        if (fn === 'translateX') {
          props.x = values[0]
        } else {
          props.x = values[0] || 0
          props.y = values[1] || 0
          props.z = values[2] || 0
        }
        break
      }
      case 'translateY':
        props.y = parseFloat(value)
        break
      case 'translateZ':
        props.z = parseFloat(value)
        break
      case 'scaleX':
        props.scaleX = parseFloat(value)
        break
      case 'scaleY':
        props.scaleY = parseFloat(value)
        break
      case 'scaleZ':
        props.scaleZ = parseFloat(value)
        break
      case 'scale':
      case 'scale3d': {
        const values = value.split(',').map(v => parseFloat(v.trim()))
        if (fn === 'scale') {
          props.scale = values[0]
          props.scaleX = values[0]
          props.scaleY = values[1] || values[0]
        } else {
          props.scaleX = values[0] || 1
          props.scaleY = values[1] || 1
          props.scaleZ = values[2] || 1
        }
        break
      }
      case 'rotateX':
        props.rotateX = parseFloat(value)
        break
      case 'rotateY':
        props.rotateY = parseFloat(value)
        break
      case 'rotateZ':
      case 'rotate':
        props.rotate = parseFloat(value)
        props.rotateZ = parseFloat(value)
        break
      case 'skewX':
        props.skewX = parseFloat(value)
        break
      case 'skewY':
        props.skewY = parseFloat(value)
        break
      case 'perspective':
        props.perspective = parseFloat(value)
        break
    }
  }

  return props
}

/**
 * 将 transform 属性对象转换为 CSS 字符串
 * @param props - transform 属性
 */
export function buildTransform(props: Partial<TransformProps>): string {
  const parts: string[] = []

  // Perspective 必须放在最前面
  if (props.perspective && props.perspective !== 0) {
    parts.push(`perspective(${props.perspective}px)`)
  }

  // Translate
  const x = props.x ?? 0
  const y = props.y ?? 0
  const z = props.z ?? 0

  if (x !== 0 || y !== 0 || z !== 0) {
    parts.push(`translate3d(${x}px, ${y}px, ${z}px)`)
  }

  // Rotate
  if (props.rotateX && props.rotateX !== 0) {
    parts.push(`rotateX(${props.rotateX}deg)`)
  }
  if (props.rotateY && props.rotateY !== 0) {
    parts.push(`rotateY(${props.rotateY}deg)`)
  }
  if (props.rotate && props.rotate !== 0) {
    parts.push(`rotate(${props.rotate}deg)`)
  }

  // Scale
  const scaleX = props.scaleX ?? props.scale ?? 1
  const scaleY = props.scaleY ?? props.scale ?? 1
  const scaleZ = props.scaleZ ?? 1

  if (scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) {
    parts.push(`scale3d(${scaleX}, ${scaleY}, ${scaleZ})`)
  }

  // Skew
  if (props.skewX && props.skewX !== 0) {
    parts.push(`skewX(${props.skewX}deg)`)
  }
  if (props.skewY && props.skewY !== 0) {
    parts.push(`skewY(${props.skewY}deg)`)
  }

  return parts.length > 0 ? parts.join(' ') : 'none'
}

/**
 * 合并 transform 属性
 */
export function mergeTransform(
  current: Partial<TransformProps>,
  next: Partial<TransformProps>
): Partial<TransformProps> {
  return { ...current, ...next }
}

/**
 * 从元素获取当前 transform
 */
export function getElementTransform(element: HTMLElement | SVGElement): Partial<TransformProps> {
  const computed = window.getComputedStyle(element)
  const transform = computed.transform || computed.webkitTransform

  if (!transform || transform === 'none') {
    return {}
  }

  return parseTransform(transform)
}

/**
 * 设置元素 transform
 */
export function setElementTransform(
  element: HTMLElement | SVGElement,
  props: Partial<TransformProps>
): void {
  const transform = buildTransform(props)
  element.style.transform = transform
}






