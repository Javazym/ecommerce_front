<template>
  <div class="shopping-cart-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><ShoppingCart /></el-icon>
            购物车
            <span class="cart-count">({{ cartItems.length }} 件商品)</span>
          </h1>
        </div>

        <!-- 购物车内容 -->
        <div class="cart-content" v-if="cartItems.length > 0">
          <!-- 购物车商品列表 -->
          <div class="cart-products">
            <!-- 全选 -->
            <div class="cart-header">
              <el-checkbox
                v-model="selectAll"
                :indeterminate="isIndeterminate"
                @change="handleSelectAll"
              >
                全选
              </el-checkbox>
              <el-button type="text" class="delete-selected" @click="handleDeleteSelected">
                <el-icon><Delete /></el-icon>
                删除选中
              </el-button>
            </div>

            <!-- 商品列表 -->
            <div class="product-list">
              <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <el-checkbox
                  v-model="item.selected"
                  @change="handleItemSelect"
                />
                <div class="item-image" @click="goToProduct(item)">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="item-info" @click="goToProduct(item)">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-desc">{{ item.description }}</p>
                </div>
                <div class="item-price">
                  <span class="current-price">¥{{ item.price }}</span>
                </div>
                <div class="item-quantity">
                  <el-input-number
                    v-model="item.quantity"
                    :min="1"
                    :max="99"
                    size="small"
                    @change="handleQuantityChange(item)"
                  />
                </div>
                <div class="item-total">
                  <span class="total-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
                <div class="item-actions">
                  <el-button
                    type="text"
                    :icon="Star"
                    @click="handleAddToFavorite(item)"
                  >
                    收藏
                  </el-button>
                  <el-button
                    type="text"
                    :icon="Delete"
                    @click="handleDeleteItem(item)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 结算栏 -->
          <div class="cart-summary">
            <div class="summary-section">
              <h3 class="summary-title">价格明细</h3>
              <div class="summary-row">
                <span>商品总价</span>
                <span>¥{{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>优惠</span>
                <span class="discount">-¥{{ discount.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>运费</span>
                <span>{{ shippingFee > 0 ? `¥${shippingFee.toFixed(2)}` : '免运费' }}</span>
              </div>
              <el-divider />
              <div class="summary-row total-row">
                <span>应付金额</span>
                <span class="final-price">¥{{ finalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <div class="coupon-section">
              <h3 class="summary-title">优惠卡券</h3>
              <el-select v-model="selectedCoupon" placeholder="请选择优惠券" class="coupon-select">
                <el-option
                  v-for="coupon in coupons"
                  :key="coupon.id"
                  :label="coupon.label"
                  :value="coupon.id"
                  :disabled="coupon.minAmount > totalPrice"
                >
                  <span>{{ coupon.label }}</span>
                  <span class="coupon-value">{{ coupon.value }}</span>
                </el-option>
              </el-select>
            </div>

            <div class="checkout-section">
              <el-button
                type="primary"
                size="large"
                class="checkout-btn"
                @click="handleCheckout"
              >
                结算 ({{ selectedCount }})
              </el-button>
              <el-button size="large" @click="goToHome">
                继续购物
              </el-button>
            </div>
          </div>
        </div>

        <!-- 空购物车 -->
        <div v-else class="empty-cart">
          <el-empty description="购物车还是空的">
            <template #image>
              <el-icon class="empty-icon"><ShoppingCart /></el-icon>
            </template>
            <el-button type="primary" @click="goToHome">去逛逛</el-button>
          </el-empty>
        </div>

        <!-- 为你推荐 -->
        <div class="recommend-section" v-if="recommendProducts.length > 0">
          <h3 class="section-title">
            <el-icon><Goods /></el-icon>
            为你推荐
          </h3>
          <div class="recommend-grid">
            <div
              v-for="product in recommendProducts"
              :key="product.id"
              class="recommend-item"
              @click="goToProductDetail(product)"
            >
              <div class="recommend-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="recommend-info">
                <h4 class="recommend-name">{{ product.name }}</h4>
                <div class="recommend-price">
                  <span class="current-price">¥{{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ShoppingCart, Delete, Star, Goods } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { products } from '../data/products.js'

const router = useRouter()

// 模拟购物车数据
const cartItems = ref([
  {
    id: 1,
    name: 'Apple AirPods Pro 2',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
    description: '主动降噪，空间音频',
    quantity: 1,
    selected: true
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: '经典气垫运动鞋',
    quantity: 1,
    selected: true
  },
  {
    id: 3,
    name: 'Dyson V15吸尘器',
    price: 4990,
    originalPrice: 5990,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    description: '激光探测，强劲吸力',
    quantity: 1,
    selected: false
  }
])

// 优惠券列表
const coupons = ref([
  { id: 1, label: '满500减30', value: '-¥30', minAmount: 500 },
  { id: 2, label: '满1000减80', value: '-¥80', minAmount: 1000 },
  { id: 3, label: '满2000减200', value: '-¥200', minAmount: 2000 },
  { id: 4, label: '满5000减500', value: '-¥500', minAmount: 5000 }
])

const selectedCoupon = ref(null)
const selectAll = ref(false)
const isIndeterminate = ref(false)

// 推荐商品
const recommendProducts = computed(() => {
  return products.filter(p => !cartItems.value.find(item => item.id === p.id)).slice(0, 4)
})

// 计算属性
const totalPrice = computed(() => {
  return cartItems.value
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const discount = computed(() => {
  // 根据优惠券计算优惠
  if (selectedCoupon.value) {
    const coupon = coupons.value.find(c => c.id === selectedCoupon.value)
    if (coupon && totalPrice.value >= coupon.minAmount) {
      return parseInt(coupon.value.replace('-¥', ''))
    }
  }
  return 0
})

const shippingFee = computed(() => {
  return totalPrice.value >= 99 ? 0 : 10
})

const finalPrice = computed(() => {
  return Math.max(0, totalPrice.value - discount.value + shippingFee.value)
})

const selectedCount = computed(() => {
  return cartItems.value.filter(item => item.selected).length
})

// 全选处理
const handleSelectAll = (val) => {
  cartItems.value.forEach(item => {
    item.selected = val
  })
  isIndeterminate.value = false
}

// 单选处理
const handleItemSelect = () => {
  const selected = cartItems.value.filter(item => item.selected)
  selectAll.value = selected.length === cartItems.value.length
  isIndeterminate.value = selected.length > 0 && selected.length < cartItems.value.length
}

// 数量变化
const handleQuantityChange = (item) => {
  console.log('数量变化:', item)
}

// 删除单个商品
const handleDeleteItem = async (item) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除 "${item.name}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    const index = cartItems.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      ElMessage.success('已删除')
    }
  } catch {
    // 用户取消
  }
}

// 删除选中
const handleDeleteSelected = async () => {
  const selected = cartItems.value.filter(item => item.selected)
  if (selected.length === 0) {
    ElMessage.warning('请先选择要删除的商品')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selected.length} 件商品吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    cartItems.value = cartItems.value.filter(item => !item.selected)
    ElMessage.success('已删除')
  } catch {
    // 用户取消
  }
}

// 收藏
const handleAddToFavorite = (item) => {
  ElMessage.success('已添加到收藏夹')
}

// 去结算
const handleCheckout = () => {
  if (selectedCount.value === 0) {
    ElMessage.warning('请先选择要结算的商品')
    return
  }
  router.push('/checkout')
}

// 继续购物
const goToHome = () => {
  router.push('/')
}

// 去商品详情
const goToProduct = (item) => {
  router.push(`/product/${item.id}`)
}

// 去商品详情页
const goToProductDetail = (product) => {
  router.push(`/product/${product.id}`)
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}
</script>

<style scoped lang="scss">
.shopping-cart-page {
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
  max-width: 1400px;
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

    .cart-count {
      font-size: 14px;
      font-weight: 400;
      color: #909399;
    }
  }
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.cart-products {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 16px;

    .delete-selected {
      color: #f56c6c;

      &:hover {
        color: #f78989;
      }
    }
  }

  .product-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 40px 100px 1fr 120px 120px 100px 100px;
    gap: 16px;
    align-items: center;
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: #f5f7fa;
    }

    @media (max-width: 1200px) {
      grid-template-columns: 40px 80px 1fr 100px;

      .item-desc,
      .item-actions {
        display: none;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 40px 60px 1fr;

      .item-price,
      .item-quantity,
      .item-total {
        display: none;
      }
    }

    .item-image {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .item-info {
      cursor: pointer;

      .item-name {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color: #409eff;
        }
      }

      .item-desc {
        font-size: 12px;
        color: #909399;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .item-price {
      .current-price {
        font-size: 16px;
        font-weight: 600;
        color: #f56c6c;
      }
    }

    .item-total {
      .total-price {
        font-size: 18px;
        font-weight: 700;
        color: #f56c6c;
      }
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .el-button {
        justify-content: flex-start;
        padding: 0;

        &.el-button--text {
          color: #909399;

          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}

.cart-summary {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
  height: fit-content;

  .summary-section {
    margin-bottom: 24px;

    .summary-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 16px 0;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
      color: #606266;

      .discount {
        color: #f56c6c;
      }

      &.total-row {
        font-size: 16px;
        font-weight: 600;
        color: #303133;

        .final-price {
          font-size: 24px;
          font-weight: 700;
          color: #f56c6c;
        }
      }
    }
  }

  .coupon-section {
    margin-bottom: 24px;

    .summary-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 16px 0;
    }

    .coupon-select {
      width: 100%;

      .coupon-value {
        float: right;
        color: #f56c6c;
        font-weight: 600;
      }
    }
  }

  .checkout-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .checkout-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      border-radius: 24px;
      background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
      border: none;

      &:hover {
        box-shadow: 0 4px 16px rgba(64, 158, 255, 0.4);
      }
    }
  }
}

.empty-cart {
  background: #fff;
  border-radius: 12px;
  padding: 80px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .empty-icon {
    font-size: 100px;
    color: #dcdfe6;
  }
}

.recommend-section {
  margin-top: 40px;

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .el-icon {
      color: #409eff;
    }
  }

  .recommend-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .recommend-item {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(64, 158, 255, 0.2);

      .recommend-image img {
        transform: scale(1.1);
      }
    }

    .recommend-image {
      height: 180px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    .recommend-info {
      padding: 16px;

      .recommend-name {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        margin: 0 0 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .recommend-price {
        .current-price {
          font-size: 18px;
          font-weight: 700;
          color: #f56c6c;
        }
      }
    }
  }
}

.footer {
  background: #2c3e50;
  color: #fff;
  padding: 20px 0;
  margin-top: auto;

  .footer-container {
    max-width: 1400px;
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
</style>
