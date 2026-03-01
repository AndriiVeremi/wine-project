import { Button } from '@/components/buttons/MainButton/MainButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  onClick,
}) => {
  return (
    <Button type={type} $size={size} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MainButton;
