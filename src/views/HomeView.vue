<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 热门推荐轮播 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="6" animated />
      </div>
      <HeroBanner v-else :products="products" @product-click="handleProductClick" />

      <!-- 筛选栏 -->
      <div class="content-container">
        <FilterBar @filter-change="handleFilterChange" />

        <!-- 商品列表 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="10" animated />
        </div>
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
      </div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ChatDotRound, Picture, VideoCamera } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'
import HeroBanner from '../components/HeroBanner.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductList from '../components/ProductList.vue'
import { 
  getHotProducts,
  getFeaturedProducts,
  getNewProducts,
  getProductList,
  searchProducts
} from '../api/modules/product.js'
import { addProductFavorite } from '../stores/favoriteStore'

const router = useRouter()

// 加载状态
const loading = ref(true)

// 商品列表
const products = ref([])

// 筛选条件
const filters = reactive({
  categories: [],
  priceRange: '',
  sortBy: 'default',
  searchQuery: ''
})

// 分页参数
const pageNum = ref(1)
const pageSize = ref(20)

// 加载首页商品数据
const loadHomeProducts = async () => {
  loading.value = true
  try {
    // 获取热卖商品用于轮播图
    const hotRes = await getHotProducts({ limit: 6 })
    if (hotRes.code === 1000 && hotRes.data) {
      // 适配数据结构
      products.value = hotRes.data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.subName || '',
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        images: item.images || {},
        sales: item.soldCount || 0,
        rating: item.rating || 5,
        isHot: item.isHot === 1,
        category: item.categoryName || '',
        categoryId: item.categoryId
      }))
    }
  } catch (error) {
    console.error('加载商品失败:', error)
    ElMessage.error('加载商品失败')
  } finally {
    loading.value = false
  }
}

// 处理搜索
const handleSearch = async (query) => {
  filters.searchQuery = query
  if (!query) {
    // 搜索为空时重新加载默认商品
    await loadHomeProducts()
    return
  }
  
  loading.value = true
  try {
    const res = await searchProducts({
      keyword: query,
      pageNum: 1,
      pageSize: pageSize.value
    })
    
    if (res.code === 1000 && res.data) {
      products.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.subName || '',
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        images: item.images || {},
        sales: item.soldCount || 0,
        rating: item.rating || 5,
        isHot: item.isHot === 1,
        category: item.categoryName || '',
        categoryId: item.categoryId
      }))
      ElMessage.success(`找到 ${res.data.totalElements || 0} 个相关商品`)
    }
  } catch (error) {
    console.error('搜索失败:', error)
    ElMessage.error('搜索失败')
  } finally {
    loading.value = false
  }
}

// 处理筛选变化
const handleFilterChange = async (filterData) => {
  filters.categories = filterData.categories
  filters.priceRange = filterData.priceRange
  filters.sortBy = filterData.sortBy
  
  // 根据筛选条件重新加载商品
  await loadFilteredProducts()
}

// 加载筛选后的商品
const loadFilteredProducts = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
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
    
    const res = await getProductList(params)
    if (res.code === 1000 && res.data) {
      products.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.subName || '',
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        images: item.images || {},
        sales: item.soldCount || 0,
        rating: item.rating || 5,
        isHot: item.isHot === 1,
        category: item.categoryName || '',
        categoryId: item.categoryId
      }))
    }
  } catch (error) {
    console.error('加载筛选商品失败:', error)
    ElMessage.error('加载商品失败')
  } finally {
    loading.value = false
  }
}

// 处理商品点击 - 跳转到商品详情页
const handleProductClick = (product) => {
  router.push(`/product/${product.id}`)
}

// 处理添加到购物车
const handleAddToCart = (product) => {
  console.log('添加到购物车:', product)
  ElMessage.success(`已将 "${product.name}" 加入购物车`)
  // TODO: 调用购物车 API
}

// 处理添加到收藏
const handleAddToFavorite = async (product) => {
  const success = await addProductFavorite(product.id)
  if (success) {
    ElMessage.success(`已将 "${product.name}" 加入收藏`)
  }
}

// 处理购买
const handleBuy = (product) => {
  console.log('立即购买:', product)
  router.push('/cart')
}

// 重置筛选
const handleReset = async () => {
  filters.categories = []
  filters.priceRange = ''
  filters.sortBy = 'default'
  filters.searchQuery = ''
  await loadHomeProducts()
  ElMessage.success('已重置筛选条件')
}

// 初始加载
onMounted(() => {
  loadHomeProducts()
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

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.loading-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
}

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
