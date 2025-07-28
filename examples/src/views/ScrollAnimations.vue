<template>
  <div class="scroll-animations">
    <h1>Scroll Animations</h1>
    <p class="page-description">
      Create engaging scroll-triggered animations and parallax effects.
      Perfect for storytelling, revealing content, and creating immersive experiences.
    </p>

    <!-- Scroll Progress -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- Fade In on Scroll -->
    <div class="demo-section">
      <h2 class="demo-title">Fade In on Scroll</h2>
      <p class="demo-description">
        Elements fade in smoothly as they enter the viewport.
      </p>
      <div class="fade-in-demo">
        <div 
          v-for="(item, index) in fadeItems" 
          :key="index"
          :ref="el => fadeRefs[index] = el"
          class="fade-item"
          :class="{ visible: item.visible }"
        >
          <h3>Fade Item {{ index + 1 }}</h3>
          <p>This content fades in when scrolled into view.</p>
        </div>
      </div>
    </div>

    <!-- Slide In Animations -->
    <div class="demo-section">
      <h2 class="demo-title">Slide In Animations</h2>
      <p class="demo-description">
        Content slides in from different directions based on scroll position.
      </p>
      <div class="slide-demo">
        <div 
          v-for="(direction, index) in slideDirections" 
          :key="index"
          :ref="el => slideRefs[index] = el"
          class="slide-item"
          :class="[`slide-${direction}`, { visible: slideItems[index]?.visible }]"
        >
          <div class="slide-content">
            <h3>Slide {{ direction.charAt(0).toUpperCase() + direction.slice(1) }}</h3>
            <p>Sliding from {{ direction }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Parallax Effects -->
    <div class="demo-section">
      <h2 class="demo-title">Parallax Effects</h2>
      <p class="demo-description">
        Background and foreground elements move at different speeds for depth.
      </p>
      <div class="parallax-container" ref="parallaxContainer">
        <div class="parallax-bg" ref="parallaxBg">
          <div class="parallax-layer layer-1"></div>
          <div class="parallax-layer layer-2"></div>
          <div class="parallax-layer layer-3"></div>
        </div>
        <div class="parallax-content">
          <h3>Parallax Content</h3>
          <p>This content moves at normal speed while backgrounds create depth.</p>
        </div>
      </div>
    </div>

    <!-- Scale on Scroll -->
    <div class="demo-section">
      <h2 class="demo-title">Scale on Scroll</h2>
      <p class="demo-description">
        Elements scale and transform based on scroll progress.
      </p>
      <div class="scale-demo">
        <div 
          v-for="(item, index) in scaleItems" 
          :key="index"
          :ref="el => scaleRefs[index] = el"
          class="scale-item"
          :style="{ transform: `scale(${item.scale}) rotate(${item.rotation}deg)` }"
        >
          <div class="scale-content">
            <span class="scale-number">{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stagger Animation -->
    <div class="demo-section">
      <h2 class="demo-title">Stagger Animation</h2>
      <p class="demo-description">
        Multiple elements animate in sequence as they come into view.
      </p>
      <div class="stagger-demo">
        <div 
          v-for="(item, index) in staggerItems" 
          :key="index"
          :ref="el => staggerRefs[index] = el"
          class="stagger-item"
          :class="{ visible: item.visible }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="stagger-content">
            <div class="stagger-icon">🚀</div>
            <h4>Item {{ index + 1 }}</h4>
            <p>Staggered animation</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Text Reveal -->
    <div class="demo-section">
      <h2 class="demo-title">Text Reveal Animation</h2>
      <p class="demo-description">
        Text reveals character by character or word by word on scroll.
      </p>
      <div class="text-reveal-demo">
        <div class="reveal-container" ref="textRevealContainer">
          <h2 class="reveal-text">
            <span 
              v-for="(char, index) in revealText.split('')" 
              :key="index"
              class="reveal-char"
              :class="{ visible: revealProgress > index / revealText.length }"
              :style="{ transitionDelay: `${index * 50}ms` }"
            >
              {{ char === ' ' ? '&nbsp;' : char }}
            </span>
          </h2>
        </div>
      </div>
    </div>

    <!-- Scroll-triggered Timeline -->
    <div class="demo-section">
      <h2 class="demo-title">Scroll Timeline</h2>
      <p class="demo-description">
        Complex timeline animations triggered by scroll position.
      </p>
      <div class="timeline-demo">
        <div class="timeline-track">
          <div class="timeline-progress" :style="{ height: timelineProgress + '%' }"></div>
        </div>
        <div class="timeline-events">
          <div 
            v-for="(event, index) in timelineEvents" 
            :key="index"
            :ref="el => timelineRefs[index] = el"
            class="timeline-event"
            :class="{ active: event.active }"
          >
            <div class="event-marker"></div>
            <div class="event-content">
              <h4>{{ event.title }}</h4>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Infinite Scroll -->
    <div class="demo-section">
      <h2 class="demo-title">Infinite Scroll</h2>
      <p class="demo-description">
        Continuously loading content with smooth animations.
      </p>
      <div class="infinite-scroll-demo">
        <div 
          v-for="(item, index) in infiniteItems" 
          :key="item.id"
          class="infinite-item"
          :class="{ visible: item.visible }"
        >
          <div class="infinite-content">
            <div class="infinite-avatar">{{ item.avatar }}</div>
            <div class="infinite-text">
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
        <div class="loading-indicator" v-if="isLoading">
          <div class="spinner"></div>
          <span>Loading more content...</span>
        </div>
      </div>
    </div>

    <!-- Performance Monitor -->
    <div class="demo-section">
      <h2 class="demo-title">Scroll Performance</h2>
      <div class="performance-monitor">
        <div class="performance-item">
          <span class="performance-label">Scroll Position:</span>
          <span class="performance-value">{{ Math.round(scrollY) }}px</span>
        </div>
        <div class="performance-item">
          <span class="performance-label">Scroll Progress:</span>
          <span class="performance-value">{{ Math.round(scrollProgress) }}%</span>
        </div>
        <div class="performance-item">
          <span class="performance-label">Visible Elements:</span>
          <span class="performance-value">{{ visibleElementsCount }}</span>
        </div>
        <div class="performance-item">
          <span class="performance-label">FPS:</span>
          <span class="performance-value">{{ currentFPS }}</span>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="demo-section">
      <h2 class="demo-title">Code Example</h2>
      <div class="code-block">
        <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;div 
      v-for="item in items" 
      :key="item.id"
      ref="itemRefs"
      class="scroll-item"
      :class="{ visible: item.visible }"
    &gt;
      {{ item.content }}
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, reactive, watchEffect } from 'vue'
import { useScrollAnimation } from '@ldesign/animation'

const itemRefs = ref([])
const items = reactive([
  { id: 1, content: 'Item 1', visible: false },
  { id: 2, content: 'Item 2', visible: false },
  { id: 3, content: 'Item 3', visible: false }
])

// Basic scroll animation
const { onScroll, scrollY, scrollProgress } = useScrollAnimation()

// Intersection observer for visibility
// 使用原生 Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      items[index].visible = true
    } else {
      items[index].visible = false
    }
  })
}, { threshold: 0.1 })

// Observe elements
watchEffect(() => {
  itemRefs.value.forEach((el, index) => {
    if (el) observer.observe(el)
  })
})

// Parallax effect
const parallaxOffset = computed(() =&gt; scrollY.value * 0.5)

// Scale based on scroll
const scaleValue = computed(() =&gt; {
  const progress = scrollProgress.value / 100
  return 1 + progress * 0.5
})
&lt;/script&gt;

&lt;style&gt;
.scroll-item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.scroll-item.visible {
  opacity: 1;
  transform: translateY(0);
}
&lt;/style&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useScrollAnimation, usePerformance } from '@ldesign/animation'

const { onScroll, scrollY, scrollProgress } = useScrollAnimation()
// 使用原生 Intersection Observer
const mainObserver = new IntersectionObserver((entries) => {
  // 处理观察到的元素
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
})
const { getFPS } = usePerformance()

// Element refs
const fadeRefs = ref<(HTMLElement | null)[]>([])
const slideRefs = ref<(HTMLElement | null)[]>([])
const scaleRefs = ref<(HTMLElement | null)[]>([])
const staggerRefs = ref<(HTMLElement | null)[]>([])
const timelineRefs = ref<(HTMLElement | null)[]>([])
const parallaxContainer = ref<HTMLElement>()
const parallaxBg = ref<HTMLElement>()
const textRevealContainer = ref<HTMLElement>()

// State management
const fadeItems = reactive(
  Array.from({ length: 6 }, (_, i) => ({ visible: false }))
)

const slideDirections = ['left', 'right', 'up', 'down']
const slideItems = reactive(
  Array.from({ length: 4 }, (_, i) => ({ visible: false }))
)

const scaleItems = reactive(
  Array.from({ length: 8 }, (_, i) => ({ scale: 0.5, rotation: 0 }))
)

const staggerItems = reactive(
  Array.from({ length: 12 }, (_, i) => ({ visible: false }))
)

const timelineEvents = reactive([
  { title: 'Project Start', description: 'Initial planning and setup', active: false },
  { title: 'Design Phase', description: 'UI/UX design and prototyping', active: false },
  { title: 'Development', description: 'Core functionality implementation', active: false },
  { title: 'Testing', description: 'Quality assurance and bug fixes', active: false },
  { title: 'Launch', description: 'Production deployment', active: false }
])

const infiniteItems = reactive(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: `This is the content for item ${i + 1}. It contains some interesting information.`,
    avatar: String.fromCharCode(65 + (i % 26)),
    visible: false
  }))
)

const isLoading = ref(false)
const revealText = 'Amazing Scroll Animations'
const revealProgress = ref(0)
const timelineProgress = ref(0)
const currentFPS = ref(60)

// Computed properties
const visibleElementsCount = computed(() => {
  return [
    ...fadeItems.filter(item => item.visible),
    ...slideItems.filter(item => item.visible),
    ...staggerItems.filter(item => item.visible),
    ...infiniteItems.filter(item => item.visible)
  ].length
})

// Intersection observer setup
const setupObservers = () => {
  // Create observers for different element types
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = fadeRefs.value.indexOf(entry.target as HTMLElement)
      if (index !== -1) {
        fadeItems[index].visible = entry.isIntersecting
      }
    })
  }, { threshold: 0.1 })

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = slideRefs.value.indexOf(entry.target as HTMLElement)
      if (index !== -1) {
        slideItems[index].visible = entry.isIntersecting
      }
    })
  }, { threshold: 0.1 })

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = staggerRefs.value.indexOf(entry.target as HTMLElement)
      if (index !== -1 && entry.isIntersecting) {
        setTimeout(() => {
          staggerItems[index].visible = true
        }, index * 100)
      } else if (index !== -1) {
        staggerItems[index].visible = false
      }
    })
  }, { threshold: 0.1 })

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = timelineRefs.value.indexOf(entry.target as HTMLElement)
      if (index !== -1 && entry.isIntersecting) {
        timelineEvents[index].active = true
        timelineProgress.value = ((index + 1) / timelineEvents.length) * 100
      }
    })
  }, { threshold: 0.1 })

  // Observe elements
  fadeRefs.value.forEach((el) => {
    if (el) fadeObserver.observe(el)
  })

  slideRefs.value.forEach((el) => {
    if (el) slideObserver.observe(el)
  })

  staggerRefs.value.forEach((el) => {
    if (el) staggerObserver.observe(el)
  })

  timelineRefs.value.forEach((el) => {
    if (el) timelineObserver.observe(el)
  })

  // Text reveal observer
  if (textRevealContainer.value) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTextReveal()
        }
      })
    }, { threshold: 0.1 })
    textObserver.observe(textRevealContainer.value)
  }
}

// Scroll handlers
const handleScroll = () => {
  // Update FPS
  currentFPS.value = getFPS()

  // Parallax effects
  if (parallaxBg.value) {
    const offset = scrollY.value * 0.5
    parallaxBg.value.style.transform = `translateY(${offset}px)`
  }

  // Scale animations
  scaleRefs.value.forEach((el, index) => {
    if (el) {
      const rect = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
      
      scaleItems[index].scale = 0.5 + progress * 0.5
      scaleItems[index].rotation = progress * 360
    }
  })
}

// Text reveal animation
const animateTextReveal = () => {
  let progress = 0
  const duration = 2000
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    progress = Math.min(elapsed / duration, 1)
    
    revealProgress.value = progress
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

// Load more content for infinite scroll
const loadMoreContent = () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  setTimeout(() => {
    const currentLength = infiniteItems.length
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: currentLength + i + 1,
      title: `Item ${currentLength + i + 1}`,
      content: `This is the content for item ${currentLength + i + 1}. It contains some interesting information.`,
      avatar: String.fromCharCode(65 + ((currentLength + i) % 26)),
      visible: false
    }))
    
    infiniteItems.push(...newItems)
    isLoading.value = false
    
    // Setup observers for new items
    setTimeout(setupObservers, 100)
  }, 1000)
}

// Lifecycle
onMounted(() => {
  onScroll(handleScroll)
  setTimeout(setupObservers, 100)
})

onUnmounted(() => {
  // Cleanup scroll listeners
})
</script>

<style scoped>
.scroll-animations {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 200vh; /* Ensure scrollable content */
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s ease;
}

.demo-section {
  margin: 4rem 0;
  padding: 2rem 0;
}

/* Fade In Animations */
.fade-in-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.fade-item {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.fade-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-item h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.fade-item p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

/* Slide Animations */
.slide-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.slide-item {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.75rem;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-item.slide-left {
  transform: translateX(-100px);
  opacity: 0;
}

.slide-item.slide-right {
  transform: translateX(100px);
  opacity: 0;
}

.slide-item.slide-up {
  transform: translateY(-100px);
  opacity: 0;
}

.slide-item.slide-down {
  transform: translateY(100px);
  opacity: 0;
}

.slide-item.visible {
  transform: translate(0, 0);
  opacity: 1;
}

.slide-content h3 {
  margin: 0 0 0.5rem 0;
}

.slide-content p {
  margin: 0;
  opacity: 0.9;
}

/* Parallax Effects */
.parallax-container {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 0.75rem;
  margin: 3rem 0;
}

.parallax-bg {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: calc(100% + 100px);
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
}

.layer-1 {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  opacity: 0.8;
}

.layer-2 {
  background: linear-gradient(-45deg, #f093fb 0%, #f5576c 100%);
  opacity: 0.6;
  transform: translateY(20px);
}

.layer-3 {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  opacity: 0.4;
  transform: translateY(40px);
}

.parallax-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
}

.parallax-content h3 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
}

.parallax-content p {
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
}

/* Scale Animations */
.scale-demo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
}

.scale-item {
  aspect-ratio: 1;
  transition: transform 0.1s ease;
}

.scale-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

/* Stagger Animations */
.stagger-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.stagger-item {
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stagger-item.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.stagger-content {
  text-align: center;
}

.stagger-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stagger-content h4 {
  margin: 0.5rem 0;
  color: #1f2937;
}

.stagger-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Text Reveal */
.text-reveal-demo {
  margin: 3rem 0;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  text-align: center;
}

.reveal-text {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.reveal-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) rotateX(90deg);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal-char.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

/* Timeline */
.timeline-demo {
  display: flex;
  gap: 2rem;
  margin: 3rem 0;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.timeline-track {
  width: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  position: relative;
}

.timeline-progress {
  width: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: height 0.3s ease;
}

.timeline-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-event {
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.timeline-event.active {
  opacity: 1;
  transform: translateX(10px);
}

.event-marker {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-content h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.event-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Infinite Scroll */
.infinite-scroll-demo {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
}

.infinite-item {
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.infinite-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.infinite-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.infinite-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.infinite-text h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.infinite-text p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: #6b7280;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Performance Monitor */
.performance-monitor {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0f9ff;
  border-radius: 0.75rem;
  border: 1px solid #0ea5e9;
}

.performance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.performance-label {
  font-weight: 500;
  color: #0c4a6e;
}

.performance-value {
  font-weight: 600;
  color: #0ea5e9;
}

@media (max-width: 768px) {
  .scroll-animations {
    padding: 1rem;
  }
  
  .fade-in-demo,
  .slide-demo,
  .stagger-demo {
    grid-template-columns: 1fr;
  }
  
  .scale-demo {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .reveal-text {
    font-size: 2rem;
  }
  
  .timeline-demo {
    flex-direction: column;
  }
  
  .timeline-track {
    height: 4px;
    width: 100%;
  }
  
  .timeline-progress {
    height: 100%;
    width: 0;
    transition: width 0.3s ease;
  }
}
</style>