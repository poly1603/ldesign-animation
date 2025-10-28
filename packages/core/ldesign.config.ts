import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/animation-core 构建配置
 * 
 * 使用 @ldesign/builder 构建 ESM、CJS 和 UMD 产物
 */
export default defineConfig({
  // 入口文件
  input: 'src/index.ts',

  // 输出配置
  output: {
    // 输出格式：ESM、CJS、UMD
    format: ['esm', 'cjs', 'umd'],
    
    // ESM 输出配置
    esm: {
      dir: 'es',
      preserveStructure: true, // 保留源码目录结构
    },
    
    // CJS 输出配置
    cjs: {
      dir: 'lib',
      preserveStructure: true,
    },
    
    // UMD 输出配置
    umd: {
      dir: 'dist',
      name: 'LDesignAnimationCore', // 全局变量名
      fileName: 'index',
    },
  },

  // 生成类型声明文件
  dts: true,

  // 生成 sourcemap
  sourcemap: true,

  // 生产环境压缩
  minify: false,

  // 构建前清理输出目录
  clean: true,

  // 外部依赖（不打包进产物）
  external: [
    /^@ldesign\//,
    /^lodash/,
  ],

  // 打包器选择（可选：esbuild、swc、rollup、rolldown）
  // bundler: 'esbuild', // 极速构建
})


