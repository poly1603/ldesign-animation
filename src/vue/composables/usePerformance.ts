/**
 * Vue Composable - 性能监控
 */

import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue'
import { engine, memoryMonitor, performanceAdaptive, type PerformanceConfig } from '../../index'

/**
 * 性能统计
 */
export interface PerformanceStats {
  fps: number
  activeAnimations: number
  memoryUsage: number
  deviceTier: 'low' | 'medium' | 'high'
}

/**
 * 使用性能监控 Composable
 * 
 * @param enabled - 是否启用监控
 * @param interval - 更新间隔（毫秒）
 * 
 * @example
 * ```vue
 * <script setup>
 * import { usePerformance } from '@ldesign/animation/vue'
 * 
 * const stats = usePerformance(true, 1000)
 * </script>
 * 
 * <template>
 *   <div>
 *     <p>FPS: {{ stats.fps }}</p>
 *     <p>Animations: {{ stats.activeAnimations }}</p>
 *     <p>Memory: {{ stats.memoryUsage }}MB</p>
 *   </div>
 * </template>
 * ```
 */
export function usePerformance(enabled: Ref<boolean> | boolean = true, interval: number = 1000) {
  const fps = ref(60)
  const activeAnimations = ref(0)
  const memoryUsage = ref(0)
  const deviceTier = ref<'low' | 'medium' | 'high'>('medium')

  let timerId: number | null = null

  const updateStats = () => {
    const engineStats = engine.getStats()
    const memStats = memoryMonitor.getStats()
    const device = performanceAdaptive.getDevice()

    fps.value = engineStats.fps
    activeAnimations.value = engineStats.activeAnimations
    memoryUsage.value = memStats.usedMemory
    deviceTier.value = device.tier
  }

  const start = () => {
    memoryMonitor.start()
    updateStats()
    timerId = window.setInterval(updateStats, interval)
  }

  const stop = () => {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  onMounted(() => {
    const isEnabled = typeof enabled === 'boolean' ? enabled : enabled.value
    if (isEnabled) {
      start()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    fps,
    activeAnimations,
    memoryUsage,
    deviceTier,
    start,
    stop,
  }
}

/**
 * 使用性能自适应配置 Composable
 * 
 * @example
 * ```vue
 * <script setup>
 * import { usePerformanceConfig } from '@ldesign/animation/vue'
 * 
 * const config = usePerformanceConfig()
 * </script>
 * 
 * <template>
 *   <div>
 *     <ComplexAnimation v-if="config.enableComplexAnimations" />
 *   </div>
 * </template>
 * ```
 */
export function usePerformanceConfig() {
  const config = ref<PerformanceConfig>(performanceAdaptive.getConfig())

  const handleChange = () => {
    config.value = performanceAdaptive.getConfig()
  }

  onMounted(() => {
    performanceAdaptive.on('downgrade', handleChange)
    performanceAdaptive.on('upgrade', handleChange)
  })

  onUnmounted(() => {
    performanceAdaptive.off('downgrade', handleChange)
    performanceAdaptive.off('upgrade', handleChange)
  })

  return config
}

/**
 * 使用 FPS 监控 Composable
 * 
 * @param threshold - FPS 低于此值时触发回调
 * @param onLowFPS - FPS 过低时的回调
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useFPS } from '@ldesign/animation/vue'
 * 
 * const fps = useFPS(40, (fps) => {
 *   console.warn('Low FPS:', fps)
 * })
 * </script>
 * 
 * <template>
 *   <div>Current FPS: {{ fps }}</div>
 * </template>
 * ```
 */
export function useFPS(
  threshold: number = 40,
  onLowFPS?: (fps: number) => void
) {
  const fps = ref(60)
  let timerId: number | null = null

  const checkFPS = () => {
    const stats = engine.getStats()
    const currentFPS = stats.fps

    fps.value = currentFPS

    if (currentFPS < threshold && onLowFPS) {
      onLowFPS(currentFPS)
    }
  }

  onMounted(() => {
    timerId = window.setInterval(checkFPS, 1000)
  })

  onUnmounted(() => {
    if (timerId !== null) {
      clearInterval(timerId)
    }
  })

  return fps
}

/**
 * 使用内存监控 Composable
 * 
 * @param threshold - 内存使用率阈值（0-1）
 * @param onHighMemory - 内存过高时的回调
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useMemory } from '@ldesign/animation/vue'
 * import { engine } from '@ldesign/animation'
 * 
 * const memory = useMemory(0.8, (usage) => {
 *   console.warn('High memory:', usage)
 *   engine.clear()
 * })
 * </script>
 * 
 * <template>
 *   <div>
 *     Memory: {{ memory.usedMemory }}MB ({{ (memory.usage * 100).toFixed(1) }}%)
 *   </div>
 * </template>
 * ```
 */
export function useMemory(
  threshold: number = 0.8,
  onHighMemory?: (usage: number) => void
) {
  const usedMemory = ref(0)
  const usage = ref(0)
  const nearLimit = ref(false)

  let timerId: number | null = null

  const checkMemory = () => {
    const stats = memoryMonitor.getStats()

    usedMemory.value = stats.usedMemory
    usage.value = stats.usage
    nearLimit.value = stats.nearLimit

    if (stats.usage > threshold && onHighMemory) {
      onHighMemory(stats.usage)
    }
  }

  onMounted(() => {
    memoryMonitor.start()
    timerId = window.setInterval(checkMemory, 2000)
  })

  onUnmounted(() => {
    if (timerId !== null) {
      clearInterval(timerId)
    }
  })

  return {
    usedMemory,
    usage,
    nearLimit,
  }
}


