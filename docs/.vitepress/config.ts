import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@ldesign/animation',
  description: '完整的动画库 - CSS/JS 动画、过渡效果、滚动动画、物理动画',
  base: '/animation/',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/core' },
      { text: '示例', link: '/examples/basic' },
      { text: 'Changelog', link: '/changelog' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '核心概念', link: '/guide/concepts' }
          ]
        },
        {
          text: '核心功能',
          items: [
            { text: '基础动画', link: '/guide/basic-animation' },
            { text: 'Timeline 时间轴', link: '/guide/timeline' },
            { text: 'CSS 预设动画', link: '/guide/presets' },
            { text: '滚动动画', link: '/guide/scroll-animation' }
          ]
        },
        {
          text: '高级功能',
          items: [
            { text: '物理动画', link: '/guide/physics' },
            { text: '手势交互', link: '/guide/gesture' },
            { text: 'SVG 动画', link: '/guide/svg' },
            { text: '过渡效果', link: '/guide/transition' },
            { text: '高级效果', link: '/guide/effects' }
          ]
        },
        {
          text: '框架集成',
          items: [
            { text: 'Vue 集成', link: '/guide/vue' },
            { text: 'React 集成', link: '/guide/react' }
          ]
        },
        {
          text: '性能优化',
          items: [
            { text: '性能指南', link: '/guide/performance' },
            { text: '内存管理', link: '/guide/memory' },
            { text: '性能监控', link: '/guide/monitoring' }
          ]
        }
      ],

      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '核心 API', link: '/api/core' },
            { text: 'Timeline API', link: '/api/timeline' },
            { text: '滚动 API', link: '/api/scroll' },
            { text: '物理 API', link: '/api/physics' },
            { text: '手势 API', link: '/api/gesture' },
            { text: 'SVG API', link: '/api/svg' },
            { text: '过渡 API', link: '/api/transition' },
            { text: '效果 API', link: '/api/effects' },
            { text: '工具 API', link: '/api/utils' },
            { text: '性能 API', link: '/api/performance' }
          ]
        }
      ],

      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: 'Timeline 示例', link: '/examples/timeline' },
            { text: '滚动动画', link: '/examples/scroll' },
            { text: '物理动画', link: '/examples/physics' },
            { text: '手势交互', link: '/examples/gesture' },
            { text: 'SVG 动画', link: '/examples/svg' },
            { text: 'Vue 示例', link: '/examples/vue' },
            { text: 'React 示例', link: '/examples/react' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ldesign/animation' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 LDesign Team'
    }
  }
})

