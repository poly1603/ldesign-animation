# @ldesign/animation-react

> 🎨 LDesign 动画库 React 集成 - 提供组件和 Hooks

## ✨ 特性

- ⚛️ **React 组件** - 开箱即用的动画组件
- 🪝 **React Hooks** - 强大的 Hooks 集成
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 📦 **Tree-shaking** - 按需引入
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-react
```

## 🚀 快速开始

### 使用组件

```tsx
import { Motion } from '@ldesign/animation-react'

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
import { useRef } from 'react'
import { useAnimate } from '@ldesign/animation-react'

function App() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { play, pause, restart } = useAnimate(targetRef, {
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

**Props:**
- `initial`: 初始状态
- `animate`: 动画目标状态
- `exit`: 退出动画状态
- `transition`: 过渡配置
- `whileHover`: 悬停状态
- `whileTap`: 点击状态

#### `<AnimatePresence>`

列表动画组件。

### Hooks

#### `useAnimate(target, options)`

创建可控制的动画。

#### `useTimeline()`

创建时间轴动画序列。

#### `useSpring(target, config)`

创建弹簧物理动画。

#### `useScroll(options)`

创建滚动触发动画。

#### `useGesture(target, config)`

添加手势支持。

## 📄 许可证

MIT License © 2024 LDesign Team


