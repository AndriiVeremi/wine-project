import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoginForm from '@/components/Forms/AuthForm/LoginForm/LoginForm';
import { useAuthStore } from '@/store/auth/authStore';
import type { Mock } from 'vitest';

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('@/store/auth/authStore', () => ({
  useAuthStore: vi.fn(),
}));

const queryClient = new QueryClient();

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('LoginForm', () => {
  const mockLogin = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as unknown as Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
  });

  it('should render login form', () => {
    renderWithRouter(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation error for short password', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123');
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Password is too short');
  });

  it('should not call login with short password', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123');
    await user.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should call login with valid credentials', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({});

    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should show loading state', () => {
    (useAuthStore as unknown as Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
      clearError: mockClearError,
    });

    renderWithRouter(<LoginForm />);

    expect(screen.getByRole('button', { name: /wait\.\.\./i })).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    expect(passwordInput.type).toBe('password');

    const toggleButton = screen.getByRole('button', { name: '' });
    await user.click(toggleButton);

    expect(passwordInput.type).toBe('text');
  });
});
