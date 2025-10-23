/**
 * Vue 组合式函数 - 拖拽
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { draggable, Draggable } from '../../gesture/drag'
import type { DraggableOptions } from '../../gesture/types'

/**
 * 使用拖拽
 * @param target - 目标元素 ref
 * @param options - 拖拽选项
 */
export function useDraggable(
  target: Ref<HTMLElement | undefined>,
  options?: DraggableOptions
) {
  const drag = ref<Draggable | null>(null)
  const isDragging = ref(false)
  const position = ref({ x: 0, y: 0 })

  onMounted(() => {
    if (!target.value) return

    drag.value = draggable(target.value, {
      ...options,
      onDragStart: (event) => {
        isDragging.value = true
        options?.onDragStart?.(event)
      },
      onDrag: (event) => {
        position.value = { x: event.x, y: event.y }
        options?.onDrag?.(event)
      },
      onDragEnd: (event) => {
        isDragging.value = false
        options?.onDragEnd?.(event)
      },
    })
  })

  onUnmounted(() => {
    if (drag.value) {
      drag.value.destroy()
      drag.value = null
    }
  })

  /**
   * 启用拖拽
   */
  const enable = () => {
    drag.value?.enable()
  }

  /**
   * 禁用拖拽
   */
  const disable = () => {
    drag.value?.disable()
  }

  /**
   * 重置位置
   */
  const reset = () => {
    drag.value?.reset()
    position.value = { x: 0, y: 0 }
  }

  return {
    drag,
    isDragging,
    position,
    enable,
    disable,
    reset,
  }
}

