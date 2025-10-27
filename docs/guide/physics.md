# 物理动画

使用真实的物理模拟创建自然流畅的动画效果。

## 弹簧动画 (Spring)

基于胡克定律的弹簧物理模拟。

### 基础用法

```typescript
import { spring } from '@ldesign/animation'

// 简单弹簧动画
spring('.box', 'x', 100)

// 自定义弹簧参数
spring('.box', 'x', 100, {
  stiffness: 100,   // 刚度
  damping: 10,      // 阻尼
  mass: 1           // 质量
})
```

### 弹簧预设

使用预设的弹簧配置：

```typescript
import { spring, springPresets } from '@ldesign/animation'

// 柔和
spring('.box', 'x', 100, springPresets.gentle)

// 活泼
spring('.box', 'x', 100, springPresets.wobbly)

// 僵硬
spring('.box', 'x', 100, springPresets.stiff)

// 弹性
spring('.box', 'x', 100, springPresets.bouncy)
```

### 多属性弹簧

对多个属性应用弹簧：

```typescript
import { SpringAnimation } from '@ldesign/animation'

const springAnim = new SpringAnimation('.box', {
  x: 100,
  y: 50,
  scale: 1.5
}, {
  stiffness: 80,
  damping: 12
})

springAnim.play()
```

### 控制弹簧

```typescript
const springAnim = spring('.box', 'x', 100)

// 暂停
springAnim.pause()

// 继续
springAnim.play()

// 更新目标值（平滑过渡）
springAnim.setTarget(200)

// 立即设置值
springAnim.setValue(150)

// 停止
springAnim.kill()
```

## 惯性动画 (Inertia)

基于物理惯性的减速动画。

### 基础用法

```typescript
import { inertia } from '@ldesign/animation'

// 简单惯性
inertia('.box', 'x', {
  velocity: 1000,    // 初始速度
  friction: 0.9      // 摩擦力
})
```

### 边界限制

添加边界约束：

```typescript
inertia('.box', 'x', {
  velocity: 1000,
  friction: 0.9,
  min: 0,           // 最小值
  max: 500,         // 最大值
  bounce: true      // 边界反弹
})
```

### 回调函数

```typescript
inertia('.box', 'x', {
  velocity: 1000,
  friction: 0.9,
  
  onUpdate: (value) => {
    console.log('当前值:', value)
  },
  
  onBounce: (value) => {
    console.log('碰到边界:', value)
  },
  
  onComplete: () => {
    console.log('停止')
  }
})
```

## 物理引擎

统一管理多个物理动画。

### 创建物理引擎

```typescript
import { createPhysicsEngine } from '@ldesign/animation'

const physics = createPhysicsEngine({
  gravity: 9.8,      // 重力
  friction: 0.9,     // 全局摩擦
  timeScale: 1.0     // 时间缩放
})
```

### 添加物体

```typescript
// 添加弹簧
physics.addSpring('.box', {
  x: 100,
  y: 50
}, {
  stiffness: 100,
  damping: 10
})

// 添加惯性
physics.addInertia('.box', 'x', {
  velocity: 1000,
  friction: 0.9
})
```

### 控制引擎

```typescript
// 启动
physics.start()

// 暂停
physics.pause()

// 重置
physics.reset()

// 销毁
physics.destroy()
```

## 实战示例

### 示例 1：拖拽后释放

```typescript
import { draggable, inertia } from '@ldesign/animation'

const drag = draggable('.box', {
  inertia: true,
  
  onRelease: (velocity) => {
    // 释放后应用惯性
    inertia('.box', 'x', {
      velocity: velocity.x,
      friction: 0.95,
      min: 0,
      max: 500
    })
    
    inertia('.box', 'y', {
      velocity: velocity.y,
      friction: 0.95,
      min: 0,
      max: 300
    })
  }
})
```

### 示例 2：弹性菜单

```typescript
import { spring, springPresets } from '@ldesign/animation'

let menuOpen = false

function toggleMenu() {
  const targetX = menuOpen ? 0 : 250
  
  spring('.menu', 'x', targetX, springPresets.bouncy)
  
  menuOpen = !menuOpen
}

document.querySelector('.menu-button')
  .addEventListener('click', toggleMenu)
```

### 示例 3：拖拽弹回

```typescript
import { draggable, spring, springPresets } from '@ldesign/animation'

const drag = draggable('.box', {
  bounds: { left: -50, right: 50, top: -50, bottom: 50 },
  
  onRelease: () => {
    // 释放后弹回原位
    spring('.box', 'x', 0, springPresets.wobbly)
    spring('.box', 'y', 0, springPresets.wobbly)
  }
})
```

### 示例 4：物理按钮

```typescript
import { spring, springPresets } from '@ldesign/animation'

const button = document.querySelector('.button')

button.addEventListener('mousedown', () => {
  spring(button, 'scale', 0.9, springPresets.stiff)
})

button.addEventListener('mouseup', () => {
  spring(button, 'scale', 1, springPresets.bouncy)
})
```

### 示例 5：跟随鼠标

```typescript
import { spring, springPresets } from '@ldesign/animation'

const cursor = { x: 0, y: 0 }
const follower = document.querySelector('.follower')

document.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
  
  // 弹性跟随
  spring(follower, 'x', cursor.x, springPresets.gentle)
  spring(follower, 'y', cursor.y, springPresets.gentle)
})
```

### 示例 6：弹跳球

```typescript
import { inertia } from '@ldesign/animation'

function dropBall() {
  const ball = document.querySelector('.ball')
  
  // 垂直惯性（带反弹）
  inertia(ball, 'y', {
    velocity: 0,
    acceleration: 980,    // 重力加速度
    friction: 0.8,
    min: 0,
    max: 400,
    bounce: true,
    
    onBounce: (velocity) => {
      console.log('反弹速度:', velocity)
    }
  })
}
```

### 示例 7：模态框弹出

```typescript
import { spring, springPresets } from '@ldesign/animation'

function showModal() {
  const modal = document.querySelector('.modal')
  modal.style.display = 'block'
  
  // 弹性放大
  spring(modal, 'scale', 1, springPresets.bouncy)
  spring(modal, 'opacity', 1, springPresets.gentle)
}

function hideModal() {
  const modal = document.querySelector('.modal')
  
  // 快速缩小
  spring(modal, 'scale', 0, {
    ...springPresets.stiff,
    onComplete: () => {
      modal.style.display = 'none'
    }
  })
}
```

### 示例 8：数字滚动

```typescript
import { spring } from '@ldesign/animation'

function animateNumber(element: HTMLElement, target: number) {
  const obj = { value: 0 }
  
  spring(obj, 'value', target, {
    stiffness: 50,
    damping: 15,
    
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toString()
    }
  })
}

animateNumber(document.querySelector('.counter'), 9999)
```

## 参数详解

### 弹簧参数

```typescript
interface SpringConfig {
  stiffness?: number   // 刚度 (10-300)，越大越硬
  damping?: number     // 阻尼 (1-50)，越大越快停止
  mass?: number        // 质量 (0.1-10)，越大越有惯性
  velocity?: number    // 初始速度
  precision?: number   // 精度 (0.001-1)，停止阈值
}
```

**常见配置**：
- 柔和: `{ stiffness: 50, damping: 20 }`
- 活泼: `{ stiffness: 180, damping: 12 }`
- 僵硬: `{ stiffness: 300, damping: 30 }`
- 弹性: `{ stiffness: 120, damping: 8 }`

### 惯性参数

```typescript
interface InertiaConfig {
  velocity?: number      // 初始速度
  acceleration?: number  // 加速度
  friction?: number      // 摩擦力 (0-1)
  min?: number          // 最小边界
  max?: number          // 最大边界
  bounce?: boolean      // 边界反弹
  bounceFriction?: number  // 反弹摩擦 (0-1)
}
```

## 性能优化

### 精度控制

```typescript
// 降低精度以提前停止
spring('.box', 'x', 100, {
  precision: 0.1  // 默认 0.001
})
```

### 批量物理动画

```typescript
import { createPhysicsEngine } from '@ldesign/animation'

const physics = createPhysicsEngine()

// 批量添加
document.querySelectorAll('.item').forEach((item, index) => {
  physics.addSpring(item, {
    x: index * 100
  }, springPresets.bouncy)
})

physics.start()
```

### 对象复用

```typescript
import { SpringAnimation } from '@ldesign/animation'

// 创建一次，多次使用
const springAnim = new SpringAnimation('.box', { x: 0 })

function moveTo(x: number) {
  springAnim.setTarget(x)
}

moveTo(100)
setTimeout(() => moveTo(200), 1000)
setTimeout(() => moveTo(0), 2000)
```

## 调试

### 可视化弹簧

```typescript
import { spring } from '@ldesign/animation'

const springAnim = spring('.box', 'x', 100, {
  onUpdate: (value) => {
    console.log('x:', value)
  }
})

// 获取当前状态
console.log('velocity:', springAnim.velocity)
console.log('value:', springAnim.value)
```

### 性能监控

```typescript
import { createPhysicsEngine } from '@ldesign/animation'

const physics = createPhysicsEngine()

setInterval(() => {
  console.log('活动物体:', physics.getActiveCount())
  console.log('FPS:', physics.getFPS())
}, 1000)
```

## 最佳实践

### ✅ 推荐

```typescript
// 使用预设快速开发
spring('.box', 'x', 100, springPresets.bouncy)

// 组合使用拖拽和惯性
const drag = draggable('.box', {
  inertia: true
})

// 使用物理引擎管理多个动画
const physics = createPhysicsEngine()
physics.addSpring('.box1', { x: 100 })
physics.addSpring('.box2', { y: 50 })
```

### ❌ 避免

```typescript
// 避免过高的刚度
spring('.box', 'x', 100, {
  stiffness: 1000  // 太硬，可能抖动
})

// 避免过低的阻尼
spring('.box', 'x', 100, {
  damping: 1  // 太小，永不停止
})

// 避免在循环中创建弹簧
setInterval(() => {
  spring('.box', 'x', Math.random() * 100)
}, 16)
```

## API 参考

### spring()

```typescript
function spring(
  target: AnimationTarget,
  property: string,
  to: number,
  config?: SpringConfig
): SpringAnimation
```

### inertia()

```typescript
function inertia(
  target: AnimationTarget,
  property: string,
  config: InertiaConfig
): InertiaAnimation
```

### SpringAnimation

```typescript
class SpringAnimation {
  play(): void
  pause(): void
  kill(): void
  setTarget(value: number): void
  setValue(value: number): void
  setVelocity(velocity: number): void
  get value(): number
  get velocity(): number
}
```

## 下一步

- 学习 [手势交互](/guide/gesture)
- 探索 [SVG 动画](/guide/svg)
- 查看 [物理动画示例](/examples/physics)

