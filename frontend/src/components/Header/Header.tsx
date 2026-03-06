import { Link } from 'react-router-dom';
import { Nav, StyledHeader, Item, HeaderContainer } from '@/components/Header/Header.styled';
import Container from '@/components/common/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';
// import { useAuthStore } from '@/store/authStore';

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Container>
          <HeaderContainer>
            <MainLogo />
            <Nav>
              <ul>
                <Item>
                  <Link to="/">Home</Link>
                </Item>
                <Item>
                  <Link to="/wineries">Wineries</Link>
                </Item>
                <Item>
                  <Link to="/about">About</Link>
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
            <UserMenu />
          </HeaderContainer>
        </Container>
      </StyledHeader>
    </>
  );
};

export default Header;
