import styled from 'styled-components';

export const AccountPageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 0 100px;
  width: 100%;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 0 60px;
    gap: 32px;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  width: 100%;
  padding: 0;
  min-height: 500px;
  overflow-x: hidden;

  @media (min-width: 1025px) {
    padding: 0 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  color: var(--primary-gray);
  margin-bottom: 40px;

  @media (max-width: 767px) {
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
`;

export const PlaceholderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--primary-gray-light);
  font-size: 18px;
  text-align: center;
`;
