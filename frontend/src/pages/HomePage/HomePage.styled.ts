import styled from 'styled-components';
import headerImage from '@/assets/home-bg.svg';

export const HeroSection = styled('section')`
  width: 100%;
//   height: 100%;
  padding-top: 120px;

  background-image: url(${headerImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--white);
`;

export const HeroTitle = styled('h1')`
font-family: var(--font-main);
    font-size: 44px;
    font-weight: 600;
    font-style: semi-bold;
    color: var(--font-dark);
    margin-bottom: 30px;
`;

export const HeroTitleWrapper = styled('div')`
    width: 800px;
    margin-top: 50px;
    padding-left: 180px;
    margin-bottom: 130px;
`;

export const HeroSubtitle = styled('h2')`
    font-family: var(--font-main);
    font-weight: 400;
    font-size: 24px;
    font-style: regular;
    line-height: 100%;
    color: var(--primary-gray);
`;

export const HeroSubtitleWrapper = styled('div')`
    width: 540px;
    margin-bottom: 30px;
`;

export const Span = styled('span')`
  color: var(--primary-wine);
`;

export const TextWrapper = styled('div')`
    width: 600px;
    margin-top: 20px;
`;

export const Text = styled('p')`
    font-family: var(--font-main);
    font-weight: 400;
    font-style: regular;
    font-size: 20px;
    line-height: 34px;
`;



