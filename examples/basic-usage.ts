import {
  AnimationManager,
  TransitionManager,
  SequenceManager,
  createAnimationManager,
  createTransitionManager,
  createSequenceManager,
  presetAnimations,
  commonAnimations
} from '../src/index'

// 基本使用示例
console.log('LDesign Animation Package - Basic Usage Example')

// 创建管理器实例
const animationManager = createAnimationManager({
  duration: 1000,
  easing: 'ease-in-out'
})

const transitionManager = createTransitionManager({
  duration: 300,
  easing: 'ease-out'
})

const sequenceManager = createSequenceManager({
  loop: false,
  autoStart: false
})

console.log('✅ 管理器创建成功')
console.log('- AnimationManager:', animationManager)
console.log('- TransitionManager:', transitionManager)
console.log('- SequenceManager:', sequenceManager)

// 预设动画
console.log('\n✅ 预设动画配置:')
console.log('- fadeIn:', presetAnimations.fadeIn)
console.log('- slideInLeft:', presetAnimations.slideInLeft)
console.log('- scaleIn:', presetAnimations.scaleIn)
console.log('- bounce:', presetAnimations.bounce)

// 常用动画函数
console.log('\n✅ 常用动画函数:')
console.log('- fade:', typeof commonAnimations.fade)
console.log('- slide:', typeof commonAnimations.slide)
console.log('- scale:', typeof commonAnimations.scale)
console.log('- bounce:', typeof commonAnimations.bounce)

console.log('\n🎉 Animation包功能验证完成！')