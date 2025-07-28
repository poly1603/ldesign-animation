import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

const external = ['vue', '@ldesign/engine']

const plugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false
  })
]

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true
    },
    external,
    plugins
  },
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'LDesignAnimation',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        '@ldesign/engine': 'LDesignEngine'
      }
    },
    external,
    plugins: [...plugins, terser()]
  },
  // Vue components build
  {
    input: 'src/vue/index.ts',
    output: {
      file: 'dist/vue.es.js',
      format: 'es',
      sourcemap: true
    },
    external: [...external, '@ldesign/animation'],
    plugins
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    external,
    plugins: [dts()]
  }
]