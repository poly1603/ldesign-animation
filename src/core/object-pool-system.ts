/**
 * 扩展的对象池系统 - 为动画系统提供全面的对象复用
 */

import { ObjectPool } from './object-pool'
import type { PropertyInterpolator } from './property'
import type { AnimationOptions, AnimationProps } from './types'

/**
 * 插值器对象池
 */
class InterpolatorPool extends ObjectPool<PropertyInterpolator> {
  constructor() {
    super(
      // 工厂函数 - 创建空的插值器
      () => {
        const InterpolatorClass = require('./property').PropertyInterpolator
        return new InterpolatorClass('', '', '')
      },
      // 重置函数 - 清理插值器状态
      (interpolator: PropertyInterpolator) => {
        // 重置内部状态
        ; (interpolator as any).prop = ''
          ; (interpolator as any).fromValue = ''
          ; (interpolator as any).toValue = ''
          ; (interpolator as any).fromNum = 0
          ; (interpolator as any).toNum = 0
          ; (interpolator as any).unit = ''
          ; (interpolator as any).fromColor = undefined
          ; (interpolator as any).toColor = undefined
      },
      200 // 最大池大小
    )
  }

  /**
   * 获取配置好的插值器
   */
  acquireConfigured(prop: string, from: any, to: any): PropertyInterpolator {
    const interpolator = this.acquire()
      // 重新初始化
      ; (interpolator as any).prop = prop
      ; (interpolator as any).fromValue = from
      ; (interpolator as any).toValue = to
      ; (interpolator as any).isColor = require('./property').isColorProperty(prop)
      ; (interpolator as any).isTransform = require('./property').isTransformProperty(prop)
      ; (interpolator as any).parse()
    return interpolator
  }
}

/**
 * 数组对象池
 */
class ArrayPool<T> {
  private pools: Map<number, T[][]> = new Map()
  private maxPoolSize: number = 50

  /**
   * 获取指定长度的数组
   */
  acquire(length: number): T[] {
    if (!this.pools.has(length)) {
      this.pools.set(length, [])
    }

    const pool = this.pools.get(length)!
    if (pool.length > 0) {
      const array = pool.pop()!
      array.length = length // 确保长度正确
      return array
    }

    return new Array(length)
  }

  /**
   * 释放数组
   */
  release(array: T[]): void {
    const length = array.length
    if (length === 0 || length > 100) return // 不缓存空数组或超大数组

    if (!this.pools.has(length)) {
      this.pools.set(length, [])
    }

    const pool = this.pools.get(length)!
    if (pool.length < this.maxPoolSize) {
      // 清空数组内容
      for (let i = 0; i < array.length; i++) {
        array[i] = undefined as any
      }
      pool.push(array)
    }
  }

  /**
   * 清空所有池
   */
  clear(): void {
    this.pools.clear()
  }
}

/**
 * 对象字面量池
 */
class ObjectLiteralPool {
  private pool: any[] = []
  private maxSize: number = 100

  /**
   * 获取空对象
   */
  acquire(): any {
    if (this.pool.length > 0) {
      return this.pool.pop()!
    }
    return {}
  }

  /**
   * 释放对象
   */
  release(obj: any): void {
    if (this.pool.length < this.maxSize) {
      // 清空对象属性
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          delete obj[key]
        }
      }
      this.pool.push(obj)
    }
  }

  /**
   * 清空池
   */
  clear(): void {
    this.pool = []
  }
}

/**
 * Tween 选项对象池
 */
class TweenOptionsPool extends ObjectPool<AnimationOptions> {
  constructor() {
    super(
      () => ({} as AnimationOptions),
      (options: AnimationOptions) => {
        // 清理所有属性
        for (const key in options) {
          delete (options as any)[key]
        }
      },
      100
    )
  }
}

/**
 * 动画属性对象池
 */
class AnimationPropsPool extends ObjectPool<AnimationProps> {
  constructor() {
    super(
      () => ({} as AnimationProps),
      (props: AnimationProps) => {
        // 清理所有属性
        for (const key in props) {
          delete props[key]
        }
      },
      100
    )
  }
}

/**
 * 全局对象池管理器
 */
export class PoolManager {
  private static instance: PoolManager

  readonly interpolatorPool = new InterpolatorPool()
  readonly arrayPool = new ArrayPool<any>()
  readonly objectPool = new ObjectLiteralPool()
  readonly tweenOptionsPool = new TweenOptionsPool()
  readonly animationPropsPool = new AnimationPropsPool()

  // 性能统计
  private stats = {
    interpolatorHits: 0,
    interpolatorMisses: 0,
    arrayHits: 0,
    arrayMisses: 0,
    objectHits: 0,
    objectMisses: 0,
  }

  private constructor() {
    // 定期清理（空闲时）
    if (typeof requestIdleCallback !== 'undefined') {
      this.scheduleCleanup()
    }
  }

  /**
   * 获取单例实例
   */
  static getInstance(): PoolManager {
    if (!PoolManager.instance) {
      PoolManager.instance = new PoolManager()
    }
    return PoolManager.instance
  }

  /**
   * 获取插值器（带统计）
   */
  getInterpolator(prop: string, from: any, to: any): PropertyInterpolator {
    if (this.interpolatorPool.size() > 0) {
      this.stats.interpolatorHits++
    } else {
      this.stats.interpolatorMisses++
    }
    return this.interpolatorPool.acquireConfigured(prop, from, to)
  }

  /**
   * 释放插值器
   */
  releaseInterpolator(interpolator: PropertyInterpolator): void {
    this.interpolatorPool.release(interpolator)
  }

  /**
   * 获取数组（带统计）
   */
  getArray<T>(length: number): T[] {
    const hadCached = this.arrayPool['pools'].get(length)?.length || 0
    if (hadCached > 0) {
      this.stats.arrayHits++
    } else {
      this.stats.arrayMisses++
    }
    return this.arrayPool.acquire(length)
  }

  /**
   * 释放数组
   */
  releaseArray<T>(array: T[]): void {
    this.arrayPool.release(array)
  }

  /**
   * 获取对象（带统计）
   */
  getObject(): any {
    if (this.objectPool['pool'].length > 0) {
      this.stats.objectHits++
    } else {
      this.stats.objectMisses++
    }
    return this.objectPool.acquire()
  }

  /**
   * 释放对象
   */
  releaseObject(obj: any): void {
    this.objectPool.release(obj)
  }

  /**
   * 获取性能统计
   */
  getStats() {
    const total = (hits: number, misses: number) => hits + misses || 1
    return {
      interpolator: {
        hits: this.stats.interpolatorHits,
        misses: this.stats.interpolatorMisses,
        hitRate: this.stats.interpolatorHits / total(this.stats.interpolatorHits, this.stats.interpolatorMisses),
        poolSize: this.interpolatorPool.size(),
      },
      array: {
        hits: this.stats.arrayHits,
        misses: this.stats.arrayMisses,
        hitRate: this.stats.arrayHits / total(this.stats.arrayHits, this.stats.arrayMisses),
      },
      object: {
        hits: this.stats.objectHits,
        misses: this.stats.objectMisses,
        hitRate: this.stats.objectHits / total(this.stats.objectHits, this.stats.objectMisses),
        poolSize: this.objectPool['pool'].length,
      },
    }
  }

  /**
   * 重置统计
   */
  resetStats(): void {
    this.stats = {
      interpolatorHits: 0,
      interpolatorMisses: 0,
      arrayHits: 0,
      arrayMisses: 0,
      objectHits: 0,
      objectMisses: 0,
    }
  }

  /**
   * 清空所有池
   */
  clearAll(): void {
    this.interpolatorPool.clear()
    this.arrayPool.clear()
    this.objectPool.clear()
    this.tweenOptionsPool.clear()
    this.animationPropsPool.clear()
  }

  /**
   * 定期清理（在空闲时）
   */
  private scheduleCleanup(): void {
    requestIdleCallback(() => {
      // 根据内存压力自动调整池大小
      const memoryPressure = this.getMemoryPressure()
      if (memoryPressure > 0.8) {
        // 高内存压力，清理一半的池
        this.reducePools(0.5)
      } else if (memoryPressure > 0.6) {
        // 中等内存压力，清理1/3的池
        this.reducePools(0.33)
      }

      // 继续调度下次清理
      setTimeout(() => this.scheduleCleanup(), 30000) // 30秒后再次检查
    }, { timeout: 1000 })
  }

  /**
   * 获取内存压力（0-1）
   */
  private getMemoryPressure(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      if (memory && memory.jsHeapSizeLimit) {
        return memory.usedJSHeapSize / memory.jsHeapSizeLimit
      }
    }
    return 0
  }

  /**
   * 减少池大小
   */
  private reducePools(ratio: number): void {
    // 减少插值器池
    const interpolatorSize = this.interpolatorPool.size()
    const interpolatorToRemove = Math.floor(interpolatorSize * ratio)
    for (let i = 0; i < interpolatorToRemove; i++) {
      this.interpolatorPool.acquire() // 取出但不使用，让 GC 回收
    }

    // 减少对象池
    const objectSize = this.objectPool['pool'].length
    const objectToRemove = Math.floor(objectSize * ratio)
    for (let i = 0; i < objectToRemove; i++) {
      this.objectPool.acquire()
    }

    console.log(`[PoolManager] Reduced pools by ${(ratio * 100).toFixed(0)}% due to memory pressure`)
  }
}

/**
 * 导出全局池管理器实例
 */
export const poolManager = PoolManager.getInstance()

/**
 * 便捷函数 - 获取插值器
 */
export function getPooledInterpolator(prop: string, from: any, to: any): PropertyInterpolator {
  return poolManager.getInterpolator(prop, from, to)
}

/**
 * 便捷函数 - 释放插值器
 */
export function releasePooledInterpolator(interpolator: PropertyInterpolator): void {
  poolManager.releaseInterpolator(interpolator)
}

/**
 * 便捷函数 - 获取数组
 */
export function getPooledArray<T>(length: number): T[] {
  return poolManager.getArray(length)
}

/**
 * 便捷函数 - 释放数组
 */
export function releasePooledArray<T>(array: T[]): void {
  poolManager.releaseArray(array)
}

/**
 * 便捷函数 - 获取对象
 */
export function getPooledObject(): any {
  return poolManager.getObject()
}

/**
 * 便捷函数 - 释放对象
 */
export function releasePooledObject(obj: any): void {
  poolManager.releaseObject(obj)
}

