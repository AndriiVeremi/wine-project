import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const PaginationButton = styled.button`
  background: white;
  color: var(--primary-gray, #333);
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--primary-wine, #841013);
    color: var(--primary-wine, #841013);
    background-color: #fdfdfd;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const PageInfo = styled.span`
  font-size: 15px;
  color: #666;
  font-weight: 500;
  font-family: var(--font-main);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CurrentPage = styled.span`
  color: var(--primary-wine, #841013);
  font-weight: 700;
  font-size: 16px;
`;

// Для сумісності
export const PaginationPageButton = styled.button<{ $active: boolean }>`
  display: none;
`;
