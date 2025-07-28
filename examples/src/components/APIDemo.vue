<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// 组件状态
const isVisible = ref(false)
const activeAPI = ref('useAnimation')
const searchQuery = ref('')
const selectedCategory = ref('all')

// API 文档数据
const apiCategories = {
  all: '全部',
  hooks: '组合式函数',
  components: '组件',
  utils: '工具函数',
  types: '类型定义'
}

const apiDocs = {
  useAnimation: {
    category: 'hooks',
    title: 'useAnimation',
    description: '基础动画控制钩子，提供动画创建和控制功能',
    syntax: 'const { animate, isAnimating, pause, resume, stop } = useAnimation()',
    parameters: [],
    returns: {
      animate: 'Function - 执行动画的函数',
      isAnimating: 'Ref<boolean> - 动画是否正在播放',
      pause: 'Function - 暂停动画',
      resume: 'Function - 恢复动画',
      stop: 'Function - 停止动画'
    },
    example: `const { animate, isAnimating } = useAnimation()

// 基础动画
await animate(element, {
  transform: 'translateX(100px)',
  opacity: 0.5
}, {
  duration: 1000,
  easing: 'ease-in-out'
})

// 检查动画状态
if (isAnimating.value) {
  console.log('动画正在播放')
}`
  },
  useCSSAnimation: {
    category: 'hooks',
    title: 'useCSSAnimation',
    description: 'CSS 动画控制钩子，用于管理 CSS 类动画',
    syntax: 'const { startAnimation, stopAnimation, isPlaying } = useCSSAnimation()',
    parameters: [],
    returns: {
      startAnimation: 'Function - 开始 CSS 动画',
      stopAnimation: 'Function - 停止 CSS 动画',
      isPlaying: 'Ref<boolean> - CSS 动画是否正在播放'
    },
    example: `const { startAnimation } = useCSSAnimation()

// 启动 CSS 动画
startAnimation(element, 'fadeIn', {
  duration: '1s',
  easing: 'ease-in-out',
  fillMode: 'forwards'
})`
  },
  useTransition: {
    category: 'hooks',
    title: 'useTransition',
    description: 'Vue 过渡效果钩子，简化过渡动画配置',
    syntax: 'const { transitionProps } = useTransition(config)',
    parameters: [
      {
        name: 'config',
        type: 'TransitionConfig',
        description: '过渡配置对象'
      }
    ],
    returns: {
      transitionProps: 'Object - Vue Transition 组件的 props'
    },
    example: `const { transitionProps } = useTransition({
  name: 'fade',
  duration: 300,
  enterFrom: { opacity: 0 },
  enterTo: { opacity: 1 }
})

<Transition v-bind="transitionProps">
  <div v-if="show">内容</div>
</Transition>`
  },
  useSequence: {
    category: 'hooks',
    title: 'useSequence',
    description: '动画序列控制钩子，用于创建和管理动画序列',
    syntax: 'const { createSequence, isPlaying } = useSequence()',
    parameters: [],
    returns: {
      createSequence: 'Function - 创建动画序列',
      isPlaying: 'Ref<boolean> - 序列是否正在播放'
    },
    example: `const { createSequence } = useSequence()

const sequence = createSequence()
sequence
  .add({ targets: el1, transform: 'translateX(100px)', duration: 500 })
  .add({ targets: el2, opacity: 0.5, duration: 300 })
  .play()`
  },
  useTimeline: {
    category: 'hooks',
    title: 'useTimeline',
    description: '时间轴动画控制钩子，支持精确的时间控制',
    syntax: 'const { createTimeline, isPlaying } = useTimeline()',
    parameters: [],
    returns: {
      createTimeline: 'Function - 创建时间轴',
      isPlaying: 'Ref<boolean> - 时间轴是否正在播放'
    },
    example: `const { createTimeline } = useTimeline()

const timeline = createTimeline()
timeline
  .to(element1, { x: 100 }, 0)
  .to(element2, { y: 50 }, 200)
  .play()`
  },
  useStagger: {
    category: 'hooks',
    title: 'useStagger',
    description: '交错动画钩子，为多个元素创建延迟递增的动画',
    syntax: 'const { createStagger, isPlaying } = useStagger()',
    parameters: [],
    returns: {
      createStagger: 'Function - 创建交错动画',
      isPlaying: 'Ref<boolean> - 交错动画是否正在播放'
    },
    example: `const { createStagger } = useStagger()

const stagger = createStagger(elements, {
  transform: 'translateY(-20px)',
  opacity: 1
}, {
  duration: 500,
  stagger: 100
})

await stagger.play()`
  },
  usePerformance: {
    category: 'hooks',
    title: 'usePerformance',
    description: '性能监控钩子，用于监控和分析动画性能',
    syntax: 'const { startMonitoring, stopMonitoring, getMetrics } = usePerformance()',
    parameters: [],
    returns: {
      startMonitoring: 'Function - 开始性能监控',
      stopMonitoring: 'Function - 停止性能监控',
      getMetrics: 'Function - 获取性能指标'
    },
    example: `const { startMonitoring, getMetrics } = usePerformance()

startMonitoring()
// 运行动画
const metrics = getMetrics()
console.log('FPS:', metrics.fps)`
  },
  AnimationContainer: {
    category: 'components',
    title: 'AnimationContainer',
    description: '动画容器组件，为子元素提供动画上下文',
    syntax: '<AnimationContainer :config="config">content</AnimationContainer>',
    parameters: [
      {
        name: 'config',
        type: 'AnimationConfig',
        description: '动画配置对象'
      }
    ],
    returns: {},
    example: `<AnimationContainer 
  :config="{
    duration: 1000,
    easing: 'ease-in-out'
  }"
>
  <div>动画内容</div>
</AnimationContainer>`
  },
  TransitionGroup: {
    category: 'components',
    title: 'TransitionGroup',
    description: '增强的过渡组组件，支持列表动画',
    syntax: '<TransitionGroup :config="config">items</TransitionGroup>',
    parameters: [
      {
        name: 'config',
        type: 'TransitionGroupConfig',
        description: '过渡组配置对象'
      }
    ],
    returns: {},
    example: `<TransitionGroup 
  :config="{
    name: 'list',
    tag: 'div',
    moveClass: 'list-move'
  }"
>
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
</TransitionGroup>`
  },
  createAnimation: {
    category: 'utils',
    title: 'createAnimation',
    description: '创建动画实例的工具函数',
    syntax: 'createAnimation(element, keyframes, options)',
    parameters: [
      {
        name: 'element',
        type: 'HTMLElement',
        description: '目标元素'
      },
      {
        name: 'keyframes',
        type: 'Keyframe[]',
        description: '关键帧数组'
      },
      {
        name: 'options',
        type: 'AnimationOptions',
        description: '动画选项'
      }
    ],
    returns: {
      animation: 'Animation - Web Animations API 动画实例'
    },
    example: `const animation = createAnimation(
  element,
  [
    { transform: 'translateX(0px)' },
    { transform: 'translateX(100px)' }
  ],
  { duration: 1000 }
)

animation.play()`
  },
  easing: {
    category: 'utils',
    title: 'easing',
    description: '缓动函数工具集合',
    syntax: 'easing.easeInOut(t) / easing.bounce(t)',
    parameters: [
      {
        name: 't',
        type: 'number',
        description: '时间进度 (0-1)'
      }
    ],
    returns: {
      value: 'number - 缓动后的值'
    },
    example: `import { easing } from '@ldesign/animation'

// 使用内置缓动函数
const easedValue = easing.easeInOut(0.5)

// 在动画中使用
animate(element, keyframes, {
  duration: 1000,
  easing: easing.bounce
})`
  },
  AnimationConfig: {
    category: 'types',
    title: 'AnimationConfig',
    description: '动画配置接口定义',
    syntax: 'interface AnimationConfig',
    parameters: [],
    returns: {},
    example: `interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string | Function
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
}`
  }
}

// 过滤后的 API 列表
const filteredAPIs = computed(() => {
  let apis = Object.entries(apiDocs)
  
  // 按分类过滤
  if (selectedCategory.value !== 'all') {
    apis = apis.filter(([_, doc]) => doc.category === selectedCategory.value)
  }
  
  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    apis = apis.filter(([key, doc]) => 
      key.toLowerCase().includes(query) ||
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query)
    )
  }
  
  return apis
})

// 当前选中的 API 文档
const currentAPI = computed(() => {
  return apiDocs[activeAPI.value as keyof typeof apiDocs]
})

// 选择 API
const selectAPI = (apiKey: string) => {
  activeAPI.value = apiKey
}

// 复制代码
const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    // 这里可以添加复制成功的提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 组件挂载
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section id="api" class="api-demo-section">
    <div class="section-header" :class="{ 'is-visible': isVisible }">
      <h2 class="section-title">API 文档</h2>
      <p class="section-description">
        完整的 API 参考文档，包括组合式函数、组件、工具函数和类型定义。
      </p>
    </div>
    
    <div class="api-container" :class="{ 'is-visible': isVisible }">
      <!-- 侧边栏 -->
      <div class="api-sidebar">
        <!-- 搜索和过滤 -->
        <div class="search-section">
          <div class="search-input">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索 API..."
              class="search-field"
            >
          </div>
          <div class="category-filter">
            <select v-model="selectedCategory" class="category-select">
              <option v-for="(label, key) in apiCategories" :key="key" :value="key">
                {{ label }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- API 列表 -->
        <div class="api-list">
          <div 
            v-for="[apiKey, apiDoc] in filteredAPIs" 
            :key="apiKey"
            @click="selectAPI(apiKey)"
            class="api-item"
            :class="{ active: activeAPI === apiKey }"
          >
            <div class="api-item-header">
              <h4 class="api-item-title">{{ apiDoc.title }}</h4>
              <span class="api-item-category">{{ apiCategories[apiDoc.category as keyof typeof apiCategories] }}</span>
            </div>
            <p class="api-item-description">{{ apiDoc.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- 主内容区域 -->
      <div class="api-content">
        <div class="api-header">
          <div class="api-title-section">
            <h1 class="api-title">{{ currentAPI.title }}</h1>
            <span class="api-category-badge">{{ apiCategories[currentAPI.category as keyof typeof apiCategories] }}</span>
          </div>
          <p class="api-description">{{ currentAPI.description }}</p>
        </div>
        
        <!-- 语法 -->
        <div class="api-section">
          <h3 class="section-title">语法</h3>
          <div class="code-block">
            <pre><code>{{ currentAPI.syntax }}</code></pre>
            <button @click="copyCode(currentAPI.syntax)" class="copy-btn" title="复制代码">
              📋
            </button>
          </div>
        </div>
        
        <!-- 参数 -->
        <div class="api-section" v-if="currentAPI.parameters && currentAPI.parameters.length > 0">
          <h3 class="section-title">参数</h3>
          <div class="parameters-table">
            <div class="table-header">
              <div class="table-cell">参数名</div>
              <div class="table-cell">类型</div>
              <div class="table-cell">描述</div>
            </div>
            <div 
              v-for="param in currentAPI.parameters" 
              :key="param.name"
              class="table-row"
            >
              <div class="table-cell param-name">{{ param.name }}</div>
              <div class="table-cell param-type">{{ param.type }}</div>
              <div class="table-cell param-description">{{ param.description }}</div>
            </div>
          </div>
        </div>
        
        <!-- 返回值 -->
        <div class="api-section" v-if="Object.keys(currentAPI.returns).length > 0">
          <h3 class="section-title">返回值</h3>
          <div class="returns-list">
            <div 
              v-for="(description, key) in currentAPI.returns" 
              :key="key"
              class="return-item"
            >
              <span class="return-key">{{ key }}</span>
              <span class="return-description">{{ description }}</span>
            </div>
          </div>
        </div>
        
        <!-- 示例 -->
        <div class="api-section">
          <h3 class="section-title">示例</h3>
          <div class="code-block example-block">
            <pre><code>{{ currentAPI.example }}</code></pre>
            <button @click="copyCode(currentAPI.example)" class="copy-btn" title="复制代码">
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 快速开始指南 -->
    <div class="quick-start-section" :class="{ 'is-visible': isVisible }">
      <h3 class="quick-start-title">快速开始</h3>
      <div class="quick-start-grid">
        <div class="quick-start-card">
          <h4>1. 安装</h4>
          <div class="code-block small">
            <pre><code>npm install @ldesign/animation</code></pre>
          </div>
        </div>
        <div class="quick-start-card">
          <h4>2. 导入</h4>
          <div class="code-block small">
            <pre><code>import { useAnimation } from '@ldesign/animation'</code></pre>
          </div>
        </div>
        <div class="quick-start-card">
          <h4>3. 使用</h4>
          <div class="code-block small">
            <pre><code>const { animate } = useAnimation()
await animate(element, keyframes, options)</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api-demo-section {
  padding: var(--space-2xl) 0;
  background-color: var(--color-bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.api-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.2s;
}

.api-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 侧边栏 */
.api-sidebar {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
  position: sticky;
  top: var(--space-lg);
}

.search-section {
  margin-bottom: var(--space-lg);
}

.search-input {
  margin-bottom: var(--space-md);
}

.search-field {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
}

.search-field:focus {
  outline: none;
  border-color: var(--color-primary);
}

.category-select {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
}

.api-list {
  max-height: 600px;
  overflow-y: auto;
}

.api-item {
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.api-item:hover {
  border-color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.api-item.active {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: white;
}

.api-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.api-item-title {
  margin: 0;
  font-size: var(--text-base);
  font-weight: 600;
}

.api-item-category {
  font-size: var(--text-xs);
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  opacity: 0.8;
}

.api-item.active .api-item-category {
  background-color: rgba(255, 255, 255, 0.2);
}

.api-item-description {
  margin: 0;
  font-size: var(--text-sm);
  opacity: 0.8;
  line-height: 1.4;
}

/* 主内容区域 */
.api-content {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
}

.api-header {
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.api-title-section {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.api-title {
  margin: 0;
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.api-category-badge {
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 500;
}

.api-description {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.api-section {
  margin-bottom: var(--space-2xl);
}

.api-section .section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
  text-align: left;
}

.code-block {
  position: relative;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: var(--space-lg);
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-primary);
}

.copy-btn {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  opacity: 0.6;
}

.copy-btn:hover {
  opacity: 1;
  background-color: var(--color-bg-primary);
}

.parameters-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  background-color: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  border-top: 1px solid var(--color-border);
}

.table-cell {
  padding: var(--space-md);
  font-size: var(--text-sm);
}

.param-name {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--color-primary);
  font-weight: 600;
}

.param-type {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--color-info);
}

.param-description {
  color: var(--color-text-secondary);
}

.returns-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.return-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.return-key {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--color-primary);
  font-weight: 600;
  min-width: 120px;
}

.return-description {
  color: var(--color-text-secondary);
  flex: 1;
}

.example-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.example-block pre {
  color: #d4d4d4;
}

/* 快速开始 */
.quick-start-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.quick-start-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.quick-start-title {
  text-align: center;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.quick-start-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.quick-start-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.quick-start-card h4 {
  margin: 0 0 var(--space-md) 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
}

.code-block.small {
  font-size: var(--text-xs);
}

.code-block.small pre {
  padding: var(--space-md);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .api-container {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  
  .api-sidebar {
    position: static;
  }
  
  .quick-start-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  .api-content {
    padding: var(--space-lg);
  }
  
  .api-title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: var(--space-xs);
  }
  
  .table-cell {
    padding: var(--space-sm);
  }
  
  .return-item {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .return-key {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .code-block pre {
    font-size: var(--text-xs);
    padding: var(--space-md);
  }
  
  .api-item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
}
</style>