import styled from 'styled-components';

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  padding: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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

export const Winery = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #666;
  margin: 0;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

export const Rating = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const PriceBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Price = styled.span`
  font-size: 26px;
  font-weight: 700;
`;

export const BuyButton = styled.button`
  padding: 10px 20px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #a30000;
  }
`;

export const Characteristics = styled.ul``;

export const CharacteristicItem = styled.li`
  width: 100%;
  display: flex;

  span:first-child {
    width: 160px;
  }

  span:last-child {
  }
`;
