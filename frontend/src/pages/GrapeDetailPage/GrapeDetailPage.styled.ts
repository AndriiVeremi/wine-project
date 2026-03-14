import styled from 'styled-components';

export const DetailContainer = styled.div`
  padding: 40px 0 100px;
`;

export const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
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
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

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
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-wine, #841013);
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
  justify-content: center;
`;

export const Badge = styled.span<{ $type: string }>`
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: ${(props) =>
    props.$type === 'red' ? '#841013' : props.$type === 'white' ? '#d4af37' : '#ffb7c5'};
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 40px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
`;

export const ProgressBar = styled.div<{ $percent: number; $type?: string }>`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
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
      if (props.$type === 'acid') return 'linear-gradient(90deg, #f1c40f, #e67e22)';
      if (props.$type === 'body') return 'linear-gradient(90deg, #e056fd, #841013)';
      if (props.$type === 'tannin') return 'linear-gradient(90deg, #95a5a6, #2c3e50)';
      return 'var(--primary-wine, #841013)';
    }};
    border-radius: 4px;
    transition: width 1s ease-in-out;
  }
`;

export const InfoCard = styled.div`
  background: #fdfdfd;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  margin-top: 30px;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
  border-left: 6px solid var(--primary-wine, #841013);
  padding-left: 20px;
`;

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  margin-bottom: 50px;
`;

export const Tag = styled.span`
  padding: 8px 18px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-wine, #841013);
    color: var(--primary-wine, #841013);
    transform: translateY(-2px);
  }
`;

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 60px;
`;

export const FoodCard = styled.div`
  padding: 24px 15px;
  background: #fff;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-wine, #841013);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
  }
`;
