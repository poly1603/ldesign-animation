/**
 * @ldesign/animation - 动画库
 */

export interface AnimationOptions {
  duration?: number
  easing?: string
  delay?: number
}

export class Animation {
  private element: HTMLElement
  private options: AnimationOptions

  constructor(element: HTMLElement, options: AnimationOptions = {}) {
    this.element = element
    this.options = {
      duration: options.duration || 300,
      easing: options.easing || 'ease',
      delay: options.delay || 0,
    }
  }

  fadeIn() {
    this.element.style.opacity = '0'
    this.element.style.transition = `opacity ${this.options.duration}ms ${this.options.easing}`
    setTimeout(() => {
      this.element.style.opacity = '1'
    }, this.options.delay)
    return this
  }

  fadeOut() {
    this.element.style.transition = `opacity ${this.options.duration}ms ${this.options.easing}`
    setTimeout(() => {
      this.element.style.opacity = '0'
    }, this.options.delay)
    return this
  }
}

export function animate(element: HTMLElement, options?: AnimationOptions) {
  return new Animation(element, options)
}

