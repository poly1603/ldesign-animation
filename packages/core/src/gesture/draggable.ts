/**
 * 可拖拽元素
 */

import type { GestureOptions } from '../types'

/**
 * 使元素可拖拽
 * 
 * @param element - 目标元素或选择器
 * @param options - 手势配置选项
 * @returns 销毁函数
 * @example
 * ```typescript
 * const cleanup = useDraggable('.box', {
 *   bounds: 'parent',
 *   inertia: true,
 *   onDrag: (e) => console.log('拖拽中', e)
 * })
 * 
 * // 销毁
 * cleanup()
 * ```
 */
export function useDraggable(
  element: string | Element,
  options: GestureOptions = {},
): () => void {
  const {
    bounds,
    inertia = false,
    inertiaDecay = 0.95,
    onDragStart,
    onDrag,
    onDragEnd,
  } = options

  // 获取目标元素
  const target = typeof element === 'string'
    ? document.querySelector(element)
    : element

  if (!(target instanceof HTMLElement)) {
    console.warn('useDraggable: target element not found')
    return () => { }
  }

  let isDragging = false
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0
  let velocityX = 0
  let velocityY = 0
  let lastTime = 0

  // 鼠标按下
  const handlePointerDown = (e: PointerEvent) => {
    isDragging = true
    startX = e.clientX - currentX
    startY = e.clientY - currentY
    lastTime = performance.now()

    target.setPointerCapture(e.pointerId)
    onDragStart?.(e)
  }

  // 鼠标移动
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return

    const now = performance.now()
    const deltaTime = now - lastTime

    const newX = e.clientX - startX
    const newY = e.clientY - startY

    // 计算速度
    velocityX = (newX - currentX) / deltaTime
    velocityY = (newY - currentY) / deltaTime

    currentX = newX
    currentY = newY
    lastTime = now

    // 应用变换
    target.style.transform = `translate(${currentX}px, ${currentY}px)`

    onDrag?.(e)
  }

  // 鼠标释放
  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging) return

    isDragging = false
    target.releasePointerCapture(e.pointerId)

    // 惯性效果
    if (inertia && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
      applyInertia()
    }

    onDragEnd?.(e)
  }

  // 应用惯性
  const applyInertia = () => {
    const animate = () => {
      currentX += velocityX
      currentY += velocityY

      velocityX *= inertiaDecay
      velocityY *= inertiaDecay

      target.style.transform = `translate(${currentX}px, ${currentY}px)`

      // 继续动画直到速度足够小
      if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  // 添加事件监听
  target.addEventListener('pointerdown', handlePointerDown)
  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)

  // 返回清理函数
  return () => {
    target.removeEventListener('pointerdown', handlePointerDown)
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }
}

