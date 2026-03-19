import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const DetailContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;

  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 100px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainImage = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  @media (min-width: ${breakpoints.tablet}) {
    height: 450px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    height: 550px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

export const Thumbnail = styled.div<{ $active: boolean }>`
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? '#841013' : 'transparent')};
  transition: all 0.2s;
  background: #f8fafc;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Badge = styled.span<{ $type: string }>`
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  background: ${(props) =>
    props.$type === 'red' ? '#841013' : props.$type === 'white' ? '#d4af37' : '#ffb7c5'};
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  line-height: 1.1;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 48px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    font-size: 56px;
  }
`;

export const Description = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: #475569;
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const ProgressBar = styled.div<{ $percent: number; $type?: string }>`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.$percent}%;
    background: ${(props) => {
      if (props.$type === 'acid') return '#f1c40f';
      if (props.$type === 'body') return '#841013';
      if (props.$type === 'tannin') return '#64748b';
      return '#841013';
    }};
    transition: width 1s ease-in-out;
  }
`;

export const InfoCard = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
`;

export const SectionTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  text-transform: uppercase;
  margin-bottom: 32px;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 16px;

  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f1f5f9;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
  }
`;

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
`;

export const Tag = styled.span`
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border-color: #841013;
    transform: translateY(-2px);
  }
`;

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 60px;
`;

export const FoodCard = styled.div`
  padding: 24px 16px;
  background: #fff;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
  }

  span {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
  }
`;

export const SliderSection = styled.section`
  margin-top: 80px;
  margin-bottom: 80px;
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
