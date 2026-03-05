import styled from 'styled-components';

export const PersonalInfoContainer = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--secondary-gray);
`;

export const AvatarPlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--secondary-gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: var(--primary-gray-light);
  border: 2px solid var(--secondary-gray);
`;

export const AvatarUploadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-wine);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid var(--white);
  padding: 0;
  outline: none;

  &:hover {
    background-color: var(--primary-wine-dark);
  }

  input {
    display: none;
  }

  svg {
    font-size: 18px;
  }
`;

export const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled.h3`
  font-family: var(--font-main);
  font-size: 24px;
  font-weight: 500;
  color: var(--primary-gray);
`;

export const VipBadge = styled.span<{ $isVip: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-main);
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isVip }) => ($isVip ? '#FFD700' : 'var(--primary-gray-light)')};
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
  gap: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

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
  font-family: var(--font-main);
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-gray);
`;

export const Input = styled.input<{ $disabled?: boolean }>`
  padding: 10px 14px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-in);
  font-family: var(--font-main);
  font-size: 14px;
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

export const Value = styled.div`
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--primary-gray);
  padding: 8px 0;
`;
