import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/common/AuthModal/AuthModal';
import AIAssistant from '@/components/common/AIAssistant/AIAssistant';
import Container from '@/components/common/Container';
import { useAuthStore } from '@/store/auth/authStore';
import { LayoutWrapper, PageTitleContainer, PageTitle } from './SharedLayout.styled';
import { ROUTES } from '@/constants/routes';

const SharedLayout = () => {
  const { pathname } = useLocation();
  const { user, isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  const getBgType = () => {
    if (pathname === '/') return 'home';
    return 'inner';
  };

  const getPageTitle = () => {
    if (pathname === '/') return '';

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return '';

    // Take the first segment (e.g., "wines" from "/wines/123")
    const mainSegment = segments[0];

    if (!ROUTES.includes(mainSegment)) {
      return 'error';
    }

    return mainSegment.replace(/-/g, ' ');
  };

  const pageTitle = getPageTitle();

  return (
    <LayoutWrapper $bgType={getBgType()}>
      <Header />

      {getBgType() === 'inner' && pageTitle && (
        <PageTitleContainer>
          <Container>
            <PageTitle>{pageTitle}</PageTitle>
          </Container>
        </PageTitleContainer>
      )}

      <main
        style={{
          flex: 1,
          paddingTop: pathname === '/' ? '100px' : pageTitle ? '150px' : '300px',
        }}
      >
        <Outlet />
      </main>

      <Footer />

      {user && aiAssistantEnabled && <AIAssistant />}

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </LayoutWrapper>
  );
};

export default SharedLayout;
