import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/animation-svelte 构建配置
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
    'svelte',
    'svelte/store',
    'svelte/transition',
    'svelte/animate',
    '@ldesign/animation-core',
    /^@ldesign\//,
  ],
})

