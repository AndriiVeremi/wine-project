import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export { InnerDecorativeBackground, BottomDecorativeBackground } from './Backgrounds.styled';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--bg-main);
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

export const PageTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: clamp(20px, 3vw, 40px);
  padding-bottom: clamp(40px, 8vw, 100px);
  position: relative;
  z-index: 1;
  pointer-events: none;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-main);
  font-size: clamp(24px, 5vw, 56px);
  font-weight: 700;
  color: var(--primary-wine);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const MainContent = styled.main<{ $isHome: boolean; $hasTitle: boolean }>`
  flex: 1;
  position: relative;
  z-index: 1;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 80vh;

  @media (min-width: ${breakpoints.desktop}) {
    padding-top: 80px;
    padding-bottom: 100px;
  }
`;

export const HomeBgLeft = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: clamp(350px, 38vw, 595px);
  width: auto;
  pointer-events: none;
  z-index: 0;
  object-fit: contain;

  @media (max-width: 1200px) {
    height: clamp(300px, 35vw, 500px);
  }

  @media (max-width: 900px) {
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    left: -10px;
    height: 200px;
  }
`;

export const HomeBgRight = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: clamp(350px, 38vw, 595px);
  width: auto;
  pointer-events: none;
  z-index: 0;
  object-fit: contain;

  @media (max-width: 1200px) {
    height: clamp(300px, 35vw, 500px);
  }

  @media (max-width: 900px) {
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    right: -10px;
    height: 200px;
  }
`;
