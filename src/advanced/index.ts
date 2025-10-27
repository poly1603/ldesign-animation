/**
 * 高级功能模块
 * 
 * @description
 * 包含动画组合器、调试工具等高级功能。
 * 
 * @module
 */

// 动画序列组合器
export {
  AnimationSequence,
  createSequence,
  sequence,
  parallel,
  stagger,
} from './sequencer'

// 调试工具
export {
  AnimationDebugger,
  createDebugger,
  debugger,
  type DebuggerConfig,
} from './debugger'


