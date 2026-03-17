import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';

const queryClient = new QueryClient();

vi.mock('react-loader-spinner', () => ({
  RevolvingDot: () => <div data-testid="loader" />,
}));

vi.mock('@/store/auth/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    isLoading: false,
    isAuthModalOpen: false,
    authModalView: 'login',
    openAuthModal: vi.fn(),
    closeAuthModal: vi.fn(),
    logout: vi.fn(),
    setUser: vi.fn(),
  })),
}));

describe('App', () => {
  it('renders headline', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByRole('heading', { name: /Discover Georgian Wines/i })).toBeInTheDocument();
  });
});
