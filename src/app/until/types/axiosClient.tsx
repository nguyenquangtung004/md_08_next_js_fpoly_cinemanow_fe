import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {jwtDecode} from 'jwt-decode';
import { appConfig } from '@/app/until/config/app_config';
import { JWTPayload } from '@/app/until/types/jwtLoad';

import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL:appConfig.apiBaseUrl,
    timeout: 10000,
    withCredentials: true
});

function parseJwt(token:string):JWTPayload | null {
    console.log('[AXIOS CLIENT]: Bắt đầu giải mã JWT.');
    try {
        return jwtDecode<JWTPayload>(token);
    } catch (err) {
        console.error("[AXIOS CLIENT]: Giải mã JWT thất bại", err);
        return null;
    }
}

function getCookie(name: string): string | null {
  console.log(`[AXIOS CLIENT]: Bắt đầu lấy cookie với tên: ${name}.`);
  if (typeof window === 'undefined') {
    console.log('[AXIOS CLIENT]: Không thể lấy cookie, window không tồn tại (môi trường server).');
    return null;
  }
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || null;
    console.log(`[AXIOS CLIENT]: Lấy cookie '${name}' thành công.`);
    return cookieValue;
  }
  console.log(`[AXIOS CLIENT]: Không tìm thấy cookie với tên: ${name}.`);
  return null;
}

function deleteCookie(name: string): void {
  console.log(`[AXIOS CLIENT]: Bắt đầu xóa cookie với tên: ${name}.`);
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;`;
    console.log(`[AXIOS CLIENT]: Đã gửi yêu cầu xóa cookie '${name}'.`);
  } else {
    console.log('[AXIOS CLIENT]: Không thể xóa cookie, window không tồn tại (môi trường server).');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveUserInfo(userInfo: any): void {
  console.log('[AXIOS CLIENT]: Bắt đầu lưu thông tin người dùng vào localStorage.');
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
    console.log('[AXIOS CLIENT]: Lưu thông tin người dùng vào localStorage thành công.');
  } else {
    console.log('[AXIOS CLIENT]: Không thể lưu thông tin người dùng, window không tồn tại (môi trường server).');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUserInfo(): any | null {
  console.log('[AXIOS CLIENT]: Bắt đầu lấy thông tin người dùng từ localStorage.');
  if (typeof window === 'undefined') {
    console.log('[AXIOS CLIENT]: Không thể lấy thông tin người dùng, window không tồn tại (môi trường server).');
    return null;
  }
  
  try {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
        console.log('[AXIOS CLIENT]: Lấy thông tin người dùng từ localStorage thành công.');
        return JSON.parse(userInfo);
    } else {
        console.log('[AXIOS CLIENT]: Không tìm thấy thông tin người dùng trong localStorage.');
        return null;
    }
  } catch (err) {
    console.error('[AXIOS CLIENT]: Lỗi phân tích thông tin người dùng từ localStorage:', err);
    return null;
  }
}

function clearUserInfo(): void {
  console.log('[AXIOS CLIENT]: Bắt đầu xóa thông tin người dùng khỏi localStorage.');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_info');
    console.log('[AXIOS CLIENT]: Xóa thông tin người dùng khỏi localStorage thành công.');
  } else {
    console.log('[AXIOS CLIENT]: Không thể xóa thông tin người dùng, window không tồn tại (môi trường server).');
  }
}

async function getAccessTokenFromServer(): Promise<string | null> {
  console.log('[AXIOS CLIENT]: Bắt đầu lấy access token từ server.');
  try {
    const response = await axios.get('/api/auth/token', { withCredentials: true });
    const token = response.data?.token || null;
    if (token) {
        console.log('[AXIOS CLIENT]: Lấy access token từ server thành công.');
    } else {
        console.log('[AXIOS CLIENT]: Server không trả về token.');
    }
    return token;
  } catch (error) {
    console.error('[AXIOS CLIENT]: Lấy access token từ server thất bại:', error);
    return null;
  }
}

async function logout(): Promise<void> {
  console.log('[AXIOS CLIENT]: Bắt đầu quá trình đăng xuất người dùng.');
  try {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    console.log('[AXIOS CLIENT]: Gọi API đăng xuất thành công.');
    clearUserInfo(); // Sẽ có log riêng từ hàm clearUserInfo
  } catch (error) {
    console.error('[AXIOS CLIENT]: Quá trình đăng xuất thất bại:', error);
    console.log('[AXIOS CLIENT]: Thử xóa thông tin người dùng cục bộ do đăng xuất API thất bại.');
    clearUserInfo(); // Sẽ có log riêng từ hàm clearUserInfo
  }
}

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('[AXIOS CLIENT]: [INTERCEPTOR YÊU CẦU] ->', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error("[AXIOS CLIENT]: Lỗi trong interceptor yêu cầu", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('[AXIOS CLIENT]: [INTERCEPTOR PHẢN HỒI]', response.status, response.config.url);

    if (
      response.config.url?.includes('/login') ||
      response.config.url?.includes('/signin')
    ) {
        console.log('[AXIOS CLIENT]: Xử lý phản hồi đăng nhập/đăng ký.');
        const userData = response.data?.user;
      if (userData) {
       const userInfo = {
          id: userData.id || userData.userId,
          name: userData.name || userData.user_name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar || userData.url_image,
        };
        saveUserInfo(userInfo); // Sẽ có log riêng từ hàm saveUserInfo
        console.log('[AXIOS CLIENT]: Thông tin người dùng đã được cập nhật sau đăng nhập/đăng ký.');
      } else {
        console.log('[AXIOS CLIENT]: Phản hồi đăng nhập/đăng ký không chứa dữ liệu người dùng.');
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    console.error(`[AXIOS CLIENT]: [INTERCEPTOR PHẢN HỒI LỖI] Trạng thái: ${status}, URL: ${originalRequest.url}, Lỗi: ${error.message}`);

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.warn('[AXIOS CLIENT]: [TOKEN HẾT HẠN] -> Đang thử làm mới token...');

      try {
        const refreshResponse = await axios.post('/api/auth/refresh', {}, { 
          withCredentials: true 
        });
        console.log('[AXIOS CLIENT]: Gọi API làm mới token thành công.');

        if (refreshResponse.data?.user) {
          console.log('[AXIOS CLIENT]: Cập nhật thông tin người dùng từ phản hồi làm mới token.');
          const userInfo = {
            id: refreshResponse.data.user.id,
            name: refreshResponse.data.user.name,
            email: refreshResponse.data.user.email,
            role: refreshResponse.data.user.role,
            avatar: refreshResponse.data.user.avatar,
          };
          saveUserInfo(userInfo); // Sẽ có log riêng từ hàm saveUserInfo
        }
        console.log('[AXIOS CLIENT]: Thử lại yêu cầu ban đầu sau khi làm mới token.');
        return api(originalRequest);
      } catch (refreshErr) {
        console.error('[AXIOS CLIENT]: [LÀM MỚI TOKEN THẤT BẠI]', refreshErr);
        clearUserInfo(); // Sẽ có log riêng từ hàm clearUserInfo
        
        if (typeof window !== 'undefined') {
          console.log('[AXIOS CLIENT]: Chuyển hướng đến trang đăng nhập do làm mới token thất bại.');
          window.location.href = '/login';
        } else {
          console.log('[AXIOS CLIENT]: Không thể chuyển hướng, window không tồn tại (môi trường server).');
        }
      }
    }
    return Promise.reject(error);
  }
);
export {
  getUserInfo,
  saveUserInfo,
  clearUserInfo,
  logout,
  getAccessTokenFromServer,
  parseJwt, // Export nếu cần dùng bên ngoài
  getCookie, // Export nếu cần dùng bên ngoài
  deleteCookie, // Export nếu cần dùng bên ngoài
};

export default api;