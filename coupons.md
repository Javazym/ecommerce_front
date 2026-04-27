# 文档

## 优惠券控制器


### 获取优惠券列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/coupons


描述：获取优惠券列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| merchantId | int64 | 否 | - | No comments found. | 0 |
| status | int32 | 否 | - | No comments found. | 0 |
| pageNum | int32 | 是 | - | No comments found. | 1 |
| pageSize | int32 | 是 | - | No comments found. | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | 主键ID | 0 |
|     └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|     └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|     └ merchant | object | 否 |  | 商家ID：0-平台券 |  |
|       └ id | int64 | 否 | - | 主键ID | 0 |
|       └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|       └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|       └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|       └ userId | string | 否 | - | 关联用户ID |  |
|       └ account | object | 否 |  | No comments found. |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ merchant | object | 否 |  | 商家ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ userId | string | 否 | - | 关联用户ID |  |
|           └ account | object | 否 | - | No comments found. |  |
|           └ storeName | string | 否 | - | 店铺名称 |  |
|           └ storeLogo | string | 否 | - | 店铺Logo |  |
|           └ storeBanner | string | 否 | - | 店铺横幅 |  |
|           └ storeDescription | string | 否 | - | 店铺简介 |  |
|           └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|           └ category | array | 否 | - | 主营类目 | , |
|           └ contactName | string | 否 | - | 联系人 |  |
|           └ contactPhone | string | 否 | - | 联系电话 |  |
|           └ contactEmail | string | 否 | - | 联系邮箱 |  |
|           └ rating | number | 否 | - | 店铺评分 | 0 |
|           └ sales | int64 | 否 | - | 总销售额 | 0 |
|           └ followers | int32 | 否 | - | 关注数 | 0 |
|           └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|           └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|           └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|           └ products | array | 否 |  | 商品列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ merchant | object | 否 | - | 商家ID |  |
|             └ categoryId | int64 | 否 | - | 分类ID | 0 |
|             └ name | string | 否 | - | 商品名称 |  |
|             └ subName | string | 否 | - | 副标题 |  |
|             └ image | string | 否 | - | 主图 |  |
|             └ images | array | 否 | - | 图册（JSON数组） | , |
|             └ price | number | 否 | - | 价格 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ costPrice | number | 否 | - | 成本价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ soldCount | int32 | 否 | - | 销量 | 0 |
|             └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|             └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|             └ rating | number | 否 | - | 评分 | 0 |
|             └ description | string | 否 | - | 商品描述 |  |
|             └ detail | string | 否 | - | 商品详情（HTML） |  |
|             └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|             └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|             └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|             └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|             └ tags | string | 否 | - | 标签（JSON数组） |  |
|             └ keywords | string | 否 | - | 关键词 |  |
|             └ skus | array | 否 |  | SKU列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ skuCode | string | 否 | - | SKU编码 |  |
|               └ specs | object | 否 | - | 规格组合（JSON） |  |
|               └ price | number | 否 | - | 销售价 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|               └ image | string | 否 | - | SKU图片 |  |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|             └ specs | array | 否 |  | 规格列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|               └ values | array | 否 | - | 规格值列表 |  |
|         └ totalIncome | number | 否 | - | 总收入 | 0 |
|         └ withdrawable | number | 否 | - | 可提现 | 0 |
|         └ withdrawn | number | 否 | - | 已提现 | 0 |
|         └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|       └ storeName | string | 否 | - | 店铺名称 |  |
|       └ storeLogo | string | 否 | - | 店铺Logo |  |
|       └ storeBanner | string | 否 | - | 店铺横幅 |  |
|       └ storeDescription | string | 否 | - | 店铺简介 |  |
|       └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|       └ category | array | 否 | - | 主营类目 | , |
|       └ contactName | string | 否 | - | 联系人 |  |
|       └ contactPhone | string | 否 | - | 联系电话 |  |
|       └ contactEmail | string | 否 | - | 联系邮箱 |  |
|       └ rating | number | 否 | - | 店铺评分 | 0 |
|       └ sales | int64 | 否 | - | 总销售额 | 0 |
|       └ followers | int32 | 否 | - | 关注数 | 0 |
|       └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|       └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|       └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|       └ products | array | 否 |  | 商品列表 |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ merchant | object | 否 |  | 商家ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ userId | string | 否 | - | 关联用户ID |  |
|           └ account | object | 否 |  | No comments found. |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ merchant | object | 否 |  | 商家ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ userId | string | 否 | - | 关联用户ID |  |
|               └ account | object | 否 | - | No comments found. |  |
|               └ storeName | string | 否 | - | 店铺名称 |  |
|               └ storeLogo | string | 否 | - | 店铺Logo |  |
|               └ storeBanner | string | 否 | - | 店铺横幅 |  |
|               └ storeDescription | string | 否 | - | 店铺简介 |  |
|               └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|               └ category | array | 否 | - | 主营类目 | , |
|               └ contactName | string | 否 | - | 联系人 |  |
|               └ contactPhone | string | 否 | - | 联系电话 |  |
|               └ contactEmail | string | 否 | - | 联系邮箱 |  |
|               └ rating | number | 否 | - | 店铺评分 | 0 |
|               └ sales | int64 | 否 | - | 总销售额 | 0 |
|               └ followers | int32 | 否 | - | 关注数 | 0 |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|               └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|               └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|               └ products | array | 否 | - | 商品列表 |  |
|             └ totalIncome | number | 否 | - | 总收入 | 0 |
|             └ withdrawable | number | 否 | - | 可提现 | 0 |
|             └ withdrawn | number | 否 | - | 已提现 | 0 |
|             └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|           └ storeName | string | 否 | - | 店铺名称 |  |
|           └ storeLogo | string | 否 | - | 店铺Logo |  |
|           └ storeBanner | string | 否 | - | 店铺横幅 |  |
|           └ storeDescription | string | 否 | - | 店铺简介 |  |
|           └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|           └ category | array | 否 | - | 主营类目 | , |
|           └ contactName | string | 否 | - | 联系人 |  |
|           └ contactPhone | string | 否 | - | 联系电话 |  |
|           └ contactEmail | string | 否 | - | 联系邮箱 |  |
|           └ rating | number | 否 | - | 店铺评分 | 0 |
|           └ sales | int64 | 否 | - | 总销售额 | 0 |
|           └ followers | int32 | 否 | - | 关注数 | 0 |
|           └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|           └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|           └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|           └ products | array | 否 |  | 商品列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ merchant | object | 否 |  | 商家ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ userId | string | 否 | - | 关联用户ID |  |
|               └ account | object | 否 | - | No comments found. |  |
|               └ storeName | string | 否 | - | 店铺名称 |  |
|               └ storeLogo | string | 否 | - | 店铺Logo |  |
|               └ storeBanner | string | 否 | - | 店铺横幅 |  |
|               └ storeDescription | string | 否 | - | 店铺简介 |  |
|               └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|               └ category | array | 否 | - | 主营类目 | , |
|               └ contactName | string | 否 | - | 联系人 |  |
|               └ contactPhone | string | 否 | - | 联系电话 |  |
|               └ contactEmail | string | 否 | - | 联系邮箱 |  |
|               └ rating | number | 否 | - | 店铺评分 | 0 |
|               └ sales | int64 | 否 | - | 总销售额 | 0 |
|               └ followers | int32 | 否 | - | 关注数 | 0 |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|               └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|               └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|               └ products | array | 否 | - | 商品列表 |  |
|             └ categoryId | int64 | 否 | - | 分类ID | 0 |
|             └ name | string | 否 | - | 商品名称 |  |
|             └ subName | string | 否 | - | 副标题 |  |
|             └ image | string | 否 | - | 主图 |  |
|             └ images | array | 否 | - | 图册（JSON数组） | , |
|             └ price | number | 否 | - | 价格 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ costPrice | number | 否 | - | 成本价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ soldCount | int32 | 否 | - | 销量 | 0 |
|             └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|             └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|             └ rating | number | 否 | - | 评分 | 0 |
|             └ description | string | 否 | - | 商品描述 |  |
|             └ detail | string | 否 | - | 商品详情（HTML） |  |
|             └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|             └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|             └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|             └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|             └ tags | string | 否 | - | 标签（JSON数组） |  |
|             └ keywords | string | 否 | - | 关键词 |  |
|             └ skus | array | 否 |  | SKU列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ skuCode | string | 否 | - | SKU编码 |  |
|               └ specs | object | 否 | - | 规格组合（JSON） |  |
|               └ price | number | 否 | - | 销售价 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|               └ image | string | 否 | - | SKU图片 |  |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|             └ specs | array | 否 |  | 规格列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|               └ values | array | 否 | - | 规格值列表 |  |
|         └ categoryId | int64 | 否 | - | 分类ID | 0 |
|         └ name | string | 否 | - | 商品名称 |  |
|         └ subName | string | 否 | - | 副标题 |  |
|         └ image | string | 否 | - | 主图 |  |
|         └ images | array | 否 | - | 图册（JSON数组） | , |
|         └ price | number | 否 | - | 价格 | 0 |
|         └ originalPrice | number | 否 | - | 原价 | 0 |
|         └ costPrice | number | 否 | - | 成本价 | 0 |
|         └ stock | int32 | 否 | - | 库存 | 0 |
|         └ soldCount | int32 | 否 | - | 销量 | 0 |
|         └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|         └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|         └ rating | number | 否 | - | 评分 | 0 |
|         └ description | string | 否 | - | 商品描述 |  |
|         └ detail | string | 否 | - | 商品详情（HTML） |  |
|         └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|         └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|         └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|         └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|         └ tags | string | 否 | - | 标签（JSON数组） |  |
|         └ keywords | string | 否 | - | 关键词 |  |
|         └ skus | array | 否 |  | SKU列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ product | object | 否 |  | 商品ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ merchant | object | 否 |  | 商家ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ userId | string | 否 | - | 关联用户ID |  |
|               └ account | object | 否 | - | No comments found. |  |
|               └ storeName | string | 否 | - | 店铺名称 |  |
|               └ storeLogo | string | 否 | - | 店铺Logo |  |
|               └ storeBanner | string | 否 | - | 店铺横幅 |  |
|               └ storeDescription | string | 否 | - | 店铺简介 |  |
|               └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|               └ category | array | 否 | - | 主营类目 | , |
|               └ contactName | string | 否 | - | 联系人 |  |
|               └ contactPhone | string | 否 | - | 联系电话 |  |
|               └ contactEmail | string | 否 | - | 联系邮箱 |  |
|               └ rating | number | 否 | - | 店铺评分 | 0 |
|               └ sales | int64 | 否 | - | 总销售额 | 0 |
|               └ followers | int32 | 否 | - | 关注数 | 0 |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|               └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|               └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|               └ products | array | 否 | - | 商品列表 |  |
|             └ categoryId | int64 | 否 | - | 分类ID | 0 |
|             └ name | string | 否 | - | 商品名称 |  |
|             └ subName | string | 否 | - | 副标题 |  |
|             └ image | string | 否 | - | 主图 |  |
|             └ images | array | 否 | - | 图册（JSON数组） | , |
|             └ price | number | 否 | - | 价格 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ costPrice | number | 否 | - | 成本价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ soldCount | int32 | 否 | - | 销量 | 0 |
|             └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|             └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|             └ rating | number | 否 | - | 评分 | 0 |
|             └ description | string | 否 | - | 商品描述 |  |
|             └ detail | string | 否 | - | 商品详情（HTML） |  |
|             └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|             └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|             └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|             └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|             └ tags | string | 否 | - | 标签（JSON数组） |  |
|             └ keywords | string | 否 | - | 关键词 |  |
|             └ skus | array | 否 |  | SKU列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ skuCode | string | 否 | - | SKU编码 |  |
|               └ specs | object | 否 | - | 规格组合（JSON） |  |
|               └ price | number | 否 | - | 销售价 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|               └ image | string | 否 | - | SKU图片 |  |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|             └ specs | array | 否 |  | 规格列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|               └ values | array | 否 | - | 规格值列表 |  |
|           └ skuCode | string | 否 | - | SKU编码 |  |
|           └ specs | object | 否 | - | 规格组合（JSON） |  |
|           └ price | number | 否 | - | 销售价 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|           └ image | string | 否 | - | SKU图片 |  |
|           └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|         └ specs | array | 否 |  | 规格列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ product | object | 否 |  | 商品ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ merchant | object | 否 |  | 商家ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ userId | string | 否 | - | 关联用户ID |  |
|               └ account | object | 否 | - | No comments found. |  |
|               └ storeName | string | 否 | - | 店铺名称 |  |
|               └ storeLogo | string | 否 | - | 店铺Logo |  |
|               └ storeBanner | string | 否 | - | 店铺横幅 |  |
|               └ storeDescription | string | 否 | - | 店铺简介 |  |
|               └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|               └ category | array | 否 | - | 主营类目 | , |
|               └ contactName | string | 否 | - | 联系人 |  |
|               └ contactPhone | string | 否 | - | 联系电话 |  |
|               └ contactEmail | string | 否 | - | 联系邮箱 |  |
|               └ rating | number | 否 | - | 店铺评分 | 0 |
|               └ sales | int64 | 否 | - | 总销售额 | 0 |
|               └ followers | int32 | 否 | - | 关注数 | 0 |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|               └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|               └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|               └ products | array | 否 | - | 商品列表 |  |
|             └ categoryId | int64 | 否 | - | 分类ID | 0 |
|             └ name | string | 否 | - | 商品名称 |  |
|             └ subName | string | 否 | - | 副标题 |  |
|             └ image | string | 否 | - | 主图 |  |
|             └ images | array | 否 | - | 图册（JSON数组） | , |
|             └ price | number | 否 | - | 价格 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ costPrice | number | 否 | - | 成本价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ soldCount | int32 | 否 | - | 销量 | 0 |
|             └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|             └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|             └ rating | number | 否 | - | 评分 | 0 |
|             └ description | string | 否 | - | 商品描述 |  |
|             └ detail | string | 否 | - | 商品详情（HTML） |  |
|             └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|             └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|             └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|             └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|             └ tags | string | 否 | - | 标签（JSON数组） |  |
|             └ keywords | string | 否 | - | 关键词 |  |
|             └ skus | array | 否 |  | SKU列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ skuCode | string | 否 | - | SKU编码 |  |
|               └ specs | object | 否 | - | 规格组合（JSON） |  |
|               └ price | number | 否 | - | 销售价 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|               └ image | string | 否 | - | SKU图片 |  |
|               └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|             └ specs | array | 否 |  | 规格列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|               └ values | array | 否 | - | 规格值列表 |  |
|           └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|           └ sort | int32 | 否 | - | 排序 | 0 |
|           └ values | array | 否 |  | 规格值列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ spec | object | 否 |  | 规格ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ product | object | 否 | - | 商品ID |  |
|               └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|               └ values | array | 否 | - | 规格值列表 |  |
|             └ value | string | 否 | - | 规格值 |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|     └ name | string | 否 | - | 优惠券名称 |  |
|     └ type | int32 | 否 | - | 类型：0-满减，1-折扣 | 0 |
|     └ value | number | 否 | - | 面值/折扣 | 0 |
|     └ minAmount | number | 否 | - | 最低消费 | 0 |
|     └ maxDiscount | number | 否 | - | 最高优惠 | 0 |
|     └ totalCount | int32 | 否 | - | 发放总量 | 0 |
|     └ receiveCount | int32 | 否 | - | 已领取数量 | 0 |
|     └ usedCount | int32 | 否 | - | 已使用数量 | 0 |
|     └ limitPerUser | int32 | 否 | - | 每人限领 | 0 |
|     └ startTime | string | 否 | - | 开始时间 | yyyy-MM-dd HH:mm:ss |
|     └ endTime | string | 否 | - | 结束时间 | yyyy-MM-dd HH:mm:ss |
|     └ validDays | int32 | 否 | - | 领取后天数 | 0 |
|     └ scope | string | 否 | - | 使用范围：all-全场，category-分类，product-商品 |  |
|     └ categoryIds | string | 否 | - | 分类ID（JSON数组） |  |
|     └ productIds | string | 否 | - | 商品ID（JSON数组） |  |
|     └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ numberOfElements | int32 | 否 | - | No comments found. | 0 |
|   └ empty | boolean | 否 | - | No comments found. | true |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": {
        "totalElements": 0,
        "totalPages": 0,
        "size": 0,
        "content": [
            {
                "id": 0,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                "deleted": 0,
                "merchant": {
                    "id": 0,
                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                    "deleted": 0,
                    "userId": "string",
                    "account": {
                        "id": 0,
                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                        "deleted": 0,
                        "merchant": {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "userId": "string",
                            "account": {},
                            "storeName": "string",
                            "storeLogo": "string",
                            "storeBanner": "string",
                            "storeDescription": "string",
                            "storeType": "string",
                            "category": [
                                0,
                                0
                            ],
                            "contactName": "string",
                            "contactPhone": "string",
                            "contactEmail": "string",
                            "rating": 0,
                            "sales": 0,
                            "followers": 0,
                            "status": 0,
                            "auditStatus": "PENDING",
                            "auditTime": "yyyy-MM-dd HH:mm:ss",
                            "products": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {},
                                    "categoryId": 0,
                                    "name": "string",
                                    "subName": "string",
                                    "image": "string",
                                    "images": [
                                        0,
                                        0
                                    ],
                                    "price": 0,
                                    "originalPrice": 0,
                                    "costPrice": 0,
                                    "stock": 0,
                                    "soldCount": 0,
                                    "reviewCount": 0,
                                    "favoriteCount": 0,
                                    "rating": 0,
                                    "description": "string",
                                    "detail": "string",
                                    "isHot": 0,
                                    "isFeatured": 0,
                                    "isNew": 0,
                                    "publishStatus": 0,
                                    "tags": "string",
                                    "keywords": "string",
                                    "skus": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {},
                                            "skuCode": "string",
                                            "specs": {},
                                            "price": 0,
                                            "originalPrice": 0,
                                            "stock": 0,
                                            "lowStock": 0,
                                            "image": "string",
                                            "status": 0
                                        }
                                    ],
                                    "specs": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {},
                                            "name": "string",
                                            "sort": 0,
                                            "values": []
                                        }
                                    ]
                                }
                            ]
                        },
                        "totalIncome": 0,
                        "withdrawable": 0,
                        "withdrawn": 0,
                        "pendingWithdraw": 0
                    },
                    "storeName": "string",
                    "storeLogo": "string",
                    "storeBanner": "string",
                    "storeDescription": "string",
                    "storeType": "string",
                    "category": [
                        0,
                        0
                    ],
                    "contactName": "string",
                    "contactPhone": "string",
                    "contactEmail": "string",
                    "rating": 0,
                    "sales": 0,
                    "followers": 0,
                    "status": 0,
                    "auditStatus": "PENDING",
                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                    "products": [
                        {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "merchant": {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "userId": "string",
                                "account": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "userId": "string",
                                        "account": {},
                                        "storeName": "string",
                                        "storeLogo": "string",
                                        "storeBanner": "string",
                                        "storeDescription": "string",
                                        "storeType": "string",
                                        "category": [
                                            0,
                                            0
                                        ],
                                        "contactName": "string",
                                        "contactPhone": "string",
                                        "contactEmail": "string",
                                        "rating": 0,
                                        "sales": 0,
                                        "followers": 0,
                                        "status": 0,
                                        "auditStatus": "PENDING",
                                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                                        "products": []
                                    },
                                    "totalIncome": 0,
                                    "withdrawable": 0,
                                    "withdrawn": 0,
                                    "pendingWithdraw": 0
                                },
                                "storeName": "string",
                                "storeLogo": "string",
                                "storeBanner": "string",
                                "storeDescription": "string",
                                "storeType": "string",
                                "category": [
                                    0,
                                    0
                                ],
                                "contactName": "string",
                                "contactPhone": "string",
                                "contactEmail": "string",
                                "rating": 0,
                                "sales": 0,
                                "followers": 0,
                                "status": 0,
                                "auditStatus": "PENDING",
                                "auditTime": "yyyy-MM-dd HH:mm:ss",
                                "products": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "userId": "string",
                                            "account": {},
                                            "storeName": "string",
                                            "storeLogo": "string",
                                            "storeBanner": "string",
                                            "storeDescription": "string",
                                            "storeType": "string",
                                            "category": [
                                                0,
                                                0
                                            ],
                                            "contactName": "string",
                                            "contactPhone": "string",
                                            "contactEmail": "string",
                                            "rating": 0,
                                            "sales": 0,
                                            "followers": 0,
                                            "status": 0,
                                            "auditStatus": "PENDING",
                                            "auditTime": "yyyy-MM-dd HH:mm:ss",
                                            "products": []
                                        },
                                        "categoryId": 0,
                                        "name": "string",
                                        "subName": "string",
                                        "image": "string",
                                        "images": [
                                            0,
                                            0
                                        ],
                                        "price": 0,
                                        "originalPrice": 0,
                                        "costPrice": 0,
                                        "stock": 0,
                                        "soldCount": 0,
                                        "reviewCount": 0,
                                        "favoriteCount": 0,
                                        "rating": 0,
                                        "description": "string",
                                        "detail": "string",
                                        "isHot": 0,
                                        "isFeatured": 0,
                                        "isNew": 0,
                                        "publishStatus": 0,
                                        "tags": "string",
                                        "keywords": "string",
                                        "skus": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "skuCode": "string",
                                                "specs": {},
                                                "price": 0,
                                                "originalPrice": 0,
                                                "stock": 0,
                                                "lowStock": 0,
                                                "image": "string",
                                                "status": 0
                                            }
                                        ],
                                        "specs": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "name": "string",
                                                "sort": 0,
                                                "values": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            "categoryId": 0,
                            "name": "string",
                            "subName": "string",
                            "image": "string",
                            "images": [
                                0,
                                0
                            ],
                            "price": 0,
                            "originalPrice": 0,
                            "costPrice": 0,
                            "stock": 0,
                            "soldCount": 0,
                            "reviewCount": 0,
                            "favoriteCount": 0,
                            "rating": 0,
                            "description": "string",
                            "detail": "string",
                            "isHot": 0,
                            "isFeatured": 0,
                            "isNew": 0,
                            "publishStatus": 0,
                            "tags": "string",
                            "keywords": "string",
                            "skus": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "product": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "userId": "string",
                                            "account": {},
                                            "storeName": "string",
                                            "storeLogo": "string",
                                            "storeBanner": "string",
                                            "storeDescription": "string",
                                            "storeType": "string",
                                            "category": [
                                                0,
                                                0
                                            ],
                                            "contactName": "string",
                                            "contactPhone": "string",
                                            "contactEmail": "string",
                                            "rating": 0,
                                            "sales": 0,
                                            "followers": 0,
                                            "status": 0,
                                            "auditStatus": "PENDING",
                                            "auditTime": "yyyy-MM-dd HH:mm:ss",
                                            "products": []
                                        },
                                        "categoryId": 0,
                                        "name": "string",
                                        "subName": "string",
                                        "image": "string",
                                        "images": [
                                            0,
                                            0
                                        ],
                                        "price": 0,
                                        "originalPrice": 0,
                                        "costPrice": 0,
                                        "stock": 0,
                                        "soldCount": 0,
                                        "reviewCount": 0,
                                        "favoriteCount": 0,
                                        "rating": 0,
                                        "description": "string",
                                        "detail": "string",
                                        "isHot": 0,
                                        "isFeatured": 0,
                                        "isNew": 0,
                                        "publishStatus": 0,
                                        "tags": "string",
                                        "keywords": "string",
                                        "skus": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "skuCode": "string",
                                                "specs": {},
                                                "price": 0,
                                                "originalPrice": 0,
                                                "stock": 0,
                                                "lowStock": 0,
                                                "image": "string",
                                                "status": 0
                                            }
                                        ],
                                        "specs": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "name": "string",
                                                "sort": 0,
                                                "values": []
                                            }
                                        ]
                                    },
                                    "skuCode": "string",
                                    "specs": {},
                                    "price": 0,
                                    "originalPrice": 0,
                                    "stock": 0,
                                    "lowStock": 0,
                                    "image": "string",
                                    "status": 0
                                }
                            ],
                            "specs": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "product": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "userId": "string",
                                            "account": {},
                                            "storeName": "string",
                                            "storeLogo": "string",
                                            "storeBanner": "string",
                                            "storeDescription": "string",
                                            "storeType": "string",
                                            "category": [
                                                0,
                                                0
                                            ],
                                            "contactName": "string",
                                            "contactPhone": "string",
                                            "contactEmail": "string",
                                            "rating": 0,
                                            "sales": 0,
                                            "followers": 0,
                                            "status": 0,
                                            "auditStatus": "PENDING",
                                            "auditTime": "yyyy-MM-dd HH:mm:ss",
                                            "products": []
                                        },
                                        "categoryId": 0,
                                        "name": "string",
                                        "subName": "string",
                                        "image": "string",
                                        "images": [
                                            0,
                                            0
                                        ],
                                        "price": 0,
                                        "originalPrice": 0,
                                        "costPrice": 0,
                                        "stock": 0,
                                        "soldCount": 0,
                                        "reviewCount": 0,
                                        "favoriteCount": 0,
                                        "rating": 0,
                                        "description": "string",
                                        "detail": "string",
                                        "isHot": 0,
                                        "isFeatured": 0,
                                        "isNew": 0,
                                        "publishStatus": 0,
                                        "tags": "string",
                                        "keywords": "string",
                                        "skus": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "skuCode": "string",
                                                "specs": {},
                                                "price": 0,
                                                "originalPrice": 0,
                                                "stock": 0,
                                                "lowStock": 0,
                                                "image": "string",
                                                "status": 0
                                            }
                                        ],
                                        "specs": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "name": "string",
                                                "sort": 0,
                                                "values": []
                                            }
                                        ]
                                    },
                                    "name": "string",
                                    "sort": 0,
                                    "values": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "spec": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "product": {},
                                                "name": "string",
                                                "sort": 0,
                                                "values": []
                                            },
                                            "value": "string",
                                            "sort": 0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "name": "string",
                "type": 0,
                "value": 0,
                "minAmount": 0,
                "maxDiscount": 0,
                "totalCount": 0,
                "receiveCount": 0,
                "usedCount": 0,
                "limitPerUser": 0,
                "startTime": "yyyy-MM-dd HH:mm:ss",
                "endTime": "yyyy-MM-dd HH:mm:ss",
                "validDays": 0,
                "scope": "string",
                "categoryIds": "string",
                "productIds": "string",
                "status": 0
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
        "pageable": {
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            },
            "pageNumber": 0,
            "unpaged": true,
            "paged": true,
            "pageSize": 0
        },
        "first": true,
        "last": true,
        "numberOfElements": 0,
        "empty": true
    },
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 获取可用优惠券

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/coupons/available


描述：获取可用优惠券

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| userId | string | 是 | - | No comments found. |  |
| orderAmount | number | 是 | - | No comments found. | 0 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | array | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | 主键ID | 0 |
|   └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|   └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|   └ merchant | object | 否 |  | 商家ID：0-平台券 |  |
|     └ id | int64 | 否 | - | 主键ID | 0 |
|     └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|     └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|     └ userId | string | 否 | - | 关联用户ID |  |
|     └ account | object | 否 |  | No comments found. |  |
|       └ id | int64 | 否 | - | 主键ID | 0 |
|       └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|       └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|       └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|       └ merchant | object | 否 |  | 商家ID |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ userId | string | 否 | - | 关联用户ID |  |
|         └ account | object | 否 | - | No comments found. |  |
|         └ storeName | string | 否 | - | 店铺名称 |  |
|         └ storeLogo | string | 否 | - | 店铺Logo |  |
|         └ storeBanner | string | 否 | - | 店铺横幅 |  |
|         └ storeDescription | string | 否 | - | 店铺简介 |  |
|         └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|         └ category | array | 否 | - | 主营类目 | , |
|         └ contactName | string | 否 | - | 联系人 |  |
|         └ contactPhone | string | 否 | - | 联系电话 |  |
|         └ contactEmail | string | 否 | - | 联系邮箱 |  |
|         └ rating | number | 否 | - | 店铺评分 | 0 |
|         └ sales | int64 | 否 | - | 总销售额 | 0 |
|         └ followers | int32 | 否 | - | 关注数 | 0 |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|         └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|         └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|         └ products | array | 否 |  | 商品列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 | - | 商家ID |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 | - | 商品ID |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|       └ totalIncome | number | 否 | - | 总收入 | 0 |
|       └ withdrawable | number | 否 | - | 可提现 | 0 |
|       └ withdrawn | number | 否 | - | 已提现 | 0 |
|       └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|     └ storeName | string | 否 | - | 店铺名称 |  |
|     └ storeLogo | string | 否 | - | 店铺Logo |  |
|     └ storeBanner | string | 否 | - | 店铺横幅 |  |
|     └ storeDescription | string | 否 | - | 店铺简介 |  |
|     └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|     └ category | array | 否 | - | 主营类目 | , |
|     └ contactName | string | 否 | - | 联系人 |  |
|     └ contactPhone | string | 否 | - | 联系电话 |  |
|     └ contactEmail | string | 否 | - | 联系邮箱 |  |
|     └ rating | number | 否 | - | 店铺评分 | 0 |
|     └ sales | int64 | 否 | - | 总销售额 | 0 |
|     └ followers | int32 | 否 | - | 关注数 | 0 |
|     └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|     └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|     └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|     └ products | array | 否 |  | 商品列表 |  |
|       └ id | int64 | 否 | - | 主键ID | 0 |
|       └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|       └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|       └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|       └ merchant | object | 否 |  | 商家ID |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ userId | string | 否 | - | 关联用户ID |  |
|         └ account | object | 否 |  | No comments found. |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ totalIncome | number | 否 | - | 总收入 | 0 |
|           └ withdrawable | number | 否 | - | 可提现 | 0 |
|           └ withdrawn | number | 否 | - | 已提现 | 0 |
|           └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|         └ storeName | string | 否 | - | 店铺名称 |  |
|         └ storeLogo | string | 否 | - | 店铺Logo |  |
|         └ storeBanner | string | 否 | - | 店铺横幅 |  |
|         └ storeDescription | string | 否 | - | 店铺简介 |  |
|         └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|         └ category | array | 否 | - | 主营类目 | , |
|         └ contactName | string | 否 | - | 联系人 |  |
|         └ contactPhone | string | 否 | - | 联系电话 |  |
|         └ contactEmail | string | 否 | - | 联系邮箱 |  |
|         └ rating | number | 否 | - | 店铺评分 | 0 |
|         └ sales | int64 | 否 | - | 总销售额 | 0 |
|         └ followers | int32 | 否 | - | 关注数 | 0 |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|         └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|         └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|         └ products | array | 否 |  | 商品列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|       └ categoryId | int64 | 否 | - | 分类ID | 0 |
|       └ name | string | 否 | - | 商品名称 |  |
|       └ subName | string | 否 | - | 副标题 |  |
|       └ image | string | 否 | - | 主图 |  |
|       └ images | array | 否 | - | 图册（JSON数组） | , |
|       └ price | number | 否 | - | 价格 | 0 |
|       └ originalPrice | number | 否 | - | 原价 | 0 |
|       └ costPrice | number | 否 | - | 成本价 | 0 |
|       └ stock | int32 | 否 | - | 库存 | 0 |
|       └ soldCount | int32 | 否 | - | 销量 | 0 |
|       └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|       └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|       └ rating | number | 否 | - | 评分 | 0 |
|       └ description | string | 否 | - | 商品描述 |  |
|       └ detail | string | 否 | - | 商品详情（HTML） |  |
|       └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|       └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|       └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|       └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|       └ tags | string | 否 | - | 标签（JSON数组） |  |
|       └ keywords | string | 否 | - | 关键词 |  |
|       └ skus | array | 否 |  | SKU列表 |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ product | object | 否 |  | 商品ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|         └ skuCode | string | 否 | - | SKU编码 |  |
|         └ specs | object | 否 | - | 规格组合（JSON） |  |
|         └ price | number | 否 | - | 销售价 | 0 |
|         └ originalPrice | number | 否 | - | 原价 | 0 |
|         └ stock | int32 | 否 | - | 库存 | 0 |
|         └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|         └ image | string | 否 | - | SKU图片 |  |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|       └ specs | array | 否 |  | 规格列表 |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ product | object | 否 |  | 商品ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|         └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|         └ sort | int32 | 否 | - | 排序 | 0 |
|         └ values | array | 否 |  | 规格值列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ spec | object | 否 |  | 规格ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|           └ value | string | 否 | - | 规格值 |  |
|           └ sort | int32 | 否 | - | 排序 | 0 |
|   └ name | string | 否 | - | 优惠券名称 |  |
|   └ type | int32 | 否 | - | 类型：0-满减，1-折扣 | 0 |
|   └ value | number | 否 | - | 面值/折扣 | 0 |
|   └ minAmount | number | 否 | - | 最低消费 | 0 |
|   └ maxDiscount | number | 否 | - | 最高优惠 | 0 |
|   └ totalCount | int32 | 否 | - | 发放总量 | 0 |
|   └ receiveCount | int32 | 否 | - | 已领取数量 | 0 |
|   └ usedCount | int32 | 否 | - | 已使用数量 | 0 |
|   └ limitPerUser | int32 | 否 | - | 每人限领 | 0 |
|   └ startTime | string | 否 | - | 开始时间 | yyyy-MM-dd HH:mm:ss |
|   └ endTime | string | 否 | - | 结束时间 | yyyy-MM-dd HH:mm:ss |
|   └ validDays | int32 | 否 | - | 领取后天数 | 0 |
|   └ scope | string | 否 | - | 使用范围：all-全场，category-分类，product-商品 |  |
|   └ categoryIds | string | 否 | - | 分类ID（JSON数组） |  |
|   └ productIds | string | 否 | - | 商品ID（JSON数组） |  |
|   └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": [
        {
            "id": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss",
            "deleted": 0,
            "merchant": {
                "id": 0,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                "deleted": 0,
                "userId": "string",
                "account": {
                    "id": 0,
                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                    "deleted": 0,
                    "merchant": {
                        "id": 0,
                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                        "deleted": 0,
                        "userId": "string",
                        "account": {},
                        "storeName": "string",
                        "storeLogo": "string",
                        "storeBanner": "string",
                        "storeDescription": "string",
                        "storeType": "string",
                        "category": [
                            0,
                            0
                        ],
                        "contactName": "string",
                        "contactPhone": "string",
                        "contactEmail": "string",
                        "rating": 0,
                        "sales": 0,
                        "followers": 0,
                        "status": 0,
                        "auditStatus": "PENDING",
                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                        "products": [
                            {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "merchant": {},
                                "categoryId": 0,
                                "name": "string",
                                "subName": "string",
                                "image": "string",
                                "images": [
                                    0,
                                    0
                                ],
                                "price": 0,
                                "originalPrice": 0,
                                "costPrice": 0,
                                "stock": 0,
                                "soldCount": 0,
                                "reviewCount": 0,
                                "favoriteCount": 0,
                                "rating": 0,
                                "description": "string",
                                "detail": "string",
                                "isHot": 0,
                                "isFeatured": 0,
                                "isNew": 0,
                                "publishStatus": 0,
                                "tags": "string",
                                "keywords": "string",
                                "skus": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {},
                                        "skuCode": "string",
                                        "specs": {},
                                        "price": 0,
                                        "originalPrice": 0,
                                        "stock": 0,
                                        "lowStock": 0,
                                        "image": "string",
                                        "status": 0
                                    }
                                ],
                                "specs": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "name": "string",
                                        "sort": 0,
                                        "values": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "spec": {},
                                                "value": "string",
                                                "sort": 0
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "totalIncome": 0,
                    "withdrawable": 0,
                    "withdrawn": 0,
                    "pendingWithdraw": 0
                },
                "storeName": "string",
                "storeLogo": "string",
                "storeBanner": "string",
                "storeDescription": "string",
                "storeType": "string",
                "category": [
                    0,
                    0
                ],
                "contactName": "string",
                "contactPhone": "string",
                "contactEmail": "string",
                "rating": 0,
                "sales": 0,
                "followers": 0,
                "status": 0,
                "auditStatus": "PENDING",
                "auditTime": "yyyy-MM-dd HH:mm:ss",
                "products": [
                    {
                        "id": 0,
                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                        "deleted": 0,
                        "merchant": {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "userId": "string",
                            "account": {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "merchant": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "userId": "string",
                                    "account": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "totalIncome": 0,
                                        "withdrawable": 0,
                                        "withdrawn": 0,
                                        "pendingWithdraw": 0
                                    },
                                    "storeName": "string",
                                    "storeLogo": "string",
                                    "storeBanner": "string",
                                    "storeDescription": "string",
                                    "storeType": "string",
                                    "category": [
                                        0,
                                        0
                                    ],
                                    "contactName": "string",
                                    "contactPhone": "string",
                                    "contactEmail": "string",
                                    "rating": 0,
                                    "sales": 0,
                                    "followers": 0,
                                    "status": 0,
                                    "auditStatus": "PENDING",
                                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                                    "products": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        }
                                    ]
                                },
                                "totalIncome": 0,
                                "withdrawable": 0,
                                "withdrawn": 0,
                                "pendingWithdraw": 0
                            },
                            "storeName": "string",
                            "storeLogo": "string",
                            "storeBanner": "string",
                            "storeDescription": "string",
                            "storeType": "string",
                            "category": [
                                0,
                                0
                            ],
                            "contactName": "string",
                            "contactPhone": "string",
                            "contactEmail": "string",
                            "rating": 0,
                            "sales": 0,
                            "followers": 0,
                            "status": 0,
                            "auditStatus": "PENDING",
                            "auditTime": "yyyy-MM-dd HH:mm:ss",
                            "products": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "userId": "string",
                                        "account": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "totalIncome": 0,
                                            "withdrawable": 0,
                                            "withdrawn": 0,
                                            "pendingWithdraw": 0
                                        },
                                        "storeName": "string",
                                        "storeLogo": "string",
                                        "storeBanner": "string",
                                        "storeDescription": "string",
                                        "storeType": "string",
                                        "category": [
                                            0,
                                            0
                                        ],
                                        "contactName": "string",
                                        "contactPhone": "string",
                                        "contactEmail": "string",
                                        "rating": 0,
                                        "sales": 0,
                                        "followers": 0,
                                        "status": 0,
                                        "auditStatus": "PENDING",
                                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                                        "products": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            }
                                        ]
                                    },
                                    "categoryId": 0,
                                    "name": "string",
                                    "subName": "string",
                                    "image": "string",
                                    "images": [
                                        0,
                                        0
                                    ],
                                    "price": 0,
                                    "originalPrice": 0,
                                    "costPrice": 0,
                                    "stock": 0,
                                    "soldCount": 0,
                                    "reviewCount": 0,
                                    "favoriteCount": 0,
                                    "rating": 0,
                                    "description": "string",
                                    "detail": "string",
                                    "isHot": 0,
                                    "isFeatured": 0,
                                    "isNew": 0,
                                    "publishStatus": 0,
                                    "tags": "string",
                                    "keywords": "string",
                                    "skus": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "skuCode": "string",
                                            "specs": {},
                                            "price": 0,
                                            "originalPrice": 0,
                                            "stock": 0,
                                            "lowStock": 0,
                                            "image": "string",
                                            "status": 0
                                        }
                                    ],
                                    "specs": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "name": "string",
                                            "sort": 0,
                                            "values": [
                                                {
                                                    "id": 0,
                                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                    "deleted": 0,
                                                    "spec": {},
                                                    "value": "string",
                                                    "sort": 0
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "categoryId": 0,
                        "name": "string",
                        "subName": "string",
                        "image": "string",
                        "images": [
                            0,
                            0
                        ],
                        "price": 0,
                        "originalPrice": 0,
                        "costPrice": 0,
                        "stock": 0,
                        "soldCount": 0,
                        "reviewCount": 0,
                        "favoriteCount": 0,
                        "rating": 0,
                        "description": "string",
                        "detail": "string",
                        "isHot": 0,
                        "isFeatured": 0,
                        "isNew": 0,
                        "publishStatus": 0,
                        "tags": "string",
                        "keywords": "string",
                        "skus": [
                            {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "product": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "userId": "string",
                                        "account": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "totalIncome": 0,
                                            "withdrawable": 0,
                                            "withdrawn": 0,
                                            "pendingWithdraw": 0
                                        },
                                        "storeName": "string",
                                        "storeLogo": "string",
                                        "storeBanner": "string",
                                        "storeDescription": "string",
                                        "storeType": "string",
                                        "category": [
                                            0,
                                            0
                                        ],
                                        "contactName": "string",
                                        "contactPhone": "string",
                                        "contactEmail": "string",
                                        "rating": 0,
                                        "sales": 0,
                                        "followers": 0,
                                        "status": 0,
                                        "auditStatus": "PENDING",
                                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                                        "products": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            }
                                        ]
                                    },
                                    "categoryId": 0,
                                    "name": "string",
                                    "subName": "string",
                                    "image": "string",
                                    "images": [
                                        0,
                                        0
                                    ],
                                    "price": 0,
                                    "originalPrice": 0,
                                    "costPrice": 0,
                                    "stock": 0,
                                    "soldCount": 0,
                                    "reviewCount": 0,
                                    "favoriteCount": 0,
                                    "rating": 0,
                                    "description": "string",
                                    "detail": "string",
                                    "isHot": 0,
                                    "isFeatured": 0,
                                    "isNew": 0,
                                    "publishStatus": 0,
                                    "tags": "string",
                                    "keywords": "string",
                                    "skus": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "skuCode": "string",
                                            "specs": {},
                                            "price": 0,
                                            "originalPrice": 0,
                                            "stock": 0,
                                            "lowStock": 0,
                                            "image": "string",
                                            "status": 0
                                        }
                                    ],
                                    "specs": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "name": "string",
                                            "sort": 0,
                                            "values": [
                                                {
                                                    "id": 0,
                                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                    "deleted": 0,
                                                    "spec": {},
                                                    "value": "string",
                                                    "sort": 0
                                                }
                                            ]
                                        }
                                    ]
                                },
                                "skuCode": "string",
                                "specs": {},
                                "price": 0,
                                "originalPrice": 0,
                                "stock": 0,
                                "lowStock": 0,
                                "image": "string",
                                "status": 0
                            }
                        ],
                        "specs": [
                            {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "product": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "userId": "string",
                                        "account": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "totalIncome": 0,
                                            "withdrawable": 0,
                                            "withdrawn": 0,
                                            "pendingWithdraw": 0
                                        },
                                        "storeName": "string",
                                        "storeLogo": "string",
                                        "storeBanner": "string",
                                        "storeDescription": "string",
                                        "storeType": "string",
                                        "category": [
                                            0,
                                            0
                                        ],
                                        "contactName": "string",
                                        "contactPhone": "string",
                                        "contactEmail": "string",
                                        "rating": 0,
                                        "sales": 0,
                                        "followers": 0,
                                        "status": 0,
                                        "auditStatus": "PENDING",
                                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                                        "products": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            }
                                        ]
                                    },
                                    "categoryId": 0,
                                    "name": "string",
                                    "subName": "string",
                                    "image": "string",
                                    "images": [
                                        0,
                                        0
                                    ],
                                    "price": 0,
                                    "originalPrice": 0,
                                    "costPrice": 0,
                                    "stock": 0,
                                    "soldCount": 0,
                                    "reviewCount": 0,
                                    "favoriteCount": 0,
                                    "rating": 0,
                                    "description": "string",
                                    "detail": "string",
                                    "isHot": 0,
                                    "isFeatured": 0,
                                    "isNew": 0,
                                    "publishStatus": 0,
                                    "tags": "string",
                                    "keywords": "string",
                                    "skus": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "skuCode": "string",
                                            "specs": {},
                                            "price": 0,
                                            "originalPrice": 0,
                                            "stock": 0,
                                            "lowStock": 0,
                                            "image": "string",
                                            "status": 0
                                        }
                                    ],
                                    "specs": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "name": "string",
                                            "sort": 0,
                                            "values": [
                                                {
                                                    "id": 0,
                                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                    "deleted": 0,
                                                    "spec": {},
                                                    "value": "string",
                                                    "sort": 0
                                                }
                                            ]
                                        }
                                    ]
                                },
                                "name": "string",
                                "sort": 0,
                                "values": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "spec": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "product": {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "merchant": {},
                                                "categoryId": 0,
                                                "name": "string",
                                                "subName": "string",
                                                "image": "string",
                                                "images": [
                                                    0,
                                                    0
                                                ],
                                                "price": 0,
                                                "originalPrice": 0,
                                                "costPrice": 0,
                                                "stock": 0,
                                                "soldCount": 0,
                                                "reviewCount": 0,
                                                "favoriteCount": 0,
                                                "rating": 0,
                                                "description": "string",
                                                "detail": "string",
                                                "isHot": 0,
                                                "isFeatured": 0,
                                                "isNew": 0,
                                                "publishStatus": 0,
                                                "tags": "string",
                                                "keywords": "string",
                                                "skus": [],
                                                "specs": []
                                            },
                                            "name": "string",
                                            "sort": 0,
                                            "values": [
                                                {
                                                    "id": 0,
                                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                    "deleted": 0,
                                                    "spec": {},
                                                    "value": "string",
                                                    "sort": 0
                                                }
                                            ]
                                        },
                                        "value": "string",
                                        "sort": 0
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "name": "string",
            "type": 0,
            "value": 0,
            "minAmount": 0,
            "maxDiscount": 0,
            "totalCount": 0,
            "receiveCount": 0,
            "usedCount": 0,
            "limitPerUser": 0,
            "startTime": "yyyy-MM-dd HH:mm:ss",
            "endTime": "yyyy-MM-dd HH:mm:ss",
            "validDays": 0,
            "scope": "string",
            "categoryIds": "string",
            "productIds": "string",
            "status": 0
        }
    ],
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 获取优惠券详情

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/coupons/{couponId}


描述：获取优惠券详情

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| couponId | 是 | No comments found. | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | 主键ID | 0 |
|   └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|   └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|   └ merchant | object | 否 |  | 商家ID：0-平台券 |  |
|     └ id | int64 | 否 | - | 主键ID | 0 |
|     └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|     └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|     └ userId | string | 否 | - | 关联用户ID |  |
|     └ account | object | 否 |  | No comments found. |  |
|       └ id | int64 | 否 | - | 主键ID | 0 |
|       └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|       └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|       └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|       └ merchant | object | 否 |  | 商家ID |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ userId | string | 否 | - | 关联用户ID |  |
|         └ account | object | 否 | - | No comments found. |  |
|         └ storeName | string | 否 | - | 店铺名称 |  |
|         └ storeLogo | string | 否 | - | 店铺Logo |  |
|         └ storeBanner | string | 否 | - | 店铺横幅 |  |
|         └ storeDescription | string | 否 | - | 店铺简介 |  |
|         └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|         └ category | array | 否 | - | 主营类目 | , |
|         └ contactName | string | 否 | - | 联系人 |  |
|         └ contactPhone | string | 否 | - | 联系电话 |  |
|         └ contactEmail | string | 否 | - | 联系邮箱 |  |
|         └ rating | number | 否 | - | 店铺评分 | 0 |
|         └ sales | int64 | 否 | - | 总销售额 | 0 |
|         └ followers | int32 | 否 | - | 关注数 | 0 |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|         └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|         └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|         └ products | array | 否 |  | 商品列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 | - | 商家ID |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 | - | 商品ID |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|       └ totalIncome | number | 否 | - | 总收入 | 0 |
|       └ withdrawable | number | 否 | - | 可提现 | 0 |
|       └ withdrawn | number | 否 | - | 已提现 | 0 |
|       └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|     └ storeName | string | 否 | - | 店铺名称 |  |
|     └ storeLogo | string | 否 | - | 店铺Logo |  |
|     └ storeBanner | string | 否 | - | 店铺横幅 |  |
|     └ storeDescription | string | 否 | - | 店铺简介 |  |
|     └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|     └ category | array | 否 | - | 主营类目 | , |
|     └ contactName | string | 否 | - | 联系人 |  |
|     └ contactPhone | string | 否 | - | 联系电话 |  |
|     └ contactEmail | string | 否 | - | 联系邮箱 |  |
|     └ rating | number | 否 | - | 店铺评分 | 0 |
|     └ sales | int64 | 否 | - | 总销售额 | 0 |
|     └ followers | int32 | 否 | - | 关注数 | 0 |
|     └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|     └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|     └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|     └ products | array | 否 |  | 商品列表 |  |
|       └ id | int64 | 否 | - | 主键ID | 0 |
|       └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|       └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|       └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|       └ merchant | object | 否 |  | 商家ID |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ userId | string | 否 | - | 关联用户ID |  |
|         └ account | object | 否 |  | No comments found. |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ totalIncome | number | 否 | - | 总收入 | 0 |
|           └ withdrawable | number | 否 | - | 可提现 | 0 |
|           └ withdrawn | number | 否 | - | 已提现 | 0 |
|           └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|         └ storeName | string | 否 | - | 店铺名称 |  |
|         └ storeLogo | string | 否 | - | 店铺Logo |  |
|         └ storeBanner | string | 否 | - | 店铺横幅 |  |
|         └ storeDescription | string | 否 | - | 店铺简介 |  |
|         └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|         └ category | array | 否 | - | 主营类目 | , |
|         └ contactName | string | 否 | - | 联系人 |  |
|         └ contactPhone | string | 否 | - | 联系电话 |  |
|         └ contactEmail | string | 否 | - | 联系邮箱 |  |
|         └ rating | number | 否 | - | 店铺评分 | 0 |
|         └ sales | int64 | 否 | - | 总销售额 | 0 |
|         └ followers | int32 | 否 | - | 关注数 | 0 |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|         └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|         └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|         └ products | array | 否 |  | 商品列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|       └ categoryId | int64 | 否 | - | 分类ID | 0 |
|       └ name | string | 否 | - | 商品名称 |  |
|       └ subName | string | 否 | - | 副标题 |  |
|       └ image | string | 否 | - | 主图 |  |
|       └ images | array | 否 | - | 图册（JSON数组） | , |
|       └ price | number | 否 | - | 价格 | 0 |
|       └ originalPrice | number | 否 | - | 原价 | 0 |
|       └ costPrice | number | 否 | - | 成本价 | 0 |
|       └ stock | int32 | 否 | - | 库存 | 0 |
|       └ soldCount | int32 | 否 | - | 销量 | 0 |
|       └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|       └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|       └ rating | number | 否 | - | 评分 | 0 |
|       └ description | string | 否 | - | 商品描述 |  |
|       └ detail | string | 否 | - | 商品详情（HTML） |  |
|       └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|       └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|       └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|       └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|       └ tags | string | 否 | - | 标签（JSON数组） |  |
|       └ keywords | string | 否 | - | 关键词 |  |
|       └ skus | array | 否 |  | SKU列表 |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ product | object | 否 |  | 商品ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|         └ skuCode | string | 否 | - | SKU编码 |  |
|         └ specs | object | 否 | - | 规格组合（JSON） |  |
|         └ price | number | 否 | - | 销售价 | 0 |
|         └ originalPrice | number | 否 | - | 原价 | 0 |
|         └ stock | int32 | 否 | - | 库存 | 0 |
|         └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|         └ image | string | 否 | - | SKU图片 |  |
|         └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|       └ specs | array | 否 |  | 规格列表 |  |
|         └ id | int64 | 否 | - | 主键ID | 0 |
|         └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|         └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|         └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|         └ product | object | 否 |  | 商品ID |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ merchant | object | 否 |  | 商家ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ userId | string | 否 | - | 关联用户ID |  |
|             └ account | object | 否 |  | No comments found. |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ totalIncome | number | 否 | - | 总收入 | 0 |
|               └ withdrawable | number | 否 | - | 可提现 | 0 |
|               └ withdrawn | number | 否 | - | 已提现 | 0 |
|               └ pendingWithdraw | number | 否 | - | 待提现 | 0 |
|             └ storeName | string | 否 | - | 店铺名称 |  |
|             └ storeLogo | string | 否 | - | 店铺Logo |  |
|             └ storeBanner | string | 否 | - | 店铺横幅 |  |
|             └ storeDescription | string | 否 | - | 店铺简介 |  |
|             └ storeType | string | 否 | - | 店铺类型：normal-普通，flagship-旗舰店 |  |
|             └ category | array | 否 | - | 主营类目 | , |
|             └ contactName | string | 否 | - | 联系人 |  |
|             └ contactPhone | string | 否 | - | 联系电话 |  |
|             └ contactEmail | string | 否 | - | 联系邮箱 |  |
|             └ rating | number | 否 | - | 店铺评分 | 0 |
|             └ sales | int64 | 否 | - | 总销售额 | 0 |
|             └ followers | int32 | 否 | - | 关注数 | 0 |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-正常 | 0 |
|             └ auditStatus | enum | 否 | - | 审核状态<br/>[Enum: PENDING(0, "待审核")<br/>, APPROVED(1, "通过")<br/>, REJECTED(2, "驳回")<br/>] | PENDING |
|             └ auditTime | string | 否 | - | 审核时间 | yyyy-MM-dd HH:mm:ss |
|             └ products | array | 否 |  | 商品列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|           └ categoryId | int64 | 否 | - | 分类ID | 0 |
|           └ name | string | 否 | - | 商品名称 |  |
|           └ subName | string | 否 | - | 副标题 |  |
|           └ image | string | 否 | - | 主图 |  |
|           └ images | array | 否 | - | 图册（JSON数组） | , |
|           └ price | number | 否 | - | 价格 | 0 |
|           └ originalPrice | number | 否 | - | 原价 | 0 |
|           └ costPrice | number | 否 | - | 成本价 | 0 |
|           └ stock | int32 | 否 | - | 库存 | 0 |
|           └ soldCount | int32 | 否 | - | 销量 | 0 |
|           └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|           └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|           └ rating | number | 否 | - | 评分 | 0 |
|           └ description | string | 否 | - | 商品描述 |  |
|           └ detail | string | 否 | - | 商品详情（HTML） |  |
|           └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|           └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|           └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|           └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|           └ tags | string | 否 | - | 标签（JSON数组） |  |
|           └ keywords | string | 否 | - | 关键词 |  |
|           └ skus | array | 否 |  | SKU列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ skuCode | string | 否 | - | SKU编码 |  |
|             └ specs | object | 否 | - | 规格组合（JSON） |  |
|             └ price | number | 否 | - | 销售价 | 0 |
|             └ originalPrice | number | 否 | - | 原价 | 0 |
|             └ stock | int32 | 否 | - | 库存 | 0 |
|             └ lowStock | int32 | 否 | - | 库存预警值 | 0 |
|             └ image | string | 否 | - | SKU图片 |  |
|             └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|           └ specs | array | 否 |  | 规格列表 |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|         └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|         └ sort | int32 | 否 | - | 排序 | 0 |
|         └ values | array | 否 |  | 规格值列表 |  |
|           └ id | int64 | 否 | - | 主键ID | 0 |
|           └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|           └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|           └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|           └ spec | object | 否 |  | 规格ID |  |
|             └ id | int64 | 否 | - | 主键ID | 0 |
|             └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|             └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|             └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|             └ product | object | 否 |  | 商品ID |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ merchant | object | 否 | - | 商家ID |  |
|               └ categoryId | int64 | 否 | - | 分类ID | 0 |
|               └ name | string | 否 | - | 商品名称 |  |
|               └ subName | string | 否 | - | 副标题 |  |
|               └ image | string | 否 | - | 主图 |  |
|               └ images | array | 否 | - | 图册（JSON数组） | , |
|               └ price | number | 否 | - | 价格 | 0 |
|               └ originalPrice | number | 否 | - | 原价 | 0 |
|               └ costPrice | number | 否 | - | 成本价 | 0 |
|               └ stock | int32 | 否 | - | 库存 | 0 |
|               └ soldCount | int32 | 否 | - | 销量 | 0 |
|               └ reviewCount | int32 | 否 | - | 评价数 | 0 |
|               └ favoriteCount | int32 | 否 | - | 收藏数 | 0 |
|               └ rating | number | 否 | - | 评分 | 0 |
|               └ description | string | 否 | - | 商品描述 |  |
|               └ detail | string | 否 | - | 商品详情（HTML） |  |
|               └ isHot | int32 | 否 | - | 是否热卖：0-否，1-是 | 0 |
|               └ isFeatured | int32 | 否 | - | 是否精选：0-否，1-是 | 0 |
|               └ isNew | int32 | 否 | - | 是否新品：0-否，1-是 | 0 |
|               └ publishStatus | int32 | 否 | - | 上架状态：0-下架，1-上架 | 0 |
|               └ tags | string | 否 | - | 标签（JSON数组） |  |
|               └ keywords | string | 否 | - | 关键词 |  |
|               └ skus | array | 否 | - | SKU列表 |  |
|               └ specs | array | 否 | - | 规格列表 |  |
|             └ name | string | 否 | - | 规格名称（如：颜色、尺寸） |  |
|             └ sort | int32 | 否 | - | 排序 | 0 |
|             └ values | array | 否 |  | 规格值列表 |  |
|               └ id | int64 | 否 | - | 主键ID | 0 |
|               └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|               └ updatedAt | string | 否 | - | 更新时间 | yyyy-MM-dd HH:mm:ss |
|               └ deleted | int32 | 否 | - | 是否删除：0-否，1-是 | 0 |
|               └ spec | object | 否 | - | 规格ID |  |
|               └ value | string | 否 | - | 规格值 |  |
|               └ sort | int32 | 否 | - | 排序 | 0 |
|           └ value | string | 否 | - | 规格值 |  |
|           └ sort | int32 | 否 | - | 排序 | 0 |
|   └ name | string | 否 | - | 优惠券名称 |  |
|   └ type | int32 | 否 | - | 类型：0-满减，1-折扣 | 0 |
|   └ value | number | 否 | - | 面值/折扣 | 0 |
|   └ minAmount | number | 否 | - | 最低消费 | 0 |
|   └ maxDiscount | number | 否 | - | 最高优惠 | 0 |
|   └ totalCount | int32 | 否 | - | 发放总量 | 0 |
|   └ receiveCount | int32 | 否 | - | 已领取数量 | 0 |
|   └ usedCount | int32 | 否 | - | 已使用数量 | 0 |
|   └ limitPerUser | int32 | 否 | - | 每人限领 | 0 |
|   └ startTime | string | 否 | - | 开始时间 | yyyy-MM-dd HH:mm:ss |
|   └ endTime | string | 否 | - | 结束时间 | yyyy-MM-dd HH:mm:ss |
|   └ validDays | int32 | 否 | - | 领取后天数 | 0 |
|   └ scope | string | 否 | - | 使用范围：all-全场，category-分类，product-商品 |  |
|   └ categoryIds | string | 否 | - | 分类ID（JSON数组） |  |
|   └ productIds | string | 否 | - | 商品ID（JSON数组） |  |
|   └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": {
        "id": 0,
        "createdAt": "yyyy-MM-dd HH:mm:ss",
        "updatedAt": "yyyy-MM-dd HH:mm:ss",
        "deleted": 0,
        "merchant": {
            "id": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss",
            "deleted": 0,
            "userId": "string",
            "account": {
                "id": 0,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                "deleted": 0,
                "merchant": {
                    "id": 0,
                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                    "deleted": 0,
                    "userId": "string",
                    "account": {},
                    "storeName": "string",
                    "storeLogo": "string",
                    "storeBanner": "string",
                    "storeDescription": "string",
                    "storeType": "string",
                    "category": [
                        0,
                        0
                    ],
                    "contactName": "string",
                    "contactPhone": "string",
                    "contactEmail": "string",
                    "rating": 0,
                    "sales": 0,
                    "followers": 0,
                    "status": 0,
                    "auditStatus": "PENDING",
                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                    "products": [
                        {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "merchant": {},
                            "categoryId": 0,
                            "name": "string",
                            "subName": "string",
                            "image": "string",
                            "images": [
                                0,
                                0
                            ],
                            "price": 0,
                            "originalPrice": 0,
                            "costPrice": 0,
                            "stock": 0,
                            "soldCount": 0,
                            "reviewCount": 0,
                            "favoriteCount": 0,
                            "rating": 0,
                            "description": "string",
                            "detail": "string",
                            "isHot": 0,
                            "isFeatured": 0,
                            "isNew": 0,
                            "publishStatus": 0,
                            "tags": "string",
                            "keywords": "string",
                            "skus": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "product": {},
                                    "skuCode": "string",
                                    "specs": {},
                                    "price": 0,
                                    "originalPrice": 0,
                                    "stock": 0,
                                    "lowStock": 0,
                                    "image": "string",
                                    "status": 0
                                }
                            ],
                            "specs": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "product": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "categoryId": 0,
                                        "name": "string",
                                        "subName": "string",
                                        "image": "string",
                                        "images": [
                                            0,
                                            0
                                        ],
                                        "price": 0,
                                        "originalPrice": 0,
                                        "costPrice": 0,
                                        "stock": 0,
                                        "soldCount": 0,
                                        "reviewCount": 0,
                                        "favoriteCount": 0,
                                        "rating": 0,
                                        "description": "string",
                                        "detail": "string",
                                        "isHot": 0,
                                        "isFeatured": 0,
                                        "isNew": 0,
                                        "publishStatus": 0,
                                        "tags": "string",
                                        "keywords": "string",
                                        "skus": [],
                                        "specs": []
                                    },
                                    "name": "string",
                                    "sort": 0,
                                    "values": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "spec": {},
                                            "value": "string",
                                            "sort": 0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "totalIncome": 0,
                "withdrawable": 0,
                "withdrawn": 0,
                "pendingWithdraw": 0
            },
            "storeName": "string",
            "storeLogo": "string",
            "storeBanner": "string",
            "storeDescription": "string",
            "storeType": "string",
            "category": [
                0,
                0
            ],
            "contactName": "string",
            "contactPhone": "string",
            "contactEmail": "string",
            "rating": 0,
            "sales": 0,
            "followers": 0,
            "status": 0,
            "auditStatus": "PENDING",
            "auditTime": "yyyy-MM-dd HH:mm:ss",
            "products": [
                {
                    "id": 0,
                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                    "deleted": 0,
                    "merchant": {
                        "id": 0,
                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                        "deleted": 0,
                        "userId": "string",
                        "account": {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "merchant": {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "userId": "string",
                                "account": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "merchant": {},
                                    "totalIncome": 0,
                                    "withdrawable": 0,
                                    "withdrawn": 0,
                                    "pendingWithdraw": 0
                                },
                                "storeName": "string",
                                "storeLogo": "string",
                                "storeBanner": "string",
                                "storeDescription": "string",
                                "storeType": "string",
                                "category": [
                                    0,
                                    0
                                ],
                                "contactName": "string",
                                "contactPhone": "string",
                                "contactEmail": "string",
                                "rating": 0,
                                "sales": 0,
                                "followers": 0,
                                "status": 0,
                                "auditStatus": "PENDING",
                                "auditTime": "yyyy-MM-dd HH:mm:ss",
                                "products": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "categoryId": 0,
                                        "name": "string",
                                        "subName": "string",
                                        "image": "string",
                                        "images": [
                                            0,
                                            0
                                        ],
                                        "price": 0,
                                        "originalPrice": 0,
                                        "costPrice": 0,
                                        "stock": 0,
                                        "soldCount": 0,
                                        "reviewCount": 0,
                                        "favoriteCount": 0,
                                        "rating": 0,
                                        "description": "string",
                                        "detail": "string",
                                        "isHot": 0,
                                        "isFeatured": 0,
                                        "isNew": 0,
                                        "publishStatus": 0,
                                        "tags": "string",
                                        "keywords": "string",
                                        "skus": [],
                                        "specs": []
                                    }
                                ]
                            },
                            "totalIncome": 0,
                            "withdrawable": 0,
                            "withdrawn": 0,
                            "pendingWithdraw": 0
                        },
                        "storeName": "string",
                        "storeLogo": "string",
                        "storeBanner": "string",
                        "storeDescription": "string",
                        "storeType": "string",
                        "category": [
                            0,
                            0
                        ],
                        "contactName": "string",
                        "contactPhone": "string",
                        "contactEmail": "string",
                        "rating": 0,
                        "sales": 0,
                        "followers": 0,
                        "status": 0,
                        "auditStatus": "PENDING",
                        "auditTime": "yyyy-MM-dd HH:mm:ss",
                        "products": [
                            {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "merchant": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "userId": "string",
                                    "account": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "totalIncome": 0,
                                        "withdrawable": 0,
                                        "withdrawn": 0,
                                        "pendingWithdraw": 0
                                    },
                                    "storeName": "string",
                                    "storeLogo": "string",
                                    "storeBanner": "string",
                                    "storeDescription": "string",
                                    "storeType": "string",
                                    "category": [
                                        0,
                                        0
                                    ],
                                    "contactName": "string",
                                    "contactPhone": "string",
                                    "contactEmail": "string",
                                    "rating": 0,
                                    "sales": 0,
                                    "followers": 0,
                                    "status": 0,
                                    "auditStatus": "PENDING",
                                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                                    "products": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        }
                                    ]
                                },
                                "categoryId": 0,
                                "name": "string",
                                "subName": "string",
                                "image": "string",
                                "images": [
                                    0,
                                    0
                                ],
                                "price": 0,
                                "originalPrice": 0,
                                "costPrice": 0,
                                "stock": 0,
                                "soldCount": 0,
                                "reviewCount": 0,
                                "favoriteCount": 0,
                                "rating": 0,
                                "description": "string",
                                "detail": "string",
                                "isHot": 0,
                                "isFeatured": 0,
                                "isNew": 0,
                                "publishStatus": 0,
                                "tags": "string",
                                "keywords": "string",
                                "skus": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "skuCode": "string",
                                        "specs": {},
                                        "price": 0,
                                        "originalPrice": 0,
                                        "stock": 0,
                                        "lowStock": 0,
                                        "image": "string",
                                        "status": 0
                                    }
                                ],
                                "specs": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "name": "string",
                                        "sort": 0,
                                        "values": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "spec": {},
                                                "value": "string",
                                                "sort": 0
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "categoryId": 0,
                    "name": "string",
                    "subName": "string",
                    "image": "string",
                    "images": [
                        0,
                        0
                    ],
                    "price": 0,
                    "originalPrice": 0,
                    "costPrice": 0,
                    "stock": 0,
                    "soldCount": 0,
                    "reviewCount": 0,
                    "favoriteCount": 0,
                    "rating": 0,
                    "description": "string",
                    "detail": "string",
                    "isHot": 0,
                    "isFeatured": 0,
                    "isNew": 0,
                    "publishStatus": 0,
                    "tags": "string",
                    "keywords": "string",
                    "skus": [
                        {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "product": {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "merchant": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "userId": "string",
                                    "account": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "totalIncome": 0,
                                        "withdrawable": 0,
                                        "withdrawn": 0,
                                        "pendingWithdraw": 0
                                    },
                                    "storeName": "string",
                                    "storeLogo": "string",
                                    "storeBanner": "string",
                                    "storeDescription": "string",
                                    "storeType": "string",
                                    "category": [
                                        0,
                                        0
                                    ],
                                    "contactName": "string",
                                    "contactPhone": "string",
                                    "contactEmail": "string",
                                    "rating": 0,
                                    "sales": 0,
                                    "followers": 0,
                                    "status": 0,
                                    "auditStatus": "PENDING",
                                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                                    "products": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        }
                                    ]
                                },
                                "categoryId": 0,
                                "name": "string",
                                "subName": "string",
                                "image": "string",
                                "images": [
                                    0,
                                    0
                                ],
                                "price": 0,
                                "originalPrice": 0,
                                "costPrice": 0,
                                "stock": 0,
                                "soldCount": 0,
                                "reviewCount": 0,
                                "favoriteCount": 0,
                                "rating": 0,
                                "description": "string",
                                "detail": "string",
                                "isHot": 0,
                                "isFeatured": 0,
                                "isNew": 0,
                                "publishStatus": 0,
                                "tags": "string",
                                "keywords": "string",
                                "skus": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "skuCode": "string",
                                        "specs": {},
                                        "price": 0,
                                        "originalPrice": 0,
                                        "stock": 0,
                                        "lowStock": 0,
                                        "image": "string",
                                        "status": 0
                                    }
                                ],
                                "specs": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "name": "string",
                                        "sort": 0,
                                        "values": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "spec": {},
                                                "value": "string",
                                                "sort": 0
                                            }
                                        ]
                                    }
                                ]
                            },
                            "skuCode": "string",
                            "specs": {},
                            "price": 0,
                            "originalPrice": 0,
                            "stock": 0,
                            "lowStock": 0,
                            "image": "string",
                            "status": 0
                        }
                    ],
                    "specs": [
                        {
                            "id": 0,
                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                            "deleted": 0,
                            "product": {
                                "id": 0,
                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                "deleted": 0,
                                "merchant": {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "userId": "string",
                                    "account": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "merchant": {},
                                        "totalIncome": 0,
                                        "withdrawable": 0,
                                        "withdrawn": 0,
                                        "pendingWithdraw": 0
                                    },
                                    "storeName": "string",
                                    "storeLogo": "string",
                                    "storeBanner": "string",
                                    "storeDescription": "string",
                                    "storeType": "string",
                                    "category": [
                                        0,
                                        0
                                    ],
                                    "contactName": "string",
                                    "contactPhone": "string",
                                    "contactEmail": "string",
                                    "rating": 0,
                                    "sales": 0,
                                    "followers": 0,
                                    "status": 0,
                                    "auditStatus": "PENDING",
                                    "auditTime": "yyyy-MM-dd HH:mm:ss",
                                    "products": [
                                        {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        }
                                    ]
                                },
                                "categoryId": 0,
                                "name": "string",
                                "subName": "string",
                                "image": "string",
                                "images": [
                                    0,
                                    0
                                ],
                                "price": 0,
                                "originalPrice": 0,
                                "costPrice": 0,
                                "stock": 0,
                                "soldCount": 0,
                                "reviewCount": 0,
                                "favoriteCount": 0,
                                "rating": 0,
                                "description": "string",
                                "detail": "string",
                                "isHot": 0,
                                "isFeatured": 0,
                                "isNew": 0,
                                "publishStatus": 0,
                                "tags": "string",
                                "keywords": "string",
                                "skus": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "skuCode": "string",
                                        "specs": {},
                                        "price": 0,
                                        "originalPrice": 0,
                                        "stock": 0,
                                        "lowStock": 0,
                                        "image": "string",
                                        "status": 0
                                    }
                                ],
                                "specs": [
                                    {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "name": "string",
                                        "sort": 0,
                                        "values": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "spec": {},
                                                "value": "string",
                                                "sort": 0
                                            }
                                        ]
                                    }
                                ]
                            },
                            "name": "string",
                            "sort": 0,
                            "values": [
                                {
                                    "id": 0,
                                    "createdAt": "yyyy-MM-dd HH:mm:ss",
                                    "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                    "deleted": 0,
                                    "spec": {
                                        "id": 0,
                                        "createdAt": "yyyy-MM-dd HH:mm:ss",
                                        "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                        "deleted": 0,
                                        "product": {
                                            "id": 0,
                                            "createdAt": "yyyy-MM-dd HH:mm:ss",
                                            "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                            "deleted": 0,
                                            "merchant": {},
                                            "categoryId": 0,
                                            "name": "string",
                                            "subName": "string",
                                            "image": "string",
                                            "images": [
                                                0,
                                                0
                                            ],
                                            "price": 0,
                                            "originalPrice": 0,
                                            "costPrice": 0,
                                            "stock": 0,
                                            "soldCount": 0,
                                            "reviewCount": 0,
                                            "favoriteCount": 0,
                                            "rating": 0,
                                            "description": "string",
                                            "detail": "string",
                                            "isHot": 0,
                                            "isFeatured": 0,
                                            "isNew": 0,
                                            "publishStatus": 0,
                                            "tags": "string",
                                            "keywords": "string",
                                            "skus": [],
                                            "specs": []
                                        },
                                        "name": "string",
                                        "sort": 0,
                                        "values": [
                                            {
                                                "id": 0,
                                                "createdAt": "yyyy-MM-dd HH:mm:ss",
                                                "updatedAt": "yyyy-MM-dd HH:mm:ss",
                                                "deleted": 0,
                                                "spec": {},
                                                "value": "string",
                                                "sort": 0
                                            }
                                        ]
                                    },
                                    "value": "string",
                                    "sort": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "name": "string",
        "type": 0,
        "value": 0,
        "minAmount": 0,
        "maxDiscount": 0,
        "totalCount": 0,
        "receiveCount": 0,
        "usedCount": 0,
        "limitPerUser": 0,
        "startTime": "yyyy-MM-dd HH:mm:ss",
        "endTime": "yyyy-MM-dd HH:mm:ss",
        "validDays": 0,
        "scope": "string",
        "categoryIds": "string",
        "productIds": "string",
        "status": 0
    },
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 领取优惠券

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/coupons/{couponId}/receive


描述：领取优惠券

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| couponId | 是 | No comments found. | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| userId | string | 是 | - | No comments found. |  |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | boolean | 否 | - | 响应数据 |  |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": false,
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 获取用户优惠券

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/coupons/my


描述：获取用户优惠券

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| userId | string | 是 | - | No comments found. |  |
| status | int32 | 否 | - | No comments found. | 0 |
| pageNum | int32 | 是 | - | No comments found. | 1 |
| pageSize | int32 | 是 | - | No comments found. | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ couponId | int64 | 否 | - | No comments found. | 0 |
|     └ couponName | string | 否 | - | No comments found. |  |
|     └ couponType | int32 | 否 | - | No comments found. | 0 |
|     └ value | number | 否 | - | No comments found. | 0 |
|     └ minAmount | number | 否 | - | No comments found. | 0 |
|     └ maxDiscount | number | 否 | - | No comments found. | 0 |
|     └ status | int32 | 否 | - | No comments found. | 0 |
|     └ expireTime | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ numberOfElements | int32 | 否 | - | No comments found. | 0 |
|   └ empty | boolean | 否 | - | No comments found. | true |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": {
        "totalElements": 0,
        "totalPages": 0,
        "size": 0,
        "content": [
            {
                "id": 0,
                "couponId": 0,
                "couponName": "string",
                "couponType": 0,
                "value": 0,
                "minAmount": 0,
                "maxDiscount": 0,
                "status": 0,
                "expireTime": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
        "pageable": {
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            },
            "pageNumber": 0,
            "unpaged": true,
            "paged": true,
            "pageSize": 0
        },
        "first": true,
        "last": true,
        "numberOfElements": 0,
        "empty": true
    },
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 验证优惠券

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/coupons/validate


描述：验证优惠券

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| userId | string | 是 | - | No comments found. |  |
| couponId | int64 | 是 | - | No comments found. | 0 |
| orderAmount | number | 是 | - | No comments found. | 0 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ valid | boolean | 否 | - | No comments found. | true |
|   └ message | string | 否 | - | No comments found. |  |
|   └ discountAmount | number | 否 | - | No comments found. | 0 |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": {
        "valid": true,
        "message": "string",
        "discountAmount": 0
    },
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无

### 使用优惠券

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/coupons/{couponId}/use


描述：使用优惠券

ContentType：`application/json`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| couponId | 是 | No comments found. | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| userId | string | 是 | - | No comments found. |  |
| request | map | 否 | - | No comments found. |  |

#### 请求示例

```
{
    "userId": "string",
    "request": {}
}
```

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | boolean | 否 | - | 响应数据 |  |
| timestamp | string | 否 | - | 响应时间戳 | yyyy-MM-dd HH:mm:ss |
| traceId | string | 否 | - | 请求追踪ID<br>用于日志追踪和问题排查 |  |
| path | string | 否 | - | 请求路径 |  |
| method | string | 否 | - | 请求方法 |  |
| total | int64 | 否 | - | 总记录数 | 0 |
| pageNum | int32 | 否 | - | 当前页码 | 0 |
| pageSize | int32 | 否 | - | 每页大小 | 0 |
| totalPages | int32 | 否 | - | 总页数 | 0 |
| errors | object | 否 |  | 错误详情<br>包含更详细的错误信息，用于调试 |  |
|   └ any object | object | 否 | - | any object. |  |
| fieldErrors | object | 否 | - | 错误字段<br>用于参数校验错误，key为字段名，value为错误信息 |  |
| exceptionType | string | 否 | - | 异常类型 |  |
| stackTraceId | string | 否 | - | 堆栈跟踪ID<br>当发生异常时，生成唯一ID用于关联日志 |  |
| bizCode | string | 否 | - | 业务状态码<br>用于更细粒度的业务状态标识 |  |
| extras | object | 否 |  | 附加数据<br>用于传递额外的业务数据 |  |
|   └ any object | object | 否 | - | any object. |  |
| costTime | int64 | 否 | - | 响应耗时(毫秒) | 0 |

#### 响应示例

```
{
    "code": 0,
    "success": true,
    "httpStatus": 0,
    "message": "string",
    "data": false,
    "timestamp": "yyyy-MM-dd HH:mm:ss",
    "traceId": "string",
    "path": "string",
    "method": "string",
    "total": 0,
    "pageNum": 0,
    "pageSize": 0,
    "totalPages": 0,
    "errors": {
        "any object": {}
    },
    "fieldErrors": {},
    "exceptionType": "string",
    "stackTraceId": "string",
    "bizCode": "string",
    "extras": {
        "any object": {}
    },
    "costTime": 0
}
```

#### 错误码

无
