<template>
  <div class="session-list">
    <el-button type="primary" @click="$emit('create')" class="create-btn" block>
      <el-icon><Plus /></el-icon>
      新建会话
    </el-button>

    <div class="list-wrapper" v-loading="loading">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="session-item"
        :class="{ active: currentSession?.id === session.id }"
        @click="$emit('switch', session.id)"
      >
        <div class="session-info">
          <div class="session-title">{{ session.title }}</div>
          <div class="session-preview">{{ session.lastMessage || '暂无消息' }}</div>
        </div>
        <div class="session-meta">
          <span class="session-time">{{ formatTime(session.createTime) }}</span>
          <el-icon
            class="delete-icon"
            @click.stop="$emit('delete', session.id)"
            v-if="session.id !== currentSession?.id"
          >
            <Delete />
          </el-icon>
        </div>
      </div>

      <el-empty v-if="sessions.length === 0" description="暂无会话" :image-size="80" />
    </div>
  </div>
</template>

<script setup>
import { Plus, Delete } from '@element-plus/icons-vue'

defineProps({
  sessions: {
    type: Array,
    default: () => []
  },
  currentSession: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['create', 'switch', 'delete'])

function formatTime(time) {
  if (!time) return ''
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 一天内显示时间
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  
  // 超过一天显示日期
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}
</script>

<style scoped lang="scss">
.session-list {
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e4e7ed;
  background: #fafafa;
  
  .create-btn {
    margin: 16px;
  }
  
  .list-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 0 8px;
  }
  
  .session-item {
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid transparent;
    
    &:hover {
      background: #ffffff;
      border-color: #e4e7ed;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    &.active {
      background: #ffffff;
      border-color: #409eff;
      box-shadow: 0 2px 12px rgba(64, 158, 255, 0.15);
    }
    
    .session-info {
      margin-bottom: 8px;
      
      .session-title {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .session-preview {
        font-size: 12px;
        color: #909399;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .session-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .session-time {
        font-size: 11px;
        color: #c0c4cc;
      }
      
      .delete-icon {
        font-size: 16px;
        color: #dcdee0;
        transition: color 0.3s;
        
        &:hover {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
