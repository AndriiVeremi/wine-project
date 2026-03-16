import styled from 'styled-components';

export const MenuContainer = styled.aside`
  width: 280px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: fit-content;
  border-radius: 20px;
  padding: 16px 0;
  box-shadow: var(--main-shadow);

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 12px;
    border-radius: 16px;
    gap: 12px;

    /* Ховаємо скроллбар для чистоти */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const MenuItem = styled.button<{ $active?: boolean; $isLogout?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  width: 100%;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--bg-main)' : 'none')};
  color: ${({ $active, $isLogout }) =>
    $isLogout ? 'var(--error)' : $active ? 'var(--primary-wine)' : 'var(--primary-gray)'};
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  transition: var(--transition);
  border-left: 4px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'transparent')};
  white-space: nowrap;

  &:hover {
    background-color: var(--bg-main);
    color: ${({ $isLogout }) => ($isLogout ? 'var(--error)' : 'var(--primary-wine)')};
  }

  svg {
    font-size: 20px;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    width: auto;
    padding: 10px 20px;
    border-left: none;
    border-bottom: 3px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'transparent')};
    border-radius: 12px;

    background: ${({ $active }) => ($active ? 'var(--bg-main)' : 'var(--white)')};
    box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(132, 16, 19, 0.1)' : 'none')};
  }
`;
