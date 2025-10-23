/**
 * @ldesign/animation 构建配置
 */

import { defineConfig } from '@ldesign/builder'

export default defineConfig({
  // 主入口
  input: 'src/index.ts',

  // 输出配置
  output: {
    // ESM 格式 - 保持目录结构
    esm: {
      dir: 'es',
      format: 'esm',
      preserveStructure: true,
      dts: true,
      sourcemap: true,
    },
    // CJS 格式 - 保持目录结构
    cjs: {
      dir: 'lib',
      format: 'cjs',
      preserveStructure: true,
      dts: true,
      sourcemap: true,
    },
    // UMD 格式 - 显式禁用
    umd: {
      enabled: false,
    },
  },

  // 外部依赖
  external: [
    'vue',
    'react',
    'react-dom',
    '@ldesign/shared',
  ],

  // UMD 全局变量映射
  globals: {
    vue: 'Vue',
    react: 'React',
    'react-dom': 'ReactDOM',
    '@ldesign/shared': 'LDesignShared',
  },

  // TypeScript 配置
  typescript: {
    tsconfig: './tsconfig.json',
  },

  // 清理输出目录
  clean: true,

  // 不压缩库代码（由使用者决定）
  minify: false,
})

