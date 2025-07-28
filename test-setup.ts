import { vi } from 'vitest'

// Mock Web Animations API
class MockAnimation {
  public playState = 'idle'
  public currentTime = 0
  public playbackRate = 1
  public timeline = null
  public effect = null
  
  constructor(effect: any, timeline: any) {
    this.effect = effect
    this.timeline = timeline
  }
  
  play() {
    this.playState = 'running'
    return this
  }
  
  pause() {
    this.playState = 'paused'
    return this
  }
  
  cancel() {
    this.playState = 'idle'
    this.currentTime = 0
    return this
  }
  
  reverse() {
    this.playState = 'running'
    return this
  }
  
  finish() {
    this.playState = 'finished'
    return this
  }
  
  addEventListener(type: string, listener: any) {
    // Mock implementation
  }
  
  removeEventListener(type: string, listener: any) {
    // Mock implementation
  }
  
  updatePlaybackRate(rate: number) {
    this.playbackRate = rate
  }
}

// Mock HTMLElement.animate
Object.defineProperty(HTMLElement.prototype, 'animate', {
  value: vi.fn((keyframes, options) => new MockAnimation(keyframes, options)),
  writable: true,
  configurable: true,
})

// Mock performance.now
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
  },
  writable: true,
})

// Mock requestAnimationFrame
Object.defineProperty(global, 'requestAnimationFrame', {
  value: vi.fn((callback) => setTimeout(callback, 16)),
  writable: true,
})

Object.defineProperty(global, 'cancelAnimationFrame', {
  value: vi.fn((id) => clearTimeout(id)),
  writable: true,
})

// Mock CSS transition events
const mockTransitionEvent = {
  propertyName: 'opacity',
  elapsedTime: 0.3,
  pseudoElement: '',
}

// Mock getComputedStyle
Object.defineProperty(global, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    transition: 'all 0.3s ease',
    transitionProperty: 'all',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
    transitionDelay: '0s',
  })),
  writable: true,
})

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'ResizeObserver', {
  value: MockResizeObserver,
  writable: true,
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true,
})

// Mock console methods for testing
const originalConsole = { ...console }

beforeEach(() => {
  // Reset console mocks
  console.log = vi.fn()
  console.warn = vi.fn()
  console.error = vi.fn()
})

afterEach(() => {
  // Restore console
  Object.assign(console, originalConsole)
})

// Global test utilities
global.createMockElement = () => {
  const element = document.createElement('div')
  element.style.cssText = 'position: absolute; top: 0; left: 0; width: 100px; height: 100px;'
  document.body.appendChild(element)
  return element
}

global.removeMockElement = (element: HTMLElement) => {
  if (element.parentNode) {
    element.parentNode.removeChild(element)
  }
}

// Mock Vue test utils if needed
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    nextTick: vi.fn(() => Promise.resolve()),
  }
})