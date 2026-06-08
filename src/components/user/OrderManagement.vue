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
      <el-tab-pane label="退款中" name="refunding">
        <order-list :orders="filteredOrders" @action="handleOrderAction" />
      </el-tab-pane>
      <el-tab-pane label="已退款" name="refunded">
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

    <!-- 申请退款对话框 -->
    <el-dialog v-model="refundDialogVisible" title="申请退款/退货" width="600px">
      <el-form :model="refundForm" label-width="100px">
        <el-form-item label="退款类型" required>
          <el-radio-group v-model="refundForm.type">
            <el-radio :label="1">仅退款</el-radio>
            <el-radio :label="2">退货退款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退款金额" required>
          <el-input-number 
            v-model="refundForm.amount" 
            :min="0.01" 
            :max="currentRefundOrder?.payAmount || 0"
            :precision="2"
            :step="0.01"
            style="width: 100%"
          />
          <div class="form-tip">最多可退 ¥{{ currentRefundOrder?.payAmount || 0 }}</div>
        </el-form-item>
        <el-form-item label="退款原因" required>
          <el-select v-model="refundForm.reason" placeholder="请选择退款原因" style="width: 100%">
            <el-option label="商品质量问题" value="商品质量问题" />
            <el-option label="商品与描述不符" value="商品与描述不符" />
            <el-option label="发错货/漏发" value="发错货/漏发" />
            <el-option label="七天无理由退换" value="七天无理由退换" />
            <el-option label="其他原因" value="其他原因" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input
            v-model="refundForm.description"
            type="textarea"
            :rows="4"
            placeholder="请详细描述退款原因，有助于商家快速处理"
          />
        </el-form-item>
        <el-form-item label="上传凭证">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="3"
          >
            <el-icon><Plus /></el-icon>
            <template #tip>
              <div class="el-upload__tip">最多上传3张图片</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmApplyRefund" :loading="refundLoading">提交申请</el-button>
      </template>
    </el-dialog>

    <!-- 物流信息对话框 -->
    <el-dialog v-model="logisticsDialogVisible" title="物流信息" width="600px">
      <div class="logistics-info" v-if="currentLogistics">
        <div class="logistics-header">
          <p><strong>物流公司：</strong>{{ currentLogistics.logisticsCompany || '未知' }}</p>
          <p><strong>运单号：</strong>{{ currentLogistics.trackingNumber || '暂无' }}</p>
          <p><strong>物流状态：</strong><el-tag type="success">{{ currentLogistics.currentStatus || '运输中' }}</el-tag></p>
        </div>
        <el-divider />
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in parseTraces(currentLogistics.traces)"
            :key="index"
            :timestamp="item.time"
            placement="top"
          >
            {{ item.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div v-else class="empty-logistics">
        <el-empty description="暂无物流信息" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import OrderList from './OrderList.vue'
import { fetchOrders, cancelOrder, payOrder, confirmReceipt, deleteOrder, applyRefund, getLogistics, state } from '../../stores/orderStore'

const router = useRouter()

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

// 退款相关
const refundDialogVisible = ref(false)
const refundLoading = ref(false)
const currentRefundOrder = ref(null)
const refundForm = reactive({
  orderId: null,
  type: 1, // 1-仅退款, 2-退货退款
  amount: 0,
  reason: '',
  description: ''
})

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
      pending: 0,     // 待付款
      paid: 1,        // 待发货
      shipped: 2,     // 待收货
      completed: 3,   // 已完成
      cancelled: 4,   // 已取消
      refunding: 5,   // 退款中
      refunded: 6     // 已退款
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
const handleViewLogistics = async (order) => {
  const logistics = await getLogistics(order.id)
  if (!logistics) {
    ElMessage.info('暂无物流信息')
    return
  }
  currentLogistics.value = logistics
  logisticsDialogVisible.value = true
}

// 删除订单
const handleDeleteOrder = (order) => {
  deleteOrder(order.id)
}

// 评价订单
const handleReviewOrder = (order) => {
  // 跳转到订单详情页进行评价
  router.push(`/order/${order.id}`)
}

// 申请退款
const handleApplyRefund = (order) => {
  currentRefundOrder.value = order
  refundForm.orderId = order.id
  refundForm.type = 1  // 1-仅退款, 2-退货退款
  refundForm.amount = order.payAmount || 0
  refundForm.reason = ''
  refundForm.description = ''
  refundDialogVisible.value = true
}

// 确认申请退款
const confirmApplyRefund = async () => {
  if (!refundForm.reason) {
    ElMessage.warning('请选择退款原因')
    return
  }
  
  if (!refundForm.amount || refundForm.amount <= 0) {
    ElMessage.warning('请输入正确的退款金额')
    return
  }

  refundLoading.value = true
  
  try {
    const result = await applyRefund(refundForm.orderId, {
      type: refundForm.type,  // 1-仅退款, 2-退货退款
      amount: refundForm.amount,
      reason: refundForm.reason,
      description: refundForm.description || refundForm.reason
    })
    refundDialogVisible.value = false
    
    // 如果返回了退款ID，跳转到退款详情页
    if (result && result.data && result.data.id) {
      router.push(`/refund/${result.data.id}`)
    } else {
      // 否则重新加载订单列表
      loadOrders()
    }
  } catch (error) {
    console.error('申请退款失败:', error)
  } finally {
    refundLoading.value = false
  }
}

// 解析物流轨迹
const parseTraces = (traces) => {
  if (!traces) return []
  
  // 如果 traces 是字符串，尝试解析为 JSON
  if (typeof traces === 'string') {
    try {
      const parsed = JSON.parse(traces)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      // 如果不是 JSON 格式，返回空数组
      return []
    }
  }
  
  // 如果已经是数组，直接返回
  return Array.isArray(traces) ? traces : []
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

  .empty-logistics {
    padding: 40px 0;
  }

  .form-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
  }
}
</style>
