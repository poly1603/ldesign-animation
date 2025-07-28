import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AnimationManager } from '../src/core/AnimationManager'
import type { AnimationConfig } from '../src/types'

// Mock Web Animations API
class MockAnimation {
  public playState = 'idle'
  public currentTime = 0
  public playbackRate = 1
  
  constructor(public effect: any, public timeline: any) {}
  
  play() {
    this.playState = 'running'
  }
  
  pause() {
    this.playState = 'paused'
  }
  
  cancel() {
    this.playState = 'idle'
  }
  
  reverse() {
    this.playState = 'running'
  }
  
  finish() {
    this.playState = 'finished'
  }
  
  addEventListener(type: string, listener: any) {
    // Mock implementation
  }
  
  removeEventListener(type: string, listener: any) {
    // Mock implementation
  }
}

// Mock HTMLElement.animate
Object.defineProperty(HTMLElement.prototype, 'animate', {
  value: vi.fn((keyframes, options) => new MockAnimation(keyframes, options)),
  writable: true,
})

describe('AnimationManager', () => {
  let animationManager: AnimationManager
  let mockElement: HTMLElement
  
  beforeEach(() => {
    animationManager = new AnimationManager()
    mockElement = document.createElement('div')
    vi.clearAllMocks()
  })
  
  describe('创建动画', () => {
    it('应该能够创建基础动画', () => {
      const config: AnimationConfig = {
        keyframes: [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(100px)' }
        ],
        duration: 1000
      }
      
      const animationId = animationManager.create(mockElement, config)
      
      expect(animationId).toBeDefined()
      expect(typeof animationId).toBe('string')
    })
    
    it('应该能够创建带有缓动函数的动画', () => {
      const config: AnimationConfig = {
        keyframes: [
          { opacity: 0 },
          { opacity: 1 }
        ],
        duration: 500,
        easing: 'ease-in-out'
      }
      
      const animationId = animationManager.create(mockElement, config)
      
      expect(animationId).toBeDefined()
    })
    
    it('应该能够创建带有延迟的动画', () => {
      const config: AnimationConfig = {
        keyframes: [
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' }
        ],
        duration: 300,
        delay: 200
      }
      
      const animationId = animationManager.create(mockElement, config)
      
      expect(animationId).toBeDefined()
    })
  })
  
  describe('动画控制', () => {
    let animationId: string
    
    beforeEach(() => {
      const config: AnimationConfig = {
        keyframes: [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(100px)' }
        ],
        duration: 1000
      }
      animationId = animationManager.create(mockElement, config)
    })
    
    it('应该能够播放动画', () => {
      animationManager.play(animationId)
      
      const state = animationManager.getState(animationId)
      expect(state).toBe('running')
    })
    
    it('应该能够暂停动画', () => {
      animationManager.play(animationId)
      animationManager.pause(animationId)
      
      const state = animationManager.getState(animationId)
      expect(state).toBe('paused')
    })
    
    it('应该能够停止动画', () => {
      animationManager.play(animationId)
      animationManager.stop(animationId)
      
      const state = animationManager.getState(animationId)
      expect(state).toBe('idle')
    })
    
    it('应该能够反向播放动画', () => {
      animationManager.play(animationId)
      animationManager.reverse(animationId)
      
      const state = animationManager.getState(animationId)
      expect(state).toBe('running')
    })
    
    it('应该能够跳转到指定时间', () => {
      animationManager.play(animationId)
      animationManager.seek(animationId, 500)
      
      // 验证动画仍在运行状态
      const state = animationManager.getState(animationId)
      expect(state).toBe('running')
    })
  })
  
  describe('动画状态管理', () => {
    it('应该能够获取动画状态', () => {
      const config: AnimationConfig = {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        duration: 500
      }
      
      const animationId = animationManager.create(mockElement, config)
      
      expect(animationManager.getState(animationId)).toBe('idle')
      
      animationManager.play(animationId)
      expect(animationManager.getState(animationId)).toBe('running')
    })
    
    it('应该能够获取所有活跃的动画', () => {
      const config: AnimationConfig = {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        duration: 500
      }
      
      const animationId1 = animationManager.create(mockElement, config)
      const animationId2 = animationManager.create(mockElement, config)
      
      animationManager.play(animationId1)
      animationManager.play(animationId2)
      
      const activeAnimations = animationManager.getActiveAnimations()
      expect(activeAnimations).toHaveLength(2)
      expect(activeAnimations).toContain(animationId1)
      expect(activeAnimations).toContain(animationId2)
    })
    
    it('应该能够清理所有动画', () => {
      const config: AnimationConfig = {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        duration: 500
      }
      
      const animationId1 = animationManager.create(mockElement, config)
      const animationId2 = animationManager.create(mockElement, config)
      
      animationManager.play(animationId1)
      animationManager.play(animationId2)
      
      animationManager.clear()
      
      const activeAnimations = animationManager.getActiveAnimations()
      expect(activeAnimations).toHaveLength(0)
    })
  })
  
  describe('性能监控', () => {
    it('应该能够获取性能指标', () => {
      const metrics = animationManager.getPerformanceMetrics()
      
      expect(metrics).toHaveProperty('totalTransitions')
      expect(metrics).toHaveProperty('activeTransitions')
      expect(metrics).toHaveProperty('averageDuration')
      expect(metrics).toHaveProperty('memoryUsage')
    })
    
    it('应该能够获取性能监控器', () => {
      const monitor = animationManager.getPerformanceMonitor()
      
      expect(monitor).toBeDefined()
      expect(typeof monitor.startMonitoring).toBe('function')
      expect(typeof monitor.stopMonitoring).toBe('function')
      expect(typeof monitor.getReport).toBe('function')
    })
  })
  
  describe('事件系统', () => {
    it('应该能够添加和移除事件监听器', () => {
      const listener = vi.fn()
      
      animationManager.on('started', listener)
      
      const config: AnimationConfig = {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        duration: 500
      }
      
      const animationId = animationManager.create(mockElement, config)
      animationManager.play(animationId)
      
      // 移除监听器
      animationManager.off('started', listener)
    })
  })
  
  describe('错误处理', () => {
    it('应该在动画不存在时抛出错误', () => {
      expect(() => {
        animationManager.play('non-existent-id')
      }).toThrow('Animation with id "non-existent-id" not found')
    })
    
    it('应该在获取不存在动画的状态时返回null', () => {
      const state = animationManager.getState('non-existent-id')
      expect(state).toBeNull()
    })
  })
  
  describe('销毁', () => {
    it('应该能够销毁管理器', () => {
      const config: AnimationConfig = {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        duration: 500
      }
      
      const animationId = animationManager.create(mockElement, config)
      animationManager.play(animationId)
      
      animationManager.destroy()
      
      const activeAnimations = animationManager.getActiveAnimations()
      expect(activeAnimations).toHaveLength(0)
    })
  })
})