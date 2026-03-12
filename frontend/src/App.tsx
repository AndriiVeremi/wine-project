import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import { useLocationStore } from '@/store/location/locationStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import SharedLayout from '@/components/SharedLayout';
import HomePage from '@/pages/HomePage';
import WineriesPage from '@/pages/WineriesPage';
import AboutPage from '@/pages/AboutPage';
import WinesPage from '@/pages/WinesPage';
import GrapesPage from '@/pages/GrapesPage';
import WineToursPage from '@/pages/WineToursPage';
import AccountPage from '@/pages/AccountPage';
import { Toaster } from 'react-hot-toast';
import WineDetailPage from './pages/WineDetailPage/WineDetailPage';
import WineryDetailPage from './pages/WineryDetailPage/WineryDetailPage';
import { Loader } from '@/components/common/Loader';

function App() {
  const { setUser, isLoading } = useAuthStore();
  const { country, fetchRegions } = useLocationStore();

  useEffect(() => {
    fetchRegions(country);
  }, [country, fetchRegions]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="wineries" element={<WineriesPage />} />
          <Route path="wineries/:id" element={<WineryDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="wines" element={<WinesPage />} />
          <Route path="wines/:id" element={<WineDetailPage />} />
          <Route path="grapes" element={<GrapesPage />} />
          <Route path="wine-tours" element={<WineToursPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
