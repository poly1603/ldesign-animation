<template>
  <transition
    :name="name"
    :appear="appear"
    :mode="mode"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { to, from } from '../../core/animation'

interface Props {
  /** 过渡名称 */
  name?: string
  /** 是否在初始渲染时应用过渡 */
  appear?: boolean
  /** 过渡模式 */
  mode?: 'in-out' | 'out-in' | 'default'
  /** 动画持续时间 */
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'fade',
  appear: false,
  mode: 'default',
  duration: 300,
})

const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
}

const onEnter = (el: Element, done: () => void) => {
  from(el as HTMLElement, { opacity: 0 }, {
    duration: props.duration,
    onComplete: done,
  })
}

const onAfterEnter = (el: Element) => {
  // 清理
}

const onBeforeLeave = (el: Element) => {
  // 准备离开
}

const onLeave = (el: Element, done: () => void) => {
  to(el as HTMLElement, { opacity: 0 }, {
    duration: props.duration,
    onComplete: done,
  })
}

const onAfterLeave = (el: Element) => {
  // 清理
}
</script>

