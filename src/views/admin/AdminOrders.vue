<template>
  <div class="admin-orders">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部订单" name="all" />
        <el-tab-pane label="退款中" name="refund" />
        <el-tab-pane label="售后处理" name="afterSale" />
      </el-tabs>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input v-model="searchQuery" placeholder="搜索订单号/商家/买家" clearable style="width: 280px">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="订单状态" clearable style="width: 120px">
          <el-option label="待付款" value="pending" />
          <el-option label="待发货" value="paid" />
          <el-option label="已发货" value="shipped" />
          <el-option label="已完成" value="completed" />
          <el-option label="已取消" value="cancelled" />
        </el-select>
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束" style="width: 240px" />
        <el-button type="primary">搜索</el-button>
      </div>

      <!-- 订单列表 -->
      <el-table :data="orderList" v-loading="loading" style="width: 100%; margin-top: 16px;">
        <el-table-column prop="orderNo" label="订单信息" width="180">
          <template #default="{ row }">
            <div class="order-info">
              <div class="order-no">{{ row.orderNo }}</div>
              <div class="order-time">{{ row.createTime }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="商家" width="150" />
        <el-table-column prop="userName" label="买家" width="120" />
        <el-table-column label="商品信息" min-width="200">
          <template #default="{ row }">
            <div class="product-info">{{ row.productName }} x{{ row.quantity }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="100">
          <template #default="{ row }">
            <span class="amount">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewOrderDetail(row)">详情</el-button>
            <el-button type="warning" link @click="handleRefund(row)" v-if="row.status === 'refund'">处理退款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]" :total="total" sizes, prev, pager, next, jumper />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const activeTab = ref('all')
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

const orderList = ref([
  { id: 1, orderNo: 'YS202401150001', merchantName: '云商城旗舰店', userName: '用户1234', productName: 'Apple AirPods Pro 2', quantity: 1, amount: 1899, status: 'completed', createTime: '2024-01-15 14:30:25' },
  { id: 2, orderNo: 'YS202401150002', merchantName: '数码专营店', userName: '买家5678', productName: 'iPhone 15 Pro Max', quantity: 1, amount: 8999, status: 'shipped', createTime: '2024-01-15 10:15:30' },
  { id: 3, orderNo: 'YS202401140003', merchantName: '潮流服饰店', userName: '顾客9012', productName: 'Nike Air Max 270', quantity: 1, amount: 799, status: 'refund', createTime: '2024-01-14 16:20:15' }
])

const getStatusType = (status) => {
  const map = { pending: 'info', paid: 'warning', shipped: 'primary', completed: 'success', cancelled: 'danger', refund: 'warning' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { pending: '待付款', paid: '待发货', shipped: '已发货', completed: '已完成', cancelled: '已取消', refund: '退款中' }
  return map[status] || '未知'
}

const viewOrderDetail = (order) => ElMessage.info('查看订单详情')
const handleRefund = (order) => ElMessage.info('处理退款')
</script>

<style scoped>
.admin-orders {
  .tabs-card {
    .search-bar { display: flex; gap: 12px; align-items: center; }
    .order-info { .order-no { font-size: 14px; color: #303133; } .order-time { font-size: 12px; color: #909399; margin-top: 4px; } }
    .product-info { font-size: 14px; color: #606266; }
    .amount { font-weight: 600; color: #f56c6c; }
    .pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
  }
}
</style>
