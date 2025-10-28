# 框架对比：@ldesign/engine vs @ldesign/animation

## 📊 框架支持对比

| 框架 | Engine | Animation | 说明 |
|------|--------|-----------|------|
| **Core** | ✅ | ✅ | 核心包 |
| **Vue** | ✅ | ✅ | Vue 3 |
| **React** | ✅ | ✅ | React 18 |
| **Lit** | ❌ | ✅ | Web Components（Animation 新增）|
| **Solid** | ✅ | ✅ | Solid.js |
| **Svelte** | ✅ | ✅ | Svelte 4/5 |
| **Angular** | ✅ | ✅ | Angular 17+ |
| **总计** | 6 | 7 | Animation 支持更多 |

## 🏗️ 构建配置对比

### Engine 方式

```bash
# 使用命令行参数
ldesign-builder build -f esm,cjs,dts
```

### Animation 方式（统一）

```bash
# 同样使用命令行参数
ldesign-builder build -f esm,cjs,dts

# Core 包额外支持 UMD
ldesign-builder build -f esm,cjs,umd,dts
```

**结论：** ✅ 两者使用相同的构建方式，保持一致性

## 📦 输出格式对比

### Engine

| 包 | ESM | CJS | UMD | DTS |
|-----|-----|-----|-----|-----|
| core | ✅ | ✅ | ✅ | ✅ |
| vue | ✅ | ✅ | ✅ | ✅ |
| react | ✅ | ✅ | ❌ | ✅ |
| others | ✅ | ✅ | ❌ | ✅ |

### Animation（优化后）

| 包 | ESM | CJS | UMD | DTS |
|-----|-----|-----|-----|-----|
| core | ✅ | ✅ | ✅ | ✅ |
| vue | ✅ | ✅ | ❌ | ✅ |
| react | ✅ | ✅ | ❌ | ✅ |
| others | ✅ | ✅ | ❌ | ✅ |

**优化点：**
- ❌ 移除了框架包不必要的 UMD
- ✅ 只有 Core 保留 UMD（用于 CDN）
- ✅ 减小包体积，加快构建速度

## 📁 项目结构对比

### Engine

```
@ldesign/engine/
├── src/                 # 主包源码
├── packages/
│   ├── core/           # 核心引擎
│   ├── vue/            # Vue 适配器
│   ├── react/          # React 适配器
│   ├── solid/          # Solid 适配器
│   ├── svelte/         # Svelte 适配器
│   └── angular/        # Angular 适配器
├── scripts/
│   └── build.js        # 构建脚本
└── package.json        # 主包配置（private: true）
```

### Animation

```
@ldesign/animation/
├── packages/
│   ├── core/           # 核心动画引擎
│   │   ├── src/
│   │   └── examples/   ✨ 每个包都有 examples
│   ├── vue/            # Vue 集成
│   │   ├── src/
│   │   └── examples/
│   ├── react/          # React 集成
│   ├── lit/            # Lit 集成（新增）
│   ├── solid/          # Solid 集成
│   ├── svelte/         # Svelte 集成
│   └── angular/        # Angular 集成
├── scripts/
│   ├── build-all.js    ✨ 按依赖顺序构建
│   ├── build-examples.js ✨ 批量构建示例
│   └── dev-examples.js   ✨ 交互式启动示例
├── pnpm-workspace.yaml   ✨ Workspace 配置
└── package.json
```

**对比：**
- ✅ Animation 每个包都有独立演示
- ✅ Animation 有更完善的脚本系统
- ✅ Animation 有独立的 workspace 配置

## 🎯 演示示例对比

### Engine 示例

```
packages/vue/examples/
├── basic.html          # 简单 HTML 文件
├── full-featured.html
└── vite-demo/          # 完整项目
    ├── index.html
    ├── package.json
    └── src/
```

### Animation 示例（统一）

```
packages/*/examples/
├── index.html
├── launcher.config.ts  ✅ 统一使用 launcher
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts(x)
    └── App.vue/tsx/svelte
```

**优势：**
- ✅ 所有示例统一使用 @ldesign/launcher
- ✅ 完整的项目结构
- ✅ 支持 HMR 热更新
- ✅ 更接近真实使用场景

## 🔧 依赖声明对比

### Engine 方式

```json
{
  "devDependencies": {
    "@ldesign/builder": "workspace:../../../../../../tools/builder"
  }
}
```

### Animation 方式

```json
{
  "devDependencies": {
    "@ldesign/builder": "workspace:*"
  }
}
```

**优势：**
- ✅ 路径简洁，不易出错
- ✅ 包位置变动时无需修改
- ✅ pnpm 自动解析正确路径

## 🚀 脚本命令对比

### Engine

```json
{
  "scripts": {
    "build": "ldesign-builder build -f esm,cjs,dts",
    "dev": "ldesign-builder build -f esm,cjs,dts --watch",
    "dev:examples": "vite serve examples --port 5173"
  }
}
```

### Animation

```json
{
  "scripts": {
    "build": "pnpm build:packages",
    "build:packages": "pnpm run build:core && pnpm run build:frameworks",
    "build:frameworks": "pnpm --parallel ...",
    "dev:examples": "node scripts/dev-examples.js",
    "build:examples": "node scripts/build-examples.js"
  }
}
```

**新增功能：**
- ✅ `build-all.js` - 按依赖顺序自动构建
- ✅ `dev-examples.js` - 交互式选择启动的示例
- ✅ `build-examples.js` - 批量构建所有示例
- ✅ 支持并行构建框架包

## 📊 端口分配对比

### Engine

```
分散的端口分配，无统一规划
```

### Animation

```
连续的端口分配：
- core: 5200/4200
- vue: 5201/4201
- react: 5202/4202
- lit: 5203/4203
- solid: 5204/4204
- svelte: 5205/4205
```

**优势：**
- ✅ 规范的端口分配
- ✅ 易于记忆
- ✅ 避免端口冲突

## 🎨 配置文件位置对比

### Engine

部分包使用配置文件，部分使用命令行参数，不统一。

### Animation

所有包统一使用命令行参数：

```typescript
// ldesign.config.ts（仅用于特殊配置）
export default defineConfig({
  // 特殊配置项...
})
```

主要使用 package.json 中的命令行参数：

```json
{
  "scripts": {
    "build": "ldesign-builder build -f esm,cjs,dts"
  }
}
```

**优势：**
- ✅ 与 Engine 保持一致
- ✅ 简洁明了
- ✅ 易于维护

## 🏆 核心改进总结

### 1. 框架支持更全面

- Engine: 6 个框架
- Animation: 7 个框架（新增 Lit）

### 2. 演示示例更统一

- 所有示例基于 @ldesign/launcher
- 统一的项目结构
- 完整的开发体验

### 3. 构建配置更优化

- 移除不必要的 UMD
- 统一的构建命令
- 合理的输出格式

### 4. 脚本系统更强大

- 按依赖顺序构建
- 交互式示例启动
- 批量操作支持

### 5. 端口规划更规范

- 连续的端口分配
- 易于记忆和使用
- 避免冲突

## 📈 最佳实践总结

### 从 Engine 学到的

✅ **采纳：**
- 使用命令行参数构建
- 统一的脚本命名
- 清晰的包结构

✅ **保持：**
- 框架适配器模式
- 依赖注入设计
- 类型安全保障

### Animation 的创新

✅ **新增：**
- 独立的 workspace
- Launcher 统一示例
- 批量构建脚本
- 交互式工具

✅ **优化：**
- 删除不必要的 UMD
- 规范化端口分配
- 简化依赖声明

## 🎯 总结

Animation 包在 Engine 的成功经验基础上进行了针对性的改进：

1. **保留优点** - 统一的构建方式、清晰的架构
2. **优化不足** - 删除冗余、规范端口、改进脚本
3. **新增特性** - Lit 支持、Launcher 示例、批量工具

**最终效果：**
- ✅ 配置更规范
- ✅ 开发体验更好
- ✅ 维护成本更低
- ✅ 功能更完善

---

**参考文档：**
- [Engine 源码](../engine)
- [Animation 架构文档](./ARCHITECTURE.md)
- [完成总结](./FINAL_SUMMARY.md)

