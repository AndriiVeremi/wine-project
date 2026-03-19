import styled from 'styled-components';
import { Link } from 'react-router-dom';
import bgImg from '@/assets/bg-img.png';
import reviewImg from '@/assets/review_bg-img.png';

export const WineSection = styled.section`
  width: 100%;
  background-color: var(--white);
  padding-bottom: 100px;
  padding-top: 60px;
  overflow: hidden;

  @media (max-width: 767px) {
    padding-top: 40px;
    padding-bottom: 60px;
  }
`;

export const MapSection = styled.section`
  width: 100%;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  position: relative;

  @media (max-width: 767px) {
    min-height: 600px;
    padding: 60px 0;
  }
`;

export const RegionTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  color: var(--white);
  margin-bottom: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 767px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

export const RegionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const RegionLink = styled(Link)`
  padding: 15px 30px;
  background-color: rgba(132, 16, 19, 0.85);
  color: var(--white);
  text-decoration: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background-color: var(--white);
    color: #841013;
    border-color: #841013;
    transform: scale(1.05);
  }

  @media (max-width: 767px) {
    padding: 10px 20px;
    font-size: 14px;
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
      transform: translateY(-тpx);
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
