# CSS 预设动画

`@ldesign/animation` 提供了 20+ 个预设 CSS 动画效果，开箱即用。

## 淡入淡出

### fadeIn / fadeOut

元素淡入淡出效果。

```typescript
import { fadeIn, fadeOut } from '@ldesign/animation'

// 淡入
fadeIn('.box')

// 淡出
fadeOut('.box')

// 自定义选项
fadeIn('.box', {
  duration: 800,
  delay: 200,
  onComplete: () => console.log('完成')
})
```

<div class="demo">
  <button @click="demoFadeIn">淡入</button>
  <button @click="demoFadeOut">淡出</button>
  <div class="demo-box">Box</div>
</div>

## 滑动

### slideIn / slideOut

元素从各个方向滑入滑出。

```typescript
import { 
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideOutUp,
  slideOutDown,
  slideOutLeft,
  slideOutRight
} from '@ldesign/animation'

// 从下方滑入
slideInUp('.box')

// 向上滑出
slideOutUp('.box')

// 从左侧滑入
slideInLeft('.box', { duration: 600 })
```

<div class="demo">
  <div class="demo-controls">
    <button @click="demoSlideInUp">↑ 上</button>
    <button @click="demoSlideInDown">↓ 下</button>
    <button @click="demoSlideInLeft">← 左</button>
    <button @click="demoSlideInRight">→ 右</button>
  </div>
  <div class="demo-box">Box</div>
</div>

## 缩放

### zoomIn / zoomOut

元素缩放进入和退出。

```typescript
import { zoomIn, zoomOut } from '@ldesign/animation'

// 放大进入
zoomIn('.box')

// 缩小退出
zoomOut('.box')

// 从小到大
zoomIn('.box', { 
  duration: 500,
  ease: 'easeOutBack' 
})
```

<div class="demo">
  <button @click="demoZoomIn">放大进入</button>
  <button @click="demoZoomOut">缩小退出</button>
  <div class="demo-box">Box</div>
</div>

## 翻转

### flipIn / flipOut

3D 翻转效果。

```typescript
import { 
  flipInX,
  flipOutX,
  flipInY,
  flipOutY
} from '@ldesign/animation'

// 水平翻转进入
flipInX('.box')

// 垂直翻转进入
flipInY('.box')

// 水平翻转退出
flipOutX('.box', { duration: 600 })
```

<div class="demo">
  <button @click="demoFlipInX">水平翻转</button>
  <button @click="demoFlipInY">垂直翻转</button>
  <div class="demo-box">Box</div>
</div>

## 弹跳

### bounceIn / bounceOut

弹跳效果。

```typescript
import { bounceIn, bounceOut } from '@ldesign/animation'

// 弹跳进入
bounceIn('.box')

// 弹跳退出
bounceOut('.box', { duration: 800 })
```

<div class="demo">
  <button @click="demoBounceIn">弹跳进入</button>
  <button @click="demoBounceOut">弹跳退出</button>
  <div class="demo-box">Box</div>
</div>

## 旋转

### rotateIn / rotateOut

旋转进入和退出。

```typescript
import { rotateIn, rotateOut } from '@ldesign/animation'

// 旋转进入
rotateIn('.box')

// 旋转退出
rotateOut('.box', { 
  duration: 600,
  ease: 'easeInOutCubic' 
})
```

<div class="demo">
  <button @click="demoRotateIn">旋转进入</button>
  <button @click="demoRotateOut">旋转退出</button>
  <div class="demo-box">Box</div>
</div>

## 特殊效果

### heartbeat - 心跳

```typescript
import { heartbeat } from '@ldesign/animation'

heartbeat('.notification', {
  repeat: 3,
  duration: 500
})
```

### shake - 摇晃

```typescript
import { shake } from '@ldesign/animation'

shake('.alert', {
  duration: 600
})
```

### wobble - 晃动

```typescript
import { wobble } from '@ldesign/animation'

wobble('.box', {
  duration: 800
})
```

### flash - 闪烁

```typescript
import { flash } from '@ldesign/animation'

flash('.button', {
  repeat: 2,
  duration: 500
})
```

### pulse - 脉冲

```typescript
import { pulse } from '@ldesign/animation'

pulse('.badge', {
  repeat: -1,  // 无限循环
  duration: 1000
})
```

### swing - 摆动

```typescript
import { swing } from '@ldesign/animation'

swing('.bell', {
  duration: 800
})
```

### rubberBand - 橡皮筋

```typescript
import { rubberBand } from '@ldesign/animation'

rubberBand('.box', {
  duration: 1000
})
```

### jello - 果冻

```typescript
import { jello } from '@ldesign/animation'

jello('.box', {
  duration: 800
})
```

<div class="demo">
  <div class="demo-grid">
    <button @click="demoHeartbeat">心跳</button>
    <button @click="demoShake">摇晃</button>
    <button @click="demoWobble">晃动</button>
    <button @click="demoFlash">闪烁</button>
    <button @click="demoPulse">脉冲</button>
    <button @click="demoSwing">摆动</button>
    <button @click="demoRubberBand">橡皮筋</button>
    <button @click="demoJello">果冻</button>
  </div>
  <div class="demo-box">Box</div>
</div>

## 自定义选项

所有预设动画都支持自定义选项：

```typescript
import { fadeIn } from '@ldesign/animation'

fadeIn('.box', {
  // 持续时间
  duration: 1000,
  
  // 延迟
  delay: 500,
  
  // 缓动函数
  ease: 'easeOutQuad',
  
  // 重复
  repeat: 2,
  yoyo: true,
  
  // 回调
  onStart: () => console.log('开始'),
  onUpdate: (tween) => console.log('更新', tween.progress()),
  onComplete: () => console.log('完成')
})
```

## 组合使用

### 序列动画

使用 Timeline 组合多个预设：

```typescript
import { createTimeline, fadeIn, slideInUp, zoomIn } from '@ldesign/animation'

const tl = createTimeline()

tl.add(fadeIn('.container'))
  .add(slideInUp('.title'), '-=0.3')
  .add(zoomIn('.content'), '-=0.2')

tl.play()
```

### 批量动画

对多个元素应用相同动画：

```typescript
import { fadeIn } from '@ldesign/animation'

// 批量淡入
fadeIn(['.item1', '.item2', '.item3'])

// 交错动画
import { stagger } from '@ldesign/animation'

stagger('.item', 
  { opacity: 1, y: 0 }, 
  { duration: 500 },
  100  // 每个延迟 100ms
)
```

## 实战示例

### 示例 1：通知消息

```typescript
import { slideInRight, slideOutRight } from '@ldesign/animation'

function showNotification(message: string) {
  const notification = document.createElement('div')
  notification.className = 'notification'
  notification.textContent = message
  document.body.appendChild(notification)
  
  // 滑入
  slideInRight(notification, { duration: 300 })
  
  // 3秒后滑出
  setTimeout(() => {
    slideOutRight(notification, { 
      duration: 300,
      onComplete: () => notification.remove()
    })
  }, 3000)
}
```

### 示例 2：模态框

```typescript
import { fadeIn, zoomIn, fadeOut, zoomOut } from '@ldesign/animation'
import { createTimeline } from '@ldesign/animation'

function openModal() {
  const overlay = document.querySelector('.overlay')
  const modal = document.querySelector('.modal')
  
  const tl = createTimeline()
  
  // 背景淡入 + 模态框放大
  tl.add(fadeIn(overlay, { duration: 200 }))
    .add(zoomIn(modal, { duration: 300 }), '-=0.1')
  
  tl.play()
}

function closeModal() {
  const overlay = document.querySelector('.overlay')
  const modal = document.querySelector('.modal')
  
  const tl = createTimeline()
  
  // 模态框缩小 + 背景淡出
  tl.add(zoomOut(modal, { duration: 200 }))
    .add(fadeOut(overlay, { duration: 200 }), '-=0.1')
  
  tl.play()
}
```

### 示例 3：列表项入场

```typescript
import { slideInUp } from '@ldesign/animation'
import { stagger } from '@ldesign/animation'

function animateList() {
  // 交错滑入
  const items = document.querySelectorAll('.list-item')
  
  items.forEach((item, index) => {
    slideInUp(item, {
      duration: 400,
      delay: index * 100  // 每项延迟 100ms
    })
  })
  
  // 或使用 stagger
  stagger('.list-item',
    { y: 0, opacity: 1 },
    { duration: 400 },
    100
  )
}
```

### 示例 4：加载动画

```typescript
import { pulse, fadeOut } from '@ldesign/animation'

function showLoading() {
  const loader = document.querySelector('.loader')
  
  // 脉冲动画
  const animation = pulse(loader, {
    repeat: -1,
    duration: 1000
  })
  
  return {
    hide: () => {
      // 停止脉冲
      animation.kill()
      
      // 淡出
      fadeOut(loader, { duration: 300 })
    }
  }
}

// 使用
const loading = showLoading()

// 加载完成后
setTimeout(() => {
  loading.hide()
}, 3000)
```

## 性能提示

### ✅ 推荐

```typescript
// 使用 GPU 加速的动画
import { fadeIn, slideInUp, zoomIn } from '@ldesign/animation'

// 批量操作
fadeIn(['.item1', '.item2', '.item3'])

// 使用交错动画而不是循环
stagger('.item', { opacity: 1 }, { duration: 500 }, 100)
```

### ❌ 避免

```typescript
// 避免过多同时动画
for (let i = 0; i < 1000; i++) {
  fadeIn(`.item-${i}`)
}

// 避免在高频事件中触发
window.addEventListener('scroll', () => {
  fadeIn('.box')  // 每次滚动都触发
})
```

## API 参考

所有预设动画的函数签名：

```typescript
function presetAnimation(
  target: AnimationTarget,
  options?: AnimationOptions
): Animation

type AnimationTarget = string | HTMLElement | HTMLElement[]

interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: EasingFunction | string
  repeat?: number
  yoyo?: boolean
  onStart?: () => void
  onUpdate?: (tween: Tween) => void
  onComplete?: () => void
  onRepeat?: () => void
}
```

## 下一步

- 学习 [滚动动画](/guide/scroll-animation)
- 探索 [物理动画](/guide/physics)
- 查看 [更多示例](/examples/basic)

