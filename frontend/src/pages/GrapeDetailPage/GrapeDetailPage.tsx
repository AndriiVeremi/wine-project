import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaWineGlassAlt } from 'react-icons/fa';
import { getGrapeById } from '@/api/grapes';
import { useWines } from '@/hooks/queries/useWines';
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

import { calcProgress, getFoodEmoji } from '@/utils/wineHelpers';

const GrapeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Grape | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const { data: winesData, isLoading: winesLoading } = useWines(
    data?.name ? { grape: data.name, limit: 10 } : {},
  );

  const wines = winesData?.data?.wines || [];

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
            isLoading={winesLoading}
            renderSkeleton={() => <WineCardSkeleton />}
            renderItem={(w) => <SliderCardWine wine={w} />}
          />
        </SliderSection>
      )}
    </Container>
  );
};

export default GrapeDetailPage;
