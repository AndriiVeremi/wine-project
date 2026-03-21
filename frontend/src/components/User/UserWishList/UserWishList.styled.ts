import styled from 'styled-components';

export const WishlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

export const WineCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const WineImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
`;

export const WineName = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
  text-align: center;
  color: #333;
`;

export const WineryName = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ff4d4f;
  transition: background 0.2s;

  &:hover {
    background: #fff1f0;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #666;

  svg {
    color: #e0e0e0;
    margin-bottom: 10px;
  }

  h3 {
    color: #333;
    margin: 0;
  }

  p {
    margin: 0 0 10px 0;
  }
`;
