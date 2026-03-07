import { Link } from 'react-router-dom';
import { Nav, StyledHeader, Item, HeaderContainer } from '@/components/Header/Header.styled';
import Container from '@/components/common/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();

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
              {user && (
                <>
                  <Item>
                    <button onClick={logout}>Logout</button>
                  </Item>
                  <Item>
                    <span style={{ color: 'lightgreen', marginLeft: '1rem' }}>
                      Role: {user.role}
                    </span>
                  </Item>
                </>
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
