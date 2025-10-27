/**
 * @ldesign/animation - 优化的动画库入口
 * 
 * 使用动态导入和代码分割优化包体积
 */

// ============ 核心 API（始终导出）============
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

// ============ 性能监控（核心功能）============
export { performanceMonitor } from './core/performance-monitor'
export { memoryMonitor } from './core/memory-monitor'
export { poolManager } from './core/object-pool-system'

// ============ 基础工具（常用）============
export { parseColor, interpolateColor } from './utils/color'
export { parseTransform, buildTransform } from './utils/transform'
export { parseUnit, combineUnit } from './utils/units'
export { enableGPUAcceleration, isGPUAccelerated } from './utils/gpu-acceleration'

// ============ 错误处理（基础）============
export {
  AnimationError,
  TargetNotFoundError,
  InvalidPropertyError,
  ErrorHandler,
} from './core/errors'

// ============ 动态导入模块 ============

/**
 * 加载 Timeline 模块
 */
export async function loadTimeline() {
  const module = await import('./timeline/timeline')
  return {
    Timeline: module.Timeline,
    createTimeline: module.createTimeline,
  }
}

/**
 * 加载 CSS 预设动画
 */
export async function loadCSSPresets() {
  return import('./presets/css')
}

/**
 * 加载滚动动画模块
 */
export async function loadScrollFeatures() {
  const [scrollTrigger, intersection, presets] = await Promise.all([
    import('./scroll/scroll-trigger'),
    import('./scroll/intersection'),
    import('./presets/scroll'),
  ])
  return {
    ScrollTrigger: scrollTrigger.ScrollTrigger,
    createScrollTrigger: scrollTrigger.createScrollTrigger,
    scrollAnimate: scrollTrigger.scrollAnimate,
    IntersectionManager: intersection.IntersectionManager,
    createIntersectionManager: intersection.createIntersectionManager,
    presets,
  }
}

/**
 * 加载物理动画模块
 */
export async function loadPhysics() {
  const [spring, inertia, engine, presets] = await Promise.all([
    import('./physics/spring'),
    import('./physics/inertia'),
    import('./physics/engine'),
    import('./presets/physics'),
  ])
  return {
    SpringAnimation: spring.SpringAnimation,
    spring: spring.spring,
    springPresets: spring.springPresets,
    InertiaAnimation: inertia.InertiaAnimation,
    inertia: inertia.inertia,
    PhysicsEngine: engine.PhysicsEngine,
    createPhysicsEngine: engine.createPhysicsEngine,
    presets,
  }
}

/**
 * 加载手势模块
 */
export async function loadGestures() {
  const [drag, recognizer] = await Promise.all([
    import('./gesture/drag'),
    import('./gesture/recognizer'),
  ])
  return {
    Draggable: drag.Draggable,
    draggable: drag.draggable,
    GestureRecognizer: recognizer.GestureRecognizer,
    gesture: recognizer.gesture,
  }
}

/**
 * 加载 SVG 动画模块
 */
export async function loadSVG() {
  const [path, morph] = await Promise.all([
    import('./svg/path'),
    import('./svg/morph'),
  ])
  return {
    drawSVG: path.drawSVG,
    motionPath: path.motionPath,
    morphSVG: morph.morphSVG,
  }
}

/**
 * 加载过渡效果模块
 */
export async function loadTransitions() {
  const [page, list] = await Promise.all([
    import('./transition/page'),
    import('./transition/list'),
  ])
  return {
    PageTransition: page.PageTransition,
    createPageTransition: page.createPageTransition,
    FLIPAnimation: list.FLIPAnimation,
    createFLIP: list.createFLIP,
    animateList: list.animateList,
  }
}

/**
 * 加载高级效果模块
 */
export async function loadEffects() {
  const [parallax, particle, text, transform3d, filters, path] = await Promise.all([
    import('./effects/parallax'),
    import('./effects/particle'),
    import('./effects/text'),
    import('./effects/transform3d'),
    import('./effects/filters'),
    import('./effects/path'),
  ])
  return {
    Parallax: parallax.Parallax,
    parallax: parallax.parallax,
    ParticleSystem: particle.ParticleSystem,
    createParticleSystem: particle.createParticleSystem,
    typewriter: text.typewriter,
    animateChars: text.animateChars,
    splitText: text.splitText,
    transform3d,
    filters,
    path,
  }
}

/**
 * 加载高级功能模块
 */
export async function loadAdvanced() {
  return import('./advanced')
}

/**
 * 加载性能优化工具
 */
export async function loadPerformanceTools() {
  const [performance, cache, objectPool, willChange, visibility, adaptive] = await Promise.all([
    import('./core/performance'),
    import('./core/cache'),
    import('./core/object-pool'),
    import('./core/will-change'),
    import('./core/visibility'),
    import('./core/adaptive'),
  ])
  return {
    PerformanceMonitor: performance.PerformanceMonitor,
    BatchDOMUpdater: performance.BatchDOMUpdater,
    batchUpdater: performance.batchUpdater,
    throttle: performance.throttle,
    debounce: performance.debounce,
    rafThrottle: performance.rafThrottle,
    LRUCache: cache.LRUCache,
    ComputeCache: cache.ComputeCache,
    computeCache: cache.computeCache,
    ObjectPool: objectPool.ObjectPool,
    createObjectPool: objectPool.createObjectPool,
    WillChangeManager: willChange.WillChangeManager,
    willChangeManager: willChange.willChangeManager,
    withWillChange: willChange.withWillChange,
    visibilityManager: visibility.visibilityManager,
    PerformanceAdaptive: adaptive.PerformanceAdaptive,
    performanceAdaptive: adaptive.performanceAdaptive,
  }
}

// ============ 预加载功能 ============

/**
 * 预加载指定模块
 */
export function preload(modules: Array<'timeline' | 'css' | 'scroll' | 'physics' | 'gesture' | 'svg' | 'transition' | 'effects' | 'advanced' | 'performance'>): void {
  modules.forEach(module => {
    switch (module) {
      case 'timeline':
        loadTimeline()
        break
      case 'css':
        loadCSSPresets()
        break
      case 'scroll':
        loadScrollFeatures()
        break
      case 'physics':
        loadPhysics()
        break
      case 'gesture':
        loadGestures()
        break
      case 'svg':
        loadSVG()
        break
      case 'transition':
        loadTransitions()
        break
      case 'effects':
        loadEffects()
        break
      case 'advanced':
        loadAdvanced()
        break
      case 'performance':
        loadPerformanceTools()
        break
    }
  })
}

// ============ 默认导出 ============

const LDesignAnimation = {
  // 核心
  Animation,
  createAnimation,
  to,
  from,
  fromTo,
  keyframes,
  animate,
  engine,

  // 性能监控
  performanceMonitor,
  memoryMonitor,
  poolManager,

  // 动态加载
  load: {
    timeline: loadTimeline,
    cssPresets: loadCSSPresets,
    scroll: loadScrollFeatures,
    physics: loadPhysics,
    gestures: loadGestures,
    svg: loadSVG,
    transitions: loadTransitions,
    effects: loadEffects,
    advanced: loadAdvanced,
    performance: loadPerformanceTools,
  },

  // 预加载
  preload,
}

export default LDesignAnimation
