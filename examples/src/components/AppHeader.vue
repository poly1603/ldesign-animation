<script setup lang="ts">
interface Props {
  currentTheme: 'light' | 'dark'
}

interface Emits {
  toggleTheme: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo 和标题 -->
        <div class="logo-section">
          <div class="logo">
            🎬
          </div>
          <div class="title-section">
            <h1 class="title">@ldesign/animation</h1>
            <p class="subtitle">高性能动画库演示</p>
          </div>
        </div>

        <!-- 导航和操作 -->
        <div class="nav-section">
          <nav class="nav">
            <a href="#welcome" class="nav-link">首页</a>
            <a href="#animation" class="nav-link">动画</a>
            <a href="#transition" class="nav-link">过渡</a>
            <a href="#sequence" class="nav-link">序列</a>
            <a href="#performance" class="nav-link">性能</a>
            <a href="#api" class="nav-link">API</a>
          </nav>
          
          <div class="actions">
            <!-- 主题切换按钮 -->
            <button 
              class="theme-toggle"
              @click="$emit('toggleTheme')"
              :title="currentTheme === 'light' ? '切换到暗色主题' : '切换到亮色主题'"
            >
              <span v-if="currentTheme === 'light'">🌙</span>
              <span v-else>☀️</span>
            </button>
            
            <!-- GitHub 链接 -->
            <a 
              href="https://github.com/ldesign/animation" 
              target="_blank"
              class="github-link"
              title="查看 GitHub 仓库"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}

[data-theme="dark"] .header {
  background-color: rgba(15, 23, 42, 0.95);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  min-height: 64px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.logo {
  font-size: var(--text-2xl);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-info));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.title-section {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.2;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav {
  display: flex;
  gap: var(--space-lg);
}

.nav-link {
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-lg);
  transition: all var(--transition-fast);
}

.theme-toggle:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-border-hover);
  transform: scale(1.05);
}

.github-link {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.github-link:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-border-hover);
  transform: scale(1.05);
  color: var(--color-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-md);
  }
  
  .header-content {
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-md) 0;
  }
  
  .nav {
    gap: var(--space-md);
  }
  
  .nav-link {
    font-size: var(--text-xs);
  }
  
  .title {
    font-size: var(--text-lg);
  }
  
  .subtitle {
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .logo-section {
    gap: var(--space-sm);
  }
  
  .nav {
    gap: var(--space-sm);
  }
  
  .actions {
    gap: var(--space-sm);
  }
}
</style>