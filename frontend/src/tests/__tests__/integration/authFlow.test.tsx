import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';
import { useAuthStore } from '@/store/auth/authStore';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback(null);
    return vi.fn();
  }),
  onIdTokenChanged: vi.fn((_auth, callback) => {
    callback(null);
    return vi.fn();
  }),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/config/firebase', () => ({
  auth: {},
}));

vi.mock('react-loader-spinner', () => ({
  RevolvingDot: () => <div data-testid="loader" />,
}));

vi.mock('@/store/auth/authStore', () => ({
  useAuthStore: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthStore).mockReturnValue({
      user: null,
      isInitialized: true,
      isLoading: false,
      isAuthModalOpen: false,
      authModalView: 'login',
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
      register: vi.fn(),
      login: vi.fn(),
      clearError: vi.fn(),
      error: null,
    });
  });

  it('should show navigation with auth buttons when not logged in', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const loginButtons = screen.getAllByText(/login/i);
      expect(loginButtons.length).toBeGreaterThan(0);
    });
  });

  it('should have navigation links to main pages', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText(/wineries/i).length).toBeGreaterThan(0);
    });
  });

  it('should render app header', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    });
  });
});
