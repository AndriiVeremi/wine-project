import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/Common/SearchBar/SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input element', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call onChange when typing', async () => {
    const user = userEvent.setup();
    render(<SearchBar {...defaultProps} />);

    await user.type(screen.getByRole('searchbox'), 'Cabernet');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should display the value', () => {
    render(<SearchBar {...defaultProps} value="Merlot" />);
    expect(screen.getByRole('searchbox')).toHaveValue('Merlot');
  });

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
  });
});
