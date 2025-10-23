/**
 * React 组件 - AnimatedBox
 */

import React, { useEffect } from 'react'
import { useAnimation } from '../hooks/useAnimation'
import type { AnimationProps, AnimationOptions } from '../../core/types'

export interface AnimatedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 动画属性 */
  animateProps?: AnimationProps
  /** 动画选项 */
  options?: AnimationOptions
  /** 是否立即执行 */
  immediate?: boolean
  /** 动画触发器 */
  trigger?: boolean
  /** 开始回调 */
  onStart?: () => void
  /** 完成回调 */
  onComplete?: () => void
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  animateProps,
  options,
  immediate = false,
  trigger = false,
  onStart,
  onComplete,
  children,
  style,
  ...rest
}) => {
  const { ref, animateTo } = useAnimation()

  useEffect(() => {
    if (immediate && animateProps) {
      animateTo(animateProps, {
        ...options,
        onStart,
        onComplete,
      })
    }
  }, [immediate])

  useEffect(() => {
    if (trigger && animateProps) {
      animateTo(animateProps, {
        ...options,
        onStart,
        onComplete,
      })
    }
  }, [trigger])

  return (
    <div ref={ref} style={{ display: 'inline-block', ...style }} {...rest}>
      {children}
    </div>
  )
}

