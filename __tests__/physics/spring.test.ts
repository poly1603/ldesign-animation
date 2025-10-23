/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { spring, springPresets } from '../../src/physics/spring'

describe('Spring Animation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    element.style.left = '0px'
    document.body.appendChild(element)
  })

  it('should create spring animation', () => {
    const animation = spring(element, 'left', 100)
    expect(animation).toBeDefined()
    animation.stop()
  })

  it('should accept spring config', () => {
    const animation = spring(element, 'left', 100, {
      mass: 1,
      stiffness: 100,
      damping: 10,
    })
    expect(animation).toBeDefined()
    animation.stop()
  })

  it('should have presets', () => {
    expect(springPresets.gentle).toBeDefined()
    expect(springPresets.wobbly).toBeDefined()
    expect(springPresets.stiff).toBeDefined()
    expect(springPresets.bouncy).toBeDefined()
  })

  it('should use preset', () => {
    const animation = spring(element, 'left', 100, springPresets.bouncy)
    expect(animation).toBeDefined()
    animation.stop()
  })
})






