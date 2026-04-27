/**
 * 收藏状态管理
 * 包含商品收藏、店铺收藏等
 */
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getFavoriteList,
  addFavorite as apiAddFavorite,
  removeFavorite as apiRemoveFavorite,
  checkFavorite as apiCheckFavorite,
  getFavoriteCount as apiGetFavoriteCount,
  clearFavorites as apiClearFavorites,
  batchRemoveFavorites as apiBatchRemoveFavorites
} from '../api/modules/favorite.js'

// 创建收藏状态
const state = reactive({
  // 商品收藏列表（从后端获取）
  productFavorites: [],

  // 加载状态
  loading: false,

  // 统计
  statistics: {
    productCount: 0,
    storeCount: 0
  }
})

// 计算属性
const totalFavorites = computed(() => {
  return state.productFavorites.length
})

// 方法：获取收藏列表
async function fetchFavorites(params = {}) {
  state.loading = true
  try {
    const requestParams = {
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 10,
      ...params
    }

    const res = await getFavoriteList(requestParams)
    console.log('收藏列表响应:', res)
    if (res.code === 1000 && res.data) {
      console.log('收藏数据:', res.data)
      // 适配后端返回的数据结构
      // 后端可能返回 { content: [], total: 0 } 或直接返回 []
      const favorites = Array.isArray(res.data) ? res.data : (res.data.content || [])
      console.log('处理后的收藏列表:', favorites)
      state.productFavorites = favorites.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.productName,
        price: item.productPrice,
        image: item.productImage,
        merchantName: item.merchantName,
        addTime: item.createdAt
      }))
      console.log('state.productFavorites:', state.productFavorites)
      updateStatistics()
    }
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    ElMessage.error('获取收藏列表失败')
  } finally {
    state.loading = false
  }
}

// 方法：添加商品收藏
async function addProductFavorite(productId) {
  try {
    const res = await apiAddFavorite(productId)
    if (res.code === 1000 && res.data) {
      ElMessage.success('已添加到收藏夹')
      // 重新加载收藏列表
      await fetchFavorites()
      return true
    } else {
      ElMessage.warning(res.message || '该商品已在收藏夹中')
      return false
    }
  } catch (error) {
    console.error('添加收藏失败:', error)
    ElMessage.error('添加收藏失败')
    return false
  }
}

// 方法：移除商品收藏
async function removeProductFavorite(productId) {
  try {
    const res = await apiRemoveFavorite(productId)
    if (res.code === 1000 && res.data) {
      ElMessage.success('已取消收藏')
      // 重新加载收藏列表
      await fetchFavorites()
      return true
    }
  } catch (error) {
    console.error('取消收藏失败:', error)
    ElMessage.error('取消收藏失败')
  }
  return false
}

// 方法：检查商品是否已收藏
async function isProductFavorite(productId) {
  try {
    const res = await apiCheckFavorite(productId)
    if (res.code === 1000) {
      return res.data === true
    }
  } catch (error) {
    console.error('检查收藏状态失败:', error)
  }
  return false
}

// 方法：获取收藏数量
async function getFavoriteCount() {
  try {
    const res = await apiGetFavoriteCount()
    if (res.code === 1000) {
      state.statistics.productCount = res.data || 0
      return res.data
    }
  } catch (error) {
    console.error('获取收藏数量失败:', error)
  }
  return 0
}

// 方法：更新统计
function updateStatistics() {
  state.statistics = {
    productCount: state.productFavorites.length,
    storeCount: 0  // 后端 API 不支持店铺收藏
  }
}

// 方法：清空商品收藏
async function clearProductFavorites() {
  try {
    const res = await apiClearFavorites()
    if (res.code === 1000 && res.data) {
      state.productFavorites = []
      updateStatistics()
      ElMessage.success('已清空商品收藏')
    }
  } catch (error) {
    console.error('清空收藏失败:', error)
    ElMessage.error('清空收藏失败')
  }
}

// 方法：批量移除收藏
async function batchRemoveProductFavorites(productIds) {
  try {
    const res = await apiBatchRemoveFavorites(productIds)
    if (res.code === 1000 && res.data) {
      // 重新加载收藏列表
      await fetchFavorites()
      ElMessage.success('已批量取消收藏')
    }
  } catch (error) {
    console.error('批量取消收藏失败:', error)
    ElMessage.error('批量取消收藏失败')
  }
}

export {
  state,
  totalFavorites,
  fetchFavorites,
  addProductFavorite,
  removeProductFavorite,
  isProductFavorite,
  getFavoriteCount,
  updateStatistics,
  clearProductFavorites,
  batchRemoveProductFavorites
}

export default state
