import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWineryById } from '@/api/wineries';
import type { Winery } from '@/types/wineries';
import { useWinesStore } from '@/store/wine/winesStore';
import RatingStars from '@/components/common/RatingStars';
import { Loader } from '@/components/common/Loader';
import WineryMap from '@/components/Location/WineryMap';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import InfoButton from '@/components/buttons/InfoButton/InfoButton';
import { 
  HiMapPin, 
  HiGlobeAlt, 
  HiEnvelope, 
  HiPhone 
} from 'react-icons/hi2';

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
  TabButton,
  DescriptionText,
  SectionHeaderTitle,
  MapSection,
} from './WineryDetailPage.styled';

// Допоміжна функція для YouTube (на самому верху для уникнення помилок)
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

  const { wines, fetchWines, loading: winesLoading } = useWinesStore();

  // Фільтруємо вина за поточною виноробнею
  const wineryWines = wines;

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getWineryById(id);
        setWinery(response.data);
        await fetchWines({ wineryId: id, limit: 10 });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load winery details';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, fetchWines]);

  if (loading) return <Loader />;
  if (error) return <DetailPageContainer>Error: {error}</DetailPageContainer>;
  if (!winery) return <DetailPageContainer>Winery not found.</DetailPageContainer>;

  const galleryImages = [...(winery.logoUrl ? [winery.logoUrl] : []), ...(winery.galleryUrl || [])];

  if (galleryImages.length === 0) {
    galleryImages.push('/assets/winery-placeholder.png');
  }

  const thumbnails = galleryImages.slice(0, 4);

  return (
    <DetailPageContainer>
      <HeroSection>
        <GalleryWrapper>
          <MainBanner>
            <img src={galleryImages[activeImageIdx] || galleryImages[0]} alt={winery.name} />
          </MainBanner>

          <ThumbnailsGrid>
            {thumbnails.map((url, index) => (
              <Thumbnail
                key={index}
                $active={activeImageIdx === index}
                onClick={() => setActiveImageIdx(index)}
              >
                <img src={url} alt={`Thumbnail ${index}`} />
              </Thumbnail>
            ))}
          </ThumbnailsGrid>
        </GalleryWrapper>

        <WineryInfoBlock>
          <WineryNameTitle>{winery.name}</WineryNameTitle>

          <WineryHeaderRow>
            <WineryLogoInHeader>
              <img src={winery.logoUrl || '/assets/winery-placeholder.png'} alt="Winery Logo" />
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

          {getYouTubeEmbedUrl(winery.videoUrl) && (
            <VideoWrapper>
              <iframe
                src={getYouTubeEmbedUrl(winery.videoUrl)!}
                title="Winery Presentation Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoWrapper>
          )}
        </WineryInfoBlock>
      </HeroSection>

      <TabButtonsWrapper>
        <InfoButton 
          active={activeTab === 'description'} 
          onClick={() => setActiveTab('description')}
        >
          Description
        </InfoButton>
        <InfoButton 
          active={activeTab === 'reviews'} 
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </InfoButton>
      </TabButtonsWrapper>

      {activeTab === 'description' ? (
        <DescriptionText>
          {winery.history || 'No detailed description available for this winery yet.'}
        </DescriptionText>
      ) : (
        <div style={{ marginBottom: '80px' }}>
          <p>Reviews will be displayed here...</p>
        </div>
      )}

      <MapSection style={{ marginBottom: '80px' }}>
        {winery.coordinates ? (
          <WineryMap
            lat={winery.coordinates.lat}
            lng={winery.coordinates.lng}
            wineryName={winery.name}
          />
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
            Map location not available
          </div>
        )}
      </MapSection>

      {winesLoading ? (
        <p style={{ textAlign: 'center' }}>Loading bestsellers...</p>
      ) : (
        wineryWines.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <SectionHeaderTitle>Bestsellers</SectionHeaderTitle>
            <Slider items={wineryWines} renderItem={(wine) => <SliderCardWine wine={wine} />} />
          </section>
        )
      )}
    </DetailPageContainer>
  );
};

export default WineryDetailPage;
