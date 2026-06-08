<template>
  <div class="ai-chat-page">
    <el-container class="chat-container">
      <!-- 左侧会话列表 -->
      <el-aside width="280px" class="session-aside">
        <SessionList
          :sessions="sessions"
          :current-session="currentSession"
          :loading="loading"
          @create="handleCreateSession"
          @switch="handleSwitchSession"
          @delete="handleDeleteSession"
        />
      </el-aside>

      <!-- 右侧聊天区域 -->
      <el-container class="chat-main">
        <!-- 顶部栏 -->
        <el-header class="chat-header">
          <div class="header-left">
            <h3 class="session-title">{{ currentSession?.title || 'AI 助手' }}</h3>
          </div>
          <div class="header-right">
            <el-button @click="handleClearMessages" :disabled="!messages.length">
              <el-icon><Delete /></el-icon>
              清空聊天
            </el-button>
          </div>
        </el-header>

        <!-- 消息区域 -->
        <el-main class="message-area" v-loading="loading">
          <div class="messages-wrapper" ref="messageContainer">
            <el-empty v-if="messages.length === 0" description="开始与 AI 对话吧！" :image-size="120" />
            
            <div class="messages-list">
              <MessageBubble
                v-for="message in messages"
                :key="message.id"
                :role="message.role"
                :content="message.content"
                :timestamp="message.timestamp"
                :files="message.files"
                @copy="handleCopy(message)"
                @like="handleLike(message)"
                @dislike="handleDislike(message)"
              />
            </div>
          </div>
        </el-main>

        <!-- 输入区域 -->
        <el-footer class="input-footer">
          <ChatInput
            :sending="sending"
            @send="handleSendMessage"
          />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useChatStore } from '@/stores/chatStore'
import SessionList from '@/components/chat/SessionList.vue'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

const chatStore = useChatStore()

// 状态
const messageContainer = ref(null)

// 从 store 获取数据
const sessions = computed(() => chatStore.sessions)
const currentSession = computed(() => chatStore.currentSession)
const messages = computed(() => chatStore.messages)
const loading = computed(() => chatStore.loading)
const sending = computed(() => chatStore.sending)

// 初始化
async function init() {
  await chatStore.fetchSessions()
  
  // 如果有会话，自动加载第一个
  if (sessions.value.length > 0 && !currentSession.value) {
    await chatStore.switchSession(sessions.value[0].id)
  }
}

// 创建新会话
async function handleCreateSession() {
  await chatStore.createSession()
  await nextTick()
}

// 切换会话
async function handleSwitchSession(sessionId) {
  await chatStore.switchSession(sessionId)
  await nextTick()
}

// 删除会话
async function handleDeleteSession(id) {
  try {
    await ElMessageBox.confirm('确定要删除这个会话吗？', '提示', {
      type: 'warning'
    })
    await chatStore.deleteSession(id)
    ElMessage.success('会话已删除')
  } catch {
    // 用户取消
  }
}

// 发送消息
async function handleSendMessage(content) {
  try {
    await chatStore.sendMessage(content)
    await nextTick()
    scrollToBottom()
    
    // 显示发送成功提示
    ElMessage.success({
      message: '消息发送成功',
      duration: 1500
    })
  } catch (error) {
    console.error('发送消息失败:', error)
    ElMessage.error({
      message: '发送失败，请检查网络连接',
      duration: 3000
    })
  }
}

// 清空消息
async function handleClearMessages() {
  try {
    await ElMessageBox.confirm('确定要清空所有消息吗？', '提示', {
      type: 'info'
    })
    chatStore.clearMessages()
    ElMessage.success('已清空')
  } catch {
    // 用户取消
  }
}

// 复制消息内容
function handleCopy(message) {
  navigator.clipboard.writeText(message.content).then(() => {
    ElMessage.success('已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

// 点赞
function handleLike(message) {
  ElMessage.success('已反馈：好评')
}

// 点踩
function handleDislike(message) {
  ElMessage.success('已反馈：差评')
}

// 滚动到底部
function scrollToBottom() {
  if (messageContainer.value) {
    const wrapper = messageContainer.value.querySelector('.messages-wrapper')
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight
    }
  }
}

// 监听消息变化，自动滚动
watch(messages, () => {
  nextTick(scrollToBottom)
}, { deep: true })

init()
</script>

<style scoped lang="scss">
.ai-chat-page {
  height: calc(100vh - 60px);
  background: #f5f7fa;
  
  .chat-container {
    height: 100%;
    
    .session-aside {
      border-right: 1px solid #e4e7ed;
      background: #ffffff;
    }
    
    .chat-main {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      
      .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #e4e7ed;
        background: #fafafa;
        
        .session-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
        
        .header-right {
          .el-button {
            font-size: 13px;
          }
        }
      }
      
      .message-area {
        flex: 1;
        overflow: hidden;
        padding: 20px;
        
        .messages-wrapper {
          height: 100%;
          overflow-y: auto;
          
          .messages-list {
            max-width: 900px;
            margin: 0 auto;
          }
        }
      }
      
      .input-footer {
        border-top: 1px solid #e4e7ed;
        padding: 0;
      }
    }
  }
}
</style>
