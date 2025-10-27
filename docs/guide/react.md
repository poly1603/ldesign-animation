# React 集成

`@ldesign/animation` 提供了完整的 React 集成支持。

## 安装

```bash
pnpm add @ldesign/animation
```

React 集成已内置在主包中，无需额外安装。

## Hooks

### useAnimation

创建和控制动画。

```jsx
import { useRef } from 'react'
import { useAnimation } from '@ldesign/animation/react'

function AnimatedBox() {
  const boxRef = useRef(null)
  
  const { play, pause, restart, progress } = useAnimation(
    boxRef,
    { x: 100, rotate: 360 },
    { duration: 1000 }
  )
  
  return (
    <div>
      <div ref={boxRef} className="box" />
      <button onClick={play}>播放</button>
      <button onClick={pause}>暂停</button>
      <button onClick={restart}>重新开始</button>
    </div>
  )
}
```

### useTimeline

创建时间轴动画。

```jsx
import { useRef } from 'react'
import { useTimeline } from '@ldesign/animation/react'

function TimelineDemo() {
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  
  const timeline = useTimeline(() => {
    return (tl) => {
      tl.to(box1.current, { x: 100 })
        .to(box2.current, { y: 50 })
        .to(box3.current, { rotate: 360 })
    }
  })
  
  return (
    <div>
      <div ref={box1} className="box" />
      <div ref={box2} className="box" />
      <div ref={box3} className="box" />
      
      <button onClick={() => timeline.play()}>播放</button>
      <button onClick={() => timeline.pause()}>暂停</button>
    </div>
  )
}
```

### useSpring

创建弹簧动画。

```jsx
import { useRef } from 'react'
import { useSpring, springPresets } from '@ldesign/animation/react'

function SpringButton() {
  const buttonRef = useRef(null)
  
  const spring = useSpring(
    buttonRef,
    'scale',
    1,
    springPresets.bouncy
  )
  
  return (
    <button
      ref={buttonRef}
      onMouseDown={() => spring.setTarget(0.9)}
      onMouseUp={() => spring.setTarget(1)}
      onMouseLeave={() => spring.setTarget(1)}
    >
      点我
    </button>
  )
}
```

### useDraggable

创建可拖拽元素。

```jsx
import { useRef } from 'react'
import { useDraggable } from '@ldesign/animation/react'

function DraggableBox() {
  const boxRef = useRef(null)
  
  const { x, y, isDragging } = useDraggable(boxRef, {
    bounds: 'parent',
    onDragStart: () => console.log('开始拖拽'),
    onDragEnd: () => console.log('结束拖拽')
  })
  
  return (
    <div className="container">
      <div 
        ref={boxRef}
        className={`box ${isDragging ? 'dragging' : ''}`}
      >
        拖我 ({Math.round(x)}, {Math.round(y)})
      </div>
    </div>
  )
}
```

### useGesture

手势识别。

```jsx
import { useRef, useState } from 'react'
import { useGesture } from '@ldesign/animation/react'

function GestureBox() {
  const boxRef = useRef(null)
  const [lastGesture, setLastGesture] = useState('')
  
  const gesture = useGesture(boxRef)
  
  gesture.on('tap', () => setLastGesture('点击'))
  gesture.on('swipe', (e) => setLastGesture(`滑动 ${e.direction}`))
  gesture.on('press', () => setLastGesture('长按'))
  
  return (
    <div>
      <div ref={boxRef} className="box">
        触摸我
      </div>
      <p>最后手势: {lastGesture}</p>
    </div>
  )
}
```

### useScrollTrigger

滚动触发动画。

```jsx
import { useRef, useState } from 'react'
import { useScrollTrigger } from '@ldesign/animation/react'

function ScrollBox() {
  const boxRef = useRef(null)
  const [progress, setProgress] = useState(0)
  
  useScrollTrigger(boxRef, {
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (p) => setProgress(p)
  })
  
  return (
    <div ref={boxRef} className="box">
      进度: {Math.round(progress * 100)}%
    </div>
  )
}
```

### useInView

检测元素是否在视口中。

```jsx
import { useRef } from 'react'
import { useInView } from '@ldesign/animation/react'

function InViewBox() {
  const boxRef = useRef(null)
  const { isInView, hasEntered } = useInView(boxRef, {
    threshold: 0.5
  })
  
  return (
    <div ref={boxRef} className="box">
      {isInView && <p>在视口中</p>}
      {!isInView && <p>不在视口中</p>}
      {hasEntered && <p>已经进入过</p>}
    </div>
  )
}
```

### useParallax

视差效果。

```jsx
import { useRef } from 'react'
import { useParallax } from '@ldesign/animation/react'

function ParallaxBg() {
  const bgRef = useRef(null)
  
  useParallax(bgRef, {
    speed: 0.5
  })
  
  return (
    <div ref={bgRef} className="bg">
      背景（慢速）
    </div>
  )
}
```

### usePerformance

性能监控。

```jsx
import { usePerformance } from '@ldesign/animation/react'

function PerformanceStats() {
  const { fps, frameTime, memoryUsage } = usePerformance()
  
  return (
    <div className="performance-stats">
      <div>FPS: {fps}</div>
      <div>帧时间: {frameTime}ms</div>
      <div>内存: {memoryUsage}MB</div>
    </div>
  )
}
```

## 组件

### AnimatedBox

带动画的盒子组件。

```jsx
import { AnimatedBox } from '@ldesign/animation/react'

function App() {
  return (
    <AnimatedBox
      animate={{ x: 100, rotate: 360 }}
      options={{ duration: 1000, repeat: -1 }}
    >
      动画盒子
    </AnimatedBox>
  )
}
```

### DraggableBox

可拖拽盒子组件。

```jsx
import { DraggableBox } from '@ldesign/animation/react'

function App() {
  const handleDragEnd = (e) => {
    console.log('拖拽结束', e)
  }
  
  return (
    <DraggableBox
      bounds={{ left: 0, right: 500, top: 0, bottom: 300 }}
      inertia={true}
      onDragEnd={handleDragEnd}
    >
      拖我
    </DraggableBox>
  )
}
```

## 实战示例

### 示例 1：动画列表

```jsx
import { useEffect } from 'react'
import { stagger } from '@ldesign/animation'

function AnimatedList() {
  const items = [
    { id: 1, text: '项目 1' },
    { id: 2, text: '项目 2' },
    { id: 3, text: '项目 3' }
  ]
  
  useEffect(() => {
    stagger('.item',
      { x: 0, opacity: 1 },
      { duration: 500 },
      100
    )
  }, [])
  
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="item"
          style={{ opacity: 0, transform: 'translateX(-50px)' }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
```

### 示例 2：交互式卡片

```jsx
import { useRef } from 'react'
import { useAnimation, useDraggable } from '@ldesign/animation/react'

function InteractiveCard() {
  const cardRef = useRef(null)
  
  const scaleUp = useAnimation(
    cardRef,
    { scale: 1.1 },
    { duration: 200 }
  )
  
  const scaleDown = useAnimation(
    cardRef,
    { scale: 1 },
    { duration: 200 }
  )
  
  useDraggable(cardRef, {
    bounds: 'parent',
    onDragStart: () => scaleUp.play(),
    onDragEnd: () => scaleDown.play()
  })
  
  return (
    <div className="container">
      <div ref={cardRef} className="card">
        拖动我
      </div>
    </div>
  )
}
```

### 示例 3：路由过渡

```jsx
import { useState, useRef, useEffect } from 'react'
import { useTimeline } from '@ldesign/animation/react'

function PageTransition() {
  const [currentPage, setCurrentPage] = useState('home')
  const pageRef = useRef(null)
  
  const timeline = useTimeline()
  
  useEffect(() => {
    // 页面过渡动画
    if (pageRef.current) {
      timeline.clear()
        .to('.page-old', { x: -100, opacity: 0 }, 0)
        .from('.page-new', { x: 100, opacity: 0 }, 0.3)
        .play()
    }
  }, [currentPage])
  
  return (
    <div ref={pageRef}>
      {currentPage === 'home' && (
        <div className="page-new">首页</div>
      )}
      {currentPage === 'about' && (
        <div className="page-new">关于</div>
      )}
      
      <nav>
        <button onClick={() => setCurrentPage('home')}>首页</button>
        <button onClick={() => setCurrentPage('about')}>关于</button>
      </nav>
    </div>
  )
}
```

### 示例 4：滚动动画网站

```jsx
import { useRef } from 'react'
import { useScrollTrigger } from '@ldesign/animation/react'
import { fadeIn, slideInLeft } from '@ldesign/animation'

function ScrollWebsite() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const pricingRef = useRef(null)
  
  useScrollTrigger(heroRef, {
    start: 'top bottom',
    onEnter: () => fadeIn(heroRef.current)
  })
  
  useScrollTrigger(featuresRef, {
    start: 'top bottom',
    onEnter: () => slideInLeft(featuresRef.current)
  })
  
  useScrollTrigger(pricingRef, {
    start: 'top bottom',
    onEnter: () => slideInLeft(pricingRef.current)
  })
  
  return (
    <div className="website">
      <section ref={heroRef} className="hero">
        <h1>欢迎</h1>
      </section>
      
      <section ref={featuresRef} className="features">
        <h2>特性</h2>
      </section>
      
      <section ref={pricingRef} className="pricing">
        <h2>价格</h2>
      </section>
    </div>
  )
}
```

### 示例 5：计数器动画

```jsx
import { useRef, useEffect, useState } from 'react'
import { to } from '@ldesign/animation'

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef({ value: 0 })
  
  useEffect(() => {
    to(counterRef.current, {
      value: target
    }, {
      duration: 2000,
      ease: 'easeOutQuad',
      onUpdate: () => {
        setCount(Math.floor(counterRef.current.value))
      }
    })
  }, [target])
  
  return (
    <div className="counter">
      {count}
    </div>
  )
}
```

### 示例 6：模态框

```jsx
import { useRef, useState, useEffect } from 'react'
import { fadeIn, fadeOut, zoomIn, zoomOut } from '@ldesign/animation'
import { createTimeline } from '@ldesign/animation'

function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return
    
    if (isOpen) {
      const tl = createTimeline()
      tl.add(fadeIn(overlayRef.current, { duration: 200 }))
        .add(zoomIn(modalRef.current, { duration: 300 }), '-=0.1')
        .play()
    } else {
      const tl = createTimeline()
      tl.add(zoomOut(modalRef.current, { duration: 200 }))
        .add(fadeOut(overlayRef.current, { duration: 200 }), '-=0.1')
        .play()
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <>
      <div ref={overlayRef} className="overlay" onClick={onClose} />
      <div ref={modalRef} className="modal">
        {children}
      </div>
    </>
  )
}
```

### 示例 7：进度条

```jsx
import { useRef, useEffect } from 'react'
import { to } from '@ldesign/animation'

function ProgressBar({ progress }) {
  const barRef = useRef(null)
  
  useEffect(() => {
    if (barRef.current) {
      to(barRef.current, {
        scaleX: progress / 100
      }, {
        duration: 300,
        ease: 'easeOutQuad'
      })
    }
  }, [progress])
  
  return (
    <div className="progress-container">
      <div
        ref={barRef}
        className="progress-bar"
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}
```

### 示例 8：无限滚动加载

```jsx
import { useRef, useEffect, useState } from 'react'
import { useInView } from '@ldesign/animation/react'
import { pulse } from '@ldesign/animation'

function InfiniteScroll() {
  const [items, setItems] = useState([1, 2, 3])
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef(null)
  
  const { isInView } = useInView(loaderRef, {
    threshold: 0.5
  })
  
  useEffect(() => {
    if (isInView && !loading) {
      setLoading(true)
      
      // 加载动画
      if (loaderRef.current) {
        pulse(loaderRef.current, { repeat: -1 })
      }
      
      // 模拟加载
      setTimeout(() => {
        setItems(prev => [...prev, prev.length + 1, prev.length + 2])
        setLoading(false)
      }, 1000)
    }
  }, [isInView, loading])
  
  return (
    <div>
      {items.map(item => (
        <div key={item} className="item">
          项目 {item}
        </div>
      ))}
      
      <div ref={loaderRef} className="loader">
        {loading && '加载中...'}
      </div>
    </div>
  )
}
```

## TypeScript 支持

所有 React hooks 和组件都有完整的类型定义：

```typescript
import type { AnimationOptions, SpringConfig } from '@ldesign/animation'
import { useAnimation, useSpring } from '@ldesign/animation/react'

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

## 与状态管理集成

### Redux

```jsx
import { useSelector } from 'react-redux'
import { useAnimation } from '@ldesign/animation/react'

function AnimatedComponent() {
  const boxRef = useRef(null)
  const position = useSelector(state => state.position)
  
  const animation = useAnimation(
    boxRef,
    { x: position.x, y: position.y },
    { duration: 500 }
  )
  
  useEffect(() => {
    animation.play()
  }, [position])
  
  return <div ref={boxRef} className="box" />
}
```

### Zustand

```jsx
import { useStore } from './store'
import { useAnimation } from '@ldesign/animation/react'

function AnimatedComponent() {
  const boxRef = useRef(null)
  const position = useStore(state => state.position)
  
  const animation = useAnimation(
    boxRef,
    { x: position.x, y: position.y },
    { duration: 500 }
  )
  
  useEffect(() => {
    animation.play()
  }, [position])
  
  return <div ref={boxRef} className="box" />
}
```

## 最佳实践

### ✅ 推荐

```jsx
// 使用 hooks 管理动画
const { play, pause } = useAnimation(ref, props, options)

// 在 useEffect 中初始化
useEffect(() => {
  play()
}, [])

// 清理动画
useEffect(() => {
  const animation = to('.box', { x: 100 })
  return () => animation.kill()
}, [])

// 使用 ref 而不是直接操作 DOM
const boxRef = useRef(null)
```

### ❌ 避免

```jsx
// 避免在 render 中创建动画
function Component() {
  to('.box', { x: 100 })  // 不推荐
  return <div className="box" />
}

// 避免忘记清理
useEffect(() => {
  const animation = to('.box', { x: 100 })
  // 忘记返回清理函数
}, [])

// 避免直接操作 DOM
const element = document.querySelector('.box')  // 不推荐
```

## 下一步

- 查看 [Vue 集成](/guide/vue)
- 浏览 [React 示例](/examples/react)
- 学习 [性能优化](/guide/performance)

