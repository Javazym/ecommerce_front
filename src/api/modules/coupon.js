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
    url: '/shopping-server/coupons',
    method: 'get',
    params
  });
}

/**获取用户可领取优惠券列表
 *
 * @param {number} productId - 商品ID
 * @param {number} merchantId - 商家ID
 * @returns {Promise}
 */
export function getUserReceiveCouponList(productId, merchantId) {
  console.log(productId, merchantId);
  return request({
    url: `/shopping-server/coupons/product/${productId}`,
    method: 'get',
    params: {
      merchantId
    }
  });
}

/**
 * 领取优惠券
 * @param {number} couponId - 优惠券ID（路径参数）
 * @returns {Promise}
 */
export function receiveCoupon(couponId) {
  return request({
    url: `/shopping-server/coupons/${couponId}/receive`,
    method: 'post',
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
    url: '/shopping-server/coupons/my',
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
    url: '/shopping-server/coupons/validate',
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
    url: '/shopping-server/coupons/use',
    method: 'post',
    data
  });
}

/**
 * 获取商家优惠券列表（商家端）
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @param {number} [params.status] - 优惠券状态（1-可用，2-已停用）
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getMerchantCouponList(params) {
  return request({
    url: '/shopping-server/merchant/marketing/coupon',
    method: 'get',
    params
  });
}

/**
 * 创建优惠券（商家端）
 * @param {Object} data - 优惠券数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 优惠券名称
 * @param {number} data.type - 类型：0-满减，1-折扣
 * @param {number} data.value - 面值/折扣
 * @param {number} data.minAmount - 最低消费
 * @param {number} data.maxDiscount - 最高优惠
 * @param {number} data.totalStock - 发放总量
 * @param {number} data.limitPerUser - 每人限领
 * @param {number} data.validDays - 领取后有效天数
 * @param {string} data.startTime - 开始时间
 * @param {string} data.endTime - 结束时间
 * @returns {Promise}
 */
export function createCoupon(data) {
  return request({
    url: '/shopping-server/merchant/marketing/coupon',
    method: 'post',
    data
  });
}

/**
 * 更新优惠券（商家端）
 * @param {number} couponId - 优惠券ID（路径参数）
 * @param {Object} data - 优惠券数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 优惠券名称
 * @param {number} data.value - 面值/折扣
 * @param {number} data.minAmount - 最低消费
 * @param {number} data.maxDiscount - 最高优惠
 * @param {number} data.totalStock - 发放总量
 * @param {number} data.limitPerUser - 每人限领
 * @param {string} data.endTime - 结束时间
 * @param {number} data.status - 状态：0-禁用，1-启用
 * @returns {Promise}
 */
export function updateCoupon(couponId, data) {
  return request({
    url: `/shopping-server/merchant/marketing/coupon/${couponId}`,
    method: 'put',
    data
  });
}

/**
 * 删除优惠券（商家端）
 * @param {number} couponId - 优惠券ID（路径参数）
 * @param {number} merchantId - 商家ID（查询参数）
 * @returns {Promise}
 */
export function deleteCoupon(couponId, merchantId) {
  return request({
    url: `/shopping-server/merchant/marketing/coupon/${couponId}`,
    method: 'delete',
    params: { merchantId }
  });
}

/**
 * 获取优惠券统计信息（商家端）
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @returns {Promise}
 */
export function getCouponStatistics(params) {
  return request({
    url: '/shopping-server/merchant/marketing/coupon/statistics',
    method: 'get',
    params
  });
}

/**
 * 获取秒杀活动列表（商家端）
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @param {number} [params.status] - 活动状态：0-未开始，1-进行中，2-已结束，3-已取消
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getSeckillList(params) {
  return request({
    url: '/shopping-server/merchant/marketing/seckill',
    method: 'get',
    params
  });
}

/**
 * 创建秒杀活动（商家端）
 * @param {Object} data - 秒杀活动数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 活动名称
 * @param {number} data.productId - 商品ID
 * @param {number} data.skuId - SKU ID
 * @param {number} data.seckillPrice - 秒杀价格
 * @param {number} data.originalPrice - 原价
 * @param {number} data.stock - 库存
 * @param {number} data.limitPerUser - 每人限购
 * @param {string} data.startTime - 开始时间
 * @param {string} data.endTime - 结束时间
 * @param {number} data.sort - 排序
 * @returns {Promise}
 */
export function createSeckill(data) {
  return request({
    url: '/shopping-server/merchant/marketing/seckill',
    method: 'post',
    data
  });
}

/**
 * 更新秒杀活动（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {Object} data - 秒杀活动数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 活动名称
 * @param {number} data.productId - 商品ID
 * @param {number} data.skuId - SKU ID
 * @param {number} data.seckillPrice - 秒杀价格
 * @param {number} data.originalPrice - 原价
 * @param {number} data.stock - 库存
 * @param {number} data.limitPerUser - 每人限购
 * @param {string} data.startTime - 开始时间
 * @param {string} data.endTime - 结束时间
 * @param {number} data.sort - 排序
 * @returns {Promise}
 */
export function updateSeckill(activityId, data) {
  return request({
    url: `/shopping-server/merchant/marketing/seckill/${activityId}`,
    method: 'put',
    data
  });
}

/**
 * 删除秒杀活动（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {number} merchantId - 商家ID（查询参数）
 * @returns {Promise}
 */
export function deleteSeckill(activityId, merchantId) {
  return request({
    url: `/shopping-server/merchant/marketing/seckill/${activityId}`,
    method: 'delete',
    params: { merchantId }
  });
}

/**
 * 获取秒杀活动详情（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {number} merchantId - 商家ID（查询参数）
 * @returns {Promise}
 */
export function getSeckillDetail(activityId, merchantId) {
  return request({
    url: `/shopping-server/merchant/marketing/seckill/${activityId}`,
    method: 'get',
    params: { merchantId }
  });
}

/**
 * 更新秒杀活动状态（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {Object} data - 状态数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {number} data.status - 目标状态（0-未开始，1-进行中，2-已结束，3-已取消）
 * @returns {Promise}
 */
export function updateSeckillStatus(activityId, data) {
  return request({
    url: `/shopping-server/merchant/marketing/seckill/${activityId}/status`,
    method: 'put',
    params: {
      merchantId: data.merchantId,
      status: data.status
    }
  });
}

/**
 * 获取满减活动列表（商家端）
 * @param {Object} params - 查询参数
 * @param {number} params.merchantId - 商家ID（必填）
 * @param {number} [params.status] - 活动状态：0-未开始，1-进行中，2-已结束，3-已取消
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getDiscountList(params) {
  return request({
    url: '/shopping-server/merchant/marketing/discount',
    method: 'get',
    params
  });
}

/**
 * 创建满减活动（商家端）
 * @param {Object} data - 满减活动数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 活动名称
 * @param {string} data.description - 活动描述
 * @param {number} data.discountType - 优惠类型
 * @param {number} data.conditionValue - 条件值
 * @param {number} data.discountAmount - 优惠金额
 * @param {number} data.maxDiscount - 最高优惠
 * @param {string} data.startTime - 开始时间
 * @param {string} data.endTime - 结束时间
 * @param {string} data.scopeType - 适用范围类型
 * @param {string} data.scopeIds - 适用范围ID列表
 * @param {number} data.limitPerUser - 每人限用次数
 * @param {number} data.sort - 排序
 * @returns {Promise}
 */
export function createDiscount(data) {
  return request({
    url: '/shopping-server/merchant/marketing/discount',
    method: 'post',
    data
  });
}

/**
 * 更新满减活动（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {Object} data - 满减活动数据
 * @param {number} data.merchantId - 商家ID（必填）
 * @param {string} data.name - 活动名称
 * @param {string} data.description - 活动描述
 * @param {number} data.discountType - 优惠类型
 * @param {number} data.conditionValue - 条件值
 * @param {number} data.discountAmount - 优惠金额
 * @param {number} data.maxDiscount - 最高优惠
 * @param {string} data.startTime - 开始时间
 * @param {string} data.endTime - 结束时间
 * @param {string} data.scopeType - 适用范围类型
 * @param {string} data.scopeIds - 适用范围ID列表
 * @param {number} data.limitPerUser - 每人限用次数
 * @param {number} data.sort - 排序
 * @returns {Promise}
 */
export function updateDiscount(activityId, data) {
  return request({
    url: `/shopping-server/merchant/marketing/discount/${activityId}`,
    method: 'put',
    data
  });
}

/**
 * 删除满减活动（商家端）
 * @param {number} activityId - 活动ID（路径参数）
 * @param {number} merchantId - 商家ID（查询参数）
 * @returns {Promise}
 */
export function deleteDiscount(activityId, merchantId) {
  return request({
    url: `/shopping-server/merchant/marketing/discount/${activityId}`,
    method: 'delete',
    params: { merchantId }
  });
}

export default {
  getUserReceiveCouponList,
  getCouponList,
  getMerchantCouponList,
  getCouponStatistics,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  receiveCoupon,
  getUserCoupons,
  validateCoupon,
  useCoupon,
  getSeckillList,
  createSeckill,
  updateSeckill,
  deleteSeckill,
  getSeckillDetail,
  updateSeckillStatus,
  getDiscountList,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
