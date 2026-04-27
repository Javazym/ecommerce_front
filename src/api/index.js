/**
 * API模块统一导出
 * 按功能模块组织API接口
 */
import request from './request';

// 购物车模块
import cart from './modules/cart';

// 用户模块
import user from './modules/user';

// 收货地址模块
import address from './modules/address';

// 管理员模块
import admin from './modules/admin';

// 优惠券模块
import coupon from './modules/coupon';

// 商品评价模块
import review from './modules/review';

// 商家财务模块
import merchant from './modules/merchant';

// 商品模块
import product from './modules/product';

// 收藏模块
import favorite from './modules/favorite';

// 商家入驻模块
import settlement from './modules/settlement';

// 轮播图模块
import banner from './modules/banner';

// 公告模块
import announcement from './modules/announcement';

// 文件上传模块
import file from './modules/file';

// 导出所有API模块
export default {
  request,
  cart,
  user,
  address,
  admin,
  coupon,
  review,
  merchant,
  product,
  favorite,
  settlement,
  banner,
  announcement,
  file
};

// 单独导出各模块，方便按需引入
export {
  request,
  cart,
  user,
  address,
  admin,
  coupon,
  review,
  merchant,
  product,
  favorite,
  settlement,
  banner,
  announcement,
  file
};
