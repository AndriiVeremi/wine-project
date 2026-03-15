import RatingStars from '@/components/common/RatingStars';
import styled from 'styled-components';

export const StyledTourCardDiv = styled.div`
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-md);
  background: var(--white);
  padding: var(--space-md);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--main-shadow);
  }
`;

export const TourCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    height: 260px;
    margin-bottom: 24px;
  }

  @media (min-width: 1280px) {
    height: 310px;
    margin-bottom: 32px;
  }
`;

export const TourCardTitle = styled.h3`
  text-align: center;
  color: var(--primary-gray);
  margin-bottom: 16px;
`;

export const StyledTourRatingStars = styled(RatingStars)`
  justify-content: center;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 14px;
  color: var(--text-secondary);

  svg {
    width: 18px;
    height: 18px;
    color: var(--accent);
  }

  @media (min-width: 768px) {
    font-size: 15px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;
