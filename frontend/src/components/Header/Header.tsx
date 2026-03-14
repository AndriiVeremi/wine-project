import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, StyledHeader, Item, HeaderContainer, BurgerButton, DesktopUserMenu } from '@/components/Header/Header.styled';
import Container from '@/components/common/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';
import MobileMenu from './MobileMenu';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <StyledHeader className="app-header">
      <Container>
        <HeaderContainer className="header-container">
          <MainLogo />
          <Nav className="app-nav">
            <ul>
              <Item>
                <Link to="/">Home</Link>
              </Item>
              <Item>
                <Link to="/wineries">Wineries</Link>
              </Item>
              <Item>
                <Link to="/wines">Wines</Link>
              </Item>
              <Item>
                <Link to="/grapes">Grapes</Link>
              </Item>
              <Item>
                <Link to="/wine-tours">Wine tours</Link>
              </Item>
            </ul>
          </Nav>
          <DesktopUserMenu>
            <UserMenu />
          </DesktopUserMenu>
          <BurgerButton onClick={() => setIsMenuOpen(true)}>
            <FiMenu />
          </BurgerButton>
        </HeaderContainer>
      </Container>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
