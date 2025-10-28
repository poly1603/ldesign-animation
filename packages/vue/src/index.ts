/**
 * @ldesign/animation-vue - Vue 3 动画集成
 * 
 * 提供 Vue 组件、指令和组合式函数
 * 
 * @packageDocumentation
 */

import type { App, Plugin } from 'vue'

// 导出所有组件
export * from './components'

// 导出所有组合式函数
export * from './composables'

// 导出所有指令
export * from './directives'

/**
 * Vue 插件安装函数
 */
export const install: Plugin = (app: App) => {
  // TODO: 注册所有组件和指令
  console.log('@ldesign/animation-vue installed')
}

/**
 * 默认导出
 */
export default {
  install,
}


