<template>
  <div class="components">
    <h1>Animation Components</h1>
    <p class="page-description">
      Pre-built animation components that can be easily integrated into your Vue applications.
      These components provide common animation patterns with customizable options.
    </p>

    <!-- Animation Container -->
    <div class="demo-section">
      <h2 class="demo-title">Animation Container</h2>
      <p class="demo-description">
        A flexible container component that applies animations to its children.
      </p>
      <div class="demo-controls">
        <button @click="triggerContainerAnimation('fadeIn')" class="btn btn-primary">
          Fade In
        </button>
        <button @click="triggerContainerAnimation('slideUp')" class="btn btn-primary">
          Slide Up
        </button>
        <button @click="triggerContainerAnimation('zoomIn')" class="btn btn-primary">
          Zoom In
        </button>
        <button @click="resetContainer()" class="btn btn-secondary">
          Reset
        </button>
      </div>
      <div class="demo-container">
        <AnimationContainer
          ref="animationContainer"
          :animation="containerAnimation"
          :duration="800"
          :easing="'ease-out'"
          class="animation-container-demo"
        >
          <div class="container-content">
            <h3>Animated Content</h3>
            <p>This content is animated by the container component.</p>
            <div class="content-grid">
              <div class="content-item">Item 1</div>
              <div class="content-item">Item 2</div>
              <div class="content-item">Item 3</div>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </div>

    <!-- Transition Group -->
    <div class="demo-section">
      <h2 class="demo-title">Transition Group</h2>
      <p class="demo-description">
        Animate lists and groups of elements with enter/leave transitions.
      </p>
      <div class="demo-controls">
        <button @click="addItem()" class="btn btn-primary">
          Add Item
        </button>
        <button @click="removeItem()" class="btn btn-warning">
          Remove Item
        </button>
        <button @click="shuffleItems()" class="btn btn-primary">
          Shuffle
        </button>
        <button @click="clearItems()" class="btn btn-secondary">
          Clear All
        </button>
      </div>
      <div class="demo-container">
        <TransitionGroup
          name="list"
          tag="div"
          class="transition-group-demo"
          :duration="{ enter: 500, leave: 300 }"
          :stagger="100"
        >
          <div 
            v-for="item in listItems" 
            :key="item.id"
            class="list-item"
            @click="removeSpecificItem(item.id)"
          >
            <div class="item-content">
              <div class="item-icon">{{ item.icon }}</div>
              <div class="item-text">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
              <div class="item-actions">
                <button class="remove-btn" @click.stop="removeSpecificItem(item.id)">
                  ×
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Sequence Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Sequence Animation</h2>
      <p class="demo-description">
        Component for creating complex animation sequences with precise timing.
      </p>
      <div class="demo-controls">
        <button @click="playSequence()" class="btn btn-primary">
          Play Sequence
        </button>
        <button @click="pauseSequence()" class="btn btn-warning">
          {{ sequenceState.paused ? 'Resume' : 'Pause' }}
        </button>
        <button @click="resetSequence()" class="btn btn-secondary">
          Reset
        </button>
      </div>
      <div class="demo-container">
        <SequenceAnimation
          ref="sequenceAnimation"
          :steps="sequenceSteps"
          :auto-play="false"
          @step-complete="onStepComplete"
          @sequence-complete="onSequenceComplete"
        >
          <div class="sequence-demo">
            <div class="sequence-progress">
              <div class="progress-bar" :style="{ width: sequenceProgress + '%' }"></div>
            </div>
            <div class="sequence-elements">
              <div 
                v-for="(element, index) in sequenceElements" 
                :key="index"
                :ref="el => sequenceRefs[index] = el"
                class="sequence-element"
                :class="{ active: element.active }"
              >
                {{ element.text }}
              </div>
            </div>
          </div>
        </SequenceAnimation>
      </div>
    </div>

    <!-- Scroll Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Scroll Animation</h2>
      <p class="demo-description">
        Component that triggers animations based on scroll position and visibility.
      </p>
      <div class="scroll-demo-container">
        <div class="scroll-content">
          <ScrollAnimation
            v-for="(item, index) in scrollItems" 
            :key="index"
            :animation="item.animation"
            :threshold="0.2"
            :duration="600"
            :delay="index * 100"
            class="scroll-item"
          >
            <div class="scroll-card">
              <div class="scroll-icon">{{ item.icon }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>

    <!-- Hover Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Hover Animation</h2>
      <p class="demo-description">
        Component that applies hover animations with customizable effects.
      </p>
      <div class="hover-demo-grid">
        <HoverAnimation
          v-for="(effect, index) in hoverAnimations" 
          :key="index"
          :animation="effect.animation"
          :duration="300"
          :easing="'ease-out'"
          class="hover-animation-item"
        >
          <div class="hover-card">
            <div class="hover-icon">{{ effect.icon }}</div>
            <h3>{{ effect.title }}</h3>
            <p>{{ effect.description }}</p>
          </div>
        </HoverAnimation>
      </div>
    </div>

    <!-- Click Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Click Animation</h2>
      <p class="demo-description">
        Component that provides click feedback with various animation effects.
      </p>
      <div class="click-demo-grid">
        <ClickAnimation
          v-for="(effect, index) in clickAnimations" 
          :key="index"
          :animation="effect.animation"
          :duration="400"
          :ripple="effect.ripple"
          class="click-animation-item"
          @click="onClickAnimation(effect.title)"
        >
          <div class="click-card">
            <div class="click-icon">{{ effect.icon }}</div>
            <h3>{{ effect.title }}</h3>
            <p>{{ effect.description }}</p>
          </div>
        </ClickAnimation>
      </div>
    </div>

    <!-- Loading Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Loading Animation</h2>
      <p class="demo-description">
        Various loading animation components for different use cases.
      </p>
      <div class="loading-demo-grid">
        <div class="loading-card">
          <h3>Spinner</h3>
          <LoadingSpinner 
            :size="40"
            :color="'#667eea'"
            :thickness="4"
          />
        </div>
        
        <div class="loading-card">
          <h3>Dots</h3>
          <LoadingDots 
            :count="3"
            :size="12"
            :color="'#764ba2'"
            :duration="1400"
          />
        </div>
        
        <div class="loading-card">
          <h3>Progress</h3>
          <LoadingProgress 
            :progress="loadingProgress"
            :height="8"
            :color="'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'"
            :show-text="true"
          />
        </div>
        
        <div class="loading-card">
          <h3>Skeleton</h3>
          <LoadingSkeleton 
            :lines="3"
            :height="16"
            :spacing="12"
            :animation="'wave'"
          />
        </div>
      </div>
      <div class="loading-controls">
        <button @click="startLoading()" class="btn btn-primary">
          Start Loading
        </button>
        <button @click="resetLoading()" class="btn btn-secondary">
          Reset
        </button>
      </div>
    </div>

    <!-- Performance Monitor -->
    <div class="demo-section">
      <h2 class="demo-title">Performance Monitor</h2>
      <div class="performance-stats">
        <div class="stat-card">
          <h4>Active Animations</h4>
          <div class="stat-value">{{ performanceStats.activeAnimations }}</div>
        </div>
        <div class="stat-card">
          <h4>FPS</h4>
          <div class="stat-value">{{ performanceStats.fps }}</div>
        </div>
        <div class="stat-card">
          <h4>Memory Usage</h4>
          <div class="stat-value">{{ performanceStats.memory }}MB</div>
        </div>
        <div class="stat-card">
          <h4>Render Time</h4>
          <div class="stat-value">{{ performanceStats.renderTime }}ms</div>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="demo-section">
      <h2 class="demo-title">Code Example</h2>
      <div class="code-block">
        <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Animation Container --&gt;
    &lt;AnimationContainer
      :animation="'fadeIn'"
      :duration="800"
      :easing="'ease-out'"
    &gt;
      &lt;div&gt;Animated content&lt;/div&gt;
    &lt;/AnimationContainer&gt;

    &lt;!-- Transition Group --&gt;
    &lt;TransitionGroup
      name="list"
      tag="div"
      :duration="{ enter: 500, leave: 300 }"
      :stagger="100"
    &gt;
      &lt;div v-for="item in items" :key="item.id"&gt;
        {{ item.text }}
      &lt;/div&gt;
    &lt;/TransitionGroup&gt;

    &lt;!-- Scroll Animation --&gt;
    &lt;ScrollAnimation
      :animation="'slideUp'"
      :threshold="0.2"
      :duration="600"
    &gt;
      &lt;div&gt;Scroll-triggered content&lt;/div&gt;
    &lt;/ScrollAnimation&gt;

    &lt;!-- Hover Animation --&gt;
    &lt;HoverAnimation
      :animation="'scale'"
      :duration="300"
    &gt;
      &lt;button&gt;Hover me&lt;/button&gt;
    &lt;/HoverAnimation&gt;

    &lt;!-- Click Animation --&gt;
    &lt;ClickAnimation
      :animation="'ripple'"
      :duration="400"
      :ripple="true"
    &gt;
      &lt;button&gt;Click me&lt;/button&gt;
    &lt;/ClickAnimation&gt;

    &lt;!-- Loading Components --&gt;
    &lt;LoadingSpinner :size="40" :color="'#667eea'" /&gt;
    &lt;LoadingDots :count="3" :size="12" /&gt;
    &lt;LoadingProgress :progress="75" /&gt;
    &lt;LoadingSkeleton :lines="3" /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import {
  AnimationContainer,
  TransitionGroup,
  ScrollAnimation,
  HoverAnimation,
  ClickAnimation,
  LoadingSpinner,
  LoadingDots,
  LoadingProgress,
  LoadingSkeleton
} from '@ldesign/animation'

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' }
])
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import {
  AnimationContainer,
  TransitionGroup,
  SequenceAnimation,
  ScrollAnimation,
  HoverAnimation,
  ClickAnimation
} from '@ldesign/animation'

// Component refs
const animationContainer = ref()
const sequenceAnimation = ref()
const sequenceRefs = ref<(HTMLElement | null)[]>([])

// Animation Container state
const containerAnimation = ref('')

// List items for TransitionGroup
const listItems = reactive([
  { id: 1, icon: '🚀', title: 'Rocket', description: 'Fast and powerful' },
  { id: 2, icon: '⭐', title: 'Star', description: 'Bright and shining' },
  { id: 3, icon: '🌙', title: 'Moon', description: 'Calm and peaceful' }
])

let nextId = 4

// Sequence animation state
const sequenceState = reactive({
  paused: false,
  currentStep: 0
})

const sequenceProgress = ref(0)

const sequenceElements = reactive([
  { text: 'Step 1', active: false },
  { text: 'Step 2', active: false },
  { text: 'Step 3', active: false },
  { text: 'Step 4', active: false }
])

const sequenceSteps = [
  {
    target: 0,
    animation: { transform: 'translateX(100px)', backgroundColor: '#667eea' },
    duration: 500
  },
  {
    target: 1,
    animation: { transform: 'scale(1.2)', backgroundColor: '#764ba2' },
    duration: 400
  },
  {
    target: 2,
    animation: { transform: 'rotate(180deg)', backgroundColor: '#f093fb' },
    duration: 600
  },
  {
    target: 3,
    animation: { transform: 'translateY(-50px)', backgroundColor: '#f5576c' },
    duration: 300
  }
]

// Scroll animation items
const scrollItems = [
  { icon: '📱', title: 'Mobile First', description: 'Responsive design approach', animation: 'fadeInUp' },
  { icon: '⚡', title: 'Performance', description: 'Optimized for speed', animation: 'fadeInLeft' },
  { icon: '🎨', title: 'Beautiful UI', description: 'Modern and clean design', animation: 'fadeInRight' },
  { icon: '🔧', title: 'Customizable', description: 'Flexible and configurable', animation: 'fadeInDown' },
  { icon: '🚀', title: 'Fast Development', description: 'Quick to implement', animation: 'zoomIn' },
  { icon: '💡', title: 'Innovative', description: 'Cutting-edge features', animation: 'slideInUp' }
]

// Hover animations
const hoverAnimations = [
  { icon: '🎯', title: 'Scale', description: 'Hover to scale', animation: 'scale' },
  { icon: '🌟', title: 'Glow', description: 'Hover for glow effect', animation: 'glow' },
  { icon: '🎨', title: 'Color', description: 'Hover to change color', animation: 'colorShift' },
  { icon: '📱', title: 'Lift', description: 'Hover to lift up', animation: 'lift' }
]

// Click animations
const clickAnimations = [
  { icon: '💥', title: 'Ripple', description: 'Click for ripple effect', animation: 'ripple', ripple: true },
  { icon: '🎾', title: 'Bounce', description: 'Click to bounce', animation: 'bounce', ripple: false },
  { icon: '💫', title: 'Pulse', description: 'Click to pulse', animation: 'pulse', ripple: false },
  { icon: '🌪️', title: 'Shake', description: 'Click to shake', animation: 'shake', ripple: false }
]

// Loading state
const loadingProgress = ref(0)
let loadingInterval: number | null = null

// Performance monitoring
const performanceStats = reactive({
  activeAnimations: 0,
  fps: 60,
  memory: 0,
  renderTime: 0
})

// Animation Container methods
const triggerContainerAnimation = (animation: string) => {
  containerAnimation.value = animation
  if (animationContainer.value) {
    animationContainer.value.play()
  }
}

const resetContainer = () => {
  containerAnimation.value = ''
  if (animationContainer.value) {
    animationContainer.value.reset()
  }
}

// TransitionGroup methods
const addItem = () => {
  const icons = ['🎈', '🎁', '🎊', '🎉', '🎯', '🎪', '🎭', '🎨', '🎵', '🎸']
  const titles = ['Balloon', 'Gift', 'Confetti', 'Party', 'Target', 'Circus', 'Theater', 'Art', 'Music', 'Guitar']
  const descriptions = ['Fun and colorful', 'Surprise inside', 'Celebration time', 'Let\'s party', 'Hit the mark', 'Amazing show', 'Drama and art', 'Creative expression', 'Beautiful sounds', 'Rock and roll']
  
  const randomIndex = Math.floor(Math.random() * icons.length)
  
  listItems.push({
    id: nextId++,
    icon: icons[randomIndex],
    title: titles[randomIndex],
    description: descriptions[randomIndex]
  })
}

const removeItem = () => {
  if (listItems.length > 0) {
    listItems.pop()
  }
}

const removeSpecificItem = (id: number) => {
  const index = listItems.findIndex(item => item.id === id)
  if (index > -1) {
    listItems.splice(index, 1)
  }
}

const shuffleItems = () => {
  for (let i = listItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[listItems[i], listItems[j]] = [listItems[j], listItems[i]]
  }
}

const clearItems = () => {
  listItems.splice(0)
}

// Sequence animation methods
const playSequence = () => {
  sequenceState.paused = false
  if (sequenceAnimation.value) {
    sequenceAnimation.value.play()
  }
}

const pauseSequence = () => {
  sequenceState.paused = !sequenceState.paused
  if (sequenceAnimation.value) {
    if (sequenceState.paused) {
      sequenceAnimation.value.pause()
    } else {
      sequenceAnimation.value.resume()
    }
  }
}

const resetSequence = () => {
  sequenceState.paused = false
  sequenceState.currentStep = 0
  sequenceProgress.value = 0
  
  sequenceElements.forEach(element => {
    element.active = false
  })
  
  if (sequenceAnimation.value) {
    sequenceAnimation.value.reset()
  }
}

const onStepComplete = (stepIndex: number) => {
  sequenceState.currentStep = stepIndex
  sequenceProgress.value = ((stepIndex + 1) / sequenceSteps.length) * 100
  
  if (stepIndex < sequenceElements.length) {
    sequenceElements[stepIndex].active = true
  }
}

const onSequenceComplete = () => {
  console.log('Sequence animation completed')
}

// Click animation handler
const onClickAnimation = (title: string) => {
  console.log(`Clicked: ${title}`)
}

// Loading methods
const startLoading = () => {
  if (loadingInterval) return
  
  loadingProgress.value = 0
  loadingInterval = setInterval(() => {
    loadingProgress.value += Math.random() * 10
    
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      clearInterval(loadingInterval!)
      loadingInterval = null
      
      setTimeout(() => {
        loadingProgress.value = 0
      }, 1000)
    }
  }, 200)
}

const resetLoading = () => {
  if (loadingInterval) {
    clearInterval(loadingInterval)
    loadingInterval = null
  }
  loadingProgress.value = 0
}

// Performance monitoring
const updatePerformanceStats = () => {
  // Simulate performance data
  performanceStats.activeAnimations = Math.floor(Math.random() * 10)
  performanceStats.fps = 55 + Math.floor(Math.random() * 10)
  performanceStats.memory = 15 + Math.floor(Math.random() * 10)
  performanceStats.renderTime = 1 + Math.floor(Math.random() * 5)
}

let performanceInterval: number

// Lifecycle
onMounted(() => {
  performanceInterval = setInterval(updatePerformanceStats, 2000)
  updatePerformanceStats()
})

onUnmounted(() => {
  if (loadingInterval) {
    clearInterval(loadingInterval)
  }
  if (performanceInterval) {
    clearInterval(performanceInterval)
  }
})
</script>

<style scoped>
.components {
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

/* Animation Container */
.animation-container-demo {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.container-content {
  text-align: center;
}

.container-content h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.container-content p {
  margin: 0 0 2rem 0;
  color: #6b7280;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.content-item {
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
}

/* Transition Group */
.transition-group-demo {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
  min-height: 200px;
}

.list-item {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.item-content {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
}

.item-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.item-text {
  flex: 1;
}

.item-text h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.item-text p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.item-actions {
  flex-shrink: 0;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  line-height: 1;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Sequence Animation */
.sequence-demo {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  margin: 2rem 0;
}

.sequence-progress {
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
  transition: width 0.3s ease;
}

.sequence-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.sequence-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.sequence-element.active {
  opacity: 1;
}

/* Scroll Animation */
.scroll-demo-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  margin: 2rem 0;
}

.scroll-content {
  padding: 2rem;
  display: grid;
  gap: 2rem;
}

.scroll-item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.scroll-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-card {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.scroll-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.scroll-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.scroll-card p {
  margin: 0;
  color: #6b7280;
}

/* Hover Animation */
.hover-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.hover-animation-item {
  transition: all 0.3s ease;
}

.hover-card {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
}

.hover-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hover-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.hover-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Click Animation */
.click-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.click-animation-item {
  transition: all 0.2s ease;
}

.click-card {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.75rem;
  text-align: center;
  cursor: pointer;
}

.click-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.click-card h3 {
  margin: 0 0 0.5rem 0;
}

.click-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

/* Loading Animation */
.loading-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.loading-card {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading-card h3 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
}

.loading-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Performance Stats */
.performance-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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

@media (max-width: 768px) {
  .components {
    padding: 1rem;
  }
  
  .hover-demo-grid,
  .click-demo-grid,
  .loading-demo-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sequence-elements {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .performance-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>