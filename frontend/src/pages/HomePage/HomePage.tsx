import Container from '@/components/common/Container';
import {
  HeroSection,
  Span,
  HeroTitle,
  HeroWrapper,
  HeroSubtitleWrapper,
  HeroSubtitle,
  TextWrapper,
  Text,
  ImageList,
  WineImage,
  WineSection,
  MapSection,
  ReviewSection,
  ReviewList,
} from './HomePage.styled';
import img1 from '@/assets/wine1_red.png';
import img2 from '@/assets/wine2_orange.png';
import img3 from '@/assets/wine3_rose.png';
import img4 from '@/assets/wine4_white.png';

const HomePage = () => {
  // const { user, openAuthModal } = useAuthStore();
  // const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  return (
    <>
      <HeroSection>
        <Container>
          <HeroWrapper>
            <HeroTitle>
              <Span>Discover</Span> Georgian Wines, Wineries and Regions
            </HeroTitle>
            <HeroSubtitleWrapper>
              <HeroSubtitle>
                Your guide to Georgian wine culture and winemaking traditions
              </HeroSubtitle>
            </HeroSubtitleWrapper>
            <TextWrapper>
              <Text>
                Wine Discovery is an online catalog of Georgian wines and wineries. Explore wine
                regions of Georgia, learn about local grape varieties and discover wines by region,
                grape or rating.
              </Text>
            </TextWrapper>
          </HeroWrapper>
        </Container>
      </HeroSection>
      <WineSection>
        <Container>
          <section>
            <ImageList>
              <li>
                <WineImage src={img1} alt="red wine" />
              </li>
              <li>
                <WineImage src={img2} alt="orange wine" />
              </li>
              <li>
                <WineImage src={img3} alt="rose wine" />
              </li>
              <li>
                <WineImage src={img4} alt="white wine" />
              </li>
            </ImageList>
          </section>
        </Container>
      </WineSection>
      <MapSection>
        <div></div>
      </MapSection>
      <ReviewSection>
        <ReviewList>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
        </ReviewList>
      </ReviewSection>
    </>
  );
};

export default HomePage;
