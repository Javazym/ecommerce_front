<template>
  <div class="review-list-page">
    <!-- 筛选栏 -->
    <el-card class="filter-card">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="商品名称">
          <el-input
            v-model="filterForm.name"
            placeholder="请输入商品名称"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>

        <el-form-item label="审核状态">
          <el-select v-model="filterForm.status" placeholder="全部" clearable>
            <el-option label="待审核" value="pending" />
            <el-option label="审核中" value="reviewing" />
            <el-option label="已通过" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="filterForm.category" placeholder="全部分类" clearable>
            <el-option label="电子产品" value="电子产品" />
            <el-option label="平板电脑" value="平板电脑" />
            <el-option label="耳机" value="耳机" />
            <el-option label="智能穿戴" value="智能穿戴" />
          </el-select>
        </el-form-item>

        <el-form-item label="日期范围">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 统计卡片 -->
    <el-row :gutter="16" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-pending">
          <div class="stat-content">
            <div class="stat-number">{{ statistics.pending }}</div>
            <div class="stat-label">今日待审核</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-reviewing">
          <div class="stat-content">
            <div class="stat-number">{{ statistics.reviewing }}</div>
            <div class="stat-label">审核中</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-approved">
          <div class="stat-content">
            <div class="stat-number">{{ statistics.approved }}</div>
            <div class="stat-label">已通过</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-rejected">
          <div class="stat-content">
            <div class="stat-number">{{ statistics.rejected }}</div>
            <div class="stat-label">已拒绝</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 批量审核按钮 -->
    <div class="action-bar">
      <el-button type="success" @click="handleBatchReview" :disabled="selectedIds.length === 0">
        <el-icon><Checked /></el-icon>
        AI 批量审核 ({{ selectedIds.length }})
      </el-button>
    </div>

    <!-- 商品表格 -->
    <ProductTable
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :product-list="productList"
      :total="total"
      :loading="loading"
      @view-detail="handleViewDetail"
      @approve="handleApprove"
      @reject="handleReject"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
      @selection-change="handleSelectionChange"
    />

    <!-- 批量审核弹窗 -->
    <BatchReviewModal
      v-model="batchReviewVisible"
      :product-ids="selectedIds"
      :task-status="batchReviewStatus"
      :progress="batchReviewProgress"
      :results="batchReviewResults"
      @start="performBatchReview"
      @close="batchReviewVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Refresh, Checked } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProductStore } from '@/stores/productStore'
import ProductTable from '@/components/agent/ProductTable.vue'
import BatchReviewModal from '@/components/agent/BatchReviewModal.vue'

const router = useRouter()
const productStore = useProductStore()

// 筛选表单
const filterForm = ref({
  name: '',
  status: '',
  category: '',
  dateRange: null
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 选中项
const selectedIds = ref([])

// 批量审核弹窗
const batchReviewVisible = ref(false)
const batchReviewStatus = ref('idle')
const batchReviewProgress = ref(0)
const batchReviewResults = ref({ success: 0, failed: 0, errors: [] })

// 从 store 获取数据
const productList = computed(() => productStore.productList)
const total = computed(() => productStore.total)
const loading = computed(() => productStore.loading)
const statistics = computed(() => productStore.statistics)

// 获取商品列表
async function fetchProductList() {
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    ...filterForm.value
  }
  
  if (filterForm.value.dateRange) {
    params.startDate = filterForm.value.dateRange[0]
    params.endDate = filterForm.value.dateRange[1]
  }
  
  await productStore.fetchProductList(params)
}

// 搜索
function handleSearch() {
  currentPage.value = 1
  fetchProductList()
}

// 重置
function handleReset() {
  filterForm.value = {
    name: '',
    status: '',
    category: '',
    dateRange: null
  }
  handleSearch()
}

// 分页
function handlePageChange(page) {
  currentPage.value = page
  fetchProductList()
}

function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1
  fetchProductList()
}

// 选择变化
function handleSelectionChange(selection) {
  selectedIds.value = selection.map(item => item.id)
}

// 查看详情
function handleViewDetail(id) {
  router.push(`/products/review/${id}`)
}

// 手动通过
async function handleApprove(id) {
  try {
    await ElMessageBox.confirm('确定要通过该商品的审核吗？', '提示', {
      type: 'info'
    })
    await productStore.approveProduct(id, { remark: '人工审核通过' })
    ElMessage.success('操作成功')
    fetchProductList()
  } catch (error) {
    // 用户取消或请求失败
  }
}

// 手动拒绝
async function handleReject(id) {
  try {
    await ElMessageBox.confirm('确定要拒绝该商品的审核吗？', '提示', {
      type: 'warning'
    })
    await productStore.rejectProduct(id, { reason: '不符合规范' })
    ElMessage.success('操作成功')
    fetchProductList()
  } catch (error) {
    // 用户取消或请求失败
  }
}

// 批量审核
function handleBatchReview() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择商品')
    return
  }
  batchReviewVisible.value = true
}

async function performBatchReview(ids) {
  try {
    batchReviewStatus.value = 'processing'
    batchReviewProgress.value = 0
    
    const result = await productStore.startBatchReview(ids)
    
    // 轮询查询状态
    const timer = setInterval(async () => {
      const status = await productStore.checkBatchStatus(result.taskId)
      batchReviewProgress.value = status.progress || 0
      
      if (status.status === 'completed') {
        clearInterval(timer)
        batchReviewStatus.value = 'completed'
        batchReviewResults.value = status.results || { success: ids.length, failed: 0, errors: [] }
      }
    }, 1000)
  } catch (error) {
    ElMessage.error('批量审核失败')
    batchReviewStatus.value = 'failed'
  }
}
</script>

<style scoped lang="scss">
.review-list-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
  
  .filter-card {
    margin-bottom: 20px;
    
    :deep(.el-card__body) {
      padding: 20px;
    }
  }
  
  .stats-row {
    margin-bottom: 20px;
    
    .stat-card {
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-4px);
      }
      
      .stat-content {
        text-align: center;
        padding: 10px 0;
        
        .stat-number {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #909399;
        }
      }
      
      &.stat-pending {
        :deep(.el-card__body) {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-left: 4px solid #e6a23c;
        }
        
        .stat-number {
          color: #e6a23c;
        }
      }
      
      &.stat-reviewing {
        :deep(.el-card__body) {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-left: 4px solid #409eff;
        }
        
        .stat-number {
          color: #409eff;
        }
      }
      
      &.stat-approved {
        :deep(.el-card__body) {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-left: 4px solid #67c23a;
        }
        
        .stat-number {
          color: #67c23a;
        }
      }
      
      &.stat-rejected {
        :deep(.el-card__body) {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-left: 4px solid #f56c6c;
        }
        
        .stat-number {
          color: #f56c6c;
        }
      }
    }
  }
  
  .action-bar {
    margin-bottom: 16px;
  }
}
</style>
