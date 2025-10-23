/**
 * Timeline 标签管理
 */

import type { TimelineLabel } from './types'

/**
 * 标签管理器
 */
export class LabelManager {
  private labels: Map<string, number> = new Map()

  /**
   * 添加标签
   * @param name - 标签名称
   * @param time - 时间位置
   */
  add(name: string, time: number): void {
    this.labels.set(name, time)
  }

  /**
   * 获取标签时间
   * @param name - 标签名称
   */
  get(name: string): number | undefined {
    return this.labels.get(name)
  }

  /**
   * 检查标签是否存在
   * @param name - 标签名称
   */
  has(name: string): boolean {
    return this.labels.has(name)
  }

  /**
   * 删除标签
   * @param name - 标签名称
   */
  remove(name: string): void {
    this.labels.delete(name)
  }

  /**
   * 清空所有标签
   */
  clear(): void {
    this.labels.clear()
  }

  /**
   * 获取所有标签
   */
  getAll(): TimelineLabel[] {
    return Array.from(this.labels.entries()).map(([name, time]) => ({
      name,
      time,
    }))
  }
}






