/**
 * 订单API模块
 */
import request from '../request';

/**
 * 获取订单列表
 * @param {Object} params - 查询参数
 * @param {number} [params.status] - 订单状态(可选)
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getOrderList(params) {
  return request({
    url: '/shopping-server/orders',
    method: 'get',
    params
  });
}

/**
 * 获取订单详情
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function getOrderDetail(orderId) {
  return request({
    url: `/shopping-server/orders/${orderId}`,
    method: 'get'
  });
}

/**
 * 创建订单
 * @param {Object} data - 订单数据
 * @param {number} [data.addressId] - 地址ID
 * @param {number} [data.merchantId] - 商家ID
 * @param {number[]} [data.cartItemIds] - 购物车商品ID列表
 * @param {Array} [data.items] - 商品列表（直接购买）
 * @param {number} [data.items[].productId] - 商品ID
 * @param {number} [data.items[].skuId] - SKU ID
 * @param {number} [data.items[].quantity] - 购买数量
 * @param {number} [data.couponId] - 优惠券ID
 * @param {string} [data.remark] - 订单备注
 * @param {Object} [data.invoice] - 发票信息
 * @param {number} [data.invoice.type] - 发票类型
 * @param {string} [data.invoice.title] - 发票抬头
 * @param {string} [data.invoice.taxNumber] - 税号
 * @returns {Promise}
 */
export function createOrder(data) {
  return request({
    url: '/shopping-server/orders',
    method: 'post',
    data
  });
}

/**
 * 创建秒杀订单
 * @param {number} activityId - 秒杀活动ID
 * @param {Object} data - 订单数据
 * @param {number} [data.addressId] - 地址ID
 * @param {number} [data.merchantId] - 商家ID
 * @param {number[]} [data.cartItemIds] - 购物车商品ID列表
 * @param {Array} [data.items] - 商品列表（直接购买）
 * @param {number} [data.items[].productId] - 商品ID
 * @param {number} [data.items[].skuId] - SKU ID
 * @param {number} [data.items[].quantity] - 购买数量
 * @param {number} [data.couponId] - 优惠券ID
 * @param {string} [data.remark] - 订单备注
 * @param {Object} [data.invoice] - 发票信息
 * @param {number} [data.invoice.type] - 发票类型
 * @param {string} [data.invoice.title] - 发票抬头
 * @param {string} [data.invoice.taxNumber] - 税号
 * @param {number} [data.status] - 订单类型
 * @returns {Promise}
 */
export function createSeckillOrder(activityId, data) {
  return request({
    url: `/shopping-server/orders/seckill/${activityId}`,
    method: 'post',
    data
  });
}

/**
 * 取消订单
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function cancelOrder(orderId) {
  return request({
    url: `/shopping-server/orders/${orderId}/cancel`,
    method: 'put'
  });
}

/**
 * 支付订单
 * @param {number} orderId - 订单ID
 * @param {Object} data - 支付数据
 * @param {string} data.payType - 支付方式(alipay/wechat)
 * @returns {Promise}
 */
export function payOrder(orderId, data) {
  return request({
    url: `/shopping-server/orders/${orderId}/pay`,
    method: 'post',
    data
  });
}

/**
 * 确认收货
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function confirmReceipt(orderId) {
  return request({
    url: `/shopping-server/orders/${orderId}/confirm`,
    method: 'put'
  });
}

/**
 * 删除订单
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function deleteOrder(orderId) {
  return request({
    url: `/shopping-server/orders/${orderId}`,
    method: 'delete'
  });
}

/**
 * 获取订单物流信息
 * @param {number} orderId - 订单ID
 * @returns {Promise}
 */
export function getOrderLogistics(orderId) {
  return request({
    url: `/shopping-server/orders/${orderId}/logistics`,
    method: 'get'
  });
}

/**
 * 申请退款
 * @param {number} orderId - 订单ID
 * @param {Object} data - 退款数据
 * @param {number} data.type - 退款类型：1-仅退款，2-退货退款
 * @param {number} data.amount - 退款金额
 * @param {string} data.reason - 退款原因
 * @param {string} [data.description] - 退款说明
 * @param {string} [data.images] - 图片凭证（JSON数组）
 * @returns {Promise}
 */
export function applyRefund(orderId, data) {
  return request({
    url: `/shopping-server/orders/${orderId}/refund`,
    method: 'post',
    data
  });
}

/**
 * 获取退款详情
 * @param {number} refundId - 退款ID
 * @returns {Promise}
 */
export function getRefundDetail(refundId) {
  return request({
    url: `/shopping-server/orders/refunds/${refundId}`,
    method: 'get'
  });
}

/**
 * 获取用户退款申请列表
 * @param {Object} params - 查询参数
 * @param {number} [params.status] - 退款状态(可选)
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getUserRefundList(params) {
  return request({
    url: '/shopping-server/orders/refunds',
    method: 'get',
    params
  });
}

export default {
  getOrderList,
  getOrderDetail,
  createOrder,
  cancelOrder,
  payOrder,
  confirmReceipt,
  deleteOrder,
  getOrderLogistics,
  applyRefund,
  getRefundDetail,
  getUserRefundList
};
