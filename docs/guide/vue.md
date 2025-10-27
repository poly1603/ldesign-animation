# Vue 集成

`@ldesign/animation` 提供了完整的 Vue 3 集成支持。

## 安装

```bash
pnpm add @ldesign/animation
```

Vue 集成已内置在主包中，无需额外安装。

## Composables

### useAnimation

创建和控制动画。

```vue
<script setup>
import { ref } from 'vue'
import { useAnimation } from '@ldesign/animation/vue'

const boxRef = ref(null)

const { play, pause, restart, progress } = useAnimation(
  boxRef,
  { x: 100, rotate: 360 },
  { duration: 1000 }
)
</script>

<template>
  <div>
    <div ref="boxRef" class="box"></div>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="restart">重新开始</button>
  </div>
</template>
```

### useTimeline

创建时间轴动画。

```vue
<script setup>
import { ref } from 'vue'
import { useTimeline } from '@ldesign/animation/vue'

const box1 = ref(null)
const box2 = ref(null)
const box3 = ref(null)

const timeline = useTimeline()

timeline.value
  .to(box1, { x: 100 })
  .to(box2, { y: 50 })
  .to(box3, { rotate: 360 })

const { play, pause, restart, progress } = timeline
</script>

<template>
  <div>
    <div ref="box1" class="box"></div>
    <div ref="box2" class="box"></div>
    <div ref="box3" class="box"></div>
    
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
  </div>
</template>
```

### useSpring

创建弹簧动画。

```vue
<script setup>
import { ref } from 'vue'
import { useSpring, springPresets } from '@ldesign/animation/vue'

const boxRef = ref(null)

const spring = useSpring(boxRef, 'x', 0, springPresets.bouncy)

function moveTo(x: number) {
  spring.setTarget(x)
}
</script>

<template>
  <div>
    <div ref="boxRef" class="box"></div>
    <button @click="moveTo(100)">移动到 100</button>
    <button @click="moveTo(200)">移动到 200</button>
    <button @click="moveTo(0)">复位</button>
  </div>
</template>
```

### useDraggable

创建可拖拽元素。

```vue
<script setup>
import { ref } from 'vue'
import { useDraggable } from '@ldesign/animation/vue'

const boxRef = ref(null)

const { x, y, isDragging } = useDraggable(boxRef, {
  bounds: 'parent',
  onDragStart: () => console.log('开始拖拽'),
  onDragEnd: () => console.log('结束拖拽')
})
</script>

<template>
  <div class="container">
    <div 
      ref="boxRef" 
      class="box"
      :class="{ dragging: isDragging }"
    >
      拖我 ({{ Math.round(x) }}, {{ Math.round(y) }})
    </div>
  </div>
</template>
```

### useGesture

手势识别。

```vue
<script setup>
import { ref } from 'vue'
import { useGesture } from '@ldesign/animation/vue'

const boxRef = ref(null)
const lastGesture = ref('')

const gesture = useGesture(boxRef)

gesture.on('tap', () => {
  lastGesture.value = '点击'
})

gesture.on('swipe', (e) => {
  lastGesture.value = `滑动 ${e.direction}`
})

gesture.on('press', () => {
  lastGesture.value = '长按'
})
</script>

<template>
  <div>
    <div ref="boxRef" class="box">
      触摸我
    </div>
    <p>最后手势: {{ lastGesture }}</p>
  </div>
</template>
```

### useScrollTrigger

滚动触发动画。

```vue
<script setup>
import { ref } from 'vue'
import { useScrollTrigger } from '@ldesign/animation/vue'

const boxRef = ref(null)
const progress = ref(0)

useScrollTrigger(boxRef, {
  start: 'top bottom',
  end: 'bottom top',
  onUpdate: (p) => {
    progress.value = p
  }
})
</script>

<template>
  <div>
    <div ref="boxRef" class="box">
      进度: {{ Math.round(progress * 100) }}%
    </div>
  </div>
</template>
```

### useInView

检测元素是否在视口中。

```vue
<script setup>
import { ref } from 'vue'
import { useInView } from '@ldesign/animation/vue'

const boxRef = ref(null)
const { isInView, hasEntered } = useInView(boxRef, {
  threshold: 0.5
})
</script>

<template>
  <div>
    <div ref="boxRef" class="box">
      <p v-if="isInView">在视口中</p>
      <p v-else>不在视口中</p>
      <p v-if="hasEntered">已经进入过</p>
    </div>
  </div>
</template>
```

### useParallax

视差效果。

```vue
<script setup>
import { ref } from 'vue'
import { useParallax } from '@ldesign/animation/vue'

const bgRef = ref(null)

useParallax(bgRef, {
  speed: 0.5
})
</script>

<template>
  <div>
    <div ref="bgRef" class="bg">
      背景（慢速）
    </div>
  </div>
</template>
```

### usePerformance

性能监控。

```vue
<script setup>
import { usePerformance } from '@ldesign/animation/vue'

const { fps, frameTime, memoryUsage } = usePerformance()
</script>

<template>
  <div class="performance-stats">
    <div>FPS: {{ fps }}</div>
    <div>帧时间: {{ frameTime }}ms</div>
    <div>内存: {{ memoryUsage }}MB</div>
  </div>
</template>
```

## 组件

### AnimatedBox

带动画的盒子组件。

```vue
<script setup>
import { AnimatedBox } from '@ldesign/animation/vue'
</script>

<template>
  <AnimatedBox
    :animate="{ x: 100, rotate: 360 }"
    :options="{ duration: 1000, repeat: -1 }"
  >
    动画盒子
  </AnimatedBox>
</template>
```

### DraggableBox

可拖拽盒子组件。

```vue
<script setup>
import { DraggableBox } from '@ldesign/animation/vue'

function handleDragEnd(e) {
  console.log('拖拽结束', e)
}
</script>

<template>
  <DraggableBox
    :bounds="{ left: 0, right: 500, top: 0, bottom: 300 }"
    :inertia="true"
    @drag-end="handleDragEnd"
  >
    拖我
  </DraggableBox>
</template>
```

### FadeTransition

淡入淡出过渡组件。

```vue
<script setup>
import { ref } from 'vue'
import { FadeTransition } from '@ldesign/animation/vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">切换</button>
  
  <FadeTransition>
    <div v-if="show" class="box">
      内容
    </div>
  </FadeTransition>
</template>
```

### ScrollReveal

滚动显示组件。

```vue
<script setup>
import { ScrollReveal } from '@ldesign/animation/vue'
</script>

<template>
  <ScrollReveal
    animation="slideInUp"
    :threshold="0.5"
  >
    <div class="content">
      滚动到这里时显示
    </div>
  </ScrollReveal>
</template>
```

## 指令

### v-animate

动画指令。

```vue
<script setup>
import { vAnimate } from '@ldesign/animation/vue'
</script>

<template>
  <!-- 简单动画 -->
  <div v-animate="{ x: 100, rotate: 360 }">
    Box
  </div>
  
  <!-- 带选项 -->
  <div v-animate="{ 
    props: { x: 100, rotate: 360 },
    options: { duration: 1000, repeat: -1 }
  }">
    Box
  </div>
</template>
```

### v-scroll-reveal

滚动显示指令。

```vue
<script setup>
import { vScrollReveal } from '@ldesign/animation/vue'
</script>

<template>
  <div v-scroll-reveal>
    滚动时显示
  </div>
  
  <!-- 自定义动画 -->
  <div v-scroll-reveal="{ animation: 'slideInLeft' }">
    从左滑入
  </div>
</template>
```

### v-parallax

视差指令。

```vue
<script setup>
import { vParallax } from '@ldesign/animation/vue'
</script>

<template>
  <div v-parallax="{ speed: 0.5 }">
    视差背景
  </div>
</template>
```

## 实战示例

### 示例 1：动画列表

```vue
<script setup>
import { ref } from 'vue'
import { useAnimation } from '@ldesign/animation/vue'
import { stagger } from '@ldesign/animation'

const items = ref([
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' }
])

const listRef = ref(null)

onMounted(() => {
  stagger('.item', 
    { x: 0, opacity: 1 },
    { duration: 500 },
    100
  )
})
</script>

<template>
  <div ref="listRef">
    <div 
      v-for="item in items" 
      :key="item.id"
      class="item"
      style="opacity: 0; transform: translateX(-50px)"
    >
      {{ item.text }}
    </div>
  </div>
</template>
```

### 示例 2：交互式卡片

```vue
<script setup>
import { ref } from 'vue'
import { useAnimation, useDraggable } from '@ldesign/animation/vue'

const cardRef = ref(null)

const { play: scaleUp } = useAnimation(
  cardRef,
  { scale: 1.1 },
  { duration: 200 }
)

const { play: scaleDown } = useAnimation(
  cardRef,
  { scale: 1 },
  { duration: 200 }
)

useDraggable(cardRef, {
  bounds: 'parent',
  onDragStart: scaleUp,
  onDragEnd: scaleDown
})
</script>

<template>
  <div class="container">
    <div ref="cardRef" class="card">
      拖动我
    </div>
  </div>
</template>
```

### 示例 3：页面过渡

```vue
<script setup>
import { ref, watch } from 'vue'
import { useTimeline } from '@ldesign/animation/vue'

const currentPage = ref('home')
const pageRef = ref(null)

const timeline = useTimeline()

watch(currentPage, (newPage, oldPage) => {
  // 创建页面过渡动画
  timeline.value
    .clear()
    .to(`.page-${oldPage}`, { x: -100, opacity: 0 }, 0)
    .from(`.page-${newPage}`, { x: 100, opacity: 0 }, 0.3)
    .play()
})
</script>

<template>
  <div ref="pageRef">
    <div v-show="currentPage === 'home'" class="page-home">
      首页
    </div>
    <div v-show="currentPage === 'about'" class="page-about">
      关于
    </div>
    
    <nav>
      <button @click="currentPage = 'home'">首页</button>
      <button @click="currentPage = 'about'">关于</button>
    </nav>
  </div>
</template>
```

### 示例 4：滚动动画网站

```vue
<script setup>
import { ScrollReveal } from '@ldesign/animation/vue'
</script>

<template>
  <div class="website">
    <ScrollReveal animation="fadeIn">
      <section class="hero">
        <h1>欢迎</h1>
      </section>
    </ScrollReveal>
    
    <ScrollReveal animation="slideInLeft">
      <section class="features">
        <h2>特性</h2>
      </section>
    </ScrollReveal>
    
    <ScrollReveal animation="slideInRight">
      <section class="pricing">
        <h2>价格</h2>
      </section>
    </ScrollReveal>
    
    <ScrollReveal animation="slideInUp">
      <section class="footer">
        <p>页脚</p>
      </section>
    </ScrollReveal>
  </div>
</template>
```

### 示例 5：弹簧按钮

```vue
<script setup>
import { ref } from 'vue'
import { useSpring, springPresets } from '@ldesign/animation/vue'

const buttonRef = ref(null)

const spring = useSpring(buttonRef, 'scale', 1, springPresets.bouncy)

function handleMouseDown() {
  spring.setTarget(0.9)
}

function handleMouseUp() {
  spring.setTarget(1)
}
</script>

<template>
  <button
    ref="buttonRef"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    class="spring-button"
  >
    点我
  </button>
</template>
```

## 插件安装

全局注册组件和指令：

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 导入组件和指令
import {
  AnimatedBox,
  DraggableBox,
  FadeTransition,
  ScrollReveal,
  vAnimate,
  vScrollReveal,
  vParallax
} from '@ldesign/animation/vue'

const app = createApp(App)

// 注册组件
app.component('AnimatedBox', AnimatedBox)
app.component('DraggableBox', DraggableBox)
app.component('FadeTransition', FadeTransition)
app.component('ScrollReveal', ScrollReveal)

// 注册指令
app.directive('animate', vAnimate)
app.directive('scroll-reveal', vScrollReveal)
app.directive('parallax', vParallax)

app.mount('#app')
```

或者创建插件：

```typescript
// animation-plugin.ts
import type { Plugin } from 'vue'
import * as components from '@ldesign/animation/vue'

export const AnimationPlugin: Plugin = {
  install(app) {
    // 注册所有组件
    Object.entries(components).forEach(([name, component]) => {
      if (name.startsWith('v')) {
        // 指令
        app.directive(name.slice(1), component)
      } else {
        // 组件
        app.component(name, component)
      }
    })
  }
}

// main.ts
import { AnimationPlugin } from './animation-plugin'

app.use(AnimationPlugin)
```

## TypeScript 支持

所有 Vue composables 和组件都有完整的类型定义：

```typescript
import type { AnimationOptions, SpringConfig } from '@ldesign/animation'
import { useAnimation, useSpring } from '@ldesign/animation/vue'

const animation = useAnimation<HTMLDivElement>(
  ref,
  { x: 100 },
  { duration: 1000 }
)

const spring = useSpring<HTMLDivElement>(
  ref,
  'x',
  0,
  { stiffness: 100, damping: 10 }
)
```

## 最佳实践

### ✅ 推荐

```vue
<script setup>
// 使用 composables 管理动画
const { play, pause } = useAnimation(ref, props, options)

// 使用组件快速开发
<FadeTransition>
  <div v-if="show">内容</div>
</FadeTransition>

// 在 onMounted 中初始化
onMounted(() => {
  play()
})

// 在 onUnmounted 中清理
onUnmounted(() => {
  animation.kill()
})
</script>
```

### ❌ 避免

```vue
<script setup>
// 避免在 setup 中直接操作 DOM
const element = document.querySelector('.box')  // 不推荐

// 避免忘记清理动画
const animation = to('.box', { x: 100 })
// 记得在组件销毁时调用 animation.kill()

// 避免在模板中创建动画
<template>
  <div @click="to('.box', { x: 100 })">  <!-- 不推荐 -->
    Click
  </div>
</template>
</script>
```

## 下一步

- 查看 [React 集成](/guide/react)
- 浏览 [Vue 示例](/examples/vue)
- 学习 [性能优化](/guide/performance)

