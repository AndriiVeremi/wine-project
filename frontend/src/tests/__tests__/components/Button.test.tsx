import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainButton from '@/components/Buttons/MainButton/MainButton';

describe('MainButton', () => {
  it('should render children', () => {
    render(<MainButton>Click me</MainButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<MainButton onClick={handleClick}>Click me</MainButton>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <MainButton onClick={handleClick} disabled>
        Click me
      </MainButton>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have disabled attribute when disabled prop is true', () => {
    render(<MainButton disabled>Disabled Button</MainButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not have disabled attribute when disabled prop is false', () => {
    render(<MainButton disabled={false}>Enabled Button</MainButton>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should render with different types', () => {
    const { rerender } = render(<MainButton type="button">Button</MainButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<MainButton type="submit">Submit</MainButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<MainButton type="reset">Reset</MainButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<MainButton size="small">Small</MainButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<MainButton size="medium">Medium</MainButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<MainButton size="large">Large</MainButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle multiple clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<MainButton onClick={handleClick}>Click me</MainButton>);

    await user.dblClick(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
