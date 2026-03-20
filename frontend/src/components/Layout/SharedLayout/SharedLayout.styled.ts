import styled from 'styled-components';

export {
  HomeDecorativeBackground,
  InnerDecorativeBackground,
  BottomDecorativeBackground,
} from './Backgrounds.styled';

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
`;
