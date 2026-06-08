<template>
  <el-card 
    class="product-card" 
    :class="{ 'seckill-card': product.activityType === 1, 'discount-card': product.activityType === 2 }"
    :body-style="{ padding: '0px' }" 
    shadow="hover" 
    @click="handleClick"
  >
    <div class="product-image-wrapper">
      <img :src="product.image || '/placeholder.png'" :alt="product.name" class="product-image" />
      <div class="product-badges">
        <span v-if="product.activityType === 1" class="badge badge-seckill">⚡ 秒杀</span>
        <span v-else-if="product.activityType === 2" class="badge badge-discount-activity">🎫 满减</span>
        <span v-else-if="product.isHot" class="badge badge-hot">HOT</span>
        <span v-if="product.isFeatured" class="badge badge-featured">精选</span>
        <span v-if="discount > 0 && product.activityType !== 1 && !product.hasActivity" class="badge badge-discount">{{ discount }}% OFF</span>
      </div>
      <!-- 秒杀倒计时 -->
      <div v-if="product.activityType === 1 && (product.seckillInfo || product.hasActivity)" class="seckill-countdown">
        <div class="countdown-label">距结束</div>
        <div class="countdown-time">{{ countdownDisplay }}</div>
      </div>
      <div class="product-actions-overlay">
        <el-button
          v-if="product.activityType !== 1"
          circle 
          :icon="ShoppingCart" 
          class="action-btn cart-btn" 
          @click.stop="handleAddToCart" 
        />
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
      
      <!-- 秒杀活动特殊信息 -->
      <div v-if="product.activityType === 1 && (product.seckillInfo || product.hasActivity)" class="seckill-info">
        <div class="seckill-progress">
          <el-progress 
            :percentage="getSeckillProgress(product.seckillInfo || { soldCount: product.soldCount, stock: product.stock })" 
            :stroke-width="6"
            :show-text="false"
            color="#ff4d4f"
          />
          <span class="progress-text">已售 {{ product.seckillInfo?.soldCount || product.soldCount }}/{{ product.seckillInfo?.stock || product.stock }}</span>
        </div>
        <div class="seckill-limit" v-if="product.seckillInfo?.limitPerUser">
          <el-tag size="small" type="danger" effect="plain">
            限购{{ product.seckillInfo.limitPerUser }}件
          </el-tag>
        </div>
      </div>
      
      <!-- 满减活动特殊信息 -->
      <div v-else-if="product.activityType === 2 && product.discountInfo" class="discount-info">
        <div class="discount-detail">
          <span class="discount-tag">满{{ product.discountInfo.conditionValue }}减{{ product.discountInfo.discountAmount }}</span>
          <span v-if="product.discountInfo.maxDiscount" class="max-discount">最高省{{ product.discountInfo.maxDiscount }}</span>
        </div>
      </div>
      
      <!-- 普通商品评分 -->
      <div v-else class="product-rating">
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
          <span v-if="product.activityType === 1" class="current-price seckill-price">
            ¥{{ product.price }}
          </span>
          <span v-else class="current-price">¥{{ product.price }}</span>
          <span v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
            ¥{{ product.originalPrice }}
          </span>
        </div>
        <el-button 
          v-if="product.activityType === 1" 
          type="danger" 
          size="small" 
          class="buy-btn seckill-btn" 
          @click.stop="handleBuy"
        >
          立即抢购
        </el-button>
        <el-button v-else type="primary" size="small" class="buy-btn" @click.stop="handleBuy">
          立即购买
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { addToCart } from '../api/modules/cart.js'
import { useUserStore } from '../stores/userStore.js'

const router = useRouter()
const userStore = useUserStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'add-to-cart', 'add-to-favorite', 'buy'])

// 计算折扣
const discount = computed(() => {
  // 如果有活动价格，不显示折扣徽章
  if (props.product.hasActivity && props.product.activityPrice) {
    return 0
  }
  if (props.product.originalPrice && props.product.originalPrice > props.product.price) {
    return Math.round((1 - props.product.price / props.product.originalPrice) * 100)
  }
  return 0
})

// 检查是否已收藏（使用后端返回的isFavorited字段）
const isFavorited = computed(() => props.product.isFavorited || false)

// 倒计时显示
const countdownDisplay = ref('--:--:--')
let countdownTimer = null

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

// 启动倒计时定时器
const startCountdown = () => {
  // 获取结束时间
  const endTime = props.product.seckillInfo?.endTime || props.product.activityEndTime
  if (!endTime) return
  
  // 立即更新一次
  countdownDisplay.value = formatCountdown(endTime)
  
  // 清除旧定时器
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  
  // 每秒更新
  countdownTimer = setInterval(() => {
    countdownDisplay.value = formatCountdown(endTime)
    
    // 如果已结束，停止定时器
    if (countdownDisplay.value === '已结束') {
      clearInterval(countdownTimer)
    }
  }, 1000)
}

// 组件挂载时启动倒计时
onMounted(() => {
  if (props.product.activityType === 1 && (props.product.seckillInfo || props.product.hasActivity)) {
    startCountdown()
  }
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

// 计算秒杀进度
const getSeckillProgress = (seckillInfo) => {
  if (!seckillInfo || !seckillInfo.stock) return 0
  return Math.min(Math.round((seckillInfo.soldCount / seckillInfo.stock) * 100), 100)
}

const handleClick = () => {
  emit('click', props.product)
}

const handleAddToCart = async () => {
  // 检查用户是否登录
  if (!userStore.isLoggedIn || !userStore.userId) {
    ElMessage.warning('请先登录后再添加购物车')
    router.push('/auth')
    return
  }

  try {
    // 调用 API 添加到购物车
    const res = await addToCart({
      userId: String(userStore.userId),
      productId: props.product.id,
      skuId: props.product.skus?.[0]?.id || props.product.seckillInfo?.skuId || null,
      quantity: 1
    })

    if (res.code === 1000) {
      ElMessage.success('已添加到购物车')
      emit('add-to-cart', props.product)
    } else {
      ElMessage.error(res.message || '添加失败')
    }
  } catch (error) {
    console.error('添加到购物车失败:', error)
    ElMessage.error('添加到购物车失败')
  }
}

const handleAddToFavorite = () => {
  // TODO: 集成收藏 API
  ElMessage.info('收藏功能开发中')
  emit('add-to-favorite', props.product)
}

const handleBuy = () => {
  // 跳转到商品详情页，如果是活动商品则传递 activityId
  if (props.product.activityType === 1 && props.product.activityId) {
    // 秒杀商品跳转到独立的秒杀详情页
    router.push(`/seckill/${props.product.id}`)
  } else {
    router.push(`/product/${props.product.id}`)
  }
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

  // 秒杀卡片特殊样式
  &.seckill-card {
    border: 2px solid #ff4d4f;
    box-shadow: 0 4px 16px rgba(255, 77, 79, 0.15);

    &:hover {
      box-shadow: 0 12px 40px rgba(255, 77, 79, 0.3);
    }

    .product-image-wrapper {
      background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
    }
  }

  // 满减卡片特殊样式
  &.discount-card {
    border: 2px solid #faad14;
    box-shadow: 0 4px 16px rgba(250, 173, 20, 0.15);

    &:hover {
      box-shadow: 0 12px 40px rgba(250, 173, 20, 0.3);
    }

    .product-image-wrapper {
      background: linear-gradient(135deg, #fffbe6 0%, #fff7e6 100%);
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

    .badge-seckill {
      background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
      animation: pulse 2s infinite;
    }

    .badge-discount-activity {
      background: linear-gradient(135deg, #faad14 0%, #ffc53d 100%);
    }
  }

  // 秒杀倒计时
  .seckill-countdown {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    border-radius: 6px;
    padding: 6px 10px;
    color: #fff;
    text-align: center;

    .countdown-label {
      font-size: 10px;
      margin-bottom: 2px;
      opacity: 0.9;
    }

    .countdown-time {
      font-size: 14px;
      font-weight: 700;
      font-family: 'Courier New', monospace;
      letter-spacing: 1px;
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

// 秒杀活动信息
.seckill-info {
  margin-bottom: 12px;

  .seckill-progress {
    margin-bottom: 8px;

    :deep(.el-progress-bar__outer) {
      background-color: #ffe8e8;
    }

    .progress-text {
      display: block;
      font-size: 11px;
      color: #ff4d4f;
      margin-top: 4px;
      text-align: right;
    }
  }

  .seckill-limit {
    display: flex;
    justify-content: flex-end;
  }
}

// 满减活动信息
.discount-info {
  margin-bottom: 12px;

  .discount-detail {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .discount-tag {
      background: linear-gradient(135deg, #fff7e6 0%, #fff1cc 100%);
      color: #fa8c16;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #ffd591;
    }

    .max-discount {
      font-size: 11px;
      color: #faad14;
    }
  }
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

    &.seckill-price {
      font-size: 24px;
      color: #ff4d4f;
      text-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
    }
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

  &.seckill-btn {
    background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
    animation: glow 2s infinite;

    &:hover {
      box-shadow: 0 4px 12px rgba(255, 77, 79, 0.5);
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
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 77, 79, 0.8);
  }
}
</style>
