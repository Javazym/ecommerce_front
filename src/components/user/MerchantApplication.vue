<template>
  <div class="merchant-application">
    <h2 class="section-title">商家入驻</h2>

    <!-- 入驻状态展示 -->
    <div v-if="hasApplied()" class="application-status">
      <el-card class="status-card">
        <template #header>
          <div class="card-header">
            <span>入驻申请状态</span>
          </div>
        </template>
        <div class="status-content">
          <el-steps :active="getStepActive()" align-center>
            <el-step title="提交申请" :description="merchantStore.applicationStatus.submitTime" />
            <el-step title="资料审核" description="审核中" />
            <el-step title="入驻成功" />
          </el-steps>

          <div class="status-info">
            <el-tag v-if="isPending()" type="warning" size="large">
              您的申请正在审核中，请耐心等待...
            </el-tag>

            <el-result
                v-if="merchantStore.applicationStatus.status === 2 "
                icon="error"
                title="入驻申请被拒绝"
            >
              <template #sub-title>
                <p>拒绝原因：{{ merchantStore.applicationStatus.rejectReason }}</p>
              </template>
              <template #extra>
                <el-button type="primary" @click="handleResubmit">重新申请</el-button>
              </template>
            </el-result>

            <el-result
                v-if="merchantStore.applicationStatus.status === 1 "
                icon="success"
                title="恭喜！入驻申请已通过"
                sub-title="您已成为平台商家，可以开始经营店铺了"
            >
              <template #extra>
                <el-button type="primary" @click="goToMerchant">进入商家后台</el-button>
                <el-button @click="handleViewStore">查看我的店铺</el-button>
              </template>
            </el-result>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 未申请或重新申请 -->
    <div v-else class="application-form">
      <div class="intro-section">
        <div class="intro-banner">
          <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
              alt="商家入驻"
          />
          <div class="intro-content">
            <h3>加入云商城，开启您的电商之旅</h3>
            <p>零成本开店，高流量扶持，快速提升销量</p>
          </div>
        </div>

        <div class="merchant-benefits">
          <h4>入驻优势</h4>
          <ul>
            <li><el-icon><CircleCheck /></el-icon><span>零保证金、零技术服务费</span></li>
            <li><el-icon><CircleCheck /></el-icon><span>专属运营一对一指导</span></li>
            <li><el-icon><CircleCheck /></el-icon><span>海量流量精准扶持</span></li>
            <li><el-icon><CircleCheck /></el-icon><span>多种营销工具助销</span></li>
            <li><el-icon><CircleCheck /></el-icon><span>安全快捷的结算服务</span></li>
            <li><el-icon><CircleCheck /></el-icon><span>专业的客服支持</span></li>
          </ul>
        </div>
      </div>

      <el-divider />

      <h3 class="subsection-title">入驻申请</h3>

      <el-form
          ref="formRef"
          :model="applicationForm"
          :rules="formRules"
          label-width="130px"
          class="merchant-form"
      >
        <el-form-item label="店铺名称" prop="storeName">
          <el-input v-model="applicationForm.storeName" placeholder="请输入店铺名称" maxlength="30" show-word-limit />
        </el-form-item>

        <el-form-item label="店铺类型" prop="storeType">
          <el-radio-group v-model="applicationForm.storeType">
            <el-radio label="flagship">旗舰店</el-radio>
            <el-radio label="specialty">专卖店</el-radio>
            <el-radio label="franchise">专营店</el-radio>
            <el-radio label="regular">普通店</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="主营类目" prop="category">
          <el-cascader
              v-model="applicationForm.category"
              :options="categoryOptions"
              placeholder="请选择主营类目"
              :props="cascaderProps"
          />
        </el-form-item>

        <el-form-item label="联系人姓名" prop="contactName">
          <el-input v-model="applicationForm.contactName" placeholder="请输入联系人姓名" />
        </el-form-item>

        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="applicationForm.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>

        <el-form-item label="联系邮箱" prop="contactEmail">
          <el-input v-model="applicationForm.contactEmail" placeholder="请输入联系邮箱" />
        </el-form-item>

        <el-form-item label="营业执照" prop="businessLicense">
          <el-upload class="license-uploader" action="#" :auto-upload="false" :show-file-list="false" :on-change="handleLicenseChange">
            <img v-if="licensePreview" :src="applicationForm.businessLicense" class="preview-img" />
            <el-icon v-else class="upload-icon"><Plus /></el-icon>
          </el-upload>
          <div class="tip">支持JPG/PNG，≤5MB</div>
        </el-form-item>

        <el-form-item label="身份证正面" prop="idCardFront">
          <el-upload class="license-uploader" action="#" :auto-upload="false" :show-file-list="false" :on-change="handleIdCardFront">
            <img v-if="idFrontPreview" :src="applicationForm.idCardFront" class="preview-img" />
            <el-icon v-else class="upload-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="身份证反面" prop="idCardBack">
          <el-upload class="license-uploader" action="#" :auto-upload="false" :show-file-list="false" :on-change="handleIdCardBack">
            <img v-if="idBackPreview" :src="applicationForm.idCardBack" class="preview-img" />
            <el-icon v-else class="upload-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="agreementChecked">
            我已阅读并同意 <el-link type="primary" @click="showAgreement">《商家入驻协议》</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="handleSubmit" :loading="submitting" :disabled="!agreementChecked">
            提交申请
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog v-model="agreementDialogVisible" title="商家入驻协议" width="700px">
      <div class="agreement-content">
        <h4>第一章 总则</h4>
        <p>本协议由云商城平台运营方与商家签订...</p>
        <h4>第二章 入驻条件</h4>
        <p>商家须具备营业执照、合法商品、良好信誉...</p>
        <h4>第三章 权利与义务</h4>
        <p>商家需保证商品质量、遵守平台规则...</p>
      </div>
      <template #footer>
        <el-button @click="agreementDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CircleCheck, Plus } from '@element-plus/icons-vue'
import merchantStore, {getMerchantInfo, hasApplied, isPending, submitApplication} from '../../stores/merchantStore'
import {uploadFile} from "../../api/modules/file.js";
import userStore from "../../stores/userStore.js";
import {getApplyMerchant} from "../../api/modules/merchant.js";

const router = useRouter()
const formRef = ref(null)
const submitting = ref(false)
const agreementDialogVisible = ref(false)
const agreementChecked = ref(false)

// 预览图
const licensePreview = ref(null)
const idFrontPreview = ref(null)
const idBackPreview = ref(null)

// ✅ 完全对齐 ApplySettleDTO
const applicationForm = reactive({
  storeName: '',
  storeType: '',
  category: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  businessLicense: null,
  idCardFront: null,
  idCardBack: null
})
onMounted(() => {
  getMerchantInfo()
})
const cascaderProps = { expandTrigger: 'hover', value: 'value', label: 'label', children: 'children' }

const categoryOptions = [
  { value: 'electronics', label: '数码电子', children: [
      { value: 'phone', label: '手机' },{ value: 'computer', label: '电脑' }]
  },
  { value: 'clothing', label: '服饰服装', children: [
      { value: 'mens', label: '男装' },{ value: 'womens', label: '女装' }]
  },
  { value: 'home', label: '家居生活' },
  { value: 'beauty', label: '美妆护肤' },
  { value: 'food', label: '食品生鲜' }
]

const formRules = {
  storeName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
  storeType: [{ required: true, message: '请选择店铺类型', trigger: 'change' }],
  category: [{ required: true, message: '请选择主营类目', trigger: 'change' }],
  contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  contactPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
  ],
  contactEmail: [
    { required: true, message: '请输入联系邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误' }
  ],
  businessLicense: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
  idCardFront: [{ required: true, message: '请上传身份证正面', trigger: 'change' }],
  idCardBack: [{ required: true, message: '请上传身份证反面', trigger: 'change' }]
}

const getStepActive = () => {
  const status = merchantStore.applicationStatus.status
  return { none: -1, pending: 0, approved: 1, rejected: 2 }[status] || -1
}

// 上传处理
const handleLicenseChange = async (file) => {
  applicationForm.businessLicense = await handleAvatarChange(file)
  licensePreview.value = applicationForm.businessLicense
}
const handleIdCardFront = async (file) => {
  applicationForm.idCardFront = await handleAvatarChange(file)
  idFrontPreview.value = applicationForm.idCardFront
}
const handleIdCardBack = async (file) => {
  applicationForm.idCardBack = await handleAvatarChange(file)
  idBackPreview.value = applicationForm.idCardBack
  console.log(applicationForm.idCardBack)
}
const handleAvatarChange = async (file) => {
  try {
    // 1. 校验图片
    if (!file.raw.type.includes('image/')) {
      ElMessage.warning('只能上传图片')
      return
    }

    // 2. 构建 FormData（后端必须用这个接收 MultipartFile）
    const formData = new FormData()
    formData.append('file', file.raw)        // 后端参数名 = file
    formData.append('fileName', file.name)   // 后端需要的 fileName

    // 3. 调用上传接口
    const res = await uploadFile(formData)

    // 4. 成功 → 更新头像
    if (res.code === 1000) {
      ElMessage.success('头像上传成功')
      return res.data
    }
    return ''
  } catch (err) {
    console.error(err)
  }
  return ''

}
const showAgreement = () => agreementDialogVisible.value = true

// ✅ 修复提交：支持异步接口 + 正确调用
const handleSubmit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return

  if (!agreementChecked.value) {
    ElMessage.warning('请阅读并同意入驻协议')
    return
  }

  submitting.value = true
  try {
    await submitApplication(applicationForm)
    ElMessage.success('提交成功')
  } catch (err) {
    ElMessage.error('提交失败')
  } finally {
    submitting.value = false
  }
}

const handleResubmit = () => resubmitApplication()
const goToMerchant = () => router.push('/merchant')
const handleViewStore = () => router.push('/merchant')
</script>

<style scoped lang="scss">
.merchant-application {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .subsection-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin: 24px 0 16px 0;
  }

  .status-card {
    margin-bottom: 24px;
  }

  .status-content {
    padding: 20px 0;
  }

  .status-info {
    margin-top: 40px;
    text-align: center;
  }

  .intro-section {
    .intro-banner {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .intro-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;

        h3 {
          font-size: 24px;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        p {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }
      }
    }

    .merchant-benefits {
      background: #f5f7fa;
      border-radius: 12px;
      padding: 24px;

      h4 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: #303133;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;

        li {
          display: flex;
          align-items: center;
          gap: 8px;

          .el-icon {
            color: #67c23a;
            font-size: 18px;
          }
        }
      }
    }
  }

  .merchant-form {
    max-width: 600px;

    .license-uploader {
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s;

      &:hover {
        border-color: #409eff;
      }
    }

    .preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .upload-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tip {
      font-size: 12px;
      color: #909399;
      margin-top: 8px;
    }
  }

  .agreement-content {
    max-height: 400px;
    overflow-y: auto;

    h4 {
      margin: 16px 0 8px 0;
      color: #303133;
    }

    p {
      margin: 0 0 12px 0;
      color: #606266;
      line-height: 1.8;
      text-indent: 2em;
    }
  }
}
</style>
