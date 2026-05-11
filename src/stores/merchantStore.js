/**
 * 商家入驻状态管理
 * 包含商家申请、商家信息、店铺管理等功能
 */
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {applyMerchant, getApplyMerchant, getTheMerchantInfo} from "../api/modules/merchant.js";

// 创建商家状态
const state = reactive({
  // 商家入驻申请状态
  applicationStatus: {
    status: null, // null: 未申请, 0: 审核中, 1: 已通过, 2: 未通过
    submitTime: null,
    reviewTime: null,
    rejectReason: null
  },

  // 商家信息（对齐 MerchantDTO）
  merchantInfo: {
    id: 1,
    userId: '',
    storeName: '',
    storeLogo: '',
    storeBanner: '',
    storeDescription: '',
    storeType: '', // flagship: 旗舰店, specialty: 专卖店, franchise: 专营店, regular: 普通店
    storeTypeName: '',
    category: '',
    categoryName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '', // 对齐 DTO
    businessLicense: '',
    idCardFront: '',
    idCardBack: '',
    status: '', // pending: 待审核, approved: 已通过, rejected: 未通过
    statusText: '',
    createTime: '',
    auditTime: ''
  },

  // 入驻表单数据【100% 对齐 ApplySettleDTO】
  applicationForm: {
    storeName: '',
    storeType: '',
    category: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    businessLicense: null,
    idCardFront: null,
    idCardBack: null
  },

  // 店铺设置
  shopSettings: {
    storeNotice: '欢迎光临本店！',
    customerService: true,
    autoReply: true,
    replyContent: '您好，欢迎咨询！'
  },

  // 是否已入驻
  isMerchant: computed(() => state.applicationStatus.status === 0),

  // 加载状态
  loading: false
})

// 店铺类型映射
const storeTypeMap = {
  flagship: '旗舰店',
  specialty: '专卖店',
  franchise: '专营店',
  regular: '普通店'
}

// ==========================================
// 🔥 真实后端接口提交入驻申请（对齐 /merchants/apply）
// ==========================================
async function submitApplication(formData) {
  // 前端校验
  if (!formData.storeName) {
    ElMessage.warning('请填写店铺名称')
    return false
  }
  if (!formData.storeType) {
    ElMessage.warning('请选择店铺类型')
    return false
  }
  if (!formData.contactName) {
    ElMessage.warning('请填写联系人姓名')
    return false
  }
  if (!formData.contactPhone) {
    ElMessage.warning('请填写联系电话')
    return false
  }
  if (!formData.contactEmail) {
    ElMessage.warning('请填写联系邮箱')
    return false
  }

  state.loading = true
  try {
    // 调用真实后端接口
    const res = await getApplyMerchant()

    if (res.code === 1000) {
      state.applicationStatus = {
        status: 1,
        submitTime: new Date().toLocaleString(),
        reviewTime: null,
        rejectReason: null
      }
      ElMessage.success('入驻申请已提交，请等待审核')
      return true
    } else {
      ElMessage.error(res.msg || '提交失败')
      return false
    }
  } catch (err) {
    ElMessage.error('提交失败：' + err.message)
    return false
  } finally {
    state.loading = false
  }
}

// ==========================================
// 获取当前用户商家信息
// ==========================================
async function getMerchantInfo() {
  try {
    const res = await getTheMerchantInfo()
    if (res.code === 1000 && res.data) {
      updateMerchantInfo(res.data)
      state.applicationStatus = {
        status: res.data.status,
        submitTime: res.data.applyTime,
        reviewTime: res.data.applyTime,
        rejectReason: res.data.rejectReason
      }
    }
    return res.data
  } catch (err) {
    console.error('获取商家信息失败', err)
  }
}

// ==========================================
// 更新商家信息
// ==========================================
function updateMerchantInfo(info) {
  Object.assign(state.merchantInfo, info)
  if (info.storeType && storeTypeMap[info.storeType]) {
    state.merchantInfo.storeTypeName = storeTypeMap[info.storeType]
  }
}

// ==========================================
// 更新店铺设置
// ==========================================
function updateShopSettings(settings) {
  Object.assign(state.shopSettings, settings)
  ElMessage.success('店铺设置已更新')
}

// ==========================================
// 取消申请
// ==========================================
function cancelApplication() {
  if (state.applicationStatus.status === 2) {
    state.applicationStatus = {
      status: 0,
      submitTime: null,
      reviewTime: null,
      rejectReason: null
    }
    ElMessage.success('已取消入驻申请')
  }
}

// ==========================================
// 重新申请
// ==========================================
function resubmitApplication() {
  state.applicationStatus = {
    status: 1,
    submitTime: null,
    reviewTime: null,
    rejectReason: null
  }
}

// ==========================================
// 状态判断
// ==========================================
function hasApplied() {
  return state.applicationStatus.status !== null
}

function isPending() {
  return state.applicationStatus.status === 0
}

function getStoreTypeName(type) {
  return storeTypeMap[type] || type
}

// ==========================================
// 清除商家数据
// ==========================================
function clearMerchantData() {
  state.applicationStatus = {
    status: null,
    submitTime: null,
    reviewTime: null,
    rejectReason: null
  }
  state.merchantInfo = {
    id: 1,
    userId: '',
    storeName: '',
    storeLogo: '',
    storeBanner: '',
    storeDescription: '',
    storeType: '',
    storeTypeName: '',
    category: '',
    categoryName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    businessLicense: '',
    idCardFront: '',
    idCardBack: '',
    status: '',
    statusText: '',
    createTime: '',
    auditTime: ''
  }
  state.applicationForm = {
    storeName: '',
    storeType: '',
    category: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    businessLicense: null,
    idCardFront: null,
    idCardBack: null
  }
}

export {
  state,
  storeTypeMap,
  submitApplication,
  getMerchantInfo,
  updateMerchantInfo,
  updateShopSettings,
  cancelApplication,
  resubmitApplication,
  hasApplied,
  isPending,
  getStoreTypeName,
  clearMerchantData
}

export default state
