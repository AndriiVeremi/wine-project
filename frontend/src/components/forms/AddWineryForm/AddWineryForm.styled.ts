import styled from 'styled-components';

export const StyledAddWineryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const TopSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PhotoSide = styled.div`
  width: 400px;
  flex-shrink: 0;
`;

export const InfoSide = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FullWidthWrapper = styled.div`
  @media screen and (min-width: 768px) {
    grid-column: 1 / -1;
  }
`;

export const MapInstruction = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  span {
    color: var(--accent-color, #841013);
    font-weight: 600;
  }
`;

export const MapFieldWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
`;
