import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as agentApi from '@/api/modules/agent'

// Mock 数据开关
const USE_MOCK = import.meta.env.DEV

export const useProductStore = defineStore('product', () => {
  // 状态
  const productList = ref([])
  const total = ref(0)
  const currentProduct = ref(null)
  const auditLogs = ref([])
  const loading = ref(false)
  const batchReviewProgress = ref(0)
  const batchReviewTaskId = ref(null)

  // 统计数据
  const statistics = computed(() => ({
    pending: productList.value.filter(p => p.status === 'pending').length,
    reviewing: productList.value.filter(p => p.status === 'reviewing').length,
    approved: productList.value.filter(p => p.status === 'approved').length,
    rejected: productList.value.filter(p => p.status === 'rejected').length
  }))

  // 获取商品审核列表
  async function fetchProductList(params = {}) {
    loading.value = true
    try {
      if (USE_MOCK) {
        // Mock 数据
        await new Promise(resolve => setTimeout(resolve, 500))
        productList.value = [
          {
            id: 1,
            name: 'iPhone 15 Pro Max',
            image: 'https://via.placeholder.com/80',
            category: '电子产品',
            submitTime: '2026-06-07 10:30:00',
            status: 'pending',
            aiConfidence: 95.5
          },
          {
            id: 2,
            name: '华为 MatePad Pro',
            image: 'https://via.placeholder.com/80',
            category: '平板电脑',
            submitTime: '2026-06-07 09:15:00',
            status: 'reviewing',
            aiConfidence: 87.3
          },
          {
            id: 3,
            name: 'AirPods Pro 2',
            image: 'https://via.placeholder.com/80',
            category: '耳机',
            submitTime: '2026-06-06 16:45:00',
            status: 'approved',
            aiConfidence: 98.2
          },
          {
            id: 4,
            name: '小米手环 8',
            image: 'https://via.placeholder.com/80',
            category: '智能穿戴',
            submitTime: '2026-06-06 14:20:00',
            status: 'rejected',
            aiConfidence: 76.8
          }
        ]
        total.value = 4
        return productList.value
      }

      const res = await agentApi.getProductReviewList(params)
      productList.value = res.list || []
      total.value = res.total || 0
      return res
    } catch (error) {
      console.error('获取商品列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取商品详情
  async function fetchProductDetail(id) {
    loading.value = true
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        currentProduct.value = {
          id,
          name: 'iPhone 15 Pro Max',
          images: [
            'https://via.placeholder.com/400x400',
            'https://via.placeholder.com/400x400',
            'https://via.placeholder.com/400x400'
          ],
          category: '电子产品',
          description: 'Apple A17 Pro芯片，钛金属设计，可定制Action Button',
          price: 9999,
          stock: 100,
          submitter: '张三',
          submitTime: '2026-06-07 10:30:00'
        }
        return currentProduct.value
      }

      const res = await agentApi.getProductDetail(id)
      currentProduct.value = res
      return res
    } catch (error) {
      console.error('获取商品详情失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 发起 AI 审核
  async function startAiReview(id) {
    loading.value = true
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return { taskId: `task_${Date.now()}`, status: 'processing' }
      }

      const res = await agentApi.aiReviewProduct(id)
      return res
    } catch (error) {
      console.error('AI审核失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 批量 AI 审核
  async function startBatchReview(productIds) {
    loading.value = true
    batchReviewProgress.value = 0
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        batchReviewTaskId.value = `task_${Date.now()}`
        // 模拟进度更新
        simulateProgress()
        return { taskId: batchReviewTaskId.value, status: 'processing' }
      }

      const res = await agentApi.batchAiReview(productIds)
      batchReviewTaskId.value = res.taskId
      return res
    } catch (error) {
      console.error('批量审核失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 模拟进度更新
  function simulateProgress() {
    let progress = 0
    const timer = setInterval(() => {
      progress += 10
      batchReviewProgress.value = progress
      if (progress >= 100) {
        clearInterval(timer)
      }
    }, 200)
  }

  // 查询批量审核状态
  async function checkBatchStatus(taskId) {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { taskId, status: 'completed', progress: 100, results: { success: 3, failed: 1 } }
      }

      const res = await agentApi.getBatchReviewStatus(taskId)
      return res
    } catch (error) {
      console.error('查询审核状态失败:', error)
      throw error
    }
  }

  // 手动通过
  async function approveProduct(id, data) {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { success: true }
      }

      const res = await agentApi.approveProduct(id, data)
      return res
    } catch (error) {
      console.error('手动通过失败:', error)
      throw error
    }
  }

  // 手动拒绝
  async function rejectProduct(id, data) {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { success: true }
      }

      const res = await agentApi.rejectProduct(id, data)
      return res
    } catch (error) {
      console.error('手动拒绝失败:', error)
      throw error
    }
  }

  // 获取审核历史
  async function fetchAuditLogs(id) {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        auditLogs.value = [
          {
            id: 1,
            operator: 'AI系统',
            action: '初审完成',
            conclusion: '建议通过',
            time: '2026-06-07 10:31:00',
            remark: 'AI置信度95.5%，商品符合规范'
          },
          {
            id: 2,
            operator: '管理员',
            action: '人工复核',
            conclusion: '通过',
            time: '2026-06-07 10:35:00',
            remark: '确认商品信息完整合规'
          }
        ]
        return auditLogs.value
      }

      const res = await agentApi.getAuditLogs(id)
      auditLogs.value = res
      return res
    } catch (error) {
      console.error('获取审核历史失败:', error)
      throw error
    }
  }

  // 重置状态
  function resetState() {
    currentProduct.value = null
    auditLogs.value = []
    batchReviewProgress.value = 0
    batchReviewTaskId.value = null
  }

  return {
    productList,
    total,
    currentProduct,
    auditLogs,
    loading,
    batchReviewProgress,
    batchReviewTaskId,
    statistics,
    fetchProductList,
    fetchProductDetail,
    startAiReview,
    startBatchReview,
    checkBatchStatus,
    approveProduct,
    rejectProduct,
    fetchAuditLogs,
    resetState
  }
})
