# @ldesign/animation-svelte

> 🎨 LDesign 动画库 Svelte 集成 - 提供组件和 Stores

## ✨ 特性

- 🧩 **Svelte 组件** - 响应式动画组件
- 📦 **Svelte Stores** - 基于 Stores 的状态管理
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 📦 **轻量级** - 按需加载
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-svelte svelte
```

## 🚀 快速开始

### 使用组件

```svelte
<script>
  import { Motion } from '@ldesign/animation-svelte'
</script>

<Motion
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1000 }}
>
  <div>动画内容</div>
</Motion>
```

### 使用 Stores

```svelte
<script>
  import { animationStore } from '@ldesign/animation-svelte/stores'
  
  const animation = animationStore({
    translateX: 250,
    rotate: 360,
    duration: 1000
  })
</script>

<button on:click={() => animation.play()}>播放</button>
<button on:click={() => animation.pause()}>暂停</button>
```

## 📚 API 文档

### 组件

#### `<Motion>`

运动组件。

### Stores

#### `animationStore(options)`

创建动画 Store。

#### `timelineStore()`

创建时间轴 Store。

## 📄 许可证

MIT License © 2024 LDesign Team

