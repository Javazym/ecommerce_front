<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo区域 -->
      <div class="navbar-logo" @click="goToHome">
        <el-icon class="logo-icon"><Shop /></el-icon>
        <span class="logo-text">星悦云商城</span>
      </div>

      <!-- 搜索区域 -->
      <div class="navbar-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索商品、品牌"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
          <template #append>
            <el-button :icon="Search" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>

      <!-- 右侧操作区域 -->
      <div class="navbar-actions">
        <el-button type="primary" plain size="small" @click="goToMerchant">
          <el-icon><OfficeBuilding /></el-icon>
          商家入驻
        </el-button>
        <el-badge :value="cartCount" class="cart-badge">
          <el-button :icon="ShoppingCart" circle class="action-btn" @click="goToCart" />
        </el-badge>
        <el-badge :value="3" class="message-badge">
          <el-button :icon="Bell" circle class="action-btn" />
        </el-badge>
        <el-button :icon="User" circle class="action-btn" @click="goToUserCenter" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCart, Bell, User, Shop, OfficeBuilding } from '@element-plus/icons-vue'

const router = useRouter()
const searchQuery = ref('')
const cartCount = ref(3)

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const goToHome = () => {
  router.push('/')
}

const goToCart = () => {
  router.push('/cart')
}

const goToUserCenter = () => {
  router.push('/user')
}

const goToMerchant = () => {
  router.push('/merchant')
}
</script>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.1);
  padding: 16px 0;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;

  .logo-icon {
    font-size: 32px;
    color: #409eff;
  }

  .logo-text {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.navbar-search {
  flex: 1;
  max-width: 600px;

  .search-input {
    :deep(.el-input__wrapper) {
      border-radius: 24px;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
      border: 1px solid #e4e7ed;

      &:hover, &.is-focus {
        border-color: #409eff;
        box-shadow: 0 2px 12px rgba(64, 158, 255, 0.25);
      }
    }

    :deep(.el-input-group__append) {
      border-radius: 24px;
      background: #409eff;
      border: none;
      color: #fff;

      .el-button {
        color: #fff;
      }
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  .cart-badge, .message-badge {
    :deep(.el-badge__content) {
      background: #f56c6c;
    }
  }

  .action-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #f5f7fa;
    color: #606266;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: #409eff;
      color: #fff;
      transform: scale(1.1);
    }
  }
}

@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    gap: 12px;
  }

  .navbar-search {
    order: 3;
    max-width: 100%;
    width: 100%;
  }

  .navbar-logo {
    .logo-text {
      display: none;
    }
  }
}
</style>
