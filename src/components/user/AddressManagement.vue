<template>
  <div class="address-management">
    <div class="section-header">
      <h2 class="section-title">收货地址管理</h2>
      <el-button type="primary" @click="showAddDialog">
        <el-icon><Plus /></el-icon>
        添加新地址
      </el-button>
    </div>

    <div class="address-list">
      <div
          v-for="address in addressStore.state.addresses"
          :key="address.id"
          class="address-card"
          :class="{ 'is-default': address.isDefault === 1 }"
      >
        <div class="address-content">
          <div class="address-header">
            <div class="address-info">
              <span class="receiver-name">{{ address.receiverName }}</span>
              <span class="receiver-phone">{{ formatPhone(address.receiverPhone) }}</span>
            </div>
            <div class="address-tags">
              <el-tag v-if="address.isDefault === 1" type="success" size="small">默认</el-tag>
            </div>
          </div>

          <div class="address-detail">
            {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detailAddress }}
          </div>

          <div class="address-actions">
            <el-button type="primary" link @click="handleEdit(address)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDelete(address.id)" v-if="address.isDefault !== 1">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
            <el-button
                v-if="address.isDefault !== 1"
                type="success"
                link
                @click="handleSetDefault(address.id)"
            >
              <el-icon><CircleCheck /></el-icon>
              设为默认
            </el-button>
          </div>
        </div>
      </div>

      <div v-if="addressStore.state.addresses.length === 0" class="empty-state">
        <el-empty description="暂无收货地址">
          <el-button type="primary" @click="showAddDialog">添加地址</el-button>
        </el-empty>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" @close="handleDialogClose">
      <el-form ref="formRef" :model="addressForm" :rules="formRules" label-width="100px">
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addressForm.name" maxlength="20" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addressForm.phone" maxlength="11" />
        </el-form-item>
        <el-form-item label="所在地区" prop="region">
          <el-cascader
              v-model="addressForm.region"
              :options="regionOptions"
              :props="cascaderProps"
              placeholder="请选择省市区"
              style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="addressForm.detail" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addressForm.isDefault">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible" title="确认删除" width="400px">
      <div class="delete-warning">
        <el-icon color="#f56c6c" size="48"><WarningFilled /></el-icon>
        <p>确定要删除这个收货地址吗？</p>
      </div>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确认删除</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus, Edit, Delete, CircleCheck, WarningFilled } from '@element-plus/icons-vue'
import addressStore from '../../stores/addressStore'
import {regionData} from "element-china-area-data";
onMounted(() => {
  addressStore.fetchAddresses()
})

const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const dialogTitle = ref('添加收货地址')
const isEditMode = ref(false)
const editingAddressId = ref(null)
const formRef = ref(null)
const deleteAddressId = ref(null)

const addressForm = reactive({
  name: '',
  phone: '',
  region: [],
  detail: '',
  isDefault: false
})
const formRules = {
  name: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度为2-20个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择省市区', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (!value || value.length !== 3) {
          callback(new Error('必须选择省、市、区三级'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  detail: [
    { required: true, message: '请输入详细地址', trigger: 'blur' },
    { min: 5, max: 100, message: '详细地址长度为5-100个字符', trigger: 'blur' }
  ]
}


const cascaderProps = {
  value: 'value',   // 你现在的数据是 value！不是 code！
  label: 'label',   // 显示用 label
  children: 'children',
  expandTrigger: 'hover'
}
console.log(regionData)
const regionOptions = regionData  // 官方原版数据


const formatPhone = (phone) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || ''

const showAddDialog = () => {
  dialogTitle.value = '添加收货地址'
  isEditMode.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (addr) => {
  dialogTitle.value = '编辑收货地址'
  isEditMode.value = true
  editingAddressId.value = addr.id
  addressForm.name = addr.receiverName
  addressForm.phone = addr.receiverPhone
  addressForm.region = [addr.province, addr.city, addr.district]
  addressForm.detail = addr.detailAddress
  addressForm.isDefault = addr.isDefault === 1
  dialogVisible.value = true
}

const handleDelete = (id) => {
  deleteAddressId.value = id
  deleteDialogVisible.value = true
}

const confirmDelete = async () => {
  await addressStore.deleteAddressData(deleteAddressId.value)
  await addressStore.fetchAddresses()
  deleteDialogVisible.value = false
}

const handleSetDefault = async (id) => {
  await addressStore.setDefaultAddressData(id)
  await addressStore.fetchAddresses()
}

const handleSubmit = async () => {
  await formRef.value.validate()
  const data = {
    receiverName: addressForm.name,      // ✅ 必须是这个
    receiverPhone: addressForm.phone,    // ✅ 必须是这个
    province: addressForm.region[0],
    city: addressForm.region[1],
    district: addressForm.region[2],
    detailAddress: addressForm.detail,
    isDefault: addressForm.isDefault ? 1 : 0
  }

  if (isEditMode.value) {
    data.id = editingAddressId.value
    await addressStore.updateAddressData(data)
  } else {
    await addressStore.addAddressData(data)
  }

  await addressStore.fetchAddresses()
  dialogVisible.value = false
}

const resetForm = () => {
  addressForm.name = ''
  addressForm.phone = ''
  addressForm.region = []
  addressForm.detail = ''
  addressForm.isDefault = false
}

const handleDialogClose = () => resetForm()
</script>

<style scoped lang="scss">
.address-management {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;

    .section-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
  }

  .address-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }

  .address-card {
    position: relative;
    background: #fff;
    border: 2px solid #e4e7ed;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #409eff;
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
    }

    &.is-default {
      border-color: #67c23a;
      background: linear-gradient(135deg, #f0f9eb 0%, #fff 100%);
    }

    .address-content {
      .address-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;

        .address-info {
          .receiver-name {
            font-size: 18px;
            font-weight: 600;
            color: #303133;
            margin-right: 12px;
          }

          .receiver-phone {
            font-size: 14px;
            color: #606266;
          }
        }

        .address-tags {
          display: flex;
          gap: 8px;
        }
      }

      .address-detail {
        font-size: 14px;
        color: #606266;
        line-height: 1.6;
        margin-bottom: 16px;
        min-height: 44px;
      }

      .address-actions {
        display: flex;
        gap: 16px;
        padding-top: 12px;
        border-top: 1px dashed #ebeef5;

        .el-button {
          padding: 0;
          font-size: 14px;

          .el-icon {
            margin-right: 4px;
          }
        }
      }
    }

    .default-badge {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 60px;
      height: 60px;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        border-width: 0 60px 60px 0;
        border-style: solid;
        border-color: transparent #67c23a transparent transparent;
      }

      .el-icon {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 16px;
        color: #fff;
        z-index: 1;
      }
    }
  }

  .empty-state {
    grid-column: 1 / -1;
    padding: 60px 0;
    text-align: center;
  }

  .delete-warning {
    text-align: center;
    padding: 20px 0;

    .el-icon {
      margin-bottom: 16px;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #606266;
    }
  }

  @media (max-width: 768px) {
    .address-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
