import FavoriteButton from '@/components/Buttons/FavoriteButton';
import { Link } from 'react-router-dom';
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-sizing: border-box;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(255, 234, 203, 0.6);
    border-color: #ffeacb;
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;

export const WineImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 10px;
  display: block;
  box-sizing: border-box;
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
  margin: 0;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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
