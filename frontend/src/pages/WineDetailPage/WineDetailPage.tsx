import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import WineOverview from '@/components/WineOverview/WineOverview';
import Container from '@/components/common/Container';
import {
  StyledWinePageDiv,
  StyledWraperImage,
  StyledWineInfo,
  StyledWineImg,
  WineDetailPageTabs,
} from './WineDetailPage.styled';
import InfoButton from '@/components/buttons/InfoButton';

const WineDetailPage = () => {
  const { id } = useParams();

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
            <InfoButton>Description</InfoButton>
            <InfoButton>Reviews</InfoButton>
          </WineDetailPageTabs>
        </StyledWraperImage>
        <StyledWineInfo>
          <WineOverview wine={wine} />
        </StyledWineInfo>
      </StyledWinePageDiv>
    </Container>
  );
};

export default WineDetailPage;
