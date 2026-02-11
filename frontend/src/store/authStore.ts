import { create } from 'zustand';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { registerUserApi } from '@/api/authApi';
import type { IRegisterData } from '@/types/auth';

interface AppUser {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';
  setUser: (user: User | null) => Promise<void>;
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,
  authModalView: 'login',

  setUser: async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const tokenResult = await firebaseUser.getIdTokenResult();
      console.log('Firebase ID Token:', tokenResult.token);
      const roleClaim = tokenResult.claims.role;
      const role = typeof roleClaim === 'string' ? roleClaim : 'USER';
      let firstName: string | null = null;
      let lastName: string | null = null;

      if (firebaseUser.displayName) {
        const displayNameParts = firebaseUser.displayName.split(' ');
        firstName = displayNameParts[0];
        lastName = displayNameParts.slice(1).join(' ');
      }

      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          firstName: firstName,
          lastName: lastName,
          role: role,
        },
        isLoading: false,
        error: null,
        isAuthModalOpen: false,
      });
    } else {
      set({ user: null, isLoading: false, error: null });
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
