import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import WineOverview from '@/components/WineOverview/WineOverview';
import WineReviews from '@/components/WineReviews';
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
              <WineReviews wineId={wine._id} />
            )}
          </WineDescriptionContent>
        </StyledWraperImage>

        <StyledWineInfo>
          <WineOverview wine={wine} />
        </StyledWineInfo>
      </StyledWinePageDiv>
    </Container>
  );
};

export default WineDetailPage;
