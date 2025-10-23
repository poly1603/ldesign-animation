/**
 * Vue 组合式函数 - Timeline 时间轴
 */

import { ref, onUnmounted } from 'vue'
import { createTimeline, Timeline } from '../../timeline/timeline'

/**
 * 使用 Timeline
 */
export function useTimeline() {
  const timeline = ref<Timeline | null>(null)
  const isPlaying = ref(false)
  const progress = ref(0)

  /**
   * 初始化 Timeline
   */
  const init = (options?: any) => {
    timeline.value = createTimeline(options)
    return timeline.value
  }

  /**
   * 播放
   */
  const play = () => {
    if (!timeline.value) return
    timeline.value.play()
    isPlaying.value = true
  }

  /**
   * 暂停
   */
  const pause = () => {
    if (!timeline.value) return
    timeline.value.pause()
    isPlaying.value = false
  }

  /**
   * 重新开始
   */
  const restart = () => {
    if (!timeline.value) return
    timeline.value.restart()
    isPlaying.value = true
    progress.value = 0
  }

  /**
   * 跳转到指定位置
   */
  const seek = (position: number | string) => {
    if (!timeline.value) return
    timeline.value.seek(position)
  }

  /**
   * 设置/获取进度
   */
  const setProgress = (value: number) => {
    if (!timeline.value) return
    timeline.value.progress(value)
    progress.value = value
  }

  /**
   * 获取当前进度
   */
  const getProgress = () => {
    if (!timeline.value) return 0
    return timeline.value.progress()
  }

  onUnmounted(() => {
    if (timeline.value) {
      timeline.value.pause()
      timeline.value = null
    }
  })

  return {
    timeline,
    isPlaying,
    progress,
    init,
    play,
    pause,
    restart,
    seek,
    setProgress,
    getProgress,
  }
}

