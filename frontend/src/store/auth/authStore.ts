import { create } from 'zustand';
import {
  type User as FirebaseUser,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { registerUserApi } from '@/api/authApi';
import type { IRegisterData } from '@/types/auth';
import toast from 'react-hot-toast';

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
  sendVerification: () => Promise<void>;
  resendVerification: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

export const useAuthStore = create<AuthState>((set) => ({
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
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        console.log('Verification email sent to:', data.email);
      }

      await firebaseSignOut(auth);
      set({ user: null, isLoading: false, isAuthModalOpen: false });

      toast.success('Registration successful! Please check your email to verify account.', {
        duration: 8000
      });
    } catch (err: unknown) {

      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (email, pass) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await firebaseSignOut(auth);
        set({ user: null, isLoading: false });
        throw new Error('Please verify your email. Check your inbox or registration email.');
      }

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

  sendVerification: async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await user.reload();
        await sendEmailVerification(user);
        console.log('Verification email sent successfully');
      } catch (err: unknown) {
        const error = err as { code: string; message: string };
        console.error('FIREBASE_ERROR:', error.code, error.message);
        toast.error(`Verification error: ${error.message}`);
        throw err;
      }
    }
  },

  resendVerification: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(userCredential.user);
      await firebaseSignOut(auth);
      set({ user: null, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null }),

  openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
}));
