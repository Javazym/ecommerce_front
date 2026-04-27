/**
 * 优惠券API模块
 */
import request from '../request';

/**
 * 获取优惠券列表（商家端/平台端）
 * @param {Object} params - 查询参数
 * @param {number} [params.merchantId] - 商家ID（0表示平台券）
 * @param {number} [params.status] - 状态：0-禁用，1-启用
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getCouponList(params) {
  return request({
    url: '/coupons',
    method: 'get',
    params
  });
}

/**
 * 领取优惠券
 * @param {number} couponId - 优惠券ID（路径参数）
 * @param {Object} data - 请求体
 * @param {string} data.userId - 用户ID
 * @returns {Promise}
 */
export function receiveCoupon(couponId, data) {
  return request({
    url: `/coupons/${couponId}/receive`,
    method: 'post',
    data
  });
}

/**
 * 获取用户优惠券列表
 * @param {Object} params - 查询参数
 * @param {string} params.userId - 用户ID（必填）
 * @param {number} [params.status] - 状态筛选
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getUserCoupons(params) {
  return request({
    url: '/coupons/my',
    method: 'get',
    params
  });
}

/**
 * 验证优惠券
 * @param {Object} data - 验证数据
 * @param {string} data.userId - 用户ID
 * @param {number} data.couponId - 优惠券ID
 * @param {number} data.orderAmount - 订单金额
 * @returns {Promise}
 */
export function validateCoupon(data) {
  return request({
    url: '/coupons/validate',
    method: 'post',
    data
  });
}

/**
 * 使用优惠券
 * @param {Object} data - 使用数据
 * @param {string} data.userId - 用户ID
 * @param {number} data.couponId - 优惠券ID
 * @param {number} data.orderId - 订单ID
 * @returns {Promise}
 */
export function useCoupon(data) {
  return request({
    url: '/coupons/use',
    method: 'post',
    data
  });
}

export default {
  getCouponList,
  receiveCoupon,
  getUserCoupons,
  validateCoupon,
  useCoupon
};
