#!/usr/bin/env node

/**
 * 构建所有子包的演示示例
 */

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const examples = [
  { name: 'core', path: 'packages/core/examples' },
  { name: 'vue', path: 'packages/vue/examples' },
  { name: 'react', path: 'packages/react/examples' },
  { name: 'lit', path: 'packages/lit/examples' },
  { name: 'solid', path: 'packages/solid/examples' },
  { name: 'svelte', path: 'packages/svelte/examples' },
]

console.log('🏗️  构建所有演示示例...\n')

async function buildExample(example) {
  return new Promise((resolve, reject) => {
    console.log(`📦 构建 ${example.name} 示例...`)

    const exampleDir = join(rootDir, example.path)

    const child = spawn('pnpm', ['build'], {
      cwd: exampleDir,
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', (error) => {
      console.error(`❌ ${example.name} 构建失败: ${error.message}`)
      reject(error)
    })

    child.on('exit', (code) => {
      if (code !== 0) {
        console.error(`❌ ${example.name} 构建失败，退出代码: ${code}`)
        reject(new Error(`Build failed with code ${code}`))
      } else {
        console.log(`✅ ${example.name} 构建成功\n`)
        resolve()
      }
    })
  })
}

async function buildAll() {
  for (const example of examples) {
    try {
      await buildExample(example)
    } catch (error) {
      console.error(`\n❌ 构建过程中出现错误`)
      process.exit(1)
    }
  }

  console.log('\n✨ 所有示例构建完成！')
}

buildAll()


