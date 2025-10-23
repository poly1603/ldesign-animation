/**
 * 颜色处理和插值工具
 */

/**
 * RGB 颜色
 */
export interface RGBColor {
  r: number
  g: number
  b: number
  a: number
}

/**
 * HSL 颜色
 */
export interface HSLColor {
  h: number
  s: number
  l: number
  a: number
}

/**
 * 解析 16 进制颜色
 * @param hex - 16进制颜色值 (#RGB, #RRGGBB, #RRGGBBAA)
 */
export function parseHex(hex: string): RGBColor {
  const cleaned = hex.replace('#', '')

  let r: number, g: number, b: number, a = 1

  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16)
    g = parseInt(cleaned[1] + cleaned[1], 16)
    b = parseInt(cleaned[2] + cleaned[2], 16)
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16)
    g = parseInt(cleaned.slice(2, 4), 16)
    b = parseInt(cleaned.slice(4, 6), 16)
  } else if (cleaned.length === 8) {
    r = parseInt(cleaned.slice(0, 2), 16)
    g = parseInt(cleaned.slice(2, 4), 16)
    b = parseInt(cleaned.slice(4, 6), 16)
    a = parseInt(cleaned.slice(6, 8), 16) / 255
  } else {
    return { r: 0, g: 0, b: 0, a: 1 }
  }

  return { r, g, b, a }
}

/**
 * 解析 RGB/RGBA 颜色
 * @param rgb - rgb(r, g, b) 或 rgba(r, g, b, a)
 */
export function parseRGB(rgb: string): RGBColor {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {
    return { r: 0, g: 0, b: 0, a: 1 }
  }

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  }
}

/**
 * 解析 HSL/HSLA 颜色
 * @param hsl - hsl(h, s%, l%) 或 hsla(h, s%, l%, a)
 */
export function parseHSL(hsl: string): HSLColor {
  const match = hsl.match(/hsla?\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/)
  if (!match) {
    return { h: 0, s: 0, l: 0, a: 1 }
  }

  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  }
}

/**
 * 解析颜色字符串
 * @param color - 颜色字符串
 */
export function parseColor(color: string): RGBColor {
  if (color.startsWith('#')) {
    return parseHex(color)
  } else if (color.startsWith('rgb')) {
    return parseRGB(color)
  } else if (color.startsWith('hsl')) {
    const hsl = parseHSL(color)
    return hslToRgb(hsl)
  }

  // 命名颜色
  const namedColor = parseNamedColor(color)
  if (namedColor) {
    return namedColor
  }

  return { r: 0, g: 0, b: 0, a: 1 }
}

/**
 * RGB 转 HSL
 */
export function rgbToHsl(rgb: RGBColor): HSLColor {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

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
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / delta + 2) / 6
        break
      case b:
        h = ((r - g) / delta + 4) / 6
        break
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
    a: rgb.a,
  }
}

/**
 * HSL 转 RGB
 */
export function hslToRgb(hsl: HSLColor): RGBColor {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r: number, g: number, b: number

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
 * 颜色插值
 * @param from - 起始颜色
 * @param to - 结束颜色
 * @param progress - 进度 0-1
 */
export function interpolateColor(from: RGBColor, to: RGBColor, progress: number): RGBColor {
  return {
    r: Math.round(from.r + (to.r - from.r) * progress),
    g: Math.round(from.g + (to.g - from.g) * progress),
    b: Math.round(from.b + (to.b - from.b) * progress),
    a: from.a + (to.a - from.a) * progress,
  }
}

/**
 * 颜色转字符串
 * @param color - RGB 颜色
 */
export function colorToString(color: RGBColor): string {
  if (color.a < 1) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  }
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

/**
 * 常见命名颜色
 */
const NAMED_COLORS: Record<string, string> = {
  transparent: '#00000000',
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  gray: '#808080',
  grey: '#808080',
}

/**
 * 解析命名颜色
 */
function parseNamedColor(name: string): RGBColor | null {
  const hex = NAMED_COLORS[name.toLowerCase()]
  if (hex) {
    return parseHex(hex)
  }
  return null
}






