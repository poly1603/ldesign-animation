/**
 * 属性解析和插值
 */

import type { AnimationTarget, AnimatableValue } from './types'
import { parseUnit, combineUnit } from '../utils/units'
import { parseColor, interpolateColor, colorToString } from '../utils/color'
import { parseTransform, buildTransform, getElementTransform } from '../utils/transform'
import type { TransformProps } from './types'

/**
 * CSS 属性名映射（驼峰 -> 短横线）
 */
export function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

/**
 * 判断是否是颜色属性
 */
export function isColorProperty(prop: string): boolean {
  const colorProps = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'fill',
    'stroke',
  ]
  return colorProps.includes(prop)
}

/**
 * 判断是否是 transform 属性
 */
export function isTransformProperty(prop: string): boolean {
  const transformProps = [
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY',
    'perspective',
  ]
  return transformProps.includes(prop)
}

/**
 * 获取元素属性值
 */
export function getProperty(element: AnimationTarget, prop: string): AnimatableValue {
  // Transform 属性
  if (isTransformProperty(prop)) {
    const transform = getElementTransform(element as HTMLElement)
    const key = prop as keyof TransformProps
    return transform[key] ?? 0
  }

  // CSS 属性
  const computed = window.getComputedStyle(element)
  const cssProp = kebabCase(prop)
  return computed.getPropertyValue(cssProp) || ''
}

/**
 * 设置元素属性值
 */
export function setProperty(
  element: AnimationTarget,
  prop: string,
  value: AnimatableValue
): void {
  // Transform 属性需要特殊处理
  if (isTransformProperty(prop)) {
    const current = getElementTransform(element as HTMLElement)
    const key = prop as keyof TransformProps
    const updated = { ...current, [key]: value }
    const transform = buildTransform(updated)
      ; (element as HTMLElement).style.transform = transform
    return
  }

  // 普通 CSS 属性
  const cssProp = kebabCase(prop)
    ; (element as HTMLElement).style.setProperty(cssProp, String(value))
}

/**
 * 属性插值器
 */
export class PropertyInterpolator {
  private prop: string
  private fromValue: AnimatableValue
  private toValue: AnimatableValue
  private isColor: boolean
  private isTransform: boolean
  private fromNum: number = 0
  private toNum: number = 0
  private unit: string = ''
  private fromColor?: ReturnType<typeof parseColor>
  private toColor?: ReturnType<typeof parseColor>

  constructor(prop: string, from: AnimatableValue, to: AnimatableValue) {
    this.prop = prop
    this.fromValue = from
    this.toValue = to
    this.isColor = isColorProperty(prop)
    this.isTransform = isTransformProperty(prop)

    this.parse()
  }

  /**
   * 解析属性值
   */
  private parse(): void {
    // 颜色属性
    if (this.isColor) {
      this.fromColor = parseColor(String(this.fromValue))
      this.toColor = parseColor(String(this.toValue))
      return
    }

    // 数值属性
    const fromParsed = parseUnit(this.fromValue)
    const toParsed = parseUnit(this.toValue)

    this.fromNum = fromParsed.value
    this.toNum = toParsed.value
    this.unit = toParsed.unit || fromParsed.unit
  }

  /**
   * 插值计算
   * @param progress - 进度 0-1
   */
  interpolate(progress: number): AnimatableValue {
    // 颜色插值
    if (this.isColor && this.fromColor && this.toColor) {
      const color = interpolateColor(this.fromColor, this.toColor, progress)
      return colorToString(color)
    }

    // 数值插值
    const value = this.fromNum + (this.toNum - this.fromNum) * progress
    return combineUnit(value, this.unit)
  }

  /**
   * 获取属性名
   */
  getProperty(): string {
    return this.prop
  }
}

/**
 * 创建多个属性插值器
 */
export function createInterpolators(
  element: AnimationTarget,
  props: Record<string, AnimatableValue>
): PropertyInterpolator[] {
  const interpolators: PropertyInterpolator[] = []

  for (const [prop, toValue] of Object.entries(props)) {
    const fromValue = getProperty(element, prop)
    interpolators.push(new PropertyInterpolator(prop, fromValue, toValue))
  }

  return interpolators
}






