import { create } from 'zustand';
import {
  onAuthStateChanged,
  type User as FirebaseUser,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserProfile, registerUser, updateUserApi } from '@/api/authApi';
import type { UserProfile, IRegisterData } from '@/types/auth';

interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';
  setUser: (user: FirebaseUser | null) => void;
  fetchProfile: () => Promise<void>;
  register: (data: IRegisterData) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  openAuthModal: (view: 'login' | 'register') => void;
  closeAuthModal: () => void;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
}

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalView: 'login',

  setUser: (user) => {
    set({ user, isLoading: false });
    if (user) {
      get().fetchProfile();
    }
  },

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const res = await getUserProfile();
      set({ profile: res.data });
    } catch (err: unknown) {
      const error = err as ApiError;
      set({ error: error.message });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await registerUser(data);
      set({ isLoading: false, isAuthModalOpen: false });
    } catch (err: unknown) {
      const error = err as ApiError;
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      throw err;
    }
  },

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      set({ isLoading: false, isAuthModalOpen: false });
    } catch (err: unknown) {
      const error = err as ApiError;
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    await firebaseSignOut(auth);
    set({ user: null, profile: null });
  },

  clearError: () => set({ error: null }),

  openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  updateUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProfile = await updateUserApi(data);
      set({ profile: updatedProfile, isLoading: false });
    } catch (err: unknown) {
      const error = err as ApiError;
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      throw err;
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});
