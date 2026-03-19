import styled from 'styled-components';

export const AddGrapeWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const PhotoSide = styled.div`
  width: 340px;
  flex-shrink: 0;

  @media (max-width: 950px) {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const InfoSide = styled.div`
  flex-grow: 1;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 24px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h3`
  grid-column: 1 / -1;
  font-size: 30px;
  font-weight: 400;
  color: #841013;
  margin: 40px 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TagBox = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  transition: all 0.2s;

  &:hover {
    border-color: #841013;
  }

  h4 {
    font-family: var(--font-main);
    font-weight: 600;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 16px;
  }
`;

export const TagInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  margin-top: 16px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    border-color: #841013;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }
`;

export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const TagItem = styled.span<{ $selected?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  ${(props) =>
    props.$selected &&
    `
    background: #fffafa;
    color: #841013;
    border-color: #841013;
    font-weight: 600;
  `}

  &:hover {
    border-color: #841013;
    color: #841013;
    background: #fffafa;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;
