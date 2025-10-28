import { defineConfig } from '@ldesign/launcher'
import { svelte } from '@sveltejs/vite-plugin-svelte'

/**
 * @ldesign/animation-svelte 演示示例配置
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  plugins: [svelte()],

  resolve: {
    alias: [
      { find: '@ldesign/animation-svelte', replacement: '../src' },
      { find: '@ldesign/animation-core', replacement: '../../core/src' },
    ],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  server: {
    port: 5205,
    open: true,
    cors: true,
  },

  preview: {
    port: 4205,
    open: true,
  },

  optimizeDeps: {
    exclude: ['@ldesign/animation-svelte', '@ldesign/animation-core'],
  },
})

