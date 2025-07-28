import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  useAnimation,
  useCSSAnimation,
  useTransition,
  useSequence,
  useTimeline,
  useStagger,
  useJSAnimation,
  usePerformance,
  useElementAnimation,
  useScrollAnimation
} from '../src/vue'

describe('useAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create animation manager', () => {
    const { manager, isPlaying, play, stop, pause, resume } = useAnimation()
    
    expect(manager).toBeDefined()
    expect(isPlaying.value).toBe(false)
    expect(typeof play).toBe('function')
    expect(typeof stop).toBe('function')
    expect(typeof pause).toBe('function')
    expect(typeof resume).toBe('function')
  })

  it('should handle animation lifecycle', async () => {
    const { manager, isPlaying, play, stop } = useAnimation()
    
    const elementRef = ref(element)
    play(elementRef, 'fadeIn')
    
    await nextTick()
    expect(isPlaying.value).toBe(true)
    
    stop()
    expect(isPlaying.value).toBe(false)
  })
})

describe('useCSSAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create CSS animation controller', () => {
    const { controller, isAnimating, animate, stop } = useCSSAnimation()
    
    expect(controller).toBeDefined()
    expect(isAnimating.value).toBe(false)
    expect(typeof animate).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle CSS animations', async () => {
    const { controller, isAnimating, animate } = useCSSAnimation()
    
    const elementRef = ref(element)
    animate(elementRef, 'fadeIn')
    
    await nextTick()
    expect(isAnimating.value).toBe(true)
  })
})

describe('useTransition', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create transition manager', () => {
    const { manager, isTransitioning, transition, stop } = useTransition()
    
    expect(manager).toBeDefined()
    expect(isTransitioning.value).toBe(false)
    expect(typeof transition).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle transitions', async () => {
    const { manager, isTransitioning, transition } = useTransition()
    
    const elementRef = ref(element)
    transition(elementRef, { opacity: 0.5 })
    
    await nextTick()
    expect(isTransitioning.value).toBe(true)
  })
})

describe('useSequence', () => {
  it('should create sequence manager', () => {
    const { manager, isPlaying, play, stop, pause, resume, reset } = useSequence()
    
    expect(manager).toBeDefined()
    expect(isPlaying.value).toBe(false)
    expect(typeof play).toBe('function')
    expect(typeof stop).toBe('function')
    expect(typeof pause).toBe('function')
    expect(typeof resume).toBe('function')
    expect(typeof reset).toBe('function')
  })

  it('should handle sequence operations', async () => {
    const { manager, isPlaying, play, stop } = useSequence()
    
    manager.addDelay(100)
    play()
    
    await nextTick()
    expect(isPlaying.value).toBe(true)
    
    stop()
    expect(isPlaying.value).toBe(false)
  })
})

describe('useTimeline', () => {
  it('should create timeline with steps', () => {
    const steps = [
      { type: 'delay' as const, duration: 100 },
      { type: 'delay' as const, duration: 200 }
    ]
    
    const { timeline, isPlaying, play, stop } = useTimeline(steps)
    
    expect(timeline).toBeDefined()
    expect(isPlaying.value).toBe(false)
    expect(typeof play).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle timeline playback', async () => {
    const steps = [{ type: 'delay' as const, duration: 100 }]
    const { timeline, isPlaying, play } = useTimeline(steps)
    
    play()
    await nextTick()
    expect(isPlaying.value).toBe(true)
  })
})

describe('useStagger', () => {
  let elements: HTMLElement[]

  beforeEach(() => {
    elements = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ]
    elements.forEach(el => document.body.appendChild(el))
  })

  it('should create stagger animation', () => {
    const { animations, isPlaying, play, stop } = useStagger()
    
    expect(animations.value).toEqual([])
    expect(isPlaying.value).toBe(false)
    expect(typeof play).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle stagger animations', async () => {
    const { animations, isPlaying, play } = useStagger()
    
    const elementsRef = ref(elements)
    play(elementsRef, 'fadeIn', { stagger: 100 })
    
    await nextTick()
    expect(animations.value.length).toBe(3)
    expect(isPlaying.value).toBe(true)
  })
})

describe('useJSAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create JS animation controller', () => {
    const { controller, isAnimating, animate, stop } = useJSAnimation()
    
    expect(controller).toBeDefined()
    expect(isAnimating.value).toBe(false)
    expect(typeof animate).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle JS animations', async () => {
    const { controller, isAnimating, animate } = useJSAnimation()
    
    const elementRef = ref(element)
    animate(elementRef, [{ opacity: 0 }, { opacity: 1 }])
    
    await nextTick()
    expect(isAnimating.value).toBe(true)
  })
})

describe('usePerformance', () => {
  it('should provide performance monitoring', () => {
    const { fps, memory, startMonitoring, stopMonitoring } = usePerformance()
    
    expect(fps.value).toBe(0)
    expect(memory.value).toBe(0)
    expect(typeof startMonitoring).toBe('function')
    expect(typeof stopMonitoring).toBe('function')
  })

  it('should start and stop monitoring', async () => {
    const { fps, startMonitoring, stopMonitoring } = usePerformance()
    
    startMonitoring()
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(fps.value).toBeGreaterThanOrEqual(0)
    
    stopMonitoring()
  })
})

describe('useElementAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create element animation', () => {
    const elementRef = ref(element)
    const { isAnimating, animate, stop } = useElementAnimation(elementRef)
    
    expect(isAnimating.value).toBe(false)
    expect(typeof animate).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle element animations', async () => {
    const elementRef = ref(element)
    const { isAnimating, animate } = useElementAnimation(elementRef)
    
    animate('fadeIn')
    await nextTick()
    expect(isAnimating.value).toBe(true)
  })
})

describe('useScrollAnimation', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  it('should create scroll animation', () => {
    const elementRef = ref(element)
    const config = {
      trigger: 'enter' as const,
      animation: 'fadeIn' as const
    }
    
    const { isVisible, isAnimating, start, stop } = useScrollAnimation(elementRef, config)
    
    expect(isVisible.value).toBe(false)
    expect(isAnimating.value).toBe(false)
    expect(typeof start).toBe('function')
    expect(typeof stop).toBe('function')
  })

  it('should handle scroll triggers', async () => {
    const elementRef = ref(element)
    const config = {
      trigger: 'enter' as const,
      animation: 'fadeIn' as const
    }
    
    const { isVisible, start } = useScrollAnimation(elementRef, config)
    
    start()
    await nextTick()
    
    // Mock intersection observer callback
    const mockEntry = {
      isIntersecting: true,
      target: element
    }
    
    // Simulate intersection
    vi.mocked(window.IntersectionObserver).mock.calls[0][0]([mockEntry as any])
    
    await nextTick()
    expect(isVisible.value).toBe(true)
  })
})