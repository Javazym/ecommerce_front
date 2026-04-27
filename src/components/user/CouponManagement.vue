<template>
  <div class="coupon-management">
    <h2 class="section-title">优惠券管理</h2>

    <el-tabs v-model="activeTab" class="coupon-tabs">
      <!-- 可用优惠券 -->
      <el-tab-pane label="可用优惠券" name="available">
        <div class="tab-header">
          <div class="tab-info">
            <span class="count">共 {{ state.statistics.available }} 张可用优惠券</span>
          </div>
          <div class="tab-actions">
            <el-button size="small" @click="openClaimDialog">
              <el-icon><Plus /></el-icon>
              领取优惠券
            </el-button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="3" animated />
        </div>

        <div v-else-if="availableCoupons.length > 0" class="coupon-list">
          <div
            v-for="coupon in availableCoupons"
            :key="coupon.id"
            class="coupon-card"
          >
            <div class="coupon-left">
              <div class="coupon-value">
                <span class="currency">¥</span>
                <span class="amount">{{ coupon.value }}</span>
              </div>
              <div class="coupon-condition">满{{ coupon.minAmount }}可用</div>
            </div>

            <div class="coupon-right">
              <div class="coupon-header">
                <span class="coupon-name">{{ coupon.name }}</span>
                <el-tag v-if="coupon.maxDiscount" type="info" size="small">
                  最高减{{ coupon.maxDiscount }}元
                </el-tag>
              </div>
              <div class="coupon-desc">{{ coupon.description || '无使用限制' }}</div>
              <div class="coupon-expire">
                <el-icon><Clock /></el-icon>
                有效期至：{{ formatDate(coupon.expireTime) }}
              </div>
              <div class="coupon-actions">
                <el-button size="small" type="primary" @click="handleUseCoupon(coupon)">
                  立即使用
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <el-empty description="暂无可用优惠券">
            <el-button type="primary" @click="openClaimDialog">去领取</el-button>
          </el-empty>
        </div>
      </el-tab-pane>

      <!-- 已使用 -->
      <el-tab-pane :label="'已使用 (' + state.statistics.used + ')'" name="used">
        <div class="coupon-list" v-if="usedCoupons.length > 0">
          <div
            v-for="coupon in usedCoupons"
            :key="coupon.id"
            class="coupon-card used"
          >
            <div class="coupon-left">
              <div class="coupon-value">
                <span class="currency">¥</span>
                <span class="amount">{{ coupon.value }}</span>
              </div>
              <div class="coupon-condition">满{{ coupon.minAmount }}可用</div>
            </div>

            <div class="coupon-right">
              <div class="coupon-header">
                <span class="coupon-name">{{ coupon.name }}</span>
              </div>
              <div class="coupon-desc">{{ coupon.description || '无使用限制' }}</div>
              <div class="coupon-expire">
                <el-icon><CircleCheck /></el-icon>
                已使用
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <el-empty description="暂无已使用优惠券" />
        </div>
      </el-tab-pane>

      <!-- 已过期 -->
      <el-tab-pane :label="'已过期 (' + state.statistics.expired + ')'" name="expired">
        <div class="coupon-list" v-if="expiredCoupons.length > 0">
          <div
            v-for="coupon in expiredCoupons"
            :key="coupon.id"
            class="coupon-card expired"
          >
            <div class="coupon-left">
              <div class="coupon-value">
                <span class="currency">¥</span>
                <span class="amount">{{ coupon.value }}</span>
              </div>
              <div class="coupon-condition">满{{ coupon.minAmount }}可用</div>
            </div>

            <div class="coupon-right">
              <div class="coupon-header">
                <span class="coupon-name">{{ coupon.name }}</span>
              </div>
              <div class="coupon-desc">{{ coupon.description || '无使用限制' }}</div>
              <div class="coupon-expire">
                <el-icon><Clock /></el-icon>
                已过期：{{ formatDate(coupon.expireTime) }}
              </div>
              <div class="coupon-actions">
                <el-button size="small" type="info" disabled>已过期</el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <el-empty description="暂无已过期优惠券" />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 领取优惠券对话框 -->
    <el-dialog v-model="showClaimDialog" title="领取优惠券" width="600px">
      <div class="claim-list">
        <div
          v-for="coupon in availableToClaim"
          :key="coupon.id"
          class="claim-item"
        >
          <div class="claim-left">
            <div class="claim-value">
              <span class="currency">¥</span>
              <span class="amount">{{ coupon.value }}</span>
            </div>
            <div class="claim-condition">满{{ coupon.minAmount }}可用</div>
          </div>

          <div class="claim-right">
            <div class="claim-name">{{ coupon.name }}</div>
            <div class="claim-desc">{{ coupon.description }}</div>
            <div class="claim-expire">有效期至：{{ formatDate(coupon.endTime) }}</div>
          </div>

          <div class="claim-action">
            <el-button
              type="primary"
              size="small"
              @click="handleClaimCoupon(coupon.id)"
              :disabled="coupon.received"
            >
              {{ coupon.received ? '已领取' : '立即领取' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Clock, CircleCheck } from '@element-plus/icons-vue'
import { state, fetchUserCoupons, receiveCoupon, useCoupon, availableCoupons, usedCoupons, expiredCoupons } from '../../stores/couponStore'
import { getCouponList } from '../../api/modules/coupon.js'
import { useUserStore } from '../../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// 当前标签
const activeTab = ref('available')

// 领取对话框
const showClaimDialog = ref(false)

// 加载状态
const loading = ref(false)

// 分页参数
const pageNum = ref(1)
const pageSize = ref(10)

// 可领取的优惠券列表
const availableToClaim = ref([])

// 加载用户优惠券
onMounted(() => {
  loadUserCoupons()
})

const loadUserCoupons = async () => {
  if (!userStore.userInfo?.id) {
    ElMessage.warning('请先登录')
    return
  }
  
  loading.value = true
  try {
    await fetchUserCoupons({
      userId: userStore.userInfo.id,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
  } finally {
    loading.value = false
  }
}

// 加载可领取的优惠券
const loadAvailableCoupons = async () => {
  try {
    const res = await getCouponList({
      merchantId: 0, // 平台券
      status: 1, // 启用状态
      pageNum: 1,
      pageSize: 20
    })
    
    if (res.code === 1000 && res.data) {
      availableToClaim.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        value: item.value,
        minAmount: item.minAmount,
        maxDiscount: item.maxDiscount,
        description: `满${item.minAmount}可用`,
        startTime: item.startTime,
        endTime: item.endTime,
        totalCount: item.totalCount,
        receiveCount: item.receiveCount,
        received: false // 需要后端返回是否已领取
      }))
    }
  } catch (error) {
    console.error('获取可领取优惠券失败:', error)
  }
}

// 打开领取对话框
const openClaimDialog = async () => {
  showClaimDialog.value = true
  await loadAvailableCoupons()
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}

// 使用优惠券
const handleUseCoupon = async (coupon) => {
  if (!userStore.userInfo?.id) {
    ElMessage.warning('请先登录')
    return
  }
  
  ElMessage.success('优惠券已锁定，跳转至商品页面')
  router.push('/')
}

// 领取优惠券
const handleClaimCoupon = async (couponId) => {
  if (!userStore.userInfo?.id) {
    ElMessage.warning('请先登录')
    return
  }
  
  const success = await receiveCoupon(couponId, userStore.userInfo.id)
  if (success) {
    // 更新列表中的领取状态
    const coupon = availableToClaim.value.find(c => c.id === couponId)
    if (coupon) {
      coupon.received = true
    }
    // 重新加载用户优惠券列表
    await loadUserCoupons()
  }
}
</script>

<style scoped lang="scss">
.coupon-management {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .coupon-tabs {
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

  .coupon-list {
    display: grid;
    gap: 16px;
  }

  .coupon-card {
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #ffd591;
    background: linear-gradient(135deg, #fff7e6 0%, #fff 100%);

    &.used, &.expired {
      border-color: #ebeef5;
      background: #f5f7fa;
      opacity: 0.7;

      .coupon-left {
        background: #909399;
      }
    }

    .coupon-left {
      width: 140px;
      padding: 20px;
      background: linear-gradient(135deg, #ff9c38 0%, #ff6b35 100%);
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .coupon-value {
        .currency {
          font-size: 14px;
        }

        .amount {
          font-size: 36px;
          font-weight: 700;
        }
      }

      .coupon-condition {
        font-size: 12px;
        opacity: 0.9;
        margin-top: 4px;
      }
    }

    .coupon-right {
      flex: 1;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .coupon-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        .coupon-name {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
      }

      .coupon-desc {
        font-size: 13px;
        color: #909399;
        margin-bottom: 8px;
      }

      .coupon-expire {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #c0c4cc;
        margin-bottom: 8px;

        .el-icon {
          font-size: 14px;
        }
      }

      .coupon-actions {
        margin-top: 8px;
      }
    }
  }

  .empty-state {
    padding: 60px 0;
    text-align: center;
  }

  .claim-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .claim-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;
    gap: 16px;

    .claim-left {
      width: 100px;
      text-align: center;
      color: #ff6b35;

      .claim-value {
        .currency {
          font-size: 12px;
        }

        .amount {
          font-size: 28px;
          font-weight: 700;
        }
      }

      .claim-condition {
        font-size: 11px;
        color: #909399;
      }
    }

    .claim-right {
      flex: 1;

      .claim-name {
        font-size: 15px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 4px;
      }

      .claim-desc {
        font-size: 12px;
        color: #909399;
        margin-bottom: 4px;
      }

      .claim-expire {
        font-size: 11px;
        color: #c0c4cc;
      }
    }

    .claim-action {
      min-width: 100px;
      text-align: center;
    }
  }
}
</style>
