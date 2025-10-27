/**
 * React Hook - 性能监控
 */

import { useEffect, useState, useCallback } from 'react'
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
 * 使用性能监控 Hook
 * 
 * @param enabled - 是否启用监控
 * @param interval - 更新间隔（毫秒）
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const stats = usePerformance(true, 1000)
 *   
 *   return (
 *     <div>
 *       <p>FPS: {stats.fps}</p>
 *       <p>Animations: {stats.activeAnimations}</p>
 *       <p>Memory: {stats.memoryUsage}MB</p>
 *     </div>
 *   )
 * }
 * ```
 */
export function usePerformance(enabled: boolean = true, interval: number = 1000): PerformanceStats {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    activeAnimations: 0,
    memoryUsage: 0,
    deviceTier: 'medium',
  })

  useEffect(() => {
    if (!enabled) return

    // 启动内存监控
    memoryMonitor.start()

    const updateStats = () => {
      const engineStats = engine.getStats()
      const memStats = memoryMonitor.getStats()
      const device = performanceAdaptive.getDevice()

      setStats({
        fps: engineStats.fps,
        activeAnimations: engineStats.activeAnimations,
        memoryUsage: memStats.usedMemory,
        deviceTier: device.tier,
      })
    }

    // 立即更新一次
    updateStats()

    // 定时更新
    const timerId = setInterval(updateStats, interval)

    return () => {
      clearInterval(timerId)
    }
  }, [enabled, interval])

  return stats
}

/**
 * 使用性能自适应配置 Hook
 * 
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const config = usePerformanceConfig()
 *   
 *   return (
 *     <div>
 *       {config.enableComplexAnimations && (
 *         <ComplexAnimation />
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export function usePerformanceConfig(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>(
    performanceAdaptive.getConfig()
  )

  useEffect(() => {
    const handleChange = () => {
      setConfig(performanceAdaptive.getConfig())
    }

    performanceAdaptive.on('downgrade', handleChange)
    performanceAdaptive.on('upgrade', handleChange)

    return () => {
      performanceAdaptive.off('downgrade', handleChange)
      performanceAdaptive.off('upgrade', handleChange)
    }
  }, [])

  return config
}

/**
 * 使用 FPS 监控 Hook
 * 
 * @param threshold - FPS 低于此值时触发回调
 * @param onLowFPS - FPS 过低时的回调
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fps = useFPS(40, (fps) => {
 *     console.warn('Low FPS:', fps)
 *   })
 *   
 *   return <div>Current FPS: {fps}</div>
 * }
 * ```
 */
export function useFPS(
  threshold: number = 40,
  onLowFPS?: (fps: number) => void
): number {
  const [fps, setFPS] = useState(60)

  useEffect(() => {
    const checkFPS = () => {
      const stats = engine.getStats()
      const currentFPS = stats.fps

      setFPS(currentFPS)

      if (currentFPS < threshold && onLowFPS) {
        onLowFPS(currentFPS)
      }
    }

    const timerId = setInterval(checkFPS, 1000)

    return () => clearInterval(timerId)
  }, [threshold, onLowFPS])

  return fps
}

/**
 * 使用内存监控 Hook
 * 
 * @param threshold - 内存使用率阈值（0-1）
 * @param onHighMemory - 内存过高时的回调
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const memory = useMemory(0.8, (usage) => {
 *     console.warn('High memory:', usage)
 *     // 清理动画
 *     engine.clear()
 *   })
 *   
 *   return (
 *     <div>
 *       Memory: {memory.usedMemory}MB ({(memory.usage * 100).toFixed(1)}%)
 *     </div>
 *   )
 * }
 * ```
 */
export function useMemory(
  threshold: number = 0.8,
  onHighMemory?: (usage: number) => void
) {
  const [memoryStats, setMemoryStats] = useState(memoryMonitor.getStats())

  useEffect(() => {
    memoryMonitor.start()

    const checkMemory = () => {
      const stats = memoryMonitor.getStats()
      setMemoryStats(stats)

      if (stats.usage > threshold && onHighMemory) {
        onHighMemory(stats.usage)
      }
    }

    const timerId = setInterval(checkMemory, 2000)

    return () => clearInterval(timerId)
  }, [threshold, onHighMemory])

  return memoryStats
}


