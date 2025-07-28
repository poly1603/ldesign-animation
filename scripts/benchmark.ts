#!/usr/bin/env tsx

import { performance } from 'node:perf_hooks'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// 模拟动画性能测试
interface BenchmarkResult {
  name: string
  duration: number
  operations: number
  opsPerSecond: number
  memoryUsage: NodeJS.MemoryUsage
}

const results: BenchmarkResult[] = []

function benchmark(name: string, fn: () => void, iterations = 1000) {
  console.log(`🚀 运行基准测试: ${name}`)
  
  // 预热
  for (let i = 0; i < 10; i++) {
    fn()
  }
  
  // 清理垃圾回收
  if (global.gc) {
    global.gc()
  }
  
  const startMemory = process.memoryUsage()
  const startTime = performance.now()
  
  for (let i = 0; i < iterations; i++) {
    fn()
  }
  
  const endTime = performance.now()
  const endMemory = process.memoryUsage()
  
  const duration = endTime - startTime
  const opsPerSecond = (iterations / duration) * 1000
  
  const result: BenchmarkResult = {
    name,
    duration,
    operations: iterations,
    opsPerSecond,
    memoryUsage: {
      rss: endMemory.rss - startMemory.rss,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      external: endMemory.external - startMemory.external,
      arrayBuffers: endMemory.arrayBuffers - startMemory.arrayBuffers,
    },
  }
  
  results.push(result)
  
  console.log(`  ⏱️  耗时: ${duration.toFixed(2)}ms`)
  console.log(`  🔢 操作数: ${iterations}`)
  console.log(`  ⚡ 每秒操作数: ${opsPerSecond.toFixed(0)}`)
  console.log(`  💾 内存使用: ${(result.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`)
  console.log()
}

// 模拟动画操作
function simulateAnimation() {
  const element = { style: {} as any }
  element.style.transform = `translateX(${Math.random() * 100}px)`
  element.style.opacity = Math.random().toString()
}

function simulateTransition() {
  const element = { style: {} as any }
  element.style.transitionProperty = 'all'
  element.style.transitionDuration = '300ms'
  element.style.left = `${Math.random() * 100}px`
}

function simulateSequence() {
  for (let i = 0; i < 5; i++) {
    simulateAnimation()
  }
}

// 运行基准测试
console.log('📊 @ldesign/animation 性能基准测试\n')

benchmark('CSS动画模拟', simulateAnimation, 10000)
benchmark('CSS过渡模拟', simulateTransition, 10000)
benchmark('动画序列模拟', simulateSequence, 2000)

// 保存结果
const outputPath = resolve(__dirname, '..', 'benchmark-results.json')
writeFileSync(outputPath, JSON.stringify(results, null, 2))

console.log('📈 基准测试完成!')
console.log(`📄 结果已保存到: ${outputPath}`)

// 输出总结
console.log('\n📋 测试总结:')
results.forEach((result) => {
  console.log(`  ${result.name}: ${result.opsPerSecond.toFixed(0)} ops/sec`)
})