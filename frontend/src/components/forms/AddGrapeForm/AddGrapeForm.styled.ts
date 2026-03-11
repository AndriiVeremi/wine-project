import styled from 'styled-components';

export const AddGrapeWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: var(--white);
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
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

export const MiniPhotoPreview = styled.div`
  width: 145px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);

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
  width: 300px;
  height: 350px;
  border: 2px dashed var(--secondary-gray);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--tertiary-gray);
  transition: var(--transition);
  gap: 12px;
  overflow: hidden;

  &:hover {
    border-color: var(--primary-wine);
  }

  svg {
    font-size: 40px;
    color: var(--primary-wine);
  }

  span {
    font-size: 14px;
    color: #666;
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
