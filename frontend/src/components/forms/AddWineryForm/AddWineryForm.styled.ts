import styled from 'styled-components';

export const StyledAddWineryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const FormTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--accent-color, #841013);
  margin-bottom: 8px;
  text-align: center;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MapInstruction = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  span {
    color: var(--accent-color, #841013);
    font-weight: 600;
  }
`;

export const MapFieldWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const SubmitButton = styled.button`
  background-color: var(--accent-color, #841013);
  color: white;
  border: none;
  border-radius: 35px;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;

  &:hover {
    background-color: #690c0f;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
