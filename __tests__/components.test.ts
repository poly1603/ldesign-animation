import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import {
  AnimationContainer,
  TransitionGroup,
  SequenceAnimation,
  ScrollAnimation,
  HoverAnimation,
  ClickAnimation
} from '../src/vue/components'

describe('AnimationContainer', () => {
  it('should render with default props', () => {
    const wrapper = mount(AnimationContainer, {
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Content')
  })

  it('should apply animation on mount when autoPlay is true', async () => {
    const wrapper = mount(AnimationContainer, {
      props: {
        animation: 'fadeIn',
        autoPlay: true
      },
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    
    await nextTick()
    expect(wrapper.vm.isAnimating).toBe(true)
  })

  it('should not auto-play when autoPlay is false', async () => {
    const wrapper = mount(AnimationContainer, {
      props: {
        animation: 'fadeIn',
        autoPlay: false
      },
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    
    await nextTick()
    expect(wrapper.vm.isAnimating).toBe(false)
  })

  it('should expose play and stop methods', () => {
    const wrapper = mount(AnimationContainer, {
      props: {
        animation: 'fadeIn'
      },
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    
    expect(typeof wrapper.vm.play).toBe('function')
    expect(typeof wrapper.vm.stop).toBe('function')
  })
})

describe('TransitionGroup', () => {
  it('should render transition group', () => {
    const wrapper = mount(TransitionGroup, {
      props: {
        name: 'fade'
      },
      slots: {
        default: '<div>Item 1</div><div>Item 2</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(true)
  })

  it('should apply enter and leave animations', () => {
    const wrapper = mount(TransitionGroup, {
      props: {
        name: 'fade',
        enterAnimation: 'fadeIn',
        leaveAnimation: 'fadeOut'
      },
      slots: {
        default: '<div key="1">Item 1</div>'
      }
    })
    
    expect(wrapper.props('enterAnimation')).toBe('fadeIn')
    expect(wrapper.props('leaveAnimation')).toBe('fadeOut')
  })
})

describe('SequenceAnimation', () => {
  it('should render sequence animation', () => {
    const steps = [
      { type: 'delay' as const, duration: 100 },
      { type: 'delay' as const, duration: 200 }
    ]
    
    const wrapper = mount(SequenceAnimation, {
      props: {
        steps
      },
      slots: {
        default: '<div>Sequence Content</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Sequence Content')
  })

  it('should auto-play sequence when autoPlay is true', async () => {
    const steps = [
      { type: 'delay' as const, duration: 100 }
    ]
    
    const wrapper = mount(SequenceAnimation, {
      props: {
        steps,
        autoPlay: true
      },
      slots: {
        default: '<div>Sequence Content</div>'
      }
    })
    
    await nextTick()
    expect(wrapper.vm.isPlaying).toBe(true)
  })

  it('should expose sequence control methods', () => {
    const steps = [
      { type: 'delay' as const, duration: 100 }
    ]
    
    const wrapper = mount(SequenceAnimation, {
      props: {
        steps
      },
      slots: {
        default: '<div>Sequence Content</div>'
      }
    })
    
    expect(typeof wrapper.vm.play).toBe('function')
    expect(typeof wrapper.vm.stop).toBe('function')
    expect(typeof wrapper.vm.pause).toBe('function')
    expect(typeof wrapper.vm.resume).toBe('function')
    expect(typeof wrapper.vm.reset).toBe('function')
  })
})

describe('ScrollAnimation', () => {
  it('should render scroll animation', () => {
    const wrapper = mount(ScrollAnimation, {
      props: {
        animation: 'fadeIn',
        trigger: 'enter'
      },
      slots: {
        default: '<div>Scroll Content</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Scroll Content')
  })

  it('should setup scroll observer on mount', async () => {
    const wrapper = mount(ScrollAnimation, {
      props: {
        animation: 'fadeIn',
        trigger: 'enter'
      },
      slots: {
        default: '<div>Scroll Content</div>'
      }
    })
    
    await nextTick()
    expect(wrapper.vm.isVisible).toBe(false)
    expect(wrapper.vm.isAnimating).toBe(false)
  })

  it('should expose visibility state', () => {
    const wrapper = mount(ScrollAnimation, {
      props: {
        animation: 'fadeIn',
        trigger: 'enter'
      },
      slots: {
        default: '<div>Scroll Content</div>'
      }
    })
    
    expect(typeof wrapper.vm.isVisible).toBe('boolean')
    expect(typeof wrapper.vm.isAnimating).toBe('boolean')
  })
})

describe('HoverAnimation', () => {
  it('should render hover animation', () => {
    const wrapper = mount(HoverAnimation, {
      props: {
        hoverAnimation: 'scaleIn',
        leaveAnimation: 'scaleOut'
      },
      slots: {
        default: '<div>Hover Content</div>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Hover Content')
  })

  it('should handle mouse events', async () => {
    const wrapper = mount(HoverAnimation, {
      props: {
        hoverAnimation: 'scaleIn',
        leaveAnimation: 'scaleOut'
      },
      slots: {
        default: '<div>Hover Content</div>'
      }
    })
    
    const element = wrapper.find('div')
    
    await element.trigger('mouseenter')
    expect(wrapper.vm.isHovered).toBe(true)
    
    await element.trigger('mouseleave')
    expect(wrapper.vm.isHovered).toBe(false)
  })

  it('should expose hover state', () => {
    const wrapper = mount(HoverAnimation, {
      props: {
        hoverAnimation: 'scaleIn'
      },
      slots: {
        default: '<div>Hover Content</div>'
      }
    })
    
    expect(typeof wrapper.vm.isHovered).toBe('boolean')
    expect(typeof wrapper.vm.isAnimating).toBe('boolean')
  })
})

describe('ClickAnimation', () => {
  it('should render click animation', () => {
    const wrapper = mount(ClickAnimation, {
      props: {
        animation: 'pulse'
      },
      slots: {
        default: '<button>Click Me</button>'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Click Me')
  })

  it('should handle click events', async () => {
    const wrapper = mount(ClickAnimation, {
      props: {
        animation: 'pulse'
      },
      slots: {
        default: '<button>Click Me</button>'
      }
    })
    
    const button = wrapper.find('button')
    
    await button.trigger('click')
    expect(wrapper.vm.isAnimating).toBe(true)
  })

  it('should emit click events', async () => {
    const wrapper = mount(ClickAnimation, {
      props: {
        animation: 'pulse'
      },
      slots: {
        default: '<button>Click Me</button>'
      }
    })
    
    const button = wrapper.find('button')
    await button.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should expose animation state', () => {
    const wrapper = mount(ClickAnimation, {
      props: {
        animation: 'pulse'
      },
      slots: {
        default: '<button>Click Me</button>'
      }
    })
    
    expect(typeof wrapper.vm.isAnimating).toBe('boolean')
  })
})