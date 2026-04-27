<template>
  <div class="order-management">
    <h2 class="section-title">我的订单</h2>

    <el-tabs v-model="activeTab" class="order-tabs" @tab-change="handleTabChange">
      <el-tab-pane label="全部订单" name="all">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="待付款" name="pending">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="待发货" name="paid">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="待收货" name="shipped">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="已完成" name="completed">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="已取消" name="cancelled">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <div class="pagination-container" v-if="totalOrders > pageSize">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totalOrders"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 取消订单对话框 -->
    <el-dialog v-model="cancelDialogVisible" title="取消订单" width="400px">
      <el-form :model="cancelForm" label-width="80px">
        <el-form-item label="取消原因">
          <el-select v-model="cancelForm.reason" placeholder="请选择取消原因">
            <el-option label="商品缺货" value="商品缺货" />
            <el-option label="不想要了" value="不想要了" />
            <el-option label="信息填写错误" value="信息填写错误" />
            <el-option label="支付方式受限" value="支付方式受限" />
            <el-option label="其他原因" value="其他原因" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input
            v-model="cancelForm.detail"
            type="textarea"
            :rows="3"
            placeholder="请输入详细说明（选填）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCancelOrder">确认取消</el-button>
      </template>
    </el-dialog>

    <!-- 物流信息对话框 -->
    <el-dialog v-model="logisticsDialogVisible" title="物流信息" width="600px">
      <div class="logistics-info" v-if="currentLogistics">
        <div class="logistics-header">
          <p><strong>物流公司：</strong>{{ currentLogistics.company }}</p>
          <p><strong>运单号：</strong>{{ currentLogistics.trackingNo }}</p>
          <p><strong>物流状态：</strong><el-tag type="success">{{ currentLogistics.status }}</el-tag></p>
        </div>
        <el-divider />
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in currentLogistics.details"
            :key="index"
            :timestamp="item.time"
            placement="top"
          >
            {{ item.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import OrderList from './OrderList.vue'
import { fetchOrders, cancelOrder, payOrder, confirmReceipt, deleteOrder, applyRefund, getLogistics, state } from '../../stores/orderStore'

// 当前标签
const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)

// 取消订单相关
const cancelDialogVisible = ref(false)
const cancelForm = reactive({
  orderId: null,
  reason: '',
  detail: ''
})

// 物流信息相关
const logisticsDialogVisible = ref(false)
const currentLogistics = ref(null)

// 加载订单列表
onMounted(() => {
  loadOrders()
})

// 加载订单
const loadOrders = () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }

  // 如果不是全部订单，添加状态过滤
  if (activeTab.value !== 'all') {
    // 映射前端状态到后端状态码
    const statusMap = {
      pending: 0,  // 待付款
      paid: 1,     // 待发货
      shipped: 2,  // 待收货
      completed: 3,// 已完成
      cancelled: 4 // 已取消
    }
    params.status = statusMap[activeTab.value]
  }

  fetchOrders(params)
}

// 过滤后的订单列表（从 store 获取）
const filteredOrders = computed(() => {
  return state.orders || []
})

// 总订单数
const totalOrders = computed(() => {
  return state.orders.length || 0
})

// 标签页切换
const handleTabChange = () => {
  currentPage.value = 1
  loadOrders() // 重新加载订单
}

// 页面切换
const handlePageChange = () => {
  loadOrders() // 加载新页面的订单
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 处理订单操作
const handleOrderAction = (action, order) => {
  switch (action) {
    case 'pay':
      handlePayOrder(order)
      break
    case 'cancel':
      handleCancelOrder(order)
      break
    case 'confirm':
      handleConfirmReceipt(order)
      break
    case 'logistics':
      handleViewLogistics(order)
      break
    case 'delete':
      handleDeleteOrder(order)
      break
    case 'review':
      handleReviewOrder(order)
      break
    case 'refund':
      handleApplyRefund(order)
      break
    default:
      break
  }
}

// 去支付
const handlePayOrder = (order) => {
  // 弹出支付方式选择
  ElMessageBox.confirm(
    '请选择支付方式',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '支付宝',
      cancelButtonText: '微信',
      type: 'info'
    }
  ).then(() => {
    payOrder(order.id, 'alipay')
  }).catch((action) => {
    if (action === 'cancel') {
      payOrder(order.id, 'wechat')
    }
    // 'close' 不做处理
  })
}

// 取消订单
const handleCancelOrder = (order) => {
  cancelForm.orderId = order.id
  cancelForm.reason = ''
  cancelForm.detail = ''
  cancelDialogVisible.value = true
}

// 确认取消订单
const confirmCancelOrder = () => {
  if (!cancelForm.reason) {
    ElMessage.warning('请选择取消原因')
    return
  }

  cancelOrder(cancelForm.orderId)
  cancelDialogVisible.value = false
}

// 确认收货
const handleConfirmReceipt = (order) => {
  confirmReceipt(order.id)
}

// 查看物流
const handleViewLogistics = (order) => {
  currentLogistics.value = getLogistics(order.id)
  if (!currentLogistics.value) {
    ElMessage.info('暂无物流信息')
    return
  }
  logisticsDialogVisible.value = true
}

// 删除订单
const handleDeleteOrder = (order) => {
  deleteOrder(order.id)
}

// 评价订单
const handleReviewOrder = (order) => {
  ElMessage.info('评价功能开发中')
}

// 申请退款
const handleApplyRefund = (order) => {
  applyRefund(order.id, '用户申请退款')
}
</script>

<style scoped lang="scss">
.order-management {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .order-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .logistics-info {
    .logistics-header {
      p {
        margin: 8px 0;
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>
