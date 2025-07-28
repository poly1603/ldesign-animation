#!/usr/bin/env tsx

import { build } from 'vite'
import { resolve } from 'node:path'
import { statSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

interface BundleInfo {
  file: string
  size: number
  gzipSize: number
  sizeFormatted: string
  gzipSizeFormatted: string
}

interface BundleAnalysis {
  timestamp: string
  bundles: BundleInfo[]
  totalSize: number
  totalGzipSize: number
  totalSizeFormatted: string
  totalGzipSizeFormatted: string
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function analyzeBundleSize(filePath: string): BundleInfo {
  const stats = statSync(filePath)
  const content = require('fs').readFileSync(filePath)
  const gzipSize = gzipSync(content).length
  
  return {
    file: filePath.split('/').pop() || filePath,
    size: stats.size,
    gzipSize,
    sizeFormatted: formatBytes(stats.size),
    gzipSizeFormatted: formatBytes(gzipSize),
  }
}

async function runBundleAnalysis() {
  console.log('📦 开始构建和分析包大小...')
  
  const projectRoot = resolve(__dirname, '..')
  
  try {
    // 构建项目
    await build({
      root: projectRoot,
      build: {
        outDir: 'dist',
        lib: {
          entry: resolve(projectRoot, 'src/index.ts'),
          name: 'LDesignAnimation',
          formats: ['es', 'umd'],
          fileName: (format) => `ldesign-animation.${format}.js`,
        },
        rollupOptions: {
          external: ['vue', '@ldesign/engine'],
          output: {
            globals: {
              vue: 'Vue',
              '@ldesign/engine': 'LDesignEngine',
            },
          },
        },
      },
    })
    
    console.log('✅ 构建完成，开始分析...')
    
    // 分析构建产物
    const distPath = resolve(projectRoot, 'dist')
    const bundles: BundleInfo[] = []
    
    try {
      const esBundle = analyzeBundleSize(resolve(distPath, 'ldesign-animation.es.js'))
      bundles.push(esBundle)
    } catch (error) {
      console.warn('⚠️  ES模块文件不存在')
    }
    
    try {
      const umdBundle = analyzeBundleSize(resolve(distPath, 'ldesign-animation.umd.js'))
      bundles.push(umdBundle)
    } catch (error) {
      console.warn('⚠️  UMD模块文件不存在')
    }
    
    // 计算总大小
    const totalSize = bundles.reduce((sum, bundle) => sum + bundle.size, 0)
    const totalGzipSize = bundles.reduce((sum, bundle) => sum + bundle.gzipSize, 0)
    
    const analysis: BundleAnalysis = {
      timestamp: new Date().toISOString(),
      bundles,
      totalSize,
      totalGzipSize,
      totalSizeFormatted: formatBytes(totalSize),
      totalGzipSizeFormatted: formatBytes(totalGzipSize),
    }
    
    // 输出结果
    console.log('\n📊 包大小分析结果:')
    console.log('=' .repeat(50))
    
    bundles.forEach((bundle) => {
      console.log(`📄 ${bundle.file}:`)
      console.log(`   原始大小: ${bundle.sizeFormatted}`)
      console.log(`   Gzip大小: ${bundle.gzipSizeFormatted}`)
      console.log()
    })
    
    console.log(`📦 总大小: ${analysis.totalSizeFormatted}`)
    console.log(`🗜️  总Gzip大小: ${analysis.totalGzipSizeFormatted}`)
    
    // 保存分析结果
    const outputPath = resolve(projectRoot, 'bundle-analysis.json')
    writeFileSync(outputPath, JSON.stringify(analysis, null, 2))
    
    console.log(`\n💾 分析结果已保存到: ${outputPath}`)
    
    // 大小警告
    if (totalGzipSize > 50 * 1024) { // 50KB
      console.log('\n⚠️  警告: 包大小超过50KB，请考虑优化')
    } else {
      console.log('\n✅ 包大小合理')
    }
    
  } catch (error) {
    console.error('❌ 构建或分析失败:', error)
    process.exit(1)
  }
}

runBundleAnalysis()