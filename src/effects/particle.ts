/**
 * 粒子动画系统
 */

/**
 * 粒子配置
 */
export interface ParticleConfig {
  count?: number // 粒子数量
  speed?: number // 速度
  size?: number // 大小
  color?: string // 颜色
  lifetime?: number // 生命周期（ms）
  gravity?: number // 重力
  spread?: number // 扩散范围
}

/**
 * 粒子
 */
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

/**
 * 粒子系统类
 */
export class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private config: Required<ParticleConfig>
  private rafId: number | null = null
  private lastTime: number = 0

  constructor(canvas: HTMLCanvasElement | string, config: ParticleConfig = {}) {
    const element = typeof canvas === 'string' ? document.querySelector(canvas) : canvas
    if (!element || !(element instanceof HTMLCanvasElement)) {
      throw new Error('Invalid canvas element')
    }

    this.canvas = element
    const context = this.canvas.getContext('2d')
    if (!context) {
      throw new Error('Failed to get canvas context')
    }
    this.ctx = context

    this.config = {
      count: config.count ?? 100,
      speed: config.speed ?? 2,
      size: config.size ?? 2,
      color: config.color ?? '#ffffff',
      lifetime: config.lifetime ?? 2000,
      gravity: config.gravity ?? 0.1,
      spread: config.spread ?? 50,
    }
  }

  /**
   * 发射粒子
   */
  emit(x: number, y: number, count?: number): void {
    const particleCount = count ?? this.config.count

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const speed = this.config.speed + Math.random() * this.config.speed

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: this.config.size + Math.random() * this.config.size,
        color: this.config.color,
        life: 0,
        maxLife: this.config.lifetime,
      })
    }

    if (!this.rafId) {
      this.start()
    }
  }

  /**
   * 开始动画
   */
  start(): void {
    this.lastTime = performance.now()
    this.tick()
  }

  /**
   * 停止动画
   */
  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /**
   * RAF 循环
   */
  private tick = () => {
    const currentTime = performance.now()
    const deltaTime = currentTime - this.lastTime
    this.lastTime = currentTime

    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 更新和绘制粒子
    this.particles = this.particles.filter((particle) => {
      particle.life += deltaTime

      if (particle.life >= particle.maxLife) {
        return false
      }

      // 应用重力
      particle.vy += this.config.gravity

      // 更新位置
      particle.x += particle.vx
      particle.y += particle.vy

      // 计算透明度
      const alpha = 1 - particle.life / particle.maxLife

      // 绘制粒子
      this.ctx.save()
      this.ctx.globalAlpha = alpha
      this.ctx.fillStyle = particle.color
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()

      return true
    })

    // 继续动画
    if (this.particles.length > 0) {
      this.rafId = requestAnimationFrame(this.tick)
    } else {
      this.rafId = null
    }
  }

  /**
   * 清空粒子
   */
  clear(): void {
    this.particles = []
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

/**
 * 创建粒子系统
 */
export function createParticleSystem(
  canvas: HTMLCanvasElement | string,
  config?: ParticleConfig
): ParticleSystem {
  return new ParticleSystem(canvas, config)
}

