/**
 * 轮播图API模块
 */
import request from '../request';

/**
 * 获取轮播图列表
 * @param {string} [position] - 轮播图位置
 * @returns {Promise}
 */
export function getBannerList(position) {
  return request({
    url: '/shopping-server/banner/list',
    method: 'get',
    params: { position }
  });
}

/**
 * 增加轮播图点击次数
 * @param {number} id - 轮播图ID
 * @returns {Promise}
 */
export function incrementBannerClick(id) {
  return request({
    url: `/shopping-server/banner/${id}/click`,
    method: 'post'
  });
}

export default {
  getBannerList,
  incrementBannerClick
};
