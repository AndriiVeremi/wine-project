import { Link } from 'react-router-dom';
import main_logo from '@/assets/main_logo.svg';
import { Logo } from './MainLogo.styled';

const MainLogo = () => {
  return (
    <Link to="/">
      <Logo src={main_logo} alt="Main Logo" width="160" height="60" />
    </Link>
  );
};

export default MainLogo;
