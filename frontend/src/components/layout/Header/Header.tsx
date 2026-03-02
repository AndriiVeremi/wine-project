import { Link } from 'react-router-dom';
import { Nav, StyledHeader, ListItem, HeaderContainer } from '@/components/layout/Header/Header.styled';
import Container from '@/components/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';

// import { useAuthStore } from '@/store/authStore';
// import MainButton from '@/components/buttons/MainButton/MainButton';

const Header = () => {
  // const { user, logout, openAuthModal } = useAuthStore();

  return (
    <StyledHeader className="app-header">
      <Container>
      <HeaderContainer className="header-container">
      <MainLogo />
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
          {/* {user ? (
            <>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
              <li>
                <span style={{ color: 'lightgreen', marginLeft: '1rem' }}>Role: {user.role}</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <MainButton type="button" size="medium" onClick={() => openAuthModal('login')}>
                  Login-2
                </MainButton>
              </li>
              <li>
                <MainButton type="button" size="medium" onClick={() => openAuthModal('register')}>
                  Register-2
                </MainButton>
              </li>
            </>
          )} */}
        </ul>
      </Nav>
        <UserMenu />
      </HeaderContainer>
      </Container>
    </StyledHeader>
  );
};

export default Header;
