import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/animation-angular 构建配置
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
    '@angular/core',
    '@angular/common',
    'rxjs',
    'rxjs/operators',
    '@ldesign/animation-core',
    /^@ldesign\//,
    /^@angular\//,
  ],
})

