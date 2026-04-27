// 模拟商品数据
export const products = [
  {
    id: 1,
    name: 'Apple AirPods Pro 2',
    price: 1899,
    originalPrice: 2199,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
    isHot: true,
    isFeatured: true,
    rating: 4.9,
    sales: 5280,
    description: '主动降噪，空间音频，MagSafe充电盒'
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    price: 799,
    originalPrice: 999,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    isHot: true,
    isFeatured: true,
    rating: 4.7,
    sales: 3280,
    description: '经典气垫运动鞋，舒适缓震'
  },
  {
    id: 3,
    name: 'Dyson V15吸尘器',
    price: 4990,
    originalPrice: 5990,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    isHot: true,
    isFeatured: true,
    rating: 4.8,
    sales: 1890,
    description: '激光探测，LCD屏幕，强劲吸力'
  },
  {
    id: 4,
    name: 'iPhone 15 Pro Max',
    price: 8999,
    originalPrice: 9999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    isHot: true,
    isFeatured: false,
    rating: 4.9,
    sales: 8920,
    description: 'A17 Pro芯片，钛金属设计，USB-C接口'
  },
  {
    id: 5,
    name: 'Adidas三叶草外套',
    price: 399,
    originalPrice: 599,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    isHot: false,
    isFeatured: false,
    rating: 4.5,
    sales: 1560,
    description: '经典三叶草Logo，宽松版型'
  },
  {
    id: 6,
    name: '戴森空气净化器',
    price: 3690,
    originalPrice: 4290,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    isHot: false,
    isFeatured: true,
    rating: 4.7,
    sales: 2340,
    description: 'HEPA滤网，除甲醛，智能监测'
  },
  {
    id: 7,
    name: 'Samsung Galaxy S24',
    price: 5999,
    originalPrice: 6999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    isHot: false,
    isFeatured: false,
    rating: 4.6,
    sales: 3450,
    description: 'AI手机，Galaxy AI，超视觉夜拍'
  },
  {
    id: 8,
    name: 'UNIQLO联名T恤',
    price: 99,
    originalPrice: 149,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    isHot: false,
    isFeatured: false,
    rating: 4.4,
    sales: 8920,
    description: '联名设计，纯棉面料，透气舒适'
  },
  {
    id: 9,
    name: '小米智能电视ES65',
    price: 2799,
    originalPrice: 3499,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    isHot: false,
    isFeatured: false,
    rating: 4.5,
    sales: 4210,
    description: '4K量子点屏，MEMC运动补偿，小爱同学'
  },
  {
    id: 10,
    name: '索尼WH-1000XM5',
    price: 2499,
    originalPrice: 2999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    isHot: true,
    isFeatured: false,
    rating: 4.8,
    sales: 5670,
    description: '业界领先降噪，30小时续航，LDAC音质'
  },
  {
    id: 11,
    name: '华为Mate 60 Pro',
    price: 6999,
    originalPrice: 7999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
    isHot: true,
    isFeatured: false,
    rating: 4.7,
    sales: 4530,
    description: '卫星通话，昆仑玻璃，鸿蒙系统'
  },
  {
    id: 12,
    name: '宜家简约台灯',
    price: 199,
    originalPrice: 299,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    isHot: false,
    isFeatured: false,
    rating: 4.3,
    sales: 2890,
    description: '北欧简约设计，可调节亮度，节能LED'
  }
]

// 商品分类
export const categories = [
  { value: 'electronics', label: '数码电子' },
  { value: 'clothing', label: '服饰服装' },
  { value: 'home', label: '家居生活' }
]
