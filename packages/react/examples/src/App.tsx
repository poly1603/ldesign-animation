import { useState } from 'react'
import './App.css'

const demos = [
  { id: 'basic', name: '基础动画', icon: '🎯' },
  { id: 'hooks', name: 'React Hooks', icon: '🪝' },
  { id: 'timeline', name: '时间轴', icon: '⏱️' },
  { id: 'physics', name: '物理动画', icon: '🎪' },
  { id: 'scroll', name: '滚动动画', icon: '📜' },
  { id: 'gesture', name: '手势动画', icon: '🖱️' },
]

function App() {
  const [currentDemo, setCurrentDemo] = useState('basic')

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ @ldesign/animation-react</h1>
        <p>React 动画集成演示</p>
      </header>

      <div className="container">
        {/* 侧边栏导航 */}
        <aside className="sidebar">
          <nav className="nav">
            {demos.map((demo) => (
              <button
                key={demo.id}
                className={`nav-item ${currentDemo === demo.id ? 'active' : ''}`}
                onClick={() => setCurrentDemo(demo.id)}
              >
                <span className="icon">{demo.icon}</span>
                <span className="text">{demo.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="main">
          {currentDemo === 'basic' && (
            <section className="demo-section">
              <h2>🎯 基础动画</h2>
              <p className="desc">使用 Motion 组件创建基础动画效果</p>
              
              <div className="demo-box">
                <div className="animated-box">点击我</div>
                <div className="controls">
                  <button className="btn">播放动画</button>
                </div>
              </div>

              <div className="code-block">
                <pre><code>{`<Motion
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1000 }}
>
  <div>动画内容</div>
</Motion>`}</code></pre>
              </div>
            </section>
          )}

          {currentDemo === 'hooks' && (
            <section className="demo-section">
              <h2>🪝 React Hooks</h2>
              <p className="desc">使用 useAnimate Hook 创建可控动画</p>
              
              <div className="demo-box">
                <div className="animated-box">动画元素</div>
                <div className="controls">
                  <button className="btn">播放</button>
                  <button className="btn">暂停</button>
                  <button className="btn">重播</button>
                </div>
              </div>

              <div className="code-block">
                <pre><code>{`const targetRef = useRef<HTMLDivElement>(null)
const { play, pause, restart } = useAnimate(targetRef, {
  translateX: 250,
  rotate: 360,
  duration: 1000
})`}</code></pre>
              </div>
            </section>
          )}

          {currentDemo === 'timeline' && (
            <section className="demo-section">
              <h2>⏱️ 时间轴动画</h2>
              <p className="desc">创建复杂的动画序列</p>
              
              <div className="demo-box">
                <div className="timeline-boxes">
                  <div className="animated-box small">1</div>
                  <div className="animated-box small">2</div>
                  <div className="animated-box small">3</div>
                </div>
                <div className="controls">
                  <button className="btn">播放时间轴</button>
                </div>
              </div>

              <div className="code-block">
                <pre><code>{`const { timeline } = useTimeline()

timeline
  .add(box1, { x: 100, duration: 1000 })
  .add(box2, { y: 100, duration: 1000 }, '-=500')
  .add(box3, { rotate: 360, duration: 1000 })`}</code></pre>
              </div>
            </section>
          )}

          <div className="info-box">
            <p>💡 <strong>提示：</strong>当前为演示界面框架</p>
            <p>实际动画功能需要实现 @ldesign/animation-react 的具体代码后才能正常工作</p>
            <p>查看 README.md 了解详细的 API 文档</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App


