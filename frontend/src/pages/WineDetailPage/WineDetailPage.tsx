import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';
import WineOverview from '@/components/WineOverview/WineOverview';
import { StyledWinePageDiv, StyledWraperImage, StyledWineInfo } from './WineDetailPage.styled';

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
    <StyledWinePageDiv>
      <StyledWraperImage>
        <img src={wine.imageUrl} alt={wine.name} />
      </StyledWraperImage>
      <StyledWineInfo>
        <WineOverview wine={wine} />
      </StyledWineInfo>
    </StyledWinePageDiv>
  );
};

export default WineDetailPage;
