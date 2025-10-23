/**
 * Timeline 类型定义
 */

import type { AnimationTarget, AnimationProps, AnimationOptions } from '../core/types'

/**
 * Timeline 动画项
 */
export interface TimelineItem {
  target: AnimationTarget
  props: AnimationProps
  options: AnimationOptions
  startTime: number
  duration: number
}

/**
 * Timeline 标签
 */
export interface TimelineLabel {
  name: string
  time: number
}

/**
 * Timeline 状态
 */
export enum TimelineState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  FINISHED = 'finished',
}

/**
 * 时间位置
 * - number: 绝对时间（毫秒）
 * - '+=100': 相对于上一个动画结束后
 * - '-=100': 相对于上一个动画结束前
 * - '<': 与上一个动画同时开始
 * - '>': 与上一个动画结束时开始
 * - 'label': 标签位置
 * - 'label+=100': 标签位置 + 偏移
 */
export type TimePosition = number | string






