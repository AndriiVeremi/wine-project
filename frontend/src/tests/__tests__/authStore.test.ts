import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/auth/authStore';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { registerUserApi } from '@/api/authApi';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  onIdTokenChanged: vi.fn(),
}));

vi.mock('@/config/firebase', () => ({
  auth: { currentUser: null },
}));

vi.mock('@/api/authApi', () => ({
  getUserProfile: vi.fn(),
  registerUserApi: vi.fn(),
  updateUserApi: vi.fn(),
}));

describe('authStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      isInitialized: false,
      isLoading: false,
      error: null,
      isAuthModalOpen: false,
      authModalView: 'login',
    });
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isInitialized).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('should set user and initialized state', () => {
    const mockUser = { uid: '123', email: 'test@test.com' };
    useAuthStore.getState().setUser(mockUser as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isInitialized).toBe(true);
  });

  it('should call login successfully', async () => {
    const email = 'test@test.com';
    const pass = 'password';
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({ user: { uid: '123' } } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    await useAuthStore.getState().login(email, pass);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass);
    expect(useAuthStore.getState().isLoading).toBe(false);
    expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
  });

  it('should handle login error', async () => {
    const error = new Error('Invalid credentials');
    vi.mocked(signInWithEmailAndPassword).mockRejectedValue(error);

    try {
      await useAuthStore.getState().login('test@test.com', 'pass');
    } catch {
      // ignore
    }

    const state = useAuthStore.getState();
    expect(state.error).toBe(error.message);
    expect(state.isLoading).toBe(false);
  });

  it('should call register successfully', async () => {
    const registerData = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER' as const,
    };

    vi.mocked(registerUserApi).mockResolvedValue({ data: {} } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({ user: {} } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    await useAuthStore.getState().register(registerData);

    expect(registerUserApi).toHaveBeenCalledWith(registerData);
  });

  it('should call logout successfully', async () => {
    await useAuthStore.getState().logout();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('should toggle auth modal', () => {
    const { openAuthModal, closeAuthModal } = useAuthStore.getState();

    openAuthModal('register');
    expect(useAuthStore.getState().isAuthModalOpen).toBe(true);
    expect(useAuthStore.getState().authModalView).toBe('register');

    closeAuthModal();
    expect(useAuthStore.getState().isAuthModalOpen).toBe(false);
  });
});
