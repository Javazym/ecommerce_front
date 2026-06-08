<template>
  <el-dialog v-model="visible" title="AI 审核结果" width="600px" :before-close="handleClose">
    <div class="review-result-panel">
      <!-- AI 审核状态 -->
      <div class="status-section">
        <el-page-header @back="$emit('close')">
          <template #content>
            <span class="header-title">AI 审核面板</span>
          </template>
        </el-page-header>
        
        <div class="ai-status" :class="getStatusClass(status)">
          <el-icon size="48" v-if="status === 'completed'"><Check /></el-icon>
          <el-icon size="48" v-else-if="status === 'processing'"><Loading /></el-icon>
          <el-icon size="48" v-else><Close /></el-icon>
          <div class="status-text">
            {{ getStatusText(status) }}
          </div>
        </div>
      </div>

      <!-- 违规检测结果 -->
      <div class="violation-section" v-if="violations && violations.length > 0">
        <h4>违规检测结果</h4>
        <el-table :data="violations" border>
          <el-table-column prop="item" label="检测项" />
          <el-table-column label="是否违规" width="100">
            <template #default="{ row }">
              <el-tag :type="row.isViolation ? 'danger' : 'success'" size="small">
                {{ row.isViolation ? '违规' : '合规' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="置信度" width="120">
            <template #default="{ row }">
              {{ row.confidence }}%
            </template>
          </el-table-column>
          <el-table-column prop="description" label="AI 说明" show-overflow-tooltip />
        </el-table>
      </div>

      <!-- AI 综合分析 -->
      <div class="analysis-section">
        <h4>AI 综合分析意见</h4>
        <div class="analysis-content markdown-body" v-html="formattedAnalysis"></div>
      </div>

      <!-- 审核历史时间线 -->
      <div class="history-section" v-if="history && history.length > 0">
        <h4>审核历史</h4>
        <el-timeline>
          <el-timeline-item
            v-for="item in history"
            :key="item.id"
            :timestamp="item.time"
            placement="top"
            :type="getHistoryItemType(item.action)"
          >
            <el-card>
              <p><strong>{{ item.operator }}</strong> - {{ item.action }}</p>
              <p>结论：{{ item.conclusion }}</p>
              <p v-if="item.remark" class="remark">{{ item.remark }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { Check, Loading, Close } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'pending'
  },
  violations: {
    type: Array,
    default: () => []
  },
  analysis: {
    type: String,
    default: ''
  },
  history: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'back'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function getStatusClass(status) {
  const map = {
    pending: 'status-pending',
    processing: 'status-processing',
    completed: 'status-completed',
    failed: 'status-failed'
  }
  return map[status] || 'status-pending'
}

function getStatusText(status) {
  const map = {
    pending: '待处理',
    processing: 'AI 审核中...',
    completed: '审核完成',
    failed: '审核失败'
  }
  return map[status] || '未知状态'
}

function getHistoryItemType(action) {
  const map = {
    '发起审核': 'primary',
    'AI初审': 'success',
    '人工复核': 'warning',
    '通过': 'success',
    '拒绝': 'danger'
  }
  return map[action] || 'info'
}

const formattedAnalysis = computed(() => {
  // 简单的 Markdown 转 HTML
  if (!props.analysis) return ''
  
  let html = props.analysis
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 加粗
  html = html.replace(/\n/g, '<br/>') // 换行
  html = html.replace(/^## (.*?)(?:\n|$)/gm, '<h4>$1</h4>') // 标题
  html = html.replace(/^• (.*?)(?:\n|$)/gm, '<li>$1</li>') // 列表项
  
  return html
})

function handleClose() {
  emit('close')
}
</script>

<style scoped lang="scss">
.review-result-panel {
  .status-section {
    margin-bottom: 24px;
    
    .header-title {
      font-size: 18px;
      font-weight: bold;
    }
    
    .ai-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      margin-top: 20px;
      border-radius: 8px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
      
      &.status-processing {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      &.status-completed {
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      }
      
      &.status-failed {
        background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
      }
      
      .status-text {
        margin-top: 12px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  
  .violation-section,
  .analysis-section,
  .history-section {
    margin-bottom: 24px;
    
    h4 {
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }
  
  .analysis-content {
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;
    line-height: 1.8;
    min-height: 100px;
    
    :deep(h4) {
      color: #409eff;
      margin: 16px 0 8px;
    }
    
    :deep(strong) {
      color: #303133;
    }
  }
  
  .remark {
    color: #909399;
    font-size: 13px;
    margin-top: 4px;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
