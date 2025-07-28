import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AnimationManager } from '../src/core/AnimationManager'
import { TransitionManager } from '../src/core/TransitionManager'
import { SequenceManager } from '../src/core/SequenceManager'
import { CSSAnimationController } from '../src/core/CSSAnimationController'
import { JSAnimationController } from '../src/core/JSAnimationController'

describe('AnimationManager', () => {
  let manager: AnimationManager
  let element: HTMLElement

  beforeEach(() => {
    manager = new AnimationManager()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create animation manager', () => {
    expect(manager).toBeInstanceOf(AnimationManager)
  })

  it('should create animation', () => {
    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const animation = manager.create(element, keyframes, { duration: 1000 })
    expect(animation).toBeDefined()
  })

  it('should get animation status', () => {
    const status = manager.getStatus(element)
    expect(['idle', 'running', 'paused', 'finished']).toContain(status)
  })

  it('should stop animation', () => {
    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    manager.create(element, keyframes, { duration: 1000 })
    manager.stop(element)
    expect(manager.getStatus(element)).toBe('idle')
  })
})

describe('TransitionManager', () => {
  let manager: TransitionManager
  let element: HTMLElement

  beforeEach(() => {
    manager = new TransitionManager()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create transition manager', () => {
    expect(manager).toBeInstanceOf(TransitionManager)
  })

  it('should create transition', () => {
    const properties = { opacity: '1', transform: 'scale(1)' }
    manager.create(element, properties, { duration: 500 })
    expect(manager.getStatus(element)).toBe('running')
  })

  it('should stop transition', () => {
    const properties = { opacity: '1' }
    manager.create(element, properties, { duration: 500 })
    manager.stop(element)
    expect(manager.getStatus(element)).toBe('idle')
  })
})

describe('SequenceManager', () => {
  let manager: SequenceManager
  let element: HTMLElement

  beforeEach(() => {
    manager = new SequenceManager()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create sequence manager', () => {
    expect(manager).toBeInstanceOf(SequenceManager)
  })

  it('should add animation step', () => {
    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    manager.addAnimation(element, keyframes, { duration: 500 })
    expect(manager.getSteps()).toHaveLength(1)
  })

  it('should add transition step', () => {
    const properties = { opacity: '1' }
    manager.addTransition(element, properties, { duration: 500 })
    expect(manager.getSteps()).toHaveLength(1)
  })

  it('should add delay step', () => {
    manager.addDelay(1000)
    expect(manager.getSteps()).toHaveLength(1)
  })

  it('should clear steps', () => {
    manager.addDelay(1000)
    manager.clear()
    expect(manager.getSteps()).toHaveLength(0)
  })
})

describe('CSSAnimationController', () => {
  let controller: CSSAnimationController
  let element: HTMLElement

  beforeEach(() => {
    controller = new CSSAnimationController()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create CSS animation controller', () => {
    expect(controller).toBeInstanceOf(CSSAnimationController)
  })

  it('should apply animation', () => {
    controller.apply(element, 'fadeIn', { duration: '1s' })
    expect(element.style.animationName).toBe('fadeIn')
  })

  it('should stop animation', () => {
    controller.apply(element, 'fadeIn', { duration: '1s' })
    controller.stop(element)
    expect(element.style.animationName).toBe('')
  })

  it('should get animation status', () => {
    const status = controller.getStatus(element)
    expect(['idle', 'running', 'paused', 'finished']).toContain(status)
  })
})

describe('JSAnimationController', () => {
  let controller: JSAnimationController
  let element: HTMLElement

  beforeEach(() => {
    controller = new JSAnimationController()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create JS animation controller', () => {
    expect(controller).toBeInstanceOf(JSAnimationController)
  })

  it('should create animation', () => {
    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const animation = controller.create(element, keyframes, { duration: 1000 })
    expect(animation).toBeDefined()
  })

  it('should create tween animation', () => {
    const from = { opacity: 0 }
    const to = { opacity: 1 }
    const animation = controller.tween(element, from, to, { duration: 1000 })
    expect(animation).toBeDefined()
  })

  it('should create spring animation', () => {
    const from = { opacity: 0 }
    const to = { opacity: 1 }
    const animation = controller.spring(element, from, to, { tension: 170, friction: 26 })
    expect(animation).toBeDefined()
  })

  it('should get animation status', () => {
    const status = controller.getStatus(element)
    expect(['idle', 'running', 'paused', 'finished']).toContain(status)
  })

  it('should stop animation', () => {
    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    controller.create(element, keyframes, { duration: 1000 })
    controller.stop(element)
    expect(controller.getStatus(element)).toBe('idle')
  })
})