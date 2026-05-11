<template>
  <div class="admin-categories">
    <!-- 分类管理 -->
    <el-card class="category-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">分类管理</span>
          <el-button type="primary" @click="openCategoryDialog()">
            <el-icon><Plus /></el-icon>
            添加分类
          </el-button>
        </div>
      </template>

      <div class="category-container">
        <el-tree
          :data="categoryTree"
          :props="treeProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div class="category-node">
              <div class="node-info">
                <span class="node-name">{{ data.name }}</span>
                <el-tag v-if="data.level === 1" size="small" type="primary">一级</el-tag>
                <el-tag v-else-if="data.level === 2" size="small" type="success">二级</el-tag>
                <el-tag v-else size="small" type="info">三级</el-tag>
              </div>
              <div class="node-actions">
                <el-tag :type="data.status === 1 ? 'success' : 'info'" size="small">
                  {{ data.status === 1 ? '启用' : '禁用' }}
                </el-tag>
                <span class="sort-info">排序：{{ data.sort || 0 }}</span>
                <el-button type="primary" link @click="editCategory(data)">编辑</el-button>
                <el-button type="success" link @click="addChildCategory(data)" v-if="data.level < 3">添加子分类</el-button>
                <el-button type="danger" link @click="deleteCategoryItem(data)">删除</el-button>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </el-card>

    <!-- 品牌管理 -->
    <el-card class="brand-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">品牌管理</span>
          <el-button type="primary" @click="openBrandDialog()">
            <el-icon><Plus /></el-icon>
            添加品牌
          </el-button>
        </div>
      </template>

      <el-table :data="brandList" v-loading="loading" style="width: 100%">
        <el-table-column prop="logo" label="品牌Logo" width="100">
          <template #default="{ row }">
            <img :src="row.logo" alt="" class="brand-logo" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" width="150" />
        <el-table-column prop="category" label="所属类目" width="120" />
        <el-table-column prop="productCount" label="商品数" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" @change="toggleBrandStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="editBrand(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteBrand(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分类编辑弹窗 -->
    <el-dialog v-model="categoryDialogVisible" :title="editingCategory ? '编辑分类' : '添加分类'" width="500px">
      <el-form :model="categoryForm" label-width="80px">
        <el-form-item label="分类名称" required>
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="上级分类">
          <el-cascader
            v-model="categoryForm.parentId"
            :options="categoryOptions"
            :props="{ checkStrictly: true, value: 'id', label: 'name' }"
            placeholder="请选择上级分类"
            clearable
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="分类图标">
          <el-upload 
            action="#" 
            :auto-upload="false" 
            :show-file-list="false"
            :on-change="handleIconUpload"
            accept="image/*"
          >
            <el-button :loading="uploadingIcon">{{ categoryForm.icon ? '重新上传' : '上传图标' }}</el-button>
            <img v-if="categoryForm.icon" :src="categoryForm.icon" alt="图标预览" class="icon-preview" />
          </el-upload>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload 
            action="#" 
            :auto-upload="false" 
            :show-file-list="false"
            accept="image/*"
          >
            <el-button>上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="categoryForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="categoryForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="categoryDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCategory">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 品牌编辑弹窗 -->
    <el-dialog v-model="brandDialogVisible" :title="editingBrand ? '编辑品牌' : '添加品牌'" width="500px">
      <el-form :model="brandForm" label-width="80px">
        <el-form-item label="品牌名称" required>
          <el-input v-model="brandForm.name" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="所属类目" required>
          <el-select v-model="brandForm.category" placeholder="请选择类目" style="width: 100%">
            <el-option label="数码电子" value="electronics" />
            <el-option label="服饰服装" value="clothing" />
            <el-option label="家居生活" value="home" />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌Logo">
          <el-upload action="#" :auto-upload="false" :show-file-list="false">
            <el-button>上传Logo</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input v-model="brandForm.description" type="textarea" :rows="3" placeholder="请输入品牌描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="brandDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveBrand">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadFile } from "../../api/modules/file.js"
import {
  getCategoryTree,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
  updateCategorySort
} from "../../api/modules/category.js"

const loading = ref(false)

// 分类树（从 API 获取）
const categoryTree = ref([])

const treeProps = {
  children: 'children',
  label: 'name'
}

// 分类选项（用于级联选择）
const categoryOptions = ref([])

// 加载分类树
const loadCategoryTree = async () => {
  loading.value = true
  try {
    const res = await getCategoryTree()
    if (res.code === 1000 && res.data) {
      categoryTree.value = res.data
      // 转换为级联选择器格式
      categoryOptions.value = convertToCascaderOptions(res.data)
    } else {
      ElMessage.error(res.message || '加载分类失败')
    }
  } catch (error) {
    console.error('加载分类树失败:', error)
    ElMessage.error('加载分类失败')
  } finally {
    loading.value = false
  }
}

// 转换为级联选择器格式
const convertToCascaderOptions = (categories) => {
  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    children: cat.children ? convertToCascaderOptions(cat.children) : []
  }))
}

// 品牌列表（暂保留模拟数据，待后端API补充）
const brandList = ref([
  { id: 1, name: 'Apple', logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100', category: '数码电子', productCount: 156, status: true },
  { id: 2, name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100', category: '服饰服装', productCount: 89, status: true },
  { id: 3, name: 'Dyson', logo: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100', category: '家居生活', productCount: 34, status: true }
])

// 分类弹窗
const categoryDialogVisible = ref(false)
const editingCategory = ref(null)
const uploadingIcon = ref(false)
const categoryForm = reactive({
  name: '',
  parentId: [],
  icon: '',
  image: '',
  sort: 0,
  status: 1
})

// 处理图标上传
const handleIconUpload = async (file) => {
  uploadingIcon.value = true
  try {
    const formData = new FormData()
    formData.append('file', file.raw)
    formData.append('fileName', file.name)
    
    const res = await uploadFile(formData)
    if (res.code === 1000 && res.data) {
      categoryForm.icon = res.data
      ElMessage.success('图标上传成功')
    } else {
      throw new Error(res.message || '上传失败')
    }
  } catch (error) {
    console.error('图标上传失败:', error)
    ElMessage.error(error.message || '图标上传失败')
  } finally {
    uploadingIcon.value = false
  }
}

// 品牌弹窗
const brandDialogVisible = ref(false)
const editingBrand = ref(null)
const brandForm = reactive({
  name: '',
  category: '',
  description: ''
})

// 打开分类弹窗
const openCategoryDialog = (parent = null) => {
  editingCategory.value = null
  Object.assign(categoryForm, {
    name: '',
    parentId: parent ? [parent.id] : [],
    icon: '',
    image: '',
    sort: 0,
    status: 1
  })
  categoryDialogVisible.value = true
}

// 编辑分类
const editCategory = (category) => {
  editingCategory.value = category
  Object.assign(categoryForm, {
    name: category.name,
    parentId: category.parentId ? [category.parentId] : [],
    icon: category.icon || '',
    image: category.image || '',
    sort: category.sort || 0,
    status: category.status !== undefined ? category.status : 1
  })
  categoryDialogVisible.value = true
}

// 添加子分类
const addChildCategory = (parent) => {
  openCategoryDialog(parent)
}

// 保存分类
const saveCategory = async () => {
  if (!categoryForm.name) {
    ElMessage.warning('请输入分类名称')
    return
  }

  loading.value = true
  try {
    // 计算层级
    const level = categoryForm.parentId && categoryForm.parentId.length > 0 
      ? getParentLevel(categoryForm.parentId[categoryForm.parentId.length - 1]) + 1 
      : 1

    const submitData = {
      name: categoryForm.name,
      parentId: categoryForm.parentId && categoryForm.parentId.length > 0 
        ? categoryForm.parentId[categoryForm.parentId.length - 1] 
        : 0,
      level: level,
      icon: categoryForm.icon,
      image: categoryForm.image,
      sort: categoryForm.sort,
      status: categoryForm.status ? 1 : 0
    }

    let res
    if (editingCategory.value) {
      // 更新分类
      res = await updateCategory(editingCategory.value.id, submitData)
    } else {
      // 创建分类
      res = await addCategory(submitData)
    }

    if (res.code === 1000) {
      ElMessage.success(editingCategory.value ? '分类更新成功' : '分类添加成功')
      categoryDialogVisible.value = false
      loadCategoryTree() // 重新加载分类树
    } else {
      throw new Error(res.message || '保存失败')
    }
  } catch (error) {
    console.error('保存分类失败:', error)
    ElMessage.error(error.message || '保存失败')
  } finally {
    loading.value = false
  }
}

// 获取父分类的层级
const getParentLevel = (parentId) => {
  const findCategory = (categories, id) => {
    for (const cat of categories) {
      if (cat.id === id) return cat
      if (cat.children) {
        const found = findCategory(cat.children, id)
        if (found) return found
      }
    }
    return null
  }
  
  const parent = findCategory(categoryTree.value, parentId)
  return parent ? parent.level || 1 : 0
}

// 删除分类
const deleteCategoryItem = async (category) => {
  try {
    await ElMessageBox.confirm(`确定要删除分类 "${category.name}" 吗？删除后无法恢复！`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    loading.value = true
    const res = await deleteCategory(category.id)
    if (res.code === 1000) {
      ElMessage.success('删除成功')
      loadCategoryTree() // 重新加载分类树
    } else {
      throw new Error(res.message || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除分类失败:', error)
      ElMessage.error(error.message || '删除失败')
    }
  } finally {
    loading.value = false
  }
}

// 打开品牌弹窗
const openBrandDialog = (brand = null) => {
  editingBrand.value = brand
  if (brand) {
    Object.assign(brandForm, {
      name: brand.name,
      category: brand.category,
      description: ''
    })
  } else {
    Object.assign(brandForm, {
      name: '',
      category: '',
      description: ''
    })
  }
  brandDialogVisible.value = true
}

// 编辑品牌
const editBrand = (brand) => {
  openBrandDialog(brand)
}

// 保存品牌
const saveBrand = () => {
  if (!brandForm.name) {
    ElMessage.warning('请输入品牌名称')
    return
  }
  if (!brandForm.category) {
    ElMessage.warning('请选择所属类目')
    return
  }
  // TODO: 调用后端API保存品牌
  ElMessage.success(editingBrand.value ? '品牌更新成功' : '品牌添加成功')
  brandDialogVisible.value = false
}

// 切换品牌状态
const toggleBrandStatus = (brand) => {
  // TODO: 调用后端API更新品牌状态
  ElMessage.success(brand.status ? '品牌已启用' : '品牌已禁用')
}

// 删除品牌
const deleteBrand = async (brand) => {
  try {
    await ElMessageBox.confirm(`确定要删除品牌 "${brand.name}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // TODO: 调用后端API删除品牌
    const index = brandList.value.findIndex(b => b.id === brand.id)
    if (index > -1) {
      brandList.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
  } catch {}
}

// 初始加载
onMounted(() => {
  loadCategoryTree()
})
</script>

<style scoped lang="scss">
.admin-categories {
  .category-card {
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

    .category-container {
      .category-node {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-right: 8px;

        .node-info {
          display: flex;
          align-items: center;
          gap: 8px;

          .node-name {
            font-size: 14px;
            color: #303133;
          }
        }

        .node-actions {
          display: flex;
          align-items: center;
          gap: 8px;

          .sort-info {
            font-size: 12px;
            color: #909399;
            margin-right: 8px;
          }
        }
      }
    }
  }

  .brand-card {
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

    .brand-logo {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
}

.unit {
  margin-left: 8px;
  color: #909399;
}

.icon-preview {
  width: 50px;
  height: 50px;
  margin-left: 12px;
  border-radius: 4px;
  object-fit: cover;
  vertical-align: middle;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
