// Vue types will be provided by the consuming application
type Ref<T> = { value: T }

// Mock Vue functions for type checking
const ref = <T>(value: T): Ref<T> => ({ value })
const inject = <T>(): T | undefined => undefined as T | undefined
const onUnmounted = (_fn: () => void): void => {}
const nextTick = (): Promise<void> => Promise.resolve()
import { SequenceManager } from '../core/SequenceManager'
import type {
  SequenceConfig,
  AnimationStep,
  SequenceState
} from '../types'

// 定义注入键（暂时未使用）
// const SEQUENCE_MANAGER_KEY = Symbol('sequenceManager')

export interface UseSequenceReturn {
  sequenceId: Ref<string | null>
  state: Ref<SequenceState>
  isActive: Ref<boolean>
  isRunning: Ref<boolean>
  isPaused: Ref<boolean>
  progress: Ref<number>
  currentStep: Ref<number>
  totalSteps: Ref<number>
  create: (steps: AnimationStep[], config?: SequenceConfig) => Promise<string>
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  restart: () => void
  skipToStep: (step: number) => void
  getState: () => any
  manager: SequenceManager
}

/**
 * useSequence - 动画序列管理组合式函数
 */
export function useSequence(
  config?: SequenceConfig
): UseSequenceReturn {
  // 尝试从Provider注入管理器，否则创建新实例
  const injectedManager = inject<SequenceManager>()
  const manager = injectedManager || new SequenceManager(config)
  
  const sequenceId = ref<string | null>(null)
  const state = ref<SequenceState>('idle')
  const isActive = ref(false)
  const isRunning = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  const currentStep = ref(0)
  const totalSteps = ref(0)
  
  // 创建序列
  const create = async (steps: AnimationStep[], sequenceConfig?: SequenceConfig) => {
    await nextTick() // 确保DOM已更新
    
    const id = manager.create(steps, sequenceConfig || config || {})
    sequenceId.value = id
    totalSteps.value = steps.length
    currentStep.value = 0
    progress.value = 0
    return id
  }
  
  // 开始序列
  const start = () => {
    if (sequenceId.value) {
      ;(manager as SequenceManager).start(sequenceId.value)
      isActive.value = true
      isRunning.value = true
      isPaused.value = false
    }
  }
  
  // 暂停序列
  const pause = () => {
    if (sequenceId.value) {
      manager.pause(sequenceId.value)
      isRunning.value = false
      isPaused.value = true
    }
  }
  
  // 恢复序列
  const resume = () => {
    if (sequenceId.value) {
      manager.resume(sequenceId.value)
      isRunning.value = true
      isPaused.value = false
    }
  }
  
  // 停止序列
  const stop = () => {
    if (sequenceId.value) {
      manager.stop(sequenceId.value)
      isActive.value = false
      isRunning.value = false
      isPaused.value = false
      progress.value = 0
      currentStep.value = 0
    }
  }
  
  // 重新开始序列
  const restart = () => {
    stop()
    setTimeout(() => start(), 0)
  }
  
  // 跳转到指定步骤
  const skipToStep = (step: number) => {
    if (sequenceId.value && step >= 0 && step < totalSteps.value) {
      // 这里需要在SequenceManager中实现skipToStep方法
      currentStep.value = step
      progress.value = step / totalSteps.value
    }
  }
  
  // 获取状态
  const getState = () => {
    return manager.getStatus()
  }
  
  // 监听状态变化
  manager.on('started', (event: any) => {
    if (event.id === sequenceId.value) {
      state.value = 'playing'
      isActive.value = true
      isRunning.value = true
      isPaused.value = false
    }
  })

  manager.on('paused', (event: any) => {
    if (event.id === sequenceId.value) {
      state.value = 'paused'
      isRunning.value = false
      isPaused.value = true
    }
  })

  manager.on('resumed', (event: any) => {
    if (event.id === sequenceId.value) {
      state.value = 'playing'
      isRunning.value = true
      isPaused.value = false
    }
  })

  manager.on('stopped', (event: any) => {
    if (event.id === sequenceId.value) {
      state.value = 'stopped'
      isActive.value = false
      isRunning.value = false
      isPaused.value = false
      progress.value = 0
      currentStep.value = 0
    }
  })

  manager.on('finished', (event: any) => {
    if (event.id === sequenceId.value) {
      state.value = 'finished'
      isActive.value = false
      isRunning.value = false
      isPaused.value = false
      progress.value = 1
      currentStep.value = totalSteps.value
    }
  })
  
  manager.on('stepChanged', (event: any) => {
    if (event.id === sequenceId.value) {
      currentStep.value = event.step
      progress.value = totalSteps.value > 0 ? event.step / totalSteps.value : 0
    }
  })
  
  // 清理资源
  onUnmounted(() => {
    if (!injectedManager) {
      manager.destroy()
    }
  })
  
  return {
    sequenceId,
    state,
    isActive,
    isRunning,
    isPaused,
    progress,
    currentStep,
    totalSteps,
    create,
    start,
    pause,
    resume,
    stop,
    restart,
    skipToStep,
    getState,
    manager
  }
}

/**
 * useParallelSequence - 并行序列管理组合式函数
 */
export function useParallelSequence(
  config?: SequenceConfig
) {
  const manager = new SequenceManager(config)
  const sequences = ref<Map<string, string>>(new Map())
  const groupState = ref<'idle' | 'running' | 'finished'>('idle')
  const activeCount = ref(0)
  
  // 创建并行序列
  const createParallel = async (sequenceConfigs: { steps: AnimationStep[], config?: SequenceConfig }[]) => {
    await nextTick()
    const ids: string[] = []
    
    sequenceConfigs.forEach((seqConfig, index) => {
      const id = (manager as SequenceManager).create(seqConfig.steps || [])
      sequences.value.set(`sequence-${index}`, id)
      ids.push(id)
    })
    
    return ids
  }
  
  // 开始所有序列
  const startAll = () => {
    groupState.value = 'running'
    activeCount.value = sequences.value.size
    sequences.value.forEach((id: string) => {
      manager.start(id)
    })
  }
  
  // 停止所有序列
  const stopAll = () => {
    groupState.value = 'idle'
    activeCount.value = 0
    sequences.value.forEach((id: string) => {
      manager.stop(id)
    })
  }
  
  // 监听序列完成
  manager.on('finished', () => {
    activeCount.value--
    if (activeCount.value === 0) {
      groupState.value = 'finished'
    }
  })
  
  // 清理资源
  onUnmounted(() => {
    manager.destroy()
  })
  
  return {
    sequences,
    groupState,
    activeCount,
    createParallel,
    startAll,
    stopAll,
    manager
  }
}