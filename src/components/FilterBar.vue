<template>
  <section class="filter-bar">
    <div class="filter-header">
      <div class="header-left">
        <el-icon class="filter-icon"><Filter /></el-icon>
        <span class="header-title">筛选条件</span>
      </div>
      <el-button 
        v-if="hasActiveFilters" 
        type="primary" 
        link 
        @click="handleReset"
        class="reset-btn"
      >
        <el-icon><Refresh /></el-icon>
        重置筛选
      </el-button>
    </div>
    
    <div class="filter-container">
      <!-- 第一行:活动类型 + 排序 -->
      <div class="filter-row">
        <div class="filter-section activity-section">
          <div class="section-label">
            <el-icon><Promotion /></el-icon>
            <span>活动类型</span>
          </div>
          <div class="section-content">
            <el-radio-group v-model="activityType" @change="handleActivityChange" class="activity-group">
              <el-radio-button :value="0">
                <el-icon><Grid /></el-icon>
                全部
              </el-radio-button>
              <el-radio-button :value="1">
                <el-icon><Lightning /></el-icon>
                秒杀
              </el-radio-button>
              <el-radio-button :value="2">
                <el-icon><Ticket /></el-icon>
                满减
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="filter-section sort-section">
          <div class="section-label">
            <el-icon><Sort /></el-icon>
            <span>排序</span>
          </div>
          <div class="section-content">
            <el-select v-model="sortBy" placeholder="选择排序" @change="handleSortChange" class="sort-select">
              <el-option label="综合推荐" value="default">
                <span class="option-with-icon">
                  <el-icon><Star /></el-icon>
                  综合推荐
                </span>
              </el-option>
              <el-option label="销量优先" value="sales">
                <span class="option-with-icon">
                  <el-icon><TrendCharts /></el-icon>
                  销量优先
                </span>
              </el-option>
              <el-option label="价格从低到高" value="price-asc">
                <span class="option-with-icon">
                  <el-icon><ArrowDown /></el-icon>
                  价格从低到高
                </span>
              </el-option>
              <el-option label="价格从高到低" value="price-desc">
                <span class="option-with-icon">
                  <el-icon><ArrowUp /></el-icon>
                  价格从高到低
                </span>
              </el-option>
              <el-option label="评分最高" value="rating">
                <span class="option-with-icon">
                  <el-icon><Medal /></el-icon>
                  评分最高
                </span>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <!-- 第二行:分类筛选 -->
      <div class="filter-section category-section">
        <div class="section-label">
          <el-icon><Menu /></el-icon>
          <span>商品分类</span>
        </div>
        <div class="section-content">
          <el-checkbox-group v-model="selectedCategories" @change="handleCategoryChange" class="category-group">
            <el-checkbox-button v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>

      <!-- 第三行:价格区间 -->
      <div class="filter-section price-section">
        <div class="section-label">
          <el-icon><Coin /></el-icon>
          <span>价格区间</span>
        </div>
        <div class="section-content">
          <el-radio-group v-model="priceRange" @change="handlePriceChange" class="price-group">
            <el-radio-button value="">全部</el-radio-button>
            <el-radio-button value="0-500">¥0-500</el-radio-button>
            <el-radio-button value="500-2000">¥500-2000</el-radio-button>
            <el-radio-button value="2000-5000">¥2000-5000</el-radio-button>
            <el-radio-button value="5000+">¥5000+</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Refresh, 
  Filter,
  Promotion,
  Lightning,
  Ticket,
  Menu,
  Coin,
  Sort,
  Star,
  TrendCharts,
  ArrowDown,
  ArrowUp,
  Medal,
  Grid
} from '@element-plus/icons-vue'
import { categories } from '../data/products.js'

const emit = defineEmits(['filter-change'])

const selectedCategories = ref([])
const priceRange = ref('')
const sortBy = ref('default')
const activityType = ref(0)

// 计算是否有激活的筛选条件
const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || 
         priceRange.value !== '' || 
         sortBy.value !== 'default' ||
         activityType.value !== 0
})

const handleCategoryChange = () => {
  emitFilterChange()
}

const handlePriceChange = () => {
  emitFilterChange()
}

const handleSortChange = () => {
  emitFilterChange()
}

const handleActivityChange = () => {
  emitFilterChange()
}

const emitFilterChange = () => {
  emit('filter-change', {
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value,
    activityType: activityType.value
  })
}

const handleReset = () => {
  selectedCategories.value = []
  priceRange.value = ''
  sortBy.value = 'default'
  activityType.value = 0
  emitFilterChange()
}
</script>

<style scoped lang="scss">
.filter-bar {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #eef2f7;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;

    .filter-icon {
      font-size: 22px;
      color: #409eff;
      animation: pulse 2s ease-in-out infinite;
    }

    .header-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      letter-spacing: 0.5px;
    }
  }

  .reset-btn {
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(-2px);
    }

    .el-icon {
      margin-right: 4px;
    }
  }
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: stretch;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f0f2f5;
  transition: all 0.3s ease;
  min-height: 56px;

  &:hover {
    border-color: #d9e2ec;
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.08);
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 70px;
    font-size: 13px;
    color: #606266;
    font-weight: 600;
    white-space: nowrap;

    .el-icon {
      font-size: 15px;
      color: #409eff;
    }
  }

  .section-content {
    flex: 1;
  }

  // 活动类型特殊样式
  &.activity-section {
    background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
    border-color: #ffe0e0;

    .section-label .el-icon {
      color: #ff4d4f;
    }

    :deep(.activity-group) {
      .el-radio-button {
        .el-radio-button__inner {
          border-radius: 20px;
          padding: 8px 16px;
          border: 2px solid #ffd9d9;
          background: #fff;
          color: #606266;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 4px;

          .el-icon {
            font-size: 14px;
          }

          &:hover {
            border-color: #ff4d4f;
            color: #ff4d4f;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(255, 77, 79, 0.2);
          }
        }

        &.is-active .el-radio-button__inner {
          background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
          border-color: #ff4d4f;
          color: #fff;
          box-shadow: 0 2px 12px rgba(255, 77, 79, 0.35);
          transform: translateY(-1px);
        }
      }
    }
  }

  // 分类样式
  &.category-section {
    :deep(.category-group) {
      .el-checkbox-button {
        .el-checkbox-button__inner {
          border-radius: 18px;
          padding: 6px 14px;
          border: 2px solid #e8eaed;
          background: #fff;
          color: #606266;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            border-color: #409eff;
            color: #409eff;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
          }
        }

        &.is-checked .el-checkbox-button__inner {
          background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
          border-color: #409eff;
          color: #fff;
          box-shadow: 0 2px 12px rgba(64, 158, 255, 0.35);
          transform: translateY(-1px);
        }
      }
    }
  }

  // 价格样式
  &.price-section {
    :deep(.price-group) {
      .el-radio-button {
        .el-radio-button__inner {
          border-radius: 18px;
          padding: 6px 14px;
          border: 2px solid #e8eaed;
          background: #fff;
          color: #606266;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            border-color: #67c23a;
            color: #67c23a;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(103, 194, 58, 0.2);
          }
        }

        &.is-active .el-radio-button__inner {
          background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
          border-color: #67c23a;
          color: #fff;
          box-shadow: 0 2px 12px rgba(103, 194, 58, 0.35);
          transform: translateY(-1px);
        }
      }
    }
  }

  // 排序样式
  &.sort-section {
    :deep(.sort-select) {
      width: 150px;

      .el-input__wrapper {
        border-radius: 20px;
        padding: 6px 12px;
        box-shadow: 0 0 0 2px #e8eaed inset;
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 0 0 2px #409eff inset;
        }

        &.is-focus {
          box-shadow: 0 0 0 2px #409eff inset;
        }
      }
    }
  }
}

.option-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .el-icon {
    color: #409eff;
    font-size: 16px;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    padding: 16px;
  }

  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .reset-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 8px;

    .section-label {
      min-width: auto;
      margin-bottom: 4px;
    }

    .section-content {
      width: 100%;
      overflow-x: auto;
    }

    :deep(.el-checkbox-button),
    :deep(.el-radio-button) {
      .el-checkbox-button__inner,
      .el-radio-button__inner {
        padding: 5px 12px;
        font-size: 12px;
      }
    }

    // 排序选择器移动端适配
    &.sort-section {
      :deep(.sort-select) {
        width: 100%;
      }
    }
  }
}
</style>
