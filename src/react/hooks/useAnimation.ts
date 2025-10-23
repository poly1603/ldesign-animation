/**
 * React Hook - 基础动画
 */

import { useRef, useCallback, useState } from 'react'
import { to, from, fromTo } from '../../core/animation'
import type { AnimationOptions, AnimationProps } from '../../core/types'

export function useAnimation<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const animateTo = useCallback((props: AnimationProps, options?: AnimationOptions) => {
    if (!elementRef.current) return

    setIsAnimating(true)
    to(elementRef.current, props, {
      ...options,
      onComplete: () => {
        setIsAnimating(false)
        options?.onComplete?.()
      },
    })
  }, [])

  const animateFrom = useCallback((props: AnimationProps, options?: AnimationOptions) => {
    if (!elementRef.current) return

    setIsAnimating(true)
    from(elementRef.current, props, {
      ...options,
      onComplete: () => {
        setIsAnimating(false)
        options?.onComplete?.()
      },
    })
  }, [])

  const animateFromTo = useCallback((
    fromProps: AnimationProps,
    toProps: AnimationProps,
    options?: AnimationOptions
  ) => {
    if (!elementRef.current) return

    setIsAnimating(true)
    fromTo(elementRef.current, fromProps, toProps, {
      ...options,
      onComplete: () => {
        setIsAnimating(false)
        options?.onComplete?.()
      },
    })
  }, [])

  return {
    ref: elementRef,
    isAnimating,
    animateTo,
    animateFrom,
    animateFromTo,
  }
}

