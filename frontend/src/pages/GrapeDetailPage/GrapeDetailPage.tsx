import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaWineGlassAlt } from 'react-icons/fa';
import { getGrapeById } from '@/api/grapes';
import type { Grape } from '@/types/grape';
import Container from '@/components/common/Container';
import { Loader } from '@/components/common/Loader';
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
} from './GrapeDetailPage.styled';

const getPercent = (val: string): number => {
  if (val === 'Low' || val === 'Light') return 25;
  if (val === 'Medium') return 50;
  if (val === 'High' || val === 'Full-bodied') return 75;
  if (val === 'Very High') return 100;
  return 0;
};

const getFoodIcon = (food: string): string => {
  const text = food.toLowerCase();

  if (text.includes('cheese')) return '🧀';
  if (text.includes('meat') || text.includes('beef') || text.includes('steak')) return '🥩';
  if (text.includes('poultry') || text.includes('chicken')) return '🍗';
  if (text.includes('fish') || text.includes('seafood')) return '🐟';
  if (text.includes('salad') || text.includes('vegetable')) return '🥗';
  if (text.includes('dessert') || text.includes('fruit') || text.includes('sweet')) return '🍰';
  if (text.includes('pasta') || text.includes('pizza')) return '🍝';

  return '🍽️';
};

const GrapeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [grape, setGrape] = useState<Grape | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImg, setActiveImg] = useState<number>(0);

  useEffect(() => {
    const fetchGrapeData = async () => {
      if (!id) return;

      try {
        const response = await getGrapeById(id);
        setGrape(response.data);
      } catch (error: unknown) {
        console.error('Error loading grapes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrapeData();
  }, [id]);

  if (loading) return <Loader />;

  if (!grape) {
    return (
      <Container>
        <p>Sorry, no grape variety found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <DetailContainer>
        <HeroSection>
          <ImageWrapper>
            <MainImage>
              <img
                src={grape.imageUrls?.[activeImg] || '/assets/grape-placeholder.png'}
                alt={grape.name}
              />
            </MainImage>

            {grape.imageUrls && grape.imageUrls.length > 1 && (
              <ThumbnailGrid>
                {grape.imageUrls.map((url, index) => (
                  <Thumbnail
                    key={index}
                    $active={activeImg === index}
                    onClick={() => setActiveImg(index)}
                  >
                    <img src={url} alt={`Фото ${index + 1}`} />
                  </Thumbnail>
                ))}
              </ThumbnailGrid>
            )}
          </ImageWrapper>

          <InfoWrapper>
            <Badge $type={grape.type}>{grape.type} variety</Badge>
            <Title>{grape.name}</Title>

            {grape.alsoKnownAs && grape.alsoKnownAs.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#aaa',
                    textTransform: 'uppercase',
                  }}
                >
                  Synonyms:
                </span>
                {grape.alsoKnownAs.map((name) => (
                  <span
                    key={name}
                    style={{
                      fontSize: '13px',
                      color: '#666',
                      background: '#f5f5f5',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}

            <Description>{grape.description}</Description>

            <InfoCard>
              <StatsGrid>
                <StatItem>
                  <StatLabel>Кислотність: {grape.acidity}</StatLabel>
                  <ProgressBar $percent={getPercent(grape.acidity)} $type="acid" />
                </StatItem>

                <StatItem>
                  <StatLabel>Тільність: {grape.body}</StatLabel>
                  <ProgressBar $percent={getPercent(grape.body)} $type="body" />
                </StatItem>

                {grape.tannins && grape.tannins !== 'None' && (
                  <StatItem>
                    <StatLabel>Таніни: {grape.tannins}</StatLabel>
                    <ProgressBar $percent={getPercent(grape.tannins)} $type="tannin" />
                  </StatItem>
                )}

                <StatItem>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}
                  >
                    <FaClock color="#aaa" />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#999',
                        textTransform: 'uppercase',
                      }}
                    >
                      Витримка
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#444', fontWeight: 600, marginTop: '4px' }}>
                    {grape.agingPotential || 'Найкраще пити молодим'}
                  </p>
                </StatItem>
              </StatsGrid>
            </InfoCard>
          </InfoWrapper>
        </HeroSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          {grape.characteristics && grape.characteristics.length > 0 && (
            <section>
              <SectionTitle>Характеристики сорту</SectionTitle>
              <TagCloud>
                {grape.characteristics.map((item) => (
                  <Tag key={item}>
                    <FaWineGlassAlt size={12} style={{ marginRight: '8px', color: '#841013' }} />
                    {item}
                  </Tag>
                ))}
              </TagCloud>
            </section>
          )}

          {grape.foodPairing && grape.foodPairing.length > 0 && (
            <section>
              <SectionTitle>З чим поєднувати</SectionTitle>
              <FoodGrid>
                {grape.foodPairing.map((food) => (
                  <FoodCard key={food}>
                    <span className="icon">{getFoodIcon(food)}</span>
                    <span>{food}</span>
                  </FoodCard>
                ))}
              </FoodGrid>
            </section>
          )}
        </div>
      </DetailContainer>
    </Container>
  );
};

export default GrapeDetailPage;
