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
  HighlightCard,
} from './WineTourDetailPage.styled';
import Container from '@/components/Common/Container';
import RatingStars from '@/components/Common/RatingStars';
import {
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiShield,
  FiMapPin,
  FiCalendar,
  FiMap,
} from 'react-icons/fi';
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
            <span style={{ color: '#ddd' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <FiMapPin color="var(--primary-wine)" />{' '}
              {(winery?.region as { name?: string })?.name || 'Georgia'}
            </span>
          </TourSubtitle>
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

        <Sidebar>
          <BookingCard>
            <PriceRow>
              <div className="label">Price per guest</div>
              <div className="amount">₾ {tour.price}</div>
            </PriceRow>

            <div className="guarantee-box">
              <FiCalendar size={20} />
              <span>Flexible booking - reserve now, pay later</span>
            </div>

            <FeatureList>
              <FeatureItem>
                <FiCheckCircle /> **Professional** wine expert guide
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> **Exclusive** winery access
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> **Full** tasting experience
              </FeatureItem>
              <FeatureItem>
                <FiCheckCircle /> **No** hidden service fees
              </FeatureItem>
            </FeatureList>

            <MainButton size="large" onClick={handleBookingClick}>
              Book This Tour
            </MainButton>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <FiShield /> Secure payment & 24h cancellation
              </p>
            </div>
          </BookingCard>
        </Sidebar>

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
            <div className="label">Group</div>
            <div className="value">Up to {tour.groupSize.max}</div>
          </SpecItem>
          <SpecItem>
            <div className="icon">
              <FiMap />
            </div>
            <div className="label">Type</div>
            <div className="value">Winery Visit</div>
          </SpecItem>
          <SpecItem>
            <div className="icon">
              <FiShield />
            </div>
            <div className="label">Safety</div>
            <div className="value">Verified</div>
          </SpecItem>
        </SpecsGrid>

        <HighlightCard>
          <h2>Experience Highlights</h2>
          <div
            style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--primary-gray)' }}
            dangerouslySetInnerHTML={{
              __html: tour.description || 'No description available.',
            }}
          />
        </HighlightCard>

        <MobileBookingCard>
          <PriceRow>
            <div className="label">Price per person</div>
            <div className="amount">₾ {tour.price}</div>
          </PriceRow>

          <FeatureList>
            <FeatureItem>
              <FiCheckCircle /> Professional wine guide
            </FeatureItem>
            <FeatureItem>
              <FiCheckCircle /> Private winery session
            </FeatureItem>
            <FeatureItem>
              <FiCheckCircle /> 5-7 Premium wine tastings
            </FeatureItem>
            <FeatureItem>
              <FiCheckCircle /> Traditional appetizers
            </FeatureItem>
          </FeatureList>

          <MainButton size="large" onClick={handleBookingClick}>
            Book This Tour
          </MainButton>
        </MobileBookingCard>

        <DescriptionBox>
          <h2 style={{ fontSize: '28px', marginBottom: '32px', color: 'var(--primary-wine)' }}>
            Guest Reviews
          </h2>
          <ItemReviews tourId={id} key={reviewsKey} />
          <div
            style={{
              marginTop: '60px',
              padding: '40px',
              background: '#f8fafc',
              borderRadius: '24px',
            }}
          >
            <h3 style={{ fontSize: '22px', marginBottom: '24px' }}>Share your experience</h3>
            <AddReviewForm tourId={id} onReviewAdded={handleReviewAdded} />
          </div>
        </DescriptionBox>

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
