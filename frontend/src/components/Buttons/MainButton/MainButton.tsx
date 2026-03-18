import React from 'react';
import { Button } from './MainButton.styled';
interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  centered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  fullWidth = false,
  centered = false,
  className,
  style,
}) => {
  return (
    <Button
      type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      $fullWidth={fullWidth}
      $centered={centered}
      className={className}
      style={style}
    >
      {children}
    </Button>
  );
};
export default MainButton;
