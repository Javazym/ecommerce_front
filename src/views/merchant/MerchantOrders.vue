<template>
  <div class="merchant-orders">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="全部订单" name="all">
          <template #label>
            <span>全部订单</span>
            <el-badge v-if="orderStats.all > 0" :value="orderStats.all" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="pending">
          <template #label>
            <span>待付款</span>
            <el-badge v-if="orderStats.pending > 0" :value="orderStats.pending" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="paid">
          <template #label>
            <span>待发货</span>
            <el-badge v-if="orderStats.paid > 0" :value="orderStats.paid" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="shipped">
          <template #label>
            <span>已发货</span>
            <el-badge v-if="orderStats.shipped > 0" :value="orderStats.shipped" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="completed">
          <template #label>
            <span>已完成</span>
            <el-badge v-if="orderStats.completed > 0" :value="orderStats.completed" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="退款/售后" name="refund">
          <template #label>
            <span>退款/售后</span>
            <el-badge v-if="orderStats.refund > 0" :value="orderStats.refund" :max="99" type="danger" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 搜索栏 -->
    <el-card class="search-card" shadow="hover">
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索订单号/商品名称/买家昵称"
          clearable
          style="width: 300px"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
      </div>
    </el-card>

    <!-- 订单列表 -->
    <el-card class="table-card" shadow="hover">
      <!-- 订单表格 -->
      <el-table v-if="activeTab !== 'refund'" :data="orderList" v-loading="loading" style="width: 100%">
        <el-table-column prop="orderNo" label="订单信息" width="200">
          <template #default="{ row }">
            <div class="order-info">
              <div class="order-no">订单号：{{ row.orderNo }}</div>
              <div class="order-time">{{ row.createdAt }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="buyer" label="买家" width="120">
          <template #default="{ row }">
            <div class="buyer-info">
              <span class="buyer-name">{{ row.userId || '未知用户' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" min-width="250">
          <template #default="{ row }">
            <div class="product-list">
              <div v-for="item in row.items" :key="item.id" class="product-item">
                <img :src="item.productImage" alt="" class="product-image" />
                <div class="product-info">
                  <div class="product-name">{{ item.productName }}</div>
                  <div class="product-spec" v-if="item.skuSpecs">{{ item.skuSpecs }}</div>
                </div>
                <div class="product-price">
                  <div>¥{{ item.productPrice }}</div>
                  <div class="quantity">x{{ item.quantity }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="订单金额" width="100">
          <template #default="{ row }">
            <div class="order-total">
              <div class="total-amount">¥{{ row.payAmount }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewOrderDetail(row)">详情</el-button>
            <el-button
              v-if="row.status === 1"
              type="primary"
              link
              @click="openShipDialog(row)"
            >
              发货
            </el-button>
            <el-button
              v-if="row.status === 2"
              type="success"
              link
              @click="viewLogistics(row)"
            >
              物流
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 退款列表表格 -->
      <el-table v-else :data="refundList" v-loading="loading" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="userName" label="申请人" width="120" />
        <el-table-column prop="refundAmount" label="退款金额" width="120">
          <template #default="{ row }">
            <span class="refund-amount">￥{{ row.refundAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="refundType" label="退款类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getRefundTypeTag(row.refundType)" size="small">
              {{ getRefundTypeText(row.refundType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="退款原因" min-width="200" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getRefundStatusType(row.status)" size="small">
              {{ row.statusText || getRefundStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewRefundOrderDetail(row)">订单详情</el-button>
            <el-button
              v-if="row.status === 0"
              type="success"
              link
              @click="handleApproveRefund(row)"
            >
              同意
            </el-button>
            <el-button
              v-if="row.status === 0"
              type="danger"
              link
              @click="openRejectDialog(row)"
            >
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 发货弹窗 -->
    <el-dialog v-model="shipDialogVisible" title="订单发货" width="500px">
      <el-form :model="shipForm" label-width="80px">
        <el-form-item label="物流公司">
          <el-select v-model="shipForm.company" placeholder="请选择物流公司" style="width: 100%">
            <el-option label="顺丰速运" value="sf" />
            <el-option label="圆通速递" value="yto" />
            <el-option label="中通快递" value="zto" />
            <el-option label="韵达快递" value="yd" />
            <el-option label="申通快递" value="sto" />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="shipForm.trackingNo" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="发货备注">
          <el-input v-model="shipForm.remark" type="textarea" :rows="3" placeholder="选填" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="shipDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmShip" :loading="shipping">确认发货</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 订单详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="订单详情" width="800px">
      <div v-if="currentOrder" class="order-detail">
        <!-- 订单状态 -->
        <div class="detail-section">
          <div class="section-title">订单状态</div>
          <el-steps :active="getStepIndex(currentOrder.status)" finish-status="success" align-center>
            <el-step title="提交订单" />
            <el-step title="支付成功" />
            <el-step title="商家发货" />
            <el-step title="确认收货" />
            <el-step title="完成" />
          </el-steps>
        </div>

        <!-- 收货信息 -->
        <div class="detail-section">
          <div class="section-title">收货信息</div>
          <div class="info-row">
            <span class="label">收货人：</span>
            <span>{{ currentOrder.receiverName }}</span>
          </div>
          <div class="info-row">
            <span class="label">联系电话：</span>
            <span>{{ currentOrder.receiverPhone }}</span>
          </div>
          <div class="info-row">
            <span class="label">收货地址：</span>
            <span>{{ currentOrder.receiverAddress }}</span>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="detail-section">
          <div class="section-title">商品信息</div>
          <el-table :data="currentOrder.items" border>
            <el-table-column prop="productName" label="商品名称" />
            <el-table-column prop="skuSpecs" label="规格" width="120" />
            <el-table-column prop="productPrice" label="单价" width="100">
              <template #default="{ row }">¥{{ row.productPrice }}</template>
            </el-table-column>
            <el-table-column prop="quantity" label="数量" width="80" />
            <el-table-column label="小计" width="100">
              <template #default="{ row }">¥{{ row.totalPrice }}</template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 费用明细 -->
        <div class="detail-section">
          <div class="section-title">费用明细</div>
          <div class="info-row">
            <span class="label">商品总价：</span>
            <span>¥{{ currentOrder.totalAmount }}</span>
          </div>
          <div class="info-row">
            <span class="label">运费：</span>
            <span>¥{{ currentOrder.freightAmount }}</span>
          </div>
          <div class="info-row" v-if="currentOrder.discountAmount > 0">
            <span class="label">优惠：</span>
            <span class="discount">-¥{{ currentOrder.discountAmount }}</span>
          </div>
          <div class="info-row" v-if="currentOrder.couponAmount > 0">
            <span class="label">优惠券：</span>
            <span class="discount">-¥{{ currentOrder.couponAmount }}</span>
          </div>
          <div class="info-row total">
            <span class="label">应付金额：</span>
            <span class="total-amount">¥{{ currentOrder.payAmount }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 退款详情弹窗 -->
    <el-dialog v-model="refundDetailDialogVisible" title="退款详情" width="700px">
      <div v-if="currentRefund" class="refund-detail">
        <div class="detail-section">
          <div class="section-title">退款信息</div>
          <div class="info-row">
            <span class="label">订单号：</span>
            <span>{{ currentRefund.orderNo }}</span>
          </div>
          <div class="info-row">
            <span class="label">申请人：</span>
            <span>{{ currentRefund.userName }}</span>
          </div>
          <div class="info-row">
            <span class="label">退款金额：</span>
            <span class="refund-amount">¥{{ currentRefund.refundAmount }}</span>
          </div>
          <div class="info-row">
            <span class="label">退款类型：</span>
            <el-tag :type="getRefundTypeTag(currentRefund.refundType)" size="small">
              {{ getRefundTypeText(currentRefund.refundType) }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="label">申请时间：</span>
            <span>{{ currentRefund.applyTime }}</span>
          </div>
          <div class="info-row">
            <span class="label">状态：</span>
            <el-tag :type="getRefundStatusType(currentRefund.status)" size="small">
              {{ currentRefund.statusText || getRefundStatusText(currentRefund.status) }}
            </el-tag>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">退款原因</div>
          <div class="reason-content">{{ currentRefund.reason }}</div>
        </div>

        <div class="detail-section" v-if="currentRefund.description">
          <div class="section-title">详细说明</div>
          <div class="reason-content">{{ currentRefund.description }}</div>
        </div>

        <div class="detail-section" v-if="currentRefund.rejectReason">
          <div class="section-title">拒绝原因</div>
          <div class="reason-content reject">{{ currentRefund.rejectReason }}</div>
        </div>
      </div>
      <template #footer>
        <el-button @click="refundDetailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 拒绝退款弹窗 -->
    <el-dialog v-model="rejectDialogVisible" title="拒绝退款申请" width="500px">
      <el-form :model="rejectForm" label-width="80px">
        <el-form-item label="拒绝原因" required>
          <el-input
            v-model="rejectForm.reason"
            type="textarea"
            :rows="4"
            placeholder="请输入拒绝原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="rejectDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReject" :loading="rejecting">确认拒绝</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {
  state as merchantOrderState,
  fetchMerchantOrders,
  getOneMerchantOrderDetail,
  shipOrder,
  fetchOrderStatistics,
  fetchOrderStatusCount,
  fetchRefundList,
  approveRefund,
  rejectRefund
} from '../../stores/merchantOrderStore'
import { useUserStore } from '../../stores/userStore'
import merchantStore from "../../stores/merchantStore.js";

const route = useRoute()
const router = useRouter()

// Tab
const activeTab = ref('all')

// 搜索
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = computed({
  get: () => merchantOrderState.pagination.pageNum,
  set: (val) => { merchantOrderState.pagination.pageNum = val }
})
const pageSize = computed({
  get: () => merchantOrderState.pagination.pageSize,
  set: (val) => { merchantOrderState.pagination.pageSize = val }
})
const total = computed(() => merchantOrderState.pagination.total)
const loading = computed(() => merchantOrderState.loading)

// 订单列表数据（从 store 获取）
const orderList = computed(() => merchantOrderState.orders || [])

// 订单统计（从 store 获取）
const orderStats = computed(() => {
  const stats = merchantOrderState.statusCount
  return {
    all: stats.totalOrders || 0,
    pending: stats.pendingPayment || 0,
    paid: stats.pendingShipment || 0,
    shipped: stats.pendingReceipt || 0,
    completed: stats.completed || 0,
    refund: (stats.refunding || 0) + (stats.refunded || 0) // 退款中 + 已退款
  }
})

// 发货弹窗
const shipDialogVisible = ref(false)
const shipping = ref(false)
const shipForm = reactive({
  orderId: null,
  company: '',
  trackingNo: '',
  remark: ''
})

// 详情弹窗
const detailDialogVisible = ref(false)
const currentOrder = ref(null)

// 退款列表数据（从 store 获取）
const refundList = computed(() => merchantOrderState.refunds || [])

// 退款详情弹窗
const refundDetailDialogVisible = ref(false)
const currentRefund = ref(null)

// 拒绝退款弹窗
const rejectDialogVisible = ref(false)
const rejecting = ref(false)
const rejectForm = reactive({
  refundId: null,
  reason: ''
})

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',   // 待付款
    1: 'primary',   // 待发货
    2: 'success',   // 待收货
    3: 'info',      // 已完成
    4: 'info',      // 已取消
    5: 'danger'     // 退款中
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  // 如果后端已经返回 statusText，直接使用
  if (typeof status === 'string') {
    return status
  }

  const textMap = {
    0: '待付款',
    1: '待发货',
    2: '待收货',
    3: '已完成',
    4: '已取消',
    5: '退款中'
  }
  return textMap[status] || '未知'
}

// 获取步骤索引
const getStepIndex = (status) => {
  const indexMap = {
    0: 0,   // 待付款
    1: 1,   // 待发货
    2: 2,   // 待收货
    3: 4    // 已完成
  }
  return indexMap[status] || 0
}

// Tab切换
const handleTabChange = (tab) => {
  merchantOrderState.pagination.pageNum = 1

  // 如果是退款/售后 tab，加载退款列表
  if (tab === 'refund') {
    loadRefunds()
  } else {
    loadOrders()
  }
}

// 搜索
const handleSearch = () => {
  merchantOrderState.pagination.pageNum = 1

  // 如果在退款 tab，搜索退款列表
  if (activeTab.value === 'refund') {
    loadRefunds()
  } else {
    loadOrders()
  }
}

// 加载订单
const loadOrders = async () => {
  const params = {
    pageNum: merchantOrderState.pagination.pageNum,
    pageSize: merchantOrderState.pagination.pageSize
  }

  // 如果不是全部订单，添加状态过滤
  if (activeTab.value !== 'all' && activeTab.value !== 'refund') {
    // 映射前端状态到后端状态码
    const statusMap = {
      pending: 0,   // 待付款
      paid: 1,      // 待发货
      shipped: 2,   // 待收货
      completed: 3, // 已完成
      cancelled: 4  // 已取消
    }
    params.status = statusMap[activeTab.value]
  }

  await fetchMerchantOrders(params)
}

// 加载退款列表
const loadRefunds = async () => {
  const params = {
    pageNum: merchantOrderState.pagination.pageNum,
    pageSize: merchantOrderState.pagination.pageSize
  }

  await fetchRefundList(params)
}

// 分页变化
const handleSizeChange = (size) => {
  merchantOrderState.pagination.pageSize = size

  // 根据当前 tab 加载对应的数据
  if (activeTab.value === 'refund') {
    loadRefunds()
  } else {
    loadOrders()
  }
}

const handleCurrentChange = (page) => {
  merchantOrderState.pagination.pageNum = page

  // 根据当前 tab 加载对应的数据
  if (activeTab.value === 'refund') {
    loadRefunds()
  } else {
    loadOrders()
  }
}

// 查看订单详情
const viewOrderDetail = async (order) => {
  const detail = await getOneMerchantOrderDetail(order.id)
  if (detail) {
    currentOrder.value = detail
    detailDialogVisible.value = true
  }
}

// 打开发货弹窗
const openShipDialog = (order) => {
  shipForm.orderId = order.id
  shipForm.company = ''
  shipForm.trackingNo = ''
  shipForm.remark = ''
  shipDialogVisible.value = true
}

// 确认发货
const confirmShip = async () => {
  if (!shipForm.company) {
    ElMessage.warning('请选择物流公司')
    return
  }
  if (!shipForm.trackingNo) {
    ElMessage.warning('请输入物流单号')
    return
  }

  shipping.value = true

  try {
    const success = await shipOrder(shipForm.orderId, {
      logisticsCompany: shipForm.company,
      trackingNumber: shipForm.trackingNo,
      currentStatus: '已发货',
      traces: shipForm.remark || ''
    })

    if (success) {
      shipping.value = false
      shipDialogVisible.value = false
      loadOrders()
    } else {
      shipping.value = false
    }
  } catch (error) {
    console.error('发货失败:', error)
    shipping.value = false
  }
}

// 查看物流
const viewLogistics = (order) => {
  const logistics = order.logistics
  if (!logistics) {
    ElMessage.info('暂无物流信息')
    return
  }

  ElMessage.info(`物流单号：${logistics.trackingNumber}，物流公司：${logistics.logisticsCompany}`)
}

// 取消订单（商家端通常不需要取消订单功能，这里可以隐藏或移除）
// 如果需要，可以调用用户端的取消订单 API
const cancelOrder = async (order) => {
  ElMessage.info('商家端不支持取消订单，请联系用户操作')
}

// 查看退款详情
const viewRefundDetail = (refund) => {
  currentRefund.value = refund
  refundDetailDialogVisible.value = true
}

// 查看退款关联的订单详情
const viewRefundOrderDetail = async (refund) => {
  const detail = await getOneMerchantOrderDetail(refund.orderId)
  if (detail) {
    currentOrder.value = detail
    detailDialogVisible.value = true
  }
}

// 同意退款
const handleApproveRefund = async (refund) => {
  try {
    await ElMessageBox.confirm('确定要同意该退款申请吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    // 获取商家ID
    const userStore = useUserStore()
    const merchantId = userStore.userInfo?.merchantId || userStore.userInfo?.id

    const success = await approveRefund(refund.id, { merchantId })
    if (success) {
      loadRefunds()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('同意退款失败:', error)
    }
  }
}

// 打开拒绝退款弹窗
const openRejectDialog = (refund) => {
  rejectForm.refundId = refund.id
  rejectForm.reason = ''
  rejectDialogVisible.value = true
}

// 确认拒绝退款
const confirmReject = async () => {
  if (!rejectForm.reason) {
    ElMessage.warning('请输入拒绝原因')
    return
  }

  rejecting.value = true

  try {
    // 获取商家ID
    const userStore = useUserStore()
    const merchantId = userStore.userInfo?.merchantId || userStore.userInfo?.id

    const success = await rejectRefund(rejectForm.refundId, {
      merchantId,
      reason: rejectForm.reason
    })
    if (success) {
      rejecting.value = false
      rejectDialogVisible.value = false
      loadRefunds()
    } else {
      rejecting.value = false
    }
  } catch (error) {
    console.error('拒绝退款失败:', error)
    rejecting.value = false
  }
}

// 获取退款类型标签
const getRefundTypeTag = (type) => {
  const tagMap = {
    1: 'warning',   // 仅退款
    2: 'danger'     // 退货退款
  }
  return tagMap[type] || 'info'
}

// 获取退款类型文本
const getRefundTypeText = (type) => {
  const textMap = {
    1: '仅退款',
    2: '退货退款'
  }
  return textMap[type] || '未知'
}

// 获取退款状态类型
const getRefundStatusType = (status) => {
  const typeMap = {
    0: 'warning',   // 待处理
    1: 'success',   // 已同意
    2: 'info',      // 已拒绝
    3: 'danger'     // 已取消
  }
  return typeMap[status] || 'info'
}

// 获取退款状态文本
const getRefundStatusText = (status) => {
  const textMap = {
    0: '待处理',
    1: '已同意',
    2: '已拒绝',
    3: '已取消'
  }
  return textMap[status] || '未知'
}

// 检查 URL参数并加载数据
onMounted(async () => {
  console.log('=== MerchantOrders 页面加载 ===')

  // 检查登录状态
  const userStore = useUserStore()
  console.log('登录状态:', userStore.isLoggedIn)
  console.log('用户信息:', userStore.userInfo)

  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/auth')
    return
  }

  if (route.query.tab) {
    activeTab.value = route.query.tab
  }

  // 加载订单状态统计
  console.log('开始加载订单状态统计...')
  console.log(merchantStore.merchantInfo)
  await fetchOrderStatusCount()
  console.log(merchantStore.merchantInfo)
  // 根据当前 tab 加载对应的数据
  if (activeTab.value === 'refund') {
    console.log('开始加载退款列表...')
    await loadRefunds()
  } else {
    console.log('开始加载订单列表...')
    await loadOrders()
  }
})
</script>

<style scoped lang="scss">
.merchant-orders {
  .tabs-card {
    margin-bottom: 20px;

    :deep(.el-tabs__item) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .search-card {
    margin-bottom: 20px;

    .search-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .table-card {
    .order-info {
      .order-no {
        font-size: 14px;
        color: #303133;
      }

      .order-time {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }

    .buyer-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .buyer-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }

      .buyer-name {
        font-size: 14px;
        color: #606266;
      }
    }

    .product-list {
      .product-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: none;
        }

        .product-image {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          object-fit: cover;
        }

        .product-info {
          flex: 1;

          .product-name {
            font-size: 14px;
            color: #303133;
          }

          .product-spec {
            font-size: 12px;
            color: #909399;
            margin-top: 4px;
          }
        }

        .product-price {
          text-align: right;
          font-size: 14px;
          color: #303133;

          .quantity {
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }

    .order-total {
      .total-amount {
        font-size: 14px;
        font-weight: 600;
        color: #f56c6c;
      }

      .pay-method {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.refund-detail {
  .detail-section {
    margin-bottom: 24px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }

    .info-row {
      display: flex;
      padding: 8px 0;
      font-size: 14px;

      .label {
        width: 100px;
        color: #909399;
      }

      .refund-amount {
        font-size: 16px;
        font-weight: 600;
        color: #f56c6c;
      }
    }

    .reason-content {
      padding: 12px;
      background-color: #f5f7fa;
      border-radius: 4px;
      font-size: 14px;
      color: #606266;
      line-height: 1.6;

      &.reject {
        color: #f56c6c;
        background-color: #fef0f0;
      }
    }
  }
}

.refund-amount {
  font-size: 14px;
  font-weight: 600;
  color: #f56c6c;
}

.order-detail {
  .detail-section {
    margin-bottom: 24px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }

    .info-row {
      display: flex;
      padding: 8px 0;
      font-size: 14px;

      .label {
        width: 100px;
        color: #909399;
      }

      .discount {
        color: #f56c6c;
      }

      .total-amount {
        font-size: 18px;
        font-weight: 600;
        color: #f56c6c;
      }

      &.total {
        padding-top: 16px;
        border-top: 1px solid #ebeef5;
        margin-top: 8px;
      }
    }
  }
}

.refund-detail {
  .detail-section {
    margin-bottom: 24px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }

    .info-row {
      display: flex;
      padding: 8px 0;
      font-size: 14px;

      .label {
        width: 100px;
        color: #909399;
      }

      .refund-amount {
        font-size: 16px;
        font-weight: 600;
        color: #f56c6c;
      }
    }

    .reason-content {
      padding: 12px;
      background-color: #f5f7fa;
      border-radius: 4px;
      font-size: 14px;
      color: #606266;
      line-height: 1.6;

      &.reject {
        color: #f56c6c;
        background-color: #fef0f0;
      }
    }
  }
}

.refund-amount {
  font-size: 14px;
  font-weight: 600;
  color: #f56c6c;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
