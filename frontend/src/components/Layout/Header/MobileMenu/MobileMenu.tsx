import { useEffect } from 'react';
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
import Location from '@/features/location/Location';
import Language from '@/components/Common/Language';
import Login from '@/features/auth/LoginPanel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const originalStyleBody = window.getComputedStyle(document.body).overflow;
    const originalStyleHtml = window.getComputedStyle(document.documentElement).overflow;
    const originalHeightBody = document.body.style.height;
    const originalHeightHtml = document.documentElement.style.height;

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.documentElement.style.height = '100%';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalStyleBody;
      document.documentElement.style.overflow = originalStyleHtml;
      document.body.style.height = originalHeightBody;
      document.documentElement.style.height = originalHeightHtml;
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

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
        <CloseButton onClick={onClose} aria-label="Close menu">
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
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <SocialIconWrapper>
                <FacebookIcon />
              </SocialIconWrapper>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <SocialIconWrapper>
                <InstagramIcon />
              </SocialIconWrapper>
            </a>
          </li>
          <li>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
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
