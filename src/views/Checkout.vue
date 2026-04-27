<template>
  <div class="checkout-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><ShoppingCart /></el-icon>
            确认订单
          </h1>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="10" animated />
        </div>

        <!-- 主体内容 -->
        <div v-else class="checkout-content">
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

          <!-- 商品清单 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Goods /></el-icon>
              商品清单
            </h2>
            <div class="product-list">
              <div v-for="item in orderItems" :key="item.id" class="product-item">
                <img :src="item.image" :alt="item.name" class="product-image" />
                <div class="product-info">
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.description }}</p>
                </div>
                <div class="product-price">¥{{ item.price }}</div>
                <div class="product-quantity">x{{ item.quantity }}</div>
                <div class="product-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
          </div>

          <!-- 配送方式 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Van /></el-icon>
              配送方式
            </h2>
            <el-radio-group v-model="deliveryMethod" class="delivery-options">
              <el-radio-button value="standard">
                <div class="delivery-option">
                  <span class="delivery-name">标准配送</span>
                  <span class="delivery-time">3-5天送达</span>
                  <span class="delivery-price">免费</span>
                </div>
              </el-radio-button>
              <el-radio-button value="express">
                <div class="delivery-option">
                  <span class="delivery-name">快速配送</span>
                  <span class="delivery-time">1-2天送达</span>
                  <span class="delivery-price">¥10</span>
                </div>
              </el-radio-button>
              <el-radio-button value="sameDay">
                <div class="delivery-option">
                  <span class="delivery-name">当日达</span>
                  <span class="delivery-time">当天送达</span>
                  <span class="delivery-price">¥20</span>
                </div>
              </el-radio-button>
            </el-radio-group>
          </div>

          <!-- 发票信息 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Document /></el-icon>
              发票信息
            </h2>
            <el-radio-group v-model="invoiceType">
              <el-radio-button value="none">不开发票</el-radio-button>
              <el-radio-button value="personal">个人发票</el-radio-button>
              <el-radio-button value="company">企业发票</el-radio-button>
            </el-radio-group>
            <el-input v-if="invoiceType === 'company'" v-model="invoiceTitle" placeholder="请输入企业发票抬头" class="invoice-input" />
          </div>

          <!-- 优惠券 -->
          <div class="checkout-section">
            <h2 class="section-title">
              <el-icon><Ticket /></el-icon>
              优惠券
            </h2>
            <el-select v-model="selectedCoupon" placeholder="请选择优惠券" class="coupon-select">
              <el-option label="不使用优惠券" :value="0" />
              <el-option
                v-for="coupon in availableCoupons"
                :key="coupon.id"
                :label="`${coupon.name} - 减¥${coupon.value}`"
                :value="coupon.id"
                :disabled="coupon.minAmount > totalAmount"
              />
            </el-select>
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
            <span class="label">商品总价：</span>
            <span class="value">¥{{ totalAmount.toFixed(2) }}</span>
          </div>
          <div class="summary-item">
            <span class="label">运费：</span>
            <span class="value">¥{{ deliveryFee.toFixed(2) }}</span>
          </div>
          <div class="summary-item" v-if="couponDiscount > 0">
            <span class="label">优惠券：</span>
            <span class="value discount">-¥{{ couponDiscount.toFixed(2) }}</span>
          </div>
          <div class="summary-item total">
            <span class="label">应付金额：</span>
            <span class="value final-price">¥{{ finalAmount.toFixed(2) }}</span>
          </div>
        </div>
        <div class="bar-actions">
          <el-button type="primary" size="large" class="submit-btn" @click="handleSubmitOrder">
            提交订单
          </el-button>
          <el-button size="large" @click="goToCart">返回购物车</el-button>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  ShoppingCart, Location, Plus, Goods, Van, Document,
  Ticket, Edit
} from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { getProductDetail } from '../api/modules/product.js'
import { createOrder } from '../api/modules/order.js'
import { fetchAddresses } from '../stores/addressStore.js'
import { state as addressState } from '../stores/addressStore.js'

const route = useRoute()
const router = useRouter()

// 加载状态
const loading = ref(true)

// 立即购买的商品信息（从 URL 参数获取）
const buyNowProduct = ref(null)
const buyNowSkuId = ref(null)
const buyNowQuantity = ref(1)

// 收货地址（从 store 获取）
const addresses = computed(() => {
  const addrs = addressState.addresses || []
  // 适配后端返回的字段名
  return addrs.map(addr => ({
    ...addr,
    receiver: addr.consigneeName || addr.receiver,
    detail: addr.detailAddress || addr.detail
  }))
})
const selectedAddress = ref(null)

// 订单商品
const orderItems = ref([])

// 配送方式
const deliveryMethod = ref('standard')

// 发票信息
const invoiceType = ref('none')
const invoiceTitle = ref('')

// 优惠券
const selectedCoupon = ref(0)
const availableCoupons = ref([
  { id: 1, name: '满500减30', value: 30, minAmount: 500 },
  { id: 2, name: '满1000减80', value: 80, minAmount: 1000 },
  { id: 3, name: '满2000减150', value: 150, minAmount: 2000 }
])

// 订单备注
const orderRemark = ref('')

// 计算属性
const totalAmount = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const deliveryFee = computed(() => {
  const fees = { standard: 0, express: 10, sameDay: 20 }
  return fees[deliveryMethod.value]
})

const couponDiscount = computed(() => {
  if (selectedCoupon.value === 0) return 0
  const coupon = availableCoupons.value.find(c => c.id === selectedCoupon.value)
  return coupon ? coupon.value : 0
})

const finalAmount = computed(() => {
  return Math.max(0, totalAmount.value + deliveryFee.value - couponDiscount.value)
})

// 加载数据
onMounted(async () => {
  loading.value = true
  try {
    // 加载地址列表
    await fetchAddresses()
    
    // 设置默认选中的地址
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find(addr => addr.isDefault === 1)
      selectedAddress.value = defaultAddr ? defaultAddr.id : addresses.value[0].id
    } else {
      ElMessage.warning('您还没有收货地址，请先添加')
    }
    
    // 检查是否是立即购买（从 URL 参数获取）
    const productId = route.query.productId
    const skuId = route.query.skuId
    const quantity = route.query.quantity
    
    if (productId && skuId) {
      // 立即购买模式：获取商品详情
      buyNowProduct.value = parseInt(productId)
      buyNowSkuId.value = parseInt(skuId)
      buyNowQuantity.value = parseInt(quantity) || 1
      
      await loadBuyNowProduct(parseInt(productId), parseInt(skuId), buyNowQuantity.value)
    } else {
      // TODO: 购物车结算模式
      ElMessage.warning('请从购物车或商品详情页进入结算页面')
      router.push('/cart')
      return
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
})

// 加载立即购买的商品信息
const loadBuyNowProduct = async (productId, skuId, quantity) => {
  try {
    const res = await getProductDetail(productId)
    if (res.code === 1000 && res.data) {
      const product = res.data
      
      // 查找对应的 SKU
      const sku = product.skus?.find(s => s.id === skuId)
      if (!sku) {
        ElMessage.error('SKU 不存在')
        router.push('/product/' + productId)
        return
      }
      
      // 设置订单商品
      orderItems.value = [{
        id: product.id,
        productId: product.id,
        skuId: sku.id,
        name: product.name,
        price: sku.price || product.price,
        quantity: quantity,
        image: product.image,
        description: product.subName || product.description
      }]
    } else {
      ElMessage.error(res.message || '获取商品信息失败')
      router.push('/product/' + productId)
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    ElMessage.error('获取商品详情失败')
    router.push('/product/' + productId)
  }
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
  
  if (orderItems.value.length === 0) {
    ElMessage.warning('没有可结算的商品')
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
      `确认提交订单，应付金额：¥${finalAmount.value.toFixed(2)}\n收货人：${selectedAddr.consigneeName || selectedAddr.receiver}\n电话：${selectedAddr.phone}\n地址：${selectedAddr.province} ${selectedAddr.city} ${selectedAddr.district} ${selectedAddr.detailAddress || selectedAddr.detail}`,
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: false
      }
    )
    
    // 构建订单数据
    const orderData = {
      productId: buyNowProduct.value,
      skuId: buyNowSkuId.value,
      quantity: buyNowQuantity.value,
      addressId: selectedAddress.value,
      couponId: selectedCoupon.value > 0 ? selectedCoupon.value : undefined,
      remark: orderRemark.value || undefined
    }
    
    // 调用创建订单 API
    const res = await createOrder(orderData)
    
    if (res.code === 1000 && res.data) {
      ElMessage.success('订单提交成功！')
      // 跳转到订单详情页
      setTimeout(() => {
        router.push(`/order/${res.data.orderId || res.data.id}`)
      }, 1500)
    } else {
      ElMessage.error(res.message || '订单提交失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('提交订单失败:', error)
      ElMessage.error('提交订单失败')
    }
  }
}

// 返回购物车
const goToCart = () => {
  router.push('/cart')
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}
</script>

<style scoped lang="scss">
.checkout-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
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

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;

    .el-icon {
      color: #409eff;
      font-size: 28px;
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
      color: #409eff;
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
    border-color: #409eff;
  }

  &.active {
    border-color: #409eff;
    background: #ecf5ff;
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
    border-color: #409eff;
    background: #f5f7fa;

    .el-icon, span {
      color: #409eff;
    }
  }
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-info {
    flex: 1;

    h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #303133;
    }

    p {
      margin: 0;
      font-size: 12px;
      color: #909399;
    }
  }

  .product-price {
    font-size: 14px;
    color: #606266;
    min-width: 80px;
    text-align: right;
  }

  .product-quantity {
    font-size: 14px;
    color: #909399;
    min-width: 50px;
    text-align: center;
  }

  .product-total {
    font-size: 16px;
    font-weight: 600;
    color: #f56c6c;
    min-width: 100px;
    text-align: right;
  }
}

.delivery-options {
  display: flex;
  gap: 16px;

  :deep(.el-radio-button) {
    .el-radio-button__inner {
      padding: 16px 24px;
    }
  }

  .delivery-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    .delivery-name {
      font-weight: 600;
      color: #303133;
    }

    .delivery-time {
      font-size: 12px;
      color: #909399;
    }

    .delivery-price {
      font-size: 14px;
      color: #67c23a;
      font-weight: 500;
    }
  }
}

.invoice-input, .coupon-select, .remark-input {
  margin-top: 16px;
  max-width: 400px;
}

.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
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

      &.discount {
        color: #f56c6c;
      }

      &.final-price {
        font-size: 24px;
        font-weight: 700;
        color: #f56c6c;
      }
    }

    &.total {
      padding-left: 24px;
      border-left: 1px solid #ebeef5;
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
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border: none;

    &:hover {
      box-shadow: 0 4px 16px rgba(64, 158, 255, 0.4);
    }
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

  .delivery-options {
    flex-direction: column;
  }
}
</style>
