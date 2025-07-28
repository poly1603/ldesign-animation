/**
 * 动画库类型定义
 */

// 基础动画配置
export interface BaseAnimationConfig {
  duration?: number
  delay?: number
  easing?: string | ((t: number) => number)
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  autoplay?: boolean
  onStart?: () => void
  onUpdate?: (progress: number) => void
  onComplete?: () => void
  onCancel?: () => void
}

// 动画配置
export interface AnimationConfig extends BaseAnimationConfig {
  element?: HTMLElement
  keyframes?: Keyframe[]
  type?: 'css' | 'js'
  properties?: Record<string, any>
}

// 过渡配置
export interface TransitionConfig {
  property?: string
  duration?: number
  delay?: number
  easing?: string
  autoplay?: boolean
  onStart?: () => void
  onComplete?: () => void
  onCancel?: () => void
  from?: Record<string, string | number>
  to?: Record<string, string | number>
}

// 过渡状态
export type TransitionState = 'idle' | 'running' | 'paused' | 'finished' | 'cancelled'

// 动画状态
export type AnimationState = 'idle' | 'running' | 'paused' | 'finished' | 'cancelled'

// 序列状态
export type SequenceState = 'idle' | 'playing' | 'paused' | 'finished' | 'stopped'

// 动画步骤
export interface AnimationStep {
  type: 'animation' | 'transition' | 'delay'
  element?: HTMLElement
  target?: HTMLElement
  keyframes?: Keyframe[]
  options?: KeyframeAnimationOptions
  config?: any
  duration?: number
}

// 序列配置
export interface SequenceConfig {
  animations?: any[]
  transitions?: any[]
  delays?: number[]
  loop?: boolean
  reverse?: boolean
}

// 动画实例
export interface AnimationInstance {
  id: string
  element: HTMLElement
  animation: Animation
  state: AnimationState
  config: AnimationConfig
  startTime?: number
  endTime?: number
}
// 动画事件类型
export type AnimationEventType = 'start' | 'finish' | 'cancel' | 'pause' | 'resume'

// 动画事件处理器
export type AnimationEventHandler = (event: AnimationEvent) => void

// 关键帧类型
export interface Keyframe {
  [property: string]: string | number
  offset?: number
}

// CSS属性值类型
export type CSSValue = string | number

// 变换属性
export interface TransformProperties {
  translateX?: CSSValue
  translateY?: CSSValue
  translateZ?: CSSValue
  scaleX?: CSSValue
  scaleY?: CSSValue
  scaleZ?: CSSValue
  rotateX?: CSSValue
  rotateY?: CSSValue
  rotateZ?: CSSValue
  skewX?: CSSValue
  skewY?: CSSValue
}

// 样式属性
export interface StyleProperties {
  opacity?: CSSValue
  backgroundColor?: string
  color?: string
  width?: CSSValue
  height?: CSSValue
  left?: CSSValue
  top?: CSSValue
  right?: CSSValue
  bottom?: CSSValue
  margin?: CSSValue
  padding?: CSSValue
  borderRadius?: CSSValue
  boxShadow?: string
  filter?: string
  [key: string]: CSSValue | undefined
}

// 完整的动画属性
export interface AnimationProperties extends StyleProperties, TransformProperties {}

// 缓动函数类型
export type EasingFunction = (t: number) => number

// 预定义缓动函数名称
export type EasingName = 
  | 'linear'
  | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'
  | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart'
  | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint'
  | 'easeInSine' | 'easeOutSine' | 'easeInOutSine'
  | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo'
  | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc'
  | 'easeInBack' | 'easeOutBack' | 'easeInOutBack'
  | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic'
  | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce'

// 动画预设名称
export type PresetName = 
  | 'fadeIn' | 'fadeOut'
  | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'slideInDown'
  | 'scaleIn' | 'scaleOut'
  | 'rotateIn' | 'rotateOut'
  | 'bounceIn' | 'shake' | 'pulse'

// 动画预设配置
export interface AnimationPreset {
  keyframes: Keyframe[]
  options: Partial<KeyframeAnimationOptions>
}

// 序列步骤类型
export type SequenceStepType = 'animation' | 'transition' | 'delay' | 'callback'

// 序列步骤
export interface SequenceStep {
  type: SequenceStepType
  element?: HTMLElement
  keyframes?: Keyframe[]
  properties?: Record<string, string>
  options?: any
  duration?: number
  callback?: () => void | Promise<void>
}

// 时间轴项目
export interface TimelineItem {
  time: number
  action: () => void | Promise<void>
}

// 弹簧动画配置
export interface SpringConfig {
  tension?: number
  friction?: number
  mass?: number
  velocity?: number
  precision?: number
}

// 手势配置
export interface GestureConfig {
  drag?: boolean
  pinch?: boolean
  rotate?: boolean
  threshold?: number
  preventDefault?: boolean
}

// JS动画关键帧
export interface JSKeyframe {
  [property: string]: string | number
  offset?: number
}

// JS动画配置
export interface JSAnimationConfig extends BaseAnimationConfig {
  keyframes: JSKeyframe[]
  element?: HTMLElement
}

// 交错动画配置
export interface StaggerConfig {
  delay?: number
  stagger?: number
  from?: 'start' | 'end' | 'center' | number
  ease?: EasingName | EasingFunction
}

// 滚动触发配置
export interface ScrollTriggerConfig {
  trigger?: HTMLElement | string
  start?: string | number
  end?: string | number
  scrub?: boolean | number
  pin?: boolean
  snap?: boolean | number | number[]
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

// 性能监控数据
export interface PerformanceData {
  fps: number
  frameTime: number
  memoryUsage?: number
  animationCount: number
  droppedFrames: number
}

// 动画管理器配置
export interface AnimationManagerConfig extends BaseAnimationConfig {
  maxConcurrentAnimations?: number
  enablePerformanceMonitoring?: boolean
  fallbackToCSS?: boolean
}

// 过渡管理器配置
export interface TransitionManagerConfig {
  defaultDuration?: number
  defaultEasing?: string
  enableHardwareAcceleration?: boolean
}

// CSS动画控制器配置
export interface CSSAnimationControllerConfig {
  prefix?: string
  enableVendorPrefixes?: boolean
  cleanupOnComplete?: boolean
}

// JS动画控制器配置
export interface JSAnimationControllerConfig extends BaseAnimationConfig {
  enableWebAnimationsAPI?: boolean
  fallbackToRAF?: boolean
}

// 序列管理器配置
export interface SequenceManagerConfig {
  autoCleanup?: boolean
  enablePause?: boolean
  enableReverse?: boolean
}

// 动画插件接口
export interface AnimationPlugin {
  name: string
  version: string
  install: (manager: any) => void
  uninstall?: (manager: any) => void
}

// 动画中间件
export type AnimationMiddleware = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: any,
  next: () => void
) => void

// 动画过滤器
export type AnimationFilter = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: any
) => boolean

// 动画变换器
export type AnimationTransformer = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: any
) => { keyframes: Keyframe[]; options: any }

// 颜色类型
export interface Color {
  r: number
  g: number
  b: number
  a: number
}

// 向量类型
export interface Vector2D {
  x: number
  y: number
}

export interface Vector3D extends Vector2D {
  z: number
}

// 矩阵类型
export type Matrix2D = [number, number, number, number, number, number]
export type Matrix3D = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
]

// 路径类型
export interface PathPoint {
  x: number
  y: number
  type?: 'move' | 'line' | 'curve'
  controlPoint1?: Vector2D
  controlPoint2?: Vector2D
}

export type AnimationPath = PathPoint[]

// 粒子系统配置
export interface ParticleConfig {
  count: number
  position: Vector2D
  velocity: Vector2D
  acceleration: Vector2D
  life: number
  size: number
  color: Color
  opacity: number
}

// 物理配置
export interface PhysicsConfig {
  gravity: Vector2D
  friction: number
  bounce: number
  mass: number
}

// 约束类型
export type ConstraintType = 'position' | 'velocity' | 'acceleration' | 'rotation'

// 约束配置
export interface ConstraintConfig {
  type: ConstraintType
  min?: number
  max?: number
  target?: number
  strength?: number
}

// 动画组配置
export interface AnimationGroupConfig {
  name: string
  animations: Animation[]
  playMode?: 'parallel' | 'sequence'
  loop?: boolean
  autoplay?: boolean
}

// 动画层配置
export interface AnimationLayerConfig {
  name: string
  zIndex: number
  opacity: number
  blendMode?: string
  visible: boolean
}

// 动画场景配置
export interface AnimationSceneConfig {
  name: string
  layers: AnimationLayerConfig[]
  duration: number
  fps: number
  width: number
  height: number
}

// 导出工具类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 事件发射器类型
export interface EventEmitter {
  on(event: string, handler: (...args: any[]) => void): void
  off(event: string, handler: (...args: any[]) => void): void
  emit(event: string, ...args: any[]): void
  once(event: string, handler: (...args: any[]) => void): void
}

// 可销毁接口
export interface Disposable {
  dispose(): void
}

// 可暂停接口
export interface Pausable {
  pause(): void
  resume(): void
  isPaused(): boolean
}

// 可播放接口
export interface Playable {
  play(): void
  stop(): void
  isPlaying(): boolean
}

// 可控制接口
export interface Controllable extends Playable, Pausable {
  seek(time: number): void
  getTime(): number
  getDuration(): number
  getProgress(): number
  setProgress(progress: number): void
}

// Vue相关类型
export interface VueAnimationOptions {
  immediate?: boolean
  manual?: boolean
  resetOnStop?: boolean
}

export interface VueTransitionHooks {
  onBeforeEnter?: (el: Element) => void
  onEnter?: (el: Element, done: () => void) => void
  onAfterEnter?: (el: Element) => void
  onEnterCancelled?: (el: Element) => void
  onBeforeLeave?: (el: Element) => void
  onLeave?: (el: Element, done: () => void) => void
  onAfterLeave?: (el: Element) => void
  onLeaveCancelled?: (el: Element) => void
}

// React相关类型（为将来扩展准备）
export interface ReactAnimationProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

// 全局配置
export interface GlobalConfig {
  defaultDuration: number
  defaultEasing: EasingName
  enablePerformanceMonitoring: boolean
  maxConcurrentAnimations: number
  enableDebugMode: boolean
  logLevel: 'none' | 'error' | 'warn' | 'info' | 'debug'
}

// 调试信息
export interface DebugInfo {
  animationId: string
  element: HTMLElement
  startTime: number
  duration: number
  progress: number
  state: AnimationState
  keyframes: Keyframe[]
  options: any
}

// 错误类型
export class AnimationError extends Error {
  constructor(
    message: string,
    public code: string,
    public element?: HTMLElement,
    public animation?: Animation
  ) {
    super(message)
    this.name = 'AnimationError'
  }
}

// 警告类型
export interface AnimationWarning {
  message: string
  code: string
  element?: HTMLElement
  animation?: Animation
}

// 统计信息
export interface AnimationStats {
  totalAnimations: number
  activeAnimations: number
  completedAnimations: number
  cancelledAnimations: number
  averageFPS: number
  memoryUsage: number
  performanceScore: number
}

// 导出所有类型
export default {
  BaseAnimationConfig,
  AnimationState,
  AnimationEventType,
  AnimationEventHandler,
  Keyframe,
  CSSValue,
  TransformProperties,
  StyleProperties,
  AnimationProperties,
  EasingFunction,
  EasingName,
  PresetName,
  AnimationPreset,
  SequenceStepType,
  SequenceStep,
  TimelineItem,
  SpringConfig,
  StaggerConfig,
  ScrollTriggerConfig,
  PerformanceData,
  AnimationManagerConfig,
  TransitionManagerConfig,
  CSSAnimationControllerConfig,
  JSAnimationControllerConfig,
  SequenceManagerConfig,
  AnimationPlugin,
  AnimationMiddleware,
  AnimationFilter,
  AnimationTransformer,
  Color,
  Vector2D,
  Vector3D,
  Matrix2D,
  Matrix3D,
  PathPoint,
  AnimationPath,
  ParticleConfig,
  PhysicsConfig,
  ConstraintType,
  ConstraintConfig,
  AnimationGroupConfig,
  AnimationLayerConfig,
  AnimationSceneConfig,
  DeepPartial,
  RequiredKeys,
  OptionalKeys,
  EventEmitter,
  Disposable,
  Pausable,
  Playable,
  Controllable,
  VueAnimationOptions,
  VueTransitionHooks,
  ReactAnimationProps,
  GlobalConfig,
  DebugInfo,
  AnimationError,
  AnimationWarning,
  AnimationStats
}