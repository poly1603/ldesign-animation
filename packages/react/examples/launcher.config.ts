import { defineConfig } from '@ldesign/launcher'
import react from '@vitejs/plugin-react'

/**
 * @ldesign/animation-react 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  plugins: [react()],

  resolve: {
    alias: [
      { find: '@ldesign/animation-react', replacement: '../src' },
      { find: '@ldesign/animation-core', replacement: '../../core/src' },
    ],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  server: {
    port: 5202,
    open: true,
    cors: true,
  },

  preview: {
    port: 4202,
    open: true,
  },

  optimizeDeps: {
    exclude: ['@ldesign/animation-react', '@ldesign/animation-core'],
  },
})


