<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': isCollapse }">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="logo">
          <el-icon class="logo-icon"><Monitor /></el-icon>
          <span v-if="!isCollapse" class="logo-text">平台管理</span>
        </div>
      </div>

      <!-- 菜单 -->
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        :collapse="isCollapse"
        @select="handleMenuSelect"
      >
        <el-menu-item index="dashboard">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
        <el-menu-item index="merchants">
          <el-icon><OfficeBuilding /></el-icon>
          <template #title>商家管理</template>
        </el-menu-item>
        <el-menu-item index="users">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="categories">
          <el-icon><Grid /></el-icon>
          <template #title>分类管理</template>
        </el-menu-item>
        <el-menu-item index="products">
          <el-icon><Goods /></el-icon>
          <template #title>商品审核</template>
        </el-menu-item>
        <el-menu-item index="orders">
          <el-icon><List /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="finance">
          <el-icon><Wallet /></el-icon>
          <template #title>财务管理</template>
        </el-menu-item>
        <el-menu-item index="marketing">
          <el-icon><Promotion /></el-icon>
          <template #title>营销管理</template>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 主体内容 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <header class="top-header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="toggleSidebar">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentMenuTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <!-- 消息通知 -->
          <el-badge :value="pendingTasks" :max="99" class="message-badge">
            <el-button :icon="Bell" circle />
          </el-badge>
          <!-- 用户下拉 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80" alt="管理员头像" class="user-avatar" />
              <span class="user-name">超级管理员</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                <el-dropdown-item command="password">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Monitor, DataAnalysis, OfficeBuilding, User, Grid, Goods,
  List, Wallet, Promotion, Setting, Fold, Expand, Bell, ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 侧边栏折叠状态
const isCollapse = ref(false)

// 待办任务数
const pendingTasks = ref(5)

// 当前激活菜单
const activeMenu = computed(() => {
  const path = route.path
  if (path.includes('admin/dashboard')) return 'dashboard'
  if (path.includes('admin/merchants')) return 'merchants'
  if (path.includes('admin/users')) return 'users'
  if (path.includes('admin/categories')) return 'categories'
  if (path.includes('admin/products')) return 'products'
  if (path.includes('admin/orders')) return 'orders'
  if (path.includes('admin/finance')) return 'finance'
  if (path.includes('admin/marketing')) return 'marketing'
  if (path.includes('admin/settings')) return 'settings'
  return 'dashboard'
})

// 当前菜单标题
const currentMenuTitle = computed(() => {
  const menuMap = {
    dashboard: '工作台',
    merchants: '商家管理',
    users: '用户管理',
    categories: '分类管理',
    products: '商品审核',
    orders: '订单管理',
    finance: '财务管理',
    marketing: '营销管理',
    settings: '系统设置'
  }
  return menuMap[activeMenu.value] || '工作台'
})

// 切换侧边栏
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 菜单选择
const handleMenuSelect = (index) => {
  const routeMap = {
    dashboard: '/admin',
    merchants: '/admin/merchants',
    users: '/admin/users',
    categories: '/admin/categories',
    products: '/admin/products',
    orders: '/admin/orders',
    finance: '/admin/finance',
    marketing: '/admin/marketing',
    settings: '/admin/settings'
  }
  router.push(routeMap[index])
}

// 用户菜单命令
const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      ElMessage.success('已退出登录')
      router.push('/')
    } catch {
      // 用户取消
    }
  } else if (command === 'profile') {
    router.push('/admin/settings')
  } else if (command === 'password') {
    ElMessage.info('修改密码功能开发中')
  }
}
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

.sidebar {
  width: 220px;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  position: fixed;
  height: 100vh;
  z-index: 100;

  .sidebar-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebeef5;

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;

      .logo-icon {
        font-size: 28px;
        color: #409eff;
      }

      .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
  }

  .sidebar-menu {
    border-right: none;
    flex: 1;
    overflow-y: auto;

    &:not(.el-menu--collapse) {
      width: 220px;
    }

    .el-menu-item {
      height: 50px;
      line-height: 50px;

      &.is-active {
        background: #ecf5ff;
        color: #409eff;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: #409eff;
        }
      }

      &:hover {
        background: #f5f7fa;
      }
    }
  }
}

.sidebar-collapsed {
  .sidebar {
    width: 64px;

    .logo-text {
      display: none;
    }
  }

  .main-container {
    margin-left: 64px;
  }
}

.main-container {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s;
}

.top-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 99;

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
      font-size: 20px;
      cursor: pointer;
      color: #606266;

      &:hover {
        color: #409eff;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .message-badge {
      :deep(.el-badge__content) {
        background: #f56c6c;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;

      &:hover {
        background: #f5f7fa;
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-name {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
