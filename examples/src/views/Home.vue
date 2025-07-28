<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">LDesign Animation Library</h1>
        <p class="hero-description">
          A powerful, flexible, and easy-to-use animation library for Vue 3 applications.
          Create stunning animations with CSS, JavaScript, and Web Animations API.
        </p>
        <div class="hero-actions">
          <router-link to="/basic" class="btn btn-primary btn-lg">
            Get Started
          </router-link>
          <a href="https://github.com/ldesign/animation" class="btn btn-outline btn-lg">
            View on GitHub
          </a>
        </div>
      </div>
      <div class="hero-demo">
        <div class="demo-grid">
          <div 
            v-for="(item, index) in demoItems" 
            :key="index"
            :ref="el => demoRefs[index] = el"
            class="demo-item"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ item.icon }}
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Features</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="examples">
      <h2 class="section-title">Animation Examples</h2>
      <div class="examples-grid">
        <router-link 
          v-for="example in examples" 
          :key="example.title"
          :to="example.path"
          class="example-card"
        >
          <div class="example-icon">{{ example.icon }}</div>
          <h3 class="example-title">{{ example.title }}</h3>
          <p class="example-description">{{ example.description }}</p>
          <div class="example-arrow">→</div>
        </router-link>
      </div>
    </section>

    <section class="getting-started">
      <h2 class="section-title">Quick Start</h2>
      <div class="code-example">
        <h3>Installation</h3>
        <div class="code-block">
          <code>npm install @ldesign/animation</code>
        </div>
        
        <h3>Basic Usage</h3>
        <div class="code-block">
          <pre><code>import { useAnimation } from '@ldesign/animation'

const { play } = useAnimation()

// Play a fade-in animation
play(elementRef, 'fadeIn')</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@ldesign/animation'

const { play } = useAnimation()
const demoRefs = ref<(HTMLElement | null)[]>([])

const demoItems = [
  { icon: '🎨' },
  { icon: '⚡' },
  { icon: '🎯' },
  { icon: '🚀' },
  { icon: '✨' },
  { icon: '🎪' },
  { icon: '🎭' },
  { icon: '🎨' },
  { icon: '⭐' }
]

const features = [
  {
    icon: '🎯',
    title: 'Easy to Use',
    description: 'Simple API with Vue 3 composables and components for quick integration.'
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Optimized animations using Web Animations API and CSS transforms.'
  },
  {
    icon: '🎨',
    title: 'Rich Effects',
    description: 'Comprehensive collection of pre-built animations and transitions.'
  },
  {
    icon: '🔧',
    title: 'Customizable',
    description: 'Flexible configuration options and custom animation support.'
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Mobile-friendly animations with touch and gesture support.'
  },
  {
    icon: '🎪',
    title: 'Interactive',
    description: 'Scroll-triggered, hover, and click-based animation triggers.'
  }
]

const examples = [
  {
    title: 'Basic Animations',
    description: 'Fade, slide, scale, and rotate effects',
    icon: '🎯',
    path: '/basic'
  },
  {
    title: 'CSS Animations',
    description: 'CSS-based keyframe animations',
    icon: '🎨',
    path: '/css'
  },
  {
    title: 'JS Animations',
    description: 'JavaScript and Web Animations API',
    icon: '⚡',
    path: '/js'
  },
  {
    title: 'Transitions',
    description: 'Smooth property transitions',
    icon: '🔄',
    path: '/transitions'
  },
  {
    title: 'Sequences',
    description: 'Complex animation sequences',
    icon: '🎬',
    path: '/sequences'
  },
  {
    title: 'Scroll Animations',
    description: 'Scroll-triggered effects',
    icon: '📜',
    path: '/scroll'
  },
  {
    title: 'Interactive',
    description: 'User interaction animations',
    icon: '👆',
    path: '/interactive'
  },
  {
    title: 'Components',
    description: 'Ready-to-use Vue components',
    icon: '🧩',
    path: '/components'
  }
]

onMounted(() => {
  // Animate demo items on mount
  demoRefs.value.forEach((el, index) => {
    if (el) {
      setTimeout(() => {
        play(ref(el), 'bounceIn')
      }, index * 100)
    }
  })
})
</script>

<style scoped>
.home {
  padding: 0;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  display: flex;
  align-items: center;
  min-height: 60vh;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-demo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 300px;
}

.demo-item {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: float 3s ease-in-out infinite;
}

.demo-item:nth-child(odd) {
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.features {
  padding: 4rem 0;
  background: #f9fafb;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

.examples {
  padding: 4rem 0;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.example-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.example-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.example-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.example-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.example-description {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.example-arrow {
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.example-card:hover .example-arrow {
  transform: translateX(5px);
}

.getting-started {
  padding: 4rem 0;
  background: #f9fafb;
}

.code-example {
  max-width: 800px;
  margin: 0 auto;
}

.code-example h3 {
  margin: 2rem 0 1rem 0;
  color: #1f2937;
}

.code-example h3:first-child {
  margin-top: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

.code-block {
  background: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .demo-grid {
    margin-top: 2rem;
  }
  
  .demo-item {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>