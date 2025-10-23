import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@ldesign/animation': resolve(__dirname, '../../src/index.ts')
    }
  },
  server: {
    port: 5174,
    open: false,
    host: true
  }
})

