<template>
  <div class="merchant-products">
    <!-- 操作栏 -->
    <el-card class="filter-card" shadow="hover">
      <div class="filter-bar">
        <div class="filter-left">
          <el-input
            v-model="searchQuery"
            placeholder="搜索商品名称"
            clearable
            style="width: 240px"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select v-model="categoryFilter" placeholder="选择分类" clearable style="width: 160px">
            <el-option
              v-for="cat in categoryOptions"
              :key="cat.value"
              :label="cat.label"
              :value="cat.value"
            />
          </el-select>
          <el-select v-model="statusFilter" placeholder="商品状态" clearable style="width: 120px">
            <el-option label="在售" value="active" />
            <el-option label="已下架" value="inactive" />
            <el-option label="待审核" value="pending" />
          </el-select>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
        <div class="filter-right">
          <el-button type="primary" @click="openProductDialog()">
            <el-icon><Plus /></el-icon>
            发布商品
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 商品列表 -->
    <el-card class="table-card" shadow="hover">
      <el-table :data="productList" v-loading="loading" style="width: 100%">
        <el-table-column prop="image" label="商品图片" width="100">
          <template #default="{ row }">
            <el-image
              :src="row.image"
              :preview-src-list="[row.image]"
              fit="cover"
              style="width: 60px; height: 60px; border-radius: 4px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="200">
          <template #default="{ row }">
            <div class="product-name">{{ row.name }}</div>
            <div class="product-desc">{{ row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="price" label="价格" width="100">
          <template #default="{ row }">
            <span class="price">¥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="80" />
        <el-table-column prop="sales" label="销量" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openProductDialog(row)">编辑</el-button>
            <el-button type="primary" link @click="toggleProductStatus(row)">
              {{ row.status === 'active' ? '下架' : '上架' }}
            </el-button>
            <el-button type="danger" link @click="deleteProduct(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 商品编辑弹窗 -->
    <el-dialog
      v-model="productDialogVisible"
      :title="editingProduct ? '编辑商品' : '发布商品'"
      width="900px"
      :close-on-click-modal="false"
      class="product-dialog"
    >
      <el-tabs v-model="activeTab">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="basic">
          <el-form :model="productForm" label-width="100px" class="product-form">
            <el-form-item label="商品名称" required>
              <el-input v-model="productForm.name" placeholder="请输入商品名称" maxlength="60" show-word-limit />
            </el-form-item>
            <el-form-item label="商品分类" required>
              <el-cascader
                v-model="productForm.category"
                :options="categoryOptions"
                :props="{ checkStrictly: true }"
                placeholder="请选择商品分类"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="商品卖点">
              <el-input v-model="productForm.subtitle" placeholder="请输入商品卖点" maxlength="100" show-word-limit />
            </el-form-item>
            <el-form-item label="商品价格" required>
              <el-input-number v-model="productForm.price" :min="0" :precision="2" style="width: 200px" />
              <span class="unit">元</span>
            </el-form-item>
            <el-form-item label="商品库存" required>
              <el-input-number v-model="productForm.stock" :min="0" :precision="0" style="width: 200px" />
              <span class="unit">件</span>
            </el-form-item>
            <el-form-item label="商品状态">
              <el-radio-group v-model="productForm.status">
                <el-radio label="active">立即上架</el-radio>
                <el-radio label="inactive">放入仓库</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 商品规格 -->
        <el-tab-pane label="商品规格" name="specs">
          <div class="specs-section">
            <div class="specs-header">
              <el-button type="primary" size="small" @click="addSpec">
                <el-icon><Plus /></el-icon>
                添加规格
              </el-button>
            </div>
            <div v-for="(spec, index) in productForm.specs" :key="index" class="spec-item">
              <div class="spec-header">
                <el-input v-model="spec.name" placeholder="规格名称，如：颜色" style="width: 150px" />
                <el-button type="danger" link @click="removeSpec(index)">删除</el-button>
              </div>
              <div class="spec-values">
                <el-tag
                  v-for="(value, vIndex) in spec.values"
                  :key="vIndex"
                  closable
                  @close="removeSpecValue(index, vIndex)"
                  class="spec-tag"
                >
                  {{ value }}
                </el-tag>
                <el-input
                  v-if="spec.valueInputVisible"
                  v-model="spec.valueInput"
                  ref="specValueInput"
                  size="small"
                  style="width: 100px"
                  @keyup.enter="addSpecValue(index)"
                  @blur="addSpecValue(index)"
                />
                <el-button v-else type="primary" link size="small" @click="showSpecValueInput(index)">
                  <el-icon><Plus /></el-icon> 添加值
                </el-button>
              </div>
            </div>

            <!-- SKU表格 -->
            <div v-if="productForm.specs.length > 0" class="sku-table-section">
              <div class="sku-header">
                <span class="sku-title">SKU列表</span>
                <el-button type="primary" size="small" @click="generateSku">生成SKU</el-button>
              </div>
              <el-table :data="productForm.skus" border style="width: 100%">
                <el-table-column v-for="spec in productForm.specs" :key="spec.name" :label="spec.name" width="120">
                  <template #default="{ row }">
                    {{ row[spec.name] }}
                  </template>
                </el-table-column>
                <el-table-column label="价格" width="120">
                  <template #default="{ row }">
                    <el-input-number v-model="row.price" :min="0" :precision="2" size="small" controls-position="right" />
                  </template>
                </el-table-column>
                <el-table-column label="库存" width="120">
                  <template #default="{ row }">
                    <el-input-number v-model="row.stock" :min="0" size="small" controls-position="right" />
                  </template>
                </el-table-column>
                <el-table-column label="SKU编码" min-width="150">
                  <template #default="{ row }">
                    <el-input v-model="row.skuCode" size="small" placeholder="请输入SKU编码" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <!-- 商品图片 -->
        <el-tab-pane label="商品图片" name="images">
          <div class="image-upload-section">
            <el-upload
              v-model:file-list="productForm.images"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :limit="10"
              accept="image/*"
              :on-change="handleImageChange"
              :on-remove="handleImageRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">最多上传10张图片，建议尺寸800x800像素，第一张为主图</div>
          </div>
        </el-tab-pane>

        <!-- 商品详情 -->
        <el-tab-pane label="商品详情" name="detail">
          <div class="detail-section">
            <el-input
              v-model="productForm.description"
              type="textarea"
              :rows="10"
              placeholder="请输入商品详细描述"
              maxlength="5000"
              show-word-limit
            />
          </div>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="productDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProduct" :loading="saving">
            保存商品
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { uploadFile, deleteFile } from "../../api/modules/file.js"
import {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategoryList
} from "../../api/modules/product.js"

const route = useRoute()

// 搜索和筛选
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 商品列表数据
const productList = ref([])

// 商品编辑弹窗
const productDialogVisible = ref(false)
const editingProduct = ref(null)
const activeTab = ref('basic')
const saving = ref(false)

// 商品表单
const productForm = reactive({
  name: '',
  category: [],
  subtitle: '',
  brand: '',
  price: 0,
  stock: 0,
  status: 'active',
  specs: [],
  skus: [],
  images: [],
  description: ''
})

// 分类选项（从 API 获取）
const categoryOptions = ref([])

// 加载分类列表
const loadCategories = async () => {
  try {
    const res = await getCategoryList()
    if (res.code === 1000 && res.data) {
      // 转换数据格式为 cascader 所需格式
      categoryOptions.value = res.data.map(cat => ({
        value: cat.id,
        label: cat.name,
        children: cat.children?.map(child => ({
          value: child.id,
          label: child.name
        })) || []
      }))
    }
  } catch (error) {
    console.error('加载分类失败:', error)
  }
}
const handleImageChange = (file, fileList) => {
  // 仅做前端校验，实际上传逻辑移至保存时执行
  const isImage = file.raw?.type.startsWith('image/')
  if (!isImage) {
    ElMessage.warning('只能上传图片格式文件!')
    return false
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.warning('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 处理图片移除
const handleImageRemove = async (file) => {
  // 如果图片已经上传（有url属性且不是本地预览），则调用删除接口
  if (file.url && !file.raw) {
    try {
      // 从URL中提取文件名
      const fileName = file.url.split('/').pop()
      if (fileName) {
        await deleteFile(fileName)
        ElMessage.success('图片已删除')
      }
    } catch (error) {
      console.error('删除图片失败:', error)
      ElMessage.warning('删除服务器图片失败，但已从列表中移除')
    }
  }
}
// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    active: 'success',
    inactive: 'info',
    pending: 'warning'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    active: '在售',
    inactive: '已下架',
    pending: '待审核'
  }
  return textMap[status] || '未知'
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  loadProducts()
}

// 加载商品
const loadProducts = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value || undefined,
      categoryId: categoryFilter.value || undefined,
      publishStatus: statusFilter.value === 'active' ? 1 :
                     statusFilter.value === 'inactive' ? 0 : undefined
    }

    const res = await getProductList(params)
    if (res.code === 1000 && res.data) {
      // 适配接口返回的数据结构
      productList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.subName || '',
        category: item.categoryName || '',
        categoryId: item.categoryId,
        price: item.price,
        originalPrice: item.originalPrice,
        stock: item.stock,
        sales: item.soldCount || 0,
        status: item.publishStatus === 1 ? 'active' : 'inactive',
        image: item.image,
        images: item.images || [],
        isHot: item.isHot === 1,
        isFeatured: item.isFeatured === 1,
        isNew: item.isNew === 1
      }))
      total.value = res.data.totalElements || 0
    } else {
      ElMessage.error(res.message || '加载商品列表失败')
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
    ElMessage.error('加载商品列表失败')
  } finally {
    loading.value = false
  }
}

// 分页变化
const handleSizeChange = (size) => {
  pageSize.value = size
  loadProducts()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  loadProducts()
}

// 打开商品编辑弹窗
const openProductDialog = (product = null) => {
  editingProduct.value = product
  activeTab.value = 'basic'

  if (product) {
    Object.assign(productForm, {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId || null,
      category: product.categoryId ? [product.categoryId] : [],
      subtitle: product.description || '',
      brand: '',
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      status: product.status,
      specs: [],
      skus: [],
      images: product.images?.map(url => ({ url })) || [],
      description: ''
    })
  } else {
    Object.assign(productForm, {
      id: null,
      name: '',
      categoryId: null,
      category: [],
      subtitle: '',
      brand: '',
      price: 0,
      originalPrice: 0,
      stock: 0,
      status: 'active',
      specs: [],
      skus: [],
      images: [],
      description: ''
    })
  }

  productDialogVisible.value = true
}

// 添加规格
const addSpec = () => {
  productForm.specs.push({
    name: '',
    values: [],
    valueInputVisible: false,
    valueInput: ''
  })
}

// 删除规格
const removeSpec = (index) => {
  productForm.specs.splice(index, 1)
}

// 显示规格值输入框
const showSpecValueInput = (index) => {
  productForm.specs[index].valueInputVisible = true
}

// 添加规格值
const addSpecValue = (index) => {
  const spec = productForm.specs[index]
  if (spec.valueInput && !spec.values.includes(spec.valueInput)) {
    spec.values.push(spec.valueInput)
  }
  spec.valueInputVisible = false
  spec.valueInput = ''
}

// 删除规格值
const removeSpecValue = (specIndex, valueIndex) => {
  productForm.specs[specIndex].values.splice(valueIndex, 1)
}

// 生成SKU
const generateSku = () => {
  if (productForm.specs.length === 0) return

  const combinations = productForm.specs[0].values.map(v => ({ [productForm.specs[0].name]: v }))

  if (productForm.specs.length > 1) {
    const newCombinations = []
    for (const c of combinations) {
      for (const v of productForm.specs[1].values) {
        newCombinations.push({ ...c, [productForm.specs[1].name]: v })
      }
    }
    productForm.skus = newCombinations.map(c => ({
      ...c,
      price: productForm.price,
      stock: productForm.stock,
      skuCode: ''
    }))
  } else {
    productForm.skus = combinations.map(c => ({
      ...c,
      price: productForm.price,
      stock: productForm.stock,
      skuCode: ''
    }))
  }
  console.log(productForm.skus)
  ElMessage.success(`已生成 ${productForm.skus.length} 个SKU`)
}

// 保存商品
const saveProduct = async () => {
  if (!productForm.name) {
    ElMessage.warning('请输入商品名称')
    return
  }
  if (!productForm.categoryId && (!productForm.category || productForm.category.length === 0)) {
    ElMessage.warning('请选择商品分类')
    return
  }
  if (!productForm.price) {
    ElMessage.warning('请输入商品价格')
    return
  }
  if (!productForm.stock) {
    ElMessage.warning('请输入商品库存')
    return
  }
  if (productForm.specs.length > 0 && productForm.skus.length === 0) {
    ElMessage.warning('请生成SKU')
    return
  }
  if (productForm.images.length < 3) {
    ElMessage.warning('请至少上传三张商品图片')
    return
  }
  if (!productForm.description) {
    ElMessage.warning('请输入商品描述')
    return
  }

  saving.value = true
  try {
    // 1. 批量上传图片
    const imageUrls = []
    for (const file of productForm.images) {
      // 如果是新选择的文件 (包含 raw 属性)，则调用上传接口
      if (file.raw) {
        const formData = new FormData()
        formData.append('file', file.raw)
        formData.append('fileName', file.name || `image_${Date.now()}`)

        const res = await uploadFile(formData)

        if (res.code === 1000 && res.data) {
          // 假设接口返回的是文件URL字符串
          imageUrls.push(res.data)
        } else {
          throw new Error(res.message || `图片 ${file.name} 上传失败`)
        }
      } else if (file.url) {
        // 已上传过的图片（回显数据）直接使用
        imageUrls.push(file.url)
      }
    }

    if (imageUrls.length === 0) {
      throw new Error('请至少上传一张图片')
    }

    // 2. 组装最终提交数据
    const submitData = {
      name: productForm.name,
      subName: productForm.subtitle,
      categoryId: productForm.categoryId || (productForm.category && productForm.category.length > 0 ? productForm.category[productForm.category.length - 1] : null),
      image: imageUrls[0] || '',
      images: imageUrls , // 接口要求是对象格式
      price: productForm.price,
      originalPrice: productForm.originalPrice || productForm.price,
      costPrice: 0,
      stock: productForm.stock,
      description: productForm.description,
      detail: productForm.description,
      isHot: 0,
      isFeatured: 0,
      isNew: 0,
      publishStatus: productForm.status === 'active' ? 1 : 0,
      tags: '',
      keywords: '',
      specs: productForm.specs.map((spec, specIndex) => ({
        id: 0, // 新建时默认为0，后端会生成
        name: spec.name,
        sort: specIndex,
        values: spec.values.map((value, valueIndex) => ({
          id: 0, // 新建时默认为0，后端会生成
          value: value,
          sort: valueIndex
        }))
      })),
      skus: productForm.skus.map((sku, skuIndex) => ({
        id: 0, // 新建时默认为0，后端会生成
        skuCode: sku.skuCode || '',
        specs: {}, // 规格映射对象，根据实际业务需求填充
        price: sku.price,
        originalPrice: sku.price,
        stock: sku.stock,
        lowStock: 0,
        image: '',
        status: 1
      }))
    }

    let res
    if (editingProduct.value) {
      // 更新商品
      submitData.id = editingProduct.value.id
      res = await updateProduct(editingProduct.value.id, submitData)
    } else {
      // 创建商品
      res = await addProduct(submitData)
    }

    if (res.code === 1000) {
      ElMessage.success(editingProduct.value ? '商品更新成功' : '商品发布成功')
      productDialogVisible.value = false
      loadProducts() // 重新加载列表
    } else {
      throw new Error(res.message || '保存失败')
    }
  } catch (error) {
    console.error('保存商品失败:', error)
    ElMessage.error(error.message || '保存失败')
  } finally {
    saving.value = false
  }
}

// 上下架
const toggleProductStatus = async (product) => {
  const action = product.status === 'active' ? '下架' : '上架'
  try {
    await ElMessageBox.confirm(`确定要${action}该商品吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    // 调用更新接口修改状态
    const updateData = {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      price: product.price,
      stock: product.stock,
      publishStatus: product.status === 'active' ? 0 : 1
    }

    const res = await updateProduct(product.id, updateData)
    if (res.code === 1000) {
      product.status = product.status === 'active' ? 'inactive' : 'active'
      ElMessage.success(`${action}成功`)
      loadProducts() // 重新加载列表
    } else {
      throw new Error(res.message || `${action}失败`)
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(`${action}失败:`, error)
      ElMessage.error(error.message || `${action}失败`)
    }
  }
}

// 删除商品
const deleteProductItem = async (product) => {
  try {
    await ElMessageBox.confirm(`确定要删除 "${product.name}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const res = await deleteProduct(product.id)
    if (res.code === 1000) {
      ElMessage.success('删除成功')
      loadProducts() // 重新加载列表
    } else {
      throw new Error(res.message || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除商品失败:', error)
      ElMessage.error(error.message || '删除失败')
    }
  }
}

// 初始加载
onMounted(() => {
  loadCategories()
  loadProducts()

  // 检查URL参数
  if (route.query.action === 'add') {
    openProductDialog()
  }
})
</script>

<style scoped lang="scss">
.merchant-products {
  .filter-card {
    margin-bottom: 20px;

    .filter-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .filter-left {
        display: flex;
        gap: 12px;
        align-items: center;
      }
    }
  }

  .table-card {
    .product-name {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
    }

    .product-desc {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
    }

    .price {
      color: #f56c6c;
      font-weight: 600;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.product-dialog {
  :deep(.el-dialog__body) {
    padding: 20px;
  }

  .product-form {
    .unit {
      margin-left: 8px;
      color: #909399;
    }
  }

  .specs-section {
    .specs-header {
      margin-bottom: 16px;
    }

    .spec-item {
      background: #f5f7fa;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 16px;

      .spec-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .spec-values {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;

        .spec-tag {
          margin: 0;
        }
      }
    }

    .sku-table-section {
      margin-top: 20px;

      .sku-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .sku-title {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
        }
      }
    }
  }

  .image-upload-section {
    .upload-tip {
      margin-top: 12px;
      font-size: 12px;
      color: #909399;
    }
  }

  .detail-section {
    min-height: 300px;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
