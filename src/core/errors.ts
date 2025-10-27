/**
 * 动画库自定义错误类
 * 
 * @description
 * 提供友好的错误信息和错误恢复建议
 * 
 * @module
 */

/**
 * 动画错误基类
 */
export class AnimationError extends Error {
  public code: string
  public suggestions: string[]

  constructor(message: string, code: string, suggestions: string[] = []) {
    super(message)
    this.name = 'AnimationError'
    this.code = code
    this.suggestions = suggestions

    // 保持正确的堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  /**
   * 格式化错误信息
   */
  toString(): string {
    let message = `${this.name} [${this.code}]: ${this.message}`

    if (this.suggestions.length > 0) {
      message += '\n\n建议:\n'
      this.suggestions.forEach((suggestion, index) => {
        message += `  ${index + 1}. ${suggestion}\n`
      })
    }

    return message
  }
}

/**
 * 目标元素未找到错误
 */
export class TargetNotFoundError extends AnimationError {
  constructor(selector: string) {
    super(
      `无法找到目标元素: "${selector}"`,
      'TARGET_NOT_FOUND',
      [
        '检查选择器是否正确',
        '确保 DOM 元素已经渲染',
        '在 DOMContentLoaded 或 onMounted 之后调用',
      ]
    )
    this.name = 'TargetNotFoundError'
  }
}

/**
 * 无效属性错误
 */
export class InvalidPropertyError extends AnimationError {
  constructor(property: string, value: any) {
    super(
      `无效的动画属性: ${property} = ${value}`,
      'INVALID_PROPERTY',
      [
        '检查属性名是否正确（如 x, y, opacity）',
        '确保属性值的类型正确（数字或字符串）',
        '参考文档查看支持的属性列表',
      ]
    )
    this.name = 'InvalidPropertyError'
  }
}

/**
 * 无效配置错误
 */
export class InvalidConfigError extends AnimationError {
  constructor(field: string, value: any, expected: string) {
    super(
      `无效的配置项: ${field} = ${value}，期望: ${expected}`,
      'INVALID_CONFIG',
      [
        `检查 ${field} 的值是否符合要求`,
        `参考类型定义: ${expected}`,
      ]
    )
    this.name = 'InvalidConfigError'
  }
}

/**
 * 性能警告错误（不会中断执行）
 */
export class PerformanceWarning extends AnimationError {
  constructor(message: string, suggestions: string[] = []) {
    super(message, 'PERFORMANCE_WARNING', suggestions)
    this.name = 'PerformanceWarning'
  }
}

/**
 * 内存错误
 */
export class MemoryError extends AnimationError {
  constructor(message: string, usedMemory: number, limit: number) {
    super(
      `${message}（使用: ${usedMemory.toFixed(1)}MB / 限制: ${limit}MB）`,
      'MEMORY_ERROR',
      [
        '停止不必要的动画',
        '调用 engine.clear() 清理所有动画',
        '增加内存限制或减少并发动画数量',
        '检查是否存在内存泄漏',
      ]
    )
    this.name = 'MemoryError'
  }
}

/**
 * 时间轴错误
 */
export class TimelineError extends AnimationError {
  constructor(message: string, suggestions: string[] = []) {
    super(message, 'TIMELINE_ERROR', suggestions)
    this.name = 'TimelineError'
  }
}

/**
 * 错误处理器
 */
export class ErrorHandler {
  private static isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'

  /**
   * 处理错误
   */
  static handle(error: Error): void {
    if (error instanceof AnimationError) {
      // 友好的错误输出
      if (this.isDevelopment) {
        console.error(error.toString())
      } else {
        console.error(`${error.name}: ${error.message}`)
      }
    } else {
      // 未知错误
      console.error('Unexpected error:', error)
    }
  }

  /**
   * 发出警告
   */
  static warn(message: string, suggestions: string[] = []): void {
    const warning = new PerformanceWarning(message, suggestions)

    if (this.isDevelopment) {
      console.warn(warning.toString())
    } else {
      console.warn(message)
    }
  }

  /**
   * 安全执行函数（捕获错误）
   */
  static safely<T>(fn: () => T, fallback?: T): T | undefined {
    try {
      return fn()
    } catch (error) {
      this.handle(error as Error)
      return fallback
    }
  }

  /**
   * 验证目标元素
   */
  static validateTarget(target: any, selector: string): asserts target is HTMLElement | SVGElement {
    if (!target) {
      throw new TargetNotFoundError(selector)
    }
  }

  /**
   * 验证数值范围
   */
  static validateRange(value: number, min: number, max: number, name: string): void {
    if (value < min || value > max) {
      throw new InvalidConfigError(name, value, `${min} - ${max}`)
    }
  }

  /**
   * 验证必需参数
   */
  static validateRequired<T>(value: T | null | undefined, name: string): asserts value is T {
    if (value === null || value === undefined) {
      throw new InvalidConfigError(name, value, 'required value')
    }
  }
}

/**
 * 开发模式断言
 */
export function devAssert(condition: boolean, message: string): asserts condition {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    if (!condition) {
      throw new AnimationError(message, 'ASSERTION_FAILED')
    }
  }
}

/**
 * 性能警告（仅开发模式）
 */
export function devWarn(message: string, suggestions: string[] = []): void {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    ErrorHandler.warn(message, suggestions)
  }
}


