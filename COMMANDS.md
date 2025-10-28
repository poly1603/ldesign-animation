# 📝 命令速查表

所有可用的命令和脚本快速参考。

## 🏗️ 构建命令

### 构建所有包

```bash
# 按依赖顺序构建所有子包
pnpm build

# 等同于
pnpm run build:packages
```

### 构建特定包

```bash
# 构建 core 包
pnpm build:core

# 并行构建所有框架包
pnpm build:frameworks

# 构建特定框架包
pnpm build:vue
pnpm build:react
pnpm build:lit
pnpm build:solid
pnpm build:svelte
pnpm build:angular
```

### 监听模式

```bash
# 监听所有包（并行）
pnpm dev

# 监听特定包
pnpm --filter @ldesign/animation-core dev
pnpm --filter @ldesign/animation-vue dev
```

## 🎨 演示示例

### 启动演示

```bash
# 交互式选择（推荐）
pnpm dev:examples

# 直接启动特定框架
pnpm dev:examples core     # http://localhost:5200
pnpm dev:examples vue      # http://localhost:5201
pnpm dev:examples react    # http://localhost:5202
pnpm dev:examples lit      # http://localhost:5203
pnpm dev:examples solid    # http://localhost:5204
pnpm dev:examples svelte   # http://localhost:5205
```

### 构建演示

```bash
# 构建所有演示
pnpm build:examples

# 构建特定演示
cd packages/vue/examples
pnpm build
```

## 🧹 清理命令

```bash
# 清理所有构建产物
pnpm clean

# 清理根目录
pnpm clean:root

# 清理所有子包
pnpm clean:packages

# 清理特定包
cd packages/core
pnpm clean
```

## 🧪 测试命令

### 运行测试

```bash
# 运行 core 包的测试
cd packages/core
pnpm test

# 监听模式
pnpm test --watch

# 生成覆盖率报告
pnpm test:coverage

# UI 模式
pnpm test:ui
```

## 🔍 代码质量

### Lint 检查

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix

# 检查特定包
cd packages/core
pnpm lint
```

### 类型检查

```bash
# 类型检查（如果配置了）
pnpm type-check

# 特定包
cd packages/vue
pnpm type-check
```

## 📦 包管理

### 安装依赖

```bash
# 安装所有依赖
pnpm install

# 更新依赖
pnpm update

# 添加依赖到特定包
pnpm --filter @ldesign/animation-core add package-name
```

### 查看依赖

```bash
# 查看依赖树
pnpm list

# 查看特定包的依赖
pnpm --filter @ldesign/animation-core list
```

## 🔧 开发工作流

### 场景1：开发核心功能

```bash
# 终端 1: 监听 core 包
cd packages/core
pnpm dev

# 终端 2: 启动演示
cd ../..
pnpm dev:examples core
```

### 场景2：开发 Vue 集成

```bash
# 终端 1: 监听 core 包
pnpm --filter @ldesign/animation-core dev

# 终端 2: 监听 vue 包
pnpm --filter @ldesign/animation-vue dev

# 终端 3: 启动 Vue 演示
pnpm dev:examples vue
```

### 场景3：全面开发

```bash
# 终端 1: 监听所有包
pnpm dev

# 终端 2: 启动你需要的演示
pnpm dev:examples vue
```

## 📊 分析命令

### 包大小分析

```bash
cd packages/core
pnpm build

# 查看构建产物大小
ls -lh es/
ls -lh lib/
ls -lh dist/
```

### 依赖分析

```bash
# 查看为什么包含某个依赖
pnpm why package-name
```

## 🚀 发布命令

### 发布前准备

```bash
# 1. 清理
pnpm clean

# 2. 构建
pnpm build

# 3. 测试
cd packages/core
pnpm test:run

# 4. 检查包内容
pnpm pack --dry-run
```

### 发布（按顺序）

```bash
# 1. 先发布 core
cd packages/core
pnpm publish

# 2. 再发布框架包（可并行）
cd ../vue && pnpm publish
cd ../react && pnpm publish
cd ../lit && pnpm publish
cd ../solid && pnpm publish
cd ../svelte && pnpm publish
cd ../angular && pnpm publish
```

## 💡 常用组合

### 完整的开发流程

```bash
# 1. 克隆并安装
git clone xxx
cd packages/animation
pnpm install

# 2. 构建
pnpm build

# 3. 运行演示
pnpm dev:examples vue

# 4. 开发（另一个终端）
pnpm dev
```

### 快速验证

```bash
# 清理 -> 构建 -> 测试
pnpm clean && pnpm build && cd packages/core && pnpm test
```

### CI/CD 流程

```bash
# 完整的 CI 流程
pnpm install
pnpm lint
pnpm build
pnpm test
```

## 🔗 快捷链接

- [快速开始](./QUICK_START.md)
- [开发指南](./DEVELOPMENT_GUIDE.md)
- [构建验证](./BUILD_VERIFICATION.md)
- [完整状态](./COMPLETE_STATUS.md)

---

**提示：**将此文件加入书签，便于快速查找命令！

