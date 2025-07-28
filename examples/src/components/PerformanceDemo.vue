<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePerformance, useAnimationOptimizer, useGPUAcceleration } from '@ldesign/animation'

// 组件状态
const isVisible = ref(false)
const performanceData = ref<any>(null)
const isMonitoring = ref(false)
const animationBoxes = ref<HTMLElement[]>([])
const heavyBoxes = ref<HTMLElement[]>([])

// 性能监控
const { 
  startMonitoring, 
  stopMonitoring, 
  getMetrics, 
  clearMetrics 
} = usePerformance()

const { 
  optimizeAnimation, 
  enableBatching, 
  disableBatching 
} = useAnimationOptimizer()

const { 
  enableGPU, 
  disableGPU, 
  isGPUEnabled 
} = useGPUAcceleration()

// 性能测试配置
const testConfigs = {
  light: {
    name: '轻量测试',
    elementCount: 10,
    duration: 1000,
    description: '10个元素的简单动画'
  },
  medium: {
    name: '中等测试',
    elementCount: 50,
    duration: 2000,
    description: '50个元素的复杂动画'
  },
  heavy: {
    name: '重负载测试',
    elementCount: 100,
    duration: 3000,
    description: '100个元素的高强度动画'
  }
}

const currentTest = ref('light')
const testResults = ref<Record<string, any>>({})

// 性能指标计算
const performanceScore = computed(() => {
  if (!performanceData.value) return 0
  const { fps, frameDrops, memoryUsage } = performanceData.value
  
  let score = 100
  if (fps < 60) score -= (60 - fps) * 2
  if (frameDrops > 5) score -= frameDrops * 3
  if (memoryUsage > 50) score -= (memoryUsage - 50)
  
  return Math.max(0, Math.min(100, score))
})

const performanceLevel = computed(() => {
  const score = performanceScore.value
  if (score >= 90) return { level: '优秀', color: '#10b981' }
  if (score >= 70) return { level: '良好', color: '#f59e0b' }
  if (score >= 50) return { level: '一般', color: '#ef4444' }
  return { level: '需要优化', color: '#dc2626' }
})

// 开始性能监控
const startPerformanceTest = async () => {
  isMonitoring.value = true
  clearMetrics()
  startMonitoring()
  
  // 模拟性能数据收集
  const interval = setInterval(() => {
    performanceData.value = getMetrics()
  }, 100)
  
  // 运行测试动画
  await runTestAnimation()
  
  setTimeout(() => {
    clearInterval(interval)
    stopMonitoring()
    isMonitoring.value = false
    
    // 保存测试结果
    testResults.value[currentTest.value] = {
      ...performanceData.value,
      score: performanceScore.value,
      level: performanceLevel.value
    }
  }, 1000)
}

// 运行测试动画
const runTestAnimation = async () => {
  const config = testConfigs[currentTest.value as keyof typeof testConfigs]
  const elements = animationBoxes.value.slice(0, config.elementCount)
  
  if (elements.length === 0) return
  
  // 创建多个并发动画
  const animations = elements.map((element, index) => {
    return element.animate([
      { 
        transform: 'translateX(0px) rotate(0deg) scale(1)',
        backgroundColor: '#3b82f6'
      },
      { 
        transform: `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
      },
      { 
        transform: 'translateX(0px) rotate(0deg) scale(1)',
        backgroundColor: '#3b82f6'
      }
    ], {
      duration: config.duration,
      delay: index * 50,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: 1
    })
  })
  
  await Promise.all(animations.map(anim => anim.finished))
}

// 重负载动画测试
const runHeavyAnimation = async () => {
  if (heavyBoxes.value.length === 0) return
  
  const animations = heavyBoxes.value.map((element, index) => {
    return element.animate([
      { 
        transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
        filter: 'blur(0px) hue-rotate(0deg)',
        boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
      },
      { 
        transform: `translate(${Math.sin(index) * 100}px, ${Math.cos(index) * 100}px) rotate(${index * 45}deg) scale(1.5)`,
        filter: `blur(2px) hue-rotate(${index * 30}deg)`,
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)'
      },
      { 
        transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
        filter: 'blur(0px) hue-rotate(0deg)',
        boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
      }
    ], {
      duration: 2000,
      delay: index * 20,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterations: 1
    })
  })
  
  await Promise.all(animations.map(anim => anim.finished))
}

// 优化控制
const toggleBatching = () => {
  if (isMonitoring.value) return
  
  if (performanceData.value?.batchingEnabled) {
    disableBatching()
  } else {
    enableBatching()
  }
}

const toggleGPU = () => {
  if (isGPUEnabled.value) {
    disableGPU()
  } else {
    enableGPU()
  }
}

// 代码示例
const codeExample = `// 性能监控
const { startMonitoring, stopMonitoring, getMetrics } = usePerformance()

// 开始监控
startMonitoring()

// 运行动画
const animation = element.animate(keyframes, options)

// 获取性能指标
const metrics = getMetrics()
console.log('FPS:', metrics.fps)
console.log('Frame Drops:', metrics.frameDrops)
console.log('Memory Usage:', metrics.memoryUsage)

// 停止监控
stopMonitoring()

// 动画优化
const { optimizeAnimation, enableBatching } = useAnimationOptimizer()

// 启用批处理优化
enableBatching()

// 优化动画配置
const optimizedOptions = optimizeAnimation(originalOptions)

// GPU 加速
const { enableGPU, isGPUEnabled } = useGPUAcceleration()

// 启用 GPU 加速
if (!isGPUEnabled.value) {
  enableGPU()
}`

// 生成测试元素
const generateTestElements = () => {
  // 为性能测试生成足够的元素
  const maxElements = Math.max(...Object.values(testConfigs).map(config => config.elementCount))
  
  // 确保有足够的元素用于测试
  while (animationBoxes.value.length < maxElements) {
    // 这里只是占位，实际元素会在模板中生成
  }
}

// 组件挂载
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  
  generateTestElements()
  
  // 初始化性能数据
  performanceData.value = {
    fps: 60,
    frameDrops: 0,
    memoryUsage: 25,
    batchingEnabled: false,
    gpuAcceleration: isGPUEnabled.value
  }
})
</script>

<template>
  <section id="performance" class="performance-demo-section">
    <div class="section-header" :class="{ 'is-visible': isVisible }">
      <h2 class="section-title">性能监控与优化</h2>
      <p class="section-description">
        实时监控动画性能，提供优化建议和GPU加速支持，确保流畅的用户体验。
      </p>
    </div>
    
    <div class="demo-container" :class="{ 'is-visible': isVisible }">
      <!-- 性能监控面板 -->
      <div class="performance-panel">
        <div class="panel-header">
          <h3>性能监控面板</h3>
          <div class="monitoring-status" :class="{ active: isMonitoring }">
            <span class="status-dot"></span>
            {{ isMonitoring ? '监控中' : '待机' }}
          </div>
        </div>
        
        <div class="metrics-grid" v-if="performanceData">
          <div class="metric-card">
            <div class="metric-value">{{ performanceData.fps || 0 }}</div>
            <div class="metric-label">FPS</div>
            <div class="metric-bar">
              <div 
                class="metric-fill" 
                :style="{ width: `${(performanceData.fps || 0) / 60 * 100}%` }"
              ></div>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">{{ performanceData.frameDrops || 0 }}</div>
            <div class="metric-label">丢帧数</div>
            <div class="metric-bar">
              <div 
                class="metric-fill warning" 
                :style="{ width: `${Math.min((performanceData.frameDrops || 0) / 10 * 100, 100)}%` }"
              ></div>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">{{ performanceData.memoryUsage || 0 }}MB</div>
            <div class="metric-label">内存使用</div>
            <div class="metric-bar">
              <div 
                class="metric-fill" 
                :style="{ width: `${(performanceData.memoryUsage || 0)}%` }"
              ></div>
            </div>
          </div>
          
          <div class="metric-card score-card">
            <div class="metric-value" :style="{ color: performanceLevel.color }">
              {{ Math.round(performanceScore) }}
            </div>
            <div class="metric-label">性能评分</div>
            <div class="performance-level" :style="{ color: performanceLevel.color }">
              {{ performanceLevel.level }}
            </div>
          </div>
        </div>
        
        <!-- 优化控制 -->
        <div class="optimization-controls">
          <h4>优化选项</h4>
          <div class="control-group">
            <label class="control-item">
              <input 
                type="checkbox" 
                :checked="performanceData?.batchingEnabled"
                @change="toggleBatching"
                :disabled="isMonitoring"
              >
              <span>启用批处理优化</span>
            </label>
            <label class="control-item">
              <input 
                type="checkbox" 
                :checked="isGPUEnabled"
                @change="toggleGPU"
              >
              <span>启用 GPU 加速</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- 性能测试区域 -->
      <div class="test-area">
        <div class="test-controls">
          <h3>性能测试</h3>
          <div class="test-selector">
            <select v-model="currentTest" :disabled="isMonitoring">
              <option v-for="(config, key) in testConfigs" :key="key" :value="key">
                {{ config.name }} - {{ config.description }}
              </option>
            </select>
            <button 
              @click="startPerformanceTest" 
              :disabled="isMonitoring"
              class="test-btn"
            >
              {{ isMonitoring ? '测试中...' : '开始测试' }}
            </button>
          </div>
        </div>
        
        <!-- 动画测试区域 -->
        <div class="animation-stage">
          <div class="test-elements">
            <div 
              v-for="i in 100" 
              :key="i"
              :ref="el => animationBoxes[i-1] = el as HTMLElement"
              class="test-box"
              :class="{ 
                active: i <= testConfigs[currentTest as keyof typeof testConfigs].elementCount,
                hidden: i > testConfigs[currentTest as keyof typeof testConfigs].elementCount
              }"
            >
              {{ i }}
            </div>
          </div>
        </div>
        
        <!-- 重负载测试 -->
        <div class="heavy-test-section">
          <h4>重负载动画测试</h4>
          <p>测试复杂动画效果的性能表现</p>
          <button @click="runHeavyAnimation" class="heavy-test-btn">
            运行重负载测试
          </button>
          <div class="heavy-elements">
            <div 
              v-for="i in 20" 
              :key="i"
              :ref="el => heavyBoxes[i-1] = el as HTMLElement"
              class="heavy-box"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 测试结果 -->
    <div class="results-section" :class="{ 'is-visible': isVisible }" v-if="Object.keys(testResults).length > 0">
      <h3>测试结果对比</h3>
      <div class="results-grid">
        <div 
          v-for="(result, testName) in testResults" 
          :key="testName"
          class="result-card"
        >
          <h4>{{ testConfigs[testName as keyof typeof testConfigs].name }}</h4>
          <div class="result-metrics">
            <div class="result-item">
              <span>FPS:</span>
              <span>{{ result.fps }}</span>
            </div>
            <div class="result-item">
              <span>丢帧:</span>
              <span>{{ result.frameDrops }}</span>
            </div>
            <div class="result-item">
              <span>内存:</span>
              <span>{{ result.memoryUsage }}MB</span>
            </div>
            <div class="result-score" :style="{ color: result.level.color }">
              评分: {{ Math.round(result.score) }} ({{ result.level.level }})
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 代码示例 -->
    <div class="code-section" :class="{ 'is-visible': isVisible }">
      <div class="code-display">
        <div class="code-header">
          <h3>性能监控代码示例</h3>
          <span class="code-language">TypeScript</span>
        </div>
        <pre class="code-block"><code>{{ codeExample }}</code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.performance-demo-section {
  padding: var(--space-2xl) 0;
  background-color: var(--color-bg-primary);
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

.demo-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.2s;
}

.demo-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 性能监控面板 */
.performance-panel {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.panel-header h3 {
  margin: 0;
  font-size: var(--text-xl);
  color: var(--color-text-primary);
}

.monitoring-status {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.monitoring-status.active {
  color: var(--color-success);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
  transition: all var(--transition-normal);
}

.monitoring-status.active .status-dot {
  background-color: var(--color-success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.metric-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
}

.metric-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
}

.metric-bar {
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.metric-fill.warning {
  background-color: var(--color-warning);
}

.score-card {
  grid-column: 1 / -1;
}

.performance-level {
  font-size: var(--text-sm);
  font-weight: 600;
  margin-top: var(--space-xs);
}

.optimization-controls h4 {
  margin: 0 0 var(--space-md) 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.control-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.control-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

/* 测试区域 */
.test-area {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}

.test-controls {
  margin-bottom: var(--space-lg);
}

.test-controls h3 {
  margin: 0 0 var(--space-md) 0;
  font-size: var(--text-xl);
  color: var(--color-text-primary);
}

.test-selector {
  display: flex;
  gap: var(--space-md);
  align-items: center;
}

.test-selector select {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

.test-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all var(--transition-normal);
  min-width: 100px;
}

.test-btn:hover:not(:disabled) {
  background-color: var(--color-primary);
  transform: translateY(-1px);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.animation-stage {
  min-height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  overflow: hidden;
}

.test-elements {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: var(--space-sm);
  max-width: 100%;
}

.test-box {
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-xs);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  opacity: 0.3;
}

.test-box.active {
  opacity: 1;
  transform: scale(1.05);
}

.test-box.hidden {
  display: none;
}

.heavy-test-section {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-lg);
}

.heavy-test-section h4 {
  margin: 0 0 var(--space-sm) 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
}

.heavy-test-section p {
  margin: 0 0 var(--space-md) 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.heavy-test-btn {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-warning);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all var(--transition-normal);
  margin-bottom: var(--space-md);
}

.heavy-test-btn:hover {
  background-color: var(--color-warning);
  transform: translateY(-1px);
}

.heavy-elements {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: var(--space-sm);
  max-width: 100%;
}

.heavy-box {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

/* 测试结果 */
.results-section {
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.results-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.results-section h3 {
  text-align: center;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.result-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.result-card h4 {
  margin: 0 0 var(--space-md) 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  text-align: center;
}

.result-metrics {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.result-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.result-score {
  text-align: center;
  font-weight: 600;
  font-size: var(--text-base);
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border);
}

/* 代码展示 */
.code-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.6s;
}

.code-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.code-display {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
}

.code-header h3 {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
}

.code-language {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

.code-block {
  margin: 0;
  padding: var(--space-lg);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--text-sm);
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .test-selector {
    flex-direction: column;
    align-items: stretch;
  }
  
  .test-elements {
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
  }
  
  .test-box {
    width: 35px;
    height: 35px;
  }
  
  .heavy-elements {
    grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
  }
  
  .heavy-box {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .code-block {
    font-size: var(--text-xs);
    padding: var(--space-md);
  }
}
</style>