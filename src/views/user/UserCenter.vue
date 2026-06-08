<template>
  <div class="user-center-page">
    <!-- 导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1 class="page-title">
            <el-icon><User /></el-icon>
            个人中心
          </h1>
        </div>

        <!-- 用户信息卡片 -->
        <div class="user-info-card">
          <div class="user-avatar-section">
            <div class="user-avatar">
              <img :src="userInfo.avatar" :alt="userInfo.avatar" />
              <el-button class="change-avatar-btn" size="small" circle>
                <el-icon><Camera /></el-icon>
              </el-button>
            </div>
            <div class="user-basic">
              <h2 class="user-name">{{ userInfo.nickname }}</h2>
              <p class="user-level">
                <el-tag type="warning" size="small">{{ userInfo.level }}</el-tag>
                <span class="level-text">
                  成长值 {{ userInfo.growthValue }} / {{ userInfo.nextLevelGrowth }}
                </span>
              </p>
            </div>
          </div>
          <div class="user-stats">
<!--            <div class="stat-item" @click="goToOrders('pending')">-->
<!--              <span class="stat-value">{{ userStore.statistics.pendingPayment }}</span>-->
<!--              <span class="stat-label">待付款</span>-->
<!--            </div>-->
<!--            <div class="stat-item" @click="goToOrders('paid')">-->
<!--              <span class="stat-value">{{ userStore.statistics.pendingShipment }}</span>-->
<!--              <span class="stat-label">待发货</span>-->
<!--            </div>-->
<!--            <div class="stat-item" @click="goToOrders('shipped')">-->
<!--              <span class="stat-value">{{ userStore.statistics.pendingReceipt }}</span>-->
<!--              <span class="stat-label">待收货</span>-->
<!--            </div>-->
<!--            <div class="stat-item" @click="goToCoupons">-->
<!--              <span class="stat-value">{{ userStore.statistics.couponCount }}</span>-->
<!--              <span class="stat-label">优惠券</span>-->
<!--            </div>-->
<!--            <div class="stat-item" @click="goToFavorites">-->
<!--              <span class="stat-value">{{ userStore.statistics.favoriteCount }}</span>-->
<!--              <span class="stat-label">收藏商品</span>-->
<!--            </div>-->
          </div>
        </div>

        <!-- 主内容区 -->
        <div class="center-content">
          <!-- 左侧菜单 -->
          <aside class="center-sidebar">
            <el-menu :default-active="activeMenu" class="center-menu" @select="handleMenuSelect">
              <el-menu-item index="profile">
                <el-icon><User /></el-icon>
                <span>个人信息</span>
              </el-menu-item>
              <el-menu-item index="orders">
                <el-icon><List /></el-icon>
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item index="merchant">
                <el-icon><Shop /></el-icon>
                <span>商家入驻</span>
              </el-menu-item>
              <el-menu-item index="coupons">
                <el-icon><Ticket /></el-icon>
                <span>优惠券管理</span>
              </el-menu-item>
              <el-menu-item index="favorites">
                <el-icon><Star /></el-icon>
                <span>收藏管理</span>
              </el-menu-item>
              <el-menu-item index="addresses">
                <el-icon><Location /></el-icon>
                <span>地址管理</span>
              </el-menu-item>
              <el-menu-item index="settings">
                <el-icon><Setting /></el-icon>
                <span>账户设置</span>
              </el-menu-item>
            </el-menu>
          </aside>

          <!-- 右侧内容 -->
          <div class="center-main">
            <!-- 个人信息 -->
            <UserProfile v-if="activeMenu === 'profile'" />

            <!-- 我的订单 -->
            <OrderManagement v-if="activeMenu === 'orders'" ref="orderManagementRef" />

            <!-- 商家入驻 -->
            <MerchantApplication v-if="activeMenu === 'merchant'" />

            <!-- 优惠券管理 -->
            <CouponManagement v-if="activeMenu === 'coupons'" />

            <!-- 收藏管理 -->
            <FavoriteManagement v-if="activeMenu === 'favorites'" />

            <!-- 收货地址 -->
            <AddressManagement v-if="activeMenu === 'addresses'" />

            <!-- 账户设置 -->
            <AccountSettings v-if="activeMenu === 'settings'" />
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-bottom">
          <p>&copy; 2024 云商城. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
import { useRouter } from 'vue-router'
import {User, Camera, List, Shop, Ticket, Setting, Star, Location} from '@element-plus/icons-vue'
import NavBar from '../../components/NavBar.vue'
import UserProfile from '../../components/user/UserProfile.vue'
import OrderManagement from '../../components/user/OrderManagement.vue'
import MerchantApplication from '../../components/user/MerchantApplication.vue'
import FavoriteManagement from '../../components/user/FavoriteManagement.vue'
import AccountSettings from '../../components/user/AccountSettings.vue'
import CouponManagement from '../../components/user/CouponManagement.vue'
import {useUserStore} from "../../stores/userStore.js"
import orderStore from '../../stores/orderStore.js'
import AddressManagement from "../../components/user/AddressManagement.vue";
import user from "../../api/user.js";
import {getCurrentUser} from "../../api/modules/user.js";
import {getAddressList} from "../../api/modules/address.js";

const router = useRouter()
const userStore = useUserStore()
// 当前菜单 - 从 localStorage 读取或使用默认值
const activeMenu = ref(localStorage.getItem('userCenterActiveMenu') || 'profile')

// 订单管理组件引用
const orderManagementRef = ref(null)

const userInfo = ref({})
// 初始化统计数据
onMounted(() => {

  getCurrentUser().then(res => {
    console.log(res.data)
    userInfo.value = res.data
    userStore.userInfo.value = userInfo
  })

  console.log(userInfo)
  userStore.addresses.value = getAddressList()
  // userStore.statistics.pendingPayment = orderStore.state.statistics.pending
  // userStore.statistics.pendingShipment = orderStore.state.statistics.paid
  // userStore.statistics.pendingReceipt = orderStore.state.statistics.shipped
})

// 菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
  // 保存到 localStorage
  localStorage.setItem('userCenterActiveMenu', index)
}

// 搜索
const handleSearch = (query) => {
  router.push({ path: '/', query: { search: query } })
}

// 跳转到订单
const goToOrders = (status) => {
  activeMenu.value = 'orders'
  // 如果需要传递状态参数，可以在组件内部处理
}

// 跳转到优惠券
const goToCoupons = () => {
  activeMenu.value = 'coupons'
}

// 跳转到收藏
const goToFavorites = () => {
  activeMenu.value = 'favorites'
}
</script>

<style scoped lang="scss">
.user-center-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  padding-bottom: 40px;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  padding: 24px 0;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;

    .el-icon {
      color: #409eff;
      font-size: 28px;
    }
  }
}

.user-info-card {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  color: #fff;

  .user-avatar-section {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
  }

  .user-avatar {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.5);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .change-avatar-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: #fff;
      padding: 4px;
    }
  }

  .user-basic {
    .user-name {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .user-level {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;

      .level-text {
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }

  .user-stats {
    display: flex;
    gap: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-4px);
      }

      .stat-value {
        font-size: 24px;
        font-weight: 700;
      }

      .stat-label {
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }
}

.center-content {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.center-sidebar {
  .center-menu {
    border-radius: 12px;
    overflow: hidden;
    border: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .el-menu-item {
      height: 50px;
      line-height: 50px;

      &.is-active {
        background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
        color: #fff;
      }
    }
  }
}

.center-main {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  min-height: 600px;
}

.footer {
  background: #2c3e50;
  color: #fff;
  padding: 20px 0;
  margin-top: auto;

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-bottom {
    text-align: center;

    p {
      margin: 0;
      font-size: 12px;
      color: #78909c;
    }
  }
}
</style>
