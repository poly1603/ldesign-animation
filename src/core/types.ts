/**
 * 核心类型定义
 */

import type { EasingFunction, EasingName } from '@ldesign/shared'

/**
 * 动画目标
 */
export type AnimationTarget = HTMLElement | SVGElement

/**
 * 可动画的属性值类型
 */
export type AnimatableValue = number | string

/**
 * 动画属性配置
 */
export interface AnimationProps {
  [key: string]: AnimatableValue | AnimatableValue[]
}

/**
 * 关键帧
 */
export interface Keyframe {
  [key: string]: AnimatableValue
  offset?: number // 0-1
}

/**
 * 动画选项
 */
export interface AnimationOptions {
  duration?: number // 持续时间（毫秒）
  delay?: number // 延迟时间（毫秒）
  easing?: EasingName | EasingFunction | string // 缓动函数
  repeat?: number // 重复次数，-1 为无限循环
  yoyo?: boolean // 是否往返运动
  autoplay?: boolean // 是否自动播放
  onStart?: () => void // 开始回调
  onUpdate?: (progress: number) => void // 更新回调
  onComplete?: () => void // 完成回调
  onRepeat?: () => void // 重复回调
}

/**
 * 动画配置（包含目标属性和选项）
 */
export interface AnimationConfig extends AnimationOptions {
  props?: AnimationProps
  keyframes?: Keyframe[]
}

/**
 * 动画状态
 */
export enum AnimationState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished',
}

/**
 * 属性值信息
 */
export interface PropertyValue {
  value: number // 数值部分
  unit: string // 单位部分
  type: 'number' | 'length' | 'angle' | 'color' | 'transform'
}

/**
 * Transform 属性
 */
export interface TransformProps {
  x?: number
  y?: number
  z?: number
  scaleX?: number
  scaleY?: number
  scaleZ?: number
  scale?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  rotate?: number
  skewX?: number
  skewY?: number
  perspective?: number
}

/**
 * 补间动画接口
 */
export interface ITween {
  target: AnimationTarget
  startTime: number
  duration: number
  delay: number
  progress: number
  update(currentTime: number): boolean
  reset(): void
}

/**
 * 动画引擎接口
 */
export interface IAnimationEngine {
  add(tween: ITween): void
  remove(tween: ITween): void
  start(): void
  stop(): void
  isRunning(): boolean
}






