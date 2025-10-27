# 性能优化指南

了解如何使用 `@ldesign/animation` 创建高性能的动画。

## 性能基准

`@ldesign/animation` 在各种场景下的性能表现：

| 场景 | 性能 | 内存 |
|------|------|------|
| 100个元素同时动画 | 55-60 FPS | ~50MB |
| 复杂Timeline (20个动画) | 60 FPS | ~30MB |
| 滚动触发 (100个元素) | 60 FPS | ~40MB |
| 1000个弹簧动画 | 50-55 FPS | ~150MB |

## 自动优化

### GPU 加速

使用 `transform` 和 `opacity` 属性自动启用 GPU 加速：

```typescript
import { to } from '@ldesign/animation'

// ✅ GPU 加速（推荐）
to('.box', {
  x: 100,           // transform: translateX()
  y: 50,            // transform: translateY()
  scale: 1.5,       // transform: scale()
  rotate: 45,       // transform: rotate()
  opacity: 0.5      // opacity
})

// ❌ CPU 渲染（避免）
to('.box', {
  width: '200px',   // 触发布局
  height: '100px',  // 触发布局
  top: '50px',      // 触发布局
  left: '100px'     // 触发布局
})
```

### will-change 管理

自动管理 `will-change` 属性：

```typescript
// 动画会自动：
// 1. 开始前添加 will-change
// 2. 结束后移除 will-change
// 3. 限制同时使用的数量

to('.box', { x: 100 })  // 自动管理 will-change
```

手动控制：

```typescript
import { willChangeManager } from '@ldesign/animation'

// 添加提示
willChangeManager.add(element, 'transform')

// 移除提示
willChangeManager.remove(element)

// 批量操作
willChangeManager.addMultiple([el1, el2], 'transform')
```

### 批量 DOM 操作

读写分离，避免布局抖动：

```typescript
import { batchUpdater } from '@ldesign/animation'

// ❌ 布局抖动
element1.style.height = element2.offsetHeight + 'px'  // 写-读-写
element3.style.width = element4.offsetWidth + 'px'

// ✅ 批量操作
batchUpdater.read(() => {
  const height = element2.offsetHeight
  const width = element4.offsetWidth
  
  batchUpdater.write(() => {
    element1.style.height = height + 'px'
    element3.style.width = width + 'px'
  })
})
```

### RAF 节流

防止高频事件过度触发：

```typescript
import { rafThrottle } from '@ldesign/animation'

// ❌ 每次滚动都触发
window.addEventListener('scroll', () => {
  updateAnimation()  // 可能每帧多次触发
})

// ✅ RAF 节流
window.addEventListener('scroll', rafThrottle(() => {
  updateAnimation()  // 最多每帧一次
}))
```

## 内存管理

### WeakMap 缓存

使用 WeakMap 自动管理内存：

```typescript
// 内部使用 WeakMap 存储元素状态
// 元素销毁时自动清理，无需手动管理

const animation = to('.box', { x: 100 })
// 元素移除后，相关数据自动回收
```

### 对象池

复用对象，减少 GC 压力：

```typescript
import { createObjectPool } from '@ldesign/animation'

// 创建对象池
const pool = createObjectPool(() => ({ x: 0, y: 0 }), 100)

// 获取对象
const obj = pool.get()
obj.x = 100
obj.y = 50

// 使用完毕后释放
pool.release(obj)
```

### 缓存系统

缓存计算结果：

```typescript
import { computeCache } from '@ldesign/animation'

// 缓存昂贵的计算
const result = computeCache.get('key', () => {
  return expensiveCalculation()
})

// 清除缓存
computeCache.clear('key')
computeCache.clearAll()
```

## 性能监控

### 实时监控

```typescript
import { PerformanceMonitor } from '@ldesign/animation'

const monitor = new PerformanceMonitor((stats) => {
  console.log('FPS:', stats.fps)
  console.log('帧时间:', stats.frameTime, 'ms')
  console.log('活动动画:', stats.activeAnimations)
})

monitor.start()

// 停止监控
monitor.stop()
```

### 内存监控

```typescript
import { memoryMonitor } from '@ldesign/animation'

// 启动监控
memoryMonitor.start()

// 获取统计
const stats = memoryMonitor.getStats()
console.log('内存使用:', stats.usedMemory, 'MB')
console.log('活动对象:', stats.activeObjects)
console.log('缓存大小:', stats.cacheSize)

// 停止监控
memoryMonitor.stop()
```

### 性能自适应

根据设备性能自动调整：

```typescript
import { performanceAdaptive } from '@ldesign/animation'

// 获取设备信息
const device = performanceAdaptive.getDevice()
console.log('设备等级:', device.tier)  // 'low' | 'medium' | 'high'
console.log('CPU 核心:', device.cpuCores)
console.log('内存:', device.memory, 'GB')

// 获取推荐配置
const config = performanceAdaptive.getConfig()
console.log('启用复杂动画:', config.enableComplexAnimations)
console.log('最大并发:', config.maxConcurrentAnimations)
console.log('使用GPU:', config.useGPU)

// 监听性能变化
performanceAdaptive.on('downgrade', () => {
  console.log('性能降级')
  // 降低动画质量
})

performanceAdaptive.on('upgrade', () => {
  console.log('性能提升')
  // 提高动画质量
})
```

## 调试工具

### 调试面板

开发环境启用调试面板：

```typescript
import { createDebugger } from '@ldesign/animation'

if (process.env.NODE_ENV === 'development') {
  const debugger = createDebugger({
    showFPS: true,           // 显示 FPS
    showMemory: true,        // 显示内存
    showAnimations: true,    // 显示活动动画
    showWarnings: true,      // 显示警告
    position: 'top-right'    // 位置
  })
  
  debugger.show()
  
  // 记录日志
  debugger.log('动画开始', 'info')
  debugger.log('性能警告', 'warning')
  debugger.log('动画错误', 'error')
  
  // 导出统计
  const stats = debugger.exportStats()
  console.log(stats)
  
  // 隐藏面板
  debugger.hide()
}
```

### Timeline 可视化

```typescript
import { createTimeline } from '@ldesign/animation'

const timeline = createTimeline()

timeline
  .to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
  .to('.box3', { rotate: 360 })

// 调试信息
console.log('子动画:', timeline.getChildren())
console.log('标签:', timeline.labels())
console.log('总时长:', timeline.duration())
console.log('当前时间:', timeline.time())
```

## 优化技巧

### 1. 使用 Transform

```typescript
// ✅ GPU 加速
to('.box', { x: 100, y: 50, scale: 1.5 })

// ❌ CPU 渲染
to('.box', { left: '100px', top: '50px', width: '150%' })
```

### 2. 限制并发动画

```typescript
// ❌ 过多同时动画
for (let i = 0; i < 1000; i++) {
  to(`.box-${i}`, { x: 100 })
}

// ✅ 分批处理或使用交错
import { stagger } from '@ldesign/animation'

stagger('.box', { x: 100 }, { duration: 500 }, 50)
```

### 3. 使用 Timeline

```typescript
// ❌ 单独管理多个动画
const anim1 = to('.box1', { x: 100 })
const anim2 = to('.box2', { y: 50 })
const anim3 = to('.box3', { rotate: 360 })

// ✅ 使用 Timeline 统一管理
const tl = createTimeline()
tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
  .to('.box3', { rotate: 360 })
```

### 4. 可见性优化

```typescript
import { visibilityManager } from '@ldesign/animation'

visibilityManager.observe('.animation-box', {
  onVisible: (element) => {
    // 元素可见时才播放动画
    to(element, { x: 100 })
  },
  
  onHidden: (element) => {
    // 元素隐藏时暂停动画
    animation.pause()
  }
})
```

### 5. 滚动优化

```typescript
import { createScrollTrigger, rafThrottle } from '@ldesign/animation'

createScrollTrigger('.box', {
  start: 'top bottom',
  end: 'bottom top',
  
  // 使用 RAF 节流
  onUpdate: rafThrottle((progress) => {
    updateAnimation(progress)
  })
})
```

### 6. 降低精度

```typescript
import { spring } from '@ldesign/animation'

// 降低精度以提前停止
spring('.box', 'x', 100, {
  precision: 0.1  // 默认 0.001
})
```

### 7. 清理动画

```typescript
import { useEffect } from 'react'
import { to } from '@ldesign/animation'

useEffect(() => {
  const animation = to('.box', { x: 100 })
  
  // 组件卸载时清理
  return () => {
    animation.kill()
  }
}, [])
```

## 性能检查清单

### ✅ 推荐做法

- [ ] 使用 `transform` 和 `opacity`
- [ ] 批量 DOM 操作
- [ ] 使用 RAF 节流
- [ ] 及时清理动画
- [ ] 限制并发数量
- [ ] 使用可见性检测
- [ ] 监控性能指标
- [ ] 适配低端设备

### ❌ 避免行为

- [ ] 动画布局属性
- [ ] 过多同时动画
- [ ] 在高频事件中创建动画
- [ ] 忘记清理动画
- [ ] 深层嵌套 Timeline
- [ ] 忽略性能警告
- [ ] 不测试低端设备

## 性能基准测试

### 运行测试

```bash
cd examples/vite-demo
pnpm run dev
# 打开 http://localhost:5174/performance.html
```

### 测试场景

1. **大量元素动画** - 100个元素同时动画
2. **复杂 Timeline** - 20个动画的时间轴
3. **滚动触发** - 100个元素的滚动动画
4. **物理模拟** - 50个弹簧动画
5. **内存压力** - 1000个动画的内存占用

### 性能目标

- **FPS**: 保持 55+ FPS
- **帧时间**: < 16.67ms (60fps)
- **内存**: < 200MB
- **启动时间**: < 100ms

## 调试慢动画

### 1. 检查 FPS

```typescript
import { engine } from '@ldesign/animation'

const stats = engine.getStats()
if (stats.fps < 50) {
  console.warn('FPS 过低:', stats.fps)
}
```

### 2. 检查帧时间

```typescript
import { PerformanceMonitor } from '@ldesign/animation'

const monitor = new PerformanceMonitor((stats) => {
  if (stats.frameTime > 20) {
    console.warn('帧时间过长:', stats.frameTime, 'ms')
  }
})
```

### 3. 检查内存

```typescript
import { memoryMonitor } from '@ldesign/animation'

memoryMonitor.start()

const stats = memoryMonitor.getStats()
if (stats.usedMemory > 200) {
  console.warn('内存占用过高:', stats.usedMemory, 'MB')
}
```

### 4. 分析瓶颈

```typescript
import { createDebugger } from '@ldesign/animation'

const debugger = createDebugger({ showWarnings: true })
debugger.show()

// 查看警告信息
// - 布局抖动
// - 过多并发
// - 内存泄漏
// - GPU 超载
```

## 最佳实践总结

1. **优先使用 GPU 加速属性**
   - `transform` (x, y, scale, rotate)
   - `opacity`

2. **批量操作**
   - 使用 `batchUpdater`
   - 使用 `stagger`

3. **节流控制**
   - 使用 `rafThrottle`
   - 限制并发数量

4. **内存管理**
   - 及时清理动画
   - 使用对象池
   - 启用缓存

5. **性能监控**
   - 监控 FPS
   - 监控内存
   - 性能自适应

6. **调试工具**
   - 使用调试面板
   - 查看性能警告
   - 运行基准测试

## 下一步

- 阅读 [内存管理](/guide/memory)
- 查看 [性能监控](/guide/monitoring)
- 运行 [性能测试](/examples/performance)

