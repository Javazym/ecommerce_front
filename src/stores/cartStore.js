/**
 * 购物车状态管理
 * 包含购物车商品管理、数量调整、结算等功能
 */
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 创建购物车状态
const state = reactive({
  // 购物车商品列表
  items: [
    {
      id: 1,
      productId: 1,
      name: 'Apple AirPods Pro 2',
      price: 1899,
      originalPrice: 2199,
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100',
      skuId: 1,
      skuSpecs: '白色',
      quantity: 1,
      stock: 100,
      selected: true,
      merchantName: 'Apple官方旗舰店',
      merchantId: 1
    },
    {
      id: 2,
      productId: 5,
      name: 'Nike Air Max 270',
      price: 799,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100',
      skuId: 5,
      skuSpecs: '黑色/白色, 42码',
      quantity: 1,
      stock: 50,
      selected: true,
      merchantName: 'Nike官方旗舰店',
      merchantId: 2
    }
  ],

  // 加载状态
  loading: false,

  // 统计
  statistics: {
    totalItems: 2,
    totalAmount: 2698,
    selectedAmount: 2698
  }
})

// 计算属性
const selectedItems = computed(() => {
  return state.items.filter(item => item.selected)
})

const totalQuantity = computed(() => {
  return state.items.reduce((sum, item) => sum + item.quantity, 0)
})

const totalPrice = computed(() => {
  return state.items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const selectedCount = computed(() => {
  return selectedItems.value.length
})

// 方法：添加商品到购物车
function addItem(product) {
  // 检查是否已存在
  const exists = state.items.find(item => item.productId === product.productId)
  if (exists) {
    exists.quantity += product.quantity || 1
    ElMessage.success('已增加商品数量')
  } else {
    state.items.push({
      id: Date.now(),
      productId: product.productId,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      skuId: product.skuId || 0,
      skuSpecs: product.skuSpecs || '',
      quantity: product.quantity || 1,
      stock: product.stock || 999,
      selected: true,
      merchantName: product.merchantName || '',
      merchantId: product.merchantId || 0
    })
    ElMessage.success('已添加到购物车')
  }
  updateStatistics()
}

// 方法：移除商品
function removeItem(itemId) {
  const index = state.items.findIndex(item => item.id === itemId)
  if (index > -1) {
    state.items.splice(index, 1)
    ElMessage.success('已从购物车移除')
    updateStatistics()
  }
}

// 方法：更新商品数量
function updateQuantity(itemId, quantity) {
  const item = state.items.find(item => item.id === itemId)
  if (item) {
    if (quantity <= 0) {
      removeItem(itemId)
    } else if (quantity > item.stock) {
      ElMessage.warning('库存不足')
      item.quantity = item.stock
    } else {
      item.quantity = quantity
    }
    updateStatistics()
  }
}

// 方法：增加数量
function increaseQuantity(itemId) {
  const item = state.items.find(item => item.id === itemId)
  if (item) {
    if (item.quantity >= item.stock) {
      ElMessage.warning('库存不足')
      return
    }
    item.quantity++
    updateStatistics()
  }
}

// 方法：减少数量
function decreaseQuantity(itemId) {
  const item = state.items.find(item => item.id === itemId)
  if (item) {
    if (item.quantity <= 1) {
      removeItem(itemId)
    } else {
      item.quantity--
      updateStatistics()
    }
  }
}

// 方法：选择/取消选择
function toggleSelect(itemId) {
  const item = state.items.find(item => item.id === itemId)
  if (item) {
    item.selected = !item.selected
    updateStatistics()
  }
}

// 方法：全选/取消全选
function toggleSelectAll() {
  const allSelected = state.items.every(item => item.selected)
  state.items.forEach(item => {
    item.selected = !allSelected
  })
  updateStatistics()
}

// 方法：清空购物车
function clearCart() {
  state.items = []
  updateStatistics()
  ElMessage.success('购物车已清空')
}

// 方法：清空已选商品
function clearSelected() {
  state.items = state.items.filter(item => !item.selected)
  updateStatistics()
  ElMessage.success('已选商品已清空')
}

// 方法：更新统计
function updateStatistics() {
  state.statistics = {
    totalItems: state.items.length,
    totalAmount: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    selectedAmount: selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
}

// 方法：检查商品是否在购物车
function isInCart(productId) {
  return state.items.some(item => item.productId === productId)
}

// 方法：获取商品数量
function getItemQuantity(productId) {
  const item = state.items.find(item => item.productId === productId)
  return item ? item.quantity : 0
}

// 方法：清除购物车数据
function clearCartData() {
  state.items = []
  state.statistics = {
    totalItems: 0,
    totalAmount: 0,
    selectedAmount: 0
  }
}

export {
  state,
  selectedItems,
  totalQuantity,
  totalPrice,
  selectedCount,
  addItem,
  removeItem,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  toggleSelect,
  toggleSelectAll,
  clearCart,
  clearSelected,
  updateStatistics,
  isInCart,
  getItemQuantity,
  clearCartData
}

export default {
  state,
  addItem,
  removeItem,
  updateQuantity,
  toggleSelect,
  toggleSelectAll,
  clearCart,
  updateStatistics
}
