/**
 * 商家订单状态管理
 */
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getMerchantOrderList,
  getMerchantOrderDetail,
  shipOrder as apiShipOrder,
  approveRefund as apiApproveRefund,
  rejectRefund as apiRejectRefund,
  getRefundList,
  getOrderStatistics,
  getOrderStatusCount
} from '../api/modules/merchantOrder.js'
import { useUserStore } from './userStore'
import merchantStore, {getMerchantInfo} from "./merchantStore.js";

// 创建商家订单状态
const state = reactive({
  // 订单列表
  orders: [],

  // 退款列表
  refunds: [],

  // 当前选中的订单
  currentOrder: null,

  // 订单统计
  statistics: {
    totalOrders: 0,
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReceipt: 0,
    completed: 0,
    cancelled: 0,
    todaySales: 0,
    monthSales: 0
  },

  // 订单状态统计
  statusCount: {
    totalOrders: 0,
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReceipt: 0,
    completed: 0,
    cancelled: 0,
    refunded: 0
  },

  // 加载状态
  loading: false,

  // 分页信息
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
})

// 方法：获取商家ID
const getMerchantId = () => {
  getMerchantInfo()
  console.log('merchantStore.merchantInfo:', merchantStore.merchantInfo)
  const merchantId = merchantStore.merchantInfo?.id
  console.log('获取到的 merchantId:', merchantId)
  return merchantId
}

// 方法：获取订单列表
async function fetchMerchantOrders(params = {}) {
  console.log('fetchMerchantOrders 被调用, params:', params)
  state.loading = true
  try {
    const merchantId = merchantStore.merchantInfo.id
    console.log('获取到的 merchantId:', merchantId)

    if (!merchantId) {
      console.error('未找到商家ID，请检查用户登录状态')
      ElMessage.error('未找到商家信息，请重新登录')
      state.loading = false
      return
    }

    // 确保有分页参数
    const requestParams = {
      merchantId,
      pageNum: params.pageNum || state.pagination.pageNum,
      pageSize: params.pageSize || state.pagination.pageSize,
      ...params
    }

    console.log('请求参数:', requestParams)

    // 移除 undefined 值
    Object.keys(requestParams).forEach(key => {
      if (requestParams[key] === undefined) {
        delete requestParams[key]
      }
    })

    console.log('发送 API 请求...')
    const res = await getMerchantOrderList(requestParams)
    console.log('API 响应:', res)

    if (res.code === 1000 && res.data) {
      // 适配后端返回的分页数据结构
      state.orders = res.data.content || []
      state.pagination.total = res.data.totalElements || 0
      state.pagination.pageNum = res.data.number + 1 || 1
      state.pagination.pageSize = res.data.size || 10
      console.log('订单列表加载成功，共', state.orders.length, '条记录')
    } else {
      console.error('API 返回错误:', res)
      ElMessage.error(res.message || '获取订单列表失败')
    }
  } catch (error) {
    console.error('获取订单列表失败:', error)
    ElMessage.error('获取订单列表失败：' + (error.message || '未知错误'))
  } finally {
    state.loading = false
  }
}

// 方法：获取订单详情
async function getOneMerchantOrderDetail(orderId) {
  try {
    const res = await getMerchantOrderDetail(orderId)
    if (res.code === 1000 && res.data) {
      state.currentOrder = res.data
      return res.data
    } else {
      ElMessage.error(res.message || '获取订单详情失败')
      return null
    }
  } catch (error) {
    console.error('获取订单详情失败:', error)
    ElMessage.error('获取订单详情失败')
    return null
  }
}

// 方法：发货
async function shipOrder(orderId, logisticsData) {
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return false
    }

    const data = {
      merchantId,
      logisticsCompany: logisticsData.logisticsCompany,
      trackingNumber: logisticsData.trackingNumber,
      currentStatus: logisticsData.currentStatus || '已发货',
      traces: logisticsData.traces || ''
    }

    await apiShipOrder(orderId, data)
    ElMessage.success('发货成功')

    // 重新加载订单列表
    await fetchMerchantOrders()
    return true
  } catch (error) {
    console.error('发货失败:', error)
    ElMessage.error('发货失败')
    return false
  }
}

// 方法：同意退款
async function approveRefund(refundId) {
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return false
    }

    await apiApproveRefund(refundId, { merchantId })
    ElMessage.success('已同意退款申请')

    // 重新加载退款列表
    await fetchRefundList()
    return true
  } catch (error) {
    console.error('同意退款失败:', error)
    ElMessage.error('同意退款失败')
    return false
  }
}

// 方法：拒绝退款
async function rejectRefund(refundId, reason) {
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return false
    }

    if (!reason) {
      ElMessage.warning('请输入拒绝原因')
      return false
    }

    await apiRejectRefund(refundId, { merchantId, reason })
    ElMessage.success('已拒绝退款申请')

    // 重新加载退款列表
    await fetchRefundList()
    return true
  } catch (error) {
    console.error('拒绝退款失败:', error)
    ElMessage.error('拒绝退款失败')
    return false
  }
}

// 方法：获取退款列表
async function fetchRefundList(params = {}) {
  state.loading = true
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return
    }

    const requestParams = {
      merchantId,
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 10,
      ...params
    }

    // 移除 undefined 值
    Object.keys(requestParams).forEach(key => {
      if (requestParams[key] === undefined) {
        delete requestParams[key]
      }
    })

    const res = await getRefundList(requestParams)
    if (res.code === 1000 && res.data) {
      state.refunds = res.data.content || []
    }
  } catch (error) {
    console.error('获取退款列表失败:', error)
    ElMessage.error('获取退款列表失败')
  } finally {
    state.loading = false
  }
}

// 方法：获取订单统计
async function fetchOrderStatistics() {
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return
    }

    const res = await getOrderStatistics({ merchantId })
    if (res.code === 1000 && res.data) {
      state.statistics = res.data
    }
  } catch (error) {
    console.error('获取订单统计失败:', error)
  }
}

// 方法：获取订单状态统计
async function fetchOrderStatusCount() {
  try {
    const merchantId = getMerchantId()
    if (!merchantId) {
      ElMessage.error('未找到商家信息')
      return
    }

    const res = await getOrderStatusCount({ merchantId })
    if (res.code === 1000 && res.data) {
      state.statusCount = res.data
    }
  } catch (error) {
    console.error('获取订单状态统计失败:', error)
  }
}

// 方法：清除数据
function clearMerchantOrders() {
  state.orders = []
  state.refunds = []
  state.currentOrder = null
  state.statistics = {
    totalOrders: 0,
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReceipt: 0,
    completed: 0,
    cancelled: 0,
    todaySales: 0,
    monthSales: 0
  }
  state.statusCount = {
    totalOrders: 0,
    pendingPayment: 0,
    pendingShipment: 0,
    pendingReceipt: 0,
    completed: 0,
    cancelled: 0,
    refunded: 0
  }
  state.pagination = {
    pageNum: 1,
    pageSize: 10,
    total: 0
  }
}

export {
  state,
  fetchMerchantOrders,
  getOneMerchantOrderDetail,
  shipOrder,
  approveRefund,
  rejectRefund,
  fetchRefundList,
  fetchOrderStatistics,
  fetchOrderStatusCount,
  clearMerchantOrders
}

export default state
