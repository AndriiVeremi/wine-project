import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  /* Mobile Fluid (0 - 480px) */
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0 15px;
  }

  /* Breakpoint Mobile Large (481px - 767px) */
  @media (min-width: 481px) {
    max-width: 480px;
  }

  /* Breakpoint Tablet (768px - 1279px) */
  @media (min-width: 768px) {
    max-width: 768px;
    padding: 0 24px;
  }

  /* Breakpoint Desktop (1280px - 1439px) */
  @media (min-width: 1280px) {
    max-width: 1280px;
    padding: 0 48px;
  }

  /* Breakpoint Large Desktop (1440px+) */
  @media (min-width: 1440px) {
    max-width: 1440px;
    padding: 0 64px;
  }
`;
