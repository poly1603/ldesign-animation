/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createTimeline } from '../../src/timeline/timeline'

describe('Timeline', () => {
  let element1: HTMLElement
  let element2: HTMLElement

  beforeEach(() => {
    element1 = document.createElement('div')
    element2 = document.createElement('div')
    document.body.appendChild(element1)
    document.body.appendChild(element2)
  })

  it('should create a timeline', () => {
    const tl = createTimeline()
    expect(tl).toBeDefined()
  })

  it('should add animations with to()', () => {
    const tl = createTimeline()
    tl.to(element1, { x: 100 })
    tl.to(element2, { y: 50 })
    expect(tl.duration()).toBeGreaterThan(0)
  })

  it('should support position parameter', () => {
    const tl = createTimeline()
    tl.to(element1, { x: 100 })
    tl.to(element2, { y: 50 }, '<') // 同时开始
    expect(tl.duration()).toBe(300) // 只有一个动画的时长
  })

  it('should support labels', () => {
    const tl = createTimeline()
    tl.to(element1, { x: 100 })
    tl.addLabel('middle')
    tl.to(element2, { y: 50 })
    expect(tl.duration()).toBe(600)
  })

  it('should support play/pause', () => {
    const tl = createTimeline()
    tl.to(element1, { x: 100 })
    tl.play()
    expect(tl).toBeDefined()
    tl.pause()
  })

  it('should support progress', () => {
    const tl = createTimeline()
    tl.to(element1, { x: 100 })
    const progress = tl.progress()
    expect(progress).toBeTypeOf('number')
  })
})






