import styled from 'styled-components';
import bgImg from '@/assets/bg-img.png';
import reviewImg from '@/assets/review_bg-img.png';

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
  width: 100%;
  background-color: var(--white);
  background-image: url(${reviewImg});
  background-size: cover;
  background-position: center 20px;
  background-repeat: no-repeat;
  padding: 100px 0;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  & > div {
    transform: translateY(-30px);
  }

  @media (max-width: 1024px) {
    min-height: 600px;
    padding: 80px 0;
    background-position: center 15px;

    & > div {
      transform: translateY(-15px);
    }
  }

  @media (max-width: 767px) {
    margin-top: 50px;
    min-height: 450px;
    padding: 60px 0;
    background-position: center 10px;

    & > div {
      transform: translateY(-10px);
    }
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
