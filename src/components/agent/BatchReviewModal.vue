<template>
  <el-dialog
    v-model="visible"
    title="AI 批量审核"
    width="500px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="batch-review-modal">
      <!-- 进度条 -->
      <div class="progress-section" v-if="isProcessing">
        <el-progress
          type="circle"
          :percentage="progress"
          :width="150"
          :height="150"
          :stroke-width="12"
        >
          <template #default="{ percentage }">
            <span class="percentage-text">{{ percentage }}%</span>
          </template>
        </el-progress>
        <p class="progress-text">{{ progressText }}</p>
      </div>

      <!-- 结果展示 -->
      <div class="result-section" v-if="isCompleted">
        <el-result icon="success" title="批量审核完成">
          <template #sub-title>
            <div class="result-stats">
              <el-statistic title="成功" :value="results.success">
                <template #suffix>
                  <span class="stat-success">件</span>
                </template>
              </el-statistic>
              <el-statistic title="失败" :value="results.failed">
                <template #suffix>
                  <span class="stat-failed">件</span>
                </template>
              </el-statistic>
            </div>
          </template>
        </el-result>
        
        <el-alert
          v-if="results.errors && results.errors.length > 0"
          title="失败详情"
          type="error"
          :closable="false"
          style="margin-top: 16px"
        >
          <template #default>
            <ul>
              <li v-for="(error, idx) in results.errors" :key="idx">{{ error }}</li>
            </ul>
          </template>
        </el-alert>
      </div>

      <!-- 提示信息 -->
      <div class="tips">
        <el-alert title="温馨提示" type="info" :closable="false" show-icon>
          <p>• AI 将自动分析商品图片、描述、价格等信息</p>
          <p>• 审核过程可能需要几分钟，请耐心等待</p>
          <p>• 审核结果可通过置信度判断可靠性</p>
        </el-alert>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  productIds: {
    type: Array,
    default: () => []
  },
  taskStatus: {
    type: String,
    default: 'idle' // idle | processing | completed
  },
  progress: {
    type: Number,
    default: 0
  },
  results: {
    type: Object,
    default: () => ({ success: 0, failed: 0, errors: [] })
  }
})

const emit = defineEmits(['update:modelValue', 'start', 'close'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isProcessing = computed(() => props.taskStatus === 'processing')
const isCompleted = computed(() => props.taskStatus === 'completed')

const progressText = computed(() => {
  if (!isProcessing.value) return ''
  if (props.progress < 30) return '正在初始化审核任务...'
  if (props.progress < 70) return '正在分析商品信息...'
  return '正在生成审核报告...'
})

function handleClose() {
  if (isProcessing.value) {
    ElMessage.warning('审核正在进行中，请勿关闭')
    return
  }
  emit('close')
}

function handleStart() {
  emit('start', props.productIds)
}

// 监听任务状态变化
watch(() => props.taskStatus, (newStatus) => {
  if (newStatus === 'completed') {
    setTimeout(() => {
      ElMessage.success('批量审核完成')
    }, 500)
  }
})

defineExpose({
  handleStart
})
</script>

<style scoped lang="scss">
.batch-review-modal {
  .progress-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    
    .percentage-text {
      font-size: 24px;
      font-weight: 600;
      color: #409eff;
    }
    
    .progress-text {
      margin-top: 16px;
      font-size: 14px;
      color: #606266;
    }
  }
  
  .result-section {
    padding: 20px 0;
    
    .result-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      
      :deep(.el-statistic__head) {
        color: #909399;
      }
      
      :deep(.el-statistic__content) {
        font-size: 24px;
        font-weight: 600;
      }
      
      .stat-success {
        color: #67c23a;
        font-size: 14px;
        margin-left: 4px;
      }
      
      .stat-failed {
        color: #f56c6c;
        font-size: 14px;
        margin-left: 4px;
      }
    }
    
    ul {
      margin: 8px 0 0;
      padding-left: 20px;
      font-size: 13px;
    }
  }
  
  .tips {
    margin-top: 20px;
    
    :deep(.el-alert__content) {
      p {
        margin: 4px 0;
        font-size: 13px;
        line-height: 1.6;
      }
    }
  }
}
</style>
