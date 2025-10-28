/**
 * 缓动函数测试
 */

import { describe, expect, it } from 'vitest'
import {
  easeInBounce,
  easeInCirc,
  easeInCubic,
  easeInOutCirc,
  easeInOutCubic,
  easeInOutQuad,
  easeInQuad,
  easeOutBounce,
  easeOutCirc,
  easeOutCubic,
  easeOutQuad,
  getEasingFunction,
  linear,
} from '../src/core/easing'

describe('easing Functions', () => {
  describe('linear', () => {
    it('should return the input value', () => {
      expect(linear(0)).toBe(0)
      expect(linear(0.5)).toBe(0.5)
      expect(linear(1)).toBe(1)
    })
  })

  describe('quad easings', () => {
    it('easeInQuad should accelerate', () => {
      expect(easeInQuad(0)).toBe(0)
      expect(easeInQuad(0.5)).toBeLessThan(0.5)
      expect(easeInQuad(1)).toBe(1)
    })

    it('easeOutQuad should decelerate', () => {
      expect(easeOutQuad(0)).toBe(0)
      expect(easeOutQuad(0.5)).toBeGreaterThan(0.5)
      expect(easeOutQuad(1)).toBe(1)
    })

    it('easeInOutQuad should accelerate then decelerate', () => {
      expect(easeInOutQuad(0)).toBe(0)
      expect(easeInOutQuad(0.25)).toBeLessThan(0.25)
      expect(easeInOutQuad(0.75)).toBeGreaterThan(0.75)
      expect(easeInOutQuad(1)).toBe(1)
    })
  })

  describe('cubic easings', () => {
    it('easeInCubic should work correctly', () => {
      expect(easeInCubic(0)).toBe(0)
      expect(easeInCubic(1)).toBe(1)
    })

    it('easeOutCubic should work correctly', () => {
      expect(easeOutCubic(0)).toBe(0)
      expect(easeOutCubic(1)).toBe(1)
    })

    it('easeInOutCubic should work correctly', () => {
      expect(easeInOutCubic(0)).toBe(0)
      expect(easeInOutCubic(1)).toBe(1)
    })
  })

  describe('circ easings', () => {
    it('should have correct start and end values', () => {
      expect(easeInCirc(0)).toBeCloseTo(0)
      expect(easeInCirc(1)).toBeCloseTo(1)
      expect(easeOutCirc(0)).toBeCloseTo(0)
      expect(easeOutCirc(1)).toBeCloseTo(1)
      expect(easeInOutCirc(0)).toBeCloseTo(0)
      expect(easeInOutCirc(1)).toBeCloseTo(1)
    })
  })

  describe('bounce easings', () => {
    it('should have correct start and end values', () => {
      expect(easeInBounce(0)).toBeCloseTo(0)
      expect(easeInBounce(1)).toBeCloseTo(1)
      expect(easeOutBounce(0)).toBeCloseTo(0)
      expect(easeOutBounce(1)).toBeCloseTo(1)
    })
  })

  describe('getEasingFunction', () => {
    it('should return the correct easing function by name', () => {
      expect(getEasingFunction('linear')).toBe(linear)
      expect(getEasingFunction('easeInQuad')).toBe(easeInQuad)
      expect(getEasingFunction('easeOutQuad')).toBe(easeOutQuad)
    })

    it('should return custom function if provided', () => {
      const custom = (t: number) => t * 2
      expect(getEasingFunction(custom)).toBe(custom)
    })

    it('should return default easing for invalid name', () => {
      expect(getEasingFunction('invalid')).toBeDefined()
      expect(getEasingFunction(undefined)).toBeDefined()
    })
  })
})

