<template>
  <el-card class="product-card" :body-style="{ padding: '0px' }" shadow="hover" @click="handleClick">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-badges">
        <span v-if="product.isHot" class="badge badge-hot">HOT</span>
        <span v-if="product.isFeatured" class="badge badge-featured">精选</span>
        <span v-if="discount > 0" class="badge badge-discount">{{ discount }}% OFF</span>
      </div>
      <div class="product-actions-overlay">
        <el-button circle :icon="ShoppingCart" class="action-btn cart-btn" @click.stop="handleAddToCart" />
        <el-button
          circle
          :icon="isFavorited ? StarFilled : Star"
          class="action-btn favorite-btn"
          :class="{ 'is-favorited': isFavorited }"
          @click.stop="handleAddToFavorite"
        />
      </div>
    </div>
    <div class="product-content">
      <h4 class="product-title">{{ product.name }}</h4>
      <p class="product-desc">{{ product.description }}</p>
      <div class="product-rating">
        <el-rate
          v-model="product.rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          size="small"
        />
        <span class="sales-count">销量 {{ product.sales }}+</span>
      </div>
      <div class="product-footer">
        <div class="product-price">
          <span class="current-price">¥{{ product.price }}</span>
          <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
        </div>
        <el-button type="primary" size="small" class="buy-btn" @click.stop="handleBuy">
          立即购买
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingCart, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { isFavorite, toggleFavorite } from '../data/store.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'add-to-cart', 'add-to-favorite', 'buy'])

// 计算折扣
const discount = computed(() => {
  if (props.product.originalPrice && props.product.originalPrice > props.product.price) {
    return Math.round((1 - props.product.price / props.product.originalPrice) * 100)
  }
  return 0
})

// 检查是否已收藏
const isFavorited = computed(() => isFavorite(props.product.id))

const handleClick = () => {
  emit('click', props.product)
}

const handleAddToCart = () => {
  ElMessage.success('已添加到购物车')
  emit('add-to-cart', props.product)
}

const handleAddToFavorite = () => {
  const added = toggleFavorite(props.product)
  if (added) {
    ElMessage.success('已添加到收藏')
  } else {
    ElMessage.success('已取消收藏')
  }
  emit('add-to-favorite', props.product)
}

const handleBuy = () => {
  ElMessage.success('正在跳转到购买页面')
  emit('buy', props.product)
}
</script>

<style scoped lang="scss">
.product-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #ffffff;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(64, 158, 255, 0.2);

    .product-actions-overlay {
      opacity: 1;
      transform: translateY(0);
    }

    .product-image {
      transform: scale(1.1);
    }
  }
}

.product-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #f5f7fa;

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .product-badges {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
    }

    .badge-hot {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
    }

    .badge-featured {
      background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    }

    .badge-discount {
      background: linear-gradient(135deg, #f56c6c 0%, #e6a23c 100%);
    }
  }

  .product-actions-overlay {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;

    .action-btn {
      width: 36px;
      height: 36px;
      border: none;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: scale(1.1);
      }

      &.cart-btn {
        color: #409eff;
      }

      &.favorite-btn {
        color: #909399;

        &.is-favorited, &:hover {
          color: #f56c6c;
        }
      }
    }
  }
}

.product-content {
  padding: 16px;
}

.product-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;

  &:hover {
    color: #409eff;
  }
}

.product-desc {
  font-size: 12px;
  color: #909399;
  margin: 0 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  :deep(.el-rate) {
    height: auto;

    .el-rate__icon {
      font-size: 12px;
      margin-right: 1px;
    }

    .el-rate__text {
      font-size: 12px;
    }
  }

  .sales-count {
    font-size: 12px;
    color: #909399;
  }
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px dashed #ebeef5;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;

  .current-price {
    font-size: 20px;
    font-weight: 700;
    color: #f56c6c;
  }

  .original-price {
    font-size: 12px;
    color: #c0c4cc;
    text-decoration: line-through;
  }
}

.buy-btn {
  border-radius: 20px;
  padding: 8px 20px;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  }
}
</style>
