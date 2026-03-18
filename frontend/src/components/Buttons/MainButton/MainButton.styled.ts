import styled, { css } from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $centered?: boolean;
}

const sizeStyles = {
  small: css`
    min-width: 160px;
    padding: 12px 24px;
    font-size: 16px;
  `,
  medium: css`
    min-width: 200px;
    max-width: 341px;
    padding: 16px 40px;
    font-size: 18px;
  `,
  large: css`
    min-width: 280px;
    max-width: 450px;
    padding: 18px 48px;
    font-size: 20px;
  `,
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-radius: 200px;
  background: var(--white);
  color: var(--primary-wine);
  font-family: var(--font-main), sans-serif;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.08px;
  border: 1px solid var(--primary-wine);
  outline: none;
  cursor: pointer;
  transition: var(--transition);
  ${({ $size = 'medium' }) => sizeStyles[$size]}
  @media (min-width: ${breakpoints.tablet}) {
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
    margin: ${({ $centered }) => ($centered ? '0 auto' : '0')};
  }
  &:hover:not(:disabled) {
    background: var(--primary-wine);
    color: var(--white);
    box-shadow: 0 4px 12px rgba(132, 16, 19, 0.2);
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--tertiary-gray);
    color: var(--secondary-gray);
    background: #f9f9f9;
  }
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      max-width: none;
    `}
`;
