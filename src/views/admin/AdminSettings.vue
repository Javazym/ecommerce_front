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
          <el-table-column prop="avatar" label="头像" width="80">
            <template #default="{ row }"><img :src="row.avatar" alt="" class="admin-avatar" /></template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120" />
          <el-table-column prop="nickname" label="昵称" width="120" />
          <el-table-column prop="role" label="角色" width="120">
            <template #default="{ row }"><el-tag size="small">{{ row.roleName }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="140" />
          <el-table-column prop="email" label="邮箱" min-width="180" />
          <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }"><el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">{{ row.status === 'active' ? '启用' : '禁用' }}</el-tag></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }"><el-button type="primary" link>编辑</el-button><el-button type="danger" link>删除</el-button></template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'

const activeTab = ref('admins')
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const logQuery = ref('')

const adminList = ref([
  { id: 1, username: 'admin', nickname: '超级管理员', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', role: 'super', roleName: '超级管理员', phone: '138****8888', email: 'admin@example.com', lastLoginTime: '2024-01-15 14:30:25', status: 'active' },
  { id: 2, username: 'operator1', nickname: '运营人员', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', role: 'operator', roleName: '运营经理', phone: '139****9999', email: 'operator@example.com', lastLoginTime: '2024-01-15 10:20:15', status: 'active' },
  { id: 3, username: 'support1', nickname: '客服人员', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100', role: 'support', roleName: '客服', phone: '137****7777', email: 'support@example.com', lastLoginTime: '2024-01-14 16:45:30', status: 'active' }
])

const roleList = ref([
  { id: 1, name: '超级管理员', description: '拥有所有权限', adminCount: 1, permissions: ['全部权限'] },
  { id: 2, name: '运营经理', description: '负责运营相关工作', adminCount: 2, permissions: ['商家管理', '用户管理', '订单管理', '营销管理'] },
  { id: 3, name: '客服', description: '负责客服相关工作', adminCount: 1, permissions: ['订单查看', '退款处理', '用户管理'] }
])

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

const logList = ref([
  { time: '2024-01-15 14:30:25', adminName: '超级管理员', action: '商家审核', target: '数码专营店', ip: '192.168.1.100', result: 'success' },
  { time: '2024-01-15 11:20:15', adminName: '运营人员', action: '修改配置', target: '平台抽成比例', ip: '192.168.1.101', result: 'success' },
  { time: '2024-01-14 16:45:30', adminName: '客服', action: '处理退款', target: '订单 #YS20240110002', ip: '192.168.1.102', result: 'success' }
])

const addAdmin = () => ElMessage.info('添加管理员')
const addRole = () => ElMessage.info('添加角色')
const saveConfig = () => ElMessage.success('配置保存成功')
</script>

<style scoped lang="scss">
.admin-settings {
  .tabs-card {
    .content-header { margin-bottom: 16px; }
    .search-bar { display: flex; gap: 12px; align-items: center; }
    .admin-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .unit { margin-left: 8px; color: #909399; }
    .tip { margin-left: 12px; color: #909399; font-size: 12px; }
    .config-form { max-width: 600px; }
    .pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
  }
}
</style>
