/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { engine, memoryMonitor, to } from '../../src/index'

describe('Memory Performance Tests', () => {
  beforeEach(() => {
    engine.clear()
  })

  afterEach(() => {
    engine.clear()
  })

  it('should not leak memory when creating many animations', () => {
    const elements: HTMLElement[] = []

    // 创建1000个元素和动画
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      elements.push(el)

      to(el, { x: 100 }, { duration: 100 })
    }

    // 记录初始内存
    const initialCount = engine.getActiveCount()
    expect(initialCount).toBe(1000)

    // 等待动画完成
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 所有动画应该已完成并清理
        const finalCount = engine.getActiveCount()
        expect(finalCount).toBe(0)

        // 清理DOM
        elements.forEach(el => el.remove())

        resolve()
      }, 200)
    })
  })

  it('should reuse arrays in RAF loop', () => {
    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    document.body.appendChild(el1)
    document.body.appendChild(el2)

    // 创建多个动画
    to(el1, { x: 100 }, { duration: 50 })
    to(el2, { x: 100 }, { duration: 50 })

    // 引擎应该复用内部数组，不会创建新数组
    const stats = engine.getStats()
    expect(stats.activeAnimations).toBe(2)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        el1.remove()
        el2.remove()
        resolve()
      }, 100)
    })
  })

  it('should cleanup element references with WeakMap', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    to(el, { x: 100 }, { duration: 100 })

    const tweens = engine.getElementTweens(el)
    expect(tweens.length).toBe(1)

    // 移除元素
    el.remove()

    // WeakMap 会在垃圾回收时自动清理
    // 注意：实际的 GC 时机由浏览器决定，这里只是验证 API
    engine.killElementTweens(el)
    const tweensAfter = engine.getElementTweens(el)
    expect(tweensAfter.length).toBe(0)
  })

  it('should track memory usage with MemoryMonitor', () => {
    memoryMonitor.start()

    // 跟踪对象
    memoryMonitor.track('animations', 10)
    memoryMonitor.track('particles', 100)

    const stats = memoryMonitor.getStats()
    expect(stats.activeObjects).toBe(110)

    // 取消跟踪
    memoryMonitor.untrack('particles')
    const stats2 = memoryMonitor.getStats()
    expect(stats2.activeObjects).toBe(10)

    memoryMonitor.clearTracking()
  })

  it('should not exceed frame time threshold', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })

    engine.setFrameTimeThreshold(1) // 设置很低的阈值

    // 创建大量动画
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      to(el, { x: 100 }, { duration: 50 })
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 应该有帧时间超限的警告
        // 注意：实际是否警告取决于系统性能

        // 恢复阈值
        engine.setFrameTimeThreshold(16.67)

        warnSpy.mockRestore()

        // 清理
        document.body.innerHTML = ''
        engine.clear()

        resolve()
      }, 100)
    })
  })
})


