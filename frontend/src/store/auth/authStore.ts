import { create } from 'zustand';
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserProfile, registerUser, loginUser } from '@/api/authApi';
import type { UserProfile, IRegisterData } from '@/types/auth';

interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: FirebaseUser | null) => void;
  fetchProfile: () => Promise<void>;
  register: (data: IRegisterData) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
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

  setUser: (user) => {
    set({ user, isLoading: false });
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
      set({ isLoading: false });
    } catch (err: unknown) {
      const error = err as ApiError;
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      throw err;
    }
  },

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      await loginUser(email, pass);
      set({ isLoading: false });
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
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});
