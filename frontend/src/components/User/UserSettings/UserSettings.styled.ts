import styled from 'styled-components';

export const AccountSettingsContainer = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  padding: 30px;
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
  font-size: 28px;
  font-weight: 400;
  color: var(--primary-gray);
`;

export const VipBadge = styled.span<{ $isVip: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isVip }) => ($isVip ? 'var(--rating-gold)' : 'var(--secondary-gray)')};
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    font-size: 16px;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 40px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-gray);
`;

export const Input = styled.input<{ $disabled?: boolean }>`
  padding: 10px 14px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-in);
  font-size: 16px;
  color: var(--primary-gray);
  background-color: ${({ $disabled }) =>
    $disabled ? 'var(--secondary-gray-light)' : 'var(--white)'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary-wine);
  }
`;
