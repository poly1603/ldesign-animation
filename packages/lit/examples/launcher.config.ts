import { defineConfig } from '@ldesign/launcher'

/**
 * @ldesign/animation-lit 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  resolve: {
    alias: [
      { find: '@ldesign/animation-lit', replacement: '../src' },
      { find: '@ldesign/animation-core', replacement: '../../core/src' },
    ],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  server: {
    port: 5203,
    open: true,
    cors: true,
  },

  preview: {
    port: 4203,
    open: true,
  },

  optimizeDeps: {
    exclude: ['@ldesign/animation-lit', '@ldesign/animation-core'],
  },
})


