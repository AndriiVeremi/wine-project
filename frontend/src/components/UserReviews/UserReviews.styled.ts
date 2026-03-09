import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-lg);
  background-color: var(--white);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--modal-shadow);
    border-color: var(--primary-wine);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WineImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--soft-gray);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
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
  justify-content: space-between;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const WineTitle = styled.h3`
  font-family: var(--font-main);
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-gray);
  margin: 0;
  cursor: pointer;

  &:hover {
    color: var(--primary-wine);
  }
`;

export const ReviewComment = styled.p`
  font-family: var(--font-main);
  font-size: 16px;
  line-height: 1.5;
  color: var(--input-gray-text);
  margin-bottom: 16px;
`;

export const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewDate = styled.span`
  font-size: 14px;
  color: var(--secondary-gray);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${(props) => (props.$variant === 'delete' ? 'var(--error)' : 'var(--primary-gray)')};
  transition: var(--transition);

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
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
  border: 1px solid ${(props) => (props.$active ? 'var(--primary-wine)' : 'var(--secondary-gray)')};
  background-color: ${(props) => (props.$active ? 'var(--primary-wine)' : 'transparent')};
  color: ${(props) => (props.$active ? 'var(--white)' : 'var(--primary-gray)')};
  font-family: var(--font-main);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: var(--primary-wine);
    color: var(--white);
    border-color: var(--primary-wine);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  text-align: center;
`;
