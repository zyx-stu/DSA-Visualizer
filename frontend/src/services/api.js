import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — unwrap data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const algorithmAPI = {
  // GET /api/algorithms?category=&difficulty=&search=&page=&limit=&sort=
  getAll:       (params) => api.get('/algorithms', { params }),
  // GET /api/algorithms/:slug  (full detail w/ code)
  getBySlug:    (slug)   => api.get(`/algorithms/${slug}`),
  // GET /api/algorithms/stats
  getStats:     ()       => api.get('/algorithms/stats'),
  // GET /api/algorithms/categories
  getCategories:()       => api.get('/algorithms/categories'),
  // GET /api/algorithms/popular?limit=6
  getPopular:   (limit)  => api.get('/algorithms/popular', { params: { limit } }),
  // GET /api/algorithms/search?q=
  search:       (q)      => api.get('/algorithms/search', { params: { q } }),
  // POST /api/algorithms/:slug/like
  like:         (slug)   => api.post(`/algorithms/${slug}/like`, { increment: true }),
};

export default api;
