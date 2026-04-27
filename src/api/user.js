/**
 * 用户相关接口
 * 包含用户登录、注册、个人信息管理等功能
 */
import request from "./request.js";


export default {
  // 用户登录
  login: (data) => request.post('/auth/login', data, {
    ignoreAuth: true
  }),

  // 用户注册
  register: (data) => request.post('/auth/register', data),

  verifyCodeLogin: (data) => request.post('/auth/auth-code', data),
  // 获取用户信息
  getUserInfo: (userId) => ({
    url: `/api/user/${userId}`,
    method: 'GET'
  }),

  // 更新用户信息
  updateUserInfo: (userId, data) => ({
    url: `/api/user/${userId}`,
    method: 'PUT',
    data
  }),

  // 修改密码
  changePassword: (data) => ({
    url: '/api/user/password',
    method: 'PUT',
    data
  }),

  // 获取用户地址列表
  getAddresses: (userId) => ({
    url: `/api/user/${userId}/addresses`,
    method: 'GET'
  }),

  // 添加收货地址
  addAddress: (userId, data) => ({
    url: `/api/user/${userId}/addresses`,
    method: 'POST',
    data
  }),

  // 更新收货地址
  updateAddress: (userId, addressId, data) => ({
    url: `/api/user/${userId}/addresses/${addressId}`,
    method: 'PUT',
    data
  }),

  // 删除收货地址
  deleteAddress: (userId, addressId) => ({
    url: `/api/user/${userId}/addresses/${addressId}`,
    method: 'DELETE'
  }),

  // 设置默认地址
  setDefaultAddress: (userId, addressId) => ({
    url: `/api/user/${userId}/addresses/${addressId}/default`,
    method: 'PUT'
  }),

  // 用户登出
  logout: () => ({
    url: '/api/user/logout',
    method: 'POST'
  }),

  // 发送验证码
  sendVerifyCode: (email) => request.get('/auth/send-code', {
    params: { email }
  }),

  // 绑定手机号
  bindPhone: (userId, data) => ({
    url: `/api/user/${userId}/bindPhone`,
    method: 'POST',
    data
  }),

  // 绑定邮箱
  bindEmail: (userId, data) => ({
    url: `/api/user/${userId}/bindEmail`,
    method: 'POST',
    data
  }),

  // 获取用户收藏列表
  getFavorites: (userId, params) => ({
    url: `/api/user/${userId}/favorites`,
    method: 'GET',
    params
  }),

  // 添加收藏
  addFavorite: (userId, productId) => ({
    url: `/api/user/${userId}/favorites`,
    method: 'POST',
    data: { productId }
  }),

  // 取消收藏
  removeFavorite: (userId, productId) => ({
    url: `/api/user/${userId}/favorites/${productId}`,
    method: 'DELETE'
  }),

  // 检查是否已收藏
  checkFavorite: (userId, productId) => ({
    url: `/api/user/${userId}/favorites/check`,
    method: 'GET',
    params: { productId }
  }),

  // 获取用户优惠券列表
  getUserCoupons: (userId, params) => ({
    url: `/api/user/${userId}/coupons`,
    method: 'GET',
    params
  }),

  // 领取优惠券
  receiveCoupon: (userId, couponId) => ({
    url: `/api/user/${userId}/coupons/${couponId}`,
    method: 'POST'
  })
}
