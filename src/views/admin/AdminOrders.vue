<template>
  <div class="admin-orders">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
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
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getOrderList as getAdminOrderList } from '../../api/modules/admin.js'

const activeTab = ref('all')
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

const orderList = ref([])

// 加载订单列表
const loadOrderList = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 根据Tab和筛选条件设置参数
    if (activeTab.value === 'refund') {
      params.status = 5 // 退款中
    } else if (statusFilter.value) {
      const statusMap = {
        'pending': 0,
        'paid': 1,
        'shipped': 2,
        'completed': 3,
        'cancelled': 4
      }
      params.status = statusMap[statusFilter.value]
    }
    
    const res = await getAdminOrderList(params)
    if (res.code === 1000 && res.data) {
      orderList.value = (res.data.content || []).map(item => ({
        id: item.id,
        orderNo: item.orderNo,
        merchantName: item.merchantName || '未知商家',
        userName: item.userName || '未知用户',
        productName: item.productName || '商品',
        quantity: item.quantity || 1,
        amount: item.actualAmount || 0,
        status: item.status,
        createTime: item.createTime
      }))
      total.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载订单列表失败:', error)
    ElMessage.error('加载订单列表失败')
  } finally {
    loading.value = false
  }
}

const getStatusType = (status) => {
  const map = { 0: 'info', 1: 'warning', 2: 'primary', 3: 'success', 4: 'danger', 5: 'warning' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { 0: '待付款', 1: '待发货', 2: '已发货', 3: '已完成', 4: '已取消', 5: '退款中' }
  return map[status] || '未知'
}

const viewOrderDetail = (order) => {
  ElMessage.info(`查看订单 ${order.orderNo} 详情`)
  // TODO: 跳转到订单详情页
}

const handleRefund = (order) => {
  ElMessage.info(`处理订单 ${order.orderNo} 的退款申请`)
  // TODO: 打开退款处理弹窗
}

// 监听Tab切换和分页变化
const handleTabChange = () => {
  currentPage.value = 1
  loadOrderList()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  loadOrderList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  loadOrderList()
}

// 初始加载
onMounted(() => {
  loadOrderList()
})
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
