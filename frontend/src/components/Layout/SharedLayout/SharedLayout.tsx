import { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
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

// Lazy load AuthModal
const AuthModal = lazy(() => import('@/components/Common/AuthModal/AuthModal'));

const homeBgLeftSrc = '/images/home-bg/home-bgLeft.webp';
const homeBgLeftX2Src = '/images/home-bg/home-bgLeftX2.webp';
const homeBgLeftMobileSrc = '/images/home-bg/home-bgLeft-mobile.webp';
const homeBgRightSrc = '/images/home-bg/home-bgRight.webp';
const homeBgRightX2Src = '/images/home-bg/home-bgRightX2.webp';
const homeBgRightMobileSrc = '/images/home-bg/home-bgRight-mobile.webp';

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
            srcSet={`${homeBgLeftMobileSrc} 240w, ${homeBgLeftSrc} 406w, ${homeBgLeftX2Src} 812w`}
            sizes="(max-width: 480px) 120px, (max-width: 900px) 200px, 406px"
            alt="Georgian wine decorative background left"
            fetchPriority="high"
            loading="eager"
            width="406"
            height="695"
          />
          <HomeBgRight
            src={homeBgRightSrc}
            srcSet={`${homeBgRightMobileSrc} 520w, ${homeBgRightSrc} 903w, ${homeBgRightX2Src} 1806w`}
            sizes="(max-width: 480px) 260px, (max-width: 900px) 400px, 903px"
            alt="Georgian wine decorative background right"
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
          <Suspense
            fallback={
              isHome ? (
                <div style={{ minHeight: '1000px' }}>
                  <Loader isFullScreen={false} />
                </div>
              ) : (
                <Loader isFullScreen={false} />
              )
            }
          >
            <Outlet />
          </Suspense>
        </ContentWrapper>
        <BottomDecorativeBackground />
      </MainContent>

      <Footer />

      {user && aiAssistantEnabled && <AIAssistant />}

      <Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialTab={authModalView} />
        )}
      </Suspense>
    </LayoutWrapper>
  );
};

export default SharedLayout;
