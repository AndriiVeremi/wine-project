import styled from 'styled-components';

export const CardBase = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  height: 420px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: var(--font-dark);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RatingBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffb400;
  font-size: 14px;
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: var(--primary-wine);
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  margin-top: auto;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
