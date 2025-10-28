#!/usr/bin/env node

/**
 * 启动所有子包的演示示例（开发模式）
 */

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const examples = [
  { name: 'core', path: 'packages/core/examples', port: 5200 },
  { name: 'vue', path: 'packages/vue/examples', port: 5201 },
  { name: 'react', path: 'packages/react/examples', port: 5202 },
  { name: 'lit', path: 'packages/lit/examples', port: 5203 },
  { name: 'solid', path: 'packages/solid/examples', port: 5204 },
  { name: 'svelte', path: 'packages/svelte/examples', port: 5205 },
]

console.log('🚀 启动所有演示示例...\n')

// 询问用户要启动哪个示例
const args = process.argv.slice(2)
const selectedExample = args[0]

if (selectedExample) {
  const example = examples.find(e => e.name === selectedExample)
  if (!example) {
    console.error(`❌ 未找到示例: ${selectedExample}`)
    console.log(`可用的示例: ${examples.map(e => e.name).join(', ')}`)
    process.exit(1)
  }

  startExample(example)
} else {
  console.log('📝 使用方式:')
  console.log('  pnpm dev:examples [core|vue|react|lit]\n')
  console.log('可用的示例:')
  examples.forEach(e => {
    console.log(`  - ${e.name.padEnd(10)} (http://localhost:${e.port})`)
  })
  console.log('\n💡 提示: 不指定参数将显示此帮助信息')
}

function startExample(example) {
  console.log(`\n🎯 启动 ${example.name} 示例...`)
  console.log(`📍 路径: ${example.path}`)
  console.log(`🌐 地址: http://localhost:${example.port}\n`)

  const exampleDir = join(rootDir, example.path)

  const child = spawn('pnpm', ['dev'], {
    cwd: exampleDir,
    stdio: 'inherit',
    shell: true,
  })

  child.on('error', (error) => {
    console.error(`❌ 启动失败: ${error.message}`)
    process.exit(1)
  })

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ 进程退出，代码: ${code}`)
      process.exit(code)
    }
  })
}


