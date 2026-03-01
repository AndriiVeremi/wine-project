import { Button } from '@/components/buttons/InfoButton/InfoButton.styled';

interface MainButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const InfoButton: React.FC<MainButtonProps> = ({
  children,

  type = 'button',
  onClick,
}) => {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default InfoButton;
