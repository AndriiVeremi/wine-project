import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaWineGlassAlt } from 'react-icons/fa';
import { getGrapeById } from '@/api/grapes';
import { useWinesStore } from '@/store/wine/winesStore';
import type { Grape } from '@/types/grape';
import Container from '@/components/Common/Container';
import { Loader } from '@/components/Common/Loader';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import {
  DetailContainer,
  HeroSection,
  ImageWrapper,
  MainImage,
  ThumbnailGrid,
  Thumbnail,
  InfoWrapper,
  Badge,
  Title,
  Description,
  StatsGrid,
  StatItem,
  StatLabel,
  ProgressBar,
  SectionTitle,
  TagCloud,
  Tag,
  FoodGrid,
  FoodCard,
  InfoCard,
  SliderSection,
  SectionHeaderTitle,
} from './GrapeDetailPage.styled';

const calcProgress = (val: string): number => {
  if (val === 'Low' || val === 'Light') return 25;
  if (val === 'Medium') return 50;
  if (val === 'High' || val === 'Full-bodied') return 75;
  if (val === 'Very High') return 100;
  return 0;
};

const getFoodEmoji = (text: string): string => {
  const low = text.toLowerCase();
  if (low.includes('cheese')) return '🧀';
  if (low.includes('meat') || low.includes('beef') || low.includes('steak')) return '🥩';
  if (low.includes('poultry') || low.includes('chicken')) return '🍗';
  if (low.includes('fish') || low.includes('seafood')) return '🐟';
  if (low.includes('salad') || low.includes('vegetable')) return '🥗';
  if (low.includes('dessert') || low.includes('fruit') || low.includes('sweet')) return '🍰';
  if (low.includes('pasta') || low.includes('pizza')) return '🍝';
  return '🍽️';
};

const GrapeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Grape | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const { wines, fetch, loading: winesLoading } = useWinesStore();

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getGrapeById(id);
      setData(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (data?.name) {
      fetch({ grape: data.name, limit: 10 });
    }
  }, [data?.name, fetch]);

  if (loading) return <Loader />;
  if (!data)
    return (
      <Container>
        <p>Varietal information not found.</p>
      </Container>
    );

  return (
    <Container>
      <DetailContainer>
        <HeroSection>
          <ImageWrapper>
            <MainImage>
              <img
                src={data.imageUrls?.[activeIdx] || '/assets/grape-placeholder.png'}
                alt={data.name}
              />
            </MainImage>
            {data.imageUrls && data.imageUrls.length > 1 && (
              <ThumbnailGrid>
                {data.imageUrls.map((url, i) => (
                  <Thumbnail key={i} $active={activeIdx === i} onClick={() => setActiveIdx(i)}>
                    <img src={url} alt="Varietal photo" />
                  </Thumbnail>
                ))}
              </ThumbnailGrid>
            )}
          </ImageWrapper>

          <InfoWrapper>
            <Badge $type={data.type}>{data.type} variety</Badge>
            <Title>{data.name}</Title>

            {data.alsoKnownAs && data.alsoKnownAs.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}
                >
                  Synonyms:
                </span>
                {data.alsoKnownAs.map((n) => (
                  <span
                    key={n}
                    style={{
                      fontSize: '13px',
                      color: '#475569',
                      background: '#f1f5f9',
                      padding: '2px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            <Description dangerouslySetInnerHTML={{ __html: data.description }} />

            <InfoCard>
              <StatsGrid>
                <StatItem>
                  <StatLabel>Acidity: {data.acidity}</StatLabel>
                  <ProgressBar $percent={calcProgress(data.acidity)} $type="acid" />
                </StatItem>
                <StatItem>
                  <StatLabel>Body: {data.body}</StatLabel>
                  <ProgressBar $percent={calcProgress(data.body)} $type="body" />
                </StatItem>
                {data.tannins && data.tannins !== 'None' && (
                  <StatItem>
                    <StatLabel>Tannins: {data.tannins}</StatLabel>
                    <ProgressBar $percent={calcProgress(data.tannins)} $type="tannin" />
                  </StatItem>
                )}
                <StatItem>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}
                  >
                    <FaClock color="#94a3b8" />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                      }}
                    >
                      Aging Potential
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#1e293b',
                      fontWeight: 600,
                      marginTop: '4px',
                    }}
                  >
                    {data.agingPotential || 'Best enjoyed young'}
                  </p>
                </StatItem>
              </StatsGrid>
            </InfoCard>
          </InfoWrapper>
        </HeroSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          {data.characteristics && data.characteristics.length > 0 && (
            <section>
              <SectionTitle>Key Characteristics</SectionTitle>
              <TagCloud>
                {data.characteristics.map((item) => (
                  <Tag key={item}>
                    <FaWineGlassAlt size={12} style={{ marginRight: '8px', color: '#841013' }} />
                    {item}
                  </Tag>
                ))}
              </TagCloud>
            </section>
          )}

          {data.foodPairing && data.foodPairing.length > 0 && (
            <section>
              <SectionTitle>Perfect Pairings</SectionTitle>
              <FoodGrid>
                {data.foodPairing.map((f) => (
                  <FoodCard key={f}>
                    <span className="icon">{getFoodEmoji(f)}</span>
                    <span>{f}</span>
                  </FoodCard>
                ))}
              </FoodGrid>
            </section>
          )}
        </div>
      </DetailContainer>

      {(wines.length > 0 || winesLoading) && (
        <SliderSection>
          <SectionHeaderTitle>Wines of {data.name}</SectionHeaderTitle>
          <Slider
            items={wines.slice(0, 8)}
            isLoading={winesLoading && wines.length === 0}
            renderSkeleton={() => <WineCardSkeleton />}
            renderItem={(w) => <SliderCardWine wine={w} />}
          />
        </SliderSection>
      )}
    </Container>
  );
};

export default GrapeDetailPage;
