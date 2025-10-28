import { defineConfig } from '@ldesign/launcher'
import solid from 'vite-plugin-solid'

/**
 * @ldesign/animation-solid 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  plugins: [solid()],

  resolve: {
    alias: [
      { find: '@ldesign/animation-solid', replacement: '../src' },
      { find: '@ldesign/animation-core', replacement: '../../core/src' },
    ],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  server: {
    port: 5204,
    open: true,
    cors: true,
  },

  preview: {
    port: 4204,
    open: true,
  },

  optimizeDeps: {
    exclude: ['@ldesign/animation-solid', '@ldesign/animation-core'],
  },
})

