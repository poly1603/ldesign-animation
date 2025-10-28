# @ldesign/animation 开发指南

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
cd packages/animation
pnpm install
```

### 开发工作流

```bash
# 1. 开发核心包
cd packages/core
pnpm dev    # 监听模式构建

# 2. 开发框架包（另一个终端）
cd packages/vue
pnpm dev

# 3. 运行演示（第三个终端）
cd ../..    # 回到 animation 根目录
pnpm dev:examples vue
```

## 📦 核心实现架构

### 已实现的基础框架

#### 1. 类型系统 (`src/types/index.ts`)

✅ **完整的 TypeScript 类型定义：**

- `AnimationOptions` - 动画配置选项
- `Animation` - 动画实例接口
- `TimelineOptions` - 时间轴配置
- `SpringOptions` - 物理动画配置
- `ScrollTriggerOptions` - 滚动触发配置
- `GestureOptions` - 手势配置
- `SVGPathOptions` - SVG 路径动画配置

#### 2. 核心引擎 (`src/core/`)

✅ **基础实现：**

- `animate()` - 创建动画实例（框架）
- `AnimationEngine` - 全局动画引擎
- `globalEngine` - 单例引擎实例

✅ **缓动函数** (`easing.ts`):

- 27 种内置缓动函数
- Linear, Quad, Cubic, Quart, Quint
- Expo, Circ, Back, Elastic, Bounce
- 支持自定义缓动函数

#### 3. 时间轴系统 (`src/timeline/`)

✅ **基础实现：**

- `Timeline` 类
- `.add()` - 添加动画（支持时间偏移）
- `.play()`, `.pause()`, `.restart()`, `.reverse()`
- 支持相对和绝对时间偏移

#### 4. 物理动画 (`src/physics/`)

✅ **弹簧动画：**

- `spring()` - 创建弹簧动画
- `calculateSpringPosition()` - 计算弹簧位置
- 基于胡克定律的物理模拟
- 支持刚度、阻尼、质量参数

#### 5. 滚动动画 (`src/scroll/`)

✅ **滚动触发器：**

- `scrollTrigger()` - 创建滚动触发器
- `ScrollTrigger` 类
- 基于 IntersectionObserver
- 支持进入/离开回调

#### 6. 手势系统 (`src/gesture/`)

✅ **拖拽功能：**

- `useDraggable()` - 使元素可拖拽
- 支持边界限制
- 支持惯性效果
- 基于 Pointer Events

#### 7. SVG 动画 (`src/svg/`)

✅ **路径动画：**

- `svgPath()` - SVG 路径动画
- `getPathLength()` - 获取路径长度
- `getPointAtProgress()` - 获取路径上的点

#### 8. 工具函数 (`src/utils/`)

✅ **完整实现：**

- `getTargets()` - 获取目标元素
- `lerp()`, `clamp()`, `map()` - 数学工具
- `parseUnit()`, `formatValue()` - 单位处理
- `throttle()`, `debounce()` - 性能优化
- 样式操作、类型判断等

## 🎯 开发任务清单

### Phase 1: 核心动画引擎（优先级：高）

#### 1.1 完善 `AnimationEngine`

```typescript
// src/core/engine.ts

class AnimationEngine {
  // TODO: 实现以下功能
  
  // 1. 动画属性插值
  private interpolate(from: number, to: number, progress: number): number
  
  // 2. CSS 属性更新
  private updateElement(element: Element, props: AnimationProps, progress: number): void
  
  // 3. 动画循环管理
  private tick(): void
  
  // 4. 动画状态机
  private state: 'idle' | 'playing' | 'paused' | 'finished'
}
```

#### 1.2 实现 `animate()` 函数

```typescript
// src/core/engine.ts

export function animate(options: AnimationOptions): Animation {
  // TODO: 实现
  // 1. 解析目标元素
  // 2. 解析动画属性（from/to）
  // 3. 创建动画实例
  // 4. 添加到全局引擎
  // 5. 返回控制接口
}
```

### Phase 2: 时间轴系统（优先级：高）

#### 2.1 完善 `Timeline` 类

```typescript
// src/timeline/timeline.ts

class Timeline {
  // TODO: 实现
  // 1. 动画同步播放
  // 2. 时间偏移计算
  // 3. 循环和反向
  // 4. 进度控制
}
```

### Phase 3: 物理动画（优先级：中）

#### 3.1 完善弹簧动画

```typescript
// src/physics/spring.ts

export function spring(options: SpringOptions): Animation {
  // TODO: 实现
  // 1. 弹簧力计算
  // 2. 速度积分
  // 3. 位置更新
  // 4. 停止条件判断
}
```

#### 3.2 添加其他物理效果

```typescript
// src/physics/decay.ts
export function decay(options): Animation

// src/physics/inertia.ts
export function inertia(options): Animation
```

### Phase 4: 滚动动画（优先级：中）

#### 4.1 增强 `ScrollTrigger`

```typescript
// src/scroll/scroll-trigger.ts

// TODO: 添加
// 1. 精确的进度计算
// 2. 固定（pin）功能
// 3. 跟随滚动（scrub）
// 4. 调试标记
```

### Phase 5: 预设动画（优先级：低）

#### 5.1 CSS 预设

```typescript
// src/presets/css/fade.ts
export const fadeIn, fadeOut, fadeInUp, fadeInDown

// src/presets/css/slide.ts
export const slideInLeft, slideInRight, slideInUp, slideInDown

// src/presets/css/zoom.ts
export const zoomIn, zoomOut

// src/presets/css/rotate.ts
export const rotateIn, rotateOut
```

### Phase 6: 框架集成（优先级：高）

#### 6.1 Vue 集成

```typescript
// packages/vue/src/composables/useAnimate.ts
export function useAnimate(target, options) {
  // 使用 core 包的 animate()
  // 返回响应式的控制接口
}

// packages/vue/src/components/Motion.vue
// 创建 Motion 组件

// packages/vue/src/directives/vAnimate.ts
// 创建 v-animate 指令
```

#### 6.2 React 集成

```typescript
// packages/react/src/hooks/useAnimate.ts
export function useAnimate(target, options) {
  // 使用 useRef 和 useEffect
  // 集成 core 包的 animate()
}

// packages/react/src/components/Motion.tsx
// 创建 Motion 组件
```

#### 6.3 其他框架

按照相同模式实现 Lit, Solid, Svelte, Angular 集成。

## 🔧 实现细节

### 动画属性插值

```typescript
// 示例实现
function interpolate(from: number, to: number, progress: number, easing: EasingFunction): number {
  const easedProgress = easing(progress)
  return from + (to - from) * easedProgress
}
```

### CSS Transform 处理

```typescript
// 需要特别处理 transform 属性
function applyTransform(element: HTMLElement, props: TransformProps): void {
  const transforms = []
  
  if (props.translateX !== undefined) transforms.push(`translateX(${props.translateX}px)`)
  if (props.translateY !== undefined) transforms.push(`translateY(${props.translateY}px)`)
  if (props.rotate !== undefined) transforms.push(`rotate(${props.rotate}deg)`)
  if (props.scale !== undefined) transforms.push(`scale(${props.scale})`)
  
  element.style.transform = transforms.join(' ')
}
```

### requestAnimationFrame 循环

```typescript
class AnimationEngine {
  private tick = (): void => {
    const now = performance.now()
    const deltaTime = now - this.lastTime
    this.lastTime = now

    // 更新所有活动动画
    for (const animation of this.animations) {
      animation.update(deltaTime)
      
      if (animation.isFinished) {
        this.animations.delete(animation)
      }
    }

    // 继续循环
    if (this.animations.size > 0) {
      this.rafId = requestAnimationFrame(this.tick)
    }
  }
}
```

## 🧪 测试策略

### 单元测试

```bash
# 在子包目录运行测试
cd packages/core
pnpm test

# 或使用 vitest UI
pnpm test:ui
```

### 测试用例示例

```typescript
// __tests__/core/easing.test.ts
import { describe, it, expect } from 'vitest'
import { linear, easeInQuad, easeOutQuad } from '../src/core/easing'

describe('Easing Functions', () => {
  it('linear should return input value', () => {
    expect(linear(0)).toBe(0)
    expect(linear(0.5)).toBe(0.5)
    expect(linear(1)).toBe(1)
  })

  it('easeInQuad should accelerate', () => {
    expect(easeInQuad(0.5)).toBeLessThan(0.5)
  })

  it('easeOutQuad should decelerate', () => {
    expect(easeOutQuad(0.5)).toBeGreaterThan(0.5)
  })
})
```

## 📝 代码规范

### 1. 使用 TypeScript 严格模式

```typescript
// ✅ 正确
export function animate(options: AnimationOptions): Animation {
  // 所有参数和返回值都有类型
}

// ❌ 错误
export function animate(options: any): any {
  // 不要使用 any
}
```

### 2. 添加完整的 JSDoc 注释

```typescript
/**
 * 创建动画实例
 * 
 * @param options - 动画配置选项
 * @returns 动画实例
 * @example
 * ```typescript
 * const animation = animate({
 *   targets: '.box',
 *   translateX: 250,
 *   duration: 1000
 * })
 * ```
 */
export function animate(options: AnimationOptions): Animation {
  // 实现
}
```

### 3. 使用 ESLint

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix
```

### 4. 性能考虑

```typescript
// ✅ 使用 WeakMap 缓存
const cache = new WeakMap<Element, ComputedStyle>()

// ✅ 避免频繁的 DOM 操作
const transform = calculateTransform(props)
element.style.transform = transform  // 一次性设置

// ✅ 使用 requestAnimationFrame
requestAnimationFrame(() => {
  // 动画更新
})
```

## 📚 参考资源

### 动画库参考

- [GSAP](https://greensock.com/gsap/) - 行业标准动画库
- [anime.js](https://animejs.com/) - 轻量级动画库
- [Framer Motion](https://www.framer.com/motion/) - React 动画库
- [Motion One](https://motion.dev/) - Web Animations API 封装

### 物理动画

- [Rebound](http://facebook.github.io/rebound-js/) - Facebook 的弹簧动画库
- [Popmotion](https://popmotion.io/) - 物理动画工具集

### Web APIs

- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

## 🤝 贡献流程

1. Fork 项目
2. 创建功能分支: `git checkout -b feat/your-feature`
3. 实现功能
4. 添加测试
5. 提交代码: `git commit -m "feat(core): add new feature"`
6. 推送分支: `git push origin feat/your-feature`
7. 创建 Pull Request

## 💡 常见问题

### Q: 如何调试动画？

A: 使用浏览器开发者工具的性能面板，或者添加 `console.log` 在关键帧。

### Q: 如何优化性能？

A: 
1. 使用 `transform` 和 `opacity`（GPU 加速）
2. 避免布局抖动（批量读写 DOM）
3. 使用 `will-change` CSS 属性
4. 限制同时运行的动画数量

### Q: 如何处理响应式？

A: 使用 `ResizeObserver` 监听元素大小变化，动态调整动画参数。

---

**Happy Coding! 🎨**

