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
} from './WineDetailPage.styled';
import InfoButton from '@/components/Buttons/InfoButton';
import { FiThermometer, FiWind, FiTruck } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi2';

import { getFoodEmoji } from '@/utils/wineHelpers';

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
              <div style={{ marginBottom: '30px' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    color: 'var(--primary-wine)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <HiOutlineLightBulb size={24} /> Sommelier's Notes
                </h3>
                <p>
                  <span className="description-label">Taste:</span>
                  {wine.tastingNotes?.[0] ||
                    (
                      wine.grape as unknown as { characteristics?: string[] }
                    )?.characteristics?.join(', ') ||
                    '—'}
                </p>
                <p>
                  <span className="description-label">Aroma:</span>
                  {wine.tastingNotes?.[1] ||
                    (wine.grape as unknown as { aromas?: string[] })?.aromas?.join(', ') ||
                    '—'}
                </p>
                <p>
                  <span className="description-label">Color:</span>
                  {wine.color} — {wine.sweetness}
                </p>
              </div>

              <div className="description-title" style={{ marginBottom: '15px' }}>
                Wine Character
              </div>
              <WineProfileGrid>
                <ProfileItem>
                  <span className="label">Body</span>
                  <span className="value">{wine.grape?.body || '—'}</span>
                </ProfileItem>
                <ProfileItem>
                  <span className="label">Acidity</span>
                  <span className="value">{wine.grape?.acidity || '—'}</span>
                </ProfileItem>
                {wine.color === 'red' && (
                  <ProfileItem>
                    <span className="label">Tannins</span>
                    <span className="value">{wine.grape?.tannins || '—'}</span>
                  </ProfileItem>
                )}
                <ProfileItem>
                  <span className="label">Alcohol</span>
                  <span className="value">{wine.alcohol || '—'}</span>
                </ProfileItem>
                <ProfileItem>
                  <span className="label">Aging</span>
                  <span className="value">{wine.grape?.agingPotential || '—'}</span>
                </ProfileItem>
              </WineProfileGrid>

              <div className="description-title">Food Pairing</div>
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {wine.foodPairing?.map((food) => (
                  <span
                    key={food}
                    style={{
                      background: '#f8fafc',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      border: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{getFoodEmoji(food)}</span> {food}
                  </span>
                )) || '—'}
              </div>

              <ServingSection>
                <ServingItem title="Serving Temperature">
                  <FiThermometer size={20} />
                  <span>Serving: {wine.servingTemperature || '—'}</span>
                </ServingItem>
                <ServingItem title="Decanting">
                  <FiWind size={20} />
                  <span>
                    Decanting:{' '}
                    {wine.decanting === undefined
                      ? '—'
                      : wine.decanting
                        ? 'Required'
                        : 'Not required'}
                  </span>
                </ServingItem>
                <ServingItem title="Shipping">
                  <FiTruck size={20} />
                  <span>Standard Shipping Available</span>
                </ServingItem>
              </ServingSection>

              <div className="description-title" style={{ marginTop: '40px' }}>
                Why is it worth buying?
                <div
                  style={{ marginTop: '15px', fontWeight: 'normal', color: 'var(--primary-gray)' }}
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
