import styled from 'styled-components';

export const MenuContainer = styled.aside`
  width: 280px;
  background-color: var(--white);
  border-radius: var(--border-radius-in);
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: fit-content;
  border: 1px solid var(--secondary-gray);
`;

export const MenuItem = styled.button<{ $active?: boolean; $isLogout?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  width: 100%;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--primary-wine-light)' : 'none')};
  color: ${({ $active, $isLogout }) =>
    $isLogout ? 'var(--error)' : $active ? 'var(--primary-wine)' : 'var(--primary-gray)'};
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  cursor: pointer;
  transition: var(--transition);
  border-left: 4px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'transparent')};

  &:hover {
    background-color: var(--secondary-gray-light);
    color: ${({ $isLogout }) => ($isLogout ? 'var(--error)' : 'var(--primary-wine)')};
  }

  svg {
    font-size: 20px;
  }
`;
