# @ldesign/animation-angular

> 🎨 LDesign 动画库 Angular 集成 - 提供服务和指令

## ✨ 特性

- 🅰️ **Angular 服务** - 注入式动画服务
- 🎯 **Angular 指令** - 声明式动画指令
- 📦 **RxJS 集成** - 基于 Observable 的动画控制
- ⚡ **高性能** - 基于 @ldesign/animation-core
- 🔧 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
pnpm add @ldesign/animation-angular @angular/core rxjs
```

## 🚀 快速开始

### 导入模块

```typescript
import { NgModule } from '@angular/core'
import { AnimationModule } from '@ldesign/animation-angular'

@NgModule({
  imports: [
    AnimationModule
  ]
})
export class AppModule { }
```

### 使用服务

```typescript
import { Component } from '@angular/core'
import { AnimationService } from '@ldesign/animation-angular'

@Component({
  selector: 'app-root',
  template: `
    <div #target>动画元素</div>
    <button (click)="play()">播放</button>
  `
})
export class AppComponent {
  @ViewChild('target') target!: ElementRef

  constructor(private animationService: AnimationService) {}

  play() {
    this.animationService.animate(this.target.nativeElement, {
      translateX: 250,
      rotate: 360,
      duration: 1000
    })
  }
}
```

### 使用指令

```html
<div ldAnimate
     [animateOptions]="{
       translateX: 250,
       rotate: 360,
       duration: 1000
     }"
     (animationComplete)="onComplete()">
  动画元素
</div>
```

## 📚 API 文档

### 服务

#### `AnimationService`

动画服务。

### 指令

#### `[ldAnimate]`

动画指令。

## 📄 许可证

MIT License © 2024 LDesign Team

