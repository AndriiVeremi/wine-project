import { useState } from 'react';
import { getTourById } from '@/api/tours';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GalleryWrapper, MainBanner, ThumbnailsGrid, Thumbnail } from './WineTourDetailPage.styled';
import Container from '@/components/common/Container';

const WineTourDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: tour, isLoading } = useQuery({
    queryKey: ['tour', id],
    queryFn: async () => {
      const res = await getTourById(id!);
      return res.data; // ← тепер повертаємо чистий Tour
    },
    enabled: !!id,
  });

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (!tour) return <p>Tour not found</p>;

  const galleryImages = tour.images || [];

  return (
    <Container>
      <GalleryWrapper>
        <MainBanner>
          <img src={galleryImages[activeImageIdx] || galleryImages[0]} alt={tour.name} />
        </MainBanner>

        <ThumbnailsGrid>
          {galleryImages.map((url, index) => (
            <Thumbnail
              key={index}
              $active={activeImageIdx === index}
              onClick={() => setActiveImageIdx(index)}
            >
              <img src={url} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}
        </ThumbnailsGrid>
      </GalleryWrapper>
      <p>{tour.name}</p>
      <p>{tour.description}</p>
    </Container>
  );
};

export default WineTourDetailPage;
