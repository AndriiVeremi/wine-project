import styled from 'styled-components';
import bgImg from '@/assets/bg-img.png';
import reviewImg from '@/assets/review_bg-img.png';

export const HeroSection = styled('section')`
  width: 100%;
  overflow: hidden;
`;

export const HeroTitle = styled('h1')`
  font-family: var(--font-main);
  font-size: 44px;
  font-weight: 600;
  color: var(--font-dark);
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 767px) {
    font-size: 28px;
    text-align: center;
  }
`;

export const HeroWrapper = styled('div')`
  max-width: 800px;
  padding-left: 100px;
  margin-bottom: 80px;

  @media (max-width: 1279px) {
    padding-left: 50px;
  }

  @media (max-width: 767px) {
    padding-left: 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
`;

export const HeroSubtitle = styled('h2')`
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  color: var(--primary-gray);

  @media (max-width: 767px) {
    font-size: 18px;
    text-align: center;
  }
`;

export const HeroSubtitleWrapper = styled('div')`
  max-width: 540px;
  margin-bottom: 30px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const Span = styled('span')`
  color: var(--primary-wine);
`;

export const TextWrapper = styled('div')`
  max-width: 600px;
  margin-top: 20px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const Text = styled('p')`
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.7;

  @media (max-width: 767px) {
    font-size: 16px;
    text-align: center;
    line-height: 1.5;
  }
`;

export const WineSection = styled.section`
  width: 100%;
  background-color: var(--white);
  padding-top: 100px;
  padding-bottom: 140px;
  overflow: hidden;

  @media (max-width: 767px) {
    padding-top: 60px;
    padding-bottom: 80px;
  }
`;

export const MapSection = styled.section`
  width: 100%;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 1200px;
  overflow: hidden;

  @media (max-width: 767px) {
    min-height: 600px;
  }
`;

export const ReviewSection = styled.section`
  margin-top: 70px;
  width: 100%;
  background-color: var(--white);
  background-image: url(${reviewImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 1060px;
  overflow: hidden;

  @media (max-width: 767px) {
    margin-top: 50px;
    min-height: 600px;
  }
`;

export const ReviewList = styled('ul')`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
`;

export const ReviewTitle = styled.h2`
  text-align: center;
  font-size: 38px;
  margin-bottom: 40px;
  margin-top: 60px;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;
