/**
 * 单位处理工具
 */

/**
 * CSS 单位正则
 */
const UNIT_REGEX = /^([+-]?[\d.]+)([a-z%]*)$/i

/**
 * 支持的长度单位
 */
export const LENGTH_UNITS = ['px', 'em', 'rem', '%', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc']

/**
 * 支持的角度单位
 */
export const ANGLE_UNITS = ['deg', 'rad', 'grad', 'turn']

/**
 * 解析带单位的值
 * @param value - 值
 * @returns 解析结果 { value: number, unit: string }
 */
export function parseUnit(value: string | number): { value: number; unit: string } {
  if (typeof value === 'number') {
    return { value, unit: '' }
  }

  const match = String(value).match(UNIT_REGEX)
  if (!match) {
    return { value: 0, unit: '' }
  }

  return {
    value: parseFloat(match[1]),
    unit: match[2] || '',
  }
}

/**
 * 组合值和单位
 * @param value - 数值
 * @param unit - 单位
 * @returns 带单位的字符串
 */
export function combineUnit(value: number, unit: string): string {
  if (!unit || unit === '') {
    return String(value)
  }
  return `${value}${unit}`
}

/**
 * 判断是否是长度单位
 * @param unit - 单位
 */
export function isLengthUnit(unit: string): boolean {
  return LENGTH_UNITS.includes(unit)
}

/**
 * 判断是否是角度单位
 * @param unit - 单位
 */
export function isAngleUnit(unit: string): boolean {
  return ANGLE_UNITS.includes(unit)
}

/**
 * 转换角度单位到度
 * @param value - 值
 * @param unit - 单位
 */
export function toDegrees(value: number, unit: string): number {
  switch (unit) {
    case 'rad':
      return value * (180 / Math.PI)
    case 'grad':
      return value * (9 / 10)
    case 'turn':
      return value * 360
    default:
      return value
  }
}

/**
 * 从度转换到指定角度单位
 * @param degrees - 度数
 * @param unit - 目标单位
 */
export function fromDegrees(degrees: number, unit: string): number {
  switch (unit) {
    case 'rad':
      return degrees * (Math.PI / 180)
    case 'grad':
      return degrees * (10 / 9)
    case 'turn':
      return degrees / 360
    default:
      return degrees
  }
}






