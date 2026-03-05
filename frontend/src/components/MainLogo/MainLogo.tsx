import main_logo from '@/assets/main_logo.svg';
import { Logo } from './MainLogo.styled';

const MainLogo = () => {
  return (
    <>
      <Logo src={main_logo} alt="Main Logo" />
    </>
  );
};

export default MainLogo;
