/**
 * 文件上传API模块
 */
import request from '../request';

/**
 * 上传文件
 * @param {FormData} formData - 表单数据
 * @param {File} formData.file - 要上传的文件
 * @param {string} [formData.fileName] - 文件名
 * @returns {Promise}
 */
export function uploadFile(formData) {
  return request({
    url: '/shopping-server/file',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 删除文件
 * @param {string} fileName - 要删除的文件名
 * @returns {Promise}
 */
export function deleteFile(fileName) {
  return request({
    url: '/shopping-server/file',
    method: 'delete',
    params: { fileName }
  });
}

export default {
  uploadFile,
  deleteFile
};
