# 基础动画示例

本页面展示了 `@ldesign/animation` 的基础动画用法。

## 淡入淡出动画

### 简单淡入

```typescript
import { AnimationManager } from '@ldesign/animation'

const manager = new AnimationManager()
const element = document.getElementById('fade-target')

// 淡入动画
const fadeIn = manager.create(element, {
  opacity: [0, 1]
}, {
  duration: 500,
  easing: 'ease-out'
})

fadeIn.play()
```

### 淡入淡出切换

```typescript
let isVisible = false

function toggleFade() {
  const animation = manager.create(element, {
    opacity: isVisible ? [1, 0] : [0, 1]
  }, {
    duration: 300
  })
  
  animation.play().then(() => {
    isVisible = !isVisible
  })
}

// 绑定到按钮
document.getElementById('toggle-btn').addEventListener('click', toggleFade)
```

## 移动动画

### 滑入效果

```typescript
// 从左侧滑入
const slideInLeft = manager.create(element, {
  transform: ['translateX(-100%)', 'translateX(0)']
}, {
  duration: 600,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
})

// 从上方滑入
const slideInTop = manager.create(element, {
  transform: ['translateY(-100%)', 'translateY(0)']
}, {
  duration: 600,
  easing: 'ease-out'
})
```

### 弹跳效果

```typescript
const bounce = manager.create(element, {
  transform: [
    'translateY(0)',
    'translateY(-30px)',
    'translateY(0)',
    'translateY(-15px)',
    'translateY(0)'
  ]
}, {
  duration: 1000,
  easing: 'ease'
})
```

## 缩放动画

### 放大缩小

```typescript
// 从小到大
const scaleUp = manager.create(element, {
  transform: ['scale(0)', 'scale(1)'],
  opacity: [0, 1]
}, {
  duration: 400,
  easing: 'ease-out'
})

// 脉冲效果
const pulse = manager.create(element, {
  transform: ['scale(1)', 'scale(1.1)', 'scale(1)']
}, {
  duration: 600,
  iterations: Infinity,
  direction: 'alternate'
})
```

### 弹性缩放

```typescript
const elasticScale = manager.create(element, {
  transform: [
    'scale(0)',
    'scale(1.2)',
    'scale(0.9)',
    'scale(1.05)',
    'scale(1)'
  ]
}, {
  duration: 800,
  easing: 'ease'
})
```

## 旋转动画

### 简单旋转

```typescript
// 360度旋转
const rotate = manager.create(element, {
  transform: ['rotate(0deg)', 'rotate(360deg)']
}, {
  duration: 1000,
  easing: 'linear'
})

// 无限旋转
const spin = manager.create(element, {
  transform: ['rotate(0deg)', 'rotate(360deg)']
}, {
  duration: 2000,
  iterations: Infinity,
  easing: 'linear'
})
```

### 摇摆效果

```typescript
const shake = manager.create(element, {
  transform: [
    'rotate(0deg)',
    'rotate(-5deg)',
    'rotate(5deg)',
    'rotate(-5deg)',
    'rotate(5deg)',
    'rotate(0deg)'
  ]
}, {
  duration: 500,
  easing: 'ease-in-out'
})
```

## 组合动画

### 多属性动画

```typescript
const complexAnimation = manager.create(element, {
  opacity: [0, 1],
  transform: [
    'translateY(50px) scale(0.8) rotate(-10deg)',
    'translateY(0) scale(1) rotate(0deg)'
  ],
  backgroundColor: ['#ff0000', '#00ff00']
}, {
  duration: 1000,
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
})
```

### 关键帧动画

```typescript
const keyframeAnimation = manager.create(element, {
  opacity: [0, 0.5, 1, 0.8, 1],
  transform: [
    'translateX(0) scale(1)',
    'translateX(25px) scale(1.1)',
    'translateX(50px) scale(1)',
    'translateX(75px) scale(0.9)',
    'translateX(100px) scale(1)'
  ]
}, {
  duration: 2000,
  easing: 'ease-in-out'
})
```

## 交互式动画

### 悬停效果

```typescript
const hoverElement = document.getElementById('hover-target')
let hoverAnimation: Animation | null = null

hoverElement.addEventListener('mouseenter', () => {
  if (hoverAnimation) {
    hoverAnimation.cancel()
  }
  
  hoverAnimation = manager.create(hoverElement, {
    transform: ['scale(1)', 'scale(1.1)'],
    boxShadow: [
      '0 2px 4px rgba(0,0,0,0.1)',
      '0 8px 16px rgba(0,0,0,0.2)'
    ]
  }, {
    duration: 200,
    fill: 'forwards'
  })
  
  hoverAnimation.play()
})

hoverElement.addEventListener('mouseleave', () => {
  if (hoverAnimation) {
    hoverAnimation.cancel()
  }
  
  hoverAnimation = manager.create(hoverElement, {
    transform: ['scale(1.1)', 'scale(1)'],
    boxShadow: [
      '0 8px 16px rgba(0,0,0,0.2)',
      '0 2px 4px rgba(0,0,0,0.1)'
    ]
  }, {
    duration: 200,
    fill: 'forwards'
  })
  
  hoverAnimation.play()
})
```

### 点击效果

```typescript
const clickElement = document.getElementById('click-target')

clickElement.addEventListener('click', () => {
  const ripple = manager.create(clickElement, {
    transform: [
      'scale(1)',
      'scale(0.95)',
      'scale(1.05)',
      'scale(1)'
    ]
  }, {
    duration: 300,
    easing: 'ease-out'
  })
  
  ripple.play()
})
```

## 列表动画

### 依次显示

```typescript
const listItems = document.querySelectorAll('.list-item')

listItems.forEach((item, index) => {
  const animation = manager.create(item, {
    opacity: [0, 1],
    transform: ['translateY(20px)', 'translateY(0)']
  }, {
    duration: 400,
    delay: index * 100,
    easing: 'ease-out'
  })
  
  animation.play()
})
```

### 波浪效果

```typescript
function createWaveEffect() {
  const items = document.querySelectorAll('.wave-item')
  
  items.forEach((item, index) => {
    const animation = manager.create(item, {
      transform: [
        'translateY(0)',
        'translateY(-10px)',
        'translateY(0)'
      ]
    }, {
      duration: 600,
      delay: index * 50,
      easing: 'ease-in-out'
    })
    
    animation.play()
  })
}
```

## 加载动画

### 旋转加载器

```typescript
const loader = document.getElementById('loader')

const loadingAnimation = manager.create(loader, {
  transform: ['rotate(0deg)', 'rotate(360deg)']
}, {
  duration: 1000,
  iterations: Infinity,
  easing: 'linear'
})

loadingAnimation.play()

// 停止加载
function stopLoading() {
  loadingAnimation.cancel()
  
  const fadeOut = manager.create(loader, {
    opacity: [1, 0]
  }, {
    duration: 300
  })
  
  fadeOut.play()
}
```

### 脉冲加载器

```typescript
const pulseLoader = manager.create(loader, {
  opacity: [0.3, 1, 0.3],
  transform: ['scale(0.8)', 'scale(1)', 'scale(0.8)']
}, {
  duration: 1500,
  iterations: Infinity,
  easing: 'ease-in-out'
})
```

## 页面过渡

### 页面淡入

```typescript
function pageTransition() {
  const page = document.getElementById('page-content')
  
  // 先淡出
  const fadeOut = manager.create(page, {
    opacity: [1, 0]
  }, {
    duration: 200
  })
  
  fadeOut.play().then(() => {
    // 更新内容
    updatePageContent()
    
    // 再淡入
    const fadeIn = manager.create(page, {
      opacity: [0, 1]
    }, {
      duration: 300
    })
    
    fadeIn.play()
  })
}
```

### 滑动过渡

```typescript
function slideTransition(direction: 'left' | 'right') {
  const currentPage = document.getElementById('current-page')
  const nextPage = document.getElementById('next-page')
  
  const slideOut = manager.create(currentPage, {
    transform: [
      'translateX(0)',
      `translateX(${direction === 'left' ? '-100%' : '100%'})`
    ]
  }, {
    duration: 300,
    easing: 'ease-in-out'
  })
  
  const slideIn = manager.create(nextPage, {
    transform: [
      `translateX(${direction === 'left' ? '100%' : '-100%'})`,
      'translateX(0)'
    ]
  }, {
    duration: 300,
    easing: 'ease-in-out'
  })
  
  // 同时执行
  Promise.all([slideOut.play(), slideIn.play()])
}
```

## 性能优化示例

### 批量动画

```typescript
// 使用批量操作优化性能
manager.batch(() => {
  const elements = document.querySelectorAll('.animate-item')
  
  elements.forEach((element, index) => {
    const animation = manager.create(element, {
      opacity: [0, 1],
      transform: ['translateY(20px)', 'translateY(0)']
    }, {
      duration: 300,
      delay: index * 50
    })
    
    animation.play()
  })
})
```

### 硬件加速

```typescript
// 使用 transform 和 opacity 获得最佳性能
const optimizedAnimation = manager.create(element, {
  opacity: [0, 1],
  transform: [
    'translate3d(-100px, 0, 0) scale(0.8)',
    'translate3d(0, 0, 0) scale(1)'
  ]
}, {
  duration: 500,
  easing: 'ease-out'
})
```

## 完整示例页面

```html
<!DOCTYPE html>
<html>
<head>
  <title>动画示例</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background: #3498db;
      margin: 20px;
      border-radius: 8px;
    }
    
    .list-item {
      padding: 10px;
      margin: 5px 0;
      background: #f8f9fa;
      border-radius: 4px;
      opacity: 0;
    }
  </style>
</head>
<body>
  <div id="fade-box" class="box"></div>
  <div id="slide-box" class="box"></div>
  <div id="scale-box" class="box"></div>
  
  <button onclick="runAnimations()">运行动画</button>
  
  <script type="module">
    import { AnimationManager } from '@ldesign/animation'
    
    const manager = new AnimationManager()
    
    window.runAnimations = function() {
      // 淡入
      const fadeBox = document.getElementById('fade-box')
      const fadeAnimation = manager.create(fadeBox, {
        opacity: [0, 1]
      }, { duration: 500 })
      
      // 滑入
      const slideBox = document.getElementById('slide-box')
      const slideAnimation = manager.create(slideBox, {
        transform: ['translateX(-100px)', 'translateX(0)']
      }, { duration: 600, delay: 200 })
      
      // 缩放
      const scaleBox = document.getElementById('scale-box')
      const scaleAnimation = manager.create(scaleBox, {
        transform: ['scale(0)', 'scale(1)']
      }, { duration: 400, delay: 400 })
      
      // 依次播放
      fadeAnimation.play()
      slideAnimation.play()
      scaleAnimation.play()
    }
  </script>
</body>
</html>
```

这些示例展示了 `@ldesign/animation` 的基础用法。你可以根据需要组合这些动画效果，创建更复杂的动画序列。