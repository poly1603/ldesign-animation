/**
 * 核心类型定义
 * @packageDocumentation
 */

/**
 * 动画目标
 * 可以是 CSS 选择器、DOM 元素、或元素数组
 */
export type AnimationTarget = string | Element | Element[] | NodeList

/**
 * 缓动函数类型
 */
export type EasingFunction = (t: number) => number

/**
 * 缓动函数名称
 */
export type EasingName =
  | 'linear'
  | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'
  | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart'
  | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint'
  | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo'
  | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc'
  | 'easeInBack' | 'easeOutBack' | 'easeInOutBack'
  | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic'
  | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce'

/**
 * 动画方向
 */
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

/**
 * 动画填充模式
 */
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both'

/**
 * 可动画的 CSS 属性值
 */
export type AnimatableValue = number | string | [number, number] | [string, string]

/**
 * 动画属性配置
 */
export interface AnimationProps {
  // Transform 属性
  translateX?: AnimatableValue
  translateY?: AnimatableValue
  translateZ?: AnimatableValue
  rotate?: AnimatableValue
  rotateX?: AnimatableValue
  rotateY?: AnimatableValue
  rotateZ?: AnimatableValue
  scale?: AnimatableValue
  scaleX?: AnimatableValue
  scaleY?: AnimatableValue
  scaleZ?: AnimatableValue
  skewX?: AnimatableValue
  skewY?: AnimatableValue

  // 基础属性
  opacity?: AnimatableValue
  width?: AnimatableValue
  height?: AnimatableValue

  // 颜色属性
  backgroundColor?: AnimatableValue
  color?: AnimatableValue
  borderColor?: AnimatableValue

  // 位置属性
  top?: AnimatableValue
  left?: AnimatableValue
  right?: AnimatableValue
  bottom?: AnimatableValue

  // SVG 属性
  strokeDashoffset?: AnimatableValue
  strokeDasharray?: AnimatableValue

  // 自定义属性
  [key: string]: AnimatableValue | undefined
}

/**
 * 动画配置选项
 */
export interface AnimationOptions extends AnimationProps {
  /** 动画目标元素 */
  targets?: AnimationTarget

  /** 动画时长（毫秒） */
  duration?: number

  /** 延迟时间（毫秒） */
  delay?: number

  /** 缓动函数 */
  easing?: EasingName | EasingFunction | string

  /** 循环次数（true 为无限循环） */
  loop?: number | boolean

  /** 动画方向 */
  direction?: AnimationDirection

  /** 填充模式 */
  fill?: AnimationFillMode

  /** 是否自动播放 */
  autoplay?: boolean

  /** 动画开始回调 */
  onStart?: () => void

  /** 动画更新回调 */
  onUpdate?: (progress: number) => void

  /** 动画完成回调 */
  onComplete?: () => void

  /** 动画循环回调 */
  onLoop?: () => void
}

/**
 * 动画实例接口
 */
export interface Animation {
  /** 播放动画 */
  play(): this

  /** 暂停动画 */
  pause(): this

  /** 重新开始 */
  restart(): this

  /** 反向播放 */
  reverse(): this

  /** 跳转到指定时间 */
  seek(time: number): this

  /** 跳转到指定进度 (0-1) */
  seekProgress(progress: number): this

  /** 取消动画 */
  cancel(): void

  /** 完成动画 */
  finish(): void

  /** 当前是否正在播放 */
  readonly playing: boolean

  /** 当前进度 (0-1) */
  readonly progress: number

  /** 当前时间 */
  readonly currentTime: number

  /** 总时长 */
  readonly duration: number
}

/**
 * 时间轴配置选项
 */
export interface TimelineOptions {
  /** 是否自动播放 */
  autoplay?: boolean

  /** 循环次数 */
  loop?: number | boolean

  /** 动画方向 */
  direction?: AnimationDirection

  /** 时间轴开始回调 */
  onStart?: () => void

  /** 时间轴更新回调 */
  onUpdate?: (progress: number) => void

  /** 时间轴完成回调 */
  onComplete?: () => void
}

/**
 * 物理动画配置（弹簧）
 */
export interface SpringOptions extends Omit<AnimationOptions, 'duration' | 'easing'> {
  /** 刚度 */
  stiffness?: number

  /** 阻尼 */
  damping?: number

  /** 质量 */
  mass?: number

  /** 初始速度 */
  velocity?: number

  /** 精度阈值 */
  precision?: number
}

/**
 * 滚动触发配置
 */
export interface ScrollTriggerOptions {
  /** 触发元素 */
  trigger: string | Element

  /** 开始位置 */
  start?: string | number

  /** 结束位置 */
  end?: string | number

  /** 是否跟随滚动 */
  scrub?: boolean | number

  /** 是否固定元素 */
  pin?: boolean

  /** 标记显示（调试用） */
  markers?: boolean

  /** 进入视口回调 */
  onEnter?: () => void

  /** 离开视口回调 */
  onLeave?: () => void

  /** 向上滚动进入回调 */
  onEnterBack?: () => void

  /** 向上滚动离开回调 */
  onLeaveBack?: () => void

  /** 更新回调 */
  onUpdate?: (progress: number) => void

  /** 切换回调 */
  onToggle?: (isActive: boolean) => void
}

/**
 * 手势配置
 */
export interface GestureOptions {
  /** 拖拽边界 */
  bounds?: 'parent' | Element | { top?: number; left?: number; right?: number; bottom?: number }

  /** 是否启用惯性 */
  inertia?: boolean

  /** 惯性衰减率 */
  inertiaDecay?: number

  /** 拖拽开始回调 */
  onDragStart?: (event: PointerEvent) => void

  /** 拖拽中回调 */
  onDrag?: (event: PointerEvent) => void

  /** 拖拽结束回调 */
  onDragEnd?: (event: PointerEvent) => void
}

/**
 * SVG 路径动画配置
 */
export interface SVGPathOptions extends AnimationOptions {
  /** 路径元素 */
  path?: string | SVGPathElement

  /** 起始进度 (0-1) */
  start?: number

  /** 结束进度 (0-1) */
  end?: number

  /** 是否反向 */
  reverse?: boolean
}

