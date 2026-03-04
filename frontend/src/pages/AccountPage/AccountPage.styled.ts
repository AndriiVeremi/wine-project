import styled from 'styled-components';

export const AccountPageContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 60px 0;
  width: 100%;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 1280px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  background-color: var(--white);
  border-radius: var(--border-radius-in);
  padding: 30px;
  border: 1px solid var(--secondary-gray);
  min-height: 500px;
  overflow-x: hidden;
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-main);
  font-size: 28px;
  font-weight: 500;
  color: var(--primary-gray);
  margin-bottom: 30px;
`;

export const PlaceholderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--primary-gray-light);
  font-family: var(--font-main);
  font-size: 18px;
  text-align: center;
`;
