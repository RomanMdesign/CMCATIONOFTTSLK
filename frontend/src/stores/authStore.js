import { create } from 'zustand';
import { authApi } from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('aether_token'),
  loading: true,
  error: null,

  init: async () => {
    const token = localStorage.getItem('aether_token');
    if (!token) {
      set({ loading: false, user: null });
      return;
    }
    try {
      const { user } = await authApi.me();
      set({ user, token, loading: false });
    } catch {
      localStorage.removeItem('aether_token');
      localStorage.removeItem('aether_refresh');
      set({ user: null, token: null, loading: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const { user, accessToken, refreshToken } = await authApi.login({
        email,
        password,
      });
      localStorage.setItem('aether_token', accessToken);
      if (refreshToken) localStorage.setItem('aether_refresh', refreshToken);
      set({ user, token: accessToken, error: null });
      return true;
    } catch (err) {
      set({ error: err.message });
      return false;
    }
  },

  register: async (data) => {
    set({ error: null });
    try {
      const { user, accessToken, refreshToken } = await authApi.register(data);
      localStorage.setItem('aether_token', accessToken);
      if (refreshToken) localStorage.setItem('aether_refresh', refreshToken);
      set({ user, token: accessToken, error: null });
      return true;
    } catch (err) {
      set({ error: err.message });
      return false;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {}
    localStorage.removeItem('aether_token');
    localStorage.removeItem('aether_refresh');
    set({ user: null, token: null });
  },

  updateUser: (partial) => {
    set({ user: { ...get().user, ...partial } });
  },
}));
