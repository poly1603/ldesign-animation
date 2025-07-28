<template>
  <div class="js-animations">
    <div class="page-header">
      <h1 class="page-title">JavaScript 动画</h1>
      <p class="page-description">
        探索基于 JavaScript 的动画效果，使用 Web Animations API 和自定义动画控制器实现精确控制和动态行为。
      </p>
    </div>

    <!-- Web Animations API -->
    <section class="animation-section">
      <h2 class="section-title">Web Animations API</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>滑动动画</h3>
          <div class="demo-area">
            <div ref="slideRef" class="demo-box">滑动</div>
          </div>
          <button @click="playWebAnimation('slide')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>缩放动画</h3>
          <div class="demo-area">
            <div ref="scaleRef" class="demo-box">缩放</div>
          </div>
          <button @click="playWebAnimation('scale')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>旋转动画</h3>
          <div class="demo-area">
            <div ref="rotateRef" class="demo-box">旋转</div>
          </div>
          <button @click="playWebAnimation('rotate')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>复合路径</h3>
          <div class="demo-area">
            <div ref="complexRef" class="demo-box">复合</div>
          </div>
          <button @click="playWebAnimation('complex')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 补间动画 -->
    <section class="animation-section">
      <h2 class="section-title">补间动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>线性缓动</h3>
          <div class="demo-area">
            <div ref="linearRef" class="demo-box">线性</div>
          </div>
          <button @click="playTweenAnimation('linear')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>缓入动画</h3>
          <div class="demo-area">
            <div ref="easeInRef" class="demo-box">缓入</div>
          </div>
          <button @click="playTweenAnimation('easeIn')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>缓出动画</h3>
          <div class="demo-area">
            <div ref="easeOutRef" class="demo-box">缓出</div>
          </div>
          <button @click="playTweenAnimation('easeOut')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>弹跳动画</h3>
          <div class="demo-area">
            <div ref="bounceRef" class="demo-box">弹跳</div>
          </div>
          <button @click="playTweenAnimation('bounce')" class="demo-btn">播放动画</button>
        </div>
      </div>
      <div class="progress-section">
        <div class="progress-label">动画进度: {{ Math.round(tweenProgress) }}%</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: tweenProgress + '%' }"></div>
        </div>
      </div>
    </section>

    <!-- 弹簧动画 -->
    <section class="animation-section">
      <h2 class="section-title">弹簧动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>温和弹簧</h3>
          <div class="demo-area">
            <div ref="gentleRef" class="demo-box">温和</div>
          </div>
          <button @click="playSpringAnimation('gentle')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>弹性弹簧</h3>
          <div class="demo-area">
            <div ref="bouncyRef" class="demo-box">弹性</div>
          </div>
          <button @click="playSpringAnimation('bouncy')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>硬质弹簧</h3>
          <div class="demo-area">
            <div ref="stiffRef" class="demo-box">硬质</div>
          </div>
          <button @click="playSpringAnimation('stiff')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>摆动弹簧</h3>
          <div class="demo-area">
            <div ref="wobblyRef" class="demo-box">摆动</div>
          </div>
          <button @click="playSpringAnimation('wobbly')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 多步动画 -->
    <section class="animation-section">
      <h2 class="section-title">多步动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>轨道运动</h3>
          <div class="demo-area">
            <div ref="orbitRef" class="demo-box">轨道</div>
          </div>
          <button @click="playMultiStepAnimation('orbit')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>形状变形</h3>
          <div class="demo-area">
            <div ref="morphingRef" class="demo-box">变形</div>
          </div>
          <button @click="playMultiStepAnimation('morphing')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>颜色循环</h3>
          <div class="demo-area">
            <div ref="colorCycleRef" class="demo-box">颜色</div>
          </div>
          <button @click="playMultiStepAnimation('colorCycle')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>弹性变换</h3>
          <div class="demo-area">
            <div ref="elasticRef" class="demo-box">弹性</div>
          </div>
          <button @click="playMultiStepAnimation('elastic')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 动画控制 -->
    <section class="animation-section">
      <h2 class="section-title">动画控制</h2>
      <div class="control-demo">
        <div class="demo-area">
          <div ref="controlledRef" class="demo-box control-box">控制</div>
        </div>
        <div class="control-buttons">
          <button @click="startControlledAnimation" class="demo-btn">开始</button>
          <button @click="pauseControlledAnimation" class="demo-btn demo-btn-secondary">暂停</button>
          <button @click="resumeControlledAnimation" class="demo-btn demo-btn-secondary">继续</button>
          <button @click="reverseControlledAnimation" class="demo-btn demo-btn-outline">反向</button>
          <button @click="stopControlledAnimation" class="demo-btn demo-btn-secondary">停止</button>
        </div>
        <div class="control-panel">
          <div class="control-group">
            <label>播放速度: {{ playbackRate }}x</label>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1" 
              v-model="playbackRate"
              @input="updatePlaybackRate"
              class="range-input"
            >
          </div>
          <div class="control-group">
            <label>动画进度: {{ Math.round(controlledProgress * 100) }}%</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              v-model="controlledProgress"
              @input="updateProgress"
              class="range-input"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- 性能监控 -->
    <section class="animation-section">
      <h2 class="section-title">性能监控</h2>
      <div class="performance-demo">
        <div class="performance-controls">
          <button @click="startPerformanceTest" class="demo-btn">开始性能测试</button>
          <button @click="stopPerformanceTest" class="demo-btn demo-btn-secondary">停止测试</button>
        </div>
        <div class="performance-grid">
          <div 
            v-for="(item, index) in performanceItems" 
            :key="index"
            :ref="el => performanceRefs[index] = el"
            class="performance-box"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="performance-stats" v-if="performanceStats">
          <div class="stat-item">
            <span class="stat-label">FPS:</span>
            <span class="stat-value">{{ performanceStats.fps }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">内存:</span>
            <span class="stat-value">{{ performanceStats.memory }}MB</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">活跃动画:</span>
            <span class="stat-value">{{ performanceStats.activeAnimations }}</span>
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
const slideRef = ref<HTMLElement>()
const scaleRef = ref<HTMLElement>()
const rotateRef = ref<HTMLElement>()
const complexRef = ref<HTMLElement>()
const linearRef = ref<HTMLElement>()
const easeInRef = ref<HTMLElement>()
const easeOutRef = ref<HTMLElement>()
const bounceRef = ref<HTMLElement>()
const gentleRef = ref<HTMLElement>()
const bouncyRef = ref<HTMLElement>()
const stiffRef = ref<HTMLElement>()
const wobblyRef = ref<HTMLElement>()
const orbitRef = ref<HTMLElement>()
const morphingRef = ref<HTMLElement>()
const colorCycleRef = ref<HTMLElement>()
const elasticRef = ref<HTMLElement>()
const controlledRef = ref<HTMLElement>()

// 动画状态
const tweenProgress = ref(0)
const playbackRate = ref(1)
const controlledProgress = ref(0)
const performanceStats = ref<any>(null)

// 性能测试
const performanceItems = Array.from({ length: 50 }, (_, i) => i)
const performanceRefs = ref<(HTMLElement | null)[]>([])

// 代码示例
const activeCodeTab = ref('webapi')
const codeTabs = [
  { id: 'webapi', name: 'Web API' },
  { id: 'tween', name: '补间动画' },
  { id: 'spring', name: '弹簧动画' },
  { id: 'control', name: '动画控制' }
]

// 当前控制的动画
let controlledAnimation: any = null
let performanceTestActive = false

// Web Animations API
const playWebAnimation = (type: string) => {
  const refMap: Record<string, any> = {
    slide: slideRef,
    scale: scaleRef,
    rotate: rotateRef,
    complex: complexRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const animations: Record<string, any> = {
    slide: [
      { transform: 'translateX(0px)', opacity: 1 },
      { transform: 'translateX(200px)', opacity: 0.7 },
      { transform: 'translateX(0px)', opacity: 1 }
    ],
    scale: [
      { transform: 'scale(1)', background: '#667eea' },
      { transform: 'scale(1.5)', background: '#764ba2' },
      { transform: 'scale(1)', background: '#667eea' }
    ],
    rotate: [
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(180deg) scale(1.2)' },
      { transform: 'rotate(360deg) scale(1)' }
    ],
    complex: [
      { transform: 'translate(0px, 0px) rotate(0deg) scale(1)', borderRadius: '0.5rem' },
      { transform: 'translate(100px, -50px) rotate(90deg) scale(1.2)', borderRadius: '50%' },
      { transform: 'translate(200px, 0px) rotate(180deg) scale(0.8)', borderRadius: '0' },
      { transform: 'translate(100px, 50px) rotate(270deg) scale(1.2)', borderRadius: '50%' },
      { transform: 'translate(0px, 0px) rotate(360deg) scale(1)', borderRadius: '0.5rem' }
    ]
  }

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: animations[type],
    duration: 2000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }).play()
}

// 补间动画
const playTweenAnimation = (easingType: string) => {
  const refMap: Record<string, any> = {
    linear: linearRef,
    easeIn: easeInRef,
    easeOut: easeOutRef,
    bounce: bounceRef
  }
  
  const element = refMap[easingType]?.value
  if (!element) return

  const easings: Record<string, string> = {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }

  const animation = animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: [
      { transform: 'translateX(0px) scale(1) rotate(0deg)' },
      { transform: 'translateX(200px) scale(1.3) rotate(360deg)' }
    ],
    duration: 2000,
    easing: easings[easingType]
  })

  // 监控进度
  let startTime = 0
  const updateProgress = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / 2000, 1) * 100
    
    tweenProgress.value = progress
    
    if (progress < 100) {
      requestAnimationFrame(updateProgress)
    } else {
      setTimeout(() => {
        tweenProgress.value = 0
      }, 500)
    }
  }
  
  requestAnimationFrame(updateProgress)
  animation.play()
}

// 弹簧动画
const playSpringAnimation = (springType: string) => {
  const refMap: Record<string, any> = {
    gentle: gentleRef,
    bouncy: bouncyRef,
    stiff: stiffRef,
    wobbly: wobblyRef
  }
  
  const element = refMap[springType]?.value
  if (!element) return

  const springConfigs: Record<string, any> = {
    gentle: { easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', duration: 1500 },
    bouncy: { easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', duration: 2000 },
    stiff: { easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', duration: 800 },
    wobbly: { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', duration: 2500 }
  }

  const config = springConfigs[springType]

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: [
      { transform: 'translate(0px, 0px) scale(1)' },
      { transform: 'translate(150px, -30px) scale(1.2)' },
      { transform: 'translate(0px, 0px) scale(1)' }
    ],
    duration: config.duration,
    easing: config.easing
  }).play()
}

// 多步动画
const playMultiStepAnimation = (type: string) => {
  const refMap: Record<string, any> = {
    orbit: orbitRef,
    morphing: morphingRef,
    colorCycle: colorCycleRef,
    elastic: elasticRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const animations: Record<string, any> = {
    orbit: [
      { transform: 'translate(0px, 0px)' },
      { transform: 'translate(100px, -50px)', offset: 0.25 },
      { transform: 'translate(200px, 0px)', offset: 0.5 },
      { transform: 'translate(100px, 50px)', offset: 0.75 },
      { transform: 'translate(0px, 0px)' }
    ],
    morphing: [
      { borderRadius: '0.5rem', background: '#667eea' },
      { borderRadius: '50%', background: '#764ba2', offset: 0.25 },
      { borderRadius: '0', background: '#f093fb', offset: 0.5 },
      { borderRadius: '50%', background: '#f5576c', offset: 0.75 },
      { borderRadius: '0.5rem', background: '#667eea' }
    ],
    colorCycle: [
      { background: '#667eea', transform: 'scale(1)' },
      { background: '#764ba2', transform: 'scale(1.1)', offset: 0.25 },
      { background: '#f093fb', transform: 'scale(1.2)', offset: 0.5 },
      { background: '#f5576c', transform: 'scale(1.1)', offset: 0.75 },
      { background: '#667eea', transform: 'scale(1)' }
    ],
    elastic: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.3, 0.7)', offset: 0.25 },
      { transform: 'scale(0.7, 1.3)', offset: 0.5 },
      { transform: 'scale(1.1, 0.9)', offset: 0.75 },
      { transform: 'scale(1)' }
    ]
  }

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: animations[type],
    duration: 2000,
    easing: 'ease-in-out'
  }).play()
}

// 动画控制
const startControlledAnimation = () => {
  if (!controlledRef.value) return

  const keyframes = [
    { transform: 'translateX(0px) rotate(0deg)', background: '#667eea' },
    { transform: 'translateX(100px) rotate(180deg)', background: '#764ba2', offset: 0.33 },
    { transform: 'translateX(200px) rotate(360deg)', background: '#f093fb', offset: 0.66 },
    { transform: 'translateX(0px) rotate(720deg)', background: '#667eea' }
  ]

  controlledAnimation = animationManager.createAnimation(controlledRef.value, {
    type: 'custom',
    keyframes,
    duration: 4000,
    easing: 'ease-in-out',
    iterations: Infinity
  })
  
  controlledAnimation.play()
  
  // 监控进度
  const updateProgress = () => {
    if (controlledAnimation) {
      // 模拟进度更新
      controlledProgress.value = (controlledProgress.value + 0.005) % 1
      requestAnimationFrame(updateProgress)
    }
  }
  updateProgress()
}

const pauseControlledAnimation = () => {
  if (controlledAnimation) {
    controlledAnimation.pause()
  }
}

const resumeControlledAnimation = () => {
  if (controlledAnimation) {
    controlledAnimation.resume()
  }
}

const reverseControlledAnimation = () => {
  if (controlledAnimation) {
    controlledAnimation.reverse()
  }
}

const stopControlledAnimation = () => {
  if (controlledAnimation) {
    controlledAnimation.stop()
    controlledAnimation = null
    controlledProgress.value = 0
  }
}

const updatePlaybackRate = () => {
  if (controlledAnimation) {
    controlledAnimation.setPlaybackRate(playbackRate.value)
  }
}

const updateProgress = () => {
  if (controlledAnimation) {
    controlledAnimation.setProgress(controlledProgress.value)
  }
}

// 性能测试
const startPerformanceTest = () => {
  if (performanceTestActive) return
  
  performanceTestActive = true
  
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      animationManager.createAnimation(el, {
        type: 'custom',
        keyframes: [
          { transform: 'scale(1) rotate(0deg)', background: '#667eea' },
          { transform: 'scale(1.2) rotate(180deg)', background: '#764ba2' },
          { transform: 'scale(1) rotate(360deg)', background: '#667eea' }
        ],
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-in-out',
        iterations: Infinity
      }).play()
    }, index * 50)
  })
  
  // 更新性能统计
  const updateStats = () => {
    if (performanceTestActive) {
      performanceStats.value = {
        fps: Math.round(60 - Math.random() * 10), // 模拟 FPS
        memory: Math.round(50 + Math.random() * 20), // 模拟内存使用
        activeAnimations: elements.length
      }
      setTimeout(updateStats, 100)
    }
  }
  updateStats()
}

const stopPerformanceTest = () => {
  performanceTestActive = false
  
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  elements.forEach(el => {
    el.style.animation = 'none'
    el.style.transform = 'none'
    el.style.background = ''
  })
  
  performanceStats.value = null
}

// 工具函数
const getCurrentCodeExample = () => {
  const examples: Record<string, string> = {
    webapi: `<template>
  <div ref="elementRef" class="animated-element">
    JS 动画元素
  </div>
  <button @click="animate">播放动画</button>
</template>

// Web API 示例代码
// import { ref } from 'vue'
// import { AnimationManager } from '@ldesign/animation'
//
// const elementRef = ref()
// const animationManager = new AnimationManager()
//
// const animate = () => {
//   animationManager.createAnimation(elementRef.value, {
//     type: 'custom',
//     keyframes: [
//       { transform: 'translateX(0px) scale(1)', opacity: 1 },
//       { transform: 'translateX(200px) scale(1.2)', opacity: 0.8 },
//       { transform: 'translateX(0px) scale(1)', opacity: 1 }
//     ],
//     duration: 2000,
//     easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
//   }).play()
// }`,
    tween: `// 补间动画示例
const tweenAnimate = () => {
  const animation = animationManager.createAnimation(elementRef.value, {
    type: 'custom',
    keyframes: [
      { transform: 'translateX(0px) scale(1) rotate(0deg)' },
      { transform: 'translateX(200px) scale(1.3) rotate(360deg)' }
    ],
    duration: 2000,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' // 弹跳缓动
  })
  
  // 监控进度
  animation.onProgress((progress) => {
    console.log('动画进度:', progress * 100 + '%')
  })
  
  animation.play()
}`,
    spring: `// 弹簧动画示例
const springAnimate = () => {
  // 温和弹簧配置
  const gentleSpring = {
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    duration: 1500
  }
  
  // 弹性弹簧配置
  const bouncySpring = {
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    duration: 2000
  }
  
  animationManager.createAnimation(elementRef.value, {
    type: 'custom',
    keyframes: [
      { transform: 'translate(0px, 0px) scale(1)' },
      { transform: 'translate(150px, -30px) scale(1.2)' },
      { transform: 'translate(0px, 0px) scale(1)' }
    ],
    duration: bouncySpring.duration,
    easing: bouncySpring.easing
  }).play()
}`,
    control: `// 动画控制示例
let animation = null

const startAnimation = () => {
  animation = animationManager.createAnimation(elementRef.value, {
    type: 'custom',
    keyframes: [
      { transform: 'translateX(0px) rotate(0deg)' },
      { transform: 'translateX(200px) rotate(360deg)' }
    ],
    duration: 4000,
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

const reverseAnimation = () => {
  if (animation) animation.reverse()
}

const setSpeed = (rate) => {
  if (animation) animation.setPlaybackRate(rate)
}

const setProgress = (progress) => {
  if (animation) animation.setProgress(progress)
}`
  }
  return examples[activeCodeTab.value] || examples.webapi
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
.js-animations {
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

.progress-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.progress-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s ease;
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

.control-panel {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.control-group {
  margin-bottom: 1rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.range-input {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.range-input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
  border: none;
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

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.5rem;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 2rem;
}

.performance-box {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.performance-stats {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #f0f9ff;
  border-radius: 0.5rem;
  border: 1px solid #0ea5e9;
  justify-content: center;
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
  font-size: 1.5rem;
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
  
  .performance-grid {
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    padding: 1rem;
  }
  
  .performance-box {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
  
  .performance-stats {
    flex-direction: column;
    gap: 1rem;
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