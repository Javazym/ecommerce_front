<template>
  <div class="admin-settings">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="管理员管理" name="admins" />
        <el-tab-pane label="角色权限" name="roles" />
        <el-tab-pane label="平台配置" name="config" />
        <el-tab-pane label="操作日志" name="logs" />
      </el-tabs>

      <!-- 管理员管理 -->
      <div v-if="activeTab === 'admins'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="addAdmin"><el-icon><Plus /></el-icon>添加管理员</el-button>
        </div>
        <el-table :data="adminList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="username" label="用户名" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="最后登录时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="resetPassword(row)">重置密码</el-button>
              <el-button type="danger" link @click="deleteAdmin(row)">删除</el-button>
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

      <!-- 角色权限 -->
      <div v-if="activeTab === 'roles'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="addRole"><el-icon><Plus /></el-icon>添加角色</el-button>
        </div>
        <el-table :data="roleList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="name" label="角色名称" width="150" />
          <el-table-column prop="description" label="描述" min-width="200" />
          <el-table-column prop="adminCount" label="管理员数" width="100" />
          <el-table-column prop="permissions" label="权限" min-width="300">
            <template #default="{ row }">
              <el-tag v-for="perm in row.permissions" :key="perm" size="small" style="margin-right: 4px;">{{ perm }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }"><el-button type="primary" link>编辑</el-button><el-button type="danger" link>删除</el-button></template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 平台配置 -->
      <div v-if="activeTab === 'config'" class="tab-content">
        <el-form :model="platformConfig" label-width="150px" class="config-form">
          <el-form-item label="平台名称">
            <el-input v-model="platformConfig.platformName" style="width: 300px" />
          </el-form-item>
          <el-form-item label="默认抽成比例">
            <el-input-number v-model="platformConfig.defaultCommission" :min="0" :max="100" :precision="0" />
            <span class="unit">%</span>
          </el-form-item>
          <el-form-item label="新商家保证金">
            <el-input-number v-model="platformConfig.deposit" :min="0" :precision="0" />
            <span class="unit">元</span>
          </el-form-item>
          <el-form-item label="订单自动确认收货">
            <el-input-number v-model="platformConfig.autoReceive" :min="1" :max="30" :precision="0" />
            <span class="unit">天</span>
          </el-form-item>
          <el-form-item label="订单自动完成">
            <el-input-number v-model="platformConfig.autoComplete" :min="1" :max="30" :precision="0" />
            <span class="unit">天</span>
          </el-form-item>
          <el-form-item label="用户提现手续费">
            <el-input-number v-model="platformConfig.withdrawFee" :min="0" :max="10" :precision="1" />
            <span class="unit">%</span>
          </el-form-item>
          <el-form-item label="商品审核开关">
            <el-switch v-model="platformConfig.productAuditRequired" />
            <span class="tip">开启后，商家发布的商品需要平台审核</span>
          </el-form-item>
          <el-form-item label="商家审核开关">
            <el-switch v-model="platformConfig.merchantAuditRequired" />
            <span class="tip">开启后，新入驻商家需要平台审核</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveConfig">保存配置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作日志 -->
      <div v-if="activeTab === 'logs'" class="tab-content">
        <div class="search-bar">
          <el-input v-model="logQuery" placeholder="搜索操作人/内容" clearable style="width: 280px">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <el-table :data="logList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="time" label="操作时间" width="180" />
          <el-table-column prop="adminName" label="操作人" width="120" />
          <el-table-column prop="action" label="操作" width="150" />
          <el-table-column prop="target" label="操作对象" min-width="200" />
          <el-table-column prop="ip" label="IP地址" width="140" />
          <el-table-column prop="result" label="结果" width="100">
            <template #default="{ row }"><el-tag :type="row.result === 'success' ? 'success' : 'danger'" size="small">{{ row.result === 'success' ? '成功' : '失败' }}</el-tag></template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]" :total="total" layout="total, sizes, prev, pager, next, jumper" />
        </div>
      </div>
    </el-card>

    <!-- 添加管理员弹窗 -->
    <el-dialog v-model="addAdminDialogVisible" title="添加管理员" width="500px">
      <el-form :model="addAdminForm" label-width="100px">
        <el-form-item label="用户名" required>
          <el-input v-model="addAdminForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input 
            v-model="addAdminForm.password" 
            type="password" 
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" required>
          <el-input 
            v-model="addAdminForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addAdminForm.email" placeholder="请输入邮箱（可选）" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="addAdminForm.realName" placeholder="请输入真实姓名（可选）" />
        </el-form-item>
        <el-form-item label="头像URL">
          <el-input v-model="addAdminForm.avatar" placeholder="请输入头像URL（可选）" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addAdminDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddAdmin">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { createAdmin } from '../../api/modules/admin.js'

const activeTab = ref('admins')
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const logQuery = ref('')

// 管理员列表(暂保留模拟数据,待后端API补充)
const adminList = ref([
  { id: 1, username: 'admin', status: 1, lastLoginTime: '2024-01-15 14:30:25' },
  { id: 2, username: 'operator1', status: 1, lastLoginTime: '2024-01-15 10:20:15' },
  { id: 3, username: 'support1', status: 0, lastLoginTime: '2024-01-14 16:45:30' }
])

// 角色列表（暂保留模拟数据，待后端API补充）
const roleList = ref([
  { id: 1, name: '超级管理员', description: '拥有所有权限', adminCount: 1, permissions: ['全部权限'] },
  { id: 2, name: '运营经理', description: '负责运营相关工作', adminCount: 2, permissions: ['商家管理', '用户管理', '订单管理', '营销管理'] },
  { id: 3, name: '客服', description: '负责客服相关工作', adminCount: 1, permissions: ['订单查看', '退款处理', '用户管理'] }
])

// 平台配置
const platformConfig = reactive({
  platformName: '云商城',
  defaultCommission: 5,
  deposit: 1000,
  autoReceive: 7,
  autoComplete: 15,
  withdrawFee: 1,
  productAuditRequired: false,
  merchantAuditRequired: true
})

// 操作日志（暂保留模拟数据，待后端API补充）
const logList = ref([
  { time: '2024-01-15 14:30:25', adminName: '超级管理员', action: '商家审核', target: '数码专营店', ip: '192.168.1.100', result: 'success' },
  { time: '2024-01-15 11:20:15', adminName: '运营人员', action: '修改配置', target: '平台抽成比例', ip: '192.168.1.101', result: 'success' },
  { time: '2024-01-14 16:45:30', adminName: '客服', action: '处理退款', target: '订单 #YS20240110002', ip: '192.168.1.102', result: 'success' }
])

// 添加管理员弹窗
const addAdminDialogVisible = ref(false)
const addAdminForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  realName: '',
  avatar: ''
})

// 添加管理员功能
const addAdmin = () => {
  addAdminForm.username = ''
  addAdminForm.password = ''
  addAdminForm.confirmPassword = ''
  addAdminForm.email = ''
  addAdminForm.realName = ''
  addAdminForm.avatar = ''
  addAdminDialogVisible.value = true
}

// 确认添加管理员
const confirmAddAdmin = async () => {
  if (!addAdminForm.username) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!addAdminForm.password) {
    ElMessage.warning('请输入密码')
    return
  }
  if (addAdminForm.password !== addAdminForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  
  try {
    const res = await createAdmin({
      username: addAdminForm.username,
      password: addAdminForm.password,
      confirmPassword: addAdminForm.confirmPassword,
      email: addAdminForm.email || undefined,
      realName: addAdminForm.realName || undefined,
      avatar: addAdminForm.avatar || undefined
    })
    
    if (res.code === 1000) {
      ElMessage.success('管理员添加成功')
      addAdminDialogVisible.value = false
      // TODO: 重新加载管理员列表
    } else {
      throw new Error(res.message || '添加失败')
    }
  } catch (error) {
    console.error('添加管理员失败:', error)
    ElMessage.error(error.message || '添加失败')
  }
}

// 重置密码
const resetPassword = async (admin) => {
  try {
    await ElMessageBox.confirm(`确定要重置管理员 "${admin.username}" 的密码吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // TODO: 调用后端API重置密码
    ElMessage.success('密码重置成功(模拟)')
  } catch {}
}

// 删除管理员
const deleteAdmin = async (admin) => {
  try {
    await ElMessageBox.confirm(`确定要删除管理员 "${admin.username}" 吗？此操作不可恢复！`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // TODO: 调用后端API删除管理员
    const index = adminList.value.findIndex(a => a.id === admin.id)
    if (index > -1) {
      adminList.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
  } catch {}
}

// TODO: 添加角色功能 - 需要后端提供相关API
const addRole = () => ElMessage.info('添加角色功能开发中（需后端API支持）')

// 保存配置
const saveConfig = async () => {
  try {
    // TODO: 调用后端API保存配置
    // const res = await updatePlatformConfig(platformConfig)
    // if (res.code === 1000) {
    //   ElMessage.success('配置保存成功')
    // }
    
    // 暂时模拟保存成功
    console.log('保存的配置:', platformConfig)
    ElMessage.success('配置保存成功（模拟）')
  } catch (error) {
    console.error('保存配置失败:', error)
    ElMessage.error('保存配置失败')
  }
}
</script>

<style scoped lang="scss">
.admin-settings {
  .tabs-card {
    .content-header { margin-bottom: 16px; }
    .search-bar { display: flex; gap: 12px; align-items: center; }
    .unit { margin-left: 8px; color: #909399; }
    .tip { margin-left: 12px; color: #909399; font-size: 12px; }
    .config-form { max-width: 600px; }
    .pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
