import { create } from 'zustand';
import {
  type User as FirebaseUser,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { registerUserApi } from '@/api/authApi';
import type { IRegisterData } from '@/types/auth';

interface AuthState {
  user: FirebaseUser | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';

  setUser: (user: FirebaseUser | null) => void;
  register: (data: IRegisterData) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  openAuthModal: (view: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) {
    const err = error as { message?: string; response?: { data?: { message?: string } } };
    return err.response?.data?.message || err.message || 'An unknown error occurred';
  }
  return String(error);
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isInitialized: false,
  isLoading: false,
  error: null,
  isAuthModalOpen: false,
  authModalView: 'login',

  setUser: (user) => {
    set({ user, isInitialized: true });
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await registerUserApi(data);
      await get().login(data.email, data.password);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      set({ isAuthModalOpen: false, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await firebaseSignOut(auth);
      set({ user: null, isLoading: false });
    } catch (err) {
      console.error('Logout error:', err);
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
}));
