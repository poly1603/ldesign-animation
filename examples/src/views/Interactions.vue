<template>
  <div class="interactions">
    <h1>Interactive Animations</h1>
    <p class="page-description">
      Create engaging user interactions with hover, click, drag, and gesture animations.
      Perfect for buttons, cards, forms, and interactive elements.
    </p>

    <!-- Hover Animations -->
    <div class="demo-section">
      <h2 class="demo-title">Hover Animations</h2>
      <p class="demo-description">
        Smooth hover effects that provide visual feedback and enhance user experience.
      </p>
      <div class="hover-demo">
        <div class="hover-grid">
          <div 
            v-for="(effect, index) in hoverEffects" 
            :key="index"
            class="hover-card"
            :class="effect.class"
            @mouseenter="onHover(index, true)"
            @mouseleave="onHover(index, false)"
          >
            <div class="hover-content">
              <div class="hover-icon">{{ effect.icon }}</div>
              <h3>{{ effect.title }}</h3>
              <p>{{ effect.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Click Animations -->
    <div class="demo-section">
      <h2 class="demo-title">Click Animations</h2>
      <p class="demo-description">
        Responsive click effects with ripples, bounces, and state changes.
      </p>
      <div class="click-demo">
        <div class="button-grid">
          <button 
            v-for="(button, index) in clickButtons" 
            :key="index"
            class="click-button"
            :class="[button.class, { active: button.active }]"
            @click="onClick(index)"
            @mousedown="onMouseDown(index)"
            @mouseup="onMouseUp(index)"
          >
            <span class="button-text">{{ button.text }}</span>
            <div class="ripple" v-if="button.showRipple"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Drag and Drop -->
    <div class="demo-section">
      <h2 class="demo-title">Drag &amp; Drop</h2>
      <p class="demo-description">
        Smooth drag interactions with visual feedback and drop zones.
      </p>
      <div class="drag-demo">
        <div class="drag-container">
          <div class="drag-source">
            <h3>Draggable Items</h3>
            <div 
              v-for="(item, index) in draggableItems" 
              :key="item.id"
              class="drag-item"
              :class="{ dragging: item.dragging }"
              draggable="true"
              @dragstart="onDragStart(index, $event)"
              @dragend="onDragEnd(index)"
            >
              <div class="drag-handle">⋮⋮</div>
              <span>{{ item.text }}</span>
            </div>
          </div>
          
          <div class="drop-zones">
            <div 
              v-for="(zone, index) in dropZones" 
              :key="index"
              class="drop-zone"
              :class="{ 
                'drag-over': zone.dragOver,
                'has-items': zone.items.length > 0
              }"
              @dragover.prevent="onDragOver(index)"
              @dragleave="onDragLeave(index)"
              @drop="onDrop(index, $event)"
            >
              <h4>{{ zone.title }}</h4>
              <div class="dropped-items">
                <div 
                  v-for="item in zone.items" 
                  :key="item.id"
                  class="dropped-item"
                >
                  {{ item.text }}
                </div>
              </div>
              <div class="drop-placeholder" v-if="zone.items.length === 0">
                Drop items here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gesture Animations -->
    <div class="demo-section">
      <h2 class="demo-title">Gesture Animations</h2>
      <p class="demo-description">
        Touch and mouse gestures with pinch, zoom, and swipe interactions.
      </p>
      <div class="gesture-demo">
        <div class="gesture-container">
          <div 
            ref="gestureElement"
            class="gesture-element"
            :style="gestureTransform"
            @mousedown="onGestureStart"
            @touchstart="onGestureStart"
          >
            <div class="gesture-content">
              <h3>Gesture Element</h3>
              <p>Drag, pinch, or scroll to interact</p>
              <div class="gesture-info">
                <div>Scale: {{ Math.round(gestureState.scale * 100) }}%</div>
                <div>Rotation: {{ Math.round(gestureState.rotation) }}°</div>
                <div>Position: {{ Math.round(gestureState.x) }}, {{ Math.round(gestureState.y) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gesture-controls">
          <button @click="resetGesture" class="btn btn-secondary">
            Reset Transform
          </button>
          <button @click="randomTransform" class="btn btn-primary">
            Random Transform
          </button>
        </div>
      </div>
    </div>

    <!-- Form Interactions -->
    <div class="demo-section">
      <h2 class="demo-title">Form Interactions</h2>
      <p class="demo-description">
        Animated form elements with focus states, validation, and feedback.
      </p>
      <div class="form-demo">
        <form class="animated-form" @submit.prevent="onSubmit">
          <div class="form-group">
            <div class="input-container">
              <input 
                v-model="formData.name"
                type="text" 
                id="name"
                class="form-input"
                :class="{ 
                  'has-value': formData.name,
                  'error': formErrors.name,
                  'success': formData.name && !formErrors.name
                }"
                @focus="onInputFocus('name')"
                @blur="onInputBlur('name')"
              >
              <label for="name" class="form-label">Full Name</label>
              <div class="input-line"></div>
            </div>
            <div class="error-message" v-if="formErrors.name">{{ formErrors.name }}</div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <input 
                v-model="formData.email"
                type="email" 
                id="email"
                class="form-input"
                :class="{ 
                  'has-value': formData.email,
                  'error': formErrors.email,
                  'success': formData.email && !formErrors.email
                }"
                @focus="onInputFocus('email')"
                @blur="onInputBlur('email')"
              >
              <label for="email" class="form-label">Email Address</label>
              <div class="input-line"></div>
            </div>
            <div class="error-message" v-if="formErrors.email">{{ formErrors.email }}</div>
          </div>

          <div class="form-group">
            <div class="input-container">
              <textarea 
                v-model="formData.message"
                id="message"
                class="form-input form-textarea"
                :class="{ 
                  'has-value': formData.message,
                  'error': formErrors.message,
                  'success': formData.message && !formErrors.message
                }"
                @focus="onInputFocus('message')"
                @blur="onInputBlur('message')"
                rows="4"
              ></textarea>
              <label for="message" class="form-label">Message</label>
              <div class="input-line"></div>
            </div>
            <div class="error-message" v-if="formErrors.message">{{ formErrors.message }}</div>
          </div>

          <button 
            type="submit" 
            class="submit-button"
            :class="{ 
              'loading': formState.loading,
              'success': formState.success,
              'error': formState.error
            }"
            :disabled="formState.loading"
          >
            <span class="button-content">
              <span v-if="!formState.loading && !formState.success && !formState.error">
                Send Message
              </span>
              <span v-if="formState.loading">
                <div class="loading-spinner"></div>
                Sending...
              </span>
              <span v-if="formState.success">
                ✓ Sent!
              </span>
              <span v-if="formState.error">
                ✗ Error
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>

    <!-- Loading Animations -->
    <div class="demo-section">
      <h2 class="demo-title">Loading Animations</h2>
      <p class="demo-description">
        Various loading states and progress indicators for better user feedback.
      </p>
      <div class="loading-demo">
        <div class="loading-grid">
          <div class="loading-card">
            <h3>Spinner</h3>
            <div class="spinner-container">
              <div class="spinner spinner-1"></div>
            </div>
          </div>
          
          <div class="loading-card">
            <h3>Dots</h3>
            <div class="dots-container">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
          
          <div class="loading-card">
            <h3>Progress Bar</h3>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progressValue + '%' }"></div>
              </div>
              <div class="progress-text">{{ progressValue }}%</div>
            </div>
          </div>
          
          <div class="loading-card">
            <h3>Skeleton</h3>
            <div class="skeleton-container">
              <div class="skeleton-line skeleton-title"></div>
              <div class="skeleton-line skeleton-text"></div>
              <div class="skeleton-line skeleton-text short"></div>
            </div>
          </div>
        </div>
        
        <div class="loading-controls">
          <button @click="startProgress" class="btn btn-primary">
            Start Progress
          </button>
          <button @click="resetProgress" class="btn btn-secondary">
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Code Example -->
    <div class="demo-section">
      <h2 class="demo-title">Code Example</h2>
      <div class="code-block">
        <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Hover Animation --&gt;
    &lt;div 
      class="hover-element"
      @mouseenter="onHover(true)"
      @mouseleave="onHover(false)"
    &gt;
      Hover me
    &lt;/div&gt;

    &lt;!-- Click Animation --&gt;
    &lt;button 
      class="click-button"
      @click="onClick"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    &gt;
      Click me
    &lt;/button&gt;

    &lt;!-- Drag and Drop --&gt;
    &lt;div 
      class="drag-item"
      draggable="true"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
    &gt;
      Drag me
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import { useHoverAnimation, useClickAnimation, useDragAnimation } from '@ldesign/animation'

const elementRef = ref()
const { onHover } = useHoverAnimation(elementRef)
const { onClick, onMouseDown, onMouseUp } = useClickAnimation(elementRef)
const { onDragStart, onDragEnd } = useDragAnimation(elementRef)

// Hover animation
const onHover = (isHover) =&gt; {
  if (isHover) {
    // Animate on hover
    elementRef.value.style.transform = 'scale(1.05) translateY(-5px)'
    elementRef.value.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
  } else {
    // Reset on leave
    elementRef.value.style.transform = 'scale(1) translateY(0)'
    elementRef.value.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'
  }
}

// Click animation with ripple effect
const onClick = (event) =&gt; {
  const ripple = document.createElement('div')
  ripple.className = 'ripple'
  
  const rect = event.target.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  
  event.target.appendChild(ripple)
  
  setTimeout(() =&gt; ripple.remove(), 600)
}
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useHoverAnimation, useClickAnimation, useDragAnimation } from '@ldesign/animation'

// Hover effects data
const hoverEffects = [
  { icon: '🎯', title: 'Scale', description: 'Smooth scaling effect', class: 'hover-scale' },
  { icon: '🌟', title: 'Glow', description: 'Glowing border effect', class: 'hover-glow' },
  { icon: '🎨', title: 'Color', description: 'Color transition', class: 'hover-color' },
  { icon: '📱', title: 'Flip', description: '3D flip animation', class: 'hover-flip' },
  { icon: '🚀', title: 'Lift', description: 'Lifting with shadow', class: 'hover-lift' },
  { icon: '💫', title: 'Rotate', description: 'Rotation effect', class: 'hover-rotate' }
]

// Click buttons data
const clickButtons = reactive([
  { text: 'Ripple', class: 'btn-ripple', active: false, showRipple: false },
  { text: 'Bounce', class: 'btn-bounce', active: false, showRipple: false },
  { text: 'Pulse', class: 'btn-pulse', active: false, showRipple: false },
  { text: 'Shake', class: 'btn-shake', active: false, showRipple: false }
])

// Drag and drop data
const draggableItems = reactive([
  { id: 1, text: 'Item 1', dragging: false },
  { id: 2, text: 'Item 2', dragging: false },
  { id: 3, text: 'Item 3', dragging: false },
  { id: 4, text: 'Item 4', dragging: false }
])

const dropZones = reactive([
  { title: 'Zone A', items: [], dragOver: false },
  { title: 'Zone B', items: [], dragOver: false },
  { title: 'Zone C', items: [], dragOver: false }
])

// Gesture state
const gestureElement = ref<HTMLElement>()
const gestureState = reactive({
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  isDragging: false,
  startX: 0,
  startY: 0
})

const gestureTransform = computed(() => {
  return {
    transform: `translate(${gestureState.x}px, ${gestureState.y}px) scale(${gestureState.scale}) rotate(${gestureState.rotation}deg)`
  }
})

// Form data
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const formErrors = reactive({
  name: '',
  email: '',
  message: ''
})

const formState = reactive({
  loading: false,
  success: false,
  error: false
})

// Loading progress
const progressValue = ref(0)
let progressInterval: number | null = null

// Hover animation handlers
const onHover = (index: number, isHover: boolean) => {
  // Handle hover animations based on effect type
  const effect = hoverEffects[index]
  console.log(`Hover ${effect.title}: ${isHover}`)
}

// Click animation handlers
const onClick = (index: number) => {
  const button = clickButtons[index]
  button.active = true
  
  if (button.class === 'btn-ripple') {
    button.showRipple = true
    setTimeout(() => {
      button.showRipple = false
    }, 600)
  }
  
  setTimeout(() => {
    button.active = false
  }, 300)
}

const onMouseDown = (index: number) => {
  clickButtons[index].active = true
}

const onMouseUp = (index: number) => {
  setTimeout(() => {
    clickButtons[index].active = false
  }, 150)
}

// Drag and drop handlers
let draggedItem: any = null

const onDragStart = (index: number, event: DragEvent) => {
  draggedItem = draggableItems[index]
  draggableItems[index].dragging = true
  
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', draggedItem.text)
  }
}

const onDragEnd = (index: number) => {
  draggableItems[index].dragging = false
  draggedItem = null
}

const onDragOver = (zoneIndex: number) => {
  dropZones[zoneIndex].dragOver = true
}

const onDragLeave = (zoneIndex: number) => {
  dropZones[zoneIndex].dragOver = false
}

const onDrop = (zoneIndex: number, event: DragEvent) => {
  event.preventDefault()
  dropZones[zoneIndex].dragOver = false
  
  if (draggedItem) {
    // Remove from other zones
    dropZones.forEach(zone => {
      zone.items = zone.items.filter(item => item.id !== draggedItem.id)
    })
    
    // Add to current zone
    dropZones[zoneIndex].items.push({ ...draggedItem })
  }
}

// Gesture handlers
const onGestureStart = (event: MouseEvent | TouchEvent) => {
  gestureState.isDragging = true
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  gestureState.startX = clientX - gestureState.x
  gestureState.startY = clientY - gestureState.y
  
  document.addEventListener('mousemove', onGestureMove)
  document.addEventListener('mouseup', onGestureEnd)
  document.addEventListener('touchmove', onGestureMove)
  document.addEventListener('touchend', onGestureEnd)
}

const onGestureMove = (event: MouseEvent | TouchEvent) => {
  if (!gestureState.isDragging) return
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  gestureState.x = clientX - gestureState.startX
  gestureState.y = clientY - gestureState.startY
}

const onGestureEnd = () => {
  gestureState.isDragging = false
  
  document.removeEventListener('mousemove', onGestureMove)
  document.removeEventListener('mouseup', onGestureEnd)
  document.removeEventListener('touchmove', onGestureMove)
  document.removeEventListener('touchend', onGestureEnd)
}

const resetGesture = () => {
  gestureState.x = 0
  gestureState.y = 0
  gestureState.scale = 1
  gestureState.rotation = 0
}

const randomTransform = () => {
  gestureState.x = (Math.random() - 0.5) * 200
  gestureState.y = (Math.random() - 0.5) * 200
  gestureState.scale = 0.5 + Math.random() * 1.5
  gestureState.rotation = Math.random() * 360
}

// Form handlers
const onInputFocus = (field: string) => {
  // Clear errors on focus
  formErrors[field as keyof typeof formErrors] = ''
}

const onInputBlur = (field: string) => {
  validateField(field)
}

const validateField = (field: string) => {
  const value = formData[field as keyof typeof formData]
  
  switch (field) {
    case 'name':
      if (!value.trim()) {
        formErrors.name = 'Name is required'
      } else if (value.trim().length < 2) {
        formErrors.name = 'Name must be at least 2 characters'
      } else {
        formErrors.name = ''
      }
      break
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        formErrors.email = 'Email is required'
      } else if (!emailRegex.test(value)) {
        formErrors.email = 'Please enter a valid email'
      } else {
        formErrors.email = ''
      }
      break
      
    case 'message':
      if (!value.trim()) {
        formErrors.message = 'Message is required'
      } else if (value.trim().length < 10) {
        formErrors.message = 'Message must be at least 10 characters'
      } else {
        formErrors.message = ''
      }
      break
  }
}

const onSubmit = () => {
  // Validate all fields
  Object.keys(formData).forEach(validateField)
  
  // Check if there are any errors
  const hasErrors = Object.values(formErrors).some(error => error !== '')
  
  if (!hasErrors) {
    formState.loading = true
    formState.success = false
    formState.error = false
    
    // Simulate API call
    setTimeout(() => {
      formState.loading = false
      
      if (Math.random() > 0.2) {
        formState.success = true
        // Reset form after success
        setTimeout(() => {
          formState.success = false
          Object.keys(formData).forEach(key => {
            formData[key as keyof typeof formData] = ''
          })
        }, 2000)
      } else {
        formState.error = true
        setTimeout(() => {
          formState.error = false
        }, 3000)
      }
    }, 2000)
  }
}

// Loading progress handlers
const startProgress = () => {
  if (progressInterval) return
  
  progressValue.value = 0
  progressInterval = setInterval(() => {
    progressValue.value += Math.random() * 10
    
    if (progressValue.value >= 100) {
      progressValue.value = 100
      clearInterval(progressInterval!)
      progressInterval = null
      
      setTimeout(() => {
        progressValue.value = 0
      }, 1000)
    }
  }, 200)
}

const resetProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  progressValue.value = 0
}

// Cleanup
onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
.interactions {
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

/* Hover Animations */
.hover-demo {
  margin: 2rem 0;
}

.hover-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.hover-card {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid transparent;
}

.hover-card.hover-scale:hover {
  transform: scale(1.05);
}

.hover-card.hover-glow:hover {
  border-color: #667eea;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
}

.hover-card.hover-color:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hover-card.hover-flip:hover {
  transform: rotateY(180deg);
}

.hover-card.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.hover-card.hover-rotate:hover {
  transform: rotate(5deg) scale(1.02);
}

.hover-content {
  transition: inherit;
}

.hover-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hover-card h3 {
  margin: 0.5rem 0;
  color: #1f2937;
}

.hover-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Click Animations */
.click-demo {
  margin: 2rem 0;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.click-button {
  position: relative;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  transform-origin: center;
}

.click-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.click-button.active.btn-bounce {
  animation: bounce 0.3s ease;
}

.click-button.active.btn-pulse {
  animation: pulse 0.3s ease;
}

.click-button.active.btn-shake {
  animation: shake 0.3s ease;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple-effect 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes bounce {
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

/* Drag and Drop */
.drag-demo {
  margin: 2rem 0;
}

.drag-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.drag-source {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 2px dashed #cbd5e1;
}

.drag-source h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.drag-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: all 0.2s ease;
}

.drag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.drag-item.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.drag-handle {
  color: #9ca3af;
  cursor: grab;
}

.drop-zones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.drop-zone {
  min-height: 200px;
  padding: 1rem;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.drop-zone.drag-over {
  border-color: #667eea;
  background: #f0f4ff;
}

.drop-zone.has-items {
  border-color: #10b981;
  background: #f0fdf4;
}

.drop-zone h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  text-align: center;
}

.dropped-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
}

.drop-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-style: italic;
}

/* Gesture Animations */
.gesture-demo {
  margin: 2rem 0;
}

.gesture-container {
  height: 400px;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 2px dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.gesture-element {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  cursor: grab;
  transition: transform 0.1s ease;
  user-select: none;
}

.gesture-element:active {
  cursor: grabbing;
}

.gesture-content {
  padding: 1rem;
  color: white;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gesture-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
}

.gesture-content p {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.gesture-info {
  font-size: 0.75rem;
  opacity: 0.8;
}

.gesture-info div {
  margin: 0.125rem 0;
}

.gesture-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

/* Form Interactions */
.form-demo {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.animated-form {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 2rem;
}

.input-container {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem 0 0.5rem 0;
  border: none;
  border-bottom: 2px solid #e5e7eb;
  background: transparent;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-bottom-color: #667eea;
}

.form-input.error {
  border-bottom-color: #ef4444;
}

.form-input.success {
  border-bottom-color: #10b981;
}

.form-label {
  position: absolute;
  left: 0;
  top: 1rem;
  color: #9ca3af;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

.form-input:focus + .form-label,
.form-input.has-value + .form-label {
  top: 0;
  font-size: 0.75rem;
  color: #667eea;
}

.form-input.error + .form-label {
  color: #ef4444;
}

.form-input.success + .form-label {
  color: #10b981;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.form-input:focus ~ .input-line {
  width: 100%;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.submit-button.loading {
  background: #9ca3af;
}

.submit-button.success {
  background: #10b981;
}

.submit-button.error {
  background: #ef4444;
  animation: shake 0.5s ease;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Loading Animations */
.loading-demo {
  margin: 2rem 0;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.loading-card {
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.loading-card h3 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
}

.spinner-container {
  display: flex;
  justify-content: center;
}

.spinner-1 {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dots-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  animation: dot-bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.progress-container {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
}

.skeleton-container {
  text-align: left;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-title {
  height: 20px;
  width: 60%;
}

.skeleton-text {
  width: 100%;
}

.skeleton-text.short {
  width: 75%;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.loading-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .interactions {
    padding: 1rem;
  }
  
  .hover-grid,
  .button-grid,
  .loading-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .drag-container {
    grid-template-columns: 1fr;
  }
  
  .drop-zones {
    grid-template-columns: 1fr;
  }
  
  .gesture-element {
    width: 150px;
    height: 150px;
  }
  
  .animated-form {
    padding: 1.5rem;
  }
}
</style>