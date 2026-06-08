# 前端视觉优化实施指南

## 📋 已完成的设计系统升级

### 1. 新增文件清单

```
src/styles/
├── tokens.css          # 完整设计令牌（Design Tokens）
└── animations.css      # 动画和交互效果
```

### 2. 修改的文件

- ✅ `src/style.css` - 更新为使用设计令牌，移除硬编码颜色值
- ✅ `public/index.html` - 需要添加 Google Fonts（见下方步骤）

---

## 🚀 快速开始

### 步骤 1: 添加字体到项目

在 `public/index.html` 的 `<head>` 中添加以下代码：

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
```

### 步骤 2: 验证样式加载

运行开发服务器，确认新样式生效：

```bash
pnpm dev
```

访问任意页面，检查：
- [x] 背景渐变效果是否正常显示
- [x] 按钮悬停光晕效果
- [x] 卡片悬浮动画
- [x] 滚动条样式美化

---

## 🎨 设计系统使用指南

### 颜色使用规范

**❌ 不要硬编码颜色值：**

```css
/* 错误示例 */
.button {
  color: #409eff;
  background: #ffffff;
}
```

**✅ 使用设计令牌：**

```css
/* 正确示例 */
.button {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}
```

### 常用颜色映射表

| 场景 | 使用变量 | 说明 |
|------|---------|------|
| 主文字 | `--color-text-primary` | 标题、正文 |
| 次要文字 | `--color-text-secondary` | 描述、辅助信息 |
| 禁用文字 | `--color-text-muted` | 占位符、不可操作项 |
| 主色调 | `--color-accent-primary` | 品牌色、链接 |
| 强调色 | `--color-accent-secondary` | 渐变搭配 |
| 成功状态 | `--color-success` | 通过、完成 |
| 警告状态 | `--color-warning` | 注意、待处理 |
| 危险状态 | `--color-danger` | 错误、删除 |
| 主背景 | `--color-bg-base` | body 背景 |
| 卡片背景 | `--color-bg-surface` | 面板、卡片 |
| 边框基础 | `--color-border-subtle` | 微妙分割线 |
| 边框默认 | `--color-border-default` | 常规边框 |

### 阴影使用场景

| 变量 | 适用场景 |
|------|---------|
| `--shadow-sm` | 小卡片、按钮 |
| `--shadow-md` | 普通卡片、面板 |
| `--shadow-lg` | 悬浮卡片、Modal |
| `--shadow-xl` | 大型弹窗、侧边栏 |
| `--shadow-glow` | 强调按钮 hover |

### 圆角使用规范

| 场景 | 建议 |
|------|------|
| 按钮 | `--radius-md` (10px) |
| 卡片 | `--radius-lg` (16px) |
| 头像 | `--radius-full` (圆形) |
| 输入框 | `--radius-md` (10px) |

---

## ✨ 新增动效功能

### 1. 页面切换动画

自动应用于所有路由切换：

```vue
<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
```

### 2. 骨架屏加载

适用于数据加载场景：

```vue
<template>
  <div class="skeleton" style="height: 200px;"></div>
</template>
```

### 3. 按钮交互反馈

全局已启用，点击时有 scale 缩放 + 光晕效果。

---

## 🔧 组件升级指南

### 卡片组件升级

**旧样式：**
```vue
<template>
  <el-card>...</el-card>
</template>
```

**新样式（推荐）：**
```vue
<template>
  <div class="card">
    <!-- 内容 -->
  </div>
</template>

<style scoped>
.card {
  /* 继承全局 .card 样式 */
}
</style>
```

### 按钮组件升级

**Primary 按钮：**
```vue
<button class="btn-primary">
  <el-icon><Plus /></el-icon>
  新建
</button>
```

**Danger 按钮：**
```vue
<button class="btn-danger">
  <el-icon><Delete /></el-icon>
  删除
</button>
```

---

## 🎯 Element Plus 组件覆盖

如需覆盖 Element Plus 组件样式，请在对应 Vue 文件的 `<style>` 中写入：

```vue
<style scoped>
/* 自定义 el-table 样式 */
:deep(.el-table) {
  --el-table-header-bg-color: var(--color-bg-elevated);
  --el-table-tr-bg-color: var(--color-bg-surface);
}

/* 自定义 el-button 样式 */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, 
    var(--color-accent-primary), 
    var(--color-accent-secondary));
}
</style>
```

---

## ⚡ 性能优化提示

### 1. 减少动画对性能的影响

项目已支持 `prefers-reduced-motion`，用户可在系统设置中关闭动画。

如需手动检测：

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
  }
}
```

### 2. 按需引入字体

如果不需要全部字体，可在 `index.html` 中只引入需要的：

```html
<!-- 仅中文 + 英文 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">

<!-- 仅显示字体 -->
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 📝 开发规范

### 1. 新增样式时

- ✅ 优先使用设计令牌中的变量
- ✅ 使用 `var()` 语法，而非硬编码值
- ✅ 保持 scoped 作用域
- ✅ 添加中文注释说明用途

### 2. 新增动效时

- ✅ 优先使用 CSS transition / animation
- ✅ JS 动画仅限特殊场景
- ✅ 动效时长控制在 120ms - 500ms
- ✅ 使用缓动曲线：ease-out / ease-in-out / ease-spring

### 3. 响应式设计

- ✅ 移动端优先
- ✅ 确保触控友好（按钮最小 44x44px）
- ✅ 简化或禁用复杂动画

---

## 🎨 下一步优化建议

### 高频组件升级（优先级高）

以下是项目中需要立即升级的关键组件：

1. **NavBar.vue** - 导航栏
   - 添加毛玻璃背景
   - 面包屑导航升级
   - 搜索框 Command+K 快捷键

2. **ProductCard.vue** - 商品卡片
   - 应用 `.card` 类
   - 图片悬浮 zoom 效果
   - 价格标签渐变

3. **ProductTable.vue** - 审核表格
   - 行 hover 微亮
   - 状态 Badge 升级
   - 进度条渐变色

4. **ReviewResultPanel.vue** - AI 审核面板
   - 打字机光标动画
   - 网格纹理背景
   - 违规项展开效果

### 中等优先级

5. **AiChat.vue** - 聊天页面
   - 消息气泡差异化
   - 流式输出逐字淡入
   - 快捷指令胶囊 Tag

6. **HeroBanner.vue** - 首页轮播
   - 渐变遮罩
   - 指示器光晕
   - 自动播放过渡

---

## 🔍 常见问题

### Q: 为什么我的样式没有生效？

A: 请检查：
1. 是否使用了设计令牌变量
2. `<style scoped>` 是否正确
3. CSS 选择器优先级是否足够
4. 是否需要 `:deep()` 穿透

### Q: 如何自定义某页面无需动画？

A: 在该页面的 `<style>` 中添加：

```css
@media (prefers-reduced-motion: reduce) {
  .my-component * {
    animation-duration: 0.01ms !important;
  }
}
```

### Q: 如何添加新的设计令牌？

A: 在 `src/styles/tokens.css` 的 `:root` 中添加：

```css
:root {
  /* ... 其他变量 ... */
  --color-new-custom: #ff0000; /* 示例 */
}
```

然后在项目中使用 `var(--color-new-custom)`。

---

## 📚 参考资源

- **Linear Design System**: https://linear.app/design
- **Vercel Design**: https://design.vercel.com
- **Element Plus 主题**: https://element-plus.org/zh-CN/guide/theming
- **CSS Animations W3C**: https://www.w3.org/TR/CSS/#animations

---

*更新时间: 2026-06-07*  
*设计版本: v2.0.0*
