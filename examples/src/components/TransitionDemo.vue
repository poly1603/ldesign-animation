<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransition, usePageTransition, useListTransition } from '@ldesign/animation'

// 组件状态
const isVisible = ref(false)
const showModal = ref(false)
const currentPage = ref('page1')
const listItems = ref([
  { id: 1, text: '列表项 1', color: '#3b82f6' },
  { id: 2, text: '列表项 2', color: '#10b981' },
  { id: 3, text: '列表项 3', color: '#f59e0b' },
  { id: 4, text: '列表项 4', color: '#ef4444' }
])

// 过渡动画配置
const { transitionProps: modalTransition } = useTransition({
  name: 'modal',
  duration: 300,
  enterFrom: { opacity: 0, transform: 'scale(0.9)' },
  enterTo: { opacity: 1, transform: 'scale(1)' },
  leaveFrom: { opacity: 1, transform: 'scale(1)' },
  leaveTo: { opacity: 0, transform: 'scale(0.9)' }
})

const { transitionProps: pageTransition } = usePageTransition({
  name: 'page',
  mode: 'out-in',
  duration: 400
})

const { transitionProps: listTransition } = useListTransition({
  name: 'list',
  tag: 'div'
})

// 控制函数
const toggleModal = () => {
  showModal.value = !showModal.value
}

const switchPage = (page: string) => {
  currentPage.value = page
}

const addListItem = () => {
  const colors = ['#8b5cf6', '#06b6d4', '#84cc16', '#f97316']
  const newId = Math.max(...listItems.value.map(item => item.id)) + 1
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  listItems.value.push({
    id: newId,
    text: `列表项 ${newId}`,
    color: randomColor
  })
}

const removeListItem = (id: number) => {
  const index = listItems.value.findIndex(item => item.id === id)
  if (index > -1) {
    listItems.value.splice(index, 1)
  }
}

const shuffleList = () => {
  listItems.value = [...listItems.value].sort(() => Math.random() - 0.5)
}

// 代码示例
const codeExamples = {
  modal: `// 模态框过渡
const { transitionProps } = useTransition({
  name: 'modal',
  duration: 300,
  enterFrom: { opacity: 0, transform: 'scale(0.9)' },
  enterTo: { opacity: 1, transform: 'scale(1)' },
  leaveFrom: { opacity: 1, transform: 'scale(1)' },
  leaveTo: { opacity: 0, transform: 'scale(0.9)' }
})

<Transition v-bind="transitionProps">
  <div v-if="showModal" class="modal">
    <!-- 模态框内容 -->
  </div>
</Transition>`,
  page: `// 页面切换过渡
const { transitionProps } = usePageTransition({
  name: 'page',
  mode: 'out-in',
  duration: 400
})

<Transition v-bind="transitionProps">
  <component :is="currentPage" :key="currentPage" />
</Transition>`,
  list: `// 列表过渡
const { transitionProps } = useListTransition({
  name: 'list',
  tag: 'div'
})

<TransitionGroup v-bind="transitionProps">
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
</TransitionGroup>`
}

const currentCode = ref(codeExamples.modal)
const activeDemo = ref('modal')

const showCode = (type: keyof typeof codeExamples) => {
  currentCode.value = codeExamples[type]
  activeDemo.value = type
}

// 页面组件
const pages = {
  page1: {
    title: '页面 1',
    content: '这是第一个页面的内容，展示了页面切换的过渡效果。',
    color: '#3b82f6'
  },
  page2: {
    title: '页面 2', 
    content: '这是第二个页面的内容，注意页面之间的平滑过渡。',
    color: '#10b981'
  },
  page3: {
    title: '页面 3',
    content: '这是第三个页面的内容，展示了不同的过渡动画效果。',
    color: '#f59e0b'
  }
}

// 组件挂载
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section id="transition" class="transition-demo-section">
    <div class="section-header" :class="{ 'is-visible': isVisible }">
      <h2 class="section-title">过渡效果演示</h2>
      <p class="section-description">
        探索各种过渡效果，包括模态框、页面切换和列表动画，让界面交互更加流畅自然。
      </p>
    </div>
    
    <div class="demo-grid" :class="{ 'is-visible': isVisible }">
      <!-- 模态框过渡演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>模态框过渡</h3>
          <button 
            @click="showCode('modal')"
            class="code-btn"
            :class="{ active: activeDemo === 'modal' }"
          >
            查看代码
          </button>
        </div>
        
        <div class="demo-content">
          <button @click="toggleModal" class="demo-trigger-btn">
            {{ showModal ? '关闭模态框' : '打开模态框' }}
          </button>
          
          <!-- 模态框遮罩 -->
          <Transition
            name="modal-backdrop"
            enter-active-class="backdrop-enter-active"
            leave-active-class="backdrop-leave-active"
            enter-from-class="backdrop-enter-from"
            leave-to-class="backdrop-leave-to"
          >
            <div v-if="showModal" class="modal-backdrop" @click="toggleModal">
              <!-- 模态框 -->
              <Transition v-bind="modalTransition">
                <div v-if="showModal" class="modal" @click.stop>
                  <div class="modal-header">
                    <h4>演示模态框</h4>
                    <button @click="toggleModal" class="modal-close">&times;</button>
                  </div>
                  <div class="modal-body">
                    <p>这是一个带有过渡动画的模态框示例。</p>
                    <p>注意打开和关闭时的缩放和透明度变化。</p>
                  </div>
                  <div class="modal-footer">
                    <button @click="toggleModal" class="btn btn-primary">确定</button>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </div>
      </div>
      
      <!-- 页面切换过渡演示 -->
      <div class="demo-card">
        <div class="demo-header">
          <h3>页面切换过渡</h3>
          <button 
            @click="showCode('page')"
            class="code-btn"
            :class="{ active: activeDemo === 'page' }"
          >
            查看代码
          </button>
        </div>
        
        <div class="demo-content">
          <div class="page-tabs">
            <button 
              v-for="(page, key) in pages" 
              :key="key"
              @click="switchPage(key)"
              class="page-tab"
              :class="{ active: currentPage === key }"
            >
              {{ page.title }}
            </button>
          </div>
          
          <div class="page-container">
            <Transition v-bind="pageTransition">
              <div 
                :key="currentPage" 
                class="page-content"
                :style="{ backgroundColor: pages[currentPage as keyof typeof pages].color }"
              >
                <h4>{{ pages[currentPage as keyof typeof pages].title }}</h4>
                <p>{{ pages[currentPage as keyof typeof pages].content }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      
      <!-- 列表过渡演示 -->
      <div class="demo-card full-width">
        <div class="demo-header">
          <h3>列表过渡动画</h3>
          <button 
            @click="showCode('list')"
            class="code-btn"
            :class="{ active: activeDemo === 'list' }"
          >
            查看代码
          </button>
        </div>
        
        <div class="demo-content">
          <div class="list-controls">
            <button @click="addListItem" class="control-btn add-btn">
              添加项目
            </button>
            <button @click="shuffleList" class="control-btn shuffle-btn">
              随机排序
            </button>
          </div>
          
          <div class="list-container">
            <TransitionGroup v-bind="listTransition" class="list-grid">
              <div 
                v-for="item in listItems" 
                :key="item.id"
                class="list-item"
                :style="{ backgroundColor: item.color }"
              >
                <span class="item-text">{{ item.text }}</span>
                <button 
                  @click="removeListItem(item.id)"
                  class="item-remove"
                >
                  &times;
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 代码展示区域 -->
    <div class="code-section" :class="{ 'is-visible': isVisible }">
      <div class="code-display">
        <div class="code-header">
          <h3>代码示例</h3>
          <span class="code-language">Vue 3 + TypeScript</span>
        </div>
        <pre class="code-block"><code>{{ currentCode }}</code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-demo-section {
  padding: var(--space-2xl) 0;
  background-color: var(--color-bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.2s;
}

.demo-grid.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.demo-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.demo-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.demo-card.full-width {
  grid-column: 1 / -1;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.demo-header h3 {
  margin: 0;
  font-size: var(--text-xl);
  color: var(--color-text-primary);
}

.code-btn {
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.code-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.code-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.demo-content {
  min-height: 200px;
}

/* 模态框样式 */
.demo-trigger-btn {
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-base);
  transition: all var(--transition-normal);
}

.demo-trigger-btn:hover {
  background-color: var(--color-primary);
  transform: translateY(-1px);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h4 {
  margin: 0;
  color: var(--color-text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--text-2xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: var(--space-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.modal-footer {
  padding: var(--space-lg);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
}

/* 页面切换样式 */
.page-tabs {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.page-tab {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.page-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-tab.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.page-container {
  position: relative;
  min-height: 150px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.page-content {
  padding: var(--space-lg);
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-content h4 {
  margin: 0 0 var(--space-md) 0;
  font-size: var(--text-lg);
}

.page-content p {
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
}

/* 列表过渡样式 */
.list-controls {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.control-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all var(--transition-normal);
}

.add-btn {
  background-color: var(--color-success);
  color: white;
}

.shuffle-btn {
  background-color: var(--color-info);
  color: white;
}

.control-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.list-container {
  min-height: 200px;
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
}

.list-item {
  padding: var(--space-md);
  border-radius: var(--radius-md);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.item-text {
  font-weight: 500;
}

.item-remove {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-lg);
  transition: all var(--transition-normal);
}

.item-remove:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 代码展示 */
.code-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.code-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.code-display {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
}

.code-header h3 {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
}

.code-language {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

.code-block {
  margin: 0;
  padding: var(--space-lg);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--text-sm);
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

/* 过渡动画定义 */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.list-move {
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .demo-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}

@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
  }
  
  .page-tabs {
    flex-wrap: wrap;
  }
  
  .list-controls {
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .control-btn {
    width: 100%;
  }
  
  .list-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .modal {
    width: 95%;
    margin: var(--space-md);
  }
  
  .code-block {
    font-size: var(--text-xs);
    padding: var(--space-md);
  }
}
</style>