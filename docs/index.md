---
layout: home

hero:
  name: "@ldesign/animation"
  text: "高性能动画库"
  tagline: "支持CSS动画、JS动画、过渡效果和动画序列的现代化动画解决方案"
  image:
    src: /logo.svg
    alt: LDesign Animation
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看示例
      link: /examples/
    - theme: alt
      text: GitHub
      link: https://github.com/ldesign/animation

features:
  - icon: 🚀
    title: 高性能
    details: 基于现代浏览器API，支持硬件加速，提供流畅的60fps动画体验
  - icon: 🎨
    title: 丰富的动画类型
    details: 支持CSS动画、JavaScript动画、过渡效果、动画序列等多种动画类型
  - icon: 📱
    title: 响应式设计
    details: 完美支持移动端和桌面端，自动适配不同屏幕尺寸和设备性能
  - icon: 🔧
    title: 易于使用
    details: 提供简洁的API和Vue组合式函数，快速集成到现有项目中
  - icon: 🎯
    title: TypeScript支持
    details: 完整的TypeScript类型定义，提供优秀的开发体验和类型安全
  - icon: ⚡
    title: 按需加载
    details: 模块化设计，支持Tree Shaking，只打包使用的功能，减小包体积
  - icon: 🎪
    title: 丰富的预设
    details: 内置多种常用动画预设，如淡入淡出、滑动、缩放、旋转等
  - icon: 🔄
    title: 动画控制
    details: 支持播放、暂停、重置、反向播放等完整的动画生命周期控制
  - icon: 📊
    title: 性能监控
    details: 内置性能监控工具，实时监测FPS、内存使用等性能指标
---

## 快速开始

### 安装

```bash
# npm
npm install @ldesign/animation

# yarn
yarn add @ldesign/animation

# pnpm
pnpm add @ldesign/animation
```

### 基础使用

```typescript
import { createAnimation } from '@ldesign/animation'

// 创建一个简单的淡入动画
const animation = createAnimation({
  target: '.my-element',
  animation: 'fadeIn',
  duration: 1000,
  easing: 'ease-out'
})

// 播放动画
animation.play()
```

### Vue 集成

```vue
<template>
  <div>
    <div ref="elementRef" class="animated-element">
      Hello Animation!
    </div>
    <button @click="playAnimation">播放动画</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAnimation } from '@ldesign/animation'

const elementRef = ref()
const { createAnimation } = useAnimation()

const playAnimation = () => {
  const animation = createAnimation({
    target: elementRef.value,
    animation: 'slideInUp',
    duration: 800,
    easing: 'ease-out'
  })
  
  animation.play()
}
</script>
```

## 特性亮点

### 🎯 多种动画类型

- **CSS动画**: 基于CSS关键帧和过渡的高性能动画
- **JavaScript动画**: 使用Web Animations API的精确控制动画
- **过渡效果**: 平滑的属性过渡和状态切换
- **动画序列**: 复杂的多步骤动画编排
- **滚动动画**: 基于滚动位置触发的动画效果

### ⚡ 性能优化

- 硬件加速支持
- 智能批处理
- 内存管理
- FPS监控
- 自动降级

### 🔧 开发体验

- TypeScript 完整支持
- Vue 3 组合式API
- 丰富的预设动画
- 详细的文档和示例
- 活跃的社区支持

## 生态系统

| 项目 | 描述 |
|------|------|
| [@ldesign/animation](https://github.com/ldesign/animation) | 核心动画库 |
| [@ldesign/color](https://github.com/ldesign/color) | 颜色管理库 |
| [@ldesign/engine](https://github.com/ldesign/engine) | 渲染引擎 |

## 贡献

我们欢迎所有形式的贡献！请查看我们的[贡献指南](https://github.com/ldesign/animation/blob/main/CONTRIBUTING.md)了解更多信息。

## 许可证

[MIT License](https://github.com/ldesign/animation/blob/main/LICENSE)