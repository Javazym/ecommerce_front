<template>
  <div class="merchant-dashboard">
    <!-- 数据概览 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e6f7ff;">
          <el-icon style="color: #409eff;"><Money /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">¥{{ stats.todaySales.toLocaleString() }}</div>
          <div class="stat-label">今日销售额</div>
          <div class="stat-trend" :class="stats.salesTrend > 0 ? 'up' : 'down'">
            <el-icon><Top v-if="stats.salesTrend > 0" /><Bottom v-else /></el-icon>
            {{ Math.abs(stats.salesTrend) }}%
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #f6ffed;">
          <el-icon style="color: #67c23a;"><ShoppingCart /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.todayOrders }}</div>
          <div class="stat-label">今日订单</div>
          <div class="stat-trend up">
            <el-icon><Top /></el-icon>
            12%
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #fff7e6;">
          <el-icon style="color: #e6a23c;"><Box /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.pendingShipments }}</div>
          <div class="stat-label">待发货</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #fff1f0;">
          <el-icon style="color: #f56c6c;"><Warning /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.lowStock }}</div>
          <div class="stat-label">库存预警</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">销售趋势</span>
              <el-radio-group v-model="chartPeriod" size="small">
                <el-radio-button label="7">近7天</el-radio-button>
                <el-radio-button label="30">近30天</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container" ref="salesChartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">销售分类</span>
            </div>
          </template>
          <div class="chart-container" ref="categoryChartRef"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作和公告 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="quick-actions-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <div class="action-item" @click="goToAddProduct">
              <div class="action-icon">
                <el-icon><Plus /></el-icon>
              </div>
              <span class="action-label">发布商品</span>
            </div>
            <div class="action-item" @click="goToOrders">
              <div class="action-icon">
                <el-icon><List /></el-icon>
              </div>
              <span class="action-label">订单管理</span>
            </div>
            <div class="action-item" @click="goToMarketing">
              <div class="action-icon">
                <el-icon><Ticket /></el-icon>
              </div>
              <span class="action-label">优惠券</span>
            </div>
            <div class="action-item" @click="goToSettings">
              <div class="action-icon">
                <el-icon><Setting /></el-icon>
              </div>
              <span class="action-label">店铺装修</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="notice-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">系统公告</span>
              <el-button type="primary" link>查看全部</el-button>
            </div>
          </template>
          <div class="notice-list">
            <div v-for="notice in notices" :key="notice.id" class="notice-item">
              <el-tag :type="notice.type" size="small">{{ notice.tag }}</el-tag>
              <span class="notice-title">{{ notice.title }}</span>
              <span class="notice-time">{{ notice.time }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 待处理事项 -->
    <el-card class="tasks-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">待处理事项</span>
          <el-badge :value="pendingTasks.length" :max="99">
            <el-button type="primary" link>查看详情</el-button>
          </el-badge>
        </div>
      </template>
      <el-table :data="pendingTasks" style="width: 100%">
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.tagType" size="small">{{ row.typeText }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleTask(row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Money, ShoppingCart, Box, Warning, Top, Bottom,
  Plus, List, Ticket, Setting
} from '@element-plus/icons-vue'

const router = useRouter()

// 图表周期
const chartPeriod = ref('7')

// 统计数据
const stats = ref({
  todaySales: 12856,
  salesTrend: 8.5,
  todayOrders: 56,
  pendingShipments: 12,
  lowStock: 5
})

// 公告列表
const notices = ref([
  { id: 1, title: '关于春节期间物流安排的通知', tag: '物流', type: 'warning', time: '01-15' },
  { id: 2, title: '商家中心升级维护公告', tag: '系统', type: 'info', time: '01-14' },
  { id: 3, title: '新功能：店铺优惠券限时免费领', tag: '活动', type: 'success', time: '01-13' },
  { id: 4, title: '商品质量抽检规则更新通知', tag: '规则', type: 'danger', time: '01-12' }
])

// 待处理事项
const pendingTasks = ref([
  { id: 1, type: 'order', typeText: '待发货', tagType: 'warning', content: '订单 #ORDER001 待发货', time: '2024-01-15 14:30' },
  { id: 2, type: 'refund', typeText: '退款申请', tagType: 'danger', content: '用户申请退款 ¥299.00', time: '2024-01-15 13:20' },
  { id: 3, type: 'stock', typeText: '库存预警', tagType: 'info', content: 'iPhone 15 Pro Max 库存不足', time: '2024-01-15 12:00' },
  { id: 4, type: 'review', typeText: '待审核', tagType: 'success', content: '新商品待审核发布', time: '2024-01-15 10:30' }
])

// 处理任务
const handleTask = (task) => {
  if (task.type === 'order') {
    router.push('/merchant/orders')
  } else if (task.type === 'refund') {
    router.push('/merchant/orders?tab=refund')
  } else if (task.type === 'stock') {
    router.push('/merchant/products')
  } else if (task.type === 'review') {
    router.push('/merchant/products')
  }
}

// 快捷操作跳转
const goToAddProduct = () => {
  router.push('/merchant/products?action=add')
}

const goToOrders = () => {
  router.push('/merchant/orders')
}

const goToMarketing = () => {
  router.push('/merchant/marketing')
}

const goToSettings = () => {
  router.push('/merchant/settings')
}

onMounted(() => {
  // 模拟加载数据
  console.log('Dashboard loaded')
})
</script>

<style scoped lang="scss">
.merchant-dashboard {
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .stat-content {
      flex: 1;

      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #303133;
      }

      .stat-label {
        font-size: 14px;
        color: #909399;
        margin: 4px 0;
      }

      .stat-trend {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;

        &.up {
          color: #67c23a;
        }

        &.down {
          color: #f56c6c;
        }
      }
    }
  }

  .chart-row {
    margin-bottom: 20px;
  }

  .chart-card {
    :deep(.el-card__header) {
      padding: 14px 20px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }

    .chart-container {
      height: 300px;
    }
  }

  .quick-actions-card {
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 20px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
          background: #f5f7fa;

          .action-icon {
            transform: scale(1.1);
          }
        }

        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #e6f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #409eff;
          transition: transform 0.3s;
        }

        .action-label {
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }

  .notice-card {
    .notice-list {
      .notice-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: none;
        }

        .notice-title {
          flex: 1;
          font-size: 14px;
          color: #606266;
          cursor: pointer;

          &:hover {
            color: #409eff;
          }
        }

        .notice-time {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }

  .tasks-card {
    margin-top: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }
  }
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .chart-row .el-col {
    margin-bottom: 20px;
  }

  .quick-actions-card .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
