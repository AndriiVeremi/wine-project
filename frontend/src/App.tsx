import { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Toaster } from 'react-hot-toast';
import { Loader } from '@/components/Common/Loader';
import AgeVerificationModal from '@/components/Common/AgeVerificationModal/AgeVerificationModal';
import SharedLayout from '@/components/Layout/SharedLayout';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import ScrollToTop from '@/components/Common/ScrollToTop/ScrollToTop';

const HomePage = lazy(() => import('@/pages/HomePage'));
const WineriesPage = lazy(() => import('@/pages/WineriesPage'));
const WineryDetailPage = lazy(() => import('@/pages/WineryDetailPage/WineryDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const WinesPage = lazy(() => import('@/pages/WinesPage'));
const WineDetailPage = lazy(() => import('@/pages/WineDetailPage/WineDetailPage'));
const GrapesPage = lazy(() => import('@/pages/GrapesPage'));
const GrapeDetailPage = lazy(() => import('@/pages/GrapeDetailPage/GrapeDetailPage'));
const RegionDetailPage = lazy(() => import('@/pages/RegionDetailPage/RegionDetailPage'));
const WineToursPage = lazy(() => import('@/pages/WineToursPage'));
const WineTourDetailPage = lazy(() => import('@/pages/WineTourDetailPage'));
const AccountPage = lazy(() => import('@/pages/AccountPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage/ContactsPage'));
const LegalPage = lazy(() => import('@/pages/LegalPage/LegalPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  const { setUser, isInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (!isInitialized) {
    return <Loader isFullScreen={true} />;
  }

  return (
    <>
      <AgeVerificationModal />
      <ScrollToTop />
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
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="privacy" element={<LegalPage />} />
            <Route path="terms" element={<LegalPage />} />
            <Route path="cookies" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />{' '}
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
