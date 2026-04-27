/**
 * 商品分类API模块
 */
import request from '../request';

/**
 * 获取分类树形结构
 * @returns {Promise}
 */
export function getCategoryTree() {
  return request({
    url: '/shopping-server/categories/tree',
    method: 'get'
  });
}

/**
 * 获取指定层级的分类列表
 * @param {number} level - 层级(1-一级, 2-二级, 3-三级)
 * @returns {Promise}
 */
export function getCategoriesByLevel(level) {
  return request({
    url: `/shopping-server/categories/level/${level}`,
    method: 'get'
  });
}

/**
 * 获取分类详情
 * @param {number} categoryId - 分类ID
 * @returns {Promise}
 */
export function getCategoryDetail(categoryId) {
  return request({
    url: `/shopping-server/categories/${categoryId}`,
    method: 'get'
  });
}

/**
 * 创建分类
 * @param {Object} data - 分类数据
 * @param {number} [data.id] - 分类ID(更新时必填)
 * @param {number} [data.parentId] - 父分类ID(0表示顶级分类)
 * @param {string} data.name - 分类名称（必填）
 * @param {number} [data.level] - 层级：1-一级，2-二级，3-三级
 * @param {string} [data.icon] - 分类图标
 * @param {string} [data.image] - 分类图片
 * @param {number} [data.sort] - 排序值(数值越小越靠前)
 * @param {number} [data.status] - 状态：0-禁用，1-启用
 * @param {Array} [data.children] - 子分类列表
 * @returns {Promise}
 */
export function addCategory(data) {
  return request({
    url: '/shopping-server/categories',
    method: 'post',
    data
  });
}

/**
 * 更新分类
 * @param {number} categoryId - 分类ID
 * @param {Object} data - 分类数据
 * @param {number} [data.id] - 分类ID(更新时必填)
 * @param {number} [data.parentId] - 父分类ID(0表示顶级分类)
 * @param {string} data.name - 分类名称（必填）
 * @param {number} [data.level] - 层级：1-一级，2-二级，3-三级
 * @param {string} [data.icon] - 分类图标
 * @param {string} [data.image] - 分类图片
 * @param {number} [data.sort] - 排序值(数值越小越靠前)
 * @param {number} [data.status] - 状态：0-禁用，1-启用
 * @param {Array} [data.children] - 子分类列表
 * @returns {Promise}
 */
export function updateCategory(categoryId, data) {
  return request({
    url: `/shopping-server/categories/${categoryId}`,
    method: 'put',
    data
  });
}

/**
 * 删除分类
 * @param {number} categoryId - 分类ID
 * @returns {Promise}
 */
export function deleteCategory(categoryId) {
  return request({
    url: `/shopping-server/categories/${categoryId}`,
    method: 'delete'
  });
}

/**
 * 更新分类状态
 * @param {number} categoryId - 分类ID
 * @param {number} status - 状态(0-禁用, 1-启用)
 * @returns {Promise}
 */
export function updateCategoryStatus(categoryId, status) {
  return request({
    url: `/shopping-server/categories/${categoryId}/status`,
    method: 'put',
    data: { status }
  });
}

/**
 * 更新分类排序
 * @param {number} categoryId - 分类ID
 * @param {number} sort - 排序值
 * @returns {Promise}
 */
export function updateCategorySort(categoryId, sort) {
  return request({
    url: `/shopping-server/categories/${categoryId}/sort`,
    method: 'put',
    data: { sort }
  });
}

export default {
  getCategoryTree,
  getCategoriesByLevel,
  getCategoryDetail,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
  updateCategorySort
};
