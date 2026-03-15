import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import WineOverview from '@/components/WineOverview/WineOverview';
import WineReviews from '@/components/WineReviews';
import AddReviewForm from '@/components/forms/AddReviewForm/AddReviewForm';
import Container from '@/components/common/Container';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import { getWines } from '@/api/wines';
import {
  StyledWinePageDiv,
  StyledWraperImage,
  StyledWineInfo,
  StyledWineImg,
  WineDetailPageTabs,
  WineDescriptionContent,
  SliderSection,
  SliderTitle,
} from './WineDetailPage.styled';
import InfoButton from '@/components/buttons/InfoButton';

const WineDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [refreshReviews, setRefreshReviews] = useState(0);

  const wine = useWineDetailStore((s) => s.wine);
  const loading = useWineDetailStore((s) => s.loading);
  const error = useWineDetailStore((s) => s.error);
  const fetchWine = useWineDetailStore((s) => s.fetchWine);

  const { data: topWinesData, isLoading: isTopWinesLoading } = useQuery({
    queryKey: ['top-wines', wine?.color, wine?.sweetness],
    queryFn: () =>
      getWines({
        limit: 11,
        sortBy: 'averageRating_desc',
        color: wine?.color,
        sweetness: wine?.sweetness,
      }),
    enabled: !!wine,
  });

  const topWines =
    topWinesData?.data?.wines?.filter((w: any) => w._id !== wine?._id).slice(0, 10) || [];

  useEffect(() => {
    if (id) {
      fetchWine(id);
      window.scrollTo(0, 0);
    }
  }, [id, fetchWine]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wine) return <p>Wine not found</p>;

  return (
    <Container>
      <StyledWinePageDiv>
        <StyledWraperImage>
          <StyledWineImg src={wine.imageUrl} alt={wine.name} />
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
                <p>
                  <span className="description-label">Taste:</span>
                  {wine.tastingNotes?.[0] || '—'}
                </p>
                <p>
                  <span className="description-label">Color:</span>
                  {wine.color || '—'}
                </p>
                <p>
                  <span className="description-label">Aroma:</span>
                  {wine.tastingNotes?.[1] || '—'}
                </p>
                <p>
                  <span className="description-label">Gastronomy:</span>
                  {wine.foodPairing?.join(', ') || '—'}
                </p>

                <p className="description-title">
                  Why is it worth buying? {wine.description || '—'}
                </p>
              </>
            ) : (
              <>
                <WineReviews key={refreshReviews} wineId={wine._id} />
                <AddReviewForm
                  wineId={wine._id}
                  onReviewAdded={() => {
                    setRefreshReviews((prev) => prev + 1);
                    setActiveTab('reviews');
                    // Optionally re-fetch wine to update average rating
                    if (id) fetchWine(id);
                  }}
                />
              </>
            )}
          </WineDescriptionContent>
        </StyledWraperImage>

        <StyledWineInfo>
          <WineOverview wine={wine} />
        </StyledWineInfo>
      </StyledWinePageDiv>

      <SliderSection>
        {topWines.length > 0 && (
          <>
            <SliderTitle>
              Top Rated {wine.color} {wine.sweetness} Wines
            </SliderTitle>
            {isTopWinesLoading ? (
              <p style={{ textAlign: 'center' }}>Loading similar wines...</p>
            ) : (
              <Slider
                items={topWines}
                renderItem={(wineItem: any) => <SliderCardWine wine={wineItem} />}
              />
            )}
          </>
        )}
      </SliderSection>
    </Container>
  );
};

export default WineDetailPage;
