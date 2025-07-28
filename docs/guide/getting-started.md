# 快速开始

本指南将帮助您快速上手 `@ldesign/animation`，在几分钟内创建您的第一个动画效果。

## 安装

### 使用包管理器

```bash
# npm
npm install @ldesign/animation

# yarn
yarn add @ldesign/animation

# pnpm
pnpm add @ldesign/animation
```

### CDN 引入

```html
<!-- 开发版本 -->
<script src="https://unpkg.com/@ldesign/animation/dist/ldesign-animation.umd.js"></script>

<!-- 生产版本 -->
<script src="https://unpkg.com/@ldesign/animation/dist/ldesign-animation.umd.min.js"></script>
```

## 基础使用

### 1. 创建简单动画

```typescript
import { createAnimation } from '@ldesign/animation'

// 创建一个淡入动画
const animation = createAnimation({
  target: '.my-element',
  animation: 'fadeIn',
  duration: 1000,
  easing: 'ease-out'
})

// 播放动画
animation.play()
```

### 2. 使用预设动画

```typescript
import { animateElements } from '@ldesign/animation'

// 批量应用动画
animateElements('.card', {
  animation: 'slideInUp',
  duration: 800,
  stagger: 100 // 每个元素延迟100ms
})
```

### 3. 自定义关键帧

```typescript
import { createAnimation } from '@ldesign/animation'

const animation = createAnimation({
  target: '#my-element',
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: 'translateX(100px)', opacity: 0.5 },
    { transform: 'translateX(200px)', opacity: 1 }
  ],
  duration: 2000,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

animation.play()
```

## Vue 集成

### 1. 使用组合式API

```vue
<template>
  <div>
    <div ref="boxRef" class="box">
      动画盒子
    </div>
    <button @click="playAnimation">播放动画</button>
    <button @click="pauseAnimation">暂停动画</button>
    <button @click="resetAnimation">重置动画</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAnimation } from '@ldesign/animation'

const boxRef = ref()
const { createAnimation } = useAnimation()

let currentAnimation = null

const playAnimation = () => {
  currentAnimation = createAnimation({
    target: boxRef.value,
    animation: 'bounce',
    duration: 1000,
    iterations: 3
  })
  
  currentAnimation.play()
}

const pauseAnimation = () => {
  if (currentAnimation) {
    currentAnimation.pause()
  }
}

const resetAnimation = () => {
  if (currentAnimation) {
    currentAnimation.reset()
  }
}
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
</style>
```

### 2. 使用动画组件

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
        <h2>欢迎使用 LDesign Animation</h2>
        <p>这是一个自动播放的淡入动画</p>
      </div>
    </AnimationContainer>
    
    <!-- 滚动动画 -->
    <ScrollAnimation
      :animation="'slideInLeft'"
      :threshold="0.3"
      :duration="600"
    >
      <div class="card">
        <h3>滚动触发动画</h3>
        <p>当元素进入视口时自动播放</p>
      </div>
    </ScrollAnimation>
    
    <!-- 悬停动画 -->
    <HoverAnimation
      :animation="'scale'"
      :duration="300"
    >
      <button class="hover-button">
        悬停我试试
      </button>
    </HoverAnimation>
  </div>
</template>

<script setup>
import {
  AnimationContainer,
  ScrollAnimation,
  HoverAnimation
} from '@ldesign/animation'
</script>
```

## 动画序列

创建复杂的多步骤动画：

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
    duration: 400,
    delay: 100
  }
])

// 播放序列
sequence.play()

// 监听序列事件
sequence.on('step-complete', (stepIndex) => {
  console.log(`步骤 ${stepIndex + 1} 完成`)
})

sequence.on('complete', () => {
  console.log('序列动画完成')
})
```

## 性能监控

监控动画性能：

```typescript
import { usePerformance } from '@ldesign/animation'

const {
  fps,
  memory,
  activeAnimations,
  startMonitoring,
  stopMonitoring
} = usePerformance()

// 开始监控
startMonitoring()

// 在组件中显示性能数据
console.log(`当前FPS: ${fps.value}`)
console.log(`内存使用: ${memory.value}MB`)
console.log(`活跃动画数: ${activeAnimations.value}`)

// 停止监控
stopMonitoring()
```

## 常用预设动画

### 淡入淡出

```typescript
// 淡入
createAnimation({ target: '.element', animation: 'fadeIn' })

// 淡出
createAnimation({ target: '.element', animation: 'fadeOut' })

// 淡入向上
createAnimation({ target: '.element', animation: 'fadeInUp' })
```

### 滑动效果

```typescript
// 从左滑入
createAnimation({ target: '.element', animation: 'slideInLeft' })

// 从右滑入
createAnimation({ target: '.element', animation: 'slideInRight' })

// 向上滑出
createAnimation({ target: '.element', animation: 'slideOutUp' })
```

### 缩放效果

```typescript
// 放大进入
createAnimation({ target: '.element', animation: 'zoomIn' })

// 缩小退出
createAnimation({ target: '.element', animation: 'zoomOut' })

// 弹性缩放
createAnimation({ target: '.element', animation: 'zoomInBounce' })
```

### 旋转效果

```typescript
// 旋转进入
createAnimation({ target: '.element', animation: 'rotateIn' })

// 翻转效果
createAnimation({ target: '.element', animation: 'flipInX' })

// 3D旋转
createAnimation({ target: '.element', animation: 'rotateInDownLeft' })
```

## 配置选项

### 基础配置

```typescript
const animation = createAnimation({
  target: '.element',           // 目标元素选择器或DOM元素
  animation: 'fadeIn',          // 动画名称或关键帧
  duration: 1000,               // 动画持续时间（毫秒）
  delay: 0,                     // 延迟时间（毫秒）
  easing: 'ease-out',           // 缓动函数
  iterations: 1,                // 重复次数（Infinity为无限）
  direction: 'normal',          // 播放方向
  fill: 'both',                 // 填充模式
  autoPlay: true                // 是否自动播放
})
```

### 高级配置

```typescript
const animation = createAnimation({
  target: '.element',
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(1.2)', opacity: 0.8 },
    { transform: 'scale(1)', opacity: 1 }
  ],
  options: {
    duration: 1000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    iterations: 2,
    direction: 'alternate',
    fill: 'forwards'
  },
  // 事件回调
  onStart: () => console.log('动画开始'),
  onComplete: () => console.log('动画完成'),
  onCancel: () => console.log('动画取消')
})
```

## 下一步

现在您已经了解了基础用法，可以继续学习：

- [核心概念](/guide/concepts) - 深入了解动画系统的设计理念
- [CSS动画](/guide/css-animations) - 学习如何使用CSS动画
- [JavaScript动画](/guide/js-animations) - 掌握JavaScript动画的高级用法
- [Vue组件](/guide/vue-components) - 探索更多Vue组件的使用方法
- [性能优化](/guide/performance) - 了解如何优化动画性能

如果您遇到任何问题，请查看我们的 [FAQ](/guide/faq) 或在 [GitHub](https://github.com/ldesign/animation/issues) 上提交问题。