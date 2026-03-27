import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  StyledHeader,
  Item,
  HeaderContainer,
  BurgerButton,
  DesktopUserMenu,
  HeaderWrapper,
} from '@/components/Layout/Header/Header.styled';
import MainLogo from '@/components/Common/MainLogo';
import UserMenu from '@/components/User/UserMenu';
import MobileMenu from './MobileMenu/MobileMenu';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StyledHeader className="app-header">
      <HeaderWrapper>
        <HeaderContainer className="header-container">
          <MainLogo />
          <Nav className="app-nav">
            <ul>
              <Item>
                <NavLink to="/">Home</NavLink>
              </Item>
              <Item>
                <NavLink to="/wineries">Wineries</NavLink>
              </Item>
              <Item>
                <NavLink to="/wines">Wines</NavLink>
              </Item>
              <Item>
                <NavLink to="/grapes">Grapes</NavLink>
              </Item>
              <Item>
                <NavLink to="/tours">Wine tours</NavLink>
              </Item>
            </ul>
          </Nav>
          <DesktopUserMenu>
            <UserMenu />
          </DesktopUserMenu>
          <BurgerButton onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <FiMenu />
          </BurgerButton>
        </HeaderContainer>
      </HeaderWrapper>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </StyledHeader>
  );
};

export default Header;
