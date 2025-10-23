# @ldesign/animation Vite 示例项目

这是一个完整的 Vite 示例项目，展示了 `@ldesign/animation` 的所有功能。

## 🚀 运行项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build
```

## 📚 示例内容

### 1. 基础动画
- `to()` - 动画到目标值
- `from()` - 从起始值动画
- `fromTo()` - 完整控制
- `keyframes()` - 关键帧动画

### 2. Timeline 时间轴
- 顺序动画
- 重叠动画（Overlap）
- 标签控制（Labels）
- 时间控制（play/pause/restart/reverse）

### 3. 滚动动画
- 滚动触发预设
- fadeIn/slideIn/zoomIn/rotateIn
- IntersectionObserver 检测

### 4. 物理动画
- Spring 弹簧动画（5种预设）
- Inertia 惯性动画
- 边界弹回

### 5. 手势动画
- Draggable 拖拽
- 手势识别（tap/press/swipe/hover）

### 6. 高级效果
- Parallax 视差滚动
- Particle 粒子系统
- Text 文字动画（打字机/逐字）

## 💡 使用方式

通过包名引入：

```typescript
import {
  to,
  from,
  createTimeline,
  fadeIn,
  spring,
  draggable,
  // ... 更多 API
} from '@ldesign/animation'
```

## 🎯 特点

- ✅ 完整的功能演示
- ✅ 交互式示例
- ✅ 代码清晰易懂
- ✅ 响应式设计
- ✅ 通过包名引入（workspace:*）

## 📖 文档

详见主目录的 README.md






