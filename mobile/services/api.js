import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const manifestHost = Constants.expoConfig?.hostUri?.split(':')?.[0];
const host = manifestHost || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || `http://${host}:5000`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      let token = null;
      if (Platform.OS === 'web') {
        token = localStorage.getItem('user_token');
      } else {
        token = await SecureStore.getItemAsync('user_token');
      }
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
