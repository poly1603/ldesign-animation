<template>
  <div class="sequences">
    <div class="page-header">
      <h1 class="page-title">序列动画</h1>
      <p class="page-description">
        创建具有精确时序控制的复杂动画序列。将多个动画链接在一起，用于叙事和复杂交互。
      </p>
    </div>

    <!-- 基础序列 -->
    <section class="animation-section">
      <h2 class="section-title">基础动画序列</h2>
      <div class="demo-card">
        <h3>步骤动画</h3>
        <p class="demo-description">简单的逐步动画，按顺序执行。</p>
        <div class="demo-controls">
          <button @click="playBasicSequence()" class="demo-btn">播放序列</button>
          <button @click="resetBasicSequence()" class="demo-btn demo-btn-secondary">重置</button>
        </div>
        <div class="demo-container">
          <div ref="basicBox1" class="demo-box">步骤 1</div>
          <div ref="basicBox2" class="demo-box">步骤 2</div>
          <div ref="basicBox3" class="demo-box">步骤 3</div>
        </div>
      </div>
    </section>

    <!-- 并行序列 -->
    <section class="animation-section">
      <h2 class="section-title">并行序列</h2>
      <div class="demo-card">
        <h3>多组动画</h3>
        <p class="demo-description">多个动画序列同时运行，具有不同的时序。</p>
        <div class="demo-controls">
          <button @click="playParallelSequence()" class="demo-btn">并行播放</button>
          <button @click="playStaggeredSequence()" class="demo-btn">错开播放</button>
          <button @click="resetParallelSequence()" class="demo-btn demo-btn-secondary">重置</button>
        </div>
        <div class="parallel-container">
          <div class="parallel-group">
            <div ref="parallelBox1" class="demo-box small">A1</div>
            <div ref="parallelBox2" class="demo-box small">A2</div>
            <div ref="parallelBox3" class="demo-box small">A3</div>
          </div>
          <div class="parallel-group">
            <div ref="parallelBox4" class="demo-box small">B1</div>
            <div ref="parallelBox5" class="demo-box small">B2</div>
            <div ref="parallelBox6" class="demo-box small">B3</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 时间轴动画 -->
    <section class="animation-section">
      <h2 class="section-title">时间轴动画</h2>
      <div class="demo-card">
        <h3>复杂时间轴</h3>
        <p class="demo-description">具有精确关键帧控制和时序的复杂时间轴。</p>
        <div class="demo-controls">
          <button @click="playTimeline()" class="demo-btn">播放时间轴</button>
          <button @click="pauseTimeline()" class="demo-btn demo-btn-warning">
            {{ timelineState.paused ? '继续' : '暂停' }}
          </button>
          <button @click="resetTimeline()" class="demo-btn demo-btn-secondary">重置</button>
        </div>
        <div class="timeline-container">
          <div class="timeline-progress">
            <div class="progress-bar" :style="{ width: timelineProgress + '%' }"></div>
          </div>
          <div class="timeline-elements">
            <div ref="timelineBox1" class="timeline-box">🚀</div>
            <div ref="timelineBox2" class="timeline-box">⭐</div>
            <div ref="timelineBox3" class="timeline-box">🌙</div>
            <div ref="timelineBox4" class="timeline-box">☀️</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 交互式序列 -->
    <section class="animation-section">
      <h2 class="section-title">交互式序列</h2>
      <div class="demo-card">
        <h3>用户控制</h3>
        <p class="demo-description">响应交互和事件的用户控制序列。</p>
        <div class="demo-controls">
          <button @click="nextStep()" class="demo-btn" :disabled="currentStep >= maxSteps - 1">
            下一步 ({{ currentStep + 1 }}/{{ maxSteps }})
          </button>
          <button @click="prevStep()" class="demo-btn" :disabled="currentStep <= 0">
            上一步
          </button>
          <button @click="resetInteractive()" class="demo-btn demo-btn-secondary">重置</button>
        </div>
        <div class="interactive-sequence">
          <div class="step-indicator">
            <div 
              v-for="(step, index) in maxSteps" 
              :key="index"
              class="step-dot"
              :class="{ active: index <= currentStep }"
            ></div>
          </div>
          <div class="interactive-stage">
            <div ref="interactiveBox" class="interactive-element">
              步骤 {{ currentStep + 1 }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 变形序列 -->
    <section class="animation-section">
      <h2 class="section-title">变形序列</h2>
      <div class="demo-card">
        <h3>形状变换</h3>
        <p class="demo-description">通过多个状态的平滑形状和属性变形。</p>
        <div class="demo-controls">
          <button @click="startMorphing()" class="demo-btn">开始变形</button>
          <button @click="stopMorphing()" class="demo-btn demo-btn-warning">停止</button>
          <select v-model="morphingSpeed" class="form-select">
            <option value="slow">慢速</option>
            <option value="normal">正常</option>
            <option value="fast">快速</option>
          </select>
        </div>
        <div class="morphing-container">
          <div ref="morphingBox" class="morphing-element">
            {{ morphingState.text }}
          </div>
        </div>
      </div>
    </section>

    <!-- 连锁反应 -->
    <section class="animation-section">
      <h2 class="section-title">连锁反应</h2>
      <div class="demo-card">
        <h3>级联动画</h3>
        <p class="demo-description">触发级联动画，每个元素触发下一个元素。</p>
        <div class="demo-controls">
          <button @click="startChainReaction()" class="demo-btn">开始连锁</button>
          <button @click="resetChainReaction()" class="demo-btn demo-btn-secondary">重置</button>
        </div>
        <div class="chain-container">
          <div 
            v-for="(item, index) in chainItems" 
            :key="index"
            :ref="el => chainRefs[index] = el"
            class="chain-item"
            :class="{ triggered: item.triggered }"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </section>

    <!-- 性能监控 -->
    <section class="animation-section">
      <h2 class="section-title">性能监控</h2>
      <div class="demo-card">
        <h3>序列性能</h3>
        <p class="demo-description">监控序列性能和时序准确性。</p>
        <div class="performance-stats" v-if="performanceStats">
          <div class="stat-item">
            <span class="stat-label">总持续时间:</span>
            <span class="stat-value">{{ performanceStats.totalDuration }}ms</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">完成步骤:</span>
            <span class="stat-value">{{ performanceStats.stepsCompleted }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">平均步骤时间:</span>
            <span class="stat-value">{{ performanceStats.averageStepTime }}ms</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">帧率:</span>
            <span class="stat-value">{{ performanceStats.fps }}</span>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { AnimationManager } from '@ldesign/animation'

// 创建动画管理器
const animationManager = new AnimationManager()

// 元素引用
const basicBox1 = ref<HTMLElement>()
const basicBox2 = ref<HTMLElement>()
const basicBox3 = ref<HTMLElement>()

const parallelBox1 = ref<HTMLElement>()
const parallelBox2 = ref<HTMLElement>()
const parallelBox3 = ref<HTMLElement>()
const parallelBox4 = ref<HTMLElement>()
const parallelBox5 = ref<HTMLElement>()
const parallelBox6 = ref<HTMLElement>()

const timelineBox1 = ref<HTMLElement>()
const timelineBox2 = ref<HTMLElement>()
const timelineBox3 = ref<HTMLElement>()
const timelineBox4 = ref<HTMLElement>()

const interactiveBox = ref<HTMLElement>()
const morphingBox = ref<HTMLElement>()
const chainRefs = ref<(HTMLElement | null)[]>([])

// 状态管理
const timelineState = reactive({
  paused: false,
  progress: 0
})

const timelineProgress = computed(() => timelineState.progress)

const currentStep = ref(0)
const maxSteps = 5

const morphingSpeed = ref('normal')
const morphingState = reactive({
  text: '圆形',
  isRunning: false
})

const chainItems = reactive(
  Array.from({ length: 10 }, (_, i) => ({ triggered: false }))
)

const performanceStats = ref<any>(null)

// 代码示例
const activeCodeTab = ref('basic')
const codeTabs = [
  { id: 'basic', name: '基础序列' },
  { id: 'parallel', name: '并行序列' },
  { id: 'timeline', name: '时间轴' },
  { id: 'interactive', name: '交互式' }
]

// 基础序列函数
const playBasicSequence = async () => {
  const startTime = performance.now()
  
  const elements = [basicBox1, basicBox2, basicBox3]
  const animations = [
    {
      keyframes: [
        { transform: 'translateX(0px) scale(1)', backgroundColor: '#667eea' },
        { transform: 'translateX(150px) scale(1.2)', backgroundColor: '#764ba2' },
        { transform: 'translateX(0px) scale(1)', backgroundColor: '#667eea' }
      ],
      duration: 800
    },
    {
      keyframes: [
        { transform: 'translateY(0px) rotate(0deg)', backgroundColor: '#667eea' },
        { transform: 'translateY(-50px) rotate(180deg)', backgroundColor: '#f093fb' },
        { transform: 'translateY(0px) rotate(0deg)', backgroundColor: '#667eea' }
      ],
      duration: 600
    },
    {
      keyframes: [
        { transform: 'scale(1)', opacity: 1, backgroundColor: '#667eea' },
        { transform: 'scale(1.5)', opacity: 0.7, backgroundColor: '#f5576c' },
        { transform: 'scale(1)', opacity: 1, backgroundColor: '#667eea' }
      ],
      duration: 500
    }
  ]
  
  // 顺序播放动画
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].value) {
      await new Promise(resolve => {
        const animation = animationManager.create(elements[i].value!, {
          keyframes: animations[i].keyframes,
          duration: animations[i].duration,
          easing: 'ease-in-out'
        })
        
        animation.addEventListener('finish', () => resolve(void 0))
        animation.play()
      })
      
      // 等待一小段时间再播放下一个
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }
  
  const endTime = performance.now()
  updatePerformanceStats(endTime - startTime, 3)
}

const resetBasicSequence = () => {
  const elements = [basicBox1, basicBox2, basicBox3]
  elements.forEach(el => {
    if (el.value) {
      animationManager.create(el.value, {
        keyframes: [
          { transform: 'none', backgroundColor: '', opacity: 1 }
        ],
        duration: 300,
        easing: 'ease-out'
      }).play()
    }
  })
}

// 并行序列函数
const playParallelSequence = () => {
  const elements1 = [parallelBox1, parallelBox2, parallelBox3]
  const elements2 = [parallelBox4, parallelBox5, parallelBox6]
  
  // 第一组动画
  elements1.forEach((el, i) => {
    if (el.value) {
      setTimeout(() => {
        animationManager.create(el.value!, {
          keyframes: [
            { transform: 'translateX(0px) scale(1)', backgroundColor: '#667eea' },
            { transform: `translateX(${(i + 1) * 30}px) scale(1.1)`, backgroundColor: '#764ba2' },
            { transform: 'translateX(0px) scale(1)', backgroundColor: '#667eea' }
          ],
          duration: 600,
          easing: 'ease-out'
        }).play()
      }, i * 100)
    }
  })
  
  // 第二组动画
  elements2.forEach((el, i) => {
    if (el.value) {
      setTimeout(() => {
        animationManager.create(el.value!, {
          keyframes: [
            { transform: 'translateY(0px) rotate(0deg)', backgroundColor: '#667eea' },
            { transform: `translateY(${(i + 1) * -20}px) rotate(${(i + 1) * 45}deg)`, backgroundColor: '#f093fb' },
            { transform: 'translateY(0px) rotate(0deg)', backgroundColor: '#667eea' }
          ],
          duration: 700,
          easing: 'ease-in-out'
        }).play()
      }, i * 150)
    }
  })
}

const playStaggeredSequence = () => {
  const allElements = [parallelBox1, parallelBox2, parallelBox3, parallelBox4, parallelBox5, parallelBox6]
  
  allElements.forEach((el, i) => {
    if (el.value) {
      setTimeout(() => {
        animationManager.create(el.value!, {
          keyframes: [
            { transform: 'translateX(0px) translateY(0px) scale(1)', backgroundColor: '#667eea' },
            { 
              transform: `translateX(${Math.sin(i) * 50}px) translateY(${Math.cos(i) * 30}px) scale(1.2)`, 
              backgroundColor: `hsl(${i * 60}, 70%, 60%)` 
            },
            { transform: 'translateX(0px) translateY(0px) scale(1)', backgroundColor: '#667eea' }
          ],
          duration: 800,
          easing: 'ease-out'
        }).play()
      }, i * 100)
    }
  })
}

const resetParallelSequence = () => {
  const allElements = [parallelBox1, parallelBox2, parallelBox3, parallelBox4, parallelBox5, parallelBox6]
  allElements.forEach(el => {
    if (el.value) {
      animationManager.create(el.value, {
        keyframes: [
          { transform: 'none', backgroundColor: '' }
        ],
        duration: 300,
        easing: 'ease-out'
      }).play()
    }
  })
}

// 时间轴函数
const playTimeline = () => {
  timelineState.paused = false
  timelineState.progress = 0
  
  const totalDuration = 2000
  const startTime = Date.now()
  
  // 模拟进度更新
  const updateProgress = () => {
    if (timelineState.paused) return
    
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / totalDuration, 1)
    timelineState.progress = progress * 100
    
    if (progress < 1) {
      requestAnimationFrame(updateProgress)
    }
  }
  
  updateProgress()
  
  // 时间轴动画
  const timelineAnimations = [
    {
      element: timelineBox1,
      delay: 0,
      keyframes: [
        { transform: 'translateX(0px) scale(1)' },
        { transform: 'translateX(100px) scale(1.2)' },
        { transform: 'translateX(0px) scale(1)' }
      ]
    },
    {
      element: timelineBox2,
      delay: 300,
      keyframes: [
        { transform: 'translateY(0px) rotate(0deg)' },
        { transform: 'translateY(-50px) rotate(180deg)' },
        { transform: 'translateY(0px) rotate(0deg)' }
      ]
    },
    {
      element: timelineBox3,
      delay: 600,
      keyframes: [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.3, transform: 'scale(1.5)' },
        { opacity: 1, transform: 'scale(1)' }
      ]
    },
    {
      element: timelineBox4,
      delay: 900,
      keyframes: [
        { transform: 'rotate(0deg) scale(1)' },
        { transform: 'rotate(360deg) scale(0.8)' },
        { transform: 'rotate(0deg) scale(1)' }
      ]
    }
  ]
  
  timelineAnimations.forEach(({ element, delay, keyframes }) => {
    if (element.value) {
      setTimeout(() => {
        animationManager.create(element.value!, {
          keyframes,
          duration: 800,
          easing: 'ease-in-out'
        }).play()
      }, delay)
    }
  })
}

const pauseTimeline = () => {
  timelineState.paused = !timelineState.paused
}

const resetTimeline = () => {
  timelineState.progress = 0
  timelineState.paused = false
  
  const elements = [timelineBox1, timelineBox2, timelineBox3, timelineBox4]
  elements.forEach(el => {
    if (el.value) {
      animationManager.create(el.value, {
        keyframes: [
          { transform: 'none', opacity: 1 }
        ],
        duration: 300,
        easing: 'ease-out'
      }).play()
    }
  })
}

// 交互式序列函数
const nextStep = () => {
  if (currentStep.value < maxSteps - 1) {
    currentStep.value++
    updateInteractiveElement()
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    updateInteractiveElement()
  }
}

const updateInteractiveElement = () => {
  if (!interactiveBox.value) return
  
  const transforms = [
    { transform: 'none', backgroundColor: '#667eea' },
    { transform: 'translateX(50px)', backgroundColor: '#764ba2' },
    { transform: 'translateX(50px) translateY(-30px)', backgroundColor: '#f093fb' },
    { transform: 'translateX(50px) translateY(-30px) scale(1.2)', backgroundColor: '#f5576c' },
    { transform: 'translateX(50px) translateY(-30px) scale(1.2) rotate(45deg)', backgroundColor: '#4facfe' }
  ]
  
  animationManager.create(interactiveBox.value, {
    keyframes: [transforms[currentStep.value]],
    duration: 500,
    easing: 'ease-in-out'
  }).play()
}

const resetInteractive = () => {
  currentStep.value = 0
  updateInteractiveElement()
}

// 变形函数
let morphingInterval: number | null = null

const startMorphing = () => {
  if (morphingState.isRunning) return
  
  morphingState.isRunning = true
  const shapes = ['圆形', '方形', '三角', '星形', '心形']
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
  
  let currentIndex = 0
  
  const speeds = {
    slow: 2000,
    normal: 1000,
    fast: 500
  }
  
  const morph = () => {
    if (!morphingState.isRunning) return
    
    currentIndex = (currentIndex + 1) % shapes.length
    morphingState.text = shapes[currentIndex]
    
    if (morphingBox.value) {
      animationManager.create(morphingBox.value, {
        keyframes: [
          {
            backgroundColor: colors[currentIndex],
            borderRadius: currentIndex % 2 === 0 ? '50%' : '0%',
            transform: `scale(${1 + currentIndex * 0.1}) rotate(${currentIndex * 72}deg)`
          }
        ],
        duration: speeds[morphingSpeed.value as keyof typeof speeds],
        easing: 'ease-in-out'
      }).play()
    }
    
    morphingInterval = setTimeout(morph, speeds[morphingSpeed.value as keyof typeof speeds])
  }
  
  morph()
}

const stopMorphing = () => {
  morphingState.isRunning = false
  if (morphingInterval) {
    clearTimeout(morphingInterval)
    morphingInterval = null
  }
}

// 连锁反应函数
const startChainReaction = () => {
  // 重置所有项目
  chainItems.forEach(item => item.triggered = false)
  
  // 开始连锁反应
  chainItems.forEach((item, index) => {
    setTimeout(() => {
      item.triggered = true
      
      const element = chainRefs.value[index]
      if (element) {
        animationManager.create(element, {
          keyframes: [
            { transform: 'scale(1) translateY(0px)', backgroundColor: '#667eea' },
            { transform: 'scale(1.3) translateY(-20px)', backgroundColor: '#f093fb' },
            { transform: 'scale(1) translateY(0px)', backgroundColor: '#667eea' }
          ],
          duration: 400,
          easing: 'ease-out'
        }).play()
      }
    }, index * 150)
  })
}

const resetChainReaction = () => {
  chainItems.forEach(item => item.triggered = false)
  chainRefs.value.forEach(el => {
    if (el) {
      animationManager.create(el, {
        keyframes: [
          { transform: 'none', backgroundColor: '' }
        ],
        duration: 300,
        easing: 'ease-out'
      }).play()
    }
  })
}

// 性能监控
const updatePerformanceStats = (duration: number, steps: number) => {
  performanceStats.value = {
    totalDuration: Math.round(duration),
    stepsCompleted: steps,
    averageStepTime: Math.round(duration / steps),
    fps: Math.round(1000 / (duration / steps))
  }
}

// 获取当前代码示例
const getCurrentCodeExample = () => {
  const examples: Record<string, string> = {
    basic: `<template>
  <div>
    <div ref="element1">元素 1</div>
    <div ref="element2">元素 2</div>
    <div ref="element3">元素 3</div>
    <button @click="playSequence">播放序列</button>
  </div>
</template>

// 基础序列示例代码
// 基础序列示例代码
// import { ref } from 'vue'
// import { AnimationManager } from '@ldesign/animation'
//
// const element1 = ref()
// const element2 = ref()
// const element3 = ref()
// const animationManager = new AnimationManager()
//
// 基础序列
// const playSequence = async () => {
//   const elements = [element1, element2, element3]
//   const animations = [
//     {
//       keyframes: [{ transform: 'translateX(100px)' }],
//       duration: 500
//     },
//     {
//       keyframes: [{ transform: 'scale(1.5)' }],
//       duration: 300
//     },
//     {
//       keyframes: [{ opacity: 0.5 }],
//       duration: 400
//     }
//   ]
//   
//   for (let i = 0; i < elements.length; i++) {
//     await new Promise(resolve => {
//       const animation = animationManager.create(
//           elements[i].value,
//           {
//             keyframes: animations[i].keyframes,
//             duration: animations[i].duration
//           }
//         )
//         animation.addEventListener('finish', () => resolve())
//       animation.play()
//     })
//   }
// }
`,
    parallel: `// 并行序列示例
const playParallel = () => {
  const elements1 = [element1, element2, element3]
  const elements2 = [element4, element5, element6]
  
  // 第一组动画
  elements1.forEach((el, i) => {
    setTimeout(() => {
      animationManager.create(el.value, {
        keyframes: [
          { transform: \`translateX(\${(i + 1) * 30}px) scale(1.1)\` }
        ],
        duration: 600,
        easing: 'ease-out'
      }).play()
    }, i * 100)
  })
  
  // 第二组动画
  elements2.forEach((el, i) => {
    setTimeout(() => {
      animationManager.create(el.value, {
        keyframes: [
          { transform: \`translateY(\${(i + 1) * -20}px) rotate(\${(i + 1) * 45}deg)\` }
        ],
        duration: 700,
        easing: 'ease-in-out'
      }).play()
    }, i * 150)
  })
}`,
    timeline: `// 时间轴动画示例
const playTimeline = () => {
  const timelineAnimations = [
    {
      element: element1,
      delay: 0,
      keyframes: [
        { transform: 'translateX(0px) scale(1)' },
        { transform: 'translateX(100px) scale(1.2)' },
        { transform: 'translateX(0px) scale(1)' }
      ]
    },
    {
      element: element2,
      delay: 300,
      keyframes: [
        { transform: 'translateY(0px) rotate(0deg)' },
        { transform: 'translateY(-50px) rotate(180deg)' },
        { transform: 'translateY(0px) rotate(0deg)' }
      ]
    },
    {
      element: element3,
      delay: 600,
      keyframes: [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.3, transform: 'scale(1.5)' },
        { opacity: 1, transform: 'scale(1)' }
      ]
    }
  ]
  
  timelineAnimations.forEach(({ element, delay, keyframes }) => {
    setTimeout(() => {
      animationManager.create(element.value, {
        keyframes,
        duration: 800,
        easing: 'ease-in-out'
      }).play()
    }, delay)
  })
}`,
    interactive: `// 交互式序列示例
const currentStep = ref(0)
const maxSteps = 5

const nextStep = () => {
  if (currentStep.value < maxSteps - 1) {
    currentStep.value++
    updateElement()
  }
}

const updateElement = () => {
  const transforms = [
    { transform: 'none', backgroundColor: '#667eea' },
    { transform: 'translateX(50px)', backgroundColor: '#764ba2' },
    { transform: 'translateX(50px) translateY(-30px)', backgroundColor: '#f093fb' },
    { transform: 'translateX(50px) translateY(-30px) scale(1.2)', backgroundColor: '#f5576c' },
    { transform: 'translateX(50px) translateY(-30px) scale(1.2) rotate(45deg)', backgroundColor: '#4facfe' }
  ]
  
  animationManager.create(interactiveElement.value, {
    keyframes: [transforms[currentStep.value]],
    duration: 500,
    easing: 'ease-in-out'
  }).play()
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
        animationManager.create(el, {
          keyframes: [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          duration: 500,
          easing: 'ease-out'
        }).play()
      }, index * 100)
    }
  })
})
</script>

<style scoped>
.sequences {
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

.demo-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.demo-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.demo-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.demo-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
}

.demo-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.demo-btn-secondary {
  background: #6b7280;
}

.demo-btn-secondary:hover {
  background: #4b5563;
}

.demo-btn-warning {
  background: #f59e0b;
}

.demo-btn-warning:hover {
  background: #d97706;
}

.demo-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
  min-height: 150px;
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

.demo-box.small {
  width: 60px;
  height: 60px;
  font-size: 0.75rem;
}

.parallel-container {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.parallel-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.timeline-container {
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.timeline-progress {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.1s ease;
}

.timeline-elements {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.timeline-box {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.interactive-sequence {
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.step-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e5e7eb;
  transition: all 0.3s ease;
}

.step-dot.active {
  background: #667eea;
  transform: scale(1.2);
}

.interactive-stage {
  display: flex;
  justify-content: center;
  min-height: 150px;
  align-items: center;
}

.interactive-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.morphing-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
  min-height: 200px;
  align-items: center;
}

.morphing-element {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
  min-width: 100px;
}

.chain-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.chain-item {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chain-item.triggered {
  opacity: 1;
}

.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-weight: 500;
  color: #374151;
}

.stat-value {
  font-weight: 600;
  color: #667eea;
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
  .demo-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .demo-btn {
    width: 100%;
  }
  
  .demo-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .parallel-container {
    flex-direction: column;
    gap: 2rem;
  }
  
  .timeline-elements {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .chain-container {
    padding: 1rem;
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