# @ldesign/animation

> 🎨 LDesign 动画库 - 完整的动画解决方案

一个功能强大、灵活易用的动画库，支持多种前端框架（Vue、React、Lit），提供丰富的动画效果和强大的性能。

## ✨ 特性

- 🎯 **核心引擎** - 强大的动画核心引擎
- ⚛️ **多框架支持** - Vue 3、React 18、Lit 3
- 🎪 **物理动画** - 真实的弹簧、阻尼、重力效果
- 🖱️ **手势识别** - 拖拽、缩放、旋转
- 📜 **滚动动画** - 滚动触发、视差效果
- 🎨 **SVG 动画** - 路径绘制、形变动画
- ⚡ **高性能** - GPU 加速、requestAnimationFrame
- 📦 **Tree-shaking** - 按需引入，最小化打包体积
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

### 安装核心包

```bash
# 仅使用核心功能
pnpm add @ldesign/animation-core
```

### 安装框架集成

```bash
# Vue 3
pnpm add @ldesign/animation-vue

# React 18
pnpm add @ldesign/animation-react

# Lit 3
pnpm add @ldesign/animation-lit

# 或者安装完整包（包含所有子包）
pnpm add @ldesign/animation
```

## 🏗️ 项目结构

本项目采用 monorepo 架构，包含以下子包：

```
@ldesign/animation/
├── packages/
│   ├── core/          # 核心动画引擎
│   │   ├── src/       # 源代码
│   │   └── examples/  # 演示示例（基于 @ldesign/launcher）
│   ├── vue/           # Vue 3 集成
│   │   ├── src/       # 源代码
│   │   └── examples/  # Vue 演示示例
│   ├── react/         # React 18 集成
│   │   ├── src/       # 源代码
│   │   └── examples/  # React 演示示例
│   └── lit/           # Lit 3 集成
│       ├── src/       # 源代码
│       └── examples/  # Lit 演示示例
└── scripts/           # 构建脚本
```

## 🚀 快速开始

### 使用核心包

```typescript
import { animate } from '@ldesign/animation-core'

// 基础动画
animate({
  targets: '.element',
  translateX: 250,
  rotate: 360,
  duration: 1000,
  easing: 'easeOutExpo'
})
```

### Vue 3 集成

```vue
<script setup lang="ts">
import { Motion } from '@ldesign/animation-vue'
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 50 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 1000 }"
  >
    <div>动画内容</div>
  </Motion>
</template>
```

### React 集成

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

### Lit 集成

```typescript
import { html, LitElement } from 'lit'
import { animate } from '@ldesign/animation-lit/directives'

class MyElement extends LitElement {
  render() {
    return html`
      <div ${animate({
        translateX: 250,
        rotate: 360,
        duration: 1000
      })}>
        动画元素
      </div>
    `
  }
}
```

## 📚 子包文档

- [@ldesign/animation-core](./packages/core/README.md) - 核心动画引擎
- [@ldesign/animation-vue](./packages/vue/README.md) - Vue 3 集成
- [@ldesign/animation-react](./packages/react/README.md) - React 集成
- [@ldesign/animation-lit](./packages/lit/README.md) - Lit 集成

## 🛠️ 开发指南

### 安装依赖

```bash
# 在项目根目录安装所有依赖
pnpm install
```

### 构建

```bash
# 构建所有子包
pnpm build

# 构建特定子包
pnpm build:core     # 构建 core 包
pnpm build:vue      # 构建 vue 包
pnpm build:react    # 构建 react 包
pnpm build:lit      # 构建 lit 包

# 监听模式（开发时使用）
pnpm build:watch    # 监听所有子包
pnpm dev            # 开发模式（并行监听）
```

### 运行演示示例

```bash
# 启动特定框架的演示
pnpm dev:examples core     # 启动 core 演示（端口 5200）
pnpm dev:examples vue      # 启动 vue 演示（端口 5201）
pnpm dev:examples react    # 启动 react 演示（端口 5202）
pnpm dev:examples lit      # 启动 lit 演示（端口 5203）

# 构建所有演示
pnpm build:examples
```

### 清理

```bash
# 清理所有构建产物
pnpm clean

# 清理根目录构建产物
pnpm clean:root

# 清理所有子包构建产物
pnpm clean:packages
```

## 🏗️ 构建工具

所有子包都使用 `@ldesign/builder` 进行构建，支持：

- ✅ **ESM** - ES Module 格式
- ✅ **CJS** - CommonJS 格式
- ✅ **UMD** - Universal Module Definition 格式
- ✅ **类型声明** - 自动生成 `.d.ts` 文件
- ✅ **Source Map** - 便于调试

演示示例使用 `@ldesign/launcher` 启动，基于 Vite 提供：

- ⚡ 极速热更新
- 🔥 开箱即用
- 📦 优化的生产构建

## 🎯 核心功能

### 1. 基础动画

```typescript
import { animate } from '@ldesign/animation-core'

animate({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  scale: 1.5,
  duration: 1500,
  easing: 'easeInOutQuad'
})
```

### 2. 时间轴动画

```typescript
import { Timeline } from '@ldesign/animation-core/timeline'

const timeline = new Timeline()

timeline
  .add({ targets: '.box1', translateX: 250, duration: 1000 })
  .add({ targets: '.box2', translateY: 250, duration: 1000 }, '-=500')
  .add({ targets: '.box3', rotate: 360, duration: 1000 })

timeline.play()
```

### 3. 物理动画

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

### 4. 滚动触发

```typescript
import { scrollTrigger } from '@ldesign/animation-core/scroll'

scrollTrigger({
  trigger: '.section',
  start: 'top center',
  end: 'bottom center',
  scrub: true,
  onEnter: () => console.log('进入视口'),
  onLeave: () => console.log('离开视口')
})
```

### 5. 手势动画

```typescript
import { useDraggable } from '@ldesign/animation-core/gesture'

useDraggable('.box', {
  bounds: 'parent',
  inertia: true,
  onDrag: (e) => console.log('拖拽中', e),
  onDragEnd: (e) => console.log('拖拽结束', e)
})
```

### 6. SVG 动画

```typescript
import { svgPath } from '@ldesign/animation-core/svg'

svgPath({
  targets: 'path',
  strokeDashoffset: [length, 0],
  duration: 2000,
  easing: 'easeInOutSine'
})
```

## 📊 性能特性

- ⚡ **GPU 加速** - 使用 transform 和 opacity 实现最佳性能
- 🔄 **requestAnimationFrame** - 60fps 流畅动画
- 💾 **内存优化** - 自动清理和资源管理
- 🎯 **按需加载** - Tree-shaking 支持

## 🔗 相关资源

- [文档网站](https://ldesign.dev/animation)
- [GitHub 仓库](https://github.com/ldesign/animation)
- [问题反馈](https://github.com/ldesign/animation/issues)
- [更新日志](./CHANGELOG.md)

## 📄 许可证

MIT License © 2024 LDesign Team

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](./CONTRIBUTING.md)。

## 💬 社区

- Discord: [加入我们](https://discord.gg/ldesign)
- Twitter: [@ldesign_dev](https://twitter.com/ldesign_dev)

---

Made with ❤️ by LDesign Team
