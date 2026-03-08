import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/common/AuthModal/AuthModal';
import AIAssistant from '@/components/common/AIAssistant/AIAssistant';
import { useAuthStore } from '@/store/auth/authStore';

const SharedLayout = () => {
  const { user, isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

      {user && aiAssistantEnabled && <AIAssistant />}

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </>
  );
};

export default SharedLayout;
