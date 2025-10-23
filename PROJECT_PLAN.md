# @ldesign/animation 完整项目计划书

<div align="center">

# 🎬 @ldesign/animation v0.1.0

**动画库 - CSS/JS 动画、过渡效果、滚动动画、物理动画**

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](./CHANGELOG.md)
[![Animations](https://img.shields.io/badge/animations-50+-green.svg)](#功能清单)
[![Frameworks](https://img.shields.io/badge/frameworks-Vue%20%2B%20React-blue.svg)](#技术栈)

</div>

---

## 📚 参考项目深度分析

### 1. GSAP (GreenSock) (★★★★★)

**项目信息**:
- 官网: https://greensock.com/gsap/
- Stars: 18,000+
- 定位: 专业动画库
- 特色: 性能最强

**核心特点**:
- ✅ 极致性能（比 CSS 更快）
- ✅ 时间轴动画（Timeline）
- ✅ 缓动函数（100+）
- ✅ 插件生态（ScrollTrigger/Draggable）
- ✅ 跨浏览器兼容
- ✅ SVG 动画支持

**借鉴要点**:
1. **gsap.to/from/fromTo** - 简洁的 API
2. **Timeline** - 时间轴动画序列
3. **Easing** - 丰富的缓动函数
4. **ScrollTrigger** - 滚动触发动画
5. **性能优化** - RAF + GPU 加速

**功能借鉴**:
- [ ] to/from/fromTo API
- [ ] Timeline 时间轴
- [ ] 缓动函数库（30+）
- [ ] 滚动触发器
- [ ] GPU 加速

### 2. framer-motion (★★★★★)

**项目信息**:
- GitHub: https://github.com/framer/motion
- Stars: 22,000+
- 团队: Framer
- 定位: React 动画库

**核心特点**:
- ✅ React 深度集成
- ✅ 声明式 API
- ✅ 手势支持（拖拽/点击/悬停）
- ✅ 布局动画
- ✅ SVG 路径动画
- ✅ 变体（variants）系统

**借鉴要点**:
1. **<motion.*>** - motion.div/motion.button
2. **variants** - 动画变体系统
3. **手势** - whileHover/whileTap/whileDrag
4. **布局动画** - layout prop 自动动画
5. **AnimatePresence** - 进入/退出动画

**功能借鉴**:
- [ ] 声明式 API
- [ ] Variants 系统
- [ ] 手势动画
- [ ] 布局动画
- [ ] AnimatePresence

### 3. anime.js (★★★★☆)

**项目信息**:
- GitHub: https://github.com/juliangarnier/anime
- Stars: 49,000+
- 定位: 轻量动画引擎
- 特色: 极简强大

**核心特点**:
- ✅ 轻量级（9KB）
- ✅ 关键帧动画
- ✅ SVG 动画
- ✅ 时间轴
- ✅ 缓动函数
- ✅ 零依赖

**借鉴要点**:
1. **anime() API** - 统一的动画 API
2. **关键帧** - keyframes 数组
3. **时间轴** - timeline() 创建
4. **targets** - CSS 选择器或元素
5. **stagger** - 交错动画

**功能借鉴**:
- [ ] 统一动画 API
- [ ] 关键帧动画
- [ ] 时间轴动画
- [ ] 交错动画
- [ ] SVG 动画

### 4. AOS (Animate On Scroll) (★★★★☆)

**项目信息**:
- GitHub: https://github.com/michalsnik/aos
- Stars: 26,000+
- 定位: 滚动动画库
- 特色: 简单易用

**核心特点**:
- ✅ 滚动触发动画
- ✅ 数据属性配置
- ✅ 预设动画（30+）
- ✅ Intersection Observer
- ✅ 响应式动画
- ✅ 零依赖

**借鉴要点**:
1. **data-aos** - data-aos="fade-up"
2. **预设动画** - fade/slide/zoom/flip
3. **Offset/Delay** - data-aos-offset, data-aos-delay
4. **Duration** - data-aos-duration
5. **Easing** - data-aos-easing

**功能借鉴**:
- [ ] 滚动触发系统
- [ ] data-* 属性配置
- [ ] 预设动画库
- [ ] IntersectionObserver
- [ ] 响应式动画

### 5. Motion One (★★★★☆)

**项目信息**:
- GitHub: https://github.com/motiondivision/motionone
- Stars: 4,000+
- 定位: Web Animations API 封装
- 特色: 原生性能

**核心特点**:
- ✅ 基于 Web Animations API
- ✅ 极小体积（3.8KB）
- ✅ 高性能
- ✅ Spring 物理动画
- ✅ Scroll 动画
- ✅ 时间轴

**借鉴要点**:
1. **animate()** - animate(element, { x: 100 })
2. **Spring 动画** - spring() 物理动画
3. **Scroll** - scroll() 滚动动画
4. **Timeline** - timeline() 时间轴
5. **Inertia** - inertia() 惯性动画

**功能借鉴**:
- [ ] Web Animations API
- [ ] Spring 物理动画
- [ ] Scroll 动画
- [ ] Inertia 惯性动画

### 参考项目功能对比

| 功能 | GSAP | framer-motion | anime.js | AOS | motion-one | **@ldesign/animation** |
|------|------|---------------|----------|-----|------------|----------------------|
| CSS 动画 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| JS 动画 | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| 时间轴 | ✅ | ⚠️ | ✅ | ❌ | ✅ | ✅ 🎯 |
| 滚动动画 | ✅插件 | ⚠️ | ❌ | ✅ | ✅ | ✅ 🎯 |
| 物理动画 | ⚠️ | ✅ | ❌ | ❌ | ✅ | ✅ 🎯 |
| 手势动画 | ✅插件 | ✅ | ❌ | ❌ | ⚠️ | ✅ 🎯 |
| Vue 集成 | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ 🎯 |
| React 集成 | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ 🎯 |
| Bundle 大小 | 53KB | 50KB | 9KB | 7KB | 3.8KB | **<20KB** 🎯 |
| 商业许可 | 付费 | MIT | MIT | MIT | MIT | **MIT** ✅ |

**总结**: @ldesign/animation 结合性能（GSAP）+ React 集成（framer-motion）+ 滚动（AOS）+ 物理（motion-one）。

---

## ✨ 功能清单

### P0 核心功能（25项）

#### CSS 动画预设（12个）

- [x] **fadeIn/fadeOut** - 淡入淡出（参考: AOS）
  - ✅ opacity 过渡
  - ✅ duration 控制
  - ✅ easing 控制

- [ ] **slideUp/slideDown/slideLeft/slideRight** - 滑动（参考: AOS）
  - transform: translateY/translateX
  - 4 个方向

- [ ] **zoomIn/zoomOut** - 缩放（参考: AOS）
  - transform: scale
  - transform-origin 控制

- [ ] **flipX/flipY** - 翻转（参考: AOS）
  - transform: rotateX/rotateY
  - perspective 效果

- [ ] **bounceIn/bounceOut** - 弹跳
  - cubic-bezier 缓动
  - 弹性效果

- [ ] **rotateIn/rotateOut** - 旋转
  - transform: rotate
  - 旋转中心控制

#### JavaScript 动画引擎

- [ ] **animate() API** - 基础动画（参考: motion-one）
  ```typescript
  animate(element, {
    x: 100,
    y: 50,
    opacity: 0.5
  }, {
    duration: 1000,
    easing: 'ease-in-out'
  })
  ```

- [ ] **to/from/fromTo** - 动画方向（参考: GSAP）
  ```typescript
  to(element, { x: 100 })         // 从当前到目标
  from(element, { x: 0 })         // 从起点到当前
  fromTo(element, { x: 0 }, { x: 100 })  // 从起点到终点
  ```

- [ ] **属性动画** - Property Animation（参考: GSAP）
  - 数字属性（x, y, width, opacity）
  - 颜色属性（color, backgroundColor）
  - 变换属性（scale, rotate, skew）
  - 自动单位（px, %, em, rem）

- [ ] **缓动函数** - Easing Functions（参考: GSAP）
  - 内置 30+ 缓动函数
  - ease, ease-in, ease-out, ease-in-out
  - cubic-bezier 自定义
  - elastic, bounce, back

#### 时间轴动画

- [ ] **Timeline 类** - 时间轴（参考: GSAP）
  ```typescript
  const tl = createTimeline()
  tl.to(el1, { x: 100 })
    .to(el2, { y: 50 })
    .to(el3, { opacity: 0 }, '-=0.5')  // 重叠
  ```

- [ ] **时间控制** - Timeline Control（参考: GSAP）
  - play/pause/reverse/restart
  - seek(time) - 跳转到指定时间
  - progress(0-1) - 设置进度
  - timeScale(speed) - 播放速度

- [ ] **时间标签** - Labels（参考: GSAP）
  - addLabel('scene1')
  - seek('scene1')
  - 关键帧标记

#### 关键帧动画

- [ ] **keyframes** - 关键帧（参考: anime.js）
  ```typescript
  animate(element, {
    keyframes: [
      { x: 0, opacity: 0 },
      { x: 50, opacity: 0.5 },
      { x: 100, opacity: 1 }
    ]
  })
  ```

### P1 高级功能（18项）

#### 滚动动画

- [ ] **ScrollTrigger** - 滚动触发（参考: GSAP/AOS）
  - 滚动到元素时触发
  - 滚动进度动画
  - 视差滚动
  - 固定元素（pin）
  - 滚动速度控制

- [ ] **IntersectionObserver** - 视口检测（参考: AOS）
  - 元素进入视口
  - 元素离开视口
  - 阈值控制
  - rootMargin 配置

- [ ] **滚动预设动画** - Scroll Presets（参考: AOS）
  - fade-up/down/left/right
  - slide-up/down/left/right
  - zoom-in/out
  - flip-up/down/left/right

#### 物理动画

- [ ] **Spring 动画** - 弹簧动画（参考: framer-motion, motion-one）
  - 物理参数（mass, stiffness, damping）
  - 自然运动
  - 弹性效果

- [ ] **Inertia 动画** - 惯性动画（参考: motion-one）
  - 惯性滑动
  - 速度衰减
  - 边界弹回

- [ ] **Physics Engine** - 物理引擎（参考: GSAP Physics2D）
  - 重力
  - 摩擦力
  - 碰撞检测

#### 手势动画

- [ ] **Drag 动画** - 拖拽动画（参考: framer-motion）
  - 拖拽跟随
  - 拖拽约束（bounds）
  - 拖拽惯性
  - onDragStart/End

- [ ] **手势识别** - Gesture（参考: framer-motion）
  - hover 悬停
  - tap 点击
  - press 长按
  - swipe 滑动
  - pinch 捏合

#### SVG 动画

- [ ] **SVG 路径动画** - Path Animation（参考: GSAP）
  - drawSVG 描边动画
  - morphSVG 形状变形
  - motionPath 路径跟随

- [ ] **SVG 变换** - SVG Transform（参考: anime.js）
  - transform-origin
  - SVG 特殊属性

#### 过渡效果

- [ ] **Page Transition** - 页面过渡（参考: framer-motion）
  - 路由切换动画
  - 共享元素动画
  - 进入/退出动画

- [ ] **List Transition** - 列表过渡（参考: Vue/React）
  - FLIP 动画
  - 重排动画
  - 增删动画

### P2 扩展功能（10项）

#### 高级动画

- [ ] **Parallax 视差** - 视差滚动
  - 多层视差
  - 速度差异
  - 3D 视差

- [ ] **粒子动画** - Particle Animation
  - 粒子系统
  - 粒子发射器
  - 粒子效果

- [ ] **文字动画** - Text Animation
  - 逐字动画
  - 打字机效果
  - 文字分割

#### 动画工具

- [ ] **动画编辑器** - Animation Editor
  - 可视化编辑
  - 时间轴编辑
  - 导出代码

- [ ] **动画预览** - Preview Tool
  - 实时预览
  - 参数调节
  - 导出 GIF

#### 框架组件

- [ ] **Vue 组件** - <Transition>增强
  - <AnimateIn>
  - <AnimateOnScroll>
  - <AnimateList>

- [ ] **React 组件** - Motion 组件
  - <Motion>
  - <AnimatePresence>
  - <ScrollAnimate>

---

## 🏗️ 架构设计

```
┌────────────────────────────────────────────────────┐
│            @ldesign/animation                       │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────┐      ┌──────────────┐          │
│  │  Animation   │ ────▶│   Engine     │          │
│  │  Core        │      │              │          │
│  │              │      │ - RAF        │          │
│  │ - to/from    │      │ - Easing     │          │
│  │ - keyframes  │      │ - Tween      │          │
│  └──────────────┘      └──────────────┘          │
│         │                      │                  │
│         ▼                      ▼                  │
│  ┌──────────────┐      ┌──────────────┐          │
│  │  Timeline    │      │  Scroll      │          │
│  │              │      │  Trigger     │          │
│  │ - sequence   │      │              │          │
│  │ - control    │      │ - observer   │          │
│  └──────────────┘      └──────────────┘          │
│                                                    │
│  ┌────────────────────────────────────────┐      │
│  │         预设动画库                      │      │
│  ├─ CSS Presets（fade/slide/zoom）        │      │
│  ├─ Scroll Presets（fade-up/slide-in）   │      │
│  └─ Physics Presets（spring/bounce）     │      │
│  └────────────────────────────────────────┘      │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🛠️ 技术栈

### 核心技术

- **TypeScript 5.7+**
- **Web Animations API** - 原生动画
- **RAF (requestAnimationFrame)** - 性能优化
- **IntersectionObserver** - 滚动检测
- **CSS Transitions/Animations** - CSS 动画

### 内部依赖

```json
{
  "dependencies": {
    "@ldesign/shared": "workspace:*"
  }
}
```

---

## 🗺️ 开发路线图

### v0.1.0 - MVP（当前）

**已完成**:
- [x] Animation 核心类
- [x] fadeIn/fadeOut

**待完成**:
- [ ] 12 个 CSS 预设
- [ ] 基础 API
- [ ] 文档

### v0.2.0 - 核心动画（4周）

**功能**:
- [ ] to/from/fromTo API
- [ ] Timeline 时间轴
- [ ] 30+ 缓动函数
- [ ] 关键帧动画
- [ ] 完整测试

### v0.3.0 - 滚动和物理（5周）

**功能**:
- [ ] ScrollTrigger
- [ ] Spring 物理动画
- [ ] Inertia 惯性
- [ ] 手势动画
- [ ] Vue/React 组件

### v1.0.0 - 完整功能（10周）

**功能**:
- [ ] 所有高级功能
- [ ] 动画编辑器
- [ ] 完整文档
- [ ] 示例库

---

**文档版本**: 1.0  
**创建时间**: 2025-10-22






