import styled from 'styled-components';

export const UploadGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  align-items: center;
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

  &:hover {
    border-color: var(--accent-color, #841013);
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
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
`;

export const GalleryItem = styled.div`
  aspect-ratio: 1 / 1;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
