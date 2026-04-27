<template>
  <div class="product-detail-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ categoryLabel }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 商品主体信息 -->
        <div class="product-main">
          <!-- 商品图片区域 -->
          <div class="product-gallery">
            <div class="main-image-wrapper">
              <img :src="currentImage" :alt="product.name" class="main-image" />
              <div v-if="product.isHot" class="image-badge">
                <el-icon><Star /></el-icon>
                热门
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

            <div class="price-section">
              <div class="current-price-wrapper">
                <span class="current-price">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
                <span v-if="discount > 0" class="discount-badge">{{ discount }}% OFF</span>
              </div>
            </div>

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
                :max="99"
                @change="handleQuantityChange"
              />
              <span class="stock-info">库存 {{ product.stock || 99 }} 件</span>
            </div>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button type="primary" size="large" class="buy-now-btn" @click="handleBuyNow">
                <el-icon><ShoppingCart /></el-icon>
                立即购买
              </el-button>
              <el-button size="large" class="add-cart-btn" @click="handleAddToCart">
                <el-icon><ShoppingCart /></el-icon>
                加入购物车
              </el-button>
              <el-button size="large" class="favorite-btn" @click="handleAddToFavorite">
                <el-icon><Star /></el-icon>
              </el-button>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Star, ShoppingCart } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import { getProductDetail } from '../api/modules/product.js'

const route = useRoute()
const router = useRouter()

const product = ref({})
const currentImage = ref('')
const quantity = ref(1)
const activeTab = ref('detail')
const loading = ref(false)
const selectedSpecs = ref([]) // 存储选中的规格值

// 根据商品ID获取商品信息
onMounted(async () => {
  const productId = parseInt(route.params.id)
  if (productId) {
    await loadProductDetail(productId)
  }
})

// 加载商品详情
const loadProductDetail = async (productId) => {
  loading.value = true
  try {
    const res = await getProductDetail(productId)
    if (res.code === 1000 && res.data) {
      // 适配接口返回的数据结构
      product.value = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description || res.data.subName,
        price: res.data.price,
        originalPrice: res.data.originalPrice,
        stock: res.data.stock,
        sales: res.data.soldCount || 0,
        rating: res.data.rating || 5,
        isHot: res.data.isHot === 1,
        image: res.data.image,
        images: res.data.images || [], // 接口返回的是数组格式
        category: res.data.category?.name || '',
        categoryId: res.data.categoryId,
        merchant: res.data.merchant,
        // 处理 specs，提取 values 中的 value 字段
        specs: (res.data.specs || []).map(spec => ({
          ...spec,
          values: (spec.values || []).map(v => v.value)
        })),
        skus: res.data.skus || []
      }
      currentImage.value = product.value.image

      // 初始化选中规格（默认选中第一个）
      if (product.value.specs && product.value.specs.length > 0) {
        selectedSpecs.value = product.value.specs.map(spec =>
          spec.values && spec.values.length > 0 ? spec.values[0] : null
        )
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

// 商品图片列表
const productImages = computed(() => {
  // 接口返回的 images 是数组格式
  if (Array.isArray(product.value.images) && product.value.images.length > 0) {
    return product.value.images
  }
  // 如果没有多图，使用主图生成数组
  return [product.value.image].filter(Boolean)
})

// 折扣计算
const discount = computed(() => {
  if (product.value.originalPrice && product.value.originalPrice > product.value.price) {
    return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
  }
  return 0
})

// 分类标签
const categoryLabel = computed(() => {
  return product.value.category || '商品'
})

// 模拟商品属性（从接口数据中获取）
const brand = computed(() => product.value.merchant?.name || '云商城自营')
const origin = '中国'
const material = '优质材料'
const weight = '详见包装'

// 处理规格选择
const handleSpecSelect = (specIndex, value) => {
  // 如果点击的是已选中的规格，不执行操作（保持选中状态）
  if (selectedSpecs.value[specIndex] === value) {
    return
  }

  selectedSpecs.value[specIndex] = value
  console.log('选中的规格:', selectedSpecs.value)
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

  // 由于后端返回的 skus.specs 是空对象，暂时返回第一个 SKU
  // TODO: 当后端完善 SKU 与规格的关联后，需要根据 selectedSpecs 匹配对应的 SKU
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

// 加入购物车
const handleAddToCart = () => {
  if (!product.value.id) {
    ElMessage.warning('商品信息加载中')
    return
  }

  const currentSku = getCurrentSku.value
  const skuInfo = currentSku ? ` (SKU: ${currentSku.skuCode || '默认'})` : ''

  ElMessage.success(`已添加 ${quantity.value} 件商品到购物车${skuInfo}`)
  // TODO: 调用购物车 API，传递商品ID、SKU信息和数量
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

  const skuInfo = currentSku ? ` (SKU: ${currentSku.skuCode || '默认'})` : ''

  ElMessage.success(`正在跳转到结算页面${skuInfo}`)
  // 跳转到结算页面，携带商品ID、SKU ID和数量
  router.push({
    path: '/checkout',
    query: {
      productId: product.value.id,
      skuId: currentSku.id,
      quantity: quantity.value
    }
  })
}

// 收藏
const handleAddToFavorite = () => {
  if (!product.value.id) {
    ElMessage.warning('商品信息加载中')
    return
  }
  ElMessage.success('已添加到收藏夹')
  // TODO: 调用收藏 API
}
</script>

<style scoped lang="scss">
.product-detail-page {
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

.breadcrumb {
  padding: 20px 0;
}

.product-main {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 40px;
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

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
    margin-bottom: 16px;

    .main-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .image-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
      color: #fff;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .thumbnail-list {
    display: flex;
    gap: 12px;

    .thumbnail {
      width: 80px;
      height: 80px;
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
        border-color: #409eff;
      }
    }
  }
}

.product-info {
  .product-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 12px 0;
  }

  .product-subtitle {
    font-size: 14px;
    color: #909399;
    margin: 0 0 20px 0;
    line-height: 1.6;
  }

  .price-section {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;

    .current-price-wrapper {
      display: flex;
      align-items: baseline;
      gap: 12px;

      .current-price {
        font-size: 32px;
        font-weight: 700;
        color: #f56c6c;
      }

      .original-price {
        font-size: 16px;
        color: #c0c4cc;
        text-decoration: line-through;
      }

      .discount-badge {
        background: #f56c6c;
        color: #fff;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }

  .meta-section {
    display: flex;
    gap: 32px;
    margin-bottom: 20px;

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

  .spec-section,
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
            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);
          }

          &.active {
            background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
            color: #fff;
            border-color: #409eff;
            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
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
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 8px;
    margin-top: 8px;
    border-left: 3px solid #409eff;

    .selected-label {
      color: #606266;
      font-size: 14px;
      font-weight: 500;
    }

    .selected-values {
      color: #409eff;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .quantity-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 24px 0;

    .quantity-label {
      color: #606266;
      font-size: 14px;
    }

    .stock-info {
      color: #909399;
      font-size: 13px;
    }
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-top: 24px;

    .buy-now-btn {
      flex: 1;
      height: 48px;
      font-size: 16px;
      border-radius: 24px;
      background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
      border: none;

      &:hover {
        box-shadow: 0 4px 16px rgba(64, 158, 255, 0.4);
      }
    }

    .add-cart-btn {
      flex: 1;
      height: 48px;
      font-size: 16px;
      border-radius: 24px;

      &:hover {
        background: #ecf5ff;
        color: #409eff;
        border-color: #409eff;
      }
    }

    .favorite-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      font-size: 20px;
    }
  }
}

.product-detail-section {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .detail-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 24px;
    }

    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: 500;

      &.is-active {
        color: #409eff;
      }
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin: 24px 0 16px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  .product-descriptions {
    margin-bottom: 24px;
  }

  .product-intro {
    color: #606266;
    line-height: 1.8;

    p {
      margin-bottom: 12px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 8px 0;
        padding-left: 24px;
        position: relative;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #67c23a;
          font-weight: bold;
        }
      }
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
</style>
