import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    border-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

export const WineImageWrapper = styled.div`
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f0f0;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const ReviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const WineTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-wine, #841013);
  }
`;

export const ReviewComment = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
  flex: 1;
`;

export const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f5f5f5;
`;

export const ReviewDate = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${(props) => (props.$variant === 'delete' ? '#ff4d4f' : '#666')};
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) => (props.$variant === 'delete' ? '#fff1f0' : '#f5f5f5')};
    transform: scale(1.05);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : '#ddd')};
  background-color: ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : 'transparent')};
  color: ${(props) => (props.$active ? '#fff' : '#666')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : '#f0f0f0')};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  border: 1px dashed #ddd;
  color: #999;
`;
