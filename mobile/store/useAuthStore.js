import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { authService } from '../services/authService';

const TOKEN_KEY = 'user_token';

const saveToken = async (token) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
};

const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

const deleteToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const token = data.token;
      await saveToken(token);

      const user = await authService.getMe(token);

      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Email ou mot de passe incorrect';
      return { success: false, error: errorMessage };
    }
  },

  register: async (fullName, email, password) => {
    try {
      const data = await authService.register(fullName, email, password);
      const token = data.token;
      await saveToken(token);

      const user = await authService.getMe(token);

      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erreur lors de l'inscription";
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      await deleteToken();
    } catch (error) {
      return;
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await getToken();
      if (!token) {
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        return;
      }

      const user = await authService.getMe(token);
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      await deleteToken();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
