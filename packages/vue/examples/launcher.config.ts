import { defineConfig } from '@ldesign/launcher'
import vue from '@vitejs/plugin-vue'

/**
 * @ldesign/animation-vue 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  plugins: [vue()],

  resolve: {
    alias: [
      { find: '@ldesign/animation-vue', replacement: '../src' },
      { find: '@ldesign/animation-core', replacement: '../../core/src' },
    ],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  server: {
    port: 5201,
    open: true,
    cors: true,
  },

  preview: {
    port: 4201,
    open: true,
  },

  optimizeDeps: {
    exclude: ['@ldesign/animation-vue', '@ldesign/animation-core'],
  },
})


