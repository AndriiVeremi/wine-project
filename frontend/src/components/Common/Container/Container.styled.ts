import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;

  @media (min-width: ${breakpoints.mobile}) {
    max-width: 480px;
    padding: 0 20px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 768px;
    padding: 0 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 1280px;
    padding: 0 30px;
  }

  @media (min-width: ${breakpoints.largeDesktop}) {
    max-width: 1440px;
    padding: 0 40px;
  }
`;
