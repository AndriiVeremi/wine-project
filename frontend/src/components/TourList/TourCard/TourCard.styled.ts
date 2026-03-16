import RatingStars from '@/components/common/RatingStars';
import styled from 'styled-components';

export const StyledTourCardDiv = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TourCardImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 8px;
`;

export const TourCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const TourCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--black-color, #000000);
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--secondary-gray);

  svg {
    width: 18px;
    height: 18px;
    color: var(--primary-wine);
  }
`;

export const PriceRatingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--tertiary-gray);
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-wine);
`;

export const StyledTourRatingStars = styled(RatingStars)``;
