import { useState } from 'react';
import { getTourById } from '@/api/tours';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  TourDetailContainer,
  MainContent,
  GallerySection,
  MainBanner,
  ThumbnailsGrid,
  Thumbnail,
  TourHeader,
  TourTitle,
  TourSubtitle,
  SpecsGrid,
  SpecItem,
  DescriptionBox,
  Sidebar,
  BookingCard,
  PriceRow,
  FeatureList,
  FeatureItem,
} from './WineTourDetailPage.styled';
import Container from '@/components/common/Container';
import RatingStars from '@/components/common/RatingStars';
import { FiClock, FiUsers, FiCheckCircle, FiShield, FiMapPin } from 'react-icons/fi';
import MainButton from '@/components/buttons/MainButton';
import { Loader } from '@/components/common/Loader';
import ItemReviews from '@/components/WineReviews';
import AddReviewForm from '@/components/forms/AddReviewForm/AddReviewForm';
import { useAuthStore } from '@/store/auth/authStore';
import WineryContactModal from '@/components/common/WineryContactModal/WineryContactModal';
import type { Winery } from '@/types/wineries';

const WineTourDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [reviewsKey, setReviewsKey] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useAuthStore();

  const {
    data: tour,
    isLoading,
    refetch: refetchTour,
  } = useQuery({
    queryKey: ['tour', id],
    queryFn: async () => {
      const res = await getTourById(id!);
      return res.data;
    },
    enabled: !!id,
  });

  const handleReviewAdded = () => {
    setReviewsKey((prev) => prev + 1);
    refetchTour();
  };

  const handleBookingClick = () => {
    setIsContactModalOpen(true);
  };

  if (isLoading) return <Loader />;
  if (!tour)
    return (
      <Container>
        <p>Tour not found</p>
      </Container>
    );

  const galleryImages = tour.images || [];
  const winery = typeof tour.winery === 'object' ? (tour.winery as unknown as Winery) : null;

  return (
    <Container>
      <TourDetailContainer>
        <MainContent>
          <TourHeader>
            <TourSubtitle>
              <RatingStars
                value={tour.averageRating}
                reviews={tour.totalReviews}
                showRightReviews
              />
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FiMapPin /> {(winery?.region as { name?: string })?.name || 'Georgia'}
              </span>
            </TourSubtitle>
            <TourTitle>{tour.name}</TourTitle>
          </TourHeader>

          <GallerySection>
            <MainBanner>
              <img src={galleryImages[activeImageIdx] || galleryImages[0]} alt={tour.name} />
            </MainBanner>

            {galleryImages.length > 1 && (
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
            )}
          </GallerySection>

          <SpecsGrid>
            <SpecItem>
              <div className="icon">
                <FiClock />
              </div>
              <div className="label">Duration</div>
              <div className="value">{tour.duration} Hours</div>
            </SpecItem>
            <SpecItem>
              <div className="icon">
                <FiUsers />
              </div>
              <div className="label">Group Size</div>
              <div className="value">
                {tour.groupSize.min}-{tour.groupSize.max} Pers.
              </div>
            </SpecItem>
            <SpecItem>
              <div className="icon">
                <FiMapPin />
              </div>
              <div className="label">Region</div>
              <div className="value">{(winery?.region as { name?: string })?.name || 'Local'}</div>
            </SpecItem>
            <SpecItem>
              <div className="icon">
                <FiShield />
              </div>
              <div className="label">Safety</div>
              <div className="value">Certified</div>
            </SpecItem>
          </SpecsGrid>

          <DescriptionBox>
            <h2>About this tour</h2>
            <p>{tour.description}</p>
          </DescriptionBox>

          <DescriptionBox>
            <h2>Reviews</h2>
            <ItemReviews tourId={id} key={reviewsKey} />
          </DescriptionBox>

          <DescriptionBox>
            <h2>Leave a review</h2>
            <AddReviewForm tourId={id} onReviewAdded={handleReviewAdded} />
          </DescriptionBox>
        </MainContent>

        <Sidebar>
          <BookingCard>
            <PriceRow>
              <div className="label">Price per person</div>
              <div className="amount">£{tour.price}</div>
            </PriceRow>

            <FeatureList>
              <FeatureItem>
                <FiCheckCircle /> Professional wine guide
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> Tasting of 5 premium wines
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> Traditional Georgian snacks
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> Free cancellation (24h)
              </FeatureItem>
            </FeatureList>

            <MainButton size="large" onClick={handleBookingClick}>
              Book This Tour
            </MainButton>

            <p style={{ fontSize: '12px', color: 'var(--secondary-gray)', textAlign: 'center' }}>
              No hidden fees. Instant confirmation.
            </p>
          </BookingCard>
        </Sidebar>
      </TourDetailContainer>

      {winery && (
        <WineryContactModal
          winery={winery}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default WineTourDetailPage;
