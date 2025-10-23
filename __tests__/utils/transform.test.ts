import { describe, it, expect } from 'vitest'
import {
  parseTransform,
  buildTransform,
  mergeTransform,
} from '../../src/utils/transform'

describe('Transform Utils', () => {
  describe('parseTransform()', () => {
    it('should parse translateX', () => {
      const props = parseTransform('translateX(100px)')
      expect(props.x).toBe(100)
    })

    it('should parse translate3d', () => {
      const props = parseTransform('translate3d(10px, 20px, 30px)')
      expect(props.x).toBe(10)
      expect(props.y).toBe(20)
      expect(props.z).toBe(30)
    })

    it('should parse scale', () => {
      const props = parseTransform('scale(1.5)')
      expect(props.scale).toBe(1.5)
      expect(props.scaleX).toBe(1.5)
      expect(props.scaleY).toBe(1.5)
    })

    it('should parse rotate', () => {
      const props = parseTransform('rotate(45deg)')
      expect(props.rotate).toBe(45)
    })

    it('should parse multiple transforms', () => {
      const props = parseTransform('translateX(100px) rotate(45deg) scale(1.5)')
      expect(props.x).toBe(100)
      expect(props.rotate).toBe(45)
      expect(props.scale).toBe(1.5)
    })
  })

  describe('buildTransform()', () => {
    it('should build translate3d', () => {
      const transform = buildTransform({ x: 10, y: 20, z: 30 })
      expect(transform).toContain('translate3d(10px, 20px, 30px)')
    })

    it('should build scale3d', () => {
      const transform = buildTransform({ scaleX: 1.5, scaleY: 2, scaleZ: 1 })
      expect(transform).toContain('scale3d(1.5, 2, 1)')
    })

    it('should build rotate', () => {
      const transform = buildTransform({ rotate: 45 })
      expect(transform).toContain('rotate(45deg)')
    })

    it('should return none for empty props', () => {
      const transform = buildTransform({})
      expect(transform).toBe('none')
    })
  })

  describe('mergeTransform()', () => {
    it('should merge transform properties', () => {
      const current = { x: 10, y: 20 }
      const next = { y: 30, rotate: 45 }
      const merged = mergeTransform(current, next)
      expect(merged).toEqual({ x: 10, y: 30, rotate: 45 })
    })
  })
})






