<template>
  <div class="admin-users">
    <!-- 搜索栏 -->
    <el-card class="search-card" shadow="hover">
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户名/手机号/邮箱"
          clearable
          style="width: 280px"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="用户状态" clearable style="width: 120px">
          <el-option label="正常" value="normal" />
          <el-option label="已冻结" value="frozen" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
        <el-button type="primary">搜索</el-button>
      </div>
    </el-card>

    <!-- 用户列表 -->
    <el-card class="table-card" shadow="hover">
      <el-table :data="userList" v-loading="loading" style="width: 100%">
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="{ row }">
            <img :src="row.avatar" alt="" class="user-avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="balance" label="账户余额" width="100">
          <template #default="{ row }">
            <span class="balance">¥{{ row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orders" label="订单数" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'normal' ? 'success' : 'danger'" size="small">
              {{ row.status === 'normal' ? '正常' : '已冻结' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewUserDetail(row)">详情</el-button>
            <el-button
              :type="row.status === 'normal' ? 'warning' : 'success'"
              link
              @click="toggleUserStatus(row)"
            >
              {{ row.status === 'normal' ? '冻结' : '解冻' }}
            </el-button>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 用户详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="用户详情" width="700px">
      <div v-if="currentUser" class="user-detail">
        <div class="detail-header">
          <img :src="currentUser.avatar" alt="" class="detail-avatar" />
          <div class="detail-info">
            <div class="detail-name">{{ currentUser.nickname }}</div>
            <div class="detail-username">用户名：{{ currentUser.username }}</div>
          </div>
          <el-tag :type="currentUser.status === 'normal' ? 'success' : 'danger'" size="large">
            {{ currentUser.status === 'normal' ? '正常' : '已冻结' }}
          </el-tag>
        </div>

        <el-descriptions :column="2" border class="detail-descriptions">
          <el-descriptions-item label="手机号">{{ currentUser.phone }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ currentUser.email }}</el-descriptions-item>
          <el-descriptions-item label="账户余额">¥{{ currentUser.balance }}</el-descriptions-item>
          <el-descriptions-item label="订单数">{{ currentUser.orders }}</el-descriptions-item>
          <el-descriptions-item label="注册时间">{{ currentUser.registerTime }}</el-descriptions-item>
          <el-descriptions-item label="最后登录">{{ currentUser.lastLoginTime }}</el-descriptions-item>
        </el-descriptions>

        <div class="detail-section">
          <div class="section-title">最近订单</div>
          <el-table :data="currentUser.recentOrders" size="small">
            <el-table-column prop="orderNo" label="订单号" width="180" />
            <el-table-column prop="amount" label="金额" width="100">
              <template #default="{ row }">¥{{ row.amount }}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="180" />
          </el-table>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getUserList, updateUserStatus } from '../../api/modules/admin.js'

// 搜索
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 用户列表
const userList = ref([])

// 加载用户列表
const loadUserList = async () => {
  loading.value = true
  try {
    const res = await getUserList({
      pageNum: currentPage.value,
      pageSize: pageSize.value
    })
    if (res.code === 1000 && res.data) {
      userList.value = (res.data.content || []).map(item => ({
        id: item.id,
        username: item.username,
        nickname: item.nickname,
        avatar: item.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        phone: item.phone || '',
        email: item.email || '',
        balance: item.balance || 0,
        orders: item.orderCount || 0,
        status: item.status === 1 ? 'normal' : 'frozen',
        registerTime: item.createdAt,
        lastLoginTime: item.lastLoginTime,
        recentOrders: []
      }))
      total.value = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('加载用户列表失败:', error)
    ElMessage.error('加载用户列表失败')
  } finally {
    loading.value = false
  }
}

// 详情弹窗
const detailDialogVisible = ref(false)
const currentUser = ref(null)

// 查看详情
const viewUserDetail = (user) => {
  currentUser.value = user
  detailDialogVisible.value = true
}

// 切换用户状态
const toggleUserStatus = async (user) => {
  const action = user.status === 'normal' ? '冻结' : '解冻'
  try {
    await ElMessageBox.confirm(`确定要${action}用户 "${user.username}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const newStatus = user.status === 'normal' ? 0 : 1
    const res = await updateUserStatus(user.id, newStatus)
    
    if (res.code === 1000) {
      user.status = user.status === 'normal' ? 'frozen' : 'normal'
      ElMessage.success(`用户已${action}`)
      loadUserList()
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

const handleSizeChange = (size) => {
  pageSize.value = size
  loadUserList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  loadUserList()
}

// 初始加载
onMounted(() => {
  loadUserList()
})
</script>

<style scoped lang="scss">
.admin-users {
  .search-card {
    margin-bottom: 20px;

    .search-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .table-card {
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .balance {
      font-weight: 600;
      color: #67c23a;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.user-detail {
  .detail-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 20px;

    .detail-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .detail-info {
      flex: 1;

      .detail-name {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }

      .detail-username {
        font-size: 14px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }

  .detail-section {
    margin-top: 20px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 12px;
    }
  }
}
</style>
