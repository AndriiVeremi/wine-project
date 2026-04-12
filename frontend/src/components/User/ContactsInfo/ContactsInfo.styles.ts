import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

export const MemberRow = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: #841013;
    transform: translateX(5px);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AvatarCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #841013;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MemberName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const MemberRole = styled.p`
  margin: 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 16px;
`;

export const SocialLink = styled.a`
  color: #333;
  font-size: 22px;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #841013;
  }
`;
