<template>
  <div class="merchant-marketing">
    <!-- 营销概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #e6f7ff;">
              <el-icon style="color: #409eff;"><Ticket /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.totalCoupons }}</div>
              <div class="stat-label">优惠券总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #f6ffed;">
              <el-icon style="color: #67c23a;"><Coin /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ marketingStats.totalDiscount.toLocaleString() }}</div>
              <div class="stat-label">优惠总额</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff7e6;">
              <el-icon style="color: #e6a23c;"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.usedCoupons }}</div>
              <div class="stat-label">已使用</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background: #fff1f0;">
              <el-icon style="color: #f56c6c;"><Clock /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ marketingStats.expiredCoupons }}</div>
              <div class="stat-label">已过期</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Tab切换 -->
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="优惠券管理" name="coupons">
          <template #label>
            <el-icon><Ticket /></el-icon>
            <span>优惠券管理</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="秒杀活动" name="seckill">
          <template #label>
            <el-icon><Lightning /></el-icon>
            <span>秒杀活动</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="满减活动" name="promotion">
          <template #label>
            <el-icon><Discount /></el-icon>
            <span>满减活动</span>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!-- 优惠券管理 -->
      <div v-if="activeTab === 'coupons'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openCouponDialog()">
            <el-icon><Plus /></el-icon>
            创建优惠券
          </el-button>
        </div>

        <el-table :data="couponList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="优惠券名称" min-width="150">
            <template #default="{ row }">
              <div class="coupon-name">{{ row.name }}</div>
              <div class="coupon-desc">{{ row.description }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="row.type === 'discount' ? 'success' : 'warning'" size="small">
                {{ row.type === 'discount' ? '折扣券' : '满减券' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="面值" width="100">
            <template #default="{ row }">
              <span class="coupon-value">
                {{ row.type === 'discount' ? row.value + '折' : '¥' + row.value }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="minAmount" label="使用门槛" width="100">
            <template #default="{ row }">
              {{ row.minAmount > 0 ? '满' + row.minAmount + '元' : '无门槛' }}
            </template>
          </el-table-column>
          <el-table-column prop="total" label="发放总量" width="80" />
          <el-table-column prop="used" label="已使用" width="80" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getCouponStatusType(row.status)" size="small">
                {{ getCouponStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="expireTime" label="有效期" width="180">
            <template #default="{ row }">
              {{ row.startTime }} - {{ row.expireTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="openCouponDialog(row)">编辑</el-button>
              <el-button
                :type="row.status === 'active' ? 'warning' : 'success'"
                link
                @click="toggleCouponStatus(row)"
              >
                {{ row.status === 'active' ? '禁用' : '启用' }}
              </el-button>
              <el-button type="danger" link @click="deleteCoupon(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 秒杀活动 -->
      <div v-if="activeTab === 'seckill'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openSeckillDialog()">
            <el-icon><Plus /></el-icon>
            创建秒杀活动
          </el-button>
        </div>

        <el-table :data="seckillList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="活动名称" min-width="180" />
          <el-table-column prop="productName" label="秒杀商品" min-width="150" />
          <el-table-column prop="seckillPrice" label="秒杀价" width="100">
            <template #default="{ row }">
              <span class="seckill-price">¥{{ row.seckillPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="originalPrice" label="原价" width="100">
            <template #default="{ row }">
              <span class="original-price">¥{{ row.originalPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="秒杀库存" width="100" />
          <el-table-column prop="sold" label="已抢" width="80" />
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getSeckillStatusType(row.status)" size="small">
                {{ getSeckillStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="openSeckillDialog(row)">编辑</el-button>
              <el-button
                :type="row.status === 'active' ? 'warning' : 'success'"
                link
                @click="toggleSeckillStatus(row)"
              >
                {{ row.status === 'active' ? '暂停' : '启用' }}
              </el-button>
              <el-button type="danger" link @click="deleteSeckillActivity(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 满减活动 -->
      <div v-if="activeTab === 'promotion'" class="tab-content">
        <div class="content-header">
          <el-button type="primary" @click="openPromotionDialog()">
            <el-icon><Plus /></el-icon>
            创建满减活动
          </el-button>
        </div>

        <el-table :data="promotionList" v-loading="loading" style="width: 100%">
          <el-table-column prop="name" label="活动名称" min-width="180" />
          <el-table-column prop="rules" label="满减规则" min-width="200">
            <template #default="{ row }">
              <div v-for="(rule, index) in row.rules" :key="index" class="rule-item">
                满{{ rule.amount }}减{{ rule.discount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scope" label="适用范围" width="100">
            <template #default="{ row }">
              <el-tag size="small">{{ row.scope === 'all' ? '全店' : '部分商品' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="expireTime" label="结束时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getPromotionStatusType(row.status)" size="small">
                {{ getPromotionStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="openPromotionDialog(row)">编辑</el-button>
              <el-button
                :type="row.status === 'active' ? 'warning' : 'success'"
                link
                @click="togglePromotionStatus(row)"
              >
                {{ row.status === 'active' ? '暂停' : '启用' }}
              </el-button>
              <el-button type="danger" link @click="deletePromotionActivity(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>

    <!-- 优惠券编辑弹窗 -->
    <el-dialog
      v-model="couponDialogVisible"
      :title="editingCoupon ? '编辑优惠券' : '创建优惠券'"
      width="600px"
    >
      <el-form :model="couponForm" label-width="100px">
        <el-form-item label="优惠券名称" required>
          <el-input v-model="couponForm.name" placeholder="请输入优惠券名称" />
        </el-form-item>
        <el-form-item label="优惠券描述">
          <el-input v-model="couponForm.description" placeholder="请输入优惠券描述" />
        </el-form-item>
        <el-form-item label="优惠券类型" required>
          <el-radio-group v-model="couponForm.type">
            <el-radio label="cash">满减券</el-radio>
            <el-radio label="discount">折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券面值" required>
          <el-input-number
            v-model="couponForm.value"
            :min="couponForm.type === 'discount' ? 1 : 1"
            :max="couponForm.type === 'discount' ? 9.9 : 1000"
            :precision="couponForm.type === 'discount' ? 1 : 0"
          />
          <span class="unit">{{ couponForm.type === 'discount' ? '折' : '元' }}</span>
        </el-form-item>
        <el-form-item label="使用门槛">
          <el-input-number v-model="couponForm.minAmount" :min="0" :precision="0" />
          <span class="unit">元（0表示无门槛）</span>
        </el-form-item>
        <el-form-item label="发放总量" required>
          <el-input-number v-model="couponForm.total" :min="1" />
          <span class="unit">张</span>
        </el-form-item>
        <el-form-item label="每人限领" required>
          <el-input-number v-model="couponForm.limitPerUser" :min="1" />
          <span class="unit">张</span>
        </el-form-item>
        <el-form-item label="有效期" required>
          <el-date-picker
            v-model="couponForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="couponDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCoupon">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 秒杀活动编辑弹窗 -->
    <el-dialog
      v-model="seckillDialogVisible"
      :title="editingSeckill ? '编辑秒杀活动' : '创建秒杀活动'"
      width="700px"
      class="seckill-dialog"
    >
      <el-form :model="seckillForm" label-width="110px">
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Lightning /></el-icon>
            <span>基本信息</span>
          </div>
          <el-form-item label="活动名称" required>
            <el-input v-model="seckillForm.name" placeholder="请输入活动名称" maxlength="50" show-word-limit />
          </el-form-item>
        </div>

        <!-- 商品信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Goods /></el-icon>
            <span>商品信息</span>
          </div>
          <el-form-item label="选择商品" required>
            <el-select
              v-model="seckillForm.productId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入商品名称搜索"
              :remote-method="searchProducts"
              :loading="productSearchLoading"
              style="width: 100%"
              @change="handleSelectProductById"
            >
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <div class="product-option">
                  <img v-if="item.image" :src="item.image" class="product-thumb" />
                  <div class="product-info">
                    <div class="product-name">{{ item.name }}</div>
                    <div class="product-meta">
                      <span class="product-price">¥{{ item.price }}</span>
                      <span class="product-stock">库存: {{ item.stock }}</span>
                    </div>
                  </div>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="当前商品" v-if="selectedProduct">
            <div class="selected-product-card">
              <img v-if="selectedProduct.image" :src="selectedProduct.image" class="selected-product-image" />
              <div class="selected-product-details">
                <div class="selected-product-name">{{ selectedProduct.name }}</div>
                <div class="selected-product-meta">
                  <span>原价: ¥{{ selectedProduct.price }}</span>
                  <span>库存: {{ selectedProduct.stock }}</span>
                </div>
              </div>
            </div>
          </el-form-item>

          <!-- SKU ID 隐藏字段，后端仍会使用 -->
          <input type="hidden" v-model="seckillForm.skuId" />
        </div>

        <!-- 价格与库存 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Coin /></el-icon>
            <span>价格与库存</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="原价" required>
                <el-input-number 
                  v-model="seckillForm.originalPrice" 
                  :min="0.01" 
                  :precision="2" 
                  style="width: 100%" 
                  disabled
                />
                <div class="form-tip">从商品信息自动获取</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="秒杀价格" required>
                <el-input-number 
                  v-model="seckillForm.seckillPrice" 
                  :min="0.01" 
                  :max="seckillForm.originalPrice" 
                  :precision="2" 
                  style="width: 100%" 
                />
                <div class="form-tip">不能高于原价</div>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="秒杀库存" required>
                <el-input-number 
                  v-model="seckillForm.stock" 
                  :min="1" 
                  :max="selectedProduct?.stock || 999999" 
                  style="width: 100%" 
                />
                <div class="form-tip" v-if="selectedProduct">最大可用: {{ selectedProduct.stock }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="每人限购" required>
                <el-input-number v-model="seckillForm.limitPerUser" :min="1" style="width: 100%" />
                <div class="form-tip">件</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 活动时间 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Clock /></el-icon>
            <span>活动时间</span>
          </div>
          <el-form-item label="活动时间" required>
            <el-date-picker
              v-model="seckillForm.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
          
          <el-form-item label="排序">
            <el-input-number v-model="seckillForm.sort" :min="0" style="width: 100%" />
            <div class="form-tip">数字越小越靠前</div>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="seckillDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSeckill">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 满减活动编辑弹窗 -->
    <el-dialog
      v-model="promotionDialogVisible"
      :title="editingPromotion ? '编辑满减活动' : '创建满减活动'"
      width="700px"
      class="promotion-dialog"
    >
      <el-form :model="promotionForm" label-width="110px">
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Discount /></el-icon>
            <span>基本信息</span>
          </div>
          <el-form-item label="活动名称" required>
            <el-input v-model="promotionForm.name" placeholder="请输入活动名称" maxlength="50" show-word-limit />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input 
              v-model="promotionForm.description" 
              type="textarea" 
              :rows="3" 
              placeholder="请输入活动描述" 
              maxlength="200" 
              show-word-limit 
            />
          </el-form-item>
        </div>

        <!-- 优惠规则 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Coin /></el-icon>
            <span>优惠规则</span>
          </div>
          <el-form-item label="优惠类型" required>
            <el-radio-group v-model="promotionForm.discountType">
              <el-radio :label="1">满件减</el-radio>
              <el-radio :label="2">满额减</el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="条件值" required>
                <el-input-number 
                  v-model="promotionForm.conditionValue" 
                  :min="1" 
                  style="width: 100%" 
                />
                <div class="form-tip">{{ promotionForm.discountType === 1 ? '件' : '元' }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优惠金额" required>
                <el-input-number 
                  v-model="promotionForm.discountAmount" 
                  :min="0.01" 
                  :max="promotionForm.conditionValue * (promotionForm.discountType === 2 ? 1 : 100)" 
                  :precision="2" 
                  style="width: 100%" 
                />
                <div class="form-tip">元</div>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="最高优惠">
            <el-input-number 
              v-model="promotionForm.maxDiscount" 
              :min="0" 
              :precision="2" 
              style="width: 100%" 
            />
            <div class="form-tip">元（0表示不限制）</div>
          </el-form-item>
        </div>

        <!-- 活动时间 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Clock /></el-icon>
            <span>活动时间</span>
          </div>
          <el-form-item label="活动时间" required>
            <el-date-picker
              v-model="promotionForm.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </div>

        <!-- 适用范围 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Goods /></el-icon>
            <span>适用范围</span>
          </div>
          <el-form-item label="适用范围" required>
            <el-radio-group v-model="promotionForm.scopeType">
              <el-radio label="all">全场</el-radio>
              <el-radio label="product">指定商品</el-radio>
              <el-radio label="category">指定分类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="范围ID列表" v-if="promotionForm.scopeType !== 'all'">
            <el-input 
              v-model="promotionForm.scopeIds" 
              type="textarea" 
              :rows="2" 
              placeholder="多个ID用逗号分隔，例如：1,2,3" 
            />
            <div class="form-tip">
              {{ promotionForm.scopeType === 'product' ? '商品ID列表' : '分类ID列表' }}
            </div>
          </el-form-item>
        </div>

        <!-- 其他设置 -->
        <div class="form-section">
          <div class="section-title">
            <el-icon><Setting /></el-icon>
            <span>其他设置</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="每人限用">
                <el-input-number v-model="promotionForm.limitPerUser" :min="1" style="width: 100%" />
                <div class="form-tip">次</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序">
                <el-input-number v-model="promotionForm.sort" :min="0" style="width: 100%" />
                <div class="form-tip">数字越小越靠前</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="promotionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePromotion">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted, onBeforeMount} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Ticket, Coin, User, Clock, Lightning, Discount, Plus, Goods, Setting
} from '@element-plus/icons-vue'
import { getMerchantCouponList, createCoupon, updateCoupon, deleteCoupon as apiDeleteCoupon } from "../../api/modules/coupon.js"
import { getCouponStatistics } from "../../api/modules/coupon.js"
import { getSeckillList, createSeckill, updateSeckill, deleteSeckill, getSeckillDetail, updateSeckillStatus } from "../../api/modules/coupon.js"
import { getDiscountList, createDiscount, updateDiscount, deleteDiscount } from "../../api/modules/coupon.js"
import {getMerchantInfo, state as merchantState} from "../../stores/merchantStore.js"
import { getProductList, getProductDetail } from "../../api/modules/product.js"


// Tab
const activeTab = ref('coupons')
const loading = ref(false)
// 商家信息
const merchantInfo = merchantState.merchantInfo

// 分页参数
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 营销统计
const marketingStats = ref({
  totalCoupons: 0,
  totalDiscount: 0,
  usedCoupons: 0,
  expiredCoupons: 0
})

// 优惠券列表
const couponList = ref([])

// 秒杀列表
const seckillList = ref([])

// 满减活动列表
const promotionList = ref([])

// 优惠券弹窗
const couponDialogVisible = ref(false)
const editingCoupon = ref(null)
const couponForm = reactive({
  name: '',
  description: '',
  type: 'cash',
  value: 50,
  minAmount: 0,
  total: 100,
  limitPerUser: 1,
  dateRange: []
})

// 商品列表（用于选择）
const productList = ref([])
const productSearchLoading = ref(false)
const selectedProduct = ref(null)

// 秒杀活动弹窗
const seckillDialogVisible = ref(false)
const editingSeckill = ref(null)
const seckillForm = reactive({
  name: '',
  productId: null,
  skuId: 0,
  seckillPrice: 0,
  originalPrice: 0,
  stock: 100,
  limitPerUser: 1,
  timeRange: [],
  sort: 0
})

// 满减活动弹窗
const promotionDialogVisible = ref(false)
const editingPromotion = ref(null)
const promotionForm = reactive({
  name: '',
  description: '',
  discountType: 2,
  conditionValue: 100,
  discountAmount: 20,
  maxDiscount: 0,
  timeRange: [],
  scopeType: 'all',
  scopeIds: '',
  limitPerUser: 1,
  sort: 0
})

// 获取优惠券状态类型
const getCouponStatusType = (status) => {
  const typeMap = {
    active: 'success',
    inactive: 'warning',
    expired: 'info'
  }
  return typeMap[status] || 'info'
}

// 获取优惠券状态文本
const getCouponStatusText = (status) => {
  const textMap = {
    active: '进行中',
    inactive: '未启用',
    expired: '已过期'
  }
  return textMap[status] || '未知'
}

// 获取优惠券列表
const fetchCouponList = async () => {
  loading.value = true
  try {
    // 获取当前商家ID，如果没有则默认为0（平台券）
    console.log('获取优惠券列表', merchantInfo)
    const merchantId = merchantInfo.id || 0

    const res = await getMerchantCouponList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      couponList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: '', // 后端没有description字段，留空
        type: item.type === 0 ? 'cash' : 'discount', // 0-满减，1-折扣
        value: item.value,
        minAmount: item.minAmount,
        maxDiscount: item.maxDiscount,
        total: item.totalCount,
        used: item.usedCount,
        received: item.receiveCount,
        limitPerUser: item.limitPerUser,
        status: item.status === 1 ? 'active' : 'inactive', // 1-启用，0-禁用
        startTime: item.startTime,
        expireTime: item.endTime,
        validDays: item.validDays
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0

      // 更新统计数据
      updateMarketingStats()
    }
  } catch (error) {
    console.error('获取优惠券列表失败:', error)
    ElMessage.error('获取优惠券列表失败')
  } finally {
    loading.value = false
  }
}

// 更新营销统计数据
const updateMarketingStats = () => {
  marketingStats.value.totalCoupons = pagination.total
  marketingStats.value.usedCoupons = couponList.value.reduce((sum, item) => sum + (item.used || 0), 0)
  // 其他统计数据可以根据实际需求计算
}

// 获取秒杀状态类型
const getSeckillStatusType = (status) => {
  const typeMap = {
    pending: 'warning',   // 0-未开始
    active: 'success',    // 1-进行中
    ended: 'info',        // 2-已结束
    cancelled: 'danger'   // 3-已取消
  }
  return typeMap[status] || 'info'
}

// 获取秒杀状态文本
const getSeckillStatusText = (status) => {
  const textMap = {
    pending: '未开始',
    active: '进行中',
    ended: '已结束',
    cancelled: '已取消'
  }
  return textMap[status] || '未知'
}

// 获取满减活动状态类型
const getPromotionStatusType = (status) => {
  const typeMap = {
    pending: 'warning',   // 0-未开始
    active: 'success',    // 1-进行中
    expired: 'info',      // 2-已结束
    cancelled: 'danger'   // 3-已取消
  }
  return typeMap[status] || 'info'
}

// 获取满减活动状态文本
const getPromotionStatusText = (status) => {
  const textMap = {
    pending: '未开始',
    active: '进行中',
    expired: '已结束',
    cancelled: '已取消'
  }
  return textMap[status] || '未知'
}

// 打开优惠券弹窗
const openCouponDialog = (coupon = null) => {
  editingCoupon.value = coupon
  if (coupon) {
    Object.assign(couponForm, {
      name: coupon.name,
      description: coupon.description || '',
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      total: coupon.total,
      limitPerUser: 1,
      dateRange: [coupon.startTime, coupon.expireTime]
    })
  } else {
    Object.assign(couponForm, {
      name: '',
      description: '',
      type: 'cash',
      value: 50,
      minAmount: 0,
      total: 100,
      limitPerUser: 1,
      dateRange: []
    })
  }
  couponDialogVisible.value = true
}

// 保存优惠券
const saveCoupon = async () => {
  if (!couponForm.name) {
    ElMessage.warning('请输入优惠券名称')
    return
  }
  if (!couponForm.dateRange || couponForm.dateRange.length < 2) {
    ElMessage.warning('请选择有效期')
    return
  }

  try {
    const merchantId = merchantInfo.id || 0

    // 构建请求数据
    const couponData = {
      name: couponForm.name,
      type: couponForm.type === 'cash' ? 0 : 1, // 0-满减，1-折扣
      value: couponForm.value,
      minAmount: couponForm.minAmount,
      maxDiscount: 1000,
      totalStock: couponForm.total,
      limitPerUser: couponForm.limitPerUser,
      startTime: couponForm.dateRange[0],
      endTime: couponForm.dateRange[1]
    }

    if (editingCoupon.value) {
      // 更新优惠券
      await updateCoupon(editingCoupon.value.id, {
        ...couponData,
        merchantId: merchantInfo.id,
        status: editingCoupon.value.status === 'active' ? 1 : 0
      })
      ElMessage.success('优惠券更新成功')
    } else {
      // 创建优惠券
      await createCoupon({
        ...couponData,
        merchantId: merchantInfo.id
      })
      ElMessage.success('优惠券创建成功')
    }

    couponDialogVisible.value = false
    // 重新加载列表
    await fetchCouponList()
  } catch (error) {
    console.error('保存优惠券失败:', error)
    ElMessage.error('保存优惠券失败')
  }
}

// 切换优惠券状态
const toggleCouponStatus = async (coupon) => {
  try {
    const newStatus = coupon.status === 'active' ? 0 : 1  // active→0禁用, inactive→1启用

    await updateCoupon(coupon.id, {
      merchantId: merchantInfo.id,
      status: newStatus
    })

    ElMessage.success(newStatus === 1 ? '优惠券已启用' : '优惠券已禁用')
    // 重新加载列表
    await fetchCouponList()
  } catch (error) {
    console.error('切换优惠券状态失败:', error)
    ElMessage.error('操作失败')
  }
}

// 删除优惠券
const deleteCoupon = async (coupon) => {
  try {
    await ElMessageBox.confirm('确定要删除该优惠券吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    // 调用删除优惠券的 API
    await apiDeleteCoupon(coupon.id, merchantId)
    ElMessage.success('删除成功')
    // 重新加载列表以更新统计
    await fetchCouponList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除优惠券失败:', error)
      ElMessage.error('删除失败')
    }
    // 取消操作
  }
}

// 获取秒杀活动列表
const fetchSeckillList = async () => {
  loading.value = true
  try {
    const merchantId = merchantInfo.id || 0

    const res = await getSeckillList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      seckillList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        productName: item.product?.name || '未知商品',
        seckillPrice: item.seckillPrice,
        originalPrice: item.originalPrice,
        stock: item.stock,
        sold: item.soldCount || 0,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : item.status === 2 ? 'ended' : 'cancelled',
        limitPerUser: item.limitPerUser
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('获取秒杀活动列表失败:', error)
    ElMessage.error('获取秒杀活动列表失败')
  } finally {
    loading.value = false
  }
}

// 获取满减活动列表
const fetchDiscountList = async () => {
  loading.value = true
  try {
    const merchantId = merchantInfo.id || 0

    const res = await getDiscountList({
      merchantId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 1000 && res.data) {
      // 适配后端返回的数据结构
      promotionList.value = (res.data.content || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        rules: [
          { amount: item.conditionValue, discount: item.discountAmount }
        ],
        scope: item.scopeType === 'all' ? 'all' : 'category',
        startTime: item.startTime,
        expireTime: item.endTime,
        status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : item.status === 2 ? 'expired' : 'cancelled',
        maxDiscount: item.maxDiscount,
        limitPerUser: item.limitPerUser
      }))

      // 更新分页信息
      pagination.total = res.data.totalElements || 0
    }
  } catch (error) {
    console.error('获取满减活动列表失败:', error)
    ElMessage.error('获取满减活动列表失败')
  } finally {
    loading.value = false
  }
}

// 获取优惠券统计信息
const fetchCouponStatistics = async () => {
  try {
    const res = await getCouponStatistics({
      merchantId: merchantInfo.id
    })

    if (res.code === 1000 && res.data) {
      marketingStats.value = {
        totalCoupons: res.data.totalCoupons || 0,
        totalDiscount: 0,  // 需要后端提供或前端计算
        usedCoupons: res.data.totalUsed || 0,
        expiredCoupons: 0  // 需要后端提供或前端计算
      }
    }
  } catch (error) {
    console.error('获取优惠券统计失败:', error)
  }
}

// 页面加载时获取数据
onMounted(async () => {
  await getMerchantInfo()
  await Promise.all([
    fetchCouponList(),
    fetchSeckillList(),
    fetchDiscountList(),
    fetchCouponStatistics()
  ])
})

// 搜索商品
const searchProducts = async (query) => {
  if (!query) {
    productList.value = []
    return
  }
  
  productSearchLoading.value = true
  try {
    const res = await getProductList({
      keyword: query,
      pageNum: 1,
      pageSize: 10
    })
    
    if (res.code === 1000 && res.data) {
      productList.value = res.data.content || []
    }
  } catch (error) {
    console.error('搜索商品失败:', error)
    ElMessage.error('搜索商品失败')
  } finally {
    productSearchLoading.value = false
  }
}

// 选择商品
const handleSelectProduct = async (product) => {
  selectedProduct.value = product
  seckillForm.productId = product.id
  seckillForm.originalPrice = product.price
  
  // 如果有SKU，获取第一个SKU的信息
  if (product.skus && product.skus.length > 0) {
    seckillForm.skuId = product.skus[0].id
  } else {
    seckillForm.skuId = 0
  }
  
  ElMessage.success(`已选择商品：${product.name}`)
}

// 通过ID选择商品（用于el-select的change事件）
const handleSelectProductById = (productId) => {
  const product = productList.value.find(p => p.id === productId)
  if (product) {
    handleSelectProduct(product)
  }
}

// 打开秒杀弹窗
const openSeckillDialog = async (seckill = null) => {
  editingSeckill.value = seckill
  productList.value = []
  selectedProduct.value = null
  
  if (seckill) {
    // 编辑模式 - 先加载商品信息
    try {
      const res = await getProductDetail(seckill.productId)
      if (res.code === 1000 && res.data) {
        selectedProduct.value = res.data
        productList.value = [res.data]
      }
    } catch (error) {
      console.error('加载商品信息失败:', error)
    }
    
    Object.assign(seckillForm, {
      name: seckill.name,
      productId: seckill.productId,
      skuId: seckill.skuId || 0,
      seckillPrice: seckill.seckillPrice,
      originalPrice: seckill.originalPrice,
      stock: seckill.stock,
      limitPerUser: seckill.limitPerUser || 1,
      timeRange: [seckill.startTime, seckill.endTime],
      sort: seckill.sort || 0
    })
  } else {
    // 创建模式
    Object.assign(seckillForm, {
      name: '',
      productId: null,
      skuId: 0,
      seckillPrice: 0,
      originalPrice: 0,
      stock: 100,
      limitPerUser: 1,
      timeRange: [],
      sort: 0
    })
  }
  seckillDialogVisible.value = true
}

// 保存秒杀活动
const saveSeckill = async () => {
  if (!seckillForm.name) {
    ElMessage.warning('请输入活动名称')
    return
  }
  if (!seckillForm.productId) {
    ElMessage.warning('请选择商品')
    return
  }
  if (!seckillForm.timeRange || seckillForm.timeRange.length < 2) {
    ElMessage.warning('请选择活动时间')
    return
  }
  if (seckillForm.seckillPrice <= 0) {
    ElMessage.warning('请输入有效的秒杀价格')
    return
  }

  try {
    const seckillData = {
      name: seckillForm.name,
      productId: seckillForm.productId,
      skuId: seckillForm.skuId,
      seckillPrice: seckillForm.seckillPrice,
      originalPrice: seckillForm.originalPrice,
      stock: seckillForm.stock,
      limitPerUser: seckillForm.limitPerUser,
      startTime: seckillForm.timeRange[0],
      endTime: seckillForm.timeRange[1],
      sort: seckillForm.sort,
      merchantId: merchantInfo.id
    }

    if (editingSeckill.value) {
      // 更新秒杀活动
      await updateSeckill(editingSeckill.value.id, seckillData)
      ElMessage.success('秒杀活动更新成功')
    } else {
      // 创建秒杀活动
      await createSeckill(seckillData)
      ElMessage.success('秒杀活动创建成功')
    }

    seckillDialogVisible.value = false
    // 重新加载列表
    await fetchSeckillList()
  } catch (error) {
    console.error('保存秒杀活动失败:', error)
    ElMessage.error('保存秒杀活动失败')
  }
}

// 删除秒杀活动
const deleteSeckillActivity = async (seckill) => {
  try {
    await ElMessageBox.confirm('确定要删除该秒杀活动吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    await deleteSeckill(seckill.id, merchantId)
    ElMessage.success('删除成功')
    await fetchSeckillList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除秒杀活动失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 切换秒杀活动状态
const toggleSeckillStatus = async (seckill) => {
  try {
    // 根据当前状态计算目标状态
    // 0-未开始，1-进行中，2-已结束，3-已取消
    const newStatus = seckill.status === 'active' ? 3 : 1  // active→3取消, 其他→1进行

    await updateSeckillStatus(seckill.id, {
      merchantId: merchantInfo.id,
      status: newStatus
    })

    ElMessage.success(newStatus === 1 ? '秒杀活动已启用' : '秒杀活动已暂停')
    // 重新加载列表
    await fetchSeckillList()
  } catch (error) {
    console.error('切换秒杀活动状态失败:', error)
    ElMessage.error('操作失败')
  }
}

// 打开满减弹窗
const openPromotionDialog = (promotion = null) => {
  editingPromotion.value = promotion
  if (promotion) {
    // 编辑模式
    Object.assign(promotionForm, {
      name: promotion.name,
      description: promotion.description || '',
      discountType: promotion.discountType || 2,
      conditionValue: promotion.conditionValue || 100,
      discountAmount: promotion.discountAmount || 20,
      maxDiscount: promotion.maxDiscount || 0,
      timeRange: [promotion.startTime, promotion.endTime],
      scopeType: promotion.scopeType || 'all',
      scopeIds: promotion.scopeIds || '',
      limitPerUser: promotion.limitPerUser || 1,
      sort: promotion.sort || 0
    })
  } else {
    // 创建模式
    Object.assign(promotionForm, {
      name: '',
      description: '',
      discountType: 2,
      conditionValue: 100,
      discountAmount: 20,
      maxDiscount: 0,
      timeRange: [],
      scopeType: 'all',
      scopeIds: '',
      limitPerUser: 1,
      sort: 0
    })
  }
  promotionDialogVisible.value = true
}

// 保存满减活动
const savePromotion = async () => {
  if (!promotionForm.name) {
    ElMessage.warning('请输入活动名称')
    return
  }
  if (!promotionForm.timeRange || promotionForm.timeRange.length < 2) {
    ElMessage.warning('请选择活动时间')
    return
  }

  try {
    const promotionData = {
      name: promotionForm.name,
      description: promotionForm.description,
      discountType: promotionForm.discountType,
      conditionValue: promotionForm.conditionValue,
      discountAmount: promotionForm.discountAmount,
      maxDiscount: promotionForm.maxDiscount,
      startTime: promotionForm.timeRange[0],
      endTime: promotionForm.timeRange[1],
      scopeType: promotionForm.scopeType,
      scopeIds: promotionForm.scopeIds,
      limitPerUser: promotionForm.limitPerUser,
      sort: promotionForm.sort,
      merchantId: merchantInfo.id
    }

    if (editingPromotion.value) {
      // 更新满减活动
      await updateDiscount(editingPromotion.value.id, promotionData)
      ElMessage.success('满减活动更新成功')
    } else {
      // 创建满减活动
      await createDiscount(promotionData)
      ElMessage.success('满减活动创建成功')
    }

    promotionDialogVisible.value = false
    // 重新加载列表
    await fetchDiscountList()
  } catch (error) {
    console.error('保存满减活动失败:', error)
    ElMessage.error('保存满减活动失败')
  }
}

// 删除满减活动
const deletePromotionActivity = async (promotion) => {
  try {
    await ElMessageBox.confirm('确定要删除该满减活动吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const merchantId = merchantInfo.id || 0
    await deleteDiscount(promotion.id, merchantId)
    ElMessage.success('删除成功')
    await fetchDiscountList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除满减活动失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 分页大小变化处理
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  // 根据当前tab重新加载对应的数据
  if (activeTab.value === 'coupons') {
    fetchCouponList()
  } else if (activeTab.value === 'seckill') {
    fetchSeckillList()
  } else if (activeTab.value === 'promotion') {
    fetchDiscountList()
  }
}

// 当前页变化处理
const handleCurrentChange = (val) => {
  pagination.pageNum = val
  // 根据当前tab重新加载对应的数据
  if (activeTab.value === 'coupons') {
    fetchCouponList()
  } else if (activeTab.value === 'seckill') {
    fetchSeckillList()
  } else if (activeTab.value === 'promotion') {
    fetchDiscountList()
  }
}
</script>

<style scoped lang="scss">
.merchant-marketing {
  .stats-row {
    margin-bottom: 20px;

    .stat-card {
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-info {
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #303133;
          }

          .stat-label {
            font-size: 14px;
            color: #909399;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .tabs-card {
    :deep(.el-tabs__item) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .tab-content {
    .content-header {
      margin-bottom: 16px;
    }

    .coupon-name {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
    }

    .coupon-desc {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
    }

    .coupon-value {
      font-size: 16px;
      font-weight: 600;
      color: #f56c6c;
    }

    .seckill-price {
      font-size: 16px;
      font-weight: 600;
      color: #f56c6c;
    }

    .original-price {
      font-size: 14px;
      color: #909399;
      text-decoration: line-through;
    }

    .rule-item {
      padding: 4px 0;
      font-size: 14px;
      color: #606266;
    }
  }
}

.unit {
  margin-left: 8px;
  color: #909399;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

// 表单分组样式
.form-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    
    .el-icon {
      font-size: 18px;
      color: #409eff;
    }
  }
}

// 表单提示文字
.form-tip {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

// 商品选项样式
.product-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  
  .product-thumb {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
  
  .product-info {
    flex: 1;
    min-width: 0;
    
    .product-name {
      font-size: 14px;
      color: #303133;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .product-meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
      
      .product-price {
        color: #f56c6c;
        font-weight: 600;
      }
      
      .product-stock {
        color: #909399;
      }
    }
  }
}

// 已选商品卡片
.selected-product-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  
  .selected-product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
  
  .selected-product-details {
    flex: 1;
    
    .selected-product-name {
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 6px;
    }
    
    .selected-product-meta {
      display: flex;
      gap: 16px;
      font-size: 13px;
      color: #606266;
      
      span:first-child {
        color: #f56c6c;
        font-weight: 600;
      }
    }
  }
}

// 秒杀活动弹窗样式
:deep(.seckill-dialog) {
  .el-dialog__body {
    padding: 20px 24px;
    max-height: 65vh;
    overflow-y: auto;
  }
}

// 满减活动弹窗样式
:deep(.promotion-dialog) {
  .el-dialog__body {
    padding: 20px 24px;
    max-height: 65vh;
    overflow-y: auto;
  }
}
</style>
