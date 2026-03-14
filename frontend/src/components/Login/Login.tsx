import { Item, List, Text } from '@/components/Location/Location.styled';
import { UserIcon } from './Login.styled';
import { useAuthStore } from '@/store/auth/authStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClick?: () => void;
}

const Login = ({ onClick }: Props) => {
  const { user, profile, openAuthModal } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (user) {
      navigate('/account');
    } else {
      openAuthModal('login');
    }
    if (onClick) onClick();
  };

  return (
    <>
      <List onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
        <Item>
          <UserIcon />
        </Item>
        <Item>
          <Text>{user ? profile?.firstName || 'User' : 'Login'}</Text>
        </Item>
      </List>
    </>
  );
};

export default Login;
