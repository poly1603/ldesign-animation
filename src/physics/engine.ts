/**
 * 简单物理引擎
 */

import type { PhysicsConfig, PhysicsObject } from './types'

/**
 * 物理引擎类
 */
export class PhysicsEngine {
  private objects: Map<string, PhysicsObject> = new Map()
  private config: Required<PhysicsConfig>
  private rafId: number | null = null
  private lastTime: number = 0
  private running: boolean = false

  constructor(config: PhysicsConfig = {}) {
    this.config = {
      gravity: config.gravity ?? 9.8,
      friction: config.friction ?? 0.98,
      restitution: config.restitution ?? 0.8,
    }
  }

  /**
   * 添加物体
   */
  addObject(id: string, obj: PhysicsObject): void {
    this.objects.set(id, obj)
  }

  /**
   * 移除物体
   */
  removeObject(id: string): void {
    this.objects.delete(id)
  }

  /**
   * 获取物体
   */
  getObject(id: string): PhysicsObject | undefined {
    return this.objects.get(id)
  }

  /**
   * 开始模拟
   */
  start(): void {
    if (this.running) return

    this.running = true
    this.lastTime = performance.now()
    this.tick()
  }

  /**
   * 停止模拟
   */
  stop(): void {
    this.running = false
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * RAF 循环
   */
  private tick = () => {
    if (!this.running) return

    const currentTime = performance.now()
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.016) // 最大 16ms
    this.lastTime = currentTime

    // 更新所有物体
    this.objects.forEach((obj) => {
      // 应用重力
      obj.vy += this.config.gravity * deltaTime

      // 应用摩擦力
      obj.vx *= this.config.friction
      obj.vy *= this.config.friction

      // 更新位置
      obj.x += obj.vx * deltaTime
      obj.y += obj.vy * deltaTime

      // 简单地面碰撞
      if (obj.y > 0) {
        obj.y = 0
        obj.vy = -obj.vy * this.config.restitution

        // 如果速度很小，停止弹跳
        if (Math.abs(obj.vy) < 0.1) {
          obj.vy = 0
        }
      }
    })

    this.rafId = requestAnimationFrame(this.tick)
  }

  /**
   * 应用力
   */
  applyForce(id: string, fx: number, fy: number): void {
    const obj = this.objects.get(id)
    if (!obj) return

    obj.vx += fx / obj.mass
    obj.vy += fy / obj.mass
  }

  /**
   * 清空所有物体
   */
  clear(): void {
    this.objects.clear()
  }
}

/**
 * 创建物理引擎
 */
export function createPhysicsEngine(config?: PhysicsConfig): PhysicsEngine {
  return new PhysicsEngine(config)
}

