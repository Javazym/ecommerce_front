import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import UserCenter from '../views/UserCenter.vue'
import Checkout from '../views/Checkout.vue'
import OrderDetail from '../views/OrderDetail.vue'
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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/LoginRegister.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
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
    path: '/order/:id',
    name: 'OrderDetail',
    component: OrderDetail
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
        component: AdminCategories
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
