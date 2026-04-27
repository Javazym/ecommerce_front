/**
 * 收藏API模块
 */
import request from '../request';

/**
 * 获取用户收藏列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function getFavoriteList(params) {
  return request({
    url: '/shopping-server/favorites',
    method: 'get',
    params
  });
}

/**
 * 添加收藏
 * @param {Object} data - 收藏数据
 * @param {number} data.productId - 商品ID（必填）
 * @returns {Promise}
 */
export function addFavorite(data) {
  return request({
    url: '/shopping-server/favorites',
    method: 'post',
    params: {
      productId: data
    }
  });
}

/**
 * 取消收藏
 * @param {number} productId - 商品ID（必填）
 * @returns {Promise}
 */
export function removeFavorite(productId) {
  return request({
    url: `/shopping-server/favorites/${productId}`,
    method: 'delete'
  });
}

/**
 * 检查是否已收藏
 * @param {number} productId - 商品ID（必填）
 * @returns {Promise}
 */
export function checkFavorite(productId) {
  return request({
    url: '/shopping-server/favorites/check',
    method: 'get',
    params: { productId }
  });
}

/**
 * 获取收藏数量
 * @returns {Promise}
 */
export function getFavoriteCount() {
  return request({
    url: '/shopping-server/favorites/count',
    method: 'get'
  });
}

/**
 * 清空收藏夹
 * @returns {Promise}
 */
export function clearFavorites() {
  return request({
    url: '/shopping-server/favorites/clear',
    method: 'delete'
  });
}

/**
 * 批量删除收藏
 * @param {number[]} productIds - 商品ID数组
 * @returns {Promise}
 */
export function batchRemoveFavorites(productIds) {
  return request({
    url: '/shopping-server/favorites/batch',
    method: 'delete',
    data: productIds
  });
}

export default {
  getFavoriteList,
  addFavorite,
  removeFavorite,
  checkFavorite,
  getFavoriteCount,
  clearFavorites,
  batchRemoveFavorites
};
