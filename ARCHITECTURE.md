# @ldesign/animation 架构文档

## 📁 项目结构对比

### 参考 @ldesign/engine 的架构

本项目参考了 `@ldesign/engine` 的成功架构模式：

```
@ldesign/animation/                      @ldesign/engine/
├── packages/                            ├── packages/
│   ├── core/          (核心包)         │   ├── core/          (核心引擎)
│   │   ├── src/                        │   │   ├── src/
│   │   ├── examples/  (launcher)       │   │   └── (无 examples)
│   │   ├── package.json                │   │   ├── package.json
│   │   ├── ldesign.config.ts  ✨新增   │   │   └── (无配置文件)
│   │   └── tsconfig.json               │   │   └── tsconfig.json
│   ├── vue/           (Vue 集成)       │   ├── vue/           (Vue 适配器)
│   │   ├── src/                        │   │   ├── src/
│   │   ├── examples/  (launcher) ✨新增│   │   ├── examples/   (HTML 演示)
│   │   ├── package.json                │   │   └── package.json
│   │   ├── ldesign.config.ts  ✨新增   │   │   └── (无配置文件)
│   │   └── tsconfig.json               │   │   └── tsconfig.json
│   ├── react/         (React 集成)     │   ├── react/         (React 适配器)
│   └── lit/           (Lit 集成)  ✨新增│   └── (无 Lit 包)
├── scripts/           (构建脚本) ✨新增 ├── scripts/          (构建脚本)
│   ├── build-all.js                    │   └── build.js
│   ├── build-examples.js   ✨新增      │
│   └── dev-examples.js     ✨新增      │
├── package.json                         ├── package.json
├── pnpm-workspace.yaml ✨新增           └── (无 workspace)
├── ldesign.config.ts                    └── ldesign.config.ts
└── README.md                            └── README.md
```

## 🎯 关键改进点

### 1. 子包配置方式

#### Engine 方式（命令行参数）
```json
{
  "scripts": {
    "build": "ldesign-builder build -f esm,cjs,dts",
    "dev": "ldesign-builder build -f esm,cjs,dts --watch"
  }
}
```

#### Animation 方式（配置文件）✨ 推荐
```typescript
// ldesign.config.ts
import { defineConfig } from '@ldesign/builder'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: ['esm', 'cjs', 'umd'],  // 新增 UMD 支持
    esm: { dir: 'es', preserveStructure: true },
    cjs: { dir: 'lib', preserveStructure: true },
    umd: { dir: 'dist', name: 'LDesignAnimationCore' }
  },
  dts: true,
  sourcemap: true,
  clean: true
})
```

**优势：**
- ✅ 配置更清晰，易于维护
- ✅ 支持更多配置选项（UMD、全局变量名等）
- ✅ 配置可复用和继承
- ✅ IDE 智能提示支持

### 2. 依赖声明方式

#### Engine 方式（相对路径）
```json
{
  "devDependencies": {
    "@ldesign/builder": "workspace:../../../../../../tools/builder"
  }
}
```

#### Animation 方式（通配符）✨ 推荐
```json
{
  "devDependencies": {
    "@ldesign/builder": "workspace:*"
  }
}
```

**优势：**
- ✅ 路径简洁，不易出错
- ✅ 包移动位置时无需修改
- ✅ pnpm 自动解析正确路径

### 3. Workspace 配置

#### Engine（无 workspace 配置）
- 子包直接在主包目录下，无独立 workspace

#### Animation（独立 workspace）✨ 新增
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'packages/*/examples'
```

**优势：**
- ✅ 子包完全独立，可单独发布
- ✅ 示例项目也被管理，可独立运行
- ✅ 依赖关系更清晰

### 4. 演示示例

#### Engine 方式（HTML 文件）
```
examples/
├── basic.html
├── full-featured.html
└── vite-demo/
```

#### Animation 方式（Launcher 项目）✨ 推荐
```
packages/*/examples/
├── index.html
├── launcher.config.ts
├── package.json
└── src/
    ├── main.ts
    └── App.vue/tsx
```

**优势：**
- ✅ 完整的项目结构，接近真实使用场景
- ✅ 支持 HMR 热更新
- ✅ 统一使用 @ldesign/launcher
- ✅ 可独立部署和分享

### 5. 构建脚本

#### Engine 方式
```json
{
  "scripts": {
    "build": "ldesign-builder build -f esm,cjs,dts",
    "dev:examples": "vite serve examples --port 5173"
  }
}
```

#### Animation 方式 ✨ 增强
```json
{
  "scripts": {
    "build": "pnpm run build:packages",
    "build:packages": "pnpm run build:core && pnpm run build:vue && pnpm run build:react && pnpm run build:lit",
    "dev:examples": "node scripts/dev-examples.js",
    "build:examples": "node scripts/build-examples.js"
  }
}
```

**新增脚本功能：**
- ✅ `dev-examples.js` - 交互式选择要启动的示例
- ✅ `build-examples.js` - 批量构建所有示例
- ✅ `build-all.js` - 按依赖顺序构建所有子包

## 📦 子包对比

| 特性 | Engine 子包 | Animation 子包 | 说明 |
|------|------------|----------------|------|
| **核心包名** | `@ldesign/engine-core` | `@ldesign/animation-core` | ✅ 命名一致 |
| **Vue 集成** | `@ldesign/engine-vue` | `@ldesign/animation-vue` | ✅ 命名一致 |
| **React 集成** | `@ldesign/engine-react` | `@ldesign/animation-react` | ✅ 命名一致 |
| **Lit 集成** | ❌ 无 | `@ldesign/animation-lit` | ✨ 新增支持 |
| **构建配置** | 命令行参数 | 配置文件 | ✨ 更灵活 |
| **UMD 支持** | ✅ 有 | ✅ 有 | ✅ 都支持 |
| **演示示例** | HTML + Vite | Launcher 项目 | ✨ 更完整 |
| **workspace** | ❌ 无 | ✅ 有 | ✨ 更独立 |

## 🏗️ 构建流程

### 依赖关系图

```
@ldesign/animation-core
       ↓
   ┌───┴───┬───────┬─────────┐
   ↓       ↓       ↓         ↓
  vue    react    lit    (其他框架)
```

### 构建顺序

1. **第一步：构建 core**
   ```bash
   pnpm --filter @ldesign/animation-core build
   ```

2. **第二步：并行构建框架集成包**
   ```bash
   pnpm --parallel --filter '@ldesign/animation-vue' --filter '@ldesign/animation-react' --filter '@ldesign/animation-lit' build
   ```

3. **第三步：构建示例（可选）**
   ```bash
   node scripts/build-examples.js
   ```

## 🚀 开发工作流

### 1. 开发核心功能

```bash
# 启动 core 包的监听模式
cd packages/animation/packages/core
pnpm dev

# 或在根目录
pnpm --filter @ldesign/animation-core dev
```

### 2. 开发框架集成

```bash
# 启动 vue 包的监听模式
pnpm --filter @ldesign/animation-vue dev

# 同时启动演示
pnpm dev:examples vue
```

### 3. 测试所有包

```bash
# 清理
pnpm clean

# 构建所有包
pnpm build

# 运行所有示例
pnpm dev:examples core   # 端口 5200
pnpm dev:examples vue    # 端口 5201
pnpm dev:examples react  # 端口 5202
pnpm dev:examples lit    # 端口 5203
```

## 💡 最佳实践

### 1. 包命名规范

- 核心包：`@ldesign/animation-core`
- 框架集成：`@ldesign/animation-{framework}`
- 示例项目：`@ldesign/animation-{framework}-examples` (private)

### 2. 依赖管理

```json
{
  "dependencies": {
    "@ldesign/animation-core": "workspace:*",
    "@ldesign/shared": "workspace:*"
  },
  "devDependencies": {
    "@ldesign/builder": "workspace:*",
    "@ldesign/launcher": "workspace:*"
  }
}
```

### 3. 构建配置

```typescript
// 统一的配置模板
export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: ['esm', 'cjs', 'umd'],
    esm: { dir: 'es', preserveStructure: true },
    cjs: { dir: 'lib', preserveStructure: true },
    umd: { dir: 'dist', name: 'GlobalName' }
  },
  dts: true,
  sourcemap: true,
  clean: true,
  external: [/* 外部依赖 */]
})
```

### 4. TypeScript 配置

```json
{
  "extends": "../../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./es",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@ldesign/animation-core": ["../core/src"]
    }
  }
}
```

## 📊 与 Engine 的改进总结

| 改进项 | 描述 | 优势 |
|--------|------|------|
| **配置文件化** | 使用 ldesign.config.ts | 更清晰、可维护性强 |
| **Workspace 独立** | 添加 pnpm-workspace.yaml | 子包完全独立 |
| **UMD 全局名** | 明确指定全局变量名 | CDN 使用更友好 |
| **Launcher 示例** | 完整的示例项目 | 接近真实场景 |
| **批量脚本** | 添加批量构建/运行脚本 | 提升开发效率 |
| **Lit 支持** | 新增 Web Components 集成 | 支持更多框架 |

## 🔄 持续改进

### 待优化项

1. **测试覆盖** - 参考 engine 的完整测试体系
2. **文档完善** - 添加更详细的 API 文档
3. **性能基准** - 添加性能测试和基准
4. **E2E 测试** - 添加端到端测试

### 未来扩展

- [ ] 添加 Svelte 集成
- [ ] 添加 Solid 集成
- [ ] 添加 Angular 集成
- [ ] 完善 DevTools 支持

---

**总结：**animation 包在 engine 的成功经验基础上，进行了针对性的改进和优化，特别是在构建配置、示例管理和开发体验方面有显著提升。


