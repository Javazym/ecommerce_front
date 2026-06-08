import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/user/HomeView.vue'
import ProductDetail from '../views/user/ProductDetail.vue'
import SeckillProductDetail from '../views/user/SeckillProductDetail.vue'
import SeckillCheckout from '../views/user/SeckillCheckout.vue'
import ShoppingCart from '../views/user/ShoppingCart.vue'
import UserCenter from '../views/user/UserCenter.vue'
import Checkout from '../views/user/Checkout.vue'
import OrderDetail from '../views/user/OrderDetail.vue'
import RefundDetail from '../views/user/RefundDetail.vue'
import MerchantLayout from '../views/merchant/MerchantLayout.vue'
import MerchantDashboard from '../views/merchant/MerchantDashboard.vue'
import MerchantProducts from '../views/merchant/MerchantProducts.vue'
import MerchantOrders from '../views/merchant/MerchantOrders.vue'
import MerchantMarketing from '../views/merchant/MerchantMarketing.vue'
import MerchantFinance from '../views/merchant/MerchantFinance.vue'
import MerchantSettings from '../views/merchant/MerchantSettings.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminMerchants from '../views/admin/AdminMerchants.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import AdminCategories from '../views/admin/AdminCategories.vue'
import AdminOrders from '../views/admin/AdminOrders.vue'
import AdminFinance from '../views/admin/AdminFinance.vue'
import AdminMarketing from '../views/admin/AdminMarketing.vue'
import AdminSettings from '../views/admin/AdminSettings.vue'
import AdminProducts from "../views/admin/AdminProducts.vue";
import ProductReviewList from '../views/agent/ProductReviewList.vue'
import ProductReviewDetail from '../views/agent/ProductReviewDetail.vue'
import AiChat from '../views/agent/AiChat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/user/LoginRegister.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/seckill/:id',
    name: 'SeckillProductDetail',
    component: SeckillProductDetail
  },
  // AI Agent 商品审核路由
  {
    path: '/products/review',
    name: 'ProductReviewList',
    component: ProductReviewList
  },
  {
    path: '/products/review/:id',
    name: 'ProductReviewDetail',
    component: ProductReviewDetail
  },
  // AI Agent 聊天路由
  {
    path: '/ai-chat',
    name: 'AiChat',
    component: AiChat
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/user',
    name: 'UserCenter',
    component: UserCenter
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/seckill/checkout/:activityId',
    name: 'SeckillCheckout',
    component: SeckillCheckout
  },
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/refund/:id',
    name: 'RefundDetail',
    component: RefundDetail
  },
  // 商家端路由
  {
    path: '/merchant',
    component: MerchantLayout,
    children: [
      {
        path: '',
        name: 'MerchantDashboard',
        component: MerchantDashboard
      },
      {
        path: 'products',
        name: 'MerchantProducts',
        component: MerchantProducts
      },
      {
        path: 'orders',
        name: 'MerchantOrders',
        component: MerchantOrders
      },
      {
        path: 'marketing',
        name: 'MerchantMarketing',
        component: MerchantMarketing
      },
      {
        path: 'finance',
        name: 'MerchantFinance',
        component: MerchantFinance
      },
      {
        path: 'settings',
        name: 'MerchantSettings',
        component: MerchantSettings
      }
    ]
  },
  // 管理员端路由
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'merchants',
        name: 'AdminMerchants',
        component: AdminMerchants
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: AdminCategories
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: AdminProducts
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders
      },
      {
        path: 'finance',
        name: 'AdminFinance',
        component: AdminFinance
      },
      {
        path: 'marketing',
        name: 'AdminMarketing',
        component: AdminMarketing
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: AdminSettings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
