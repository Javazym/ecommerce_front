/**
 * 商品API模块
 */
import request from '../request';

/**
 * 分页查询商品
 * @param {Object} params - 查询参数
 * @param {string} [params.keyword] - 关键字
 * @param {number} [params.categoryId] - 分类ID
 * @param {number} [params.brandId] - 品牌ID
 * @param {number} [params.merchantId] - 商家ID
 * @param {number} [params.minPrice] - 价格区间-最低价
 * @param {number} [params.maxPrice] - 价格区间-最高价
 * @param {number} [params.rating] - 评分
 * @param {number} [params.isHot] - 是否热卖：0-全部，1-热卖
 * @param {number} [params.isFeatured] - 是否精选：0-全部，1-精选
 * @param {number} [params.isNew] - 是否新品：0-全部，1-新品
 * @param {number} [params.publishStatus] - 上架状态
 * @param {string} [params.sortField] - 排序字段：price-价格，sales-销量，rating-评分，createdAt-创建时间
 * @param {string} [params.sortOrder] - 排序方式：asc-升序，desc-降序
 * @param {number} [params.pageNum] - 页码
 * @param {number} [params.pageSize] - 每页数量
 * @returns {Promise}
 */
export function getProductList(params) {
  return request({
    url: '/shopping-server/products',
    method: 'get',
    params
  });
}

/**
 * 获取商品详情
 * @param {number} productId - 商品ID
 * @returns {Promise}
 */
export function getProductDetail(productId) {
  return request({
    url: `/shopping-server/products/${productId}`,
    method: 'get'
  });
}

/**
 * 获取热卖商品
 * @param {Object} params - 查询参数
 * @param {number} params.limit - 数量限制（必填）
 * @returns {Promise}
 */
export function getHotProducts(params) {
  return request({
    url: '/shopping-server/products/hot',
    method: 'get',
    params
  });
}

/**
 * 获取精选商品
 * @param {Object} params - 查询参数
 * @param {number} params.limit - 数量限制（必填）
 * @returns {Promise}
 */
export function getFeaturedProducts(params) {
  return request({
    url: '/shopping-server/products/featured',
    method: 'get',
    params
  });
}

/**
 * 获取新品
 * @param {Object} params - 查询参数
 * @param {number} params.limit - 数量限制（必填）
 * @returns {Promise}
 */
export function getNewProducts(params) {
  return request({
    url: '/shopping-server/products/new',
    method: 'get',
    params
  });
}

/**
 * 获取推荐商品
 * @param {Object} params - 查询参数
 * @param {number} params.limit - 数量限制（必填）
 * @returns {Promise}
 */
export function getRecommendedProducts(params) {
  return request({
    url: '/shopping-server/products/recommended',
    method: 'get',
    params
  });
}

/**
 * 搜索商品
 * @param {Object} params - 搜索参数
 * @param {string} params.keyword - 关键词（必填）
 * @param {number} params.pageNum - 页码（必填）
 * @param {number} params.pageSize - 每页数量（必填）
 * @returns {Promise}
 */
export function searchProducts(params) {
  return request({
    url: '/shopping-server/products/search',
    method: 'get',
    params
  });
}

/**
 * 获取商品分类列表
 * @param {number} [parentId] - 父分类ID
 * @returns {Promise}
 */
export function getCategoryList(parentId) {
  return request({
    url: '/shopping-server/products/categories',
    method: 'get',
    params: { parentId }
  });
}

/**
 * 获取商品分类详情
 * @param {number} categoryId - 分类ID
 * @returns {Promise}
 */
export function getCategoryDetail(categoryId) {
  return request({
    url: `/shopping-server/products/categories/${categoryId}`,
    method: 'get'
  });
}

/**
 * 创建商品
 * @param {Object} data - 商品数据
 * @param {string} data.name - 商品名称（必填，最多200字符）
 * @param {string} [data.subName] - 副标题（最多200字符）
 * @param {number} data.categoryId - 分类ID（必填）
 * @param {string} [data.image] - 主图
 * @param {Object} [data.images] - 图片列表
 * @param {number} data.price - 价格（必填，必须大于0）
 * @param {number} [data.originalPrice] - 原价（必须大于0）
 * @param {number} [data.costPrice] - 成本价（必须大于0）
 * @param {number} data.stock - 库存（必填，不能小于0）
 * @param {string} [data.description] - 描述
 * @param {string} [data.detail] - 详情
 * @param {number} [data.isHot] - 是否热卖
 * @param {number} [data.isFeatured] - 是否精选
 * @param {number} [data.isNew] - 是否新品
 * @param {number} [data.publishStatus] - 上架状态
 * @param {string} [data.tags] - 标签（最多500字符）
 * @param {string} [data.keywords] - 关键词（最多255字符）
 * @param {Array} [data.specs] - 规格列表
 * @param {Array} [data.skus] - SKU列表
 * @returns {Promise}
 */
export function addProduct(data) {
  return request({
    url: '/shopping-server/products',
    method: 'post',
    data
  });
}

/**
 * 更新商品
 * @param {number} productId - 商品ID
 * @param {Object} data - 商品数据
 * @param {number} data.id - 商品ID（必填）
 * @param {string} data.name - 商品名称（必填，最多200字符）
 * @param {string} [data.subName] - 副标题（最多200字符）
 * @param {number} data.categoryId - 分类ID（必填）
 * @param {string} [data.image] - 主图
 * @param {Object} [data.images] - 图片列表
 * @param {number} data.price - 价格（必填，必须大于0）
 * @param {number} [data.originalPrice] - 原价（必须大于0）
 * @param {number} [data.costPrice] - 成本价（必须大于0）
 * @param {number} data.stock - 库存（必填，不能小于0）
 * @param {string} [data.description] - 描述
 * @param {string} [data.detail] - 详情
 * @param {number} [data.isHot] - 是否热卖
 * @param {number} [data.isFeatured] - 是否精选
 * @param {number} [data.isNew] - 是否新品
 * @param {number} [data.publishStatus] - 上架状态
 * @param {string} [data.tags] - 标签（最多500字符）
 * @param {string} [data.keywords] - 关键词（最多255字符）
 * @param {Array} [data.specs] - 规格列表
 * @param {Array} [data.skus] - SKU列表
 * @returns {Promise}
 */
export function updateProduct(productId, data) {
  return request({
    url: `/shopping-server/products/${productId}`,
    method: 'put',
    data
  });
}

/**
 * 删除商品
 * @param {number} productId - 商品ID
 * @returns {Promise}
 */
export function deleteProduct(productId) {
  return request({
    url: `/shopping-server/products/${productId}`,
    method: 'delete'
  });
}

export default {
  getProductList,
  getProductDetail,
  getHotProducts,
  getFeaturedProducts,
  getNewProducts,
  getRecommendedProducts,
  searchProducts,
  getCategoryList,
  getCategoryDetail,
  addProduct,
  updateProduct,
  deleteProduct
};
