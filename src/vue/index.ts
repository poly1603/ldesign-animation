/**
 * @ldesign/animation - Vue 集成
 * 
 * 提供 Vue 3 组合式函数、组件和指令
 */

import type { App } from 'vue'

// 导出 Composables
export * from './composables'

// 导出组件
export * from './components'

// 导出指令
export * from './directives'

// Vue 插件
import { vAnimate, vScrollReveal, vParallax } from './directives'
import AnimatedBox from './components/AnimatedBox.vue'
import FadeTransition from './components/FadeTransition.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import DraggableBox from './components/DraggableBox.vue'

export interface AnimationPluginOptions {
  /** 组件前缀 */
  prefix?: string
  /** 是否注册全局指令 */
  directives?: boolean
  /** 是否注册全局组件 */
  components?: boolean
}

export const AnimationPlugin = {
  install(app: App, options: AnimationPluginOptions = {}) {
    const {
      prefix = 'L',
      directives = true,
      components = true,
    } = options

    // 注册全局指令
    if (directives) {
      app.directive('animate', vAnimate)
      app.directive('scroll-reveal', vScrollReveal)
      app.directive('parallax', vParallax)
    }

    // 注册全局组件
    if (components) {
      app.component(`${prefix}AnimatedBox`, AnimatedBox)
      app.component(`${prefix}FadeTransition`, FadeTransition)
      app.component(`${prefix}ScrollReveal`, ScrollReveal)
      app.component(`${prefix}DraggableBox`, DraggableBox)
    }
  },
}

// 默认导出插件
export default AnimationPlugin

