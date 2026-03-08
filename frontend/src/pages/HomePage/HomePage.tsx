import Container from '@/components/common/Container';
import WineColorFilters from '@/components/WineColorFilters/WineColorFilters';
import {
  HeroSection,
  Span,
  HeroTitle,
  HeroWrapper,
  HeroSubtitleWrapper,
  HeroSubtitle,
  TextWrapper,
  Text,
  WineSection,
  MapSection,
  ReviewSection,
  ReviewList,
} from './HomePage.styled';

const HomePage = () => {
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
          <WineColorFilters />
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
