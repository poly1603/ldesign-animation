---
layout: home

hero:
  name: "@ldesign/animation"
  text: "完整的动画库"
  tagline: 高性能、类型安全、功能丰富的前端动画解决方案
  image:
    src: /logo.svg
    alt: LDesign Animation
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看示例
      link: /examples/basic
    - theme: alt
      text: GitHub
      link: https://github.com/ldesign/animation

features:
  - icon: 🚀
    title: 高性能
    details: 基于 RAF 的动画引擎，GPU 加速，优化的内存管理，确保流畅的 60fps
    
  - icon: 📦
    title: 轻量级
    details: 核心 < 20KB，零外部依赖，按需引入，Tree-shaking 友好
    
  - icon: 🎯
    title: 类型安全
    details: 完整的 TypeScript 类型定义，智能提示，编译时类型检查
    
  - icon: 🎨
    title: 丰富预设
    details: 20+ CSS 动画预设，开箱即用，满足常见动画需求
    
  - icon: ⏱️
    title: Timeline 时间轴
    details: GSAP 风格的时间轴系统，轻松编排复杂的动画序列
    
  - icon: 📜
    title: 滚动触发
    details: 强大的 ScrollTrigger 系统，轻松实现视差和滚动动画效果
    
  - icon: 🎾
    title: 物理动画
    details: 真实的弹簧和惯性物理模拟，自然流畅的交互体验
    
  - icon: 👆
    title: 手势支持
    details: 完整的手势识别系统，支持拖拽、点击、滑动、捏合等
    
  - icon: 🖼️
    title: SVG 动画
    details: 路径描边、形状变形、路径跟随等专业的 SVG 动画能力
    
  - icon: 🔄
    title: 过渡效果
    details: 页面过渡、FLIP 列表动画，提升用户体验的流畅过渡
    
  - icon: ✨
    title: 高级效果
    details: 视差滚动、粒子系统、文字动画等丰富的高级视觉效果
    
  - icon: 🌍
    title: 框架集成
    details: 完善的 Vue 和 React 集成，组件、Hooks、指令开箱即用
---

## 快速预览

```typescript
import { to, fadeIn, createTimeline } from '@ldesign/animation'

// 基础动画
to('.box', { x: 100, opacity: 0.5 }, { duration: 1000 })

// CSS 预设
fadeIn('.element')

// Timeline 序列
const tl = createTimeline()
tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
  .to('.box3', { rotate: 360 })
```

## 为什么选择 @ldesign/animation?

### 🎯 专业级性能

- **GPU 加速**: 自动使用 transform 和 opacity 属性
- **智能优化**: will-change 自动管理，批量 DOM 操作
- **内存安全**: WeakMap 管理，无内存泄漏
- **自适应**: 根据设备性能自动调整动画质量

### 💡 开发体验优先

- **类型安全**: 完整的 TypeScript 支持
- **智能提示**: IDE 友好的 API 设计
- **调试工具**: 内置性能监控和调试面板
- **错误提示**: 清晰的错误信息和警告

### 🎨 功能全面

从简单的 CSS 动画到复杂的物理模拟，从滚动触发到手势交互，一个库满足所有动画需求。

## 性能基准

| 场景 | 性能 | 说明 |
|------|------|------|
| 100 个元素同时动画 | 55-60 FPS | ✅ 流畅 |
| 复杂 Timeline (20个动画) | 60 FPS | ✅ 完美 |
| 滚动触发 (100个元素) | 60 FPS | ✅ 流畅 |
| 内存占用 (1000个动画) | ~150MB | ✅ 优秀 |

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开源协议

[MIT License](https://github.com/ldesign/animation/blob/main/LICENSE) © LDesign Team

