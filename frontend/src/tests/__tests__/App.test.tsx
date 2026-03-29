import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';

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

vi.mock('@/store/auth/authStore', () => ({
  useAuthStore: () => ({
    user: null,
    isInitialized: true,
    isLoading: false,
    isAuthModalOpen: false,
    authModalView: 'login',
    openAuthModal: vi.fn(),
    closeAuthModal: vi.fn(),
    logout: vi.fn(),
    setUser: vi.fn(),
  }),
}));

vi.mock('react-loader-spinner', () => ({
  RevolvingDot: () => <div data-testid="loader" />,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App', () => {
  it('renders app component with navigation', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const elements = screen.getAllByText(/Wineries/i);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
