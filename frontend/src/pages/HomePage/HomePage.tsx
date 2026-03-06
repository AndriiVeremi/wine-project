import Container from '@/components/common/Container';
import { HeroSection, Span, HeroTitle, HeroTitleWrapper, HeroSubtitleWrapper, HeroSubtitle, TextWrapper } from './HomePage.styled';

const HomePage = () => {
  // const { user, openAuthModal } = useAuthStore();
  // const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  return (
    <>
      <HeroSection>
        <Container>
          <HeroTitleWrapper>
            <HeroTitle>
              <Span>Discover</Span> Georgian Wines, Wineries and Regions
            </HeroTitle>
            <HeroSubtitleWrapper>
              <HeroSubtitle>Your guide to Georgian wine culture and winemaking traditions</HeroSubtitle>
            </HeroSubtitleWrapper>
            <TextWrapper>
              <p>Wine Discovery is an online catalog of Georgian wines and wineries.
Explore wine regions of Georgia, learn about local grape varieties and discover wines by region, grape or rating.
            </p>
            </TextWrapper>
          </HeroTitleWrapper>
        </Container>
      </HeroSection>
    </>
  );
};

export default HomePage;



          