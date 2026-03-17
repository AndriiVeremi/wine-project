import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/store/auth/authStore';
import type { User as FirebaseUser } from 'firebase/auth';
import { mockGetUserProfile, mockRegisterUser } from '../__mocks__/authApi';

vi.mock('@/api/authApi', () => ({
  getUserProfile: (...args: unknown[]) => mockGetUserProfile(...args),
  registerUser: (...args: unknown[]) => mockRegisterUser(...args),
  updateUserApi: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: null) => void) => {
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
        data: { name: 'Test User' },
      });

      const { setUser } = useAuthStore.getState();
      const mockUser = { uid: 'user-1' } as unknown as FirebaseUser;

      await setUser(mockUser);

      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(mockGetUserProfile).toHaveBeenCalled();
      expect(useAuthStore.getState().profile).toEqual({ name: 'Test User' });
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
        data: { name: 'John' },
      });
      await useAuthStore.getState().fetchProfile();
      expect(useAuthStore.getState().profile).toEqual({ name: 'John' });

      mockGetUserProfile.mockRejectedValue(new Error('Network error'));
      await useAuthStore.getState().fetchProfile();
      expect(useAuthStore.getState().error).toBe('Network error');
    });
  });

  describe('register', () => {
    it('should register user and close modal on success', async () => {
      mockRegisterUser.mockResolvedValue({});

      const { register } = useAuthStore.getState();
      await register({ email: 'test@test.com', password: 'password123', name: 'Test' });

      expect(mockRegisterUser).toHaveBeenCalled();
      expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
    });

    it('should set error on failure', async () => {
      mockRegisterUser.mockRejectedValue({
        response: { data: { message: 'Email already exists' } },
      });

      const { register } = useAuthStore.getState();

      await expect(
        register({ email: 'test@test.com', password: 'password123', name: 'Test' }),
      ).rejects.toBeDefined();
      expect(useAuthStore.getState().error).toBe('Email already exists');
    });
  });

  describe('logout', () => {
    it('should clear user and profile', async () => {
      const { signOut } = await import('firebase/auth');

      useAuthStore.getState().setUser({ uid: 'user-1' } as unknown as FirebaseUser);

      await useAuthStore.getState().logout();

      expect(signOut).toHaveBeenCalled();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().profile).toBeNull();
    });
  });

  describe('Modal controls', () => {
    it('should open modal with view', () => {
      const { openAuthModal } = useAuthStore.getState();

      openAuthModal('login');
      expect(useAuthStore.getState().isAuthModalOpen).toBe(true);
      expect(useAuthStore.getState().authModalView).toBe('login');

      openAuthModal('register');
      expect(useAuthStore.getState().authModalView).toBe('register');
    });

    it('should close modal', () => {
      const { openAuthModal, closeAuthModal } = useAuthStore.getState();

      openAuthModal('login');
      closeAuthModal();

      expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error', () => {
      useAuthStore.getState().setUser = vi.fn((user: FirebaseUser) => {
        useAuthStore.setState({ user, error: 'Some error' });
      });

      useAuthStore.getState().setUser({ uid: 'user-1' } as unknown as FirebaseUser);
      useAuthStore.getState().clearError();

      expect(useAuthStore.getState().error).toBeNull();
    });
  });
});
