import styled from 'styled-components';

export const StyledFilterClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 16px 24px;
  width: auto;
  height: auto;

  border-radius: 40px;
  border: 1px solid var(--primary-wine);
  color: var(--primary-wine);
  font-size: 16px;
  font-family: var(--font-main);
  transition: var(--transition);

  white-space: nowrap;

  &:hover {
    color: var(--white);
    background: var(--primary-wine);
  }
`;
