<template>
  <div class="admin-products">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="商品审核" name="audit">
          <template #label>
            <span>商品审核</span>
            <el-badge :value="pendingCount" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品列表" name="list" />
      </el-tabs>

      <!-- 商品审核 -->
      <div v-if="activeTab === 'audit'" class="tab-content">
        <el-table :data="pendingProducts" v-loading="loading" style="width: 100%">
          <el-table-column prop="image" label="商品图片" width="120">
            <template #default="{ row }">
              <img :src="row.mainImage || row.image" alt="" class="product-image" />
            </template>
          </el-table-column>

          <el-table-column prop="name" label="商品信息" min-width="200">
            <template #default="{ row }">
              <div class="product-info">
                <div class="product-name">{{ row.name }}</div>
                <div class="product-sub">{{ row.subName || '' }}</div>
                <div class="product-meta">
                  <el-tag size="small">{{ row.categoryName || '未分类' }}</el-tag>
                  <span class="merchant-name">{{ row.merchantName || '未知商家' }}</span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="价格" width="120">
            <template #default="{ row }">
              <div class="price-info">
                <span class="current-price">¥{{ row.price?.toFixed(2) }}</span>
                <span v-if="row.originalPrice" class="original-price">¥{{ row.originalPrice?.toFixed(2) }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="stock" label="库存" width="80" />
          <el-table-column prop="skuCount" label="SKU数" width="80" />
          <el-table-column prop="createdAt" label="提交时间" width="180" />

          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="success" @click="approveProduct(row)">通过</el-button>
              <el-button type="danger" @click="rejectProduct(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="auditPage"
            v-model:page-size="auditPageSize"
            :page-sizes="[10, 20, 50]"
            :total="auditTotal"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="loadPendingProducts"
            @current-change="loadPendingProducts"
          />
        </div>
      </div>

      <!-- 商品列表 -->
      <div v-if="activeTab === 'list'" class="tab-content">
        <div class="filter-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索商品名称"
            clearable
            style="width: 240px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select v-model="statusFilter" placeholder="商品状态" clearable style="width: 120px">
            <el-option label="已上架" value="on_sale" />
            <el-option label="已下架" value="off_sale" />
            <el-option label="待审核" value="pending" />
          </el-select>
          <el-button type="primary">搜索</el-button>
        </div>

        <el-table :data="productList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="image" label="商品图片" width="100">
            <template #default="{ row }">
              <img :src="row.mainImage || row.image" alt="" class="product-image-small" />
            </template>
          </el-table-column>

          <el-table-column prop="name" label="商品名称" min-width="200" />
          <el-table-column prop="categoryName" label="分类" width="120" />
          <el-table-column prop="merchantName" label="商家" width="120" />
          <el-table-column prop="price" label="价格" width="100">
            <template #default="{ row }">
              <span class="price">¥{{ row.price?.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="80" />
          <el-table-column prop="soldCount" label="销量" width="80" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="viewProductDetail(row)">详情</el-button>
              <el-button 
                v-if="row.status === 1" 
                type="warning" 
                link 
                @click="offlineProductItem(row)"
              >
                下架
              </el-button>
              <el-button type="danger" link @click="deleteProduct(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="listPage"
            v-model:page-size="listPageSize"
            :page-sizes="[10, 20, 50]"
            :total="listTotal"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="loadProductList"
            @current-change="loadProductList"
          />
        </div>
      </div>
    </el-card>

    <!-- 审核拒绝弹窗 -->
    <el-dialog v-model="rejectDialogVisible" title="拒绝原因" width="500px">
      <el-form :model="rejectForm" label-width="80px">
        <el-form-item label="拒绝原因" required>
          <el-input
            v-model="rejectForm.reason"
            type="textarea"
            :rows="4"
            placeholder="请输入拒绝原因，将发送给商家"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="rejectDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReject">确定拒绝</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {
  getPendingProducts,
  getAllProducts,
  auditProduct,
  offlineProduct as offlineProductApi
} from '../../api/modules/admin.js'

const activeTab = ref('audit')
const loading = ref(false)

// 商品审核
const pendingCount = ref(0)
const pendingProducts = ref([])
const auditPage = ref(1)
const auditPageSize = ref(10)
const auditTotal = ref(0)

// 加载待审核商品
const loadPendingProducts = async () => {
  loading.value = true
  try {
    const res = await getPendingProducts({
      pageNum: auditPage.value,
      pageSize: auditPageSize.value
    })
    if (res.code === 1000 && res.data) {
      pendingProducts.value = res.data.content || []
      pendingCount.value = res.data.totalElements || 0
      auditTotal.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载待审核商品失败:', error)
    ElMessage.error('加载待审核商品失败')
  } finally {
    loading.value = false
  }
}

// 商品列表
const searchQuery = ref('')
const statusFilter = ref('')
const productList = ref([])
const listPage = ref(1)
const listPageSize = ref(10)
const listTotal = ref(0)

// 加载商品列表
const loadProductList = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: listPage.value,
      pageSize: listPageSize.value
    }
    
    // 根据筛选条件设置参数
    if (statusFilter.value) {
      const statusMap = {
        'on_sale': 1,
        'off_sale': 0,
        'pending': 2
      }
      params.status = statusMap[statusFilter.value]
    }
    
    const res = await getAllProducts(params)
    if (res.code === 1000 && res.data) {
      productList.value = res.data.content || []
      listTotal.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
    ElMessage.error('加载商品列表失败')
  } finally {
    loading.value = false
  }
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'info',      // 已下架
    1: 'success',   // 已上架
    2: 'warning'    // 待审核
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    0: '已下架',
    1: '已上架',
    2: '待审核'
  }
  return textMap[status] || '未知'
}

// Tab切换
const handleTabChange = (tab) => {
  if (tab === 'audit') {
    auditPage.value = 1
    loadPendingProducts()
  } else if (tab === 'list') {
    listPage.value = 1
    loadProductList()
  }
}

// 审核通过
const approveProduct = async (product) => {
  try {
    await ElMessageBox.confirm(`确定通过商品 "${product.name}" 的审核吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    })
    
    const res = await auditProduct(product.id, {
      approved: true
    })
    
    if (res.code === 1000) {
      ElMessage.success('商品审核已通过')
      loadPendingProducts() // 重新加载待审核列表
    } else {
      throw new Error(res.message || '审核失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('审核失败:', error)
      ElMessage.error(error.message || '审核失败')
    }
  }
}

// 审核拒绝
const rejectDialogVisible = ref(false)
const rejectForm = ref({
  reason: '',
  productId: null
})

const rejectProduct = (product) => {
  rejectForm.value = {
    reason: '',
    productId: product.id
  }
  rejectDialogVisible.value = true
}

const confirmReject = async () => {
  if (!rejectForm.value.reason) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  
  try {
    const res = await auditProduct(rejectForm.value.productId, {
      approved: false,
      reason: rejectForm.value.reason
    })
    
    if (res.code === 1000) {
      ElMessage.success('已拒绝商品审核')
      rejectDialogVisible.value = false
      loadPendingProducts() // 重新加载待审核列表
    } else {
      throw new Error(res.message || '操作失败')
    }
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error(error.message || '操作失败')
  }
}

// 查看详情
const viewProductDetail = (product) => {
  ElMessage.info(`查看商品 ${product.name} 详情`)
  // TODO: 跳转到商品详情页或打开详情弹窗
}

// 下架商品
const offlineProductItem = async (product) => {
  try {
    await ElMessageBox.confirm(`确定要下架商品 "${product.name}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res = await offlineProductApi(product.id)
    if (res.code === 1000) {
      ElMessage.success('商品已下架')
      loadProductList() // 重新加载列表
    } else {
      throw new Error(res.message || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('操作失败:', error)
      ElMessage.error(error.message || '操作失败')
    }
  }
}

// 删除商品
const deleteProduct = async (product) => {
  try {
    await ElMessageBox.confirm(`确定要删除商品 "${product.name}" 吗？此操作不可恢复！`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // TODO: 调用后端API删除商品
    ElMessage.success('删除成功（模拟）')
    const index = productList.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      productList.value.splice(index, 1)
    }
  } catch {}
}

// 初始加载
onMounted(() => {
  loadPendingProducts()
})
</script>

<style scoped lang="scss">
.admin-products {
  .tabs-card {
    .filter-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .product-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
    }

    .product-image-small {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      object-fit: cover;
    }

    .product-info {
      .product-name {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 4px;
      }

      .product-sub {
        font-size: 12px;
        color: #909399;
        margin-bottom: 4px;
      }

      .product-meta {
        display: flex;
        align-items: center;
        gap: 8px;

        .merchant-name {
          font-size: 12px;
          color: #606266;
        }
      }
    }

    .price-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .current-price {
        font-size: 14px;
        font-weight: 600;
        color: #f56c6c;
      }

      .original-price {
        font-size: 12px;
        color: #909399;
        text-decoration: line-through;
      }
    }

    .price {
      font-weight: 600;
      color: #f56c6c;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
