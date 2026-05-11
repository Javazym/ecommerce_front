<template>
  <div class="order-detail-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><Document /></el-icon>
            订单详情
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

        <template v-else>
          <!-- 订单状态 -->
          <el-card class="status-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">订单状态</span>
                <el-tag :type="statusType" size="large">{{ statusText }}</el-tag>
              </div>
            </template>
            <el-steps :active="currentStep" finish-status="success" align-center>
              <el-step title="提交订单" :description="orderInfo.createdAt" />
              <el-step title="支付成功" :description="orderInfo.status !== 0 ? orderInfo.createdAt : ''" />
              <el-step title="商家发货" :description="orderInfo.shipTime || '待发货'" />
              <el-step title="确认收货" :description="orderInfo.receiveTime || '待收货'" />
              <el-step title="完成" :description="orderInfo.finishTime || '待完成'" />
            </el-steps>
          </el-card>

          <!-- 订单信息 -->
          <el-card class="info-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">订单信息</span>
              </div>
            </template>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">订单编号：</span>
                <span class="value">{{ orderInfo.orderNo }}</span>
                <el-button type="primary" link size="small" @click="copyOrderNo">
                  <el-icon><CopyDocument /></el-icon>
                  复制
                </el-button>
              </div>
              <div class="info-item">
                <span class="label">下单时间：</span>
                <span class="value">{{ orderInfo.createdAt }}</span>
              </div>
              <div class="info-item" v-if="orderInfo.merchantName">
                <span class="label">店铺：</span>
                <span class="value">{{ orderInfo.merchantName }}</span>
              </div>
              <div class="info-item">
                <span class="label">收货地址：</span>
                <span class="value">
                  {{ orderInfo.receiverName }} {{ orderInfo.receiverPhone }}
                  {{ orderInfo.receiverAddress }}
                </span>
              </div>
              <div class="info-item">
                <span class="label">配送方式：</span>
                <span class="value">{{ orderInfo.logistics?.logisticsCompany || '标准配送' }}</span>
              </div>
              <div class="info-item" v-if="orderInfo.remark">
                <span class="label">订单备注：</span>
                <span class="value">{{ orderInfo.remark }}</span>
              </div>
            </div>
          </el-card>

          <!-- 商品列表 -->
          <el-card class="product-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">商品信息</span>
                <span class="product-count">共 {{ productCount }} 件商品</span>
              </div>
            </template>

            <div class="product-list">
              <div v-for="item in productList" :key="item.id" class="product-item">
                <div class="product-main" @click="goToProduct(item)">
                  <img :src="item.productImage" :alt="item.productName" class="product-image" />
                  <div class="product-info">
                    <h4 class="product-name">{{ item.productName }}</h4>
                    <p class="product-desc" v-if="item.skuSpecs">{{ item.skuSpecs }}</p>
                  </div>
                </div>
                <div class="product-price">
                  <span class="price">¥{{ item.productPrice }}</span>
                  <span class="quantity">x{{ item.quantity }}</span>
                </div>
                <div class="product-actions">
                  <template v-if="orderInfo.status === 3">
                    <el-button
                      v-if="!item.reviewStatus"
                      type="primary"
                      size="small"
                      @click="openReview(item)"
                    >
                      <el-icon><Star /></el-icon>
                      评价
                    </el-button>
                    <el-button
                      v-else
                      type="info"
                      size="small"
                      disabled
                    >
                      已评价
                    </el-button>
                  </template>
                  <el-button
                    v-if="orderInfo.status === 2"
                    type="success"
                    size="small"
                    @click="confirmReceive"
                  >
                    确认收货
                  </el-button>
                  <el-button size="small" @click="goToProduct(item)">
                    再次购买
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 订单金额 -->
          <el-card class="summary-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">订单金额</span>
              </div>
            </template>
            <div class="summary-list">
              <div class="summary-item">
                <span class="label">商品总价</span>
                <span class="value">¥{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">运费</span>
                <span class="value">¥{{ shipping.toFixed(2) }}</span>
              </div>
              <div class="summary-item" v-if="discount > 0">
                <span class="label">优惠</span>
                <span class="value discount">-¥{{ discount.toFixed(2) }}</span>
              </div>
              <div class="summary-item" v-if="coupon > 0">
                <span class="label">优惠券</span>
                <span class="value discount">-¥{{ coupon.toFixed(2) }}</span>
              </div>
              <el-divider />
              <div class="summary-item total">
                <span class="label">实付金额</span>
                <span class="value">¥{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </el-card>

          <!-- 底部操作栏 -->
          <div class="bottom-actions">
            <el-button size="large" @click="goBack">返回订单列表</el-button>
            <el-button
              v-if="orderInfo.status === 0"
              type="primary"
              size="large"
              @click="handlePay"
            >
              去支付
            </el-button>
            <el-button
              v-if="orderInfo.status === 2"
              type="primary"
              size="large"
              @click="confirmReceive"
            >
              确认收货
            </el-button>
            <el-button
              v-if="orderInfo.status === 5 || orderInfo.status === 6"
              type="primary"
              size="large"
              @click="goToRefundDetail"
            >
              查看退款详情
            </el-button>
          </div>
        </template>
      </div>
    </main>

    <!-- 评价弹窗 -->
    <ReviewModal
      v-model:visible="reviewVisible"
      :product-info="currentProduct"
      :order-id="orderInfo.orderNo"
      @submit="handleReviewSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Document, ArrowLeft, CopyDocument, Star } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import ReviewModal from '../components/ReviewModal.vue'
import { getOneOrderDetail, confirmReceipt, payOrder } from '../stores/orderStore.js'
import { addReview } from '../api/modules/review.js'

const route = useRoute()
const router = useRouter()

// 加载状态
const loading = ref(true)

// 评价弹窗
const reviewVisible = ref(false)
const currentProduct = ref({})

// 订单信息（从 store 获取）
const orderInfo = ref({
  id: 0,
  orderNo: '',
  createdAt: '',
  shipTime: '',
  receiveTime: '',
  finishTime: '',
  status: 0,
  statusText: '待付款',
  receiverName: '',
  receiverPhone: '',
  receiverAddress: '',
  deliveryMethod: '标准配送',
  totalAmount: 0,
  discountAmount: 0,
  couponAmount: 0,
  freightAmount: 0,
  payAmount: 0,
  items: [],
  merchantName: '',
  remark: '',
  logistics: null
})

// 计算属性：订单状态文本
const statusText = computed(() => {
  return orderInfo.value.statusText || '未知状态'
})

// 计算属性：订单状态类型
const statusType = computed(() => {
  const typeMap = {
    0: 'warning',   // 待付款
    1: 'primary',   // 待发货
    2: 'success',   // 待收货
    3: 'info',      // 已完成
    4: 'info',      // 已取消
    5: 'warning'    // 退款中
  }
  return typeMap[orderInfo.value.status] || 'info'
})

// 计算属性：当前步骤
const currentStep = computed(() => {
  const stepMap = {
    0: 0,   // 待付款
    1: 1,   // 待发货
    2: 2,   // 待收货
    3: 4,   // 已完成
    4: 0,   // 已取消
    5: 0    // 退款中
  }
  return stepMap[orderInfo.value.status] || 0
})

// 计算属性：商品列表（兼容 items 和 products）
const productList = computed(() => {
  return orderInfo.value.items || orderInfo.value.products || []
})

// 计算属性：商品数量
const productCount = computed(() => {
  return productList.value.length
})

// 计算属性：商品总价
const subtotal = computed(() => {
  return orderInfo.value.totalAmount || 0
})

// 计算属性：运费
const shipping = computed(() => {
  return orderInfo.value.freightAmount || 0
})

// 计算属性：优惠金额
const discount = computed(() => {
  return orderInfo.value.discountAmount || 0
})

// 计算属性：优惠券金额
const coupon = computed(() => {
  return orderInfo.value.couponAmount || 0
})

// 计算属性：应付金额
const total = computed(() => {
  return orderInfo.value.payAmount || 0
})

// 加载订单数据
const loadOrderData = async () => {
  loading.value = true
  try {
    const orderId = parseInt(route.params.id)
    if (!orderId) {
      ElMessage.error('订单ID无效')
      router.push('/user')
      return
    }

    // 从 store 获取订单详情（调用真实 API）
    const order = await getOneOrderDetail(orderId)

    if (order) {
      // 适配 API 返回的数据结构到组件需要的格式
      orderInfo.value = {
        ...order,
        createdAt: order.createdAt || '',
        shipTime: order.shipTime || '',
        receiveTime: order.receiveTime || '',
        finishTime: order.finishTime || ''
      }
    } else {
      ElMessage.error('订单不存在')
      router.push('/user')
    }
  } catch (error) {
    console.error('加载订单失败:', error)
    ElMessage.error('加载订单失败')
  } finally {
    loading.value = false
  }
}

// 复制订单号
const copyOrderNo = () => {
  navigator.clipboard.writeText(orderInfo.value.orderNo)
  ElMessage.success('订单号已复制到剪贴板')
}

// 返回
const goBack = () => {
  router.push('/user')
}

// 去商品详情
const goToProduct = (item) => {
  const productId = item.productId || item.id
  router.push(`/product/${productId}`)
}

// 去支付
const handlePay = async () => {
  try {
    await payOrder(orderInfo.value.id)
    // 重新加载订单数据以更新状态
    await loadOrderData()
  } catch (error) {
    console.error('支付失败:', error)
  }
}

// 确认收货
const confirmReceive = async () => {
  try {
    await ElMessageBox.confirm('请确认已收到商品', '确认收货', {
      confirmButtonText: '确认收货',
      cancelButtonText: '取消',
      type: 'success'
    })

    await confirmReceipt(orderInfo.value.id)
    // 重新加载订单数据以更新状态
    await loadOrderData()
  } catch (error) {
    // 用户取消或操作失败
    if (error !== 'cancel') {
      console.error('确认收货失败:', error)
    }
  }
}

// 打开评价弹窗
const openReview = (item) => {
  currentProduct.value = item
  reviewVisible.value = true
}

// 提交评价
const handleReviewSubmit = async (reviewData) => {
  try {
    // 调用评价 API
    await addReview({
      orderId: orderInfo.value.id,
      productId: reviewData.productId,
      rating: reviewData.rating,
      content: reviewData.content,
      images: reviewData.images || []
    })

    // 更新本地状态
    const product = productList.value.find(p => p.productId === reviewData.productId)
    if (product) {
      product.reviewStatus = 1
    }

    ElMessage.success('评价成功！感谢您的反馈')
    reviewVisible.value = false
  } catch (error) {
    console.error('评价失败:', error)
    ElMessage.error('评价失败，请重试')
  }
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}

// 跳转到退款详情
const goToRefundDetail = () => {
  if (orderInfo.value.refundId) {
    router.push(`/refund/${orderInfo.value.refundId}`)
  } else {
    ElMessage.info('未找到退款信息')
  }
}

onMounted(() => {
  loadOrderData()
})
</script>

<style scoped lang="scss">
.order-detail-page {
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

.status-card {
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

  :deep(.el-step__title) {
    font-size: 14px;
  }

  :deep(.el-step__description) {
    font-size: 12px;
    color: #909399;
  }
}

.info-card,
.product-card,
.summary-card {
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

    .product-count {
      font-size: 14px;
      color: #909399;
    }
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
    }
  }
}

.product-list {
  .product-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #ebeef5;

    &:last-child {
      border-bottom: none;
    }

    .product-main {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;

      &:hover .product-name {
        color: #409eff;
      }
    }

    .product-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .product-info {
      flex: 1;

      .product-name {
        margin: 0 0 8px;
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        transition: color 0.3s;
      }

      .product-desc {
        margin: 0;
        font-size: 12px;
        color: #909399;
      }
    }

    .product-price {
      width: 120px;
      text-align: center;

      .price {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #303133;
      }

      .quantity {
        display: block;
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }

    .product-actions {
      width: 180px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
    }
  }
}

.summary-list {
  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;

    .label {
      color: #606266;
      font-size: 14px;
    }

    .value {
      color: #303133;
      font-size: 14px;

      &.discount {
        color: #f56c6c;
      }
    }

    &.total {
      .label {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }

      .value {
        font-size: 20px;
        font-weight: 700;
        color: #f56c6c;
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

  .product-list .product-item {
    flex-wrap: wrap;
    gap: 12px;

    .product-main {
      width: 100%;
    }

    .product-price {
      width: auto;
      flex: 1;
      text-align: left;
    }

    .product-actions {
      width: 100%;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .bottom-actions {
    flex-direction: column;

    .el-button {
      width: 100%;
    }
  }
}
</style>
