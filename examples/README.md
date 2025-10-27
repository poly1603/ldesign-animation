# @ldesign/animation 示例

本目录包含各种 @ldesign/animation 的使用示例。

## 📁 示例列表

### 基础示例

#### `basic.html`
最简单的入门示例，展示基础动画API的使用。

**包含内容**：
- `to()`, `from()`, `fromTo()` 基础动画
- CSS 预设动画（fadeIn, slideInUp, zoomIn 等）
- 动画控制（播放、暂停、重启）

**适合人群**：初学者

#### `simple-test.html`
快速功能测试页面。

**包含内容**：
- 所有预设动画的快速测试
- Timeline 基础演示
- 滚动动画演示

**适合人群**：快速验证功能

### 完整示例

#### `comprehensive-demo.html`
完整功能演示，包含所有主要特性。

**包含内容**：
- 基础动画（淡入、滑入、缩放等）
- Timeline 时间轴
- 拖拽交互
- 物理动画（弹簧、惯性）
- 特殊效果（心跳、摇晃、脉冲等）
- 滚动动画
- 性能监控

**适合人群**：了解全部功能

#### `physics-playground.html`
物理动画互动游乐场。

**包含内容**：
- 弹簧动画参数调节
- 惯性动画实时演示
- 多球物理模拟
- 实时数据显示

**适合人群**：深入了解物理动画

### Vite 完整项目

#### `vite-demo/`
完整的 Vite 项目示例。

**运行方式**：
```bash
cd vite-demo
pnpm install
pnpm run dev
```

**包含页面**：
- `index.html` - 主页，展示所有基础功能
- `advanced.html` - 高级功能演示
- `performance.html` - 性能基准测试
- `test.html` - 功能测试页面

**适合人群**：生产环境参考

## 🚀 快速开始

### 方式 1：直接打开 HTML

```bash
# 在浏览器中打开任意 HTML 文件
open basic.html
open comprehensive-demo.html
open physics-playground.html
```

::: warning 注意
直接打开 HTML 文件可能因为 ES 模块导入问题无法正常工作。
建议使用本地服务器或 Vite 项目。
:::

### 方式 2：使用本地服务器

```bash
# 安装 http-server
npm install -g http-server

# 在 examples 目录运行
http-server -p 3000

# 访问 http://localhost:3000
```

### 方式 3：使用 Vite 项目（推荐）

```bash
cd vite-demo
pnpm install
pnpm run dev

# 访问 http://localhost:5174
```

## 📚 学习路径

### 1. 初学者路径

1. **basic.html** - 了解基础动画
2. **simple-test.html** - 尝试预设动画
3. **vite-demo/index.html** - 完整项目结构

### 2. 进阶路径

1. **comprehensive-demo.html** - 所有功能概览
2. **physics-playground.html** - 深入物理动画
3. **vite-demo/advanced.html** - 高级技巧

### 3. 性能优化路径

1. **vite-demo/performance.html** - 性能基准
2. 阅读性能监控API
3. 实践优化技巧

## 🎯 示例特性

### 基础动画
- ✅ to/from/fromTo
- ✅ 关键帧动画
- ✅ CSS 预设动画
- ✅ 缓动函数

### Timeline
- ✅ 串行动画
- ✅ 并行动画
- ✅ 时间标签
- ✅ 播放控制

### 滚动动画
- ✅ ScrollTrigger
- ✅ 滚动预设
- ✅ 视差效果
- ✅ InView 检测

### 物理动画
- ✅ 弹簧动画
- ✅ 惯性动画
- ✅ 弹簧预设
- ✅ 边界约束

### 手势交互
- ✅ 拖拽
- ✅ 手势识别
- ✅ 边界限制
- ✅ 惯性拖拽

### 特殊效果
- ✅ 心跳、摇晃
- ✅ 脉冲、闪烁
- ✅ 摆动、晃动
- ✅ 橡皮筋、果冻

### 性能
- ✅ 性能监控
- ✅ 内存管理
- ✅ FPS 显示
- ✅ 性能自适应

## 💡 常见用例

### 1. 页面加载动画

```html
<!-- 参考 comprehensive-demo.html -->
淡入 + 交错动画
```

### 2. 按钮交互

```html
<!-- 参考 vite-demo/index.html -->
弹簧按钮效果
```

### 3. 卡片列表

```html
<!-- 参考 vite-demo/advanced.html -->
滚动显示 + FLIP 动画
```

### 4. 拖拽排序

```html
<!-- 参考 physics-playground.html -->
拖拽 + 惯性
```

### 5. 滚动网站

```html
<!-- 参考 comprehensive-demo.html -->
ScrollTrigger + 视差
```

## 🔧 自定义示例

想创建自己的示例？使用这个模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的示例</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background: #667eea;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  
  <script type="module">
    import { to } from '../es/index.js'
    
    to('.box', { x: 100 })
  </script>
</body>
</html>
```

## 📖 更多资源

- [完整文档](../docs/index.md)
- [API 参考](../docs/api/core.md)
- [性能指南](../docs/guide/performance.md)
- [Vue 集成](../docs/guide/vue.md)
- [React 集成](../docs/guide/react.md)

## ❓ 遇到问题？

1. 检查浏览器控制台错误
2. 确认已构建项目 (`pnpm run build`)
3. 使用本地服务器而不是直接打开文件
4. 查看[文档](../docs)

## 🤝 贡献示例

欢迎贡献新的示例！请确保：

- ✅ 代码清晰易懂
- ✅ 包含注释说明
- ✅ 使用语义化的命名
- ✅ 遵循项目风格
- ✅ 更新本 README

## 📄 许可证

MIT License © LDesign Team

