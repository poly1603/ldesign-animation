<template>
  <div class="basic-animations">
    <div class="page-header">
      <h1 class="page-title">基础动画</h1>
      <p class="page-description">
        展示常用的基础动画效果，包括淡入淡出、滑动、缩放和旋转动画。
      </p>
    </div>

    <!-- 淡入淡出动画 -->
    <section class="animation-section">
      <h2 class="section-title">淡入淡出动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>淡入 (Fade In)</h3>
          <div class="demo-area">
            <div ref="fadeInRef" class="demo-box">淡入</div>
          </div>
          <button @click="playFadeIn" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>淡出 (Fade Out)</h3>
          <div class="demo-area">
            <div ref="fadeOutRef" class="demo-box">淡出</div>
          </div>
          <button @click="playFadeOut" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>淡入淡出切换</h3>
          <div class="demo-area">
            <div ref="fadeToggleRef" class="demo-box">切换</div>
          </div>
          <button @click="playFadeToggle" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 滑动动画 -->
    <section class="animation-section">
      <h2 class="section-title">滑动动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>从左滑入</h3>
          <div class="demo-area">
            <div ref="slideLeftRef" class="demo-box">从左滑入</div>
          </div>
          <button @click="playSlideLeft" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>从右滑入</h3>
          <div class="demo-area">
            <div ref="slideRightRef" class="demo-box">从右滑入</div>
          </div>
          <button @click="playSlideRight" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>从上滑入</h3>
          <div class="demo-area">
            <div ref="slideUpRef" class="demo-box">从上滑入</div>
          </div>
          <button @click="playSlideUp" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>从下滑入</h3>
          <div class="demo-area">
            <div ref="slideDownRef" class="demo-box">从下滑入</div>
          </div>
          <button @click="playSlideDown" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 缩放动画 -->
    <section class="animation-section">
      <h2 class="section-title">缩放动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>放大 (Scale In)</h3>
          <div class="demo-area">
            <div ref="scaleInRef" class="demo-box">放大</div>
          </div>
          <button @click="playScaleIn" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>缩小 (Scale Out)</h3>
          <div class="demo-area">
            <div ref="scaleOutRef" class="demo-box">缩小</div>
          </div>
          <button @click="playScaleOut" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>弹性缩放</h3>
          <div class="demo-area">
            <div ref="scaleBounceRef" class="demo-box">弹性</div>
          </div>
          <button @click="playScaleBounce" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 旋转动画 -->
    <section class="animation-section">
      <h2 class="section-title">旋转动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>顺时针旋转</h3>
          <div class="demo-area">
            <div ref="rotateClockwiseRef" class="demo-box">🔄</div>
          </div>
          <button @click="playRotateClockwise" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>逆时针旋转</h3>
          <div class="demo-area">
            <div ref="rotateCounterRef" class="demo-box">🔄</div>
          </div>
          <button @click="playRotateCounter" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>翻转动画</h3>
          <div class="demo-area">
            <div ref="flipRef" class="demo-box">翻转</div>
          </div>
          <button @click="playFlip" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 组合动画 -->
    <section class="animation-section">
      <h2 class="section-title">组合动画</h2>
      <div class="demo-grid">
        <div class="demo-card">
          <h3>淡入 + 放大</h3>
          <div class="demo-area">
            <div ref="fadeScaleRef" class="demo-box">组合1</div>
          </div>
          <button @click="playFadeScale" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>滑入 + 旋转</h3>
          <div class="demo-area">
            <div ref="slideRotateRef" class="demo-box">组合2</div>
          </div>
          <button @click="playSlideRotate" class="demo-btn">播放动画</button>
        </div>

        <div class="demo-card">
          <h3>全部效果</h3>
          <div class="demo-area">
            <div ref="allEffectsRef" class="demo-box">全部</div>
          </div>
          <button @click="playAllEffects" class="demo-btn">播放动画</button>
        </div>
      </div>
    </section>

    <!-- 批量动画 -->
    <section class="animation-section">
      <h2 class="section-title">批量动画</h2>
      <div class="batch-demo">
        <div class="batch-grid">
          <div 
            v-for="(item, index) in batchItems" 
            :key="index"
            :ref="el => batchRefs[index] = el"
            class="batch-item"
          >
            {{ item }}
          </div>
        </div>
        <div class="batch-controls">
          <button @click="playBatchStagger" class="demo-btn">错位动画</button>
          <button @click="playBatchWave" class="demo-btn">波浪动画</button>
          <button @click="playBatchRandom" class="demo-btn">随机动画</button>
          <button @click="resetBatch" class="demo-btn demo-btn-secondary">重置</button>
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
const fadeInRef = ref<HTMLElement>()
const fadeOutRef = ref<HTMLElement>()
const fadeToggleRef = ref<HTMLElement>()
const slideLeftRef = ref<HTMLElement>()
const slideRightRef = ref<HTMLElement>()
const slideUpRef = ref<HTMLElement>()
const slideDownRef = ref<HTMLElement>()
const scaleInRef = ref<HTMLElement>()
const scaleOutRef = ref<HTMLElement>()
const scaleBounceRef = ref<HTMLElement>()
const rotateClockwiseRef = ref<HTMLElement>()
const rotateCounterRef = ref<HTMLElement>()
const flipRef = ref<HTMLElement>()
const fadeScaleRef = ref<HTMLElement>()
const slideRotateRef = ref<HTMLElement>()
const allEffectsRef = ref<HTMLElement>()

// 批量动画
const batchItems = ['🎯', '⚡', '🎨', '🚀', '✨', '🎪', '🎭', '⭐', '🎵']
const batchRefs = ref<(HTMLElement | null)[]>([])

// 淡入淡出动画
const playFadeIn = () => {
  if (fadeInRef.value) {
    fadeInRef.value.style.opacity = '0'
    animationManager.createAnimation(fadeInRef.value, {
      type: 'fadeIn',
      duration: 600,
      easing: 'ease-out'
    }).play()
  }
}

const playFadeOut = () => {
  if (fadeOutRef.value) {
    fadeOutRef.value.style.opacity = '1'
    animationManager.createAnimation(fadeOutRef.value, {
      type: 'fadeOut',
      duration: 600,
      easing: 'ease-in'
    }).play()
  }
}

const playFadeToggle = () => {
  if (fadeToggleRef.value) {
    const isVisible = fadeToggleRef.value.style.opacity !== '0'
    animationManager.createAnimation(fadeToggleRef.value, {
      type: isVisible ? 'fadeOut' : 'fadeIn',
      duration: 400,
      easing: 'ease-in-out'
    }).play()
  }
}

// 滑动动画
const playSlideLeft = () => {
  if (slideLeftRef.value) {
    slideLeftRef.value.style.transform = 'translateX(-100px)'
    slideLeftRef.value.style.opacity = '0'
    animationManager.createAnimation(slideLeftRef.value, {
      type: 'slideIn',
      direction: 'left',
      duration: 500,
      easing: 'ease-out'
    }).play()
  }
}

const playSlideRight = () => {
  if (slideRightRef.value) {
    slideRightRef.value.style.transform = 'translateX(100px)'
    slideRightRef.value.style.opacity = '0'
    animationManager.createAnimation(slideRightRef.value, {
      type: 'slideIn',
      direction: 'right',
      duration: 500,
      easing: 'ease-out'
    }).play()
  }
}

const playSlideUp = () => {
  if (slideUpRef.value) {
    slideUpRef.value.style.transform = 'translateY(-50px)'
    slideUpRef.value.style.opacity = '0'
    animationManager.createAnimation(slideUpRef.value, {
      type: 'slideIn',
      direction: 'up',
      duration: 500,
      easing: 'ease-out'
    }).play()
  }
}

const playSlideDown = () => {
  if (slideDownRef.value) {
    slideDownRef.value.style.transform = 'translateY(50px)'
    slideDownRef.value.style.opacity = '0'
    animationManager.createAnimation(slideDownRef.value, {
      type: 'slideIn',
      direction: 'down',
      duration: 500,
      easing: 'ease-out'
    }).play()
  }
}

// 缩放动画
const playScaleIn = () => {
  if (scaleInRef.value) {
    scaleInRef.value.style.transform = 'scale(0)'
    scaleInRef.value.style.opacity = '0'
    animationManager.createAnimation(scaleInRef.value, {
      type: 'scaleIn',
      duration: 500,
      easing: 'ease-out'
    }).play()
  }
}

const playScaleOut = () => {
  if (scaleOutRef.value) {
    scaleOutRef.value.style.transform = 'scale(1)'
    scaleOutRef.value.style.opacity = '1'
    animationManager.createAnimation(scaleOutRef.value, {
      type: 'scaleOut',
      duration: 500,
      easing: 'ease-in'
    }).play()
  }
}

const playScaleBounce = () => {
  if (scaleBounceRef.value) {
    scaleBounceRef.value.style.transform = 'scale(0)'
    animationManager.createAnimation(scaleBounceRef.value, {
      type: 'scaleBounce',
      duration: 800,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }).play()
  }
}

// 旋转动画
const playRotateClockwise = () => {
  if (rotateClockwiseRef.value) {
    animationManager.createAnimation(rotateClockwiseRef.value, {
      type: 'rotate',
      rotation: 360,
      duration: 800,
      easing: 'ease-in-out'
    }).play()
  }
}

const playRotateCounter = () => {
  if (rotateCounterRef.value) {
    animationManager.createAnimation(rotateCounterRef.value, {
      type: 'rotate',
      rotation: -360,
      duration: 800,
      easing: 'ease-in-out'
    }).play()
  }
}

const playFlip = () => {
  if (flipRef.value) {
    animationManager.createAnimation(flipRef.value, {
      type: 'flip',
      duration: 600,
      easing: 'ease-in-out'
    }).play()
  }
}

// 组合动画
const playFadeScale = () => {
  if (fadeScaleRef.value) {
    fadeScaleRef.value.style.opacity = '0'
    fadeScaleRef.value.style.transform = 'scale(0)'
    
    animationManager.createAnimation(fadeScaleRef.value, {
      type: 'custom',
      keyframes: [
        { opacity: 0, transform: 'scale(0)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      duration: 600,
      easing: 'ease-out'
    }).play()
  }
}

const playSlideRotate = () => {
  if (slideRotateRef.value) {
    slideRotateRef.value.style.transform = 'translateX(-100px) rotate(-180deg)'
    slideRotateRef.value.style.opacity = '0'
    
    animationManager.createAnimation(slideRotateRef.value, {
      type: 'custom',
      keyframes: [
        { opacity: 0, transform: 'translateX(-100px) rotate(-180deg)' },
        { opacity: 1, transform: 'translateX(0) rotate(0deg)' }
      ],
      duration: 800,
      easing: 'ease-out'
    }).play()
  }
}

const playAllEffects = () => {
  if (allEffectsRef.value) {
    allEffectsRef.value.style.opacity = '0'
    allEffectsRef.value.style.transform = 'translateY(50px) scale(0.5) rotate(-90deg)'
    
    animationManager.createAnimation(allEffectsRef.value, {
      type: 'custom',
      keyframes: [
        { 
          opacity: 0, 
          transform: 'translateY(50px) scale(0.5) rotate(-90deg)' 
        },
        { 
          opacity: 0.5, 
          transform: 'translateY(25px) scale(0.8) rotate(-45deg)' 
        },
        { 
          opacity: 1, 
          transform: 'translateY(0) scale(1) rotate(0deg)' 
        }
      ],
      duration: 1000,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }).play()
  }
}

// 批量动画
const playBatchStagger = () => {
  batchRefs.value.forEach((el, index) => {
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'custom',
          keyframes: [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          duration: 400,
          easing: 'ease-out'
        }).play()
      }, index * 100)
    }
  })
}

const playBatchWave = () => {
  batchRefs.value.forEach((el, index) => {
    if (el) {
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: 'custom',
          keyframes: [
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(-20px) scale(1.1)' },
            { transform: 'translateY(0) scale(1)' }
          ],
          duration: 500,
          easing: 'ease-in-out'
        }).play()
      }, index * 80)
    }
  })
}

const playBatchRandom = () => {
  batchRefs.value.forEach((el, index) => {
    if (el) {
      const animations = ['bounce', 'shake', 'pulse', 'swing']
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      
      setTimeout(() => {
        animationManager.createAnimation(el, {
          type: randomAnimation,
          duration: 600,
          easing: 'ease-in-out'
        }).play()
      }, Math.random() * 500)
    }
  })
}

const resetBatch = () => {
  batchRefs.value.forEach(el => {
    if (el) {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
  })
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
.basic-animations {
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

.batch-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.batch-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.batch-item {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.batch-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.batch-controls .demo-btn {
  width: auto;
  min-width: 120px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .batch-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 240px;
  }
  
  .batch-item {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .batch-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .batch-controls .demo-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>