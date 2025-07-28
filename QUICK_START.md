# Quick Start Guide

快速开始使用 `@ldesign/animation` 动画库。

## 🚀 安装

```bash
# npm
npm install @ldesign/animation

# yarn
yarn add @ldesign/animation

# pnpm
pnpm add @ldesign/animation
```

## 📦 基础使用

### 1. 创建简单动画

```typescript
import { AnimationManager } from '@ldesign/animation'

// 创建动画管理器
const animationManager = new AnimationManager()

// 创建淡入动画
const element = document.querySelector('.my-element')
const animation = animationManager.createAnimation(element, {
  type: 'fadeIn',
  duration: 300,
  easing: 'ease-out'
})

// 播放动画
animation.play()
```

### 2. Vue 3 集成

```vue
<template>
  <div>
    <button @click="triggerAnimation">播放动画</button>
    <div ref="elementRef" class="animated-box">
      动画元素
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAnimation } from '@ldesign/animation'

const elementRef = ref<HTMLElement>()

const { animate, isAnimating } = useAnimation(elementRef, {
  type: 'slideIn',
  duration: 500,
  direction: 'left'
})

const triggerAnimation = () => {
  animate()
}
</script>
```

### 3. 动画序列

```typescript
import { SequenceManager } from '@ldesign/animation'

const sequence = new SequenceManager()

// 添加动画步骤
sequence
  .add(element1, { type: 'fadeIn', duration: 300 })
  .add(element2, { type: 'slideIn', duration: 400, delay: 100 })
  .add(element3, { type: 'scaleIn', duration: 200 })

// 播放序列
sequence.play()
```

## 🎯 常用动画类型

### 淡入淡出
```typescript
// 淡入
animationManager.createAnimation(element, { type: 'fadeIn' })

// 淡出
animationManager.createAnimation(element, { type: 'fadeOut' })

// 淡入淡出切换
animationManager.createAnimation(element, { type: 'fadeToggle' })
```

### 滑动动画
```typescript
// 从左滑入
animationManager.createAnimation(element, { 
  type: 'slideIn', 
  direction: 'left' 
})

// 向上滑出
animationManager.createAnimation(element, { 
  type: 'slideOut', 
  direction: 'up' 
})
```

### 缩放动画
```typescript
// 放大
animationManager.createAnimation(element, { type: 'scaleIn' })

// 缩小
animationManager.createAnimation(element, { type: 'scaleOut' })

// 弹性缩放
animationManager.createAnimation(element, { 
  type: 'scaleBounce',
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
})
```

### 旋转动画
```typescript
// 顺时针旋转
animationManager.createAnimation(element, { 
  type: 'rotate',
  rotation: 360
})

// 逆时针旋转
animationManager.createAnimation(element, { 
  type: 'rotate',
  rotation: -180
})
```

## ⚡ 性能优化

### 1. 启用硬件加速
```typescript
const animation = animationManager.createAnimation(element, {
  type: 'slideIn',
  useGPU: true, // 启用 GPU 加速
  willChange: 'transform' // 提示浏览器优化
})
```

### 2. 批量动画
```typescript
// 批量创建动画，减少重排重绘
const elements = document.querySelectorAll('.item')
animationManager.batchAnimate(elements, {
  type: 'fadeIn',
  stagger: 100 // 每个元素延迟 100ms
})
```

### 3. 性能监控
```typescript
import { PerformanceMonitor } from '@ldesign/animation'

const monitor = new PerformanceMonitor()
monitor.startMonitoring()

// 获取性能数据
const stats = monitor.getStats()
console.log('FPS:', stats.fps)
console.log('Memory:', stats.memory)
```

## 🔧 配置选项

```typescript
interface AnimationConfig {
  type: AnimationType
  duration?: number // 动画时长 (ms)
  delay?: number // 延迟时间 (ms)
  easing?: string // 缓动函数
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number // 移动距离 (px)
  rotation?: number // 旋转角度 (deg)
  scale?: number // 缩放比例
  useGPU?: boolean // 是否使用 GPU 加速
  willChange?: string // CSS will-change 属性
  onStart?: () => void // 开始回调
  onComplete?: () => void // 完成回调
  onUpdate?: (progress: number) => void // 更新回调
}
```

## 📱 响应式设计

```typescript
// 根据屏幕尺寸调整动画
const isMobile = window.innerWidth < 768

const animation = animationManager.createAnimation(element, {
  type: 'slideIn',
  duration: isMobile ? 200 : 300, // 移动端更快
  distance: isMobile ? 20 : 50 // 移动端距离更短
})
```

## 🎨 自定义动画

```typescript
// 创建自定义关键帧动画
const customAnimation = animationManager.createKeyframeAnimation(element, {
  keyframes: [
    { transform: 'translateX(0) scale(1)', opacity: 1 },
    { transform: 'translateX(50px) scale(1.1)', opacity: 0.8 },
    { transform: 'translateX(0) scale(1)', opacity: 1 }
  ],
  duration: 600,
  easing: 'ease-in-out'
})
```

## 🔗 更多资源

- [完整文档](./docs/index.md)
- [API 参考](./docs/api/animation-manager.md)
- [示例项目](./examples/)
- [性能指南](./docs/guide/performance.md)
- [最佳实践](./docs/guide/best-practices.md)

## 💡 提示

1. **优先使用 CSS 动画**：对于简单的动画，CSS 动画性能更好
2. **避免同时运行过多动画**：建议同时运行的动画不超过 10 个
3. **使用 transform 和 opacity**：这些属性不会触发重排，性能最佳
4. **及时清理动画**：完成后记得清理动画实例，避免内存泄漏
5. **测试性能**：在目标设备上测试动画性能，确保流畅运行

开始创建令人惊艳的动画效果吧！🎉