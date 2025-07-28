# AnimationManager

动画管理器是 `@ldesign/animation` 的核心组件，负责创建、管理和控制所有动画实例。

## 构造函数

```typescript
const manager = new AnimationManager(options?: AnimationManagerOptions)
```

### AnimationManagerOptions

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `performanceMonitoring` | `boolean` | `false` | 是否启用性能监控 |
| `maxConcurrentAnimations` | `number` | `100` | 最大并发动画数量 |
| `defaultDuration` | `number` | `300` | 默认动画时长（毫秒） |
| `defaultEasing` | `string` | `'ease'` | 默认缓动函数 |

## 方法

### create()

创建新的动画实例。

```typescript
create(
  element: HTMLElement,
  keyframes: Keyframes,
  options?: AnimationOptions
): Animation
```

#### 参数

- **element**: 要动画的 DOM 元素
- **keyframes**: 关键帧定义
- **options**: 动画选项

#### 返回值

返回 `Animation` 实例。

#### 示例

```typescript
const animation = manager.create(
  document.getElementById('box'),
  {
    opacity: [0, 1],
    transform: ['translateX(-100px)', 'translateX(0)']
  },
  {
    duration: 1000,
    easing: 'ease-out'
  }
)
```

### createFromCSS()

从 CSS 动画创建动画实例。

```typescript
createFromCSS(
  element: HTMLElement,
  animationName: string,
  options?: CSSAnimationOptions
): Animation
```

#### 示例

```typescript
const animation = manager.createFromCSS(
  element,
  'slideIn',
  { duration: 500 }
)
```

### batch()

批量执行动画操作，优化性能。

```typescript
batch(callback: () => void): void
```

#### 示例

```typescript
manager.batch(() => {
  animation1.play()
  animation2.play()
  animation3.play()
})
```

### getAllAnimations()

获取所有活动的动画实例。

```typescript
getAllAnimations(): Animation[]
```

### getAnimationsByElement()

获取指定元素的所有动画。

```typescript
getAnimationsByElement(element: HTMLElement): Animation[]
```

### pauseAll()

暂停所有动画。

```typescript
pauseAll(): void
```

### resumeAll()

恢复所有动画。

```typescript
resumeAll(): void
```

### stopAll()

停止所有动画。

```typescript
stopAll(): void
```

### cleanup()

清理已完成或取消的动画。

```typescript
cleanup(): void
```

### destroy()

销毁管理器，清理所有资源。

```typescript
destroy(): void
```

## 性能监控

### enablePerformanceMonitoring()

启用性能监控。

```typescript
enablePerformanceMonitoring(): void
```

### disablePerformanceMonitoring()

禁用性能监控。

```typescript
disablePerformanceMonitoring(): void
```

### getPerformanceMetrics()

获取性能指标。

```typescript
getPerformanceMetrics(): PerformanceMetrics
```

#### PerformanceMetrics

```typescript
interface PerformanceMetrics {
  fps: number                    // 当前帧率
  averageFps: number            // 平均帧率
  memoryUsage: number           // 内存使用量（MB）
  activeAnimations: number      // 活动动画数量
  totalAnimations: number       // 总动画数量
  droppedFrames: number         // 丢帧数量
  renderTime: number            // 渲染时间（毫秒）
}
```

## 事件

### 监听事件

```typescript
manager.on(event: string, callback: Function): void
manager.off(event: string, callback: Function): void
manager.once(event: string, callback: Function): void
```

### 事件类型

| 事件名 | 参数 | 描述 |
|--------|------|------|
| `animationCreate` | `animation: Animation` | 动画创建时触发 |
| `animationStart` | `animation: Animation` | 动画开始时触发 |
| `animationComplete` | `animation: Animation` | 动画完成时触发 |
| `animationCancel` | `animation: Animation` | 动画取消时触发 |
| `performanceWarning` | `warning: PerformanceWarning` | 性能警告时触发 |
| `error` | `error: Error` | 错误发生时触发 |

#### 示例

```typescript
manager.on('animationStart', (animation) => {
  console.log('动画开始:', animation.id)
})

manager.on('performanceWarning', (warning) => {
  console.warn('性能警告:', warning.message)
})
```

## 配置

### setDefaultOptions()

设置默认动画选项。

```typescript
setDefaultOptions(options: Partial<AnimationOptions>): void
```

#### 示例

```typescript
manager.setDefaultOptions({
  duration: 500,
  easing: 'ease-out',
  fill: 'forwards'
})
```

### getDefaultOptions()

获取当前默认选项。

```typescript
getDefaultOptions(): AnimationOptions
```

## 实用方法

### isSupported()

检查浏览器是否支持 Web Animations API。

```typescript
static isSupported(): boolean
```

### getVersion()

获取库版本。

```typescript
static getVersion(): string
```

## 完整示例

```typescript
import { AnimationManager } from '@ldesign/animation'

// 创建管理器
const manager = new AnimationManager({
  performanceMonitoring: true,
  maxConcurrentAnimations: 50
})

// 监听事件
manager.on('performanceWarning', (warning) => {
  console.warn('性能警告:', warning)
})

// 创建动画
const element = document.getElementById('box')
const animation = manager.create(element, {
  opacity: [0, 1],
  transform: [
    'translateX(-100px) scale(0.8)',
    'translateX(0) scale(1)'
  ]
}, {
  duration: 800,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
})

// 播放动画
animation.play().then(() => {
  console.log('动画完成')
})

// 批量操作
manager.batch(() => {
  const elements = document.querySelectorAll('.item')
  elements.forEach((el, index) => {
    const anim = manager.create(el, {
      opacity: [0, 1],
      transform: ['translateY(20px)', 'translateY(0)']
    }, {
      duration: 300,
      delay: index * 100
    })
    anim.play()
  })
})

// 获取性能指标
setInterval(() => {
  const metrics = manager.getPerformanceMetrics()
  console.log(`FPS: ${metrics.fps}, 活动动画: ${metrics.activeAnimations}`)
}, 1000)

// 清理资源
window.addEventListener('beforeunload', () => {
  manager.destroy()
})
```

## 类型定义

```typescript
interface Keyframes {
  [property: string]: string | number | (string | number)[]
}

interface AnimationOptions {
  duration?: number
  delay?: number
  easing?: string | ((t: number) => number)
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  playbackRate?: number
}

interface CSSAnimationOptions {
  duration?: number
  delay?: number
  iterations?: number
  direction?: string
  fillMode?: string
  playState?: 'running' | 'paused'
}
```

## 注意事项

1. **内存管理**: 及时调用 `cleanup()` 清理已完成的动画
2. **性能监控**: 在生产环境中谨慎使用性能监控功能
3. **浏览器兼容性**: 对于不支持 Web Animations API 的浏览器，需要引入 polyfill
4. **错误处理**: 始终为动画操作添加错误处理逻辑

## 相关链接

- [Animation API](./animation.md)
- [TransitionManager API](./transition-manager.md)
- [SequenceManager API](./sequence-manager.md)
- [Vue 集成](./vue-integration.md)