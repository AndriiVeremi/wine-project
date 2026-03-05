import { Link } from 'react-router-dom';
import { Nav, StyledHeader, ListItem, HeaderContainer } from '@/components/Header/Header.styled';
import Container from '@/components/common/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <StyledHeader className="app-header">
      <Container>
        <HeaderContainer className="header-container">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <MainLogo />
          </a>
          <Nav className="app-nav">
            <ul>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/wineries">Wineries</Link>
              </ListItem>
              <ListItem>
                <Link to="/about">About</Link>
              </ListItem>
              <ListItem>
                <Link to="/wines">Wines</Link>
              </ListItem>
              <ListItem>
                <Link to="/grapes">Grapes</Link>
              </ListItem>
              <ListItem>
                <Link to="/wine-tours">Wine tours</Link>
              </ListItem>

              {user && (
                <ListItem>
                  <Link to="/account">Account</Link>
                </ListItem>
              )}
            </ul>
          </Nav>
          <UserMenu />
        </HeaderContainer>
      </Container>
    </StyledHeader>
  );
};

export default Header;
