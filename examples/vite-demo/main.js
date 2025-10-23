/**
 * @ldesign/animation Vite 示例项目
 * 
 * 通过包名引入，展示所有动画功能
 */

import {
  to,
  from,
  fromTo,
  keyframes,
  createTimeline,
  fadeIn,
  slideInUp,
  slideInLeft,
  slideInRight,
  zoomIn,
  rotateIn,
  scrollFadeIn,
  scrollSlideInUp,
  scrollSlideInLeft,
  scrollSlideInRight,
  spring,
  springPresets,
  inertia,
  draggable,
  gesture,
  parallax,
  createParticleSystem,
  typewriter,
  animateChars,
  splitText,
} from '@ldesign/animation'

// ============ 全局状态 ============
const state = {
  timeline: null,
  overlapTimeline: null,
  labelTimeline: null,
  dragInstance: null,
  gestureInstance: null,
  particleSystem: null,
}

// ============ 导航切换 ============
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn')
  const sections = document.querySelectorAll('.section')

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.dataset.section

      // 更新按钮状态
      navBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      // 更新内容区域
      sections.forEach(section => {
        section.classList.remove('active')
        if (section.id === targetSection) {
          section.classList.add('active')
        }
      })
    })
  })
}

// ============ 基础动画演示 ============
const basicDemos = {
  animateTo() {
    to('#basic-box1', { x: 200, rotate: 360 }, {
      duration: 1000,
      easing: 'easeOutCubic'
    })
  },

  animateScale() {
    to('#basic-box1', { scale: 1.5 }, {
      duration: 600,
      easing: 'easeOutBack'
    })
  },

  animateOpacity() {
    to('#basic-box1', { opacity: 0.3 }, {
      duration: 800,
      easing: 'easeInOutQuad'
    })
  },

  animateFrom() {
    from('#basic-box2', { opacity: 0, scale: 0 }, {
      duration: 800,
      easing: 'easeOutBack'
    })
  },

  animateFromScale() {
    from('#basic-box2', { scale: 0, rotate: -180 }, {
      duration: 1000,
      easing: 'easeOutElastic'
    })
  },

  animateFromTo() {
    fromTo(
      '#basic-box3',
      { x: -200, scale: 0.5, rotate: -180 },
      { x: 200, scale: 1.5, rotate: 180 },
      {
        duration: 1500,
        easing: 'easeInOutCubic'
      }
    )
  },

  animateKeyframes() {
    keyframes('#basic-box4', [
      { x: 0, y: 0, rotate: 0, scale: 1 },
      { x: 100, y: -50, rotate: 90, scale: 1.2 },
      { x: 200, y: 0, rotate: 180, scale: 1 },
      { x: 100, y: 50, rotate: 270, scale: 0.8 },
      { x: 0, y: 0, rotate: 360, scale: 1 }
    ], {
      duration: 500,
      easing: 'easeInOutCubic'
    })
  },

  animateCircle() {
    const radius = 100
    const frames = []
    for (let i = 0; i <= 360; i += 30) {
      const angle = (i * Math.PI) / 180
      frames.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotate: i
      })
    }
    keyframes('#basic-box4', frames, {
      duration: 300,
      easing: 'linear'
    })
  },

  reset(id) {
    to(`#${id}`, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1
    }, {
      duration: 500,
      easing: 'easeOutCubic'
    })
  }
}

// ============ Timeline 演示 ============
const timelineDemos = {
  playSequence() {
    if (!state.timeline) {
      state.timeline = createTimeline({
        onComplete: () => console.log('Timeline 完成!')
      })
      state.timeline
        .to('#tl-box1', { x: 200, rotate: 360 }, { duration: 800 })
        .to('#tl-box2', { y: -100, scale: 1.5 }, { duration: 600 })
        .to('#tl-box3', { x: 200, rotate: -360 }, { duration: 800 })
    }
    state.timeline.play()
  },

  pauseTimeline() {
    state.timeline?.pause()
  },

  restartTimeline() {
    state.timeline?.restart()
  },

  reverseTimeline() {
    state.timeline?.reverse()
  },

  playOverlap() {
    if (!state.overlapTimeline) {
      state.overlapTimeline = createTimeline()
      state.overlapTimeline
        .to('#tl-overlap1', { x: 150 }, { duration: 1000 })
        .to('#tl-overlap2', { x: 150 }, { duration: 1000 }, '-=0.7') // 重叠 0.7s
        .to('#tl-overlap3', { x: 150 }, { duration: 1000 }, '<') // 同时开始
    }
    state.overlapTimeline.play()
  },

  playLabels() {
    if (!state.labelTimeline) {
      state.labelTimeline = createTimeline()
      state.labelTimeline
        .to('#tl-label1', { x: 100 }, { duration: 500 })
        .addLabel('scene1')
        .to('#tl-label1', { y: -50, rotate: 90 }, { duration: 500 })
        .addLabel('scene2')
        .to('#tl-label1', { x: 200, rotate: 180 }, { duration: 500 })
        .addLabel('scene3')
        .to('#tl-label1', { y: 0, rotate: 360 }, { duration: 500 })
    }
    state.labelTimeline.play()
  },

  seekToScene(sceneName) {
    state.labelTimeline?.seek(sceneName)
  },

  reset() {
    ;['#tl-overlap1', '#tl-overlap2', '#tl-overlap3'].forEach(id => {
      to(id, { x: 0 }, { duration: 500 })
    })
  }
}

// ============ 滚动动画演示 ============
function initScrollAnimations() {
  const items = document.querySelectorAll('.scroll-item')

  items.forEach(item => {
    const animType = item.dataset.scroll

    switch (animType) {
      case 'fade':
        scrollFadeIn(item)
        break
      case 'slide-up':
        scrollSlideInUp(item)
        break
      case 'slide-left':
        scrollSlideInLeft(item)
        break
      case 'slide-right':
        scrollSlideInRight(item)
        break
      case 'zoom':
        item.style.opacity = '0'
        item.style.transform = 'scale(0)'
        zoomIn(item)
        break
      case 'rotate':
        item.style.opacity = '0'
        rotateIn(item)
        break
    }
  })
}

// ============ 物理动画演示 ============
const physicsDemos = {
  springGentle() {
    spring(document.querySelector('#spring-box'), 'x', 200, springPresets.gentle)
  },

  springWobbly() {
    spring(document.querySelector('#spring-box'), 'x', 200, springPresets.wobbly)
  },

  springStiff() {
    spring(document.querySelector('#spring-box'), 'x', 200, springPresets.stiff)
  },

  springBouncy() {
    spring(document.querySelector('#spring-box'), 'x', 200, springPresets.bouncy)
  },

  inertiaFast() {
    inertia(document.querySelector('#inertia-box'), 'x', {
      velocity: 2000,
      friction: 0.95
    })
  },

  inertiaSlow() {
    inertia(document.querySelector('#inertia-box'), 'x', {
      velocity: 500,
      friction: 0.9
    })
  },

  inertiaBounce() {
    inertia(document.querySelector('#inertia-box'), 'x', {
      velocity: 1500,
      friction: 0.92,
      min: 0,
      max: 400,
      bounce: 0.6
    })
  },

  reset(id) {
    to(`#${id}`, { x: 0 }, { duration: 500 })
  }
}

// ============ 手势动画演示 ============
function initGestureAnimations() {
  // 拖拽
  const dragBox = document.querySelector('#drag-box')
  if (dragBox) {
    state.dragInstance = draggable(dragBox, {
      bounds: {
        left: 0,
        right: 480,
        top: 0,
        bottom: 180
      },
      inertia: true,
      onDragStart: () => {
        dragBox.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)'
      },
      onDragEnd: () => {
        dragBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
      }
    })
  }

  // 手势识别
  const gestureBox = document.querySelector('#gesture-box')
  const gestureInfo = document.querySelector('#gesture-info')
  if (gestureBox && gestureInfo) {
    state.gestureInstance = gesture(gestureBox)

    state.gestureInstance
      .on('hover', () => {
        gestureInfo.textContent = '悬停中...'
      })
      .on('tap', () => {
        gestureInfo.textContent = '点击!'
        to(gestureBox, { scale: 1.1 }, {
          duration: 200,
          yoyo: true,
          repeat: 1
        })
      })
      .on('press', () => {
        gestureInfo.textContent = '长按!'
        to(gestureBox, { scale: 0.9 }, { duration: 200 })
      })
      .on('swipe', (e) => {
        const direction = Math.abs(e.delta.x) > Math.abs(e.delta.y) ? '水平' : '垂直'
        gestureInfo.textContent = `滑动 (${direction})`
      })
  }
}

// ============ 高级效果演示 ============
const effectsDemos = {
  initParallax() {
    parallax('#parallax-bg', { speed: 0.3 })
    parallax('#parallax-mid', { speed: 0.5 })
    parallax('#parallax-front', { speed: 0.7 })
  },

  initParticles() {
    const canvas = document.querySelector('#particle-canvas')
    if (canvas) {
      state.particleSystem = createParticleSystem(canvas, {
        count: 50,
        speed: 3,
        size: 3,
        color: '#667eea',
        lifetime: 2000,
        gravity: 0.2
      })
    }
  },

  emitParticles() {
    state.particleSystem?.emit(300, 150, 30)
  },

  emitExplosion() {
    state.particleSystem?.emit(300, 150, 100)
  },

  clearParticles() {
    state.particleSystem?.clear()
  },

  async typewriter() {
    const textDemo = document.querySelector('#text-demo')
    textDemo.textContent = ''
    await typewriter(textDemo, 'Hello, @ldesign/animation! 这是一个完整的动画库。', {
      speed: 80,
      cursor: true
    })
  },

  animateChars() {
    const textDemo = document.querySelector('#text-demo')
    textDemo.textContent = 'Amazing Animations!'
    animateChars(textDemo, {
      duration: 600,
      stagger: 50,
      easing: 'easeOutCubic'
    })
  },

  resetText() {
    const textDemo = document.querySelector('#text-demo')
    textDemo.textContent = 'Hello, @ldesign/animation!'
  }
}

// ============ 初始化 ============
function init() {
  console.log('🎬 @ldesign/animation Demo 已加载')

  // 初始化导航
  initNavigation()

  // 初始化滚动动画
  initScrollAnimations()

  // 初始化手势
  initGestureAnimations()

  // 初始化视差
  effectsDemos.initParallax()

  // 初始化粒子系统
  effectsDemos.initParticles()

  // 暴露到全局供按钮调用
  window.demos = {
    basic: basicDemos,
    timeline: timelineDemos,
    physics: physicsDemos,
    effects: effectsDemos
  }
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}






