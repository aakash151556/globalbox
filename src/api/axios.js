import axios from "axios"
import {getToken,setToken,clearToken} from '../utils/JwtToken';

const api = axios.create({
 // baseURL: "https://api.mdl25.com/api",
   baseURL: "https://demo.varcas.org/api",
  headers: {
    "Content-Type": "application/json"
  },
});

// REQUEST
api.interceptors.request.use((config) => {
  const token = getToken();

 // Skip JWT for wallet-login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {    
    if (error.response?.status === 401) {
      sessionStorage.removeItem("jwt");
      clearToken()
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
