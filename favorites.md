# 文档

## 收藏控制器


### 获取用户收藏列表

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/favorites


描述：获取用户收藏列表

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
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
|   └ totalElements | int64 | 否 | - | No comments found. | 0 |
|   └ totalPages | int32 | 否 | - | No comments found. | 0 |
|   └ size | int32 | 否 | - | No comments found. | 0 |
|   └ content | array | 否 |  | No comments found. |  |
|     └ id | int64 | 否 | - | No comments found. | 0 |
|     └ productId | int64 | 否 | - | No comments found. | 0 |
|     └ productName | string | 否 | - | No comments found. |  |
|     └ productImage | string | 否 | - | No comments found. |  |
|     └ productPrice | number | 否 | - | No comments found. | 0 |
|     └ merchantName | string | 否 | - | No comments found. |  |
|     └ createdAt | string | 否 | - | No comments found. | yyyy-MM-dd HH:mm:ss |
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
                "productId": 0,
                "productName": "string",
                "productImage": "string",
                "productPrice": 0,
                "merchantName": "string",
                "createdAt": "yyyy-MM-dd HH:mm:ss"
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

### 添加收藏

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/favorites


描述：添加收藏

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| productId | int64 | 是 | - | 商品ID | 0 |

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

### 取消收藏

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/favorites/{productId}


描述：取消收藏

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

### 检查是否已收藏

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/favorites/check


描述：检查是否已收藏

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| productId | int64 | 是 | - | 商品ID | 0 |

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

### 获取收藏数量

#### URL

- 测试环境: `GET` http://127.0.0.1:8080/favorites/count


描述：获取收藏数量

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

#### 响应参数

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| code | int32 | 否 | - | 响应状态码<br>对应ResultCode枚举 | 0 |
| success | boolean | 否 | - | 响应状态<br>true: 成功, false: 失败 | true |
| httpStatus | int32 | 否 | - | HTTP状态码<br>用于HTTP响应状态 | 0 |
| message | string | 否 | - | 响应消息 |  |
| data | int32 | 否 | - | 响应数据 |  |
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

### 清空收藏夹

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/favorites/clear


描述：清空收藏夹

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

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

### 批量删除收藏

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/favorites/batch


描述：批量删除收藏

ContentType：`application/json`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
|  - | array[int64] | 否 | - | array of int64 |  |

#### 请求示例

```
{}
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
