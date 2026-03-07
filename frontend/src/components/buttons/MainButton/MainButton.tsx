import { Button } from './MainButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
}) => {
  return (
    <Button type={type} $size={size} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

export default MainButton;
