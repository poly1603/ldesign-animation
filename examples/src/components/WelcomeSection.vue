<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 动画状态
const isVisible = ref(false)
const heroRef = ref<HTMLElement>()

// 特性列表
const features = [
  {
    icon: '🚀',
    title: '高性能',
    description: '基于 Web Animations API，提供流畅的动画体验'
  },
  {
    icon: '🎨',
    title: '丰富的动画类型',
    description: '支持 CSS 动画、JS 动画、过渡效果和复杂序列'
  },
  {
    icon: '⚡',
    title: 'Vue 3 深度集成',
    description: '提供组合式函数和组件，完美融入 Vue 3 生态'
  },
  {
    icon: '🔧',
    title: 'TypeScript 支持',
    description: '完整的类型定义，提供优秀的开发体验'
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '支持移动端和桌面端，适配各种屏幕尺寸'
  },
  {
    icon: '🎯',
    title: '易于使用',
    description: '简洁的 API 设计，快速上手，轻松实现复杂动画'
  }
]

// 组件挂载后启动动画
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section id="welcome" class="welcome-section">
    <div class="hero" ref="heroRef" :class="{ 'is-visible': isVisible }">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">@ldesign/animation</span>
          <span class="title-line">高性能动画库</span>
        </h1>
        <p class="hero-description">
          为 Vue 3 应用提供强大的动画解决方案，支持 CSS 动画、JavaScript 动画、过渡效果和复杂动画序列。
          基于现代 Web 标准，提供流畅的用户体验。
        </p>
        <div class="hero-actions">
          <a href="#animation" class="btn btn-primary">
            开始体验
          </a>
          <a href="https://github.com/ldesign/animation" target="_blank" class="btn btn-secondary">
            查看源码
          </a>
        </div>
      </div>
      
      <!-- 动画演示区域 -->
      <div class="hero-demo">
        <div class="demo-container">
          <div class="floating-box box-1">🎬</div>
          <div class="floating-box box-2">✨</div>
          <div class="floating-box box-3">🚀</div>
          <div class="floating-box box-4">🎨</div>
        </div>
      </div>
    </div>
    
    <!-- 特性展示 -->
    <div class="features" :class="{ 'is-visible': isVisible }">
      <h2 class="features-title">核心特性</h2>
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
          :style="{ '--delay': `${index * 100}ms` }"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  padding: var(--space-2xl) 0;
  background: linear-gradient(135deg, 
    var(--color-bg-primary) 0%, 
    var(--color-bg-secondary) 100%);
  overflow: hidden;
  position: relative;
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.hero.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-content {
  z-index: 2;
  position: relative;
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
}

.title-line {
  display: block;
  background: linear-gradient(135deg, var(--color-primary), var(--color-info));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.hero-demo {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.floating-box {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-info));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  color: white;
  box-shadow: var(--shadow-lg);
  animation: float 3s ease-in-out infinite;
}

.box-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.box-2 {
  top: 20%;
  right: 20%;
  animation-delay: 0.5s;
}

.box-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 1s;
}

.box-4 {
  bottom: 20%;
  right: 20%;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
  }
}

.features {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.3s;
}

.features.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.features-title {
  text-align: center;
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.feature-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease forwards;
  animation-delay: var(--delay);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-icon {
  font-size: var(--text-4xl);
  margin-bottom: var(--space-md);
  display: block;
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    text-align: center;
  }
  
  .hero-demo {
    height: 300px;
  }
  
  .demo-container {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .welcome-section {
    padding: var(--space-xl) 0;
  }
  
  .hero-title {
    font-size: var(--text-3xl);
  }
  
  .hero-description {
    font-size: var(--text-base);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  
  .feature-card {
    padding: var(--space-lg);
  }
  
  .floating-box {
    width: 50px;
    height: 50px;
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>