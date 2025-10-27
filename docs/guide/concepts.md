# 核心概念

理解 `@ldesign/animation` 的核心概念将帮助你更好地使用这个库。

## 动画引擎

### RAF 驱动

所有动画都由 `requestAnimationFrame` (RAF) 驱动，确保：
- 与浏览器刷新率同步（60fps）
- 自动暂停隐藏标签页的动画
- 最小化布局抖动

```typescript
import { engine } from '@ldesign/animation'

// 获取引擎统计信息
const stats = engine.getStats()
console.log('FPS:', stats.fps)
console.log('活动动画:', stats.activeAnimations)
```

### 智能调度

引擎会智能管理动画：
- **空闲暂停**: 没有活动动画时自动停止 RAF
- **帧预算**: 监控每帧执行时间，超时警告
- **优先级**: 支持动画优先级排序

## 属性系统

### Transform 属性（推荐）

Transform 属性使用 GPU 加速，性能最佳：

```typescript
to('.box', {
  x: 100,        // translateX(100px)
  y: 50,         // translateY(50px)
  z: 10,         // translateZ(10px)
  scale: 1.5,    // scale(1.5)
  scaleX: 2,     // scaleX(2)
  scaleY: 0.5,   // scaleY(0.5)
  rotate: 45,    // rotate(45deg)
  rotateX: 90,   // rotateX(90deg)
  rotateY: 180,  // rotateY(180deg)
  skewX: 10,     // skewX(10deg)
  skewY: 5       // skewY(5deg)
})
```

### 样式属性

支持任何 CSS 属性：

```typescript
to('.box', {
  opacity: 0.5,
  backgroundColor: '#ff0000',
  width: '200px',
  borderRadius: '10px',
  padding: '20px'
})
```

::: warning 性能提示
避免动画 `width`、`height`、`top`、`left` 等会触发布局的属性。
优先使用 `transform` 和 `opacity`。
:::

### 单位自动处理

支持多种单位格式：

```typescript
to('.box', {
  x: 100,         // 数字 -> px
  x: '50%',       // 百分比
  x: '10rem',     // rem
  x: '5vw',       // viewport
  rotate: 45,     // 角度 -> deg
  rotate: '1rad'  // 弧度
})
```

## 缓动函数

缓动函数控制动画的速度曲线。

### 内置缓动

```typescript
// 线性
{ ease: 'linear' }

// 二次方
{ ease: 'easeInQuad' }
{ ease: 'easeOutQuad' }
{ ease: 'easeInOutQuad' }

// 三次方
{ ease: 'easeInCubic' }
{ ease: 'easeOutCubic' }
{ ease: 'easeInOutCubic' }

// 弹性
{ ease: 'easeInElastic' }
{ ease: 'easeOutElastic' }

// 回弹
{ ease: 'easeInBack' }
{ ease: 'easeOutBack' }

// 弹跳
{ ease: 'easeOutBounce' }
```

### 自定义缓动

传入自定义函数：

```typescript
to('.box', { x: 100 }, {
  ease: (t) => {
    // t 从 0 到 1
    return t * t * t // 三次方缓动
  }
})
```

### 缓动对比

<div class="easing-demo">
  <div class="demo-box" v-for="ease in easings" :key="ease">
    {{ ease }}
  </div>
</div>

## 时间控制

### 持续时间

以毫秒为单位：

```typescript
to('.box', { x: 100 }, {
  duration: 1000  // 1 秒
})
```

### 延迟

延迟动画开始：

```typescript
to('.box', { x: 100 }, {
  delay: 500  // 延迟 0.5 秒
})
```

### 重复

```typescript
to('.box', { x: 100 }, {
  repeat: 2,      // 重复 2 次（总共播放 3 次）
  repeat: -1,     // 无限循环
  yoyo: true      // 往返播放
})
```

## 回调函数

在关键时刻执行代码：

```typescript
to('.box', { x: 100 }, {
  onStart: () => {
    console.log('动画开始')
  },
  
  onUpdate: (tween) => {
    console.log('进度:', tween.progress())
  },
  
  onComplete: () => {
    console.log('动画完成')
  },
  
  onRepeat: () => {
    console.log('重复')
  }
})
```

## 性能优化

### GPU 加速

自动启用 GPU 加速：

```typescript
import { enableGPU } from '@ldesign/animation'

// 为元素启用 GPU 加速
enableGPU('.box')
```

### will-change 管理

自动管理 `will-change` 属性：

```typescript
import { willChangeManager } from '@ldesign/animation'

// 手动控制（通常不需要）
willChangeManager.add(element, 'transform')
willChangeManager.remove(element)
```

动画会自动：
1. 开始前添加 `will-change`
2. 结束后移除 `will-change`
3. 限制同时使用的数量

### 批量操作

批量读写 DOM 避免布局抖动：

```typescript
import { batchUpdater } from '@ldesign/animation'

// 批量读取
batchUpdater.read(() => {
  const height = element1.offsetHeight
  const width = element2.offsetWidth
})

// 批量写入
batchUpdater.write(() => {
  element1.style.height = '100px'
  element2.style.width = '200px'
})
```

## 内存管理

### 自动清理

使用 `WeakMap` 管理对象，自动垃圾回收：

```typescript
// 无需手动清理，元素销毁时自动回收
const animation = to('.box', { x: 100 })
```

### 手动销毁

需要时可以手动销毁：

```typescript
const animation = to('.box', { x: 100 })

// 停止并清理
animation.kill()
```

### 内存监控

监控内存使用：

```typescript
import { memoryMonitor } from '@ldesign/animation'

memoryMonitor.start()

const stats = memoryMonitor.getStats()
console.log('内存使用:', stats.usedMemory, 'MB')
console.log('活动对象:', stats.activeObjects)
```

## 错误处理

### 开发模式警告

开发模式下会显示警告：

```typescript
// 目标不存在
to('.non-existent', { x: 100 })
// Warning: Target not found: .non-existent

// 无效属性
to('.box', { invalidProp: 100 })
// Warning: Invalid property: invalidProp
```

### 自定义错误处理

```typescript
import { ErrorHandler } from '@ldesign/animation'

ErrorHandler.onError = (error) => {
  console.error('动画错误:', error)
}

ErrorHandler.onWarn = (message) => {
  console.warn('动画警告:', message)
}
```

## 最佳实践

### ✅ 推荐

```typescript
// 使用 transform 和 opacity
to('.box', { x: 100, opacity: 0.5 })

// 批量操作相同元素
to(['.box1', '.box2', '.box3'], { x: 100 })

// 使用 Timeline 编排复杂序列
const tl = createTimeline()
tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
```

### ❌ 避免

```typescript
// 避免动画布局属性
to('.box', { width: '200px', height: '100px' })

// 避免过多同时动画
for (let i = 0; i < 1000; i++) {
  to(`.box-${i}`, { x: 100 })
}

// 避免在循环中创建动画
setInterval(() => {
  to('.box', { x: Math.random() * 100 })
}, 16)
```

## 调试

### 启用调试面板

```typescript
import { createDebugger } from '@ldesign/animation'

if (process.env.NODE_ENV === 'development') {
  const debugger = createDebugger({
    showFPS: true,
    showMemory: true,
    showAnimations: true
  })
  
  debugger.show()
}
```

### 性能监控

```typescript
import { PerformanceMonitor } from '@ldesign/animation'

const monitor = new PerformanceMonitor((stats) => {
  console.log('FPS:', stats.fps)
  console.log('帧时间:', stats.frameTime, 'ms')
})

monitor.start()
```

## 下一步

- 学习 [基础动画](/guide/basic-animation)
- 探索 [Timeline 时间轴](/guide/timeline)
- 了解 [性能优化](/guide/performance)

