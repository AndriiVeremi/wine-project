import styled from 'styled-components';

export const WineReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
    border-color: #e8e8e8;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f9f9f9;
  flex-shrink: 0;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 24px;
    color: #ddd;
    margin: 12px;
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
  margin-bottom: 10px;
`;

export const AuthorName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;

export const ReviewDate = styled.span`
  font-size: 12px;
  color: #aaa;
  margin-top: 2px;
`;

export const ReviewText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #4a4a4a;
  margin: 0;
`;

export const NoReviewsMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #aaa;
  background: #fafafa;
  border-radius: 12px;
  border: 1px dashed #ddd;
  font-size: 15px;
`;
