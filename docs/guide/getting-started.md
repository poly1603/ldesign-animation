# 快速开始

## 安装

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

## 第一个动画

创建你的第一个动画非常简单：

```typescript
import { to } from '@ldesign/animation'

// 动画到目标值
to('.box', { 
  x: 100, 
  y: 50, 
  opacity: 0.5 
}, { 
  duration: 1000 
})
```

## 核心概念

### 1. 动画目标 (Target)

动画目标可以是：
- CSS 选择器字符串: `'.box'`, `'#element'`
- DOM 元素: `document.querySelector('.box')`
- DOM 元素数组: `[element1, element2]`

```typescript
// CSS 选择器
to('.box', { x: 100 })

// DOM 元素
const element = document.querySelector('.box')
to(element, { x: 100 })

// 多个元素
to([element1, element2], { x: 100 })
```

### 2. 动画属性 (Props)

支持的属性类型：

#### Transform 属性（GPU 加速）
```typescript
to('.box', {
  x: 100,           // translateX
  y: 50,            // translateY
  scale: 1.5,       // scale
  rotate: 45,       // rotate
  skewX: 10,        // skewX
})
```

#### 样式属性
```typescript
to('.box', {
  opacity: 0.5,
  backgroundColor: '#ff0000',
  width: '200px',
  borderRadius: '10px'
})
```

#### 自定义属性
```typescript
to({ value: 0 }, {
  value: 100,
  onUpdate: (tween) => {
    console.log(tween.target.value)
  }
})
```

### 3. 动画选项 (Options)

```typescript
to('.box', { x: 100 }, {
  duration: 1000,              // 持续时间（毫秒）
  delay: 500,                  // 延迟（毫秒）
  ease: 'easeInOutQuad',       // 缓动函数
  repeat: 2,                   // 重复次数（-1 表示无限）
  yoyo: true,                  // 往返动画
  onStart: () => {},           // 开始回调
  onUpdate: (tween) => {},     // 更新回调
  onComplete: () => {},        // 完成回调
})
```

## 基础 API

### to() - 动画到目标值

从当前值动画到目标值：

```typescript
import { to } from '@ldesign/animation'

to('.box', { x: 100, opacity: 0.5 }, { duration: 1000 })
```

### from() - 从起始值动画

从指定值动画到当前值：

```typescript
import { from } from '@ldesign/animation'

// 元素从透明度 0 淡入
from('.box', { opacity: 0 }, { duration: 500 })
```

### fromTo() - 从起点到终点

完全控制起点和终点：

```typescript
import { fromTo } from '@ldesign/animation'

fromTo('.box', 
  { x: -100, opacity: 0 },  // 起点
  { x: 100, opacity: 1 },   // 终点
  { duration: 1000 }
)
```

### keyframes() - 关键帧动画

创建多个关键帧的动画：

```typescript
import { keyframes } from '@ldesign/animation'

keyframes('.box', [
  { x: 0, opacity: 0 },      // 0%
  { x: 50, opacity: 0.5 },   // 50%
  { x: 100, opacity: 1 }     // 100%
], { 
  duration: 2000 
})
```

## CSS 预设动画

使用预设的 CSS 动画效果：

```typescript
import { 
  fadeIn, 
  slideInUp, 
  zoomIn, 
  bounceIn 
} from '@ldesign/animation'

// 淡入
fadeIn('.box')

// 从下方滑入
slideInUp('.box', { duration: 800 })

// 放大进入
zoomIn('.box')

// 弹跳进入
bounceIn('.box')
```

查看[所有预设动画](/guide/presets)

## 控制动画

动画返回一个 `Animation` 实例，可以控制播放：

```typescript
const animation = to('.box', { x: 100 })

// 暂停
animation.pause()

// 继续播放
animation.play()

// 重新开始
animation.restart()

// 反向播放
animation.reverse()

// 跳转到指定进度（0-1）
animation.progress(0.5)

// 跳转到指定时间（毫秒）
animation.seek(500)

// 停止并清除
animation.kill()
```

## 缓动函数

内置多种缓动函数：

```typescript
import { to } from '@ldesign/animation'

// 线性
to('.box', { x: 100 }, { ease: 'linear' })

// 二次方
to('.box', { x: 100 }, { ease: 'easeInQuad' })
to('.box', { x: 100 }, { ease: 'easeOutQuad' })
to('.box', { x: 100 }, { ease: 'easeInOutQuad' })

// 三次方
to('.box', { x: 100 }, { ease: 'easeInCubic' })
to('.box', { x: 100 }, { ease: 'easeOutCubic' })
to('.box', { x: 100 }, { ease: 'easeInOutCubic' })

// 弹性
to('.box', { x: 100 }, { ease: 'easeInElastic' })
to('.box', { x: 100 }, { ease: 'easeOutElastic' })

// 回弹
to('.box', { x: 100 }, { ease: 'easeInBack' })
to('.box', { x: 100 }, { ease: 'easeOutBack' })

// 弹跳
to('.box', { x: 100 }, { ease: 'easeOutBounce' })
```

## 下一步

- 了解 [Timeline 时间轴](/guide/timeline) - 编排复杂动画序列
- 探索 [滚动动画](/guide/scroll-animation) - 创建滚动触发效果
- 学习 [物理动画](/guide/physics) - 使用真实的物理模拟
- 查看 [Vue 集成](/guide/vue) 或 [React 集成](/guide/react)

