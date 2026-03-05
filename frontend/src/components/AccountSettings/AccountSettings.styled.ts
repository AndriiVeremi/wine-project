import styled from 'styled-components';

export const AccountSettingsContainer = styled.div`
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
