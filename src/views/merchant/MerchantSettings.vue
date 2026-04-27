<template>
  <div class="merchant-settings">
    <!-- 店铺信息 -->
    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">店铺信息</span>
        </div>
      </template>
      <el-form :model="shopForm" label-width="100px" class="shop-form">
        <el-form-item label="店铺头像">
          <div class="avatar-upload">
            <img :src="shopForm.avatar" alt="店铺头像" class="shop-avatar" />
            <el-upload
              action="#"
              :show-file-list="false"
              :auto-upload="false"
              accept="image/*"
            >
              <el-button size="small">更换头像</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="shopForm.name" placeholder="请输入店铺名称" style="width: 300px" />
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input
            v-model="shopForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入店铺简介"
            style="width: 400px"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="shopForm.phone" placeholder="请输入联系电话" style="width: 200px" />
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="shopForm.email" placeholder="请输入联系邮箱" style="width: 200px" />
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="shopForm.address" placeholder="请输入店铺地址" style="width: 400px" />
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            v-model="shopForm.openTime"
            placeholder="开始时间"
            style="width: 150px"
          />
          <span style="margin: 0 8px">至</span>
          <el-time-picker
            v-model="shopForm.closeTime"
            placeholder="结束时间"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveShopInfo">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 运费设置 -->
    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">运费设置</span>
          <el-button type="primary" size="small" @click="openShippingDialog()">
            <el-icon><Plus /></el-icon>
            添加模板
          </el-button>
        </div>
      </template>

      <el-table :data="shippingTemplates" style="width: 100%">
        <el-table-column prop="name" label="模板名称" width="150" />
        <el-table-column prop="type" label="计费方式" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ row.type === 'count' ? '按件数' : '按重量' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="firstFee" label="首件/首重" width="100">
          <template #default="{ row }">
            ¥{{ row.firstFee }}
          </template>
        </el-table-column>
        <el-table-column prop="firstCount" label="首件/首重数量" width="130" />
        <el-table-column prop="additionalFee" label="续件/续重费用" width="130">
          <template #default="{ row }">
            ¥{{ row.additionalFee }}
          </template>
        </el-table-column>
        <el-table-column prop="freeShipping" label="满额包邮" width="100">
          <template #default="{ row }">
            {{ row.freeShipping > 0 ? '满' + row.freeShipping + '元' : '不支持' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editShipping(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteShipping(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 账号安全 -->
    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">账号安全</span>
        </div>
      </template>
      <div class="security-list">
        <div class="security-item">
          <div class="security-info">
            <div class="security-icon" style="background: #e6f7ff;">
              <el-icon style="color: #409eff;"><Lock /></el-icon>
            </div>
            <div class="security-content">
              <div class="security-title">登录密码</div>
              <div class="security-desc">定期修改密码可以提高账户安全性</div>
            </div>
          </div>
          <el-button>修改</el-button>
        </div>
        <div class="security-item">
          <div class="security-info">
            <div class="security-icon" style="background: #f6ffed;">
              <el-icon style="color: #67c23a;"><Phone /></el-icon>
            </div>
            <div class="security-content">
              <div class="security-title">绑定手机</div>
              <div class="security-desc">已绑定手机：138****8888</div>
            </div>
          </div>
          <el-button>修改</el-button>
        </div>
        <div class="security-item">
          <div class="security-info">
            <div class="security-icon" style="background: #fff7e6;">
              <el-icon style="color: #e6a23c;"><Message /></el-icon>
            </div>
            <div class="security-content">
              <div class="security-title">绑定邮箱</div>
              <div class="security-desc">已绑定邮箱：merchant@example.com</div>
            </div>
          </div>
          <el-button>修改</el-button>
        </div>
        <div class="security-item">
          <div class="security-info">
            <div class="security-icon" style="background: #fff1f0;">
              <el-icon style="color: #f56c6c;"><Key /></el-icon>
            </div>
            <div class="security-content">
              <div class="security-title">支付密码</div>
              <div class="security-desc">用于保障您的支付安全</div>
            </div>
          </div>
          <el-button type="primary">设置</el-button>
        </div>
      </div>
    </el-card>

    <!-- 消息通知 -->
    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">消息通知</span>
        </div>
      </template>
      <div class="notification-list">
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">订单通知</div>
            <div class="notification-desc">新订单、订单状态变更通知</div>
          </div>
          <el-switch v-model="notificationForm.orderNotify" />
        </div>
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">退款通知</div>
            <div class="notification-desc">退款申请、退款进度通知</div>
          </div>
          <el-switch v-model="notificationForm.refundNotify" />
        </div>
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">售后通知</div>
            <div class="notification-desc">售后处理进度通知</div>
          </div>
          <el-switch v-model="notificationForm.afterSaleNotify" />
        </div>
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">系统通知</div>
            <div class="notification-desc">系统公告、活动通知</div>
          </div>
          <el-switch v-model="notificationForm.systemNotify" />
        </div>
        <div class="notification-item">
          <div class="notification-info">
            <div class="notification-title">库存预警</div>
            <div class="notification-desc">商品库存不足提醒</div>
          </div>
          <el-switch v-model="notificationForm.stockNotify" />
        </div>
      </div>
    </el-card>

    <!-- 运费模板弹窗 -->
    <el-dialog
      v-model="shippingDialogVisible"
      :title="editingShipping ? '编辑运费模板' : '添加运费模板'"
      width="600px"
    >
      <el-form :model="shippingForm" label-width="120px">
        <el-form-item label="模板名称" required>
          <el-input v-model="shippingForm.name" placeholder="请输入模板名称" style="width: 200px" />
        </el-form-item>
        <el-form-item label="计费方式" required>
          <el-radio-group v-model="shippingForm.type">
            <el-radio label="count">按件数</el-radio>
            <el-radio label="weight">按重量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首件/首重">
          <el-input-number v-model="shippingForm.firstCount" :min="1" :precision="0" style="width: 100px" />
          <span style="margin: 0 8px">{{ shippingForm.type === 'count' ? '件' : 'kg' }}</span>
          <span>费用：</span>
          <el-input-number v-model="shippingForm.firstFee" :min="0" :precision="2" style="width: 100px" />
          <span>元</span>
        </el-form-item>
        <el-form-item label="续件/续重">
          <el-input-number v-model="shippingForm.addStep" :min="1" :precision="0" style="width: 100px" />
          <span style="margin: 0 8px">{{ shippingForm.type === 'count' ? '件' : 'kg' }}</span>
          <span>费用：</span>
          <el-input-number v-model="shippingForm.additionalFee" :min="0" :precision="2" style="width: 100px" />
          <span>元</span>
        </el-form-item>
        <el-form-item label="满额包邮">
          <el-input-number v-model="shippingForm.freeShipping" :min="0" :precision="0" style="width: 150px" />
          <span style="margin-left: 8px">元（0表示不支持）</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="shippingDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveShipping">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Lock, Phone, Message, Key } from '@element-plus/icons-vue'

// 店铺信息表单
const shopForm = reactive({
  avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
  name: '云商城旗舰店',
  description: '品质生活，从云商城开始。我们致力于为您提供优质的商品和服务。',
  phone: '400-888-8888',
  email: 'merchant@example.com',
  address: '广东省深圳市南山区科技园',
  openTime: new Date(2024, 0, 1, 9, 0),
  closeTime: new Date(2024, 0, 1, 22, 0)
})

// 通知设置
const notificationForm = reactive({
  orderNotify: true,
  refundNotify: true,
  afterSaleNotify: true,
  systemNotify: true,
  stockNotify: true
})

// 运费模板列表
const shippingTemplates = ref([
  {
    id: 1,
    name: '默认运费模板',
    type: 'count',
    firstFee: 10,
    firstCount: 1,
    additionalFee: 5,
    freeShipping: 99,
    status: true
  },
  {
    id: 2,
    name: '大件商品运费',
    type: 'weight',
    firstFee: 30,
    firstCount: 1,
    additionalFee: 10,
    freeShipping: 0,
    status: false
  }
])

// 运费模板弹窗
const shippingDialogVisible = ref(false)
const editingShipping = ref(null)
const shippingForm = reactive({
  name: '',
  type: 'count',
  firstCount: 1,
  firstFee: 10,
  addStep: 1,
  additionalFee: 5,
  freeShipping: 0
})

// 保存店铺信息
const saveShopInfo = () => {
  ElMessage.success('店铺信息保存成功')
}

// 打开运费弹窗
const openShippingDialog = () => {
  editingShipping.value = null
  Object.assign(shippingForm, {
    name: '',
    type: 'count',
    firstCount: 1,
    firstFee: 10,
    addStep: 1,
    additionalFee: 5,
    freeShipping: 0
  })
  shippingDialogVisible.value = true
}

// 编辑运费模板
const editShipping = (template) => {
  editingShipping.value = template
  Object.assign(shippingForm, { ...template })
  shippingDialogVisible.value = true
}

// 保存运费模板
const saveShipping = () => {
  if (!shippingForm.name) {
    ElMessage.warning('请输入模板名称')
    return
  }

  if (editingShipping.value) {
    const index = shippingTemplates.value.findIndex(t => t.id === editingShipping.value.id)
    if (index > -1) {
      shippingTemplates.value[index] = { ...shippingForm, id: editingShipping.value.id, status: true }
    }
    ElMessage.success('运费模板更新成功')
  } else {
    shippingTemplates.value.push({ ...shippingForm, id: Date.now(), status: true })
    ElMessage.success('运费模板添加成功')
  }

  shippingDialogVisible.value = false
}

// 删除运费模板
const deleteShipping = async (template) => {
  try {
    await ElMessageBox.confirm('确定要删除该运费模板吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = shippingTemplates.value.findIndex(t => t.id === template.id)
    if (index > -1) {
      shippingTemplates.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    // 取消
  }
}
</script>

<style scoped lang="scss">
.merchant-settings {
  .settings-card {
    margin-bottom: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }
  }

  .shop-form {
    .avatar-upload {
      display: flex;
      align-items: center;
      gap: 16px;

      .shop-avatar {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }

  .security-list {
    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ebeef5;

      &:last-child {
        border-bottom: none;
      }

      .security-info {
        display: flex;
        align-items: center;
        gap: 16px;

        .security-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .security-content {
          .security-title {
            font-size: 14px;
            font-weight: 600;
            color: #303133;
          }

          .security-desc {
            font-size: 12px;
            color: #909399;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .notification-list {
    .notification-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ebeef5;

      &:last-child {
        border-bottom: none;
      }

      .notification-info {
        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
        }

        .notification-desc {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
        }
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
