import React from 'react';
import { Button } from './MainButton.styled';
interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}
const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  fullWidth = false,
  className,
}) => {
  return (
    <Button
      type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      $fullWidth={fullWidth}
      className={className}
    >
      {children}
    </Button>
  );
};
export default MainButton;
