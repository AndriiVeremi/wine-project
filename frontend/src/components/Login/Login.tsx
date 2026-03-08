import { Item, List, Text } from '@/components/Location/Location.styled';
import { UserIcon } from './Login.styled';
import { useAuthStore } from '@/store/auth/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, openAuthModal } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (user) {
      navigate('/account');
    } else {
      openAuthModal('login');
    }
  };

  return (
    <>
      <List onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
        <Item>
          <UserIcon />
        </Item>
        <Item>
          <Text>{user ? user.firstName || 'User' : 'Login'}</Text>
        </Item>
      </List>
    </>
  );
};

export default Login;
