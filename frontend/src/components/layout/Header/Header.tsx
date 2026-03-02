import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import MainButton from '@/components/buttons/MainButton/MainButton';

const Header = () => {
  const { user, logout, openAuthModal } = useAuthStore();

  return (
    <header className="app-header">
      <nav className="app-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wineries">Wineries</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/wines">Wines</Link>
          </li>
          <li>
            <Link to="/grapes">Grapes</Link>
          </li>
          <li>
            <Link to="/wine-tours">Wine tours</Link>
          </li>
          {user ? (
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
                  Login
                </MainButton>
              </li>
              <li>
                <MainButton type="button" size="medium" onClick={() => openAuthModal('register')}>
                  Register
                </MainButton>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
