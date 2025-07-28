<template>
  <div class="transitions">
    <div class="page-header">
      <h1 class="page-title">过渡动画</h1>
      <p class="page-description">
        平滑的属性过渡效果，用于无缝的状态变化和交互效果。非常适合悬停状态、表单交互和动态内容更新。
      </p>
    </div>

    <!-- 基础过渡 -->
    <section class="animation-section">
      <h2 class="section-title">基础属性过渡</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>透明度过渡</h3>
          <div class="demo-area">
            <div ref="opacityRef" class="demo-box">透明度</div>
          </div>
          <button @click="basicTransition('opacity')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>变换过渡</h3>
          <div class="demo-area">
            <div ref="transformRef" class="demo-box">变换</div>
          </div>
          <button @click="basicTransition('transform')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>颜色过渡</h3>
          <div class="demo-area">
            <div ref="colorRef" class="demo-box">颜色</div>
          </div>
          <button @click="basicTransition('color')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>尺寸过渡</h3>
          <div class="demo-area">
            <div ref="sizeRef" class="demo-box">尺寸</div>
          </div>
          <button @click="basicTransition('size')" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 多属性过渡 -->
    <section class="animation-section">
      <h2 class="section-title">多属性过渡</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>同时过渡</h3>
          <div class="demo-area">
            <div ref="allRef" class="demo-box">全部</div>
          </div>
          <button @click="multipleTransition('all')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>错开过渡</h3>
          <div class="demo-area">
            <div ref="staggeredRef" class="demo-box">错开</div>
          </div>
          <button @click="multipleTransition('staggered')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>顺序过渡</h3>
          <div class="demo-area">
            <div ref="sequentialRef" class="demo-box">顺序</div>
          </div>
          <button @click="multipleTransition('sequential')" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>重置状态</h3>
          <div class="demo-area">
            <div class="demo-box demo-box-static">重置</div>
          </div>
          <button @click="resetMultiple()" class="demo-btn demo-btn-secondary">重置全部</button>
        </div>
      </div>
    </section>

    <!-- 缓动函数 -->
    <section class="animation-section">
      <h2 class="section-title">缓动函数</h2>
      <div class="easing-demo">
        <div class="easing-controls">
          <button @click="easingTransition('ease')" class="demo-btn">标准缓动</button>
          <button @click="easingTransition('ease-in')" class="demo-btn">缓入</button>
          <button @click="easingTransition('ease-out')" class="demo-btn">缓出</button>
          <button @click="easingTransition('cubic-bezier')" class="demo-btn">自定义贝塞尔</button>
        </div>
        <div class="easing-track">
          <div 
            v-for="(easing, index) in easingBoxes" 
            :key="index"
            :ref="el => easingRefs[index] = el"
            class="easing-box"
          >
            {{ easing.name }}
          </div>
        </div>
      </div>
    </section>

    <!-- 交互式过渡 -->
    <section class="animation-section">
      <h2 class="section-title">交互式过渡</h2>
      <div class="interactive-grid">
        <div 
          class="interactive-card hover-card"
          @mouseenter="onHover(true, 0)"
          @mouseleave="onHover(false, 0)"
        >
          <div class="card-content">
            <div class="card-icon">🎯</div>
            <h3>悬停卡片</h3>
            <p>悬停查看过渡效果</p>
          </div>
        </div>
        
        <div 
          class="interactive-card click-card"
          @click="onClick(1)"
          :class="{ clicked: clickStates[1] }"
        >
          <div class="card-content">
            <div class="card-icon">👆</div>
            <h3>点击卡片</h3>
            <p>点击触发动画</p>
          </div>
        </div>
        
        <div 
          class="interactive-card scale-card"
          @mouseenter="onHover(true, 2)"
          @mouseleave="onHover(false, 2)"
        >
          <div class="card-content">
            <div class="card-icon">📏</div>
            <h3>缩放卡片</h3>
            <p>悬停查看缩放效果</p>
          </div>
        </div>

        <div 
          class="interactive-card rotate-card"
          @click="onClick(3)"
          :class="{ rotated: clickStates[3] }"
        >
          <div class="card-content">
            <div class="card-icon">🔄</div>
            <h3>旋转卡片</h3>
            <p>点击查看旋转效果</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 状态过渡 -->
    <section class="animation-section">
      <h2 class="section-title">状态过渡</h2>
      <div class="state-demo">
        <div class="state-controls">
          <button @click="toggleState('loading')" class="demo-btn">
            {{ states.loading ? '停止' : '开始' }} 加载
          </button>
          <button @click="toggleState('success')" class="demo-btn demo-btn-success">
            {{ states.success ? '重置' : '成功' }}
          </button>
          <button @click="toggleState('error')" class="demo-btn demo-btn-error">
            {{ states.error ? '重置' : '错误' }}
          </button>
        </div>
        <div class="state-container">
          <div 
            class="state-box"
            :class="{
              'state-loading': states.loading,
              'state-success': states.success,
              'state-error': states.error
            }"
          >
            <div class="state-content">
              <div v-if="!states.loading && !states.success && !states.error" class="state-idle">
                <div class="state-icon">⚡</div>
                <div class="state-text">准备就绪</div>
              </div>
              <div v-if="states.loading" class="state-loading-content">
                <div class="spinner"></div>
                <div class="state-text">加载中...</div>
              </div>
              <div v-if="states.success" class="state-success-content">
                <div class="state-icon">✓</div>
                <div class="state-text">操作成功！</div>
              </div>
              <div v-if="states.error" class="state-error-content">
                <div class="state-icon">✗</div>
                <div class="state-text">操作失败！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能对比 -->
    <section class="animation-section">
      <h2 class="section-title">性能对比</h2>
      <div class="performance-demo">
        <div class="performance-controls">
          <button @click="performanceTest('css')" class="demo-btn">CSS 过渡</button>
          <button @click="performanceTest('js')" class="demo-btn">JS 动画</button>
          <button @click="clearPerformance()" class="demo-btn demo-btn-secondary">清除</button>
        </div>
        <div class="performance-grid">
          <div 
            v-for="(item, index) in performanceItems" 
            :key="index"
            :ref="el => performanceRefs[index] = el"
            class="performance-item"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="performance-result" v-if="performanceResult">
          <div class="result-item">
            <span class="result-label">方法:</span>
            <span class="result-value">{{ performanceResult.method }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">耗时:</span>
            <span class="result-value">{{ performanceResult.duration }}ms</span>
          </div>
          <div class="result-item">
            <span class="result-label">元素数量:</span>
            <span class="result-value">{{ performanceResult.elements }}</span>
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
import { ref, reactive, onMounted } from 'vue'
import { AnimationManager } from '@ldesign/animation'

// 创建动画管理器
const animationManager = new AnimationManager()

// 元素引用
const opacityRef = ref<HTMLElement>()
const transformRef = ref<HTMLElement>()
const colorRef = ref<HTMLElement>()
const sizeRef = ref<HTMLElement>()
const allRef = ref<HTMLElement>()
const staggeredRef = ref<HTMLElement>()
const sequentialRef = ref<HTMLElement>()
const easingRefs = ref<(HTMLElement | null)[]>([])
const performanceRefs = ref<(HTMLElement | null)[]>([])

// 状态管理
const states = reactive({
  loading: false,
  success: false,
  error: false
})

// 点击状态
const clickStates = reactive<Record<number, boolean>>({})

// 缓动演示
const easingBoxes = [
  { name: '线性' },
  { name: '标准' },
  { name: '缓入' },
  { name: '缓出' }
]

// 性能测试
const performanceItems = Array.from({ length: 40 }, (_, i) => i)
const performanceResult = ref<any>(null)

// 代码示例
const activeCodeTab = ref('basic')
const codeTabs = [
  { id: 'basic', name: '基础过渡' },
  { id: 'multiple', name: '多属性' },
  { id: 'interactive', name: '交互式' },
  { id: 'state', name: '状态过渡' }
]

// 基础过渡
const basicTransition = (type: string) => {
  const refMap: Record<string, any> = {
    opacity: opacityRef,
    transform: transformRef,
    color: colorRef,
    size: sizeRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const transitions: Record<string, any> = {
    opacity: {
      keyframes: [
        { opacity: 1 },
        { opacity: 0.3 },
        { opacity: 1 }
      ]
    },
    transform: {
      keyframes: [
        { transform: 'translateX(0px) rotate(0deg)' },
        { transform: 'translateX(150px) rotate(45deg)' },
        { transform: 'translateX(0px) rotate(0deg)' }
      ]
    },
    color: {
      keyframes: [
        { backgroundColor: '#667eea', color: '#ffffff' },
        { backgroundColor: '#f093fb', color: '#ffffff' },
        { backgroundColor: '#667eea', color: '#ffffff' }
      ]
    },
    size: {
      keyframes: [
        { width: '80px', height: '80px' },
        { width: '120px', height: '120px' },
        { width: '80px', height: '80px' }
      ]
    }
  }

  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: transitions[type].keyframes,
    duration: 1600,
    easing: 'ease-in-out'
  }).play()
}

// 多属性过渡
const multipleTransition = (type: string) => {
  const refMap: Record<string, any> = {
    all: allRef,
    staggered: staggeredRef,
    sequential: sequentialRef
  }
  
  const element = refMap[type]?.value
  if (!element) return

  const transitions: Record<string, any> = {
    all: {
      keyframes: [
        { 
          opacity: 1, 
          transform: 'translateX(0px) scale(1) rotate(0deg)', 
          backgroundColor: '#667eea', 
          borderRadius: '0.5rem' 
        },
        { 
          opacity: 0.7, 
          transform: 'translateX(100px) scale(1.2) rotate(180deg)', 
          backgroundColor: '#764ba2', 
          borderRadius: '50%' 
        },
        { 
          opacity: 1, 
          transform: 'translateX(0px) scale(1) rotate(0deg)', 
          backgroundColor: '#667eea', 
          borderRadius: '0.5rem' 
        }
      ],
      duration: 2000
    },
    staggered: {
      keyframes: [
        { opacity: 1, transform: 'translateX(0px)', backgroundColor: '#667eea', borderRadius: '0.5rem' },
        { opacity: 0.6, transform: 'translateX(120px)', backgroundColor: '#f5576c', borderRadius: '50%', offset: 0.4 },
        { opacity: 1, transform: 'translateX(0px)', backgroundColor: '#667eea', borderRadius: '0.5rem' }
      ],
      duration: 2500
    },
    sequential: {
      keyframes: [
        { opacity: 1, transform: 'scale(1)', backgroundColor: '#667eea', borderRadius: '0.5rem' },
        { opacity: 0.8, transform: 'scale(1)', backgroundColor: '#667eea', borderRadius: '0.5rem', offset: 0.25 },
        { opacity: 0.8, transform: 'scale(1.3)', backgroundColor: '#667eea', borderRadius: '0.5rem', offset: 0.5 },
        { opacity: 0.8, transform: 'scale(1.3)', backgroundColor: '#f093fb', borderRadius: '0.5rem', offset: 0.75 },
        { opacity: 1, transform: 'scale(1)', backgroundColor: '#667eea', borderRadius: '0.5rem' }
      ],
      duration: 3000
    }
  }

  const config = transitions[type]
  animationManager.createAnimation(element, {
    type: 'custom',
    keyframes: config.keyframes,
    duration: config.duration,
    easing: 'ease-in-out'
  }).play()
}

// 重置多属性
const resetMultiple = () => {
  const elements = [allRef, staggeredRef, sequentialRef]
  
  elements.forEach(ref => {
    if (ref.value) {
      animationManager.createAnimation(ref.value, {
        type: 'custom',
        keyframes: [
          { 
            opacity: 1, 
            transform: 'translateX(0px) scale(1) rotate(0deg)', 
            backgroundColor: '#667eea', 
            borderRadius: '0.5rem' 
          }
        ],
        duration: 600,
        easing: 'ease-out'
      }).play()
    }
  })
}

// 缓动过渡
const easingTransition = (easingType: string) => {
  const easings: Record<string, string> = {
    'ease': 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'cubic-bezier': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }

  easingRefs.value.forEach((el, index) => {
    if (el) {
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'custom',
          keyframes: [
            { transform: 'translateX(0px)' },
            { transform: 'translateX(300px)' },
            { transform: 'translateX(0px)' }
          ],
          duration: 2000,
          easing: easings[easingType]
        }).play()
      }, index * 100)
    }
  })
}

// 悬停处理
const onHover = (isHover: boolean, cardIndex: number) => {
  // CSS 类处理悬停效果
}

// 点击处理
const onClick = (cardIndex: number) => {
  clickStates[cardIndex] = !clickStates[cardIndex]
  
  setTimeout(() => {
    clickStates[cardIndex] = false
  }, 1000)
}

// 状态切换
const toggleState = (stateName: keyof typeof states) => {
  // 重置所有状态
  Object.keys(states).forEach(key => {
    states[key as keyof typeof states] = false
  })
  
  // 切换选中状态
  states[stateName] = !states[stateName]
}

// 性能测试
const performanceTest = (method: 'css' | 'js') => {
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  if (elements.length === 0) return

  const startTime = performance.now()
  
  if (method === 'css') {
    elements.forEach((el, index) => {
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'custom',
          keyframes: [
            { transform: 'translateY(0px) scale(1)', backgroundColor: '#667eea' },
            { transform: 'translateY(-20px) scale(1.1)', backgroundColor: '#764ba2' },
            { transform: 'translateY(0px) scale(1)', backgroundColor: '#667eea' }
          ],
          duration: 500,
          easing: 'ease-out'
        }).play()
      }, index * 20)
    })
  } else {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'all 0.5s ease-out'
        el.style.transform = 'translateY(-20px) scale(1.1)'
        el.style.backgroundColor = '#764ba2'
        
        setTimeout(() => {
          el.style.transform = 'translateY(0px) scale(1)'
          el.style.backgroundColor = '#667eea'
        }, 500)
      }, index * 20)
    })
  }

  const endTime = performance.now()
  
  performanceResult.value = {
    method: method === 'css' ? 'CSS 过渡' : 'JS 动画',
    duration: Math.round(endTime - startTime),
    elements: elements.length
  }
}

// 清除性能测试
const clearPerformance = () => {
  const elements = performanceRefs.value.filter(Boolean) as HTMLElement[]
  elements.forEach(el => {
    el.style.transition = 'none'
    el.style.transform = 'none'
    el.style.backgroundColor = ''
  })
  performanceResult.value = null
}

// 获取当前代码示例
const getCurrentCodeExample = () => {
  const examples: Record<string, string> = {
    basic: `<template>
  <div ref="elementRef" class="transition-element">
    过渡元素
  </div>
  <button @click="animate">播放动画</button>
</template>

// 基础用法示例代码
// <script setup>
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
//       { opacity: 1, transform: 'translateX(0px)' },
//       { opacity: 0.5, transform: 'translateX(100px)' },
//       { opacity: 1, transform: 'translateX(0px)' }
//     ],
//     duration: 1000,
//     easing: 'ease-out'
//   }).play()
// }
// 结束`,
    multiple: `// 多属性过渡示例
const multipleTransition = () => {
  animationManager.createAnimation(elementRef.value, {
    type: 'custom',
    keyframes: [
      { 
        opacity: 1, 
        transform: 'scale(1) rotate(0deg)', 
        backgroundColor: '#667eea' 
      },
      { 
        opacity: 0.7, 
        transform: 'scale(1.2) rotate(180deg)', 
        backgroundColor: '#764ba2',
        offset: 0.5
      },
      { 
        opacity: 1, 
        transform: 'scale(1) rotate(360deg)', 
        backgroundColor: '#667eea' 
      }
    ],
    duration: 2000,
    easing: 'ease-in-out'
  }).play()
}`,
    interactive: `// 交互式过渡示例
<template>
  <div 
    class="interactive-card"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    @click="onClick"
  >
    交互卡片
  </div>
</template>

// 交互式示例代码
// const onHover = (isHover) => {
//   const scale = isHover ? 1.05 : 1
//   const shadow = isHover ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
//   
//   // CSS 过渡会自动处理
// }
//
// const onClick = () => {
//   // 点击动画
//   animationManager.createAnimation(cardRef.value, {
//     type: 'custom',
//     keyframes: [
//       { transform: 'scale(1)' },
//       { transform: 'scale(0.95)' },
//       { transform: 'scale(1)' }
//     ],
//     duration: 200,
//     easing: 'ease-out'
//   }).play()
// }

<style>
.interactive-card {
  transition: all 0.3s ease;
}

.interactive-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
</style>`,
    state: `// 状态过渡示例
const states = reactive({
  loading: false,
  success: false,
  error: false
})

const toggleState = (stateName) => {
  // 重置所有状态
  Object.keys(states).forEach(key => {
    states[key] = false
  })
  
  // 设置新状态
  states[stateName] = true
}

// CSS 状态过渡
<style>
.state-box {
  transition: all 0.3s ease;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
}

.state-box.state-loading {
  background: #fef3c7;
  border-color: #f59e0b;
}

.state-box.state-success {
  background: #d1fae5;
  border-color: #10b981;
}

.state-box.state-error {
  background: #fee2e2;
  border-color: #ef4444;
}
</style>`
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
.transitions {
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

.demo-box-static {
  background: #9ca3af;
  cursor: not-allowed;
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

.demo-btn-success {
  background: #10b981;
}

.demo-btn-success:hover {
  background: #059669;
}

.demo-btn-error {
  background: #ef4444;
}

.demo-btn-error:hover {
  background: #dc2626;
}

.easing-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.easing-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.easing-controls .demo-btn {
  width: auto;
  min-width: 120px;
}

.easing-track {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.easing-box {
  width: 80px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.interactive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.interactive-card {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hover-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.click-card:active,
.click-card.clicked {
  transform: scale(0.95);
  background: #f0f9ff;
}

.scale-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.15);
}

.rotate-card.rotated {
  transform: rotate(5deg) scale(1.02);
  background: #fef3c7;
}

.card-content {
  text-align: center;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.125rem;
}

.card-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.state-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.state-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.state-controls .demo-btn {
  width: auto;
  min-width: 120px;
}

.state-container {
  display: flex;
  justify-content: center;
}

.state-box {
  width: 250px;
  height: 120px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.state-box.state-loading {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.state-box.state-success {
  background: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.state-box.state-error {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.state-content {
  text-align: center;
}

.state-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.state-text {
  font-weight: 600;
  font-size: 1rem;
}

.state-loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f59e0b;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  min-width: 120px;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.5rem;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 2rem;
  background: #f9fafb;
}

.performance-item {
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
}

.performance-result {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #f0f9ff;
  border-radius: 0.5rem;
  border: 1px solid #0ea5e9;
  justify-content: center;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.result-label {
  font-size: 0.875rem;
  color: #0c4a6e;
  margin-bottom: 0.25rem;
}

.result-value {
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

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .interactive-grid {
    grid-template-columns: 1fr;
  }
  
  .easing-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .easing-controls .demo-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .state-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .state-controls .demo-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .performance-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .performance-controls .demo-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .performance-grid {
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
    padding: 1rem;
  }
  
  .performance-item {
    width: 35px;
    height: 35px;
    font-size: 0.625rem;
  }
  
  .performance-result {
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