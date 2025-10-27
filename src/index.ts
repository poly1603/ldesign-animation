/**
 * @ldesign/animation - 完整动画库
 * 
 * 包含：
 * - 核心动画引擎（基于 RAF）
 * - CSS 预设动画（12+）
 * - Timeline 时间轴
 * - ScrollTrigger 滚动触发
 * - 物理动画（Spring/Inertia）
 * - 手势动画（Drag/Gesture）
 * - SVG 动画
 * - 过渡效果（Page/FLIP）
 * - 高级效果（Parallax/Particle/Text）
 */

// ============ 核心 API ============
export * from './core/types'
export {
  Animation,
  createAnimation,
  to,
  from,
  fromTo,
  keyframes,
  animate,
} from './core/animation'
export { engine } from './core/engine'

// ============ Timeline 时间轴 ============
export { Timeline, createTimeline } from './timeline/timeline'
export * from './timeline/types'

// ============ CSS 预设动画 ============
export * from './presets/css'

// ============ 滚动动画 ============
export {
  ScrollTrigger,
  createScrollTrigger,
  scrollAnimate,
} from './scroll/scroll-trigger'
export { IntersectionManager, createIntersectionManager } from './scroll/intersection'
export * from './scroll/types'
export * from './presets/scroll'

// ============ 物理动画 ============
export { SpringAnimation, spring, springPresets } from './physics/spring'
export { InertiaAnimation, inertia } from './physics/inertia'
export { PhysicsEngine, createPhysicsEngine } from './physics/engine'
export * from './physics/types'
export * from './presets/physics'

// ============ 手势动画 ============
export { Draggable, draggable } from './gesture/drag'
export { GestureRecognizer, gesture } from './gesture/recognizer'
export * from './gesture/types'

// ============ SVG 动画 ============
export { drawSVG, motionPath } from './svg/path'
export { morphSVG } from './svg/morph'
export * from './svg/types'

// ============ 过渡效果 ============
export { PageTransition, createPageTransition } from './transition/page'
export { FLIPAnimation, createFLIP, animateList } from './transition/list'
export * from './transition/types'

// ============ 高级效果 ============
export { Parallax, parallax } from './effects/parallax'
export { ParticleSystem, createParticleSystem } from './effects/particle'
export { typewriter, animateChars, splitText } from './effects/text'
export * from './effects/transform3d'
export * from './effects/filters'
export * from './effects/path'

// ============ 工具函数 ============
export * from './utils/units'
export * from './utils/color'
export * from './utils/transform'
export * from './utils/gpu-acceleration'

// ============ 性能优化 ============
export { PerformanceMonitor, BatchDOMUpdater, batchUpdater, throttle, debounce, rafThrottle } from './core/performance'
export { LRUCache, ComputeCache, computeCache } from './core/cache'
export { ObjectPool, createObjectPool } from './core/object-pool'
export { WillChangeManager, willChangeManager, withWillChange } from './core/will-change'
export { visibilityManager } from './core/visibility'

// ============ 内存与性能监控 ============
export { MemoryMonitor, memoryMonitor, type MemoryStats, type MemoryMonitorConfig } from './core/memory-monitor'
export { PerformanceAdaptive, performanceAdaptive, PerformanceTier, type DeviceInfo, type PerformanceConfig } from './core/adaptive'

// ============ 错误处理 ============
export {
  AnimationError,
  TargetNotFoundError,
  InvalidPropertyError,
  InvalidConfigError,
  PerformanceWarning,
  MemoryError,
  TimelineError,
  ErrorHandler,
  devAssert,
  devWarn,
} from './core/errors'

// ============ 高级功能 ============
export {
  AnimationSequence,
  createSequence,
  sequence,
  parallel,
  stagger,
  AnimationDebugger,
  createDebugger,
  debugger,
  type DebuggerConfig,
} from './advanced'





