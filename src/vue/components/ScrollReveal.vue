<template>
  <div ref="revealRef" :class="{ 'is-visible': isInView }">
    <slot :is-visible="isInView" :progress="scrollProgress"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollTrigger } from '../composables/useScrollTrigger'
import { useAnimation } from '../composables/useAnimation'
import type { AnimationProps, AnimationOptions } from '../../core/types'

interface Props {
  /** 进入动画属性 */
  enterProps?: AnimationProps
  /** 动画选项 */
  options?: AnimationOptions
  /** 滚动触发起始位置 */
  start?: string
  /** 滚动触发结束位置 */
  end?: string
  /** 是否只触发一次 */
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enterProps: () => ({ opacity: 1, y: 0 }),
  start: 'top bottom',
  end: 'bottom top',
  once: true,
})

const emit = defineEmits<{
  enter: []
  leave: []
}>()

const revealRef = ref<HTMLElement>()
const { isInView, scrollProgress } = useScrollTrigger(revealRef, {
  start: props.start,
  end: props.end,
  onEnter: () => emit('enter'),
  onLeave: () => emit('leave'),
})

const { animateFrom } = useAnimation(revealRef)

let hasAnimated = false

watch(isInView, (newVal) => {
  if (newVal && (!hasAnimated || !props.once)) {
    // 设置初始状态
    if (props.enterProps) {
      const from: any = {}
      if ('opacity' in props.enterProps) from.opacity = 0
      if ('y' in props.enterProps) from.y = 50
      if ('x' in props.enterProps) from.x = -50
      if ('scale' in props.enterProps) from.scale = 0.8
      
      animateFrom(from, props.options)
      hasAnimated = true
    }
  }
})

defineExpose({
  isInView,
  scrollProgress,
})
</script>

<style scoped>
.is-visible {
  /* 可以添加一些额外的样式 */
}
</style>

