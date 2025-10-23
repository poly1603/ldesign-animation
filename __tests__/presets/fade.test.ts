/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { fadeIn, fadeOut } from '../../src/presets/css/fade'

describe('Fade Presets', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    element.style.opacity = '1'
    document.body.appendChild(element)
  })

  it('fadeIn should animate opacity', () => {
    const animation = fadeIn(element, { duration: 100 })
    expect(animation).toBeDefined()
  })

  it('fadeOut should animate opacity to 0', () => {
    const animation = fadeOut(element, { duration: 100 })
    expect(animation).toBeDefined()
  })

  it('should accept CSS selector', () => {
    element.id = 'test'
    const animation = fadeIn('#test')
    expect(animation).toBeDefined()
  })
})






