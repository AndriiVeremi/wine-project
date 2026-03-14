import { useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiHome, FiMap } from 'react-icons/fi';
import { FaWineBottle, FaLeaf } from 'react-icons/fa';
import {
  MobileMenuOverlay,
  Backdrop,
  CloseButton,
  MenuNav,
  MenuLink,
  SocialList,
  SocialIconWrapper,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  SectionTitle,
  UserMenuMobile,
} from './MobileMenu.styled';
import Location from '@/components/Location';
import Language from '@/components/Language';
import Login from '@/components/Login';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Wineries', path: '/wineries', icon: <FaWineBottle /> },
    { name: 'Wines', path: '/wines', icon: <FaWineBottle /> },
    { name: 'Grapes', path: '/grapes', icon: <FaLeaf /> },
    { name: 'Wine tours', path: '/wine-tours', icon: <FiMap /> },
  ];

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} />
      <MobileMenuOverlay $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <MenuNav>
          <SectionTitle>Main Navigation</SectionTitle>
          {navItems.map((item) => (
            <MenuLink
              key={item.path}
              $active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            >
              {item.icon}
              {item.name}
            </MenuLink>
          ))}
        </MenuNav>

        <UserMenuMobile>
          <Location />
          <Language />
          <Login onClick={onClose} />
        </UserMenuMobile>

        <SocialList>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <FacebookIcon />
              </SocialIconWrapper>
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <InstagramIcon />
              </SocialIconWrapper>
            </a>
          </li>
          <li>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <TelegramIcon />
              </SocialIconWrapper>
            </a>
          </li>
        </SocialList>
      </MobileMenuOverlay>
    </>
  );
};

export default MobileMenu;
