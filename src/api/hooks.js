/**
 * API Hooks - Vue组合式函数封装
 * 提供常用的API调用模式
 */
import { ref, computed } from 'vue';

/**
 * 分页查询Hook
 * @param {Function} apiFunc - API函数
 * @param {Object} defaultParams - 默认参数
 * @returns {Object} 分页相关状态和方法
 */
export function usePagination(apiFunc, defaultParams = {}) {
  const loading = ref(false);
  const data = ref([]);
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });
  const params = ref({ ...defaultParams });

  const hasMore = computed(() => {
    return pagination.value.pageNum < pagination.value.totalPages;
  });

  async function fetchData(extraParams = {}) {
    loading.value = true;
    try {
      const res = await apiFunc({
        ...params.value,
        ...extraParams
      });
      if (res.data) {
        data.value = res.data;
      }
      if (res.total !== undefined) {
        pagination.value.total = res.total;
      }
      if (res.totalPages !== undefined) {
        pagination.value.totalPages = res.totalPages;
      }
      if (res.pageNum !== undefined) {
        pagination.value.pageNum = res.pageNum;
      }
      if (res.pageSize !== undefined) {
        pagination.value.pageSize = res.pageSize;
      }
      return res;
    } finally {
      loading.value = false;
    }
  }

  async function loadMore() {
    if (!hasMore.value || loading.value) return;
    return fetchData({ pageNum: pagination.value.pageNum + 1 });
  }

  async function refresh() {
    pagination.value.pageNum = 1;
    data.value = [];
    return fetchData({ pageNum: 1 });
  }

  function setParams(newParams) {
    params.value = { ...params.value, ...newParams };
  }

  return {
    loading,
    data,
    pagination,
    params,
    hasMore,
    fetchData,
    loadMore,
    refresh,
    setParams
  };
}

/**
 * 列表查询Hook
 * @param {Function} apiFunc - API函数
 * @param {Object} defaultParams - 默认参数
 * @returns {Object} 列表相关状态和方法
 */
export function useList(apiFunc, defaultParams = {}) {
  const loading = ref(false);
  const data = ref([]);
  const params = ref({ ...defaultParams });

  async function fetchData(extraParams = {}) {
    loading.value = true;
    try {
      const res = await apiFunc({
        ...params.value,
        ...extraParams
      });
      data.value = res.data || res;
      return res;
    } finally {
      loading.value = false;
    }
  }

  async function refresh() {
    return fetchData();
  }

  function setParams(newParams) {
    params.value = { ...params.value, ...newParams };
  }

  return {
    loading,
    data,
    params,
    fetchData,
    refresh,
    setParams
  };
}

/**
 * 详情查询Hook
 * @param {Function} apiFunc - API函数
 * @returns {Object} 详情相关状态和方法
 */
export function useDetail(apiFunc) {
  const loading = ref(false);
  const data = ref(null);
  const error = ref(null);

  async function fetchDetail(id) {
    loading.value = true;
    error.value = null;
    try {
      const res = await apiFunc(id);
      data.value = res.data || res;
      return res;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clear() {
    data.value = null;
    error.value = null;
  }

  return {
    loading,
    data,
    error,
    fetchDetail,
    clear
  };
}

/**
 * 提交操作Hook
 * @param {Function} apiFunc - API函数
 * @returns {Object} 提交相关状态和方法
 */
export function useSubmit(apiFunc) {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  async function submit(data) {
    loading.value = true;
    success.value = false;
    error.value = null;
    try {
      const res = await apiFunc(data);
      success.value = true;
      return res;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    success.value = false;
    error.value = null;
  }

  return {
    loading,
    success,
    error,
    submit,
    reset
  };
}

/**
 * 删除操作Hook
 * @param {Function} apiFunc - API函数
 * @returns {Object} 删除相关状态和方法
 */
export function useDelete(apiFunc) {
  const loading = ref(false);
  const success = ref(false);

  async function remove(id) {
    loading.value = true;
    try {
      await apiFunc(id);
      success.value = true;
      return true;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    success.value = false;
  }

  return {
    loading,
    success,
    remove,
    reset
  };
}

export default {
  usePagination,
  useList,
  useDetail,
  useSubmit,
  useDelete
};
