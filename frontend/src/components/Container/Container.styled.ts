import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 375px) {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (min-width: 375px) and (max-width: 1280px) {
    max-width: 375px;
  }

  @media (min-width: 1280px) {
    max-width: 1440px;
    padding: 0 64px;
  }
`;
