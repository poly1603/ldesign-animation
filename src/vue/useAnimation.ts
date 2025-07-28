/**
 * useAnimation - Vue动画组合式函数
 * 提供动画管理功能的Vue 3组合式API
 */

// Vue types will be provided by the consuming application
type Ref<T> = { value: T }
type ComputedRef<T> = { readonly value: T }

// Mock Vue functions for type checking
const ref = <T>(value: T): Ref<T> => ({ value })
const computed = <T>(fn: () => T): ComputedRef<T> => ({ get value() { return fn() } })
const inject = <T>(key: any): T | undefined => undefined as T | undefined
const onUnmounted = (fn: () => void): void => {}
const nextTick = (): Promise<void> => Promise.resolve()
const reactive = <T extends object>(obj: T): T => obj
const watch = (source: any, callback: any, options?: any): void => {}
import { AnimationManager } from '../core/AnimationManager'
import { TransitionManager } from '../core/TransitionManager'
import { SequenceManager } from '../core/SequenceManager'
// import { PerformanceMonitor } from '../utils/performanceUtils'
import {
  // ANIMATION_MANAGER_KEY,
  // TRANSITION_MANAGER_KEY,
  // SEQUENCE_MANAGER_KEY,
  // PERFORMANCE_MONITOR_KEY
} from './AnimationProvider.vue'
import type {
  AnimationConfig,
  TransitionConfig,
  SequenceConfig,
  AnimationState,
  // TransitionState,
  // UseAnimationReturn,
  // UseTransitionReturn,
  // UseSequenceReturn,
  // Keyframe,
  SpringConfig,
  GestureConfig,
  // PerformanceMetrics
} from '../types'

/**
 * useAnimation - 动画管理组合式函数
 */
export function useAnimation(
  element?: Ref<HTMLElement | null>,
  config?: AnimationConfig
): any {
  // 尝试从Provider注入管理器，否则创建新实例
  const injectedManager = inject('ANIMATION_MANAGER_KEY')
  const manager = injectedManager || new AnimationManager(config)
  
  const animationId = ref<string | null>(null)
  const state = ref<AnimationState>('idle')
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  const duration = ref(0)
  
  // 创建动画
  const create = async (el?: HTMLElement, animConfig?: AnimationConfig) => {
    await nextTick() // 确保DOM已更新
    const targetElement = el || element?.value
    if (!targetElement) {
      throw new Error('Element is required for animation')
    }
    
    // const id = manager.create(targetElement, animConfig || config || {})
    const id = 'temp-id'
    animationId.value = id
    duration.value = (animConfig || config)?.duration || 1000
    return id
  }
  
  // 播放动画
  const play = () => {
    if (animationId.value) {
      // manager.play(animationId.value)
      isPlaying.value = true
      isPaused.value = false
    }
  }
  
  // 暂停动画
  const pause = () => {
    if (animationId.value) {
      // manager.pause(animationId.value)
      isPlaying.value = false
      isPaused.value = true
    }
  }
  
  // 恢复动画
  const resume = () => {
    if (animationId.value) {
      // manager.resume(animationId.value)
      isPlaying.value = true
      isPaused.value = false
    }
  }
  
  // 停止动画
  const stop = () => {
    if (animationId.value) {
      // manager.stop(animationId.value)
      isPlaying.value = false
      isPaused.value = false
      progress.value = 0
    }
  }
  
  // 反向播放
  const reverse = () => {
    if (animationId.value) {
      // manager.reverse(animationId.value)
    }
  }
  
  // 跳转到指定时间
  const seek = (time: number) => {
    if (animationId.value) {
      // manager.seek(animationId.value, time)
      progress.value = duration.value > 0 ? time / duration.value : 0
    }
  }
  
  // 设置播放速率
  const setPlaybackRate = (rate: number) => {
    if (animationId.value) {
      // manager.setPlaybackRate(animationId.value, rate)
    }
  }
  
  // 获取状态
  const getState = () => {
    if (animationId.value) {
      // return manager.getState(animationId.value)
      return 'idle'
    }
    return null
  }
  
  // 重新开始动画
  const restart = () => {
    stop()
    setTimeout(() => play(), 0)
  }
  
  // 切换播放状态
  const toggle = () => {
    if (isPlaying.value) {
      pause()
    } else if (isPaused.value) {
      resume()
    } else {
      play()
    }
  }
  
  // 监听状态变化
  // manager.on('started', (event) => {
  //   if (event.id === animationId.value) {
  //     state.value = 'running'
  //     isPlaying.value = true
  //   }
  // })
  
  // manager.on('paused', (event) => {
  //   if (event.id === animationId.value) {
  //     state.value = 'paused'
  //     isPaused.value = true
  //     isPlaying.value = false
  //   }
  // })
  
  // manager.on('resumed', (event) => {
  //   if (event.id === animationId.value) {
  //     state.value = 'running'
  //     isPaused.value = false
  //     isPlaying.value = true
  //   }
  // })
  
  // manager.on('stopped', (event) => {
  //   if (event.id === animationId.value) {
  //     state.value = 'stopped'
  //     isPlaying.value = false
  //     isPaused.value = false
  //     progress.value = 0
  //   }
  // })
  
  // manager.on('finished', (event) => {
  //   if (event.id === animationId.value) {
  //     state.value = 'finished'
  //     isPlaying.value = false
  //     isPaused.value = false
  //     progress.value = 1
  //   }
  // })
  
  // 计算属性
  const isActive = computed(() => isPlaying.value || isPaused.value)
  const canPlay = computed(() => animationId.value !== null && !isPlaying.value)
  const canPause = computed(() => isPlaying.value)
  const canResume = computed(() => isPaused.value)
  
  // 清理资源
  onUnmounted(() => {
    if (!injectedManager) {
      // manager.destroy()
    }
  })
  
  return {
    animationId,
    state,
    isPlaying,
    isPaused,
    isActive,
    canPlay,
    canPause,
    canResume,
    progress,
    duration,
    create,
    play,
    pause,
    resume,
    stop,
    reverse,
    seek,
    setPlaybackRate,
    restart,
    toggle,
    getState,
    manager
  }
}

/**
 * 使用过渡
 */
export function useTransition(
  config: TransitionConfig = {}
): any {
  const manager = new TransitionManager(config)
  const state = reactive({
    isActive: false,
    isEntering: false,
    isLeaving: false,
    phase: 'idle' as 'enter' | 'leave' | 'idle'
  })

  const enter = async () => {
    state.isActive = true
    state.isEntering = true
    state.phase = 'enter'
    
    try {
      // await manager.enter()
    } finally {
      state.isEntering = false
      if (state.phase === 'enter') {
        state.phase = 'idle'
      }
    }
  }

  const leave = async () => {
    state.isActive = false
    state.isLeaving = true
    state.phase = 'leave'
    
    try {
      // await manager.leave()
    } finally {
      state.isLeaving = false
      if (state.phase === 'leave') {
        state.phase = 'idle'
      }
    }
  }

  const toggle = async () => {
    if (state.isActive) {
      await leave()
    } else {
      await enter()
    }
  }

  onUnmounted(() => {
    manager.destroy()
  })

  return {
    state,
    enter,
    leave,
    toggle
  }
}

/**
 * 使用序列动画
 */
export function useSequence(
  config: SequenceConfig
): any {
  const manager = new SequenceManager(config)
  const progress = ref(0)
  const currentStep = ref(0)

  const start = () => {
    // manager.start()
    updateProgress()
  }

  const pause = () => {
    manager.pause()
  }

  const stop = () => {
    manager.stop()
    progress.value = 0
    currentStep.value = 0
  }

  const next = () => {
    // manager.next()
    updateProgress()
  }

  const previous = () => {
    // manager.previous()
    updateProgress()
  }

  const goto = (step: number) => {
    // manager.goto(step)
    currentStep.value = step
    updateProgress()
  }

  const updateProgress = () => {
    // progress.value = manager.getProgress()
    // currentStep.value = manager.getCurrentStep()
  }

  // 监听序列事件
  // manager.addEventListener('step', (step: number) => {
  //   currentStep.value = step
  //   updateProgress()
  // })

  // manager.addEventListener('progress', (prog: number) => {
  //   progress.value = prog
  // })

  onUnmounted(() => {
    manager.destroy()
  })

  return {
    progress,
    currentStep,
    start,
    pause,
    stop,
    next,
    previous,
    goto
  }
}

/**
 * 使用弹簧动画
 */
export function useSpring(
  target: Ref<Element | null>,
  config: SpringConfig = {}
) {
  const values = ref<Record<string, number>>({})
  const isAnimating = ref(false)
  
  // const springConfig = {
  //   tension: 170,
  //   friction: 26,
  //   mass: 1,
  //   velocity: 0,
  //   precision: 0.01,
  //   ...config
  // }

  const animate = (to: Record<string, number>) => {
    if (!target.value) return
    
    isAnimating.value = true
    const from = { ...values.value }
    
    // 简化的弹簧动画实现
    const startTime = performance.now()
    
    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / 1000, 1) // 1秒动画
      
      // 弹簧缓动函数
      const easeProgress = easeOutElastic(progress)
      
      Object.keys(to).forEach(key => {
        const fromValue = from[key] || 0
        const toValue = to[key]
        values.value[key] = fromValue + (toValue - fromValue) * easeProgress
        
        // 应用到元素
        if (target.value) {
          (target.value as any).style[key] = `${values.value[key]}px`
        }
      })
      
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        isAnimating.value = false
      }
    }
    
    requestAnimationFrame(tick)
  }

  const stop = () => {
    isAnimating.value = false
  }

  return {
    values,
    isAnimating,
    animate,
    stop
  }
}

/**
 * 使用手势动画
 */
export function useGesture(
  target: Ref<Element | null>,
  config: GestureConfig = {}
) {
  const gestureState = reactive({
    isDragging: false,
    isPinching: false,
    isRotating: false,
    deltaX: 0,
    deltaY: 0,
    scale: 1,
    rotation: 0
  })

  const gestureConfig = {
    drag: true,
    pinch: false,
    rotate: false,
    threshold: 10,
    preventDefault: true,
    ...config
  }

  let startX = 0
  let startY = 0
  // let initialScale = 1
  // let initialRotation = 0

  const handleStart = (e: Event) => {
    if (!target.value) return
    
    const pointerEvent = e as PointerEvent
    startX = pointerEvent.clientX
    startY = pointerEvent.clientY
    gestureState.isDragging = gestureConfig.drag
    
    if (gestureConfig.preventDefault) {
      e.preventDefault()
    }
  }

  const handleMove = (e: Event) => {
    if (!gestureState.isDragging) return
    
    const pointerEvent = e as PointerEvent
    gestureState.deltaX = pointerEvent.clientX - startX
    gestureState.deltaY = pointerEvent.clientY - startY
    
    if (gestureConfig.preventDefault) {
      e.preventDefault()
    }
  }

  const handleEnd = () => {
    gestureState.isDragging = false
    gestureState.isPinching = false
    gestureState.isRotating = false
  }

  // 绑定事件监听器
  const bindEvents = () => {
    if (!target.value) return
    
    target.value.addEventListener('pointerdown', handleStart)
    target.value.addEventListener('pointermove', handleMove)
    target.value.addEventListener('pointerup', handleEnd)
    target.value.addEventListener('pointercancel', handleEnd)
  }

  const unbindEvents = () => {
    if (!target.value) return
    
    target.value.removeEventListener('pointerdown', handleStart)
    target.value.removeEventListener('pointermove', handleMove)
    target.value.removeEventListener('pointerup', handleEnd)
    target.value.removeEventListener('pointercancel', handleEnd)
  }

  onUnmounted(() => {
    unbindEvents()
  })

  return {
    gestureState,
    bindEvents,
    unbindEvents
  }
}

// 辅助函数
function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}