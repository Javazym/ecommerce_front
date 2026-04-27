<template>
  <div class="favorite-management">
    <h2 class="section-title">收藏管理</h2>

    <el-tabs v-model="activeTab" class="favorite-tabs">
      <!-- 商品收藏 -->
      <el-tab-pane :label="'商品收藏 (' + state.statistics.productCount + ')'" name="products">
        <div class="tab-header">
          <div class="tab-info">
            <span class="count">共 {{ state.statistics.productCount }} 件商品</span>
          </div>
          <div class="tab-actions">
            <el-button
              size="small"
              @click="handleClearProducts"
              :disabled="state.productFavorites.length === 0"
            >
              清空
            </el-button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="3" animated />
        </div>

        <!-- 收藏列表 -->
        <div
          v-else-if="state.productFavorites.length > 0"
          class="favorite-grid"
        >
          <el-card
            v-for="item in state.productFavorites"
            :key="item.id"
            class="favorite-item"
            shadow="hover"
          >
            <div class="item-image" @click="goToProduct(item.productId)">
              <img :src="item.image" :alt="item.name" />
              <div class="image-overlay">
                <el-icon><View /></el-icon>
              </div>
            </div>

            <div class="item-content">
              <h4 class="product-name" @click="goToProduct(item.productId)">{{ item.name }}</h4>
              
              <div class="item-price">
                <span class="current-price">¥{{ item.price }}</span>
                <span v-if="item.originalPrice" class="original-price">
                  ¥{{ item.originalPrice }}
                </span>
              </div>

              <div class="item-meta">
                <span class="merchant-name">{{ item.merchantName }}</span>
              </div>

              <div class="item-actions">
                <el-button type="primary" size="small" @click="handleAddToCart(item)">
                  <el-icon><ShoppingCart /></el-icon>
                  加入购物车
                </el-button>
                <el-button size="small" @click="handleRemoveProduct(item.productId)">
                  取消收藏
                </el-button>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <el-empty description="暂无收藏商品">
            <el-button type="primary" @click="goToHome">去逛逛</el-button>
          </el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, ShoppingCart, Goods, User } from '@element-plus/icons-vue'
import { state, fetchFavorites, removeProductFavorite, clearProductFavorites, getFavoriteCount } from '../../stores/favoriteStore'
import cartStore from '../../stores/cartStore'

const router = useRouter()

// 当前标签
const activeTab = ref('products')

// 加载状态
const loading = ref(false)

// 分页参数
const pageNum = ref(1)
const pageSize = ref(10)

// 加载收藏列表
onMounted(() => {
  loadFavorites()
})

const loadFavorites = async () => {
  loading.value = true
  try {
    await fetchFavorites({
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
    // 获取收藏数量
    await getFavoriteCount()
  } finally {
    loading.value = false
  }
}

// 格式化数字
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}

// 跳转商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// 跳转首页
const goToHome = () => {
  router.push('/')
}

// 跳转店铺
const goToStore = (merchantId) => {
  router.push(`/merchant/${merchantId}`)
}

// 加入购物车
const handleAddToCart = (item) => {
  if (cartStore) {
    cartStore.addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    })
    ElMessage.success(`已将 ${item.name} 添加到购物车`)
  } else {
    ElMessage.success(`已将 ${item.name} 添加到购物车`)
  }
}

// 移除商品收藏
const handleRemoveProduct = async (productId) => {
  await removeProductFavorite(productId)
  // 重新加载列表
  await loadFavorites()
}

// 清空商品收藏
const handleClearProducts = async () => {
  try {
    await ElMessageBox.confirm('确定要清空所有收藏吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await clearProductFavorites()
    // 重新加载列表
    await loadFavorites()
  } catch (error) {
    // 用户取消
  }
}


</script>

<style scoped lang="scss">
.favorite-management {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .favorite-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }
  }

  .tab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .count {
      color: #909399;
      font-size: 14px;
    }
  }

  .loading-container {
    padding: 20px 0;
  }

  .favorite-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .favorite-item {
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }

    :deep(.el-card__body) {
      padding: 0;
    }

    .item-image {
      position: relative;
      width: 100%;
      height: 280px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;

        .el-icon {
          font-size: 40px;
          color: #fff;
        }
      }

      &:hover .image-overlay {
        opacity: 1;
      }
    }

    .item-content {
      padding: 16px;

      .product-name {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.5;
        min-height: 42px;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #409eff;
        }
      }

      .item-price {
        margin-bottom: 12px;
        display: flex;
        align-items: baseline;
        gap: 8px;

        .current-price {
          font-size: 20px;
          font-weight: 700;
          color: #f56c6c;
        }

        .original-price {
          font-size: 13px;
          color: #c0c4cc;
          text-decoration: line-through;
        }
      }

      .item-meta {
        margin-bottom: 16px;

        .merchant-name {
          font-size: 12px;
          color: #909399;
        }
      }

      .item-actions {
        display: flex;
        gap: 8px;

        .el-button {
          flex: 1;
        }
      }
    }
  }

  .store-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .store-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #ebeef5;
    transition: all 0.3s ease;

    &:hover {
      border-color: #409eff;
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
    }

    .store-banner {
      position: relative;
      height: 100px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .banner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
      }
    }

    .store-content {
      position: relative;
      padding: 0 16px 16px;

      .store-logo {
        position: absolute;
        top: -30px;
        left: 16px;
        width: 60px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        border: 3px solid #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .store-info {
        margin-top: 40px;

        .store-name {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }

        .store-desc {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #909399;
        }

        .store-stats {
          display: flex;
          gap: 16px;

          .stat-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: #909399;

            .el-icon {
              font-size: 14px;
            }
          }
        }
      }

      .store-actions {
        margin-top: 12px;
        display: flex;
        gap: 8px;
      }
    }
  }

  .empty-state {
    padding: 60px 0;
    text-align: center;
  }
}
</style>
