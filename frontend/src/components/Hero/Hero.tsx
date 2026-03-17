import Container from '@/components/Common/Container';
import {
  HeroSection,
  Span,
  HeroTitle,
  HeroWrapper,
  HeroSubtitleWrapper,
  HeroSubtitle,
  TextWrapper,
  Text,
} from './Hero.styled';

const Hero = () => {
  return (
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
  );
};

export default Hero;
