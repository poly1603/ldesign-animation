# 核心概念

## 架构概览

`@ldesign/animation` 采用模块化架构，由以下核心组件组成：

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  AnimationManager │    │ TransitionManager│    │ SequenceManager │
│                 │    │                 │    │                 │
│ • 创建动画       │    │ • CSS 过渡      │    │ • 动画序列      │
│ • 控制播放       │    │ • 状态管理      │    │ • 时间轴控制    │
│ • 性能监控       │    │ • 事件处理      │    │ • 并行/串行     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   │
                    ┌─────────────────┐
                    │   Controllers   │
                    │                 │
                    │ • CSS Animation │
                    │ • JS Animation  │
                    │ • Spring        │
                    └─────────────────┘
```

## 核心管理器

### AnimationManager

动画管理器是核心组件，负责创建和管理所有动画实例。

**主要职责：**
- 动画的创建和销毁
- 播放状态控制（播放、暂停、停止）
- 性能监控和优化
- 事件系统管理

**使用场景：**
- 复杂的关键帧动画
- 需要精确控制的动画
- 性能敏感的场景

```typescript
const manager = new AnimationManager()
const animation = manager.create(element, keyframes, options)
```

### TransitionManager

过渡管理器专门处理 CSS 过渡效果，提供更简单的 API。

**主要职责：**
- CSS 过渡的创建和管理
- 状态变化的监听
- 过渡完成的回调处理

**使用场景：**
- 简单的属性变化
- 状态切换动画
- 响应式布局变化

```typescript
const manager = new TransitionManager()
manager.transition(element, { opacity: 1 }, { duration: 300 })
```

### SequenceManager

序列管理器用于创建复杂的动画序列和时间轴。

**主要职责：**
- 动画序列的编排
- 时间轴的控制
- 并行和串行动画的协调

**使用场景：**
- 复杂的动画流程
- 多元素协调动画
- 交互式动画序列

```typescript
const manager = new SequenceManager()
const sequence = manager.createSequence()
  .add(animation1)
  .add(animation2, { delay: 500 })
  .parallel([animation3, animation4])
```

## 动画控制器

### CSSAnimationController

基于 CSS 动画的控制器，利用浏览器的硬件加速。

**优势：**
- 性能优异
- 硬件加速
- 浏览器优化

**适用场景：**
- 简单的变换动画
- 循环动画
- 性能要求高的场景

### JSAnimationController

基于 JavaScript 的动画控制器，提供更大的灵活性。

**优势：**
- 精确控制
- 复杂逻辑
- 动态计算

**适用场景：**
- 复杂的动画逻辑
- 需要实时计算的动画
- 自定义缓动函数

### SpringAnimationController

基于物理弹簧模型的动画控制器。

**优势：**
- 自然的动画效果
- 物理真实感
- 响应式交互

**适用场景：**
- 交互式动画
- 手势响应
- 自然的过渡效果

## 动画类型

### 关键帧动画

通过定义关键帧来创建复杂的动画效果。

```typescript
const keyframes = {
  opacity: [0, 0.5, 1],
  transform: [
    'translateX(0) scale(1)',
    'translateX(50px) scale(1.2)',
    'translateX(100px) scale(1)'
  ]
}
```

### 过渡动画

通过状态变化触发的简单动画。

```typescript
// 从当前状态过渡到目标状态
manager.transition(element, {
  opacity: 1,
  transform: 'translateX(100px)'
})
```

### 序列动画

多个动画按时间顺序或并行执行。

```typescript
const sequence = manager.createSequence()
  .add(fadeIn, { duration: 300 })
  .add(slideUp, { delay: 100 })
  .parallel([scaleUp, rotateIn])
```

## 缓动函数

### 内置缓动

提供常用的缓动函数：

- `linear` - 线性
- `ease` - 默认缓动
- `ease-in` - 缓入
- `ease-out` - 缓出
- `ease-in-out` - 缓入缓出

### 自定义缓动

支持贝塞尔曲线和自定义函数：

```typescript
// 贝塞尔曲线
const customEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

// 自定义函数
const bounceEasing = (t: number) => {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
  }
  // ... 更多逻辑
}
```

## 性能优化

### 硬件加速

自动检测和启用硬件加速属性：

- `transform`
- `opacity`
- `filter`

### 批量操作

通过批量操作减少重排和重绘：

```typescript
manager.batch(() => {
  animation1.play()
  animation2.play()
  animation3.play()
})
```

### 性能监控

内置性能监控工具：

```typescript
manager.enablePerformanceMonitoring()
const metrics = manager.getPerformanceMetrics()
console.log('FPS:', metrics.fps)
console.log('Memory:', metrics.memory)
```

## 事件系统

### 动画事件

监听动画的各个阶段：

```typescript
animation.on('start', () => console.log('动画开始'))
animation.on('update', (progress) => console.log('进度:', progress))
animation.on('complete', () => console.log('动画完成'))
animation.on('cancel', () => console.log('动画取消'))
```

### 全局事件

监听管理器级别的事件：

```typescript
manager.on('animationStart', (animation) => {
  console.log('有动画开始了')
})

manager.on('performanceWarning', (warning) => {
  console.warn('性能警告:', warning)
})
```

## Vue 3 集成

### 组合式 API

提供 Vue 3 组合式 API 支持：

```vue
<script setup>
import { useAnimation } from '@ldesign/animation/vue'

const { animate, isPlaying } = useAnimation()

const handleClick = () => {
  animate(elementRef.value, {
    opacity: [0, 1],
    transform: ['scale(0)', 'scale(1)']
  })
}
</script>
```

### 响应式集成

与 Vue 的响应式系统深度集成：

```vue
<script setup>
import { ref, watch } from 'vue'
import { useTransition } from '@ldesign/animation/vue'

const isVisible = ref(false)
const { transition } = useTransition()

watch(isVisible, (visible) => {
  transition(elementRef.value, {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-20px)'
  })
})
</script>
```

## 最佳实践

### 1. 选择合适的动画类型

- **简单过渡** → TransitionManager
- **复杂动画** → AnimationManager
- **动画序列** → SequenceManager

### 2. 性能优化

- 优先使用 `transform` 和 `opacity`
- 避免动画布局属性（width, height, margin 等）
- 使用 `will-change` 提示浏览器
- 及时清理不需要的动画

### 3. 用户体验

- 遵循 `prefers-reduced-motion` 设置
- 提供动画开关选项
- 合理的动画时长（通常 200-500ms）
- 避免过度动画

### 4. 错误处理

```typescript
try {
  const animation = manager.create(element, keyframes, options)
  await animation.play()
} catch (error) {
  console.error('动画执行失败:', error)
  // 提供降级方案
}
```

## 下一步

- 查看 [API 文档](../api/) 了解详细接口
- 浏览 [示例](../examples/) 学习实际用法
- 阅读 [最佳实践](./best-practices.md) 获取优化建议