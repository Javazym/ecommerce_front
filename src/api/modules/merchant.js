/**
 * 商家财务API模块
 */
import request from '../request';

/**
 * 获取商家账户信息
 * @returns {Promise}
 */
export function getMerchantAccount() {
  return request({
    url: '/shopping-server/merchant/account',
    method: 'get'
  });
}

/**
 * 获取财务数据
 * @param {Object} params - 查询参数
 * @param {string} [params.startDate] - 开始日期
 * @param {string} [params.endDate] - 结束日期
 * @returns {Promise}
 */
export function getFinancialData(params) {
  return request({
    url: '/shopping-server/merchant/financial',
    method: 'get',
    params
  });
}

/**
 * 获取提现记录
 * @param {Object} params - 查询参数
 * @param {number} [params.pageNum] - 页码
 * @param {number} [params.pageSize] - 每页数量
 * @param {string} [params.status] - 状态
 * @returns {Promise}
 */
export function getWithdrawRecords(params) {
  return request({
    url: '/shopping-server/merchant/withdraw/list',
    method: 'get',
    params
  });
}

/**
 * 申请提现
 * @param {Object} data - 提现数据
 * @param {number} data.amount - 提现金额
 * @param {string} data.bankName - 银行名称
 * @param {string} data.bankAccount - 银行账号
 * @param {string} data.accountName - 开户名
 * @returns {Promise}
 */
export function applyWithdraw(data) {
  return request({
    url: '/shopping-server/merchant/withdraw/apply',
    method: 'post',
    data
  });
}

export function applyMerchant(data) {
  return request({
    url: '/shopping-server/merchants/apply',
    method: 'post',
    data
  });
}
export function getApplyMerchant() {
  return request({
    url: '/shopping-server/merchants/apply',
    method: 'get',
  });
}
export default {
  getMerchantAccount,
  getFinancialData,
  getWithdrawRecords,
  applyWithdraw
};
