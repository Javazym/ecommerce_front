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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const activeTab = ref('banners')
const loading = ref(false)

const bannerList = ref([
  { id: 1, title: '新春大促', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', link: '/promotion/spring', position: '首页', sort: 1, status: true },
  { id: 2, title: '数码专场', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', link: '/category/electronics', position: '首页', sort: 2, status: true },
  { id: 3, title: '服饰上新', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', link: '/category/clothing', position: '首页', sort: 3, status: true }
])

const noticeList = ref([
  { id: 1, title: '关于春节期间物流安排的通知', type: 'logistics', typeText: '物流', target: '全部用户', createTime: '2024-01-15 10:00:00', status: 'published' },
  { id: 2, title: '商家中心升级维护公告', type: 'system', typeText: '系统', target: '商家', createTime: '2024-01-14 15:30:00', status: 'published' },
  { id: 3, title: '新功能：店铺优惠券限时免费领', type: 'activity', typeText: '活动', target: '全部用户', createTime: '2024-01-13 09:00:00', status: 'draft' }
])

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

const addBanner = () => ElMessage.info('添加轮播图')
const addNotice = () => ElMessage.info('发布公告')
const addActivity = () => ElMessage.info('创建活动')
</script>

<style scoped lang="scss">
.admin-marketing {
  .tabs-card {
    .content-header { margin-bottom: 16px; }
    .banner-image { width: 150px; height: 80px; border-radius: 4px; object-fit: cover; }
  }
}
</style>
