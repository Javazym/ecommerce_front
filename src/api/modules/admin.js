/**
 * 管理员相关API
 */


import request from "../request.js";

/**
 * 管理员登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function adminLogin(data) {
  return request({
    url: '/shopping-server/admin/login',
    method: 'post',
    params: data,
  });
}

/**
 * 获取当前登录管理员信息
 * @returns {Promise}
 */
export function getCurrentAdmin() {
  return request({
    url: '/shopping-server/admin/current',
    method: 'get',
  });
}

/**
 * 修改管理员密码
 * @param {Object} data - 密码信息
 * @param {number} data.adminId - 管理员ID
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise}
 */
export function changePassword(data) {
  return request({
    url: '/shopping-server/admin/password',
    method: 'put',
    params: data,
  });
}

/**
 * 获取平台统计数据
 * @returns {Promise}
 */
export function getPlatformStatistics() {
  return request({
    url: '/shopping-server/admin/statistics',
    method: 'get',
  });
}
/**
 * 商家入驻申请管理API
 */

/**
 * 获取待审核的商家申请列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getPendingApplications(params = {}) {
  return request({
    url: '/shopping-server/admin/merchant-applications/pending',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}

/**
 * 获取所有商家申请列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getAllApplications(params = {}) {
  return request({
    url: '/shopping-server/admin/merchant-applications/all',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}

/**
 * 审核商家入驻申请
 * @param {Object} data - 审核信息
 * @param {number} data.id - 申请ID
 * @param {number} data.status - 审核状态：1-通过，2-驳回
 * @param {string} data.remark - 审核备注
 * @returns {Promise}
 */
export function auditMerchantApplication(data) {
  return request({
    url: '/shopping-server/admin/merchant-applications/audit',
    method: 'post',
    data,
  });
}
/**
 * 商家管理API
 */

/**
 * 获取所有商家列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getAllMerchants(params = {}) {
  return request({
    url: '/shopping-server/admin/merchants/all',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}

/**
 * 根据状态获取商家列表
 * @param {number} status - 状态：0-禁用，1-正常
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getMerchantsByStatus(status, params = {}) {
  return request({
    url: '/shopping-server/admin/merchants/by-status',
    method: 'get',
    params: {
      status,
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}

/**
 * 根据审核状态获取商家列表
 * @param {number} auditStatus - 审核状态：0-待审核，1-通过，2-驳回
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getMerchantsByAuditStatus(auditStatus, params = {}) {
  return request({
    url: '/shopping-server/admin/merchants/by-audit-status',
    method: 'get',
    params: {
      auditStatus,
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}

/**
 * 获取商家详情
 * @param {number} merchantId - 商家ID
 * @returns {Promise}
 */
export function getMerchantDetail(merchantId) {
  return request({
    url: `/shopping-server/admin/merchants/${merchantId}`,
    method: 'get',
  });
}

/**
 * 更新商家状态
 * @param {number} merchantId - 商家ID
 * @param {number} status - 状态：0-禁用，1-正常
 * @returns {Promise}
 */
export function updateMerchantStatus(merchantId, status) {
  return request({
    url: `/shopping-server/admin/merchants/${merchantId}/status`,
    method: 'put',
    params: { status },
  });
}

/**
 * 删除商家
 * @param {number} merchantId - 商家ID
 * @returns {Promise}
 */
export function deleteMerchant(merchantId) {
  return request({
    url: `/shopping-server/admin/merchants/${merchantId}`,
    method: 'delete',
  });
}

/**
 * 按主营类目分组展示商家
 * @returns {Promise}
 */
export function getMerchantsGroupedByCategory() {
  return request({
    url: '/shopping-server/admin/merchants/grouped',
    method: 'get',
  });
}

/**
 * 获取指定类目的商家列表
 * @param {string} category - 主营类目
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页大小，默认10
 * @returns {Promise}
 */
export function getMerchantsByCategory(category, params = {}) {
  return request({
    url: '/shopping-server/admin/merchants/by-category',
    method: 'get',
    params: {
      category,
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
  });
}
