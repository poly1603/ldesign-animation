#!/usr/bin/env node

/**
 * 性能验证脚本 - 验证动画库的性能表现
 * 运行: node verify-performance.js
 */

const { AnimationManager } = require('./dist/ldesign-animation.umd.js');
const { performance } = require('perf_hooks');

// 性能测试结果
const performanceResults = {
  tests: [],
  summary: {
    totalTests: 0,
    passed: 0,
    failed: 0
  }
};

// 性能测试工具函数
function performanceTest(name, testFn, expectedOps = 1000, tolerance = 0.2) {
  console.log(`🔄 运行性能测试: ${name}`);
  
  try {
    const iterations = 10000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      testFn();
    }
    
    const end = performance.now();
    const duration = end - start;
    const opsPerSecond = Math.round((iterations / duration) * 1000);
    const passed = opsPerSecond >= expectedOps * (1 - tolerance);
    
    const result = {
      name,
      opsPerSecond,
      expectedOps,
      duration: `${duration.toFixed(2)}ms`,
      passed,
      performance: opsPerSecond >= expectedOps ? 'excellent' : 
                  opsPerSecond >= expectedOps * 0.8 ? 'good' : 
                  opsPerSecond >= expectedOps * 0.6 ? 'acceptable' : 'poor'
    };
    
    performanceResults.tests.push(result);
    performanceResults.summary.totalTests++;
    
    if (passed) {
      performanceResults.summary.passed++;
      console.log(`✅ ${name}: ${opsPerSecond} ops/sec (期望: ${expectedOps}) - ${result.performance}`);
    } else {
      performanceResults.summary.failed++;
      console.log(`❌ ${name}: ${opsPerSecond} ops/sec (期望: ${expectedOps}) - 性能不达标`);
    }
    
  } catch (error) {
    performanceResults.tests.push({
      name,
      error: error.message,
      passed: false
    });
    performanceResults.summary.totalTests++;
    performanceResults.summary.failed++;
    console.log(`❌ ${name}: 测试失败 - ${error.message}`);
  }
}

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    performance: { now: () => Date.now() }
  };
  global.document = {
    createElement: () => ({
      style: {},
      classList: { add: () => {}, remove: () => {} },
      addEventListener: () => {},
      removeEventListener: () => {}
    })
  };
}

console.log('⚡ 开始性能验证测试...\n');

// 测试1: AnimationManager 实例化性能
performanceTest('AnimationManager 实例化', () => {
  const manager = new AnimationManager();
  return manager;
}, 50000);

// 测试2: 动画创建性能
performanceTest('动画创建', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    properties: { opacity: 1 },
    duration: 1000
  });
  animation.destroy();
  return animation;
}, 10000);

// 测试3: CSS动画创建性能
performanceTest('CSS动画创建', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'css',
    properties: { transform: 'translateX(100px)' },
    duration: 500
  });
  animation.destroy();
  return animation;
}, 8000);

// 测试4: JS动画创建性能
performanceTest('JS动画创建', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'js',
    properties: { opacity: [0, 1] },
    duration: 800
  });
  animation.destroy();
  return animation;
}, 7000);

// 测试5: 动画序列创建性能
performanceTest('动画序列创建', () => {
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
  sequence.destroy();
  return sequence;
}, 5000);

// 测试6: 并行动画创建性能
performanceTest('并行动画创建', () => {
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
  parallel.destroy();
  return parallel;
}, 5000);

// 测试7: 缓动函数计算性能
performanceTest('缓动函数计算', () => {
  const manager = new AnimationManager();
  const element = { style: {} };
  const animation = manager.create({
    element,
    type: 'js',
    properties: { opacity: [0, 1] },
    duration: 1000,
    easing: 'easeInOutCubic'
  });
  
  const easingFn = animation.getEasingFunction();
  const result = easingFn(Math.random());
  animation.destroy();
  return result;
}, 100000);

// 测试8: 属性值计算性能
performanceTest('属性值计算', () => {
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
    duration: 1000
  });
  
  // 模拟属性值计算
  const progress = Math.random();
  animation.updateProgress(progress);
  animation.destroy();
  return progress;
}, 50000);

// 测试9: 性能统计获取
performanceTest('性能统计获取', () => {
  const manager = new AnimationManager();
  const stats = manager.getPerformanceStats();
  return stats;
}, 100000);

// 测试10: 大量动画管理
performanceTest('大量动画管理', () => {
  const manager = new AnimationManager();
  const animations = [];
  
  // 创建多个动画
  for (let i = 0; i < 10; i++) {
    const element = { style: {} };
    animations.push(manager.create({
      element,
      properties: { opacity: 1 },
      duration: 100
    }));
  }
  
  // 清理
  animations.forEach(anim => anim.destroy());
  return animations.length;
}, 1000);

// 内存使用测试
function memoryTest() {
  console.log('\n🧠 内存使用测试:');
  
  const manager = new AnimationManager();
  const initialStats = manager.getPerformanceStats();
  
  // 创建大量动画并销毁
  const animations = [];
  for (let i = 0; i < 1000; i++) {
    const element = { style: {} };
    animations.push(manager.create({
      element,
      properties: { opacity: 1 },
      duration: 100
    }));
  }
  
  const peakStats = manager.getPerformanceStats();
  
  // 销毁所有动画
  animations.forEach(anim => anim.destroy());
  
  const finalStats = manager.getPerformanceStats();
  
  console.log(`📊 初始活跃动画: ${initialStats.activeAnimations}`);
  console.log(`📈 峰值活跃动画: ${peakStats.activeAnimations}`);
  console.log(`📉 最终活跃动画: ${finalStats.activeAnimations}`);
  
  const memoryLeakDetected = finalStats.activeAnimations > initialStats.activeAnimations;
  
  if (memoryLeakDetected) {
    console.log('❌ 检测到内存泄漏!');
    return false;
  } else {
    console.log('✅ 内存管理正常');
    return true;
  }
}

// 并发性能测试
function concurrencyTest() {
  console.log('\n🔄 并发性能测试:');
  
  const manager = new AnimationManager();
  const startTime = performance.now();
  
  // 同时创建多个动画
  const animations = [];
  for (let i = 0; i < 100; i++) {
    const element = { style: {} };
    animations.push(manager.create({
      element,
      properties: { opacity: 1, transform: `translateX(${i * 10}px)` },
      duration: 1000
    }));
  }
  
  // 同时启动所有动画
  animations.forEach(anim => anim.play());
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`⏱️  创建并启动100个动画耗时: ${duration.toFixed(2)}ms`);
  
  // 清理
  animations.forEach(anim => anim.destroy());
  
  return duration < 100; // 期望在100ms内完成
}

// 运行额外测试
const memoryTestPassed = memoryTest();
const concurrencyTestPassed = concurrencyTest();

// 生成性能报告
function generatePerformanceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: performanceResults.summary,
    tests: performanceResults.tests,
    additionalTests: {
      memoryManagement: memoryTestPassed,
      concurrencyPerformance: concurrencyTestPassed
    },
    recommendations: []
  };
  
  // 生成建议
  const poorPerformanceTests = performanceResults.tests.filter(test => test.performance === 'poor');
  if (poorPerformanceTests.length > 0) {
    report.recommendations.push('优化性能较差的测试项目');
  }
  
  if (!memoryTestPassed) {
    report.recommendations.push('修复内存泄漏问题');
  }
  
  if (!concurrencyTestPassed) {
    report.recommendations.push('优化并发性能');
  }
  
  const averageOps = performanceResults.tests
    .filter(test => test.opsPerSecond)
    .reduce((sum, test) => sum + test.opsPerSecond, 0) / 
    performanceResults.tests.filter(test => test.opsPerSecond).length;
  
  report.averagePerformance = Math.round(averageOps);
  
  return report;
}

// 输出最终结果
console.log('\n📊 性能测试结果汇总:');
const report = generatePerformanceReport();

console.log(`📈 总测试: ${report.summary.totalTests}`);
console.log(`✅ 通过: ${report.summary.passed}`);
console.log(`❌ 失败: ${report.summary.failed}`);
console.log(`⚡ 平均性能: ${report.averagePerformance} ops/sec`);

// 性能等级评估
const successRate = (report.summary.passed / report.summary.totalTests) * 100;
let performanceGrade;
if (successRate >= 90 && memoryTestPassed && concurrencyTestPassed) {
  performanceGrade = 'A+ (优秀)';
} else if (successRate >= 80 && memoryTestPassed) {
  performanceGrade = 'A (良好)';
} else if (successRate >= 70) {
  performanceGrade = 'B (一般)';
} else {
  performanceGrade = 'C (需要优化)';
}

console.log(`🏆 性能等级: ${performanceGrade}`);

// 详细结果
console.log('\n📋 详细测试结果:');
performanceResults.tests.forEach(test => {
  if (test.opsPerSecond) {
    const status = test.passed ? '✅' : '❌';
    console.log(`  ${status} ${test.name}: ${test.opsPerSecond} ops/sec (${test.performance})`);
  }
});

// 建议
if (report.recommendations.length > 0) {
  console.log('\n💡 优化建议:');
  report.recommendations.forEach(rec => {
    console.log(`  - ${rec}`);
  });
}

// 保存报告
const fs = require('fs');
const path = require('path');
const reportPath = path.join(__dirname, 'performance-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 性能报告已保存到: performance-report.json`);

// 退出码
if (report.summary.failed > 0 || !memoryTestPassed || !concurrencyTestPassed) {
  console.log('\n⚠️  存在性能问题，请查看报告进行优化。');
  process.exit(1);
} else {
  console.log('\n🎉 性能测试全部通过!');
  process.exit(0);
}