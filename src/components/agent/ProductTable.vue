<template>
  <div class="product-table">
    <el-table :data="productList" v-loading="loading" stripe border>
      <!-- 商品图片 -->
      <el-table-column label="商品图片" width="100">
        <template #default="{ row }">
          <el-image
            :src="row.image"
            style="width: 60px; height: 60px"
            fit="cover"
            :preview-src-list="[row.image]"
          />
        </template>
      </el-table-column>

      <!-- 商品名称 -->
      <el-table-column prop="name" label="商品名称" min-width="150" show-overflow-tooltip />

      <!-- 商品分类 -->
      <el-table-column prop="category" label="商品分类" width="120" />

      <!-- 提交时间 -->
      <el-table-column prop="submitTime" label="提交时间" width="180" />

      <!-- 状态 -->
      <el-table-column label="审核状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="dark">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- AI 置信度 -->
      <el-table-column label="AI 置信度" width="180">
        <template #default="{ row }">
          <el-progress
            :percentage="row.aiConfidence"
            :color="getConfidenceColor(row.aiConfidence)"
            :format="() => row.aiConfidence + '%'"
          />
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="$emit('view-detail', row.id)">
            查看详情
          </el-button>
          <el-button type="success" size="small" @click="$emit('approve', row.id)">
            通过
          </el-button>
          <el-button type="danger" size="small" @click="$emit('reject', row.id)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  productList: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['view-detail', 'approve', 'reject', 'update:currentPage', 'update:pageSize', 'page-change', 'size-change'])

const currentPage = computed({
  get: () => props.currentPage,
  set: (val) => emit('update:currentPage', val)
})

const pageSize = computed({
  get: () => props.pageSize,
  set: (val) => emit('update:pageSize', val)
})

function getStatusType(status) {
  const map = {
    pending: 'warning',
    reviewing: 'primary',
    approved: 'success',
    rejected: 'danger'
  }
  return map[status] || 'info'
}

function getStatusText(status) {
  const map = {
    pending: '待审核',
    reviewing: '审核中',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return map[status] || '未知'
}

function getConfidenceColor(confidence) {
  if (confidence >= 90) return '#67c23a'
  if (confidence >= 70) return '#e6a23c'
  return '#f56c6c'
}

function handlePageChange(page) {
  emit('page-change', page)
}

function handleSizeChange(size) {
  emit('size-change', size)
}
</script>

<style scoped lang="scss">
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
