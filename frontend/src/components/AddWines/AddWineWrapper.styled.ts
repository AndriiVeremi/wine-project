import styled from 'styled-components';

export const AddWineWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: var(--white);
`;

export const Title = styled.h2`
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 28px;
  color: var(--primary-gray);
  margin-bottom: 40px;
  text-align: left;
  border-bottom: 2px solid var(--tertiary-gray);
  padding-bottom: 10px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PhotoSide = styled.div`
  flex-shrink: 0;
`;

export const InfoSide = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
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
  border: 1px dashed var(--secondary-gray);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f9f9f9;
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
  font-size: 20px;
  color: var(--primary-wine);
  margin: 20px 0 10px 0;
  border-bottom: 1px solid var(--tertiary-gray);
  padding-bottom: 5px;
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--primary-gray);

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
