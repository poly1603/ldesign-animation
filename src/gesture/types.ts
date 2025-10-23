/**
 * 手势类型定义
 */

/**
 * 拖拽配置
 */
export interface DragConfig {
  // 拖拽轴向
  axis?: 'x' | 'y' | 'both'
  // 边界限制
  bounds?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  } | HTMLElement
  // 是否启用惯性
  inertia?: boolean
  // 惯性摩擦力
  inertiaFriction?: number
  // 回调
  onDragStart?: (e: PointerEvent) => void
  onDrag?: (e: PointerEvent, delta: { x: number; y: number }) => void
  onDragEnd?: (e: PointerEvent) => void
}

/**
 * 手势类型
 */
export type GestureType = 'hover' | 'tap' | 'press' | 'swipe' | 'pinch'

/**
 * 手势配置
 */
export interface GestureConfig {
  // 长按时间阈值（ms）
  pressDelay?: number
  // 滑动距离阈值（px）
  swipeThreshold?: number
  // 捏合缩放阈值
  pinchThreshold?: number
}

/**
 * 手势事件
 */
export interface GestureEvent {
  type: GestureType
  target: Element
  originalEvent: Event
  delta?: { x: number; y: number }
  distance?: number
  scale?: number
}






