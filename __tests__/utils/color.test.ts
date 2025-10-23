import { describe, it, expect } from 'vitest'
import {
  parseHex,
  parseRGB,
  parseColor,
  interpolateColor,
  colorToString,
  rgbToHsl,
  hslToRgb,
} from '../../src/utils/color'

describe('Color Utils', () => {
  describe('parseHex()', () => {
    it('should parse 3-digit hex', () => {
      const color = parseHex('#fff')
      expect(color).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    })

    it('should parse 6-digit hex', () => {
      const color = parseHex('#ff0000')
      expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })

    it('should parse 8-digit hex with alpha', () => {
      const color = parseHex('#ff000080')
      expect(color.r).toBe(255)
      expect(color.g).toBe(0)
      expect(color.b).toBe(0)
      expect(color.a).toBeCloseTo(0.5, 2)
    })
  })

  describe('parseRGB()', () => {
    it('should parse rgb()', () => {
      const color = parseRGB('rgb(255, 0, 0)')
      expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })

    it('should parse rgba()', () => {
      const color = parseRGB('rgba(255, 0, 0, 0.5)')
      expect(color).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    })
  })

  describe('interpolateColor()', () => {
    it('should interpolate between colors', () => {
      const from = { r: 0, g: 0, b: 0, a: 1 }
      const to = { r: 100, g: 100, b: 100, a: 1 }
      const mid = interpolateColor(from, to, 0.5)
      expect(mid.r).toBe(50)
      expect(mid.g).toBe(50)
      expect(mid.b).toBe(50)
    })
  })

  describe('rgbToHsl() and hslToRgb()', () => {
    it('should convert RGB to HSL and back', () => {
      const rgb = { r: 255, g: 0, b: 0, a: 1 }
      const hsl = rgbToHsl(rgb)
      const backToRgb = hslToRgb(hsl)
      expect(backToRgb.r).toBe(255)
      expect(backToRgb.g).toBeCloseTo(0, 0)
      expect(backToRgb.b).toBeCloseTo(0, 0)
    })
  })

  describe('colorToString()', () => {
    it('should convert to rgb()', () => {
      const str = colorToString({ r: 255, g: 0, b: 0, a: 1 })
      expect(str).toBe('rgb(255, 0, 0)')
    })

    it('should convert to rgba() when alpha < 1', () => {
      const str = colorToString({ r: 255, g: 0, b: 0, a: 0.5 })
      expect(str).toBe('rgba(255, 0, 0, 0.5)')
    })
  })
})






