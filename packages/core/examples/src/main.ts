/**
 * @ldesign/animation-core 演示示例主入口
 */

console.log('🎨 @ldesign/animation-core 演示示例')
console.log('提示：实际动画功能需要实现 animation-core 的核心代码后才能正常工作')

// 演示代码框架
// 实际功能需要在 core/src 中实现具体的动画引擎

// ==================== 基础动画演示 ====================
const basicBox = document.getElementById('basic-box')
const basicBtn = document.getElementById('basic-btn')

if (basicBtn && basicBox) {
  basicBtn.addEventListener('click', () => {
    // 临时演示效果（使用原生 CSS）
    basicBox.style.transition = 'all 1s ease'
    basicBox.style.transform = 'translateX(100px) rotate(360deg) scale(1.2)'
    
    setTimeout(() => {
      basicBox.style.transform = 'translateX(0) rotate(0deg) scale(1)'
    }, 1000)
    
    console.log('▶️ 基础动画播放')
    
    // TODO: 替换为真实的 animation-core API
    // import { animate } from '@ldesign/animation-core'
    // animate({
    //   targets: basicBox,
    //   translateX: 100,
    //   rotate: 360,
    //   scale: 1.2,
    //   duration: 1000,
    //   easing: 'easeOutExpo'
    // })
  })
}

basicBox?.addEventListener('click', () => {
  basicBox.style.transition = 'all 0.3s ease'
  basicBox.style.transform = 'scale(1.1) rotate(10deg)'
  
  setTimeout(() => {
    basicBox.style.transform = 'scale(1) rotate(0deg)'
  }, 300)
})

// ==================== 时间轴动画演示 ====================
const timelineBtn = document.getElementById('timeline-btn')
const timelineBoxes = [
  document.getElementById('timeline-box-1'),
  document.getElementById('timeline-box-2'),
  document.getElementById('timeline-box-3'),
]

if (timelineBtn) {
  timelineBtn.addEventListener('click', () => {
    console.log('⏱️ 时间轴动画播放')
    
    // 临时演示效果
    timelineBoxes.forEach((box, index) => {
      if (box) {
        setTimeout(() => {
          box.style.transition = 'all 0.5s ease'
          box.style.transform = 'translateY(-50px) rotate(360deg)'
          
          setTimeout(() => {
            box.style.transform = 'translateY(0) rotate(0deg)'
          }, 500)
        }, index * 200)
      }
    })
    
    // TODO: 替换为真实的 Timeline API
    // import { Timeline } from '@ldesign/animation-core/timeline'
    // const timeline = new Timeline()
    // timeline
    //   .add({ targets: '#timeline-box-1', translateY: -50, rotate: 360, duration: 500 })
    //   .add({ targets: '#timeline-box-2', translateY: -50, rotate: 360, duration: 500 }, '-=300')
    //   .add({ targets: '#timeline-box-3', translateY: -50, rotate: 360, duration: 500 }, '-=300')
    //   .play()
  })
}

// ==================== 物理动画演示 ====================
const physicsBtn = document.getElementById('physics-btn')
const physicsBox = document.getElementById('physics-box')

if (physicsBtn && physicsBox) {
  physicsBtn.addEventListener('click', () => {
    console.log('🎪 物理动画播放')
    
    // 临时演示效果（模拟弹簧）
    physicsBox.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    physicsBox.style.transform = 'translateY(-100px) scale(1.3)'
    
    setTimeout(() => {
      physicsBox.style.transform = 'translateY(0) scale(1)'
    }, 800)
    
    // TODO: 替换为真实的 physics API
    // import { spring } from '@ldesign/animation-core/physics'
    // spring({
    //   targets: physicsBox,
    //   translateY: -100,
    //   scale: 1.3,
    //   stiffness: 200,
    //   damping: 10,
    //   mass: 1
    // })
  })
}

// ==================== 手势拖拽演示 ====================
const gestureBox = document.getElementById('gesture-box')

if (gestureBox) {
  let isDragging = false
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0

  gestureBox.addEventListener('mousedown', (e) => {
    isDragging = true
    startX = e.clientX - currentX
    startY = e.clientY - currentY
    gestureBox.style.cursor = 'grabbing'
    gestureBox.style.transition = 'none'
    console.log('🖱️ 开始拖拽')
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    
    currentX = e.clientX - startX
    currentY = e.clientY - startY
    
    if (gestureBox) {
      gestureBox.style.transform = `translate(${currentX}px, ${currentY}px)`
    }
  })

  document.addEventListener('mouseup', () => {
    if (!isDragging) return
    
    isDragging = false
    if (gestureBox) {
      gestureBox.style.cursor = 'pointer'
      gestureBox.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      gestureBox.style.transform = 'translate(0, 0)'
      currentX = 0
      currentY = 0
    }
    console.log('🖱️ 结束拖拽')
  })
  
  // TODO: 替换为真实的 gesture API
  // import { useDraggable } from '@ldesign/animation-core/gesture'
  // useDraggable(gestureBox, {
  //   bounds: 'parent',
  //   inertia: true,
  //   onDrag: (e) => console.log('拖拽中', e),
  //   onDragEnd: (e) => console.log('拖拽结束', e)
  // })
}

// ==================== SVG 动画演示 ====================
const svgBtn = document.getElementById('svg-btn')
const svgPath = document.getElementById('svg-path') as SVGPathElement | null

if (svgBtn && svgPath) {
  svgBtn.addEventListener('click', () => {
    console.log('🎨 SVG 路径动画播放')
    
    // 临时演示效果
    const length = svgPath.getTotalLength()
    svgPath.style.strokeDasharray = `${length}`
    svgPath.style.strokeDashoffset = `${length}`
    svgPath.style.transition = 'stroke-dashoffset 2s ease'
    
    setTimeout(() => {
      svgPath.style.strokeDashoffset = '0'
    }, 10)
    
    // TODO: 替换为真实的 svg API
    // import { svgPath as animateSvgPath } from '@ldesign/animation-core/svg'
    // animateSvgPath({
    //   targets: svgPath,
    //   strokeDashoffset: [length, 0],
    //   duration: 2000,
    //   easing: 'easeInOutSine'
    // })
  })
}

// ==================== 缓动函数演示 ====================
const easingBtn = document.getElementById('easing-btn')
const easingBox = document.getElementById('easing-box')

if (easingBtn && easingBox) {
  const easings = [
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  ]
  let currentEasing = 0

  easingBtn.addEventListener('click', () => {
    const easing = easings[currentEasing]
    console.log(`📈 缓动函数: ${easing}`)
    
    easingBox.style.transition = `all 1s ${easing}`
    easingBox.style.transform = 'translateX(150px)'
    
    setTimeout(() => {
      easingBox.style.transform = 'translateX(0)'
    }, 1000)
    
    currentEasing = (currentEasing + 1) % easings.length
  })
}

// ==================== 滚动动画演示 ====================
const scrollSection = document.getElementById('scroll-section')
const scrollContent = document.getElementById('scroll-content')

if (scrollSection && scrollContent) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('📜 滚动触发动画')
          scrollContent.style.transition = 'all 1s ease'
          scrollContent.style.opacity = '1'
          scrollContent.style.transform = 'translateY(0)'
        }
      })
    },
    { threshold: 0.5 }
  )
  
  observer.observe(scrollSection)
  
  // TODO: 替换为真实的 scroll API
  // import { scrollTrigger } from '@ldesign/animation-core/scroll'
  // scrollTrigger({
  //   trigger: scrollSection,
  //   start: 'top center',
  //   end: 'bottom center',
  //   onEnter: () => {
  //     animate({
  //       targets: scrollContent,
  //       opacity: [0, 1],
  //       translateY: [50, 0],
  //       duration: 1000,
  //       easing: 'easeOutExpo'
  //     })
  //   }
  // })
}

console.log('')
console.log('📝 提示：')
console.log('当前演示使用原生 CSS 过渡效果')
console.log('实现 @ldesign/animation-core 核心功能后，可以替换为更强大的动画引擎')
console.log('')


