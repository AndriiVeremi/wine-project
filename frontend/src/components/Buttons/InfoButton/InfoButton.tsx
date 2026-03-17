import { Button } from '@/components/Buttons/InfoButton/InfoButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  active?: boolean; // Додаємо пропс для активного стану
}

const InfoButton: React.FC<MainButtonProps> = ({
  children,
  type = 'button',
  onClick,
  active = false,
}) => {
  return (
    <Button type={type} onClick={onClick} $active={active}>
      {children}
    </Button>
  );
};

export default InfoButton;
