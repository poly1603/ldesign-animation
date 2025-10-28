# 贡献指南

感谢你考虑为 @ldesign/animation 做出贡献！

## 🚀 快速开始

### 1. Fork 和 Clone

```bash
# Fork 项目后 clone 到本地
git clone https://github.com/YOUR_USERNAME/ldesign.git
cd ldesign/packages/animation

# 安装依赖
pnpm install
```

### 2. 开发流程

```bash
# 创建新分支
git checkout -b feat/your-feature

# 开发...
# 构建测试
pnpm build

# 运行示例
pnpm dev:examples vue

# 提交
git add .
git commit -m "feat(core): add new feature"
git push origin feat/your-feature
```

### 3. 创建 Pull Request

在 GitHub 上创建 PR，描述你的改动。

## 📝 开发规范

### 代码规范

- 遵循项目的 ESLint 配置
- 使用 TypeScript 严格模式
- 所有导出的 API 必须有 JSDoc 注释
- 注释使用中文

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 其他杂项

**示例：**
```
feat(core): 添加弹簧物理动画支持

实现了基于胡克定律的弹簧物理模拟：
- 支持自定义刚度、阻尼、质量参数
- 自动计算动画时长
- 性能优化，使用 requestAnimationFrame

Closes #123
```

## 🏗️ 项目结构

```
packages/animation/
├── packages/
│   ├── core/          # 核心引擎
│   ├── vue/           # Vue 集成
│   ├── react/         # React 集成
│   └── lit/           # Lit 集成
└── scripts/           # 构建脚本
```

## 📦 添加新功能

### 1. 在 core 包中添加功能

```bash
# 进入 core 包
cd packages/core

# 创建新功能模块
mkdir -p src/new-feature
touch src/new-feature/index.ts
touch src/new-feature/types.ts

# 在 src/index.ts 中导出
# export * from './new-feature'
```

### 2. 添加类型定义

```typescript
// src/new-feature/types.ts

/**
 * 新功能配置选项
 */
export interface NewFeatureOptions {
  /** 选项1的说明 */
  option1: string
  /** 选项2的说明 */
  option2?: number
}
```

### 3. 实现功能

```typescript
// src/new-feature/index.ts

import type { NewFeatureOptions } from './types'

/**
 * 新功能函数
 * 
 * @param options - 配置选项
 * @returns 处理结果
 * @example
 * ```typescript
 * const result = newFeature({ option1: 'value' })
 * ```
 */
export function newFeature(options: NewFeatureOptions): void {
  // 实现逻辑
}
```

### 4. 添加测试

```typescript
// src/new-feature/__tests__/index.test.ts

import { describe, it, expect } from 'vitest'
import { newFeature } from '../index'

describe('newFeature', () => {
  it('should work correctly', () => {
    const result = newFeature({ option1: 'test' })
    expect(result).toBeDefined()
  })
})
```

### 5. 更新文档

在 README.md 中添加使用说明。

### 6. 在框架集成中使用

如果需要在 Vue/React/Lit 中暴露新功能，相应更新各框架包。

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行特定包的测试
pnpm --filter @ldesign/animation-core test

# 生成覆盖率报告
pnpm test:coverage
```

## 📚 文档

- 所有公开 API 必须有 JSDoc 注释
- 复杂功能需要在 README 中添加示例
- 更新 CHANGELOG.md

## ✅ Pull Request 检查清单

在提交 PR 前，确保：

- [ ] 代码通过 `pnpm lint` 检查
- [ ] 添加了必要的测试
- [ ] 所有测试通过 `pnpm test`
- [ ] 更新了相关文档
- [ ] 提交信息符合规范
- [ ] 代码有完整的类型定义
- [ ] 添加了 JSDoc 注释

## 💬 获取帮助

- [GitHub Issues](https://github.com/ldesign/animation/issues)
- [GitHub Discussions](https://github.com/ldesign/animation/discussions)

## 📄 许可证

通过贡献代码，你同意你的贡献将使用 MIT 许可证。


