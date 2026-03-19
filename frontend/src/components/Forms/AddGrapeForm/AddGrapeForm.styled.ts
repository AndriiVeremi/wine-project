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
  font-size: 14px;
  font-weight: 800;
  color: #94a3b8;
  margin: 40px 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 16px;

  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f1f5f9;
  }
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
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
`;

export const TagInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  margin-top: 16px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    border-color: #841013;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.05);
  }
`;

export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const TagItem = styled.span<{ $selected?: boolean }>`
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 6px;

  ${(props) =>
    props.$selected &&
    `
    background: #fff1f2;
    color: #841013;
    border-color: #fecaca;
  `}

  &:hover {
    transform: translateY(-1px);
    border-color: #841013;
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
