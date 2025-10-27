/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { engine, to } from '../../src/index'

describe('FPS Performance Tests', () => {
  beforeEach(() => {
    engine.clear()
  })

  it('should calculate FPS accurately', () => {
    const stats = engine.getStats()
    expect(stats.fps).toBeGreaterThan(0)
    expect(stats.fps).toBeLessThanOrEqual(60)
  })

  it('should maintain 60 FPS with many animations', () => {
    // 创建100个动画
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div')
      document.body.appendChild(el)
      to(el, { x: 100, opacity: 0.5 }, { duration: 1000 })
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const stats = engine.getStats()
        // FPS 应该接近 60（允许一定误差）
        expect(stats.fps).toBeGreaterThan(40)

        // 清理
        document.body.innerHTML = ''
        engine.clear()

        resolve()
      }, 100)
    })
  })

  it('should stop RAF when no animations', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    to(el, { x: 100 }, { duration: 50 })

    expect(engine.isRunning()).toBe(true)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 动画完成后，引擎应该停止
        expect(engine.isRunning()).toBe(false)

        el.remove()
        resolve()
      }, 100)
    })
  })

  it('should restart RAF when adding new animation', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // 确保引擎已停止
    engine.clear()
    expect(engine.isRunning()).toBe(false)

    // 添加新动画
    to(el, { x: 100 }, { duration: 50 })

    // 引擎应该自动启动
    expect(engine.isRunning()).toBe(true)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        el.remove()
        resolve()
      }, 100)
    })
  })
})


