/**
 * Vue 3 动画组件
 */

import { defineComponent, ref, onMounted, onUnmounted, watch, PropType, h } from 'vue'
import { AnimationManager } from '../core/AnimationManager'
import { TransitionManager } from '../core/TransitionManager'
import { presets } from '../utils'
import type { AnimationConfig } from '../core/AnimationManager'
import type { TransitionConfig } from '../core/TransitionManager'

/**
 * 动画容器组件
 */
export const AnimationContainer = defineComponent({
  name: 'AnimationContainer',
  props: {
    preset: {
      type: String as PropType<keyof typeof presets>,
      default: 'fadeIn'
    },
    duration: {
      type: Number,
      default: 300
    },
    delay: {
      type: Number,
      default: 0
    },
    easing: {
      type: String,
      default: 'ease'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String as PropType<'mount' | 'visible' | 'manual'>,
      default: 'mount'
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    once: {
      type: Boolean,
      default: true
    }
  },
  emits: ['start', 'finish', 'cancel'],
  setup(props, { emit, slots }) {
    const containerRef = ref<HTMLElement>()
    const animation = ref<Animation>()
    const isVisible = ref(false)
    const hasAnimated = ref(false)
    
    const playAnimation = () => {
      if (!containerRef.value || (props.once && hasAnimated.value)) return
      
      const { keyframes, options } = presets[props.preset]
      const finalOptions = {
        ...options,
        duration: props.duration,
        delay: props.delay,
        easing: props.easing
      }
      
      animation.value = containerRef.value.animate(keyframes, finalOptions)
      hasAnimated.value = true
      
      emit('start')
      
      animation.value.addEventListener('finish', () => {
        emit('finish')
      })
      
      animation.value.addEventListener('cancel', () => {
        emit('cancel')
      })
    }
    
    const stopAnimation = () => {
      if (animation.value) {
        animation.value.cancel()
      }
    }
    
    onMounted(() => {
      if (props.trigger === 'mount' && props.autoplay) {
        playAnimation()
      } else if (props.trigger === 'visible') {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isVisible.value = entry.isIntersecting
              if (entry.isIntersecting && props.autoplay) {
                playAnimation()
              }
            })
          },
          { threshold: props.threshold }
        )
        
        if (containerRef.value) {
          observer.observe(containerRef.value)
        }
        
        onUnmounted(() => {
          observer.disconnect()
        })
      }
    })
    
    onUnmounted(() => {
      stopAnimation()
    })
    
    return {
      containerRef,
      playAnimation,
      stopAnimation,
      isVisible
    }
  },
  render() {
    return h('div', {
      ref: 'containerRef',
      class: 'animation-container'
    }, this.$slots.default?.())
  }
})

/**
 * 过渡组组件
 */
export const TransitionGroup = defineComponent({
  name: 'TransitionGroup',
  props: {
    preset: {
      type: String as PropType<keyof typeof presets>,
      default: 'fadeIn'
    },
    stagger: {
      type: Number,
      default: 100
    },
    duration: {
      type: Number,
      default: 300
    },
    delay: {
      type: Number,
      default: 0
    },
    easing: {
      type: String,
      default: 'ease'
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['start', 'finish'],
  setup(props, { emit, slots }) {
    const groupRef = ref<HTMLElement>()
    const animations = ref<Animation[]>([])
    
    const playAnimations = () => {
      if (!groupRef.value) return
      
      const children = Array.from(groupRef.value.children) as HTMLElement[]
      const { keyframes, options } = presets[props.preset]
      
      animations.value = children.map((child, index) => {
        const finalOptions = {
          ...options,
          duration: props.duration,
          delay: props.delay + index * props.stagger,
          easing: props.easing
        }
        
        return child.animate(keyframes, finalOptions)
      })
      
      emit('start')
      
      // 监听最后一个动画完成
      const lastAnimation = animations.value[animations.value.length - 1]
      if (lastAnimation) {
        lastAnimation.addEventListener('finish', () => {
          emit('finish')
        })
      }
    }
    
    const stopAnimations = () => {
      animations.value.forEach(animation => animation.cancel())
      animations.value = []
    }
    
    onMounted(() => {
      if (props.autoplay) {
        playAnimations()
      }
    })
    
    onUnmounted(() => {
      stopAnimations()
    })
    
    return {
      groupRef,
      playAnimations,
      stopAnimations
    }
  },
  render() {
    return h('div', {
      ref: 'groupRef',
      class: 'transition-group'
    }, this.$slots.default?.())
  }
})

/**
 * 序列动画组件
 */
export const SequenceAnimation = defineComponent({
  name: 'SequenceAnimation',
  props: {
    steps: {
      type: Array as PropType<Array<{
        selector: string
        preset: keyof typeof presets
        options?: Partial<KeyframeAnimationOptions>
      }>>,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['start', 'step', 'finish'],
  setup(props, { emit, slots }) {
    const containerRef = ref<HTMLElement>()
    const currentStep = ref(0)
    const isPlaying = ref(false)
    
    const playSequence = async () => {
      if (!containerRef.value || isPlaying.value) return
      
      isPlaying.value = true
      currentStep.value = 0
      emit('start')
      
      for (let i = 0; i < props.steps.length; i++) {
        const step = props.steps[i]
        const element = containerRef.value.querySelector(step.selector) as HTMLElement
        
        if (element) {
          const { keyframes, options } = presets[step.preset]
          const finalOptions = { ...options, ...step.options }
          
          const animation = element.animate(keyframes, finalOptions)
          currentStep.value = i + 1
          emit('step', i, step)
          
          await new Promise<void>((resolve) => {
            animation.addEventListener('finish', () => resolve())
          })
        }
      }
      
      isPlaying.value = false
      emit('finish')
    }
    
    const stopSequence = () => {
      isPlaying.value = false
      currentStep.value = 0
    }
    
    onMounted(() => {
      if (props.autoplay) {
        playSequence()
      }
    })
    
    return {
      containerRef,
      currentStep,
      isPlaying,
      playSequence,
      stopSequence
    }
  },
  render() {
    return h('div', {
      ref: 'containerRef',
      class: 'sequence-animation'
    }, this.$slots.default?.())
  }
})

/**
 * 滚动触发动画组件
 */
export const ScrollAnimation = defineComponent({
  name: 'ScrollAnimation',
  props: {
    preset: {
      type: String as PropType<keyof typeof presets>,
      default: 'fadeIn'
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    rootMargin: {
      type: String,
      default: '0px'
    },
    once: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    delay: {
      type: Number,
      default: 0
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  emits: ['visible', 'hidden', 'animate'],
  setup(props, { emit, slots }) {
    const elementRef = ref<HTMLElement>()
    const isVisible = ref(false)
    const hasAnimated = ref(false)
    
    onMounted(() => {
      if (!elementRef.value) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible.value = entry.isIntersecting
            
            if (entry.isIntersecting) {
              emit('visible')
              
              if (!props.once || !hasAnimated.value) {
                const { keyframes, options } = presets[props.preset]
                const finalOptions = {
                  ...options,
                  duration: props.duration,
                  delay: props.delay,
                  easing: props.easing
                }
                
                entry.target.animate(keyframes, finalOptions)
                hasAnimated.value = true
                emit('animate')
              }
            } else {
              emit('hidden')
            }
          })
        },
        {
          threshold: props.threshold,
          rootMargin: props.rootMargin
        }
      )
      
      observer.observe(elementRef.value)
      
      onUnmounted(() => {
        observer.disconnect()
      })
    })
    
    return {
      elementRef,
      isVisible,
      hasAnimated
    }
  },
  render() {
    return h('div', {
      ref: 'elementRef',
      class: 'scroll-animation'
    }, this.$slots.default?.())
  }
})

/**
 * 悬停动画组件
 */
export const HoverAnimation = defineComponent({
  name: 'HoverAnimation',
  props: {
    enterPreset: {
      type: String as PropType<keyof typeof presets>,
      default: 'scaleIn'
    },
    leavePreset: {
      type: String as PropType<keyof typeof presets>,
      default: 'scaleOut'
    },
    duration: {
      type: Number,
      default: 200
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  emits: ['mouseenter', 'mouseleave'],
  setup(props, { emit, slots }) {
    const elementRef = ref<HTMLElement>()
    const currentAnimation = ref<Animation>()
    
    const handleMouseEnter = () => {
      if (!elementRef.value) return
      
      if (currentAnimation.value) {
        currentAnimation.value.cancel()
      }
      
      const { keyframes, options } = presets[props.enterPreset]
      const finalOptions = {
        ...options,
        duration: props.duration,
        easing: props.easing
      }
      
      currentAnimation.value = elementRef.value.animate(keyframes, finalOptions)
      emit('mouseenter')
    }
    
    const handleMouseLeave = () => {
      if (!elementRef.value) return
      
      if (currentAnimation.value) {
        currentAnimation.value.cancel()
      }
      
      const { keyframes, options } = presets[props.leavePreset]
      const finalOptions = {
        ...options,
        duration: props.duration,
        easing: props.easing
      }
      
      currentAnimation.value = elementRef.value.animate(keyframes, finalOptions)
      emit('mouseleave')
    }
    
    onMounted(() => {
      if (elementRef.value) {
        elementRef.value.addEventListener('mouseenter', handleMouseEnter)
        elementRef.value.addEventListener('mouseleave', handleMouseLeave)
      }
    })
    
    onUnmounted(() => {
      if (elementRef.value) {
        elementRef.value.removeEventListener('mouseenter', handleMouseEnter)
        elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
      }
      
      if (currentAnimation.value) {
        currentAnimation.value.cancel()
      }
    })
    
    return {
      elementRef
    }
  },
  render() {
    return h('div', {
      ref: 'elementRef',
      class: 'hover-animation'
    }, this.$slots.default?.())
  }
})

/**
 * 点击动画组件
 */
export const ClickAnimation = defineComponent({
  name: 'ClickAnimation',
  props: {
    preset: {
      type: String as PropType<keyof typeof presets>,
      default: 'pulse'
    },
    duration: {
      type: Number,
      default: 200
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  emits: ['click', 'animate'],
  setup(props, { emit, slots }) {
    const elementRef = ref<HTMLElement>()
    
    const handleClick = (event: MouseEvent) => {
      if (!elementRef.value) return
      
      const { keyframes, options } = presets[props.preset]
      const finalOptions = {
        ...options,
        duration: props.duration,
        easing: props.easing
      }
      
      elementRef.value.animate(keyframes, finalOptions)
      emit('click', event)
      emit('animate')
    }
    
    onMounted(() => {
      if (elementRef.value) {
        elementRef.value.addEventListener('click', handleClick)
      }
    })
    
    onUnmounted(() => {
      if (elementRef.value) {
        elementRef.value.removeEventListener('click', handleClick)
      }
    })
    
    return {
      elementRef
    }
  },
  render() {
    return h('div', {
      ref: 'elementRef',
      class: 'click-animation'
    }, this.$slots.default?.())
  }
})

export default {
  AnimationContainer,
  TransitionGroup,
  SequenceAnimation,
  ScrollAnimation,
  HoverAnimation,
  ClickAnimation
}