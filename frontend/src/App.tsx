import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import AuthModal from './components/modals/AuthModal';
import AIAssistant from './components/common/AIAssistant/AIAssistant';

const HomePage = () => <h2>Home Page</h2>;
const WineriesPage = () => <h2>Wineries Page</h2>;

function App() {
  const { user, logout, setUser, isLoading, openAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-layout">
      <AuthModal />
      {user && aiAssistantEnabled && <AIAssistant />}
      <header className="app-header">
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wineries">Wineries</Link>
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
                  <button onClick={() => openAuthModal('login')}>Login</button>
                </li>
                <li>
                  <button onClick={() => openAuthModal('register')}>Register</button>
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
