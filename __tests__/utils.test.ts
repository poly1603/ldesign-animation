import { describe, it, expect } from 'vitest'
import {
  easing,
  colorUtils,
  numberUtils,
  domUtils,
  performanceUtils,
  presets,
  createAnimation,
  animateElements
} from '../src/utils'

describe('easing functions', () => {
  it('should have linear easing', () => {
    expect(easing.linear(0.5)).toBe(0.5)
    expect(easing.linear(0)).toBe(0)
    expect(easing.linear(1)).toBe(1)
  })

  it('should have quad easing functions', () => {
    expect(easing.easeInQuad(0.5)).toBeCloseTo(0.25)
    expect(easing.easeOutQuad(0.5)).toBeCloseTo(0.75)
    expect(easing.easeInOutQuad(0.5)).toBeCloseTo(0.5)
  })

  it('should have cubic easing functions', () => {
    expect(easing.easeInCubic(0.5)).toBeCloseTo(0.125)
    expect(easing.easeOutCubic(0.5)).toBeCloseTo(0.875)
    expect(easing.easeInOutCubic(0.5)).toBeCloseTo(0.5)
  })

  it('should have sine easing functions', () => {
    expect(easing.easeInSine(0)).toBe(0)
    expect(easing.easeOutSine(1)).toBe(1)
    expect(easing.easeInOutSine(0.5)).toBeCloseTo(0.5)
  })
})

describe('colorUtils', () => {
  it('should parse hex colors', () => {
    const color = colorUtils.parseColor('#ff0000')
    expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should parse short hex colors', () => {
    const color = colorUtils.parseColor('#f00')
    expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should parse rgb colors', () => {
    const color = colorUtils.parseColor('rgb(255, 0, 0)')
    expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should parse rgba colors', () => {
    const color = colorUtils.parseColor('rgba(255, 0, 0, 0.5)')
    expect(color).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
  })

  it('should interpolate colors', () => {
    const result = colorUtils.interpolateColor('#000000', '#ffffff', 0.5)
    expect(result).toBe('rgba(128, 128, 128, 1)')
  })

  it('should convert to hex', () => {
    const hex = colorUtils.toHex('rgb(255, 0, 0)')
    expect(hex).toBe('#ff0000')
  })
})

describe('numberUtils', () => {
  it('should interpolate numbers', () => {
    expect(numberUtils.interpolate(0, 100, 0.5)).toBe(50)
    expect(numberUtils.interpolate(10, 20, 0.25)).toBe(12.5)
  })

  it('should clamp numbers', () => {
    expect(numberUtils.clamp(5, 0, 10)).toBe(5)
    expect(numberUtils.clamp(-5, 0, 10)).toBe(0)
    expect(numberUtils.clamp(15, 0, 10)).toBe(10)
  })

  it('should map number ranges', () => {
    expect(numberUtils.map(5, 0, 10, 0, 100)).toBe(50)
    expect(numberUtils.map(2.5, 0, 10, 0, 100)).toBe(25)
  })

  it('should generate random numbers', () => {
    const random = numberUtils.random(0, 10)
    expect(random).toBeGreaterThanOrEqual(0)
    expect(random).toBeLessThanOrEqual(10)
  })

  it('should generate random integers', () => {
    const randomInt = numberUtils.randomInt(1, 5)
    expect(randomInt).toBeGreaterThanOrEqual(1)
    expect(randomInt).toBeLessThanOrEqual(5)
    expect(Number.isInteger(randomInt)).toBe(true)
  })
})

describe('domUtils', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should get computed style', () => {
    const style = domUtils.getComputedStyle(element, 'display')
    expect(typeof style).toBe('string')
  })

  it('should set styles', () => {
    domUtils.setStyle(element, { width: '100px', height: '50px' })
    expect(element.style.width).toBe('100px')
    expect(element.style.height).toBe('50px')
  })

  it('should get bounds', () => {
    const bounds = domUtils.getBounds(element)
    expect(bounds).toHaveProperty('top')
    expect(bounds).toHaveProperty('left')
    expect(bounds).toHaveProperty('width')
    expect(bounds).toHaveProperty('height')
  })

  it('should check if element is in viewport', () => {
    const inViewport = domUtils.isInViewport(element)
    expect(typeof inViewport).toBe('boolean')
  })
})

describe('performanceUtils', () => {
  it('should throttle function calls', (done) => {
    let callCount = 0
    const throttledFn = performanceUtils.throttle(() => {
      callCount++
    }, 100)

    throttledFn()
    throttledFn()
    throttledFn()

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 50)
  })

  it('should debounce function calls', (done) => {
    let callCount = 0
    const debouncedFn = performanceUtils.debounce(() => {
      callCount++
    }, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    setTimeout(() => {
      expect(callCount).toBe(0)
    }, 50)

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 150)
  })

  it('should measure execution time', () => {
    const result = performanceUtils.measureTime(() => {
      return 'test result'
    })

    expect(result.result).toBe('test result')
    expect(typeof result.time).toBe('number')
    expect(result.time).toBeGreaterThanOrEqual(0)
  })

  it('should check Web Animations API support', () => {
    const supported = performanceUtils.supportsWebAnimations()
    expect(typeof supported).toBe('boolean')
  })

  it('should check CSS Animations support', () => {
    const supported = performanceUtils.supportsCSSAnimations()
    expect(typeof supported).toBe('boolean')
  })
})

describe('presets', () => {
  it('should have fadeIn preset', () => {
    expect(presets.fadeIn).toBeDefined()
    expect(presets.fadeIn.keyframes).toBeDefined()
    expect(presets.fadeIn.options).toBeDefined()
  })

  it('should have fadeOut preset', () => {
    expect(presets.fadeOut).toBeDefined()
    expect(presets.fadeOut.keyframes).toBeDefined()
    expect(presets.fadeOut.options).toBeDefined()
  })

  it('should have slide presets', () => {
    expect(presets.slideInLeft).toBeDefined()
    expect(presets.slideInRight).toBeDefined()
    expect(presets.slideInUp).toBeDefined()
    expect(presets.slideInDown).toBeDefined()
  })

  it('should have scale presets', () => {
    expect(presets.scaleIn).toBeDefined()
    expect(presets.scaleOut).toBeDefined()
  })

  it('should have rotate presets', () => {
    expect(presets.rotateIn).toBeDefined()
    expect(presets.rotateOut).toBeDefined()
  })

  it('should have effect presets', () => {
    expect(presets.bounceIn).toBeDefined()
    expect(presets.shake).toBeDefined()
    expect(presets.pulse).toBeDefined()
  })
})

describe('createAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create animation with preset', () => {
    const animation = createAnimation(element, 'fadeIn')
    expect(animation).toBeDefined()
  })

  it('should create animation with custom options', () => {
    const animation = createAnimation(element, 'fadeIn', { duration: 2000 })
    expect(animation).toBeDefined()
  })
})

describe('animateElements', () => {
  let elements: HTMLElement[]

  beforeEach(() => {
    elements = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ]
    elements.forEach(el => document.body.appendChild(el))
  })

  it('should animate multiple elements', () => {
    const animations = animateElements(elements, 'fadeIn')
    expect(animations).toHaveLength(3)
    animations.forEach(animation => {
      expect(animation).toBeDefined()
    })
  })

  it('should animate with stagger', () => {
    const animations = animateElements(elements, 'fadeIn', {
      stagger: 100,
      customOptions: { duration: 500 }
    })
    expect(animations).toHaveLength(3)
  })
})