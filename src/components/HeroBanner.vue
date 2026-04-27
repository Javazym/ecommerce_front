<template>
  <section class="hero-banner">
    <div class="hero-container">
      <el-carousel :interval="4000" type="card" height="380px" indicator-position="outside" @change="handleCarouselChange">
        <el-carousel-item v-for="item in hotProducts" :key="item.id">
          <div class="hero-card" @click="handleProductClick(item)">
            <div class="hero-image-wrapper">
              <img :src="item.image" :alt="item.name" class="hero-image" />
              <div class="hot-badge">
                <el-icon><Star /></el-icon>
                热门推荐
              </div>
            </div>
            <div class="hero-content">
              <h3 class="hero-title">{{ item.name }}</h3>
              <p class="hero-desc">{{ item.description }}</p>
              <div class="hero-meta">
                <div class="hero-price">
                  <span class="current-price">¥{{ item.price }}</span>
                  <span class="original-price" v-if="item.originalPrice">¥{{ item.originalPrice }}</span>
                </div>
                <div class="hero-rating">
                  <el-rate
                    v-model="item.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  />
                </div>
              </div>
              <div class="hero-sales">已售 {{ item.sales }}+ 件</div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Star } from '@element-plus/icons-vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['product-click'])

const hotProducts = computed(() => {
  return props.products
    .filter(item => item.isHot)
    .slice(0, 6)
})

const handleProductClick = (product) => {
  emit('product-click', product)
}

const handleCarouselChange = (current, prev) => {
  console.log(`Carousel changed from ${prev} to ${current}`)
}
</script>

<style scoped lang="scss">
.hero-banner {
  background: linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%);
  padding: 32px 0;
  margin-bottom: 32px;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(64, 158, 255, 0.25);

    .hero-image {
      transform: scale(1.1);
    }
  }
}

.hero-image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .hot-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
    color: #fff;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  }
}

.hero-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-desc {
  font-size: 12px;
  color: #909399;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}

.hero-price {
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

.hero-rating {
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
}

.hero-sales {
  font-size: 12px;
  color: #909399;
  padding-top: 8px;
  border-top: 1px dashed #ebeef5;
}

:deep(.el-carousel__indicator) {
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #c0c4cc;
  }

  &.is-active .el-carousel__button {
    background: #409eff;
    width: 24px;
    border-radius: 5px;
  }
}

:deep(.el-carousel__item--card) {
  border-radius: 16px;
}
</style>
