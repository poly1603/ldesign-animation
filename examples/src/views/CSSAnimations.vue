<template>
  <div class="css-animations">
    <div class="page-header">
      <h1 class="page-title">CSS 动画</h1>
      <p class="page-description">
        展示基于 CSS 的关键帧动画效果，利用 CSS 动画实现最佳性能和流畅渲染。
      </p>
    </div>

    <!-- CSS 关键帧动画 -->
    <section class="animation-section">
      <h2 class="section-title">CSS 关键帧动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>滑入弹跳</h3>
          <div class="demo-area">
            <div ref="slideInBounceRef" class="demo-box">滑入</div>
          </div>
          <button @click="playKeyframeAnimation('slideInBounce')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>旋转缩放</h3>
          <div class="demo-area">
            <div ref="rotateScaleRef" class="demo-box">旋转</div>
          </div>
          <button @click="playKeyframeAnimation('rotateScale')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>颜色变换</h3>
          <div class="demo-area">
            <div ref="colorShiftRef" class="demo-box">颜色</div>
          </div>
          <button @click="playKeyframeAnimation('colorShift')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>形状变形</h3>
          <div class="demo-area">
            <div ref="morphingRef" class="demo-box">变形</div>
          </div>
          <button @click="playKeyframeAnimation('morphing')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- CSS 类动画 -->
    <section class="animation-section">
      <h2 class="section-title">CSS 类动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>旋转动画</h3>
          <div class="demo-area">
            <div ref="spinRef" class="demo-box">🔄</div>
          </div>
          <button @click="applyClassAnimation('animate-spin', spinRef)" class="demo-btn">开始旋转</button>
        </div>

        <div class="demo-card">
          <h3>脉冲动画</h3>
          <div class="demo-area">
            <div ref="pulseRef" class="demo-box">💓</div>
          </div>
          <button @click="applyClassAnimation('animate-pulse', pulseRef)" class="demo-btn">开始脉冲</button>
        </div>

        <div class="demo-card">
          <h3>弹跳动画</h3>
          <div class="demo-area">
            <div ref="bounceRef" class="demo-box">⚡</div>
          </div>
          <button @click="applyClassAnimation('animate-bounce', bounceRef)" class="demo-btn">开始弹跳</button>
        </div>

        <div class="demo-card">
          <h3>波纹动画</h3>
          <div class="demo-area">
            <div ref="pingRef" class="demo-box">📡</div>
          </div>
          <button @click="applyClassAnimation('animate-ping', pingRef)" class="demo-btn">开始波纹</button>
        </div>
      </div>
      <div class="control-section">
        <button @click="stopAllClassAnimations" class="demo-btn demo-btn-secondary">停止所有动画</button>
      </div>
    </section>

    <!-- 复杂 CSS 动画 -->
    <section class="animation-section">
      <h2 class="section-title">复杂 CSS 动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>3D 矩阵变换</h3>
          <div class="demo-area">
            <div ref="matrix3dRef" class="demo-box complex-box">
              <div class="box-content">3D</div>
            </div>
          </div>
          <button @click="playComplexAnimation('matrix3d')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>卡片翻转</h3>
          <div class="demo-area">
            <div ref="cardFlipRef" class="demo-box card-flip-box">
              <div class="box-front">正面</div>
              <div class="box-back">背面</div>
            </div>
          </div>
          <button @click="playComplexAnimation('cardFlip')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>弹性动画</h3>
          <div class="demo-area">
            <div ref="elasticRef" class="demo-box">弹性</div>
          </div>
          <button @click="playComplexAnimation('elastic')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>波浪动画</h3>
          <div class="demo-area">
            <div ref="waveRef" class="demo-box">🌊</div>
          </div>
          <button @click="playComplexAnimation('wave')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 动画控制 -->
    <section class="animation-section">
      <h2 class="section-title">动画控制</h2>
      <div class="control-demo">
        <div class="demo-area">
          <div ref="controlRef" class="demo-box control-box">控制</div>
        </div>
        <div class="control-buttons">
          <button @click="startControlledAnimation" class="demo-btn">开始</button>
          <button @click="pauseAnimation" class="demo-btn demo-btn-secondary">暂停</button>
          <button @click="resumeAnimation" class="demo-btn demo-btn-secondary">继续</button>
          <button @click="stopAnimation" class="demo-btn demo-btn-secondary">停止</button>
          <button @click="reverseAnimation" class="demo-btn demo-btn-outline">反向</button>
        </div>
        <div class="animation-info">
          <div class="info-item">
            <span class="info-label">状态:</span>
            <span class="info-value" :class="'status-' + animationStatus">{{ getStatusText(animationStatus) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">进度:</span>
            <span class="info-value">{{ Math.round(animationProgress * 100) }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: animationProgress * 100 + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能对比 -->
    <section class="animation-section">
      <h2 class="section-title">性能对比</h2>
      <div class="performance-demo">
        <div class="performance-controls">
          <button @click="runPerformanceTest('css')" class="demo-btn">CSS 动画 (60个元素)</button>
          <button @click="runPerformanceTest('js')" class="demo-btn">JS 动画 (60个元素)</button>
          <button @click="clearPerformanceTest" class="demo-btn demo-btn-secondary">清除</button>
        </div>
        <div class="performance-container">
          <div 
            v-for="(item, index) in performanceItems" 
            :key="index"
            :ref="el => performanceRefs[index] = el"
            class="performance-box"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="performance-info" v-if="performanceResult">
          <div class="performance-stats">
            <div class="stat-item">
              <span class="stat-label">动画类型:</span>
              <span class="stat-value">{{ performanceResult.type }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">执行时间:</span>
              <span class="stat-value">{{ performanceResult.duration }}ms</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">平均 FPS:</span>
              <span class="stat-value">{{ performanceResult.fps }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="animation-section">
      <h2 class="section-title">代码示例</h2>
      <div class="code-example">
        <div class="code-tabs">
          <button 
            v-for="tab in codeTabs" 
            :key="tab.id"
            @click="activeCodeTab = tab.id"
            class="code-tab"
            :class="{ active: activeCodeTab === tab.id }"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="code-content">
          <pre><code>{{ getCurrentCodeExample() }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AnimationManager } from '@ldesign/animation'

// 创建动画管理器
const animationManager = new AnimationManager()

// 元素引用
const slideInBounceRef = ref<HTMLElement>()
const rotateScaleRef = ref<HTMLElement>()
const colorShiftRef = ref<HTMLElement>()
const morphingRef = ref<HTMLElement>()
const spinRef = ref<HTMLElement>()
const pulseRef = ref<HTMLElement>()
const bounceRef = ref<HTMLElement>()
const pingRef = ref<HTMLElement>()
const matrix3dRef = ref<HTMLElement>()
const cardFlipRef = ref<HTMLElement>()
const elasticRef = ref<HTMLElement>()
const waveRef = ref<HTMLElement>()
const controlRef = ref<HTMLElement>()

// 动画状态
const animationStatus = ref('idle')
const animationProgress = ref(0)
let currentAnimation: any = null

// 性能测试
const performanceItems = Array.from({ length: 60 }, (_, i) => i)
const performanceRefs = ref<(HTMLElement | null)[]>([])
const performanceResult = ref<any>(null)

// 代码示例
const activeCodeTab = ref('basic')
const codeTabs = [
  { id: 'basic', name: '基础用法' },
  { id: 'keyframes', name: '关键帧' },
  { id: 'control', name: '动画控制' }
]

// 关键帧动画
const playKeyframeAnimation = (type: string) => {
  const refMap: Record<string, any> = {
    slideInBounce: slideInBounceRef,
    rotateScale: rotateScaleRef,
    colorShift: colorShiftRef,
    morphing: morphingRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const keyframes: Record<string, any> = {
    slideInBounce: [
      { transform: 'translateX(-100%) scale(0.8)', opacity: 0 },
      { transform: 'translateX(10%) scale(1.1)', opacity: 1, offset: 0.6 },
      { transform: 'translateX(0) scale(1)', opacity: 1 }
    ],
    rotateScale: [
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(90deg) scale(1.2)', offset: 0.25 },
      { transform: 'rotate(180deg) scale(0.8)', offset: 0.5 },
      { transform: 'rotate(270deg) scale(1.2)', offset: 0.75 },
      { transform: 'rotate(360deg) scale(1)' }
    ],
    colorShift: [
      { background: '#667eea', transform: 'scale(1)' },
      { background: '#764ba2', transform: 'scale(1.1)', offset: 0.25 },
      { background: '#f093fb', transform: 'scale(1.2)', offset: 0.5 },
      { background: '#f5576c', transform: 'scale(1.1)', offset: 0.75 },
      { background: '#667eea', transform: 'scale(1)' }
    ],
    morphing: [
      { borderRadius: '0.5rem', transform: 'rotate(0deg)' },
      { borderRadius: '50%', transform: 'rotate(90deg)', offset: 0.25 },
      { borderRadius: '0', transform: 'rotate(180deg)', offset: 0.5 },
      { borderRadius: '50%', transform: 'rotate(270deg)', offset: 0.75 },
      { borderRadius: '0.5rem', transform: 'rotate(360deg)' }
    ]
  }

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: keyframes[type],
    duration: 2000,
    easing: 'ease-in-out'
  }).play()
}

// CSS 类动画
const applyClassAnimation = (className: string, elementRef: any) => {
  const element = elementRef?.value
  if (!element) return
  
  // 移除现有动画类
  removeClassAnimation(element)
  
  // 添加新动画类
  element.classList.add(className)
}

const removeClassAnimation = (element: HTMLElement) => {
  const animationClasses = ['animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce']
  animationClasses.forEach(cls => {
    element.classList.remove(cls)
  })
}

const stopAllClassAnimations = () => {
  const elements = [spinRef, pulseRef, bounceRef, pingRef]
  elements.forEach(ref => {
    if (ref?.value) {
      removeClassAnimation(ref.value)
    }
  })
}

// 复杂动画
const playComplexAnimation = (type: string) => {
  const refMap: Record<string, any> = {
    matrix3d: matrix3dRef,
    cardFlip: cardFlipRef,
    elastic: elasticRef,
    wave: waveRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const animations: Record<string, any> = {
    matrix3d: [
      { transform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)' },
      { transform: 'matrix3d(1,0,0,0,0,0.5,0,0,0,0,1,0,0,0,0,1) rotateY(180deg)', offset: 0.5 },
      { transform: 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)' }
    ],
    cardFlip: [
      { transform: 'perspective(1000px) rotateY(0deg)' },
      { transform: 'perspective(1000px) rotateY(180deg)' }
    ],
    elastic: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.2, 0.8)', offset: 0.2 },
      { transform: 'scale(0.8, 1.2)', offset: 0.4 },
      { transform: 'scale(1.1, 0.9)', offset: 0.6 },
      { transform: 'scale(0.95, 1.05)', offset: 0.8 },
      { transform: 'scale(1)' }
    ],
    wave: [
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-20px) rotate(5deg)', offset: 0.25 },
      { transform: 'translateY(0) rotate(0deg)', offset: 0.5 },
      { transform: 'translateY(20px) rotate(-5deg)', offset: 0.75 },
      { transform: 'translateY(0) rotate(0deg)' }
    ]
  }

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: animations[type],
    duration: 2000,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }).play()
}

// 动画控制
const startControlledAnimation = () => {
  if (!controlRef.value) return

  const keyframes = [
    { transform: 'translateX(0) scale(1)', background: '#667eea' },
    { transform: 'translateX(100px) scale(1.2)', background: '#764ba2', offset: 0.25 },
    { transform: 'translateX(200px) scale(0.8)', background: '#f093fb', offset: 0.5 },
    { transform: 'translateX(100px) scale(1.2)', background: '#f5576c', offset: 0.75 },
    { transform: 'translateX(0) scale(1)', background: '#667eea' }
  ]

  currentAnimation = animationManager.createAnimation(controlRef.value, {
    type: 'custom',
    keyframes,
    duration: 4000,
    easing: 'ease-in-out',
    iterations: Infinity
  })
  
  currentAnimation.play()
  animationStatus.value = 'playing'
  
  // 监控动画进度
  const updateProgress = () => {
    if (currentAnimation && animationStatus.value === 'playing') {
      // 模拟进度更新
      animationProgress.value = (animationProgress.value + 0.01) % 1
      requestAnimationFrame(updateProgress)
    }
  }
  updateProgress()
}

const pauseAnimation = () => {
  if (currentAnimation) {
    currentAnimation.pause()
    animationStatus.value = 'paused'
  }
}

const resumeAnimation = () => {
  if (currentAnimation) {
    currentAnimation.resume()
    animationStatus.value = 'playing'
  }
}

const stopAnimation = () => {
  if (currentAnimation) {
    currentAnimation.stop()
    animationStatus.value = 'idle'
    animationProgress.value = 0
    currentAnimation = null
  }
}

const reverseAnimation = () => {
  if (currentAnimation) {
    currentAnimation.reverse()
    animationStatus.value = 'playing'
  }
}

// 性能测试
const runPerformanceTest = async (type: 'css' | 'js') => {
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  if (elements.length === 0) return

  const startTime = performance.now()
  
  if (type === 'css') {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('performance-animate')
      }, index * 10)
    })
  } else {
    elements.forEach((el, index) => {
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'bounceIn',
          duration: 1000,
          easing: 'ease-out'
        }).play()
      }, index * 10)
    })
  }
  
  const endTime = performance.now()
  const duration = endTime - startTime

  performanceResult.value = {
    type: type.toUpperCase(),
    duration: Math.round(duration),
    fps: Math.round(1000 / (duration / elements.length))
  }
}

const clearPerformanceTest = () => {
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  elements.forEach(el => {
    el.classList.remove('performance-animate')
    el.style.animation = 'none'
    el.style.transform = 'none'
    el.style.opacity = '1'
  })
  performanceResult.value = null
}

// 工具函数
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    idle: '空闲',
    playing: '播放中',
    paused: '已暂停',
    finished: '已完成'
  }
  return statusMap[status] || status
}

const getCurrentCodeExample = () => {
  const examples: Record<string, string> = {
    basic: `<template>
  <div ref="elementRef" class="animated-element">
    CSS 动画元素
  </div>
  <button @click="animate">播放动画</button>
</template>

// 基础用法示例代码
// import { ref } from 'vue'
// import { AnimationManager } from '@ldesign/animation'
//
// const elementRef = ref()
// const animationManager = new AnimationManager()
//
// const animate = () => {
//   animationManager.createAnimation(elementRef.value, {
//     type: 'bounceIn',
//     duration: 1000,
//     easing: 'ease-out'
//   }).play()
// }`,
    keyframes: `// 自定义关键帧动画
const customAnimation = () => {
  const keyframes = [
    { transform: 'scale(1) rotate(0deg)', opacity: 1 },
    { transform: 'scale(1.2) rotate(180deg)', opacity: 0.8 },
    { transform: 'scale(1) rotate(360deg)', opacity: 1 }
  ]
  
  animationManager.createAnimation(elementRef.value, {
    type: 'custom',
    keyframes,
    duration: 2000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }).play()
}`,
    control: `// 动画控制
let animation = null

const startAnimation = () => {
  animation = animationManager.createAnimation(elementRef.value, {
    type: 'slideIn',
    duration: 2000,
    iterations: Infinity
  })
  animation.play()
}

const pauseAnimation = () => {
  if (animation) animation.pause()
}

const resumeAnimation = () => {
  if (animation) animation.resume()
}

const stopAnimation = () => {
  if (animation) {
    animation.stop()
    animation = null
  }
}`
  }
  return examples[activeCodeTab.value] || examples.basic
}

onMounted(() => {
  // 页面加载时的入场动画
  const elements = document.querySelectorAll('.demo-card')
  elements.forEach((el, index) => {
    if (el instanceof HTMLElement) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'custom',
          keyframes: [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          duration: 500,
          easing: 'ease-out'
        }).play()
      }, index * 50)
    }
  })
})
</script>

<style scoped>
.css-animations {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.animation-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.demo-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: center;
}

.demo-area {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  overflow: hidden;
  perspective: 1000px;
}

.demo-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.complex-box {
  transform-style: preserve-3d;
}

.card-flip-box {
  position: relative;
  transform-style: preserve-3d;
}

.box-front,
.box-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.box-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.box-back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  transform: rotateY(180deg);
}

.box-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.demo-btn-secondary {
  background: #6b7280;
}

.demo-btn-secondary:hover {
  background: #4b5563;
}

.demo-btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.demo-btn-outline:hover {
  background: #667eea;
  color: white;
}

.control-section {
  margin-top: 2rem;
  text-align: center;
}

.control-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.control-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.control-buttons .demo-btn {
  width: auto;
  min-width: 100px;
}

.animation-info {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: #374151;
}

.info-value {
  color: #6b7280;
}

.status-playing {
  color: #10b981 !important;
}

.status-paused {
  color: #f59e0b !important;
}

.status-idle {
  color: #6b7280 !important;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s ease;
}

.performance-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.performance-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.performance-controls .demo-btn {
  width: auto;
  min-width: 150px;
}

.performance-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.5rem;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 2rem;
}

.performance-box {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.performance-animate {
  animation: performanceAnimation 1s ease-out;
}

@keyframes performanceAnimation {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

.performance-info {
  background: #f0f9ff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #0ea5e9;
}

.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #0c4a6e;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0369a1;
}

.code-example {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.code-tabs {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.code-tab {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.code-tab:hover {
  color: #374151;
  background: #f3f4f6;
}

.code-tab.active {
  color: #667eea;
  background: white;
  border-bottom-color: #667eea;
}

.code-content {
  padding: 0;
}

.code-content pre {
  margin: 0;
  padding: 2rem;
  background: #1f2937;
  color: #f9fafb;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-content code {
  font-family: inherit;
}

/* CSS 动画类 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .control-buttons .demo-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .performance-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .performance-controls .demo-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .performance-container {
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
    padding: 1rem;
  }
  
  .performance-box {
    width: 35px;
    height: 35px;
    font-size: 0.625rem;
  }
  
  .performance-stats {
    grid-template-columns: 1fr;
  }
  
  .code-tabs {
    flex-wrap: wrap;
  }
  
  .code-tab {
    flex: 1;
    min-width: 100px;
  }
}
</style>