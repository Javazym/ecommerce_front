/**
 * 用户状态管理
 * 包含用户信息、登录状态、个人资料管理等
 */
import { reactive, computed } from 'vue'

// 创建用户状态
const state = reactive({
  // 用户登录状态
  isLoggedIn: true,
  userId: 1,

  // 用户基本信息
  userInfo: {
  },

  // 收货地址列表
  addresses: [
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
  ],

  // 用户统计
  statistics: {
    pendingPayment: 2,
    pendingShipment: 1,
    pendingReceipt: 3,
    pendingReview: 5,
    couponCount: 28,
    favoriteCount: 156,
    totalOrders: 89
  }
})

// 计算属性
const userLevelProgress = computed(() => {
  return (state.userInfo.growthValue / state.userInfo.nextLevelGrowth * 100).toFixed(1)
})

const defaultAddress = computed(() => {
  return state.addresses.find(addr => addr.isDefault) || state.addresses[0]
})

// 方法：更新用户信息
function updateUserInfo(data) {
  Object.assign(state.userInfo, data)
}

// 方法：更新统计
function updateStatistics(newStats) {
  Object.assign(state.statistics, newStats)
}

// 方法：添加地址
function addAddress(address) {
  const newId = Math.max(...state.addresses.map(a => a.id), 0) + 1
  state.addresses.push({
    id: newId,
    ...address,
    isDefault: state.addresses.length === 0
  })
}

// 方法：更新地址
function updateAddress(addressId, data) {
  const index = state.addresses.findIndex(a => a.id === addressId)
  if (index > -1) {
    Object.assign(state.addresses[index], data)
  }
}

// 方法：删除地址
function deleteAddress(addressId) {
  const index = state.addresses.findIndex(a => a.id === addressId)
  if (index > -1) {
    state.addresses.splice(index, 1)
  }
}

// 方法：设置默认地址
function setDefaultAddress(addressId) {
  state.addresses.forEach(addr => {
    addr.isDefault = addr.id === addressId
  })
}

// 方法：更新用户头像
function updateAvatar(avatarUrl) {
  state.userInfo.avatar = avatarUrl
}

// 方法：设置登录状态
function setLoginStatus(status, userId = null) {
  state.isLoggedIn = status
  if (userId) {
    state.userId = userId
  }
}

// 方法：增加成长值
function addGrowthValue(value) {
  state.userInfo.growthValue += value
  // 检查是否升级
  if (state.userInfo.growthValue >= state.userInfo.nextLevelGrowth) {
    // 模拟升级逻辑
    const levels = ['普通会员', '银卡会员', '金卡会员', '白金会员', '钻石会员', 'VIP会员']
    const currentIndex = levels.indexOf(state.userInfo.level)
    if (currentIndex < levels.length - 1) {
      state.userInfo.level = levels[currentIndex + 1]
      state.userInfo.growthValue = 0
      state.userInfo.nextLevelGrowth = state.userInfo.nextLevelGrowth * 1.5
    }
  }
}

export {
  state,
  userLevelProgress,
  defaultAddress,
  updateUserInfo,
  updateStatistics,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  updateAvatar,
  setLoginStatus,
  addGrowthValue
}

export default state
