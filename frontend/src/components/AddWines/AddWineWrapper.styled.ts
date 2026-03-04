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
  border-bottom: 2px solid var(--primary-wine-light);
  padding-bottom: 10px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 440px 440px;
  column-gap: 50px;
  row-gap: 24px;
  justify-content: center;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin: 0 auto;
  }
`;

export const PhotoUploadWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

export const PhotoUploadContainer = styled.div`
  width: 405px;
  height: 405px;
  border: 1px dashed var(--secondary-gray);
  border-radius: var(--border-radius-in);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--secondary-gray-light);
  transition: var(--transition);
  gap: 12px;

  &:hover {
    border-color: var(--primary-wine);
    background-color: var(--primary-wine-light);
  }

  svg {
    font-size: 48px;
    color: var(--primary-wine);
  }

  span {
    font-family: var(--font-main);
    font-size: 16px;
    color: var(--primary-gray);
  }
`;

export const SectionTitle = styled.h3`
  grid-column: 1 / -1;
  font-family: var(--font-main);
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-wine);
  margin: 20px 0 10px 0;
  display: flex;
  align-items: center;
  gap: 15px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--secondary-gray);
  }
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const ButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;
