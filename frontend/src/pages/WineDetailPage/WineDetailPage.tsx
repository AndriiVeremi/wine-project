import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import WineOverview from '@/components/WineOverview/WineOverview';
import WineReviews from '@/components/WineReviews';
import AddReviewForm from '@/components/AddReviewForm/AddReviewForm';
import Container from '@/components/common/Container';
import {
  StyledWinePageDiv,
  StyledWraperImage,
  StyledWineInfo,
  StyledWineImg,
  WineDetailPageTabs,
  WineDescriptionContent,
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

  useEffect(() => {
    if (id) fetchWine(id);
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
            <InfoButton onClick={() => setActiveTab('description')}>Description</InfoButton>
            <InfoButton onClick={() => setActiveTab('reviews')}>Reviews</InfoButton>
          </WineDetailPageTabs>

          <WineDescriptionContent>
            {activeTab === 'description' ? (
              <p>{wine.description}</p>
            ) : (
              <WineReviews key={refreshReviews} wineId={wine._id} />
            )}
          </WineDescriptionContent>

          <AddReviewForm
            wineId={wine._id}
            onReviewAdded={() => {
              setRefreshReviews((prev) => prev + 1);
              setActiveTab('reviews');
              // Optionally re-fetch wine to update average rating
              if (id) fetchWine(id);
            }}
          />
        </StyledWraperImage>

        <StyledWineInfo>
          <WineOverview wine={wine} />
        </StyledWineInfo>
      </StyledWinePageDiv>
    </Container>
  );
};

export default WineDetailPage;
