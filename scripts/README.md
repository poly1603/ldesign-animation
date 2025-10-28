# Animation Scripts

animation 包的构建和开发脚本。

## 📜 脚本说明

### `build-all.js`

构建所有子包（core、vue、react、lit）。

**使用方式：**
```bash
pnpm build
# 或
node scripts/build-all.js
```

**构建顺序：**
1. 首先构建 `core` 包（其他包依赖它）
2. 然后并行构建 `vue`、`react`、`lit` 包

### `dev-examples.js`

启动子包的演示示例（开发模式）。

**使用方式：**
```bash
# 查看帮助
pnpm dev:examples

# 启动特定示例
pnpm dev:examples core     # 端口 5200
pnpm dev:examples vue      # 端口 5201
pnpm dev:examples react    # 端口 5202
pnpm dev:examples lit      # 端口 5203
```

### `build-examples.js`

构建所有演示示例。

**使用方式：**
```bash
pnpm build:examples
# 或
node scripts/build-examples.js
```

## 🔧 开发流程

### 1. 开发子包

```bash
# 监听模式构建所有子包
pnpm dev

# 或只监听特定子包
pnpm --filter @ldesign/animation-core dev
pnpm --filter @ldesign/animation-vue dev
```

### 2. 开发演示示例

```bash
# 启动演示（会自动监听源码变化）
pnpm dev:examples vue
```

### 3. 构建发布

```bash
# 清理
pnpm clean

# 构建所有子包
pnpm build

# 构建所有示例（可选）
pnpm build:examples
```

## 📦 包结构

```
@ldesign/animation/
├── packages/
│   ├── core/          # @ldesign/animation-core
│   │   ├── src/       # 源代码
│   │   ├── es/        # ESM 输出
│   │   ├── lib/       # CJS 输出
│   │   ├── dist/      # UMD 输出
│   │   └── examples/  # 演示示例
│   ├── vue/           # @ldesign/animation-vue
│   ├── react/         # @ldesign/animation-react
│   └── lit/           # @ldesign/animation-lit
└── scripts/           # 构建脚本（此目录）
```

## 💡 提示

- 所有子包使用 `@ldesign/builder` 构建
- 所有示例使用 `@ldesign/launcher` 启动
- 使用 pnpm workspace 管理依赖
- 支持增量构建和监听模式

## 🐛 调试

如果遇到构建问题：

1. 清理所有构建产物
```bash
pnpm clean
```

2. 重新安装依赖
```bash
pnpm install
```

3. 重新构建
```bash
pnpm build
```

## 📝 添加新子包

如果需要添加新的子包（例如 `svelte`）：

1. 在 `packages/` 下创建新目录
2. 创建 `package.json`、`ldesign.config.ts`、`tsconfig.json`
3. 创建 `src/index.ts` 入口文件
4. 创建 `examples/` 演示目录
5. 在主 `package.json` 中添加相应的构建脚本
6. 更新 `scripts/build-all.js` 添加新包


