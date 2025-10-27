/**
 * 缓存系统 - 减少重复计算
 */

/**
 * LRU 缓存
 */
export class LRUCache<K, V> {
  private cache: Map<K, V> = new Map()
  private maxSize: number

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize
  }

  /**
   * 获取值
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // 移到最后（最近使用）
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  /**
   * 设置值
   */
  set(key: K, value: V): void {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // 添加到末尾
    this.cache.set(key, value)

    // 检查大小
    if (this.cache.size > this.maxSize) {
      // 删除第一个（最久未使用）
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }

  /**
   * 检查是否存在
   */
  has(key: K): boolean {
    return this.cache.has(key)
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 获取大小
   */
  size(): number {
    return this.cache.size
  }
}

/**
 * 计算缓存
 */
export class ComputeCache {
  private cache: LRUCache<string, any> = new LRUCache(200)

  /**
   * 获取或计算
   */
  getOrCompute<T>(key: string, compute: () => T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T
    }

    const value = compute()
    this.cache.set(key, value)
    return value
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }
}

/**
 * 全局计算缓存
 */
export const computeCache = new ComputeCache()

/**
 * Transform 缓存配置
 */
interface TransformCacheConfig {
  ttl: number
  maxSize: number
}

/**
 * Transform 缓存（优化版 - 使用 WeakMap 避免内存泄漏）
 */
class TransformCache {
  // 使用 WeakMap 自动清理不再引用的元素
  private cache: WeakMap<Element, { transform: any; timestamp: number }> = new WeakMap()
  private config: TransformCacheConfig
  private cleanupScheduled: boolean = false

  constructor(config: Partial<TransformCacheConfig> = {}) {
    this.config = {
      ttl: config.ttl ?? 1000, // 默认1秒过期
      maxSize: config.maxSize ?? 200,
    }
  }

  /**
   * 获取缓存的 transform
   */
  get(element: Element): any | null {
    const cached = this.cache.get(element)
    if (cached && Date.now() - cached.timestamp < this.config.ttl) {
      return cached.transform
    }
    return null
  }

  /**
   * 设置 transform 缓存
   */
  set(element: Element, transform: any): void {
    this.cache.set(element, {
      transform,
      timestamp: Date.now(),
    })

    // 使用 RAF 调度清理，而不是 setInterval
    this.scheduleCleanup()
  }

  /**
   * 调度清理（使用 RAF，避免阻塞）
   */
  private scheduleCleanup(): void {
    if (this.cleanupScheduled) return

    this.cleanupScheduled = true
    requestIdleCallback(() => {
      // WeakMap 会自动清理，这里只需要重置标志
      this.cleanupScheduled = false
    }, { timeout: 5000 })
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache = new WeakMap()
  }
}

/**
 * 全局 transform 缓存实例
 */
const transformCache = new TransformCache()

/**
 * 获取缓存的 transform（向后兼容）
 */
export function getCachedTransform(element: Element): any | null {
  return transformCache.get(element)
}

/**
 * 设置 transform 缓存（向后兼容）
 */
export function setCachedTransform(element: Element, transform: any): void {
  transformCache.set(element, transform)
}

/**
 * 清理过期的 transform 缓存（向后兼容，但现在由 WeakMap 自动管理）
 */
export function cleanTransformCache(): void {
  // WeakMap 自动清理，无需手动操作
}



