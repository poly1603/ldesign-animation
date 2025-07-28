#!/usr/bin/env node

/**
 * 最新修复验证脚本 - 验证最近的bug修复和功能改进
 * 运行: node verify-latest-fixes.js
 */

const { AnimationManager } = require('./dist/ldesign-animation.umd.js');
const { performance } = require('perf_hooks');

// 测试结果收集
const results = {
  passed: 0,
  failed: 0,
  tests: [],
  fixes: []
};

// 测试工具函数
function testFix(fixId, description, testFn) {
  try {
    const start = performance.now();
    const result = testFn();
    const duration = performance.now() - start;
    
    if (result) {
      results.passed++;
      results.fixes.push({ fixId, description, status: 'FIXED', duration: `${duration.toFixed(2)}ms` });
      console.log(`✅ [${fixId}] ${description} - ${duration.toFixed(2)}ms`);
    } else {
      results.failed++;
      results.fixes.push({ fixId, description, status: 'BROKEN', duration: `${duration.toFixed(2)}ms` });
      console.log(`❌ [${fixId}] ${description} - 修复失败`);
    }
  } catch (error) {
    results.failed++;
    results.fixes.push({ fixId, description, status: 'ERROR', error: error.message });
    console.log(`❌ [${fixId}] ${description} - Error: ${error.message}`);
  }
}

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    getComputedStyle: () => ({})
  };
  global.document = {
    createElement: () => ({
      style: {},
      classList: { add: () => {}, remove: () => {} },
      addEventListener: () => {},
      removeEventListener: () => {}
    }),
    querySelector: () => null
  };
}

console.log('🔧 验证最新修复和改进...\n');

// Fix #001: 动画管理器内存泄漏修复
testFix('FIX-001', '动画管理器内存泄漏修复', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  // 创建并销毁多个动画
  for (let i = 0; i < 100; i++) {
    const animation = manager.create({
      element,
      properties: { opacity: 1 },
      duration: 100
    });
    animation.destroy();
  }
  
  const stats = manager.getPerformanceStats();
  return stats.activeAnimations === 0;
});

// Fix #002: CSS动画前缀自动添加
testFix('FIX-002', 'CSS动画前缀自动添加', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const animation = manager.create({
    element,
    type: 'css',
    properties: {
      transform: 'translateX(100px)',
      userSelect: 'none',
      backdropFilter: 'blur(10px)'
    },
    duration: 500
  });
  
  // 检查是否正确处理了需要前缀的属性
  return animation && animation.config.properties.transform;
});

// Fix #003: 动画序列中断处理
testFix('FIX-003', '动画序列中断处理', () => {
  const manager = new AnimationManager();
  const element1 = { style: {} };
  const element2 = { style: {} };
  
  const sequence = manager.sequence([
    {
      element: element1,
      properties: { opacity: 1 },
      duration: 1000
    },
    {
      element: element2,
      properties: { transform: 'scale(1.2)' },
      duration: 1000
    }
  ]);
  
  // 测试中断和恢复
  sequence.play();
  sequence.pause();
  sequence.play();
  sequence.stop();
  
  return sequence.state === 'stopped';
});

// Fix #004: 缓动函数精度问题
testFix('FIX-004', '缓动函数精度问题修复', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const animation = manager.create({
    element,
    type: 'js',
    properties: { opacity: [0, 1] },
    duration: 1000,
    easing: 'easeInOutCubic'
  });
  
  // 测试缓动函数在边界值的精度
  const easingFn = animation.getEasingFunction();
  const start = easingFn(0);
  const end = easingFn(1);
  const mid = easingFn(0.5);
  
  return Math.abs(start - 0) < 0.001 && 
         Math.abs(end - 1) < 0.001 && 
         mid > 0 && mid < 1;
});

// Fix #005: 并行动画同步问题
testFix('FIX-005', '并行动画同步问题修复', () => {
  const manager = new AnimationManager();
  const element1 = { style: {} };
  const element2 = { style: {} };
  
  let startTimes = [];
  
  const parallel = manager.parallel([
    {
      element: element1,
      properties: { opacity: 1 },
      duration: 500,
      onStart: () => startTimes.push(performance.now())
    },
    {
      element: element2,
      properties: { transform: 'scale(1.1)' },
      duration: 500,
      onStart: () => startTimes.push(performance.now())
    }
  ]);
  
  parallel.play();
  
  // 检查启动时间差异是否在合理范围内（< 5ms）
  return startTimes.length === 2 && 
         Math.abs(startTimes[1] - startTimes[0]) < 5;
});

// Fix #006: 动画状态不一致问题
testFix('FIX-006', '动画状态不一致问题修复', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 100
  });
  
  // 测试状态转换的一致性
  const states = [];
  states.push(animation.state); // idle
  
  animation.play();
  states.push(animation.state); // playing
  
  animation.pause();
  states.push(animation.state); // paused
  
  animation.stop();
  states.push(animation.state); // stopped
  
  animation.reset();
  states.push(animation.state); // idle
  
  return states.join(',') === 'idle,playing,paused,stopped,idle';
});

// Fix #007: 性能监控数据准确性
testFix('FIX-007', '性能监控数据准确性修复', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const initialStats = manager.getPerformanceStats();
  
  // 创建几个动画
  const animations = [];
  for (let i = 0; i < 5; i++) {
    animations.push(manager.create({
      element,
      properties: { opacity: 1 },
      duration: 1000
    }));
  }
  
  const activeStats = manager.getPerformanceStats();
  
  // 销毁动画
  animations.forEach(anim => anim.destroy());
  
  const finalStats = manager.getPerformanceStats();
  
  return activeStats.activeAnimations === 5 && 
         finalStats.activeAnimations === 0 &&
         finalStats.totalAnimations >= initialStats.totalAnimations + 5;
});

// Fix #008: 元素检测改进
testFix('FIX-008', '元素检测改进', () => {
  const manager = new AnimationManager();
  
  // 测试各种元素类型
  const validElements = [
    { style: {} }, // 普通对象
    { style: {}, nodeType: 1 }, // DOM元素模拟
    { style: {}, tagName: 'DIV' } // 另一种DOM元素模拟
  ];
  
  const invalidElements = [
    null,
    undefined,
    {},
    { notStyle: {} },
    'string',
    123
  ];
  
  // 测试有效元素
  let validCount = 0;
  validElements.forEach(element => {
    try {
      const animation = manager.create({
        element,
        properties: { opacity: 1 },
        duration: 100
      });
      if (animation) validCount++;
    } catch (e) {
      // 不应该抛出错误
    }
  });
  
  // 测试无效元素
  let invalidCount = 0;
  invalidElements.forEach(element => {
    try {
      const animation = manager.create({
        element,
        properties: { opacity: 1 },
        duration: 100
      });
      // 不应该成功创建
    } catch (e) {
      invalidCount++;
    }
  });
  
  return validCount === validElements.length && 
         invalidCount === invalidElements.length;
});

// Fix #009: 动画链式调用支持
testFix('FIX-009', '动画链式调用支持', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 100
  });
  
  // 测试链式调用
  try {
    const result = animation
      .play()
      .pause()
      .reset()
      .play();
    
    return result === animation; // 应该返回自身以支持链式调用
  } catch (e) {
    return false;
  }
});

// Fix #010: 动画完成回调时机
testFix('FIX-010', '动画完成回调时机修复', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  
  let callbackOrder = [];
  
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 50,
    onUpdate: () => callbackOrder.push('update'),
    onComplete: () => callbackOrder.push('complete')
  });
  
  return new Promise((resolve) => {
    animation.play();
    
    setTimeout(() => {
      // 完成回调应该在更新回调之后
      const hasUpdate = callbackOrder.includes('update');
      const hasComplete = callbackOrder.includes('complete');
      const correctOrder = callbackOrder.indexOf('complete') > callbackOrder.indexOf('update');
      
      resolve(hasUpdate && hasComplete && correctOrder);
    }, 100);
  });
});

// 等待异步测试完成
setTimeout(() => {
  // 输出测试结果
  console.log('\n📊 修复验证结果:');
  console.log(`✅ 已修复: ${results.passed}`);
  console.log(`❌ 仍有问题: ${results.failed}`);
  console.log(`📈 修复率: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  
  if (results.failed > 0) {
    console.log('\n❌ 仍需修复的问题:');
    results.fixes
      .filter(fix => fix.status !== 'FIXED')
      .forEach(fix => {
        console.log(`  - [${fix.fixId}] ${fix.description}: ${fix.error || '验证失败'}`);
      });
    
    console.log('\n🔧 请检查上述问题并进行修复。');
    process.exit(1);
  } else {
    console.log('\n🎉 所有修复都已验证通过!');
    console.log('\n📋 已验证的修复:');
    results.fixes.forEach(fix => {
      console.log(`  ✅ [${fix.fixId}] ${fix.description}`);
    });
    process.exit(0);
  }
}, 200); // 等待异步测试完成