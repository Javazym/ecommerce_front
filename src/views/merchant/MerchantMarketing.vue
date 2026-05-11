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
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
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
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
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
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
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
import {ref, reactive, onMounted, onBeforeMount} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Ticket, Coin, User, Clock, Lightning, Discount, Plus
} from '@element-plus/icons-vue'
import { getMerchantCouponList, createCoupon, updateCoupon, deleteCoupon as apiDeleteCoupon } from "../../api/modules/coupon.js"
import { getCouponStatistics } from "../../api/modules/coupon.js"
import { getSeckillList, createSeckill, updateSeckill, deleteSeckill } from "../../api/modules/coupon.js"
import { getDiscountList, createDiscount, updateDiscount, deleteDiscount } from "../../api/modules/coupon.js"
import {getMerchantInfo, state as merchantState} from "../../stores/merchantStore.js"


// Tab
const activeTab = ref('coupons')
const loading = ref(false)
// 商家信息
const merchantInfo = merchantState.merchantInfo

// 分页参数
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 营销统计
const marketingStats = ref({
  totalCoupons: 0,
  totalDiscount: 0,
  usedCoupons: 0,
  expiredCoupons: 0
})

// 优惠券列表
const couponList = ref([])

// 秒杀列表
const seckillList = ref([])

// 满减活动列表
const promotionList = ref([])

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

// 获取优惠券列表
const fetchCouponList = async () => {
  loading.value = true
  try {
    // 获取当前商家ID，如果没有则默认为0（平台券）
    console.log('获取优惠券列表', merchantInfo)
    const merchantId = merchantInfo.id || 0

    const res = await getMerchantCouponList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      couponList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: '', // 后端没有description字段，留空
        type: item.type === 0 ? 'cash' : 'discount', // 0-满减，1-折扣
        value: item.value,
        minAmount: item.minAmount,
        maxDiscount: item.maxDiscount,
        total: item.totalCount,
        used: item.usedCount,
        received: item.receiveCount,
        limitPerUser: item.limitPerUser,
        status: item.status === 1 ? 'active' : 'inactive', // 1-启用，0-禁用
        startTime: item.startTime,
        expireTime: item.endTime,
        validDays: item.validDays
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0

      // 更新统计数据
      updateMarketingStats()
    }
  } catch (error) {
    console.error('获取优惠券列表失败:', error)
    ElMessage.error('获取优惠券列表失败')
  } finally {
    loading.value = false
  }
}

// 更新营销统计数据
const updateMarketingStats = () => {
  marketingStats.value.totalCoupons = pagination.total
  marketingStats.value.usedCoupons = couponList.value.reduce((sum, item) => sum + (item.used || 0), 0)
  // 其他统计数据可以根据实际需求计算
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
      description: coupon.description || '',
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
const saveCoupon = async () => {
  if (!couponForm.name) {
    ElMessage.warning('请输入优惠券名称')
    return
  }
  if (!couponForm.dateRange || couponForm.dateRange.length < 2) {
    ElMessage.warning('请选择有效期')
    return
  }

  try {
    const merchantId = merchantInfo.id || 0

    // 构建请求数据
    const couponData = {
      name: couponForm.name,
      type: couponForm.type === 'cash' ? 0 : 1, // 0-满减，1-折扣
      value: couponForm.value,
      minAmount: couponForm.minAmount,
      maxDiscount: 1000,
      totalStock: couponForm.total,
      limitPerUser: couponForm.limitPerUser,
      startTime: couponForm.dateRange[0],
      endTime: couponForm.dateRange[1]
    }

    if (editingCoupon.value) {
      // 更新优惠券
      await updateCoupon(editingCoupon.value.id, {
        ...couponData,
        merchantId: merchantInfo.id,
        status: editingCoupon.value.status === 'active' ? 1 : 0
      })
      ElMessage.success('优惠券更新成功')
    } else {
      // 创建优惠券
      await createCoupon({
        ...couponData,
        merchantId: merchantInfo.id
      })
      ElMessage.success('优惠券创建成功')
    }

    couponDialogVisible.value = false
    // 重新加载列表
    await fetchCouponList()
  } catch (error) {
    console.error('保存优惠券失败:', error)
    ElMessage.error('保存优惠券失败')
  }
}

// 切换优惠券状态
const toggleCouponStatus = async (coupon) => {
  try {
    const newStatus = coupon.status === 'active' ? 0 : 1  // active→0禁用, inactive→1启用
    
    await updateCoupon(coupon.id, {
      merchantId: merchantInfo.id,
      status: newStatus
    })
    
    ElMessage.success(newStatus === 1 ? '优惠券已启用' : '优惠券已禁用')
    // 重新加载列表
    await fetchCouponList()
  } catch (error) {
    console.error('切换优惠券状态失败:', error)
    ElMessage.error('操作失败')
  }
}

// 删除优惠券
const deleteCoupon = async (coupon) => {
  try {
    await ElMessageBox.confirm('确定要删除该优惠券吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    // 调用删除优惠券的 API
    await apiDeleteCoupon(coupon.id, merchantId)
    ElMessage.success('删除成功')
    // 重新加载列表以更新统计
    await fetchCouponList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除优惠券失败:', error)
      ElMessage.error('删除失败')
    }
    // 取消操作
  }
}

// 获取秒杀活动列表
const fetchSeckillList = async () => {
  loading.value = true
  try {
    const merchantId = merchantInfo.id || 0

    const res = await getSeckillList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      seckillList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        productName: item.product?.name || '未知商品',
        seckillPrice: item.seckillPrice,
        originalPrice: item.originalPrice,
        stock: item.stock,
        sold: item.soldCount || 0,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : item.status === 2 ? 'ended' : 'cancelled',
        limitPerUser: item.limitPerUser
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('获取秒杀活动列表失败:', error)
    ElMessage.error('获取秒杀活动列表失败')
  } finally {
    loading.value = false
  }
}

// 获取满减活动列表
const fetchDiscountList = async () => {
  loading.value = true
  try {
    const merchantId = merchantInfo.id || 0

    const res = await getDiscountList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      promotionList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        rules: [
          { amount: item.conditionValue, discount: item.discountAmount }
        ],
        scope: item.scopeType === 'all' ? 'all' : 'category',
        startTime: item.startTime,
        expireTime: item.endTime,
        status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : item.status === 2 ? 'expired' : 'cancelled',
        maxDiscount: item.maxDiscount,
        limitPerUser: item.limitPerUser
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('获取满减活动列表失败:', error)
    ElMessage.error('获取满减活动列表失败')
  } finally {
    loading.value = false
  }
}

// 获取优惠券统计信息
const fetchCouponStatistics = async () => {
  try {
    const res = await getCouponStatistics({
      merchantId: merchantInfo.id
    })
    
    if (res.code === 1000 && res.data) {
      marketingStats.value = {
        totalCoupons: res.data.totalCoupons || 0,
        totalDiscount: 0,  // 需要后端提供或前端计算
        usedCoupons: res.data.totalUsed || 0,
        expiredCoupons: 0  // 需要后端提供或前端计算
      }
    }
  } catch (error) {
    console.error('获取优惠券统计失败:', error)
  }
}

// 页面加载时获取数据
onMounted(async () => {
  await getMerchantInfo()
  await Promise.all([
    fetchCouponList(),
    fetchSeckillList(),
    fetchDiscountList(),
    fetchCouponStatistics()
  ])
})

// 打开秒杀弹窗
const openSeckillDialog = (seckill = null) => {
  if (seckill) {
    ElMessage.info('编辑秒杀活动功能开发中')
  } else {
    ElMessage.info('创建秒杀活动功能开发中')
  }
}

// 删除秒杀活动
const deleteSeckillActivity = async (seckill) => {
  try {
    await ElMessageBox.confirm('确定要删除该秒杀活动吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    await deleteSeckill(seckill.id, merchantId)
    ElMessage.success('删除成功')
    await fetchSeckillList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除秒杀活动失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 打开满减弹窗
const openPromotionDialog = (promotion = null) => {
  if (promotion) {
    ElMessage.info('编辑满减活动功能开发中')
  } else {
    ElMessage.info('创建满减活动功能开发中')
  }
}

// 删除满减活动
const deletePromotionActivity = async (promotion) => {
  try {
    await ElMessageBox.confirm('确定要删除该满减活动吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    await deleteDiscount(promotion.id, merchantId)
    ElMessage.success('删除成功')
    await fetchDiscountList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除满减活动失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 分页大小变化处理
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  // 根据当前tab重新加载对应的数据
  if (activeTab.value === 'coupons') {
    fetchCouponList()
  } else if (activeTab.value === 'seckill') {
    fetchSeckillList()
  } else if (activeTab.value === 'promotion') {
    fetchDiscountList()
  }
}

// 当前页变化处理
const handleCurrentChange = (val) => {
  pagination.pageNum = val
  // 根据当前tab重新加载对应的数据
  if (activeTab.value === 'coupons') {
    fetchCouponList()
  } else if (activeTab.value === 'seckill') {
    fetchSeckillList()
  } else if (activeTab.value === 'promotion') {
    fetchDiscountList()
  }
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

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
