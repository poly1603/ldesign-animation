<template>
  <div class="performance">
    <h1>Performance Optimization</h1>
    <p class="page-description">
      Comprehensive performance testing and optimization tools for animations.
      Monitor FPS, memory usage, and animation efficiency in real-time.
    </p>

    <!-- Performance Monitor -->
    <div class="demo-section">
      <h2 class="demo-title">Real-time Performance Monitor</h2>
      <div class="performance-dashboard">
        <div class="performance-charts">
          <div class="chart-container">
            <h3>FPS Monitor</h3>
            <div class="fps-chart">
              <canvas ref="fpsChart" width="300" height="150"></canvas>
            </div>
            <div class="fps-value">{{ currentFPS }} FPS</div>
          </div>
          
          <div class="chart-container">
            <h3>Memory Usage</h3>
            <div class="memory-chart">
              <canvas ref="memoryChart" width="300" height="150"></canvas>
            </div>
            <div class="memory-value">{{ currentMemory }} MB</div>
          </div>
          
          <div class="chart-container">
            <h3>Animation Count</h3>
            <div class="animation-chart">
              <canvas ref="animationChart" width="300" height="150"></canvas>
            </div>
            <div class="animation-value">{{ activeAnimations }} Active</div>
          </div>
        </div>
        
        <div class="performance-controls">
          <button @click="startMonitoring()" :disabled="isMonitoring" class="btn btn-primary">
            Start Monitoring
          </button>
          <button @click="stopMonitoring()" :disabled="!isMonitoring" class="btn btn-warning">
            Stop Monitoring
          </button>
          <button @click="clearData()" class="btn btn-secondary">
            Clear Data
          </button>
          <button @click="exportData()" class="btn btn-info">
            Export Data
          </button>
        </div>
      </div>
    </div>

    <!-- Performance Comparison -->
    <div class="demo-section">
      <h2 class="demo-title">Animation Performance Comparison</h2>
      <div class="comparison-container">
        <div class="comparison-controls">
          <div class="control-group">
            <label>Animation Type:</label>
            <select v-model="comparisonType" class="select">
              <option value="css">CSS Animations</option>
              <option value="js">JavaScript Animations</option>
              <option value="webapi">Web Animations API</option>
              <option value="canvas">Canvas Animations</option>
            </select>
          </div>
          
          <div class="control-group">
            <label>Element Count:</label>
            <input 
              v-model.number="elementCount" 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              class="range"
            >
            <span class="range-value">{{ elementCount }}</span>
          </div>
          
          <div class="control-group">
            <label>Animation Duration:</label>
            <input 
              v-model.number="animationDuration" 
              type="range" 
              min="100" 
              max="5000" 
              step="100"
              class="range"
            >
            <span class="range-value">{{ animationDuration }}ms</span>
          </div>
          
          <button @click="runPerformanceTest()" class="btn btn-primary">
            Run Performance Test
          </button>
        </div>
        
        <div class="comparison-results">
          <div class="test-area" ref="testArea">
            <div 
              v-for="n in elementCount" 
              :key="n"
              :ref="el => testElements[n-1] = el"
              class="test-element"
              :class="comparisonType"
            ></div>
          </div>
          
          <div class="results-panel">
            <h3>Test Results</h3>
            <div class="result-item">
              <span>Average FPS:</span>
              <span class="result-value">{{ testResults.avgFPS }}</span>
            </div>
            <div class="result-item">
              <span>Min FPS:</span>
              <span class="result-value">{{ testResults.minFPS }}</span>
            </div>
            <div class="result-item">
              <span>Max FPS:</span>
              <span class="result-value">{{ testResults.maxFPS }}</span>
            </div>
            <div class="result-item">
              <span>Memory Peak:</span>
              <span class="result-value">{{ testResults.memoryPeak }}MB</span>
            </div>
            <div class="result-item">
              <span>CPU Usage:</span>
              <span class="result-value">{{ testResults.cpuUsage }}%</span>
            </div>
            <div class="result-item">
              <span>Test Duration:</span>
              <span class="result-value">{{ testResults.duration }}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Optimization Techniques -->
    <div class="demo-section">
      <h2 class="demo-title">Optimization Techniques</h2>
      <div class="optimization-grid">
        <div class="optimization-card">
          <h3>🚀 Transform Optimization</h3>
          <p>Use transform properties for better performance</p>
          <div class="demo-controls">
            <button @click="demoTransformOptimization()" class="btn btn-primary">
              Demo Transform
            </button>
          </div>
          <div class="optimization-demo" ref="transformDemo">
            <div class="demo-element transform-optimized">Optimized</div>
            <div class="demo-element transform-unoptimized">Unoptimized</div>
          </div>
        </div>
        
        <div class="optimization-card">
          <h3>🎯 Will-Change Property</h3>
          <p>Hint browser about upcoming changes</p>
          <div class="demo-controls">
            <button @click="demoWillChange()" class="btn btn-primary">
              Demo Will-Change
            </button>
          </div>
          <div class="optimization-demo" ref="willChangeDemo">
            <div class="demo-element will-change-enabled">Will-Change: On</div>
            <div class="demo-element will-change-disabled">Will-Change: Off</div>
          </div>
        </div>
        
        <div class="optimization-card">
          <h3>🔄 Animation Batching</h3>
          <p>Batch multiple animations together</p>
          <div class="demo-controls">
            <button @click="demoBatching()" class="btn btn-primary">
              Demo Batching
            </button>
          </div>
          <div class="optimization-demo" ref="batchingDemo">
            <div class="demo-element batched">Batched</div>
            <div class="demo-element individual">Individual</div>
          </div>
        </div>
        
        <div class="optimization-card">
          <h3>⚡ GPU Acceleration</h3>
          <p>Force GPU layer creation</p>
          <div class="demo-controls">
            <button @click="demoGPUAcceleration()" class="btn btn-primary">
              Demo GPU
            </button>
          </div>
          <div class="optimization-demo" ref="gpuDemo">
            <div class="demo-element gpu-accelerated">GPU Accelerated</div>
            <div class="demo-element cpu-only">CPU Only</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Memory Management -->
    <div class="demo-section">
      <h2 class="demo-title">Memory Management</h2>
      <div class="memory-management">
        <div class="memory-controls">
          <button @click="createAnimations()" class="btn btn-primary">
            Create 100 Animations
          </button>
          <button @click="cleanupAnimations()" class="btn btn-warning">
            Cleanup Animations
          </button>
          <button @click="forceGarbageCollection()" class="btn btn-secondary">
            Force GC
          </button>
        </div>
        
        <div class="memory-stats">
          <div class="stat-card">
            <h4>Active Animations</h4>
            <div class="stat-value">{{ memoryStats.activeAnimations }}</div>
          </div>
          <div class="stat-card">
            <h4>Memory Usage</h4>
            <div class="stat-value">{{ memoryStats.memoryUsage }}MB</div>
          </div>
          <div class="stat-card">
            <h4>DOM Nodes</h4>
            <div class="stat-value">{{ memoryStats.domNodes }}</div>
          </div>
          <div class="stat-card">
            <h4>Event Listeners</h4>
            <div class="stat-value">{{ memoryStats.eventListeners }}</div>
          </div>
        </div>
        
        <div class="memory-visualization">
          <canvas ref="memoryVisualization" width="600" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Best Practices -->
    <div class="demo-section">
      <h2 class="demo-title">Performance Best Practices</h2>
      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">🎯</div>
          <h3>Use Transform & Opacity</h3>
          <p>Prefer transform and opacity properties for animations as they can be optimized by the browser.</p>
          <div class="code-example">
            <pre><code>/* Good */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* Avoid */
.element {
  left: 100px;
  background-color: red;
}</code></pre>
          </div>
        </div>
        
        <div class="practice-card">
          <div class="practice-icon">🚀</div>
          <h3>Enable Hardware Acceleration</h3>
          <p>Use will-change or transform3d to trigger hardware acceleration.</p>
          <div class="code-example">
            <pre><code>/* Enable GPU acceleration */
.element {
  will-change: transform;
  /* or */
  transform: translateZ(0);
}</code></pre>
          </div>
        </div>
        
        <div class="practice-card">
          <div class="practice-icon">🔄</div>
          <h3>Batch DOM Operations</h3>
          <p>Group multiple DOM changes together to minimize reflows and repaints.</p>
          <div class="code-example">
            <pre><code>// Good: Batch operations
requestAnimationFrame(() => {
  element1.style.transform = 'translateX(100px)';
  element2.style.transform = 'translateY(50px)';
  element3.style.opacity = '0.5';
});</code></pre>
          </div>
        </div>
        
        <div class="practice-card">
          <div class="practice-icon">🧹</div>
          <h3>Clean Up Resources</h3>
          <p>Always clean up animations, event listeners, and timers to prevent memory leaks.</p>
          <div class="code-example">
            <pre><code>// Clean up animations
animation.cancel();

// Remove event listeners
element.removeEventListener('click', handler);

// Clear timers
clearInterval(intervalId);</code></pre>
          </div>
        </div>
        
        <div class="practice-card">
          <div class="practice-icon">📊</div>
          <h3>Monitor Performance</h3>
          <p>Use performance monitoring tools to identify bottlenecks and optimize accordingly.</p>
          <div class="code-example">
            <pre><code>// Monitor FPS
const { usePerformance } = useAnimation();
const { fps, memory } = usePerformance();

// Profile animations
console.time('animation');
animation.play();
console.timeEnd('animation');</code></pre>
          </div>
        </div>
        
        <div class="practice-card">
          <div class="practice-icon">⚡</div>
          <h3>Use RequestAnimationFrame</h3>
          <p>Synchronize animations with the browser's refresh rate for smooth performance.</p>
          <div class="code-example">
            <pre><code>function animate() {
  // Update animation state
  updateAnimation();
  
  // Continue animation
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="demo-section">
      <h2 class="demo-title">Performance Monitoring Code</h2>
      <div class="code-block">
        <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;div class="performance-monitor"&gt;
      &lt;div&gt;FPS: {{ fps }}&lt;/div&gt;
      &lt;div&gt;Memory: {{ memory }}MB&lt;/div&gt;
      &lt;div&gt;Active: {{ activeAnimations }}&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;button @click="optimizedAnimation()"&gt;
      Optimized Animation
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { usePerformance, useAnimation } from '@ldesign/animation'

// Performance monitoring
const { 
  fps, 
  memory, 
  activeAnimations,
  startMonitoring,
  stopMonitoring 
} = usePerformance()

// Animation with performance optimization
const { createAnimation } = useAnimation()

const optimizedAnimation = () => {
  const animation = createAnimation({
    target: '.element',
    keyframes: [
      { transform: 'translateX(0px)' },
      { transform: 'translateX(100px)' }
    ],
    options: {
      duration: 1000,
      easing: 'ease-out',
      // Performance optimizations
      composite: 'replace',
      iterationComposite: 'replace'
    }
  })
  
  // Monitor performance during animation
  startMonitoring()
  
  animation.addEventListener('finish', () => {
    stopMonitoring()
    // Clean up
    animation.cancel()
  })
  
  animation.play()
}

// Lifecycle
onMounted(() => {
  startMonitoring()
})

onUnmounted(() => {
  stopMonitoring()
})
&lt;/script&gt;

&lt;style&gt;
/* Performance optimized styles */
.element {
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}

.optimized-animation {
  /* Use transform instead of position */
  transform: translateX(var(--x, 0px));
  
  /* Avoid expensive properties */
  /* background-color: red; */
}
&lt;/style&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { usePerformance } from '@ldesign/animation'

// Performance monitoring
const { 
  fps: currentFPS, 
  memory: currentMemory, 
  activeAnimations,
  startMonitoring: startPerformanceMonitoring,
  stopMonitoring: stopPerformanceMonitoring
} = usePerformance()

// Chart refs
const fpsChart = ref<HTMLCanvasElement>()
const memoryChart = ref<HTMLCanvasElement>()
const animationChart = ref<HTMLCanvasElement>()
const memoryVisualization = ref<HTMLCanvasElement>()

// Demo refs
const testArea = ref<HTMLElement>()
const transformDemo = ref<HTMLElement>()
const willChangeDemo = ref<HTMLElement>()
const batchingDemo = ref<HTMLElement>()
const gpuDemo = ref<HTMLElement>()

// Test elements
const testElements = ref<(HTMLElement | null)[]>([])

// Monitoring state
const isMonitoring = ref(false)
const monitoringInterval = ref<number | null>(null)

// Performance data
const performanceData = reactive({
  fps: [] as number[],
  memory: [] as number[],
  animations: [] as number[],
  timestamps: [] as number[]
})

// Comparison test state
const comparisonType = ref('css')
const elementCount = ref(100)
const animationDuration = ref(1000)

const testResults = reactive({
  avgFPS: 0,
  minFPS: 0,
  maxFPS: 0,
  memoryPeak: 0,
  cpuUsage: 0,
  duration: 0
})

// Memory management state
const memoryStats = reactive({
  activeAnimations: 0,
  memoryUsage: 0,
  domNodes: 0,
  eventListeners: 0
})

const animationInstances: Animation[] = []

// Performance monitoring methods
const startMonitoring = () => {
  if (isMonitoring.value) return
  
  isMonitoring.value = true
  startPerformanceMonitoring()
  
  monitoringInterval.value = setInterval(() => {
    const now = Date.now()
    performanceData.fps.push(currentFPS.value)
    performanceData.memory.push(currentMemory.value)
    performanceData.animations.push(activeAnimations.value)
    performanceData.timestamps.push(now)
    
    // Keep only last 100 data points
    if (performanceData.fps.length > 100) {
      performanceData.fps.shift()
      performanceData.memory.shift()
      performanceData.animations.shift()
      performanceData.timestamps.shift()
    }
    
    updateCharts()
  }, 100)
}

const stopMonitoring = () => {
  if (!isMonitoring.value) return
  
  isMonitoring.value = false
  stopPerformanceMonitoring()
  
  if (monitoringInterval.value) {
    clearInterval(monitoringInterval.value)
    monitoringInterval.value = null
  }
}

const clearData = () => {
  performanceData.fps.splice(0)
  performanceData.memory.splice(0)
  performanceData.animations.splice(0)
  performanceData.timestamps.splice(0)
  
  updateCharts()
}

const exportData = () => {
  const data = {
    fps: performanceData.fps,
    memory: performanceData.memory,
    animations: performanceData.animations,
    timestamps: performanceData.timestamps,
    exportTime: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `performance-data-${Date.now()}.json`
  a.click()
  
  URL.revokeObjectURL(url)
}

// Chart update methods
const updateCharts = () => {
  updateFPSChart()
  updateMemoryChart()
  updateAnimationChart()
}

const updateFPSChart = () => {
  const canvas = fpsChart.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (performanceData.fps.length === 0) return
  
  const width = canvas.width
  const height = canvas.height
  const maxFPS = 60
  
  ctx.strokeStyle = '#667eea'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  performanceData.fps.forEach((fps, index) => {
    const x = (index / (performanceData.fps.length - 1)) * width
    const y = height - (fps / maxFPS) * height
    
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  
  ctx.stroke()
  
  // Draw grid lines
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * height
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
}

const updateMemoryChart = () => {
  const canvas = memoryChart.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (performanceData.memory.length === 0) return
  
  const width = canvas.width
  const height = canvas.height
  const maxMemory = Math.max(...performanceData.memory, 50)
  
  ctx.strokeStyle = '#764ba2'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  performanceData.memory.forEach((memory, index) => {
    const x = (index / (performanceData.memory.length - 1)) * width
    const y = height - (memory / maxMemory) * height
    
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  
  ctx.stroke()
  
  // Draw grid lines
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * height
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
}

const updateAnimationChart = () => {
  const canvas = animationChart.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (performanceData.animations.length === 0) return
  
  const width = canvas.width
  const height = canvas.height
  const maxAnimations = Math.max(...performanceData.animations, 10)
  
  ctx.fillStyle = '#f093fb'
  
  performanceData.animations.forEach((count, index) => {
    const x = (index / performanceData.animations.length) * width
    const barHeight = (count / maxAnimations) * height
    const y = height - barHeight
    const barWidth = width / performanceData.animations.length
    
    ctx.fillRect(x, y, barWidth, barHeight)
  })
}

// Performance test methods
const runPerformanceTest = async () => {
  if (!testArea.value) return
  
  // Clear previous test
  testArea.value.innerHTML = ''
  testElements.value = []
  
  // Create test elements
  for (let i = 0; i < elementCount.value; i++) {
    const element = document.createElement('div')
    element.className = `test-element ${comparisonType.value}`
    testArea.value.appendChild(element)
    testElements.value.push(element)
  }
  
  await nextTick()
  
  // Start performance monitoring
  const startTime = performance.now()
  const fpsData: number[] = []
  let memoryPeak = 0
  
  const measureFPS = () => {
    fpsData.push(currentFPS.value)
    memoryPeak = Math.max(memoryPeak, currentMemory.value)
  }
  
  const fpsInterval = setInterval(measureFPS, 16) // ~60fps
  
  // Run animation based on type
  switch (comparisonType.value) {
    case 'css':
      await runCSSTest()
      break
    case 'js':
      await runJSTest()
      break
    case 'webapi':
      await runWebAPITest()
      break
    case 'canvas':
      await runCanvasTest()
      break
  }
  
  // Stop monitoring and calculate results
  clearInterval(fpsInterval)
  const endTime = performance.now()
  
  testResults.avgFPS = Math.round(fpsData.reduce((a, b) => a + b, 0) / fpsData.length)
  testResults.minFPS = Math.min(...fpsData)
  testResults.maxFPS = Math.max(...fpsData)
  testResults.memoryPeak = Math.round(memoryPeak)
  testResults.cpuUsage = Math.round(Math.random() * 30 + 20) // Simulated
  testResults.duration = Math.round(endTime - startTime)
}

const runCSSTest = () => {
  return new Promise<void>((resolve) => {
    testElements.value.forEach((element, index) => {
      if (element) {
        element.style.transition = `transform ${animationDuration.value}ms ease-out`
        element.style.transform = `translateX(${Math.random() * 200}px) translateY(${Math.random() * 200}px)`
      }
    })
    
    setTimeout(resolve, animationDuration.value)
  })
}

const runJSTest = () => {
  return new Promise<void>((resolve) => {
    let completed = 0
    
    testElements.value.forEach((element, index) => {
      if (element) {
        const startX = 0
        const startY = 0
        const endX = Math.random() * 200
        const endY = Math.random() * 200
        const startTime = performance.now()
        
        const animate = () => {
          const elapsed = performance.now() - startTime
          const progress = Math.min(elapsed / animationDuration.value, 1)
          
          const x = startX + (endX - startX) * progress
          const y = startY + (endY - startY) * progress
          
          element.style.transform = `translateX(${x}px) translateY(${y}px)`
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            completed++
            if (completed === testElements.value.length) {
              resolve()
            }
          }
        }
        
        requestAnimationFrame(animate)
      }
    })
  })
}

const runWebAPITest = () => {
  return new Promise<void>((resolve) => {
    const animations = testElements.value.map((element, index) => {
      if (!element) return null
      
      return element.animate([
        { transform: 'translateX(0px) translateY(0px)' },
        { transform: `translateX(${Math.random() * 200}px) translateY(${Math.random() * 200}px)` }
      ], {
        duration: animationDuration.value,
        easing: 'ease-out',
        fill: 'forwards'
      })
    }).filter(Boolean)
    
    Promise.all(animations.map(anim => anim?.finished)).then(() => resolve())
  })
}

const runCanvasTest = () => {
  return new Promise<void>((resolve) => {
    // Canvas animation simulation
    const canvas = document.createElement('canvas')
    canvas.width = testArea.value?.clientWidth || 400
    canvas.height = testArea.value?.clientHeight || 300
    
    if (testArea.value) {
      testArea.value.innerHTML = ''
      testArea.value.appendChild(canvas)
    }
    
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      resolve()
      return
    }
    
    const particles = Array.from({ length: elementCount.value }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }))
    
    const startTime = performance.now()
    
    const animate = () => {
      const elapsed = performance.now() - startTime
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
      
      if (elapsed < animationDuration.value) {
        requestAnimationFrame(animate)
      } else {
        resolve()
      }
    }
    
    requestAnimationFrame(animate)
  })
}

// Optimization demo methods
const demoTransformOptimization = () => {
  const demo = transformDemo.value
  if (!demo) return
  
  const optimized = demo.querySelector('.transform-optimized') as HTMLElement
  const unoptimized = demo.querySelector('.transform-unoptimized') as HTMLElement
  
  if (optimized && unoptimized) {
    // Optimized: use transform
    optimized.style.transform = 'translateX(100px)'
    
    // Unoptimized: use left property
    unoptimized.style.left = '100px'
    
    setTimeout(() => {
      optimized.style.transform = 'translateX(0px)'
      unoptimized.style.left = '0px'
    }, 1000)
  }
}

const demoWillChange = () => {
  const demo = willChangeDemo.value
  if (!demo) return
  
  const enabled = demo.querySelector('.will-change-enabled') as HTMLElement
  const disabled = demo.querySelector('.will-change-disabled') as HTMLElement
  
  if (enabled && disabled) {
    enabled.style.willChange = 'transform'
    disabled.style.willChange = 'auto'
    
    enabled.style.transform = 'translateX(100px) scale(1.2)'
    disabled.style.transform = 'translateX(100px) scale(1.2)'
    
    setTimeout(() => {
      enabled.style.transform = 'translateX(0px) scale(1)'
      disabled.style.transform = 'translateX(0px) scale(1)'
      enabled.style.willChange = 'auto'
    }, 1000)
  }
}

const demoBatching = () => {
  const demo = batchingDemo.value
  if (!demo) return
  
  const batched = demo.querySelector('.batched') as HTMLElement
  const individual = demo.querySelector('.individual') as HTMLElement
  
  if (batched && individual) {
    // Batched: all changes in one frame
    requestAnimationFrame(() => {
      batched.style.transform = 'translateX(100px)'
      batched.style.opacity = '0.5'
      batched.style.backgroundColor = '#667eea'
    })
    
    // Individual: changes spread across frames
    setTimeout(() => {
      individual.style.transform = 'translateX(100px)'
    }, 0)
    setTimeout(() => {
      individual.style.opacity = '0.5'
    }, 16)
    setTimeout(() => {
      individual.style.backgroundColor = '#764ba2'
    }, 32)
    
    setTimeout(() => {
      batched.style.transform = 'translateX(0px)'
      batched.style.opacity = '1'
      batched.style.backgroundColor = ''
      
      individual.style.transform = 'translateX(0px)'
      individual.style.opacity = '1'
      individual.style.backgroundColor = ''
    }, 1000)
  }
}

const demoGPUAcceleration = () => {
  const demo = gpuDemo.value
  if (!demo) return
  
  const gpu = demo.querySelector('.gpu-accelerated') as HTMLElement
  const cpu = demo.querySelector('.cpu-only') as HTMLElement
  
  if (gpu && cpu) {
    // GPU: force layer creation
    gpu.style.transform = 'translateZ(0)'
    gpu.style.willChange = 'transform'
    
    // CPU: no layer hints
    cpu.style.transform = 'none'
    cpu.style.willChange = 'auto'
    
    gpu.style.transform = 'translateZ(0) translateX(100px) rotateY(180deg)'
    cpu.style.transform = 'translateX(100px)'
    
    setTimeout(() => {
      gpu.style.transform = 'translateZ(0) translateX(0px) rotateY(0deg)'
      cpu.style.transform = 'translateX(0px)'
      
      setTimeout(() => {
        gpu.style.willChange = 'auto'
      }, 500)
    }, 1000)
  }
}

// Memory management methods
const createAnimations = () => {
  for (let i = 0; i < 100; i++) {
    const element = document.createElement('div')
    element.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: hsl(${Math.random() * 360}, 70%, 60%);
      left: ${Math.random() * window.innerWidth}px;
      top: ${Math.random() * window.innerHeight}px;
      pointer-events: none;
    `
    
    document.body.appendChild(element)
    
    const animation = element.animate([
      { transform: 'translateY(0px) rotate(0deg)' },
      { transform: `translateY(${Math.random() * 500 + 200}px) rotate(${Math.random() * 720}deg)` }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'ease-out',
      iterations: Infinity,
      direction: 'alternate'
    })
    
    animationInstances.push(animation)
  }
  
  updateMemoryStats()
}

const cleanupAnimations = () => {
  animationInstances.forEach(animation => {
    animation.cancel()
    const element = animation.effect?.target as HTMLElement
    if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  })
  
  animationInstances.splice(0)
  updateMemoryStats()
}

const forceGarbageCollection = () => {
  // Simulate garbage collection
  if ('gc' in window) {
    (window as any).gc()
  }
  
  updateMemoryStats()
}

const updateMemoryStats = () => {
  memoryStats.activeAnimations = animationInstances.length
  memoryStats.memoryUsage = Math.round(currentMemory.value)
  memoryStats.domNodes = document.querySelectorAll('*').length
  memoryStats.eventListeners = Math.round(Math.random() * 50 + 10) // Simulated
}

// Lifecycle
onMounted(() => {
  updateMemoryStats()
  
  // Update memory stats periodically
  setInterval(updateMemoryStats, 1000)
})

onUnmounted(() => {
  stopMonitoring()
  cleanupAnimations()
})
</script>

<style scoped>
.performance {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* Performance Dashboard */
.performance-dashboard {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem 0;
}

.performance-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-container {
  text-align: center;
}

.chart-container h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.fps-chart,
.memory-chart,
.animation-chart {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
}

.fps-value,
.memory-value,
.animation-value {
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #667eea;
}

.performance-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Comparison */
.comparison-container {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem 0;
}

.comparison-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  color: #374151;
}

.select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
}

.range {
  width: 100%;
}

.range-value {
  font-weight: 600;
  color: #667eea;
}

.comparison-results {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.test-area {
  min-height: 300px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  background: #f9fafb;
}

.test-element {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  transition: none;
}

.test-element.css {
  background: #667eea;
}

.test-element.js {
  background: #764ba2;
}

.test-element.webapi {
  background: #f093fb;
}

.test-element.canvas {
  background: #f5576c;
}

.results-panel {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.results-panel h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.result-value {
  font-weight: 600;
  color: #667eea;
}

/* Optimization Techniques */
.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.optimization-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.optimization-card h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.optimization-card p {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
}

.optimization-demo {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.demo-element {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.transform-optimized {
  will-change: transform;
}

.transform-unoptimized {
  position: relative;
  transition: left 0.3s ease;
}

.will-change-enabled {
  will-change: transform;
}

.gpu-accelerated {
  transform: translateZ(0);
}

/* Memory Management */
.memory-management {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem 0;
}

.memory-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.memory-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  text-align: center;
}

.stat-card h4 {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.memory-visualization {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  display: flex;
  justify-content: center;
  padding: 1rem;
}

/* Best Practices */
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.practice-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.practice-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.practice-card h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.practice-card p {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
  line-height: 1.6;
}

.code-example {
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  color: #f9fafb;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-example code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

@media (max-width: 768px) {
  .performance {
    padding: 1rem;
  }
  
  .performance-charts {
    grid-template-columns: 1fr;
  }
  
  .comparison-results {
    grid-template-columns: 1fr;
  }
  
  .optimization-grid {
    grid-template-columns: 1fr;
  }
  
  .best-practices {
    grid-template-columns: 1fr;
  }
  
  .optimization-demo {
    flex-direction: column;
  }
  
  .memory-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>