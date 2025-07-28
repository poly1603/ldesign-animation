# 贡献指南

感谢您对 `@ldesign/animation` 的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告和修复 Bug
- ✨ 提出新功能建议
- 📝 改进文档
- 🧪 编写测试用例
- 💡 分享使用经验

## 开发环境设置

### 前置要求

- **Node.js**: >= 16.0.0
- **pnpm**: >= 7.0.0
- **Git**: 最新版本

### 克隆项目

```bash
# 克隆主仓库
git clone https://github.com/ldesign/ldesign.git
cd ldesign

# 安装依赖
pnpm install

# 进入 animation 包目录
cd packages/animation
```

### 开发脚本

```bash
# 开发模式（监听文件变化）
pnpm run dev

# 类型检查
pnpm run typecheck

# 代码检查
pnpm run lint

# 自动修复代码风格
pnpm run lint:fix

# 运行测试
pnpm run test

# 测试覆盖率
pnpm run test:coverage

# 构建项目
pnpm run build

# 启动文档服务
pnpm run docs:dev

# 构建文档
pnpm run docs:build
```

## 项目结构

```
packages/animation/
├── src/                    # 源代码
│   ├── core/              # 核心动画管理器
│   ├── controllers/       # 动画控制器
│   ├── vue/              # Vue 3 集成
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript 类型定义
│   └── index.ts          # 主入口文件
├── docs/                  # 文档
│   ├── .vitepress/       # VitePress 配置
│   ├── api/              # API 文档
│   ├── guide/            # 使用指南
│   └── examples/         # 示例代码
├── tests/                 # 测试文件
├── dist/                  # 构建输出
├── package.json          # 包配置
├── tsconfig.json         # TypeScript 配置
├── rollup.config.js      # 构建配置
└── README.md             # 项目说明
```

## 开发工作流

### 1. 创建分支

```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或者修复 bug
git checkout -b fix/your-bug-fix
```

### 2. 开发和测试

```bash
# 启动开发模式
pnpm run dev

# 在另一个终端运行测试
pnpm run test:watch

# 检查代码质量
pnpm run lint
pnpm run typecheck
```

### 3. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 添加文件
git add .

# 提交（遵循约定式提交规范）
git commit -m "feat: add spring animation controller"
git commit -m "fix: resolve memory leak in animation manager"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for transition manager"
```

#### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构（不是新功能也不是修复）
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `perf`: 性能优化
- `ci`: CI/CD 相关

### 4. 推送和创建 PR

```bash
# 推送分支
git push origin feature/your-feature-name

# 在 GitHub 上创建 Pull Request
```

## 代码规范

### TypeScript 规范

- 使用严格的 TypeScript 配置
- 所有公共 API 必须有类型定义
- 优先使用接口而不是类型别名
- 使用泛型提高代码复用性

```typescript
// ✅ 好的示例
interface AnimationConfig {
  duration: number
  easing?: string
  delay?: number
}

class AnimationManager<T extends Element = Element> {
  animate(target: T, config: AnimationConfig): Animation {
    // 实现
  }
}

// ❌ 避免
function animate(target: any, config: any): any {
  // 缺少类型定义
}
```

### 代码风格

- 使用 2 个空格缩进
- 使用单引号
- 行末不加分号
- 最大行长度 100 字符
- 使用 camelCase 命名变量和函数
- 使用 PascalCase 命名类和接口

### 注释规范

```typescript
/**
 * 创建动画实例
 * @param target - 目标元素
 * @param keyframes - 关键帧数组
 * @param options - 动画选项
 * @returns 动画实例
 * @example
 * ```typescript
 * const animation = createAnimation(
 *   element,
 *   [{ opacity: 0 }, { opacity: 1 }],
 *   { duration: 1000 }
 * )
 * ```
 */
export function createAnimation(
  target: Element,
  keyframes: Keyframe[],
  options: AnimationOptions
): Animation {
  // 实现
}
```

## 测试指南

### 测试结构

```
tests/
├── unit/                  # 单元测试
│   ├── core/             # 核心功能测试
│   ├── controllers/      # 控制器测试
│   └── utils/            # 工具函数测试
├── integration/          # 集成测试
├── e2e/                  # 端到端测试
└── fixtures/             # 测试数据
```

### 编写测试

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AnimationManager } from '../src/core/AnimationManager'

describe('AnimationManager', () => {
  let manager: AnimationManager
  let element: HTMLElement

  beforeEach(() => {
    manager = new AnimationManager()
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  afterEach(() => {
    manager.destroy()
    document.body.removeChild(element)
  })

  it('should create animation instance', () => {
    const animation = manager.animate(element, [
      { opacity: 0 },
      { opacity: 1 }
    ], { duration: 1000 })

    expect(animation).toBeDefined()
    expect(animation.playState).toBe('running')
  })

  it('should handle animation events', async () => {
    const onFinish = vi.fn()
    
    const animation = manager.animate(element, [
      { transform: 'translateX(0px)' },
      { transform: 'translateX(100px)' }
    ], { duration: 100 })

    animation.addEventListener('finish', onFinish)
    
    await new Promise(resolve => setTimeout(resolve, 150))
    
    expect(onFinish).toHaveBeenCalled()
  })
})
```

### 测试覆盖率

- 单元测试覆盖率应达到 90% 以上
- 核心功能必须有完整的测试覆盖
- 边界情况和错误处理需要测试

## 文档贡献

### 文档结构

- **API 文档**: 详细的 API 参考
- **使用指南**: 功能介绍和使用方法
- **示例代码**: 实际使用示例
- **最佳实践**: 推荐的使用模式

### 文档编写规范

- 使用清晰简洁的语言
- 提供完整的代码示例
- 包含实际的使用场景
- 添加适当的警告和提示

```markdown
## 动画管理器

`AnimationManager` 是核心的动画管理类，提供了完整的动画控制功能。

### 基本用法

```typescript
import { AnimationManager } from '@ldesign/animation'

const manager = new AnimationManager()

// 创建动画
const animation = manager.animate(
  document.querySelector('.target'),
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 1000 }
)
```

::: tip 提示
建议在应用中使用单例模式管理 `AnimationManager` 实例。
:::

::: warning 注意
记得在组件销毁时调用 `manager.destroy()` 清理资源。
:::
```

## 性能优化

### 代码优化

- 避免在动画循环中创建对象
- 使用对象池复用动画实例
- 合理使用 `requestAnimationFrame`
- 避免强制同步布局

```typescript
// ✅ 好的示例
class AnimationManager {
  private animationPool: Animation[] = []
  
  getAnimation(): Animation {
    return this.animationPool.pop() || new Animation()
  }
  
  releaseAnimation(animation: Animation): void {
    animation.reset()
    this.animationPool.push(animation)
  }
}

// ❌ 避免
function animate() {
  // 每次都创建新对象
  const config = { duration: 1000, easing: 'ease' }
  return new Animation(config)
}
```

### 内存管理

- 及时清理事件监听器
- 避免循环引用
- 使用 WeakMap 存储元素关联数据

## 发布流程

### 版本管理

我们使用 [Semantic Versioning](https://semver.org/)：

- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修正

### 发布检查清单

- [ ] 所有测试通过
- [ ] 代码覆盖率达标
- [ ] 文档更新完整
- [ ] 变更日志更新
- [ ] 版本号正确
- [ ] 构建产物正常

## 社区

### 获取帮助

- **GitHub Issues**: 报告 Bug 和功能请求
- **GitHub Discussions**: 技术讨论和问答
- **文档**: 查看详细的使用指南

### 行为准则

我们致力于创建一个友好、包容的社区环境。请遵循以下原则：

- 尊重他人，保持友善
- 建设性地提出意见和建议
- 帮助新手解决问题
- 分享知识和经验

## 常见问题

### Q: 如何调试动画性能问题？

A: 使用浏览器开发者工具的 Performance 面板，关注以下指标：
- FPS (帧率)
- CPU 使用率
- 内存占用
- 重绘和重排次数

### Q: 如何处理动画在不同设备上的兼容性？

A: 
1. 使用 CSS `will-change` 属性启用硬件加速
2. 检测设备性能，降级动画复杂度
3. 提供禁用动画的选项
4. 使用 `prefers-reduced-motion` 媒体查询

### Q: 如何优化大量元素的动画性能？

A:
1. 使用虚拟化技术，只动画可见元素
2. 批量操作，减少 DOM 访问
3. 使用 CSS 动画而不是 JavaScript 动画
4. 合理使用动画队列和优先级

---

感谢您的贡献！如果有任何问题，请随时在 GitHub 上联系我们。