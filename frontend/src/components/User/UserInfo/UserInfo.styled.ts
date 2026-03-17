import styled from 'styled-components';

export const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const UserName = styled.h3`
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const VipBadge = styled.span<{ $isVip: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $isVip }) => ($isVip ? 'var(--rating-gold, #ffb400)' : '#aaa')};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 16px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border-color: #eee;
  }
`;

export const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color, #841013);
  font-size: 20px;
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #aaa;
  text-transform: uppercase;
`;

export const Value = styled.span`
  font-size: 15px;
  color: #444;
  font-weight: 500;
  word-break: break-all;
`;
