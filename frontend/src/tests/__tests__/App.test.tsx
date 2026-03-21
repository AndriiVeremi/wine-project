import { vi } from 'vitest';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, callback) => {
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

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';

const queryClient = new QueryClient();

describe('App', () => {
  it.skip('renders headline', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Discover Georgian Wines/i })).toBeInTheDocument();
    });
  });
});
