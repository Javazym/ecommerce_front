/**
 * 认证状态管理Hook
 * 提供登录、登出、Token管理等状态
 */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import admin from './modules/admin';
import user from './modules/user';
import { clearAllUserData } from '../stores/clearData.js';

const token = ref(localStorage.getItem('token') || '');
const userInfo = ref(null);
const loading = ref(false);

export function useAuth() {
  const router = useRouter();

  const isLoggedIn = computed(() => !!token.value);

  async function login(credentials) {
    loading.value = true;
    try {
      const res = await admin.adminLogin(credentials);
      if (res.data && res.data.token) {
        token.value = res.data.token;
        localStorage.setItem('token', res.data.token);
        await fetchUserInfo();
        return res;
      }
      throw new Error('登录失败');
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserInfo() {
    if (!token.value) return;
    try {
      const res = await user.getCurrentUser();
      userInfo.value = res.data;
      return res;
    } catch (err) {
      logout();
      throw err;
    }
  }

  function logout() {
    // 清除所有用户数据
    clearAllUserData()
    
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  }

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  return {
    token,
    userInfo,
    loading,
    isLoggedIn,
    login,
    logout,
    fetchUserInfo,
    setToken
  };
}

export default useAuth;
