#!/usr/bin/env node

/**
 * 简单验证脚本 - 验证动画库的核心功能
 * 运行: node verify-fixes-simple.js
 */

const { AnimationManager } = require('./dist/ldesign-animation.umd.js');
const { performance } = require('perf_hooks');

// 测试结果收集
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// 测试工具函数
function test(name, fn) {
  try {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;
    
    if (result) {
      results.passed++;
      results.tests.push({ name, status: 'PASS', duration: `${duration.toFixed(2)}ms` });
      console.log(`✅ ${name} - ${duration.toFixed(2)}ms`);
    } else {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', duration: `${duration.toFixed(2)}ms`, error: 'Test returned false' });
      console.log(`❌ ${name} - Test failed`);
    }
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: 'ERROR', error: error.message });
    console.log(`❌ ${name} - Error: ${error.message}`);
  }
}

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id)
  };
  global.document = {
    createElement: () => ({
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {}
    }),
    querySelector: () => null
  };
}

console.log('🚀 开始验证动画库核心功能...\n');

// 测试1: AnimationManager 实例化
test('AnimationManager 实例化', () => {
  const manager = new AnimationManager();
  return manager && typeof manager.create === 'function';
});

// 测试2: 创建基础动画
test('创建基础动画', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 1000
  });
  return animation && typeof animation.play === 'function';
});

// 测试3: CSS动画控制器
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
});

// 测试4: JS动画控制器
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
});

// 测试5: 动画序列
test('动画序列', () => {
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
  
  return sequence && typeof sequence.play === 'function';
});

// 测试6: 并行动画
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
  
  return parallel && typeof parallel.play === 'function';
});

// 测试7: 缓动函数
test('缓动函数', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 500,
    easing: 'ease-in-out'
  });
  return animation && animation.config.easing === 'ease-in-out';
});

// 测试8: 动画控制
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
    typeof animation.reset === 'function';
});

// 测试9: 事件监听
test('动画事件', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 100,
    onStart: () => {},
    onComplete: () => {}
  });
  
  return animation &&
    typeof animation.config.onStart === 'function' &&
    typeof animation.config.onComplete === 'function';
});

// 测试10: 性能监控
test('性能监控', () => {
  const manager = new AnimationManager();
  return manager &&
    typeof manager.getPerformanceStats === 'function';
});

// 输出测试结果
console.log('\n📊 测试结果汇总:');
console.log(`✅ 通过: ${results.passed}`);
console.log(`❌ 失败: ${results.failed}`);
console.log(`📈 成功率: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.failed > 0) {
  console.log('\n❌ 失败的测试:');
  results.tests
    .filter(test => test.status !== 'PASS')
    .forEach(test => {
      console.log(`  - ${test.name}: ${test.error || 'Unknown error'}`);
    });
  process.exit(1);
} else {
  console.log('\n🎉 所有测试通过!');
  process.exit(0);
}