<template>
  <div class="chat-input">
    <div class="input-wrapper" :class="{ 'is-sending': sending }">
      <!-- 附件上传 -->
      <el-upload
        :action="uploadUrl"
        :headers="uploadHeaders"
        :show-file-list="false"
        :before-upload="beforeUpload"
        @success="handleUploadSuccess"
        accept="image/*,.pdf,.doc,.docx"
      >
        <el-button size="default" circle>
          <el-icon><Paperclip /></el-icon>
        </el-button>
      </el-upload>

      <!-- 文本输入 -->
      <el-input
        v-model="messageText"
        type="textarea"
        :rows="3"
        placeholder="输入消息... (Shift+Enter 换行，Enter 发送)"
        resize="none"
        @keydown="handleKeydown"
        @input="handleInput"
      />

      <!-- 发送按钮 -->
      <el-button
        type="primary"
        @click="handleSend"
        :loading="sending"
        :disabled="!messageText.trim()"
        circle
      >
        <el-icon><Promotion /></el-icon>
      </el-button>
    </div>

    <!-- 底部信息 -->
    <div class="input-footer">
      <span class="word-count">{{ messageText.length }}/2000</span>
      <div class="quick-actions">
        <el-button size="small" text @click="insertPrompt('帮我审核这个商品')">
          🔍 帮我审核
        </el-button>
        <el-button size="small" text @click="insertPrompt('生成审核报告')">
          📊 生成报告
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Paperclip, Promotion } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  sending: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send', 'update:text'])

const messageText = ref('')

const uploadUrl = computed(() => {
  return import.meta.env.VITE_API_BASE_URL || '/api' + '/file/upload'
})

const uploadHeaders = computed(() => {
  const token = localStorage.getItem('token')
  return {
    Authorization: token ? `Bearer ${token}` : ''
  }
})

function handleSend() {
  if (!messageText.value.trim()) return
  
  // 显示发送中提示
  ElMessage.info({
    message: '正在发送消息...',
    duration: 1000
  })
  
  emit('send', messageText.value)
  messageText.value = ''
}

function handleKeydown(e) {
  // Shift+Enter 允许换行
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function handleInput() {
  emit('update:text', messageText.value)
}

function beforeUpload(file) {
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过 5MB')
    return false
  }
  return true
}

function handleUploadSuccess(response) {
  ElMessage.success('文件上传成功')
  // 将文件URL添加到消息中（这里简化处理）
}

function insertPrompt(prompt) {
  messageText.value = prompt
}
</script>

<style scoped lang="scss">
.chat-input {
  border-top: 1px solid #e4e7ed;
  padding: 16px;
  background: #ffffff;
  
  .input-wrapper {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    
    &.is-sending {
      opacity: 0.6;
      pointer-events: none;
    }
    
    :deep(.el-textarea__inner) {
      flex: 1;
      resize: none;
      font-size: 14px;
      line-height: 1.6;
    }
  }
  
  .input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    
    .word-count {
      font-size: 12px;
      color: #909399;
    }
    
    .quick-actions {
      display: flex;
      gap: 8px;
      
      :deep(.el-button) {
        font-size: 12px;
        color: #606266;
        
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
