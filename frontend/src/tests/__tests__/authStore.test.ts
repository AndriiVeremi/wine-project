import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/store/auth/authStore';
import type { User as FirebaseUser } from 'firebase/auth';
import { mockGetUserProfile, mockRegisterUser } from '../__mocks__/authApi';

vi.mock('@/api/authApi', () => ({
  getUserProfile: (...args: unknown[]) => mockGetUserProfile(...args),
  registerUserApi: (...args: unknown[]) => mockRegisterUser(...args),
  updateUserApi: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: FirebaseUser | null) => void) => {
    callback(null);
    return vi.fn();
  }),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: {} })),
}));

vi.mock('@/config/firebase', () => ({
  auth: {},
}));

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    vi.clearAllMocks();
    mockGetUserProfile.mockReset();
    mockRegisterUser.mockReset();
  });

  describe('Initial state', () => {
    it('should have correct initial values', () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.profile).toBeNull();
      expect(state.isAuthModalOpen).toBe(false);
      expect(state.authModalView).toBe('login');
    });
  });

  describe('setUser', () => {
    it('should set user and fetch profile', async () => {
      mockGetUserProfile.mockResolvedValue({
        data: { firstName: 'Test', lastName: 'User' },
      });

      const { setUser } = useAuthStore.getState();
      const mockUser = { uid: 'user-1' } as unknown as FirebaseUser;

      await setUser(mockUser);

      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(mockGetUserProfile).toHaveBeenCalled();
      expect(useAuthStore.getState().profile).toEqual({ firstName: 'Test', lastName: 'User' });
    });
  });

  describe('fetchProfile', () => {
    it('should not fetch if no user', async () => {
      const { fetchProfile } = useAuthStore.getState();
      await fetchProfile();
      expect(mockGetUserProfile).not.toHaveBeenCalled();
    });

    it('should fetch profile and handle errors', async () => {
      useAuthStore.getState().setUser({ uid: 'user-1' } as unknown as FirebaseUser);

      mockGetUserProfile.mockResolvedValue({
        data: { firstName: 'John', lastName: 'Doe' },
      });
      await useAuthStore.getState().fetchProfile();
      expect(useAuthStore.getState().profile).toEqual({ firstName: 'John', lastName: 'Doe' });

      mockGetUserProfile.mockRejectedValue(new Error('Network error'));
      await useAuthStore.getState().fetchProfile();
      expect(useAuthStore.getState().error).toBe('Network error');
    });
  });

  describe('register', () => {
    it('should register user and close modal on success', async () => {
      mockRegisterUser.mockResolvedValue({});

      const { register } = useAuthStore.getState();
      await register({
        email: 'test@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
      });

      expect(mockRegisterUser).toHaveBeenCalled();
      expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
    });

    it('should set error on failure', async () => {
      const error = new Error('Email already exists') as Error & {
        response: { data: { message: string } };
      };
      error.response = { data: { message: 'Email already exists' } };
      mockRegisterUser.mockRejectedValue(error);

      const { register } = useAuthStore.getState();

      try {
        await register({
          email: 'test@test.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          role: 'USER',
        });
      } catch {
        // Expected to throw
      }

      expect(useAuthStore.getState().error).toBe('Email already exists');
    });
  });

  describe('Modal actions', () => {
    it('should open modal with specific view', () => {
      const { openAuthModal } = useAuthStore.getState();
      openAuthModal('register');
      expect(useAuthStore.getState().isAuthModalOpen).toBe(true);
      expect(useAuthStore.getState().authModalView).toBe('register');
    });

    it('should close modal', () => {
      const { openAuthModal, closeAuthModal } = useAuthStore.getState();
      openAuthModal('login');
      closeAuthModal();
      expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
    });
  });
});
