import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '@/components/Forms/AuthForm/RegisterForm/RegisterForm';
import { useAuthStore } from '@/store/auth/authStore';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/store/auth/authStore', () => ({
  useAuthStore: vi.fn(),
}));

const renderForm = () => {
  return render(
    <BrowserRouter>
      <RegisterForm />
    </BrowserRouter>,
  );
};

describe.skip('RegisterForm', () => {
  const mockRegister = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthStore).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: null,
      clearError: mockClearError,
      user: null,
      isInitialized: true,
      isAuthModalOpen: false,
      authModalView: 'login',
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
      login: vi.fn(),
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('should render registration form', () => {
    renderForm();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should call register with valid data', async () => {
    mockRegister.mockResolvedValueOnce(undefined);
    renderForm();

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/i am a:/i), { target: { value: 'USER' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });
  });

  it('should toggle password visibility', () => {
    renderForm();
    const passwordInputs = screen.getAllByLabelText(/password/i);
    const toggleButtons = screen
      .getAllByRole('button')
      .filter((b) => b.getAttribute('type') !== 'submit');

    expect(passwordInputs[0].getAttribute('type')).toBe('password');

    fireEvent.click(toggleButtons[0]);
    expect(passwordInputs[0].getAttribute('type')).toBe('text');
  });

  it('should show loading state', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      register: mockRegister,
      isLoading: true,
      error: null,
      clearError: mockClearError,
      user: null,
      isInitialized: true,
      isAuthModalOpen: false,
      authModalView: 'login',
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
      login: vi.fn(),
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    renderForm();
    expect(screen.getByText(/registering\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registering\.\.\./i })).toBeDisabled();
  });

  it('should display server error', () => {
    const serverError = 'Email already exists';
    vi.mocked(useAuthStore).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: serverError,
      clearError: mockClearError,
      user: null,
      isInitialized: true,
      isAuthModalOpen: false,
      authModalView: 'login',
      openAuthModal: vi.fn(),
      closeAuthModal: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
      login: vi.fn(),
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    renderForm();
    expect(screen.getByText(serverError)).toBeInTheDocument();
  });
});
