<script setup>
/**
 * 视觉优化示例组件
 * 演示设计系统的使用方式
 */
import { ref } from 'vue'

const clickCount = ref(0)

function handleClick() {
  clickCount.value++
}
</script>

<template>
  <div class="visual-demo">
    <!-- 页面标题 -->
    <header class="demo-header">
      <h1 class="title">✨ Vue3 电商平台 - 视觉优化演示</h1>
      <p class="subtitle">基于现代设计系统的 UI/UX 升级</p>
    </header>

    <!-- 统计卡片区域 -->
    <section class="stats-grid">
      <div class="stat-card stat-blue">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <div class="stat-number">1,284</div>
          <div class="stat-label">今日访问量</div>
          <div class="stat-trend trend-up">↑ 12% 较昨日</div>
        </div>
      </div>

      <div class="stat-card stat-purple">
        <div class="stat-icon">🛒</div>
        <div class="stat-content">
          <div class="stat-number">356</div>
          <div class="stat-label">待审核商品</div>
          <div class="stat-trend trend-up">↑ 8% 较上周</div>
        </div>
      </div>

      <div class="stat-card stat-cyan">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <div class="stat-number">2,847</div>
          <div class="stat-label">已通过</div>
          <div class="stat-trend trend-up">↑ 23% 本月</div>
        </div>
      </div>

      <div class="stat-card stat-green">
        <div class="stat-icon">💰</div>
        <div class="stat-content">
          <div class="stat-number">¥98.5k</div>
          <div class="stat-label">今日销售额</div>
          <div class="stat-trend trend-up">↑ 15% 较昨日</div>
        </div>
      </div>
    </section>

    <!-- 按钮展示区 -->
    <section class="button-section">
      <h2 class="section-title">按钮系统</h2>
      <div class="button-group">
        <button class="btn-primary" @click="handleClick">
          <span>⭐</span> Primary 主按钮
        </button>
        
        <button class="btn-secondary">
          <span>📋</span> Secondary 次要
        </button>
        
        <button class="btn-danger">
          <span>🗑️</span> Danger 危险
        </button>
        
        <button class="badge-counter">
          点击次数: {{ clickCount }}
        </button>
      </div>
    </section>

    <!-- 卡片展示区 -->
    <section class="card-section">
      <h2 class="section-title">卡片组件</h2>
      <div class="card-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>AI 智能审核</h3>
          <p>使用 AI Agent 自动审核商品信息，提升效率 95%</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 95%;"></div>
          </div>
          <span class="progress-text">置信度: 95%</span>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>AI 助手聊天</h3>
          <p>流式输出、Markdown 渲染、代码高亮</p>
          <div class="tag-list">
            <span class="tag">SSE</span>
            <span class="tag">打字机</span>
            <span class="tag">Markdown</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>数据可视化</h3>
          <p>实时数据统计、趋势分析、报表导出</p>
          <div class="mini-chart">
            <div class="bar" style="height: 60%;"></div>
            <div class="bar" style="height: 80%;"></div>
            <div class="bar" style="height: 45%;"></div>
            <div class="bar" style="height: 90%;"></div>
            <div class="bar" style="height: 70%;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 表格展示区 -->
    <section class="table-section">
      <h2 class="section-title">数据表格</h2>
      <div class="table-container card">
        <table class="modern-table">
          <thead>
            <tr>
              <th>商品名称</th>
              <th>分类</th>
              <th>状态</th>
              <th>AI 置信度</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="product-cell">
                  <div class="product-image skeleton"></div>
                  <span>iPhone 15 Pro Max</span>
                </div>
              </td>
              <td>电子产品</td>
              <td><span class="status-badge status-pending">待审核</span></td>
              <td>
                <div class="confidence-bar">
                  <div class="confidence-fill confidence-high" style="width: 95%;"></div>
                  <span class="confidence-text">95%</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="icon-btn" title="查看">👁️</button>
                  <button class="icon-btn" title="通过">✅</button>
                  <button class="icon-btn" title="拒绝">❌</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="product-cell">
                  <div class="product-image skeleton"></div>
                  <span>华为 MatePad Pro</span>
                </div>
              </td>
              <td>平板电脑</td>
              <td><span class="status-badge status-reviewing">审核中</span></td>
              <td>
                <div class="confidence-bar">
                  <div class="confidence-fill confidence-medium" style="width: 78%;"></div>
                  <span class="confidence-text">78%</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="icon-btn" title="查看">👁️</button>
                  <button class="icon-btn" title="通过">✅</button>
                  <button class="icon-btn" title="拒绝">❌</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 骨架屏演示 -->
    <section class="skeleton-section">
      <h2 class="section-title">骨架屏加载</h2>
      <div class="skeleton-card card">
        <div class="skeleton-row">
          <div class="skeleton-circle" style="width: 48px; height: 48px;"></div>
          <div class="skeleton-lines">
            <div class="skeleton-line" style="width: 200px;"></div>
            <div class="skeleton-line" style="width: 150px;"></div>
          </div>
        </div>
        <div class="skeleton-text-block">
          <div class="skeleton-line" style="width: 100%;"></div>
          <div class="skeleton-line" style="width: 90%;"></div>
          <div class="skeleton-line" style="width: 85%;"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.demo-header {
  text-align: center;
  margin-bottom: var(--space-10);
  
  .title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: var(--space-2);
  }
  
  .subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.stat-card {
  @extend .card;
  padding: var(--space-6);
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0.8;
  }
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &.stat-blue::before { background: var(--color-accent-primary); }
  &.stat-purple::before { background: var(--color-accent-secondary); }
  &.stat-cyan::before { background: var(--color-accent-cyan); }
  &.stat-green::before { background: var(--color-success); }
  
  .stat-icon {
    font-size: 32px;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    background: rgba(14, 165, 233, 0.1);
  }
  
  .stat-content {
    flex: 1;
    
    .stat-number {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: var(--color-text-primary);
      margin-bottom: var(--space-1);
    }
    
    .stat-label {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }
    
    .stat-trend {
      font-size: var(--text-xs);
      color: var(--color-success);
      
      &.trend-up {
        color: var(--color-success);
      }
    }
  }
}

.section-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  margin-top: var(--space-8);
}

.button-group {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.badge-counter {
  padding: 8px 16px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-spring);
}

.badge-counter:hover {
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-glow);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.feature-card {
  @extend .card;
  padding: var(--space-6);
  text-align: center;
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: var(--space-3);
  }
  
  h3 {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin-bottom: var(--space-2);
  }
  
  p {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
  }
  
  .tag-list {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .tag {
    padding: 4px 10px;
    background: rgba(14, 165, 233, 0.1);
    color: var(--color-accent-primary);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
  }
  
  .mini-chart {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    justify-content: center;
    height: 80px;
    margin-top: var(--space-4);
    
    .bar {
      width: 24px;
      background: linear-gradient(180deg, var(--color-accent-primary), var(--color-accent-secondary));
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      transition: height var(--duration-slow) var(--ease-out);
    }
  }
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin: var(--space-2) 0;
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-cyan));
    border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out);
  }
}

.progress-text {
  display: block;
  text-align: right;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  thead {
    tr {
      th {
        background: var(--color-bg-elevated);
        font-size: var(--text-xs);
        font-weight: var(--weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 12px 16px;
        text-align: left;
        color: var(--color-text-secondary);
        border-bottom: 1px solid var(--color-border-subtle);
      }
    }
  }
  
  tbody {
    tr {
      transition: background var(--duration-fast) var(--ease-out);
      
      &:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      
      td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--color-border-subtle);
      }
    }
  }
}

.product-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  
  .product-image {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    background: var(--color-bg-elevated);
    flex-shrink: 0;
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  
  &::before {
    content: '●';
    font-size: 8px;
  }
  
  &.status-pending {
    background: rgba(245, 158, 11, 0.1);
    color: var(--color-warning);
    
    &::before {
      color: var(--color-warning);
    }
  }
  
  &.status-reviewing {
    background: rgba(59, 130, 246, 0.1);
    color: var(--color-info);
    
    &::before {
      color: var(--color-info);
    }
  }
}

.confidence-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 120px;
  
  .confidence-fill {
    height: 6px;
    border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out);
    
    &.confidence-high {
      background: linear-gradient(90deg, var(--color-success), #34d399);
    }
    
    &.confidence-medium {
      background: linear-gradient(90deg, var(--color-warning), #fbbf24);
    }
  }
  
  .confidence-text {
    font-size: var(--text-xs);
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
}

.action-buttons {
  display: flex;
  gap: var(--space-2);
  
  .icon-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-out);
    
    &:hover {
      background: rgba(14, 165, 233, 0.1);
      transform: scale(1.1);
    }
  }
}

.skeleton-card {
  padding: var(--space-6);
  
  .skeleton-row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }
  
  .skeleton-lines {
    flex: 1;
  }
  
  .skeleton-line {
    height: 12px;
    margin-bottom: var(--space-2);
  }
  
  .skeleton-text-block {
    .skeleton-line {
      margin-bottom: var(--space-3);
    }
  }
}
</style>
