import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/common/AuthModal/AuthModal';
import AIAssistant from '@/components/common/AIAssistant/AIAssistant';
import { useAuthStore } from '@/store/auth/authStore';
import { LayoutWrapper } from './SharedLayout.styled';

const SharedLayout = () => {
  const { pathname } = useLocation();
  const { user, isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  const getBgType = () => {
    if (pathname === '/') return 'home';
    return 'inner';
  };

  return (
    <LayoutWrapper $bgType={getBgType()}>
      <Header />

      <main style={{ flex: 1, paddingTop: pathname === '/' ? '100px' : '300px' }}>
        <Outlet />
      </main>

      <Footer />

      {user && aiAssistantEnabled && <AIAssistant />}

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </LayoutWrapper>
  );
};

export default SharedLayout;
