/**
 * 优惠券状态管理
 * 包含优惠券领取、使用、管理等功能
 */
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getUserCoupons,
  receiveCoupon as apiReceiveCoupon,
  validateCoupon as apiValidateCoupon,
  useCoupon as apiUseCoupon
} from '../api/modules/coupon.js'

// 创建优惠券状态
const state = reactive({
  // 用户优惠券列表（从后端获取）
  coupons: [],

  // 加载状态
  loading: false,

  // 分页信息
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  },

  // 统计
  statistics: {
    total: 0,
    available: 0,
    used: 0,
    expired: 0
  }
})

// 计算属性：可用优惠券
const availableCoupons = computed(() => {
  return state.coupons.filter(c => c.status === 0) // status: 0-可用
})

// 计算属性：已使用优惠券
const usedCoupons = computed(() => {
  return state.coupons.filter(c => c.status === 1) // status: 1-已使用
})

// 计算属性：已过期优惠券
const expiredCoupons = computed(() => {
  return state.coupons.filter(c => c.status === 2) // status: 2-已过期
})

// 方法：获取用户优惠券列表
async function fetchUserCoupons(params = {}) {
  state.loading = true
  try {
    const requestParams = {
      userId: params.userId || '',
      status: params.status !== undefined ? params.status : undefined,
      pageNum: params.pageNum || state.pagination.pageNum,
      pageSize: params.pageSize || state.pagination.pageSize
    }

    const res = await getUserCoupons(requestParams)
    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      state.coupons = (res.data.content || []).map(item => ({
        id: item.id,
        couponId: item.couponId,
        name: item.couponName,
        type: item.couponType, // 0-满减，1-折扣
        value: item.value,
        minAmount: item.minAmount,
        maxDiscount: item.maxDiscount,
        status: item.status, // 0-可用，1-已使用，2-已过期
        expireTime: item.expireTime
      }))

      // 更新分页信息
      state.pagination = {
        pageNum: res.data.number + 1,
        pageSize: res.data.size,
        total: res.data.totalElements,
        totalPages: res.data.totalPages
      }

      // 更新统计
      updateStatistics()
    }
  } catch (error) {
    console.error('获取优惠券列表失败:', error)
    ElMessage.error('获取优惠券列表失败')
  } finally {
    state.loading = false
  }
}

// 方法：领取优惠券
async function receiveCoupon(couponId, userId) {
  try {
    const res = await apiReceiveCoupon(couponId, { userId })
    if (res.code === 1000 && res.data) {
      ElMessage.success('优惠券领取成功')
      return true
    } else {
      ElMessage.warning(res.message || '领取失败')
      return false
    }
  } catch (error) {
    console.error('领取优惠券失败:', error)
    ElMessage.error('领取优惠券失败')
    return false
  }
}

// 方法：验证优惠券
async function validateCoupon(userId, couponId, orderAmount) {
  try {
    const res = await apiValidateCoupon({ userId, couponId, orderAmount })
    if (res.code === 1000 && res.data) {
      return {
        valid: res.data.valid,
        message: res.data.message,
        discountAmount: res.data.discountAmount
      }
    }
  } catch (error) {
    console.error('验证优惠券失败:', error)
  }
  return { valid: false, message: '验证失败', discountAmount: 0 }
}

// 方法：使用优惠券
async function useCoupon(userId, couponId, orderId) {
  try {
    const res = await apiUseCoupon({ userId, couponId, orderId })
    if (res.code === 1000 && res.data) {
      ElMessage.success('优惠券使用成功')
      // 重新加载列表
      await fetchUserCoupons({ userId })
      return true
    } else {
      ElMessage.warning(res.message || '使用失败')
      return false
    }
  } catch (error) {
    console.error('使用优惠券失败:', error)
    ElMessage.error('使用优惠券失败')
    return false
  }
}

// 方法：更新统计
function updateStatistics() {
  state.statistics = {
    total: state.coupons.length,
    available: state.coupons.filter(c => c.status === 0).length,
    used: state.coupons.filter(c => c.status === 1).length,
    expired: state.coupons.filter(c => c.status === 2).length
  }
}

// 方法：检查优惠券是否可用
function isCouponAvailable(couponId) {
  const coupon = state.coupons.find(c => c.couponId === couponId)
  return coupon && coupon.status === 0
}

// 方法：计算优惠金额
function calculateDiscount(coupon, orderAmount) {
  if (!coupon || coupon.status !== 0) {
    return 0
  }

  if (orderAmount < coupon.minAmount) {
    return 0
  }

  let discount = 0
  if (coupon.type === 0) {
    // 满减券
    discount = coupon.value
  } else if (coupon.type === 1) {
    // 折扣券
    discount = orderAmount * (1 - coupon.value / 10)
  }

  // 限制最高优惠
  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount
  }

  return Math.min(discount, orderAmount)
}

// 方法：清除优惠券数据
function clearCoupons() {
  state.coupons = []
  state.pagination = {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  }
  state.statistics = {
    total: 0,
    available: 0,
    used: 0,
    expired: 0
  }
}

export {
  state,
  availableCoupons,
  usedCoupons,
  expiredCoupons,
  fetchUserCoupons,
  receiveCoupon,
  validateCoupon,
  useCoupon,
  updateStatistics,
  isCouponAvailable,
  calculateDiscount,
  clearCoupons
}

export default state
