import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;

  /* Mobile */
  @media (max-width: 480px) {
    padding: 0 16px;
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1279px) {
    max-width: 768px;
    padding: 0 24px;
  }

  /* Desktop */
  @media (min-width: 1280px) and (max-width: 1439px) {
    max-width: 1280px;
    padding: 0 48px;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    max-width: 1440px;
    padding: 0 64px;
  }
`;
