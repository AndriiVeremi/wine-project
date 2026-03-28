import styled from 'styled-components';

export const CardBase = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  height: 420px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(255, 234, 203, 0.6);
    border-color: #ffeacb;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px; /* Трохи збільшимо картинку */
  overflow: hidden;
  background: #f9f9f9;
  position: relative; /* Для позиціонування ціни */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${CardBase}:hover & img {
    transform: scale(1.1); /* Легкий зум картинки при наведенні */
  }
`;

export const PriceBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--primary-wine);
  color: white;
  padding: 6px 12px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Title = styled.h3`
  font-family: var(--font-main);
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-gray);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.02em;
`;

export const WineryName = styled.p`
  font-size: 13px;
  color: var(--secondary-gray);
  margin: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const WineMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #888;
  text-transform: capitalize;

  span.dot {
    width: 4px;
    height: 4px;
    background: #ccc;
    border-radius: 50%;
  }
`;

export const RatingBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffb400;
  font-size: 14px;
`;

export const FooterLink = styled.div`
  color: var(--primary-wine);
  font-weight: 700;
  font-size: 14px;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.3s ease;
  text-decoration: none;

  ${CardBase}:hover & {
    gap: 10px; /* Стрілочка відсувається при наведенні на картку */
  }
`;
