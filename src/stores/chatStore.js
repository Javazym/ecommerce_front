import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as chatApi from '@/api/modules/chat'

// Mock 数据开关
const USE_MOCK = import.meta.env.DEV

export const useChatStore = defineStore('chat', () => {
  // 状态
  const sessions = ref([])
  const currentSession = ref(null)
  const messages = ref([])
  const loading = ref(false)
  const sending = ref(false)

  // 创建新会话
  async function createSession(title = '新对话') {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const newSession = {
          id: Date.now(),
          title,
          createTime: new Date().toISOString(),
          lastMessage: '',
          messageCount: 0
        }
        sessions.value.unshift(newSession)
        currentSession.value = newSession
        messages.value = []
        return newSession
      }

      const res = await chatApi.createChatSession({ title })
      sessions.value.unshift(res)
      currentSession.value = res
      messages.value = []
      return res
    } catch (error) {
      console.error('创建会话失败:', error)
      throw error
    }
  }

  // 获取会话列表
  async function fetchSessions() {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        sessions.value = [
          {
            id: 1,
            title: '商品审核咨询',
            createTime: '2026-06-07T10:00:00',
            lastMessage: '这个商品是否符合规范？',
            messageCount: 5
          },
          {
            id: 2,
            title: '批量审核协助',
            createTime: '2026-06-06T15:30:00',
            lastMessage: '请帮我批量审核这些商品',
            messageCount: 12
          }
        ]
        return sessions.value
      }

      const res = await chatApi.getChatSessions()
      sessions.value = res
      return res
    } catch (error) {
      console.error('获取会话列表失败:', error)
      throw error
    }
  }

  // 删除会话
  async function deleteSession(id) {
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 300))
        sessions.value = sessions.value.filter(s => s.id !== id)
        if (currentSession.value?.id === id) {
          currentSession.value = sessions.value[0] || null
        }
        return { success: true }
      }

      const res = await chatApi.deleteChatSession(id)
      sessions.value = sessions.value.filter(s => s.id !== id)
      if (currentSession.value?.id === id) {
        currentSession.value = sessions.value[0] || null
      }
      return res
    } catch (error) {
      console.error('删除会话失败:', error)
      throw error
    }
  }

  // 切换会话
  async function switchSession(sessionId) {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      currentSession.value = session
      await fetchMessages(sessionId)
    }
  }

  // 获取消息历史
  async function fetchMessages(sessionId) {
    loading.value = true
    try {
      if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500))
        messages.value = [
          {
            id: 1,
            role: 'user',
            content: '帮我审核一下这个商品',
            timestamp: '2026-06-07 10:00:00'
          },
          {
            id: 2,
            role: 'ai',
            content: '好的，我来帮您分析这个商品的信息。\n\n## 审核结果\n\n✅ **商品信息完整**\n- 商品名称：✓ 符合规范\n- 商品价格：✓ 标识清晰\n- 商品描述：✓ 内容真实\n\n**综合评分：95分**\n\n建议您通过该商品的审核。',
            timestamp: '2026-06-07 10:00:05'
          }
        ]
        return messages.value
      }

      const res = await chatApi.getChatMessages(sessionId)
      messages.value = res.list || []
      return res
    } catch (error) {
      console.error('获取消息失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 发送消息（流式）
  async function sendMessage(content, files = []) {
    if (!currentSession.value) {
      await createSession()
    }

    sending.value = true

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleString('zh-CN'),
      files
    }
    messages.value.push(userMessage)

    try {
      if (USE_MOCK) {
        // Mock AI 回复（流式效果）
        const aiMessage = await mockStreamResponse(content)
        messages.value.push(aiMessage)
        return aiMessage
      }

      // 真实 API 调用 - WebSocket
      const response = await chatApi.sendChatMessage(currentSession.value.id, {
        content,
        files
      })

      // 处理 WebSocket 响应
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: response.content || '收到您的消息',
        timestamp: new Date().toLocaleString('zh-CN')
      }
      messages.value.push(aiMessage)
      return aiMessage
    } catch (error) {
      console.error('发送消息失败:', error)
      throw error
    } finally {
      sending.value = false
    }
  }

  // Mock 流式响应
  function mockStreamResponse(userContent) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now() + 1,
          role: 'ai',
          content: `我已经收到了您关于"${userContent}"的请求。\n\n## 分析结果\n\n根据 AI Agent 的审核规则：\n\n1. ✅ **合规性检查通过**\n2. ✅ **价格合理性验证通过**\n3. ✅ **商品描述完整性检查通过**\n\n**置信度：92.5%**\n\n建议操作：**通过审核**`,
          timestamp: new Date().toLocaleString('zh-CN')
        })
      }, 1000)
    })
  }

  // 更新会话标题
  function updateSessionTitle(sessionId, title) {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      session.title = title
    }
  }

  // 更新最后一条消息
  function updateLastMessage(sessionId, message) {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session) {
      session.lastMessage = message
      session.messageCount = (session.messageCount || 0) + 1
    }
  }

  // 清空当前会话消息
  function clearMessages() {
    messages.value = []
  }

  return {
    sessions,
    currentSession,
    messages,
    loading,
    sending,
    createSession,
    fetchSessions,
    deleteSession,
    switchSession,
    fetchMessages,
    sendMessage,
    updateSessionTitle,
    updateLastMessage,
    clearMessages
  }
})
