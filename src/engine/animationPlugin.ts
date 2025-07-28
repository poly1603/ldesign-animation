/**
 * Animation Engine Plugin - 动画引擎插件
 */

import type { Plugin, Engine } from '@ldesign/engine'
import { AnimationManager } from '../core/AnimationManager'
import { TransitionManager } from '../core/TransitionManager'
import { SequenceManager } from '../core/SequenceManager'
import type { AnimationPluginConfig } from '../types'

/**
 * 创建动画插件
 */
export function createAnimationPlugin(config: AnimationPluginConfig = {}): Plugin {
  return {
    name: 'animation',
    version: '1.0.0',
    
    install(engine: Engine) {
      // 创建动画管理器实例
      const animationManager = new AnimationManager(config.defaultConfig)
      const transitionManager = new TransitionManager()
      const sequenceManager = new SequenceManager({ animations: [] })
      
      // 性能监控
      if (config.enablePerformanceMonitoring) {
        setupPerformanceMonitoring(animationManager, engine)
      }
      
      // 限制并发动画数量
      if (config.maxConcurrentAnimations) {
        setupConcurrencyControl(animationManager, config.maxConcurrentAnimations)
      }
      
      // 预加载动画
      if (config.preloadAnimations?.length) {
        preloadAnimations(config.preloadAnimations, animationManager)
      }
      
      // 注册服务到引擎
      engine.provide('animationManager', animationManager)
      engine.provide('transitionManager', transitionManager)
      engine.provide('sequenceManager', sequenceManager)
      
      // 注册动画API
      engine.provide('animation', {
        // 创建动画
        create: animationManager.createAnimation.bind(animationManager),
        
        // 控制动画
        play: animationManager.play.bind(animationManager),
        pause: animationManager.pause.bind(animationManager),
        stop: animationManager.stop.bind(animationManager),
        reverse: animationManager.reverse.bind(animationManager),
        seek: animationManager.seek.bind(animationManager),
        
        // 获取状态
        getState: animationManager.getState.bind(animationManager),
        getMetrics: animationManager.getPerformanceMetrics.bind(animationManager),
        
        // 事件监听
        on: animationManager.addEventListener.bind(animationManager),
        off: animationManager.removeEventListener.bind(animationManager),
        
        // 过渡控制
        transition: {
          enter: transitionManager.enter.bind(transitionManager),
          leave: transitionManager.leave.bind(transitionManager),
          toggle: transitionManager.toggle.bind(transitionManager)
        },
        
        // 序列控制
        sequence: {
          start: sequenceManager.start.bind(sequenceManager),
          pause: sequenceManager.pause.bind(sequenceManager),
          stop: sequenceManager.stop.bind(sequenceManager),
          next: sequenceManager.next.bind(sequenceManager),
          previous: sequenceManager.previous.bind(sequenceManager),
          goto: sequenceManager.goto.bind(sequenceManager)
        }
      })
      
      // 注册中间件
      engine.use(createAnimationMiddleware(animationManager))
      
      engine.logger?.info('Animation plugin installed successfully')
    },
    
    uninstall(engine: Engine) {
      const animationManager = engine.inject<AnimationManager>('animationManager')
      const transitionManager = engine.inject<TransitionManager>('transitionManager')
      const sequenceManager = engine.inject<SequenceManager>('sequenceManager')
      
      // 清理资源
      animationManager?.destroy()
      transitionManager?.destroy()
      sequenceManager?.destroy()
      
      engine.logger?.info('Animation plugin uninstalled')
    }
  }
}

/**
 * 设置性能监控
 */
function setupPerformanceMonitoring(manager: AnimationManager, engine: Engine) {
  const monitorInterval = setInterval(() => {
    const metrics = manager.getPerformanceMetrics()
    
    // 如果FPS过低，发出警告
    if (metrics.fps < 30) {
      engine.logger?.warn(`Animation performance warning: FPS is ${metrics.fps}`)
    }
    
    // 如果内存使用过高，发出警告
    if (metrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
      engine.logger?.warn(`Animation memory warning: ${Math.round(metrics.memoryUsage / 1024 / 1024)}MB used`)
    }
    
    // 发送性能事件
    engine.emit('animation:performance', metrics)
  }, 5000) // 每5秒检查一次
  
  // 清理定时器
  engine.on('destroy', () => {
    clearInterval(monitorInterval)
  })
}

/**
 * 设置并发控制
 */
function setupConcurrencyControl(manager: AnimationManager, maxConcurrent: number) {
  let activeAnimations = 0
  const animationQueue: Array<() => void> = []
  
  // 重写play方法以添加并发控制
  const originalPlay = manager.play.bind(manager)
  manager.play = function(id?: string) {
    if (activeAnimations < maxConcurrent) {
      activeAnimations++
      originalPlay(id)
      
      // 监听动画结束
      manager.addEventListener('end', () => {
        activeAnimations--
        // 处理队列中的下一个动画
        if (animationQueue.length > 0) {
          const nextAnimation = animationQueue.shift()
          nextAnimation?.()
        }
      })
    } else {
      // 添加到队列
      animationQueue.push(() => manager.play(id))
    }
  }
}

/**
 * 预加载动画
 */
function preloadAnimations(animations: string[], manager: AnimationManager) {
  // 这里可以实现动画预加载逻辑
  // 例如预编译关键帧、预创建动画对象等
  animations.forEach(animationName => {
    // 预加载逻辑
    console.log(`Preloading animation: ${animationName}`)
  })
}

/**
 * 创建动画中间件
 */
function createAnimationMiddleware(manager: AnimationManager) {
  return async (context: any, next: () => Promise<void>) => {
    // 在请求开始时记录动画状态
    const startMetrics = manager.getPerformanceMetrics()
    
    try {
      await next()
    } finally {
      // 在请求结束时检查动画性能
      const endMetrics = manager.getPerformanceMetrics()
      
      // 如果动画数量增加过多，记录警告
      if (endMetrics.animationCount - startMetrics.animationCount > 10) {
        console.warn('Large number of animations created in single request')
      }
    }
  }
}

/**
 * Vue 3 插件安装函数
 */
export function install(app: any, options: AnimationPluginConfig = {}) {
  // 创建全局动画管理器
  const animationManager = new AnimationManager(options.defaultConfig)
  const transitionManager = new TransitionManager()
  const sequenceManager = new SequenceManager({ animations: [] })
  
  // 提供给Vue应用
  app.provide('animationManager', animationManager)
  app.provide('transitionManager', transitionManager)
  app.provide('sequenceManager', sequenceManager)
  
  // 全局属性
  app.config.globalProperties.$animation = {
    manager: animationManager,
    transition: transitionManager,
    sequence: sequenceManager
  }
  
  // 清理资源
  app.mixin({
    beforeUnmount() {
      // 组件卸载时清理相关动画
    }
  })
}

// 默认导出
export default {
  install,
  createAnimationPlugin
}