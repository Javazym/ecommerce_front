# 文档

## 订单控制器（用户端）


### 创建订单

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/orders


描述：创建订单

ContentType：`application/json`

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| addressId | int64 | 否 | - | 地址ID | 0 |
| merchantId | int64 | 否 | - | 商家ID | 0 |
| cartItemIds | array | 否 | - | 购物车商品ID列表 | 0,0 |
| items | array | 否 |  | 商品列表（直接购买） |  |
|   └ productId | int64 | 否 | - | No comments found. | 0 |
|   └ skuId | int64 | 否 | - | No comments found. | 0 |
|   └ quantity | int32 | 否 | - | No comments found. | 0 |
| couponId | int64 | 否 | - | 优惠券ID | 0 |
| remark | string | 否 | - | 订单备注 |  |
| invoice | object | 否 |  | 发票信息 |  |
|   └ type | int32 | 否 | - | No comments found. | 0 |
|   └ title | string | 否 | - | No comments found. |  |
|   └ taxNumber | string | 否 | - | No comments found. |  |

#### 请求示例

```
{
    "addressId": 0,
    "merchantId": 0,
    "cartItemIds": [
        0,
        0
    ],
    "items": [
        {
            "productId": 0,
            "skuId": 0,
            "quantity": 0
        }
    ],
    "couponId": 0,
    "remark": "string",
    "invoice": {
        "type": 0,
        "title": "string",
        "taxNumber": "string"
    }
}
```

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | 订单ID | 0 |
|   └ orderNo | string | 否 | - | 订单号 |  |
|   └ userId | string | 否 | - | 用户ID |  |
|   └ merchantId | int64 | 否 | - | 商家ID | 0 |
|   └ merchantName | string | 否 | - | 商家名称 |  |
|   └ totalAmount | number | 否 | - | 订单总额 | 0 |
|   └ discountAmount | number | 否 | - | 优惠金额 | 0 |
|   └ couponAmount | number | 否 | - | 优惠券金额 | 0 |
|   └ freightAmount | number | 否 | - | 运费 | 0 |
|   └ payAmount | number | 否 | - | 实付金额 | 0 |
|   └ points | int32 | 否 | - | 消耗积分 | 0 |
|   └ status | int32 | 否 | - | 订单状态 | 0 |
|   └ statusText | string | 否 | - | 订单状态文本 |  |
|   └ payTime | string | 否 | - | 支付时间 | yyyy-MM-dd HH:mm:ss |
|   └ shipTime | string | 否 | - | 发货时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiveTime | string | 否 | - | 收货时间 | yyyy-MM-dd HH:mm:ss |
|   └ finishTime | string | 否 | - | 完成时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiverName | string | 否 | - | 收货人 |  |
|   └ receiverPhone | string | 否 | - | 收货电话 |  |
|   └ receiverAddress | string | 否 | - | 收货地址 |  |
|   └ remark | string | 否 | - | 订单备注 |  |
|   └ items | array | 否 |  | 订单商品列表 |  |
|     └ id | int64 | 否 | - | 订单商品ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ productId | int64 | 否 | - | 商品ID | 0 |
|     └ productName | string | 否 | - | 商品名称 |  |
|     └ productImage | string | 否 | - | 商品图片 |  |
|     └ skuId | int64 | 否 | - | SKU ID | 0 |
|     └ skuSpecs | string | 否 | - | SKU规格 |  |
|     └ productPrice | number | 否 | - | 商品单价 | 0 |
|     └ quantity | int32 | 否 | - | 购买数量 | 0 |
|     └ totalPrice | number | 否 | - | 总价 | 0 |
|     └ reviewStatus | int32 | 否 | - | 评价状态 | 0 |
|   └ logistics | object | 否 |  | 物流信息 |  |
|     └ id | int64 | 否 | - | 物流ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ logisticsCompany | string | 否 | - | 物流公司 |  |
|     └ trackingNumber | string | 否 | - | 物流单号 |  |
|     └ currentStatus | string | 否 | - | 当前状态 |  |
|     └ traces | string | 否 | - | 物流轨迹 |  |
|   └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
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
        "orderNo": "string",
        "userId": "string",
        "merchantId": 0,
        "merchantName": "string",
        "totalAmount": 0,
        "discountAmount": 0,
        "couponAmount": 0,
        "freightAmount": 0,
        "payAmount": 0,
        "points": 0,
        "status": 0,
        "statusText": "string",
        "payTime": "yyyy-MM-dd HH:mm:ss",
        "shipTime": "yyyy-MM-dd HH:mm:ss",
        "receiveTime": "yyyy-MM-dd HH:mm:ss",
        "finishTime": "yyyy-MM-dd HH:mm:ss",
        "receiverName": "string",
        "receiverPhone": "string",
        "receiverAddress": "string",
        "remark": "string",
        "items": [
            {
                "id": 0,
                "orderId": 0,
                "productId": 0,
                "productName": "string",
                "productImage": "string",
                "skuId": 0,
                "skuSpecs": "string",
                "productPrice": 0,
                "quantity": 0,
                "totalPrice": 0,
                "reviewStatus": 0
            }
        ],
        "logistics": {
            "id": 0,
            "orderId": 0,
            "logisticsCompany": "string",
            "trackingNumber": "string",
            "currentStatus": "string",
            "traces": "string"
        },
        "createdAt": "yyyy-MM-dd HH:mm:ss"
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

### 获取订单列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/orders


描述：获取订单列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| status | int32 | 否 | - |   订单状态(可选) | 0 |
| pageNum | int32 | 是 | - |  页码 | 1 |
| pageSize | int32 | 是 | - | 每页数量 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | 订单ID | 0 |
|     └ orderNo | string | 否 | - | 订单号 |  |
|     └ userId | string | 否 | - | 用户ID |  |
|     └ merchantId | int64 | 否 | - | 商家ID | 0 |
|     └ merchantName | string | 否 | - | 商家名称 |  |
|     └ totalAmount | number | 否 | - | 订单总额 | 0 |
|     └ discountAmount | number | 否 | - | 优惠金额 | 0 |
|     └ couponAmount | number | 否 | - | 优惠券金额 | 0 |
|     └ freightAmount | number | 否 | - | 运费 | 0 |
|     └ payAmount | number | 否 | - | 实付金额 | 0 |
|     └ points | int32 | 否 | - | 消耗积分 | 0 |
|     └ status | int32 | 否 | - | 订单状态 | 0 |
|     └ statusText | string | 否 | - | 订单状态文本 |  |
|     └ payTime | string | 否 | - | 支付时间 | yyyy-MM-dd HH:mm:ss |
|     └ shipTime | string | 否 | - | 发货时间 | yyyy-MM-dd HH:mm:ss |
|     └ receiveTime | string | 否 | - | 收货时间 | yyyy-MM-dd HH:mm:ss |
|     └ finishTime | string | 否 | - | 完成时间 | yyyy-MM-dd HH:mm:ss |
|     └ receiverName | string | 否 | - | 收货人 |  |
|     └ receiverPhone | string | 否 | - | 收货电话 |  |
|     └ receiverAddress | string | 否 | - | 收货地址 |  |
|     └ remark | string | 否 | - | 订单备注 |  |
|     └ items | array | 否 |  | 订单商品列表 |  |
|       └ id | int64 | 否 | - | 订单商品ID | 0 |
|       └ orderId | int64 | 否 | - | 订单ID | 0 |
|       └ productId | int64 | 否 | - | 商品ID | 0 |
|       └ productName | string | 否 | - | 商品名称 |  |
|       └ productImage | string | 否 | - | 商品图片 |  |
|       └ skuId | int64 | 否 | - | SKU ID | 0 |
|       └ skuSpecs | string | 否 | - | SKU规格 |  |
|       └ productPrice | number | 否 | - | 商品单价 | 0 |
|       └ quantity | int32 | 否 | - | 购买数量 | 0 |
|       └ totalPrice | number | 否 | - | 总价 | 0 |
|       └ reviewStatus | int32 | 否 | - | 评价状态 | 0 |
|     └ logistics | object | 否 |  | 物流信息 |  |
|       └ id | int64 | 否 | - | 物流ID | 0 |
|       └ orderId | int64 | 否 | - | 订单ID | 0 |
|       └ logisticsCompany | string | 否 | - | 物流公司 |  |
|       └ trackingNumber | string | 否 | - | 物流单号 |  |
|       └ currentStatus | string | 否 | - | 当前状态 |  |
|       └ traces | string | 否 | - | 物流轨迹 |  |
|     └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
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
        "totalPages": 0,
        "totalElements": 0,
        "first": true,
        "last": true,
        "pageable": {
            "pageNumber": 0,
            "unpaged": true,
            "paged": true,
            "pageSize": 0,
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            }
        },
        "size": 0,
        "content": [
            {
                "id": 0,
                "orderNo": "string",
                "userId": "string",
                "merchantId": 0,
                "merchantName": "string",
                "totalAmount": 0,
                "discountAmount": 0,
                "couponAmount": 0,
                "freightAmount": 0,
                "payAmount": 0,
                "points": 0,
                "status": 0,
                "statusText": "string",
                "payTime": "yyyy-MM-dd HH:mm:ss",
                "shipTime": "yyyy-MM-dd HH:mm:ss",
                "receiveTime": "yyyy-MM-dd HH:mm:ss",
                "finishTime": "yyyy-MM-dd HH:mm:ss",
                "receiverName": "string",
                "receiverPhone": "string",
                "receiverAddress": "string",
                "remark": "string",
                "items": [
                    {
                        "id": 0,
                        "orderId": 0,
                        "productId": 0,
                        "productName": "string",
                        "productImage": "string",
                        "skuId": 0,
                        "skuSpecs": "string",
                        "productPrice": 0,
                        "quantity": 0,
                        "totalPrice": 0,
                        "reviewStatus": 0
                    }
                ],
                "logistics": {
                    "id": 0,
                    "orderId": 0,
                    "logisticsCompany": "string",
                    "trackingNumber": "string",
                    "currentStatus": "string",
                    "traces": "string"
                },
                "createdAt": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
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

### 获取订单详情

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/orders/{orderId}


描述：获取订单详情

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | 订单ID | 0 |
|   └ orderNo | string | 否 | - | 订单号 |  |
|   └ userId | string | 否 | - | 用户ID |  |
|   └ merchantId | int64 | 否 | - | 商家ID | 0 |
|   └ merchantName | string | 否 | - | 商家名称 |  |
|   └ totalAmount | number | 否 | - | 订单总额 | 0 |
|   └ discountAmount | number | 否 | - | 优惠金额 | 0 |
|   └ couponAmount | number | 否 | - | 优惠券金额 | 0 |
|   └ freightAmount | number | 否 | - | 运费 | 0 |
|   └ payAmount | number | 否 | - | 实付金额 | 0 |
|   └ points | int32 | 否 | - | 消耗积分 | 0 |
|   └ status | int32 | 否 | - | 订单状态 | 0 |
|   └ statusText | string | 否 | - | 订单状态文本 |  |
|   └ payTime | string | 否 | - | 支付时间 | yyyy-MM-dd HH:mm:ss |
|   └ shipTime | string | 否 | - | 发货时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiveTime | string | 否 | - | 收货时间 | yyyy-MM-dd HH:mm:ss |
|   └ finishTime | string | 否 | - | 完成时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiverName | string | 否 | - | 收货人 |  |
|   └ receiverPhone | string | 否 | - | 收货电话 |  |
|   └ receiverAddress | string | 否 | - | 收货地址 |  |
|   └ remark | string | 否 | - | 订单备注 |  |
|   └ items | array | 否 |  | 订单商品列表 |  |
|     └ id | int64 | 否 | - | 订单商品ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ productId | int64 | 否 | - | 商品ID | 0 |
|     └ productName | string | 否 | - | 商品名称 |  |
|     └ productImage | string | 否 | - | 商品图片 |  |
|     └ skuId | int64 | 否 | - | SKU ID | 0 |
|     └ skuSpecs | string | 否 | - | SKU规格 |  |
|     └ productPrice | number | 否 | - | 商品单价 | 0 |
|     └ quantity | int32 | 否 | - | 购买数量 | 0 |
|     └ totalPrice | number | 否 | - | 总价 | 0 |
|     └ reviewStatus | int32 | 否 | - | 评价状态 | 0 |
|   └ logistics | object | 否 |  | 物流信息 |  |
|     └ id | int64 | 否 | - | 物流ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ logisticsCompany | string | 否 | - | 物流公司 |  |
|     └ trackingNumber | string | 否 | - | 物流单号 |  |
|     └ currentStatus | string | 否 | - | 当前状态 |  |
|     └ traces | string | 否 | - | 物流轨迹 |  |
|   └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
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
        "orderNo": "string",
        "userId": "string",
        "merchantId": 0,
        "merchantName": "string",
        "totalAmount": 0,
        "discountAmount": 0,
        "couponAmount": 0,
        "freightAmount": 0,
        "payAmount": 0,
        "points": 0,
        "status": 0,
        "statusText": "string",
        "payTime": "yyyy-MM-dd HH:mm:ss",
        "shipTime": "yyyy-MM-dd HH:mm:ss",
        "receiveTime": "yyyy-MM-dd HH:mm:ss",
        "finishTime": "yyyy-MM-dd HH:mm:ss",
        "receiverName": "string",
        "receiverPhone": "string",
        "receiverAddress": "string",
        "remark": "string",
        "items": [
            {
                "id": 0,
                "orderId": 0,
                "productId": 0,
                "productName": "string",
                "productImage": "string",
                "skuId": 0,
                "skuSpecs": "string",
                "productPrice": 0,
                "quantity": 0,
                "totalPrice": 0,
                "reviewStatus": 0
            }
        ],
        "logistics": {
            "id": 0,
            "orderId": 0,
            "logisticsCompany": "string",
            "trackingNumber": "string",
            "currentStatus": "string",
            "traces": "string"
        },
        "createdAt": "yyyy-MM-dd HH:mm:ss"
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

### 取消订单

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/orders/{orderId}/cancel


描述：取消订单

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 确认收货

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/orders/{orderId}/confirm


描述：确认收货

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 删除订单

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/orders/{orderId}


描述：删除订单

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 支付订单

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/orders/{orderId}/pay


描述：支付订单

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| payType | string | 是 | - | 支付方式(alipay/wechat) |  |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | string | 否 | - | 响应数据 |  |
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
    "data": "string",
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

### 申请退款

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/orders/{orderId}/refund


描述：申请退款

ContentType：`application/json`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| type | int32 | 否 | - | No comments found. | 0 |
| amount | number | 否 | - | No comments found. | 0 |
| reason | string | 否 | - | No comments found. |  |
| description | string | 否 | - | No comments found. |  |

#### 请求示例

```
{
    "type": 0,
    "amount": 0,
    "reason": "string",
    "description": "string"
}
```

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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
## 商家订单控制器


### 获取商家订单列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/merchant/orders


描述：获取商家订单列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| status | int32 | 否 | - |   订单状态(可选) | 0 |
| pageNum | int32 | 是 | - |  页码 | 1 |
| pageSize | int32 | 是 | - | 每页数量 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | 订单ID | 0 |
|     └ orderNo | string | 否 | - | 订单号 |  |
|     └ userId | string | 否 | - | 用户ID |  |
|     └ merchantId | int64 | 否 | - | 商家ID | 0 |
|     └ merchantName | string | 否 | - | 商家名称 |  |
|     └ totalAmount | number | 否 | - | 订单总额 | 0 |
|     └ discountAmount | number | 否 | - | 优惠金额 | 0 |
|     └ couponAmount | number | 否 | - | 优惠券金额 | 0 |
|     └ freightAmount | number | 否 | - | 运费 | 0 |
|     └ payAmount | number | 否 | - | 实付金额 | 0 |
|     └ points | int32 | 否 | - | 消耗积分 | 0 |
|     └ status | int32 | 否 | - | 订单状态 | 0 |
|     └ statusText | string | 否 | - | 订单状态文本 |  |
|     └ payTime | string | 否 | - | 支付时间 | yyyy-MM-dd HH:mm:ss |
|     └ shipTime | string | 否 | - | 发货时间 | yyyy-MM-dd HH:mm:ss |
|     └ receiveTime | string | 否 | - | 收货时间 | yyyy-MM-dd HH:mm:ss |
|     └ finishTime | string | 否 | - | 完成时间 | yyyy-MM-dd HH:mm:ss |
|     └ receiverName | string | 否 | - | 收货人 |  |
|     └ receiverPhone | string | 否 | - | 收货电话 |  |
|     └ receiverAddress | string | 否 | - | 收货地址 |  |
|     └ remark | string | 否 | - | 订单备注 |  |
|     └ items | array | 否 |  | 订单商品列表 |  |
|       └ id | int64 | 否 | - | 订单商品ID | 0 |
|       └ orderId | int64 | 否 | - | 订单ID | 0 |
|       └ productId | int64 | 否 | - | 商品ID | 0 |
|       └ productName | string | 否 | - | 商品名称 |  |
|       └ productImage | string | 否 | - | 商品图片 |  |
|       └ skuId | int64 | 否 | - | SKU ID | 0 |
|       └ skuSpecs | string | 否 | - | SKU规格 |  |
|       └ productPrice | number | 否 | - | 商品单价 | 0 |
|       └ quantity | int32 | 否 | - | 购买数量 | 0 |
|       └ totalPrice | number | 否 | - | 总价 | 0 |
|       └ reviewStatus | int32 | 否 | - | 评价状态 | 0 |
|     └ logistics | object | 否 |  | 物流信息 |  |
|       └ id | int64 | 否 | - | 物流ID | 0 |
|       └ orderId | int64 | 否 | - | 订单ID | 0 |
|       └ logisticsCompany | string | 否 | - | 物流公司 |  |
|       └ trackingNumber | string | 否 | - | 物流单号 |  |
|       └ currentStatus | string | 否 | - | 当前状态 |  |
|       └ traces | string | 否 | - | 物流轨迹 |  |
|     └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
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
        "totalPages": 0,
        "totalElements": 0,
        "first": true,
        "last": true,
        "pageable": {
            "pageNumber": 0,
            "unpaged": true,
            "paged": true,
            "pageSize": 0,
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            }
        },
        "size": 0,
        "content": [
            {
                "id": 0,
                "orderNo": "string",
                "userId": "string",
                "merchantId": 0,
                "merchantName": "string",
                "totalAmount": 0,
                "discountAmount": 0,
                "couponAmount": 0,
                "freightAmount": 0,
                "payAmount": 0,
                "points": 0,
                "status": 0,
                "statusText": "string",
                "payTime": "yyyy-MM-dd HH:mm:ss",
                "shipTime": "yyyy-MM-dd HH:mm:ss",
                "receiveTime": "yyyy-MM-dd HH:mm:ss",
                "finishTime": "yyyy-MM-dd HH:mm:ss",
                "receiverName": "string",
                "receiverPhone": "string",
                "receiverAddress": "string",
                "remark": "string",
                "items": [
                    {
                        "id": 0,
                        "orderId": 0,
                        "productId": 0,
                        "productName": "string",
                        "productImage": "string",
                        "skuId": 0,
                        "skuSpecs": "string",
                        "productPrice": 0,
                        "quantity": 0,
                        "totalPrice": 0,
                        "reviewStatus": 0
                    }
                ],
                "logistics": {
                    "id": 0,
                    "orderId": 0,
                    "logisticsCompany": "string",
                    "trackingNumber": "string",
                    "currentStatus": "string",
                    "traces": "string"
                },
                "createdAt": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
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

### 获取订单详情

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/merchant/orders/{orderId}


描述：获取订单详情

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | 订单ID | 0 |
|   └ orderNo | string | 否 | - | 订单号 |  |
|   └ userId | string | 否 | - | 用户ID |  |
|   └ merchantId | int64 | 否 | - | 商家ID | 0 |
|   └ merchantName | string | 否 | - | 商家名称 |  |
|   └ totalAmount | number | 否 | - | 订单总额 | 0 |
|   └ discountAmount | number | 否 | - | 优惠金额 | 0 |
|   └ couponAmount | number | 否 | - | 优惠券金额 | 0 |
|   └ freightAmount | number | 否 | - | 运费 | 0 |
|   └ payAmount | number | 否 | - | 实付金额 | 0 |
|   └ points | int32 | 否 | - | 消耗积分 | 0 |
|   └ status | int32 | 否 | - | 订单状态 | 0 |
|   └ statusText | string | 否 | - | 订单状态文本 |  |
|   └ payTime | string | 否 | - | 支付时间 | yyyy-MM-dd HH:mm:ss |
|   └ shipTime | string | 否 | - | 发货时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiveTime | string | 否 | - | 收货时间 | yyyy-MM-dd HH:mm:ss |
|   └ finishTime | string | 否 | - | 完成时间 | yyyy-MM-dd HH:mm:ss |
|   └ receiverName | string | 否 | - | 收货人 |  |
|   └ receiverPhone | string | 否 | - | 收货电话 |  |
|   └ receiverAddress | string | 否 | - | 收货地址 |  |
|   └ remark | string | 否 | - | 订单备注 |  |
|   └ items | array | 否 |  | 订单商品列表 |  |
|     └ id | int64 | 否 | - | 订单商品ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ productId | int64 | 否 | - | 商品ID | 0 |
|     └ productName | string | 否 | - | 商品名称 |  |
|     └ productImage | string | 否 | - | 商品图片 |  |
|     └ skuId | int64 | 否 | - | SKU ID | 0 |
|     └ skuSpecs | string | 否 | - | SKU规格 |  |
|     └ productPrice | number | 否 | - | 商品单价 | 0 |
|     └ quantity | int32 | 否 | - | 购买数量 | 0 |
|     └ totalPrice | number | 否 | - | 总价 | 0 |
|     └ reviewStatus | int32 | 否 | - | 评价状态 | 0 |
|   └ logistics | object | 否 |  | 物流信息 |  |
|     └ id | int64 | 否 | - | 物流ID | 0 |
|     └ orderId | int64 | 否 | - | 订单ID | 0 |
|     └ logisticsCompany | string | 否 | - | 物流公司 |  |
|     └ trackingNumber | string | 否 | - | 物流单号 |  |
|     └ currentStatus | string | 否 | - | 当前状态 |  |
|     └ traces | string | 否 | - | 物流轨迹 |  |
|   └ createdAt | string | 否 | - | 创建时间 | yyyy-MM-dd HH:mm:ss |
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
        "orderNo": "string",
        "userId": "string",
        "merchantId": 0,
        "merchantName": "string",
        "totalAmount": 0,
        "discountAmount": 0,
        "couponAmount": 0,
        "freightAmount": 0,
        "payAmount": 0,
        "points": 0,
        "status": 0,
        "statusText": "string",
        "payTime": "yyyy-MM-dd HH:mm:ss",
        "shipTime": "yyyy-MM-dd HH:mm:ss",
        "receiveTime": "yyyy-MM-dd HH:mm:ss",
        "finishTime": "yyyy-MM-dd HH:mm:ss",
        "receiverName": "string",
        "receiverPhone": "string",
        "receiverAddress": "string",
        "remark": "string",
        "items": [
            {
                "id": 0,
                "orderId": 0,
                "productId": 0,
                "productName": "string",
                "productImage": "string",
                "skuId": 0,
                "skuSpecs": "string",
                "productPrice": 0,
                "quantity": 0,
                "totalPrice": 0,
                "reviewStatus": 0
            }
        ],
        "logistics": {
            "id": 0,
            "orderId": 0,
            "logisticsCompany": "string",
            "trackingNumber": "string",
            "currentStatus": "string",
            "traces": "string"
        },
        "createdAt": "yyyy-MM-dd HH:mm:ss"
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

### 发货

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/merchant/orders/{orderId}/ship


描述：发货

ContentType：`application/json`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| orderId | 是 | 订单ID | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| id | int64 | 否 | - | 物流ID | 0 |
| orderId | int64 | 否 | - | 订单ID | 0 |
| logisticsCompany | string | 否 | - | 物流公司 |  |
| trackingNumber | string | 否 | - | 物流单号 |  |
| currentStatus | string | 否 | - | 当前状态 |  |
| traces | string | 否 | - | 物流轨迹 |  |

#### 请求示例

```
{
    "id": 0,
    "orderId": 0,
    "logisticsCompany": "string",
    "trackingNumber": "string",
    "currentStatus": "string",
    "traces": "string"
}
```

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 同意退款申请

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/merchant/orders/refunds/{refundId}/approve


描述：同意退款申请

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| refundId | 是 | 退款ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 拒绝退款申请

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/merchant/orders/refunds/{refundId}/reject


描述：拒绝退款申请

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| refundId | 是 | 退款ID | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| reason | string | 是 | - | 拒绝原因 |  |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 | - | 响应数据 |  |
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
    "data": {},
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

### 获取退款申请列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/merchant/orders/refunds


描述：获取退款申请列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| status | int32 | 否 | - | 退款状态(可选) | 0 |
| pageNum | int32 | 是 | - | 页码 | 1 |
| pageSize | int32 | 是 | - | 每页数量 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ orderNo | string | 否 | - | No comments found. |  |
|     └ orderId | int64 | 否 | - | No comments found. | 0 |
|     └ userId | string | 否 | - | No comments found. |  |
|     └ userName | string | 否 | - | No comments found. |  |
|     └ refundAmount | number | 否 | - | No comments found. | 0 |
|     └ refundType | int32 | 否 | - | No comments found. | 0 |
|     └ reason | string | 否 | - | No comments found. |  |
|     └ description | string | 否 | - | No comments found. |  |
|     └ images | string | 否 | - | No comments found. |  |
|     └ status | int32 | 否 | - | No comments found. | 0 |
|     └ statusText | string | 否 | - | No comments found. |  |
|     └ applyTime | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|     └ handleTime | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|     └ rejectReason | string | 否 | - | No comments found. |  |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
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
        "totalPages": 0,
        "totalElements": 0,
        "first": true,
        "last": true,
        "pageable": {
            "pageNumber": 0,
            "unpaged": true,
            "paged": true,
            "pageSize": 0,
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            }
        },
        "size": 0,
        "content": [
            {
                "id": 0,
                "orderNo": "string",
                "orderId": 0,
                "userId": "string",
                "userName": "string",
                "refundAmount": 0,
                "refundType": 0,
                "reason": "string",
                "description": "string",
                "images": "string",
                "status": 0,
                "statusText": "string",
                "applyTime": "yyyy-MM-dd HH:mm:ss",
                "handleTime": "yyyy-MM-dd HH:mm:ss",
                "rejectReason": "string"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
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

### 获取订单统计信息

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/merchant/orders/statistics


描述：获取订单统计信息

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ totalOrders | int64 | 否 | - | No comments found. | 0 |
|   └ pendingPayment | int64 | 否 | - | No comments found. | 0 |
|   └ pendingShipment | int64 | 否 | - | No comments found. | 0 |
|   └ pendingReceipt | int64 | 否 | - | No comments found. | 0 |
|   └ completed | int64 | 否 | - | No comments found. | 0 |
|   └ cancelled | int64 | 否 | - | No comments found. | 0 |
|   └ todaySales | number | 否 | - | No comments found. | 0 |
|   └ monthSales | number | 否 | - | No comments found. | 0 |
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
        "totalOrders": 0,
        "pendingPayment": 0,
        "pendingShipment": 0,
        "pendingReceipt": 0,
        "completed": 0,
        "cancelled": 0,
        "todaySales": 0,
        "monthSales": 0
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
