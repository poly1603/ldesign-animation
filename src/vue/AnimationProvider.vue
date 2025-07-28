<template>
  <slot />
</template>

<script setup lang="ts">
/**
 * AnimationProvider - Vue动画提供者组件
 * 为子组件提供动画管理功能
 */

import { provide, onUnmounted, ref, reactive } from 'vue'
import { AnimationManager } from '../core/AnimationManager'
import { TransitionManager } from '../core/TransitionManager'
import { SequenceManager } from '../core/SequenceManager'
import { PerformanceMonitor } from '../utils/performanceUtils'
import type {
  AnimationConfig,
  TransitionConfig,
  SequenceConfig,
  PerformanceMetrics
} from '../types'

// 注入键
export const ANIMATION_MANAGER_KEY = Symbol('animationManager')
export const TRANSITION_MANAGER_KEY = Symbol('transitionManager')
export const SEQUENCE_MANAGER_KEY = Symbol('sequenceManager')
export const PERFORMANCE_MONITOR_KEY = Symbol('performanceMonitor')

// Props
interface Props {
  /** 默认动画配置 */
  defaultAnimationConfig?: AnimationConfig
  /** 默认过渡配置 */
  defaultTransitionConfig?: TransitionConfig
  /** 默认序列配置 */
  defaultSequenceConfig?: SequenceConfig
  /** 是否启用性能监控 */
  enablePerformanceMonitoring?: boolean
  /** 性能监控回调 */
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void
}

const props = withDefaults(defineProps<Props>(), {
  enablePerformanceMonitoring: false
})

// Emits
interface Emits {
  /** 性能指标更新 */
  performanceUpdate: [metrics: PerformanceMetrics]
  /** 动画管理器就绪 */
  ready: [managers: {
    animationManager: AnimationManager
    transitionManager: TransitionManager
    sequenceManager: SequenceManager
    performanceMonitor?: PerformanceMonitor
  }]
}

const emit = defineEmits<Emits>()

// 创建管理器实例
const animationManager = new AnimationManager(props.defaultAnimationConfig)
const transitionManager = new TransitionManager(props.defaultTransitionConfig)
const sequenceManager = new SequenceManager(
  props.defaultSequenceConfig,
  animationManager,
  transitionManager
)

// 性能监控器
let performanceMonitor: PerformanceMonitor | undefined

if (props.enablePerformanceMonitoring) {
  performanceMonitor = new PerformanceMonitor()
  
  // 监听性能指标更新
  performanceMonitor.addObserver((metrics) => {
    emit('performanceUpdate', metrics)
    props.onPerformanceUpdate?.(metrics)
  })
  
  // 启动监控
  performanceMonitor.start()
  
  // 集成动画管理器的性能监控
  const originalPlay = animationManager.play.bind(animationManager)
  const originalStop = animationManager.stop.bind(animationManager)
  
  animationManager.play = (id: string) => {
    performanceMonitor?.recordAnimationStart()
    return originalPlay(id)
  }
  
  animationManager.stop = (id: string) => {
    const startTime = Date.now()
    const result = originalStop(id)
    const duration = Date.now() - startTime
    performanceMonitor?.recordAnimationEnd(duration)
    return result
  }
}

// 提供管理器实例
provide(ANIMATION_MANAGER_KEY, animationManager)
provide(TRANSITION_MANAGER_KEY, transitionManager)
provide(SEQUENCE_MANAGER_KEY, sequenceManager)
if (performanceMonitor) {
  provide(PERFORMANCE_MONITOR_KEY, performanceMonitor)
}

// 响应式状态
const state = reactive({
  isReady: true,
  activeAnimations: 0,
  activeTransitions: 0,
  activeSequences: 0
})

// 监听管理器状态变化
animationManager.on('started', () => {
  state.activeAnimations++
})

animationManager.on('finished', () => {
  state.activeAnimations = Math.max(0, state.activeAnimations - 1)
})

animationManager.on('stopped', () => {
  state.activeAnimations = Math.max(0, state.activeAnimations - 1)
})

transitionManager.on('started', () => {
  state.activeTransitions++
})

transitionManager.on('finished', () => {
  state.activeTransitions = Math.max(0, state.activeTransitions - 1)
})

transitionManager.on('stopped', () => {
  state.activeTransitions = Math.max(0, state.activeTransitions - 1)
})

sequenceManager.on('started', () => {
  state.activeSequences++
})

sequenceManager.on('finished', () => {
  state.activeSequences = Math.max(0, state.activeSequences - 1)
})

sequenceManager.on('stopped', () => {
  state.activeSequences = Math.max(0, state.activeSequences - 1)
})

// 发出就绪事件
emit('ready', {
  animationManager,
  transitionManager,
  sequenceManager,
  performanceMonitor
})

// 清理资源
onUnmounted(() => {
  animationManager.destroy()
  transitionManager.destroy()
  sequenceManager.destroy()
  performanceMonitor?.stop()
})

// 暴露状态和方法
defineExpose({
  animationManager,
  transitionManager,
  sequenceManager,
  performanceMonitor,
  state,
  
  // 便捷方法
  createAnimation: animationManager.create.bind(animationManager),
  createTransition: transitionManager.create.bind(transitionManager),
  createSequence: sequenceManager.create.bind(sequenceManager),
  
  // 批量操作
  stopAllAnimations: () => {
    animationManager.clear()
    transitionManager.clear()
    sequenceManager.clear()
  },
  
  // 性能相关
  getPerformanceMetrics: () => {
    return {
      animation: animationManager.getPerformanceMetrics(),
      transition: transitionManager.getPerformanceMetrics(),
      sequence: sequenceManager.getPerformanceMetrics(),
      monitor: performanceMonitor?.getMetrics()
    }
  }
})
</script>

<script lang="ts">
// 组件名称
export default {
  name: 'AnimationProvider'
}
</script>