/**
 * 对象池 - 减少对象创建和GC压力
 */

/**
 * 通用对象池
 */
export class ObjectPool<T> {
  private pool: T[] = []
  private factory: () => T
  private reset: (obj: T) => void
  private maxSize: number

  constructor(
    factory: () => T,
    reset: (obj: T) => void,
    maxSize: number = 100
  ) {
    this.factory = factory
    this.reset = reset
    this.maxSize = maxSize
  }

  /**
   * 获取对象
   */
  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!
    }
    return this.factory()
  }

  /**
   * 释放对象
   */
  release(obj: T): void {
    if (this.pool.length < this.maxSize) {
      this.reset(obj)
      this.pool.push(obj)
    }
  }

  /**
   * 清空池
   */
  clear(): void {
    this.pool = []
  }

  /**
   * 获取池大小
   */
  size(): number {
    return this.pool.length
  }
}

/**
 * 创建对象池
 */
export function createObjectPool<T>(
  factory: () => T,
  reset: (obj: T) => void,
  maxSize?: number
): ObjectPool<T> {
  return new ObjectPool(factory, reset, maxSize)
}



