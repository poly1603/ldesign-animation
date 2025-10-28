/**
 * 工具函数测试
 */

import { describe, expect, it } from 'vitest'
import {
  clamp,
  deepMerge,
  formatValue,
  isArray,
  isNumber,
  isObject,
  isString,
  lerp,
  map,
  parseUnit,
} from '../src/utils'

describe('utils', () => {
  describe('lerp', () => {
    it('should interpolate between two values', () => {
      expect(lerp(0, 100, 0)).toBe(0)
      expect(lerp(0, 100, 0.5)).toBe(50)
      expect(lerp(0, 100, 1)).toBe(100)
    })
  })

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(50, 0, 100)).toBe(50)
      expect(clamp(-10, 0, 100)).toBe(0)
      expect(clamp(150, 0, 100)).toBe(100)
    })
  })

  describe('map', () => {
    it('should map value from one range to another', () => {
      expect(map(50, 0, 100, 0, 1)).toBe(0.5)
      expect(map(25, 0, 100, 0, 200)).toBe(50)
    })
  })

  describe('parseUnit', () => {
    it('should parse value with unit', () => {
      expect(parseUnit('100px')).toEqual({ value: 100, unit: 'px' })
      expect(parseUnit('50%')).toEqual({ value: 50, unit: '%' })
      expect(parseUnit('1.5em')).toEqual({ value: 1.5, unit: 'em' })
      expect(parseUnit('100')).toEqual({ value: 100, unit: '' })
    })
  })

  describe('formatValue', () => {
    it('should format value with unit', () => {
      expect(formatValue(100, 'px')).toBe('100px')
      expect(formatValue(50, '%')).toBe('50%')
      expect(formatValue(100, '')).toBe('100')
    })
  })

  describe('type guards', () => {
    it('isNumber should work correctly', () => {
      expect(isNumber(123)).toBe(true)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(Number.NaN)).toBe(false)
    })

    it('isString should work correctly', () => {
      expect(isString('hello')).toBe(true)
      expect(isString(123)).toBe(false)
    })

    it('isArray should work correctly', () => {
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray({})).toBe(false)
    })

    it('isObject should work correctly', () => {
      expect(isObject({})).toBe(true)
      expect(isObject([])).toBe(false)
      expect(isObject(null)).toBe(false)
    })
  })

  describe('deepMerge', () => {
    it('should deep merge objects', () => {
      const target = { a: 1, b: { c: 2 } }
      const source = { b: { d: 3 }, e: 4 }
      const result = deepMerge(target, source)

      expect(result).toEqual({
        a: 1,
        b: { c: 2, d: 3 },
        e: 4,
      })
    })
  })
})

