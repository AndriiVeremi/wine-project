import { IoChevronDownSharp } from 'react-icons/io5';
import styled from 'styled-components';

export const LanguageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
`;

export const DropDownIcon = styled(IoChevronDownSharp)<{ $isOpen: boolean }>`
  color: var(--font-grey);
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Text = styled.p`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin-top: 8px;
  width: 80px; /* Трохи менше ніж у локацій, бо текст коротший */
  box-shadow: var(--main-shadow);
  z-index: 100;
`;

export const DropdownItem = styled.li<{ $active?: boolean }>`
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
