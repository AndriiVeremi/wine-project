import { useQuery } from '@tanstack/react-query';
import Container from '@/components/common/Container';
import WineColorFilters from '@/components/WineColorFilters/WineColorFilters';
import Slider from '@/components/Slider/Slider';
import SliderCardWinery from '@/components/Slider/cards/SliderCardWinery';
import { getWineries } from '@/api/wineries';
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
} from './HomePage.styled';

interface Winery {
  _id: string;
  name: string;
  logoUrl?: string;
  history?: string;
  averageRating?: number;
  totalReviews?: number;
  region?: { name: string };
}

const HomePage = () => {
  const { data: wineriesData, isLoading } = useQuery({
    queryKey: ['wineries', { limit: 10 }],
    queryFn: () => getWineries({ limit: 10 }),
  });

  const wineries = wineriesData?.data?.wineries || [];

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
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
            Our Partners & Wineries
          </h2>
          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading wineries...</p>
          ) : (
            <Slider
              items={wineries}
              renderItem={(winery: Winery) => <SliderCardWinery winery={winery} />}
            />
          )}
        </Container>
      </ReviewSection>
    </>
  );
};

export default HomePage;
