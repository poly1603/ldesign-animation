/**
 * @ldesign/animation-lit 演示示例主入口
 */

console.log('🧩 @ldesign/animation-lit 演示示例')
console.log('提示：实际动画功能需要实现 animation-lit 的核心代码后才能正常工作')

// 演示代码框架
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn')
  const boxes = document.querySelectorAll('.demo-box')

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const box = boxes[index] as HTMLElement
      if (box) {
        box.style.transition = 'all 1s ease'
        box.style.transform = 'translateY(-30px) rotate(360deg) scale(1.2)'
        
        setTimeout(() => {
          box.style.transform = 'translateY(0) rotate(0deg) scale(1)'
        }, 1000)
        
        console.log(`▶️ 演示 ${index + 1} 播放`)
      }
    })
  })
})


