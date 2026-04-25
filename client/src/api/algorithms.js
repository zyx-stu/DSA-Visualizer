import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchAlgorithms = (category = '') =>
  axios.get(`${BASE}/api/algorithms${category ? `?category=${category}` : ''}`).then(r => r.data);

export const fetchAlgorithm = (id) =>
  axios.get(`${BASE}/api/algorithms/${id}`).then(r => r.data);

export const fetchCategories = () =>
  axios.get(`${BASE}/api/categories`).then(r => r.data);
