// src/services/api.js
import axios from 'axios';
import { getToken, removeToken } from './auth';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  getProfile: () => api.get('/users/profile')
};

// Journal API
export const journalAPI = {
  createEntry: (text) => api.post('/journals', { text }),
  getEntries: (page = 1, limit = 10) => api.get(`/journals?page=${page}&limit=${limit}`),
  updateEntry: (id, text) => api.put(`/journals/${id}`, { text }),
  deleteEntry: (id) => api.delete(`/journals/${id}`),
  getEmotionTrends: (days = 30) => api.get(`/journals/trends/emotions?days=${days}`)
};

export default api;