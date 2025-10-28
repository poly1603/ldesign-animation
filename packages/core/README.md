# @ldesign/animation-core

> 🎨 LDesign 动画核心库 - 提供底层动画引擎和核心功能

## ✨ 特性

- 🎯 **核心动画引擎** - 强大的动画引擎，支持各种动画效果
- ⏱️ **时间轴管理** - 灵活的时间轴系统，支持复杂动画序列
- 🎪 **物理模拟** - 真实的物理动画效果（弹簧、阻尼、重力）
- 🖱️ **手势识别** - 内置手势系统，支持拖拽、缩放、旋转
- 📜 **滚动动画** - 滚动触发动画，视差效果
- 🎨 **SVG 动画** - SVG 路径动画，形变动画
- ⚡ **高性能** - 使用 requestAnimationFrame，GPU 加速
- 📦 **零依赖** - 无外部依赖，轻量级
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm add @ldesign/animation-core

# 使用 npm
npm install @ldesign/animation-core

# 使用 yarn
yarn add @ldesign/animation-core
```

## 🚀 快速开始

### 基础动画

```typescript
import { animate } from '@ldesign/animation-core'

// 简单动画
animate({
  targets: '.element',
  translateX: 250,
  duration: 1000,
  easing: 'easeOutExpo'
})
```

### 时间轴动画

```typescript
import { Timeline } from '@ldesign/animation-core/timeline'

const timeline = new Timeline()

timeline
  .add({
    targets: '.box1',
    translateX: 250,
    duration: 1000
  })
  .add({
    targets: '.box2',
    translateY: 250,
    duration: 1000
  }, '-=500') // 重叠 500ms

timeline.play()
```

### 物理动画

```typescript
import { spring } from '@ldesign/animation-core/physics'

spring({
  targets: '.element',
  translateX: 250,
  stiffness: 200,
  damping: 10,
  mass: 1
})
```

### 滚动动画

```typescript
import { scrollTrigger } from '@ldesign/animation-core/scroll'

scrollTrigger({
  trigger: '.section',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => console.log('进入视口'),
  onLeave: () => console.log('离开视口')
})
```

### SVG 路径动画

```typescript
import { svgPath } from '@ldesign/animation-core/svg'

svgPath({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 2000,
  easing: 'easeInOutSine'
})
```

## 📚 API 文档

### Core API

#### `animate(options)`

创建基础动画。

**参数:**
- `targets`: 目标元素（选择器、DOM 元素、NodeList）
- `duration`: 动画时长（毫秒）
- `easing`: 缓动函数
- `delay`: 延迟时间
- `loop`: 循环次数（true 为无限循环）
- `direction`: 动画方向（'normal' | 'reverse' | 'alternate'）

**示例:**
```typescript
animate({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  duration: 1500,
  easing: 'easeInOutQuad'
})
```

### Timeline API

#### `new Timeline(options)`

创建时间轴实例。

**方法:**
- `add(animation, offset?)`: 添加动画
- `play()`: 播放时间轴
- `pause()`: 暂停时间轴
- `restart()`: 重新播放
- `reverse()`: 反向播放
- `seek(time)`: 跳转到指定时间

### Physics API

#### `spring(options)`

创建弹簧物理动画。

**参数:**
- `stiffness`: 刚度（默认 100）
- `damping`: 阻尼（默认 10）
- `mass`: 质量（默认 1）
- `velocity`: 初始速度

### Scroll API

#### `scrollTrigger(options)`

创建滚动触发动画。

**参数:**
- `trigger`: 触发元素
- `start`: 开始位置
- `end`: 结束位置
- `scrub`: 是否跟随滚动
- `pin`: 是否固定元素
- `onEnter/onLeave/onUpdate`: 回调函数

### Gesture API

#### `useDraggable(element, options)`

使元素可拖拽。

**参数:**
- `bounds`: 拖拽边界
- `inertia`: 惯性效果
- `onDrag/onDragEnd`: 回调函数

## 🎯 缓动函数

内置多种缓动函数：

- Linear: `linear`
- Quad: `easeInQuad`, `easeOutQuad`, `easeInOutQuad`
- Cubic: `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- Quart: `easeInQuart`, `easeOutQuart`, `easeInOutQuart`
- Expo: `easeInExpo`, `easeOutExpo`, `easeInOutExpo`
- Back: `easeInBack`, `easeOutBack`, `easeInOutBack`
- Elastic: `easeInElastic`, `easeOutElastic`, `easeInOutElastic`
- Bounce: `easeInBounce`, `easeOutBounce`, `easeInOutBounce`

## 📦 导出模块

```typescript
// 主入口
import { animate, Timeline } from '@ldesign/animation-core'

// 核心功能
import { Animation, AnimationEngine } from '@ldesign/animation-core/core'

// 物理动画
import { spring, decay, inertia } from '@ldesign/animation-core/physics'

// 时间轴
import { Timeline, Stagger } from '@ldesign/animation-core/timeline'

// 滚动动画
import { scrollTrigger, ScrollObserver } from '@ldesign/animation-core/scroll'

// SVG 动画
import { svgPath, morphSVG } from '@ldesign/animation-core/svg'

// 手势
import { useDraggable, useGesture } from '@ldesign/animation-core/gesture'

// 工具函数
import { clamp, lerp, map } from '@ldesign/animation-core/utils'
```

## 🔗 相关包

- [@ldesign/animation-vue](../vue) - Vue 3 集成
- [@ldesign/animation-react](../react) - React 集成
- [@ldesign/animation-lit](../lit) - Lit 集成

## 📄 许可证

MIT License © 2024 LDesign Team


