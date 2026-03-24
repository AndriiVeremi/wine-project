import { create } from 'zustand';
import {
  type User as FirebaseUser,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserProfile, registerUserApi, updateUserApi } from '@/api/authApi';
import type { UserProfile, IRegisterData } from '@/types/auth';

interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';
  setUser: (user: FirebaseUser | null) => Promise<void>;
  fetchProfile: () => Promise<void>;
  register: (data: IRegisterData) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  openAuthModal: (view: 'login' | 'register') => void;
  closeAuthModal: () => void;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
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
  profile: null,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalView: 'login',

  setUser: async (user) => {
    set({ user, isLoading: !!user }); // Keep loading if we have a user and need to fetch profile
    if (user) {
      await get().fetchProfile();
    } else {
      set({ profile: null, isLoading: false });
    }
  },

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const res = await getUserProfile();
      set({ profile: res.data, isLoading: false, error: null });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      console.error('Failed to fetch user profile:', errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await registerUserApi(data);
      // Automatically log in after successful registration
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
      // onAuthStateChanged in App.tsx will call setUser
      set({ isAuthModalOpen: false });
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
      set({ user: null, profile: null, isLoading: false });
    } catch (err) {
      console.error('Logout error:', err);
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),

  updateUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProfile = await updateUserApi(data);
      set({ profile: updatedProfile, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
