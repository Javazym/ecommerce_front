/**
 * 商品评价API模块
 */
import request from '../request';

/**
 * 获取商品评价列表
 * @param {Object} params - 查询参数
 * @param {number} params.productId - 商品ID
 * @param {number} [params.pageNum] - 页码
 * @param {number} [params.pageSize] - 每页数量
 * @param {string} [params.rating] - 评分筛选
 * @returns {Promise}
 */
export function getProductReviews(params) {
  return request({
    url: '/shopping-server/review/list',
    method: 'get',
    params
  });
}

/**
 * 获取评价详情
 * @param {number} id - 评价ID
 * @returns {Promise}
 */
export function getReviewDetail(id) {
  return request({
    url: `/shopping-server/review/${id}`,
    method: 'get'
  });
}

/**
 * 删除评价
 * @param {number} id - 评价ID
 * @returns {Promise}
 */
export function deleteReview(id) {
  return request({
    url: `/shopping-server/review/${id}`,
    method: 'delete'
  });
}

/**
 * 添加评价
 * @param {Object} data - 评价数据
 * @param {number} data.orderId - 订单ID
 * @param {number} data.productId - 商品ID
 * @param {number} data.rating - 评分(1-5)
 * @param {string} data.content - 评价内容
 * @param {string[]} [data.images] - 评价图片
 * @returns {Promise}
 */
export function addReview(data) {
  return request({
    url: '/shopping-server/review',
    method: 'post',
    data
  });
}

/**
 * 商家回复评价
 * @param {Object} data - 回复数据
 * @param {number} data.reviewId - 评价ID
 * @param {string} data.replyContent - 回复内容
 * @returns {Promise}
 */
export function replyReview(data) {
  return request({
    url: '/shopping-server/review/reply',
    method: 'post',
    data
  });
}

/**
 * 点赞评价
 * @param {number} id - 评价ID
 * @returns {Promise}
 */
export function likeReview(id) {
  return request({
    url: `/shopping-server/review/${id}/like`,
    method: 'post'
  });
}

/**
 * 获取评价统计
 * @param {number} productId - 商品ID
 * @returns {Promise}
 */
export function getReviewStatistics(productId) {
  return request({
    url: '/shopping-server/review/statistics',
    method: 'get',
    params: { productId }
  });
}

export default {
  getProductReviews,
  getReviewDetail,
  deleteReview,
  addReview,
  replyReview,
  likeReview,
  getReviewStatistics
};
