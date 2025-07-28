# Automation Guide

## 🤖 自动化概览

本文档描述了 `@ldesign/animation` 项目的自动化流程，包括 CI/CD、测试、发布、监控等各个环节的自动化配置。

## 🔄 CI/CD 流程

### GitHub Actions 工作流

#### 1. 持续集成 (CI)
**文件**: `.github/workflows/ci.yml`

**触发条件**:
- Push 到 `main` 或 `develop` 分支
- Pull Request 到 `main` 或 `develop` 分支

**执行步骤**:
```yaml
1. 代码检出
2. Node.js 环境设置 (18.x, 20.x)
3. 依赖安装
4. 代码检查 (ESLint)
5. 类型检查 (TypeScript)
6. 单元测试 + 覆盖率
7. 构建验证
8. 文档构建
9. 性能基准测试
```

#### 2. 自动发布 (Release)
**文件**: `.github/workflows/release.yml`

**触发条件**:
- 推送版本标签 (v*)

**执行步骤**:
```yaml
1. 完整测试流程
2. 构建生产版本
3. 生成变更日志
4. 发布到 NPM
5. 创建 GitHub Release
6. 部署文档到 GitHub Pages
7. 发送通知
```

### 自动化脚本

#### 构建脚本
```json
{
  "scripts": {
    "build": "vite build",
    "build:watch": "vite build --watch",
    "build:analyze": "npm run build && npm run analyze"
  }
}
```

#### 测试脚本
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

#### 质量检查脚本
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.vue",
    "lint:fix": "eslint src --ext .ts,.vue --fix",
    "type-check": "vue-tsc --noEmit",
    "format": "prettier --write src/"
  }
}
```

## 📊 自动化测试

### 测试类型

#### 1. 单元测试
- **工具**: Vitest
- **覆盖率**: 目标 95%+
- **自动运行**: 每次提交

```typescript
// 示例测试
describe('AnimationManager', () => {
  it('should create animation correctly', () => {
    const manager = new AnimationManager()
    const element = document.createElement('div')
    const animation = manager.createAnimation(element, {
      type: 'fadeIn',
      duration: 300
    })
    expect(animation).toBeDefined()
  })
})
```

#### 2. 集成测试
- **范围**: 组件间交互
- **环境**: JSDOM
- **自动运行**: CI 流程中

#### 3. 性能测试
- **工具**: 自定义基准测试
- **指标**: FPS, 内存使用, 执行时间
- **自动运行**: 每日定时

```typescript
// 性能测试示例
benchmark('Animation Creation', () => {
  const manager = new AnimationManager()
  const element = document.createElement('div')
  manager.createAnimation(element, { type: 'fadeIn' })
})
```

### 测试自动化配置

#### Vitest 配置
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        global: {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95
        }
      }
    }
  }
})
```

## 🚀 自动化部署

### NPM 发布

#### 版本管理
```bash
# 自动版本升级
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

#### 发布流程
```json
{
  "scripts": {
    "prepublishOnly": "npm run test && npm run build",
    "release:patch": "npm version patch && git push --tags",
    "release:minor": "npm version minor && git push --tags",
    "release:major": "npm version major && git push --tags"
  }
}
```

### 文档部署

#### VitePress 自动构建
```yaml
# GitHub Pages 部署
- name: Deploy docs
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./docs/.vitepress/dist
```

## 📈 监控与分析

### 性能监控

#### 自动化基准测试
```typescript
// scripts/benchmark.ts
import { performance } from 'perf_hooks'

class AutomatedBenchmark {
  async runBenchmarks() {
    const results = {
      animationCreation: await this.benchmarkAnimationCreation(),
      performanceMetrics: await this.benchmarkPerformance(),
      memoryUsage: await this.benchmarkMemory()
    }

    await this.saveResults(results)
    await this.compareWithBaseline(results)
  }
}
```

#### 性能回归检测
```typescript
// 自动检测性能回归
if (currentFPS < baselineFPS * 0.95) {
  throw new Error('Performance regression detected!')
}
```

### 包大小监控

#### Bundle Analyzer
```typescript
// scripts/bundle-analyzer.ts
import { analyzeBundle } from './utils'

const analysis = await analyzeBundle()
if (analysis.size > MAX_BUNDLE_SIZE) {
  console.warn('Bundle size exceeded limit!')
}
```

### 依赖安全扫描

#### 自动安全检查
```json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "security:check": "npm audit --audit-level moderate"
  }
}
```

## 🔧 开发自动化

### Git Hooks

#### Pre-commit
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

#### Commit 规范
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
    ]
  }
}
```

### 代码生成

#### 自动生成类型定义
```typescript
// scripts/generate-types.ts
import { generateDtsBundle } from 'dts-bundle-generator'

const config = {
  entries: [
    {
      filePath: './src/index.ts',
      outFile: './dist/index.d.ts'
    }
  ]
}

generateDtsBundle(config)
```

#### 自动生成文档
```typescript
// scripts/generate-docs.ts
import { generateApiDocs } from './utils'

// 从 TypeScript 代码生成 API 文档
const apiDocs = await generateApiDocs('./src')
await writeFile('./docs/api/generated.md', apiDocs)
```

## 📋 自动化清单

### 每次提交
- [x] 代码格式化 (Prettier)
- [x] 代码检查 (ESLint)
- [x] 类型检查 (TypeScript)
- [x] 单元测试
- [x] Commit 信息验证

### 每次 PR
- [x] 完整测试套件
- [x] 构建验证
- [x] 性能基准测试
- [x] 安全扫描
- [x] 依赖检查

### 每次发布
- [x] 完整测试
- [x] 构建生产版本
- [x] 生成变更日志
- [x] 更新版本号
- [x] 创建 Git 标签
- [x] 发布到 NPM
- [x] 部署文档
- [x] 创建 GitHub Release

### 定期任务
- [x] 依赖更新检查 (每周)
- [x] 安全漏洞扫描 (每日)
- [x] 性能基准测试 (每日)
- [x] 文档同步检查 (每日)

## 🛠️ 工具配置

### ESLint 自动化
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      // 自动修复规则
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'no-console': 'warn'
    }
  }
]
```

### Prettier 自动化
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### TypeScript 自动化
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 📊 自动化指标

### 成功率指标
- CI 通过率: 目标 > 95%
- 测试覆盖率: 目标 > 95%
- 构建成功率: 目标 > 98%
- 部署成功率: 目标 > 99%

### 性能指标
- CI 执行时间: 目标 < 10 分钟
- 构建时间: 目标 < 2 分钟
- 测试执行时间: 目标 < 30 秒
- 部署时间: 目标 < 5 分钟

### 质量指标
- 代码重复率: 目标 < 3%
- 技术债务: 目标 < 1 小时
- 安全漏洞: 目标 = 0
- 依赖过期: 目标 < 5%

## 🔮 未来改进

### 短期目标
1. **增强 CI/CD**
   - 并行测试执行
   - 智能测试选择
   - 缓存优化

2. **监控增强**
   - 实时性能监控
   - 错误追踪
   - 用户体验监控

### 长期目标
1. **AI 辅助**
   - 自动代码审查
   - 智能测试生成
   - 性能优化建议

2. **全链路自动化**
   - 自动化需求分析
   - 自动化代码生成
   - 自动化部署策略

## 📞 支持与维护

### 自动化问题排查
1. 检查 GitHub Actions 日志
2. 查看本地测试结果
3. 验证环境配置
4. 联系维护团队

### 自动化更