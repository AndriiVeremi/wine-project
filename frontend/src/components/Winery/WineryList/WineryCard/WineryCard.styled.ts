import styled from 'styled-components';

export const StyledWineryCardDiv = styled.div`
  position: relative;
  background-color: var(--white-color, #ffffff);
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

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(255, 234, 203, 0.6);
    border-color: #ffeacb;
  }
`;

export const WineryLogo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
`;

export const WineryTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--black-color, #000000);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--gray-color, #666666);
`;

export const WineryInfo = styled.p`
  font-size: 14px;
  color: var(--gray-color, #666666);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  min-height: 105px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const WineryLink = styled.a`
  font-size: 14px;
  color: var(--accent-color, #e44848);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const RatingWrapper = styled.div`
  margin-top: -4px;
`;
