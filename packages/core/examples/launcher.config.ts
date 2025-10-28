import { defineConfig } from '@ldesign/launcher'

/**
 * @ldesign/animation-core 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  // 路径别名
  resolve: {
    alias: [
      { find: '@ldesign/animation-core', replacement: '../src' },
    ],
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  // 开发服务器
  server: {
    port: 5200,
    open: true,
    cors: true,
  },

  // 预览服务器
  preview: {
    port: 4200,
    open: true,
  },

  // 优化配置
  optimizeDeps: {
    exclude: ['@ldesign/animation-core'],
  },
})


