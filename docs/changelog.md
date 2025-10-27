# 更新日志

查看 [CHANGELOG.md](../CHANGELOG.md) 获取完整的更新记录。

## v0.2.0 (最新)

### 🎉 重大更新

- **性能优化**: 70% GC 压力降低，WeakMap 内存管理
- **内存监控**: 新增内存监控和性能自适应系统
- **特殊动画**: 10个新的特殊动画预设
- **序列动画**: 新的动画序列组合器
- **调试工具**: 开发调试面板

### ✨ 新特性

#### 性能优化
- WeakMap 内存管理
- 精确 FPS 计算
- 空闲自动暂停
- 对象池复用
- 帧预算管理

#### 新增 API
- `memoryMonitor` - 内存监控
- `performanceAdaptive` - 性能自适应
- `createSequence` - 序列动画
- `createDebugger` - 调试工具

#### 特殊动画
- `heartbeat` - 心跳
- `shake` - 摇晃
- `wobble` - 晃动
- `flash` - 闪烁
- `pulse` - 脉冲
- `swing` - 摆动
- `rubberBand` - 橡皮筋
- `jello` - 果冻

### 🐛 Bug 修复

- 修复内存泄漏问题
- 修复 Timeline 嵌套问题
- 修复 ScrollTrigger 抖动
- 修复物理动画精度

### 📝 文档

- 完整的 VitePress 文档
- 新增性能优化指南
- 新增框架集成文档
- 丰富的示例代码

## v0.1.0

### 🎉 首次发布

#### 核心功能
- 基础动画 API (`to`, `from`, `fromTo`, `keyframes`)
- Timeline 时间轴
- CSS 预设动画 (12个)
- ScrollTrigger 滚动触发

#### 高级功能
- 物理动画 (Spring, Inertia)
- 手势交互 (Drag, Gesture)
- SVG 动画
- 过渡效果 (Page, FLIP)
- 高级效果 (Parallax, Particle, Text)

#### 框架集成
- Vue 3 集成 (Composables, 组件, 指令)
- React 集成 (Hooks, 组件)

#### 性能
- GPU 加速
- will-change 管理
- 批量 DOM 操作
- RAF 节流

---

[查看完整更新日志](../CHANGELOG.md)

