import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import SharedLayout from '@/components/Layout/SharedLayout';
import HomePage from '@/pages/HomePage';
import WineriesPage from '@/pages/WineriesPage';
import AboutPage from '@/pages/AboutPage';
import WinesPage from '@/pages/WinesPage';
import GrapesPage from '@/pages/GrapesPage';
import GrapeDetailPage from '@/pages/GrapeDetailPage/GrapeDetailPage';
import WineToursPage from '@/pages/WineToursPage';
import AccountPage from '@/pages/AccountPage';
import { Toaster } from 'react-hot-toast';
import WineDetailPage from '@/pages/WineDetailPage/WineDetailPage';
import WineryDetailPage from '@/pages/WineryDetailPage/WineryDetailPage';
import { Loader } from '@/components/Common/Loader';
import WineTourDetailPage from '@/pages/WineTourDetailPage';
import RegionDetailPage from '@/pages/RegionDetailPage/RegionDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ErrorBoundary from '@/components/Common/ErrorBoundary';

function App() {
  const { setUser, isLoading } = useAuthStore();

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
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="wineries" element={<WineriesPage />} />
            <Route path="wineries/:id" element={<WineryDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="wines" element={<WinesPage />} />
            <Route path="wines/:id" element={<WineDetailPage />} />
            <Route path="grapes" element={<GrapesPage />} />
            <Route path="grapes/:id" element={<GrapeDetailPage />} />
            <Route path="regions/:name" element={<RegionDetailPage />} />
            <Route path="tours" element={<WineToursPage />} />
            <Route path="tours/:id" element={<WineTourDetailPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
