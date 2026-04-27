/**
 * 商家入驻API模块
 */
import request from '../request';

/**
 * 申请入驻
 * @param {Object} data - 入驻申请数据
 * @param {string} data.storeName - 店铺名称
 * @param {string} data.contactName - 联系人姓名
 * @param {string} data.contactPhone - 联系电话
 * @param {string} data.businessLicense - 营业执照号
 * @param {string} data.storeAddress - 店铺地址
 * @param {string} data.description - 店铺描述
 * @returns {Promise}
 */
export function applySettlement(data) {
  return request({
    url: '/shopping-server/merchants/apply',
    method: 'post',
    data
  });
}

/**
 * 获取商家信息
 * @returns {Promise}
 */
export function getMerchantInfo() {
  return request({
    url: '/shopping-server/merchants/info',
    method: 'get'
  });
}

/**
 * 更新商家信息
 * @param {Object} data - 商家信息
 * @returns {Promise}
 */
export function updateMerchantInfo(data) {
  return request({
    url: '/shopping-server/merchants/info',
    method: 'put',
    data
  });
}

/**
 * 根据用户ID获取商家信息
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getMerchantInfoByUserId(userId) {
  return request({
    url: '/shopping-server/merchants/user',
    method: 'get',
    params: { userId }
  });
}

/**
 * 获取商家统计数据
 * @returns {Promise}
 */
export function getMerchantStatistics() {
  return request({
    url: '/shopping-server/merchants/statistics',
    method: 'get'
  });
}

export default {
  applySettlement,
  getMerchantInfo,
  updateMerchantInfo,
  getMerchantInfoByUserId,
  getMerchantStatistics
};
