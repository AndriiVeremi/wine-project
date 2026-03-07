import styled from 'styled-components';

export const AccountInfoContainer = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  min-width: 180px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
`;

export const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserName = styled.h3`
  font-size: 28px;
  font-weight: 400;
  color: var(--primary-gray);
  margin: 0;
`;

export const VipBadge = styled.span<{ $isVip: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isVip }) => ($isVip ? 'var(--rating-gold)' : 'var(--secondary-gray)')};
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    font-size: 16px;
  }
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
`;

export const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid var(--soft-gray);
  gap: 20px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const InfoLabel = styled.span`
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-gray);
  min-width: 160px;
`;

export const InfoValue = styled.span`
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--input-gray-text);
  word-break: break-all;
`;
