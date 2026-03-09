import styled from 'styled-components';

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
  font-size: 30px;
  font-weight: 500;
  color: var(--primary-gray);
  margin-bottom: 48px;
`;

export const StockReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 56px;
  margin-bottom: 40px;
`;

export const WineInStock = styled.p<{ $inStock?: boolean }>`
  color: ${({ $inStock }) => ($inStock ? 'green' : 'red')};
`;

export const WriteReviewButton = styled.button``;

export const StyledWinePrice = styled.p`
  padding-left: 24px;
  font-size: 30px;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 64px;
`;

export const BuyFavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 64px;
`;

export const Characteristics = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CharacteristicItem = styled.li`
  width: 100%;
  display: flex;

  span:first-child {
    width: 168px;
  }

  span:last-child {
    text-transform: capitalize;
  }
`;
