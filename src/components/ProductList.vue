<template>
  <section class="product-list">
    <div class="list-header">
      <h3 class="list-title">
        <el-icon><Goods /></el-icon>
        商品列表
        <span class="product-count">(共 {{ filteredProducts.length }} 件商品)</span>
      </h3>
    </div>

    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="handleProductClick"
        @add-to-cart="handleAddToCart"
        @add-to-favorite="handleAddToFavorite"
        @buy="handleBuy"
      />
    </div>

    <el-empty
      v-else
      description="暂无符合条件的商品"
      :image-size="200"
    >
      <template #image>
        <el-icon class="empty-icon"><Box /></el-icon>
      </template>
      <el-button type="primary" @click="handleReset">重置筛选条件</el-button>
    </el-empty>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Goods, Box } from '@element-plus/icons-vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  filters: {
    type: Object,
    default: () => ({
      categories: [],
      priceRange: '',
      sortBy: 'default',
      searchQuery: ''
    })
  }
})

const emit = defineEmits(['product-click', 'add-to-cart', 'add-to-favorite', 'buy', 'reset'])

const filteredProducts = computed(() => {
  let result = [...props.products]

  // 分类筛选
  if (props.filters.categories && props.filters.categories.length > 0) {
    result = result.filter(item => props.filters.categories.includes(item.category))
  }

  // 价格筛选
  if (props.filters.priceRange) {
    const range = props.filters.priceRange
    if (range === '5000+') {
      result = result.filter(item => item.price >= 5000)
    } else if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number)
      result = result.filter(item => item.price >= min && item.price < max)
    }
  }

  // 搜索筛选
  if (props.filters.searchQuery) {
    const query = props.filters.searchQuery.toLowerCase()
    result = result.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  // 排序
  switch (props.filters.sortBy) {
    case 'sales':
      result.sort((a, b) => b.sales - a.sales)
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      // 综合推荐 - 按isHot和sales排序
      result.sort((a, b) => {
        if (a.isHot && !b.isHot) return -1
        if (!a.isHot && b.isHot) return 1
        return b.sales - a.sales
      })
  }

  return result
})

const handleProductClick = (product) => {
  emit('product-click', product)
}

const handleAddToCart = (product) => {
  emit('add-to-cart', product)
}

const handleAddToFavorite = (product) => {
  emit('add-to-favorite', product)
}

const handleBuy = (product) => {
  emit('buy', product)
}

const handleReset = () => {
  emit('reset')
}
</script>

<style scoped lang="scss">
.product-list {
  margin-bottom: 32px;
}

.list-header {
  margin-bottom: 20px;
}

.list-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  .el-icon {
    color: #409eff;
    font-size: 24px;
  }

  .product-count {
    font-size: 14px;
    font-weight: 400;
    color: #909399;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

:deep(.el-empty) {
  padding: 60px 0;

  .empty-icon {
    font-size: 80px;
    color: #dcdfe6;
  }

  .el-empty__description {
    margin-top: 20px;

    p {
      color: #909399;
      font-size: 14px;
    }
  }

  .el-button {
    margin-top: 20px;
    border-radius: 20px;
    padding: 10px 24px;
  }
}
</style>
