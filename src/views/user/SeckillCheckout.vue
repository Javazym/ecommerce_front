<template>
  <div class="seckill-checkout-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><Lightning /></el-icon>
            秒杀订单确认
          </h1>
          <div class="countdown-badge">
            <span class="countdown-label">距活动结束</span>
            <div class="countdown-time">{{ formatCountdown(seckillInfo?.endTime) }}</div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="10" animated />
        </div>

        <!-- 主体内容 -->
        <div v-else class="checkout-content">
          <!-- 秒杀活动提示 -->
          <div class="seckill-notice">
            <el-alert
              title="秒杀活动特殊说明"
              type="warning"
              :closable="false"
              show-icon
            >
              <template #default>
                <ul class="notice-list">
                  <li>秒杀商品库存有限，售完即止</li>
                  <li>每个用户限购指定数量，请勿重复下单</li>
                  <li>秒杀订单需在30分钟内完成支付，逾期自动取消</li>
                  <li>秒杀商品不支持无理由退换货（质量问题除外）</li>
                </ul>
              </template>
            </el-alert>
          </div>

          <!-- 商品信息 -->
          <div class="checkout-section product-section">
            <h2 class="section-title">
              <el-icon><Goods /></el-icon>
              秒杀商品
            </h2>
            <div class="seckill-product-card">
              <div class="product-image-wrapper">
                <img :src="productInfo.image" :alt="productInfo.name" class="product-image" />
                <div class="seckill-badge">
                  <el-icon><Lightning /></el-icon>
                  秒杀
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ productInfo.name }}</h3>
                <p class="product-desc">{{ productInfo.description }}</p>
                <div class="price-wrapper">
                  <span class="seckill-price">¥{{ productInfo.seckillPrice }}</span>
                  <span class="original-price" v-if="productInfo.originalPrice">¥{{ productInfo.originalPrice }}</span>
                  <span class="discount-tag" v-if="discountPercent > 0">省{{ discountPercent }}%</span>
                </div>
                <div class="quantity-info">
                  <span>购买数量：</span>
                  <el-tag type="danger" effect="plain">x{{ quantity }}</el-tag>
                </div>
                <div class="stock-progress">
                  <div class="progress-header">
                    <span class="progress-text">已抢 {{ seckillInfo?.soldCount || 0 }}/{{ seckillInfo?.stock || 0 }}</span>
                    <span class="progress-percent">{{ progressPercent }}%</span>
                  </div>
                  <el-progress
                    :percentage="progressPercent"
                    :stroke-width="8"
                    :show-text="false"
                    color="#ff4d4f"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 收货地址 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Location /></el-icon>
              收货地址
            </h2>
            <div v-if="addresses.length === 0" class="empty-address">
              <el-empty description="暂无收货地址" />
              <el-button type="primary" @click="handleAddAddress">添加地址</el-button>
            </div>
            <div v-else class="address-list">
              <div
                v-for="address in addresses"
                :key="address.id"
                class="address-card"
                :class="{ active: selectedAddress === address.id }"
                @click="selectedAddress = address.id"
              >
                <div class="address-info">
                  <div class="address-header">
                    <span class="receiver">{{ address.consigneeName || address.receiver }}</span>
                    <span class="phone">{{ address.phone }}</span>
                    <el-tag v-if="address.isDefault === 1" type="primary" size="small">默认</el-tag>
                  </div>
                  <div class="address-detail">
                    {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailAddress || address.detail }}
                  </div>
                </div>
                <div class="address-actions">
                  <el-button type="text" @click.stop="handleEditAddress(address)">编辑</el-button>
                </div>
              </div>
              <div class="address-add-card" @click="handleAddAddress">
                <el-icon><Plus /></el-icon>
                <span>添加新地址</span>
              </div>
            </div>
          </div>

          <!-- 订单备注 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Edit /></el-icon>
              订单备注
            </h2>
            <el-input
              v-model="orderRemark"
              type="textarea"
              :rows="3"
              placeholder="请输入订单备注（选填）"
              class="remark-input"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 底部结算栏 -->
    <div class="checkout-bar">
      <div class="bar-container">
        <div class="order-summary">
          <div class="summary-item">
            <span class="label">商品单价：</span>
            <span class="value">¥{{ productInfo.seckillPrice }}</span>
          </div>
          <div class="summary-item">
            <span class="label">购买数量：</span>
            <span class="value">x{{ quantity }}</span>
          </div>
          <div class="summary-item total">
            <span class="label">应付总额：</span>
            <span class="value final-price">¥{{ finalAmount.toFixed(2) }}</span>
          </div>
        </div>
        <div class="bar-actions">
          <el-button
            type="danger"
            size="large"
            class="submit-btn"
            @click="handleSubmitOrder"
            :loading="submitting"
            :disabled="!canSubmit"
          >
            <el-icon><Lightning /></el-icon>
            立即抢购
          </el-button>
          <el-button size="large" @click="goBack">返回</el-button>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-bottom">
          <p>&copy; 2024 云商城. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Lightning, Location, Plus, Goods, Edit } from '@element-plus/icons-vue'
import NavBar from '../../components/NavBar.vue'
import { getProductDetail } from '../../api/modules/product.js'
import { createSeckillOrder } from '../../api/modules/order.js'
import { fetchAddresses } from '../../stores/addressStore.js'
import { state as addressState } from '../../stores/addressStore.js'
import { useUserStore } from '../../stores/userStore.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 加载状态
const loading = ref(true)
const submitting = ref(false)

// 秒杀活动信息
const activityId = ref(null)
const seckillInfo = ref(null)
const countdownTimer = ref(null)

// 商品信息
const productInfo = ref({
  id: null,
  name: '',
  description: '',
  image: '',
  seckillPrice: 0,
  originalPrice: 0,
  merchantId: null
})

// 购买数量
const quantity = ref(1)

// 收货地址
const addresses = computed(() => {
  const addrs = addressState.addresses || []
  return addrs.map(addr => ({
    ...addr,
    receiver: addr.consigneeName || addr.receiver,
    detail: addr.detailAddress || addr.detail
  }))
})
const selectedAddress = ref(null)

// 订单备注
const orderRemark = ref('')

// 计算属性
const discountPercent = computed(() => {
  if (productInfo.value.originalPrice && productInfo.value.originalPrice > productInfo.value.seckillPrice) {
    return Math.round((1 - productInfo.value.seckillPrice / productInfo.value.originalPrice) * 100)
  }
  return 0
})

const progressPercent = computed(() => {
  if (!seckillInfo.value || !seckillInfo.value.stock) return 0
  return Math.min(100, Math.round((seckillInfo.value.soldCount / seckillInfo.value.stock) * 100))
})

const finalAmount = computed(() => {
  return productInfo.value.seckillPrice * quantity.value
})

const canSubmit = computed(() => {
  if (!selectedAddress.value) return false
  if (!productInfo.value.id) return false
  if (!seckillInfo.value) return false
  
  // 检查库存
  if (seckillInfo.value.soldCount >= seckillInfo.value.stock) return false
  
  // 检查活动时间
  if (seckillInfo.value.endTime) {
    const endTime = new Date(seckillInfo.value.endTime).getTime()
    if (Date.now() >= endTime) return false
  }
  
  return true
})

// 加载数据
onMounted(async () => {
  loading.value = true
  try {
    // 从路由参数获取秒杀活动ID和商品信息
    activityId.value = parseInt(route.params.activityId)
    const productId = parseInt(route.query.productId)
    const skuId = parseInt(route.query.skuId)
    quantity.value = parseInt(route.query.quantity) || 1

    if (!activityId.value || !productId) {
      ElMessage.error('缺少必要的参数')
      router.push('/')
      return
    }

    // 加载地址列表
    await fetchAddresses()

    // 设置默认选中的地址
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find(addr => addr.isDefault === 1)
      selectedAddress.value = defaultAddr ? defaultAddr.id : addresses.value[0].id
    } else {
      ElMessage.warning('您还没有收货地址，请先添加')
    }

    // 加载商品详情
    await loadProductDetail(productId, skuId)

    // 启动倒计时
    startCountdown()
  } catch (error) {
    console.error('加载数据失败:', error)
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})

// 加载商品详情
const loadProductDetail = async (productId, skuId) => {
  try {
    const res = await getProductDetail(productId)
    if (res.code === 1000 && res.data) {
      const data = res.data

      // 检查是否有秒杀活动
      const hasActivity = data.hasActivity && data.activityType === 1
      if (!hasActivity) {
        ElMessage.error('该商品未参与秒杀活动')
        router.push('/product/' + productId)
        return
      }

      // 查找对应的 SKU
      const sku = data.skus?.find(s => s.id === skuId)
      if (!sku) {
        ElMessage.error('SKU 不存在')
        router.push('/product/' + productId)
        return
      }

      // 设置商品信息
      productInfo.value = {
        id: data.id,
        name: data.name,
        description: data.description || data.subName,
        image: data.image,
        seckillPrice: data.activityPrice || sku.price,
        originalPrice: data.originalPrice || sku.originalPrice,
        merchantId: data.merchant?.id
      }

      // 设置秒杀活动信息
      seckillInfo.value = {
        stock: data.seckillStock || data.stock,
        soldCount: data.seckillSoldCount || 0,
        limitPerUser: data.limitPerUser || 1,
        startTime: data.activityStartTime,
        endTime: data.activityEndTime
      }

      // 检查限购
      const maxQuantity = seckillInfo.value.limitPerUser || 99
      if (quantity.value > maxQuantity) {
        quantity.value = maxQuantity
        ElMessage.warning(`每人限购${maxQuantity}件`)
      }
    } else {
      ElMessage.error(res.message || '获取商品信息失败')
      router.push('/')
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    ElMessage.error('获取商品详情失败')
    router.push('/')
  }
}

// 启动倒计时
const startCountdown = () => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }

  countdownTimer.value = setInterval(() => {
    if (seckillInfo.value) {
      seckillInfo.value = { ...seckillInfo.value }
    }
  }, 1000)
}

// 格式化倒计时
const formatCountdown = (endTime) => {
  if (!endTime) return '--:--:--'
  const end = new Date(endTime).getTime()
  const now = Date.now()
  const diff = end - now

  if (diff <= 0) return '已结束'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// 处理添加地址
const handleAddAddress = () => {
  router.push('/user?tab=address&action=add')
}

// 处理编辑地址
const handleEditAddress = (address) => {
  router.push(`/user?tab=address&action=edit&id=${address.id}`)
}

// 提交订单
const handleSubmitOrder = async () => {
  if (!selectedAddress.value) {
    ElMessage.warning('请选择收货地址')
    return
  }

  if (!productInfo.value.id) {
    ElMessage.warning('商品信息加载中')
    return
  }

  // 获取选中的地址信息
  const selectedAddr = addresses.value.find(addr => addr.id === selectedAddress.value)
  if (!selectedAddr) {
    ElMessage.error('地址信息异常，请重新选择')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认抢购订单，应付金额：¥${finalAmount.value.toFixed(2)}\n收货人：${selectedAddr.consigneeName || selectedAddr.receiver}\n电话：${selectedAddr.phone}\n地址：${selectedAddr.province} ${selectedAddr.city} ${selectedAddr.district} ${selectedAddr.detailAddress || selectedAddr.detail}`,
      '提示',
      {
        confirmButtonText: '确认抢购',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: false
      }
    )

    submitting.value = true

    // 构建秒杀订单数据
    const orderData = {
      addressId: selectedAddress.value,
      merchantId: productInfo.value.merchantId,
      remark: orderRemark.value || undefined,
      items: [
        {
          productId: productInfo.value.id,
          skuId: route.query.skuId,
          quantity: quantity.value
        }
      ]
    }

    // 调用秒杀订单创建 API
    const res = await createSeckillOrder(activityId.value, orderData)

    if (res.code === 1000 && res.data) {
      ElMessage.success('秒杀订单创建成功！请尽快完成支付')
      // 跳转到订单详情页
      setTimeout(() => {
        router.push(`/order/${res.data.orderId || res.data.id}`)
      }, 1500)
    } else {
      ElMessage.error(res.message || '订单创建失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('创建秒杀订单失败:', error)
      ElMessage.error(error.response?.data?.message || '订单创建失败')
    }
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}
</script>

<style scoped lang="scss">
.seckill-checkout-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fff5f5 0%, #f5f7fa 100%);
  padding-bottom: 80px;
}

.main-content {
  flex: 1;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;

    .el-icon {
      color: #ff4d4f;
      font-size: 28px;
    }
  }

  .countdown-badge {
    text-align: right;

    .countdown-label {
      display: block;
      font-size: 12px;
      color: #909399;
      margin-bottom: 4px;
    }

    .countdown-time {
      font-size: 24px;
      font-weight: 700;
      color: #ff4d4f;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
  }
}

.loading-container {
  padding: 40px 0;
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
}

.seckill-notice {
  .notice-list {
    margin: 8px 0 0 0;
    padding-left: 20px;
    
    li {
      font-size: 13px;
      line-height: 1.8;
      color: #606266;
    }
  }
}

.checkout-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .el-icon {
      color: #ff4d4f;
    }
  }
}

.product-section {
  border: 2px solid #ff4d4f;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
}

.seckill-product-card {
  display: flex;
  gap: 20px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;

  .product-image-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    flex-shrink: 0;

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .seckill-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
      color: #fff;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      box-shadow: 0 2px 8px rgba(255, 77, 79, 0.4);
    }
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      margin: 0;
      line-height: 1.4;
    }

    .product-desc {
      font-size: 14px;
      color: #909399;
      margin: 0;
      line-height: 1.6;
    }

    .price-wrapper {
      display: flex;
      align-items: baseline;
      gap: 12px;

      .seckill-price {
        font-size: 28px;
        font-weight: 700;
        color: #ff4d4f;
      }

      .original-price {
        font-size: 14px;
        color: #c0c4cc;
        text-decoration: line-through;
      }

      .discount-tag {
        background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .quantity-info {
      font-size: 14px;
      color: #606266;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stock-progress {
      .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        .progress-text {
          font-size: 13px;
          color: #606266;
        }

        .progress-percent {
          font-size: 13px;
          color: #ff4d4f;
          font-weight: 600;
        }
      }
    }
  }
}

.address-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.empty-address {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.address-card {
  border: 2px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #ff4d4f;
  }

  &.active {
    border-color: #ff4d4f;
    background: #fff5f5;
  }

  .address-info {
    .address-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .receiver {
        font-weight: 600;
        color: #303133;
      }

      .phone {
        color: #909399;
      }
    }

    .address-detail {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
    }
  }

  .address-actions {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}

.address-add-card {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 100px;

  .el-icon {
    font-size: 24px;
    color: #909399;
  }

  span {
    font-size: 14px;
    color: #909399;
  }

  &:hover {
    border-color: #ff4d4f;
    background: #fff5f5;

    .el-icon, span {
      color: #ff4d4f;
    }
  }
}

.remark-input {
  max-width: 600px;
}

.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-top: 2px solid #ff4d4f;
}

.bar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-summary {
  display: flex;
  align-items: center;
  gap: 24px;

  .summary-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      color: #909399;
      font-size: 14px;
    }

    .value {
      color: #606266;
      font-size: 14px;

      &.final-price {
        font-size: 24px;
        font-weight: 700;
        color: #ff4d4f;
      }
    }

    &.total {
      padding-left: 24px;
      border-left: 2px solid #ff4d4f;
    }
  }
}

.bar-actions {
  display: flex;
  gap: 12px;

  .submit-btn {
    padding: 12px 48px;
    font-size: 16px;
    border-radius: 24px;
    background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
    border: none;
    animation: glow 2s infinite;

    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(255, 77, 79, 0.5);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(255, 77, 79, 0.6);
  }
}

.footer {
  background: #2c3e50;
  color: #fff;
  padding: 20px 0;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-bottom {
    text-align: center;

    p {
      margin: 0;
      font-size: 12px;
      color: #78909c;
    }
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .seckill-product-card {
    flex-direction: column;

    .product-image-wrapper {
      width: 100%;
      height: 240px;
    }
  }

  .bar-container {
    flex-direction: column;
    gap: 16px;
  }

  .order-summary {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .bar-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
