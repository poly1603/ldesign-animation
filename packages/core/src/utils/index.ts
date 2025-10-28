/**
 * 工具函数
 * @packageDocumentation
 */

import type { AnimationTarget } from '../types'

/**
 * 获取动画目标元素
 * 
 * @param target - 目标元素或选择器
 * @returns 元素数组
 */
export function getTargets(target: AnimationTarget): Element[] {
  if (typeof target === 'string') {
    return Array.from(document.querySelectorAll(target))
  }

  if (target instanceof Element) {
    return [target]
  }

  if (target instanceof NodeList) {
    return Array.from(target)
  }

  if (Array.isArray(target)) {
    return target
  }

  return []
}

/**
 * 线性插值
 * 
 * @param start - 起始值
 * @param end - 结束值
 * @param t - 插值因子 (0-1)
 * @returns 插值结果
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * 限制数值范围
 * 
 * @param value - 输入值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * 映射数值范围
 * 
 * @param value - 输入值
 * @param inMin - 输入最小值
 * @param inMax - 输入最大值
 * @param outMin - 输出最小值
 * @param outMax - 输出最大值
 * @returns 映射后的值
 */
export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * 解析单位值（如 "100px"）
 * 
 * @param value - 带单位的值
 * @returns { value: number, unit: string }
 */
export function parseUnit(value: string): { value: number; unit: string } {
  const match = value.match(/^([+-]?[\d.]+)([a-z%]*)$/)
  if (!match) {
    return { value: 0, unit: '' }
  }
  return {
    value: Number.parseFloat(match[1]),
    unit: match[2] || '',
  }
}

/**
 * 格式化值（添加单位）
 * 
 * @param value - 数值
 * @param unit - 单位
 * @returns 格式化后的字符串
 */
export function formatValue(value: number, unit: string): string {
  return unit ? `${value}${unit}` : String(value)
}

/**
 * 获取元素的变换矩阵
 * 
 * @param element - DOM 元素
 * @returns 变换矩阵
 */
export function getTransformMatrix(element: Element): DOMMatrix | null {
  const style = window.getComputedStyle(element)
  const transform = style.transform || style.webkitTransform

  if (!transform || transform === 'none') {
    return null
  }

  return new DOMMatrix(transform)
}

/**
 * 设置元素样式
 * 
 * @param element - DOM 元素
 * @param property - CSS 属性名
 * @param value - 属性值
 */
export function setStyle(element: Element, property: string, value: string): void {
  if (element instanceof HTMLElement) {
    element.style.setProperty(property, value)
  }
}

/**
 * 获取元素样式
 * 
 * @param element - DOM 元素
 * @param property - CSS 属性名
 * @returns 属性值
 */
export function getStyle(element: Element, property: string): string {
  return window.getComputedStyle(element).getPropertyValue(property)
}

/**
 * 判断是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 判断是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 判断是否为数组
 */
export function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * 判断是否为对象
 */
export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target

  const source = sources.shift()
  if (!source) return target

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      }
      else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    }
    else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

