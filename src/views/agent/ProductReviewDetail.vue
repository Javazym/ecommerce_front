<template>
  <div class="review-detail-page">
    <el-page-header @back="$router.back()" :title="'返回审核列表'">
      <template #content>
        <span class="header-title">商品审核详情</span>
      </template>
    </el-page-header>

    <div v-loading="loading" class="detail-content">
      <el-row :gutter="24">
        <!-- 左侧：商品信息 -->
        <el-col :span="14">
          <el-card class="product-info-card">
            <template #header>
              <div class="card-header">
                <span>商品信息</span>
              </div>
            </template>

            <!-- 图片轮播 -->
            <el-carousel v-if="product?.images && product.images.length > 0" height="400px" arrow-always>
              <el-carousel-item v-for="(img, idx) in product.images" :key="idx">
                <el-image
                  :src="img"
                  style="width: 100%; height: 100%"
                  fit="contain"
                />
              </el-carousel-item>
            </el-carousel>

            <!-- 商品信息 -->
            <el-descriptions :column="2" border class="product-descriptions">
              <el-descriptions-item label="商品名称">{{ product?.name }}</el-descriptions-item>
              <el-descriptions-item label="商品分类">{{ product?.category }}</el-descriptions-item>
              <el-descriptions-item label="价格">¥{{ product?.price }}</el-descriptions-item>
              <el-descriptions-item label="库存">{{ product?.stock }}</el-descriptions-item>
              <el-descriptions-item label="提交人">{{ product?.submitter }}</el-descriptions-item>
              <el-descriptions-item label="提交时间">{{ product?.submitTime }}</el-descriptions-item>
              <el-descriptions-item label="商品描述" :span="2">{{ product?.description }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>

        <!-- 右侧：AI 审核结果 -->
        <el-col :span="10">
          <ReviewResultPanel
            v-model="reviewPanelVisible"
            :status="aiStatus"
            :violations="violations"
            :analysis="aiAnalysis"
            :history="auditLogs"
            @close="reviewPanelVisible = false"
          />

          <!-- 审核操作 -->
          <el-card class="action-card">
            <template #header>
              <span>审核操作</span>
            </template>

            <div class="action-buttons">
              <el-button type="success" size="large" @click="handleApprove" :loading="processing">
                手动通过
              </el-button>
              <el-button type="danger" size="large" @click="showRejectDialog = true" :loading="processing">
                手动拒绝
              </el-button>
              <el-button type="primary" size="large" @click="handleAiReview" :loading="processing">
                <el-icon><MagicStick /></el-icon>
                重新 AI 审核
              </el-button>
            </div>

            <!-- AI 审核状态 -->
            <el-alert
              v-if="aiStatus === 'processing'"
              title="AI 审核进行中..."
              type="info"
              show-icon
              :closable="false"
              style="margin-top: 16px"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 拒绝原因对话框 -->
    <el-dialog v-model="showRejectDialog" title="拒绝商品审核" width="500px">
      <el-form :model="rejectForm" label-width="80px">
        <el-form-item label="拒绝原因">
          <el-select v-model="rejectForm.reason" placeholder="请选择拒绝原因" style="width: 100%">
            <el-option label="商品信息不完整" value="incomplete" />
            <el-option label="违反平台规范" value="violation" />
            <el-option label="价格异常" value="price-abnormal" />
            <el-option label="图片不清晰" value="blurry-image" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input
            v-model="rejectForm.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入详细说明（选填）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showRejectDialog = false">取消</el-button>
        <el-button type="danger" @click="handleRejectConfirm">确认拒绝</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MagicStick } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProductStore } from '@/stores/productStore'
import ReviewResultPanel from '@/components/agent/ReviewResultPanel.vue'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

// 状态
const loading = ref(false)
const processing = ref(false)
const reviewPanelVisible = ref(true)
const showRejectDialog = ref(false)

// 拒绝表单
const rejectForm = ref({
  reason: '',
  remark: ''
})

// 商品信息
const product = computed(() => productStore.currentProduct)

// AI 审核状态
const aiStatus = ref('pending')
const violations = ref([])
const aiAnalysis = ref('')
const auditLogs = ref([])

// 获取商品详情
async function fetchProductDetail() {
  const id = route.params.id
  loading.value = true
  
  try {
    await productStore.fetchProductDetail(id)
    
    // 加载审核历史
    await productStore.fetchAuditLogs(id)
    
    // Mock AI 审核数据
    aiStatus.value = 'completed'
    violations.value = [
      {
        item: '商品信息完整性',
        isViolation: false,
        confidence: 98.5,
        description: '商品信息完整'
      },
      {
        item: '价格合理性',
        isViolation: false,
        confidence: 95.2,
        description: '价格在合理范围内'
      }
    ]
    aiAnalysis.value = `## AI 审核结论\n\n**综合评分：95分**\n\n该商品符合平台规范，建议通过。\n\n### 详细分析\n1. ✅ 商品信息完整度：优秀\n2. ✅ 价格标识清晰度：良好\n3. ✅ 图片质量：清晰`
    auditLogs.value = productStore.auditLogs
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

// 手动通过
async function handleApprove() {
  try {
    const { value: remark } = await ElMessageBox.prompt('请输入备注信息（选填）', '手动通过', {
      inputPlaceholder: '可选',
      inputType: 'textarea'
    })
    
    processing.value = true
    const id = route.params.id
    await productStore.approveProduct(id, { remark })
    ElMessage.success('审核通过')
    fetchProductDetail()
  } catch (error) {
    // 用户取消或失败
  } finally {
    processing.value = false
  }
}

// 确认拒绝
async function handleRejectConfirm() {
  if (!rejectForm.value.reason) {
    ElMessage.warning('请选择拒绝原因')
    return
  }
  
  try {
    processing.value = true
    const id = route.params.id
    await productStore.rejectProduct(id, rejectForm.value)
    ElMessage.success('已拒绝')
    showRejectDialog.value = false
    fetchProductDetail()
  } catch (error) {
    console.error('拒绝失败:', error)
  } finally {
    processing.value = false
  }
}

// AI 审核
async function handleAiReview() {
  try {
    await ElMessageBox.confirm('确定要重新发起 AI 审核吗？', '提示', {
      type: 'info'
    })
    
    processing.value = true
    aiStatus.value = 'processing'
    const id = route.params.id
    await productStore.startAiReview(id)
    
    // 模拟审核完成
    setTimeout(() => {
      aiStatus.value = 'completed'
      processing.value = false
      ElMessage.success('AI 审核完成')
      fetchProductDetail()
    }, 3000)
  } catch (error) {
    processing.value = false
  }
}

onMounted(() => {
  fetchProductDetail()
})
</script>

<style scoped lang="scss">
.review-detail-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
  
  .header-title {
    font-size: 18px;
    font-weight: 600;
  }
  
  .detail-content {
    margin-top: 20px;
    
    .product-info-card,
    .action-card {
      margin-bottom: 20px;
      
      :deep(.card-header) {
        font-size: 16px;
        font-weight: 600;
      }
    }
    
    .product-descriptions {
      margin-top: 20px;
    }
    
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style>
