# 🚀 快速开始指南

## 📦 现在可以做什么？

### 1. 安装依赖

```bash
cd packages/animation
pnpm install
```

### 2. 构建所有包

```bash
# 构建所有子包（按依赖顺序）
pnpm build

# 输出：
# 📦 构建 @ldesign/animation-core...
# ✅ core 构建成功
# 📦 构建 @ldesign/animation-vue...
# 📦 构建 @ldesign/animation-react...
# ... (并行构建)
# ✅ 所有子包构建完成！
```

### 3. 运行演示示例

```bash
# 启动 Vue 演示
pnpm dev:examples vue
# 浏览器自动打开 http://localhost:5201

# 或启动其他框架
pnpm dev:examples core     # http://localhost:5200
pnpm dev:examples react    # http://localhost:5202
pnpm dev:examples lit      # http://localhost:5203
pnpm dev:examples solid    # http://localhost:5204
pnpm dev:examples svelte   # http://localhost:5205
```

### 4. 开发模式

```bash
# 监听所有包的变化（并行）
pnpm dev

# 或只监听特定包
pnpm --filter @ldesign/animation-core dev
pnpm --filter @ldesign/animation-vue dev
```

## 🎯 已完成的内容

### ✅ 配置文件

所有子包都已配置完成：

- ✅ package.json（依赖、脚本、导出）
- ✅ ldesign.config.ts（构建配置）
- ✅ tsconfig.json（TypeScript 配置）
- ✅ README.md（使用文档）

### ✅ 演示示例

每个框架都有完整的演示项目：

- ✅ index.html
- ✅ launcher.config.ts（位置正确 ✓）
- ✅ package.json
- ✅ src/main.ts(x)
- ✅ src/App.vue/tsx/svelte

### ✅ 核心代码框架

Core 包已有基础实现：

- ✅ 完整的类型定义（`types/`）
- ✅ 核心引擎框架（`core/engine.ts`）
- ✅ 27 种缓动函数（`core/easing.ts`）
- ✅ 时间轴系统（`timeline/timeline.ts`）
- ✅ 物理动画（`physics/spring.ts`）
- ✅ 滚动触发器（`scroll/scroll-trigger.ts`）
- ✅ 手势拖拽（`gesture/draggable.ts`）
- ✅ SVG 路径（`svg/path.ts`）
- ✅ 工具函数（`utils/`）

### ✅ 测试配置

- ✅ vitest.config.ts
- ✅ 示例测试用例（__tests__/）

### ✅ 构建脚本

- ✅ build-all.js（按依赖顺序构建）
- ✅ dev-examples.js（交互式启动示例）
- ✅ build-examples.js（批量构建示例）

## 🔨 下一步要做什么

### Phase 1: 完善核心引擎（必需）

```bash
cd packages/core/src
```

**需要实现：**

1. **`core/engine.ts` - 动画引擎核心逻辑**
   ```typescript
   // TODO: 
   // - 属性插值
   // - DOM 更新
   // - 动画循环
   // - 状态管理
   ```

2. **`timeline/timeline.ts` - 时间轴完整实现**
   ```typescript
   // TODO:
   // - 动画同步
   // - 时间偏移
   // - 播放控制
   ```

3. **`physics/spring.ts` - 物理模拟**
   ```typescript
   // TODO:
   // - 弹簧力计算
   // - 速度积分
   // - 位置更新
   ```

### Phase 2: 实现框架集成

#### Vue

```bash
cd packages/vue/src
```

创建文件：
- `composables/useAnimate.ts`
- `components/Motion.vue`
- `directives/vAnimate.ts`

#### React

```bash
cd packages/react/src
```

创建文件：
- `hooks/useAnimate.ts`
- `components/Motion.tsx`

#### 其他框架同理

### Phase 3: 完善演示示例

将演示中的临时代码替换为真实的动画效果：

```typescript
// examples/src/main.ts

// ❌ 当前（临时代码）
basicBox.style.transition = 'all 1s ease'
basicBox.style.transform = 'translateX(100px)'

// ✅ 替换为真实代码
import { animate } from '@ldesign/animation-core'
animate({
  targets: basicBox,
  translateX: 100,
  duration: 1000,
  easing: 'easeOutExpo'
})
```

### Phase 4: 添加测试

```bash
cd packages/core
pnpm test
```

完善测试用例覆盖所有功能。

## 📚 开发参考

### 核心引擎实现参考

**关键技术点：**

1. **requestAnimationFrame 循环**
```typescript
class AnimationEngine {
  private tick = () => {
    const now = performance.now()
    const delta = now - this.lastTime
    
    // 更新所有动画
    this.updateAnimations(delta)
    
    // 继续循环
    if (this.hasActiveAnimations()) {
      this.rafId = requestAnimationFrame(this.tick)
    }
  }
}
```

2. **属性插值**
```typescript
function interpolate(from: number, to: number, progress: number, easing: EasingFunction) {
  const easedProgress = easing(progress)
  return from + (to - from) * easedProgress
}
```

3. **Transform 优化**
```typescript
// 批量更新 transform
const transforms = []
if (translateX) transforms.push(`translateX(${translateX}px)`)
if (rotate) transforms.push(`rotate(${rotate}deg)`)
element.style.transform = transforms.join(' ')
```

## 🧪 测试指南

### 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test --watch

# 覆盖率报告
pnpm test:coverage

# UI 模式
pnpm test:ui
```

### 添加新测试

```typescript
// __tests__/your-feature.test.ts
import { describe, it, expect } from 'vitest'
import { yourFunction } from '../src/your-feature'

describe('yourFunction', () => {
  it('should work correctly', () => {
    const result = yourFunction(input)
    expect(result).toBe(expected)
  })
})
```

## 🎨 代码风格

### 1. 使用 TypeScript

```typescript
// ✅ 正确
export function animate(options: AnimationOptions): Animation {
  // 完整的类型定义
}

// ❌ 错误
export function animate(options: any): any {
  // 不要使用 any
}
```

### 2. 添加 JSDoc

```typescript
/**
 * 函数说明
 * 
 * @param param - 参数说明
 * @returns 返回值说明
 * @example
 * ```typescript
 * const result = func(param)
 * ```
 */
export function func(param: Type): ReturnType {
  // 实现
}
```

### 3. 性能优先

```typescript
// ✅ 缓存计算结果
const cache = new Map()

// ✅ 避免重复的 DOM 查询
const element = document.querySelector('.box')

// ✅ 使用 requestAnimationFrame
requestAnimationFrame(() => {
  // 动画更新
})
```

## 🐛 调试技巧

### 1. 使用浏览器 DevTools

```javascript
// 在关键位置添加断点
debugger

// 或使用 console.log
console.log('Animation progress:', progress)
```

### 2. 性能分析

在 Chrome DevTools 的 Performance 面板中录制动画，查看：

- FPS（帧率）
- 渲染时间
- 内存使用

### 3. 动画调试

```typescript
// 添加调试选项
animate({
  targets: '.box',
  translateX: 250,
  duration: 1000,
  debug: true,  // 输出调试信息
  onUpdate: (progress) => {
    console.log('Progress:', progress)
  }
})
```

## 📖 更多资源

- [完整架构文档](./ARCHITECTURE.md)
- [框架对比](./FRAMEWORK_COMPARISON.md)
- [贡献指南](./CONTRIBUTING.md)
- [构建验证](./BUILD_VERIFICATION.md)

---

**准备好开始开发了！🎉**

