import styled from 'styled-components';

export const AccountPageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 60px 0;
  width: 100%;
  margin: 0 auto;
  align-items: flex-start;
`;

export const ContentArea = styled.main`
  flex: 1;
  min-height: 500px;
  overflow-x: hidden;
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  color: var(--primary-gray);
  margin-bottom: 50px;
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
