import styled from 'styled-components';

export const AddGrapeWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: var(--white);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h2`
  font-weight: 400;
  font-size: 28px;
  color: var(--primary-gray);
  margin-bottom: 50px;
  text-align: left;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

export const PhotoSide = styled.div`
  width: 400px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

export const MiniPhotoPreview = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoSide = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

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
`;

export const SectionTitle = styled.h3`
  grid-column: 1 / -1;
  font-size: 30px;
  color: var(--primary-gray);
  margin-bottom: 30px;
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const ButtonWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

export const TagSelectorContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 24px;
`;

export const SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  min-height: 40px;
  padding: 12px;
  background: #f9f9f9;
  border: 1px dashed #ddd;
  border-radius: 8px;
`;

export const TagGroup = styled.div`
  margin-bottom: 16px;
`;

export const GroupTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--font-grey);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagItem = styled.div<{ $selected: boolean }>`
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  background: ${(props) => (props.$selected ? 'var(--primary-wine, #841013)' : '#fff')};
  color: ${(props) => (props.$selected ? '#fff' : 'var(--primary-gray)')};
  border: 1px solid ${(props) => (props.$selected ? 'var(--primary-wine, #841013)' : '#e0e0e0')};
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-wine, #841013);
    background: ${(props) => (props.$selected ? '#6a0d10' : '#f5f5f5')};
  }
`;
