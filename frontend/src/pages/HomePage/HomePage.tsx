import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import Container from '@/components/Common/Container';
import WineColorFilters from '@/components/Wine/WineColorFilters/WineColorFilters';
import Slider from '@/components/Slider/Slider';
import SliderCardWinery from '@/components/Slider/cards/SliderCardWinery';
import { getWineries } from '@/api/wineries';
import { getRegions } from '@/api/regions';
import { useLocationStore } from '@/store/location/locationStore';
import Hero from '@/components/Hero/Hero';
import WineryCardSkeleton from '@/components/Common/Skeleton/WineryCardSkeleton';

import homeBgLeft from '@/assets/home-bg/home-bgLeft.webp';
import homeBgLeftX2 from '@/assets/home-bg/home-bgLeftX2.webp';
import homeBgRight from '@/assets/home-bg/home-bgRight.webp';
import homeBgRightX2 from '@/assets/home-bg/home-bgRightX2.webp';

import {
  WineSection,
  MapSection,
  ReviewSection,
  ReviewTitle,
  RegionList,
  RegionLink,
  RegionTitle,
  MapWrapperDesktop,
  MapContainer,
  MapPlaceholder,
  SkeletonGrid,
} from './HomePage.styled';

const InteractiveMap = lazy(() => import('@/components/Common/InteractiveMap/InteractiveMap'));

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
      <div style={{ display: 'none', visibility: 'hidden' }}>
        <img
          src={homeBgLeft}
          srcSet={`${homeBgLeft} 1x, ${homeBgLeftX2} 2x`}
          alt=""
          fetchPriority="high"
        />
        <img
          src={homeBgRight}
          srcSet={`${homeBgRight} 1x, ${homeBgRightX2} 2x`}
          alt=""
          fetchPriority="high"
        />
      </div>

      <Hero />

      <WineSection>
        <Container>
          <WineColorFilters />
        </Container>
      </WineSection>

      <MapSection>
        <Container>
          <MapContainer>
            {selectedCountry ? (
              <>
                <RegionTitle>Discover Wine Regions of {selectedCountry}</RegionTitle>

                {selectedCountry === 'Georgia' && (
                  <MapWrapperDesktop>
                    <Suspense fallback={<MapPlaceholder />}>
                      <InteractiveMap />
                    </Suspense>
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
          </MapContainer>
        </Container>
      </MapSection>

      <ReviewSection>
        <Container>
          <ReviewTitle>Our Partners & Wineries</ReviewTitle>
          {isLoadingWineries ? (
            <SkeletonGrid>
              <div>
                <WineryCardSkeleton />
                <WineryCardSkeleton />
                <WineryCardSkeleton />
                <WineryCardSkeleton />
              </div>
            </SkeletonGrid>
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
