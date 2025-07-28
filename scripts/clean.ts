#!/usr/bin/env tsx

import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

const projectRoot = resolve(__dirname, '..')

const dirsToClean = [
  'dist',
  'coverage',
  '.nyc_output',
  'node_modules/.cache',
]

console.log('🧹 清理项目文件...')

for (const dir of dirsToClean) {
  const fullPath = resolve(projectRoot, dir)
  try {
    rmSync(fullPath, { recursive: true, force: true })
    console.log(`✅ 已清理: ${dir}`)
  }
  catch (error) {
    console.log(`⚠️  跳过: ${dir} (不存在或无法删除)`)
  }
}

console.log('✨ 清理完成!')