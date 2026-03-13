import { Button } from './MainButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  style,
}) => {
  return (
    <Button type={type} $size={size} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </Button>
  );
};

export default MainButton;
