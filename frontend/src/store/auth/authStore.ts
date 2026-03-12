import { create } from 'zustand';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { registerUserApi } from '@/api/authApi';
import type { IRegisterData, UserProfile } from '@/types/auth';
import apiClient from '@/api/axios';

interface AppUser {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';
  setUser: (user: User | null) => Promise<void>;
  updateUser: (updatedData: Partial<AppUser>) => void;
  fetchProfile: () => Promise<void>;
  register: (registerData: IRegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  openAuthModal: (view: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: string }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred.';
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalView: 'login',

  setUser: async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const tokenResult = await firebaseUser.getIdTokenResult();
      const roleClaim = tokenResult.claims.role;
      const role = typeof roleClaim === 'string' ? roleClaim : 'USER';

      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          firstName: firebaseUser.displayName?.split(' ')[0] || null,
          lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || null,
          role: role,
        },
        isLoading: false,
        error: null,
        isAuthModalOpen: false,
      });

      // After setting firebase user, fetch real data from DB
      await get().fetchProfile();
    } else {
      set({ user: null, isLoading: false, error: null });
    }
  },

  updateUser: (updatedData: Partial<AppUser>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedData } : null,
    }));
  },

  fetchProfile: async () => {
    try {
      const { data } = await apiClient.get<UserProfile>('/users/me');
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              firstName: data.firstName,
              lastName: data.lastName,
              avatarUrl: data.avatarUrl,
              role: data.role,
            }
          : null,
      }));
    } catch (err) {
      console.error('Failed to fetch user profile from DB:', err);
    }
  },

  register: async (registerData: IRegisterData) => {
    set({ isLoading: true, error: null });

    try {
      await registerUserApi(registerData);
      return await get().login(registerData.email, registerData.password);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await get().setUser(userCredential.user);
      return true;
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);

      set({ error: errorMessage, isLoading: false });

      return false;
    }
  },

  logout: () => {
    auth.signOut();

    set({ user: null, error: null });
  },

  clearError: () => {
    set({ error: null });
  },

  openAuthModal: (view) => {
    set({ isAuthModalOpen: true, authModalView: view, error: null });
  },

  closeAuthModal: () => {
    set({ isAuthModalOpen: false });
  },
}));
