import request from '../request'

/**
 * AI Agent 商品审核相关接口
 */

// 获取商品审核列表（分页+筛选）
export function getProductReviewList(params) {
  return request({
    url: '/agent-server/ai/products',
    method: 'get',
    params
  })
}

// 获取商品详情
export function getProductDetail(id) {
  return request({
    url: `/shopping-server/products/${id}`,
    method: 'get'
  })
}

// 对单个商品发起 AI 审核
export function aiReviewProduct(id) {
  return request({
    url: `/agent-server/ai/agent/review/${id}`,
    method: 'post'
  })
}

// 批量发起 AI 审核
export function batchAiReview(productIds) {
  return request({
    url: '/agent-server/ai/agent/review/batch',
    method: 'post',
    data: { productIds }
  })
}

// 查询批量审核任务状态
export function getBatchReviewStatus(taskId) {
  return request({
    url: `/agent-server/ai/agent/review/status/${taskId}`,
    method: 'get'
  })
}

// 手动通过商品审核
export function approveProduct(id, data) {
  return request({
    url: `/shopping-server/products/${id}/approve`,
    method: 'post',
    data
  })
}

// 手动拒绝商品审核
export function rejectProduct(id, data) {
  return request({
    url: `/shopping-server/products/${id}/reject`,
    method: 'post',
    data
  })
}

// 获取审核历史
export function getAuditLogs(id) {
  return request({
    url: `/shopping-server/products/${id}/audit-logs`,
    method: 'get'
  })
}
