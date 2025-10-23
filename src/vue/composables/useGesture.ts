/**
 * Vue 组合式函数 - 手势识别
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { gesture, GestureRecognizer } from '../../gesture/recognizer'
import type { GestureOptions, GestureType } from '../../gesture/types'

/**
 * 使用手势识别
 * @param target - 目标元素 ref
 * @param options - 手势选项
 */
export function useGesture(
  target: Ref<HTMLElement | undefined>,
  options?: GestureOptions
) {
  const recognizer = ref<GestureRecognizer | null>(null)
  const currentGesture = ref<GestureType | null>(null)

  onMounted(() => {
    if (!target.value) return

    recognizer.value = gesture(target.value, options)

    // 监听所有手势类型
    const gestures: GestureType[] = ['tap', 'press', 'swipe', 'pinch', 'hover']

    gestures.forEach(type => {
      recognizer.value?.on(type, (event: any) => {
        currentGesture.value = type
      })
    })
  })

  onUnmounted(() => {
    if (recognizer.value) {
      recognizer.value.destroy()
      recognizer.value = null
    }
  })

  /**
   * 监听手势事件
   */
  const on = (type: GestureType, handler: (event: any) => void) => {
    recognizer.value?.on(type, handler)
  }

  /**
   * 取消监听
   */
  const off = (type: GestureType, handler: (event: any) => void) => {
    recognizer.value?.off(type, handler)
  }

  return {
    recognizer,
    currentGesture,
    on,
    off,
  }
}

