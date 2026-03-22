import { useQuery } from '@tanstack/react-query';
import Container from '@/components/Common/Container';
import WineColorFilters from '@/components/Wine/WineColorFilters/WineColorFilters';
import Slider from '@/components/Slider/Slider';
import SliderCardWinery from '@/components/Slider/cards/SliderCardWinery';
import { getWineries } from '@/api/wineries';
import { getRegions } from '@/api/regions';
import { useLocationStore } from '@/store/location/locationStore';
import Hero from '@/components/Hero/Hero';
import WineryCardSkeleton from '@/components/Common/Skeleton/WineryCardSkeleton';
import InteractiveMap from '@/components/Common/InteractiveMap/InteractiveMap';
import {
  WineSection,
  MapSection,
  ReviewSection,
  ReviewTitle,
  RegionList,
  RegionLink,
  RegionTitle,
  MapWrapperDesktop,
} from './HomePage.styled';

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

interface RegionLocation {
  _id: string;
  name: string;
}

const HomePage = () => {
  const selectedCountry = useLocationStore((s) => s.country);

  const { data: wineriesData, isLoading: isLoadingWineries } = useQuery({
    queryKey: ['wineries', { limit: 50 }],
    queryFn: () => getWineries({ limit: 50 }),
  });

  const { data: regionsData } = useQuery({
    queryKey: ['regions', selectedCountry],
    queryFn: () => getRegions(selectedCountry),
    enabled: !!selectedCountry,
  });

  const vipWineries =
    wineriesData?.data?.wineries?.filter((w: Winery) => w.isVip)?.slice(0, 8) || [];

  const regions = regionsData?.data || [];

  return (
    <>
      <Hero />

      <WineSection>
        <Container>
          <WineColorFilters />
        </Container>
      </WineSection>

      <MapSection>
        <Container>
          <div
            style={{
              minHeight: '800px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {selectedCountry ? (
              <>
                <RegionTitle>Discover Wine Regions of {selectedCountry}</RegionTitle>

                {selectedCountry === 'Georgia' && (
                  <MapWrapperDesktop>
                    <InteractiveMap />
                  </MapWrapperDesktop>
                )}

                <RegionList>
                  {regions.map((region: RegionLocation) => (
                    <RegionLink key={region._id} to={`/regions/${region.name}`}>
                      {region.name}
                    </RegionLink>
                  ))}
                </RegionList>
              </>
            ) : (
              <RegionTitle>Please select a country in the Hero section to see regions</RegionTitle>
            )}
          </div>
        </Container>
      </MapSection>

      <ReviewSection>
        <Container>
          <ReviewTitle>Our Partners & Wineries</ReviewTitle>
          {isLoadingWineries ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  overflow: 'hidden',
                }}
              >
                <WineryCardSkeleton />
                <WineryCardSkeleton />
                <WineryCardSkeleton />
                <WineryCardSkeleton />
              </div>
            </div>
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
