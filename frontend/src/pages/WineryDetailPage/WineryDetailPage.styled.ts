import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
import { htmlContentStyles } from '@/styles/htmlContent';

export const DetailPageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;

  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-areas:
      'gallery info'
      'gallery video';
    align-items: start;
    gap: 48px;
  }
`;

export const GalleryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  order: 2;

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: gallery;
    order: unset;
  }
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 450px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 584px;
  }
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const Thumbnail = styled.div<{ $active?: boolean }>`
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? 'var(--accent-color, #841013)' : 'transparent')};
  transition: all 0.2s;

  @media (min-width: ${breakpoints.tablet}) {
    height: 120px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const WineryInfoBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  order: 1;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: info;
    order: unset;
    padding: 32px;
  }
`;

export const WineryNameTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--accent-color, #841013);
  margin: 0;
  line-height: 1.1;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 40px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 49px;
  }
`;

export const WineryHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 40px;
  }
`;

export const WineryLogoInHeader = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    width: 150px;
    height: 150px;
  }

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
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16 / 9;
  order: 3;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: video;
    margin-top: 0;
    order: unset;
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
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;

  button {
    width: 100%;
  }

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 24px;

    button {
      width: auto;
      min-width: 350px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    button {
      min-width: 316px;
    }
  }
`;

export const DescriptionText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #3f3f3f;
  margin-bottom: 60px;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow-wrap: break-word;
  word-break: break-word;

  ${htmlContentStyles}

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
    padding: 32px;
    margin-bottom: 80px;
  }
`;

export const SectionHeaderTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 500;
  color: var(--accent-color, #841013);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 49px;
  }
`;

export const MapSection = styled.section`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 60px;

  @media (min-width: ${breakpoints.tablet}) {
    height: 632px;
    margin-top: 80px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
