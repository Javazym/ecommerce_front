<template>
  <div class="message-bubble" :class="[role, { 'has-files': files && files.length > 0 }]">
    <!-- 文件附件 -->
    <div class="file-attachments" v-if="files && files.length > 0">
      <el-image
        v-for="(file, idx) in imageFiles"
        :key="'img-' + idx"
        :src="file"
        style="width: 100px; height: 100px"
        fit="cover"
        :preview-src-list="imageFiles"
      />
      <el-tag v-for="(file, idx) in otherFiles" :key="'file-' + idx" class="file-tag">
        📎 {{ file.name }}
      </el-tag>
    </div>

    <!-- 消息内容 -->
    <div class="message-content markdown-body" v-html="formattedContent"></div>

    <!-- 操作按钮（仅 AI 消息） -->
    <div class="message-actions" v-if="role === 'ai'">
      <el-icon @click="$emit('copy')" title="复制"><DocumentCopy /></el-icon>
      <el-icon @click="$emit('like')" title="点赞"><Check /></el-icon>
      <el-icon @click="$emit('dislike')" title="点踩"><Close /></el-icon>
    </div>

    <!-- 时间戳 -->
    <div class="message-time">{{ timestamp }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { DocumentCopy, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
  role: {
    type: String,
    default: 'user' // user | ai
  },
  content: {
    type: String,
    default: ''
  },
  timestamp: {
    type: String,
    default: ''
  },
  files: {
    type: Array,
    default: () => []
  }
})

defineEmits(['copy', 'like', 'dislike'])

// 分离图片和其他文件
const imageFiles = computed(() => {
  return props.files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.url || f))
})

const otherFiles = computed(() => {
  return props.files.filter(f => !/\.(jpg|jpeg|png|gif|webp)$/i.test(f.url || f))
})

// 简单的 Markdown 渲染
const formattedContent = computed(() => {
  if (!props.content) return ''
  
  let html = props.content
  
  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  
  // 加粗
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 标题
  html = html.replace(/^### (.*?)(?:\n|$)/gm, '<h4>$1</h4>')
  html = html.replace(/^## (.*?)(?:\n|$)/gm, '<h3>$1</h3>')
  html = html.replace(/^# (.*?)(?:\n|$)/gm, '<h2>$1</h2>')
  
  // 列表
  html = html.replace(/^\- (.*?)(?:\n|$)/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // 有序列表
  html = html.replace(/^\d+\. (.*?)(?:\n|$)/gm, '<li>$1</li>')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 换行
  html = html.replace(/\n/g, '<br/>')
  
  return html
})
</script>

<style scoped lang="scss">
.message-bubble {
  max-width: 70%;
  margin-bottom: 16px;
  
  &.user {
    margin-left: auto;
    
    .message-content {
      background: #409eff;
      color: #ffffff;
      border-top-right-radius: 16px;
      border-bottom-left-radius: 8px;
    }
    
    .message-time {
      text-align: right;
    }
  }
  
  &.ai {
    margin-right: auto;
    
    .message-content {
      background: #ffffff;
      color: #303133;
      border: 1px solid #e4e7ed;
      border-top-left-radius: 16px;
      border-bottom-right-radius: 8px;
    }
  }
  
  .file-attachments {
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .file-tag {
      font-size: 12px;
    }
  }
  
  .message-content {
    padding: 12px 16px;
    border-radius: 8px;
    line-height: 1.6;
    word-break: break-word;
    
    :deep(pre.code-block) {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 8px 0;
      
      code {
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        font-size: 13px;
      }
    }
    
    :deep(code.inline-code) {
      background: rgba(0, 0, 0, 0.06);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'JetBrains Mono', 'Consolas', monospace;
      font-size: 12px;
    }
    
    :deep(a) {
      color: #409eff;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .message-actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    padding-left: 4px;
    
    .el-icon {
      font-size: 16px;
      color: #909399;
      cursor: pointer;
      transition: color 0.3s;
      
      &:hover {
        color: #409eff;
      }
    }
  }
  
  .message-time {
    font-size: 11px;
    color: #c0c4cc;
    margin-top: 4px;
  }
}
</style>
