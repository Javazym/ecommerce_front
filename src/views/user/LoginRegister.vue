<template>
  <div style="display: flex; justify-content: center;width: 100%; height: 100%">
    <div class="auth-container">
      <!-- Login Card -->
      <el-card class="auth-card login-card" :class="{ 'slide-out': isRegisterView }" v-show="!isRegisterView">
        <div class="logo-section">
          <div class="logo-icon">
            <el-icon :size="32"><CircleCheckFilled /></el-icon>
          </div>
          <h1 class="title">{{ activeLoginTab === 'password' ? '星悦云商城欢迎回来' : '验证码登录' }}</h1>
          <p class="subtitle">{{ activeLoginTab === 'password' ? '登录您的账号以继续' : '使用邮箱验证码登录' }}</p>
        </div>

        <el-tabs v-model="activeLoginTab" class="login-tabs" @tab-change="handleTabChange">
          <el-tab-pane label="密码登录" name="password">
            <el-form
                ref="passwordLoginFormRef"
                :model="passwordLoginForm"
                :rules="passwordLoginRules"
                class="login-form"
                @submit.prevent
            >
              <el-form-item prop="email">
                <el-input
                    v-model="passwordLoginForm.email"
                    placeholder="请输入邮箱或用户名"
                    size="large"
                    :prefix-icon="Message"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                    v-model="passwordLoginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    size="large"
                    :prefix-icon="Lock"
                    show-password
                    @keyup.enter="handlePasswordLogin"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                    type="primary"
                    size="large"
                    class="submit-btn"
                    :loading="passwordLoginLoading"
                    @click="handlePasswordLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="验证码登录" name="code">
            <el-form
                ref="codeLoginFormRef"
                :model="codeLoginForm"
                :rules="codeLoginRules"
                class="login-form"
                @submit.prevent
            >
              <el-form-item prop="email">
                <el-input
                    v-model="codeLoginForm.email"
                    placeholder="请输入邮箱地址"
                    size="large"
                    :prefix-icon="Message"
                />
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                    v-model="codeLoginForm.code"
                    placeholder="请输入验证码"
                    size="large"
                    :prefix-icon="Key"
                    maxlength="6"
                >
                  <template #append>
                    <el-button
                        @click="sendLoginCode"
                        :disabled="loginCodeCountdown > 0"
                        class="code-btn"
                    >
                      {{ loginCodeCountdown > 0 ? `${loginCodeCountdown}s` : '获取验证码' }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                    type="primary"
                    size="large"
                    class="submit-btn"
                    :loading="codeLoginLoading"
                    @click="handleCodeLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div class="switch-mode">
          <span>还没有账号?</span>
          <el-link type="primary" @click="switchToRegister">立即注册</el-link>
        </div>
      </el-card>

      <!-- Register Card -->
      <el-card class="auth-card register-card" :class="{ 'slide-in': isRegisterView }" v-show="isRegisterView">
        <div class="logo-section">
          <div class="logo-icon">
            <el-icon :size="32"><CircleCheckFilled /></el-icon>
          </div>
          <h1 class="title">创建账号</h1>
          <p class="subtitle">填写信息完成注册</p>
        </div>

        <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            class="register-form"
            @submit.prevent
        >
          <el-form-item prop="username">
            <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                size="large"
                :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
                v-model="registerForm.email"
                placeholder="请输入邮箱地址"
                size="large"
                :prefix-icon="Message"
            />
          </el-form-item>

          <el-form-item prop="code">
            <el-input
                v-model="registerForm.code"
                placeholder="请输入验证码"
                size="large"
                :prefix-icon="Key"
                maxlength="6"
            >
              <template #append>
                <el-button
                    @click="sendRegisterCode"
                    :disabled="registerCodeCountdown > 0"
                    class="code-btn"
                >
                  {{ registerCodeCountdown > 0 ? `${registerCodeCountdown}s` : '获取验证码' }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码（至少8位）"
                size="large"
                :prefix-icon="Lock"
                show-password
                @input="checkPasswordStrength"
            />
          </el-form-item>

          <div class="password-strength" v-if="registerForm.password">
            <div class="strength-bar">
              <div class="strength-fill" :class="passwordStrengthClass"></div>
            </div>
            <span class="strength-text" :class="passwordStrengthClass">{{ passwordStrengthText }}</span>
          </div>

          <el-form-item prop="confirmPassword">
            <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="handleRegister"
            />
          </el-form-item>

          <el-form-item>
            <el-button
                type="primary"
                size="large"
                class="submit-btn"
                :loading="registerLoading"
                @click="handleRegister"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>

        <div class="switch-mode">
          <span>已有账号?</span>
          <el-link type="primary" @click="switchToLogin">立即登录</el-link>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, Lock, User, Key, CircleCheckFilled } from '@element-plus/icons-vue'
import user from "../../api/user.js";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../../api/modules/user.js";
import {useUserStore} from "../../stores/userStore.js";
import {clearAllUserData} from "../../stores/clearData.js";

const userStore = useUserStore()
// Login Tab State
const activeLoginTab = ref('password')
const isRegisterView = ref(false)
const router = useRouter()
// Password Login
const passwordLoginFormRef = ref()
const passwordLoginLoading = ref(false)
const passwordLoginForm = reactive({
  email: '',
  password: ''
})

const passwordLoginRules = {
  email: [
    { required: true, message: '请输入邮箱或用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// Code Login
const codeLoginFormRef = ref()
const codeLoginLoading = ref(false)
const loginCodeCountdown = ref(0)
let loginCodeTimer = null

const codeLoginForm = reactive({
  email: '',
  code: ''
})

const codeLoginRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码应为6位数字', trigger: 'blur' }
  ]
}

// Register
const registerFormRef = ref()
const registerLoading = ref(false)
const registerCodeCountdown = ref(0)
let registerCodeTimer = null

const registerForm = reactive({
  username: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

// Password strength
const passwordStrengthClass = ref('')
const passwordStrengthText = ref('')

const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次密码输入不一致'))
  } else {
    callback()
  }
}

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '用户名至少2个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码应为6位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码至少8个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ]
}
function isValidEmailStrict(email) {
  const emailRegex = /^(([^<>()$$$$\\.,;:\s@"]+(\.[^<>()$$$$\\.,;:\s@"]+)*)|(".+"))@(($$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

// Methods
const handleTabChange = (tab) => {
  activeLoginTab.value = tab
}

const switchToRegister = () => {
  isRegisterView.value = true
}

const switchToLogin = () => {
  isRegisterView.value = false
}

const sendLoginCode = async () => {
  try {
    await codeLoginFormRef.value?.validateField('email')

    // Simulate sending code
    user.sendVerifyCode(codeLoginForm.email)
        .then((res) => {
          if (res.data.code === 200) {
            ElMessage.success('验证码已发送至您的邮箱')
          }
        })
    loginCodeCountdown.value = 60
    loginCodeTimer = window.setInterval(() => {
      loginCodeCountdown.value--
      if (loginCodeCountdown.value <= 0) {
        clearInterval(loginCodeTimer)
        loginCodeTimer = null
      }
    }, 1000)

    ElMessage.success('验证码已发送至您的邮箱')
  } catch (error) {
    // Validation failed
  }
}

const sendRegisterCode = async () => {
  try {
    await registerFormRef.value?.validateField('email')

    // Simulate sending code
    registerCodeCountdown.value = 60
    user.sendVerifyCode(registerForm.email)
        .then((res) => {
          if (res.data.code === 200) {
            ElMessage.success('验证码已发送至您的邮箱')
          }
        })
    registerCodeTimer = window.setInterval(() => {
      registerCodeCountdown.value--
      if (registerCodeCountdown.value <= 0) {
        clearInterval(registerCodeTimer)
        registerCodeTimer = null
      }
    }, 1000)

  } catch (error) {
    // Validation failed
  }
}

const handlePasswordLogin = async () => {
  try {
    await passwordLoginFormRef.value?.validate()
    passwordLoginLoading.value = true

    // 登录前先清除旧数据
    clearAllUserData()

    let loginParams = {}
    if (isValidEmailStrict(passwordLoginForm.email)) {
      loginParams = {
        email: passwordLoginForm.email,
        username: "",
        password: passwordLoginForm.password
      }
    } else {
      loginParams = {
        email: "",
        username: passwordLoginForm.email,
        password: passwordLoginForm.password
      }
    }

    const res = await user.login(loginParams)

    if (res.code === 1000) {
      ElMessage.success('登录成功！')
      localStorage.setItem('token', res.data.data || res.data)

      // 获取用户信息并更新store
      const userRes = await getCurrentUser()
      if (userRes.code === 1000 && userRes.data) {
        // 使用store的方法更新用户信息
        userStore.updateUserInfo(userRes.data)
        userStore.setLoginStatus(true, userRes.data.id)
      }

      router.push({ path: '/' })
    } else {
      ElMessage.error(res.message || '登录失败')
    }

    passwordLoginLoading.value = false
  } catch (error) {
    passwordLoginLoading.value = false
    console.error('登录失败:', error)
  }
}

const handleCodeLogin = async () => {
  try {
    await codeLoginFormRef.value?.validate()
    codeLoginLoading.value = true

    // 登录前先清除旧数据
    clearAllUserData()

    const res = await user.verifyCodeLogin(codeLoginForm)

    if (res.code === 1000 || res.data?.code === 200) {
      ElMessage.success('登录成功！')
      const token = res.data?.data || res.data
      localStorage.setItem('token', token)

      // 获取用户信息并更新store
      const userRes = await getCurrentUser()
      if (userRes.code === 1000 && userRes.data) {
        userStore.updateUserInfo(userRes.data)
        userStore.setLoginStatus(true, userRes.data.id)
      }

      router.push({ path: '/' })
    } else {
      ElMessage.error(res.message || '登录失败')
    }

    codeLoginLoading.value = false
  } catch (error) {
    codeLoginLoading.value = false
    console.error('验证码登录失败:', error)
  }
}

const checkPasswordStrength = () => {
  const password = registerForm.password
  if (!password) {
    passwordStrengthClass.value = ''
    passwordStrengthText.value = ''
    return
  }

  let strength = 0
  if (password.length >= 8) strength++
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
  if (password.match(/\d/)) strength++
  if (password.match(/[^a-zA-Z\d]/)) strength++

  if (strength <= 1) {
    passwordStrengthClass.value = 'weak'
    passwordStrengthText.value = '密码强度：弱'
  } else if (strength <= 2) {
    passwordStrengthClass.value = 'medium'
    passwordStrengthText.value = '密码强度：中'
  } else {
    passwordStrengthClass.value = 'strong'
    passwordStrengthText.value = '密码强度：强'
  }
}

const handleRegister = async () => {
  try {
    await registerFormRef.value?.validate()
    registerLoading.value = true
    user.register(registerForm)
    .then((res) => {
      if (res.code === 1000) {
        ElMessage.success('注册成功！正在跳转...')
        registerFormRef.value?.resetFields()
        passwordStrengthClass.value = ''
        passwordStrengthText.value = ''
        switchToLogin()
      }
    })
  } catch (error) {
    registerLoading.value = false
  }
  registerLoading.value = false
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 20px;
  position: relative;
}

.auth-card {
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgba(59, 130, 246, 0.25);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-card::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(90deg, #3B82F6, #60A5FA, #93C5FD);
}

.login-card.slide-out {
  opacity: 0;
  transform: translateX(-30px);
  position: absolute;
  pointer-events: none;
}

.register-card {
  display: none;
}

.register-card.slide-in {
  display: block;
  animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.logo-section {
  text-align: center;
  padding: 32px 32px 24px;
}

.logo-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.4);
}

.title {
  font-size: 26px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #64748B;
}

.login-tabs {
  padding: 0 32px;
}

.login-tabs :deep(.el-tabs__header) {
  margin-bottom: 24px;
}

.login-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.login-tabs :deep(.el-tabs__item) {
  font-size: 15px;
  font-weight: 500;
  color: #64748B;
  padding: 0 16px;
}

.login-tabs :deep(.el-tabs__item.is-active) {
  color: #3B82F6;
  font-weight: 600;
}

.login-tabs :deep(.el-tabs__active-bar) {
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  height: 3px;
  border-radius: 2px;
}

.login-form,
.register-form {
  padding: 0 8px;
}

.login-form :deep(.el-form-item),
.register-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.login-form :deep(.el-input__wrapper),
.register-form :deep(.el-input__wrapper) {
  border-radius: 12px;
  padding: 4px 12px;
  box-shadow: 0 0 0 1px #E2E8F0 inset;
  transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover),
.register-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #CBD5E1 inset;
}

.login-form :deep(.el-input__wrapper.is-focus),
.register-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #3B82F6 inset;
}

.login-form :deep(.el-input__inner),
.register-form :deep(.el-input__inner) {
  font-size: 15px;
}

.login-form :deep(.el-input__inner::placeholder),
.register-form :deep(.el-input__inner::placeholder) {
  color: #94A3B8;
}

.submit-btn {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
  border: none;
  margin-top: 8px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.4);
}

.code-btn {
  font-size: 13px;
  color: #3B82F6;
  background: #EFF6FF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.code-btn:hover:not(:disabled) {
  background: #DBEAFE;
}

.code-btn:disabled {
  color: #94A3B8;
}

.password-strength {
  margin-top: -12px;
  margin-bottom: 16px;
  padding: 0 4px;
}

.strength-bar {
  height: 4px;
  background: #E2E8F0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  width: 33%;
  background: #EF4444;
}

.strength-fill.medium {
  width: 66%;
  background: #F59E0B;
}

.strength-fill.strong {
  width: 100%;
  background: #10B981;
}

.strength-text {
  font-size: 12px;
}

.strength-text.weak {
  color: #EF4444;
}

.strength-text.medium {
  color: #F59E0B;
}

.strength-text.strong {
  color: #10B981;
}

.switch-mode {
  text-align: center;
  padding: 20px 32px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748B;
}

.switch-mode :deep(.el-link) {
  font-weight: 600;
}

/* Responsive */
@media (max-width: 480px) {
  .auth-container {
    padding: 16px;
  }

  .logo-section {
    padding: 24px 24px 20px;
  }

  .logo-icon {
    width: 64px;
    height: 64px;
  }

  .title {
    font-size: 22px;
  }

  .login-tabs {
    padding: 0 20px;
  }

  .login-form,
  .register-form {
    padding: 0 4px;
  }
}
</style>
