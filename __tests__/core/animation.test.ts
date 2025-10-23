/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { to, from, fromTo, animate } from '../../src/core/animation'

describe('Animation Core', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  describe('to()', () => {
    it('should animate to target values', () => {
      const animation = to(element, { opacity: 0.5 }, { duration: 100 })
      expect(animation).toBeDefined()
    })

    it('should accept CSS selector', () => {
      element.id = 'test'
      const animation = to('#test', { opacity: 0.5 }, { duration: 100 })
      expect(animation).toBeDefined()
    })
  })

  describe('from()', () => {
    it('should animate from initial values', () => {
      const animation = from(element, { opacity: 0 }, { duration: 100 })
      expect(animation).toBeDefined()
    })
  })

  describe('fromTo()', () => {
    it('should animate from start to end values', () => {
      const animation = fromTo(
        element,
        { opacity: 0 },
        { opacity: 1 },
        { duration: 100 }
      )
      expect(animation).toBeDefined()
    })
  })

  describe('animate()', () => {
    it('should work with props', () => {
      const animation = animate(element, {
        props: { opacity: 0.5 },
        duration: 100,
      })
      expect(animation).toBeDefined()
    })

    it('should work with keyframes', () => {
      const animation = animate(element, {
        keyframes: [
          { opacity: 0 },
          { opacity: 1 },
        ],
        duration: 100,
      })
      expect(animation).toBeDefined()
    })
  })
})






