// 收藏状态管理
import { reactive } from 'vue'

// 创建收藏状态
const state = reactive({
  favorites: []
})

// 检查商品是否已收藏
export function isFavorite(productId) {
  return state.favorites.some(item => item.id === productId)
}

// 添加收藏
export function addFavorite(product) {
  if (!isFavorite(product.id)) {
    state.favorites.push({ ...product })
  }
}

// 移除收藏
export function removeFavorite(productId) {
  const index = state.favorites.findIndex(item => item.id === productId)
  if (index > -1) {
    state.favorites.splice(index, 1)
  }
}

// 切换收藏状态
export function toggleFavorite(product) {
  if (isFavorite(product.id)) {
    removeFavorite(product.id)
    return false
  } else {
    addFavorite(product)
    return true
  }
}

// 获取所有收藏
export function getFavorites() {
  return state.favorites
}

export default state
