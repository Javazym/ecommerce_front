/**
 * 公告API模块
 */
import request from '../request';

/**
 * 获取公告列表
 * @param {Object} params - 查询参数
 * @param {number} [params.pageNum] - 页码
 * @param {number} [params.pageSize] - 每页数量
 * @param {string} [params.type] - 公告类型
 * @returns {Promise}
 */
export function getAnnouncementList(params) {
  return request({
    url: '/shopping-server/announcement/list',
    method: 'get',
    params
  });
}

/**
 * 获取公告详情
 * @param {number} id - 公告ID
 * @returns {Promise}
 */
export function getAnnouncementDetail(id) {
  return request({
    url: `/shopping-server/announcement/${id}`,
    method: 'get'
  });
}

export default {
  getAnnouncementList,
  getAnnouncementDetail
};
