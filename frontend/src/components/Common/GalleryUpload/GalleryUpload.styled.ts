import styled from 'styled-components';

export const UploadGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  margin: 0 auto;
`;

export const MainPhotoContainer = styled.div`
  width: 100%;
  height: 320px;
  border: 2px dashed #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #fff;

  @media (max-width: 480px) {
    height: 240px;
  }

  &:hover {
    border-color: #841013;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    font-size: 14px;
    color: #aaa;
    margin-top: 8px;
  }
`;

export const GalleryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

export const GalleryItem = styled.div<{ $hasImage?: boolean }>`
  aspect-ratio: 1 / 1;
  border: ${({ $hasImage }) => ($hasImage ? '1px solid #eee' : '1px dashed #ccc')};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ $hasImage }) => ($hasImage ? '#fff' : '#fafafa')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s;

  &:hover {
    border-color: #841013;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .empty-slot {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ccc;

    &:hover {
      color: #841013;
    }
  }

  .remove-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(132, 16, 19, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    z-index: 2;

    &:hover {
      background: #841013;
    }
  }
`;

export const AddMoreBtn = styled.div`
  aspect-ratio: 1 / 1;
  border: 1px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ccc;
  background-color: #fafafa;
  transition: all 0.2s;

  &:hover {
    border-color: var(--accent-color, #841013);
    color: var(--accent-color, #841013);
    background-color: #fff;
  }
`;
