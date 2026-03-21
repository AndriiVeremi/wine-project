import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AuthModal from '@/components/Common/AuthModal/AuthModal';
import AIAssistant from '@/components/Common/AIAssistant/AIAssistant';
import Container from '@/components/Common/Container';
import { Loader } from '@/components/Common/Loader';
import { useAuthStore } from '@/store/auth/authStore';
import {
  LayoutWrapper,
  PageTitleContainer,
  PageTitle,
  InnerDecorativeBackground,
  BottomDecorativeBackground,
  MainContent,
  ContentWrapper,
  HomeBgLeft,
  HomeBgRight,
} from './SharedLayout.styled';
import homeBgLeftSrc from '@/assets/home-bg/home-bgLeft.webp';
import homeBgRightSrc from '@/assets/home-bg/home-bgRight.webp';
import { ROUTES } from '@/constants/routes';

const SharedLayout = () => {
  const { pathname } = useLocation();
  const { user, isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  const getPageTitle = () => {
    if (pathname === '/') return '';
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return '';
    const mainSegment = segments[0];
    if (!ROUTES.includes(mainSegment)) {
      return 'error';
    }
    return mainSegment.replace(/-/g, ' ');
  };

  const pageTitle = getPageTitle();
  const isHome = pathname === '/';

  return (
    <LayoutWrapper>
      {isHome && (
        <>
          <HomeBgLeft
            src={homeBgLeftSrc}
            alt=""
            fetchPriority="high"
            loading="eager"
            width="406"
            height="695"
          />
          <HomeBgRight
            src={homeBgRightSrc}
            alt=""
            fetchPriority="high"
            loading="eager"
            width="903"
            height="695"
          />
        </>
      )}
      {!isHome && <InnerDecorativeBackground />}

      <Header />

      {!isHome && pageTitle && (
        <PageTitleContainer>
          <Container>
            <PageTitle>{pageTitle}</PageTitle>
          </Container>
        </PageTitleContainer>
      )}

      <MainContent $isHome={isHome} $hasTitle={!!pageTitle}>
        <ContentWrapper>
          <Suspense fallback={<Loader isFullScreen={false} />}>
            <Outlet />
          </Suspense>
        </ContentWrapper>
        <BottomDecorativeBackground />
      </MainContent>

      <Footer />

      {user && aiAssistantEnabled && <AIAssistant />}

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
    </LayoutWrapper>
  );
};

export default SharedLayout;
