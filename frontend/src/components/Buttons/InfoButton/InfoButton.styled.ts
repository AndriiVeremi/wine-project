import styled from 'styled-components';

export const Button = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  padding: 16px 55px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 120px;

  border-radius: 44px;
  background: ${(props) =>
    props.$active ? 'rgba(132, 16, 19, 0.05)' : 'rgba(255, 255, 255, 0.54)'};

  color: ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : '#3f3f3f')};
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.2;
  letter-spacing: -0.08px;

  border: 1px dashed ${(props) => (props.$active ? 'var(--primary-wine, #841013)' : '#454443')};
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-wine, #841013);
    border: 1px dashed var(--primary-wine, #841013);
    background: rgba(132, 16, 19, 0.1);
  }

  @media screen and (max-width: 767px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;
