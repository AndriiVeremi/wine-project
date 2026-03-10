import styled from 'styled-components';

export const WineReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  margin-top: 40px;
`;

export const AvatarList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--secondary-gray);
    border-radius: 10px;
  }
`;

export const AvatarWrapper = styled.div<{ $active?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${(props) => (props.$active ? 'var(--primary-wine)' : 'transparent')};
  transition: var(--transition);
  flex-shrink: 0;
  background-color: var(--soft-gray);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    border-color: ${(props) => (props.$active ? 'var(--primary-wine)' : 'var(--secondary-gray)')};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 32px;
    color: var(--secondary-gray);
  }
`;

export const ReviewContent = styled.div`
  background: var(--white);
  padding: 24px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--main-shadow);
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ReviewText = styled.p`
  font-family: var(--font-main);
  font-size: 18px;
  line-height: 1.6;
  color: var(--primary-gray);
  margin-bottom: 24px;
  font-style: italic;

  &::before,
  &::after {
    content: '"';
  }
`;

export const ReviewAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AuthorName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: var(--black);
`;

export const NoReviewsMessage = styled.p`
  text-align: center;
  color: var(--font-grey);
  font-size: 18px;
  margin-top: 20px;
`;
