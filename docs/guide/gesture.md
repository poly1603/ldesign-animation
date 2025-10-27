# 手势交互

创建丰富的触摸和鼠标交互体验。

## 拖拽 (Draggable)

创建可拖拽的元素。

### 基础用法

```typescript
import { draggable } from '@ldesign/animation'

// 简单拖拽
const drag = draggable('.box')
```

### 限制拖拽轴

```typescript
// 只能水平拖拽
draggable('.box', {
  axis: 'x'
})

// 只能垂直拖拽
draggable('.box', {
  axis: 'y'
})

// 两个方向都可以
draggable('.box', {
  axis: 'both'  // 默认
})
```

### 边界限制

```typescript
// 限制在指定区域内
draggable('.box', {
  bounds: {
    left: 0,
    right: 500,
    top: 0,
    bottom: 300
  }
})

// 限制在父元素内
draggable('.box', {
  bounds: 'parent'
})

// 限制在指定元素内
draggable('.box', {
  bounds: '.container'
})
```

### 惯性拖拽

释放后继续滑动：

```typescript
draggable('.box', {
  inertia: true,
  inertiaOptions: {
    friction: 0.95,  // 摩擦力
    min: 0,
    max: 500
  }
})
```

### 拖拽手柄

指定拖拽的触发元素：

```typescript
draggable('.box', {
  handle: '.drag-handle'  // 只能拖拽手柄
})
```

### 回调函数

```typescript
draggable('.box', {
  onDragStart: (e) => {
    console.log('开始拖拽', e.x, e.y)
  },
  
  onDrag: (e) => {
    console.log('拖拽中', e.x, e.y, e.delta)
  },
  
  onDragEnd: (e) => {
    console.log('结束拖拽', e.velocity)
  }
})
```

### 控制拖拽

```typescript
const drag = draggable('.box')

// 启用/禁用
drag.enable()
drag.disable()

// 更新边界
drag.updateBounds({
  left: 0,
  right: 600
})

// 重置位置
drag.reset()

// 销毁
drag.kill()
```

## 手势识别

识别各种触摸和鼠标手势。

### 基础用法

```typescript
import { gesture } from '@ldesign/animation'

const gest = gesture('.box')

// 监听手势
gest.on('tap', (e) => {
  console.log('点击')
})

gest.on('swipe', (e) => {
  console.log('滑动', e.direction, e.distance)
})
```

### 支持的手势

```typescript
const gest = gesture('.box')

// 悬停
gest.on('hover', (e) => {
  console.log('鼠标悬停', e.entered)
})

// 点击
gest.on('tap', (e) => {
  console.log('点击', e.x, e.y)
})

// 长按
gest.on('press', (e) => {
  console.log('长按', e.duration)
})

// 滑动
gest.on('swipe', (e) => {
  console.log('滑动', e.direction)  // 'up' | 'down' | 'left' | 'right'
})

// 捏合（触摸屏）
gest.on('pinch', (e) => {
  console.log('捏合', e.scale)
})

// 旋转（触摸屏）
gest.on('rotate', (e) => {
  console.log('旋转', e.rotation)
})
```

### 手势配置

```typescript
gesture('.box', {
  // 点击配置
  tapThreshold: 10,      // 最大移动距离
  tapTimeout: 300,       // 最大持续时间
  
  // 长按配置
  pressTimeout: 500,     // 触发时长
  
  // 滑动配置
  swipeThreshold: 50,    // 最小滑动距离
  swipeVelocity: 0.5,    // 最小速度
  
  // 捏合配置
  pinchThreshold: 0.1    // 最小缩放变化
})
```

## 实战示例

### 示例 1：拖拽卡片

```typescript
import { draggable, to } from '@ldesign/animation'

const cards = document.querySelectorAll('.card')

cards.forEach((card, index) => {
  draggable(card, {
    bounds: 'parent',
    
    onDragStart: () => {
      // 提升卡片
      to(card, { 
        scale: 1.1,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }, { duration: 200 })
    },
    
    onDragEnd: () => {
      // 恢复卡片
      to(card, { 
        scale: 1,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }, { duration: 200 })
    }
  })
})
```

### 示例 2：滑动删除

```typescript
import { draggable, to } from '@ldesign/animation'

function createSwipeToDelete(element: HTMLElement) {
  const drag = draggable(element, {
    axis: 'x',
    bounds: { left: -100, right: 100 },
    
    onDragEnd: (e) => {
      if (Math.abs(e.x) > 80) {
        // 滑动超过阈值，删除
        to(element, { 
          x: e.x > 0 ? 500 : -500,
          opacity: 0
        }, { 
          duration: 300,
          onComplete: () => element.remove()
        })
      } else {
        // 弹回
        to(element, { x: 0 }, { duration: 200 })
      }
    }
  })
  
  return drag
}
```

### 示例 3：图片查看器

```typescript
import { draggable, gesture } from '@ldesign/animation'

function createImageViewer(image: HTMLElement) {
  let scale = 1
  
  // 拖拽
  const drag = draggable(image, {
    axis: 'both'
  })
  
  // 手势
  const gest = gesture(image)
  
  // 捏合缩放
  gest.on('pinch', (e) => {
    scale *= e.scale
    scale = Math.max(0.5, Math.min(3, scale))
    image.style.transform = `scale(${scale})`
  })
  
  // 双击缩放
  let lastTap = 0
  gest.on('tap', () => {
    const now = Date.now()
    if (now - lastTap < 300) {
      // 双击
      scale = scale === 1 ? 2 : 1
      to(image, { scale }, { duration: 300 })
    }
    lastTap = now
  })
}
```

### 示例 4：抽屉菜单

```typescript
import { draggable, to, spring } from '@ldesign/animation'

function createDrawer(drawer: HTMLElement) {
  const maxWidth = 300
  let isOpen = false
  
  const drag = draggable(drawer, {
    axis: 'x',
    bounds: { left: -maxWidth, right: 0 },
    
    onDragEnd: (e) => {
      // 根据拖拽距离和速度决定开关
      const shouldOpen = e.x > -maxWidth / 2 || e.velocity.x > 500
      
      isOpen = shouldOpen
      
      spring(drawer, 'x', shouldOpen ? 0 : -maxWidth, {
        stiffness: 100,
        damping: 15
      })
    }
  })
  
  return {
    open: () => {
      isOpen = true
      spring(drawer, 'x', 0)
    },
    close: () => {
      isOpen = false
      spring(drawer, 'x', -maxWidth)
    },
    toggle: () => isOpen ? close() : open()
  }
}
```

### 示例 5：可拖拽排序列表

```typescript
import { draggable, to } from '@ldesign/animation'

function createSortableList(container: HTMLElement) {
  const items = Array.from(container.children) as HTMLElement[]
  
  items.forEach((item, index) => {
    draggable(item, {
      axis: 'y',
      
      onDragStart: () => {
        item.style.zIndex = '100'
        to(item, { scale: 1.05 }, { duration: 200 })
      },
      
      onDrag: (e) => {
        // 检测是否需要交换位置
        const currentIndex = items.indexOf(item)
        const targetIndex = Math.round(e.y / item.offsetHeight)
        
        if (targetIndex !== currentIndex && targetIndex >= 0 && targetIndex < items.length) {
          // 交换位置
          items.splice(currentIndex, 1)
          items.splice(targetIndex, 0, item)
          
          // 更新其他项的位置
          items.forEach((otherItem, i) => {
            if (otherItem !== item) {
              to(otherItem, { 
                y: i * item.offsetHeight 
              }, { duration: 200 })
            }
          })
        }
      },
      
      onDragEnd: () => {
        item.style.zIndex = ''
        
        // 吸附到最近的位置
        const targetIndex = items.indexOf(item)
        to(item, { 
          x: 0,
          y: targetIndex * item.offsetHeight,
          scale: 1
        }, { duration: 200 })
      }
    })
  })
}
```

### 示例 6：手势控制相册

```typescript
import { gesture, to } from '@ldesign/animation'

function createGallery(gallery: HTMLElement) {
  const images = Array.from(gallery.children) as HTMLElement[]
  let currentIndex = 0
  
  const gest = gesture(gallery)
  
  // 滑动切换
  gest.on('swipe', (e) => {
    if (e.direction === 'left' && currentIndex < images.length - 1) {
      currentIndex++
    } else if (e.direction === 'right' && currentIndex > 0) {
      currentIndex--
    }
    
    // 移动到目标图片
    to(gallery, { 
      x: -currentIndex * gallery.offsetWidth 
    }, { 
      duration: 300,
      ease: 'easeOutCubic'
    })
  })
  
  // 点击显示信息
  gest.on('tap', () => {
    console.log('当前图片:', currentIndex)
  })
  
  // 长按分享
  gest.on('press', () => {
    console.log('分享图片:', currentIndex)
  })
}
```

### 示例 7：捏合缩放画布

```typescript
import { gesture } from '@ldesign/animation'

function createZoomableCanvas(canvas: HTMLElement) {
  let scale = 1
  let x = 0
  let y = 0
  
  const gest = gesture(canvas)
  
  // 捏合缩放
  gest.on('pinch', (e) => {
    scale *= e.scale
    scale = Math.max(0.5, Math.min(5, scale))
    
    updateTransform()
  })
  
  // 双指拖动
  gest.on('pan', (e) => {
    if (e.pointerCount === 2) {
      x += e.delta.x
      y += e.delta.y
      
      updateTransform()
    }
  })
  
  function updateTransform() {
    canvas.style.transform = `
      translate(${x}px, ${y}px)
      scale(${scale})
    `
  }
}
```

### 示例 8：下拉刷新

```typescript
import { draggable, spring } from '@ldesign/animation'

function createPullToRefresh(container: HTMLElement) {
  const threshold = 80
  let isRefreshing = false
  
  const drag = draggable(container, {
    axis: 'y',
    bounds: { top: 0, bottom: threshold * 2 },
    
    onDrag: (e) => {
      // 更新刷新指示器
      const progress = Math.min(1, e.y / threshold)
      updateIndicator(progress)
    },
    
    onDragEnd: (e) => {
      if (e.y > threshold && !isRefreshing) {
        // 触发刷新
        isRefreshing = true
        spring(container, 'y', threshold)
        
        // 执行刷新
        refresh().then(() => {
          isRefreshing = false
          spring(container, 'y', 0)
        })
      } else {
        // 弹回
        spring(container, 'y', 0)
      }
    }
  })
  
  function updateIndicator(progress: number) {
    const indicator = document.querySelector('.refresh-indicator')
    indicator.style.opacity = progress
    indicator.style.transform = `rotate(${progress * 360}deg)`
  }
  
  async function refresh() {
    // 模拟刷新
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}
```

## 配置选项

### Draggable 选项

```typescript
interface DraggableOptions {
  axis?: 'x' | 'y' | 'both'
  bounds?: Bounds | 'parent' | string
  handle?: string
  inertia?: boolean
  inertiaOptions?: InertiaConfig
  
  onDragStart?: (e: DragEvent) => void
  onDrag?: (e: DragEvent) => void
  onDragEnd?: (e: DragEvent) => void
}

interface DragEvent {
  x: number
  y: number
  delta: { x: number, y: number }
  velocity: { x: number, y: number }
}
```

### Gesture 选项

```typescript
interface GestureOptions {
  tapThreshold?: number
  tapTimeout?: number
  pressTimeout?: number
  swipeThreshold?: number
  swipeVelocity?: number
  pinchThreshold?: number
}
```

## 性能优化

### 使用 will-change

```typescript
import { willChangeManager } from '@ldesign/animation'

draggable('.box', {
  onDragStart: (e) => {
    willChangeManager.add(e.target, 'transform')
  },
  
  onDragEnd: (e) => {
    willChangeManager.remove(e.target)
  }
})
```

### RAF 节流

```typescript
import { rafThrottle } from '@ldesign/animation'

draggable('.box', {
  onDrag: rafThrottle((e) => {
    // 使用 RAF 节流
    console.log(e.x, e.y)
  })
})
```

## 最佳实践

### ✅ 推荐

```typescript
// 使用边界限制
draggable('.box', {
  bounds: 'parent'
})

// 添加视觉反馈
draggable('.box', {
  onDragStart: () => {
    to('.box', { scale: 1.1 })
  },
  onDragEnd: () => {
    to('.box', { scale: 1 })
  }
})

// 组合使用拖拽和弹簧
draggable('.box', {
  inertia: true
})
```

### ❌ 避免

```typescript
// 避免过大的边界
draggable('.box', {
  bounds: { left: -10000, right: 10000 }
})

// 避免在拖拽中执行昂贵操作
draggable('.box', {
  onDrag: () => {
    heavyCalculation()  // 不推荐
  }
})

// 避免忘记销毁
const drag = draggable('.box')
// 记得在不需要时调用 drag.kill()
```

## 下一步

- 探索 [SVG 动画](/guide/svg)
- 学习 [过渡效果](/guide/transition)
- 查看 [手势示例](/examples/gesture)

