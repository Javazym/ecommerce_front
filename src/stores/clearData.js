/**
 * 数据清除工具
 * 用于在重新登录时清除所有用户相关的数据
 */
import { clearAddresses } from './addressStore.js'
import { clearCoupons } from './couponStore.js'
import { clearFavorites } from './favoriteStore.js'
import { clearMerchantData } from './merchantStore.js'
import { clearCartData } from './cartStore.js'
import { clearOrders } from './orderStore.js'
import { useUserStore } from './userStore.js'

/**
 * 清除所有用户数据
 * 在重新登录时调用,确保不会保留上一个用户的数据
 */
export function clearAllUserData() {
  // 清除地址数据
  clearAddresses()
  
  // 清除优惠券数据
  clearCoupons()
  
  // 清除收藏数据
  clearFavorites()
  
  // 清除商家数据
  clearMerchantData()
  
  // 清除购物车数据
  clearCartData()
  
  // 清除订单数据
  clearOrders()
  
  // 清除用户数据
  const userStore = useUserStore()
  userStore.logout()
  
  console.log('已清除所有用户数据')
}

export default clearAllUserData
