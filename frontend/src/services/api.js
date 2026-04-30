import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s — accounts for Render free tier cold start (30-60s wake up)
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — unwrap data, with retry on timeout
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error.config;

    // Retry once on timeout or network error (helps with Render cold starts)
    if (
      !config._retried &&
      (error.code === 'ECONNABORTED' || !error.response)
    ) {
      config._retried = true;
      config.timeout = 60000;
      return api(config);
    }

    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API methods
export const algorithmAPI = {
  getAll:        (params) => api.get('/algorithms', { params }),
  getBySlug:     (slug)   => api.get(`/algorithms/${slug}`),
  getStats:      ()       => api.get('/algorithms/stats'),
  getCategories: ()       => api.get('/algorithms/categories'),
  getPopular:    (limit)  => api.get('/algorithms/popular', { params: { limit } }),
  search:        (q)      => api.get('/algorithms/search', { params: { q } }),
  like:          (slug)   => api.post(`/algorithms/${slug}/like`, { increment: true }),
  // Wake the server up (call on app load to pre-warm Render)
  ping:          ()       => api.get('/health').catch(() => {}),
};

export default api;
