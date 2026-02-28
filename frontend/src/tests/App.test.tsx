import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    isLoading: false,
    openAuthModal: vi.fn(),
    logout: vi.fn(),
    setUser: vi.fn(),
  })),
}));

describe('App', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
