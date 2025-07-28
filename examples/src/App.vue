<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="title">LDesign Animation</h1>
        <p class="subtitle">高性能 Vue 3 动画库演示</p>
      </div>
    </header>

    <nav class="navigation">
      <div class="container">
        <div class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="active">
            首页
          </router-link>
          <router-link to="/basic" class="nav-link" active-class="active">
            基础动画
          </router-link>
          <router-link to="/css" class="nav-link" active-class="active">
            CSS 动画
          </router-link>
          <router-link to="/js" class="nav-link" active-class="active">
            JS 动画
          </router-link>
          <router-link to="/transitions" class="nav-link" active-class="active">
            过渡动画
          </router-link>
          <router-link to="/sequences" class="nav-link" active-class="active">
            动画序列
          </router-link>
          <router-link to="/scroll" class="nav-link" active-class="active">
            滚动动画
          </router-link>
          <router-link to="/interactive" class="nav-link" active-class="active">
            交互动画
          </router-link>
          <router-link to="/components" class="nav-link" active-class="active">
            组件动画
          </router-link>
          <router-link to="/performance" class="nav-link" active-class="active">
            性能测试
          </router-link>
        </div>
      </div>
    </nav>

    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 LDesign Animation Library. Built with Vue 3 and TypeScript.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// App component logic can be added here if needed
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.navigation {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #667eea;
  background: #f3f4f6;
}

.nav-link.active {
  color: #667eea;
  background: #ede9fe;
}

.main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 2rem 0;
  text-align: center;
  color: #6b7280;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>