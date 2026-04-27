/**
 * 用户API模块
 */
import request from '../request';

/**
 * 获取当前用户信息
 * @returns {Promise}
 */
export function getCurrentUser() {
  return request({
    url: '/shopping-server/users/me',
    method: 'get'
  });
}

/**
 * 获取用户详情
 * @param {number} id - 用户ID
 * @returns {Promise}
 */
export function getUserDetail(id) {
  return request({
    url: `/shopping-server/users/${id}`,
    method: 'get'
  });
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @returns {Promise}
 */
export function updateUser(data) {
  return request({
    url: '/shopping-server/users',
    method: 'put',
    data
  });
}
export function getUserAddressList() {
  return request({
    url: '/shopping-server/users/addresses',
    method: 'get'
  });
}
export default {
  getCurrentUser,
  getUserDetail,
  updateUser
};
