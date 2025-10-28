import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/animation-lit 构建配置
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
    'lit',
    'lit/decorators.js',
    'lit/directives/class-map.js',
    '@ldesign/animation-core',
    /^@ldesign\//,
    /^lit\//,
  ],
})


