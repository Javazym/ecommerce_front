<template>
  <div class="admin-finance">
    <!-- 数据概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6f7ff;"><el-icon style="color: #409eff;"><Money /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">¥{{ stats.platformRevenue.toLocaleString() }}</div>
              <div class="stat-label">平台总收入</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f6ffed;"><el-icon style="color: #67c23a;"><Coin /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">¥{{ stats.monthlyRevenue.toLocaleString() }}</div>
              <div class="stat-label">本月收入</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff7e6;"><el-icon style="color: #e6a23c;">&lt;Wallet /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.pendingWithdrawals }}</div>
              <div class="stat-label">待审核提现</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff1f0;"><el-icon style="color: #f56c6c;">&lt;CreditCard /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">¥{{ stats.refunds.toLocaleString() }}</div>
              <div class="stat-label">本月退款</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="提现审核" name="withdraw">
          <template #label><span>提现审核</span><el-badge :value="withdrawCount" :max="99" /></template>
        </el-tab-pane>
        <el-tab-pane label="资金流水" name="flow" />
        <el-tab-pane label="收入报表" name="report" />
      </el-tabs>

      <!-- 提现审核 -->
      <div v-if="activeTab === 'withdraw'" class="tab-content">
        <el-table :data="withdrawList" v-loading="loading" style="width: 100%">
          <el-table-column prop="merchantName" label="商家" width="150" />
          <el-table-column prop="accountType" label="提现方式" width="100" />
          <el-table-column prop="accountNo" label="账号" width="180" />
          <el-table-column prop="amount" label="金额" width="120">
            <template #default="{ row }"><span class="amount">¥{{ row.amount.toLocaleString() }}</span></template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费" width="80">¥{{ row.fee }}</el-table-column>
          <el-table-column prop="applyTime" label="申请时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }"><el-tag :type="row.status === 'pending' ? 'warning' : 'info'" size="small">{{ row.status === 'pending' ? '待审核' : '已处理' }}</el-tag></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="approveWithdraw(row)" v-if="row.status === 'pending'">通过</el-button>
              <el-button type="danger" size="small" @click="rejectWithdraw(row)" v-if="row.status === 'pending'">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 资金流水 -->
      <div v-if="activeTab === 'flow'" class="tab-content">
        <el-table :data="flowList" v-loading="loading" style="width: 100%">
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }"><el-tag :type="getFlowType(row.type)" size="small">{{ row.typeText }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商家" width="150" />
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column prop="amount" label="金额" width="120">
            <template #default="{ row }"><span :class="row.type === 'income' ? 'income' : 'expense'">{{ row.type === 'income' ? '+' : '-' }}¥{{ row.amount.toLocaleString() }}</span></template>
          </el-table-column>
          <el-table-column prop="commission" label="平台抽成" width="100">¥{{ row.commission }}</el-table-column>
        </el-table>
      </div>

      <!-- 收入报表 -->
      <div v-if="activeTab === 'report'" class="tab-content">
        <el-table :data="reportList" v-loading="loading" style="width: 100%">
          <el-table-column prop="month" label="月份" width="120" />
          <el-table-column prop="orderCount" label="订单数" width="100" />
          <el-table-column prop="gmv" label="GMV" width="140">
            <template #default="{ row }"><span class="gmv">¥{{ row.gmv.toLocaleString() }}</span></template>
          </el-table-column>
          <el-table-column prop="commission" label="平台抽成" width="140">
            <template #default="{ row }"><span class="commission">¥{{ row.commission.toLocaleString() }}</span></template>
          </el-table-column>
          <el-table-column prop="refund" label="退款金额" width="140">
            <template #default="{ row }"><span class="refund">¥{{ row.refund.toLocaleString() }}</span></template>
          </el-table-column>
          <el-table-column prop="netRevenue" label="净收入" width="140">
            <template #default="{ row }"><span class="net-revenue">¥{{ row.netRevenue.toLocaleString() }}</span></template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Money, Coin, Wallet, CreditCard } from '@element-plus/icons-vue'

const activeTab = ref('withdraw')
const loading = ref(false)
const withdrawCount = ref(3)

const stats = ref({ platformRevenue: 568000, monthlyRevenue: 85600, pendingWithdrawals: 3, refunds: 5680 })

const withdrawList = ref([
  { id: 1, merchantName: '云商城旗舰店', accountType: '银行卡', accountNo: '6222 **** **** 8888', amount: 5000, fee: 50, status: 'pending', applyTime: '2024-01-15 14:30:25' },
  { id: 2, merchantName: '数码专营店', accountType: '支付宝', accountNo: '138****8888@alipay.com', amount: 3000, fee: 30, status: 'pending', applyTime: '2024-01-15 11:20:15' },
  { id: 3, merchantName: '潮流服饰店', accountType: '银行卡', accountNo: '6217 **** **** 9999', amount: 2000, fee: 20, status: 'pending', applyTime: '2024-01-15 10:15:00' }
])

const flowList = ref([
  { time: '2024-01-15 14:30:25', type: 'income', typeText: '订单收入', merchantName: '云商城旗舰店', orderNo: 'YS202401150001', amount: 2698, commission: 135 },
  { time: '2024-01-15 10:15:30', type: 'income', typeText: '订单收入', merchantName: '数码专营店', orderNo: 'YS202401150002', amount: 8999, commission: 450 },
  { time: '2024-01-14 16:20:15', type: 'expense', typeText: '提现', merchantName: '家居生活馆', orderNo: '', amount: 3000, commission: 0 }
])

const reportList = ref([
  { month: '2024年1月', orderCount: 1568, gmv: 856800, commission: 42840, refund: 5680, netRevenue: 37160 },
  { month: '2023年12月', orderCount: 2089, gmv: 1256800, commission: 62840, refund: 8560, netRevenue: 54280 },
  { month: '2023年11月', orderCount: 1896, gmv: 986800, commission: 49340, refund: 4680, netRevenue: 44660 }
])

const getFlowType = (type) => type === 'income' ? 'success' : 'warning'

const approveWithdraw = async (item) => {
  try {
    await ElMessageBox.confirm(`确定通过 ¥${item.amount} 的提现申请吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'success' })
    item.status = 'completed'
    ElMessage.success('提现已通过')
  } catch {}
}

const rejectWithdraw = async (item) => {
  try {
    await ElMessageBox.confirm(`确定拒绝 ¥${item.amount} 的提现申请吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    item.status = 'completed'
    ElMessage.success('提现已拒绝')
  } catch {}
}
</script>

<style scoped lang="scss">
.admin-finance {
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

    .tabs-card {
      .tab-content {
        margin-top: 16px;
      }

      .amount {
        font-weight: 600;
        color: #f56c6c;
      }

      .income {
        color: #67c23a;
        font-weight: 600;
      }

      .expense {
        color: #f56c6c;
        font-weight: 600;
      }

      .gmv {
        font-weight: 600;
        color: #303133;
      }

      .commission {
        color: #409eff;
        font-weight: 600;
      }

      .refund {
        color: #f56c6c;
      }

      .net-revenue {
        color: #67c23a;
        font-weight: 600;
      }
    }
  }
}
</style>
