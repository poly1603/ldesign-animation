# @ldesign/animation-solid

> 🎨 LDesign 动画库 Solid.js 集成 - 提供组件和 Hooks

## ✨ 特性

- ⚛️ **Solid 组件** - 响应式动画组件
- 🪝 **Solid Hooks** - 强大的 Hooks 集成
- 📊 **Signals** - 基于 Solid 的响应式系统
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 📦 **Tree-shaking** - 按需引入
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-solid solid-js
```

## 🚀 快速开始

### 使用组件

```tsx
import { Motion } from '@ldesign/animation-solid'

function App() {
  return (
    <Motion
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1000 }}
    >
      <div>动画内容</div>
    </Motion>
  )
}
```

### 使用 Hooks

```tsx
import { createSignal } from 'solid-js'
import { useAnimate } from '@ldesign/animation-solid'

function App() {
  let targetRef: HTMLDivElement | undefined
  const { play, pause, restart } = useAnimate(() => targetRef, {
    translateX: 250,
    rotate: 360,
    duration: 1000
  })

  return (
    <div>
      <div ref={targetRef}>动画元素</div>
      <button onClick={play}>播放</button>
      <button onClick={pause}>暂停</button>
      <button onClick={restart}>重播</button>
    </div>
  )
}
```

## 📚 API 文档

### 组件

#### `<Motion>`

运动组件。

### Hooks

#### `useAnimate(target, options)`

创建可控制的动画。

#### `useTimeline()`

创建时间轴动画序列。

#### `useSpring(target, config)`

创建弹簧物理动画。

## 📄 许可证

MIT License © 2024 LDesign Team

