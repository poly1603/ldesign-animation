#!/usr/bin/env node

/**
 * 完整验证脚本 - 验证动画库的所有功能和修复
 * 运行: node verify-fixes.js
 */

const { AnimationManager } = require('./dist/ldesign-animation.umd.js');
const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

// 测试结果收集
const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  tests: [],
  startTime: Date.now(),
  categories: {
    core: { passed: 0, failed: 0 },
    css: { passed: 0, failed: 0 },
    js: { passed: 0, failed: 0 },
    sequence: { passed: 0, failed: 0 },
    transition: { passed: 0, failed: 0 },
    performance: { passed: 0, failed: 0 },
    vue: { passed: 0, failed: 0 }
  }
};

// 测试工具函数
function test(name, fn, category = 'core', skip = false) {
  if (skip) {
    results.skipped++;
    results.tests.push({ name, status: 'SKIP', category });
    console.log(`⏭️  ${name} - SKIPPED`);
    return;
  }

  try {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;
    
    if (result) {
      results.passed++;
      results.categories[category].passed++;
      results.tests.push({ 
        name, 
        status: 'PASS', 
        category, 
        duration: `${duration.toFixed(2)}ms` 
      });
      console.log(`✅ ${name} - ${duration.toFixed(2)}ms`);
    } else {
      results.failed++;
      results.categories[category].failed++;
      results.tests.push({ 
        name, 
        status: 'FAIL', 
        category, 
        duration: `${duration.toFixed(2)}ms`, 
        error: 'Test returned false' 
      });
      console.log(`❌ ${name} - Test failed`);
    }
  } catch (error) {
    results.failed++;
    results.categories[category].failed++;
    results.tests.push({ 
      name, 
      status: 'ERROR', 
      category, 
      error: error.message 
    });
    console.log(`❌ ${name} - Error: ${error.message}`);
  }
}

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    getComputedStyle: () => ({}),
    innerWidth: 1920,
    innerHeight: 1080
  };
  global.document = {
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      getBoundingClientRect: () => ({ width: 100, height: 100, top: 0, left: 0 })
    }),
    querySelector: () => null,
    querySelectorAll: () => []
  };
}

console.log('🚀 开始完整验证动画库功能...\n');

// ===== 核心功能测试 =====
console.log('📦 核心功能测试');

test('AnimationManager 实例化', () => {
  const manager = new AnimationManager();
  return manager && 
    typeof manager.create === 'function' &&
    typeof manager.sequence === 'function' &&
    typeof manager.parallel === 'function';
}, 'core');

test('AnimationManager 配置选项', () => {
  const manager = new AnimationManager({
    defaultDuration: 500,
    defaultEasing: 'ease-out'
  });
  return manager.config.defaultDuration === 500 &&
    manager.config.defaultEasing === 'ease-out';
}, 'core');

test('创建基础动画', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 1000
  });
  return animation && 
    typeof animation.play === 'function' &&
    animation.config.duration === 1000;
}, 'core');

// ===== CSS动画测试 =====
console.log('\n🎨 CSS动画测试');

test('CSS动画控制器', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'css',
    properties: { transform: 'translateX(100px)' },
    duration: 500
  });
  return animation && animation.type === 'css';
}, 'css');

test('CSS过渡动画', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'css',
    properties: { 
      opacity: 1,
      transform: 'scale(1.2) rotate(45deg)'
    },
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
  return animation && animation.config.easing.includes('cubic-bezier');
}, 'css');

test('CSS关键帧动画', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'css',
    keyframes: {
      '0%': { opacity: 0, transform: 'translateY(-20px)' },
      '50%': { opacity: 0.5, transform: 'translateY(-10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    },
    duration: 600
  });
  return animation && animation.config.keyframes;
}, 'css');

// ===== JS动画测试 =====
console.log('\n⚡ JS动画测试');

test('JS动画控制器', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'js',
    properties: { opacity: [0, 1] },
    duration: 800
  });
  return animation && animation.type === 'js';
}, 'js');

test('JS数值动画', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'js',
    properties: {
      opacity: [0, 1],
      scale: [0.8, 1.2],
      rotation: [0, 360]
    },
    duration: 1000,
    easing: 'easeInOutQuad'
  });
  return animation && Array.isArray(animation.config.properties.opacity);
}, 'js');

test('JS自定义缓动函数', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const customEasing = (t) => t * t * t;
  const animation = manager.create({
    element,
    type: 'js',
    properties: { opacity: [0, 1] },
    duration: 500,
    easing: customEasing
  });
  return animation && typeof animation.config.easing === 'function';
}, 'js');

// ===== 序列动画测试 =====
console.log('\n🔄 序列动画测试');

test('顺序动画序列', () => {
  const manager = new AnimationManager();
  const element1 = { style: {} };
  const element2 = { style: {} };
  
  const sequence = manager.sequence([
    {
      element: element1,
      properties: { opacity: 1 },
      duration: 300
    },
    {
      element: element2,
      properties: { transform: 'scale(1.2)' },
      duration: 400
    }
  ]);
  
  return sequence && 
    typeof sequence.play === 'function' &&
    sequence.animations.length === 2;
}, 'sequence');

test('并行动画', () => {
  const manager = new AnimationManager();
  const element1 = { style: {} };
  const element2 = { style: {} };
  
  const parallel = manager.parallel([
    {
      element: element1,
      properties: { opacity: 1 },
      duration: 300
    },
    {
      element: element2,
      properties: { transform: 'rotate(45deg)' },
      duration: 300
    }
  ]);
  
  return parallel && 
    typeof parallel.play === 'function' &&
    parallel.animations.length === 2;
}, 'sequence');

test('交错动画', () => {
  const manager = new AnimationManager();
  const elements = [{ style: {} }, { style: {} }, { style: {} }];
  
  const stagger = manager.stagger(elements, {
    properties: { opacity: 1, transform: 'translateY(0)' },
    duration: 400,
    delay: 100
  });
  
  return stagger && 
    typeof stagger.play === 'function' &&
    stagger.animations.length === 3;
}, 'sequence');

// ===== 过渡效果测试 =====
console.log('\n🌊 过渡效果测试');

test('进入过渡', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const transition = manager.transition(element, {
    enter: {
      from: { opacity: 0, transform: 'translateY(-20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: 300
    }
  });
  
  return transition && typeof transition.enter === 'function';
}, 'transition');

test('离开过渡', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const transition = manager.transition(element, {
    leave: {
      from: { opacity: 1, transform: 'translateY(0)' },
      to: { opacity: 0, transform: 'translateY(20px)' },
      duration: 250
    }
  });
  
  return transition && typeof transition.leave === 'function';
}, 'transition');

// ===== 性能测试 =====
console.log('\n📊 性能测试');

test('性能监控', () => {
  const manager = new AnimationManager();
  const stats = manager.getPerformanceStats();
  return stats && 
    typeof stats.activeAnimations === 'number' &&
    typeof stats.totalAnimations === 'number';
}, 'performance');

test('内存管理', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  // 创建多个动画
  for (let i = 0; i < 10; i++) {
    const animation = manager.create({
      element,
      properties: { opacity: 1 },
      duration: 100
    });
    animation.destroy();
  }
  
  const stats = manager.getPerformanceStats();
  return stats.activeAnimations === 0;
}, 'performance');

// ===== 动画控制测试 =====
console.log('\n🎮 动画控制测试');

test('动画控制方法', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 1000
  });
  
  return animation &&
    typeof animation.play === 'function' &&
    typeof animation.pause === 'function' &&
    typeof animation.stop === 'function' &&
    typeof animation.reset === 'function' &&
    typeof animation.reverse === 'function';
}, 'core');

test('动画状态管理', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 100
  });
  
  // 测试状态变化
  const initialState = animation.state;
  animation.play();
  const playingState = animation.state;
  animation.pause();
  const pausedState = animation.state;
  
  return initialState === 'idle' && 
    playingState === 'playing' && 
    pausedState === 'paused';
}, 'core');

// ===== 事件系统测试 =====
console.log('\n📡 事件系统测试');

test('动画事件', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  let eventsFired = 0;
  
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 100,
    onStart: () => eventsFired++,
    onUpdate: () => eventsFired++,
    onComplete: () => eventsFired++
  });
  
  return animation &&
    typeof animation.config.onStart === 'function' &&
    typeof animation.config.onUpdate === 'function' &&
    typeof animation.config.onComplete === 'function';
}, 'core');

// ===== 错误处理测试 =====
console.log('\n🛡️  错误处理测试');

test('无效元素处理', () => {
  const manager = new AnimationManager();
  try {
    const animation = manager.create({
      element: null,
      properties: { opacity: 1 },
      duration: 1000
    });
    return false; // 应该抛出错误
  } catch (error) {
    return error.message.includes('element');
  }
}, 'core');

test('无效配置处理', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  try {
    const animation = manager.create({
      element,
      properties: {},
      duration: -1000
    });
    return false; // 应该抛出错误
  } catch (error) {
    return error.message.includes('duration');
  }
}, 'core');

// 生成测试报告
function generateReport() {
  const endTime = Date.now();
  const totalTime = endTime - results.startTime;
  
  const report = {
    timestamp: new Date().toISOString(),
    duration: `${totalTime}ms`,
    summary: {
      total: results.passed + results.failed + results.skipped,
      passed: results.passed,
      failed: results.failed,
      skipped: results.skipped,
      successRate: `${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`
    },
    categories: results.categories,
    tests: results.tests
  };
  
  // 保存报告
  const reportPath = path.join(__dirname, 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

// 输出测试结果
console.log('\n📊 测试结果汇总:');
const report = generateReport();

console.log(`⏱️  总耗时: ${report.duration}`);
console.log(`📈 总测试: ${report.summary.total}`);
console.log(`✅ 通过: ${report.summary.passed}`);
console.log(`❌ 失败: ${report.summary.failed}`);
console.log(`⏭️  跳过: ${report.summary.skipped}`);
console.log(`📊 成功率: ${report.summary.successRate}`);

// 分类统计
console.log('\n📋 分类统计:');
Object.entries(report.categories).forEach(([category, stats]) => {
  const total = stats.passed + stats.failed;
  if (total > 0) {
    const rate = ((stats.passed / total) * 100).toFixed(1);
    console.log(`  ${category}: ${stats.passed}/${total} (${rate}%)`);
  }
});

if (results.failed > 0) {
  console.log('\n❌ 失败的测试:');
  results.tests
    .filter(test => test.status !== 'PASS' && test.status !== 'SKIP')
    .forEach(test => {
      console.log(`  - [${test.category}] ${test.name}: ${test.error || 'Unknown error'}`);
    });
  
  console.log(`\n📄 详细报告已保存到: test-report.json`);
  process.exit(1);
} else {
  console.log('\n🎉 所有测试通过!');
  console.log(`📄 测试报告已保存到: test-report.json`);
  process.exit(0);
}