<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 组件状态
const isVisible = ref(false)
const currentYear = new Date().getFullYear()

// 链接数据
const links = {
  documentation: [
    { name: 'API 文档', href: '#api' },
    { name: '快速开始', href: '#getting-started' },
    { name: '示例', href: '#examples' },
    { name: '最佳实践', href: '#best-practices' }
  ],
  community: [
    { name: 'GitHub', href: 'https://github.com/ldesign/animation' },
    { name: '问题反馈', href: 'https://github.com/ldesign/animation/issues' },
    { name: '讨论', href: 'https://github.com/ldesign/animation/discussions' },
    { name: '贡献指南', href: 'https://github.com/ldesign/animation/blob/main/CONTRIBUTING.md' }
  ],
  resources: [
    { name: 'Changelog', href: 'https://github.com/ldesign/animation/blob/main/CHANGELOG.md' },
    { name: 'License', href: 'https://github.com/ldesign/animation/blob/main/LICENSE' },
    { name: 'NPM', href: 'https://www.npmjs.com/package/@ldesign/animation' },
    { name: 'TypeScript', href: 'https://www.typescriptlang.org/' }
  ]
}

// 社交媒体链接
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ldesign/animation',
    icon: '🐙'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/ldesign',
    icon: '🐦'
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/ldesign',
    icon: '💬'
  }
]

// 统计数据
const stats = [
  { label: '下载量', value: '10K+' },
  { label: 'GitHub Stars', value: '500+' },
  { label: '版本', value: 'v1.0.0' },
  { label: '许可证', value: 'MIT' }
]

// 组件挂载
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <footer class="app-footer">
    <!-- 主要内容区域 -->
    <div class="footer-content" :class="{ 'is-visible': isVisible }">
      <div class="footer-grid">
        <!-- 品牌信息 -->
        <div class="footer-section brand-section">
          <div class="brand-info">
            <div class="brand-logo">
              <span class="logo-icon">🎬</span>
              <span class="logo-text">LDesign Animation</span>
            </div>
            <p class="brand-description">
              强大而灵活的 Vue 3 动画库，让您的应用充满生机。
            </p>
          </div>
          
          <!-- 统计信息 -->
          <div class="stats-grid">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="stat-item"
            >
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <!-- 文档链接 -->
        <div class="footer-section">
          <h3 class="section-title">文档</h3>
          <ul class="link-list">
            <li v-for="link in links.documentation" :key="link.name">
              <a :href="link.href" class="footer-link">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- 社区链接 -->
        <div class="footer-section">
          <h3 class="section-title">社区</h3>
          <ul class="link-list">
            <li v-for="link in links.community" :key="link.name">
              <a 
                :href="link.href" 
                class="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- 资源链接 -->
        <div class="footer-section">
          <h3 class="section-title">资源</h3>
          <ul class="link-list">
            <li v-for="link in links.resources" :key="link.name">
              <a 
                :href="link.href" 
                class="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 社交媒体和订阅 -->
      <div class="footer-social-section">
        <div class="social-content">
          <h3 class="social-title">关注我们</h3>
          <p class="social-description">获取最新更新和动画技巧</p>
          
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              class="social-link"
              :title="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="social-icon">{{ social.icon }}</span>
              <span class="social-name">{{ social.name }}</span>
            </a>
          </div>
        </div>
        
        <!-- 邮件订阅 -->
        <div class="newsletter-section">
          <h4 class="newsletter-title">订阅更新</h4>
          <p class="newsletter-description">订阅我们的邮件列表，获取最新功能和教程</p>
          <form class="newsletter-form" @submit.prevent>
            <div class="input-group">
              <input 
                type="email" 
                placeholder="输入您的邮箱地址"
                class="newsletter-input"
                required
              >
              <button type="submit" class="newsletter-btn">
                订阅
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- 底部版权信息 -->
    <div class="footer-bottom" :class="{ 'is-visible': isVisible }">
      <div class="footer-bottom-content">
        <div class="copyright">
          <p>&copy; {{ currentYear }} LDesign Animation. All rights reserved.</p>
        </div>
        
        <div class="footer-bottom-links">
          <a href="#privacy" class="bottom-link">隐私政策</a>
          <a href="#terms" class="bottom-link">使用条款</a>
          <a href="#cookies" class="bottom-link">Cookie 政策</a>
        </div>
        
        <div class="build-info">
          <span class="build-text">Built with ❤️ using Vue 3 & TypeScript</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-lg) var(--space-2xl);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.footer-content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* 品牌区域 */
.brand-section {
  gap: var(--space-xl);
}

.brand-info {
  margin-bottom: var(--space-lg);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.logo-icon {
  font-size: var(--text-2xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.brand-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.stat-item {
  text-align: center;
  padding: var(--space-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-normal);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-value {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* 链接区域 */
.section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-normal);
  padding: var(--space-xs) 0;
  border-radius: var(--radius-sm);
}

.footer-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* 社交媒体区域 */
.footer-social-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.social-content {
  display: flex;
  flex-direction: column;
}

.social-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.social-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: var(--space-md);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.social-icon {
  font-size: var(--text-lg);
}

.social-name {
  font-size: var(--text-sm);
  font-weight: 500;
}

/* 邮件订阅 */
.newsletter-section {
  display: flex;
  flex-direction: column;
}

.newsletter-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.newsletter-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.5;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  gap: var(--space-sm);
}

.newsletter-input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.newsletter-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.newsletter-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

/* 底部版权 */
.footer-bottom {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.footer-bottom.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.copyright p {
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: var(--space-lg);
}

.bottom-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-normal);
}

.bottom-link:hover {
  color: var(--color-primary);
}

.build-info {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.build-text {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
  
  .footer-social-section {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: var(--space-2xl) var(--space-md) var(--space-xl);
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }
  
  .footer-bottom-links {
    order: -1;
  }
  
  .social-links {
    flex-direction: column;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: var(--space-xl) var(--space-sm) var(--space-lg);
  }
  
  .footer-bottom-content {
    padding: var(--space-md);
  }
  
  .brand-logo {
    flex-direction: column;
    text-align: center;
    gap: var(--space-sm);
  }
  
  .social-links {
    gap: var(--space-sm);
  }
  
  .social-link {
    justify-content: center;
  }
}
</style>