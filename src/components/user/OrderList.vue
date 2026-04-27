<template>
  <div class="order-list">
    <!-- 空状态 -->
    <div v-if="orders.length === 0" class="empty-orders">
      <el-empty description="暂无相关订单" />
    </div>

    <!-- 订单列表 -->
    <div v-else class="orders-container">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <!-- 订单头部 -->
        <div class="order-header">
          <div class="order-info">
            <span class="order-no">订单号：{{ order.orderNo }}</span>
            <span class="order-time">{{ formatTime(order.createdAt) }}</span>
          </div>
          <div class="order-status">
            <el-tag :type="getStatusType(order.status)" size="small">
              {{ order.statusText || getStatusText(order.status) }}
            </el-tag>
          </div>
        </div>

        <!-- 订单商品 -->
        <div class="order-products">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="order-item"
            @click="goToProduct(item.productId)"
          >
            <img :src="item.productImage" :alt="item.productName" class="item-image" />
            <div class="item-info">
              <h4 class="item-name">{{ item.productName }}</h4>
              <p class="item-desc" v-if="item.skuSpecs">{{ item.skuSpecs }}</p>
            </div>
            <div class="item-price">¥{{ item.productPrice }}</div>
            <div class="item-quantity">x{{ item.quantity }}</div>
          </div>
        </div>

        <!-- 订单底部 -->
        <div class="order-footer">
          <div class="order-summary">
            <div class="summary-item">
              <span class="label">商品总价：</span>
              <span class="value">¥{{ order.totalAmount }}</span>
            </div>
            <div class="summary-item" v-if="order.discountAmount > 0">
              <span class="label">优惠：</span>
              <span class="value discount">-¥{{ order.discountAmount }}</span>
            </div>
            <div class="summary-item" v-if="order.couponAmount > 0">
              <span class="label">优惠券：</span>
              <span class="value discount">-¥{{ order.couponAmount }}</span>
            </div>
            <div class="summary-item total">
              <span class="label">实付金额：</span>
              <span class="value pay">¥{{ order.payAmount }}</span>
            </div>
          </div>

          <div class="order-actions">
            <!-- 待付款 -->
            <template v-if="order.status === 0">
              <el-button type="primary" size="small" @click="handleAction('pay', order)">
                去支付
              </el-button>
              <el-button size="small" @click="handleAction('cancel', order)">取消订单</el-button>
            </template>

            <!-- 待发货 -->
            <template v-if="order.status === 1">
              <el-button size="small" @click="handleAction('cancel', order)">取消订单</el-button>
              <el-button size="small" type="info" disabled>等待发货</el-button>
            </template>

            <!-- 待收货 -->
            <template v-if="order.status === 2">
              <el-button
                size="small"
                type="primary"
                @click="handleAction('logistics', order)"
              >
                查看物流
              </el-button>
              <el-button size="small" @click="handleAction('confirm', order)">
                确认收货
              </el-button>
            </template>

            <!-- 已完成 -->
            <template v-if="order.status === 3">
              <el-button size="small" @click="handleAction('review', order)">
                评价
              </el-button>
              <el-button size="small" @click="handleAction('refund', order)">
                申请售后
              </el-button>
              <el-button size="small" type="danger" plain @click="handleAction('delete', order)">
                删除订单
              </el-button>
            </template>

            <!-- 已取消 -->
            <template v-if="order.status === 4">
              <el-button size="small" type="danger" plain @click="handleAction('delete', order)">
                删除订单
              </el-button>
            </template>

            <!-- 通用 -->
            <el-button size="small" @click="goToOrderDetail(order.id)">订单详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['action'])

const router = useRouter()

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  // 假设后端返回的是 "yyyy-MM-dd HH:mm:ss" 格式
  return timeStr
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    0: '待付款',
    1: '待发货',
    2: '待收货',
    3: '已完成',
    4: '已取消'
  }
  return textMap[status] || '未知状态'
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning', // 待付款
    1: 'primary', // 待发货
    2: 'success', // 待收货
    3: 'info', // 已完成
    4: 'info' // 已取消
  }
  return typeMap[status] || 'info'
}

// 处理操作
const handleAction = (action, order) => {
  emit('action', action, order)
}

// 跳转商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// 跳转订单详情
const goToOrderDetail = (orderId) => {
  router.push(`/order/${orderId}`)
}
</script>

<style scoped lang="scss">
.order-list {
  .empty-orders {
    padding: 60px 0;
    text-align: center;
  }

  .orders-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .order-card {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #ebeef5;

    .order-info {
      display: flex;
      gap: 16px;
      align-items: center;

      .order-no {
        color: #303133;
        font-weight: 500;
      }

      .order-time {
        color: #909399;
        font-size: 13px;
      }
    }
  }

  .order-products {
    padding: 16px;
  }

  .order-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px dashed #ebeef5;
    cursor: pointer;
    transition: background 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fafafa;
      padding-left: 8px;
      padding-right: 8px;
      margin-left: -8px;
      margin-right: -8px;
      border-radius: 4px;
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .item-info {
      flex: 1;
      min-width: 0;

      .item-name {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-desc {
        margin: 0;
        font-size: 12px;
        color: #909399;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .item-price {
      font-size: 14px;
      font-weight: 500;
      color: #f56c6c;
      min-width: 80px;
      text-align: right;
    }

    .item-quantity {
      font-size: 13px;
      color: #909399;
      min-width: 40px;
      text-align: right;
    }
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 12px 16px;
    background: #fafafa;
    border-top: 1px solid #ebeef5;

    .order-summary {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .summary-item {
        display: flex;
        gap: 8px;
        font-size: 13px;

        .label {
          color: #909399;
        }

        .value {
          color: #606266;
        }

        .discount {
          color: #67c23a;
        }

        .pay {
          font-size: 18px;
          font-weight: 700;
          color: #f56c6c;
        }

        &.total {
          margin-top: 4px;
        }
      }
    }

    .order-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  }
}
</style>