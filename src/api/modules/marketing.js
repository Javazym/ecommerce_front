/**
 * 营销活动API模块
 */
import request from '../request';

/**
 * 获取进行中的秒杀活动列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码(默认1)
 * @param {number} params.pageSize - 每页数量(默认10)
 * @returns {Promise}
 */
export function getActiveSeckillList(params) {
  return request({
    url: '/shopping-server/marketing/seckill/active',
    method: 'get',
    params
  });
}

/**
 * 获取秒杀活动详情
 * @param {number} activityId - 活动ID
 * @returns {Promise}
 */
export function getSeckillDetail(activityId) {
  return request({
    url: `/shopping-server/marketing/seckill/${activityId}`,
    method: 'get'
  });
}

/**
 * 获取进行中的满减活动列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码(默认1)
 * @param {number} params.pageSize - 每页数量(默认10)
 * @returns {Promise}
 */
export function getActiveDiscountList(params) {
  return request({
    url: '/shopping-server/marketing/discount/active',
    method: 'get',
    params
  });
}

/**
 * 获取满减活动详情
 * @param {number} activityId - 活动ID
 * @returns {Promise}
 */
export function getDiscountDetail(activityId) {
  return request({
    url: `/shopping-server/marketing/discount/${activityId}`,
    method: 'get'
  });
}

export default {
  getActiveSeckillList,
  getSeckillDetail,
  getActiveDiscountList,
  getDiscountDetail
};
