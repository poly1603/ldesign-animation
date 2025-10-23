/**
 * 物理动画类型定义
 */

/**
 * 弹簧配置
 */
export interface SpringConfig {
  mass?: number // 质量（默认 1）
  stiffness?: number // 刚度（默认 100）
  damping?: number // 阻尼（默认 10）
  velocity?: number // 初速度（默认 0）
  restSpeed?: number // 静止速度阈值（默认 0.01）
  restDelta?: number // 静止位移阈值（默认 0.01）
}

/**
 * 惯性配置
 */
export interface InertiaConfig {
  velocity?: number // 初速度
  friction?: number // 摩擦力（默认 0.9）
  min?: number // 最小值
  max?: number // 最大值
  bounce?: number // 弹性系数（默认 0.5）
}

/**
 * 物理引擎配置
 */
export interface PhysicsConfig {
  gravity?: number // 重力加速度（默认 9.8）
  friction?: number // 摩擦力
  restitution?: number // 弹性系数（默认 0.8）
}

/**
 * 物理对象
 */
export interface PhysicsObject {
  x: number
  y: number
  vx: number // x 方向速度
  vy: number // y 方向速度
  mass: number
}






