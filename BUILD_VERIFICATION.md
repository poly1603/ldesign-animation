# 🔍 构建验证指南

## 验证所有包的打包配置

### 1. 检查 Core 包配置

```bash
cd packages/core

# 查看配置
cat package.json
cat ldesign.config.ts

# 验证构建
pnpm build

# 检查输出
ls -la es/     # ESM 输出
ls -la lib/    # CJS 输出
ls -la dist/   # UMD 输出
```

**预期输出：**
```
es/
├── index.js
├── index.d.ts
├── types/
├── core/
├── timeline/
├── physics/
├── scroll/
├── svg/
├── gesture/
└── utils/

lib/
├── index.cjs
├── index.d.ts
└── (同上结构)

dist/
├── index.min.js
└── index.min.js.map
```

### 2. 检查框架包配置

#### Vue 包

```bash
cd packages/vue

# 验证配置
cat ldesign.config.ts | grep format
# 应该输出: format: ['esm', 'cjs']

# 构建
pnpm build

# 检查输出（不应该有 dist 目录）
ls -la es/
ls -la lib/
ls -la dist/  # 应该不存在！
```

**预期：**
- ✅ 有 `es/` 目录
- ✅ 有 `lib/` 目录
- ❌ 无 `dist/` 目录（已移除 UMD）

#### React、Lit、Solid、Svelte、Angular 包

同样验证，确保：
- ✅ 只有 ESM + CJS
- ❌ 没有 UMD

### 3. 验证依赖关系

```bash
# 在 animation 根目录
cd packages/animation

# 检查 workspace 配置
cat pnpm-workspace.yaml

# 安装依赖
pnpm install

# 检查子包是否正确链接
ls -la packages/vue/node_modules/@ldesign/animation-core
# 应该是符号链接指向 ../core
```

### 4. 验证构建顺序

```bash
# 测试构建顺序
pnpm clean
pnpm build

# 应该看到：
# 1. 先构建 core
# 2. 并行构建其他包
```

### 5. 验证示例配置

#### 检查 launcher.config.ts 位置

```bash
# 所有示例的配置都应该在 examples/ 根目录
find packages/*/examples -name "launcher.config.ts"

# 预期输出：
# packages/core/examples/launcher.config.ts       ✅
# packages/vue/examples/launcher.config.ts        ✅
# packages/react/examples/launcher.config.ts      ✅
# packages/lit/examples/launcher.config.ts        ✅
# packages/solid/examples/launcher.config.ts      ✅
# packages/svelte/examples/launcher.config.ts     ✅
```

#### 验证端口分配

```bash
# 检查所有端口
grep -r "port:" packages/*/examples/launcher.config.ts

# 预期输出：
# core:   5200/4200 ✅
# vue:    5201/4201 ✅
# react:  5202/4202 ✅
# lit:    5203/4203 ✅
# solid:  5204/4204 ✅
# svelte: 5205/4205 ✅
```

### 6. 运行示例验证

```bash
# 测试启动 Core 示例
pnpm dev:examples core
# 访问 http://localhost:5200 验证

# 测试启动 Vue 示例
pnpm dev:examples vue
# 访问 http://localhost:5201 验证

# 测试启动 React 示例
pnpm dev:examples react
# 访问 http://localhost:5202 验证
```

## ✅ 验证清单

### 包配置验证

- [ ] Core 包支持 ESM + CJS + UMD
- [ ] Vue 包只有 ESM + CJS（无 UMD）
- [ ] React 包只有 ESM + CJS（无 UMD）
- [ ] Lit 包只有 ESM + CJS（无 UMD）
- [ ] Solid 包只有 ESM + CJS（无 UMD）
- [ ] Svelte 包只有 ESM + CJS（无 UMD）
- [ ] Angular 包只有 ESM + CJS（无 UMD）

### 构建命令验证

- [ ] 所有子包使用统一的构建命令：`ldesign-builder build -f esm,cjs,dts`
- [ ] Core 包额外支持：`ldesign-builder build -f esm,cjs,umd,dts`
- [ ] 所有包都生成 TypeScript 声明文件
- [ ] 所有包都生成 SourceMap

### 示例配置验证

- [ ] 所有 launcher.config.ts 都在 examples/ 根目录
- [ ] 端口分配无冲突（5200-5205）
- [ ] 所有示例都有 package.json
- [ ] 所有示例都有 tsconfig.json
- [ ] 所有示例都有 index.html
- [ ] 所有示例都有 src/main.ts(x)

### 依赖关系验证

- [ ] 所有框架包依赖 @ldesign/animation-core
- [ ] 所有包使用 workspace:* 引用内部包
- [ ] peerDependencies 声明正确
- [ ] peerDependenciesMeta 标记为 optional

### 脚本验证

- [ ] `pnpm build` 可以正确构建所有包
- [ ] `pnpm build:core` 可以单独构建 core
- [ ] `pnpm build:frameworks` 可以并行构建框架包
- [ ] `pnpm dev:examples vue` 可以启动 Vue 示例
- [ ] `pnpm clean` 可以清理所有构建产物

## 🐛 常见问题排查

### 问题1: 构建失败

```bash
# 清理并重新安装
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### 问题2: 类型错误

```bash
# 检查 TypeScript 配置
cd packages/core
cat tsconfig.json

# 检查是否正确继承根配置
# "extends": "../../../../tsconfig.json"
```

### 问题3: 示例无法启动

```bash
# 检查 launcher.config.ts 的 alias 配置
cat packages/vue/examples/launcher.config.ts

# 确保路径正确
# { find: '@ldesign/animation-vue', replacement: '../src' }
```

### 问题4: 依赖解析失败

```bash
# 检查 workspace 配置
cat pnpm-workspace.yaml

# 应该包含：
# packages:
#   - 'packages/*'
#   - 'packages/*/examples'
```

## 📊 构建性能测试

```bash
# 测试单包构建时间
time pnpm --filter @ldesign/animation-core build

# 测试并行构建时间
time pnpm build:frameworks

# 测试完整构建时间
time pnpm build
```

## 🎯 下一步

验证通过后：

1. ✅ 提交配置代码
2. ✅ 开始实现核心功能
3. ✅ 添加单元测试
4. ✅ 完善演示示例

---

**注意：**所有验证都应该在干净的环境中进行（先运行 `pnpm clean`）

