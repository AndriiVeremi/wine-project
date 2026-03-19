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
  @media (max-width: 1280px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 12px;
    border-radius: 16px;
    position: relative;
    top: 0;
    box-shadow: none;
    border: 1px solid var(--tertiary-gray);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(2, 1fr);
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
  @media (max-width: 1280px) {
    padding: 12px 16px;
    border-left: none;
    border-radius: 12px;
    justify-content: flex-start;
    font-size: 14px;
    gap: 10px;
    background: ${({ $active }) => ($active ? 'var(--bg-main)' : '#fcfcfc')};
    border: 1px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : '#eee')};
    white-space: normal;
    text-align: left;
    height: 100%;
  }
`;
