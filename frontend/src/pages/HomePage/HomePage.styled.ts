import styled from 'styled-components';
import headerImage from '@/assets/home-bg.svg';
import bgImg from '@/assets/bg-img.png';
import reviewImg from '@/assets/review_bg-img.png';

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

export const HeroWrapper = styled('div')`
  width: 800px;
  margin-top: 50px;
  padding-left: 180px;
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

export const WineSection = styled('section')`
  width: 100%;
  background-color: var(--white);
  padding-top: 100px;
  padding-bottom: 140px;
`;

export const MapSection = styled.section`
  width: 100%;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 1200px;
`;

export const ReviewSection = styled.section`
  width: 100%;
  background-color: var(--white);
  min-height: 600px;
  background-image: url(${reviewImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 1060px;
`;

export const ReviewList = styled('ul')`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
`;
