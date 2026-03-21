import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;

export const Label = styled.label`
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 14px;
  color: #666;
  margin-left: 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  padding-right: 45px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-family: var(--font-main);
  font-size: 15px;
  color: #333;
  background-color: #ffffff;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #bbb;
  }

  &:hover {
    border-color: #841013;
    background-color: #fffafa;
  }

  &:focus {
    border-color: #841013;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #666;
    cursor: not-allowed;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-family: var(--font-main);
  font-size: 15px;
  color: #333;
  background-color: #ffffff;
  outline: none;
  transition: all 0.2s ease-in-out;
  resize: vertical;

  &::placeholder {
    color: #bbb;
  }

  &:hover {
    border-color: #841013;
    background-color: #fffafa;
  }

  &:focus {
    border-color: #841013;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-family: var(--font-main);
  font-size: 15px;
  color: #333;
  background-color: #ffffff;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #841013;
    background-color: #fffafa;
  }

  &:focus {
    border-color: #841013;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;

  &:hover {
    color: #666;
  }
`;

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  font-family: var(--font-main);
  font-size: 14px;
  color: #666;
  cursor: pointer;
  text-align: left;
  margin-top: 8px;
  padding: 0;
  width: fit-content;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color, #841013);
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error, #e44848);
  font-size: 13px;
  margin-top: 4px;
  margin-left: 4px;
`;
