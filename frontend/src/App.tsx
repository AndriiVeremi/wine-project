import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import AuthModal from './components/modals/AuthModal';

const HomePage = () => <h2>Головна сторінка</h2>;
const WineriesPage = () => <h2>Сторінка виноробень</h2>;

function App() {
  const { user, logout, setUser, isLoading, openAuthModal } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="app-layout">
      <AuthModal /> {/* Render the modal at the top level */}
      <header className="app-header">
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/wineries">Виноробні</Link>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={logout}>Вийти</button>
                </li>
                <li>
                  <span style={{ color: 'lightgreen', marginLeft: '1rem' }}>Роль: {user.role}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  {/* Changed from Link to button */}
                  <button onClick={() => openAuthModal('login')}>Увійти</button>
                </li>
                <li>
                  {/* Changed from Link to button */}
                  <button onClick={() => openAuthModal('register')}>Реєстрація</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="app-content">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wineries" element={<WineriesPage />} />
          </Routes>
        </div>
      </main>
      <footer className="app-footer">Wine-project Created by Wine-team</footer>
    </div>
  );
}

export default App;
