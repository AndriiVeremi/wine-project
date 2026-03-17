import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRegionByName } from '@/api/regions';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { Loader } from '@/components/Common/Loader';
import Container from '@/components/Common/Container';
import WineryList from '@/components/Winery/WineryList/WineryList';
import type { Region } from '@/types/region';

import {
  RegionDetailWrapper,
  RegionHeroSection,
  MainBanner,
  RegionInfoBlock,
  RegionNameTitle,
  DescriptionText,
  RegionContent,
  RegionInfoGrid,
  InfoCard,
  SectionHeaderTitle,
} from './RegionDetailPage.styled';

const RegionDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const { wineries, fetchWineries, loading: wineriesLoading } = useWineriesStore();

  useEffect(() => {
    const loadRegion = async () => {
      if (!name) return;
      try {
        setLoading(true);
        const response = await getRegionByName(name);
        setRegion(response.data);
        await fetchWineries({ region: name, limit: 12 });
      } catch (err) {
        console.error('Failed to load region:', err);
      } finally {
        setLoading(false);
      }
    };
    loadRegion();
  }, [name, fetchWineries]);

  if (loading) return <Loader />;
  if (!region) return <Container>Region not found.</Container>;

  return (
    <Container>
      <RegionDetailWrapper>
        <RegionHeroSection>
          <MainBanner>
            <img src={region.imageUrl || '/assets/region-placeholder.jpg'} alt={region.name} />
          </MainBanner>
          <RegionInfoBlock>
            <RegionNameTitle>{region.name}</RegionNameTitle>
            <DescriptionText>{region.description}</DescriptionText>
          </RegionInfoBlock>
        </RegionHeroSection>

        <RegionContent>
          <RegionInfoGrid>
            {region.climate && (
              <InfoCard>
                <h3>{region.climate.title || 'Climate'}</h3>
                <p>{region.climate.description}</p>
                <ul>
                  {region.climate.features?.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </InfoCard>
            )}

            {region.soils && (
              <InfoCard>
                <h3>{region.soils.title || 'Soils'}</h3>
                <p>{region.soils.description}</p>
                <ul>
                  {region.soils.mainTypes?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </InfoCard>
            )}

            {region.traditions && (
              <InfoCard>
                <h3>{region.traditions.title || 'Traditions'}</h3>
                <p>{region.traditions.description}</p>
                <ul>
                  {region.traditions.rituals?.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </InfoCard>
            )}
          </RegionInfoGrid>

          <SectionHeaderTitle>Wineries in {region.name}</SectionHeaderTitle>
          {wineriesLoading ? (
            <Loader />
          ) : wineries.length > 0 ? (
            <WineryList wineries={wineries} />
          ) : (
            <p>No wineries found in this region.</p>
          )}
        </RegionContent>
      </RegionDetailWrapper>
    </Container>
  );
};

export default RegionDetailPage;
