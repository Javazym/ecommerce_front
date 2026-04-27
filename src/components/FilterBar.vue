<template>
  <section class="filter-bar">
    <div class="filter-container">
      <!-- 分类筛选 -->
      <div class="filter-section">
        <span class="filter-label">分类：</span>
        <el-checkbox-group v-model="selectedCategories" @change="handleCategoryChange">
          <el-checkbox-button v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>

      <!-- 价格区间 -->
      <div class="filter-section">
        <span class="filter-label">价格：</span>
        <el-radio-group v-model="priceRange" @change="handlePriceChange">
          <el-radio-button value="">全部</el-radio-button>
          <el-radio-button value="0-500">0-500</el-radio-button>
          <el-radio-button value="500-2000">500-2000</el-radio-button>
          <el-radio-button value="2000-5000">2000-5000</el-radio-button>
          <el-radio-button value="5000+">5000+</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 排序 -->
      <div class="filter-section">
        <span class="filter-label">排序：</span>
        <el-select v-model="sortBy" placeholder="请选择" @change="handleSortChange">
          <el-option label="综合推荐" value="default" />
          <el-option label="销量优先" value="sales" />
          <el-option label="价格从低到高" value="price-asc" />
          <el-option label="价格从高到低" value="price-desc" />
          <el-option label="评分最高" value="rating" />
        </el-select>
      </div>

      <!-- 重置按钮 -->
      <div class="filter-actions">
        <el-button @click="handleReset" :icon="Refresh">重置</el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { categories } from '../data/products.js'

const emit = defineEmits(['filter-change'])

const selectedCategories = ref([])
const priceRange = ref('')
const sortBy = ref('default')

const handleCategoryChange = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value
  })
}

const handlePriceChange = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value
  })
}

const handleSortChange = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value
  })
}

const handleReset = () => {
  selectedCategories.value = []
  priceRange.value = ''
  sortBy.value = 'default'
  emit('filter-change', {
    categories: [],
    priceRange: '',
    sortBy: 'default'
  })
}
</script>

<style scoped lang="scss">
.filter-bar {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;

  .filter-label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
    white-space: nowrap;
  }

  :deep(.el-checkbox-button) {
    .el-checkbox-button__inner {
      border-radius: 20px;
      padding: 8px 16px;
      border-color: #dcdfe6;
      transition: all 0.3s ease;

      &:hover {
        color: #409eff;
        border-color: #409eff;
      }
    }

    &.is-checked .el-checkbox-button__inner {
      background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
      border-color: #409eff;
      color: #fff;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4);
    }
  }

  :deep(.el-radio-button) {
    .el-radio-button__inner {
      border-radius: 20px;
      padding: 8px 16px;
      border-color: #dcdfe6;
      transition: all 0.3s ease;

      &:hover {
        color: #409eff;
        border-color: #409eff;
      }
    }

    &.is-active .el-radio-button__inner {
      background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
      border-color: #409eff;
      color: #fff;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4);
    }
  }

  :deep(.el-select) {
    width: 140px;

    .el-input__wrapper {
      border-radius: 20px;
      box-shadow: 0 0 0 1px #dcdfe6 inset;

      &:hover, &.is-focus {
        box-shadow: 0 0 0 1px #409eff inset;
      }
    }
  }
}

.filter-actions {
  margin-left: auto;

  .el-button {
    border-radius: 20px;
    padding: 8px 20px;
    transition: all 0.3s ease;

    &:hover {
      background: #ecf5ff;
      color: #409eff;
      border-color: #409eff;
    }
  }
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section {
    width: 100%;
    flex-wrap: wrap;

    :deep(.el-checkbox-button),
    :deep(.el-radio-button) {
      .el-checkbox-button__inner,
      .el-radio-button__inner {
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  }

  .filter-actions {
    margin-left: 0;
    width: 100%;

    .el-button {
      width: 100%;
    }
  }
}
</style>
