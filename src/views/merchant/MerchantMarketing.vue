<template>
  <div class="merchant-marketing">
    <!-- 营销概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6f7ff;">
              <el-icon style="color: #409eff;"><Ticket /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.totalCoupons }}</div>
              <div class="stat-label">优惠券总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f6ffed;">
              <el-icon style="color: #67c23a;"><Coin /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ marketingStats.totalDiscount.toLocaleString() }}</div>
              <div class="stat-label">优惠总额</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff7e6;">
              <el-icon style="color: #e6a23c;"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.usedCoupons }}</div>
              <div class="stat-label">已使用</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff1f0;">
              <el-icon style="color: #f56c6c;"><Clock /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.expiredCoupons }}</div>
              <div class="stat-label">已过期</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="优惠券管理" name="coupons">
          <template #label>
            <el-icon><Ticket /></el-icon>
            <span>优惠券管理</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="秒杀活动" name="seckill">
          <template #label>
            <el-icon><Lightning /></el-icon>
            <span>秒杀活动</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="满减活动" name="promotion">
          <template #label>
            <el-icon><Discount /></el-icon>
            <span>满减活动</span>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 优惠券管理 -->
      <div v-if="activeTab === 'coupons'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openCouponDialog()">
            <el-icon><Plus /></el-icon>
            创建优惠券
          </el-button>
        </div>

        <el-table :data="couponList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="优惠券名称" min-width="150">
            <template #default="{ row }">
              <div class="coupon-name">{{ row.name }}</div>
              <div class="coupon-desc">{{ row.description }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="row.type === 'discount' ? 'success' : 'warning'" size="small">
                {{ row.type === 'discount' ? '折扣券' : '满减券' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="面值" width="100">
            <template #default="{ row }">
              <span class="coupon-value">
                {{ row.type === 'discount' ? row.value + '折' : '¥' + row.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="minAmount" label="使用门槛" width="100">
            <template #default="{ row }">
              {{ row.minAmount > 0 ? '满' + row.minAmount + '元' : '无门槛' }}
            </template>
          </el-table-column>
          <el-table-column prop="total" label="发放总量" width="80" />
          <el-table-column prop="used" label="已使用" width="80" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getCouponStatusType(row.status)" size="small">
                {{ getCouponStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="expireTime" label="有效期" width="180">
            <template #default="{ row }">
              {{ row.startTime }} - {{ row.expireTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="openCouponDialog(row)">编辑</el-button>
              <el-button
                :type="row.status === 'active' ? 'warning' : 'success'"
                link
                @click="toggleCouponStatus(row)"
              >
                {{ row.status === 'active' ? '禁用' : '启用' }}
              </el-button>
              <el-button type="danger" link @click="deleteCoupon(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 秒杀活动 -->
      <div v-if="activeTab === 'seckill'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openSeckillDialog()">
            <el-icon><Plus /></el-icon>
            创建秒杀活动
          </el-button>
        </div>

        <el-table :data="seckillList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="活动名称" min-width="180" />
          <el-table-column prop="productName" label="秒杀商品" min-width="150" />
          <el-table-column prop="seckillPrice" label="秒杀价" width="100">
            <template #default="{ row }">
              <span class="seckill-price">¥{{ row.seckillPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="originalPrice" label="原价" width="100">
            <template #default="{ row }">
              <span class="original-price">¥{{ row.originalPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="秒杀库存" width="100" />
          <el-table-column prop="sold" label="已抢" width="80" />
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getSeckillStatusType(row.status)" size="small">
                {{ getSeckillStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 满减活动 -->
      <div v-if="activeTab === 'promotion'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openPromotionDialog()">
            <el-icon><Plus /></el-icon>
            创建满减活动
          </el-button>
        </div>

        <el-table :data="promotionList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="活动名称" min-width="180" />
          <el-table-column prop="rules" label="满减规则" min-width="200">
            <template #default="{ row }">
              <div v-for="(rule, index) in row.rules" :key="index" class="rule-item">
                满{{ rule.amount }}减{{ rule.discount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scope" label="适用范围" width="100">
            <template #default="{ row }">
              <el-tag size="small">{{ row.scope === 'all' ? '全店' : '部分商品' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="expireTime" label="结束时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
                {{ row.status === 'active' ? '进行中' : '已结束' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 优惠券编辑弹窗 -->
    <el-dialog
      v-model="couponDialogVisible"
      :title="editingCoupon ? '编辑优惠券' : '创建优惠券'"
      width="600px"
    >
      <el-form :model="couponForm" label-width="100px">
        <el-form-item label="优惠券名称" required>
          <el-input v-model="couponForm.name" placeholder="请输入优惠券名称" />
        </el-form-item>
        <el-form-item label="优惠券描述">
          <el-input v-model="couponForm.description" placeholder="请输入优惠券描述" />
        </el-form-item>
        <el-form-item label="优惠券类型" required>
          <el-radio-group v-model="couponForm.type">
            <el-radio label="cash">满减券</el-radio>
            <el-radio label="discount">折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券面值" required>
          <el-input-number
            v-model="couponForm.value"
            :min="couponForm.type === 'discount' ? 1 : 1"
            :max="couponForm.type === 'discount' ? 9.9 : 1000"
            :precision="couponForm.type === 'discount' ? 1 : 0"
          />
          <span class="unit">{{ couponForm.type === 'discount' ? '折' : '元' }}</span>
        </el-form-item>
        <el-form-item label="使用门槛">
          <el-input-number v-model="couponForm.minAmount" :min="0" :precision="0" />
          <span class="unit">元（0表示无门槛）</span>
        </el-form-item>
        <el-form-item label="发放总量" required>
          <el-input-number v-model="couponForm.total" :min="1" />
          <span class="unit">张</span>
        </el-form-item>
        <el-form-item label="每人限领" required>
          <el-input-number v-model="couponForm.limitPerUser" :min="1" />
          <span class="unit">张</span>
        </el-form-item>
        <el-form-item label="有效期" required>
          <el-date-picker
            v-model="couponForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="couponDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCoupon">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Ticket, Coin, User, Clock, Lightning, Discount, Plus
} from '@element-plus/icons-vue'

// Tab
const activeTab = ref('coupons')
const loading = ref(false)

// 营销统计
const marketingStats = ref({
  totalCoupons: 8,
  totalDiscount: 15680,
  usedCoupons: 456,
  expiredCoupons: 12
})

// 优惠券列表
const couponList = ref([
  {
    id: 1,
    name: '新人专享券',
    description: '仅限新人首单使用',
    type: 'cash',
    value: 50,
    minAmount: 299,
    total: 1000,
    used: 456,
    status: 'active',
    startTime: '2024-01-01',
    expireTime: '2024-12-31'
  },
  {
    id: 2,
    name: '数码满减券',
    description: '数码电子产品专用',
    type: 'cash',
    value: 100,
    minAmount: 999,
    total: 500,
    used: 234,
    status: 'active',
    startTime: '2024-01-01',
    expireTime: '2024-06-30'
  },
  {
    id: 3,
    name: '新春8折券',
    description: '春节期间全店通用',
    type: 'discount',
    value: 8,
    minAmount: 199,
    total: 200,
    used: 89,
    status: 'expired',
    startTime: '2024-01-01',
    expireTime: '2024-02-15'
  }
])

// 秒杀列表
const seckillList = ref([
  {
    id: 1,
    name: '春节特惠秒杀',
    productName: 'Apple AirPods Pro 2',
    seckillPrice: 1499,
    originalPrice: 1899,
    stock: 100,
    sold: 78,
    startTime: '2024-02-10 10:00:00',
    status: 'active'
  },
  {
    id: 2,
    name: '元宵节秒杀',
    productName: 'Dyson V15吸尘器',
    seckillPrice: 3999,
    originalPrice: 4990,
    stock: 20,
    sold: 15,
    startTime: '2024-02-24 14:00:00',
    status: 'pending'
  }
])

// 满减活动列表
const promotionList = ref([
  {
    id: 1,
    name: '春季大促',
    rules: [
      { amount: 199, discount: 20 },
      { amount: 399, discount: 50 },
      { amount: 699, discount: 100 }
    ],
    scope: 'all',
    startTime: '2024-03-01 00:00:00',
    expireTime: '2024-03-31 23:59:59',
    status: 'active'
  },
  {
    id: 2,
    name: '数码专场',
    rules: [
      { amount: 999, discount: 100 },
      { amount: 1999, discount: 250 }
    ],
    scope: 'category',
    startTime: '2024-01-15 00:00:00',
    expireTime: '2024-02-15 23:59:59',
    status: 'expired'
  }
])

// 优惠券弹窗
const couponDialogVisible = ref(false)
const editingCoupon = ref(null)
const couponForm = reactive({
  name: '',
  description: '',
  type: 'cash',
  value: 50,
  minAmount: 0,
  total: 100,
  limitPerUser: 1,
  dateRange: []
})

// 获取优惠券状态类型
const getCouponStatusType = (status) => {
  const typeMap = {
    active: 'success',
    inactive: 'warning',
    expired: 'info'
  }
  return typeMap[status] || 'info'
}

// 获取优惠券状态文本
const getCouponStatusText = (status) => {
  const textMap = {
    active: '进行中',
    inactive: '未启用',
    expired: '已过期'
  }
  return textMap[status] || '未知'
}

// 获取秒杀状态类型
const getSeckillStatusType = (status) => {
  const typeMap = {
    active: 'success',
    pending: 'warning',
    ended: 'info'
  }
  return typeMap[status] || 'info'
}

// 获取秒杀状态文本
const getSeckillStatusText = (status) => {
  const textMap = {
    active: '进行中',
    pending: '即将开始',
    ended: '已结束'
  }
  return textMap[status] || '未知'
}

// 打开优惠券弹窗
const openCouponDialog = (coupon = null) => {
  editingCoupon.value = coupon
  if (coupon) {
    Object.assign(couponForm, {
      name: coupon.name,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      total: coupon.total,
      limitPerUser: 1,
      dateRange: [coupon.startTime, coupon.expireTime]
    })
  } else {
    Object.assign(couponForm, {
      name: '',
      description: '',
      type: 'cash',
      value: 50,
      minAmount: 0,
      total: 100,
      limitPerUser: 1,
      dateRange: []
    })
  }
  couponDialogVisible.value = true
}

// 保存优惠券
const saveCoupon = () => {
  if (!couponForm.name) {
    ElMessage.warning('请输入优惠券名称')
    return
  }
  if (!couponForm.dateRange || couponForm.dateRange.length < 2) {
    ElMessage.warning('请选择有效期')
    return
  }

  ElMessage.success(editingCoupon.value ? '优惠券更新成功' : '优惠券创建成功')
  couponDialogVisible.value = false
}

// 切换优惠券状态
const toggleCouponStatus = (coupon) => {
  coupon.status = coupon.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(coupon.status === 'active' ? '优惠券已启用' : '优惠券已禁用')
}

// 删除优惠券
const deleteCoupon = async (coupon) => {
  try {
    await ElMessageBox.confirm('确定要删除该优惠券吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = couponList.value.findIndex(c => c.id === coupon.id)
    if (index > -1) {
      couponList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    // 取消
  }
}

// 打开秒杀弹窗
const openSeckillDialog = () => {
  ElMessage.info('秒杀活动创建功能开发中')
}

// 打开满减弹窗
const openPromotionDialog = () => {
  ElMessage.info('满减活动创建功能开发中')
}
</script>

<style scoped lang="scss">
.merchant-marketing {
  .stats-row {
    margin-bottom: 20px;

    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-info {
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #303133;
          }

          .stat-label {
            font-size: 14px;
            color: #909399;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .tabs-card {
    :deep(.el-tabs__item) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .tab-content {
    .content-header {
      margin-bottom: 16px;
    }

    .coupon-name {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
    }

    .coupon-desc {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
    }

    .coupon-value {
      font-size: 16px;
      font-weight: 600;
      color: #f56c6c;
    }

    .seckill-price {
      font-size: 16px;
      font-weight: 600;
      color: #f56c6c;
    }

    .original-price {
      font-size: 14px;
      color: #909399;
      text-decoration: line-through;
    }

    .rule-item {
      padding: 4px 0;
      font-size: 14px;
      color: #606266;
    }
  }
}

.unit {
  margin-left: 8px;
  color: #909399;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
