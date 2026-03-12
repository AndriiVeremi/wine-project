import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  gap: 24px;
`;

export const FormTitle = styled.h3`
  font-family: var(--font-main);
  font-size: 24px;
  font-weight: 600;
  color: var(--black);
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 16px;
  border: 1px solid var(--secondary-gray);
  border-radius: var(--border-radius-md);
  font-family: var(--font-main);
  font-size: 16px;
  resize: none;
  outline: none;
  transition: var(--transition);

  &:focus {
    border-color: var(--primary-wine);
    background-color: rgba(132, 16, 19, 0.05);
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  p {
    font-family: var(--font-main);
    font-size: 16px;
    color: var(--black);
  }
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
  width: 120px;
`;

export const StarButton = styled.button`
  width: 32px;
  height: 32px;
  background: var(--white);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const SendButton = styled.button`
  width: 340px;
  padding: 16px;
  background-color: transparent;
  color: var(--primary-wine);
  border: 1px solid var(--primary-wine);
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-wine);
    color: var(--white);
  }

  &:disabled {
    background-color: var(--secondary-gray);
    cursor: not-allowed;
    color: var(--white);
  }
`;
