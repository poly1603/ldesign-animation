<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSequence, useTimeline, useStagger } from '@ldesign/animation'

// 组件状态
const isVisible = ref(false)
const sequenceBoxes = ref<HTMLElement[]>([])
const timelineBoxes = ref<HTMLElement[]>([])
const staggerBoxes = ref<HTMLElement[]>([])
const complexBoxes = ref<HTMLElement[]>([])

// 动画控制
const { createSequence, isPlaying: sequencePlaying } = useSequence()
const { createTimeline, isPlaying: timelinePlaying } = useTimeline()
const { createStagger, isPlaying: staggerPlaying } = useStagger()

// 序列动画演示
const runSequenceDemo = async () => {
  if (sequenceBoxes.value.length === 0) return
  
  const sequence = createSequence()
  
  // 添加动画步骤
  sequence
    .add({
      targets: sequenceBoxes.value[0],
      transform: 'translateX(100px) rotate(90deg)',
      backgroundColor: '#ef4444',
      duration: 500
    })
    .add({
      targets: sequenceBoxes.value[1],
      transform: 'translateY(-50px) scale(1.2)',
      backgroundColor: '#10b981',
      duration: 600
    })
    .add({
      targets: sequenceBoxes.value[2],
      transform: 'translateX(-100px) rotate(-90deg)',
      backgroundColor: '#f59e0b',
      duration: 500
    })
    .add({
      targets: sequenceBoxes.value,
      transform: 'scale(1) rotate(0deg) translate(0px, 0px)',
      backgroundColor: '#3b82f6',
      duration: 800,
      delay: 200
    })
  
  await sequence.play()
}

// 时间轴动画演示
const runTimelineDemo = async () => {
  if (timelineBoxes.value.length === 0) return
  
  const timeline = createTimeline()
  
  timeline
    .to(timelineBoxes.value[0], {
      transform: 'translateX(80px)',
      backgroundColor: '#8b5cf6',
      duration: 400
    }, 0)
    .to(timelineBoxes.value[1], {
      transform: 'translateY(-60px)',
      backgroundColor: '#06b6d4',
      duration: 400
    }, 200)
    .to(timelineBoxes.value[2], {
      transform: 'translateX(-80px)',
      backgroundColor: '#84cc16',
      duration: 400
    }, 400)
    .to(timelineBoxes.value[3], {
      transform: 'translateY(60px)',
      backgroundColor: '#f97316',
      duration: 400
    }, 600)
    .to(timelineBoxes.value, {
      transform: 'translate(0px, 0px)',
      backgroundColor: '#3b82f6',
      duration: 600
    }, 1200)
  
  await timeline.play()
}

// 交错动画演示
const runStaggerDemo = async () => {
  if (staggerBoxes.value.length === 0) return
  
  const stagger = createStagger(staggerBoxes.value, {
    transform: ['scale(1)', 'scale(1.3)', 'scale(1)'],
    backgroundColor: ['#3b82f6', '#ef4444', '#3b82f6'],
    borderRadius: ['8px', '50%', '8px']
  }, {
    duration: 600,
    stagger: 100,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  })
  
  await stagger.play()
}

// 复杂序列演示
const runComplexDemo = async () => {
  if (complexBoxes.value.length === 0) return
  
  const timeline = createTimeline()
  
  // 第一阶段：展开
  timeline.to(complexBoxes.value, {
    transform: 'scale(1.1)',
    duration: 300,
    stagger: 50
  }, 0)
  
  // 第二阶段：旋转和移动
  timeline.to(complexBoxes.value[0], {
    transform: 'scale(1.1) translateX(60px) rotate(180deg)',
    backgroundColor: '#ef4444',
    duration: 500
  }, 300)
  
  timeline.to(complexBoxes.value[1], {
    transform: 'scale(1.1) translateY(-60px) rotate(-90deg)',
    backgroundColor: '#10b981',
    duration: 500
  }, 400)
  
  timeline.to(complexBoxes.value[2], {
    transform: 'scale(1.1) translateX(-60px) rotate(90deg)',
    backgroundColor: '#f59e0b',
    duration: 500
  }, 500)
  
  timeline.to(complexBoxes.value[3], {
    transform: 'scale(1.1) translateY(60px) rotate(270deg)',
    backgroundColor: '#8b5cf6',
    duration: 500
  }, 600)
  
  // 第三阶段：聚合
  timeline.to(complexBoxes.value, {
    transform: 'scale(0.8) translate(0px, 0px) rotate(360deg)',
    duration: 600,
    stagger: 50
  }, 1200)
  
  // 第四阶段：恢复
  timeline.to(complexBoxes.value, {
    transform: 'scale(1) rotate(0deg)',
    backgroundColor: '#3b82f6',
    duration: 500,
    stagger: 30
  }, 1800)
  
  await timeline.play()
}

// 代码示例
const codeExamples = {
  sequence: `// 序列动画
const { createSequence } = useSequence()

const sequence = createSequence()
sequence
  .add({
    targets: element1,
    transform: 'translateX(100px) rotate(90deg)',
    backgroundColor: '#ef4444',
    duration: 500
  })
  .add({
    targets: element2,
    transform: 'translateY(-50px) scale(1.2)',
    backgroundColor: '#10b981',
    duration: 600
  })
  .add({
    targets: [element1, element2],
    transform: 'scale(1) rotate(0deg) translate(0px, 0px)',
    backgroundColor: '#3b82f6',
    duration: 800
  })

await sequence.play()`,
  timeline: `// 时间轴动画
const { createTimeline } = useTimeline()

const timeline = createTimeline()
timeline
  .to(element1, {
    transform: 'translateX(80px)',
    backgroundColor: '#8b5cf6',
    duration: 400
  }, 0)  // 在 0ms 开始
  .to(element2, {
    transform: 'translateY(-60px)',
    backgroundColor: '#06b6d4',
    duration: 400
  }, 200)  // 在 200ms 开始
  .to(elements, {
    transform: 'translate(0px, 0px)',
    backgroundColor: '#3b82f6',
    duration: 600
  }, 1200)  // 在 1200ms 开始

await timeline.play()`,
  stagger: `// 交错动画
const { createStagger } = useStagger()

const stagger = createStagger(elements, {
  transform: ['scale(1)', 'scale(1.3)', 'scale(1)'],
  backgroundColor: ['#3b82f6', '#ef4444', '#3b82f6'],
  borderRadius: ['8px', '50%', '8px']
}, {
  duration: 600,
  stagger: 100,  // 每个元素延迟 100ms
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
})

await stagger.play()`,
  complex: `// 复杂序列组合
const timeline = createTimeline()

// 多阶段动画组合
timeline
  .to(elements, { transform: 'scale(1.1)', duration: 300, stagger: 50 }, 0)
  .to(element1, { transform: 'translateX(60px) rotate(180deg)', duration: 500 }, 300)
  .to(element2, { transform: 'translateY(-60px) rotate(-90deg)', duration: 500 }, 400)
  .to(elements, { transform: 'scale(1) rotate(0deg)', duration: 500, stagger: 30 }, 1800)

await timeline.play()`
}

const currentCode = ref(codeExamples.sequence)
const activeDemo = ref('sequence')

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
  <section id="sequence" class="sequence-demo-section">
    <div class="section-header" :class="{ 'is-visible': isVisible }">
      <h2 class="section-title">动画序列演示</h2>
      <p class="section-description">
        探索复杂的动画序列，包括顺序执行、时间轴控制、交错动画和多阶段组合效果。
      </p>
    </div>
    
    <div class="demo-grid" :class="{ 'is-visible': isVisible }">
      <!-- 序列动画演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>序列动画</h3>
          <div class="demo-actions">
            <button 
              @click="runSequenceDemo" 
              :disabled="sequencePlaying"
              class="play-btn"
            >
              {{ sequencePlaying ? '播放中...' : '播放序列' }}
            </button>
            <button 
              @click="showCode('sequence')"
              class="code-btn"
              :class="{ active: activeDemo === 'sequence' }"
            >
              代码
            </button>
          </div>
        </div>
        
        <div class="demo-stage">
          <div class="sequence-container">
            <div 
              v-for="i in 3" 
              :key="i"
              :ref="el => sequenceBoxes[i-1] = el as HTMLElement"
              class="demo-box sequence-box"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 时间轴动画演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>时间轴动画</h3>
          <div class="demo-actions">
            <button 
              @click="runTimelineDemo" 
              :disabled="timelinePlaying"
              class="play-btn"
            >
              {{ timelinePlaying ? '播放中...' : '播放时间轴' }}
            </button>
            <button 
              @click="showCode('timeline')"
              class="code-btn"
              :class="{ active: activeDemo === 'timeline' }"
            >
              代码
            </button>
          </div>
        </div>
        
        <div class="demo-stage">
          <div class="timeline-container">
            <div 
              v-for="i in 4" 
              :key="i"
              :ref="el => timelineBoxes[i-1] = el as HTMLElement"
              class="demo-box timeline-box"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 交错动画演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>交错动画</h3>
          <div class="demo-actions">
            <button 
              @click="runStaggerDemo" 
              :disabled="staggerPlaying"
              class="play-btn"
            >
              {{ staggerPlaying ? '播放中...' : '播放交错' }}
            </button>
            <button 
              @click="showCode('stagger')"
              class="code-btn"
              :class="{ active: activeDemo === 'stagger' }"
            >
              代码
            </button>
          </div>
        </div>
        
        <div class="demo-stage">
          <div class="stagger-container">
            <div 
              v-for="i in 6" 
              :key="i"
              :ref="el => staggerBoxes[i-1] = el as HTMLElement"
              class="demo-box stagger-box"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 复杂序列演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>复杂序列组合</h3>
          <div class="demo-actions">
            <button 
              @click="runComplexDemo" 
              class="play-btn complex-btn"
            >
              播放复杂序列
            </button>
            <button 
              @click="showCode('complex')"
              class="code-btn"
              :class="{ active: activeDemo === 'complex' }"
            >
              代码
            </button>
          </div>
        </div>
        
        <div class="demo-stage">
          <div class="complex-container">
            <div 
              v-for="i in 4" 
              :key="i"
              :ref="el => complexBoxes[i-1] = el as HTMLElement"
              class="demo-box complex-box"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 代码展示区域 -->
    <div class="code-section" :class="{ 'is-visible': isVisible }">
      <div class="code-display">
        <div class="code-header">
          <h3>代码示例 - {{ activeDemo === 'sequence' ? '序列动画' : activeDemo === 'timeline' ? '时间轴动画' : activeDemo === 'stagger' ? '交错动画' : '复杂序列' }}</h3>
          <span class="code-language">TypeScript</span>
        </div>
        <pre class="code-block"><code>{{ currentCode }}</code></pre>
      </div>
    </div>
    
    <!-- 特性说明 -->
    <div class="features-section" :class="{ 'is-visible': isVisible }">
      <h3 class="features-title">序列动画特性</h3>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h4>序列执行</h4>
          <p>按顺序执行多个动画步骤，每个步骤完成后自动开始下一个</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏱️</div>
          <h4>时间轴控制</h4>
          <p>精确控制动画的开始时间，支持并行和串行混合执行</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h4>交错效果</h4>
          <p>为多个元素创建延迟递增的动画效果，形成波浪式动画</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎭</div>
          <h4>复杂组合</h4>
          <p>组合多种动画类型，创建复杂的多阶段动画序列</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sequence-demo-section {
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.2s;
}

.demo-grid.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.demo-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.demo-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.demo-header h3 {
  margin: 0;
  font-size: var(--text-xl);
  color: var(--color-text-primary);
}

.demo-actions {
  display: flex;
  gap: var(--space-sm);
}

.play-btn {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all var(--transition-normal);
  min-width: 100px;
}

.play-btn:hover:not(:disabled) {
  background-color: var(--color-primary);
  transform: translateY(-1px);
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.complex-btn {
  background-color: var(--color-warning);
}

.complex-btn:hover:not(:disabled) {
  background-color: var(--color-warning);
}

.code-btn {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.code-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.code-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.demo-stage {
  min-height: 200px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sequence-container,
.timeline-container,
.stagger-container,
.complex-container {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.stagger-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.complex-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.demo-box {
  width: 50px;
  height: 50px;
  background-color: #3b82f6;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: var(--text-sm);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.demo-box:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.sequence-box {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.timeline-box {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stagger-box {
  background: linear-gradient(135deg, #10b981, #047857);
  width: 40px;
  height: 40px;
}

.complex-box {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  width: 45px;
  height: 45px;
}

/* 代码展示 */
.code-section {
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.code-section.is-visible {
  opacity: 1;
  transform: translateY(0);
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

/* 特性说明 */
.features-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.6s;
}

.features-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.features-title {
  text-align: center;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.feature-card {
  text-align: center;
  padding: var(--space-lg);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-md);
}

.feature-card h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
}

.feature-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .demo-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}

@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
  }
  
  .demo-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .sequence-container,
  .timeline-container {
    gap: var(--space-md);
  }
  
  .stagger-container {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }
  
  .complex-container {
    gap: var(--space-md);
  }
  
  .demo-box {
    width: 40px;
    height: 40px;
    font-size: var(--text-xs);
  }
  
  .stagger-box {
    width: 35px;
    height: 35px;
  }
  
  .complex-box {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .demo-actions {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .play-btn,
  .code-btn {
    width: 100%;
  }
  
  .sequence-container,
  .timeline-container {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .stagger-container {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .code-block {
    font-size: var(--text-xs);
    padding: var(--space-md);
  }
}
</style>