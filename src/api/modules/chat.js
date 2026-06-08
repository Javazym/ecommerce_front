import request from '../request'

/**
 * AI Agent 聊天相关接口
 */

// 获取会话列表
export function getChatSessions() {
  return request({
    url: '/agent-server/chat/sessions',
    method: 'get'
  })
}

// 新建会话
export function createChatSession(data) {
  return request({
    url: '/agent-server/chat/sessions',
    method: 'post',
    data
  })
}

// 删除会话
export function deleteChatSession(id) {
  return request({
    url: `/agent-server/chat/sessions/${id}`,
    method: 'delete'
  })
}

// 获取历史消息
export function getChatMessages(sessionId, params) {
  return request({
    url: `/agent-server/chat/sessions/${sessionId}/messages`,
    method: 'get',
    params
  })
}

// 发送消息（WebSocket）
export function sendChatMessage(sessionId, data) {
  return sendWebSocketMessage(sessionId, data)
}

// WebSocket 消息发送（内部使用）
function sendWebSocketMessage(sessionId, data) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    // 将 http/https 转换为 ws/wss
    const wsBaseUrl = baseUrl.replace(/^http/, 'ws')
    const wsUrl = `${wsBaseUrl}/agent-server/ws/chat/sessions/${sessionId}/messages`

    const ws = new WebSocket(wsUrl)

    // 连接打开后发送消息
    ws.onopen = () => {
      console.log('WebSocket 连接已建立')
      ws.send(JSON.stringify(data))
    }

    // 接收消息
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log('收到消息:', message)
        resolve(message)
        // 收到响应后关闭连接（如果是单次请求-响应模式）
        // 如果需要保持长连接，可以注释掉下面这行
        ws.close()
      } catch (e) {
        console.error('解析消息失败:', e)
        reject(e)
      }
    }

    // 错误处理
    ws.onerror = (error) => {
      console.error('WebSocket 错误:', error)
      reject(error)
    }

    // 连接关闭
    ws.onclose = (event) => {
      console.log('WebSocket 连接已关闭', event.code, event.reason)
    }

    // 设置超时（可选）
    setTimeout(() => {
      if (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN) {
        ws.close()
        reject(new Error('WebSocket 连接超时'))
      }
    }, 30000) // 30秒超时
  })
}
