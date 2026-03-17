import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  width: 100%;
  position: relative;

  background: var(--filter-active-bg);
  padding: 16px 24px;
  border-radius: 32px;
  border: 1px solid var(--filter-border-color);
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: var(--font-main);
  color: var(--primary-gray);

  &::placeholder {
    color: var(--secondary-gray);
    opacity: 0.6;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 130px;
  height: 100%;
  border-radius: 40px;
  border: 1px solid var(--primary-wine);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--primary-wine);

  transition:
    transform var(--transition),
    background var(--transition);

  &:hover {
    background: var(--primary-wine);
    color: var(--white);
  }
`;
