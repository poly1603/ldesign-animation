/**
 * 弹簧物理动画
 */

import type { Animation, SpringOptions } from '../types'

/**
 * 创建弹簧动画
 * 
 * 基于胡克定律的弹簧物理模拟
 * 
 * @param options - 弹簧配置选项
 * @returns 动画实例
 * @example
 * ```typescript
 * spring({
 *   targets: '.element',
 *   translateX: 250,
 *   stiffness: 200,
 *   damping: 10,
 *   mass: 1
 * })
 * ```
 */
export function spring(options: SpringOptions): Animation {
  const {
    stiffness = 100,
    damping = 10,
    mass = 1,
    velocity = 0,
    precision = 0.01,
    ...animationOptions
  } = options

  // TODO: 实现弹簧物理计算
  console.log('Creating spring animation:', {
    stiffness,
    damping,
    mass,
    velocity,
    precision,
  })

  // 计算弹簧动画的自然时长
  const duration = calculateSpringDuration(stiffness, damping, mass, precision)

  return {
    play() {
      console.log('Spring animation play')
      return this
    },
    pause() {
      console.log('Spring animation pause')
      return this
    },
    restart() {
      console.log('Spring animation restart')
      return this
    },
    reverse() {
      console.log('Spring animation reverse')
      return this
    },
    seek(time: number) {
      console.log('Spring animation seek:', time)
      return this
    },
    seekProgress(progress: number) {
      console.log('Spring animation seekProgress:', progress)
      return this
    },
    cancel() {
      console.log('Spring animation cancel')
    },
    finish() {
      console.log('Spring animation finish')
    },
    get playing() {
      return false
    },
    get progress() {
      return 0
    },
    get currentTime() {
      return 0
    },
    get duration() {
      return duration
    },
  }
}

/**
 * 计算弹簧动画时长
 * 
 * @param stiffness - 刚度
 * @param damping - 阻尼
 * @param mass - 质量
 * @param precision - 精度阈值
 * @returns 估算的动画时长（毫秒）
 */
function calculateSpringDuration(
  stiffness: number,
  damping: number,
  mass: number,
  precision: number,
): number {
  // 阻尼比
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass))

  // 自然频率
  const naturalFrequency = Math.sqrt(stiffness / mass)

  // 根据阻尼比计算时长
  if (dampingRatio < 1) {
    // 欠阻尼：振荡
    const dampedFrequency = naturalFrequency * Math.sqrt(1 - dampingRatio * dampingRatio)
    const decayTime = -Math.log(precision) / (dampingRatio * naturalFrequency)
    return decayTime * 1000
  }
  else if (dampingRatio === 1) {
    // 临界阻尼
    return (-Math.log(precision) / naturalFrequency) * 1000
  }
  else {
    // 过阻尼
    return (-Math.log(precision) / (naturalFrequency * dampingRatio)) * 1000
  }
}

/**
 * 计算弹簧位置
 * 
 * @param t - 时间（秒）
 * @param from - 起始位置
 * @param to - 目标位置
 * @param velocity - 初始速度
 * @param stiffness - 刚度
 * @param damping - 阻尼
 * @param mass - 质量
 * @returns 当前位置
 */
export function calculateSpringPosition(
  t: number,
  from: number,
  to: number,
  velocity: number,
  stiffness: number,
  damping: number,
  mass: number,
): number {
  const displacement = to - from
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass))
  const naturalFrequency = Math.sqrt(stiffness / mass)

  if (dampingRatio < 1) {
    // 欠阻尼
    const dampedFrequency = naturalFrequency * Math.sqrt(1 - dampingRatio * dampingRatio)
    const a = displacement
    const b = (velocity + dampingRatio * naturalFrequency * displacement) / dampedFrequency

    const position =
      Math.exp(-dampingRatio * naturalFrequency * t) *
      (a * Math.cos(dampedFrequency * t) + b * Math.sin(dampedFrequency * t))

    return from + displacement - position
  }
  else if (dampingRatio === 1) {
    // 临界阻尼
    const a = displacement
    const b = velocity + naturalFrequency * displacement

    const position = Math.exp(-naturalFrequency * t) * (a + b * t)
    return from + displacement - position
  }
  else {
    // 过阻尼
    const r1 = -naturalFrequency * (dampingRatio + Math.sqrt(dampingRatio * dampingRatio - 1))
    const r2 = -naturalFrequency * (dampingRatio - Math.sqrt(dampingRatio * dampingRatio - 1))

    const a = (velocity - r2 * displacement) / (r1 - r2)
    const b = displacement - a

    const position = a * Math.exp(r1 * t) + b * Math.exp(r2 * t)
    return from + displacement - position
  }
}

