import styled from 'styled-components';
import homeBg from '@/assets/home-bg.svg';
import innerBg from '@/assets/home-bg-alternative.png';

export const LayoutWrapper = styled.div<{ $bgType: string }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;

  background-image: ${({ $bgType }) => {
    if ($bgType === 'home') return `url(${homeBg})`;
    if ($bgType === 'inner') return `url(${innerBg})`;
    return 'none';
  }};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: 1024px) {
    background-size: cover;
  }

  @media (max-width: 767px) {
    background-position: 20% 0;
  }
`;

export const PageTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 20px;
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
