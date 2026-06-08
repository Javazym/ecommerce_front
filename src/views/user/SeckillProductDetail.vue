<template>
  <div class="seckill-product-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/seckill' }">限时秒杀</el-breadcrumb-item>
            <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 秒杀活动横幅 -->
        <div class="seckill-banner">
          <div class="banner-content">
            <div class="banner-left">
              <h2 class="banner-title">⚡ 限时秒杀</h2>
              <p class="banner-subtitle">超值优惠，限时抢购</p>
            </div>
            <div class="banner-right">
              <div class="countdown-display">
                <span class="countdown-label">距结束</span>
                <div class="countdown-time">{{ formatCountdown(seckillInfo?.endTime) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 商品主体信息 -->
        <div class="product-main">
          <!-- 商品图片区域 -->
          <div class="product-gallery">
            <div class="main-image-wrapper">
              <img :src="currentImage" :alt="product.name" class="main-image" />
              <div class="seckill-badge">
                <el-icon><Lightning /></el-icon>
                秒杀中
              </div>
            </div>
            <div class="thumbnail-list">
              <div
                v-for="(img, index) in productImages"
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === img }"
                @click="currentImage = img"
              >
                <img :src="img" :alt="`${product.name} ${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- 商品信息区域 -->
          <div class="product-info">
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-subtitle">{{ product.description }}</p>

            <div class="meta-section">
              <div class="meta-item">
                <span class="meta-label">评分</span>
                <el-rate v-model="product.rating" disabled show-score size="small" />
              </div>
              <div class="meta-item">
                <span class="meta-label">销量</span>
                <span class="meta-value">{{ product.sales }}+ 件</span>
              </div>
            </div>

            <!-- 价格区域 -->
            <div class="price-section">
              <div class="current-price-wrapper">
                <span class="current-price">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
                <span v-if="discount > 0" class="discount-badge">省{{ discount }}%</span>
              </div>

              <!-- 进度条 -->
              <div class="progress-section">
                <div class="progress-header">
                  <span class="progress-label">已抢 {{ seckillInfo?.soldCount || 0 }}/{{ seckillInfo?.stock || 0 }}</span>
                  <span class="progress-percent">{{ progressPercent }}%</span>
                </div>
                <el-progress
                  :percentage="progressPercent"
                  :stroke-width="12"
                  :show-text="false"
                  color="#ff4d4f"
                />
                <p class="progress-tip" v-if="seckillInfo?.limitPerUser">
                  <el-tag size="small" type="danger" effect="plain">
                    每人限购{{ seckillInfo.limitPerUser }}件
                  </el-tag>
                </p>
              </div>
            </div>

            <el-divider />

            <!-- 规格选择 -->
            <div v-if="product.specs && product.specs.length > 0" class="spec-selection">
              <div v-for="(spec, specIndex) in product.specs" :key="specIndex" class="spec-item">
                <span class="spec-label">{{ spec.name }}：</span>
                <div class="spec-options">
                  <el-button
                    v-for="(value, valueIndex) in spec.values"
                    :key="valueIndex"
                    :class="['spec-option', { active: selectedSpecs[specIndex] === value }]"
                    size="small"
                    @click="handleSpecSelect(specIndex, value)"
                  >
                    {{ value }}
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 已选规格显示 -->
            <div v-if="selectedSpecs.length > 0" class="selected-specs">
              <span class="selected-label">已选：</span>
              <span class="selected-values">{{ selectedSpecsText }}</span>
            </div>

            <el-divider />

            <!-- 数量选择 -->
            <div class="quantity-section">
              <span class="quantity-label">数量</span>
              <el-input-number
                v-model="quantity"
                :min="1"
                :max="seckillInfo?.limitPerUser || 99"
                @change="handleQuantityChange"
              />
              <span class="stock-info">
                秒杀库存 {{ seckillInfo?.stock || product.stock }} 件
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button
                type="danger"
                size="large"
                class="buy-now-btn"
                @click="handleBuyNow"
                :disabled="!canPurchase"
              >
                <el-icon><Lightning /></el-icon>
                立即抢购
              </el-button>

              <el-button size="large" class="favorite-btn" @click="handleAddToFavorite">
                <el-icon><component :is="isFavorited ? StarFilled : Star" /></el-icon>
              </el-button>
            </div>

            <!-- 秒杀规则说明 -->
            <div class="seckill-rules">
              <h4 class="rules-title">秒杀规则</h4>
              <ul class="rules-list">
                <li>1. 秒杀商品数量有限，售完即止</li>
                <li>2. 每个用户限购指定数量，请勿重复下单</li>
                <li>3. 秒杀订单需在30分钟内完成支付</li>
                <li>4. 秒杀商品不支持退换货（质量问题除外）</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 商品详情 -->
        <div class="product-detail-section">
          <el-tabs v-model="activeTab" class="detail-tabs">
            <el-tab-pane label="商品详情" name="detail">
              <div class="detail-content">
                <h3 class="section-title">商品参数</h3>
                <el-descriptions :column="2" border class="product-descriptions">
                  <el-descriptions-item label="商品名称">{{ product.name }}</el-descriptions-item>
                  <el-descriptions-item label="商品分类">{{ categoryLabel }}</el-descriptions-item>
                  <el-descriptions-item label="品牌">{{ brand }}</el-descriptions-item>
                  <el-descriptions-item label="产地">{{ origin }}</el-descriptions-item>
                  <el-descriptions-item label="材质">{{ material }}</el-descriptions-item>
                  <el-descriptions-item label="重量">{{ weight }}</el-descriptions-item>
                </el-descriptions>

                <h3 class="section-title">商品介绍</h3>
                <div class="product-intro">
                  <p>{{ product.description }}</p>
                </div>

                <h3 class="section-title">商品展示</h3>
                <div class="product-images">
                  <img v-for="(img, index) in productImages" :key="index" :src="img" :alt="`商品图 ${index + 1}`" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Star, StarFilled, Lightning } from '@element-plus/icons-vue'
import NavBar from '../../components/NavBar.vue'
import { getProductDetail } from '../../api/modules/product.js'
import { useUserStore } from '../../stores/userStore.js'
import { addFavorite, removeFavorite, checkFavorite } from '../../api/modules/favorite.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const product = ref({})
const currentImage = ref('')
const quantity = ref(1)
const activeTab = ref('detail')
const loading = ref(false)
const selectedSpecs = ref([])
const isFavorited = ref(false)

// 秒杀活动相关
const seckillInfo = ref(null)
const countdownTimer = ref(null)

// 组件挂载时启动倒计时
onMounted(async () => {
  const productId = parseInt(route.params.id)

  if (productId) {
    await loadProductDetail(productId)
    await checkFavoriteStatus(productId)
    startCountdown()
  }
})

// 加载商品详情
const loadProductDetail = async (productId) => {
  loading.value = true
  try {
    const res = await getProductDetail(productId)
    if (res.code === 1000 && res.data) {
      const data = res.data

      // 判断是否有活动，如果有活动则使用活动价格
      const hasActivity = data.hasActivity && data.activityType === 1
      const displayPrice = hasActivity && data.activityPrice ? data.activityPrice : data.price

      // 适配接口返回的数据结构
      product.value = {
        id: data.id,
        name: data.name,
        description: data.description || data.subName,
        price: displayPrice,
        originalPrice: data.originalPrice,
        stock: data.stock,
        sales: data.soldCount || 0,
        rating: data.rating || 5,
        isHot: data.isHot === 1,
        isFeatured: data.isFeatured === 1,
        image: data.image,
        images: data.images || [],
        category: data.category?.name || '',
        categoryId: data.categoryId,
        merchant: data.merchant,
        specs: (data.specs || []).map(spec => ({
          ...spec,
          values: (spec.values || []).map(v => v.value)
        })),
        skus: data.skus || [],
        hasActivity: data.hasActivity || false,
        activityType: data.activityType || 0,
        activityId: data.activityId || null,
        activityName: data.activityName || null,
        activityStartTime: data.activityStartTime || null,
        activityEndTime: data.activityEndTime || null,
        seckillStock: data.seckillStock || data.stock,
        seckillSoldCount: data.seckillSoldCount || 0,
        limitPerUser: data.limitPerUser || null
      }
      currentImage.value = product.value.image

      // 初始化选中规格（默认选中第一个）
      if (product.value.specs && product.value.specs.length > 0) {
        selectedSpecs.value = product.value.specs.map(spec =>
          spec.values && spec.values.length > 0 ? spec.values[0] : null
        )
      }

      // 构建 seckillInfo
      if (hasActivity) {
        seckillInfo.value = {
          stock: data.seckillStock || data.stock,
          soldCount: data.seckillSoldCount || 0,
          limitPerUser: data.limitPerUser || 1,
          startTime: data.activityStartTime,
          endTime: data.activityEndTime
        }
      }
    } else {
      ElMessage.error(res.message || '获取商品详情失败')
    }
  } catch (error) {
    console.error('加载商品详情失败:', error)
    ElMessage.error('加载商品详情失败')
  } finally {
    loading.value = false
  }
}

// 检查收藏状态
const checkFavoriteStatus = async (productId) => {
  try {
    const res = await checkFavorite(productId)
    if (res.code === 1000) {
      isFavorited.value = res.data === true
    }
  } catch (error) {
    console.error('检查收藏状态失败:', error)
  }
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})

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

// 商品图片列表
const productImages = computed(() => {
  if (Array.isArray(product.value.images) && product.value.images.length > 0) {
    return product.value.images
  }
  return [product.value.image].filter(Boolean)
})

// 折扣计算
const discount = computed(() => {
  if (product.value.originalPrice && product.value.originalPrice > product.value.price) {
    return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
  }
  return 0
})

// 进度百分比
const progressPercent = computed(() => {
  if (!seckillInfo.value || !seckillInfo.value.stock) return 0
  return Math.min(100, Math.round((seckillInfo.value.soldCount / seckillInfo.value.stock) * 100))
})

// 是否可以购买
const canPurchase = computed(() => {
  if (!seckillInfo.value) return false
  if (seckillInfo.value.soldCount >= seckillInfo.value.stock) return false

  const endTime = new Date(seckillInfo.value.endTime).getTime()
  if (Date.now() >= endTime) return false

  return true
})

// 分类标签
const categoryLabel = computed(() => {
  return product.value.category || '商品'
})

// 模拟商品属性
const brand = computed(() => product.value.merchant?.name || '云商城自营')
const origin = '中国'
const material = '优质材料'
const weight = '详见包装'

// 处理规格选择
const handleSpecSelect = (specIndex, value) => {
  if (selectedSpecs.value[specIndex] === value) {
    return
  }
  selectedSpecs.value[specIndex] = value
}

// 获取已选规格的文本描述
const selectedSpecsText = computed(() => {
  if (!product.value.specs || product.value.specs.length === 0) {
    return ''
  }

  const specsText = selectedSpecs.value
    .filter(value => value !== null && value !== undefined)
    .join('，')

  return specsText || '请选择规格'
})

// 获取当前选中的SKU
const getCurrentSku = computed(() => {
  if (!product.value.skus || product.value.skus.length === 0) {
    return null
  }
  return product.value.skus[0]
})

// 搜索处理
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}

// 数量变化
const handleQuantityChange = (value) => {
  console.log('数量变化:', value)
}

// 立即购买
const handleBuyNow = () => {
  if (!product.value.id) {
    ElMessage.warning('商品信息加载中')
    return
  }

  const currentSku = getCurrentSku.value
  if (!currentSku) {
    ElMessage.warning('请选择商品规格')
    return
  }

  // 检查是否有秒杀活动
  if (!product.value.hasActivity || product.value.activityType !== 1) {
    ElMessage.warning('该商品未参与秒杀活动')
    return
  }

  // 跳转到秒杀订单创建页面
  router.push({
    path: `/seckill/checkout/${product.value.activityId}`,
    query: {
      productId: product.value.id,
      skuId: currentSku.id,
      quantity: quantity.value
    }
  })
}

// 收藏
const handleAddToFavorite = async () => {
  if (!product.value.id) {
    ElMessage.warning('商品信息加载中')
    return
  }

  if (!userStore.isLoggedIn || !userStore.userId) {
    ElMessage.warning('请先登录后再收藏商品')
    router.push('/auth')
    return
  }

  try {
    if (isFavorited.value) {
      const res = await removeFavorite(product.value.id)
      if (res.code === 1000) {
        ElMessage.success('已取消收藏')
        isFavorited.value = false
      } else {
        ElMessage.error(res.message || '取消收藏失败')
      }
    } else {
      const res = await addFavorite(product.value.id)
      if (res.code === 1000) {
        ElMessage.success('已添加到收藏夹')
        isFavorited.value = true
      } else {
        ElMessage.error(res.message || '添加收藏失败')
      }
    }
  } catch (error) {
    console.error('收藏操作失败:', error)
    ElMessage.error('收藏操作失败')
  }
}
</script>

<style scoped lang="scss">
.seckill-product-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fff5f5 0%, #f5f7fa 100%);
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

.breadcrumb {
  padding: 12px 0;
}

// 秒杀横幅
.seckill-banner {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
  border-radius: 12px;
  padding: 16px 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(255, 77, 79, 0.3);

  .banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .banner-left {
      .banner-title {
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        margin: 0 0 4px 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .banner-subtitle {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
      }
    }

    .banner-right {
      .countdown-display {
        text-align: right;

        .countdown-label {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
        }

        .countdown-time {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}

.product-main {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 32px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.product-gallery {
  .main-image-wrapper {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f7fa;
    margin-bottom: 12px;

    .main-image {
      width: 100%;
      height: 360px;
      object-fit: cover;
    }

    .seckill-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
      color: #fff;
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: pulse 2s infinite;
      box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
    }
  }

  .thumbnail-list {
    display: flex;
    gap: 8px;

    .thumbnail {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover, &.active {
        border-color: #ff4d4f;
      }
    }
  }
}

.product-info {
  .product-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .product-subtitle {
    font-size: 14px;
    color: #909399;
    margin: 0 0 16px 0;
    line-height: 1.6;
  }

  .meta-section {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
    padding: 10px 14px;
    background: #fafafa;
    border-radius: 8px;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;

      .meta-label {
        color: #909399;
        font-size: 14px;
      }

      .meta-value {
        color: #303133;
        font-weight: 500;
      }
    }
  }

  .price-section {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 2px solid #ff4d4f;

    .current-price-wrapper {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 16px;

      .current-price {
        font-size: 36px;
        font-weight: 700;
        color: #ff4d4f;
        text-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
      }

      .original-price {
        font-size: 16px;
        color: #c0c4cc;
        text-decoration: line-through;
      }

      .discount-badge {
        background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
      }
    }

    .progress-section {
      .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        .progress-label {
          font-size: 14px;
          color: #606266;
          font-weight: 500;
        }

        .progress-percent {
          font-size: 14px;
          color: #ff4d4f;
          font-weight: 600;
        }
      }

      .progress-tip {
        margin-top: 8px;
        text-align: right;
      }
    }
  }

  .spec-selection {
    .spec-item {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;

      .spec-label {
        color: #909399;
        font-size: 14px;
        min-width: 70px;
        font-weight: 500;
      }

      .spec-options {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        flex: 1;

        .spec-option {
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 8px 20px;
          font-size: 13px;
          min-width: 60px;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 77, 79, 0.25);
          }

          &.active {
            background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
            color: #fff;
            border-color: #ff4d4f;
            box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
            font-weight: 500;
          }
        }
      }
    }
  }

  .selected-specs {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%);
    border-radius: 8px;
    margin-top: 8px;
    border-left: 3px solid #ff4d4f;

    .selected-label {
      color: #606266;
      font-size: 14px;
      font-weight: 500;
    }

    .selected-values {
      color: #ff4d4f;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .quantity-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 16px 0;

    .quantity-label {
      color: #606266;
      font-size: 14px;
    }

    .stock-info {
      color: #ff4d4f;
      font-size: 13px;
      font-weight: 500;
    }
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 16px;

    .buy-now-btn {
      flex: 1;
      height: 48px;
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

    .favorite-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      font-size: 20px;
      border: 2px solid #dcdfe6;

      &:hover {
        border-color: #ff4d4f;
        color: #ff4d4f;
      }
    }
  }

  .seckill-rules {
    margin-top: 16px;
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
    border-left: 4px solid #ff4d4f;

    .rules-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 12px 0;
    }

    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 13px;
        color: #606266;
        line-height: 1.8;
        padding-left: 20px;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #ff4d4f;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}

.product-detail-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .detail-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 24px;
    }

    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: 500;

      &.is-active {
        color: #ff4d4f;
      }
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin: 20px 0 12px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  .product-descriptions {
    margin-bottom: 16px;
  }

  .product-intro {
    color: #606266;
    line-height: 1.8;

    p {
      margin-bottom: 12px;
    }
  }

  .product-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
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

// 动画效果
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 77, 79, 0.8);
  }
}
</style>
