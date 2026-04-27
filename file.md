# 文档

## FileController


### 上传文件

#### URL

- 测试环境: `POST` http://127.0.0.1:8080/file


描述：上传文件

ContentType：`multipart/form-data`

#### 请求参数

##### Body Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| file | file | 否 | - |     要上传的文件 |  |
| fileName | string | 否 | - | 文件名 |  |

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

### 删除文件

#### URL

- 测试环境: `DELETE` http://127.0.0.1:8080/file


描述：删除文件

ContentType：`application/x-www-form-urlencoded`

#### 请求参数

##### Query Parameter

| 名称 | 类型 | 必填 | 最大长度 | 描述 | 示例值 |
| --- | --- | --- | --- | --- | --- |
| fileName | string | 否 | - | 要删除的文件名 |  |

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
