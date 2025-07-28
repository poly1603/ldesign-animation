# @ldesign/animation

[![npm version](https://badge.fury.io/js/%40ldesign%2Fanimation.svg)](https://badge.fury.io/js/%40ldesign%2Fanimation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)

高性能动画库，支持CSS动画、JavaScript动画、过渡效果和动画序列的现代化动画解决方案。

## ✨ 特性

- 🚀 **高性能** - 基于现代浏览器API，支持硬件加速
- 🎨 **丰富的动画类型** - CSS动画、JS动画、过渡、序列等
- 📱 **响应式设计** - 完美支持移动端和桌面端
- 🔧 **易于使用** - 简洁的API和Vue组合式函数
- 🎯 **TypeScript支持** - 完整的类型定义
- ⚡ **按需加载** - 模块化设计，支持Tree Shaking
- 🎪 **丰富的预设** - 内置多种常用动画效果
- 🔄 **动画控制** - 完整的生命周期控制
- 📊 **性能监控** - 实时FPS和内存监控

## 📦 安装

```bash
# npm
npm install @ldesign/animation

# yarn
yarn add @ldesign/animation

# pnpm
pnpm add @ldesign/animation
```

## 🚀 快速开始

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

### 使用组件

```vue
<template>
  <div>
    <!-- 动画容器 -->
    <AnimationContainer
      :animation="'fadeIn'"
      :duration="800"
      :auto-play="true"
    >
      <div class="content">
        欢迎使用 LDesign Animation
      </div>
    </AnimationContainer>
    
    <!-- 滚动动画 -->
    <ScrollAnimation
      :animation="'slideInLeft'"
      :threshold="0.3"
    >
      <div class="card">
        滚动触发的动画
      </div>
    </ScrollAnimation>
  </div>
</template>

<script setup>
import {
  AnimationContainer,
  ScrollAnimation
} from '@ldesign/animation'
</script>
```

## 🎯 核心功能

### 动画类型

- **CSS动画** - 基于CSS关键帧的高性能动画
- **JavaScript动画** - 使用Web Animations API的精确控制
- **过渡效果** - 平滑的属性过渡和状态切换
- **动画序列** - 复杂的多步骤动画编排
- **滚动动画** - 基于滚动位置触发的动画

### 预设动画

```typescript
// 淡入淡出
'fadeIn', 'fadeOut', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'

// 滑动效果
'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'
'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight'

// 缩放效果
'zoomIn', 'zoomOut', 'zoomInUp', 'zoomInDown'

// 旋转效果
'rotateIn', 'rotateOut', 'flipInX', 'flipInY'

// 弹跳效果
'bounce', 'bounceIn', 'bounceOut'

// 抖动效果
'shake', 'wobble', 'pulse'
```

### 动画序列

```typescript
import { useSequence } from '@ldesign/animation'

const { createSequence } = useSequence()

const sequence = createSequence([
  {
    target: '.step1',
    animation: 'fadeIn',
    duration: 500
  },
  {
    target: '.step2',
    animation: 'slideInUp',
    duration: 600,
    delay: 200
  },
  {
    target: '.step3',
    animation: 'zoomIn',
    duration: 400
  }
])

sequence.play()
```

### 性能监控

```typescript
import { usePerformance } from '@ldesign/animation'

const {
  fps,
  memory,
  activeAnimations,
  startMonitoring,
  stopMonitoring
} = usePerformance()

startMonitoring()
console.log(`FPS: ${fps.value}, Memory: ${memory.value}MB`)
```

## 📚 API 文档

### 核心API

- [`createAnimation`](/api/create-animation) - 创建动画实例
- [`animateElements`](/api/animate-elements) - 批量动画元素
- [`AnimationManager`](/api/animation-manager) - 动画管理器
- [`TransitionManager`](/api/transition-manager) - 过渡管理器
- [`SequenceManager`](/api/sequence-manager) - 序列管理器

### Vue API

- [`useAnimation`](/api/use-animation) - 动画组合式函数
- [`useCSSAnimation`](/api/use-css-animation) - CSS动画
- [`useTransition`](/api/use-transition) - 过渡效果
- [`useSequence`](/api/use-sequence) - 动画序列
- [`useScrollAnimation`](/api/use-scroll-animation) - 滚动动画

### 组件

- [`AnimationContainer`](/api/animation-container) - 动画容器
- [`TransitionGroup`](/api/transition-group) - 过渡组
- [`ScrollAnimation`](/api/scroll-animation) - 滚动动画
- [`HoverAnimation`](/api/hover-animation) - 悬停动画
- [`ClickAnimation`](/api/click-animation) - 点击动画

## 🎨 示例

查看我们的[在线演示](https://ldesign.github.io/animation/demo/)，包含：

- 基础动画效果
- CSS动画示例
- JavaScript动画
- 过渡效果
- 动画序列
- 滚动动画
- 交互动画
- 性能优化

## 📖 文档

完整文档请访问：[https://ldesign.github.io/animation/](https://ldesign.github.io/animation/)

- [快速开始](/guide/getting-started)
- [核心概念](/guide/concepts)
- [API参考](/api/)
- [示例集合](/examples/)
- [最佳实践](/guide/best-practices)

## 🔧 开发

```bash
# 克隆项目
git clone https://github.com/ldesign/animation.git
cd animation

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 文档开发
pnpm docs:dev

# 示例开发
pnpm example:dev
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage

# 测试UI
pnpm test:ui
```

## 📊 性能

- **包大小**: ~15KB (gzipped)
- **运行时性能**: 60fps 流畅动画
- **内存占用**: 优化的内存管理
- **兼容性**: 现代浏览器 (Chrome 60+, Firefox 55+, Safari 12+)

## 🤝 贡献

我们欢迎所有形式的贡献！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解更多信息。

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 🔗 相关链接

- [GitHub](https://github.com/ldesign/animation)
- [NPM](https://www.npmjs.com/package/@ldesign/animation)
- [文档](https://ldesign.github.io/animation/)
- [示例](https://ldesign.github.io/animation/demo/)
- [更新日志](CHANGELOG.md)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ldesign">LDesign Team</a>
</p>