import styled from 'styled-components';

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
`;

export const Thumbnail = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
