/**
 * 商家订单API模块
 */
import request from '../request';

/**
 * 获取商家订单列表
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @param {number} [params.status] - 订单状态(可选)
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getMerchantOrderList(params) {
  return request({
    url: '/shopping-server/merchant/orders',
    method: 'get',
    params
  });
}

/**
 * 获取订单详情
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function getMerchantOrderDetail(orderId) {
  return request({
    url: `/shopping-server/merchant/orders/${orderId}`,
    method: 'get'
  });
}

/**
 * 发货
 * @param {number} orderId - 订单ID
 * @param {Object} data - 物流数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.logisticsCompany - 物流公司
 * @param {string} data.trackingNumber - 物流单号
 * @param {string} [data.currentStatus] - 当前状态
 * @param {string} [data.traces] - 物流轨迹
 * @returns {Promise}
 */
export function shipOrder(orderId, data) {
  return request({
    url: `/shopping-server/merchant/orders/${orderId}/ship`,
    method: 'put',
    data
  });
}

/**
 * 同意退款申请
 * @param {number} refundId - 退款ID
 * @param {Object} data - 请求数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @returns {Promise}
 */
export function approveRefund(refundId, data) {
  return request({
    url: `/shopping-server/merchant/orders/refunds/${refundId}/approve`,
    method: 'put',
    params: data  // 使用params传递merchantId
  });
}

/**
 * 拒绝退款申请
 * @param {number} refundId - 退款ID
 * @param {Object} data - 请求数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.reason - 拒绝原因（必填）
 * @returns {Promise}
 */
export function rejectRefund(refundId, data) {
  return request({
    url: `/shopping-server/merchant/orders/refunds/${refundId}/reject`,
    method: 'put',
    params: data  // 使用params传递merchantId和reason
  });
}

/**
 * 获取退款申请列表
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @param {number} [params.status] - 退款状态(可选)
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getRefundList(params) {
  return request({
    url: '/shopping-server/merchant/orders/refunds',
    method: 'get',
    params
  });
}

/**
 * 获取订单统计信息
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @returns {Promise}
 */
export function getOrderStatistics(params) {
  return request({
    url: '/shopping-server/merchant/orders/statistics',
    method: 'get',
    params
  });
}

/**
 * 获取订单状态统计
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @returns {Promise}
 */
export function getOrderStatusCount(params) {
  return request({
    url: '/shopping-server/merchant/orders/status-count',
    method: 'get',
    params
  });
}

export default {
  getMerchantOrderList,
  getMerchantOrderDetail,
  shipOrder,
  approveRefund,
  rejectRefund,
  getRefundList,
  getOrderStatistics,
  getOrderStatusCount
};
