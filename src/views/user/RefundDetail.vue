<template>
  <div class="refund-detail-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><Document /></el-icon>
            退款详情
          </h1>
          <el-button @click="goBack">
            <el-icon><ArrowLeft /></el-icon>
            返回
          </el-button>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="10" animated />
        </div>

        <template v-else-if="refundInfo">
          <!-- 退款状态卡片 -->
          <el-card class="status-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">退款状态</span>
                <el-tag :type="getStatusType(refundInfo.status)" size="large">
                  {{ refundInfo.statusText || getStatusText(refundInfo.status) }}
                </el-tag>
              </div>
            </template>

            <!-- 退款进度 -->
            <el-steps :active="currentStep" finish-status="success" align-center>
              <el-step
                title="提交申请"
                :description="formatTime(refundInfo.applyTime)"
                :status="getStepStatus(0)"
              />
              <el-step
                title="商家审核"
                :description="refundInfo.auditTime || (refundInfo.status === 0 ? '待审核' : '')"
                :status="getStepStatus(1)"
              />
              <el-step
                title="退款成功"
                :description="refundInfo.refundTime || (refundInfo.status === 1 ? '待退款' : '')"
                :status="getStepStatus(2)"
              />
            </el-steps>
          </el-card>

          <!-- 退款信息 -->
          <el-card class="info-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">退款信息</span>
              </div>
            </template>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">退款单号：</span>
                <span class="value">{{ refundInfo.id }}</span>
              </div>
              <div class="info-item">
                <span class="label">订单编号：</span>
                <span class="value">{{ refundInfo.orderNo }}</span>
                <el-button type="primary" link size="small" @click="goToOrderDetail">
                  查看订单
                </el-button>
              </div>
              <div class="info-item">
                <span class="label">申请人：</span>
                <span class="value">{{ refundInfo.userName }}</span>
              </div>
              <div class="info-item">
                <span class="label">退款金额：</span>
                <span class="value refund-amount">¥{{ refundInfo.refundAmount?.toFixed(2) }}</span>
              </div>
              <div class="info-item">
                <span class="label">退款类型：</span>
                <el-tag :type="getTypeTag(refundInfo.type)" size="small">
                  {{ getTypeText(refundInfo.type) }}
                </el-tag>
              </div>
              <div class="info-item">
                <span class="label">申请时间：</span>
                <span class="value">{{ formatTime(refundInfo.applyTime) }}</span>
              </div>
              <div class="info-item" v-if="refundInfo.auditTime">
                <span class="label">审核时间：</span>
                <span class="value">{{ formatTime(refundInfo.auditTime) }}</span>
              </div>
              <div class="info-item" v-if="refundInfo.refundTime">
                <span class="label">退款时间：</span>
                <span class="value">{{ formatTime(refundInfo.refundTime) }}</span>
              </div>
            </div>
          </el-card>

          <!-- 退款原因 -->
          <el-card class="reason-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">退款原因</span>
              </div>
            </template>
            <div class="reason-content">
              <p class="reason-text">{{ refundInfo.reason }}</p>
              <p class="description-text" v-if="refundInfo.description">
                {{ refundInfo.description }}
              </p>
            </div>
          </el-card>

          <!-- 拒绝原因（如果有） -->
          <el-card v-if="refundInfo.rejectReason" class="reject-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">拒绝原因</span>
              </div>
            </template>
            <div class="reject-content">
              <el-alert
                :title="refundInfo.rejectReason"
                type="error"
                :closable="false"
                show-icon
              />
            </div>
          </el-card>

          <!-- 关联订单信息 -->
          <el-card class="order-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">关联订单</span>
              </div>
            </template>
            <div class="order-info">
              <div class="info-row">
                <span class="label">订单号：</span>
                <span class="value">{{ orderInfo.orderNo }}</span>
              </div>
              <div class="info-row">
                <span class="label">下单时间：</span>
                <span class="value">{{ formatTime(orderInfo.createdAt) }}</span>
              </div>
              <div class="info-row">
                <span class="label">实付金额：</span>
                <span class="value total-amount">¥{{ orderInfo.payAmount?.toFixed(2) }}</span>
              </div>
            </div>

            <!-- 商品列表 -->
            <div class="product-list">
              <div v-for="item in orderInfo.items" :key="item.id" class="product-item">
                <img :src="item.productImage" :alt="item.productName" class="product-image" />
                <div class="product-info">
                  <h4 class="product-name">{{ item.productName }}</h4>
                  <p class="product-specs" v-if="item.skuSpecs">{{ item.skuSpecs }}</p>
                  <div class="product-price">
                    <span class="price">¥{{ item.productPrice }}</span>
                    <span class="quantity">x{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 底部操作栏 -->
          <div class="bottom-actions">
            <el-button size="large" @click="goBack">返回列表</el-button>
            <el-button
              v-if="refundInfo.status === 2"
              type="primary"
              size="large"
              @click="applyAgain"
            >
              重新申请
            </el-button>
          </div>
        </template>

        <el-empty v-else description="退款信息不存在" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Document, ArrowLeft } from '@element-plus/icons-vue'
import NavBar from '../../components/NavBar.vue'
import { getRefundDetail as apiGetRefundDetail } from '../../api/modules/order.js'
import { getOrderDetail } from '../../api/modules/order.js'

const route = useRoute()
const router = useRouter()

// 加载状态
const loading = ref(true)

// 退款信息
const refundInfo = ref(null)

// 关联订单信息
const orderInfo = ref({
  orderNo: '',
  createdAt: '',
  payAmount: 0,
  items: []
})

// 计算当前步骤
const currentStep = computed(() => {
  if (!refundInfo.value) return 0

  const statusMap = {
    0: 1,   // 待处理 - 显示到提交申请，商家审核进行中
    1: 3,   // 已同意 - 完成所有步骤
    2: 1,   // 已拒绝 - 只显示提交申请
    3: 0    // 已取消 - 不显示进度
  }

  return statusMap[refundInfo.value.status] || 0
})

// 获取步骤状态
const getStepStatus = (stepIndex) => {
  if (!refundInfo.value) return ''

  const status = refundInfo.value.status

  // 步骤0: 提交申请
  if (stepIndex === 0) {
    if (status >= 0) return 'success' // 只要提交了就是成功
  }

  // 步骤1: 商家审核
  if (stepIndex === 1) {
    if (status === 0) return 'process' // 待处理 - 进行中
    if (status === 1) return 'success' // 已同意 - 成功
    if (status === 2) return 'error'   // 已拒绝 - 错误
    if (status === 3) return ''        // 已取消 - 无状态
  }

  // 步骤2: 退款成功
  if (stepIndex === 2) {
    if (status === 1 && refundInfo.value.refundTime) return 'success' // 已退款
    if (status === 1 && !refundInfo.value.refundTime) return 'process' // 已同意但未退款
    return '' // 其他状态不显示
  }

  return ''
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',   // 待处理
    1: 'success',   // 已同意
    2: 'danger',    // 已拒绝
    3: 'info'       // 已取消
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
    0: '待处理',
    1: '已同意',
    2: '已拒绝',
    3: '已取消'
  }
  return textMap[status] || '未知状态'
}

// 获取类型标签
const getTypeTag = (type) => {
  const tagMap = {
    1: 'warning',   // 仅退款
    2: 'danger'     // 退货退款
  }
  return tagMap[type] || 'info'
}

// 获取类型文本
const getTypeText = (type) => {
  const textMap = {
    1: '仅退款',
    2: '退货退款'
  }
  return textMap[type] || '未知类型'
}

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  return timeStr
}

// 加载退款详情
const loadRefundDetail = async () => {
  loading.value = true
  try {
    const refundId = parseInt(route.params.id)
    if (!refundId) {
      ElMessage.error('退款ID无效')
      router.push('/user')
      return
    }

    // 获取退款详情
    const res = await apiGetRefundDetail(refundId)
    if (res.code === 1000 && res.data) {
      refundInfo.value = res.data

      // 如果有关联订单，加载订单详情
      if (res.data.orderId) {
        await loadOrderDetail(res.data.orderId)
      }
    } else {
      ElMessage.error(res.message || '获取退款详情失败')
      refundInfo.value = null
    }
  } catch (error) {
    console.error('加载退款详情失败:', error)
    ElMessage.error('加载退款详情失败')
    refundInfo.value = null
  } finally {
    loading.value = false
  }
}

// 加载订单详情
const loadOrderDetail = async (orderId) => {
  try {
    const res = await getOrderDetail(orderId)
    if (res.code === 1000 && res.data) {
      orderInfo.value = res.data
    }
  } catch (error) {
    console.error('加载订单详情失败:', error)
  }
}

// 返回
const goBack = () => {
  router.push('/user')
}

// 跳转到订单详情
const goToOrderDetail = () => {
  if (refundInfo.value?.orderId) {
    router.push(`/order/${refundInfo.value.orderId}`)
  }
}

// 重新申请
const applyAgain = () => {
  if (refundInfo.value?.orderId) {
    router.push(`/order/${refundInfo.value.orderId}`)
  }
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}

onMounted(() => {
  loadRefundDetail()
})
</script>

<style scoped lang="scss">
.refund-detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  padding-bottom: 40px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;

  .page-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 8px;

    .el-icon {
      color: #409eff;
    }
  }
}

.loading-container {
  padding: 40px 0;
}

.status-card,
.info-card,
.reason-card,
.reject-card,
.order-card {
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
}

.status-card {
  :deep(.el-step__title) {
    font-size: 14px;
  }

  :deep(.el-step__description) {
    font-size: 12px;
    color: #909399;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .info-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      color: #909399;
      font-size: 14px;
    }

    .value {
      color: #303133;
      font-size: 14px;

      &.refund-amount {
        font-size: 18px;
        font-weight: 600;
        color: #f56c6c;
      }
    }
  }
}

.reason-content {
  .reason-text {
    margin: 0 0 12px;
    font-size: 14px;
    color: #303133;
    line-height: 1.6;
  }

  .description-text {
    margin: 0;
    font-size: 14px;
    color: #606266;
    line-height: 1.6;
  }
}

.reject-content {
  :deep(.el-alert) {
    padding: 16px;
  }
}

.order-info {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;

  .info-row {
    display: flex;
    padding: 8px 0;
    font-size: 14px;

    .label {
      width: 100px;
      color: #909399;
    }

    .value {
      color: #303133;

      &.total-amount {
        font-size: 18px;
        font-weight: 600;
        color: #f56c6c;
      }
    }
  }
}

.product-list {
  .product-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px dashed #ebeef5;

    &:last-child {
      border-bottom: none;
    }

    .product-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .product-info {
      flex: 1;

      .product-name {
        margin: 0 0 8px;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
      }

      .product-specs {
        margin: 0 0 8px;
        font-size: 12px;
        color: #909399;
      }

      .product-price {
        display: flex;
        align-items: center;
        gap: 12px;

        .price {
          font-size: 14px;
          font-weight: 600;
          color: #f56c6c;
        }

        .quantity {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}

.bottom-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .bottom-actions {
    flex-direction: column;

    .el-button {
      width: 100%;
    }
  }
}
</style>
