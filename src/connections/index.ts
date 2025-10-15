import axios from "axios";
import { url } from "@/connections/mainApi";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("rt__event-jp");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Usar 'Authorization' con el formato 'Bearer <token>'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si hay un error 401 (no autorizado), intentamos hacer un refresh del token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("rt__event-jp");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${url}/auth/refreshToken`, { token: refreshToken });
          
          // Guardamos el nuevo token
          localStorage.setItem("rt__event-jp", data.token);
          originalRequest.headers['Authorization'] = `Bearer ${data.token}`; // Usar el nuevo token en el header

          return api(originalRequest); // Reintentar la solicitud original con el nuevo token
        } catch (refreshError) {
          localStorage.removeItem("rt__event-jp");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
