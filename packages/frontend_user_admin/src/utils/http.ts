// src/utils/http.ts

const BASE_URL = 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
  data?: any; // 针对 JSON 请求的 payload
}

export const http = async <T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});

  // 自动携带 Token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body = options.body;

  // 如果传入了 data，自动转为 JSON 并设置头
  if (options.data) {
    body = JSON.stringify(options.data);
    headers.set('Content-Type', 'application/json');
  }
  // 注意：如果是上传图片传了 FormData (在 options.body 中)，浏览器会自动设置正确的 multipart/form-data 和 boundary，我们不要手动干扰

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body,
  });

  // 解析响应
  let responseData;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.blob(); // 应对获取头像流的情况
  }

  // 统一错误处理
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Token 过期直接踢回登录页
    }
    const errorMsg = responseData?.message || responseData?.error || response.statusText;
    throw new Error(errorMsg);
  }

  return responseData as T;
};