import FavoriteButton from '@/components/Buttons/FavoriteButton';
import styled from 'styled-components';

export const StyledWineCardDiv = styled.div`
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

export const WineImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover; /* Змінив на cover, щоб заповнити весь простір без полосок */
  border-radius: 12px;
  margin-bottom: 8px;
`;

export const StyledFavoriteButton = styled(FavoriteButton)`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
`;

export const WineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const WineTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--black-color, #000000);
  margin: 0;
  line-height: 1.2;
`;

export const WineVintage = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-wine);
  flex-shrink: 0;
`;

export const WineryName = styled.p`
  font-size: 14px;
  color: var(--secondary-gray);
  font-style: italic;
  margin: -4px 0 4px 0;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
`;

export const Tag = styled.span`
  background: var(--tertiary-gray);
  color: var(--primary-gray);
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const PriceRatingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--tertiary-gray);
`;

export const WinePrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-wine);
`;

export const WineDescription = styled.p`
  font-size: 13px;
  color: var(--font-grey);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-break: break-word;
`;
