import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
// import AuthModal from '@/components/modals/AuthModal';
import SharedLayout from '@/components/SharedLayout';
import HomePage from '@/pages/HomePage';
import WineriesPage from '@/pages/WineriesPage';
import AboutPage from '@/pages/AboutPage';
import WinesPage from '@/pages/WinesPage';
import GrapesPage from '@/pages/GrapesPage';
import WineToursPage from '@/pages/WineToursPage';

function App() {
  const { setUser, isLoading } = useAuthStore();

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
    <>
      {/* <AuthModal /> */}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="wineries" element={<WineriesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="wines" element={<WinesPage />} />
            <Route path="grapes" element={<GrapesPage />} />
            <Route path="wine-tours" element={<WineToursPage />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
