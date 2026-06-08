<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部区域:轮播 + 公告 -->
      <section class="hero-section">
        <div class="hero-container">
          <!-- 左侧:轮播图 -->
          <div class="hero-banner">
            <div v-if="loading" class="skeleton-banner">
              <el-skeleton :rows="6" animated />
            </div>
            <HeroBanner v-else :products="hotProducts" @product-click="handleProductClick" />
          </div>

          <!-- 右侧:快速入口 -->
          <div class="quick-access">
            <div class="access-card" @click="handleActivityFilter('seckill')">
              <div class="access-icon seckill-icon">⚡</div>
              <div class="access-info">
                <h4>限时秒杀</h4>
                <p>超值低价抢购</p>
              </div>
            </div>
            <div class="access-card" @click="handleActivityFilter('discount')">
              <div class="access-icon discount-icon">🎫</div>
              <div class="access-info">
                <h4>满减优惠</h4>
                <p>满额立减优惠</p>
              </div>
            </div>
            <div class="access-card" @click="handleCategoryClick">
              <div class="access-icon category-icon">📦</div>
              <div class="access-info">
                <h4>商品分类</h4>
                <p>浏览全部品类</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 活动横幅 -->
      <section v-if="currentActivity" class="activity-banner" :class="currentActivity.type">
        <div class="banner-content">
          <div class="banner-left">
            <span class="banner-icon">{{ currentActivity.icon }}</span>
            <div class="banner-text">
              <h3>{{ currentActivity.title }}</h3>
              <p>{{ currentActivity.description }}</p>
            </div>
          </div>
          <el-button type="primary" plain @click="clearActivityFilter">
            查看全部商品
          </el-button>
        </div>
      </section>

      <!-- 筛选栏 -->
      <section class="filter-section">
        <div class="filter-container">
          <FilterBar @filter-change="handleFilterChange" />
        </div>
      </section>

      <!-- 商品列表区域 -->
      <section class="products-section">
        <div class="section-header">
          <h2 class="section-title">
            <span v-if="filters.activityType === 1">⚡ 限时秒杀</span>
            <span v-else-if="filters.activityType === 2">🎫 满减优惠</span>
            <span v-else>🔥 热门推荐</span>
          </h2>
          <span class="section-count">共 {{ totalElements }} 件商品</span>
        </div>

        <div class="products-container">
          <!-- 加载中 -->
          <div v-if="loading && products.length === 0" class="loading-state">
            <el-skeleton :rows="8" animated />
          </div>

          <!-- 空状态 -->
          <el-empty v-else-if="!loading && products.length === 0" description="暂无商品" />

          <!-- 商品列表 -->
          <ProductList
            v-else
            :products="products"
            :filters="filters"
            @product-click="handleProductClick"
            @add-to-cart="handleAddToCart"
            @add-to-favorite="handleAddToFavorite"
            @buy="handleBuy"
            @reset="handleReset"
          />

          <!-- 加载更多提示 -->
          <div v-if="loadingMore" class="loading-more">
            <el-icon class="is-loading"><Loading /></el-icon>
            <span>加载中...</span>
          </div>

          <div v-else-if="!hasMore && products.length > 0" class="no-more">
            <span>—— 已经到底了 ——</span>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h4 class="footer-title">关于我们</h4>
            <ul class="footer-links">
              <li><a href="#">公司简介</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">隐私政策</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">客户服务</h4>
            <ul class="footer-links">
              <li><a href="#">帮助中心</a></li>
              <li><a href="#">配送说明</a></li>
              <li><a href="#">退换货政策</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">关注我们</h4>
            <div class="social-icons">
              <el-icon><ChatDotRound /></el-icon>
              <el-icon><Picture /></el-icon>
              <el-icon><VideoCamera /></el-icon>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 云商城. All rights reserved. | 粤ICP备xxxxxxxx号</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ChatDotRound, Picture, VideoCamera, Loading } from '@element-plus/icons-vue'
import NavBar from '../../components/NavBar.vue'
import HeroBanner from '../../components/HeroBanner.vue'
import FilterBar from '../../components/FilterBar.vue'
import ProductList from '../../components/ProductList.vue'
import {
  getHotProducts,
  getProductList,
  searchProducts
} from '../../api/modules/product.js'
import { addProductFavorite } from '../../stores/favoriteStore.js'
import { getActiveSeckillList, getActiveDiscountList } from '../../api/modules/marketing.js'

const router = useRouter()

// ========== 常量定义 ==========
const PAGE_SIZE = 20
const SCROLL_THRESHOLD = 100 // 滚动加载阈值(px)
const ACTIVITY_TYPES = {
  ALL: 0,
  SECKILL: 1,
  DISCOUNT: 2
}

// ========== 响应式状态 ==========
const loading = ref(true)
const loadingMore = ref(false)
const products = shallowRef([]) // 使用 shallowRef 优化大数组性能
const hotProducts = ref([])

// 筛选条件
const filters = reactive({
  categories: [],
  priceRange: '',
  sortBy: 'default',
  searchQuery: '',
  activityType: ACTIVITY_TYPES.ALL
})

// 分页参数
const pageNum = ref(1)
const hasMore = ref(true)
const totalElements = ref(0)

// ========== 计算属性 ==========
const currentActivity = computed(() => {
  const activityMap = {
    [ACTIVITY_TYPES.SECKILL]: {
      type: 'seckill',
      icon: '⚡',
      title: '限时秒杀进行中',
      description: '超值低价,数量有限,先到先得!'
    },
    [ACTIVITY_TYPES.DISCOUNT]: {
      type: 'discount',
      icon: '🎫',
      title: '满减优惠活动',
      description: '满足条件即可享受优惠,多买多省!'
    }
  }
  return activityMap[filters.activityType] || null
})

// ========== 工具函数 ==========
/**
 * 标准化商品数据格式
 */
const normalizeProduct = (item, options = {}) => {
  const { isSeckill = false, isDiscount = false } = options

  if (isSeckill) {
    return {
      id: item.productId,
      activityId: item.id,
      name: item.productName || item.name,
      description: item.productSubName || '',
      price: item.seckillPrice,
      originalPrice: item.productPrice || item.originalPrice,
      image: item.productImage || '',
      images: {},
      sales: item.productSoldCount || item.soldCount || 0,
      rating: item.productRating || 5,
      isHot: false,
      isFeatured: false,
      category: '',
      categoryId: null,
      isFavorited: false,
      activityType: ACTIVITY_TYPES.SECKILL,
      activityName: item.name,
      seckillInfo: {
        stock: item.stock,
        soldCount: item.soldCount,
        limitPerUser: item.limitPerUser,
        startTime: item.startTime,
        endTime: item.endTime,
        merchantId: item.merchantId,
        skuId: item.skuId,
        sort: item.sort
      }
    }
  }

  if (isDiscount) {
    return {
      id: null,
      activityId: item.id,
      name: `【满减】${item.name}`,
      description: item.description || `${item.conditionValue >= 0 ? '满' + item.conditionValue : '无门槛'}减${item.discountAmount}`,
      price: 0,
      originalPrice: 0,
      image: '',
      images: {},
      sales: item.usedCount || 0,
      rating: 5,
      isHot: false,
      category: '',
      categoryId: null,
      isFavorited: false,
      activityType: ACTIVITY_TYPES.DISCOUNT,
      discountInfo: {
        discountType: item.discountType,
        conditionValue: item.conditionValue,
        discountAmount: item.discountAmount,
        maxDiscount: item.maxDiscount,
        scopeType: item.scopeType,
        scopeIds: item.scopeIds,
        startTime: item.startTime,
        endTime: item.endTime
      }
    }
  }

  // 普通商品
  return {
    id: item.id,
    name: item.name,
    description: item.subName || '',
    price: item.hasActivity && item.activityPrice ? item.activityPrice : item.price,
    originalPrice: item.originalPrice,
    image: item.image,
    images: item.images || {},
    sales: item.soldCount || 0,
    rating: item.rating || 5,
    isHot: item.isHot === 1,
    isFeatured: item.isFeatured === 1,
    category: item.categoryName || '',
    categoryId: item.categoryId,
    isFavorited: item.isFavorited || false,
    activityType: item.hasActivity ? item.activityType : 0,
    activityId: item.hasActivity ? item.activityId : null,
    activityName: item.hasActivity ? item.activityName : null,
    seckillInfo: item.hasActivity && item.activityType === 1 ? {
      stock: item.stock,
      soldCount: item.soldCount,
      startTime: item.activityStartTime,
      endTime: item.activityEndTime,
      merchantId: item.merchantId
    } : null
  }
}

/**
 * 重置筛选条件
 */
const resetFilters = () => {
  filters.categories = []
  filters.priceRange = ''
  filters.sortBy = 'default'
  filters.searchQuery = ''
  filters.activityType = ACTIVITY_TYPES.ALL
  pageNum.value = 1
  hasMore.value = true
}

// ========== 数据加载函数 ==========
/**
 * 加载首页商品数据(总入口)
 */
const loadHomeProducts = async (isLoadMore = false) => {
  try {
    if (!isLoadMore) {
      loading.value = true
      pageNum.value = 1
      hasMore.value = true
    } else {
      loadingMore.value = true
    }

    // 首次加载且无活动时,获取热卖商品用于轮播图
    if (!isLoadMore && filters.activityType === ACTIVITY_TYPES.ALL) {
      await loadHotProductsForBanner()
    }

    // 根据活动类型加载不同的数据
    const loaders = {
      [ACTIVITY_TYPES.SECKILL]: loadSeckillProducts,
      [ACTIVITY_TYPES.DISCOUNT]: loadDiscountProducts,
      [ACTIVITY_TYPES.ALL]: loadNormalProducts
    }

    await loaders[filters.activityType](isLoadMore)
  } catch (error) {
    console.error('加载商品失败:', error)
    ElMessage.error('加载商品失败')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

/**
 * 加载轮播图热卖商品
 */
const loadHotProductsForBanner = async () => {
  try {
    const hotRes = await getHotProducts({ limit: 6 })
    if (hotRes.code === 1000 && hotRes.data) {
      hotProducts.value = hotRes.data.map(item => normalizeProduct(item))
    }
  } catch (error) {
    console.error('加载热卖商品失败:', error)
  }
}

/**
 * 加载普通商品
 */
const loadNormalProducts = async (isLoadMore) => {
  const params = {
    pageNum: pageNum.value,
    pageSize: PAGE_SIZE,
    sortField: 'createdAt',
    sortOrder: 'desc'
  }

  const res = await getProductList(params)
  if (res.code === 1000 && res.data) {
    const newProducts = (res.data.content || []).map(item => normalizeProduct(item))
    updateProductList(newProducts, isLoadMore)
    updatePagination(res.data.totalElements || 0)
  }
}

/**
 * 加载秒杀活动商品
 */
const loadSeckillProducts = async (isLoadMore) => {
  const params = {
    pageNum: pageNum.value,
    pageSize: PAGE_SIZE
  }

  const res = await getActiveSeckillList(params)
  if (res.code === 1000 && res.data) {
    const newProducts = (res.data.content || []).map(item => normalizeProduct(item, { isSeckill: true }))
    updateProductList(newProducts, isLoadMore)
    updatePagination(res.data.totalElements || 0)
  }
}

/**
 * 加载满减活动商品
 */
const loadDiscountProducts = async (isLoadMore) => {
  const params = {
    pageNum: pageNum.value,
    pageSize: PAGE_SIZE
  }

  const res = await getActiveDiscountList(params)
  if (res.code === 1000 && res.data) {
    const newProducts = (res.data.content || []).map(item => normalizeProduct(item, { isDiscount: true }))
    updateProductList(newProducts, isLoadMore)
    updatePagination(res.data.totalElements || 0)
  }
}

/**
 * 更新商品列表
 */
const updateProductList = (newProducts, isLoadMore) => {
  if (isLoadMore) {
    products.value = [...products.value, ...newProducts]
  } else {
    products.value = newProducts
  }
}

/**
 * 更新分页状态
 */
const updatePagination = (total) => {
  totalElements.value = total
  hasMore.value = products.value.length < total
}

// ========== 事件处理函数 ==========
/**
 * 处理快速入口点击 - 切换活动类型
 */
const handleActivityFilter = (type) => {
  resetFilters()
  filters.activityType = type === 'seckill' ? ACTIVITY_TYPES.SECKILL : ACTIVITY_TYPES.DISCOUNT
  loadHomeProducts(false)

  // 平滑滚动到商品区域
  setTimeout(() => {
    document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

/**
 * 清除活动筛选,显示全部商品
 */
const clearActivityFilter = () => {
  resetFilters()
  loadHomeProducts(false)
}

/**
 * 处理分类点击
 */
const handleCategoryClick = () => {
  ElMessage.info('分类功能开发中')
  // TODO: 跳转到分类页面或展开分类面板
}

/**
 * 处理搜索
 */
const handleSearch = async (query) => {
  filters.searchQuery = query
  pageNum.value = 1
  hasMore.value = true

  if (!query) {
    await loadHomeProducts(false)
    return
  }

  loading.value = true
  try {
    const res = await searchProducts({
      keyword: query,
      pageNum: 1,
      pageSize: PAGE_SIZE
    })

    if (res.code === 1000 && res.data) {
      products.value = (res.data.content || []).map(item => normalizeProduct(item))
      totalElements.value = res.data.totalElements || 0
      hasMore.value = products.value.length < totalElements.value
      ElMessage.success(`找到 ${totalElements.value} 个相关商品`)
    }
  } catch (error) {
    console.error('搜索失败:', error)
    ElMessage.error('搜索失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理筛选条件变化
 */
const handleFilterChange = async (filterData) => {
  filters.categories = filterData.categories
  filters.priceRange = filterData.priceRange
  filters.sortBy = filterData.sortBy
  filters.activityType = filterData.activityType !== undefined ? filterData.activityType : ACTIVITY_TYPES.ALL
  pageNum.value = 1
  hasMore.value = true

  // 根据是否有活动类型决定加载方式
  if (filters.activityType > 0) {
    await loadHomeProducts(false)
  } else {
    await loadFilteredProducts(false)
  }
}

/**
 * 加载筛选后的商品
 */
const loadFilteredProducts = async (isLoadMore = false) => {
  if (!isLoadMore) {
    loading.value = true
    pageNum.value = 1
    hasMore.value = true
  } else {
    loadingMore.value = true
  }

  try {
    const params = buildFilterParams()
    const res = await getProductList(params)

    if (res.code === 1000 && res.data) {
      const newProducts = (res.data.content || []).map(item => normalizeProduct(item))
      updateProductList(newProducts, isLoadMore)
      updatePagination(res.data.totalElements || 0)
    }
  } catch (error) {
    console.error('加载筛选商品失败:', error)
    ElMessage.error('加载商品失败')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

/**
 * 构建筛选参数
 */
const buildFilterParams = () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: PAGE_SIZE,
    categoryId: filters.categories.length > 0 ? filters.categories[0] : undefined,
    sortField: filters.sortBy !== 'default' ? filters.sortBy : undefined,
    sortOrder: filters.sortBy !== 'default' ? 'desc' : undefined
  }

  // 处理价格区间
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number)
    params.minPrice = min
    if (max) params.maxPrice = max
  }

  // 处理活动类型标签
  const activityTags = {
    [ACTIVITY_TYPES.SECKILL]: '秒杀',
    [ACTIVITY_TYPES.DISCOUNT]: '满减'
  }
  if (activityTags[filters.activityType]) {
    params.tags = activityTags[filters.activityType]
  }

  return params
}

/**
 * 处理商品点击 - 跳转到商品详情页
 */
const handleProductClick = (product) => {
  // 如果是秒杀商品,跳转到独立的秒杀详情页
  if (product.activityType === ACTIVITY_TYPES.SECKILL && product.activityId) {
    router.push(`/seckill/${product.id}`)
  } else {
    // 普通商品跳转到普通详情页
    router.push(`/product/${product.id}`)
  }
}

/**
 * 处理添加到购物车
 */
const handleAddToCart = (product) => {
  console.log('添加到购物车:', product)
  ElMessage.success(`已将 "${product.name}" 加入购物车`)
  // TODO: 调用购物车 API
}

/**
 * 处理添加到收藏
 */
const handleAddToFavorite = async (product) => {
  const success = await addProductFavorite(product.id)
  if (success) {
    ElMessage.success(`已将 "${product.name}" 加入收藏`)
    // 更新本地商品列表中的收藏状态
    const targetProduct = products.value.find(p => p.id === product.id)
    if (targetProduct) {
      targetProduct.isFavorited = true
    }
  }
}

/**
 * 处理立即购买
 */
const handleBuy = (product) => {
  console.log('立即购买:', product)
  router.push('/cart')
}

/**
 * 重置所有筛选条件
 */
const handleReset = async () => {
  resetFilters()
  await loadHomeProducts(false)
  ElMessage.success('已重置筛选条件')
}
// ========== 滚动加载 ==========
/**
 * 滚动事件处理 - 无限滚动加载
 */
const handleScroll = async () => {
  // 如果正在加载或没有更多数据,则不执行
  if (loadingMore.value || !hasMore.value) return

  // 计算滚动位置
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // 当滚动到距离底部阈值时触发加载
  if (scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD) {
    pageNum.value++

    // 根据当前状态决定调用哪个加载函数
    if (filters.searchQuery) {
      await handleSearch(filters.searchQuery)
    } else if (filters.activityType === ACTIVITY_TYPES.SECKILL || filters.activityType === ACTIVITY_TYPES.DISCOUNT) {
      await loadHomeProducts(true)
    } else if (filters.categories.length > 0 || filters.priceRange || filters.sortBy !== 'default') {
      await loadFilteredProducts(true)
    } else {
      await loadHomeProducts(true)
    }
  }
}

// ========== 生命周期 ==========
onMounted(() => {
  loadHomeProducts(false)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  padding-bottom: 40px;
}

// ========== 顶部区域 ==========
.hero-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 24px 0;
  margin-bottom: 24px;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.hero-banner {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  .skeleton-banner {
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    padding: 24px;
    border-radius: 12px;
  }
}

.quick-access {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .access-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      background: #fff;
    }

    .access-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }

    .seckill-icon {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
    }

    .discount-icon {
      background: linear-gradient(135deg, #faad14 0%, #ffc53d 100%);
    }

    .category-icon {
      background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
    }

    .access-info {
      flex: 1;

      h4 {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 4px 0;
      }

      p {
        font-size: 12px;
        color: #909399;
        margin: 0;
      }
    }
  }
}

// ========== 活动横幅 ==========
.activity-banner {
  max-width: 1400px;
  margin: 0 auto 24px;
  padding: 0 24px;

  .banner-content {
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .banner-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .banner-icon {
        font-size: 36px;
      }

      .banner-text {
        h3 {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: #909399;
          margin: 0;
        }
      }
    }
  }

  &.seckill {
    .banner-content {
      border-left: 4px solid #ff4d4f;
      background: linear-gradient(135deg, #fff1f0 0%, #fff 100%);
    }
  }

  &.discount {
    .banner-content {
      border-left: 4px solid #faad14;
      background: linear-gradient(135deg, #fffbe6 0%, #fff 100%);
    }
  }
}

// ========== 筛选栏 ==========
.filter-section {
  max-width: 1400px;
  margin: 0 auto 24px;
  padding: 0 24px;
}

.filter-container {
  background: #fff;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

// ========== 商品列表区域 ==========
.products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e8e8e8;

  .section-title {
    font-size: 24px;
    font-weight: 700;
    color: #303133;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-count {
    font-size: 14px;
    color: #909399;
  }
}

.products-container {
  min-height: 400px;
}

.loading-state {
  padding: 40px 24px;
  background: #fff;
  border-radius: 12px;
}

.loading-more,
.no-more {
  padding: 24px 0;
  text-align: center;
  color: #909399;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .el-icon {
    font-size: 18px;
  }
}

// ========== 页脚 ==========
.footer {
  background: #2c3e50;
  color: #fff;
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.footer-section {
  .footer-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #fff;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        color: #b0bec5;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.3s ease;

        &:hover {
          color: #409eff;
        }
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 16px;

    .el-icon {
      font-size: 24px;
      color: #b0bec5;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #409eff;
        transform: scale(1.2);
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #3d5a73;

  p {
    margin: 0;
    font-size: 12px;
    color: #78909c;
  }
}
</style>
