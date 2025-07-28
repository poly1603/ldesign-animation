// Vue types will be provided by the consuming application
type Ref<T> = { value: T }

// Mock Vue functions for type checking
const ref = <T>(value: T): Ref<T> => ({ value })
const inject = <T>(): T | undefined => undefined as T | undefined
const onUnmounted = (fn: () => void): void => { fn() }
const nextTick = (): Promise<void> => Promise.resolve()
import { TransitionManager } from '../core/TransitionManager'
import type {
  TransitionConfig,
  TransitionState
} from '../types'

// 定义注入键（暂时未使用）
// const TRANSITION_MANAGER_KEY = Symbol('transitionManager')

export interface UseTransitionReturn {
  transitionId: Ref<string | null>
  state: Ref<TransitionState>
  isActive: Ref<boolean>
  isRunning: Ref<boolean>
  progress: Ref<number>
  duration: Ref<number>
  create: (el?: HTMLElement, config?: TransitionConfig) => Promise<string>
  start: () => void
  stop: () => void
  pause: () => void
  resume: () => void
  getState: () => any
  manager: TransitionManager
}

/**
 * useTransition - 过渡管理组合式函数
 */
export function useTransition(
  element?: Ref<HTMLElement | null>,
  config?: TransitionConfig
): UseTransitionReturn {
  // 尝试从Provider注入管理器，否则创建新实例
  const injectedManager = inject<TransitionManager>()
  const manager = injectedManager || new TransitionManager(config)
  
  const transitionId = ref<string | null>(null)
  const state = ref<any>('idle')
  const isActive = ref(false)
  const isRunning = ref(false)
  const progress = ref(0)
  const duration = ref(0)
  
  // 创建过渡
  const create = async (el?: HTMLElement, transitionConfig?: TransitionConfig) => {
    await nextTick() // 确保DOM已更新
    const targetElement = el || element?.value
    if (!targetElement) {
      throw new Error('Element is required for transition')
    }
    
    const transitionPromise = manager.create(targetElement, transitionConfig || config || {})
    const id = `transition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    transitionId.value = id
    duration.value = (transitionConfig || config)?.duration || 300
    
    // 等待过渡完成
    await transitionPromise
    return id
  }
  
  // 开始过渡
  const start = () => {
    if (transitionId.value) {
      (manager as TransitionManager).start(transitionId.value)
      isActive.value = true
      isRunning.value = true
    }
  }

  // 停止过渡
  const stop = () => {
    if (transitionId.value) {
      manager.stop(transitionId.value)
      isActive.value = false
      isRunning.value = false
      progress.value = 0
    }
  }

  // 暂停过渡（TransitionManager不支持暂停）
  const pause = () => {
    // console.warn('TransitionManager does not support pause operation')
    isRunning.value = false
  }

  // 恢复过渡（TransitionManager不支持恢复）
  const resume = () => {
    // console.warn('TransitionManager does not support resume operation')
    isRunning.value = true
  }
  
  // 获取状态
  const getState = () => {
    if (transitionId.value && element?.value) {
      return manager.getStatus(element.value)
    }
    return 'idle'
  }
  
  // TransitionManager不支持事件监听，使用简化的状态管理
  // 可以通过轮询或其他方式来检测状态变化
  
  // 清理资源
  onUnmounted(() => {
    if (!injectedManager) {
      // (manager as TransitionManager).destroy()
    }
  })
  
  return {
    transitionId,
    state,
    isActive,
    isRunning,
    progress,
    duration,
    create,
    start,
    stop,
    pause,
    resume,
    getState,
    manager
  }
}

/**
 * useTransitionGroup - 过渡组管理组合式函数
 */
export function useTransitionGroup(
  elements?: Ref<HTMLElement[]>,
  config?: TransitionConfig
) {
  const manager = new TransitionManager(config)
  const transitions = ref<Map<string, string>>(new Map())
  const groupState = ref<'idle' | 'running' | 'finished'>('idle')
  
  // 为所有元素创建过渡
  const createAll = async (els?: HTMLElement[], transitionConfig?: TransitionConfig) => {
    await nextTick()
    const targetElements = els || elements?.value || []
    const ids: string[] = []
    
    for (let index = 0; index < targetElements.length; index++) {
      const el = targetElements[index]
      const id = `transition_${Date.now()}_${index}`
      
      // 创建过渡并等待完成
      manager.create(el, {
        ...transitionConfig || config || {},
        delay: (transitionConfig?.delay || 0) + index * 100 // 错开动画
      })
      
      transitions.value.set(el.id || `element-${index}`, id)
      ids.push(id)
    }
    
    return ids
  }
  
  // 开始所有过渡
  const startAll = () => {
    groupState.value = 'running'
    transitions.value.forEach((id: string) => {
      (manager as TransitionManager).start(id)
    })
  }

  // 停止所有过渡
  const stopAll = () => {
    groupState.value = 'idle'
    transitions.value.forEach((id: string) => {
      (manager as TransitionManager).stop(id)
    })
  }

  // 清理资源
  onUnmounted(() => {
    (manager as TransitionManager).destroy()
  })
  
  return {
    transitions,
    groupState,
    createAll,
    startAll,
    stopAll,
    manager
  }
}