import axios from "axios";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return instance;
}



export { apiInstance };
