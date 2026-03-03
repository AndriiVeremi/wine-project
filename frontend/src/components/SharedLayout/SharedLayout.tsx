import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '@/components/layout/Footer/Footer';
import AuthModal from '@/components/common/AuthModal';
import { useAuthStore } from '@/store/authStore';

const SharedLayout = () => {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();

  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </div>
  );
};

export default SharedLayout;
