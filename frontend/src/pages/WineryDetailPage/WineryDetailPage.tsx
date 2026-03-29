import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { getWineryById } from '@/api/wineries';
import type { Winery } from '@/types/wineries';
import type { Wine } from '@/types/wine';
import { useWines } from '@/hooks/queries/useWines';
import RatingStars from '@/components/Common/RatingStars';
import { Loader } from '@/components/Common/Loader';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import InfoButton from '@/components/Buttons/InfoButton/InfoButton';
import ItemReviews from '@/components/Wine/WineReviews';
import AddReviewForm from '@/components/Forms/AddReviewForm/AddReviewForm';
import { HiMapPin, HiGlobeAlt, HiEnvelope, HiPhone } from 'react-icons/hi2';
import Container from '@/components/Common/Container';
import {
  DetailPageContainer,
  HeroSection,
  GalleryWrapper,
  MainBanner,
  ThumbnailsGrid,
  Thumbnail,
  WineryInfoBlock,
  WineryNameTitle,
  WineryHeaderRow,
  WineryLogoInHeader,
  ContactsList,
  VideoWrapper,
  InfoRow,
  TabButtonsWrapper,
  DescriptionText,
  SectionHeaderTitle,
  MapSection,
} from './WineryDetailPage.styled';
import Skeleton from '@/components/Common/Skeleton/Skeleton';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';

const WineryMap = lazy(() => import('@/components/Common/Location/WineryMap'));

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

const WineryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [winery, setWinery] = useState<Winery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const { data: winesData, isLoading: winesLoading } = useWines(
    id ? { wineryId: id, limit: 10 } : {},
  );

  const wines = winesData?.data?.wines || [];

  const loadWinery = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getWineryById(id);
      setWinery(response.data);
    } catch (err) {
      console.error('Failed to load winery:', err);
    }
  }, [id]);

  useEffect(() => {
    const loadAll = async () => {
      if (!id) return;
      try {
        setLoading(true);
        await loadWinery();
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [id, loadWinery]);

  if (loading) return <Loader isFullScreen={false} />;
  if (error || !winery)
    return (
      <Container>
        <p>Winery not found.</p>
      </Container>
    );

  const galleryImages =
    winery.galleryUrl && winery.galleryUrl.length > 0
      ? winery.galleryUrl
      : [winery.logoUrl || '/assets/winery-placeholder.png'];

  const thumbnails = galleryImages.slice(0, 4);

  return (
    <Container>
      <DetailPageContainer>
        <HeroSection>
          <GalleryWrapper>
            <MainBanner>
              <img src={galleryImages[activeImageIdx] || galleryImages[0]} alt={winery.name} />
            </MainBanner>
            {/* ... rest of gallery ... */}
            <ThumbnailsGrid>
              {thumbnails.map((url, index) => (
                <Thumbnail
                  key={index}
                  $active={activeImageIdx === index}
                  onClick={() => setActiveImageIdx(index)}
                >
                  <img src={url} alt="Thumbnail" />
                </Thumbnail>
              ))}
            </ThumbnailsGrid>
          </GalleryWrapper>
          <WineryInfoBlock>
            <WineryNameTitle>{winery.name}</WineryNameTitle>
            <WineryHeaderRow>
              <WineryLogoInHeader>
                <img src={winery.logoUrl || '/assets/winery-placeholder.png'} alt="Logo" />
              </WineryLogoInHeader>
              <ContactsList>
                <InfoRow>
                  <RatingStars
                    value={winery.averageRating ?? 0}
                    showLeftValue={true}
                    showRightReviews={true}
                    size={18}
                  />
                  <span style={{ color: '#3f3f3f', fontSize: '14px' }}>
                    ({winery.totalReviews || 0})
                  </span>
                </InfoRow>
                <InfoRow>
                  <HiMapPin size={20} />
                  {winery.address || 'Georgia'}
                </InfoRow>
                <InfoRow>
                  <HiGlobeAlt size={20} />
                  <a
                    href={winery.websiteUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {winery.websiteUrl
                      ? winery.websiteUrl.replace('https://', '')
                      : 'winery-website.com'}
                  </a>
                </InfoRow>
                <InfoRow>
                  <HiEnvelope size={20} />
                  {winery.contactEmail}
                </InfoRow>
                <InfoRow>
                  <HiPhone size={20} />
                  {winery.contactPhone}
                </InfoRow>
              </ContactsList>
            </WineryHeaderRow>
          </WineryInfoBlock>
          {getYouTubeEmbedUrl(winery.videoUrl) && (
            <VideoWrapper>
              <iframe src={getYouTubeEmbedUrl(winery.videoUrl)!} title="Video" allowFullScreen />
            </VideoWrapper>
          )}
        </HeroSection>
        <TabButtonsWrapper>
          <InfoButton
            active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            Description
          </InfoButton>
          <InfoButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
            Reviews
          </InfoButton>
        </TabButtonsWrapper>
        {activeTab === 'description' ? (
          <DescriptionText
            dangerouslySetInnerHTML={{ __html: winery.history || 'No description available.' }}
          />
        ) : (
          <div style={{ marginBottom: '80px' }}>
            <ItemReviews key={refresh} wineryId={winery._id} />
            <div style={{ height: '40px' }} />
            <AddReviewForm
              wineryId={winery._id}
              onReviewAdded={() => {
                setRefresh((prev) => prev + 1);
                loadWinery();
              }}
            />
          </div>
        )}
        <MapSection style={{ marginBottom: '80px' }}>
          {winery.coordinates ? (
            <Suspense
              fallback={
                <div style={{ width: '100%', height: '300px' }}>
                  <Skeleton height="100%" $borderRadius="12px" />
                </div>
              }
            >
              <WineryMap
                lat={winery.coordinates.lat}
                lng={winery.coordinates.lng}
                wineryName={winery.name}
              />
            </Suspense>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
              }}
            >
              Map not available
            </div>
          )}
        </MapSection>
        {(wines.length > 0 || winesLoading) && (
          <section style={{ marginBottom: '40px' }}>
            <SectionHeaderTitle>Bestsellers</SectionHeaderTitle>
            <Slider
              items={wines.slice(0, 8)}
              isLoading={winesLoading}
              renderSkeleton={() => <WineCardSkeleton />}
              renderItem={(wine: Wine) => <SliderCardWine wine={wine} />}
            />
          </section>
        )}
      </DetailPageContainer>
    </Container>
  );
};

export default WineryDetailPage;
