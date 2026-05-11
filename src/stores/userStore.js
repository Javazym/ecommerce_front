/**
 * 用户状态管理
 * 包含用户信息、登录状态、个人资料管理等
 * 使用 Pinia + 持久化存储
 */
import { defineStore } from 'pinia'
import {ref, computed, reactive} from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户登录状态
  const isLoggedIn = ref(false)
  const userId = ref(null)

  // 用户基本信息
  const userInfo = ref({})

  // 收货地址列表
  const addresses = ref([
    {
      id: 1,
      name: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南路XX号',
      isDefault: true
    },
    {
      id: 2,
      name: '李四',
      phone: '13900139000',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: '体育西路XX号',
      isDefault: false
    }
  ])

  // 用户统计
  const statistics = reactive({
    pendingPayment: 2,
    pendingShipment: 1,
    pendingReceipt: 3,
    pendingReview: 5,
    couponCount: 28,
    favoriteCount: 156,
    totalOrders: 89
  })

  // 计算属性
  const userLevelProgress = computed(() => {
    if (!userInfo.value.growthValue || !userInfo.value.nextLevelGrowth) return '0.0'
    return (userInfo.value.growthValue / userInfo.value.nextLevelGrowth * 100).toFixed(1)
  })

  const defaultAddress = computed(() => {
    return addresses.value.find(addr => addr.isDefault) || addresses.value[0]
  })

  // 方法：更新用户信息
  function updateUserInfo(data) {
    Object.assign(userInfo.value, data)
  }

  // 方法：更新统计
  function updateStatistics(newStats) {
    Object.assign(statistics, newStats)
  }

  // 方法：添加地址
  function addAddress(address) {
    const newId = Math.max(...addresses.value.map(a => a.id), 0) + 1
    addresses.value.push({
      id: newId,
      ...address,
      isDefault: addresses.value.length === 0
    })
  }

  // 方法：更新地址
  function updateAddress(addressId, data) {
    const index = addresses.value.findIndex(a => a.id === addressId)
    if (index > -1) {
      Object.assign(addresses.value[index], data)
    }
  }

  // 方法：删除地址
  function deleteAddress(addressId) {
    const index = addresses.value.findIndex(a => a.id === addressId)
    if (index > -1) {
      addresses.value.splice(index, 1)
    }
  }

  // 方法：设置默认地址
  function setDefaultAddress(addressId) {
    addresses.value.forEach(addr => {
      addr.isDefault = addr.id === addressId
    })
  }

  // 方法：更新用户头像
  function updateAvatar(avatarUrl) {
    userInfo.value.avatar = avatarUrl
  }

  // 方法：设置登录状态
  function setLoginStatus(status, id = null) {
    isLoggedIn.value = status
    if (id) {
      userId.value = id
    }
  }

  // 方法：增加成长值
  function addGrowthValue(value) {
    userInfo.value.growthValue += value
    // 检查是否升级
    if (userInfo.value.growthValue >= userInfo.value.nextLevelGrowth) {
      // 模拟升级逻辑
      const levels = ['普通会员', '银卡会员', '金卡会员', '白金会员', '钻石会员', 'VIP会员']
      const currentIndex = levels.indexOf(userInfo.value.level)
      if (currentIndex < levels.length - 1) {
        userInfo.value.level = levels[currentIndex + 1]
        userInfo.value.growthValue = 0
        userInfo.value.nextLevelGrowth = userInfo.value.nextLevelGrowth * 1.5
      }
    }
  }

  // 方法：退出登录
  function logout() {
    isLoggedIn.value = false
    userId.value = null
    userInfo.value = {}
    addresses.value = []
    statistics.pendingPayment = 0
    statistics.pendingShipment = 0
    statistics.pendingReceipt = 0
    statistics.pendingReview = 0
    statistics.couponCount = 0
    statistics.favoriteCount = 0
    statistics.totalOrders = 0
  }

  return {
    // 状态
    isLoggedIn,
    userId,
    userInfo,
    addresses,
    statistics,
    // 计算属性
    userLevelProgress,
    defaultAddress,
    // 方法
    updateUserInfo,
    updateStatistics,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    updateAvatar,
    setLoginStatus,
    addGrowthValue,
    logout
  }
}, {
  // 持久化配置
  persist: {
    key: 'user-store', // 存储的key
    storage: localStorage, // 使用localStorage存储
    paths: [
      'isLoggedIn',
      'userId',
      'userInfo',
      'addresses',
      'statistics'
    ] // 需要持久化的字段
  }
})
