<template>
  <el-dialog
    v-model="dialogVisible"
    title="商品评价"
    width="600px"
    :close-on-click-modal="false"
    class="review-dialog"
    @close="handleClose"
  >
    <!-- 商品信息 -->
    <div class="product-preview">
      <img :src="productInfo.image" :alt="productInfo.name" class="product-image" />
      <div class="product-info">
        <h4 class="product-name">{{ productInfo.name }}</h4>
        <p class="product-desc">{{ productInfo.description }}</p>
      </div>
    </div>

    <el-divider />

    <!-- 评价表单 -->
    <el-form :model="reviewForm" :rules="reviewRules" ref="reviewFormRef" label-position="top">
      <!-- 评分 -->
      <el-form-item label="商品评分" prop="rating">
        <div class="rating-container">
          <el-rate
            v-model="reviewForm.rating"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            show-text
            :texts="['非常差', '比较差', '一般', '比较好', '非常好']"
            size="large"
          />
        </div>
      </el-form-item>

      <!-- 评价内容 -->
      <el-form-item label="评价内容" prop="comment">
        <el-input
          v-model="reviewForm.comment"
          type="textarea"
          :rows="4"
          placeholder="分享您的使用体验，帮助其他买家了解商品"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <!-- 上传图片 -->
      <el-form-item label="上传图片（可选）">
        <el-upload
          v-model:file-list="reviewForm.images"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="5"
          accept="image/*"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div class="upload-tip">最多上传5张图片，支持jpg、png格式</div>
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">
          提交评价
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  productInfo: {
    type: Object,
    default: () => ({})
  },
  orderId: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:visible', 'submit'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const reviewFormRef = ref(null)
const submitting = ref(false)

const reviewForm = ref({
  rating: 5,
  comment: '',
  images: []
})

const reviewRules = {
  rating: [
    { required: true, message: '请选择商品评分', trigger: 'change' }
  ],
  comment: [
    { required: true, message: '请填写评价内容', trigger: 'blur' },
    { min: 5, message: '评价内容至少5个字', trigger: 'blur' }
  ]
}

// 监听弹窗打开，重置表单
watch(() => props.visible, (val) => {
  if (val) {
    reviewForm.value = {
      rating: 5,
      comment: '',
      images: []
    }
    reviewFormRef.value?.clearValidate()
  }
})

const handleClose = () => {
  dialogVisible.value = false
}

const handleSubmit = async () => {
  if (!reviewFormRef.value) return

  await reviewFormRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true

      // 模拟提交
      setTimeout(() => {
        ElMessage.success('评价提交成功！感谢您的反馈')
        emit('submit', {
          orderId: props.orderId,
          productId: props.productInfo.id,
          rating: reviewForm.value.rating,
          comment: reviewForm.value.comment,
          images: reviewForm.value.images
        })
        submitting.value = false
        handleClose()
      }, 1000)
    }
  })
}
</script>

<style scoped lang="scss">
.review-dialog {
  :deep(.el-dialog__header) {
    background: #f5f7fa;
    margin-right: 0;
    padding: 16px 20px;

    .el-dialog__title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }

  :deep(.el-dialog__body) {
    padding: 20px;
  }
}

.product-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-info {
    flex: 1;

    .product-name {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }

    .product-desc {
      margin: 0;
      font-size: 14px;
      color: #909399;
    }
  }
}

.rating-container {
  padding: 8px 0;

  :deep(.el-rate) {
    height: auto;

    .el-rate__icon {
      font-size: 28px;
      margin-right: 6px;
    }

    .el-rate__text {
      font-size: 14px;
      margin-left: 12px;
      color: #606266;
    }
  }
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
