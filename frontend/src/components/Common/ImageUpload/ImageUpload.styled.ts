import styled from 'styled-components';

export const PhotoUploadContainer = styled.div`
  width: 100%;
  height: 320px;
  border: 2px dashed #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.3s ease;
  gap: 12px;
  overflow: hidden;

  &:hover {
    border-color: var(--accent-color, #841013);
  }

  svg {
    font-size: 40px;
    color: #aaa;
  }

  span {
    font-size: 14px;
    color: #aaa;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const MiniPhotoPreview = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
