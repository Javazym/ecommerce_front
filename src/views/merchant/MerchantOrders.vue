<template>
  <div class="merchant-orders">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="全部订单" name="all">
          <template #label>
            <span>全部订单</span>
            <el-badge :value="orderStats.all" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="pending">
          <template #label>
            <span>待付款</span>
            <el-badge :value="orderStats.pending" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="paid">
          <template #label>
            <span>待发货</span>
            <el-badge :value="orderStats.paid" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="shipped">
          <template #label>
            <span>已发货</span>
            <el-badge :value="orderStats.shipped" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="completed">
          <template #label>
            <span>已完成</span>
            <el-badge :value="orderStats.completed" :max="99" />
          </template>
        </el-tab-pane>
        <el-tab-pane label="退款/售后" name="refund">
          <template #label>
            <span>退款/售后</span>
            <el-badge :value="orderStats.refund" :max="99" type="danger" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 搜索栏 -->
    <el-card class="search-card" shadow="hover">
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索订单号/商品名称/买家昵称"
          clearable
          style="width: 300px"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
      </div>
    </el-card>

    <!-- 订单列表 -->
    <el-card class="table-card" shadow="hover">
      <el-table :data="orderList" v-loading="loading" style="width: 100%">
        <el-table-column prop="orderNo" label="订单信息" width="200">
          <template #default="{ row }">
            <div class="order-info">
              <div class="order-no">订单号：{{ row.orderNo }}</div>
              <div class="order-time">{{ row.createTime }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="buyer" label="买家" width="120">
          <template #default="{ row }">
            <div class="buyer-info">
              <img :src="row.buyerAvatar" alt="" class="buyer-avatar" />
              <span class="buyer-name">{{ row.buyerName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" min-width="250">
          <template #default="{ row }">
            <div class="product-list">
              <div v-for="item in row.items" :key="item.id" class="product-item">
                <img :src="item.image" alt="" class="product-image" />
                <div class="product-info">
                  <div class="product-name">{{ item.name }}</div>
                  <div class="product-spec">{{ item.spec }}</div>
                </div>
                <div class="product-price">
                  <div>¥{{ item.price }}</div>
                  <div class="quantity">x{{ item.quantity }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="订单金额" width="100">
          <template #default="{ row }">
            <div class="order-total">
              <div class="total-amount">¥{{ row.total }}</div>
              <div class="pay-method">{{ row.payMethod }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewOrderDetail(row)">详情</el-button>
            <el-button
              v-if="row.status === 'paid'"
              type="primary"
              link
              @click="openShipDialog(row)"
            >
              发货
            </el-button>
            <el-button
              v-if="row.status === 'shipped'"
              type="success"
              link
              @click="viewLogistics(row)"
            >
              物流
            </el-button>
            <el-button
              v-if="row.status === 'pending'"
              type="danger"
              link
              @click="cancelOrder(row)"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 发货弹窗 -->
    <el-dialog v-model="shipDialogVisible" title="订单发货" width="500px">
      <el-form :model="shipForm" label-width="80px">
        <el-form-item label="物流公司">
          <el-select v-model="shipForm.company" placeholder="请选择物流公司" style="width: 100%">
            <el-option label="顺丰速运" value="sf" />
            <el-option label="圆通速递" value="yto" />
            <el-option label="中通快递" value="zto" />
            <el-option label="韵达快递" value="yd" />
            <el-option label="申通快递" value="sto" />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="shipForm.trackingNo" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="发货备注">
          <el-input v-model="shipForm.remark" type="textarea" :rows="3" placeholder="选填" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="shipDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmShip" :loading="shipping">确认发货</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 订单详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="订单详情" width="800px">
      <div v-if="currentOrder" class="order-detail">
        <!-- 订单状态 -->
        <div class="detail-section">
          <div class="section-title">订单状态</div>
          <el-steps :active="getStepIndex(currentOrder.status)" finish-status="success" align-center>
            <el-step title="提交订单" />
            <el-step title="支付成功" />
            <el-step title="商家发货" />
            <el-step title="确认收货" />
            <el-step title="完成" />
          </el-steps>
        </div>

        <!-- 收货信息 -->
        <div class="detail-section">
          <div class="section-title">收货信息</div>
          <div class="info-row">
            <span class="label">收货人：</span>
            <span>{{ currentOrder.receiver }}</span>
          </div>
          <div class="info-row">
            <span class="label">联系电话：</span>
            <span>{{ currentOrder.phone }}</span>
          </div>
          <div class="info-row">
            <span class="label">收货地址：</span>
            <span>{{ currentOrder.province }}{{ currentOrder.city }}{{ currentOrder.district }}{{ currentOrder.address }}</span>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="detail-section">
          <div class="section-title">商品信息</div>
          <el-table :data="currentOrder.items" border>
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="spec" label="规格" width="120" />
            <el-table-column prop="price" label="单价" width="100">
              <template #default="{ row }">¥{{ row.price }}</template>
            </el-table-column>
            <el-table-column prop="quantity" label="数量" width="80" />
            <el-table-column label="小计" width="100">
              <template #default="{ row }">¥{{ row.price * row.quantity }}</template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 费用明细 -->
        <div class="detail-section">
          <div class="section-title">费用明细</div>
          <div class="info-row">
            <span class="label">商品总价：</span>
            <span>¥{{ currentOrder.subtotal }}</span>
          </div>
          <div class="info-row">
            <span class="label">运费：</span>
            <span>¥{{ currentOrder.shipping }}</span>
          </div>
          <div class="info-row">
            <span class="label">优惠：</span>
            <span class="discount">-¥{{ currentOrder.discount }}</span>
          </div>
          <div class="info-row total">
            <span class="label">应付金额：</span>
            <span class="total-amount">¥{{ currentOrder.total }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const route = useRoute()

// Tab
const activeTab = ref('all')

// 搜索
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 订单统计
const orderStats = ref({
  all: 28,
  pending: 5,
  paid: 12,
  shipped: 8,
  completed: 3,
  refund: 2
})

// 订单列表数据
const orderList = ref([
  {
    id: 1,
    orderNo: 'YS202401150001',
    createTime: '2024-01-15 14:30:25',
    buyerName: '用户1234',
    buyerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80',
    total: 2698,
    payMethod: '在线支付',
    status: 'paid',
    receiver: '张三',
    phone: '138****8888',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    address: '科技园南路88号',
    subtotal: 2688,
    shipping: 10,
    discount: 0,
    items: [
      {
        id: 1,
        name: 'Apple AirPods Pro 2',
        spec: '主动降噪',
        price: 1899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100'
      },
      {
        id: 2,
        name: 'Nike Air Max 270',
        spec: '黑色 42码',
        price: 799,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'
      }
    ]
  },
  {
    id: 2,
    orderNo: 'YS202401150002',
    createTime: '2024-01-15 10:15:30',
    buyerName: '买家5678',
    buyerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80',
    total: 4990,
    payMethod: '在线支付',
    status: 'shipped',
    receiver: '李四',
    phone: '139****9999',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    address: '建国路99号',
    subtotal: 4980,
    shipping: 10,
    discount: 0,
    trackingNo: 'SF1234567890',
    trackingCompany: '顺丰速运',
    items: [
      {
        id: 3,
        name: 'Dyson V15吸尘器',
        spec: '标准版',
        price: 4990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100'
      }
    ]
  },
  {
    id: 3,
    orderNo: 'YS202401140003',
    createTime: '2024-01-14 16:20:15',
    buyerName: '顾客9012',
    buyerAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80',
    total: 1899,
    payMethod: '在线支付',
    status: 'completed',
    receiver: '王五',
    phone: '137****7777',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    address: '世纪大道100号',
    subtotal: 1889,
    shipping: 10,
    discount: 0,
    items: [
      {
        id: 1,
        name: 'Apple AirPods Pro 2',
        spec: '主动降噪',
        price: 1899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100'
      }
    ]
  }
])

// 发货弹窗
const shipDialogVisible = ref(false)
const shipping = ref(false)
const shipForm = reactive({
  orderId: null,
  company: '',
  trackingNo: '',
  remark: ''
})

// 详情弹窗
const detailDialogVisible = ref(false)
const currentOrder = ref(null)

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    pending: 'info',
    paid: 'warning',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'danger',
    refund: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    pending: '待付款',
    paid: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消',
    refund: '退款中'
  }
  return textMap[status] || '未知'
}

// 获取步骤索引
const getStepIndex = (status) => {
  const indexMap = {
    pending: 0,
    paid: 1,
    shipped: 2,
    completed: 4
  }
  return indexMap[status] || 0
}

// Tab切换
const handleTabChange = (tab) => {
  currentPage.value = 1
  loadOrders()
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  loadOrders()
}

// 加载订单
const loadOrders = () => {
  loading.value = true
  setTimeout(() => {
    total.value = orderList.value.length
    loading.value = false
  }, 500)
}

// 分页变化
const handleSizeChange = (size) => {
  pageSize.value = size
  loadOrders()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  loadOrders()
}

// 查看订单详情
const viewOrderDetail = (order) => {
  currentOrder.value = order
  detailDialogVisible.value = true
}

// 打开发货弹窗
const openShipDialog = (order) => {
  shipForm.orderId = order.id
  shipForm.company = ''
  shipForm.trackingNo = ''
  shipForm.remark = ''
  shipDialogVisible.value = true
}

// 确认发货
const confirmShip = async () => {
  if (!shipForm.company) {
    ElMessage.warning('请选择物流公司')
    return
  }
  if (!shipForm.trackingNo) {
    ElMessage.warning('请输入物流单号')
    return
  }

  shipping.value = true

  setTimeout(() => {
    const order = orderList.value.find(o => o.id === shipForm.orderId)
    if (order) {
      order.status = 'shipped'
      order.trackingNo = shipForm.trackingNo
      order.trackingCompany = shipForm.company
    }
    shipping.value = false
    shipDialogVisible.value = false
    ElMessage.success('发货成功')
    loadOrders()
  }, 1000)
}

// 查看物流
const viewLogistics = (order) => {
  ElMessage.info(`物流单号：${order.trackingNo}，物流公司：${order.trackingCompany}`)
}

// 取消订单
const cancelOrder = async (order) => {
  try {
    await ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    order.status = 'cancelled'
    ElMessage.success('订单已取消')
    loadOrders()
  } catch {
    // 取消
  }
}

// 检查URL参数
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  loadOrders()
})
</script>

<style scoped lang="scss">
.merchant-orders {
  .tabs-card {
    margin-bottom: 20px;

    :deep(.el-tabs__item) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .search-card {
    margin-bottom: 20px;

    .search-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .table-card {
    .order-info {
      .order-no {
        font-size: 14px;
        color: #303133;
      }

      .order-time {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }

    .buyer-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .buyer-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }

      .buyer-name {
        font-size: 14px;
        color: #606266;
      }
    }

    .product-list {
      .product-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: none;
        }

        .product-image {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          object-fit: cover;
        }

        .product-info {
          flex: 1;

          .product-name {
            font-size: 14px;
            color: #303133;
          }

          .product-spec {
            font-size: 12px;
            color: #909399;
            margin-top: 4px;
          }
        }

        .product-price {
          text-align: right;
          font-size: 14px;
          color: #303133;

          .quantity {
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }

    .order-total {
      .total-amount {
        font-size: 14px;
        font-weight: 600;
        color: #f56c6c;
      }

      .pay-method {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.order-detail {
  .detail-section {
    margin-bottom: 24px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }

    .info-row {
      display: flex;
      padding: 8px 0;
      font-size: 14px;

      .label {
        width: 100px;
        color: #909399;
      }

      .discount {
        color: #f56c6c;
      }

      .total-amount {
        font-size: 18px;
        font-weight: 600;
        color: #f56c6c;
      }

      &.total {
        padding-top: 16px;
        border-top: 1px solid #ebeef5;
        margin-top: 8px;
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
