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
      width="1000px"
      :close-on-click-modal="false"
      class="product-dialog"
      destroy-on-close
    >
      <el-tabs v-model="activeTab" type="border-card" class="custom-tabs">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="basic">
          <div class="form-section">
            <div class="section-title">
              <el-icon><Document /></el-icon>
              <span>基本信息</span>
            </div>
            <el-form :model="productForm" label-width="100px" class="product-form">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="商品名称" required>
                    <el-input 
                      v-model="productForm.name" 
                      placeholder="请输入商品名称" 
                      maxlength="60" 
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品分类" required>
                    <el-cascader
                      v-model="productForm.category"
                      :options="categoryOptions"
                      :props="{ checkStrictly: true, value: 'value', label: 'label', children: 'children' }"
                      placeholder="请选择商品分类"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="商品卖点">
                <el-input 
                  v-model="productForm.subtitle" 
                  type="textarea"
                  :rows="3"
                  placeholder="请输入商品卖点，突出商品特色和优势，吸引用户购买" 
                  maxlength="200" 
                  show-word-limit
                  class="subtitle-input"
                />
              </el-form-item>
              
              <el-divider content-position="left" class="section-divider">
                <span class="divider-text">
                  <el-icon><Coin /></el-icon>
                  <span>价格与库存</span>
                </span>
              </el-divider>
              
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="商品价格" required>
                    <el-input-number 
                      v-model="productForm.price" 
                      :min="0.01" 
                      :precision="2" 
                      :step="0.1"
                      controls-position="right"
                      style="width: 100%" 
                    />
                    <div class="form-tip">单位：元</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商品库存" required>
                    <el-input-number 
                      v-model="productForm.stock" 
                      :min="0" 
                      :precision="0" 
                      :step="1"
                      controls-position="right"
                      style="width: 100%" 
                    />
                    <div class="form-tip">单位：件</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上架状态">
                    <el-radio-group v-model="productForm.status" size="large">
                      <el-radio-button label="active">立即上架</el-radio-button>
                      <el-radio-button label="inactive">放入仓库</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <!-- 商品规格 -->
        <el-tab-pane label="商品规格" name="specs">
          <div class="form-section">
            <div class="section-title">
              <el-icon><Grid /></el-icon>
              <span>规格设置</span>
            </div>
            <div class="specs-section">
              <div class="specs-header">
                <div class="header-left">
                  <el-button type="primary" @click="addSpec">
                    <el-icon><Plus /></el-icon>
                    <span>添加规格项</span>
                  </el-button>
                  <el-tooltip content="例如：颜色、尺寸、材质等" placement="top">
                    <el-icon class="help-icon"><InfoFilled /></el-icon>
                  </el-tooltip>
                </div>
              </div>
              
              <el-empty v-if="productForm.specs.length === 0" description="暂无规格，点击添加规格项开始设置" :image-size="120" />
              
              <div v-for="(spec, index) in productForm.specs" :key="index" class="spec-item">
                <div class="spec-header">
                  <div class="spec-title">
                    <el-tag type="primary" effect="plain" size="large">规格 {{ index + 1 }}</el-tag>
                    <el-input 
                      v-model="spec.name" 
                      placeholder="输入规格名称，如：颜色" 
                      style="width: 200px; margin-left: 12px;"
                      clearable
                    />
                  </div>
                  <el-button type="danger" link @click="removeSpec(index)">
                    <el-icon><Delete /></el-icon>
                    <span>删除此规格</span>
                  </el-button>
                </div>
                <div class="spec-values">
                  <div class="values-label">规格值：</div>
                  <div class="values-list">
                    <el-tag
                      v-for="(value, vIndex) in spec.values"
                      :key="vIndex"
                      closable
                      @close="removeSpecValue(index, vIndex)"
                      class="spec-tag"
                      type="success"
                      effect="light"
                      size="large"
                    >
                      {{ value }}
                    </el-tag>
                    <el-input
                      v-if="spec.valueInputVisible"
                      v-model="spec.valueInput"
                      ref="specValueInput"
                      size="small"
                      style="width: 120px"
                      placeholder="输入后回车"
                      @keyup.enter="addSpecValue(index)"
                      @blur="addSpecValue(index)"
                    />
                    <el-button v-else type="primary" link @click="showSpecValueInput(index)">
                      <el-icon><Plus /></el-icon> 
                      <span>添加规格值</span>
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- SKU表格 -->
              <div v-if="productForm.specs.length > 0 && productForm.skus.length > 0" class="sku-table-section">
                <div class="sku-header">
                  <div class="sku-title">
                    <el-icon><List /></el-icon>
                    <span>SKU列表</span>
                    <el-tag type="success" effect="dark" size="large" class="sku-count">
                      共 {{ productForm.skus.length }} 个
                    </el-tag>
                  </div>
                  <el-button type="success" @click="generateSku">
                    <el-icon><MagicStick /></el-icon>
                    <span>重新生成SKU</span>
                  </el-button>
                </div>
                <el-table 
                  :data="productForm.skus" 
                  border 
                  stripe
                  style="width: 100%" 
                  max-height="400"
                  :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600' }"
                >
                  <el-table-column v-for="spec in productForm.specs" :key="spec.name" :label="spec.name" min-width="120" align="center">
                    <template #default="{ row }">
                      <el-tag type="info" effect="plain">{{ row[spec.name] }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="销售价格" width="150" align="center">
                    <template #default="{ row }">
                      <el-input-number 
                        v-model="row.price" 
                        :min="0.01" 
                        :precision="2" 
                        size="small" 
                        controls-position="right" 
                        style="width: 100%" 
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="库存数量" width="150" align="center">
                    <template #default="{ row }">
                      <el-input-number 
                        v-model="row.stock" 
                        :min="0" 
                        size="small" 
                        controls-position="right" 
                        style="width: 100%" 
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="SKU编码" min-width="150" align="center">
                    <template #default="{ row }">
                      <el-input 
                        v-model="row.skuCode" 
                        size="small" 
                        placeholder="可选，系统自动生成" 
                        clearable 
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 商品图片 -->
        <el-tab-pane label="商品图片" name="images">
          <div class="form-section">
            <div class="section-title">
              <el-icon><Picture /></el-icon>
              <span>图片上传</span>
            </div>
            <div class="image-upload-section">
              <div class="upload-info">
                <el-alert
                  title="图片上传说明"
                  type="info"
                  :closable="false"
                  show-icon
                >
                  <template #default>
                    <div class="alert-content">
                      <p>• 最多上传10张图片，第一张将作为商品主图展示</p>
                      <p>• 建议尺寸：800x800像素或更高，比例1:1</p>
                      <p>• 支持格式：JPG、PNG、GIF，单张不超过5MB</p>
                      <p>• 图片应清晰展示商品细节，建议使用白底或浅色背景</p>
                    </div>
                  </template>
                </el-alert>
              </div>
              
              <div class="upload-area">
                <el-upload
                  v-model:file-list="productForm.images"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="10"
                  accept="image/*"
                  :on-change="handleImageChange"
                  :on-remove="handleImageRemove"
                  multiple
                  class="custom-upload"
                >
                  <div class="upload-trigger">
                    <el-icon :size="48"><Plus /></el-icon>
                    <div class="upload-text">点击上传</div>
                    <div class="upload-hint">支持 JPG、PNG 格式</div>
                  </div>
                </el-upload>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 商品详情 -->
        <el-tab-pane label="商品详情" name="detail">
          <div class="form-section">
            <div class="section-title">
              <el-icon><Reading /></el-icon>
              <span>详细描述</span>
            </div>
            <div class="detail-section">
              <div class="detail-tips">
                <el-icon><InfoFilled /></el-icon>
                <span>详细描述可以帮助用户更好地了解商品，建议包含：商品特点、使用方法、注意事项等</span>
              </div>
              <el-input
                v-model="productForm.description"
                type="textarea"
                :rows="15"
                placeholder="请输入商品详细描述...&#10;&#10;建议包含以下内容：&#10;1. 商品特点和优势&#10;2. 材质和工艺说明&#10;3. 尺寸规格参数&#10;4. 使用方法和注意事项&#10;5. 售后服务承诺"
                maxlength="5000"
                show-word-limit
                class="detail-textarea"
              />
            </div>
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
import { Search, Plus, Document, Grid, Delete, MagicStick, Picture, InfoFilled, Reading, Coin, List } from '@element-plus/icons-vue'
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
  :deep(.el-dialog__header) {
    padding: 20px 24px;
    border-bottom: 2px solid #f0f0f0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .el-dialog__title {
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
    }
    
    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #ffffff;
        font-size: 20px;
        
        &:hover {
          color: #f0f0f0;
        }
      }
    }
  }

  :deep(.el-dialog__body) {
    padding: 24px;
    max-height: 75vh;
    overflow-y: auto;
    background: #fafbfc;
  }
  
  // 自定义标签页样式
  .custom-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
      
      .el-tabs__item {
        font-size: 15px;
        font-weight: 500;
        padding: 0 24px;
        height: 48px;
        line-height: 48px;
        
        &.is-active {
          color: #409eff;
          font-weight: 600;
        }
        
        &:hover {
          color: #409eff;
        }
      }
    }
    
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }

  // 表单分组样式
  .form-section {
    margin-bottom: 0;
    padding: 24px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
    
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f0f0f0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      
      .el-icon {
        font-size: 22px;
        color: #409eff;
      }
    }
  }

  .product-form {
    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #606266;
    }
    
    .subtitle-input {
      :deep(textarea) {
        font-size: 14px;
        line-height: 1.6;
      }
    }
    
    .form-tip {
      margin-top: 6px;
      font-size: 12px;
      color: #909399;
      line-height: 1.5;
      padding-left: 4px;
    }
  }
  
  // 分隔线样式
  .section-divider {
    margin: 24px 0;
    
    :deep(.el-divider__text) {
      .divider-text {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        font-weight: 600;
        color: #303133;
        
        .el-icon {
          font-size: 18px;
          color: #e6a23c;
        }
      }
    }
  }

  .specs-section {
    .specs-header {
      margin-bottom: 20px;
      
      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .help-icon {
          font-size: 18px;
          color: #909399;
          cursor: help;
          transition: color 0.3s;
          
          &:hover {
            color: #409eff;
          }
        }
      }
    }

    .spec-item {
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 2px solid #e8ecf1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, #409eff, #66b1ff);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      &:hover {
        border-color: #409eff;
        box-shadow: 0 6px 16px rgba(64, 158, 255, 0.15);
        transform: translateY(-2px);
        
        &::before {
          opacity: 1;
        }
      }

      .spec-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        .spec-title {
          display: flex;
          align-items: center;
        }
      }

      .spec-values {
        .values-label {
          font-size: 13px;
          color: #606266;
          margin-bottom: 12px;
          font-weight: 500;
        }
        
        .values-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          min-height: 44px;
          padding: 14px;
          background: #f5f7fa;
          border-radius: 8px;
          border: 1px dashed #dcdfe6;
          transition: all 0.3s;
          
          &:hover {
            border-color: #409eff;
            background: #ecf5ff;
          }

          .spec-tag {
            margin: 0;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 6px;
          }
        }
      }
    }

    .sku-table-section {
      margin-top: 28px;
      padding: 24px;
      background: #ffffff;
      border-radius: 12px;
      border: 2px solid #e8ecf1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

      .sku-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 2px solid #f0f0f0;

        .sku-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          
          .el-icon {
            font-size: 20px;
            color: #67c23a;
          }
          
          .sku-count {
            margin-left: 8px;
            font-weight: 600;
          }
        }
      }
    }
  }

  .image-upload-section {
    .upload-info {
      margin-bottom: 24px;
      
      :deep(.el-alert) {
        border-radius: 10px;
        border: 1px solid #d9ecff;
        background: linear-gradient(135deg, #ecf5ff 0%, #f0f9ff 100%);
        
        .alert-content {
          p {
            margin: 8px 0;
            font-size: 13px;
            line-height: 1.8;
            color: #606266;
            
            &:first-child {
              margin-top: 0;
            }
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    
    .upload-area {
      :deep(.custom-upload) {
        .el-upload--picture-card {
          width: 160px;
          height: 160px;
          border: 3px dashed #dcdfe6;
          border-radius: 16px;
          background: linear-gradient(135deg, #fafafa 0%, #f5f7fa 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          
          &:hover {
            border-color: #409eff;
            background: linear-gradient(135deg, #ecf5ff 0%, #e6f2ff 100%);
            transform: scale(1.02);
            box-shadow: 0 8px 24px rgba(64, 158, 255, 0.2);
          }
          
          .upload-trigger {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #8c939d;
            
            .el-icon {
              margin-bottom: 12px;
              color: #409eff;
              transition: all 0.3s;
            }
            
            .upload-text {
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 4px;
              color: #606266;
            }
            
            .upload-hint {
              font-size: 12px;
              color: #909399;
            }
          }
        }
      }
      
      :deep(.el-upload-list--picture-card) {
        .el-upload-list__item {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          border: 2px solid #e4e7ed;
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            border-color: #409eff;
          }
        }
      }
    }
  }

  .detail-section {
    .detail-tips {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 14px 18px;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #ecf5ff 0%, #f0f9ff 100%);
      border-left: 4px solid #409eff;
      border-radius: 8px;
      font-size: 13px;
      color: #409eff;
      line-height: 1.8;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
      
      .el-icon {
        font-size: 18px;
        margin-top: 2px;
        flex-shrink: 0;
      }
    }
    
    .detail-textarea {
      :deep(textarea) {
        font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 2;
        font-size: 14px;
        padding: 16px;
        border-radius: 8px;
        border: 2px solid #dcdfe6;
        transition: all 0.3s;
        
        &:focus {
          border-color: #409eff;
          box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
        }
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 20px 24px;
    margin-top: 24px;
    background: #ffffff;
    border-top: 2px solid #f0f0f0;
    border-radius: 0 0 12px 12px;
    
    .el-button {
      min-width: 110px;
      height: 40px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s;
      
      &.el-button--primary {
        background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
        border: none;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
        }
      }
    }
  }
}
</style>
