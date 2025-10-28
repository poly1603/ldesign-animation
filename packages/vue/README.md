# @ldesign/animation-vue

> 🎨 LDesign 动画库 Vue 3 集成 - 提供组件、指令和组合式函数

## ✨ 特性

- 🎯 **Vue 3 组件** - 开箱即用的动画组件
- 🪝 **组合式函数** - 强大的 Composition API 集成
- 🎨 **自定义指令** - 声明式动画指令
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 📦 **Tree-shaking** - 按需引入，减小打包体积
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-vue
```

## 🚀 快速开始

### 1. 全局注册

```typescript
import { createApp } from 'vue'
import AnimationVue from '@ldesign/animation-vue'
import App from './App.vue'

const app = createApp(App)
app.use(AnimationVue)
app.mount('#app')
```

### 2. 使用组件

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
    <div class="box">动画内容</div>
  </Motion>
</template>
```

### 3. 使用组合式函数

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useAnimate } from '@ldesign/animation-vue'

const target = ref<HTMLElement>()
const { play, pause, restart } = useAnimate(target, {
  translateX: 250,
  rotate: 360,
  duration: 1000,
  easing: 'easeOutExpo'
})
</script>

<template>
  <div>
    <div ref="target" class="box">动画元素</div>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="restart">重播</button>
  </div>
</template>
```

### 4. 使用指令

```vue
<template>
  <div
    v-animate="{
      translateX: 250,
      rotate: 360,
      duration: 1000
    }"
  >
    使用指令的动画
  </div>
</template>
```

## 📚 API 文档

### 组件

#### `<Motion>`

运动组件，支持进入/离开动画。

**Props:**
- `initial`: 初始状态
- `animate`: 动画目标状态
- `exit`: 退出动画状态
- `transition`: 过渡配置
- `hover`: 悬停状态
- `tap`: 点击状态

**示例:**
```vue
<Motion
  :initial="{ opacity: 0, scale: 0.5 }"
  :animate="{ opacity: 1, scale: 1 }"
  :hover="{ scale: 1.1 }"
  :tap="{ scale: 0.9 }"
>
  <button>悬停我</button>
</Motion>
```

#### `<AnimatePresence>`

列表动画组件，处理列表项的添加/移除动画。

**Props:**
- `mode`: 动画模式（'wait' | 'sync' | 'popLayout'）

**示例:**
```vue
<AnimatePresence>
  <Motion
    v-for="item in items"
    :key="item.id"
    :initial="{ opacity: 0, x: -50 }"
    :animate="{ opacity: 1, x: 0 }"
    :exit="{ opacity: 0, x: 50 }"
  >
    {{ item.text }}
  </Motion>
</AnimatePresence>
```

### 组合式函数

#### `useAnimate(target, options)`

创建可控制的动画。

**参数:**
- `target`: 目标元素 ref
- `options`: 动画配置

**返回:**
- `play()`: 播放动画
- `pause()`: 暂停动画
- `restart()`: 重新播放
- `reverse()`: 反向播放
- `seek(time)`: 跳转到指定时间

#### `useTimeline()`

创建时间轴动画序列。

**返回:**
- `timeline`: 时间轴实例
- `add()`: 添加动画
- `play()`: 播放时间轴
- `pause()`: 暂停时间轴

**示例:**
```typescript
const { timeline, add, play } = useTimeline()

add(box1, { x: 100, duration: 1000 })
add(box2, { y: 100, duration: 1000 }, '-=500')

play()
```

#### `useSpring(target, config)`

创建弹簧物理动画。

**参数:**
- `target`: 目标元素 ref
- `config`: 弹簧配置（stiffness, damping, mass）

#### `useScroll(options)`

创建滚动触发动画。

**参数:**
- `trigger`: 触发元素
- `start/end`: 触发位置
- `scrub`: 是否跟随滚动

**返回:**
- `progress`: 滚动进度（0-1）
- `isInView`: 是否在视口内

#### `useGesture(target, config)`

添加手势支持。

**支持的手势:**
- `drag`: 拖拽
- `pinch`: 缩放
- `rotate`: 旋转
- `swipe`: 滑动

### 指令

#### `v-animate`

声明式动画指令。

```vue
<div v-animate="{ x: 100, rotate: 360 }">
  动画元素
</div>
```

#### `v-motion`

增强的动画指令，支持更多选项。

```vue
<div
  v-motion="{
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -50 }
  }"
>
  元素
</div>
```

#### `v-scroll`

滚动触发指令。

```vue
<div
  v-scroll="{
    onEnter: () => console.log('进入'),
    onLeave: () => console.log('离开')
  }"
>
  滚动触发的内容
</div>
```

#### `v-parallax`

视差滚动指令。

```vue
<div v-parallax="0.5">
  视差内容（速度为滚动的 50%）
</div>
```

## 🎯 高级用法

### 时间轴动画序列

```vue
<script setup lang="ts">
import { useTimeline } from '@ldesign/animation-vue'

const box1 = ref<HTMLElement>()
const box2 = ref<HTMLElement>()
const box3 = ref<HTMLElement>()

const { timeline } = useTimeline()

timeline
  .add(box1.value, { x: 100, duration: 1000 })
  .add(box2.value, { y: 100, duration: 1000 }, '-=500')
  .add(box3.value, { rotate: 360, duration: 1000 })

timeline.play()
</script>
```

### 滚动触发动画

```vue
<script setup lang="ts">
import { useScroll } from '@ldesign/animation-vue'

const section = ref<HTMLElement>()
const { progress, isInView } = useScroll({
  trigger: section,
  start: 'top center',
  end: 'bottom center'
})

watch(progress, (value) => {
  console.log('滚动进度:', value)
})
</script>
```

### 手势拖拽

```vue
<script setup lang="ts">
import { useGesture } from '@ldesign/animation-vue'

const box = ref<HTMLElement>()

useGesture(box, {
  drag: {
    bounds: 'parent',
    inertia: true,
    onDrag: (state) => {
      console.log('拖拽位置:', state.offset)
    }
  }
})
</script>
```

## 🔗 相关包

- [@ldesign/animation-core](../core) - 核心动画引擎
- [@ldesign/animation-react](../react) - React 集成
- [@ldesign/animation-lit](../lit) - Lit 集成

## 📄 许可证

MIT License © 2024 LDesign Team


