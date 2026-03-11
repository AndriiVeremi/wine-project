import styled from 'styled-components';

export const DetailPageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const GalleryWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 584px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const Thumbnail = styled.div<{ $active?: boolean }>`
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? 'var(--accent-color, #841013)' : 'transparent')};
  transition: all 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const WineryInfoBlock = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const WineryNameTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 49px;
  font-weight: 600;
  color: var(--accent-color, #841013);
  margin: 0;
`;

export const WineryHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const WineryLogoInHeader = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #f9f9f9;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16 / 9;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #3f3f3f;

  svg {
    color: var(--accent-color, #841013);
    flex-shrink: 0;
  }
`;

export const TabButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  background: ${(props) =>
    props.$active ? 'rgba(132, 16, 19, 0.05)' : 'rgba(255, 255, 255, 0.54)'};
  border: 1px dashed ${(props) => (props.$active ? 'var(--accent-color, #841013)' : '#454443')};
  border-radius: 44px;
  padding: 16px 55px;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  color: ${(props) => (props.$active ? 'var(--accent-color, #841013)' : '#3f3f3f')};
  cursor: pointer;
  transition: all 0.2s;
`;

export const DescriptionText = styled.div`
  font-size: 19px;
  line-height: 1.6;
  color: #3f3f3f;
  margin-bottom: 80px;
  white-space: pre-wrap;
`;

export const SectionHeaderTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 49px;
  font-weight: 500;
  color: var(--accent-color, #841013);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

export const MapSection = styled.section`
  width: 100%;
  height: 632px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
