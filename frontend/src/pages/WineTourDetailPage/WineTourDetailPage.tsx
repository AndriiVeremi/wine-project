import { useState } from 'react';
import { getTourById, getTours } from '@/api/tours';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  TourDetailContainer,
  MainContentWrapper,
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
  MobileBookingCard,
  PriceRow,
  FeatureList,
  FeatureItem,
  SliderSection,
  SectionHeaderTitle,
} from './WineTourDetailPage.styled';
import Container from '@/components/Common/Container';
import RatingStars from '@/components/Common/RatingStars';
import { FiClock, FiUsers, FiCheckCircle, FiShield, FiMapPin } from 'react-icons/fi';
import MainButton from '@/components/Buttons/MainButton';
import { Loader } from '@/components/Common/Loader';
import ItemReviews from '@/components/Wine/WineReviews';
import AddReviewForm from '@/components/Forms/AddReviewForm/AddReviewForm';
import { useAuthStore } from '@/store/auth/authStore';
import WineryContactModal from '@/components/Common/WineryContactModal/WineryContactModal';
import type { Winery } from '@/types/wineries';
import Slider from '@/components/Slider/Slider';
import SliderCardTour from '@/components/Slider/cards/SliderCardTour';
import TourCardSkeleton from '@/components/Common/Skeleton/TourCardSkeleton';

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

  const { data: allToursData, isLoading: isLoadingAllTours } = useQuery({
    queryKey: ['all-tours-for-slider'],
    queryFn: () => getTours({ limit: 50 }),
    enabled: !!id,
  });

  const otherTours =
    allToursData?.data?.tours?.filter((t: { _id: string }) => t._id !== id).slice(0, 8) || [];

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
        <TourHeader>
          <TourTitle>{tour.name}</TourTitle>
          <TourSubtitle>
            <RatingStars value={tour.averageRating} reviews={tour.totalReviews} showRightReviews />
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiMapPin /> {(winery?.region as { name?: string })?.name || 'Georgia'}
            </span>
          </TourSubtitle>
        </TourHeader>

        <MainContentWrapper>
          <MainContent>
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

            <SpecsGrid style={{ marginTop: '20px', marginBottom: '10px' }}>
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
                <div className="value">
                  {(winery?.region as { name?: string })?.name || 'Local'}
                </div>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: tour.description || 'No description available.',
                }}
              />
            </DescriptionBox>

            <MobileBookingCard>
              <PriceRow>
                <div className="label">Price per person</div>
                <div className="amount">${tour.price}</div>
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
            </MobileBookingCard>

            <DescriptionBox>
              <h2>Reviews</h2>
              <ItemReviews tourId={id} key={reviewsKey} />
              <div style={{ marginTop: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>Leave a review</h2>
                <AddReviewForm tourId={id} onReviewAdded={handleReviewAdded} />
              </div>
            </DescriptionBox>
          </MainContent>

          <Sidebar>
            <BookingCard>
              <PriceRow>
                <div className="label">Price per person</div>
                <div className="amount">${tour.price}</div>
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
        </MainContentWrapper>

        {winery && (
          <WineryContactModal
            winery={winery}
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        )}

        {(otherTours.length > 0 || isLoadingAllTours) && (
          <SliderSection>
            <SectionHeaderTitle>More tours</SectionHeaderTitle>
            <Slider
              items={otherTours}
              isLoading={isLoadingAllTours && otherTours.length === 0}
              renderSkeleton={() => <TourCardSkeleton />}
              renderItem={(t) => <SliderCardTour tour={t} />}
            />
          </SliderSection>
        )}
      </TourDetailContainer>
    </Container>
  );
};

export default WineTourDetailPage;
