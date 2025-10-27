# 安装

## 包管理器安装

使用你喜欢的包管理器安装 `@ldesign/animation`:

::: code-group

```bash [npm]
npm install @ldesign/animation
```

```bash [pnpm]
pnpm add @ldesign/animation
```

```bash [yarn]
yarn add @ldesign/animation
```

:::

## CDN 引入

你也可以通过 CDN 直接在浏览器中使用：

```html
<!-- 最新版本 -->
<script src="https://unpkg.com/@ldesign/animation"></script>

<!-- 指定版本 -->
<script src="https://unpkg.com/@ldesign/animation@0.2.0"></script>

<!-- 使用 -->
<script>
  const { to, fadeIn } = LDesignAnimation
  
  to('.box', { x: 100 })
  fadeIn('.element')
</script>
```

## TypeScript 支持

`@ldesign/animation` 使用 TypeScript 编写，包含完整的类型定义。无需额外安装 `@types` 包。

```typescript
import { to, AnimationOptions, EasingFunction } from '@ldesign/animation'

const options: AnimationOptions = {
  duration: 1000,
  ease: 'easeInOutQuad'
}

to('.box', { x: 100 }, options)
```

## 框架集成

### Vue 3

如果你使用 Vue 3，可以额外使用 Vue 集成包：

```typescript
import { createApp } from 'vue'
import { AnimatedBox, FadeTransition, vAnimate } from '@ldesign/animation/vue'

const app = createApp(App)

// 注册组件
app.component('AnimatedBox', AnimatedBox)
app.component('FadeTransition', FadeTransition)

// 注册指令
app.directive('animate', vAnimate)
```

### React

如果你使用 React，可以额外使用 React 集成包：

```typescript
import { AnimatedBox } from '@ldesign/animation/react'
import { useAnimation } from '@ldesign/animation/react'
```

## 按需引入

`@ldesign/animation` 支持 Tree-shaking，你可以只引入需要的功能：

```typescript
// 只引入核心动画
import { to, from, fromTo } from '@ldesign/animation'

// 只引入 CSS 预设
import { fadeIn, slideInUp } from '@ldesign/animation'

// 只引入 Timeline
import { createTimeline } from '@ldesign/animation'

// 只引入物理动画
import { spring, inertia } from '@ldesign/animation'
```

## 兼容性

### 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### 所需特性

`@ldesign/animation` 依赖以下浏览器特性：

- `requestAnimationFrame`
- `WeakMap`
- `Proxy`
- `IntersectionObserver` (滚动动画)
- `ResizeObserver` (性能监控)

### Polyfills

如果需要支持旧浏览器，你可能需要添加 polyfills：

```bash
npm install intersection-observer resize-observer-polyfill
```

```typescript
import 'intersection-observer'
import 'resize-observer-polyfill'
```

## 开发环境设置

### Vite

无需额外配置，开箱即用：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 不需要特殊配置
})
```

### Webpack

无需额外配置，开箱即用：

```javascript
// webpack.config.js
module.exports = {
  // 不需要特殊配置
}
```

### Rollup

无需额外配置，开箱即用：

```javascript
// rollup.config.js
export default {
  // 不需要特殊配置
}
```

## 验证安装

创建一个简单的测试来验证安装：

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background: #3498db;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  
  <script type="module">
    import { to } from '@ldesign/animation'
    
    to('.box', { 
      x: 200, 
      rotate: 360 
    }, { 
      duration: 2000 
    })
  </script>
</body>
</html>
```

如果看到蓝色方块移动并旋转，说明安装成功！🎉

## 下一步

- 查看[快速开始](/guide/getting-started)学习基础用法
- 阅读[核心概念](/guide/concepts)了解设计理念
- 浏览[示例](/examples/basic)获取灵感

