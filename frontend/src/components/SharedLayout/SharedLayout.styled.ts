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
  background-size: 100% auto;
  background-position: top center;
  background-attachment: scroll;

  @media (max-width: 1024px) {
    background-size: cover;
  }

  @media (max-width: 767px) {
    background-position: 20% 0;
  }
`;
