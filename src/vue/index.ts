/**
 * Vue 3 动画组合式函数
 */

import { ref, onMounted, onUnmounted, Ref, computed, watch } from 'vue'
import { AnimationManager } from '../core/AnimationManager'
import { TransitionManager } from '../core/TransitionManager'
import { SequenceManager } from '../core/SequenceManager'
import { CSSAnimationController } from '../core/CSSAnimationController'
import { JSAnimationController } from '../core/JSAnimationController'
import type { AnimationConfig, TransitionConfig, JSAnimationConfig, JSKeyframe } from '../types'
import { presets } from '../utils'

/**
 * 使用动画管理器
 */
export function useAnimation(config?: AnimationConfig) {
  const manager = new AnimationManager(config)
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  
  onUnmounted(() => {
    manager.dispose()
  })
  
  const play = (element: HTMLElement, keyframes: any[], options?: any) => {
    const animation = manager.create(element, keyframes, options)
    isPlaying.value = true
    isPaused.value = false
    
    animation.addEventListener('finish', () => {
      isPlaying.value = false
    })
    
    return animation
  }
  
  const stop = (element: HTMLElement) => {
    manager.stop(element)
    isPlaying.value = false
    isPaused.value = false
    progress.value = 0
  }
  
  const pause = (element: HTMLElement) => {
    manager.pause(element)
    isPaused.value = true
  }
  
  const resume = (element: HTMLElement) => {
    manager.resume(element)
    isPaused.value = false
  }
  
  const getProgress = (element: HTMLElement) => {
    return manager.getProgress(element)
  }
  
  const setProgress = (element: HTMLElement, value: number) => {
    manager.setProgress(element, value)
    progress.value = value
  }
  
  return {
    manager,
    isPlaying: computed(() => isPlaying.value),
    isPaused: computed(() => isPaused.value),
    progress: computed(() => progress.value),
    play,
    stop,
    pause,
    resume,
    getProgress,
    setProgress
  }
}

/**
 * 使用CSS动画
 */
export function useCSSAnimation() {
  const controller = new CSSAnimationController()
  const activeAnimations = ref(new Map())
  
  onUnmounted(() => {
    controller.dispose()
  })
  
  const animate = (element: HTMLElement, animationName: string, options?: any) => {
    controller.apply(element, animationName, options)
    activeAnimations.value.set(element, animationName)
  }
  
  const stop = (element: HTMLElement) => {
    controller.stop(element)
    activeAnimations.value.delete(element)
  }
  
  const pause = (element: HTMLElement) => {
    controller.pause(element)
  }
  
  const resume = (element: HTMLElement) => {
    controller.resume(element)
  }
  
  const getStatus = (element: HTMLElement) => {
    return controller.getStatus(element)
  }
  
  return {
    controller,
    activeAnimations: computed(() => activeAnimations.value),
    animate,
    stop,
    pause,
    resume,
    getStatus
  }
}

/**
 * 使用过渡效果
 */
export function useTransition(config?: TransitionConfig) {
  const manager = new TransitionManager(config)
  const activeTransitions = ref(new Set())
  
  onUnmounted(() => {
    manager.dispose()
  })
  
  const transition = (element: HTMLElement, properties: Record<string, string>, options?: any) => {
    manager.create(element, properties, options)
    activeTransitions.value.add(element)
    
    // 监听过渡结束
    const handleTransitionEnd = () => {
      activeTransitions.value.delete(element)
      element.removeEventListener('transitionend', handleTransitionEnd)
    }
    
    element.addEventListener('transitionend', handleTransitionEnd)
  }
  
  const stop = (element: HTMLElement) => {
    manager.stop(element)
    activeTransitions.value.delete(element)
  }
  
  const getStatus = (element: HTMLElement) => {
    return manager.getStatus(element)
  }
  
  return {
    manager,
    activeTransitions: computed(() => activeTransitions.value),
    transition,
    stop,
    getStatus
  }
}

/**
 * 使用动画序列
 */
export function useSequence() {
  const manager = new SequenceManager()
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const currentStep = ref(0)
  const totalSteps = ref(0)
  
  onUnmounted(() => {
    manager.dispose()
  })
  
  const addAnimation = (element: HTMLElement, keyframes: any[], options?: any) => {
    manager.addAnimation(element, keyframes, options)
    // // totalSteps.value = manager.getSteps().length
     totalSteps.value = 0
    totalSteps.value = 0
  }
  
  const addTransition = (element: HTMLElement, properties: Record<string, string>, options?: any) => {
    // manager.addTransition(element, properties, options)
    totalSteps.value = manager.getSteps().length
  }
  
  const addDelay = (duration: number) => {
    manager.addDelay(duration)
    totalSteps.value = manager.getSteps().length
  }
  
  const play = async () => {
    isPlaying.value = true
    isPaused.value = false
    
    try {
      await manager.play()
      isPlaying.value = false
    } catch (error) {
      isPlaying.value = false
      throw error
    }
  }
  
  const stop = () => {
    manager.stop()
    isPlaying.value = false
    isPaused.value = false
    currentStep.value = 0
  }
  
  const pause = () => {
    manager.pause()
    isPaused.value = true
  }
  
  const resume = () => {
    manager.resume()
    isPaused.value = false
  }
  
  const reset = () => {
    manager.reset()
    currentStep.value = 0
  }
  
  const clear = () => {
    manager.clear()
    totalSteps.value = 0
    currentStep.value = 0
  }
  
  return {
    manager,
    isPlaying: computed(() => isPlaying.value),
    isPaused: computed(() => isPaused.value),
    currentStep: computed(() => currentStep.value),
    totalSteps: computed(() => totalSteps.value),
    progress: computed(() => totalSteps.value > 0 ? currentStep.value / totalSteps.value : 0),
    addAnimation,
    addTransition,
    addDelay,
    play,
    stop,
    pause,
    resume,
    reset,
    clear
  }
}

/**
 * 使用时间轴动画
 */
export function useTimeline() {
  const sequence = useSequence()
  const timeline = ref<Array<{ time: number; action: () => void }>>([])
  
  const addAt = (time: number, action: () => void) => {
    timeline.value.push({ time, action })
    timeline.value.sort((a, b) => a.time - b.time)
  }
  
  const playTimeline = async () => {
    for (const item of timeline.value) {
      await new Promise(resolve => setTimeout(resolve, item.time))
      item.action()
    }
  }
  
  const clearTimeline = () => {
    timeline.value = []
  }
  
  return {
    ...sequence,
    timeline: computed(() => timeline.value),
    addAt,
    playTimeline,
    clearTimeline
  }
}

/**
 * 使用交错动画
 */
export function useStagger() {
  const animations = ref<Animation[]>([])
  const isPlaying = ref(false)
  
  const stagger = (
    elements: HTMLElement[],
    preset: keyof typeof presets,
    options: {
      delay?: number
      stagger?: number
      customOptions?: Partial<KeyframeAnimationOptions>
    } = {}
  ) => {
    const { delay = 0, stagger: staggerDelay = 100, customOptions } = options
    
    animations.value = elements.map((element, index) => {
      const { keyframes, options: presetOptions } = presets[preset]
      const finalOptions = {
        ...presetOptions,
        ...customOptions,
        delay: delay + index * staggerDelay
      }
      
      return element.animate(keyframes, finalOptions)
    })
    
    isPlaying.value = true
    
    // 监听最后一个动画完成
    const lastAnimation = animations.value[animations.value.length - 1]
    if (lastAnimation) {
      lastAnimation.addEventListener('finish', () => {
        isPlaying.value = false
      })
    }
    
    return animations.value
  }
  
  const stop = () => {
    animations.value.forEach(animation => animation.cancel())
    animations.value = []
    isPlaying.value = false
  }
  
  const pause = () => {
    animations.value.forEach(animation => animation.pause())
  }
  
  const resume = () => {
    animations.value.forEach(animation => animation.play())
  }
  
  return {
    animations: computed(() => animations.value),
    isPlaying: computed(() => isPlaying.value),
    stagger,
    stop,
    pause,
    resume
  }
}

/**
 * 使用JS动画
 */
export function useJSAnimation(config?: JSAnimationConfig) {
  const controller = new JSAnimationController(config)
  const activeAnimations = ref(new Map())
  
  onUnmounted(() => {
    controller.dispose()
  })
  
  const animate = (element: HTMLElement, keyframes: JSKeyframe[], options?: JSAnimationConfig) => {
    const animation = controller.create(element, keyframes, options)
    activeAnimations.value.set(element, animation)
    return animation
  }
  
  const tween = (element: HTMLElement, from: JSKeyframe, to: JSKeyframe, options?: JSAnimationConfig) => {
    const animation = controller.tween(element, from, to, options)
    activeAnimations.value.set(element, animation)
    return animation
  }
  
  const spring = (
    element: HTMLElement,
    from: JSKeyframe,
    to: JSKeyframe,
    config?: { tension?: number; friction?: number; mass?: number }
  ) => {
    const animation = controller.spring(element, from, to, config)
    activeAnimations.value.set(element, animation)
    return animation
  }
  
  const play = (element: HTMLElement) => {
    controller.play(element)
  }
  
  const pause = (element: HTMLElement) => {
    controller.pause(element)
  }
  
  const stop = (element: HTMLElement) => {
    controller.stop(element)
    activeAnimations.value.delete(element)
  }
  
  const getStatus = (element: HTMLElement) => {
    return controller.getStatus(element)
  }
  
  const getProgress = (element: HTMLElement) => {
    return controller.getProgress(element)
  }
  
  const setProgress = (element: HTMLElement, progress: number) => {
    controller.setProgress(element, progress)
  }
  
  return {
    controller,
    activeAnimations: computed(() => activeAnimations.value),
    animate,
    tween,
    spring,
    play,
    pause,
    stop,
    getStatus,
    getProgress,
    setProgress
  }
}

/**
 * 使用性能监控
 */
export function usePerformance() {
  const fps = ref(0)
  const frameTime = ref(0)
  const isMonitoring = ref(false)
  
  let lastTime = 0
  let frameCount = 0
  let animationId: number
  
  const startMonitoring = () => {
    if (isMonitoring.value) return
    
    isMonitoring.value = true
    lastTime = performance.now()
    frameCount = 0
    
    const monitor = (currentTime: number) => {
      frameCount++
      frameTime.value = currentTime - lastTime
      
      if (frameCount >= 60) {
        fps.value = Math.round(1000 / (frameTime.value / frameCount))
        frameCount = 0
        lastTime = currentTime
      }
      
      if (isMonitoring.value) {
        animationId = requestAnimationFrame(monitor)
      }
    }
    
    animationId = requestAnimationFrame(monitor)
  }
  
  const stopMonitoring = () => {
    isMonitoring.value = false
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
  
  onUnmounted(() => {
    stopMonitoring()
  })
  
  return {
    fps: computed(() => fps.value),
    frameTime: computed(() => frameTime.value),
    isMonitoring: computed(() => isMonitoring.value),
    startMonitoring,
    stopMonitoring
  }
}

/**
 * 使用元素引用动画
 */
export function useElementAnimation<T extends HTMLElement = HTMLElement>(
  preset?: keyof typeof presets,
  options?: Partial<KeyframeAnimationOptions>
) {
  const elementRef = ref<T>()
  const animation = ref<Animation>()
  const isPlaying = ref(false)
  
  const play = (customPreset?: keyof typeof presets, customOptions?: Partial<KeyframeAnimationOptions>) => {
    if (!elementRef.value) return
    
    const targetPreset = customPreset || preset
    if (!targetPreset) return
    
    const { keyframes, options: presetOptions } = presets[targetPreset]
    const finalOptions = { ...presetOptions, ...options, ...customOptions }
    
    animation.value = elementRef.value.animate(keyframes, finalOptions)
    isPlaying.value = true
    
    animation.value.addEventListener('finish', () => {
      isPlaying.value = false
    })
    
    return animation.value
  }
  
  const stop = () => {
    if (animation.value) {
      animation.value.cancel()
      isPlaying.value = false
    }
  }
  
  const pause = () => {
    if (animation.value) {
      animation.value.pause()
    }
  }
  
  const resume = () => {
    if (animation.value) {
      animation.value.play()
    }
  }
  
  return {
    elementRef,
    animation: computed(() => animation.value),
    isPlaying: computed(() => isPlaying.value),
    play,
    stop,
    pause,
    resume
  }
}

/**
 * 使用滚动触发动画
 */
export function useScrollAnimation(
  elementRef: Ref<HTMLElement | undefined>,
  preset: keyof typeof presets,
  options: {
    threshold?: number
    rootMargin?: string
    once?: boolean
    customOptions?: Partial<KeyframeAnimationOptions>
  } = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true, customOptions } = options
  const isVisible = ref(false)
  const hasAnimated = ref(false)
  
  onMounted(() => {
    if (!elementRef.value) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
          
          if (entry.isIntersecting && (!once || !hasAnimated.value)) {
            const { keyframes, options: presetOptions } = presets[preset]
            const finalOptions = { ...presetOptions, ...customOptions }
            
            entry.target.animate(keyframes, finalOptions)
            hasAnimated.value = true
          }
        })
      },
      { threshold, rootMargin }
    )
    
    observer.observe(elementRef.value)
    
    onUnmounted(() => {
      observer.disconnect()
    })
  })
  
  return {
    isVisible: computed(() => isVisible.value),
    hasAnimated: computed(() => hasAnimated.value)
  }
}

export default {
  useAnimation,
  useCSSAnimation,
  useTransition,
  useSequence,
  useTimeline,
  useStagger,
  useJSAnimation,
  usePerformance,
  useElementAnimation,
  useScrollAnimation
}