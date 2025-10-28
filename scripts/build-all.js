#!/usr/bin/env node

/**
 * 构建所有子包（core、vue、react、lit）
 * 按照依赖顺序构建：core -> vue/react/lit
 */

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// 构建顺序：core 必须先构建，其他可以并行
const buildSequence = [
  // 第一步：构建 core（其他包依赖它）
  [{ name: 'core', path: 'packages/core' }],

  // 第二步：并行构建其他包
  [
    { name: 'vue', path: 'packages/vue' },
    { name: 'react', path: 'packages/react' },
    { name: 'lit', path: 'packages/lit' },
    { name: 'solid', path: 'packages/solid' },
    { name: 'svelte', path: 'packages/svelte' },
    { name: 'angular', path: 'packages/angular' },
  ],
]

console.log('🏗️  开始构建所有子包...\n')

async function buildPackage(pkg) {
  return new Promise((resolve, reject) => {
    console.log(`📦 构建 @ldesign/animation-${pkg.name}...`)

    const pkgDir = join(rootDir, pkg.path)

    const child = spawn('pnpm', ['build'], {
      cwd: pkgDir,
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', (error) => {
      console.error(`❌ ${pkg.name} 构建失败: ${error.message}`)
      reject(error)
    })

    child.on('exit', (code) => {
      if (code !== 0) {
        console.error(`❌ ${pkg.name} 构建失败，退出代码: ${code}`)
        reject(new Error(`Build failed with code ${code}`))
      } else {
        console.log(`✅ ${pkg.name} 构建成功\n`)
        resolve()
      }
    })
  })
}

async function buildAll() {
  try {
    for (const step of buildSequence) {
      console.log(`\n🔨 构建步骤：${step.map(p => p.name).join(', ')}\n`)

      // 并行构建当前步骤的所有包
      await Promise.all(step.map(pkg => buildPackage(pkg)))
    }

    console.log('\n✨ 所有子包构建完成！')
    console.log('\n📦 已构建的包（7个）：')
    console.log('  - @ldesign/animation-core')
    console.log('  - @ldesign/animation-vue')
    console.log('  - @ldesign/animation-react')
    console.log('  - @ldesign/animation-lit')
    console.log('  - @ldesign/animation-solid')
    console.log('  - @ldesign/animation-svelte')
    console.log('  - @ldesign/animation-angular')
  } catch (error) {
    console.error(`\n❌ 构建过程中出现错误`)
    process.exit(1)
  }
}

buildAll()


