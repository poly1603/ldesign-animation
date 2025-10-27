/**
 * 优化的颜色处理工具
 */

/**
 * 颜色缓存
 */
const colorCache = new Map<string, ParsedColor>()

/**
 * 解析后的颜色
 */
export interface ParsedColor {
  r: number
  g: number
  b: number
  a: number
}

/**
 * 预编译的颜色正则
 */
const HEX_REGEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
const HEX_SHORT_REGEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i
const RGB_REGEX = /^rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)(?:,\s*(\d+(?:\.\d+)?))?\)$/i

/**
 * 快速十六进制转数字
 */
const hexToNum = (hex: string): number => {
  return parseInt(hex, 16)
}

/**
 * 快速数字转十六进制
 */
const numToHex = (num: number): string => {
  const hex = (num | 0).toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

/**
 * 优化的颜色解析
 */
export function parseColor(color: string): ParsedColor {
  // 检查缓存
  let parsed = colorCache.get(color)
  if (parsed) return parsed

  // 标准化输入
  color = color.trim().toLowerCase()

  // 十六进制颜色
  let match = HEX_REGEX.exec(color)
  if (match) {
    parsed = {
      r: hexToNum(match[1]),
      g: hexToNum(match[2]),
      b: hexToNum(match[3]),
      a: match[4] ? hexToNum(match[4]) / 255 : 1,
    }
    colorCache.set(color, parsed)
    return parsed
  }

  // 短十六进制颜色
  match = HEX_SHORT_REGEX.exec(color)
  if (match) {
    parsed = {
      r: hexToNum(match[1] + match[1]),
      g: hexToNum(match[2] + match[2]),
      b: hexToNum(match[3] + match[3]),
      a: match[4] ? hexToNum(match[4] + match[4]) / 255 : 1,
    }
    colorCache.set(color, parsed)
    return parsed
  }

  // RGB/RGBA 颜色
  match = RGB_REGEX.exec(color)
  if (match) {
    parsed = {
      r: parseFloat(match[1]) | 0,
      g: parseFloat(match[2]) | 0,
      b: parseFloat(match[3]) | 0,
      a: match[4] ? parseFloat(match[4]) : 1,
    }
    colorCache.set(color, parsed)
    return parsed
  }

  // 命名颜色
  const namedColor = NAMED_COLORS[color]
  if (namedColor) {
    parsed = parseColor(namedColor)
    colorCache.set(color, parsed)
    return parsed
  }

  // 默认值
  parsed = { r: 0, g: 0, b: 0, a: 1 }
  colorCache.set(color, parsed)
  return parsed
}

/**
 * 优化的颜色插值 - 使用整数运算
 */
export function interpolateColor(
  from: ParsedColor,
  to: ParsedColor,
  progress: number
): ParsedColor {
  // 使用整数运算优化
  const inv = 1 - progress

  return {
    r: (from.r * inv + to.r * progress) | 0,
    g: (from.g * inv + to.g * progress) | 0,
    b: (from.b * inv + to.b * progress) | 0,
    a: from.a * inv + to.a * progress,
  }
}

/**
 * 优化的颜色转字符串
 */
export function colorToString(color: ParsedColor): string {
  // 完全不透明使用 hex 格式（更短）
  if (color.a === 1) {
    return `#${numToHex(color.r)}${numToHex(color.g)}${numToHex(color.b)}`
  }

  // 有透明度使用 rgba
  return `rgba(${color.r},${color.g},${color.b},${color.a.toFixed(2)})`
}

/**
 * HSL 颜色支持
 */
export interface HSLColor {
  h: number // 0-360
  s: number // 0-100
  l: number // 0-100
  a: number // 0-1
}

/**
 * RGB 转 HSL（优化版）
 */
export function rgbToHsl(color: ParsedColor): HSLColor {
  const r = color.r / 255
  const g = color.g / 255
  const b = color.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
        break
      case g:
        h = ((b - r) / delta + 2) * 60
        break
      case b:
        h = ((r - g) / delta + 4) * 60
        break
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: color.a,
  }
}

/**
 * HSL 转 RGB（优化版）
 */
export function hslToRgb(hsl: HSLColor): ParsedColor {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsl.a,
  }
}

/**
 * 优化的 HSL 插值
 */
export function interpolateHsl(
  from: HSLColor,
  to: HSLColor,
  progress: number
): HSLColor {
  // 处理色相环绕
  let hDiff = to.h - from.h
  if (hDiff > 180) hDiff -= 360
  else if (hDiff < -180) hDiff += 360

  const inv = 1 - progress

  return {
    h: (from.h + hDiff * progress + 360) % 360,
    s: from.s * inv + to.s * progress,
    l: from.l * inv + to.l * progress,
    a: from.a * inv + to.a * progress,
  }
}

/**
 * 常用命名颜色（仅包含最常用的）
 */
const NAMED_COLORS: Record<string, string> = {
  transparent: 'rgba(0,0,0,0)',
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  gray: '#808080',
  grey: '#808080',
  orange: '#ffa500',
  purple: '#800080',
  brown: '#a52a2a',
}

/**
 * 颜色工具类
 */
export class ColorUtil {
  /**
   * 调整亮度
   */
  static adjustBrightness(color: ParsedColor, amount: number): ParsedColor {
    return {
      r: Math.min(255, Math.max(0, color.r + amount)),
      g: Math.min(255, Math.max(0, color.g + amount)),
      b: Math.min(255, Math.max(0, color.b + amount)),
      a: color.a,
    }
  }

  /**
   * 调整饱和度
   */
  static adjustSaturation(color: ParsedColor, amount: number): ParsedColor {
    const hsl = rgbToHsl(color)
    hsl.s = Math.min(100, Math.max(0, hsl.s + amount))
    return hslToRgb(hsl)
  }

  /**
   * 混合颜色
   */
  static mix(color1: ParsedColor, color2: ParsedColor, ratio: number = 0.5): ParsedColor {
    return interpolateColor(color1, color2, ratio)
  }

  /**
   * 获取对比色
   */
  static getContrast(color: ParsedColor): ParsedColor {
    return {
      r: 255 - color.r,
      g: 255 - color.g,
      b: 255 - color.b,
      a: color.a,
    }
  }

  /**
   * 计算亮度（0-1）
   */
  static getLuminance(color: ParsedColor): number {
    // 使用 ITU-R BT.709 公式
    return (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255
  }

  /**
   * 判断是否为深色
   */
  static isDark(color: ParsedColor): boolean {
    return this.getLuminance(color) < 0.5
  }
}

/**
 * 清理颜色缓存（内存压力时调用）
 */
export function clearColorCache(): void {
  if (colorCache.size > 1000) {
    // 保留最常用的颜色
    const commonColors = ['#ffffff', '#000000', 'transparent', 'rgba(0,0,0,0)']
    const newCache = new Map<string, ParsedColor>()

    commonColors.forEach(color => {
      const parsed = colorCache.get(color)
      if (parsed) newCache.set(color, parsed)
    })

    colorCache.clear()
    newCache.forEach((value, key) => colorCache.set(key, value))
  }
}
