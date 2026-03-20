import styled from 'styled-components';

import homeBgLeft from '@/assets/home-bg/home-bgLeft.png';
import homeBgLeftX2 from '@/assets/home-bg/home-bgLeftX2.png';
import homeBgRight from '@/assets/home-bg/home-bgReight.png';
import homeBgRightX2 from '@/assets/home-bg/home-bgReightX2.png';

import innerBgLeft from '@/assets/header-bg/headerLeft.png';
import innerBgLeftX2 from '@/assets/header-bg/headerLeftX2.png';
import innerBgRight from '@/assets/header-bg/headerReight.png';
import innerBgRightX2 from '@/assets/header-bg/headerReightX2.png';

import bottomBgLeft from '@/assets/bottom-bg/mainBgLeft.png';
import bottomBgLeftX2 from '@/assets/bottom-bg/mainBgLeftX2.png';
import bottomBgRight from '@/assets/bottom-bg/mainBgReight.png';
import bottomBgRightX2 from '@/assets/bottom-bg/mainBgReightX2.png';

const BaseBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast;
  background-repeat: no-repeat;
`;

export const HomeDecorativeBackground = styled(BaseBackground)`
  height: clamp(500px, 55vw, 850px);
  background-image: url(${homeBgLeft}), url(${homeBgRight});

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url(${homeBgLeftX2}), url(${homeBgRightX2});
  }

  background-position:
    left top,
    right top;
  background-size:
    auto 70%,
    auto 70%;

  @media (max-width: 1200px) {
    background-size:
      auto 60%,
      auto 60%;
  }

  @media (max-width: 900px) {
    height: 550px;
    background-size:
      auto 60%,
      auto 60%;
  }

  @media (max-width: 767px) {
    height: 500px;
    background-position:
      -10px top,
      calc(100% + 10px) top;
    background-size:
      auto 55%,
      auto 55%;
  }
`;

export const InnerDecorativeBackground = styled(BaseBackground)`
  height: clamp(250px, 25vw, 350px);
  background-image: url(${innerBgLeft}), url(${innerBgRight});

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url(${innerBgLeftX2}), url(${innerBgRightX2});
  }

  background-position:
    left top,
    right top;
  background-size:
    auto 100%,
    auto 100%;

  @media (max-width: 1200px) {
    background-size: contain, contain;
  }

  @media (max-width: 900px) {
    height: 180px;
    background-size:
      50% auto,
      50% auto;
  }

  @media (max-width: 767px) {
    height: 140px;
    background-position:
      -10px top,
      calc(100% + 10px) top;
    background-size:
      55% auto,
      55% auto;
  }
`;

export const BottomDecorativeBackground = styled(BaseBackground)`
  top: auto;
  bottom: 0;
  height: clamp(350px, 45vw, 750px);
  background-image: url(${bottomBgLeft}), url(${bottomBgRight});

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url(${bottomBgLeftX2}), url(${bottomBgRightX2});
  }

  background-repeat: no-repeat;
  background-position:
    left bottom,
    right bottom;
  background-size:
    auto 100%,
    auto 100%;

  @media (max-width: 1024px) {
    background-size: contain, contain;
  }

  @media (max-width: 767px) {
    height: 350px;
    background-size:
      50% auto,
      50% auto;
    background-position:
      -10px bottom,
      calc(100% + 10px) bottom;
  }
`;
