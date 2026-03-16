import { Button } from './MainButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  style,
  fullWidth = false,
}) => {
  return (
    <Button
      type={type}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      style={style}
      $fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default MainButton;
