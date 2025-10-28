<script lang="ts">
  let currentDemo = 'basic'
  
  const demos = [
    { id: 'basic', name: '基础动画', icon: '🎯' },
    { id: 'stores', name: 'Svelte Stores', icon: '📦' },
    { id: 'timeline', name: '时间轴', icon: '⏱️' },
    { id: 'physics', name: '物理动画', icon: '🎪' },
  ]
</script>

<div class="app">
  <header class="header">
    <h1>🧩 @ldesign/animation-svelte</h1>
    <p>Svelte 动画集成演示</p>
  </header>

  <div class="container">
    <aside class="sidebar">
      <nav class="nav">
        {#each demos as demo}
          <button
            class="nav-item"
            class:active={currentDemo === demo.id}
            on:click={() => currentDemo = demo.id}
          >
            <span class="icon">{demo.icon}</span>
            <span class="text">{demo.name}</span>
          </button>
        {/each}
      </nav>
    </aside>

    <main class="main">
      {#if currentDemo === 'basic'}
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
      {/if}

      {#if currentDemo === 'stores'}
        <section class="demo-section">
          <h2>📦 Svelte Stores</h2>
          <p class="desc">使用 Stores 创建响应式动画</p>
          
          <div class="demo-box">
            <div class="animated-box">动画元素</div>
            <div class="controls">
              <button class="btn">播放</button>
              <button class="btn">暂停</button>
              <button class="btn">重播</button>
            </div>
          </div>
        </section>
      {/if}

      <div class="info-box">
        <p>💡 <strong>提示：</strong>当前为演示界面框架</p>
        <p>实际动画功能需要实现 @ldesign/animation-svelte 的具体代码后才能正常工作</p>
      </div>
    </main>
  </div>
</div>

<style>
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
  }

  .container {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    gap: 20px;
  }

  .sidebar {
    width: 250px;
  }

  .nav {
    background: white;
    border-radius: 12px;
    padding: 10px;
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
    transition: all 0.3s ease;
  }

  .nav-item:hover {
    background: #f5f5f5;
  }

  .nav-item.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .main {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 40px;
  }

  .demo-section h2 {
    font-size: 32px;
    color: #667eea;
    margin-bottom: 10px;
  }

  .desc {
    color: #666;
    margin-bottom: 30px;
  }

  .demo-box {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    cursor: pointer;
  }

  .controls {
    display: flex;
    gap: 10px;
  }

  .btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .info-box {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    padding: 20px;
  }

  .info-box p {
    margin-bottom: 8px;
    color: #856404;
  }
</style>

