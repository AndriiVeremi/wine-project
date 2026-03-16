import styled from 'styled-components';
import homeBg from '@/assets/home-bg.svg';
import innerBg from '@/assets/home-bg-alternative.png';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--bg-main);
`;

export const DecorativeBackground = styled.div<{ $bgType: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $bgType }) => ($bgType === 'home' ? '700px' : '400px')};
  z-index: 0;
  pointer-events: none;

  background-image: ${({ $bgType }) => {
    if ($bgType === 'home') return `url(${homeBg})`;
    if ($bgType === 'inner') return `url(${innerBg})`;
    return 'none';
  }};

  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;

  @media (max-width: 1024px) {
    background-size: cover;
    height: ${({ $bgType }) => ($bgType === 'home' ? '500px' : '300px')};
  }

  @media (max-width: 767px) {
    background-size: cover;
    background-position: center top;
    height: ${({ $bgType }) => ($bgType === 'home' ? '400px' : '250px')};
  }
`;

export const PageTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;
  pointer-events: none;

  @media (max-width: 1024px) {
    padding-top: 40px;
  }

  @media (max-width: 767px) {
    padding-top: 30px;
  }
`;

export const PageTitle = styled.h1`
  font-family: var(--font-main);
  font-size: 56px;
  font-weight: 700;
  color: var(--primary-wine);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 1024px) {
    font-size: 42px;
  }

  @media (max-width: 767px) {
    font-size: 28px;
    letter-spacing: 1px;
  }
`;

export const MainContent = styled.main<{ $isHome: boolean; $hasTitle: boolean }>`
  flex: 1;
  position: relative;
  z-index: 1;
  padding-top: ${({ $isHome, $hasTitle }) => ($isHome ? '100px' : $hasTitle ? '150px' : '300px')};

  @media (max-width: 1024px) {
    padding-top: ${({ $isHome }) => ($isHome ? '60px' : '80px')};
  }

  @media (max-width: 767px) {
    padding-top: ${({ $isHome }) => ($isHome ? '0px' : '40px')};
  }
`;
