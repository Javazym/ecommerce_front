<template>
  <div class="merchant-layout" :class="{ 'sidebar-collapsed': isCollapse }">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="logo">
          <el-icon class="logo-icon"><Shop /></el-icon>
          <span v-if="!isCollapse" class="logo-text">商家中心</span>
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
        <el-menu-item index="products">
          <el-icon><Goods /></el-icon>
          <template #title>商品管理</template>
        </el-menu-item>
        <el-menu-item index="orders">
          <el-icon><List /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="marketing">
          <el-icon><Ticket /></el-icon>
          <template #title>营销中心</template>
        </el-menu-item>
        <el-menu-item index="finance">
          <el-icon><Wallet /></el-icon>
          <template #title>财务管理</template>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <template #title>店铺设置</template>
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
          <el-badge :value="3" :max="99" class="message-badge">
            <el-button :icon="Bell" circle />
          </el-badge>
          <!-- 用户下拉 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <img :src="userStore.userInfo.avatar" alt="商家头像" class="user-avatar" />
              <span class="user-name">{{userStore.userInfo.nickname}}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">店铺信息</el-dropdown-item>
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
import {ref, computed, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Shop, DataAnalysis, Goods, List, Ticket, Wallet, Setting,
  Fold, Expand, Bell, ArrowDown
} from '@element-plus/icons-vue'
import userStore from "../../stores/userStore.js";
import {getCurrentUser} from "../../api/modules/user.js";

const router = useRouter()
const route = useRoute()
onMounted(() => {
  getCurrentUser().then(res => {
    console.log(res.data)
    userStore.userInfo = res.data
  })
})
// 侧边栏折叠状态
const isCollapse = ref(false)

// 当前激活菜单
const activeMenu = computed(() => {
  const path = route.path
  if (path.includes('dashboard')) return 'dashboard'
  if (path.includes('products')) return 'products'
  if (path.includes('merchant-orders')) return 'orders'
  if (path.includes('marketing')) return 'marketing'
  if (path.includes('finance')) return 'finance'
  if (path.includes('settings')) return 'settings'
  return 'dashboard'
})

// 当前菜单标题
const currentMenuTitle = computed(() => {
  const menuMap = {
    dashboard: '工作台',
    products: '商品管理',
    orders: '订单管理',
    marketing: '营销中心',
    finance: '财务管理',
    settings: '店铺设置'
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
    dashboard: '/merchant',
    products: '/merchant/products',
    orders: '/merchant/orders',
    marketing: '/merchant/marketing',
    finance: '/merchant/finance',
    settings: '/merchant/settings'
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
    router.push('/merchant/settings')
  } else if (command === 'password') {
    ElMessage.info('修改密码功能开发中')
  }
}
</script>

<style scoped lang="scss">
.merchant-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
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
