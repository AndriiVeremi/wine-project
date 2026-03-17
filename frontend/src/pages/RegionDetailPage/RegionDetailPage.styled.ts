import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const RegionDetailWrapper = styled.div`
  width: 100%;
`;

export const RegionHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 48px;
  }
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 450px;
  }

  @media (min-width: 1024px) {
    height: 584px;
  }
`;

export const RegionInfoBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  background: #fff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (min-width: 1024px) {
    padding: 32px;
  }
`;

export const RegionNameTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--accent-color, #841013);
  margin: 0;
  line-height: 1.1;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 40px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 49px;
  }
`;

export const DescriptionText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #3f3f3f;
  white-space: pre-wrap;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }
`;

export const RegionContent = styled.div`
  padding: 40px 0 80px;
`;

export const RegionInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
`;

export const InfoCard = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  h3 {
    font-size: 24px;
    color: #841013;
    margin-bottom: 15px;
    border-bottom: 2px solid #841013;
    padding-bottom: 10px;
    display: inline-block;
  }

  p {
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    color: #555;
  }

  li {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export const SectionHeaderTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 500;
  color: var(--accent-color, #841013);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 49px;
  }
`;
