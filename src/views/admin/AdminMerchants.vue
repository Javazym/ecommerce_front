<template>
  <div class="admin-merchants">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="商家审核" name="audit">
          <template #label>
            <span>商家审核</span>
            <el-badge :value="auditCount" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="商家列表" name="list" />
        <el-tab-pane label="商家分组" name="groups" />
      </el-tabs>

      <!-- 商家审核 -->
      <div v-if="activeTab === 'audit'" class="tab-content">
        <el-table :data="auditList" v-loading="loading" style="width: 100%">
          <el-table-column prop="storeName" label="店铺信息" min-width="200">
            <template #default="{ row }">
              <div class="merchant-info">
                <img :src="row.avatar" alt="" class="merchant-avatar" />
                <div class="merchant-detail">
                  <div class="merchant-name">{{ row.storeName }}</div>
                  <div class="merchant-category">{{ Array.isArray(row.category) ?
                      row.category.join(', ') : row.category || '' }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="contactName" label="联系人" width="120" />
          <el-table-column prop="contactPhone" label="联系电话" width="140" />
          <el-table-column prop="applyTime" label="申请时间" width="180" />

          <el-table-column label="资质文件" width="100">
            <template #default="{ row }">
              <el-button type="primary" link @click="viewLicense(row)">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="success" @click="approveMerchant(row)">通过</el-button>
              <el-button type="danger" @click="rejectMerchant(row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 商家列表 -->
      <div v-if="activeTab === 'list'" class="tab-content">
        <div class="filter-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索商家名称"
            clearable
            style="width: 240px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select v-model="statusFilter" placeholder="商家状态" clearable style="width: 120px">
            <el-option label="营业中" value="active" />
            <el-option label="已关闭" value="closed" />
            <el-option label="待审核" value="pending" />
          </el-select>
          <el-button type="primary">搜索</el-button>
        </div>

        <el-table :data="merchantList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="name" label="店铺信息" min-width="200">
            <template #default="{ row }">
              <div class="merchant-info">
                <img :src="row.avatar" alt="" class="merchant-avatar" />
                <div class="merchant-detail">
                  <div class="merchant-name">{{ row.name }}</div>
                  <div class="merchant-category">{{ row.category }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="owner" label="店主" width="100" />
          <el-table-column prop="products" label="商品数" width="80" />
          <el-table-column prop="orders" label="订单数" width="80" />
          <el-table-column prop="sales" label="销售额" width="120">
            <template #default="{ row }">
              <span class="sales">¥{{ row.sales.toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="viewMerchantDetail(row)">详情</el-button>
              <el-button type="warning" link @click="closeMerchant(row)" v-if="row.status === 'active'">关闭</el-button>
              <el-button type="success" link @click="openMerchant(row)" v-else>开启</el-button>
              <el-button type="danger" link @click="deleteMerchant(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>

      <!-- 商家分组 -->
      <div v-if="activeTab === 'groups'" class="tab-content">
        <div class="content-header">
          <el-button type="primary">
            <el-icon><Plus /></el-icon>
            添加分组
          </el-button>
        </div>

        <el-table :data="groupList" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="name" label="分组名称" width="150" />
          <el-table-column prop="description" label="描述" min-width="200" />
          <el-table-column prop="merchantCount" label="商家数量" width="100" />
          <el-table-column prop="commission" label="抽成比例" width="100">
            <template #default="{ row }">
              <span class="commission">{{ row.commission }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 资质查看弹窗 -->
    <el-dialog v-model="licenseDialogVisible" title="商家资质文件" width="600px">
      <div v-if="currentMerchant" class="license-info">
        <div class="license-item">
          <div class="license-label">营业执照</div>
          <img :src="currentMerchant.businessLicense" alt="营业执照" class="license-image" />
        </div>
        <div class="license-item">
          <div class="license-label">法人身份证</div>
          <div class="id-images">
            <img :src="currentMerchant.idCardFront" alt="身份证正面" />
            <img :src="currentMerchant.idCardBack" alt="身份证反面" />
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="licenseDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import {
  auditMerchantApplication,
  getAllApplications,
  getMerchantsByStatus,
  getAllMerchants,
  updateMerchantStatus,
  deleteMerchant as deleteMerchantApi,
  getMerchantsGroupedByCategory
} from "../../api/modules/admin.js";

// Tab
const activeTab = ref('audit')
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 审核列表
const auditCount = ref(0)
const auditList = ref([])

// 加载待审核商家
const loadAuditList = async () => {
  loading.value = true
  try {
    const res = await getMerchantsByStatus(0, { pageNum: 1, pageSize: 50 })
    if (res.code === 1000 && res.data) {
      auditList.value = res.data.content || []
      auditCount.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载待审核商家失败:', error)
    ElMessage.error('加载待审核商家失败')
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getMerchantsByStatus(0).then(res => {
    auditList.value = res.data['content']
  })
})

// 商家列表
const merchantList = ref([])

// 加载商家列表
const loadMerchantList = async () => {
  loading.value = true
  try {
    const res = await getAllMerchants({
      pageNum: currentPage.value,
      pageSize: pageSize.value
    })
    if (res.code === 1000 && res.data) {
      merchantList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.storeName,
        category: Array.isArray(item.category) ? item.category.join(', ') : (item.category || ''),
        avatar: item.storeLogo || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100',
        owner: item.contactName || '',
        products: item.productCount || 0,
        orders: item.orderCount || 0,
        sales: item.sales || 0,
        status: item.status === 1 ? 'active' : 'closed'
      }))
      total.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载商家列表失败:', error)
    ElMessage.error('加载商家列表失败')
  } finally {
    loading.value = false
  }
}

// 分组列表
const groupList = ref([])

// 加载商家分组
const loadGroupList = async () => {
  try {
    const res = await getMerchantsGroupedByCategory()
    if (res.code === 1000 && res.data) {
      groupList.value = (res.data || []).map((item, index) => ({
        id: index + 1,
        name: item.categoryName,
        description: item.categoryDescription || '',
        merchantCount: item.merchantCount || 0,
        commission: 5 // 默认抽成，后续可从配置获取
      }))
    }
  } catch (error) {
    console.error('加载商家分组失败:', error)
  }
}

// 资质弹窗
const licenseDialogVisible = ref(false)
const currentMerchant = ref(null)

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = { active: 'success', closed: 'danger', pending: 'warning' }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = { active: '营业中', closed: '已关闭', pending: '待审核' }
  return textMap[status] || '未知'
}

// Tab切换
const handleTabChange = (tab) => {
  currentPage.value = 1
  if (tab === 'list') {
    loadMerchantList()
  } else if (tab === 'groups') {
    loadGroupList()
  }
}

// 查看资质
const viewLicense = (merchant) => {
  currentMerchant.value = merchant
  licenseDialogVisible.value = true
}

// 审核通过
const approveMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定通过商家 "${merchant.storeName}" 的入驻申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    })
    
    const res = await auditMerchantApplication({
      id: merchant.id,
      status: 1,
      remark: '恭喜你的入驻申请通过'
    })
    
    if (res.code === 1000) {
      ElMessage.success('商家入驻已通过')
      loadAuditList() // 重新加载审核列表
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
const rejectMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定拒绝商家 "${merchant.storeName}" 的入驻申请吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res = await auditMerchantApplication({
      id: merchant.id,
      status: 2,
      remark: '很抱歉，您的入驻申请未通过审核'
    })
    
    if (res.code === 1000) {
      ElMessage.success('已拒绝商家入驻申请')
      loadAuditList() // 重新加载审核列表
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

// 查看详情
const viewMerchantDetail = (merchant) => {
  ElMessage.info(`查看商家 ${merchant.name} 详情`)
}

// 关闭商家
const closeMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定要关闭商家 "${merchant.name}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res = await updateMerchantStatus(merchant.id, 0)
    if (res.code === 1000) {
      ElMessage.success('商家已关闭')
      loadMerchantList() // 重新加载列表
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

// 开启商家
const openMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定要开启商家 "${merchant.name}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    })
    
    const res = await updateMerchantStatus(merchant.id, 1)
    if (res.code === 1000) {
      ElMessage.success('商家已开启')
      loadMerchantList() // 重新加载列表
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

// 删除商家
const deleteMerchant = async (merchant) => {
  try {
    await ElMessageBox.confirm(`确定要删除商家 "${merchant.name}" 吗？此操作不可恢复！`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const res = await deleteMerchantApi(merchant.id)
    if (res.code === 1000) {
      ElMessage.success('删除成功')
      loadMerchantList() // 重新加载列表
    } else {
      throw new Error(res.message || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error(error.message || '删除失败')
    }
  }
}

const handleSizeChange = (size) => {
  pageSize.value = size
  loadMerchantList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  loadMerchantList()
}

// 初始加载
onMounted(() => {
  loadAuditList()
})
</script>

<style scoped lang="scss">
.admin-merchants {
  .tabs-card {
    .filter-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .merchant-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .merchant-avatar {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        object-fit: cover;
      }

      .merchant-detail {
        .merchant-name {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
        }

        .merchant-category {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
        }
      }
    }

    .sales {
      font-weight: 600;
      color: #f56c6c;
    }

    .commission {
      font-weight: 600;
      color: #409eff;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .license-info {
    .license-item {
      margin-bottom: 20px;

      .license-label {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 12px;
      }

      .license-image {
        width: 100%;
        max-height: 300px;
        object-fit: contain;
        border-radius: 8px;
      }

      .id-images {
        display: flex;
        gap: 16px;

        img {
          width: 200px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
