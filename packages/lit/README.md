# @ldesign/animation-lit

> 🎨 LDesign 动画库 Lit 集成 - 提供 Web Components 和指令

## ✨ 特性

- 🧩 **Web Components** - 标准的 Web 组件
- 🎨 **Lit 指令** - 强大的指令系统
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 📦 **轻量级** - 按需加载
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-lit lit
```

## 🚀 快速开始

### 使用 Web Components

```typescript
import '@ldesign/animation-lit/components'

// 在 HTML 中使用
<ld-motion
  initial='{"opacity": 0, "y": 50}'
  animate='{"opacity": 1, "y": 0}'
  transition='{"duration": 1000}'
>
  <div>动画内容</div>
</ld-motion>
```

### 使用指令

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

## 📚 API 文档

### Web Components

#### `<ld-motion>`

运动组件。

**属性:**
- `initial`: 初始状态（JSON 字符串）
- `animate`: 动画目标状态
- `transition`: 过渡配置

#### `<ld-transition>`

过渡组件。

### 指令

#### `animate(options)`

动画指令。

#### `motion(config)`

运动指令。

#### `scroll(options)`

滚动触发指令。

## 📄 许可证

MIT License © 2024 LDesign Team


