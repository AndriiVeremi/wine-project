import RatingStars from '@/components/common/RatingStars';
import { breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledTourCardDiv = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  background: var(--white);
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

  @media (min-width: ${breakpoints.tablet}) {
    height: 260px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 310px;
  }
`;

export const TourCardInfo = styled.div`
  padding: var(--space-md);
`;

export const TourCardTitle = styled.h3`
  color: var(--primary-gray);
  margin-bottom: 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTourRatingStars = styled(RatingStars)``;

export const InfoRow = styled.div`
  display: flex;

  gap: 16px;
  margin-bottom: 16px;

  @media (min-width: ${breakpoints.tablet}) {
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

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 15px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-wine);

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 20px;
  }
`;
