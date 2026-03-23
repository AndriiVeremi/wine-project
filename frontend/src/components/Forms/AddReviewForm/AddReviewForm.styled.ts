import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
`;

export const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: all 0.2s;
  margin-bottom: 20px;
  background-color: #fafafa;

  &:focus {
    border-color: var(--primary-wine, #841013);
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.05);
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;

  p {
    font-size: 15px;
    font-weight: 500;
    color: #666;
  }
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const StarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
