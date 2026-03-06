import { Link } from 'react-router-dom';
import { Nav, StyledHeader, Item, HeaderContainer } from '@/components/Header/Header.styled';
import Container from '@/components/common/Container';
import MainLogo from '@/components/MainLogo/MainLogo';
import UserMenu from '@/components/UserMenu';
import { useAuthStore } from '@/store/authStore';
import MainButton from '../buttons/MainButton';

const Header = () => {
  const { user, logout, openAuthModal } = useAuthStore();
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
                  <Link to="/wines">Wines</Link>
                </Item>
                <Item>
                  <Link to="/grapes">Grapes</Link>
                </Item>
                <Item>
                  <Link to="/wine-tours">Wine tours</Link>
                </Item>
                {user ? (
                  <>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                    <li>
                      <span style={{ color: 'lightgreen', marginLeft: '1rem' }}>
                        Role: {user.role}
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <MainButton
                        type="button"
                        size="medium"
                        onClick={() => openAuthModal('login')}
                      >
                        Login
                      </MainButton>
                    </li>
                    <li>
                      <MainButton
                        type="button"
                        size="medium"
                        onClick={() => openAuthModal('register')}
                      >
                        Register
                      </MainButton>
                    </li>
                  </>
                )}
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
