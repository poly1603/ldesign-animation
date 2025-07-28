import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@ldesign/animation',
  description: '高性能动画库，支持CSS动画、JS动画、过渡效果和动画序列',
  base: '/ldesign-animation/',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#667eea' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: '@ldesign/animation | 高性能动画库' }],
    ['meta', { property: 'og:site_name', content: '@ldesign/animation' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://ldesign.github.io/animation/' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/animation-manager' },
      { text: '示例', link: '/examples/' },
      { text: '演示', link: '/demo/' },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/ldesign/animation' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/@ldesign/animation' },
          { text: 'LDesign', link: 'https://ldesign.github.io' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '基础概念', link: '/guide/concepts' },
          ],
        },
        {
          text: '核心功能',
          items: [
            { text: 'CSS动画', link: '/guide/css-animations' },
            { text: 'JavaScript动画', link: '/guide/js-animations' },
            { text: '过渡效果', link: '/guide/transitions' },
            { text: '动画序列', link: '/guide/sequences' },
            { text: '滚动动画', link: '/guide/scroll-animations' },
          ],
        },
        {
          text: 'Vue集成',
          items: [
            { text: '组合式API', link: '/guide/vue-composables' },
            { text: '组件', link: '/guide/vue-components' },
            { text: '最佳实践', link: '/guide/best-practices' },
          ],
        },
        {
          text: '高级功能',
          items: [
            { text: '性能优化', link: '/guide/performance' },
            { text: '动画控制', link: '/guide/animation-control' },
            { text: '缓动函数', link: '/guide/easing-functions' },
            { text: '自定义配置', link: '/guide/configuration' },
          ],
        },
      ],
      '/api/': [
        {
          text: '核心API',
          items: [
            { text: 'AnimationManager', link: '/api/animation-manager' },
            { text: 'TransitionManager', link: '/api/transition-manager' },
            { text: 'SequenceManager', link: '/api/sequence-manager' },
            { text: 'CSSAnimationController', link: '/api/css-animation-controller' },
            { text: 'JSAnimationController', link: '/api/js-animation-controller' },
          ],
        },
        {
          text: 'Vue API',
          items: [
            { text: 'useAnimation', link: '/api/use-animation' },
            { text: 'useCSSAnimation', link: '/api/use-css-animation' },
            { text: 'useTransition', link: '/api/use-transition' },
            { text: 'useSequence', link: '/api/use-sequence' },
            { text: 'useScrollAnimation', link: '/api/use-scroll-animation' },
          ],
        },
        {
          text: '组件API',
          items: [
            { text: 'AnimationContainer', link: '/api/animation-container' },
            { text: 'TransitionGroup', link: '/api/transition-group' },
            { text: 'ScrollAnimation', link: '/api/scroll-animation' },
            { text: 'HoverAnimation', link: '/api/hover-animation' },
            { text: 'ClickAnimation', link: '/api/click-animation' },
          ],
        },
        {
          text: '工具函数',
          items: [
            { text: '缓动函数', link: '/api/easing-functions' },
            { text: '动画工具', link: '/api/animation-utils' },
            { text: '性能工具', link: '/api/performance-utils' },
          ],
        },
        {
          text: '类型定义',
          items: [
            { text: '类型总览', link: '/api/types' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '基础示例',
          items: [
            { text: '快速开始', link: '/examples/basic' },
            { text: 'CSS动画', link: '/examples/css-animations' },
            { text: 'JavaScript动画', link: '/examples/js-animations' },
            { text: '过渡效果', link: '/examples/transitions' },
          ],
        },
        {
          text: 'Vue示例',
          items: [
            { text: '组合式API', link: '/examples/vue-composables' },
            { text: '组件使用', link: '/examples/vue-components' },
            { text: '完整应用', link: '/examples/vue-app' },
          ],
        },
        {
          text: '高级示例',
          items: [
            { text: '动画序列', link: '/examples/sequences' },
            { text: '滚动动画', link: '/examples/scroll-animations' },
            { text: '交互动画', link: '/examples/interactive-animations' },
            { text: '性能优化', link: '/examples/performance' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ldesign/animation' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 LDesign Team',
    },

    editLink: {
      pattern: 'https://github.com/ldesign/animation/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
    config: (md) => {
      // 自定义markdown配置
    },
  },

  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
})