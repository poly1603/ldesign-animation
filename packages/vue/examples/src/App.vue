<script setup lang="ts">
import { ref } from 'vue'

const currentDemo = ref<string>('basic')

const demos = [
  { id: 'basic', name: '基础动画', icon: '🎯' },
  { id: 'composables', name: '组合式函数', icon: '🪝' },
  { id: 'directives', name: '指令动画', icon: '🎨' },
  { id: 'timeline', name: '时间轴', icon: '⏱️' },
  { id: 'physics', name: '物理动画', icon: '🎪' },
  { id: 'scroll', name: '滚动动画', icon: '📜' },
  { id: 'gesture', name: '手势动画', icon: '🖱️' },
]
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>🎨 @ldesign/animation-vue</h1>
      <p>Vue 3 动画集成演示</p>
    </header>

    <div class="container">
      <!-- 侧边栏导航 -->
      <aside class="sidebar">
        <nav class="nav">
          <button
            v-for="demo in demos"
            :key="demo.id"
            :class="['nav-item', { active: currentDemo === demo.id }]"
            @click="currentDemo = demo.id"
          >
            <span class="icon">{{ demo.icon }}</span>
            <span class="text">{{ demo.name }}</span>
          </button>
        </nav>
      </aside>

      <!-- 主内容区 -->
      <main class="main">
        <!-- 基础动画演示 -->
        <section v-if="currentDemo === 'basic'" class="demo-section">
          <h2>🎯 基础动画</h2>
          <p class="desc">使用 Motion 组件创建基础动画效果</p>
          
          <div class="demo-box">
            <div class="animated-box">
              点击我
            </div>
            <div class="controls">
              <button class="btn">播放动画</button>
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;Motion
  :initial="{ opacity: 0, y: 50 }"
  :animate="{ opacity: 1, y: 0 }"
  :transition="{ duration: 1000 }"
&gt;
  &lt;div&gt;动画内容&lt;/div&gt;
&lt;/Motion&gt;</code></pre>
          </div>
        </section>

        <!-- 组合式函数演示 -->
        <section v-if="currentDemo === 'composables'" class="demo-section">
          <h2>🪝 组合式函数</h2>
          <p class="desc">使用 useAnimate 创建可控动画</p>
          
          <div class="demo-box">
            <div class="animated-box">
              动画元素
            </div>
            <div class="controls">
              <button class="btn">播放</button>
              <button class="btn">暂停</button>
              <button class="btn">重播</button>
            </div>
          </div>

          <div class="code-block">
            <pre><code>const target = ref&lt;HTMLElement&gt;()
const { play, pause, restart } = useAnimate(target, {
  translateX: 250,
  rotate: 360,
  duration: 1000
})</code></pre>
          </div>
        </section>

        <!-- 指令演示 -->
        <section v-if="currentDemo === 'directives'" class="demo-section">
          <h2>🎨 指令动画</h2>
          <p class="desc">使用 v-animate 指令快速添加动画</p>
          
          <div class="demo-box">
            <div class="animated-box">
              使用指令的动画
            </div>
          </div>

          <div class="code-block">
            <pre><code>&lt;div
  v-animate="{
    translateX: 250,
    rotate: 360,
    duration: 1000
  }"
&gt;
  动画元素
&lt;/div&gt;</code></pre>
          </div>
        </section>

        <!-- 时间轴演示 -->
        <section v-if="currentDemo === 'timeline'" class="demo-section">
          <h2>⏱️ 时间轴动画</h2>
          <p class="desc">创建复杂的动画序列</p>
          
          <div class="demo-box">
            <div class="timeline-boxes">
              <div class="animated-box small">1</div>
              <div class="animated-box small">2</div>
              <div class="animated-box small">3</div>
            </div>
            <div class="controls">
              <button class="btn">播放时间轴</button>
            </div>
          </div>

          <div class="code-block">
            <pre><code>const { timeline } = useTimeline()

timeline
  .add(box1, { x: 100, duration: 1000 })
  .add(box2, { y: 100, duration: 1000 }, '-=500')
  .add(box3, { rotate: 360, duration: 1000 })

timeline.play()</code></pre>
          </div>
        </section>

        <!-- 物理动画演示 -->
        <section v-if="currentDemo === 'physics'" class="demo-section">
          <h2>🎪 物理动画</h2>
          <p class="desc">真实的弹簧物理效果</p>
          
          <div class="demo-box">
            <div class="animated-box">
              弹簧效果
            </div>
            <div class="controls">
              <button class="btn">触发物理动画</button>
            </div>
          </div>

          <div class="code-block">
            <pre><code>const { trigger } = useSpring(target, {
  stiffness: 200,
  damping: 10,
  mass: 1
})

trigger({ x: 250, y: 100 })</code></pre>
          </div>
        </section>

        <!-- 滚动动画演示 -->
        <section v-if="currentDemo === 'scroll'" class="demo-section">
          <h2>📜 滚动动画</h2>
          <p class="desc">滚动触发动画效果</p>
          
          <div class="scroll-demo">
            <div class="scroll-content">
              <p>向下滚动查看效果...</p>
            </div>
            <div class="scroll-item">项目 1</div>
            <div class="scroll-item">项目 2</div>
            <div class="scroll-item">项目 3</div>
          </div>

          <div class="code-block">
            <pre><code>const { progress, isInView } = useScroll({
  trigger: section,
  start: 'top center',
  end: 'bottom center'
})</code></pre>
          </div>
        </section>

        <!-- 手势动画演示 -->
        <section v-if="currentDemo === 'gesture'" class="demo-section">
          <h2>🖱️ 手势动画</h2>
          <p class="desc">拖拽、缩放、旋转</p>
          
          <div class="demo-box gesture-demo">
            <div class="animated-box draggable">
              拖拽我
            </div>
          </div>

          <div class="code-block">
            <pre><code>useGesture(box, {
  drag: {
    bounds: 'parent',
    inertia: true,
    onDrag: (state) => {
      console.log(state.offset)
    }
  }
})</code></pre>
          </div>
        </section>

        <!-- 提示信息 -->
        <div class="info-box">
          <p>💡 <strong>提示：</strong>当前为演示界面框架</p>
          <p>实际动画功能需要实现 @ldesign/animation-vue 的具体代码后才能正常工作</p>
          <p>查看 README.md 了解详细的 API 文档</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.header h1 {
  font-size: 48px;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.header p {
  font-size: 18px;
  opacity: 0.9;
}

.container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
}

/* 侧边栏 */
.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.nav {
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 20px;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 5px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: #f5f5f5;
  transform: translateX(5px);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.nav-item .icon {
  font-size: 20px;
}

/* 主内容区 */
.main {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.demo-section h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #667eea;
}

.desc {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.demo-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 30px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.animated-box {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.animated-box:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.animated-box.small {
  width: 80px;
  height: 80px;
  font-size: 24px;
}

.timeline-boxes {
  display: flex;
  gap: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.code-block {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre;
}

.scroll-demo {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.scroll-content {
  padding: 40px;
  text-align: center;
  color: #666;
}

.scroll-item {
  background: white;
  padding: 30px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 600;
}

.gesture-demo {
  min-height: 400px;
  position: relative;
}

.draggable {
  cursor: grab;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.draggable:active {
  cursor: grabbing;
}

.info-box {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.info-box p {
  margin-bottom: 8px;
  color: #856404;
}

.info-box p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .nav {
    position: static;
  }

  .header h1 {
    font-size: 32px;
  }

  .main {
    padding: 20px;
  }
}
</style>


