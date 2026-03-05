import styled from 'styled-components';
import headerImage from '@/assets/home-bg.svg';

export const HeroSection = styled('section')`
  width: 100%;
  height: 70vh;
  padding-top: 120px;

  background-image: url(${headerImage});
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
`;
