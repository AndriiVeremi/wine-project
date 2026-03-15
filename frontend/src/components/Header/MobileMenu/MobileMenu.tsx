import { useNavigate, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
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
    { name: 'Home', path: '/' },
    { name: 'Wineries', path: '/wineries' },
    { name: 'Wines', path: '/wines' },
    { name: 'Grapes', path: '/grapes' },
    { name: 'Wine tours', path: '/tours' },
  ];

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} />
      <MobileMenuOverlay $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <MenuNav>
          {navItems.map((item) => (
            <MenuLink
              key={item.path}
              $active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            >
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
