import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWine, useWines } from '@/hooks/queries/useWines';
import WineOverview from '@/components/Wine/WineOverview/WineOverview';
import WineReviews from '@/components/Wine/WineReviews';
import AddReviewForm from '@/components/Forms/AddReviewForm/AddReviewForm';
import Container from '@/components/Common/Container';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import type { Wine } from '@/types/wine';
import {
  StyledWinePageDiv,
  StyledWraperImage,
  StyledWineInfo,
  StyledWineImg,
  WineDetailPageTabs,
  WineDescriptionContent,
  SliderSection,
  SliderTitle,
  WineProfileGrid,
  ProfileItem,
  ServingSection,
  ServingItem,
  CharacterBar,
  SommelierCard,
} from './WineDetailPage.styled';
import InfoButton from '@/components/Buttons/InfoButton';
import { FiThermometer, FiWind, FiTruck } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi2';

import { getFoodEmoji } from '@/utils/wineHelpers';

const getScalePercent = (val: string = '') => {
  const low = ['light', 'low', 'delicate'];
  const med = ['medium', 'balanced'];
  const high = ['full', 'high', 'powerful', 'rich'];
  const v = val.toLowerCase();
  if (high.some((s) => v.includes(s))) return 90;
  if (med.some((s) => v.includes(s))) return 60;
  if (low.some((s) => v.includes(s))) return 30;
  return 50;
};

const WineDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [refreshReviews, setRefreshReviews] = useState(0);

  const { data: wineData, isLoading: loading, error } = useWine(id);
  const wine = wineData?.data;

  const { data: topWinesData, isLoading: isTopWinesLoading } = useWines(
    wine
      ? {
          limit: 11,
          sortBy: 'averageRating_desc',
          color: wine.color,
          sweetness: wine.sweetness,
        }
      : {},
  );

  const topWines =
    topWinesData?.data?.wines?.filter((w: Wine) => w._id !== wine?._id).slice(0, 10) || [];

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error instanceof Error ? error.message : 'Failed to load'}</p>;
  if (!wine) return <p>Wine not found</p>;

  return (
    <Container>
      <StyledWinePageDiv>
        <StyledWraperImage>
          <StyledWineImg src={wine.imageUrl} alt={wine.name} />
        </StyledWraperImage>

        <StyledWineInfo>
          <WineOverview wine={wine} />
        </StyledWineInfo>

        <WineDetailPageTabs>
          <InfoButton
            active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            Description
          </InfoButton>
          <InfoButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
            Reviews
          </InfoButton>
        </WineDetailPageTabs>

        <WineDescriptionContent>
          {activeTab === 'description' ? (
            <>
              <SommelierCard>
                <h3>
                  <HiOutlineLightBulb size={26} /> Sommelier's Notes
                </h3>
                <div className="note-item">
                  <span className="note-label">Taste Profile</span>
                  <span className="note-text">
                    {wine.tastingNotes?.[0] ||
                      (
                        wine.grape as unknown as { characteristics?: string[] }
                      )?.characteristics?.join(', ') ||
                      '—'}
                  </span>
                </div>
                <div className="note-item">
                  <span className="note-label">Aromatic Bouquet</span>
                  <span className="note-text">
                    {wine.tastingNotes?.[1] ||
                      (wine.grape as unknown as { aromas?: string[] })?.aromas?.join(', ') ||
                      '—'}
                  </span>
                </div>
                <div className="note-item">
                  <span className="note-label">Visual & Texture</span>
                  <span className="note-text">
                    Beautiful {wine.color} hue with a {wine.sweetness} finish.
                  </span>
                </div>
              </SommelierCard>

              <div className="description-title" style={{ marginBottom: '20px' }}>
                Wine Character
              </div>
              <WineProfileGrid>
                <ProfileItem>
                  <div className="label-row">
                    <span className="label">Body</span>
                    <span className="value">{wine.grape?.body || 'Medium'}</span>
                  </div>
                  <CharacterBar $percent={getScalePercent(wine.grape?.body)} />
                </ProfileItem>
                <ProfileItem>
                  <div className="label-row">
                    <span className="label">Acidity</span>
                    <span className="value">{wine.grape?.acidity || 'Balanced'}</span>
                  </div>
                  <CharacterBar $percent={getScalePercent(wine.grape?.acidity)} />
                </ProfileItem>
                {wine.color === 'red' && (
                  <ProfileItem>
                    <div className="label-row">
                      <span className="label">Tannins</span>
                      <span className="value">{wine.grape?.tannins || 'Soft'}</span>
                    </div>
                    <CharacterBar $percent={getScalePercent(wine.grape?.tannins)} />
                  </ProfileItem>
                )}
                <ProfileItem>
                  <div className="label-row">
                    <span className="label">Aging Potential</span>
                    <span className="value">{wine.grape?.agingPotential || 'Ready to drink'}</span>
                  </div>
                  <CharacterBar $percent={70} />
                </ProfileItem>
              </WineProfileGrid>

              <div className="description-title">Gastronomic Pairings</div>
              <div
                style={{
                  marginTop: '15px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {wine.foodPairing?.map((food: string) => (
                  <span
                    key={food}
                    style={{
                      background: 'var(--white)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--primary-gray)',
                      border: '1px solid #eee',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{getFoodEmoji(food)}</span> {food}
                  </span>
                )) || '—'}
              </div>

              <ServingSection>
                <ServingItem>
                  <FiThermometer size={22} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>
                      Temp
                    </div>
                    <strong>{wine.servingTemperature || '16-18°C'}</strong>
                  </div>
                </ServingItem>
                <ServingItem>
                  <FiWind size={22} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>
                      Decanting
                    </div>
                    <strong>{wine.decanting ? 'Required' : 'Optional'}</strong>
                  </div>
                </ServingItem>
                <ServingItem>
                  <FiTruck size={22} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>
                      Delivery
                    </div>
                    <strong>Standard</strong>
                  </div>
                </ServingItem>
              </ServingSection>

              <div className="description-title" style={{ marginTop: '50px' }}>
                Sommelier's Opinion
                <div
                  style={{
                    marginTop: '20px',
                    fontWeight: 'normal',
                    color: 'var(--primary-gray)',
                    fontSize: '17px',
                    lineHeight: '1.8',
                  }}
                  dangerouslySetInnerHTML={{ __html: wine.description || '—' }}
                />
              </div>
            </>
          ) : (
            <>
              <WineReviews key={refreshReviews} wineId={wine._id} />
              <div style={{ height: '40px' }} />
              <AddReviewForm
                wineId={wine._id}
                onReviewAdded={() => {
                  setRefreshReviews((prev) => prev + 1);
                  setActiveTab('reviews');
                }}
              />
            </>
          )}
        </WineDescriptionContent>
      </StyledWinePageDiv>

      <SliderSection>
        {(topWines.length > 0 || isTopWinesLoading) && (
          <>
            <SliderTitle>
              Top Rated {wine.color} {wine.sweetness} Wines
            </SliderTitle>
            <Slider
              items={topWines.slice(0, 8)}
              isLoading={isTopWinesLoading}
              renderSkeleton={() => <WineCardSkeleton />}
              renderItem={(wineItem: Wine) => <SliderCardWine wine={wineItem} />}
            />
          </>
        )}
      </SliderSection>
    </Container>
  );
};

export default WineDetailPage;
