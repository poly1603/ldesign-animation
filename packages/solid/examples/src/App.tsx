import { createSignal } from 'solid-js'
import './App.css'

const demos = [
  { id: 'basic', name: '基础动画', icon: '🎯' },
  { id: 'hooks', name: 'Solid Hooks', icon: '🪝' },
  { id: 'timeline', name: '时间轴', icon: '⏱️' },
  { id: 'physics', name: '物理动画', icon: '🎪' },
]

function App() {
  const [currentDemo, setCurrentDemo] = createSignal('basic')

  return (
    <div class="app">
      <header class="header">
        <h1>⚡ @ldesign/animation-solid</h1>
        <p>Solid.js 动画集成演示</p>
      </header>

      <div class="container">
        <aside class="sidebar">
          <nav class="nav">
            {demos.map((demo) => (
              <button
                class={`nav-item ${currentDemo() === demo.id ? 'active' : ''}`}
                onClick={() => setCurrentDemo(demo.id)}
              >
                <span class="icon">{demo.icon}</span>
                <span class="text">{demo.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main class="main">
          {currentDemo() === 'basic' && (
            <section class="demo-section">
              <h2>🎯 基础动画</h2>
              <p class="desc">使用 Motion 组件创建基础动画效果</p>

              <div class="demo-box">
                <div class="animated-box">点击我</div>
                <div class="controls">
                  <button class="btn">播放动画</button>
                </div>
              </div>
            </section>
          )}

          {currentDemo() === 'hooks' && (
            <section class="demo-section">
              <h2>🪝 Solid Hooks</h2>
              <p class="desc">使用 useAnimate Hook 创建可控动画</p>

              <div class="demo-box">
                <div class="animated-box">动画元素</div>
                <div class="controls">
                  <button class="btn">播放</button>
                  <button class="btn">暂停</button>
                  <button class="btn">重播</button>
                </div>
              </div>
            </section>
          )}

          <div class="info-box">
            <p>💡 <strong>提示：</strong>当前为演示界面框架</p>
            <p>实际动画功能需要实现 @ldesign/animation-solid 的具体代码后才能正常工作</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

