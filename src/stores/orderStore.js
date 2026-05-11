/**
 * 订单状态管理
 * 包含订单列表、订单状态、订单操作等
 */
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
    getOrderList,
    getOrderDetail,
    createOrder,
    cancelOrder as apiCancelOrder,
    payOrder as apiPayOrder,
    confirmReceipt as apiConfirmReceipt,
    deleteOrder as apiDeleteOrder,
    getOrderLogistics,
    applyRefund as apiApplyRefund
} from '../api/modules/order.js'

// 创建订单状态
const state = reactive({
    // 订单列表
    orders: [],

    // 当前选中的订单
    currentOrder: null,

    // 订单统计
    statistics: {
        all: 0,
        pending: 0,
        paid: 0,
        shipped: 0,
        completed: 0,
        cancelled: 0
    },

    // 加载状态
    loading: false
})

// 计算属性：待付款订单
const pendingPaymentOrders = computed(() => {
    return state.orders.filter(order => order.status === 0)
})

// 计算属性：待发货订单
const paidOrders = computed(() => {
    return state.orders.filter(order => order.status === 1)
})

// 计算属性：待收货订单
const shippedOrders = computed(() => {
    return state.orders.filter(order => order.status === 2)
})

// 计算属性：已完成订单
const completedOrders = computed(() => {
    return state.orders.filter(order => order.status === 3)
})

// 方法：获取订单列表
async function fetchOrders(params = {}) {
    state.loading = true
    try {
        // 确保有分页参数
        const requestParams = {
            pageNum: params.pageNum || 1,
            pageSize: params.pageSize || 10,
            ...params
        }
        // 移除 pageNum 和 pageSize 之外的其他 undefined 值
        Object.keys(requestParams).forEach(key => {
            if (requestParams[key] === undefined) {
                delete requestParams[key]
            }
        })

        const res = await getOrderList(requestParams)
        if (res.code === 1000 && res.data) {
            // 适配后端返回的分页数据结构
            state.orders = res.data.content || []
            updateStatistics()
        }
    } catch (error) {
        console.error('获取订单列表失败:', error)
        ElMessage.error('获取订单列表失败')
    } finally {
        state.loading = false
    }
}

// 方法：获取订单详情
async function getOneOrderDetail(orderId) {
    try {
        const res = await getOrderDetail(orderId)
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

// 方法：取消订单
async function cancelOrder(orderId) {
    try {
        await apiCancelOrder(orderId)
        ElMessage.success('订单已取消')
        // 重新加载订单列表
        await fetchOrders()
    } catch (error) {
        console.error('取消订单失败:', error)
        ElMessage.error('取消订单失败')
    }
}

// 方法：去支付
async function payOrder(orderId, payType = 'alipay') {
    try {
        await apiPayOrder(orderId, { payType })
        ElMessage.success('支付成功')
        // 重新加载订单列表
        await fetchOrders()
    } catch (error) {
        console.error('支付失败:', error)
        ElMessage.error('支付失败')
    }
}

// 方法：确认收货
async function confirmReceipt(orderId) {
    try {
        await apiConfirmReceipt(orderId)
        ElMessage.success('确认收货成功')
        // 重新加载订单列表
        await fetchOrders()
    } catch (error) {
        console.error('确认收货失败:', error)
        ElMessage.error('确认收货失败')
    }
}

// 方法：删除订单
async function deleteOrder(orderId) {
    try {
        await apiDeleteOrder(orderId)
        ElMessage.success('订单已删除')
        // 重新加载订单列表
        await fetchOrders()
    } catch (error) {
        console.error('删除订单失败:', error)
        ElMessage.error('删除订单失败')
    }
}

// 方法：申请退款
async function applyRefund(orderId, refundData) {
    try {
        // refundData 应该包含: type, amount, reason, description
        const res = await apiApplyRefund(orderId, refundData)
        ElMessage.success('退款申请已提交')
        // 重新加载订单列表
        await fetchOrders()
        // 返回响应数据，可能包含 refundId
        return res.data
    } catch (error) {
        console.error('申请退款失败:', error)
        ElMessage.error('申请退款失败')
        throw error
    }
}

// 方法：获取物流信息
async function getLogistics(orderId) {
    try {
        const res = await getOrderLogistics(orderId)
        if (res.code === 1000 && res.data) {
            return res.data
        }
        return null
    } catch (error) {
        console.error('获取物流信息失败:', error)
        return null
    }
}

// 方法：评价订单
function reviewOrder(orderId, reviewData) {
    const order = state.orders.find(o => o.id === orderId)
    if (order) {
        ElMessage.success('评价成功')
        // 可以在这里保存评价详情
    }
}

// 方法：更新统计
function updateStatistics() {
    state.statistics = {
        all: state.orders.length,
        pending: state.orders.filter(o => o.status === 0).length,
        paid: state.orders.filter(o => o.status === 1).length,
        shipped: state.orders.filter(o => o.status === 2).length,
        completed: state.orders.filter(o => o.status === 3).length,
        cancelled: state.orders.filter(o => o.status === 4).length
    }
}

// 方法：延长收货
function extendReceipt(orderId) {
    ElMessage.success('已延长收货时间')
}



// 方法：清除订单数据
function clearOrders() {
    state.orders = []
    state.currentOrder = null
    state.statistics = {
        all: 0,
        pending: 0,
        paid: 0,
        shipped: 0,
        completed: 0,
        cancelled: 0
    }
}

export {
    state,
    pendingPaymentOrders,
    paidOrders,
    shippedOrders,
    completedOrders,
    fetchOrders,
    getOneOrderDetail,
    cancelOrder,
    payOrder,
    confirmReceipt,
    deleteOrder,
    applyRefund,
    reviewOrder,
    updateStatistics,
    extendReceipt,
    getLogistics,
    clearOrders
}

export default state
