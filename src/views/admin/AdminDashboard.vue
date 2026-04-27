<template>
  <div class="admin-dashboard">
    <!-- 数据概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6f7ff;">
              <el-icon style="color: #409eff;"><Money /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ stats.totalGMV.toLocaleString() }}</div>
              <div class="stat-label">平台总GMV</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f6ffed;">
              <el-icon style="color: #67c23a;"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.totalUsers.toLocaleString() }}</div>
              <div class="stat-label">总用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff7e6;">
              <el-icon style="color: #e6a23c;"><OfficeBuilding /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.totalMerchants }}</div>
              <div class="stat-label">商家数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff1f0;">
              <el-icon style="color: #f56c6c;"><Warning /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.pendingTasks }}</div>
              <div class="stat-label">待处理任务</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">交易趋势</span>
              <el-radio-group v-model="chartPeriod" size="small">
                <el-radio-button label="7">近7天</el-radio-button>
                <el-radio-button label="30">近30天</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container" ref="trendChartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">商家类目分布</span>
            </div>
          </template>
          <div class="chart-container" ref="categoryChartRef"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 待处理事项 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="tasks-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">待审核商家</span>
              <el-badge :value="pendingMerchants.length" :max="99">
                <el-button type="primary" link @click="goToMerchants">查看全部</el-button>
              </el-badge>
            </div>
          </template>
          <div class="task-list">
            <div v-for="merchant in pendingMerchants" :key="merchant.id" class="task-item">
              <img :src="merchant.avatar" alt="" class="task-avatar" />
              <div class="task-content">
                <div class="task-title">{{ merchant.name }}</div>
                <div class="task-desc">申请时间：{{ merchant.applyTime }}</div>
              </div>
              <div class="task-actions">
                <el-button type="success" size="small" @click="approveMerchant(merchant)">通过</el-button>
                <el-button type="danger" size="small" @click="rejectMerchant(merchant)">拒绝</el-button>
              </div>
            </div>
            <el-empty v-if="pendingMerchants.length === 0" description="暂无待审核商家" :image-size="60" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="tasks-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">待处理提现</span>
              <el-badge :value="pendingWithdrawals.length" :max="99">
                <el-button type="primary" link @click="goToFinance">查看全部</el-button>
              </el-badge>
            </div>
          </template>
          <div class="task-list">
            <div v-for="withdrawal in pendingWithdrawals" :key="withdrawal.id" class="task-item">
              <div class="task-icon" style="background: #fff7e6;">
                <el-icon style="color: #e6a23c;"><Wallet /></el-icon>
              </div>
              <div class="task-content">
                <div class="task-title">¥{{ withdrawal.amount.toLocaleString() }}</div>
                <div class="task-desc">{{ withdrawal.merchantName }} | {{ withdrawal.time }}</div>
              </div>
              <div class="task-actions">
                <el-button type="success" size="small" @click="approveWithdrawal(withdrawal)">通过</el-button>
                <el-button type="danger" size="small" @click="rejectWithdrawal(withdrawal)">拒绝</el-button>
              </div>
            </div>
            <el-empty v-if="pendingWithdrawals.length === 0" description="暂无待处理提现" :image-size="60" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近订单 -->
    <el-card class="recent-orders-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">最新订单</span>
          <el-button type="primary" link @click="goToOrders">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="merchantName" label="商家" width="150" />
        <el-table-column prop="userName" label="买家" width="120" />
        <el-table-column prop="amount" label="金额" width="100">
          <template #default="{ row }">
            <span class="amount">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Money, User, OfficeBuilding, Warning, Wallet } from '@element-plus/icons-vue'

const router = useRouter()

// 图表周期
const chartPeriod = ref('7')

// 统计数据
const stats = ref({
  totalGMV: 2568000,
  totalUsers: 56800,
  totalMerchants: 128,
  pendingTasks: 15
})

// 待审核商家
const pendingMerchants = ref([
  { id: 1, name: '数码专营店', avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100', applyTime: '2024-01-15 10:30' },
  { id: 2, name: '潮流服饰店', avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100', applyTime: '2024-01-15 09:20' }
])

// 待处理提现
const pendingWithdrawals = ref([
  { id: 1, amount: 5000, merchantName: '云商城旗舰店', time: '2024-01-15 14:30' },
  { id: 2, amount: 3000, merchantName: '数码专营店', time: '2024-01-15 11:20' }
])

// 最近订单
const recentOrders = ref([
  { orderNo: 'YS202401150001', merchantName: '云商城旗舰店', userName: '用户1234', amount: 2698, status: 'completed', createTime: '2024-01-15 14:30:25' },
  { orderNo: 'YS202401150002', merchantName: '数码专营店', userName: '买家5678', amount: 4990, status: 'shipped', createTime: '2024-01-15 10:15:30' },
  { orderNo: 'YS202401140003', merchantName: '潮流服饰店', userName: '顾客9012', amount: 899, status: 'paid', createTime: '2024-01-14 16:20:15' }
])

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    pending: 'info',
    paid: 'warning',
    shipped: 'primary',
    completed: 'success'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    pending: '待付款',
    paid: '待发货',
    shipped: '已发货',
    completed: '已完成'
  }
  return textMap[status] || '未知'
}

// 审核通过商家
const approveMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定通过商家 "${merchant.name}" 的入驻申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    })
    const index = pendingMerchants.value.findIndex(m => m.id === merchant.id)
    if (index > -1) {
      pendingMerchants.value.splice(index, 1)
    }
    ElMessage.success('商家入驻已通过')
  } catch {
    // 取消
  }
}

// 拒绝商家
const rejectMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定拒绝商家 "${merchant.name}" 的入驻申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = pendingMerchants.value.findIndex(m => m.id === merchant.id)
    if (index > -1) {
      pendingMerchants.value.splice(index, 1)
    }
    ElMessage.success('已拒绝商家入驻申请')
  } catch {
    // 取消
  }
}

// 通过提现
const approveWithdrawal = async (withdrawal) => {
  try {
    await ElMessageBox.confirm(`确定通过 ¥${withdrawal.amount} 的提现申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    })
    const index = pendingWithdrawals.value.findIndex(w => w.id === withdrawal.id)
    if (index > -1) {
      pendingWithdrawals.value.splice(index, 1)
    }
    ElMessage.success('提现已通过')
  } catch {
    // 取消
  }
}

// 拒绝提现
const rejectWithdrawal = async (withdrawal) => {
  try {
    await ElMessageBox.confirm(`确定拒绝 ¥${withdrawal.amount} 的提现申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = pendingWithdrawals.value.findIndex(w => w.id === withdrawal.id)
    if (index > -1) {
      pendingWithdrawals.value.splice(index, 1)
    }
    ElMessage.success('提现已拒绝')
  } catch {
    // 取消
  }
}

// 跳转
const goToMerchants = () => router.push('/admin/merchants')
const goToFinance = () => router.push('/admin/finance')
const goToOrders = () => router.push('/admin/orders')
</script>

<style scoped lang="scss">
.admin-dashboard {
  .stats-row {
    margin-bottom: 20px;

    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-info {
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #303133;
          }

          .stat-label {
            font-size: 14px;
            color: #909399;
            margin-top: 4px;
          }
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

  .tasks-card {
    margin-bottom: 20px;

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

    .task-list {
      .task-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: none;
        }

        .task-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
        }

        .task-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .task-content {
          flex: 1;

          .task-title {
            font-size: 14px;
            font-weight: 600;
            color: #303133;
          }

          .task-desc {
            font-size: 12px;
            color: #909399;
            margin-top: 4px;
          }
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }
      }
    }
  }

  .recent-orders-card {
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

    .amount {
      font-weight: 600;
      color: #f56c6c;
    }
  }
}
</style>
