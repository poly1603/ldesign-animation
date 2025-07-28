# 安装

## 包管理器安装

### npm

```bash
npm install @ldesign/animation
```

### yarn

```bash
yarn add @ldesign/animation
```

### pnpm

```bash
pnpm add @ldesign/animation
```

## CDN 引入

### ES 模块

```html
<script type="module">
  import { AnimationManager } from 'https://unpkg.com/@ldesign/animation/dist/index.es.js'
</script>
```

### UMD 模块

```html
<script src="https://unpkg.com/@ldesign/animation/dist/index.umd.js"></script>
<script>
  const { AnimationManager } = LDesignAnimation
</script>
```

## 依赖要求

### 核心依赖

- **Node.js**: >= 16.0.0
- **TypeScript**: >= 4.5.0 (如果使用 TypeScript)

### 浏览器支持

- **Chrome**: >= 84
- **Firefox**: >= 75
- **Safari**: >= 13.1
- **Edge**: >= 84

### Vue 集成 (可选)

如果你需要使用 Vue 3 集成功能：

```bash
npm install vue@^3.0.0
```

### Engine 集成 (可选)

如果你需要使用 LDesign Engine 插件：

```bash
npm install @ldesign/engine
```

## 验证安装

创建一个简单的测试文件来验证安装是否成功：

```javascript
// test-installation.js
import { AnimationManager } from '@ldesign/animation'

const element = document.createElement('div')
document.body.appendChild(element)

const manager = new AnimationManager()
const animation = manager.create(element, {
  opacity: [0, 1],
  transform: ['translateX(-100px)', 'translateX(0)']
}, {
  duration: 1000,
  easing: 'ease-out'
})

animation.play()
console.log('Animation created successfully!')
```

运行测试：

```bash
node test-installation.js
```

## 开发环境设置

如果你想要参与开发或构建自定义版本：

```bash
# 克隆仓库
git clone https://github.com/ldesign/ldesign.git
cd ldesign/packages/animation

# 安装依赖
pnpm install

# 构建
pnpm run build

# 运行测试
pnpm run test

# 启动开发服务器
pnpm run dev
```

## 故障排除

### 常见问题

#### 1. TypeScript 类型错误

确保你的 `tsconfig.json` 包含正确的类型定义：

```json
{
  "compilerOptions": {
    "types": ["@ldesign/animation"]
  }
}
```

#### 2. Vue 集成问题

确保你正在使用 Vue 3.x 版本：

```bash
npm list vue
```

#### 3. 浏览器兼容性

对于不支持 Web Animations API 的旧浏览器，你可能需要添加 polyfill：

```bash
npm install web-animations-js
```

```javascript
import 'web-animations-js'
import { AnimationManager } from '@ldesign/animation'
```

#### 4. 构建工具配置

##### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['@ldesign/animation']
  }
})
```

##### Webpack

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@ldesign/animation': require.resolve('@ldesign/animation')
    }
  }
}
```

## 下一步

安装完成后，你可以：

- 查看 [快速开始](./getting-started.md) 学习基础用法
- 阅读 [核心概念](./concepts.md) 了解设计理念
- 浏览 [API 文档](../api/) 查看详细接口
- 查看 [示例](../examples/) 获取灵感