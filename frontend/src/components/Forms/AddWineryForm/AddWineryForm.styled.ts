import styled from 'styled-components';

export const StyledAddWineryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: var(--modal-shadow);
  border: 1px solid var(--tertiary-gray);
`;

export const TopSection = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 24px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: stretch;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const MapInstruction = styled.p`
  font-size: 14px;
  color: var(--secondary-gray);
  margin-bottom: 12px;
  span {
    color: var(--primary-wine);
    font-weight: 600;
  }
`;

export const MapFieldWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  border: 1px solid var(--tertiary-gray);
  margin-top: 16px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-gray);
  }

  select {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid var(--tertiary-gray);
    background: var(--white);
    font-size: 16px;
    color: var(--black-icon);
    outline: none;
    transition: var(--transition-fast);

    &:focus {
      border-color: var(--primary-wine);
    }

    &:disabled {
      background: var(--tertiary-gray);
      cursor: not-allowed;
    }
  }

  span {
    color: var(--error);
    font-size: 12px;
  }
`;
