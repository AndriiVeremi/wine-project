import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--list-inline-gap, 8px);
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin-top: 8px;
  min-width: 150px;
  box-shadow: var(--main-shadow);
  z-index: 100;
`;

export const DropdownMenuItem = styled.li<{ $active?: boolean }>`
  padding: 8px 16px;
  font-family: var(--font-main);
  color: ${({ $active }) => ($active ? 'var(--primary-wine)' : 'var(--font-grey)')};
  background: ${({ $active }) => ($active ? 'var(--tertiary-gray)' : 'transparent')};
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: var(--tertiary-gray);
  }
`;

export const ListSection = styled.section`
  padding-bottom: 40px;
`;
