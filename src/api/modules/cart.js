/**
 * 购物车API模块
 */
import request from '../request';

/**
 * 获取购物车列表
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getCartList() {
  return request({
    url: '/shopping-server/cart',
    method: 'get',
  });
}

/**
 * 添加商品到购物车
 * @param {Object} data - 购物车数据
 * @param {number} data.userId - 用户ID
 * @param {number} data.productId - 商品ID
 * @param {number} data.skuId - SKU ID
 * @param {number} data.quantity - 数量
 * @returns {Promise}
 */
export function addToCart(data) {
  return request({
    url: '/shopping-server/cart',
    method: 'post',
    data
  });
}

/**
 * 获取选中的购物车商品
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getSelectedCartItems(userId) {
  return request({
    url: '/shopping-server/cart/checked',
    method: 'get',
    params: { userId }
  });
}

/**
 * 获取购物车商品数量
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getCartCount(userId) {
  return request({
    url: '/shopping-server/cart/count',
    method: 'get',
    params: { userId }
  });
}

/**
 * 获取购物车统计信息
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function getCartStatistics(userId) {
  return request({
    url: '/shopping-server/cart/statistics',
    method: 'get',
    params: { userId }
  });
}

/**
 * 更新购物车商品数量
 * @param {number} cartItemId - 购物车ID
 * @param {Object} data - 更新数据
 * @param {string} data.userId - 用户ID
 * @param {number} data.quantity - 数量
 * @returns {Promise}
 */
export function updateCartQuantity(cartItemId, data) {
  return request({
    url: `/shopping-server/cart/${cartItemId}/quantity`,
    method: 'put',
    data
  });
}

/**
 * 选中/取消选中购物车商品
 * @param {number} cartItemId - 购物车ID
 * @param {Object} data - 操作数据
 * @param {string} data.userId - 用户ID
 * @param {number} data.checked - 是否选中(0/1)
 * @returns {Promise}
 */
export function toggleCartItemChecked(cartItemId, data) {
  return request({
    url: `/shopping-server/cart/${cartItemId}/check`,
    method: 'put',
    data
  });
}

/**
 * 全选/取消全选
 * @param {Object} data - 操作数据
 * @param {string} data.userId - 用户ID
 * @param {number} data.checked - 是否全选(0/1)
 * @returns {Promise}
 */
export function toggleSelectAll(data) {
  return request({
    url: '/shopping-server/cart/check-all',
    method: 'put',
    data
  });
}

/**
 * 删除购物车商品
 * @param {number} cartItemId - 购物车ID
 * @param {string} userId - 用户ID
 * @returns {Promise}
 */
export function deleteCartItem(cartItemId, userId) {
  return request({
    url: `/shopping-server/cart/${cartItemId}`,
    method: 'delete',
    params: { userId }
  });
}

/**
 * 批量删除购物车商品
 * @param {Object} data - 删除数据
 * @param {number[]} data.ids - 购物车ID数组
 * @returns {Promise}
 */
export function batchDeleteCartItems(data) {
  return request({
    url: '/shopping-server/cart/batch',
    method: 'delete',
    data
  });
}

/**
 * 清空购物车
 * @param {number} userId - 用户ID
 * @returns {Promise}
 */
export function clearCart(userId) {
  return request({
    url: '/shopping-server/cart/clear',
    method: 'delete',
    params: { userId }
  });
}

export default {
  getCartList,
  addToCart,
  getSelectedCartItems,
  getCartCount,
  getCartStatistics,
  updateCartQuantity,
  toggleCartItemChecked,
  toggleSelectAll,
  deleteCartItem,
  batchDeleteCartItems,
  clearCart
};
