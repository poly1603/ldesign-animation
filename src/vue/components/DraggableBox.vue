<template>
  <div
    ref="dragRef"
    class="draggable-box"
    :class="{ 'is-dragging': isDragging }"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
  >
    <slot :is-dragging="isDragging" :position="position"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '../composables/useDraggable'
import type { DraggableOptions } from '../../gesture/types'

interface Props {
  /** 拖拽选项 */
  options?: DraggableOptions
  /** 是否启用 */
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
})

const emit = defineEmits<{
  'drag-start': [event: any]
  'drag': [event: any]
  'drag-end': [event: any]
}>()

const dragRef = ref<HTMLElement>()
const { isDragging, position, enable, disable, reset } = useDraggable(dragRef, {
  ...props.options,
  onDragStart: (event) => emit('drag-start', event),
  onDrag: (event) => emit('drag', event),
  onDragEnd: (event) => emit('drag-end', event),
})

// 监听 enabled prop
watch(() => props.enabled, (newVal) => {
  if (newVal) {
    enable()
  } else {
    disable()
  }
})

defineExpose({
  isDragging,
  position,
  enable,
  disable,
  reset,
})
</script>

<style scoped>
.draggable-box {
  cursor: grab;
  user-select: none;
}

.draggable-box.is-dragging {
  cursor: grabbing;
}
</style>

