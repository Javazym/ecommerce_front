/**
 * API请求封装模块
 * 基于axios的二次封装，支持统一响应处理、错误提示、请求拦截
 */
import axios from 'axios';
import { ElMessage } from 'element-plus';

export const baseUrl = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // ⚠️ 建议增加超时时间（1秒太短，容易误判）
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
      // 添加Token到请求头
      if (!config.ignoreAuth && localStorage.getItem('token')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      }
      return config;
    },
    (error) => {
      console.error('请求错误:', error);
      return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
      const res = response.data;

      // ✅ 核心修复：使用 success 字段判断业务是否成功
      if (res.code !== 1000) {
        ElMessage.error(res.message || '请求失败');

        // Token过期或无权限，跳转登录
        if (res.httpStatus === 401 || res.httpStatus === 403) {
          localStorage.removeItem('token');
          window.location.href = '/auth';
        }

        return Promise.reject(new Error(res.message || '请求失败'));
      }

      return res; // 返回完整响应结构（含 data, code, message 等）
    },
    (error) => {
      console.error('响应错误:', error);

      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            ElMessage.error(data?.message || '请求参数错误');
            break;
          case 401:
            ElMessage.error('登录已过期，请重新登录');
            localStorage.removeItem('token');
            window.location.href = '/auth';
            break;
          case 403:
            ElMessage.error('没有权限访问');
            break;
          case 404:
            ElMessage.error('请求资源不存在');
            break;
          case 500:
            ElMessage.error('服务器内部错误');
            break;
          default:
            ElMessage.error(data?.message || '网络错误');
        }
      } else if (error.code === 'ECONNABORTED') {
        // ✅ 修正：使用 error.code 而不是 error.httpStatus
        ElMessage.error('请求超时，请稍后重试');
      } else {
        ElMessage.error('网络连接失败，请检查网络');
      }

      return Promise.reject(error);
    }
);

export default request;
