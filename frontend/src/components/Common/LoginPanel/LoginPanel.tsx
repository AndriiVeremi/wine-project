import { LoginWrapper, UserIcon, LoginText } from './LoginPanel.styled';
import { useAuthStore } from '@/store/auth/authStore';
import { useProfile } from '@/hooks/queries/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClick?: () => void;
}

const Login = ({ onClick }: Props) => {
  const { user, openAuthModal } = useAuthStore();
  const { data: profile } = useProfile();
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
    <LoginWrapper onClick={handleLoginClick} aria-label={user ? 'Go to account' : 'Login'}>
      <UserIcon />
      <LoginText>{user ? profile?.firstName || 'User' : 'Login'}</LoginText>
    </LoginWrapper>
  );
};

export default Login;
