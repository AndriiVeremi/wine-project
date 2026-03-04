import styled, { css } from 'styled-components';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  $size?: ButtonSize;
}

const sizes = {
  small: css`
    width: 208px;
  `,
  medium: css`
    width: 341px;
  `,
  large: css`
    width: 450px;
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 200px;
  background: var(--white);
  color: var(--primary-wine);

  font-size: 19px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.08px;
  border: 1px solid var(--primary-wine);
  outline: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover:not(:disabled) {
    background: var(--primary-wine);
    color: var(--white);
  }

  ${({ $size = 'medium' }) => sizes[$size]}
`;
