/**
 * 收货地址API模块
 */
import request from '../request';

/**
 * 获取用户收货地址列表
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getAddressList() {
  return request({
    url: '/shopping-server/users/addresses',
    method: 'get'
  });
}

/**
 * 添加收货地址
 * @param {Object} data - 地址数据
 * @param {number} data.userId - 用户ID
 * @param {string} data.consigneeName - 收货人姓名
 * @param {string} data.phone - 手机号
 * @param {string} data.province - 省份
 * @param {string} data.city - 城市
 * @param {string} data.district - 区/县
 * @param {string} data.detailAddress - 详细地址
 * @param {number} data.isDefault - 是否默认(0/1)
 * @returns {Promise}
 */
export function addAddress(data) {
  return request({
    url: '/shopping-server/users/addresses',
    method: 'post',
    data
  });
}

/**
 * 获取收货地址详情
 * @param {number} id - 地址ID
 * @returns {Promise}
 */
export function getAddressDetail(id) {
  return request({
    url: `/shopping-server/users/addresses/${id}`,
    method: 'get'
  });
}

/**
 * 更新收货地址
 * @param {Object} data - 地址数据
 * @param {number} data.id - 地址ID
 * @returns {Promise}
 */
export function updateAddress(data) {
  return request({
    url: `/shopping-server/users/addresses/${data.id}`,
    method: 'put',
    data
  });
}

/**
 * 删除收货地址
 * @param {number} id - 地址ID
 * @returns {Promise}
 */
export function deleteAddress(id) {
  return request({
    url: `/shopping-server/users/addresses/${id}`,
    method: 'delete'
  });
}

/**
 * 设置默认收货地址
 * @param {Object} data - 操作数据
 * @param {number} data.userId - 用户ID
 * @param {number} data.addressId - 地址ID
 * @returns {Promise}
 */
export function setDefaultAddress(id) {
  return request({
    url: `/shopping-server/users/addresses/${id}/default`,
    method: 'put',
  });
}

export default {
  getAddressList,
  addAddress,
  getAddressDetail,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};
