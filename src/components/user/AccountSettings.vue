<template>
  <div class="account-settings">
    <h2 class="section-title">账户设置</h2>

    <el-form label-width="120px" class="settings-form">
      <!-- 登录密码 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>登录密码</h4>
          <p>定期修改密码可以提高账户安全性</p>
        </div>
        <el-button @click="showPasswordDialog">修改</el-button>
      </div>

      <!-- 绑定手机 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>绑定手机</h4>
          <p>已绑定手机：{{ userStore.userInfo.phone }}</p>
        </div>
        <el-button @click="showPhoneDialog">修改</el-button>
      </div>

      <!-- 绑定邮箱 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>绑定邮箱</h4>
          <p>已绑定邮箱：{{ userStore.userInfo.email }}</p>
        </div>
        <el-button @click="showEmailDialog">修改</el-button>
      </div>

      <!-- 支付密码 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>支付密码</h4>
          <p>用于保障您的支付安全</p>
        </div>
        <el-button @click="showPayPasswordDialog">
          {{ hasPayPassword ? '修改' : '设置' }}
        </el-button>
      </div>

      <!-- 消息通知 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>消息通知</h4>
          <p>管理您接收的消息推送</p>
        </div>
        <el-switch
          v-model="notificationSettings.enabled"
          @change="handleNotificationChange"
        />
      </div>

      <!-- 隐私设置 -->
      <div class="settings-item">
        <div class="item-info">
          <h4>隐私设置</h4>
          <p>控制您的个人信息可见性</p>
        </div>
        <el-button @click="showPrivacyDialog">设置</el-button>
      </div>

      <!-- 账户注销 -->
      <div class="settings-item danger">
        <div class="item-info">
          <h4>账户注销</h4>
          <p>注销后将无法恢复，请谨慎操作</p>
        </div>
        <el-button type="danger" @click="showDestroyDialog">注销账户</el-button>
      </div>
    </el-form>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="passwordDialogVisible" title="修改登录密码" width="450px">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChangePassword">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 修改手机号对话框 -->
    <el-dialog v-model="phoneDialogVisible" title="修改手机号" width="450px">
      <el-form :model="phoneForm" :rules="phoneRules" ref="phoneFormRef" label-width="100px">
        <el-form-item label="新手机号" prop="phone">
          <el-input v-model="phoneForm.phone" placeholder="请输入新手机号" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="phoneForm.code" placeholder="请输入验证码">
            <template #append>
              <el-button @click="sendPhoneCode" :disabled="phoneCodeSending">
                {{ phoneCodeSending ? `${phoneCodeCountdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="phoneDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChangePhone">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 修改邮箱对话框 -->
    <el-dialog v-model="emailDialogVisible" title="修改邮箱" width="450px">
      <el-form :model="emailForm" :rules="emailRules" ref="emailFormRef" label-width="100px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="emailForm.email" placeholder="请输入新邮箱" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="emailForm.code" placeholder="请输入验证码">
            <template #append>
              <el-button @click="sendEmailCode" :disabled="emailCodeSending">
                {{ emailCodeSending ? `${emailCodeCountdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="emailDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChangeEmail">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 设置支付密码对话框 -->
    <el-dialog v-model="payPasswordDialogVisible" title="设置支付密码" width="450px">
      <el-form :model="payPasswordForm" :rules="payPasswordRules" ref="payPasswordFormRef" label-width="100px">
        <el-form-item label="支付密码" prop="password">
          <el-input
            v-model="payPasswordForm.password"
            type="password"
            placeholder="请输入6位数字支付密码"
            show-password
            maxlength="6"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="payPasswordForm.confirmPassword"
            type="password"
            placeholder="请再次输入支付密码"
            show-password
            maxlength="6"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="payPasswordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSetPayPassword">确认设置</el-button>
      </template>
    </el-dialog>

    <!-- 隐私设置对话框 -->
    <el-dialog v-model="privacyDialogVisible" title="隐私设置" width="500px">
      <div class="privacy-settings">
        <el-form label-width="120px">
          <el-form-item label="个人信息">
            <el-radio-group v-model="privacySettings.profileVisible">
              <el-radio label="public">公开</el-radio>
              <el-radio label="friends">仅好友可见</el-radio>
              <el-radio label="private">仅自己可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单信息">
            <el-radio-group v-model="privacySettings.orderVisible">
              <el-radio label="public">公开</el-radio>
              <el-radio label="private">仅自己可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收藏信息">
            <el-radio-group v-model="privacySettings.favoriteVisible">
              <el-radio label="public">公开</el-radio>
              <el-radio label="private">仅自己可见</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="privacyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSavePrivacy">保存设置</el-button>
      </template>
    </el-dialog>

    <!-- 注销账户对话框 -->
    <el-dialog v-model="destroyDialogVisible" title="注销账户" width="500px">
      <div class="destroy-warning">
        <el-alert type="error" :closable="false" show-icon>
          <template #title>
            <span>重要提示</span>
          </template>
          <template #default>
            <p>1. 账户注销后，所有信息将无法恢复</p>
            <p>2. 账户中的资产、优惠券等将同时清零</p>
            <p>3. 正在进行的交易将自动取消</p>
          </template>
        </el-alert>

        <el-form :model="destroyForm" :rules="destroyRules" ref="destroyFormRef" label-width="100px" class="destroy-form">
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="destroyForm.password"
              type="password"
              placeholder="请输入登录密码确认"
              show-password
            />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="destroyForm.code" placeholder="请输入验证码">
              <template #append>
                <el-button @click="sendDestroyCode" :disabled="destroyCodeSending">
                  {{ destroyCodeSending ? `${destroyCodeCountdown}s` : '获取验证码' }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="destroyForm.confirmed">
              我已阅读并同意注销账户的相关规定
            </el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="destroyDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleDestroyAccount" :disabled="!destroyForm.confirmed">
          确认注销
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useUserStore} from "../../stores/userStore.js"

// 支付密码状态
const hasPayPassword = ref(false)
const userStore = useUserStore()
// 通知设置
const notificationSettings = reactive({
  enabled: true
})

// 隐私设置
const privacySettings = reactive({
  profileVisible: 'public',
  orderVisible: 'private',
  favoriteVisible: 'private'
})

// 修改密码相关
const passwordDialogVisible = ref(false)
const passwordFormRef = ref(null)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 修改手机号相关
const phoneDialogVisible = ref(false)
const phoneFormRef = ref(null)
const phoneForm = reactive({
  phone: '',
  code: ''
})
const phoneCodeSending = ref(false)
const phoneCodeCountdown = ref(60)
let phoneTimer = null

const phoneRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

// 修改邮箱相关
const emailDialogVisible = ref(false)
const emailFormRef = ref(null)
const emailForm = reactive({
  email: '',
  code: ''
})
const emailCodeSending = ref(false)
const emailCodeCountdown = ref(60)
let emailTimer = null

const emailRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

// 设置支付密码相关
const payPasswordDialogVisible = ref(false)
const payPasswordFormRef = ref(null)
const payPasswordForm = reactive({
  password: '',
  confirmPassword: ''
})

const payPasswordRules = {
  password: [
    { required: true, message: '请输入支付密码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '支付密码为6位数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入支付密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== payPasswordForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 注销账户相关
const destroyDialogVisible = ref(false)
const destroyFormRef = ref(null)
const destroyForm = reactive({
  password: '',
  code: '',
  confirmed: false
})
const destroyCodeSending = ref(false)
const destroyCodeCountdown = ref(60)
let destroyTimer = null

const destroyRules = {
  password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

const showPasswordDialog = () => {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordDialogVisible.value = true
}

const showPhoneDialog = () => {
  phoneForm.phone = ''
  phoneForm.code = ''
  phoneDialogVisible.value = true
}

const showEmailDialog = () => {
  emailForm.email = ''
  emailForm.code = ''
  emailDialogVisible.value = true
}

const showPayPasswordDialog = () => {
  payPasswordForm.password = ''
  payPasswordForm.confirmPassword = ''
  payPasswordDialogVisible.value = true
}

const showPrivacyDialog = () => {
  privacyDialogVisible.value = true
}

const showDestroyDialog = () => {
  destroyForm.password = ''
  destroyForm.code = ''
  destroyForm.confirmed = false
  destroyDialogVisible.value = true
}

// 发送验证码
const sendPhoneCode = () => {
  if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  phoneCodeSending.value = true
  phoneCodeCountdown.value = 60

  phoneTimer = setInterval(() => {
    phoneCodeCountdown.value--
    if (phoneCodeCountdown.value <= 0) {
      clearInterval(phoneTimer)
      phoneCodeSending.value = false
      phoneCodeCountdown.value = 60
    }
  }, 1000)

  ElMessage.success('验证码已发送')
}

const sendEmailCode = () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email)) {
    ElMessage.warning('请输入正确的邮箱')
    return
  }

  emailCodeSending.value = true
  emailCodeCountdown.value = 60

  emailTimer = setInterval(() => {
    emailCodeCountdown.value--
    if (emailCodeCountdown.value <= 0) {
      clearInterval(emailTimer)
      emailCodeSending.value = false
      emailCodeCountdown.value = 60
    }
  }, 1000)

  ElMessage.success('验证码已发送')
}

const sendDestroyCode = () => {
  destroyCodeSending.value = true
  destroyCodeCountdown.value = 60

  destroyTimer = setInterval(() => {
    destroyCodeCountdown.value--
    if (destroyCodeCountdown.value <= 0) {
      clearInterval(destroyTimer)
      destroyCodeSending.value = false
      destroyCodeCountdown.value = 60
    }
  }, 1000)

  ElMessage.success('验证码已发送')
}

// 处理操作
const handleChangePassword = async () => {
  if (!passwordFormRef.value) return

  try {
    await passwordFormRef.value.validate()
  } catch (error) {
    return
  }

  // 模拟API调用
  await new Promise((resolve) => setTimeout(resolve, 1000))

  ElMessage.success('密码修改成功')
  passwordDialogVisible.value = false
}

const handleChangePhone = async () => {
  if (!phoneFormRef.value) return

  try {
    await phoneFormRef.value.validate()
  } catch (error) {
    return
  }

  // 模拟API调用
  await new Promise((resolve) => setTimeout(resolve, 1000))

  userStore.updateUserInfo({ phone: phoneForm.phone })
  ElMessage.success('手机号修改成功')
  phoneDialogVisible.value = false
  clearInterval(phoneTimer)
}

const handleChangeEmail = async () => {
  if (!emailFormRef.value) return

  try {
    await emailFormRef.value.validate()
  } catch (error) {
    return
  }

  // 模拟API调用
  await new Promise((resolve) => setTimeout(resolve, 1000))

  userStore.updateUserInfo({ email: emailForm.email })
  ElMessage.success('邮箱修改成功')
  emailDialogVisible.value = false
  clearInterval(emailTimer)
}

const handleSetPayPassword = async () => {
  if (!payPasswordFormRef.value) return

  try {
    await payPasswordFormRef.value.validate()
  } catch (error) {
    return
  }

  // 模拟API调用
  await new Promise((resolve) => setTimeout(resolve, 1000))

  hasPayPassword.value = true
  ElMessage.success('支付密码设置成功')
  payPasswordDialogVisible.value = false
}

const handleNotificationChange = () => {
  ElMessage.success('通知设置已更新')
}

const handleSavePrivacy = () => {
  ElMessage.success('隐私设置已保存')
  privacyDialogVisible.value = false
}

const handleDestroyAccount = async () => {
  if (!destroyForm.confirmed) {
    ElMessage.warning('请勾选确认注销')
    return
  }

  try {
    await ElMessageBox.confirm(
      '注销账户后，所有信息将无法恢复。确定要注销账户吗？',
      '危险操作',
      {
        confirmButtonText: '确认注销',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
  } catch {
    return
  }

  // 模拟注销
  await new Promise((resolve) => setTimeout(resolve, 1000))

  ElMessage.success('账户已注销')
  destroyDialogVisible.value = false

  // 跳转到首页
  window.location.href = '/'
}
</script>

<style scoped lang="scss">
.account-settings {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .settings-form {
    max-width: 700px;
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #ebeef5;

    &:last-child {
      border-bottom: none;
    }

    &.danger {
      .item-info h4 {
        color: #f56c6c;
      }
    }

    .item-info {
      h4 {
        margin: 0 0 4px 0;
        font-size: 15px;
        font-weight: 500;
        color: #303133;
      }

      p {
        margin: 0;
        font-size: 13px;
        color: #909399;
      }
    }
  }

  .privacy-settings {
    padding: 10px 0;
  }

  .destroy-warning {
    .el-alert {
      margin-bottom: 20px;

      p {
        margin: 8px 0;
        line-height: 1.6;
      }
    }

    .destroy-form {
      margin-top: 20px;
    }
  }
}
</style>
