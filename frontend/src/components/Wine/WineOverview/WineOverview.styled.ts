import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
export const StyledWineOverviewContainer = styled.div`
  width: 100%;
`;
export const Image = styled.img`
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const WineOverviewTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: var(--primary-gray);
  margin-bottom: 24px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 30px;
    margin-bottom: 48px;
  }
`;
export const StockReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 56px;
    margin-bottom: 40px;
  }
`;
export const WineInStock = styled.p<{ $inStock?: boolean }>`
  color: ${({ $inStock }) => ($inStock ? 'green' : 'red')};
  font-size: 14px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;
export const WriteReviewButton = styled.button``;
export const StyledWinePrice = styled.p`
  padding-left: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 32px;
  @media (min-width: ${breakpoints.tablet}) {
    padding-left: 24px;
    font-size: 30px;
    margin-bottom: 64px;
  }
`;
export const BuyFavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 80px;
    margin-bottom: 64px;
  }
`;

export const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 32px;
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TechItem = styled.div`
  background: #fcfcfc;
  border: 1px solid var(--tertiary-gray);
  border-radius: var(--border-radius-sm);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-wine);
    background: var(--white);
  }

  .tech-icon {
    color: var(--primary-wine);
    font-size: 20px;
  }

  .tech-label {
    font-size: 11px;
    color: var(--secondary-gray);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .tech-value {
    font-size: 14px;
    color: var(--primary-gray);
    font-weight: 600;
  }
`;

export const Characteristics = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
`;
export const CharacteristicItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 13px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  &:nth-child(even) {
    background-color: #fafafa;
  }
  &:hover {
    background-color: #f5f5f5;
  }
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 14px;
    padding: 10px 16px;
  }
  span:first-child {
    color: var(--secondary-gray);
    font-weight: 500;
    flex: 1;
  }
  span:last-child {
    text-transform: capitalize;
    color: var(--black);
    font-weight: 600;
    text-align: right;
    flex: 1;
  }
`;
