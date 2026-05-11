<template>
  <div class="admin-marketing">
    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="轮播图管理" name="banners" />
        <el-tab-pane label="公告管理" name="notices" />
        <el-tab-pane label="平台活动" name="activities" />
      </el-tabs>

      <!-- 轮播图管理 -->
      <div v-if="activeTab === 'banners'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="addBanner"><el-icon><Plus /></el-icon>添加轮播图</el-button>
        </div>
        <el-table :data="bannerList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="image" label="图片" width="200">
            <template #default="{ row }"><img :src="row.image" alt="" class="banner-image" /></template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="150" />
          <el-table-column prop="link" label="链接" min-width="150" />
          <el-table-column prop="position" label="位置" width="100" />
          <el-table-column prop="sort" label="排序" width="80" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }"><el-switch v-model="row.status" /></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }"><el-button type="primary" link>编辑</el-button><el-button type="danger" link>删除</el-button></template>
          </el-table-column>
        </el-table>
      <!-- 公告管理 -->
      <div v-if="activeTab === 'notices'" class="tab-content">
      </div>
        <div class="content-header">
          <el-button type="primary" @click="addNotice"><el-icon><Plus /></el-icon>发布公告</el-button>
        </div>
        <el-table :data="noticeList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="title" label="公告标题" min-width="200" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }"><el-tag :type="getNoticeType(row.type)" size="small">{{ row.typeText }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="target" label="发布对象" width="100" />
          <el-table-column prop="createTime" label="发布时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }"><el-tag :type="row.status === 'published' ? 'success' : 'info'" size="small">{{ row.status === 'published' ? '已发布' : '草稿' }}</el-tag></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }"><el-button type="primary" link>编辑</el-button><el-button type="danger" link>删除</el-button></template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 平台活动 -->
      <div v-if="activeTab === 'activities'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="addActivity"><el-icon><Plus /></el-icon>创建活动</el-button>
        </div>
        <el-table :data="activityList" v-loading="loading" style="width: 100%; margin-top: 16px;">
          <el-table-column prop="name" label="活动名称" min-width="180" />
          <el-table-column prop="type" label="活动类型" width="120">
            <template #default="{ row }"><el-tag size="small">{{ row.typeText }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="endTime" label="结束时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }"><el-tag :type="getActivityStatus(row.status)" size="small">{{ row.statusText }}</el-tag></template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }"><el-button type="primary" link>编辑</el-button><el-button type="danger" link>删除</el-button></template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  getBannerList,
  createBanner,
  updateBanner,
  deleteBanner as deleteBannerApi,
  updateBannerStatus,
  getAnnouncementList,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement as deleteAnnouncementApi,
  updateAnnouncementStatus
} from '../../api/modules/admin.js'

const activeTab = ref('banners')
const loading = ref(false)

// 轮播图列表
const bannerList = ref([])

// 加载轮播图列表
const loadBannerList = async () => {
  loading.value = true
  try {
    const res = await getBannerList()
    if (res.code === 1000 && res.data) {
      bannerList.value = (res.data || []).map(item => ({
        id: item.id,
        title: item.title || '',
        image: item.image || item.imageUrl || '',
        link: item.link || item.linkUrl || '',
        position: getPositionText(item.position),
        sort: item.sort || 0,
        status: item.status === 1
      }))
    }
  } catch (error) {
    console.error('加载轮播图失败:', error)
    ElMessage.error('加载轮播图失败')
  } finally {
    loading.value = false
  }
}

// 获取位置文本
const getPositionText = (position) => {
  const map = { 0: '首页', 1: '分类页', 2: '商品页' }
  return map[position] || '首页'
}

// 公告列表
const noticeList = ref([])

// 加载公告列表
const loadNoticeList = async () => {
  loading.value = true
  try {
    const res = await getAnnouncementList()
    if (res.code === 1000 && res.data) {
      noticeList.value = (res.data || []).map(item => ({
        id: item.id,
        title: item.title || '',
        type: getTypeKey(item.type),
        typeText: getTypeText(item.type),
        target: getTargetText(item.targetAudience),
        createTime: item.createdAt,
        status: item.status === 1 ? 'published' : 'draft'
      }))
    }
  } catch (error) {
    console.error('加载公告失败:', error)
    ElMessage.error('加载公告失败')
  } finally {
    loading.value = false
  }
}

// 获取类型键值
const getTypeKey = (type) => {
  const map = { 0: 'system', 1: 'activity', 2: 'logistics' }
  return map[type] || 'system'
}

// 获取类型文本
const getTypeText = (type) => {
  const map = { 0: '系统', 1: '活动', 2: '物流' }
  return map[type] || '系统'
}

// 获取目标受众文本
const getTargetText = (target) => {
  const map = { 0: '全部用户', 1: '商家', 2: '管理员' }
  return map[target] || '全部用户'
}

// 活动列表(暂保留模拟数据)
const activityList = ref([
  { id: 1, name: '新春大促', type: 'discount', typeText: '折扣活动', startTime: '2024-02-01 00:00:00', endTime: '2024-02-15 23:59:59', status: 'pending', statusText: '即将开始' },
  { id: 2, name: '年货节', type: 'coupon', typeText: '优惠券', startTime: '2024-01-20 00:00:00', endTime: '2024-02-05 23:59:59', status: 'active', statusText: '进行中' }
])

const getNoticeType = (type) => {
  const map = { logistics: 'warning', system: 'info', activity: 'success' }
  return map[type] || 'info'
}

const getActivityStatus = (status) => {
  const map = { active: 'success', pending: 'warning', ended: 'info' }
  return map[status] || 'info'
}

// 添加轮播图
const addBanner = () => ElMessage.info('添加轮播图功能开发中')

// 发布公告
const addNotice = () => ElMessage.info('发布公告功能开发中')

// 创建活动
const addActivity = () => ElMessage.info('创建活动功能开发中')

// 初始加载
onMounted(() => {
  loadBannerList()
})
</script>

<style scoped lang="scss">
.admin-marketing {
  .tabs-card {
    .content-header { margin-bottom: 16px; }
    .banner-image { width: 150px; height: 80px; border-radius: 4px; object-fit: cover; }
  }
}
</style>
