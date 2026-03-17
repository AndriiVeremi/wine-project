import { useQuery } from '@tanstack/react-query';
import Container from '@/components/Common/Container';
import WineColorFilters from '@/components/Wine/WineColorFilters/WineColorFilters';
import Slider from '@/components/Slider/Slider';
import SliderCardWinery from '@/components/Slider/cards/SliderCardWinery';
import { getWineries } from '@/api/wineries';
import Hero from '@/components/Hero/Hero';
import { WineSection, MapSection, ReviewSection, ReviewTitle } from './HomePage.styled';

interface Winery {
  _id: string;
  name: string;
  logoUrl?: string;
  history?: string;
  averageRating?: number;
  totalReviews?: number;
  region?: { name: string };
  isVip?: boolean;
}

const HomePage = () => {
  const { data: wineriesData, isLoading } = useQuery({
    queryKey: ['wineries', { limit: 50 }],
    queryFn: () => getWineries({ limit: 50 }),
  });

  const vipWineries =
    wineriesData?.data?.wineries?.filter((w: Winery) => w.isVip)?.slice(0, 8) || [];

  return (
    <>
      <Hero />

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
          <ReviewTitle>Our Partners & Wineries</ReviewTitle>
          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading wineries...</p>
          ) : (
            <Slider
              items={vipWineries}
              renderItem={(winery: Winery) => <SliderCardWinery winery={winery} />}
            />
          )}
        </Container>
      </ReviewSection>
    </>
  );
};

export default HomePage;
