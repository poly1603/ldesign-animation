import { beforeEach, vi } from 'vitest'

// Mock Web Animations API
Object.defineProperty(Element.prototype, 'animate', {
  value: vi.fn(() => ({
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    cancel: vi.fn(),
    finish: vi.fn(),
    reverse: vi.fn(),
    playState: 'running',
    currentTime: 0,
    playbackRate: 1,
    effect: {
      getTiming: vi.fn(() => ({ duration: 1000 }))
    }
  })),
  writable: true,
  configurable: true
})

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => '')
  })),
  writable: true,
  configurable: true
})

// Mock requestAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  value: vi.fn((callback: FrameRequestCallback) => {
    return setTimeout(() => callback(performance.now()), 16)
  }),
  writable: true,
  configurable: true
})

// Mock cancelAnimationFrame
Object.defineProperty(window, 'cancelAnimationFrame', {
  value: vi.fn((id: number) => {
    clearTimeout(id)
  }),
  writable: true,
  configurable: true
})

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  value: vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  })),
  writable: true,
  configurable: true
})

// Mock performance.now
Object.defineProperty(performance, 'now', {
  value: vi.fn(() => Date.now()),
  writable: true,
  configurable: true
})

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})