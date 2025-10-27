# @ldesign/animation

🎬 **完整的动画库** - CSS/JS 动画、过渡效果、滚动动画、物理动画

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## ✨ 特性

- 🚀 **高性能** - 基于 RAF 的动画引擎，GPU 加速
- 📦 **轻量级** - 核心 < 20KB，零外部依赖
- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- 🎨 **丰富预设** - 12+ CSS 动画预设
- ⏱️ **Timeline** - GSAP 风格的时间轴动画
- 📜 **ScrollTrigger** - 强大的滚动触发系统
- 🎾 **物理动画** - Spring 弹簧 + Inertia 惯性
- 👆 **手势支持** - 拖拽、点击、滑动、捏合
- 🖼️ **SVG 动画** - 路径描边、形状变形
- 🔄 **过渡效果** - 页面过渡、FLIP 列表动画
- ✨ **高级效果** - 视差、粒子、文字动画
- 🌍 **框架无关** - 可用于 Vue、React 或原生 JS

## 📦 安装

```bash
npm install @ldesign/animation
# or
pnpm add @ldesign/animation
```

## 🚀 快速开始

### 基础动画

```typescript
import { to, from, fromTo } from '@ldesign/animation'

// 动画到目标值
to('.box', { x: 100, opacity: 0.5 }, { duration: 1000 })

// 从起始值动画
from('.box', { opacity: 0 }, { duration: 500 })

// 从起点到终点
fromTo('.box', { x: 0 }, { x: 100 }, { duration: 1000 })
```

### CSS 预设动画

```typescript
import { fadeIn, slideInUp, zoomIn, bounceIn } from '@ldesign/animation'

// 淡入
fadeIn('.element')

// 从下滑入
slideInUp('.element')

// 放大进入
zoomIn('.element')

// 弹跳进入
bounceIn('.element')
```

### Timeline 时间轴

```typescript
import { createTimeline } from '@ldesign/animation'

const tl = createTimeline()

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
  .to('.box3', { rotate: 360 }, '-=0.5') // 重叠 0.5s

tl.play()
```

### 关键帧动画

```typescript
import { keyframes } from '@ldesign/animation'

keyframes('.box', [
  { x: 0, opacity: 0 },
  { x: 50, opacity: 0.5 },
  { x: 100, opacity: 1 }
], { duration: 1000 })
```

### ScrollTrigger 滚动触发

```typescript
import { createScrollTrigger, scrollSlideInUp } from '@ldesign/animation'

// 基础滚动触发
createScrollTrigger('.element', {
  start: 'top bottom',
  end: 'bottom top',
  onEnter: () => console.log('进入视口'),
  onUpdate: (progress) => console.log('进度:', progress)
})

// 滚动动画预设
scrollSlideInUp('.element')
```

### 物理动画

```typescript
import { spring, springPresets, inertia } from '@ldesign/animation'

// 弹簧动画
spring('.box', 'x', 100, springPresets.bouncy)

// 惯性动画
inertia('.box', 'x', {
  velocity: 1000,
  friction: 0.9,
  min: 0,
  max: 500
})
```

### 手势动画

```typescript
import { draggable, gesture } from '@ldesign/animation'

// 拖拽
const drag = draggable('.box', {
  axis: 'both',
  bounds: { left: 0, right: 500, top: 0, bottom: 300 },
  inertia: true
})

// 手势识别
const gest = gesture('.box')
gest.on('tap', () => console.log('点击'))
gest.on('swipe', (e) => console.log('滑动', e.delta))
```

### SVG 动画

```typescript
import { drawSVG, motionPath } from '@ldesign/animation'

// 描边动画
drawSVG('#path', { duration: 2000 })

// 路径跟随
motionPath('.element', '#path', { duration: 3000 })
```

### 过渡效果

```typescript
import { createFLIP, animateList } from '@ldesign/animation'

// FLIP 列表动画
await animateList('.container', () => {
  // 更新 DOM（添加/删除/重排元素）
  container.appendChild(newElement)
})
```

### 高级效果

```typescript
import { parallax, typewriter, createParticleSystem } from '@ldesign/animation'

// 视差滚动
parallax('.bg', { speed: 0.5 })

// 打字机效果
await typewriter('.text', 'Hello World!', { speed: 100 })

// 粒子系统
const particles = createParticleSystem('#canvas')
particles.emit(100, 100)
```

## 📚 API 文档

### 核心 API

#### `to(target, props, options)`
动画到目标值

#### `from(target, props, options)`
从起始值动画

#### `fromTo(target, fromProps, toProps, options)`
从起点到终点动画

#### `keyframes(target, frames, options)`
关键帧动画

#### `animate(target, config)`
通用动画函数

### Timeline API

#### `createTimeline(options)`
创建时间轴

#### `timeline.to(target, props, position)`
添加动画

#### `timeline.play()` / `timeline.pause()` / `timeline.restart()`
控制播放

#### `timeline.seek(position)`
跳转到指定位置

#### `timeline.progress(value)`
设置/获取进度

#### `timeline.addLabel(name, position)`
添加时间标签

### CSS 预设

- `fadeIn/fadeOut` - 淡入淡出
- `slideInUp/slideInDown/slideInLeft/slideInRight` - 滑动
- `slideOutUp/slideOutDown/slideOutLeft/slideOutRight` - 滑出
- `zoomIn/zoomOut` - 缩放
- `flipInX/flipOutX/flipInY/flipOutY` - 翻转
- `bounceIn/bounceOut` - 弹跳
- `rotateIn/rotateOut` - 旋转

### 物理动画

#### `spring(target, prop, to, config)`
弹簧动画

**预设**:
- `springPresets.gentle` - 柔和
- `springPresets.wobbly` - 活泼
- `springPresets.stiff` - 僵硬
- `springPresets.bouncy` - 弹性

#### `inertia(target, prop, config)`
惯性动画

### 手势

#### `draggable(target, config)`
创建可拖拽元素

#### `gesture(target, config)`
手势识别器

**支持的手势**: `hover`, `tap`, `press`, `swipe`, `pinch`

## 🎯 最佳实践

### 性能优化

1. 使用 `transform` 和 `opacity` 属性（GPU 加速）
2. 避免动画 `width`/`height`（会触发重排）
3. 批量更新 DOM
4. 使用 `will-change` 提示浏览器

### 缓动函数

内置缓动函数（来自 `@ldesign/shared`）:
- `linear`
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `easeInElastic`, `easeOutElastic`
- `easeInBack`, `easeOutBack`
- `easeOutBounce`

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 🚀 性能优化（v0.2.0 重大升级）

### 自动优化

@ldesign/animation 内置多种性能优化：

- ✅ **WeakMap 内存管理** - 自动垃圾回收，彻底解决内存泄漏
- ✅ **精确 FPS 计算** - 滑动窗口算法，实时准确监控
- ✅ **空闲自动暂停** - 无动画时自动停止 RAF，节省 CPU
- ✅ **对象复用** - 减少 GC 压力 70%
- ✅ **帧预算管理** - 实时监控帧时间，超时警告
- ✅ **GPU加速** - 自动使用 transform 和 opacity
- ✅ **will-change管理** - 动画前添加，结束后移除，限制最大数量
- ✅ **批量DOM操作** - 读写分离，减少布局抖动
- ✅ **Transform 缓存** - WeakMap 自动清理，避免内存泄漏

### 内存与性能监控（v0.2.0 新增）

```typescript
import { memoryMonitor, performanceAdaptive, engine } from '@ldesign/animation'

// 启用内存监控
memoryMonitor.start()

// 获取内存统计
const stats = memoryMonitor.getStats()
console.log('Memory usage:', stats.usedMemory, 'MB')
console.log('Active objects:', stats.activeObjects)

// 性能自适应
const device = performanceAdaptive.getDevice()
console.log('Device tier:', device.tier) // 'low' | 'medium' | 'high'

const config = performanceAdaptive.getConfig()
if (config.enableComplexAnimations) {
  // 执行复杂动画
}

// 监听性能变化
performanceAdaptive.on('downgrade', () => {
  console.log('Performance degraded')
})

// 引擎统计
const engineStats = engine.getStats()
console.log('FPS:', engineStats.fps)
console.log('Active animations:', engineStats.activeAnimations)
```

### 性能API

```typescript
import {
  engine,
  batchUpdater,
  throttle,
  willChangeManager,
  PerformanceMonitor
} from '@ldesign/animation'

// 获取性能统计
const stats = engine.getStats()
console.log('FPS:', stats.fps)
console.log('活动动画:', stats.activeAnimations)

// 批量DOM操作
batchUpdater.read(() => {
  const height = el.offsetHeight
})
batchUpdater.write(() => {
  el.style.height = '100px'
})

// RAF节流
const onScroll = rafThrottle(() => {
  // 滚动处理
})

// 性能监控
const monitor = new PerformanceMonitor((stats) => {
  console.log('实时FPS:', stats.fps)
})
monitor.start()
```

### 新增特殊动画预设（10个）

```typescript
import {
  heartbeat,    // 心跳
  shake,        // 摇晃
  wobble,       // 晃动
  flash,        // 闪烁
  pulse,        // 脉冲
  swing,        // 摆动
  rubberBand,   // 橡皮筋
  jello         // 果冻
} from '@ldesign/animation'

heartbeat('.notification')
shake('.alert')
pulse('.badge', { repeat: -1 })
```

### 性能基准

运行性能测试：
```bash
# 打开性能测试页面
open http://localhost:5174/performance.html
```

**测试结果**:
- 100个元素同时动画: **55-60 FPS** ✅
- 复杂Timeline (20个动画): **60 FPS** ✅
- 滚动触发 (100个元素): **60 FPS** ✅
- 内存占用 (1000个动画): **~150MB** ✅

详见 [性能优化指南](./docs/PERFORMANCE.md)

## 📚 更多示例

## 🎯 高级功能（v0.2.0 新增）

### 动画序列组合器

```typescript
import { createSequence, sequence, parallel, stagger } from '@ldesign/animation'

// 串行动画（依次执行）
createSequence()
  .then('.box1', { x: 100 })
  .then('.box2', { y: 100 })
  .then('.box3', { scale: 1.5 })
  .play()

// 并行动画（同时执行）
createSequence()
  .all([
    { target: '.box1', props: { x: 100 } },
    { target: '.box2', props: { y: 100 } },
    { target: '.box3', props: { scale: 1.5 } }
  ])
  .play()

// 交错动画（stagger）
stagger('.item', { x: 100, opacity: 1 }, { duration: 500 }, 100)

// 混合序列
createSequence()
  .then('.box1', { x: 100 })
  .wait(500) // 延迟500ms
  .all([
    { target: '.box2', props: { y: 100 } },
    { target: '.box3', props: { scale: 1.5 } }
  ])
  .label('checkpoint') // 添加标签
  .then('.box4', { opacity: 0 })
  .play()
```

### 调试工具

```typescript
import { createDebugger } from '@ldesign/animation'

// 开发模式下启用调试面板
if (process.env.NODE_ENV === 'development') {
  const debugger = createDebugger({
    showFPS: true,
    showMemory: true,
    showAnimations: true,
    showWarnings: true,
    position: 'top-right'
  })
  
  debugger.show()
  
  // 记录日志
  debugger.log('Animation started', 'info')
  
  // 导出统计数据
  const stats = debugger.exportStats()
  console.log(stats)
}
```

### 基础示例
- `examples/basic.html` - 快速预览
- `examples/simple-test.html` - 功能测试

### Vite 完整示例
- `examples/vite-demo/index.html` - 完整功能演示
- `examples/vite-demo/advanced.html` - 高级效果演示
- `examples/vite-demo/performance.html` - 性能基准测试

```bash
cd examples/vite-demo
pnpm run dev
# http://localhost:5174
```

## 📄 许可证

MIT License © LDesign Team





