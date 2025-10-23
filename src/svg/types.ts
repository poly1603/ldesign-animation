/**
 * SVG 动画类型定义
 */

/**
 * SVG 路径动画配置
 */
export interface SVGPathConfig {
  duration?: number
  easing?: string
  onComplete?: () => void
  onUpdate?: (progress: number) => void
}

/**
 * SVG 变形配置
 */
export interface SVGMorphConfig extends SVGPathConfig {
  shape?: 'circle' | 'rect' | 'polygon' | 'path'
}






