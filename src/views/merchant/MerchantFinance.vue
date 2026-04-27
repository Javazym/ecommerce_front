<template>
  <div class="merchant-finance">
    <!-- 资金概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6f7ff;">
              <el-icon style="color: #409eff;"><Wallet /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ financeStats.accountBalance.toLocaleString() }}</div>
              <div class="stat-label">账户余额</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f6ffed;">
              <el-icon style="color: #67c23a;"><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ financeStats.todayIncome.toLocaleString() }}</div>
              <div class="stat-label">今日收入</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff7e6;">
              <el-icon style="color: #e6a23c;"><Coin /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ financeStats.pendingSettle.toLocaleString() }}</div>
              <div class="stat-label">待结算</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff1f0;">
              <el-icon style="color: #f56c6c;"><CreditCard /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ financeStats.pendingWithdraw.toLocaleString() }}</div>
              <div class="stat-label">提现中</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="资金流水" name="flow">
          <template #label>
            <el-icon><List /></el-icon>
            <span>资金流水</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="withdraw">
          <template #label>
            <el-icon><Wallet /></el-icon>
            <span>提现记录</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="对账单" name="bill">
          <template #label>
            <el-icon><Document /></el-icon>
            <span>对账单</span>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 资金流水 -->
      <div v-if="activeTab === 'flow'" class="tab-content">
        <div class="content-header">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 240px"
          />
          <el-select v-model="flowTypeFilter" placeholder="全部类型" clearable style="width: 140px">
            <el-option label="收入" value="income" />
            <el-option label="支出" value="expense" />
            <el-option label="提现" value="withdraw" />
          </el-select>
          <el-button type="primary">查询</el-button>
          <el-button>导出</el-button>
        </div>

        <el-table :data="flowList" v-loading="loading" style="width: 100%">
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="getFlowTypeColor(row.type)" size="small">
                {{ getFlowTypeText(row.type) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="关联订单" width="180">
            <template #default="{ row }">
              <span class="order-link">{{ row.orderNo || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="120">
            <template #default="{ row }">
              <span :class="row.type === 'income' ? 'income' : 'expense'">
                {{ row.type === 'income' ? '+' : '-' }}¥{{ row.amount.toFixed(2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="balance" label="账户余额" width="120">
            <template #default="{ row }">
              ¥{{ row.balance.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="200" />
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>

      <!-- 提现记录 -->
      <div v-if="activeTab === 'withdraw'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openWithdrawDialog">
            <el-icon><Plus /></el-icon>
            申请提现
          </el-button>
        </div>

        <el-table :data="withdrawList" v-loading="loading" style="width: 100%">
          <el-table-column prop="time" label="申请时间" width="180" />
          <el-table-column prop="amount" label="提现金额" width="120">
            <template #default="{ row }">
              <span class="amount">¥{{ row.amount.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="提现账户" min-width="180" />
          <el-table-column prop="accountNo" label="账户账号" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getWithdrawStatusType(row.status)" size="small">
                {{ getWithdrawStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="completeTime" label="完成时间" width="180" />
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button type="primary" link v-if="row.status === 'pending'">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 对账单 -->
      <div v-if="activeTab === 'bill'" class="tab-content">
        <div class="content-header">
          <el-select v-model="yearFilter" style="width: 120px">
            <el-option label="2024年" value="2024" />
            <el-option label="2023年" value="2023" />
          </el-select>
          <el-select v-model="monthFilter" style="width: 120px">
            <el-option label="全部月份" value="" />
            <el-option label="1月" value="1" />
            <el-option label="2月" value="2" />
            <el-option label="3月" value="3" />
          </el-select>
          <el-button>查询</el-button>
          <el-button type="primary">导出对账单</el-button>
        </div>

        <el-table :data="billList" v-loading="loading" style="width: 100%">
          <el-table-column prop="month" label="月份" width="120" />
          <el-table-column prop="orderCount" label="订单数" width="100" />
          <el-table-column prop="income" label="收入" width="120">
            <template #default="{ row }">
              <span class="income">¥{{ row.income.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="refund" label="退款" width="120">
            <template #default="{ row }">
              <span class="expense">¥{{ row.refund.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="commission" label="平台服务费" width="120">
            <template #default="{ row }">
              <span class="expense">¥{{ row.commission.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="settleAmount" label="结算金额" width="120">
            <template #default="{ row }">
              <span class="settle">¥{{ row.settleAmount.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 'settled' ? 'success' : 'warning'" size="small">
                {{ row.status === 'settled' ? '已结算' : '待结算' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="primary" link>查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 提现弹窗 -->
    <el-dialog v-model="withdrawDialogVisible" title="申请提现" width="500px">
      <el-form :model="withdrawForm" label-width="80px">
        <el-form-item label="提现金额">
          <el-input-number
            v-model="withdrawForm.amount"
            :min="100"
            :max="financeStats.accountBalance"
            :precision="2"
            style="width: 200px"
          />
          <span class="unit">元</span>
        </el-form-item>
        <el-form-item label="提现方式">
          <el-radio-group v-model="withdrawForm.method">
            <el-radio label="bank">银行卡</el-radio>
            <el-radio label="alipay">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="到账账户">
          <el-select v-model="withdrawForm.account" placeholder="请选择账户" style="width: 100%">
            <el-option
              v-for="account in accountList"
              :key="account.id"
              :label="account.name"
              :value="account.id"
            >
              <span>{{ account.name }}</span>
              <span style="color: #909399; font-size: 12px;"> ({{ account.number }})</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手续费">
          <span class="fee">¥{{ (withdrawForm.amount * 0.01).toFixed(2) }} (1%)</span>
        </el-form-item>
        <el-form-item label="实际到账">
          <span class="actual-amount">¥{{ (withdrawForm.amount * 0.99).toFixed(2) }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="withdrawDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmWithdraw" :loading="withdrawing">确认提现</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Wallet, TrendCharts, Coin, CreditCard, List, Document, Plus
} from '@element-plus/icons-vue'

// Tab
const activeTab = ref('flow')
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 财务统计
const financeStats = ref({
  accountBalance: 25680,
  todayIncome: 8560,
  pendingSettle: 5680,
  pendingWithdraw: 2000
})

// 筛选
const dateRange = ref([])
const flowTypeFilter = ref('')
const yearFilter = ref('2024')
const monthFilter = ref('')

// 资金流水列表
const flowList = ref([
  {
    time: '2024-01-15 14:30:25',
    type: 'income',
    orderNo: 'YS202401150001',
    amount: 2698,
    balance: 25680,
    remark: '订单收入'
  },
  {
    time: '2024-01-15 10:15:30',
    type: 'income',
    orderNo: 'YS202401150002',
    amount: 4990,
    balance: 22982,
    remark: '订单收入'
  },
  {
    time: '2024-01-14 16:20:15',
    type: 'withdraw',
    orderNo: '',
    amount: 5000,
    balance: 17992,
    remark: '提现至银行卡'
  },
  {
    time: '2024-01-14 12:00:00',
    type: 'expense',
    orderNo: '',
    amount: 100,
    balance: 22992,
    remark: '平台服务费'
  },
  {
    time: '2024-01-13 15:30:20',
    type: 'income',
    orderNo: 'YS202401130005',
    amount: 1899,
    balance: 23092,
    remark: '订单收入'
  }
])

// 提现记录列表
const withdrawList = ref([
  {
    id: 1,
    time: '2024-01-14 10:00:00',
    amount: 5000,
    account: '中国工商银行',
    accountNo: '6222 **** **** 8888',
    status: 'completed',
    completeTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    time: '2024-01-10 14:20:00',
    amount: 3000,
    account: '支付宝',
    accountNo: '138****8888@alipay.com',
    status: 'completed',
    completeTime: '2024-01-11 09:15:00'
  },
  {
    id: 3,
    time: '2024-01-15 16:00:00',
    amount: 2000,
    account: '中国建设银行',
    accountNo: '6217 **** **** 9999',
    status: 'pending',
    completeTime: ''
  }
])

// 对账单列表
const billList = ref([
  {
    month: '2024年1月',
    orderCount: 156,
    income: 85680,
    refund: 2680,
    commission: 8300,
    settleAmount: 74700,
    status: 'settled'
  },
  {
    month: '2023年12月',
    orderCount: 208,
    income: 125680,
    refund: 5680,
    commission: 12000,
    settleAmount: 108000,
    status: 'settled'
  },
  {
    month: '2023年11月',
    orderCount: 189,
    income: 98680,
    refund: 3680,
    commission: 9500,
    settleAmount: 85500,
    status: 'settled'
  }
])

// 账户列表
const accountList = ref([
  { id: 1, name: '中国工商银行', number: '6222 **** **** 8888' },
  { id: 2, name: '中国建设银行', number: '6217 **** **** 9999' },
  { id: 3, name: '支付宝', number: '138****8888@alipay.com' }
])

// 提现弹窗
const withdrawDialogVisible = ref(false)
const withdrawing = ref(false)
const withdrawForm = reactive({
  amount: 100,
  method: 'bank',
  account: ''
})

// 获取流水类型颜色
const getFlowTypeColor = (type) => {
  const colorMap = {
    income: 'success',
    expense: 'danger',
    withdraw: 'warning'
  }
  return colorMap[type] || 'info'
}

// 获取流水类型文本
const getFlowTypeText = (type) => {
  const textMap = {
    income: '收入',
    expense: '支出',
    withdraw: '提现'
  }
  return textMap[type] || '未知'
}

// 获取提现状态类型
const getWithdrawStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取提现状态文本
const getWithdrawStatusText = (status) => {
  const textMap = {
    pending: '待审核',
    processing: '处理中',
    completed: '已完成',
    rejected: '已拒绝'
  }
  return textMap[status] || '未知'
}

// 打开提现弹窗
const openWithdrawDialog = () => {
  withdrawForm.amount = 100
  withdrawForm.method = 'bank'
  withdrawForm.account = ''
  withdrawDialogVisible.value = true
}

// 确认提现
const confirmWithdraw = async () => {
  if (!withdrawForm.account) {
    ElMessage.warning('请选择提现账户')
    return
  }
  if (withdrawForm.amount < 100) {
    ElMessage.warning('提现金额不能低于100元')
    return
  }
  if (withdrawForm.amount > financeStats.value.accountBalance) {
    ElMessage.warning('余额不足')
    return
  }

  withdrawing.value = true

  setTimeout(() => {
    withdrawing.value = false
    withdrawDialogVisible.value = false
    ElMessage.success('提现申请已提交，预计1-3个工作日到账')

    withdrawList.value.unshift({
      id: Date.now(),
      time: new Date().toLocaleString(),
      amount: withdrawForm.amount,
      account: accountList.value.find(a => a.id === withdrawForm.account)?.name || '',
      accountNo: accountList.value.find(a => a.id === withdrawForm.account)?.number || '',
      status: 'pending',
      completeTime: ''
    })
  }, 1000)
}
</script>

<style scoped lang="scss">
.merchant-finance {
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

  .tab-content {
    .content-header {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      align-items: center;
    }

    .income {
      color: #67c23a;
      font-weight: 600;
    }

    .expense {
      color: #f56c6c;
      font-weight: 600;
    }

    .settle {
      color: #409eff;
      font-weight: 600;
    }

    .amount {
      font-size: 16px;
      font-weight: 600;
      color: #f56c6c;
    }

    .order-link {
      color: #409eff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.unit {
  margin-left: 8px;
  color: #909399;
}

.fee {
  color: #e6a23c;
  font-size: 14px;
}

.actual-amount {
  font-size: 20px;
  font-weight: 600;
  color: #f56c6c;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
