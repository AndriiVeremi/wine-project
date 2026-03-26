import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import { useAuthStore } from '@/store/auth/authStore';
import WineOverview from '@/components/Wine/WineOverview/WineOverview';
import WineReviews from '@/components/Wine/WineReviews';
import AddReviewForm from '@/components/Forms/AddReviewForm/AddReviewForm';
import Container from '@/components/Common/Container';
import AuthModal from '@/components/Common/AuthModal/AuthModal';
import AddWines from '@/components/Forms/AddWinesForm/AddWinesForm';
import { HiPencilSquare } from 'react-icons/hi2';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import { getWines } from '@/api/wines';
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
} from './WineDetailPage.styled';
import InfoButton from '@/components/Buttons/InfoButton';

const WineDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { profile } = useAuthStore();
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
    topWinesData?.data?.wines?.filter((w: Wine) => w._id !== wine?._id).slice(0, 10) || [];

  useEffect(() => {
    if (id) {
      fetchWine(id);
      window.scrollTo(0, 0);
    }
  }, [id, fetchWine]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wine) return <p>Wine not found</p>;

  const isAdmin = profile?.role === 'ADMIN';
  const wineryOwnerId =
    typeof wine.winery === 'object'
      ? (wine.winery.owner as { _id: string })?._id || (wine.winery.owner as string)
      : null;
  const isOwner = profile?._id === wineryOwnerId;
  const canEdit = isAdmin || isOwner;

  return (
    <Container>
      <StyledWinePageDiv>
        <StyledWraperImage>
          {canEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #841013',
                background: 'white',
                color: '#841013',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <HiPencilSquare size={20} />
              EDIT
            </button>
          )}
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

              <div className="description-title">
                Why is it worth buying?
                <div dangerouslySetInnerHTML={{ __html: wine.description || '—' }} />
              </div>
            </>
          ) : (
            <>
              <WineReviews key={refreshReviews} wineId={wine._id} />
              <AddReviewForm
                wineId={wine._id}
                onReviewAdded={() => {
                  setRefreshReviews((prev) => prev + 1);
                  setActiveTab('reviews');
                  if (id) fetchWine(id);
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
              isLoading={isTopWinesLoading && topWines.length === 0}
              renderSkeleton={() => <WineCardSkeleton />}
              renderItem={(wineItem: Wine) => <SliderCardWine wine={wineItem} />}
            />
          </>
        )}
      </SliderSection>

      {isEditModalOpen && (
        <AuthModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Wine"
        >
          <div style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
            <AddWines
              wineData={wine}
              onSuccess={() => {
                setIsEditModalOpen(false);
                if (id) fetchWine(id);
              }}
            />
          </div>
        </AuthModal>
      )}
    </Container>
  );
};

export default WineDetailPage;
