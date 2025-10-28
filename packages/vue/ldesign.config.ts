import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/animation-vue 构建配置
 * 
 * Vue 3 集成构建配置
 */
export default defineConfig({
  input: 'src/index.ts',

  output: {
    format: ['esm', 'cjs'],

    esm: {
      dir: 'es',
      preserveStructure: true,
    },

    cjs: {
      dir: 'lib',
      preserveStructure: true,
    },
  },

  dts: true,
  sourcemap: true,
  minify: false,
  clean: true,

  external: [
    'vue',
    '@ldesign/animation-core',
    /^@ldesign\//,
    /^@vue\//,
  ],
})


