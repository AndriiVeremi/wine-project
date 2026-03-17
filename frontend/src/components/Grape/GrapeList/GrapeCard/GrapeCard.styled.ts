import styled from 'styled-components';

export const StyledGrapeCardDiv = styled.div`
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

export const GrapeImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
`;

export const GrapeTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  color: var(--primary-gray);
  font-family: var(--font-main);
  margin-bottom: 8px;
  font-size: 20px;
`;

export const RegionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--font-grey);
`;

export const RegionText = styled.span`
  font-family: var(--font-main);
  font-size: 14px;
`;

export const CharacteristicsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  padding: 8px 0;
  border-top: 1px solid var(--tertiary-gray);
  border-bottom: 1px solid var(--tertiary-gray);
`;

export const CharacteristicItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--primary-gray);
  font-size: 10px;
  text-align: center;
`;

export const GrapeDescription = styled.p`
  text-align: center;
  color: var(--font-grey);
  font-family: var(--font-main);
  font-size: 14px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: auto;
`;
