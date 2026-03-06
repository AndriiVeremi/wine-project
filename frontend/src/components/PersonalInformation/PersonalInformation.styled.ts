import styled from 'styled-components';

export const PersonalInfoContainer = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  min-width: 180px;
`;

export const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

export const UserName = styled.h3`
  font-size: 26px;
  font-weight: 400;
  color: var(--primary-gray);
`;

export const VipBadge = styled.span<{ $isVip: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isVip }) => ($isVip ? '#FFD700' : 'var(--primary-gray-light)')};
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    font-size: 16px;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-gray);
  min-width: 120px;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: var(--primary-gray);
`;
