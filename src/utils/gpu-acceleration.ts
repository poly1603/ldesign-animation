/**
 * GPU 加速优化工具
 */

/**
 * GPU 加速的属性列表
 */
export const GPU_ACCELERATED_PROPS = [
  'transform',
  'opacity',
  'filter',
]

/**
 * 检查属性是否支持 GPU 加速
 */
export function isGPUAccelerated(prop: string): boolean {
  return GPU_ACCELERATED_PROPS.includes(prop)
}

/**
 * 启用 GPU 加速
 */
export function enableGPUAcceleration(element: HTMLElement | SVGElement): void {
  // 使用 translate3d(0,0,0) 触发 GPU 加速
  const currentTransform = element.style.transform
  if (!currentTransform || currentTransform === 'none') {
    element.style.transform = 'translate3d(0, 0, 0)'
  }

  // 添加 will-change
  element.style.willChange = 'transform, opacity'

    // 强制图层创建
    ; (element as HTMLElement).style.backfaceVisibility = 'hidden'
}

/**
 * 禁用 GPU 加速
 */
export function disableGPUAcceleration(element: HTMLElement | SVGElement): void {
  element.style.willChange = 'auto'
    ; (element as HTMLElement).style.backfaceVisibility = ''
}

/**
 * 检测浏览器是否支持 GPU 加速
 */
export function supportsGPUAcceleration(): boolean {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!gl
}

/**
 * 优化的 transform 写入
 * 使用 translate3d 而不是 translate 以触发 GPU
 */
export function optimizeTransform(transform: string): string {
  // 将 translate(x, y) 转换为 translate3d(x, y, 0)
  return transform
    .replace(/translate\(([^)]+)\)/g, (match, values) => {
      const parts = values.split(',').map((v: string) => v.trim())
      if (parts.length === 2) {
        return `translate3d(${parts[0]}, ${parts[1]}, 0)`
      }
      return match
    })
    .replace(/scale\(([^)]+)\)/g, (match, values) => {
      const parts = values.split(',').map((v: string) => v.trim())
      if (parts.length === 1) {
        return `scale3d(${parts[0]}, ${parts[0]}, 1)`
      } else if (parts.length === 2) {
        return `scale3d(${parts[0]}, ${parts[1]}, 1)`
      }
      return match
    })
}

/**
 * 检测是否需要降级
 */
export function shouldFallback(): boolean {
  // 检测性能较差的设备
  const connection = (navigator as any).connection
  if (connection && connection.saveData) {
    return true
  }

  // 检测内存限制
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory
    if (memory < 4) {
      return true
    }
  }

  return false
}



