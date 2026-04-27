# 文档

## 商品控制器


### 分页查询商品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products


描述：分页查询商品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| keyword | string | 否 | - | 关键字 |  |
| categoryId | int64 | 否 | - | 分类ID | 0 |
| brandId | int64 | 否 | - | 品牌ID | 0 |
| merchantId | int64 | 否 | - | 商家ID | 0 |
| minPrice | number | 否 | - | 价格区间-最低价 | 0 |
| maxPrice | number | 否 | - | 价格区间-最高价 | 0 |
| rating | int32 | 否 | - | 评分 | 0 |
| isHot | int32 | 否 | - | 是否热卖：0-全部，1-热卖 | 0 |
| isFeatured | int32 | 否 | - | 是否精选：0-全部，1-精选 | 0 |
| isNew | int32 | 否 | - | 是否新品：0-全部，1-新品 | 0 |
| publishStatus | int32 | 否 | - | 上架状态 | 0 |
| sortField | string | 否 | - | 排序字段：price-价格，sales-销量，rating-评分，createdAt-创建时间 |  |
| sortOrder | string | 否 | - | 排序方式：asc-升序，desc-降序 |  |
| pageNum | int32 | 否 | - | 页码 | 0 |
| pageSize | int32 | 否 | - | 每页数量 | 0 |

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
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ merchantId | int64 | 否 | - | No comments found. | 0 |
|     └ merchantName | string | 否 | - | No comments found. |  |
|     └ categoryId | int64 | 否 | - | No comments found. | 0 |
|     └ categoryName | string | 否 | - | No comments found. |  |
|     └ name | string | 否 | - | No comments found. |  |
|     └ subName | string | 否 | - | No comments found. |  |
|     └ image | string | 否 | - | No comments found. |  |
|     └ images | object | 否 | - | No comments found. |  |
|     └ price | number | 否 | - | No comments found. | 0 |
|     └ originalPrice | number | 否 | - | No comments found. | 0 |
|     └ stock | int32 | 否 | - | No comments found. | 0 |
|     └ soldCount | int32 | 否 | - | No comments found. | 0 |
|     └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|     └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|     └ rating | number | 否 | - | No comments found. | 0 |
|     └ isHot | int32 | 否 | - | No comments found. | 0 |
|     └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|     └ isNew | int32 | 否 | - | No comments found. | 0 |
|     └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|     └ tags | string | 否 | - | No comments found. |  |
|     └ keywords | string | 否 | - | No comments found. |  |
|     └ skuCount | int32 | 否 | - | No comments found. | 0 |
|     └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ numberOfElements | int32 | 否 | - | No comments found. | 0 |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
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
        "size": 0,
        "content": [
            {
                "id": 0,
                "merchantId": 0,
                "merchantName": "string",
                "categoryId": 0,
                "categoryName": "string",
                "name": "string",
                "subName": "string",
                "image": "string",
                "images": {},
                "price": 0,
                "originalPrice": 0,
                "stock": 0,
                "soldCount": 0,
                "reviewCount": 0,
                "favoriteCount": 0,
                "rating": 0,
                "isHot": 0,
                "isFeatured": 0,
                "isNew": 0,
                "publishStatus": 0,
                "tags": "string",
                "keywords": "string",
                "skuCount": 0,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
        "first": true,
        "last": true,
        "numberOfElements": 0,
        "pageable": {
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            },
            "unpaged": true,
            "paged": true,
            "pageSize": 0,
            "pageNumber": 0
        },
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

### 获取商品详情

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/{productId}


描述：获取商品详情

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| productId | 是 | 商品ID | 0 |

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | object | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ merchant | object | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ name | string | 否 | - | No comments found. |  |
|     └ logo | string | 否 | - | No comments found. |  |
|   └ category | object | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ name | string | 否 | - | No comments found. |  |
|     └ parentId | int64 | 否 | - | No comments found. | 0 |
|     └ level | int32 | 否 | - | No comments found. | 0 |
|   └ name | string | 否 | - | No comments found. |  |
|   └ subName | string | 否 | - | No comments found. |  |
|   └ image | string | 否 | - | No comments found. |  |
|   └ images | object | 否 | - | No comments found. |  |
|   └ price | number | 否 | - | No comments found. | 0 |
|   └ originalPrice | number | 否 | - | No comments found. | 0 |
|   └ costPrice | number | 否 | - | No comments found. | 0 |
|   └ stock | int32 | 否 | - | No comments found. | 0 |
|   └ soldCount | int32 | 否 | - | No comments found. | 0 |
|   └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|   └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|   └ rating | number | 否 | - | No comments found. | 0 |
|   └ description | string | 否 | - | No comments found. |  |
|   └ detail | string | 否 | - | No comments found. |  |
|   └ isHot | int32 | 否 | - | No comments found. | 0 |
|   └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|   └ isNew | int32 | 否 | - | No comments found. | 0 |
|   └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|   └ tags | array | 否 | - | No comments found. | , |
|   └ keywords | string | 否 | - | No comments found. |  |
|   └ specs | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ name | string | 否 | - | No comments found. |  |
|     └ sort | int32 | 否 | - | No comments found. | 0 |
|     └ values | array | 否 |  | No comments found. |  |
|       └ id | int64 | 否 | - | No comments found. | 0 |
|       └ value | string | 否 | - | No comments found. |  |
|       └ sort | int32 | 否 | - | No comments found. | 0 |
|   └ skus | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ skuCode | string | 否 | - | No comments found. |  |
|     └ specs | object | 否 | - | No comments found. |  |
|     └ price | number | 否 | - | No comments found. | 0 |
|     └ originalPrice | number | 否 | - | No comments found. | 0 |
|     └ stock | int32 | 否 | - | No comments found. | 0 |
|     └ lowStock | int32 | 否 | - | No comments found. | 0 |
|     └ image | string | 否 | - | No comments found. |  |
|     └ status | int32 | 否 | - | No comments found. | 0 |
|     └ lowStockStatus | boolean | 否 | - | No comments found. | true |
|     └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
        "merchant": {
            "id": 0,
            "name": "string",
            "logo": "string"
        },
        "category": {
            "id": 0,
            "name": "string",
            "parentId": 0,
            "level": 0
        },
        "name": "string",
        "subName": "string",
        "image": "string",
        "images": {},
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
        "tags": [
            0,
            0
        ],
        "keywords": "string",
        "specs": [
            {
                "id": 0,
                "name": "string",
                "sort": 0,
                "values": [
                    {
                        "id": 0,
                        "value": "string",
                        "sort": 0
                    }
                ]
            }
        ],
        "skus": [
            {
                "id": 0,
                "skuCode": "string",
                "specs": {},
                "price": 0,
                "originalPrice": 0,
                "stock": 0,
                "lowStock": 0,
                "image": "string",
                "status": 0,
                "lowStockStatus": true,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "createdAt": "yyyy-MM-dd HH:mm:ss",
        "updatedAt": "yyyy-MM-dd HH:mm:ss"
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

### 获取热卖商品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/hot


描述：获取热卖商品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| limit | int32 | 是 | - | 数量限制 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | array | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ merchantId | int64 | 否 | - | No comments found. | 0 |
|   └ merchantName | string | 否 | - | No comments found. |  |
|   └ categoryId | int64 | 否 | - | No comments found. | 0 |
|   └ categoryName | string | 否 | - | No comments found. |  |
|   └ name | string | 否 | - | No comments found. |  |
|   └ subName | string | 否 | - | No comments found. |  |
|   └ image | string | 否 | - | No comments found. |  |
|   └ images | object | 否 | - | No comments found. |  |
|   └ price | number | 否 | - | No comments found. | 0 |
|   └ originalPrice | number | 否 | - | No comments found. | 0 |
|   └ stock | int32 | 否 | - | No comments found. | 0 |
|   └ soldCount | int32 | 否 | - | No comments found. | 0 |
|   └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|   └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|   └ rating | number | 否 | - | No comments found. | 0 |
|   └ isHot | int32 | 否 | - | No comments found. | 0 |
|   └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|   └ isNew | int32 | 否 | - | No comments found. | 0 |
|   └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|   └ tags | string | 否 | - | No comments found. |  |
|   └ keywords | string | 否 | - | No comments found. |  |
|   └ skuCount | int32 | 否 | - | No comments found. | 0 |
|   └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
            "merchantId": 0,
            "merchantName": "string",
            "categoryId": 0,
            "categoryName": "string",
            "name": "string",
            "subName": "string",
            "image": "string",
            "images": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "soldCount": 0,
            "reviewCount": 0,
            "favoriteCount": 0,
            "rating": 0,
            "isHot": 0,
            "isFeatured": 0,
            "isNew": 0,
            "publishStatus": 0,
            "tags": "string",
            "keywords": "string",
            "skuCount": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss"
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

### 获取精选商品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/featured


描述：获取精选商品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| limit | int32 | 是 | - | 数量限制 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | array | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ merchantId | int64 | 否 | - | No comments found. | 0 |
|   └ merchantName | string | 否 | - | No comments found. |  |
|   └ categoryId | int64 | 否 | - | No comments found. | 0 |
|   └ categoryName | string | 否 | - | No comments found. |  |
|   └ name | string | 否 | - | No comments found. |  |
|   └ subName | string | 否 | - | No comments found. |  |
|   └ image | string | 否 | - | No comments found. |  |
|   └ images | object | 否 | - | No comments found. |  |
|   └ price | number | 否 | - | No comments found. | 0 |
|   └ originalPrice | number | 否 | - | No comments found. | 0 |
|   └ stock | int32 | 否 | - | No comments found. | 0 |
|   └ soldCount | int32 | 否 | - | No comments found. | 0 |
|   └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|   └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|   └ rating | number | 否 | - | No comments found. | 0 |
|   └ isHot | int32 | 否 | - | No comments found. | 0 |
|   └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|   └ isNew | int32 | 否 | - | No comments found. | 0 |
|   └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|   └ tags | string | 否 | - | No comments found. |  |
|   └ keywords | string | 否 | - | No comments found. |  |
|   └ skuCount | int32 | 否 | - | No comments found. | 0 |
|   └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
            "merchantId": 0,
            "merchantName": "string",
            "categoryId": 0,
            "categoryName": "string",
            "name": "string",
            "subName": "string",
            "image": "string",
            "images": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "soldCount": 0,
            "reviewCount": 0,
            "favoriteCount": 0,
            "rating": 0,
            "isHot": 0,
            "isFeatured": 0,
            "isNew": 0,
            "publishStatus": 0,
            "tags": "string",
            "keywords": "string",
            "skuCount": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss"
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

### 获取新品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/new


描述：获取新品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| limit | int32 | 是 | - | 数量限制 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | array | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ merchantId | int64 | 否 | - | No comments found. | 0 |
|   └ merchantName | string | 否 | - | No comments found. |  |
|   └ categoryId | int64 | 否 | - | No comments found. | 0 |
|   └ categoryName | string | 否 | - | No comments found. |  |
|   └ name | string | 否 | - | No comments found. |  |
|   └ subName | string | 否 | - | No comments found. |  |
|   └ image | string | 否 | - | No comments found. |  |
|   └ images | object | 否 | - | No comments found. |  |
|   └ price | number | 否 | - | No comments found. | 0 |
|   └ originalPrice | number | 否 | - | No comments found. | 0 |
|   └ stock | int32 | 否 | - | No comments found. | 0 |
|   └ soldCount | int32 | 否 | - | No comments found. | 0 |
|   └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|   └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|   └ rating | number | 否 | - | No comments found. | 0 |
|   └ isHot | int32 | 否 | - | No comments found. | 0 |
|   └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|   └ isNew | int32 | 否 | - | No comments found. | 0 |
|   └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|   └ tags | string | 否 | - | No comments found. |  |
|   └ keywords | string | 否 | - | No comments found. |  |
|   └ skuCount | int32 | 否 | - | No comments found. | 0 |
|   └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
            "merchantId": 0,
            "merchantName": "string",
            "categoryId": 0,
            "categoryName": "string",
            "name": "string",
            "subName": "string",
            "image": "string",
            "images": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "soldCount": 0,
            "reviewCount": 0,
            "favoriteCount": 0,
            "rating": 0,
            "isHot": 0,
            "isFeatured": 0,
            "isNew": 0,
            "publishStatus": 0,
            "tags": "string",
            "keywords": "string",
            "skuCount": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss"
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

### 获取推荐商品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/recommended


描述：获取推荐商品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| limit | int32 | 是 | - | 数量限制 | 10 |

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | array | 否 |  | 响应数据 |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ merchantId | int64 | 否 | - | No comments found. | 0 |
|   └ merchantName | string | 否 | - | No comments found. |  |
|   └ categoryId | int64 | 否 | - | No comments found. | 0 |
|   └ categoryName | string | 否 | - | No comments found. |  |
|   └ name | string | 否 | - | No comments found. |  |
|   └ subName | string | 否 | - | No comments found. |  |
|   └ image | string | 否 | - | No comments found. |  |
|   └ images | object | 否 | - | No comments found. |  |
|   └ price | number | 否 | - | No comments found. | 0 |
|   └ originalPrice | number | 否 | - | No comments found. | 0 |
|   └ stock | int32 | 否 | - | No comments found. | 0 |
|   └ soldCount | int32 | 否 | - | No comments found. | 0 |
|   └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|   └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|   └ rating | number | 否 | - | No comments found. | 0 |
|   └ isHot | int32 | 否 | - | No comments found. | 0 |
|   └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|   └ isNew | int32 | 否 | - | No comments found. | 0 |
|   └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|   └ tags | string | 否 | - | No comments found. |  |
|   └ keywords | string | 否 | - | No comments found. |  |
|   └ skuCount | int32 | 否 | - | No comments found. | 0 |
|   └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
            "merchantId": 0,
            "merchantName": "string",
            "categoryId": 0,
            "categoryName": "string",
            "name": "string",
            "subName": "string",
            "image": "string",
            "images": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "soldCount": 0,
            "reviewCount": 0,
            "favoriteCount": 0,
            "rating": 0,
            "isHot": 0,
            "isFeatured": 0,
            "isNew": 0,
            "publishStatus": 0,
            "tags": "string",
            "keywords": "string",
            "skuCount": 0,
            "createdAt": "yyyy-MM-dd HH:mm:ss",
            "updatedAt": "yyyy-MM-dd HH:mm:ss"
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

### 搜索商品

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/search


描述：搜索商品

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| keyword | string | 是 | - | 关键词 |  |
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
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ merchantId | int64 | 否 | - | No comments found. | 0 |
|     └ merchantName | string | 否 | - | No comments found. |  |
|     └ categoryId | int64 | 否 | - | No comments found. | 0 |
|     └ categoryName | string | 否 | - | No comments found. |  |
|     └ name | string | 否 | - | No comments found. |  |
|     └ subName | string | 否 | - | No comments found. |  |
|     └ image | string | 否 | - | No comments found. |  |
|     └ images | object | 否 | - | No comments found. |  |
|     └ price | number | 否 | - | No comments found. | 0 |
|     └ originalPrice | number | 否 | - | No comments found. | 0 |
|     └ stock | int32 | 否 | - | No comments found. | 0 |
|     └ soldCount | int32 | 否 | - | No comments found. | 0 |
|     └ reviewCount | int32 | 否 | - | No comments found. | 0 |
|     └ favoriteCount | int32 | 否 | - | No comments found. | 0 |
|     └ rating | number | 否 | - | No comments found. | 0 |
|     └ isHot | int32 | 否 | - | No comments found. | 0 |
|     └ isFeatured | int32 | 否 | - | No comments found. | 0 |
|     └ isNew | int32 | 否 | - | No comments found. | 0 |
|     └ publishStatus | int32 | 否 | - | No comments found. | 0 |
|     └ tags | string | 否 | - | No comments found. |  |
|     └ keywords | string | 否 | - | No comments found. |  |
|     └ skuCount | int32 | 否 | - | No comments found. | 0 |
|     └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|     └ updatedAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
|   └ number | int32 | 否 | - | No comments found. | 0 |
|   └ sort | object | 否 |  | No comments found. |  |
|     └ empty | boolean | 否 | - | No comments found. | true |
|     └ orders | array | 否 | - | No comments found. |  |
|   └ first | boolean | 否 | - | No comments found. | true |
|   └ last | boolean | 否 | - | No comments found. | true |
|   └ numberOfElements | int32 | 否 | - | No comments found. | 0 |
|   └ pageable | object | 否 |  | No comments found. |  |
|     └ offset | int64 | 否 | - | No comments found. | 0 |
|     └ sort | object | 否 |  | No comments found. |  |
|       └ empty | boolean | 否 | - | No comments found. | true |
|       └ orders | array | 否 | - | No comments found. |  |
|     └ unpaged | boolean | 否 | - | No comments found. | true |
|     └ paged | boolean | 否 | - | No comments found. | true |
|     └ pageSize | int32 | 否 | - | No comments found. | 0 |
|     └ pageNumber | int32 | 否 | - | No comments found. | 0 |
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
        "size": 0,
        "content": [
            {
                "id": 0,
                "merchantId": 0,
                "merchantName": "string",
                "categoryId": 0,
                "categoryName": "string",
                "name": "string",
                "subName": "string",
                "image": "string",
                "images": {},
                "price": 0,
                "originalPrice": 0,
                "stock": 0,
                "soldCount": 0,
                "reviewCount": 0,
                "favoriteCount": 0,
                "rating": 0,
                "isHot": 0,
                "isFeatured": 0,
                "isNew": 0,
                "publishStatus": 0,
                "tags": "string",
                "keywords": "string",
                "skuCount": 0,
                "createdAt": "yyyy-MM-dd HH:mm:ss",
                "updatedAt": "yyyy-MM-dd HH:mm:ss"
            }
        ],
        "number": 0,
        "sort": {
            "empty": true,
            "orders": []
        },
        "first": true,
        "last": true,
        "numberOfElements": 0,
        "pageable": {
            "offset": 0,
            "sort": {
                "empty": true,
                "orders": []
            },
            "unpaged": true,
            "paged": true,
            "pageSize": 0,
            "pageNumber": 0
        },
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

### 获取商品分类列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/categories


描述：获取商品分类列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

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
|   └ parentId | int64 | 否 | - | 父分类ID：0-顶级分类 | 0 |
|   └ name | string | 否 | - | 分类名称 |  |
|   └ level | int32 | 否 | - | 层级：1-一级，2-二级，3-三级 | 0 |
|   └ icon | string | 否 | - | 分类图标 |  |
|   └ image | string | 否 | - | 分类图片 |  |
|   └ sort | int32 | 否 | - | 排序 | 0 |
|   └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|   └ parent | object | 否 | - | 父分类 $ref... self |  |
|   └ children | array | 否 | - | 子分类列表 |  |
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
            "parentId": 0,
            "name": "string",
            "level": 0,
            "icon": "string",
            "image": "string",
            "sort": 0,
            "status": 0,
            "parent": {},
            "children": []
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

### 获取商品分类详情

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/products/categories/{categoryId}


描述：获取商品分类详情

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| categoryId | 是 | 分类ID | 0 |

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
|   └ parentId | int64 | 否 | - | 父分类ID：0-顶级分类 | 0 |
|   └ name | string | 否 | - | 分类名称 |  |
|   └ level | int32 | 否 | - | 层级：1-一级，2-二级，3-三级 | 0 |
|   └ icon | string | 否 | - | 分类图标 |  |
|   └ image | string | 否 | - | 分类图片 |  |
|   └ sort | int32 | 否 | - | 排序 | 0 |
|   └ status | int32 | 否 | - | 状态：0-禁用，1-启用 | 0 |
|   └ parent | object | 否 | - | 父分类 $ref... self |  |
|   └ children | array | 否 | - | 子分类列表 |  |
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
        "parentId": 0,
        "name": "string",
        "level": 0,
        "icon": "string",
        "image": "string",
        "sort": 0,
        "status": 0,
        "parent": {},
        "children": []
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

### 创建商品

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/products


描述：创建商品

ContentType：`application/json`

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| name | string | 是 | 200 | No comments found.<br>Validation[Size(max=200, message=商品名称不能超过200个字符) ] |  |
| subName | string | 否 | 200 | No comments found.<br>Validation[Size(max=200, message=副标题不能超过200个字符) ] |  |
| categoryId | int64 | 是 | - | No comments found. | 0 |
| image | string | 否 | - | No comments found. |  |
| images | object | 否 | - | No comments found. |  |
| price | number | 是 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=价格必须大于0); Digits(integer=8, fraction=2, message=价格格式不正确) ] | 0 |
| originalPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=原价必须大于0); Digits(integer=8, fraction=2, message=原价格式不正确) ] | 0 |
| costPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=成本价必须大于0); Digits(integer=8, fraction=2, message=成本价格式不正确) ] | 0 |
| stock | int32 | 是 | - | No comments found.<br>Validation[Min(value=0, message=库存不能小于0) ] | 0 |
| description | string | 否 | - | No comments found. |  |
| detail | string | 否 | - | No comments found. |  |
| isHot | int32 | 否 | - | No comments found. | 0 |
| isFeatured | int32 | 否 | - | No comments found. | 0 |
| isNew | int32 | 否 | - | No comments found. | 0 |
| publishStatus | int32 | 否 | - | No comments found. | 0 |
| tags | string | 否 | 500 | No comments found.<br>Validation[Size(max=500, message=     标签不能超过500个字符) ] |  |
| keywords | string | 否 | 255 | No comments found.<br>Validation[Size(max=255, message=关键词不能超过255个字符) ] |  |
| specs | array | 否 |  | No comments found. |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ name | string | 是 | - | No comments found. |  |
|   └ sort | int32 | 否 | - | No comments found. | 0 |
|   └ values | array | 是 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ value | string | 是 | - | No comments found. |  |
|     └ sort | int32 | 否 | - | No comments found. | 0 |
| skus | array | 否 |  | No comments found. |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ skuCode | string | 是 | 64 | No comments found.<br>Validation[Size(max=64, message=SKU编码不能超过64个字符) ] |  |
|   └ specs | object | 是 | - | No comments found. |  |
|   └ price | number | 是 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=价格必须大于0); Digits(integer=8, fraction=2, message=价格格式不正确) ] | 0 |
|   └ originalPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=原价必须大于0); Digits(integer=8, fraction=2, message=原价格式不正确) ] | 0 |
|   └ stock | int32 | 是 | - | No comments found.<br>Validation[Min(value=0, message=库存不能小于0) ] | 0 |
|   └ lowStock | int32 | 否 | - | No comments found.<br>Validation[Min(value=0, message=库存预警值不能小于0) ] | 0 |
|   └ image | string | 否 | - | No comments found. |  |
|   └ status | int32 | 否 | - | No comments found. | 0 |

#### 请求示例

```
{
    "name": "string",
    "subName": "string",
    "categoryId": 0,
    "image": "string",
    "images": {},
    "price": 0,
    "originalPrice": 0,
    "costPrice": 0,
    "stock": 0,
    "description": "string",
    "detail": "string",
    "isHot": 0,
    "isFeatured": 0,
    "isNew": 0,
    "publishStatus": 0,
    "tags": "string",
    "keywords": "string",
    "specs": [
        {
            "id": 0,
            "name": "string",
            "sort": 0,
            "values": [
                {
                    "id": 0,
                    "value": "string",
                    "sort": 0
                }
            ]
        }
    ],
    "skus": [
        {
            "id": 0,
            "skuCode": "string",
            "specs": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "lowStock": 0,
            "image": "string",
            "status": 0
        }
    ]
}
```

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | int64 | 否 | - | 响应数据 |  |
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
    "data": 0,
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

### 更新商品

#### URL

- 测试环境: `PUT` http://127.0.0.1:8080/products/{productId}


描述：更新商品

ContentType：`application/json`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| productId | 是 | 商品ID | 0 |

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| id | int64 | 是 | - | No comments found. | 0 |
| name | string | 是 | 200 | No comments found.<br>Validation[Size(max=200, message=商品名称不能超过200个字符) ] |  |
| subName | string | 否 | 200 | No comments found.<br>Validation[Size(max=200, message=副标题不能超过200个字符) ] |  |
| categoryId | int64 | 是 | - | No comments found. | 0 |
| image | string | 否 | - | No comments found. |  |
| images | object | 否 | - | No comments found. |  |
| price | number | 是 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=价格必须大于0); Digits(integer=8, fraction=2, message=价格格式不正确) ] | 0 |
| originalPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=原价必须大于0); Digits(integer=8, fraction=2, message=原价格式不正确) ] | 0 |
| costPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=成本价必须大于0); Digits(integer=8, fraction=2, message=成本价格式不正确) ] | 0 |
| stock | int32 | 是 | - | No comments found.<br>Validation[Min(value=0, message=库存不能小于0) ] | 0 |
| description | string | 否 | - | No comments found. |  |
| detail | string | 否 | - | No comments found. |  |
| isHot | int32 | 否 | - | No comments found. | 0 |
| isFeatured | int32 | 否 | - | No comments found. | 0 |
| isNew | int32 | 否 | - | No comments found. | 0 |
| publishStatus | int32 | 否 | - | No comments found. | 0 |
| tags | string | 否 | 500 | No comments found.<br>Validation[Size(max=500, message=标签不能超过500个字符) ] |  |
| keywords | string | 否 | 255 | No comments found.<br>Validation[Size(max=255, message=关键词不能超过255个字符) ] |  |
| specs | array | 否 |  | No comments found. |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ name | string | 是 | - | No comments found. |  |
|   └ sort | int32 | 否 | - | No comments found. | 0 |
|   └ values | array | 是 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ value | string | 是 | - | No comments found. |  |
|     └ sort | int32 | 否 | - | No comments found. | 0 |
| skus | array | 否 |  | No comments found. |  |
|   └ id | int64 | 否 | - | No comments found. | 0 |
|   └ skuCode | string | 是 | 64 | No comments found.<br>Validation[Size(max=64, message=SKU编码不能超过64个字符) ] |  |
|   └ specs | object | 是 | - | No comments found. |  |
|   └ price | number | 是 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=价格必须大于0); Digits(integer=8, fraction=2, message=价格格式不正确) ] | 0 |
|   └ originalPrice | number | 否 | - | No comments found.<br>Validation[DecimalMin(value=0.01, message=原价必须大于0); Digits(integer=8, fraction=2, message=原价格式不正确) ] | 0 |
|   └ stock | int32 | 是 | - | No comments found.<br>Validation[Min(value=0, message=库存不能小于0) ] | 0 |
|   └ lowStock | int32 | 否 | - | No comments found.<br>Validation[Min(value=0, message=库存预警值不能小于0) ] | 0 |
|   └ image | string | 否 | - | No comments found. |  |
|   └ status | int32 | 否 | - | No comments found. | 0 |

#### 请求示例

```
{
    "id": 0,
    "name": "string",
    "subName": "string",
    "categoryId": 0,
    "image": "string",
    "images": {},
    "price": 0,
    "originalPrice": 0,
    "costPrice": 0,
    "stock": 0,
    "description": "string",
    "detail": "string",
    "isHot": 0,
    "isFeatured": 0,
    "isNew": 0,
    "publishStatus": 0,
    "tags": "string",
    "keywords": "string",
    "specs": [
        {
            "id": 0,
            "name": "string",
            "sort": 0,
            "values": [
                {
                    "id": 0,
                    "value": "string",
                    "sort": 0
                }
            ]
        }
    ],
    "skus": [
        {
            "id": 0,
            "skuCode": "string",
            "specs": {},
            "price": 0,
            "originalPrice": 0,
            "stock": 0,
            "lowStock": 0,
            "image": "string",
            "status": 0
        }
    ]
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

### 删除商品

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/products/{productId}


描述：删除商品

ContentType：`application/x-www-form-urlencoded`

#### Path参数

| 名称 | 必填 | 描述 | 示例值 |
| --- | --- | --- | --- |
| productId | 是 | 商品ID | 0 |

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
