import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
export const DetailContainer = styled.div`
  padding: 20px 0 60px;
  @media (min-width: ${breakpoints.tablet}) {
    padding: 40px 0 100px;
  }
`;
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 60px;
    margin-bottom: 80px;
  }
`;
export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 16px;
  }
`;
export const MainImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  @media (min-width: ${breakpoints.tablet}) {
    height: 400px;
    border-radius: 20px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    height: 500px;
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
  gap: 8px;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
`;
export const Thumbnail = styled.div<{ $active: boolean }>`
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : 'transparent')};
  transition: all 0.2s;
  @media (min-width: ${breakpoints.tablet}) {
    border-radius: 8px;
  }
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
  justify-content: flex-start;
`;
export const Badge = styled.span<{ $type: string }>`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: ${(props) =>
    props.$type === 'red' ? '#841013' : props.$type === 'white' ? '#d4af37' : '#ffb7c5'};
  margin-bottom: 12px;
  @media (min-width: ${breakpoints.tablet}) {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    margin-bottom: 20px;
  }
`;
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 38px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`;
export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 24px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 40px;
  }
`;
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${breakpoints.tablet}) {
    gap: 30px;
    margin-bottom: 40px;
  }
`;
export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const StatLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 14px;
  }
`;
export const ProgressBar = styled.div<{ $percent: number; $type?: string }>`
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  @media (min-width: ${breakpoints.tablet}) {
    height: 8px;
    border-radius: 4px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.$percent}%;
    background: ${(props) => {
      if (props.$type === 'acid') return 'linear-gradient(90deg, #f1c40f, #e67e22)';
      if (props.$type === 'body') return 'linear-gradient(90deg, #e056fd, #841013)';
      if (props.$type === 'tannin') return 'linear-gradient(90deg, #95a5a6, #2c3e50)';
      return 'var(--primary-wine, #841013)';
    }};
    transition: width 1s ease-in-out;
  }
`;
export const InfoCard = styled.div`
  background: #fdfdfd;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  margin-top: 20px;
  @media (min-width: ${breakpoints.tablet}) {
    padding: 30px;
    border-radius: 16px;
    margin-top: 30px;
  }
`;
export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
  border-left: 4px solid var(--primary-wine, #841013);
  padding-left: 12px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
    border-left-width: 6px;
    padding-left: 20px;
    margin-bottom: 30px;
  }
`;
export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 10px;
    margin-bottom: 50px;
  }
`;
export const Tag = styled.span`
  padding: 6px 14px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  @media (min-width: ${breakpoints.tablet}) {
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 14px;
  }
`;
export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    margin-bottom: 60px;
  }
`;
export const FoodCard = styled.div`
  padding: 16px 10px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #eee;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  @media (min-width: ${breakpoints.tablet}) {
    padding: 24px 15px;
    border-radius: 12px;
  }
  .icon {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
    @media (min-width: ${breakpoints.tablet}) {
      font-size: 32px;
      margin-bottom: 12px;
    }
  }
  span {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    @media (min-width: ${breakpoints.tablet}) {
      font-size: 14px;
    }
  }
`;

export const SliderSection = styled.section`
  margin-top: 60px;
  margin-bottom: 40px;
`;

export const SectionHeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
  border-left: 4px solid var(--primary-wine, #841013);
  padding-left: 12px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
    border-left-width: 6px;
    padding-left: 20px;
    margin-bottom: 30px;
  }
`;
