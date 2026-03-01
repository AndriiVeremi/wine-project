import styled from 'styled-components';

export const Button = styled.button`
  width: 300px;
  display: inline-flex;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 200px;
  background: var(--white);

  color: #000;
  font-size: 19px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.08px;
  border: 1px dotted #000;
  outline: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: var(--primary-wine);
    border: 1px dotted var(--primary-wine);
  }
`;
