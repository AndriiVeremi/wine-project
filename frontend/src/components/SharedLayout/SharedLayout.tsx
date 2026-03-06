import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { LayoutContainer, Content } from './SharedLayout.styled';
import AuthModal from '@/components/common/AuthModal/AuthModal';
import { useAuthStore } from '@/store/authStore';
import { LayoutContainer } from './SharedLayout.styled';

const SharedLayout = () => {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();

  return (
    // <LayoutContainer>
    //   <Header />
    //   <Content className="app-content">
    //     <div className="content-wrapper">
    //       <Outlet />
    //     </div>
    //   </Content>
    //   <Footer />
    //   <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    // </LayoutContainer>

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
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </>
  );
};

export default SharedLayout;
