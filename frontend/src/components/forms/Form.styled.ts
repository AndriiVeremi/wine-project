import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Label = styled.label`
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  color: var(--primary-gray);
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 20px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-in);
  font-family: var(--font-main);
  font-size: 14px;
  color: var(--input-gray-text);
  outline: none;
  transition: var(--transition);

  &::placeholder {
    color: var(--shadow-gray);
  }

  &:hover {
    border: 1px solid var(--primary-wine);
  }

  &:focus {
    border: 3px solid var(--primary-wine);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  font-family: var(--font-main);
  font-size: 17px;
  color: var(--primary-gray);
  cursor: pointer;
  text-align: left;
  margin-top: 29px;
  padding: 0;
  width: fit-content;
  transition: var(--transition);

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error);
  font-size: 14px;
  margin-top: 5px;
`;

export const Select = styled.select`
  width: 100%;
  height: 45px;
  padding: 0 20px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-in);
  font-family: var(--font-main);
  font-size: 14px;
  color: var(--input-gray-text);
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 16px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border: 1px solid var(--primary-wine);
  }

  &:focus {
    border: 3px solid var(--primary-wine);
  }
`;
