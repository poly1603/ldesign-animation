<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation, useCSSAnimation, useKeyframes } from '@ldesign/animation'

// 动画状态
const isVisible = ref(false)
const demoBoxRef = ref<HTMLElement>()
const cssBoxRef = ref<HTMLElement>()
const keyframeBoxRef = ref<HTMLElement>()
const springBoxRef = ref<HTMLElement>()

// 动画控制
const { animate, isAnimating } = useAnimation()
const { startAnimation: startCSSAnimation } = useCSSAnimation()
const { createKeyframes } = useKeyframes()

// 动画演示函数
const runBasicAnimation = async () => {
  if (!demoBoxRef.value) return
  
  await animate(demoBoxRef.value, {
    transform: ['translateX(0px)', 'translateX(200px)', 'translateX(0px)'],
    backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#3b82f6']
  }, {
    duration: 2000,
    easing: 'ease-in-out'
  })
}

const runCSSAnimation = () => {
  if (!cssBoxRef.value) return
  
  startCSSAnimation(cssBoxRef.value, 'bounce', {
    duration: '1s',
    iterationCount: '2'
  })
}

const runKeyframeAnimation = async () => {
  if (!keyframeBoxRef.value) return
  
  const keyframes = createKeyframes([
    { transform: 'scale(1) rotate(0deg)', backgroundColor: '#8b5cf6' },
    { transform: 'scale(1.2) rotate(180deg)', backgroundColor: '#f59e0b' },
    { transform: 'scale(0.8) rotate(360deg)', backgroundColor: '#06b6d4' },
    { transform: 'scale(1) rotate(0deg)', backgroundColor: '#8b5cf6' }
  ])
  
  await animate(keyframeBoxRef.value, keyframes, {
    duration: 2500,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  })
}

const runSpringAnimation = async () => {
  if (!springBoxRef.value) return
  
  await animate(springBoxRef.value, {
    transform: ['translateY(0px)', 'translateY(-100px)', 'translateY(0px)'],
    borderRadius: ['8px', '50%', '8px']
  }, {
    duration: 1500,
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  })
}

// 自动播放演示
const runAutoDemo = async () => {
  await runBasicAnimation()
  await new Promise(resolve => setTimeout(resolve, 500))
  runCSSAnimation()
  await new Promise(resolve => setTimeout(resolve, 1500))
  await runKeyframeAnimation()
  await new Promise(resolve => setTimeout(resolve, 500))
  await runSpringAnimation()
}

// 代码示例
const codeExamples = {
  basic: `// 基础动画
const { animate } = useAnimation()

await animate(element, {
  transform: ['translateX(0px)', 'translateX(200px)', 'translateX(0px)'],
  backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#3b82f6']
}, {
  duration: 2000,
  easing: 'ease-in-out'
})`,
  css: `// CSS 动画
const { startAnimation } = useCSSAnimation()

startAnimation(element, 'bounce', {
  duration: '1s',
  iterationCount: '2'
})`,
  keyframe: `// 关键帧动画
const { createKeyframes } = useKeyframes()

const keyframes = createKeyframes([
  { transform: 'scale(1) rotate(0deg)', backgroundColor: '#8b5cf6' },
  { transform: 'scale(1.2) rotate(180deg)', backgroundColor: '#f59e0b' },
  { transform: 'scale(0.8) rotate(360deg)', backgroundColor: '#06b6d4' },
  { transform: 'scale(1) rotate(0deg)', backgroundColor: '#8b5cf6' }
])

await animate(element, keyframes, {
  duration: 2500,
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
})`,
  spring: `// 弹簧动画
await animate(element, {
  transform: ['translateY(0px)', 'translateY(-100px)', 'translateY(0px)'],
  borderRadius: ['8px', '50%', '8px']
}, {
  duration: 1500,
  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
})`
}

// 当前显示的代码
const currentCode = ref(codeExamples.basic)
const activeDemo = ref('basic')

const showCode = (type: keyof typeof codeExamples) => {
  currentCode.value = codeExamples[type]
  activeDemo.value = type
}

// 组件挂载
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section id="animation" class="animation-demo-section">
    <div class="section-header" :class="{ 'is-visible': isVisible }">
      <h2 class="section-title">基础动画演示</h2>
      <p class="section-description">
        探索 @ldesign/animation 提供的各种动画类型，从简单的属性变化到复杂的关键帧序列。
      </p>
    </div>
    
    <div class="demo-container" :class="{ 'is-visible': isVisible }">
      <!-- 动画演示区域 -->
      <div class="demo-playground">
        <div class="demo-controls">
          <button 
            @click="runBasicAnimation" 
            :disabled="isAnimating"
            class="demo-btn"
            :class="{ active: activeDemo === 'basic' }"
            @mouseenter="showCode('basic')"
          >
            基础动画
          </button>
          <button 
            @click="runCSSAnimation" 
            class="demo-btn"
            :class="{ active: activeDemo === 'css' }"
            @mouseenter="showCode('css')"
          >
            CSS 动画
          </button>
          <button 
            @click="runKeyframeAnimation" 
            :disabled="isAnimating"
            class="demo-btn"
            :class="{ active: activeDemo === 'keyframe' }"
            @mouseenter="showCode('keyframe')"
          >
            关键帧动画
          </button>
          <button 
            @click="runSpringAnimation" 
            :disabled="isAnimating"
            class="demo-btn"
            :class="{ active: activeDemo === 'spring' }"
            @mouseenter="showCode('spring')"
          >
            弹簧动画
          </button>
          <button 
            @click="runAutoDemo" 
            :disabled="isAnimating"
            class="demo-btn auto-btn"
          >
            自动演示
          </button>
        </div>
        
        <div class="demo-stage">
          <div class="demo-boxes">
            <div 
              ref="demoBoxRef" 
              class="demo-box basic-box"
              title="基础动画"
            >
              基础
            </div>
            <div 
              ref="cssBoxRef" 
              class="demo-box css-box"
              title="CSS 动画"
            >
              CSS
            </div>
            <div 
              ref="keyframeBoxRef" 
              class="demo-box keyframe-box"
              title="关键帧动画"
            >
              关键帧
            </div>
            <div 
              ref="springBoxRef" 
              class="demo-box spring-box"
              title="弹簧动画"
            >
              弹簧
            </div>
          </div>
        </div>
      </div>
      
      <!-- 代码展示区域 -->
      <div class="code-display">
        <div class="code-header">
          <h3>代码示例</h3>
          <span class="code-language">TypeScript</span>
        </div>
        <pre class="code-block"><code>{{ currentCode }}</code></pre>
      </div>
    </div>
    
    <!-- 特性说明 -->
    <div class="features-explanation" :class="{ 'is-visible': isVisible }">
      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h4>精确控制</h4>
          <p>支持精确的时间控制、缓动函数和动画状态管理</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <h4>高性能</h4>
          <p>基于 Web Animations API，充分利用浏览器硬件加速</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔄</div>
          <h4>可组合</h4>
          <p>支持动画链式调用、并行执行和复杂序列组合</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📱</div>
          <h4>响应式</h4>
          <p>自动适配不同设备和屏幕尺寸，提供一致体验</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animation-demo-section {
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

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.demo-playground {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.demo-btn {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.demo-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.demo-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.demo-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auto-btn {
  background-color: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.auto-btn:hover:not(:disabled) {
  background-color: var(--color-success);
  border-color: var(--color-success);
  transform: translateY(-1px);
}

.demo-stage {
  min-height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
}

.demo-boxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  height: 100%;
}

.demo-box {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.basic-box {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.css-box {
  background: linear-gradient(135deg, #10b981, #047857);
}

.keyframe-box {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.spring-box {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.demo-box:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.code-display {
  background-color: var(--color-bg-primary);
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
  background-color: var(--color-bg-secondary);
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
  background-color: var(--color-bg-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

.code-block {
  margin: 0;
  padding: var(--space-lg);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--text-sm);
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.features-explanation {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.features-explanation.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.feature-item {
  text-align: center;
  padding: var(--space-lg);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-md);
}

.feature-item h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
}

.feature-item p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* CSS 动画定义 */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
}

@media (max-width: 768px) {
  .demo-controls {
    justify-content: center;
  }
  
  .demo-btn {
    flex: 1;
    min-width: 80px;
  }
  
  .demo-boxes {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
  
  .demo-box {
    width: 60px;
    height: 60px;
    font-size: var(--text-xs);
  }
  
  .feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
  }
}

@media (max-width: 480px) {
  .demo-controls {
    flex-direction: column;
  }
  
  .demo-btn {
    width: 100%;
  }
  
  .demo-boxes {
    grid-template-columns: 1fr 1fr;
  }
  
  .code-block {
    font-size: var(--text-xs);
    padding: var(--space-md);
  }
}
</style>