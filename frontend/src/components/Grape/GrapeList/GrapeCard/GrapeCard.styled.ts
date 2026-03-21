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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(255, 234, 203, 0.6);
    border-color: #ffeacb;
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
  line-height: 1.5;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 84px;
  overflow-wrap: break-word;
  word-break: break-word;
`;
