import api from './api';

export const authService = {
  async register(fullName, email, password) {
    const response = await api.post('/api/auth/register', { fullName, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  async getMe(customToken) {
    const headers = customToken ? { Authorization: `Bearer ${customToken}` } : {};
    const response = await api.get('/api/auth/me', { headers });
    return response.data;
  },
};
