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
 * Transform 缓存
 * 缓存元素的 transform 值，避免重复解析
 */
const transformCache = new Map<Element, { transform: any; timestamp: number }>()
const TRANSFORM_CACHE_TTL = 1000 // 1秒过期

/**
 * 获取缓存的 transform
 */
export function getCachedTransform(element: Element): any | null {
  const cached = transformCache.get(element)
  if (cached && Date.now() - cached.timestamp < TRANSFORM_CACHE_TTL) {
    return cached.transform
  }
  return null
}

/**
 * 设置 transform 缓存
 */
export function setCachedTransform(element: Element, transform: any): void {
  transformCache.set(element, {
    transform,
    timestamp: Date.now(),
  })
}

/**
 * 清理过期的 transform 缓存
 */
export function cleanTransformCache(): void {
  const now = Date.now()
  for (const [element, cached] of transformCache.entries()) {
    if (now - cached.timestamp >= TRANSFORM_CACHE_TTL) {
      transformCache.delete(element)
    }
  }
}

// 定期清理缓存
setInterval(cleanTransformCache, 5000)



