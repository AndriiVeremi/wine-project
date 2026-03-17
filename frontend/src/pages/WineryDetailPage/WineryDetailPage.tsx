import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getWineryById } from '@/api/wineries';
import type { Winery } from '@/types/wineries';
import { useWinesStore } from '@/store/wine/winesStore';
import RatingStars from '@/components/Common/RatingStars';
import { Loader } from '@/components/Common/Loader';
import WineryMap from '@/components/Common/Location/WineryMap';
import Slider from '@/components/Slider/Slider';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import InfoButton from '@/components/Buttons/InfoButton/InfoButton';
import ItemReviews from '@/components/Wine/WineReviews';
import AddReviewForm from '@/components/Forms/AddReviewForm/AddReviewForm';
import { HiMapPin, HiGlobeAlt, HiEnvelope, HiPhone } from 'react-icons/hi2';
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
  const { wines, fetch, loading: winesLoading } = useWinesStore();
  const loadWinery = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getWineryById(id);
      setWinery(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);
  useEffect(() => {
    const loadAll = async () => {
      if (!id) return;
      try {
        setLoading(true);
        await loadWinery();
        await fetch({ wineryId: id, limit: 10 });
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [id, fetch, loadWinery]);
  if (loading) return <Loader />;
  if (error || !winery) return <DetailPageContainer>Winery not found.</DetailPageContainer>;
  const galleryImages = [...(winery.logoUrl ? [winery.logoUrl] : []), ...(winery.galleryUrl || [])];
  if (galleryImages.length === 0) galleryImages.push('/assets/winery-placeholder.png');
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
        <DescriptionText>{winery.history || 'No description available.'}</DescriptionText>
      ) : (
        <div style={{ marginBottom: '80px' }}>
          <ItemReviews key={refresh} wineryId={winery._id} />
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
            Map not available
          </div>
        )}
      </MapSection>
      {winesLoading ? (
        <p style={{ textAlign: 'center' }}>Loading bestsellers...</p>
      ) : (
        wines.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <SectionHeaderTitle>Bestsellers</SectionHeaderTitle>
            <Slider items={wines} renderItem={(wine) => <SliderCardWine wine={wine} />} />
          </section>
        )
      )}
    </DetailPageContainer>
  );
};
export default WineryDetailPage;
