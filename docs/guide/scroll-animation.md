# 滚动动画

创建强大的滚动触发动画和视差效果。

## ScrollTrigger

### 基础用法

```typescript
import { createScrollTrigger } from '@ldesign/animation'

createScrollTrigger('.box', {
  start: 'top bottom',    // 元素顶部到达视口底部时触发
  end: 'bottom top',      // 元素底部离开视口顶部时结束
  
  onEnter: () => {
    console.log('进入视口')
  },
  
  onLeave: () => {
    console.log('离开视口')
  },
  
  onUpdate: (progress) => {
    console.log('进度:', progress)  // 0-1
  }
})
```

### 触发位置

触发位置可以使用多种格式：

```typescript
// 关键字
start: 'top bottom'      // 元素顶部 - 视口底部
start: 'center center'   // 元素中心 - 视口中心
start: 'bottom top'      // 元素底部 - 视口顶部

// 百分比
start: 'top 80%'         // 元素顶部 - 视口80%位置
start: '20% bottom'      // 元素20%位置 - 视口底部

// 像素
start: 'top 100px'       // 元素顶部 - 视口顶部向下100px
start: 'bottom -50px'    // 元素底部 - 视口底部向上50px
```

### 动画集成

与动画系统集成：

```typescript
import { createScrollTrigger, to } from '@ldesign/animation'

const animation = to('.box', { 
  x: 100, 
  opacity: 1 
}, { 
  paused: true  // 创建时暂停
})

createScrollTrigger('.box', {
  start: 'top center',
  
  onEnter: () => {
    animation.play()
  },
  
  onLeaveBack: () => {
    animation.reverse()
  }
})
```

### 进度驱动

根据滚动进度驱动动画：

```typescript
import { createScrollTrigger, to } from '@ldesign/animation'

const box = document.querySelector('.box')

createScrollTrigger('.trigger', {
  start: 'top bottom',
  end: 'bottom top',
  
  onUpdate: (progress) => {
    // 根据进度更新样式
    box.style.opacity = progress
    box.style.transform = `translateX(${progress * 100}px)`
  }
})
```

## 滚动动画预设

快速创建常见的滚动动画效果：

### scrollFadeIn

元素滚动到视口时淡入：

```typescript
import { scrollFadeIn } from '@ldesign/animation'

scrollFadeIn('.box')
```

### scrollSlideIn

元素滚动到视口时滑入：

```typescript
import { 
  scrollSlideInUp,
  scrollSlideInDown,
  scrollSlideInLeft,
  scrollSlideInRight
} from '@ldesign/animation'

// 从下方滑入
scrollSlideInUp('.box')

// 从左侧滑入
scrollSlideInLeft('.box')
```

### scrollZoomIn

元素滚动到视口时放大：

```typescript
import { scrollZoomIn } from '@ldesign/animation'

scrollZoomIn('.box')
```

### 批量应用

对多个元素应用滚动动画：

```typescript
import { scrollFadeIn } from '@ldesign/animation'

// 所有 .item 元素
scrollFadeIn('.item')

// 交错效果
document.querySelectorAll('.item').forEach((item, index) => {
  scrollFadeIn(item, {
    start: 'top 80%',
    delay: index * 100  // 每项延迟 100ms
  })
})
```

## 视差效果

### parallax

创建视差滚动效果：

```typescript
import { parallax } from '@ldesign/animation'

// 背景慢速移动
parallax('.bg', {
  speed: 0.5  // 0.5倍速度
})

// 前景快速移动
parallax('.fg', {
  speed: 1.5  // 1.5倍速度
})

// 垂直和水平视差
parallax('.element', {
  speed: 0.8,
  direction: 'vertical'  // 'vertical' | 'horizontal'
})
```

### 多层视差

创建多层视差效果：

```typescript
import { parallax } from '@ldesign/animation'

// 远景
parallax('.layer-1', { speed: 0.2 })

// 中景
parallax('.layer-2', { speed: 0.5 })

// 近景
parallax('.layer-3', { speed: 0.8 })

// 前景（默认速度）
parallax('.layer-4', { speed: 1.0 })
```

## IntersectionObserver

底层的交叉观察器管理：

```typescript
import { createIntersectionManager } from '@ldesign/animation'

const manager = createIntersectionManager({
  rootMargin: '0px 0px -100px 0px',
  threshold: [0, 0.5, 1]
})

// 观察元素
manager.observe('.box', {
  onEnter: (entry) => {
    console.log('进入:', entry.intersectionRatio)
  },
  
  onLeave: (entry) => {
    console.log('离开')
  }
})

// 停止观察
manager.unobserve('.box')

// 销毁
manager.destroy()
```

## 实战示例

### 示例 1：页面章节入场

```typescript
import { scrollFadeIn, scrollSlideInUp } from '@ldesign/animation'

// 标题淡入
scrollFadeIn('.section-title', {
  start: 'top 80%'
})

// 内容从下滑入
scrollSlideInUp('.section-content', {
  start: 'top 75%'
})
```

### 示例 2：视差页头

```typescript
import { parallax } from '@ldesign/animation'

// 背景图慢速移动
parallax('.hero-bg', {
  speed: 0.5
})

// 标题正常速度
parallax('.hero-title', {
  speed: 1.0
})

// 前景快速移动
parallax('.hero-fg', {
  speed: 1.5
})
```

### 示例 3：进度指示器

```typescript
import { createScrollTrigger } from '@ldesign/animation'

const progressBar = document.querySelector('.progress-bar')

createScrollTrigger('body', {
  start: 'top top',
  end: 'bottom bottom',
  
  onUpdate: (progress) => {
    progressBar.style.width = `${progress * 100}%`
  }
})
```

### 示例 4：数字滚动计数

```typescript
import { createScrollTrigger, to } from '@ldesign/animation'

const counter = { value: 0 }
const element = document.querySelector('.counter')

createScrollTrigger('.counter-section', {
  start: 'top center',
  
  onEnter: () => {
    to(counter, {
      value: 100
    }, {
      duration: 2000,
      ease: 'easeOutQuad',
      onUpdate: () => {
        element.textContent = Math.floor(counter.value)
      }
    })
  }
})
```

### 示例 5：固定导航栏

```typescript
import { createScrollTrigger, to } from '@ldesign/animation'

const nav = document.querySelector('.nav')

createScrollTrigger('.content', {
  start: 'top top',
  
  onEnter: () => {
    nav.classList.add('fixed')
    to(nav, { y: 0, opacity: 1 }, { duration: 300 })
  },
  
  onLeaveBack: () => {
    to(nav, { y: -100, opacity: 0 }, { 
      duration: 300,
      onComplete: () => {
        nav.classList.remove('fixed')
      }
    })
  }
})
```

### 示例 6：图片懒加载

```typescript
import { createIntersectionManager, fadeIn } from '@ldesign/animation'

const manager = createIntersectionManager({
  rootMargin: '50px'  // 提前50px加载
})

document.querySelectorAll('img[data-src]').forEach(img => {
  manager.observe(img, {
    onEnter: (entry) => {
      const img = entry.target as HTMLImageElement
      
      // 加载图片
      img.src = img.dataset.src
      
      // 淡入
      img.onload = () => {
        fadeIn(img, { duration: 500 })
      }
      
      // 只触发一次
      manager.unobserve(img)
    }
  })
})
```

### 示例 7：滚动文字动画

```typescript
import { createScrollTrigger, splitText, to } from '@ldesign/animation'

const text = document.querySelector('.scroll-text')
const chars = splitText(text, 'chars')

createScrollTrigger(text, {
  start: 'top 80%',
  end: 'bottom 20%',
  
  onUpdate: (progress) => {
    chars.forEach((char, index) => {
      const delay = (index / chars.length) * progress
      char.style.opacity = Math.max(0, delay)
      char.style.transform = `translateY(${(1 - delay) * 20}px)`
    })
  }
})
```

### 示例 8：卡片层叠滚动

```typescript
import { createScrollTrigger, to } from '@ldesign/animation'

const cards = document.querySelectorAll('.card')

cards.forEach((card, index) => {
  createScrollTrigger(card, {
    start: 'top bottom',
    end: 'top top',
    
    onUpdate: (progress) => {
      const scale = 1 - (progress * 0.1)
      const y = progress * (index * 10)
      
      card.style.transform = `
        scale(${scale})
        translateY(${y}px)
      `
    }
  })
})
```

## 性能优化

### 节流更新

```typescript
import { createScrollTrigger, rafThrottle } from '@ldesign/animation'

const updateHandler = rafThrottle((progress) => {
  // 使用 RAF 节流的更新
  console.log(progress)
})

createScrollTrigger('.box', {
  onUpdate: updateHandler
})
```

### 批量操作

```typescript
import { batchUpdater } from '@ldesign/animation'

createScrollTrigger('.trigger', {
  onUpdate: (progress) => {
    batchUpdater.write(() => {
      // 批量写入DOM
      document.querySelectorAll('.item').forEach(item => {
        item.style.opacity = progress
      })
    })
  }
})
```

### 可见性优化

只在元素可见时更新：

```typescript
import { visibilityManager } from '@ldesign/animation'

visibilityManager.observe('.expensive-animation', {
  onVisible: (element) => {
    // 开始动画
  },
  
  onHidden: (element) => {
    // 暂停动画
  }
})
```

## 配置选项

### ScrollTrigger 选项

```typescript
interface ScrollTriggerOptions {
  // 触发位置
  start?: string           // 开始位置
  end?: string            // 结束位置
  
  // 回调
  onEnter?: () => void           // 进入
  onLeave?: () => void           // 离开
  onEnterBack?: () => void       // 返回进入
  onLeaveBack?: () => void       // 返回离开
  onUpdate?: (progress: number) => void  // 更新
  
  // 选项
  once?: boolean          // 只触发一次
  toggleClass?: string    // 切换类名
  markers?: boolean       // 显示标记（调试）
}
```

### Parallax 选项

```typescript
interface ParallaxOptions {
  speed?: number          // 速度倍数（0-2）
  direction?: 'vertical' | 'horizontal'
  smooth?: boolean        // 平滑过渡
}
```

## 调试

### 显示触发标记

```typescript
createScrollTrigger('.box', {
  start: 'top center',
  end: 'bottom top',
  markers: true,  // 显示开始和结束标记
  
  onEnter: () => console.log('进入')
})
```

### 日志输出

```typescript
createScrollTrigger('.box', {
  start: 'top center',
  
  onEnter: () => console.log('onEnter'),
  onLeave: () => console.log('onLeave'),
  onEnterBack: () => console.log('onEnterBack'),
  onLeaveBack: () => console.log('onLeaveBack'),
  onUpdate: (progress) => console.log('progress:', progress)
})
```

## 最佳实践

### ✅ 推荐

```typescript
// 使用预设快速开发
scrollFadeIn('.item')

// 使用 once 避免重复触发
createScrollTrigger('.box', {
  once: true,
  onEnter: () => {}
})

// 使用 RAF 节流
import { rafThrottle } from '@ldesign/animation'

createScrollTrigger('.box', {
  onUpdate: rafThrottle((progress) => {
    // 处理更新
  })
})
```

### ❌ 避免

```typescript
// 避免在 onUpdate 中执行昂贵操作
createScrollTrigger('.box', {
  onUpdate: () => {
    // 避免复杂计算
    heavyCalculation()
  }
})

// 避免过多同时触发器
for (let i = 0; i < 1000; i++) {
  createScrollTrigger(`.item-${i}`, {})
}

// 避免嵌套触发器
createScrollTrigger('.box', {
  onEnter: () => {
    createScrollTrigger('.nested', {})  // 不推荐
  }
})
```

## 下一步

- 探索 [物理动画](/guide/physics)
- 学习 [手势交互](/guide/gesture)
- 查看 [滚动示例](/examples/scroll)

