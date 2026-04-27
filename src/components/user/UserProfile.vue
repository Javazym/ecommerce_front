<template>
  <div class="user-profile">
    <h2 class="section-title">个人信息</h2>

    <el-form :model="userForm" label-width="100px" class="profile-form">
      <el-form-item label="用户头像">
        <div class="avatar-upload">
          <el-avatar :size="80" :src="userForm.avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarChange"
          >
            <el-button size="small" type="primary">更换头像</el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="userForm.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="昵称">
        <el-input v-model="userForm.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="userForm.gender">
          <el-radio :label="1" >男</el-radio>
          <el-radio :label="0" >女</el-radio>
          <el-radio :label="3" >保密</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生日">
        <el-date-picker
          v-model="userForm.birthday"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="userForm.email" placeholder="请输入邮箱">
          <template #append>
            <el-button @click="handleModifyEmail">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSaveProfile" :loading="saving">保存修改</el-button>
        <el-button @click="handleResetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改邮箱对话框 -->
    <el-dialog v-model="emailDialogVisible" title="修改邮箱" width="400px">
      <el-form :model="emailForm" :rules="emailRules" ref="emailFormRef" label-width="80px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="emailForm.email" placeholder="请输入新邮箱" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="emailForm.code" placeholder="请输入验证码">
            <template #append>
              <el-button @click="sendEmailCode" :disabled="emailCodeSending">
                {{ emailCodeSending ? `${emailCodeCountdown}s后重发` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="emailDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEmailChange">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import userStore from '../../stores/userStore'
import {updateUser} from "../../api/modules/user.js";
import {uploadFile} from "../../api/modules/file.js";

// 保存状态
const saving = ref(false)

// 用户表单
const userForm = reactive({
  username: '',
  nickname: '',
  avatar: '',
  gender: 1,
  birthday: '',
  email: '',
})

// 复制用户信息到表单
onMounted(() => {
  Object.assign(userForm, userStore.userInfo)
})

// 监听用户信息变化
watch(
  () => userStore.userInfo,
  (newInfo) => {
    Object.assign(userForm, newInfo)
  },
  { deep: true }
)


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

// 保存个人信息
const handleSaveProfile = async () => {
  saving.value = true
  await updateUser(userForm).then(res => {
    if (res.code === 1000)
      ElMessage.success('个人信息保存成功')

  }).catch(error => {
    ElMessage.error('保存失败，请重试')
  })

  // 更新store
  userStore.updateUserInfo({
    username: userForm.username,
    nickname: userForm.nickname,
    avatar: userForm.avatar,
    gender: userForm.gender,
    birthday: userForm.birthday,
    email: userForm.email,
  })
  saving.value = false
}

// 重置表单
const handleResetForm = () => {
  Object.assign(userForm, userStore.userInfo)
}


// 修改邮箱
const handleModifyEmail = () => {
  emailForm.email = ''
  emailForm.code = ''
  emailDialogVisible.value = true
}

// 发送邮箱验证码
const sendEmailCode = () => {
  if (!emailForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email)) {
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

// 确认修改邮箱
const confirmEmailChange = async () => {
  if (!emailForm.code) {
    ElMessage.warning('请输入验证码')
    return
  }

  // 模拟验证
  await new Promise((resolve) => setTimeout(resolve, 500))

  userStore.updateUserInfo({ email: emailForm.email })
  ElMessage.success('邮箱修改成功')
  emailDialogVisible.value = false
  clearInterval(emailTimer)
}

// 头像上传
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
      const avatarUrl = res.data
      userForm.avatar = avatarUrl
      userStore.updateAvatar(avatarUrl)
      ElMessage.success('头像上传成功')
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped lang="scss">
.user-profile {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 24px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .profile-form {
    max-width: 600px;
  }

  .avatar-upload {
    display: flex;
    align-items: center;
    gap: 20px;

    .avatar-uploader {
      .el-button {
        margin-top: 10px;
      }
    }
  }
}
</style>
