<template>
  <div ref="boxRef" class="animated-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { AnimationProps, AnimationOptions } from '../../core/types'
import { useAnimation } from '../composables/useAnimation'

interface Props {
  /** 动画属性 */
  animateProps?: AnimationProps
  /** 动画选项 */
  options?: AnimationOptions
  /** 是否立即执行 */
  immediate?: boolean
  /** 动画触发器 */
  trigger?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  immediate: false,
  trigger: false,
})

const emit = defineEmits<{
  complete: []
  start: []
}>()

const boxRef = ref<HTMLElement>()
const { animateTo, isAnimating } = useAnimation(boxRef)

const runAnimation = () => {
  if (props.animateProps) {
    animateTo(props.animateProps, {
      ...props.options,
      onStart: () => emit('start'),
      onComplete: () => emit('complete'),
    })
  }
}

watch(() => props.trigger, (newVal) => {
  if (newVal) {
    runAnimation()
  }
})

onMounted(() => {
  if (props.immediate) {
    runAnimation()
  }
})

defineExpose({
  animateTo,
  isAnimating,
})
</script>

<style scoped>
.animated-box {
  display: inline-block;
}
</style>

