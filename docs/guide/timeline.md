# Timeline 时间轴

Timeline 让你可以轻松编排复杂的动画序列，类似 GSAP 的 Timeline。

## 基础用法

### 创建 Timeline

```typescript
import { createTimeline } from '@ldesign/animation'

const tl = createTimeline()
```

### 添加动画

使用 `.to()`, `.from()`, `.fromTo()` 方法添加动画：

```typescript
const tl = createTimeline()

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
  .to('.box3', { rotate: 360 })

tl.play()
```

默认情况下，动画按顺序执行。

## 时间控制

### 相对位置

使用相对位置字符串控制动画开始时机：

```typescript
const tl = createTimeline()

// 依次执行
tl.to('.box1', { x: 100 })              // 0s 开始
  .to('.box2', { y: 50 })               // 前一个结束后开始
  .to('.box3', { rotate: 360 })         // 前一个结束后开始

// 同时执行
tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 }, '<')          // 与前一个同时开始
  .to('.box3', { rotate: 360 }, '<')    // 与前一个同时开始

// 重叠执行
tl.to('.box1', { x: 100 })              // 1s 持续时间
  .to('.box2', { y: 50 }, '-=0.5')     // 提前 0.5s 开始（0.5s 时）
  .to('.box3', { rotate: 360 }, '+=0.2') // 延后 0.2s 开始
```

### 绝对位置

指定精确的开始时间（秒）：

```typescript
const tl = createTimeline()

tl.to('.box1', { x: 100 }, 0)           // 0s 开始
  .to('.box2', { y: 50 }, 1)            // 1s 开始
  .to('.box3', { rotate: 360 }, 1.5)    // 1.5s 开始
```

### 时间标签

使用标签标记重要时间点：

```typescript
const tl = createTimeline()

tl.addLabel('start')
  .to('.box1', { x: 100 })
  .addLabel('middle')
  .to('.box2', { y: 50 })
  .addLabel('end')
  .to('.box3', { rotate: 360 })

// 跳转到标签位置
tl.play('middle')
```

## 播放控制

### 基本控制

```typescript
const tl = createTimeline()

// 播放
tl.play()

// 暂停
tl.pause()

// 继续播放
tl.resume()

// 重新开始
tl.restart()

// 反向播放
tl.reverse()

// 停止并清除
tl.kill()
```

### 进度控制

```typescript
// 设置进度（0-1）
tl.progress(0.5)  // 跳转到 50%

// 获取进度
const progress = tl.progress()

// 跳转到指定时间（秒）
tl.seek(1.5)

// 获取当前时间
const time = tl.time()

// 获取总时长
const duration = tl.duration()
```

### 播放速度

```typescript
// 设置播放速度
tl.timeScale(2)    // 2倍速
tl.timeScale(0.5)  // 0.5倍速（慢放）
tl.timeScale(-1)   // 反向播放

// 获取播放速度
const speed = tl.timeScale()
```

## 回调函数

```typescript
const tl = createTimeline({
  onStart: () => {
    console.log('Timeline 开始')
  },
  
  onUpdate: (tl) => {
    console.log('进度:', tl.progress())
  },
  
  onComplete: () => {
    console.log('Timeline 完成')
  },
  
  onRepeat: () => {
    console.log('Timeline 重复')
  }
})
```

## 重复和往返

```typescript
const tl = createTimeline({
  repeat: 2,      // 重复 2 次
  repeat: -1,     // 无限循环
  yoyo: true      // 往返播放
})

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })
```

## 嵌套 Timeline

Timeline 可以嵌套使用：

```typescript
const tl1 = createTimeline()
tl1.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })

const tl2 = createTimeline()
tl2.to('.box3', { rotate: 360 })
  .to('.box4', { scale: 1.5 })

// 主 Timeline
const mainTl = createTimeline()
mainTl.add(tl1)
  .add(tl2, '-=0.5')  // 提前 0.5s 开始
```

## 实战示例

### 示例 1：加载动画

```typescript
import { createTimeline } from '@ldesign/animation'

function createLoadingAnimation() {
  const tl = createTimeline({ repeat: -1 })
  
  tl.to('.dot1', { y: -20 }, 0)
    .to('.dot1', { y: 0 }, 0.3)
    
  tl.to('.dot2', { y: -20 }, 0.1)
    .to('.dot2', { y: 0 }, 0.4)
    
  tl.to('.dot3', { y: -20 }, 0.2)
    .to('.dot3', { y: 0 }, 0.5)
  
  return tl
}

const loading = createLoadingAnimation()
loading.play()
```

### 示例 2：卡片入场

```typescript
function animateCards() {
  const tl = createTimeline()
  
  // 容器淡入
  tl.from('.container', { opacity: 0 })
  
  // 卡片依次滑入
  tl.from('.card1', { x: -100, opacity: 0 }, '-=0.3')
    .from('.card2', { x: -100, opacity: 0 }, '-=0.2')
    .from('.card3', { x: -100, opacity: 0 }, '-=0.2')
  
  // 标题放大
  tl.from('.title', { scale: 0 }, '-=0.3')
  
  return tl
}

animateCards().play()
```

### 示例 3：页面转场

```typescript
function pageTransition(fromPage: string, toPage: string) {
  const tl = createTimeline()
  
  // 淡出旧页面
  tl.to(fromPage, { 
    opacity: 0, 
    x: -100 
  })
  
  // 淡入新页面
  tl.from(toPage, { 
    opacity: 0, 
    x: 100 
  }, '-=0.3')
  
  return tl
}

pageTransition('.page1', '.page2').play()
```

### 示例 4：复杂序列

```typescript
function complexAnimation() {
  const tl = createTimeline()
  
  tl.addLabel('start')
  
  // 背景动画
  tl.to('.bg', { 
    scale: 1.2, 
    opacity: 0.5 
  })
  
  tl.addLabel('content')
  
  // 内容入场（并行）
  tl.from('.header', { y: -50, opacity: 0 }, 'content')
    .from('.sidebar', { x: -50, opacity: 0 }, 'content')
    .from('.main', { y: 50, opacity: 0 }, 'content')
  
  tl.addLabel('details')
  
  // 细节动画（依次）
  tl.from('.item1', { scale: 0 }, 'details')
    .from('.item2', { scale: 0 }, '-=0.2')
    .from('.item3', { scale: 0 }, '-=0.2')
  
  tl.addLabel('end')
  
  return tl
}

const anim = complexAnimation()
anim.play()

// 跳转到特定阶段
anim.play('details')
```

## 高级技巧

### 动态修改

```typescript
const tl = createTimeline()

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })

// 在运行时添加动画
tl.to('.box3', { rotate: 360 }, 1.5)

// 清除所有动画
tl.clear()
```

### 状态查询

```typescript
// 是否正在播放
const isActive = tl.isActive()

// 是否暂停
const isPaused = tl.paused()

// 是否已完成
const isComplete = tl.progress() === 1
```

### 性能优化

```typescript
const tl = createTimeline({
  // 使用 RAF 节流
  autoRemoveChildren: true,  // 自动移除完成的动画
  smoothChildTiming: true,   // 平滑子动画时序
})
```

## 与其他功能结合

### 与 CSS 预设结合

```typescript
import { fadeIn, slideInUp, zoomIn } from '@ldesign/animation'

const tl = createTimeline()

tl.add(fadeIn('.box1'))
  .add(slideInUp('.box2'), '-=0.3')
  .add(zoomIn('.box3'), '-=0.3')
```

### 与物理动画结合

```typescript
import { spring } from '@ldesign/animation'

const tl = createTimeline()

tl.to('.box1', { x: 100 })
  .add(spring('.box2', 'x', 100))  // 弹簧动画
```

### 与滚动动画结合

```typescript
import { createScrollTrigger } from '@ldesign/animation'

const tl = createTimeline({ paused: true })

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 })

createScrollTrigger('.trigger', {
  onEnter: () => tl.play(),
  onLeave: () => tl.reverse()
})
```

## 调试 Timeline

```typescript
const tl = createTimeline()

// 打印所有子动画
console.log(tl.getChildren())

// 打印所有标签
console.log(tl.labels())

// 打印时间信息
console.log('时长:', tl.duration())
console.log('当前时间:', tl.time())
console.log('进度:', tl.progress())
```

## 最佳实践

### ✅ 推荐

```typescript
// 使用标签组织复杂序列
const tl = createTimeline()
tl.addLabel('intro')
  .to('.box1', { x: 100 })
  .addLabel('main')
  .to('.box2', { y: 50 })

// 使用相对位置创建重叠
tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 }, '-=0.5')

// 返回 Timeline 以便链式调用
function createAnimation() {
  return createTimeline()
    .to('.box1', { x: 100 })
    .to('.box2', { y: 50 })
}
```

### ❌ 避免

```typescript
// 避免过深的嵌套
const tl1 = createTimeline()
const tl2 = createTimeline()
const tl3 = createTimeline()
tl1.add(tl2.add(tl3))  // 难以维护

// 避免在循环中创建 Timeline
for (let i = 0; i < 100; i++) {
  createTimeline().to('.box', { x: i })
}

// 避免忘记播放
const tl = createTimeline()
tl.to('.box', { x: 100 })
// 忘记调用 tl.play()
```

## 下一步

- 探索 [CSS 预设动画](/guide/presets)
- 学习 [滚动动画](/guide/scroll-animation)
- 查看 [Timeline 示例](/examples/timeline)

