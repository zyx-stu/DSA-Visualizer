import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const algorithmAPI = {
  getAll: (params) => api.get('/algorithms', { params }),
  getBySlug: (slug) => api.get(`/algorithms/slug/${slug}`),
  getById: (id) => api.get(`/algorithms/${id}`),
  getStats: () => api.get('/algorithms/stats'),
  getCategories: () => api.get('/algorithms/categories'),
  getPopular: (limit) => api.get('/algorithms/popular', { params: { limit } }),
  like: (id) => api.post(`/algorithms/${id}/like`),
  create: (data) => api.post('/algorithms', data),
  update: (id, data) => api.put(`/algorithms/${id}`, data),
  delete: (id) => api.delete(`/algorithms/${id}`),
};

export default api;
